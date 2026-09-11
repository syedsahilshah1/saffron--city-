import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendPasswordResetOtpEmail } from "@/lib/mailer";

export const dynamic = "force-dynamic";

// Request password reset OTP or verify OTP & reset password
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, email, otp, token, newPassword } = body;

    const otpCode = otp || token;

    if (action === "request") {
      if (!email) {
        return NextResponse.json(
          { success: false, message: "Email is required." },
          { status: 400 }
        );
      }

      const result = await db.createPasswordResetRequest(email);

      if (!result.success || !result.token) {
        return NextResponse.json({ success: false, message: result.message }, { status: 404 });
      }

      // Dispatch 6-Digit OTP securely via SMTP Email
      const settings = await db.getSettings();
      const mailResult = await sendPasswordResetOtpEmail(email, result.token, settings);

      if (!mailResult.success) {
        return NextResponse.json(
          {
            success: false,
            message: mailResult.message || "Failed to dispatch verification email. Please check your SMTP settings or try again.",
          },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: `A 6-digit OTP verification code has been sent directly to ${email}. Please check your email inbox.`,
      });
    }

    if (action === "reset") {
      if (!otpCode || !newPassword) {
        return NextResponse.json(
          { success: false, message: "6-digit OTP code and new password are required." },
          { status: 400 }
        );
      }

      if (newPassword.length < 6) {
        return NextResponse.json(
          { success: false, message: "New password must be at least 6 characters long." },
          { status: 400 }
        );
      }

      const result = await db.resetPasswordWithToken(otpCode.trim(), newPassword);

      if (!result.success) {
        return NextResponse.json({ success: false, message: result.message }, { status: 400 });
      }

      return NextResponse.json({
        success: true,
        message: result.message,
      });
    }

    return NextResponse.json(
      { success: false, message: "Invalid action. Use 'request' or 'reset'." },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Forgot password API error:", error);
    return NextResponse.json(
      { success: false, message: "Service error processing password reset." },
      { status: 500 }
    );
  }
}
