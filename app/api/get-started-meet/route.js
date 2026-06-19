import { NextResponse } from "next/server";
import { GetStartedMeet } from "../../../lib/models/getStartedMeet.js";
import { getStartedMeetSchema } from "../../../lib/validations/forms.js";

export async function POST(request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return NextResponse.json({ error: "Invalid or missing JSON body" }, { status: 400 });
    }

    const validationResult = getStartedMeetSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json({ errors: validationResult.error.format() }, { status: 400 });
    }

    const newMeet = await GetStartedMeet.create(validationResult.data);

    return NextResponse.json({ message: "Successfully submitted get-started meet request!", data: newMeet }, { status: 201 });
  } catch (error) {
    console.error("Get Started Meet API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
