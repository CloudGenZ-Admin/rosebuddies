import { NextResponse } from "next/server";
import { verifyUser } from "../../../../../lib/middleware/auth.js";
import { Circle } from "../../../../../lib/models/circle.js";
import { Event } from "../../../../../lib/models/event.js";

export async function GET(request) {
  try {
    const { user, error } = await verifyUser(request);
    if (error) return error;

    // Fetch all circles that are currently forming
    // Explicitly do NOT include the User models here to protect privacy per design requirements!
    const formingCircles = await Circle.findAll({
      where: { status: 'forming' },
      order: [["createdAt", "DESC"]],
      include: [
        { 
          model: Event, 
          as: 'events',
          attributes: ['id', 'title', 'date', 'location'] 
        }
      ]
    });

    return NextResponse.json({
      message: "Success",
      data: formingCircles
    }, { status: 200 });

  } catch (err) {
    console.error("User Explore Circles API Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
