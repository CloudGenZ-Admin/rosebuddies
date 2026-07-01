import { NextResponse } from "next/server";
import { JoinRequest } from "@/lib/models/index.js";
import { verifyAdmin } from "@/lib/middleware/auth.js";

export async function GET(request) {
  try {
    // 1. Verify admin token
    const { user, error } = await verifyAdmin(request);
    if (error) {
      return error; // Returns the 401 response from the middleware
    }

    // 3. Fetch all requests, ordered by newest first
    const requests = await JoinRequest.findAll({
      order: [["createdAt", "DESC"]],
      attributes: ["id", "email", "city", "createdAt"],
    });

    return NextResponse.json({
      message: "Success",
      count: requests.length,
      data: requests,
    }, { status: 200 });

  } catch (error) {
    console.error("Admin Join-Requests API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
