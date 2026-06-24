import { NextResponse } from "next/server";
import { FooterSubscriber } from "@/lib/models/footerSubscriber.js";
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

    const subscribers = await FooterSubscriber.findAll({
      where: whereClause,
      order: [["createdAt", "DESC"]],
      attributes: ["id", "username", "email", "message", "createdAt"],
    });

    return NextResponse.json({
      message: "Success",
      count: subscribers.length,
      data: subscribers,
    }, { status: 200 });

  } catch (error) {
    console.error("Admin Footer API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}