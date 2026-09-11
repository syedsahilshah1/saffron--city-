import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const stats = await db.getStats();
    return NextResponse.json({ success: true, data: stats });
  } catch (error: any) {
    console.error("Stats GET error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load dashboard statistics" },
      { status: 500 }
    );
  }
}
