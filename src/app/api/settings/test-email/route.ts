import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendTestSmtpEmail } from "@/lib/mailer";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { targetEmail, customSettings } = body;

    const settings = customSettings || (await db.getSettings());
    const recipient = targetEmail || settings.leadNotificationEmail || settings.officialEmail || "info@saffroncity.org";

    if (!recipient) {
      return NextResponse.json(
        { success: false, message: "Target recipient email is required." },
        { status: 400 }
      );
    }

    const result = await sendTestSmtpEmail(recipient, settings);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: result.message,
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error("Test email API error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "An unexpected error occurred while testing SMTP.",
      },
      { status: 500 }
    );
  }
}
