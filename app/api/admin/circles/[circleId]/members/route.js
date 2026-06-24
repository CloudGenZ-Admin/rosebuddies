import { NextResponse } from "next/server";
import { verifyAdmin } from "../../../../../../lib/middleware/auth.js";
import { Circle } from "../../../../../../lib/models/circle.js";
import { CircleMember } from "../../../../../../lib/models/circleMember.js";
import { User } from "../../../../../../lib/models/user.js";

export async function POST(request, { params }) {
  try {
    const { user: admin, error } = await verifyAdmin(request);
    if (error) return error;

    const { circleId } = await params;

    const circle = await Circle.findByPk(circleId);
    if (!circle) {
      return NextResponse.json({ error: "Circle not found" }, { status: 404 });
    }

    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    // Verify user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if already a member
    const existingMember = await CircleMember.findOne({
      where: { circleId, userId }
    });

    if (existingMember) {
      // If they left previously, just reactivate them
      if (existingMember.status !== 'active') {
        await existingMember.update({ status: 'active', exitReason: null });
        return NextResponse.json({ message: "Member reactivated", data: existingMember }, { status: 200 });
      }
      return NextResponse.json({ error: "User is already an active member of this circle" }, { status: 400 });
    }

    const member = await CircleMember.create({
      circleId,
      userId,
      status: "active"
    });

    return NextResponse.json({
      message: "Member added successfully",
      data: member
    }, { status: 201 });

  } catch (err) {
    console.error("Admin Add Member API Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { user: admin, error } = await verifyAdmin(request);
    if (error) return error;

    const { circleId } = await params;
    
    // We expect the userId to be passed as a query param or in the body.
    // For DELETE requests, standard practice is to use URL structure or query params.
    // E.g. /api/admin/circles/[circleId]/members?userId=123
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "userId query parameter is required" }, { status: 400 });
    }

    const member = await CircleMember.findOne({
      where: { circleId, userId }
    });

    if (!member) {
      return NextResponse.json({ error: "Member not found in this circle" }, { status: 404 });
    }

    // Instead of actually deleting the row, we might want to update status to 'left' 
    // to preserve history. Let's get the exitReason from query if provided.
    const exitReason = url.searchParams.get("exitReason") || "Removed by Admin";

    await member.update({
      status: "left",
      exitReason: exitReason
    });

    return NextResponse.json({
      message: "Member removed from circle successfully"
    }, { status: 200 });

  } catch (err) {
    console.error("Admin Remove Member API Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
