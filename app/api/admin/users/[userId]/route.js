import { NextResponse } from "next/server";
import { verifyAdmin } from "../../../../../lib/middleware/auth.js";
import { User } from "../../../../../lib/models/user.js";
import { UserProfile } from "../../../../../lib/models/userProfile.js";
import { UserPreference } from "../../../../../lib/models/userPreference.js";
import { CircleMember } from "../../../../../lib/models/circleMember.js";
import { Circle } from "../../../../../lib/models/circle.js";

export async function GET(request, { params }) {
  try {
    const { user: admin, error } = await verifyAdmin(request);
    if (error) return error;

    const { userId } = await params;

    const user = await User.findOne({
      where: { id: userId },
      attributes: { exclude: ['password'] },
      include: [
        { model: UserProfile, as: 'profile' },
        { model: UserPreference, as: 'preferences' },
        { 
          model: Circle, 
          as: 'circles',
          through: { attributes: ['status', 'exitReason', 'createdAt'] },
          attributes: ['id', 'name', 'type', 'status']
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
