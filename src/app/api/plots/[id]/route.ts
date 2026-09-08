import { NextRequest, NextResponse } from "next/server";
import { plotsDb } from "@/lib/db";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status, totalPrice, downPayment, monthlyInst } = body;

    let updated = null;
    if (status) {
      updated = plotsDb.updateStatus(id, status);
    }
    if (totalPrice !== undefined) {
      updated = plotsDb.updatePrice(id, totalPrice, downPayment, monthlyInst);
    }

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Plot not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update plot" },
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
    const deleted = plotsDb.delete(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Plot not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, message: "Plot removed" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete plot" },
      { status: 500 }
    );
  }
}
