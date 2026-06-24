import { NextResponse } from "next/server";
import { verifyUser } from "../../../../../../lib/middleware/auth.js";
import { Event } from "../../../../../../lib/models/event.js";
import { EventAttendance } from "../../../../../../lib/models/eventAttendance.js";

export async function POST(request, { params }) {
  try {
    const { user, error } = await verifyUser(request);
    if (error) return error;

    const { eventId } = await params;

    const event = await Event.findByPk(eventId);
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const body = await request.json();
    const { rsvpStatus } = body;

    if (!["going", "not_going", "maybe"].includes(rsvpStatus)) {
      return NextResponse.json({ error: "Invalid rsvpStatus. Must be going, not_going, or maybe." }, { status: 400 });
    }

    // Upsert the attendance record
    const [attendance, created] = await EventAttendance.findOrCreate({
      where: { eventId: event.id, userId: user.id },
      defaults: {
        rsvpStatus: rsvpStatus
      }
    });

    if (!created) {
      await attendance.update({ rsvpStatus });
    }

    return NextResponse.json({
      message: "RSVP updated successfully",
      data: attendance
    }, { status: 200 });

  } catch (err) {
    console.error("User Event RSVP API Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
