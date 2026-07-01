import { NextResponse } from "next/server";
import { verifyUser } from "@/lib/middleware/auth.js";
import { Circle } from "@/lib/models/index.js";
import { Event } from "@/lib/models/index.js";
import { CircleMember } from "@/lib/models/index.js";

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

    // Get the logged-in user's memberships to see if they've already expressed interest
    const userMemberships = await CircleMember.findAll({
      where: { userId: user.id }
    });

    const membershipMap = {};
    userMemberships.forEach(m => {
      membershipMap[m.circleId] = m.status;
    });

    // Map over the forming circles to append the userStatus
    const formattedCircles = formingCircles.map(c => {
      const plainCircle = c.toJSON();
      plainCircle.userStatus = membershipMap[c.id] || null;
      return plainCircle;
    });

    return NextResponse.json({
      message: "Success",
      data: formattedCircles
    }, { status: 200 });

  } catch (err) {
    console.error("User Explore Circles API Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
