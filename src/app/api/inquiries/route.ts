import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendLeadNotificationEmail } from "@/lib/mailer";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const inquiries = await db.getInquiries();
    return NextResponse.json({ success: true, count: inquiries.length, data: inquiries });
  } catch (error: any) {
    console.error("Inquiries GET error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch inquiries" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, message, plotSize, plotType, sector, source } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, message: "Name and Phone are required" },
        { status: 400 }
      );
    }

    const newInquiry = await db.createInquiry({
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : undefined,
      message: message ? message.trim() : "Website lead inquiry",
      plotSize: plotSize || undefined,
      plotType: plotType || undefined,
      sector: sector || undefined,
      status: "New",
      source: source || "Website Form",
      notes: `Lead received via ${source || "Website"}`,
    });

    // Send instant lead notification email asynchronously
    const settings = await db.getSettings();
    sendLeadNotificationEmail(newInquiry, settings).catch((err) =>
      console.warn("Async lead email dispatch error:", err)
    );

    return NextResponse.json(
      { success: true, message: "Enquiry submitted successfully", data: newInquiry },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Inquiries POST error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to process enquiry" },
      { status: 500 }
    );
  }
}
