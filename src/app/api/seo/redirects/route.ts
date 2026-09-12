import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const redirects = await db.getRedirects();
    return NextResponse.json({ success: true, count: redirects.length, data: redirects });
  } catch (error: any) {
    console.error("Redirects GET error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch redirects" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sourcePath, destinationUrl, statusCode, isActive } = body;

    if (!sourcePath || !destinationUrl) {
      return NextResponse.json(
        { success: false, message: "Source Path and Destination URL are required" },
        { status: 400 }
      );
    }

    if (sourcePath.trim() === destinationUrl.trim()) {
      return NextResponse.json(
        { success: false, message: "Source Path and Destination URL cannot be identical (would create infinite loop)" },
        { status: 400 }
      );
    }

    const newRedirect = await db.createRedirect({
      sourcePath,
      destinationUrl,
      statusCode: statusCode === 302 ? 302 : 301,
      isActive: isActive !== undefined ? isActive : true,
    });

    return NextResponse.json(
      { success: true, message: "Redirect created successfully", data: newRedirect },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Redirects POST error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create redirect" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Redirect ID is required" },
        { status: 400 }
      );
    }

    const updated = await db.updateRedirect(id, updates);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Redirect not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Redirect updated successfully",
      data: updated,
    });
  } catch (error: any) {
    console.error("Redirects PUT error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update redirect" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Redirect ID is required" },
        { status: 400 }
      );
    }

    const deleted = await db.deleteRedirect(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Redirect not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Redirect deleted successfully",
    });
  } catch (error: any) {
    console.error("Redirects DELETE error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to delete redirect" },
      { status: 500 }
    );
  }
}
