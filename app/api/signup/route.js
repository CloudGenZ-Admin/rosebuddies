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

    const { email, password } = validationResult.data;

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
      email,
      passwordHash,
    });

    // Generate JWT
    const secret = process.env.JWT_SECRET || "super_secret_jwt_key_please_change_in_production";
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: "user" },
      secret,
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      message: "Signup successful",
      token,
      user: { id: newUser.id, email: newUser.email }
    }, { status: 201 });

  } catch (error) {
    console.error("Signup API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
