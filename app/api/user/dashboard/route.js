import { NextResponse } from "next/server";
import { verifyUser } from "@/lib/middleware/auth.js";
import { CircleMember } from "@/lib/models/index.js";
import { Circle } from "@/lib/models/index.js";
import { Event } from "@/lib/models/index.js";
import { EventAttendance } from "@/lib/models/index.js";
import { Op } from "sequelize";

export async function GET(request) {
  try {
    const { user, error } = await verifyUser(request);
    if (error) return error;

    // 1. Find the user's active circle
    const activeMembership = await CircleMember.findOne({
      where: { userId: user.id, status: 'active' },
      include: [
        { model: Circle, as: 'circle' }
      ]
    });

    if (!activeMembership || !activeMembership.circle) {
      return NextResponse.json({
        message: "Success",
        data: {
          activeCircle: null,
          upcomingEvents: []
        }
      }, { status: 200 });
    }

    const circleId = activeMembership.circle.id;

    // 2. Fetch upcoming events for this circle
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

    const upcomingEvents = await Event.findAll({
      where: {
        circleId: circleId,
        date: {
          [Op.between]: [new Date(), thirtyDaysFromNow]
        }
      },
      order: [["date", "ASC"]],
      include: [
        { 
          model: EventAttendance, 
          as: 'attendances',
          where: { userId: user.id },
          required: false // LEFT JOIN so we still get the event even if they haven't RSVP'd
        }
      ]
    });

    // Format the response for the frontend
    const formattedEvents = upcomingEvents.map(evt => {
      const attendanceRecord = evt.attendances && evt.attendances.length > 0 ? evt.attendances[0] : null;
      return {
        id: evt.id,
        title: evt.title,
        date: evt.date,
        location: evt.location,
        eventImg: evt.eventImg,
        userRsvpStatus: attendanceRecord ? attendanceRecord.rsvpStatus : "pending" // Let frontend know they need to RSVP
      };
    });

    return NextResponse.json({
      message: "Success",
      data: {
        activeCircle: activeMembership.circle,
        upcomingEvents: formattedEvents
      }
    }, { status: 200 });

  } catch (err) {
    console.error("User Dashboard API Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}