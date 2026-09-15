import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendLeadNotificationEmail } from "@/lib/mailer";
import { requireAdminAuth } from "@/lib/auth-guard";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  // Enforce Admin Auth for viewing customer inquiries
  const auth = await requireAdminAuth(req, "leads");
  if (!auth.authenticated) return auth.errorResponse!;

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

    // Sanitize input lengths and content to prevent injection & abuse
    const cleanName = String(name).trim().slice(0, 150);
    const cleanPhone = String(phone).trim().slice(0, 50);
    const cleanEmail = email ? String(email).trim().slice(0, 150) : undefined;
    const cleanMessage = message ? String(message).trim().slice(0, 2000) : undefined;
    const cleanPlotSize = plotSize ? String(plotSize).trim().slice(0, 100) : undefined;
    const cleanPlotType = plotType ? String(plotType).trim().slice(0, 100) : undefined;
    const cleanSector = sector ? String(sector).trim().slice(0, 100) : undefined;
    const cleanSource = source ? String(source).trim().slice(0, 100) : "Website Form";

    const newInquiry = await db.createInquiry({
      name: cleanName,
      phone: cleanPhone,
      email: cleanEmail,
      message: cleanMessage,
      plotSize: cleanPlotSize,
      plotType: cleanPlotType,
      sector: cleanSector,
      status: "New",
      source: cleanSource,
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
