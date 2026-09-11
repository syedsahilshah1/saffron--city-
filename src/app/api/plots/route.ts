import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

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
      plotNumber,
      sector,
      category,
      type: type || (category.includes("Commercial") ? "Commercial" : "Residential"),
      totalPrice: Number(totalPrice),
      downPayment: Number(downPayment || totalPrice * 0.1),
      monthlyInst: Number(monthlyInst || (totalPrice * 0.3) / 30),
      status: status || "Available",
      features: features || "Standard Plot",
      image: image || "",
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
