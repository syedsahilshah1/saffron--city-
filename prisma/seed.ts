import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

function hashPassword(password: string, existingSalt?: string): { hash: string; salt: string } {
  const salt = existingSalt || crypto.randomBytes(32).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
  return { hash, salt };
}

async function main() {
  console.log("🚀 Starting database migration and seeding for Saffron City...");

  const superAdminEmail = "ubaidnasir401@gmail.com";
  const { hash, salt } = hashPassword(superAdminEmail);

  // 1. Upsert SuperAdmin User
  const superAdmin = await prisma.user.upsert({
    where: { email: superAdminEmail },
    update: {
      name: "Ubaid Nasir (Super Admin)",
      passwordHash: hash,
      salt,
      role: "SUPER_ADMIN",
      permissions: JSON.stringify([
        "overview",
        "leads",
        "plots",
        "content",
        "masterplan",
        "paymentplans",
        "seo",
        "settings",
        "users",
      ]),
      isActive: true,
      failedAttempts: 0,
      lockedUntil: null,
    },
    create: {
      id: "usr-superadmin-01",
      email: superAdminEmail,
      name: "Ubaid Nasir (Super Admin)",
      passwordHash: hash,
      salt,
      role: "SUPER_ADMIN",
      permissions: JSON.stringify([
        "overview",
        "leads",
        "plots",
        "content",
        "masterplan",
        "paymentplans",
        "seo",
        "settings",
        "users",
      ]),
      isActive: true,
    },
  });

  console.log(`✅ SuperAdmin user verified in Database: ${superAdmin.email} (Role: ${superAdmin.role})`);

  // 2. Upsert Default Site Settings
  await prisma.siteSetting.upsert({
    where: { id: "default" },
    update: {
      siteName: "Saffron City Islamabad",
      officialEmail: "info@saffroncity.pk",
      leadNotificationEmail: superAdminEmail,
      smtpEnabled: true,
    },
    create: {
      id: "default",
      siteName: "Saffron City Islamabad",
      contactPhone: "+92 321 5554321",
      secondaryPhone: "+92 51 111 723 376",
      whatsappPhone: "923215554321",
      officialEmail: "info@saffroncity.pk",
      officeAddress: "Main GT Road, Near T-Chowk, Rawat, Islamabad / Rawalpindi",
      rdaNocStatus: "RDA Approved (Full 15,000 Kanal)",
      announcement: "10% Pre-Launch Discount Active on 5 & 10 Marla Plots in Sector B",
      activePreLaunchDiscount: true,
      smtpEnabled: true,
      smtpHost: "smtp.gmail.com",
      smtpPort: 465,
      smtpSecure: true,
      smtpUser: superAdminEmail,
      smtpPass: "",
      smtpFromEmail: "no-reply@saffroncity.pk",
      leadNotificationEmail: superAdminEmail,
    },
  });

  console.log("✅ Site settings and SMTP configuration migrated.");

  // 3. Upsert Initial Plots into PlotInventory Table
  const plotsData = [
    { plotNumber: "A-101", sector: "Sector A", category: "5 Marla", type: "Residential", totalPrice: 4500000, downPayment: 450000, monthlyInst: 45000, status: "Available", features: "Underground Utilities, Near Central Park", image: "/images/sectors/sector-a-luxury.jpg" },
    { plotNumber: "A-102", sector: "Sector A", category: "10 Marla", type: "Residential", totalPrice: 8200000, downPayment: 820000, monthlyInst: 82000, status: "Reserved", features: "Main Boulevard, Underground Electrification", image: "/images/sectors/sector-a-luxury.jpg" },
    { plotNumber: "A-105", sector: "Sector A", category: "1 Kanal", type: "Residential", totalPrice: 15500000, downPayment: 1550000, monthlyInst: 155000, status: "Available", features: "Corner Plot, Park Facing, 60-ft Road", image: "/images/sectors/sector-a-luxury.jpg" },
    { plotNumber: "B-201", sector: "Sector B", category: "5 Marla", type: "Residential", totalPrice: 4500000, downPayment: 450000, monthlyInst: 45000, status: "Available", features: "Near Community Mosque, 40-ft Wide Road", image: "/images/sectors/sector-b-residential.jpg" },
    { plotNumber: "B-205", sector: "Sector B", category: "10 Marla", type: "Residential", totalPrice: 8200000, downPayment: 820000, monthlyInst: 82000, status: "Available", features: "Family Zone, Green Belt Adjacent", image: "/images/sectors/sector-b-residential.jpg" },
    { plotNumber: "COM-01", sector: "Commercial Block", category: "4 Marla", type: "Commercial", totalPrice: 18000000, downPayment: 1800000, monthlyInst: 180000, status: "Available", features: "Main GT Road Frontage, High Footfall Plaza Plot", image: "/images/sectors/commercial-plaza.jpg" },
    { plotNumber: "COM-04", sector: "Commercial Block", category: "8 Marla", type: "Commercial", totalPrice: 34000000, downPayment: 3400000, monthlyInst: 340000, status: "Booked", features: "Corporate Plaza Hub, Multi-Storey Approved", image: "/images/sectors/commercial-plaza.jpg" },
  ];

  for (const p of plotsData) {
    await prisma.plotInventory.upsert({
      where: { plotNumber: p.plotNumber },
      update: p,
      create: p,
    });
  }

  console.log(`✅ Plot inventory seeded (${plotsData.length} plots).`);

  // 4. Upsert Initial Leads into LeadInquiry Table
  const leadsData = [
    { name: "Tariq Mehmood", phone: "+92 321 5554321", message: "Interested in 1 Kanal residential plot in Sector A with park facing option.", plotSize: "1 Kanal", plotType: "Residential", sector: "Sector A", status: "New", source: "Website Hero Form", notes: "Requires remote overseas booking guidance." },
    { name: "Dr. Usman Farooq", phone: "+92 300 9876543", message: "Looking for 4 Marla commercial plot on GT Road frontage for clinic setup.", plotSize: "4 Marla", plotType: "Commercial", sector: "Commercial Block", status: "Contacted", source: "WhatsApp Lead", notes: "Sent payment plan brochure. Follow-up scheduled for Friday." },
    { name: "Bilal Ahmad", phone: "+92 333 1234567", message: "I need a 5 Marla plot in Saffron City Sector B on 3-year installment.", plotSize: "5 Marla", plotType: "Residential", sector: "Sector B", status: "FollowUp", source: "Plot For Sale Page", notes: "Checking down payment readiness." },
  ];

  for (const l of leadsData) {
    const existing = await prisma.leadInquiry.findFirst({ where: { phone: l.phone } });
    if (!existing) {
      await prisma.leadInquiry.create({ data: l });
    }
  }

  console.log(`✅ Lead inquiries seeded (${leadsData.length} leads).`);

  console.log("🎉 Database migration and seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Migration/seed error:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
