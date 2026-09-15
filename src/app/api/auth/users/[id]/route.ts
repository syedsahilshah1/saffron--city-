import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdminAuth } from "@/lib/auth-guard";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminAuth(req, "users");
  if (!auth.authenticated) return auth.errorResponse!;

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
  const auth = await requireAdminAuth(req, "users");
  if (!auth.authenticated) return auth.errorResponse!;

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

    // Role escalation protection: Only SUPER_ADMIN can promote users to SUPER_ADMIN
    let assignedRole = role;
    if (role === "SUPER_ADMIN" && auth.user?.role !== "SUPER_ADMIN") {
      assignedRole = "ADMIN";
    }

    const updated = await db.updateUser(id, {
      name: name ? String(name).trim().slice(0, 150) : undefined,
      email: email ? String(email).trim().toLowerCase().slice(0, 150) : undefined,
      role: assignedRole,
      permissions,
      password: password && password.length >= 6 ? password : undefined,
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
  const auth = await requireAdminAuth(req, "users");
  if (!auth.authenticated) return auth.errorResponse!;

  try {
    const { id } = await params;

    // Prevent self-deletion of currently logged-in user
    if (auth.user?.id === id) {
      return NextResponse.json(
        { success: false, message: "You cannot delete your own active administrator account." },
        { status: 400 }
      );
    }

    const deleted = await db.deleteUser(id);

    if (!deleted) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "User account deleted." });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
