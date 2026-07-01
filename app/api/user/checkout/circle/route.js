import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/middleware/auth.js";
import { Circle, CircleMember } from "@/lib/models/index.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16", // or whatever the latest stable is
});

export async function POST(request) {
  try {
    const { user, error } = await verifyAuth(request);
    if (error) return error;

    const body = await request.json();
    const { circleId } = body;

    if (!circleId) {
      return NextResponse.json({ error: "Circle ID is required" }, { status: 400 });
    }

    // 1. Verify Circle exists and get price
    const circle = await Circle.findByPk(circleId);
    if (!circle) {
      return NextResponse.json({ error: "Circle not found" }, { status: 404 });
    }

    // 2. Verify User is an approved member of this circle (but unpaid)
    const membership = await CircleMember.findOne({
      where: { userId: user.id, circleId: circle.id }
    });

    if (!membership) {
      return NextResponse.json({ error: "You are not a member of this circle" }, { status: 403 });
    }

    if (membership.status !== 'active') {
      return NextResponse.json({ error: "You have not been approved for this circle yet." }, { status: 403 });
    }

    if (membership.paymentStatus === 'paid') {
      return NextResponse.json({ error: "You have already paid for this circle." }, { status: 400 });
    }

    // 3. Configure Stripe Customer mapping
    const sessionConfig = {
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Rosebuddies: ${circle.name}`,
              description: `One-time access fee for the ${circle.name} circle.`,
            },
            unit_amount: circle.price, // Stored in cents (e.g. 3900 for $39)
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/my-circle/${circle.id}?payment=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/my-circle/${circle.id}?payment=cancelled`,
      metadata: {
        userId: user.id,
        circleId: circle.id,
        paymentType: "circle_fee"
      },
      client_reference_id: user.id,
      payment_intent_data: {
        setup_future_usage: "on_session", // Tells Stripe to save the card for future Checkouts
      }
    };

    // If we already have a Stripe Customer ID for this user, use it! 
    // This allows Stripe to auto-fill their saved cards.
    if (user.stripeCustomerId) {
      sessionConfig.customer = user.stripeCustomerId;
    } else {
      // Otherwise, tell Stripe to create a Customer using their email
      sessionConfig.customer_email = user.email;
    }

    // 4. Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create(sessionConfig);

    // 4. Temporarily store the session ID on the membership record
    await membership.update({ stripeSessionId: session.id });

    // 5. Send checkout URL to frontend
    return NextResponse.json({ url: session.url }, { status: 200 });

  } catch (err) {
    console.error("Stripe Checkout API Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
