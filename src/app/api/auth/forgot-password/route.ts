import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

// Request password reset token or reset with token
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, email, token, newPassword } = body;

    if (action === "request") {
      if (!email) {
        return NextResponse.json(
          { success: false, message: "Email is required." },
          { status: 400 }
        );
      }

      const result = await db.createPasswordResetRequest(email);

      if (!result.success) {
        return NextResponse.json({ success: false, message: result.message }, { status: 404 });
      }

      console.log(`[Forgot Password] Reset token generated for ${email}: ${result.token}`);

      return NextResponse.json({
        success: true,
        message: "Password reset link and verification code generated successfully.",
        token: result.token, // Returned for UI testing / preview
      });
    }

    if (action === "reset") {
      if (!token || !newPassword) {
        return NextResponse.json(
          { success: false, message: "Reset token and new password are required." },
          { status: 400 }
        );
      }

      if (newPassword.length < 6) {
        return NextResponse.json(
          { success: false, message: "New password must be at least 6 characters long." },
          { status: 400 }
        );
      }

      const result = await db.resetPasswordWithToken(token, newPassword);

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
