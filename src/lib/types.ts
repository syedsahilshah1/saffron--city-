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

export interface BlogFAQ {
  question: string;
  answer: string;
}

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

  // Author & Display Options
  authorRole?: string;
  authorBio?: string;
  authorImage?: string;
  showProjectSnapshot?: boolean;

  // Comprehensive SEO & Social Metadata
  seoTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  robotsIndex?: boolean;
  robotsFollow?: boolean;
  focusKeyword?: string;
  secondaryKeywords?: string;
  h1Heading?: string;
  imageAlt?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  customSchema?: string;
  faqs?: BlogFAQ[];
}

export interface StoredPageSeo {
  id: string;
  path: string; // e.g. "/", "/about-us", "/master-plan", "/payment-plan", "/noc-status", "/location", "/sectors/sector-a", "/sectors/sector-b", "/plots/residential", "/plots/commercial", "/privacy-policy"
  pageName: string;
  metaTitle: string;
  metaDescription: string;
  h1Heading?: string;
  focusKeyword?: string;
  secondaryKeywords?: string;
  canonicalUrl?: string;
  robotsIndex: boolean;
  robotsFollow: boolean;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  schemaType: "WebSite" | "RealEstateListing" | "AboutPage" | "ContactPage" | "FAQPage" | "ItemPage" | "Custom";
  customJsonLd?: string;
  updatedAt: string;
}

