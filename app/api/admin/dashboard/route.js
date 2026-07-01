import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/middleware/auth.js";
import { User } from "@/lib/models/index.js";
import { Circle } from "@/lib/models/index.js";
import { Event } from "@/lib/models/index.js";
import { Op } from "sequelize";

export async function GET(request) {
  try {
    const { user: admin, error } = await verifyAdmin(request);
    if (error) return error;

    // 1. Total Active Users
    const usersCount = await User.count();

    // 2. Running Circles
    const circlesCount = await Circle.count({ where: { status: 'active' } });

    // 3. Upcoming Events (next 30 days)
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

    const upcomingEvents = await Event.findAll({
      where: {
        date: {
          [Op.between]: [new Date(), thirtyDaysFromNow]
        }
      },
      order: [["date", "ASC"]],
      limit: 10, // Just fetch next 10 for the dashboard
      include: [
        { model: Circle, as: "circle", attributes: ["name"] } // Include circle name if it's a private event
      ]
    });

    return NextResponse.json({
      message: "Success",
      data: {
        totalUsers: usersCount,
        activeCircles: circlesCount,
        upcomingEvents: upcomingEvents
      }
    }, { status: 200 });

  } catch (error) {
    console.error("Admin Dashboard Stats API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
