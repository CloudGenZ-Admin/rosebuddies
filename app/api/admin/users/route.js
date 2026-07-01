import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/middleware/auth.js";
import { User } from "@/lib/models/index.js";
import { UserProfile } from "@/lib/models/index.js";
import { Op } from "sequelize";

export async function GET(request) {
  try {
    const { user: admin, error } = await verifyAdmin(request);
    if (error) return error;

    const url = new URL(request.url);
    const search = url.searchParams.get("search");

    const whereClause = {};
    if (search) {
      whereClause[Op.or] = [
        { email: { [Op.like]: `%${search}%` } },
        { firstName: { [Op.like]: `%${search}%` } },
        { lastName: { [Op.like]: `%${search}%` } }
      ];
    }

    const users = await User.findAll({
      where: whereClause,
      attributes: ["id", "firstName", "lastName", "email", "profileCompleted", "createdAt", "paymentStatus", "accountStatus"],
      include: [
        { model: UserProfile, as: 'profile', attributes: ["phoneNumber"] }
      ],
      order: [["createdAt", "DESC"]]
    });

    return NextResponse.json({
      message: "Success",
      count: users.length,
      data: users
    }, { status: 200 });

  } catch (error) {
    console.error("Admin Users List API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
