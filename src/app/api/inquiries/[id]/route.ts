import { NextRequest, NextResponse } from "next/server";
import { inquiriesDb } from "@/lib/db";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status, notes } = body;

    const updated = inquiriesDb.updateStatus(id, status, notes);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Inquiry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update inquiry" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = inquiriesDb.delete(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Inquiry not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, message: "Inquiry deleted" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete inquiry" },
      { status: 500 }
    );
  }
}
