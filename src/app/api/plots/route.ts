import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdminAuth } from "@/lib/auth-guard";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const plots = await db.getPlots();
    return NextResponse.json({ success: true, count: plots.length, data: plots });
  } catch (error: any) {
    console.error("Plots GET error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch plots" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  // Enforce Authentication
  const auth = await requireAdminAuth(req, "plots");
  if (!auth.authenticated) return auth.errorResponse!;

  try {
    const body = await req.json();
    const {
      plotNumber,
      sector,
      category,
      type,
      totalPrice,
      downPayment,
      monthlyInst,
      status,
      features,
      image,
    } = body;

    if (!plotNumber || !sector || !category || !totalPrice) {
      return NextResponse.json(
        { success: false, message: "Missing required plot fields" },
        { status: 400 }
      );
    }

    const newPlot = await db.createPlot({
      plotNumber: String(plotNumber).trim().slice(0, 100),
      sector: String(sector).trim().slice(0, 100),
      category: String(category).trim().slice(0, 100),
      type: type || (category.includes("Commercial") ? "Commercial" : "Residential"),
      totalPrice: Number(totalPrice) || 0,
      downPayment: Number(downPayment || totalPrice * 0.1) || 0,
      monthlyInst: Number(monthlyInst || (totalPrice * 0.3) / 30) || 0,
      status: status || "Available",
      features: features ? String(features).slice(0, 500) : "Standard Plot",
      image: image ? String(image).slice(0, 500) : "/images/sectors/sector-a-luxury.webp",
    });

    return NextResponse.json(
      { success: true, message: "Plot created", data: newPlot },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Plots POST error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create plot" },
      { status: 500 }
    );
  }
}
