import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Admin } from "../../../../lib/models/admin.js";
import { adminLoginSchema } from "../../../../lib/validations/adminAuth.js";
import { connectDB } from "../../../../lib/db.js";

export async function POST(request) {
  try {
    // Ensure DB is connected
    await connectDB();

    let body;
    try {
      body = await request.json();
    } catch (e) {
      return NextResponse.json({ error: "Invalid or missing JSON body" }, { status: 400 });
    }
    
    // Validate input
    const validationResult = adminLoginSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json({ errors: validationResult.error.format() }, { status: 400 });
    }

    const { username, password } = validationResult.data;

    // Find admin by username
    const admin = await Admin.findOne({ where: { username } });
    if (!admin) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, admin.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    // Generate JWT
    const secret = process.env.JWT_SECRET || "super_secret_jwt_key_please_change_in_production";
    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      secret,
      { expiresIn: "1d" } // Token expires in 1 day
    );

    return NextResponse.json({
      message: "Login successful",
      token,
      admin: { id: admin.id, username: admin.username }
    }, { status: 200 });

  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
