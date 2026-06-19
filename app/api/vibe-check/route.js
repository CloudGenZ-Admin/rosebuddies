import { NextResponse } from "next/server";
import { VibeCheck } from "../../../lib/models/vibeCheck.js";
import { vibeCheckSchema } from "../../../lib/validations/forms.js";

export async function POST(request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return NextResponse.json({ error: "Invalid or missing JSON body" }, { status: 400 });
    }

    const validationResult = vibeCheckSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json({ errors: validationResult.error.format() }, { status: 400 });
    }

    const newVibeCheck = await VibeCheck.create(validationResult.data);

    return NextResponse.json({ message: "Successfully submitted vibe check!", data: newVibeCheck }, { status: 201 });
  } catch (error) {
    console.error("Vibe Check API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