export interface StoredRedirect {
  id: string;
  sourcePath: string; // e.g. "/old-payment-plan"
  destinationUrl: string; // e.g. "/payment-plan"
  statusCode: 301 | 302;
  isActive: boolean;
  hitCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface StoredUser {
  id: string;
  email: string;
  name: string;
  password?: string;
  role: UserRole;
  permissions: DashboardPermission[];
  failedAttempts?: number;
  lockedUntil?: string | null;
  isActive: boolean;
  lastLoginAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type SafeUser = Omit<StoredUser, "password">;

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
  sector: string;
  category: string;
  type: "Residential" | "Commercial" | string;
  totalPrice: number;
  downPayment: number;
  monthlyInst: number;
  status: "Available" | "Reserved" | "Booked" | string;
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

  // Global SEO Settings
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  canonicalUrl: string;
  googleSiteVerification: string;
  defaultRobotsIndex: boolean;
  defaultRobotsFollow: boolean;

  // Social & OpenGraph / Twitter Cards
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterCard: "summary" | "summary_large_image";
  twitterSite: string;
  twitterCreator: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;

  // Structured Data / Organization Details
  orgName: string;
  orgLogo: string;
  orgLegalName: string;
  orgPriceRange: string;
  orgStreetAddress: string;
  orgAddressLocality: string;
  orgAddressRegion: string;
  orgPostalCode: string;
  orgAddressCountry: string;
  orgGeoLat: string;
  orgGeoLng: string;
  orgOpeningDays: string;
  orgOpeningHoursOpens: string;
  orgOpeningHoursCloses: string;
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  linkedinUrl: string;
  twitterUrl: string;

  // Analytics & Webmaster Code Snippets
  googleAnalyticsId: string;
  googleTagManagerId: string;
  customHeadScript: string;

  // Hero Section
  heroTitle: string;
  heroHighlightedWord: string;
  heroSubtitle: string;
  heroBgImage: string;
  heroButtonText: string;

  // Chairman & Legacy Section
  chairmanHeadingTop?: string;
  chairmanHeadingSub?: string;
  chairmanHeadingMain?: string;
  chairmanName: string;
  chairmanTitle: string;
  chairmanBioShort: string;
  chairmanBioFull: string;
  chairmanCtaText?: string;
  chairmanCtaLink?: string;
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

  // About Us Page Content
  aboutHeroHeading?: string;
  aboutHeroSubtitle?: string;
  aboutHeroImage?: string;
  aboutStoryHeading?: string;
  aboutStoryText?: string;
  aboutMissionText?: string;
  aboutVisionText?: string;
  aboutLegacyYears?: string;
  aboutLegacyImage?: string;
  aboutStatsJson?: string;
  aboutLeadershipJson?: string;
  aboutTimelineJson?: string;
  aboutDifferentiatorsJson?: string;
  aboutCoreValuesJson?: string;
  aboutCommitmentsJson?: string;

  // NOC Status Page Content
  nocPageHeading?: string;
  nocPageSubtitle?: string;
  nocPageDescription?: string;
  nocApprovalNumber?: string;
  nocCertificateImage?: string;
  nocRdaLetterPdf?: string;
  nocLegalFeaturesJson?: string;
  nocHeroImage?: string;
  nocHeroHeading?: string;
  nocHeroSubtitle?: string;
  nocVerificationUrl?: string;
  nocStatsJson?: string;
  nocOverviewHeading?: string;
  nocOverviewText?: string;
  nocDocumentsHeading?: string;
  nocDocumentsJson?: string;
  nocStepsHeading?: string;
  nocStepsSubtitle?: string;
  nocStepsJson?: string;
  nocFaqsHeading?: string;
  nocFaqsJson?: string;
  nocCtaHeading?: string;
  nocCtaSubtitle?: string;
  nocCtaPhone?: string;

  // Location & Access Page Content
  locationPageHeading?: string;
  locationPageSubtitle?: string;
  locationPageDescription?: string;
  locationHeroHeading?: string;
  locationHeroSubtitle?: string;
  locationHeroImage?: string;
  locationStatsJson?: string;
  locationOverviewHeading?: string;
  locationOverviewText?: string;
  locationMapImage?: string;
  locationGoogleEmbedUrl?: string;
  locationLandmarksHeading?: string;
  locationLandmarksJson?: string;
  locationRoutesHeading?: string;
  locationRoutesJson?: string;
  locationTableHeading?: string;
  locationTableJson?: string;
  locationCtaHeading?: string;
  locationCtaSubtitle?: string;
  locationCtaPhone?: string;

  // Master Plan & Media Content
  masterPlanHeroHeading?: string;
  masterPlanHeroSubtitle?: string;
  masterPlanHeroImage?: string;
  masterPlanStatsJson?: string;
  masterPlanOverviewHeading?: string;
  masterPlanOverviewText?: string;
  masterPlanSectorsHeading?: string;
  masterPlanSectorsJson?: string;
  masterPlanFacilitiesHeading?: string;
  masterPlanFacilitiesJson?: string;
  masterPlanFaqsHeading?: string;
  masterPlanFaqsJson?: string;
  masterPlanCtaHeading?: string;
  masterPlanCtaSubtitle?: string;
  masterPlanCtaPhone?: string;

  // Homepage Content Granular Fields
  homeStatsJson?: string;
  homeOverviewHeading?: string;
  homeOverviewText?: string;
  homeOverviewImage?: string;
  homeAmenitiesHeading?: string;
  homeAmenitiesJson?: string;
  homeFaqsHeading?: string;
  homeFaqsJson?: string;
  homeReviewsJson?: string;
  homeCtaHeading?: string;
  homeCtaSubtitle?: string;

  // Commercial Plots Page Content
  commercialHeroHeading?: string;
  commercialHeroSubtitle?: string;
  commercialHeroImage?: string;
  commercialStatsJson?: string;
  commercialOverviewHeading?: string;
  commercialOverviewText?: string;
  commercialOverviewImage?: string;
  commercialAmenitiesHeading?: string;
  commercialAmenitiesJson?: string;
  commercialLandmarksHeading?: string;
  commercialLandmarksJson?: string;
  commercialGoogleMapEmbed?: string;
  commercialPlotsHeading?: string;
  commercialPlotsSubtitle?: string;
  commercialPlotsJson?: string;
  commercialWhyChooseHeading?: string;
  commercialWhyChooseJson?: string;
  commercialPricingHeading?: string;
  commercialPricingJson?: string;
  commercialFaqsHeading?: string;
  commercialFaqsJson?: string;
  commercialCtaHeading?: string;
  commercialCtaSubtitle?: string;
  commercialCtaPhone?: string;

  // Sectors & Plots Detailed Content
  sectorADescription?: string;
  sectorABrochurePdf?: string;
  sectorAOverviewHeading?: string;
  sectorAOverviewImage?: string;
  sectorAStatsJson?: string;
  sectorAAmenitiesHeading?: string;
  sectorAAmenitiesJson?: string;
  sectorALandmarksHeading?: string;
  sectorALandmarksJson?: string;
  sectorAWhyChooseHeading?: string;
  sectorAWhyChooseJson?: string;
  sectorAFaqsJson?: string;
  sectorAMapEmbedUrl?: string;
  sectorAPlotsHeading?: string;
  sectorAPlotsSubtitle?: string;
  sectorACtaHeading?: string;
  sectorACtaSubtitle?: string;
  sectorACtaPhone?: string;

  sectorBDescription?: string;
  sectorBBrochurePdf?: string;
  sectorBOverviewHeading?: string;
  sectorBOverviewImage?: string;
  sectorBStatsJson?: string;
  sectorBAmenitiesHeading?: string;
  sectorBAmenitiesJson?: string;
  sectorBLandmarksHeading?: string;
  sectorBLandmarksJson?: string;
  sectorBWhyChooseHeading?: string;
  sectorBWhyChooseJson?: string;
  sectorBFaqsJson?: string;
  sectorBMapEmbedUrl?: string;
  sectorBPlotsHeading?: string;
  sectorBPlotsSubtitle?: string;
  sectorBCtaHeading?: string;
  sectorBCtaSubtitle?: string;
  sectorBCtaPhone?: string;

  residentialPageHeading?: string;
  residentialPageSubtitle?: string;
  residentialPageBanner?: string;
  commercialPageHeading?: string;
  commercialPageSubtitle?: string;
  commercialPageBanner?: string;

  // Dynamic Lists
  amenities: StoredAmenity[];
  landmarks: StoredLandmark[];
  paymentTiers: StoredPaymentTier[];
}
