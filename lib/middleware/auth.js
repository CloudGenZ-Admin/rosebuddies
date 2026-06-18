import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function verifyAdmin(request) {
  try {
    const authHeader = request.headers.get("authorization");
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return { user: null, error: NextResponse.json({ error: "Missing or invalid authorization token" }, { status: 401 }) };
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET || "super_secret_jwt_key_please_change_in_production";
    
    const decoded = jwt.verify(token, secret);
    
    // In a real app, you might want to fetch the admin from DB to ensure they still exist
    // But for a simple use case, verifying the token is enough
    return { user: decoded, error: null };
  } catch (error) {
    return { user: null, error: NextResponse.json({ error: "Unauthorized or expired token" }, { status: 401 }) };
  }
}
