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

    // 1. Find ALL of the user's active circle memberships (Use findAll instead of findOne)
    const activeMemberships = await CircleMember.findAll({
      where: { userId: user.id, status: 'active' },
    });

    // Agar user kisi circle mein nahi hai, toh 404 error ki jagah empty array bhejein
    // Taaki aapka frontend "You're Not in a Circle Yet!" wala UI dikha sake
    if (!activeMemberships || activeMemberships.length === 0) {
      return NextResponse.json({ message: "Success", data: [] }, { status: 200 });
    }

    // Ek array banayein jisme user ke saare Circle IDs hon
    const circleIds = activeMemberships.map(membership => membership.circleId);

    // 2. Fetch the full circle details for ALL those circle IDs (Use findAll)
    const circlesDetails = await Circle.findAll({
      where: { id: circleIds }, // Yeh saare joined circles nikal layega
      include: [
        {
          model: Event,
          as: 'events',
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
      ],
      order: [
        // Events ko date ke hisaab se sort karne ke liye
        [{ model: Event, as: 'events' }, 'date', 'ASC']
      ]
    });

    return NextResponse.json({
      message: "Success",
      data: circlesDetails
    }, { status: 200 });

  } catch (err) {
    console.error("User My Circle API Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}