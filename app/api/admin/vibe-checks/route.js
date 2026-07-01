import { NextResponse } from "next/server";
import { VibeCheck } from "@/lib/models/index.js";
import { verifyAdmin } from "@/lib/middleware/auth.js";

export async function GET(request) {
  try {
    const { user, error } = await verifyAdmin(request);
    if (error) return error;

    const vibeChecks = await VibeCheck.findAll({
      order: [["createdAt", "DESC"]],
      attributes: ["id", "answers", "createdAt"],
    });

    return NextResponse.json({
      message: "Success",
      count: vibeChecks.length,
      data: vibeChecks,
    }, { status: 200 });

  } catch (error) {
    console.error("Admin Vibe Check API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
