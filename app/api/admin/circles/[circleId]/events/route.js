import { NextResponse } from "next/server";
import { verifyAdmin } from "../../../../../../lib/middleware/auth.js";
import { Circle } from "../../../../../../lib/models/circle.js";
import { Event } from "../../../../../../lib/models/event.js";
import { createEventSchema } from "../../../../../../lib/validations/admin.js";
import { saveUploadedFile } from "../../../../../../lib/utils/uploadService.js";

export async function POST(request, { params }) {
  try {
    const { user, error } = await verifyAdmin(request);
    if (error) return error;

    const { circleId } = await params;

    // Verify the circle exists
    const circle = await Circle.findByPk(circleId);
    if (!circle) {
      return NextResponse.json({ error: "Circle not found" }, { status: 404 });
    }

    const formData = await request.formData();
    
    const payload = {
      title: formData.get("title"),
      date: formData.get("date"),
      location: formData.get("location"),
      description: formData.get("description") || null,
      capacity: formData.get("capacity") || null,
      price: formData.get("price") || null,
    };

    const validationResult = createEventSchema.safeParse(payload);
    if (!validationResult.success) {
      return NextResponse.json({ errors: validationResult.error.format() }, { status: 400 });
    }

    // 1. Create the Event linked to the Circle
    const event = await Event.create({
      circleId: circle.id,
      title: payload.title,
      date: payload.date,
      location: payload.location,
      description: payload.description,
      capacity: payload.capacity ? parseInt(payload.capacity, 10) : null,
      price: payload.price ? parseFloat(payload.price) : null,
    });

    // 2. Handle Event Image Upload
    const imageFile = formData.get("eventImg");
    if (imageFile && typeof imageFile === 'object' && imageFile.name) {
      // Save into public/uploads/[eventId]/
      const uploadResult = await saveUploadedFile(imageFile, event.id, 5); 
      
      if (uploadResult.error) {
        return NextResponse.json({ error: uploadResult.error }, { status: 400 });
      }

      await event.update({ eventImg: uploadResult.fileName });
    }

    return NextResponse.json({
      message: "Event created successfully",
      data: event
    }, { status: 201 });

  } catch (err) {
    console.error("Admin Create Event API Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
