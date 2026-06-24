import { NextResponse } from "next/server";
import { verifyAdmin } from "../../../../lib/middleware/auth.js";
import { Circle } from "../../../../lib/models/circle.js";
import { CircleMember } from "../../../../lib/models/circleMember.js";
import { Event } from "../../../../lib/models/event.js";
import { createCircleSchema } from "../../../../lib/validations/admin.js";
import { saveUploadedFile } from "../../../../lib/utils/uploadService.js";
import { sequelize } from "../../../../lib/db.js";

export async function GET(request) {
  try {
    const { user, error } = await verifyAdmin(request);
    if (error) return error;

    // Fetch all circles and include counts for members and events
    const circles = await Circle.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        { model: Event, as: "events", attributes: ["id"] },
      ]
    });

    return NextResponse.json({
      message: "Success",
      data: circles
    }, { status: 200 });

  } catch (error) {
    console.error("Admin List Circles API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { user, error } = await verifyAdmin(request);
    if (error) return error;

    const formData = await request.formData();
    
    const payload = {
      name: formData.get("name"),
      type: formData.get("type"),
      status: formData.get("status") || "forming",
      startDate: formData.get("startDate") || null,
      endDate: formData.get("endDate") || null,
      description: formData.get("description") || null,
    };

    const validationResult = createCircleSchema.safeParse(payload);
    if (!validationResult.success) {
      return NextResponse.json({ errors: validationResult.error.format() }, { status: 400 });
    }

    // 1. Create the Circle to generate the UUID
    const circle = await Circle.create(payload);

    // 2. Handle Image Upload if present
    const imageFile = formData.get("img");
    if (imageFile && typeof imageFile === 'object' && imageFile.name) {
      // Save into public/uploads/[circleId]/
      const uploadResult = await saveUploadedFile(imageFile, circle.id, 5); // 5MB limit
      
      if (uploadResult.error) {
        // If image upload fails, you could decide to delete the circle or just return a warning
        return NextResponse.json({ error: uploadResult.error }, { status: 400 });
      }

      // Update the circle with the raw filename
      await circle.update({ img: uploadResult.fileName });
    }

    return NextResponse.json({
      message: "Circle created successfully",
      data: circle
    }, { status: 201 });

  } catch (err) {
    console.error("Admin Create Circle API Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
