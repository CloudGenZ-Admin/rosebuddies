import { NextResponse } from "next/server";
import Stripe from "stripe";
import { CircleMember } from "@/lib/models/index.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export async function POST(request) {
  const payload = await request.text();
  const signature = request.headers.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Stripe Webhook Signature Verification Failed:", err.message);
    return NextResponse.json({ error: "Webhook Error: " + err.message }, { status: 400 });
  }

  // Handle the event
  try {
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;
        
        // Check if this was a Circle Fee payment
        if (session.metadata && session.metadata.paymentType === "circle_fee") {
          const { userId, circleId } = session.metadata;

          // Find the membership and mark as paid
          const membership = await CircleMember.findOne({
            where: { userId, circleId }
          });

          if (membership) {
            await membership.update({ paymentStatus: "paid" });
            console.log(` Marked user ${userId} as PAID for circle ${circleId}`);
            
            // Capture and save the Stripe Customer ID if they didn't have one!
            // This is what allows them to 1-click checkout in the future.
            if (session.customer) {
              const { User } = await import("@/lib/models/index.js");
              await User.update(
                { stripeCustomerId: session.customer },
                { where: { id: userId, stripeCustomerId: null } } // Only update if they don't have one
              );
              console.log(` Saved Stripe Customer ID for user ${userId}`);
            }

          } else {
            console.error(`Membership not found for userId ${userId}, circleId ${circleId}`);
          }
        }
        break;

      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });

  } catch (err) {
    console.error("Stripe Webhook Processing Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
