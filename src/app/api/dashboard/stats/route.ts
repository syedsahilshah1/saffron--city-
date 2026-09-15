import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdminAuth } from "@/lib/auth-guard";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const auth = await requireAdminAuth(req, "overview");
  if (!auth.authenticated) return auth.errorResponse!;

  try {
    const stats = await db.getStats();
    const res = NextResponse.json({ success: true, data: stats });
    res.headers.set("Cache-Control", "private, no-cache, no-store, must-revalidate");
    return res;
  } catch (error: any) {
    console.error("Stats GET error:", error);
    const res = NextResponse.json(
      { success: false, message: "Failed to load dashboard statistics" },
      { status: 500 }
    );
    res.headers.set("Cache-Control", "private, no-cache, no-store, must-revalidate");
    return res;
  }
}
