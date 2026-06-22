import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { User } from "../../../lib/models/user.js";
import { userSignupSchema } from "../../../lib/validations/userAuth.js";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return NextResponse.json({ error: "Invalid or missing JSON body" }, { status: 400 });
    }

    const validationResult = userSignupSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json({ errors: validationResult.error.format() }, { status: 400 });
    }

    const { firstName, lastName, email, password } = validationResult.data;

    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Email is already registered" }, { status: 400 });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      passwordHash,
    });

    return NextResponse.json({
      message: "Signup successful. Please log in.",
      user: { 
        id: newUser.id, 
        email: newUser.email, 
        firstName: newUser.firstName, 
        lastName: newUser.lastName,
        profileCompleted: newUser.profileCompleted 
      }
    }, { status: 201 });

  } catch (error) {
    console.error("Signup API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
