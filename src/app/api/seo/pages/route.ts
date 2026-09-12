import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const path = searchParams.get("path");

    if (path) {
      const pageSeo = await db.getPageSeoByPath(path);
      if (!pageSeo) {
        return NextResponse.json(
          { success: false, message: "Page SEO not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: pageSeo });
    }

    const allPages = await db.getPageSeoList();
    return NextResponse.json({ success: true, count: allPages.length, data: allPages });
  } catch (error: any) {
    console.error("Page SEO GET error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch page SEO" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.path) {
      return NextResponse.json(
        { success: false, message: "Page path is required" },
        { status: 400 }
      );
    }

    const saved = await db.upsertPageSeo(body);
    return NextResponse.json(
      { success: true, message: "Page SEO saved successfully", data: saved },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Page SEO POST error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to save page SEO" },
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
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }

    const deleted = await db.deletePageSeo(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Page SEO record not found or cannot be deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Page SEO record deleted" });
  } catch (error: any) {
    console.error("Page SEO DELETE error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to delete page SEO" },
      { status: 500 }
    );
  }
}
