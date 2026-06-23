import { NextResponse } from "next/server";
import { VibeCheck } from "../../../../../lib/models/vibeCheck.js";
import { verifyAdmin } from "../../../../../lib/middleware/auth.js";

export async function GET(request) {
  try {
    const { user, error } = await verifyAdmin(request);
    if (error) return error;

    const vibeChecks = await VibeCheck.findAll({
      order: [["createdAt", "DESC"]],
      attributes: ["id", "answers", "createdAt"],
    });

    // Flatten the answers for a data table
    const flattenedData = vibeChecks.map(check => {
      let parsed = check.answers;
      if (typeof parsed === 'string') {
        try { parsed = JSON.parse(parsed); } catch(e) {}
      }
      
      const flatRow = {
        id: check.id,
        createdAt: check.createdAt,
        step1: "-",
        step2: "-",
        step3: "-",
        step4: "-",
        step5: "-"
      };

      if (Array.isArray(parsed)) {
        parsed.forEach(q => {
          if (q.question && q.responses && Array.isArray(q.responses)) {
            flatRow[`step${q.question}`] = q.responses.join(", ");
          }
        });
      }

      return flatRow;
    });

    return NextResponse.json({
      message: "Success",
      count: flattenedData.length,
      data: flattenedData,
    }, { status: 200 });

  } catch (error) {
    console.error("Admin Vibe Check Individual API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
