import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendLeadNotificationEmail } from "@/lib/mailer";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const inquiries = await db.getInquiries();
    const res = NextResponse.json({ success: true, count: inquiries.length, data: inquiries });
    res.headers.set("Cache-Control", "private, no-cache, no-store, must-revalidate");
    return res;
  } catch (error: any) {
    console.error("Inquiries GET error:", error);
    const res = NextResponse.json(
      { success: false, message: "Failed to fetch inquiries" },
      { status: 500 }
    );
    res.headers.set("Cache-Control", "private, no-cache, no-store, must-revalidate");
    return res;
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
      email: email && email.trim() ? email.trim() : undefined,
      message: message && message.trim() ? message.trim() : undefined,
      plotSize: plotSize && plotSize.trim() ? plotSize.trim() : undefined,
      plotType: plotType && plotType.trim() ? plotType.trim() : undefined,
      sector: sector && sector.trim() ? sector.trim() : undefined,
      status: "New",
      source: source && source.trim() ? source.trim() : "Website Form",
      notes: undefined,
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
