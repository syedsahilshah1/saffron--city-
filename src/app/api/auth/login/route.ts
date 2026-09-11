import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, email, password } = body;

    const identifier = email || username;

    if (!identifier || !password) {
      return NextResponse.json(
        { success: false, message: "Email/username and password are required." },
        { status: 400 }
      );
    }

    const authResult = await db.authenticateUser(identifier, password);

    if (!authResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: authResult.message,
          locked: authResult.locked || false,
          lockExpiresAt: authResult.lockExpiresAt,
          remainingMinutes: authResult.remainingMinutes,
          attemptsLeft: authResult.attemptsLeft,
        },
        { status: authResult.locked ? 423 : 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "Authentication successful",
      user: authResult.user,
      token: authResult.token,
    });

    // Set secure HTTP-only / TLS session cookie
    if (authResult.token) {
      response.cookies.set("saffron_session_token", authResult.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: "/",
      });
    }

    return response;
  } catch (error: any) {
    console.error("Login API detailed error:", error?.message, error?.stack);
    return NextResponse.json(
      { success: false, message: error?.message || "Authentication service error. Please try again." },
      { status: 500 }
    );
  }
}
