import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdminAuth } from "@/lib/auth-guard";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const settings = await db.getSettings();
    return NextResponse.json({ success: true, data: settings });
  } catch (error: any) {
    console.error("Settings GET error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load settings" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const auth = await requireAdminAuth(req);
  if (!auth.authenticated) return auth.errorResponse!;

  const user = auth.user;
  const userPerms = Array.isArray(user?.permissions) ? user.permissions : [];
  const allowedPerms = ["settings", "content", "masterplan", "paymentplans", "seo"];
  const hasPerm = user?.role === "SUPER_ADMIN" || allowedPerms.some((p) => userPerms.includes(p as any));

  if (!hasPerm) {
    return NextResponse.json(
      { success: false, message: "Forbidden: Missing permissions to update settings or CMS content" },
      { status: 403 }
    );
  }

  try {
    const body = await req.json();
    const updated = await db.updateSettings(body);
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    console.error("Settings PUT error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update settings" },
      { status: 500 }
    );
  }
}
