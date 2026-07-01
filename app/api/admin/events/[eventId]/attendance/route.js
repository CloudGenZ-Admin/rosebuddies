import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/middleware/auth.js";
import { EventAttendance } from "@/lib/models/index.js";
import { Event } from "@/lib/models/index.js";
import { User } from "@/lib/models/index.js";

export async function GET(request, { params }) {
  try {
    const { user: admin, error } = await verifyAdmin(request);
    if (error) return error;

    const { eventId } = await params;

    const eventWithAttendees = await Event.findOne({
      where: { id: eventId },
      include: [
        { 
          model: User, 
          as: 'attendees',
          attributes: ['id', 'firstName', 'lastName', 'email'],
          through: { attributes: ['rsvpStatus', 'didAttend'] }
        }
      ]
    });

    if (!eventWithAttendees) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Success",
      data: eventWithAttendees.attendees
    }, { status: 200 });

  } catch (err) {
    console.error("Admin Get Attendance API Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { user: admin, error } = await verifyAdmin(request);
    if (error) return error;

    const { eventId } = await params;
    const body = await request.json();

    // Expecting an array of attendance updates: 
    // [{ userId: 1, didAttend: true }, ...]
    const { attendanceRecords } = body;

    if (!Array.isArray(attendanceRecords)) {
      return NextResponse.json({ error: "attendanceRecords must be an array" }, { status: 400 });
    }

    // Update each record
    // In a real production app with massive records, a bulk insertion/update mechanism would be better,
    // but a Promise.all map is perfectly fine for small groups (5-20 people).
    const updatePromises = attendanceRecords.map(async (record) => {
      const { userId, didAttend } = record;
      
      const [attendance, created] = await EventAttendance.findOrCreate({
        where: { eventId, userId },
        defaults: {
          didAttend: didAttend !== undefined ? didAttend : false,
          rsvpStatus: 'going' // Default assuming if admin marks them, they were supposed to be going
        }
      });

      if (!created) {
        return attendance.update({
          didAttend: didAttend !== undefined ? didAttend : attendance.didAttend
        });
      }
      return attendance;
    });

    await Promise.all(updatePromises);

    return NextResponse.json({
      message: "Attendance updated successfully"
    }, { status: 200 });

  } catch (err) {
    console.error("Admin Update Attendance API Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
