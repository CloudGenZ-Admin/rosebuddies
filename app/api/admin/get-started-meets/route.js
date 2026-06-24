import { NextResponse } from "next/server";
import { GetStartedMeet } from "../../../../lib/models/getStartedMeet.js";
import { verifyAdmin } from "../../../../lib/middleware/auth.js";
import { Op } from "sequelize";

export async function GET(request) {
  try {
    const { user, error } = await verifyAdmin(request);
    if (error) return error;

    const url = new URL(request.url);
    const search = url.searchParams.get("search");

    const whereClause = {};
    if (search) {
      whereClause[Op.or] = [
        { email: { [Op.like]: `%${search}%` } },
        { username: { [Op.like]: `%${search}%` } }
      ];
    }

    const meets = await GetStartedMeet.findAll({
      where: whereClause,
      order: [["createdAt", "DESC"]],
      attributes: ["id", "username", "email", "city", "vibe", "createdAt"],
    });

    return NextResponse.json({
      message: "Success",
      count: meets.length,
      data: meets,
    }, { status: 200 });

  } catch (error) {
    console.error("Admin Get-Started Meet API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}