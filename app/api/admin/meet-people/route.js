import { NextResponse } from "next/server";
import { MeetPerson } from "../../../../lib/models/meetPerson.js";
import { verifyAdmin } from "../../../../lib/middleware/auth.js";

export async function GET(request) {
  try {
    const { user, error } = await verifyAdmin(request);
    if (error) return error;

    const people = await MeetPerson.findAll({
      order: [["createdAt", "DESC"]],
      attributes: ["id", "username", "email", "city", "vibe", "createdAt"],
    });

    return NextResponse.json({
      message: "Success",
      count: people.length,
      data: people,
    }, { status: 200 });

  } catch (error) {
    console.error("Admin Meet Person API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
