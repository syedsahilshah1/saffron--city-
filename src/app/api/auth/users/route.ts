import { NextRequest, NextResponse } from "next/server";
import { db, ALL_PERMISSIONS } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const users = await db.getUsers();
    const res = NextResponse.json({
      success: true,
      count: users.length,
      data: users,
      availablePermissions: ALL_PERMISSIONS,
    });
    res.headers.set("Cache-Control", "private, no-cache, no-store, must-revalidate");
    return res;
  } catch (error: any) {
    console.error("Get users error:", error);
    const res = NextResponse.json(
      { success: false, message: "Failed to fetch users" },
      { status: 500 }
    );
    res.headers.set("Cache-Control", "private, no-cache, no-store, must-revalidate");
    return res;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, role, permissions } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    const newUser = await db.createUser({
      name,
      email,
      password,
      role: role || "AGENT",
      permissions: Array.isArray(permissions) ? permissions : ["overview", "leads"],
      isActive: true,
    });

    const res = NextResponse.json(
      { success: true, message: "New administrative user created successfully.", data: newUser },
      { status: 201 }
    );
    res.headers.set("Cache-Control", "private, no-cache, no-store, must-revalidate");
    return res;
  } catch (error: any) {
    console.error("Create user error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create user" },
      { status: 400 }
    );
  }
}
