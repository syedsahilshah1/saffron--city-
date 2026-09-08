import { NextResponse } from "next/server";
import { inquiriesDb, plotsDb, settingsDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const inquiries = inquiriesDb.getAll();
    const plots = plotsDb.getAll();
    const settings = settingsDb.get();

    const stats = {
      totalLeads: inquiries.length,
      newLeads: inquiries.filter((i) => i.status === "New").length,
      contactedLeads: inquiries.filter((i) => i.status === "Contacted").length,
      convertedLeads: inquiries.filter((i) => i.status === "Booked").length,
      totalPlots: plots.length,
      availablePlots: plots.filter((p) => p.status === "Available").length,
      reservedPlots: plots.filter((p) => p.status === "Reserved").length,
      bookedPlots: plots.filter((p) => p.status === "Booked").length,
      totalInventoryValue: plots.reduce((acc, curr) => acc + curr.totalPrice, 0),
      settings,
    };

    return NextResponse.json({ success: true, data: stats });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to load dashboard statistics" },
      { status: 500 }
    );
  }
}
