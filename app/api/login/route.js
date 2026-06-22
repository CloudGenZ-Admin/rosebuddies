import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { User } from "../../../lib/models/user.js";
import { userLoginSchema } from "../../../lib/validations/userAuth.js";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return NextResponse.json({ error: "Invalid or missing JSON body" }, { status: 400 });
    }

    const validationResult = userLoginSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json({ errors: validationResult.error.format() }, { status: 400 });
    }

    const { email, password } = validationResult.data;

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Check if user has a password (they might have only signed up via Firebase)
    if (!user.passwordHash) {
      if (user.firebaseUid) {
        return NextResponse.json({ 
          error: "This account was created using Google Sign-In. Please use Google to log in." 
        }, { status: 401 });
      }
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Generate JWT
    const secret = process.env.JWT_SECRET || "super_secret_jwt_key_please_change_in_production";
    const token = jwt.sign(
      { id: user.id, email: user.email, role: "user" },
      secret,
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      message: "Login successful",
      token,
      user: { 
        id: user.id, 
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profileCompleted: user.profileCompleted 
      }
    }, { status: 200 });

  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
