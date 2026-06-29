import { NextResponse } from "next/server";
import { verifyUser } from "../../../../../lib/middleware/auth.js";
import { CircleMember } from "../../../../../lib/models/circleMember.js";
import { Circle } from "../../../../../lib/models/circle.js";
import { User } from "../../../../../lib/models/user.js";
import { UserProfile } from "../../../../../lib/models/userProfile.js";
import { Event } from "../../../../../lib/models/event.js";


import { EventAttendance } from "../../../../../lib/models/eventAttendance.js";

export async function GET(request) {
  try {
    const { user, error } = await verifyUser(request);
    if (error) return error;

    // 1. Find ALL of the user's active circle memberships
    const activeMemberships = await CircleMember.findAll({
      where: { userId: user.id, status: 'active' },
    });

    if (!activeMemberships || activeMemberships.length === 0) {
      return NextResponse.json({ message: "Success", data: [] }, { status: 200 });
    }

    const circleIds = activeMemberships.map(membership => membership.circleId);

    // 2. Fetch the full circle details for ALL those circle IDs
    const circlesDetails = await Circle.findAll({
      where: { id: circleIds },
      include: [
        {
          model: Event,
          as: 'events',
          include: [
           
            {
              model: EventAttendance,
              as: 'attendances', 
              where: { userId: user.id }, 
              required: false 
            }
          ]
        },
        {
          model: User,
          as: 'members',
          attributes: ['id', 'firstName', 'lastName'],
          through: { where: { status: 'active' }, attributes: [] },
          include: [
            { model: UserProfile, as: 'profile', attributes: ['profileImage', 'bio', 'socialLink'] }
          ]
        }
      ],
      order: [
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