import { NextResponse } from "next/server";
import { FooterSubscriber } from "../../../lib/models/footerSubscriber.js";
import { footerSubscriberSchema } from "../../../lib/validations/forms.js";

export async function POST(request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return NextResponse.json({ error: "Invalid or missing JSON body" }, { status: 400 });
    }

    const validationResult = footerSubscriberSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json({ errors: validationResult.error.format() }, { status: 400 });
    }

    const newSubscriber = await FooterSubscriber.create(validationResult.data);

    return NextResponse.json({ message: "Successfully subscribed!", data: newSubscriber }, { status: 201 });
  } catch (error) {
    console.error("Footer Subscribe API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
