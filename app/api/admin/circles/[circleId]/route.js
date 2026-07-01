import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/middleware/auth.js";
import { Circle } from "@/lib/models/index.js";
import { CircleMember } from "@/lib/models/index.js";
import { Event } from "@/lib/models/index.js";
import { User } from "@/lib/models/index.js";
import { createCircleSchema } from "@/lib/validations/admin.js";
import { saveUploadedFile } from "@/lib/utils/uploadService.js";

export async function GET(request, { params }) {
  try {
    const { user, error } = await verifyAdmin(request);
    if (error) return error;

    const { circleId } = await params;

    const circle = await Circle.findOne({
      where: { id: circleId },
      include: [
        { 
          model: User, 
          as: "members",
          through: { attributes: ['status', 'exitReason'] }, // Include join table fields
          attributes: ['id', 'firstName', 'lastName', 'email', 'profileCompleted'] 
        },
        { 
          model: Event, 
          as: "events",
          order: [["date", "ASC"]]
        }
      ]
    });

    if (!circle) {
      return NextResponse.json({ error: "Circle not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Success",
      data: circle
    }, { status: 200 });

  } catch (error) {
    console.error("Admin Get Circle API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { user, error } = await verifyAdmin(request);
    if (error) return error;

    const { circleId } = await params;
    const circle = await Circle.findByPk(circleId);

    if (!circle) {
      return NextResponse.json({ error: "Circle not found" }, { status: 404 });
    }

    const formData = await request.formData();
    
    // Extract only provided fields (don't overwrite with null if not provided)
    const payload = {};
    if (formData.has("name")) payload.name = formData.get("name");
    if (formData.has("type")) payload.type = formData.get("type");
    if (formData.has("status")) payload.status = formData.get("status");
    if (formData.has("startDate")) payload.startDate = formData.get("startDate");
    if (formData.has("endDate")) payload.endDate = formData.get("endDate");
    if (formData.has("description")) payload.description = formData.get("description");

    const validationResult = createCircleSchema.partial().safeParse(payload);
    if (!validationResult.success) {
      return NextResponse.json({ errors: validationResult.error.format() }, { status: 400 });
    }

    // Handle Image Upload if present
    const imageFile = formData.get("img");
    if (imageFile && typeof imageFile === 'object' && imageFile.name) {
      const uploadResult = await saveUploadedFile(imageFile, circle.id, 5); 
      if (uploadResult.error) {
        return NextResponse.json({ error: uploadResult.error }, { status: 400 });
      }
      payload.img = uploadResult.fileName;
    }

    await circle.update(payload);

    return NextResponse.json({
      message: "Circle updated successfully",
      data: circle
    }, { status: 200 });

  } catch (err) {
    console.error("Admin Update Circle API Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
