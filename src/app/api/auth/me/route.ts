import { NextRequest, NextResponse } from "next/server";
import { db, verifyUserSessionToken } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("Authorization");
    const cookieToken = req.cookies.get("saffron_session_token")?.value;

    const token = authHeader?.replace("Bearer ", "") || cookieToken;

    if (!token) {
      const res = NextResponse.json(
        { success: false, message: "No active session found" },
        { status: 401 }
      );
      res.headers.set("Cache-Control", "private, no-cache, no-store, must-revalidate");
      return res;
    }

    const { valid, userId } = verifyUserSessionToken(token);

    if (!valid || !userId) {
      const res = NextResponse.json(
        { success: false, message: "Invalid or expired session token" },
        { status: 401 }
      );
      res.headers.set("Cache-Control", "private, no-cache, no-store, must-revalidate");
      return res;
    }

    const user = await db.getUserById(userId);

    if (!user || !user.isActive) {
      const res = NextResponse.json(
        { success: false, message: "User account not found or deactivated" },
        { status: 401 }
      );
      res.headers.set("Cache-Control", "private, no-cache, no-store, must-revalidate");
      return res;
    }

    const res = NextResponse.json({
      success: true,
      user,
    });
    res.headers.set("Cache-Control", "private, no-cache, no-store, must-revalidate");
    return res;
  } catch (error: any) {
    console.error("Auth me error:", error);
    const res = NextResponse.json(
      { success: false, message: "Failed to verify session" },
      { status: 500 }
    );
    res.headers.set("Cache-Control", "private, no-cache, no-store, must-revalidate");
    return res;
  }
}
