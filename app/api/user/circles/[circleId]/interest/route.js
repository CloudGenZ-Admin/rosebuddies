import { NextResponse } from "next/server";
import { verifyUser } from "../../../../../../lib/middleware/auth.js";
import { Circle } from "../../../../../../lib/models/circle.js";
import { CircleMember } from "../../../../../../lib/models/circleMember.js";

export async function POST(request, { params }) {
  try {
    const { user, error } = await verifyUser(request);
    if (error) return error;

    const { circleId } = await params;

    const circle = await Circle.findByPk(circleId);
    if (!circle) {
      return NextResponse.json({ error: "Circle not found" }, { status: 404 });
    }

    // Check if they are already in the circle (or already expressed interest)
    const existingMembership = await CircleMember.findOne({
      where: { userId: user.id, circleId: circle.id }
    });

    if (existingMembership) {
      return NextResponse.json({ error: `You are already marked as ${existingMembership.status} for this circle.` }, { status: 400 });
    }

    // Create a new membership record with "interested" status
    const newInterest = await CircleMember.create({
      userId: user.id,
      circleId: circle.id,
      status: 'interested'
    });

    return NextResponse.json({
      message: "Interest expressed successfully! Admin will review your profile.",
      data: newInterest
    }, { status: 201 });

  } catch (err) {
    console.error("User Express Interest API Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
