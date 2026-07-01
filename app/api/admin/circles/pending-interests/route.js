import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/middleware/auth.js";
import { CircleMember } from "@/lib/models/index.js";
import { Circle } from "@/lib/models/index.js";
import { User } from "@/lib/models/index.js";

export async function GET(request) {
  try {
    const { user: admin, error } = await verifyAdmin(request);
    if (error) return error;

    // Fetch all CircleMembers where status is "interested"
    const pendingInterests = await CircleMember.findAll({
      where: { status: 'interested' },
      order: [["createdAt", "DESC"]],
      include: [
        { 
          model: User, 
          as: 'user',
          attributes: ['id', 'firstName', 'lastName', 'email'] 
        },
        {
          model: Circle,
          as: 'circle',
          attributes: ['id', 'name', 'type', 'status']
        }
      ]
    });

    return NextResponse.json({
      message: "Success",
      count: pendingInterests.length,
      data: pendingInterests
    }, { status: 200 });

  } catch (error) {
    console.error("Admin Pending Interests API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
