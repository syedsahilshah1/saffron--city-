// -------------------------------------------------------------
// Shared Data Types & Interfaces (Client & Server Safe)
// -------------------------------------------------------------

export type UserRole = "SUPER_ADMIN" | "ADMIN" | "MANAGER" | "AGENT" | "EDITOR";

export type DashboardPermission =
  | "overview"
  | "leads"
  | "plots"
  | "blogs"
  | "content"
  | "masterplan"
  | "paymentplans"
  | "seo"
  | "settings"
  | "users";

export interface PermissionDefinition {
  id: DashboardPermission;
  label: string;
  desc: string;
}

export const ALL_PERMISSIONS: PermissionDefinition[] = [
  { id: "overview", label: "Executive Overview", desc: "View key statistics, revenue KPIs & recent activity" },
  { id: "leads", label: "Lead Management (CRM)", desc: "View, update status, notes & export customer inquiries" },
  { id: "plots", label: "Plot Inventory", desc: "Add, edit, delete & adjust plot pricing and availability" },
  { id: "blogs", label: "Blogs & News CMS", desc: "Publish, edit, delete & manage blog posts and news articles" },
  { id: "content", label: "Landing Page & CMS", desc: "Modify hero text, chairman message & public content" },
  { id: "masterplan", label: "Master Plan & Media", desc: "Update master layout plan images and PDF brochures" },
  { id: "paymentplans", label: "Payment Plans", desc: "Manage installment breakdowns & payment tier charts" },
  { id: "seo", label: "SEO & Social Sharing", desc: "Configure meta titles, descriptions & OpenGraph tags" },
  { id: "settings", label: "System & SMTP Settings", desc: "Configure contact numbers, email alerts & RDA status" },
  { id: "users", label: "User & Team Access", desc: "Manage staff accounts, assign granular permissions & lockout" },
];

export interface StoredBlog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  readTime: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface StoredUser {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  salt: string;
  role: UserRole;
  permissions: DashboardPermission[];
  failedAttempts: number;
  lockedUntil: string | null;
  isActive: boolean;
  lastLoginAt?: string;
  sessionToken?: string;
  createdAt: string;
  updatedAt: string;
}

export type SafeUser = Omit<StoredUser, "passwordHash" | "salt">;

export interface StoredInquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  message?: string;
  plotSize?: string;
  plotType?: string;
  sector?: string;
  status: "New" | "Contacted" | "FollowUp" | "Booked" | "Closed";
  source: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StoredPlot {
  id: string;
  plotNumber: string;
  sector: "Sector A" | "Sector B" | "Commercial Block";
  category: "5 Marla" | "10 Marla" | "1 Kanal" | "4 Marla" | "8 Marla";
  type: "Residential" | "Commercial";
  totalPrice: number;
  downPayment: number;
  monthlyInst: number;
  status: "Available" | "Reserved" | "Booked";
  features: string;
  image?: string;
}

export interface StoredPaymentTier {
  size: string;
  type: "Residential" | "Commercial";
  totalPrice: string;
  downPayment: string;
  confirmation: string;
  monthlyInstallment: string;
  balloonPayment: string;
  possession: string;
  duration: string;
}

export interface StoredAmenity {
  id: string;
  title: string;
  desc: string;
  image: string;
}

export interface StoredLandmark {
  id: string;
  title: string;
  subtitle: string;
  driveTime: string;
  image: string;
}

export interface StoredSettings {
  siteName: string;
  contactPhone: string;
  secondaryPhone: string;
  whatsappPhone: string;
  officialEmail: string;
  officeAddress: string;
  googleMapsUrl: string;
  rdaNocStatus: string;
  rdaVerificationUrl: string;
  announcement: string;
  activePreLaunchDiscount: boolean;

  // SMTP & Lead Alerts
  smtpEnabled: boolean;
  smtpHost: string;
  smtpPort: number;
  smtpSecure: boolean;
  smtpUser: string;
  smtpPass: string;
  smtpFromEmail: string;
  leadNotificationEmail: string;

  // SEO Settings
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonicalUrl: string;
  googleSiteVerification: string;

  // Hero Section
  heroTitle: string;
  heroHighlightedWord: string;
  heroSubtitle: string;
  heroBgImage: string;
  heroButtonText: string;

  // Chairman & Founder Section
  chairmanName: string;
  chairmanTitle: string;
  chairmanBioShort: string;
  chairmanBioFull: string;
  chairmanPortrait: string;

  // Master Plan & Media
  masterPlanImage: string;
  masterPlanFullImage: string;
  masterPlanPdf: string;
  masterPlanDescription: string;

  // Sectors Content & Images
  sectorATitle: string;
  sectorATagline: string;
  sectorAPlots: string;
  sectorAPrice: string;
  sectorAImage: string;

  sectorBTitle: string;
  sectorBTagline: string;
  sectorBPlots: string;
  sectorBPrice: string;
  sectorBImage: string;

  // Payment Plan Media & Downloads
  residentialPaymentPlanImage: string;
  commercialPaymentPlanImage: string;
  officialPaymentPlanPdf: string;

  // Dynamic Lists
  amenities: StoredAmenity[];
  landmarks: StoredLandmark[];
  paymentTiers: StoredPaymentTier[];
}
