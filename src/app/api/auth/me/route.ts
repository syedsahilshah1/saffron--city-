import { NextRequest, NextResponse } from "next/server";
import { db, verifyUserSessionToken } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("Authorization");
    const cookieToken = req.cookies.get("saffron_session_token")?.value;

    const token = authHeader?.replace("Bearer ", "") || cookieToken;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "No active session found" },
        { status: 401 }
      );
    }

    const { valid, userId, email } = verifyUserSessionToken(token);

    if (!valid || !userId) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired session token" },
        { status: 401 }
      );
    }

    const user = await db.getUserById(userId);

    if (!user || !user.isActive) {
      return NextResponse.json(
        { success: false, message: "User account not found or deactivated" },
        { status: 401 }
      );
    }

    const { passwordHash, salt, ...safeUser } = user;

    return NextResponse.json({
      success: true,
      user: safeUser,
    });
  } catch (error: any) {
    console.error("Auth me error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to verify session" },
      { status: 500 }
    );
  }
}
