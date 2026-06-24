import { NextResponse } from "next/server";
import { verifyUser } from "../../../../../lib/middleware/auth.js";
import { CircleMember } from "../../../../../lib/models/circleMember.js";
import { Circle } from "../../../../../lib/models/circle.js";
import { User } from "../../../../../lib/models/user.js";
import { UserProfile } from "../../../../../lib/models/userProfile.js";
import { Event } from "../../../../../lib/models/event.js";

export async function GET(request) {
  try {
    const { user, error } = await verifyUser(request);
    if (error) return error;

    // 1. Find the user's active circle
    const activeMembership = await CircleMember.findOne({
      where: { userId: user.id, status: 'active' },
    });

    if (!activeMembership) {
      return NextResponse.json({ error: "You are not currently in an active circle." }, { status: 404 });
    }

    // 2. Fetch the full circle details including fellow members and events
    const circleDetails = await Circle.findOne({
      where: { id: activeMembership.circleId },
      include: [
        {
          model: Event,
          as: 'events',
          order: [['date', 'ASC']]
        },
        {
          model: User,
          as: 'members',
          attributes: ['id', 'firstName', 'lastName'],
          through: { where: { status: 'active' }, attributes: [] }, // Only get currently active members
          include: [
            { model: UserProfile, as: 'profile', attributes: ['profileImage', 'bio', 'socialLink'] }
          ]
        }
      ]
    });

    return NextResponse.json({
      message: "Success",
      data: circleDetails
    }, { status: 200 });

  } catch (err) {
    console.error("User My Circle API Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
