import { NextRequest, NextResponse } from "next/server";
import { inquiriesDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const inquiries = inquiriesDb.getAll();
    return NextResponse.json({ success: true, count: inquiries.length, data: inquiries });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch inquiries" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, message, plotSize, plotType, sector, source } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, message: "Name and Phone are required" },
        { status: 400 }
      );
    }

    const newInquiry = inquiriesDb.add({
      name,
      phone,
      message: message || "Interested in booking a plot in Saffron City",
      plotSize: plotSize || "5 Marla",
      plotType: plotType || "Residential",
      sector: sector || "Sector A",
      source: source || "Website Form",
      notes: "Newly received website lead",
    });

    return NextResponse.json(
      { success: true, message: "Enquiry submitted successfully", data: newInquiry },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to process enquiry" },
      { status: 500 }
    );
  }
}
