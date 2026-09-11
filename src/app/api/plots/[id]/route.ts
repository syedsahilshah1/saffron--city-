import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const updated = await db.updatePlot(id, body);

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Plot not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    console.error("Plot PATCH error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update plot" },
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
    const deleted = await db.deletePlot(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Plot not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, message: "Plot removed" });
  } catch (error: any) {
    console.error("Plot DELETE error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete plot" },
      { status: 500 }
    );
  }
}
