import { NextResponse } from "next/server";
import { JoinRequest } from "../../../lib/models/joinRequest.js";
import { joinMovementSchema } from "../../../lib/validations/forms.js";
import { connectDB } from "../../../lib/db.js";

export async function POST(request) {
  try {
    await connectDB();
    
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return NextResponse.json({ error: "Invalid or missing JSON body" }, { status: 400 });
    }

    // Validate input
    const validationResult = joinMovementSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json({ errors: validationResult.error.format() }, { status: 400 });
    }

    const { email, city } = validationResult.data;

    // Optional: Check if email already exists to prevent spam
    const existing = await JoinRequest.findOne({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Email is already registered for the waitlist." }, { status: 400 });
    }

    // Create record
    const newRequest = await JoinRequest.create({ email, city });

    return NextResponse.json({
      message: "Successfully joined the movement!",
      data: { id: newRequest.id, email: newRequest.email, city: newRequest.city }
    }, { status: 201 });

  } catch (error) {
    console.error("Join Movement API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
