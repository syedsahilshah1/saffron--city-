import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await db.getUserById(id);

    if (!user) {
      const res = NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
      res.headers.set("Cache-Control", "private, no-cache, no-store, must-revalidate");
      return res;
    }

    const res = NextResponse.json({ success: true, data: user });
    res.headers.set("Cache-Control", "private, no-cache, no-store, must-revalidate");
    return res;
  } catch (error: any) {
    const res = NextResponse.json({ success: false, message: error.message }, { status: 500 });
    res.headers.set("Cache-Control", "private, no-cache, no-store, must-revalidate");
    return res;
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { action, name, email, role, permissions, password, isActive } = body;

    // Handle quick unlock action
    if (action === "unlock") {
      const unlocked = await db.unlockUser(id);
      if (!unlocked) {
        return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, message: "Account successfully unlocked." });
    }

    const updated = await db.updateUser(id, {
      name,
      email,
      role,
      permissions,
      password,
      isActive,
    });

    if (!updated) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "User account updated successfully.",
      data: updated,
    });
  } catch (error: any) {
    console.error("Update user error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = await db.deleteUser(id);

    if (!deleted) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "User account deleted." });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
