import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

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
