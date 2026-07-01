import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/middleware/auth.js";
import { User } from "@/lib/models/index.js";
import { UserProfile } from "@/lib/models/index.js";
import { UserPreference } from "@/lib/models/index.js";
import { CircleMember } from "@/lib/models/index.js";
import { Circle } from "@/lib/models/index.js";
import { Event } from "@/lib/models/index.js";
import { EventAttendance } from "@/lib/models/index.js";
import { updateUserSchema } from "@/lib/validations/admin.js";

export async function GET(request, { params }) {
  try {
    const { user: admin, error } = await verifyAdmin(request);
    if (error) return error;

    const { userId } = await params;

    const user = await User.findOne({
      where: { id: userId },
      attributes: { exclude: ['passwordHash'] },
      include: [
        { model: UserProfile, as: 'profile' },
        { model: UserPreference, as: 'preferences' },
        { 
          model: Circle, 
          as: 'circles',
          through: { attributes: ['status', 'exitReason', 'createdAt'] },
          attributes: ['id', 'name', 'type', 'status']
        },
        {
          model: Event,
          as: 'events',
          through: { attributes: ['rsvpStatus', 'didAttend', 'createdAt'] },
          attributes: ['id', 'title', 'date', 'location']
        }
      ]
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Success",
      data: user
    }, { status: 200 });

  } catch (error) {
    console.error("Admin Get User Details API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { user: admin, error } = await verifyAdmin(request);
    if (error) return error;

    const { userId } = await params;

    const user = await User.findOne({ 
      where: { id: userId },
      attributes: { exclude: ['passwordHash'] }
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await request.json();
    const validationResult = updateUserSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json({ errors: validationResult.error.format() }, { status: 400 });
    }

    const { adminNotes, paymentStatus, accountStatus } = validationResult.data;

    const updates = {};
    if (adminNotes !== undefined) updates.adminNotes = adminNotes;
    if (paymentStatus !== undefined) updates.paymentStatus = paymentStatus;
    if (accountStatus !== undefined) updates.accountStatus = accountStatus;

    await user.update(updates);

    return NextResponse.json({
      message: "User updated successfully",
      data: user
    }, { status: 200 });

  } catch (error) {
    console.error("Admin Update User API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
