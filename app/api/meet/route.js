import { NextResponse } from "next/server";
import { MeetPerson } from "@/lib/models/index.js";
import { meetPersonSchema } from "@/lib/validations/forms.js";

export async function POST(request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return NextResponse.json({ error: "Invalid or missing JSON body" }, { status: 400 });
    }

    const validationResult = meetPersonSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json({ errors: validationResult.error.format() }, { status: 400 });
    }

    const newPerson = await MeetPerson.create(validationResult.data);

    return NextResponse.json({ message: "Successfully submitted!", data: newPerson }, { status: 201 });
  } catch (error) {
    console.error("Meet Person API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
