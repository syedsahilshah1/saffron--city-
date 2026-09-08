import { NextRequest, NextResponse } from "next/server";
import { settingsDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const settings = settingsDb.get();
    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to load settings" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const updated = settingsDb.update(body);
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update settings" },
      { status: 500 }
    );
  }
}
