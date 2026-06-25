import { NextResponse } from "next/server";
import { verifyUser } from "../../../../lib/middleware/auth.js";
import { UserPreference } from "../../../../lib/models/userPreference.js";
import { userPreferenceSchema } from "../../../../lib/validations/userAuth.js";

export async function GET(request) {
  try {
    const { user, error } = await verifyUser(request);
    if (error) return error;

    const preference = await UserPreference.findOne({ where: { userId: user.id } });
    
    return NextResponse.json({
      quizAnswers: preference ? preference.quizAnswers : []
    }, { status: 200 });

  } catch (error) {
    console.error("Fetch Preferences API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { user, error } = await verifyUser(request);
    if (error) return error;

    let body;
    try {
      body = await request.json();
    } catch (e) {
      return NextResponse.json({ error: "Invalid or missing JSON body" }, { status: 400 });
    }

    const { quizAnswers } = body;

    const validationResult = userPreferenceSchema.safeParse({ quizAnswers });
    if (!validationResult.success) {
      return NextResponse.json({ errors: validationResult.error.format() }, { status: 400 });
    }

    // Upsert the preferences
    let preference = await UserPreference.findOne({ where: { userId: user.id } });
    
    if (preference) {
      preference.quizAnswers = quizAnswers;
      await preference.save();
    } else {
      preference = await UserPreference.create({
        userId: user.id,
        quizAnswers: quizAnswers
      });
    }

    return NextResponse.json({
      message: "Preferences saved successfully",
      quizAnswers: preference.quizAnswers
    }, { status: 200 });

  } catch (error) {
    console.error("Save Preferences API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}