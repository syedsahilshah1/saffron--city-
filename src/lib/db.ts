import fs from "fs";
import path from "path";
import crypto from "crypto";
import {
  StoredUser,
  StoredInquiry,
  StoredPlot,
  StoredSettings,
  StoredPaymentTier,
  StoredAmenity,
  StoredLandmark,
  UserRole,
  DashboardPermission,
  ALL_PERMISSIONS,
  SafeUser,
} from "./types";

export * from "./types";

// -------------------------------------------------------------
// Security & Cryptography Utilities (PBKDF2 Hashing + HMAC Session)
// -------------------------------------------------------------

const APP_SECRET = process.env.APP_SECRET || "saffron-city-executive-secret-key-2026-secure";

export function generateSalt(): string {
  return crypto.randomBytes(32).toString("hex");
}

export function hashPassword(password: string, existingSalt?: string): { hash: string; salt: string } {
  const salt = existingSalt || generateSalt();
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
  return { hash, salt };
}

export function verifyPassword(password: string, hash: string, salt: string): boolean {
  if (!password || !hash || !salt) return false;
  const computedHash = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(computedHash, "hex"));
  } catch {
    return hash === computedHash;
  }
}

export function generateUserSessionToken(userId: string, email: string): string {
  const timestamp = Date.now();
  const randomEntropy = crypto.randomBytes(16).toString("hex");
  const payload = `${userId}:${email}:${timestamp}:${randomEntropy}`;
  const signature = crypto.createHmac("sha256", APP_SECRET).update(payload).digest("hex");
  return `tls_saff_${Buffer.from(payload).toString("base64url")}.${signature}`;
}

export function verifyUserSessionToken(token: string): { valid: boolean; userId?: string; email?: string } {
  if (!token || !token.startsWith("tls_saff_")) return { valid: false };
  try {
    const raw = token.replace("tls_saff_", "");
    const [payloadB64, signature] = raw.split(".");
    if (!payloadB64 || !signature) return { valid: false };

    const payload = Buffer.from(payloadB64, "base64url").toString("utf-8");
    const expectedSignature = crypto.createHmac("sha256", APP_SECRET).update(payload).digest("hex");

    if (signature !== expectedSignature) return { valid: false };

    const [userId, email, timestampStr] = payload.split(":");
    const timestamp = parseInt(timestampStr, 10);

    // Tokens valid for 7 days
    if (Date.now() - timestamp > 7 * 24 * 60 * 60 * 1000) {
      return { valid: false };
    }

    return { valid: true, userId, email };
  } catch {
    return { valid: false };
  }
}

// -------------------------------------------------------------
// In-Memory Cache Manager with Invalidation
// -------------------------------------------------------------

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

class MemoryCacheManager {
  private cache = new Map<string, CacheEntry<any>>();

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    return entry.data as T;
  }

  set<T>(key: string, data: T, ttlSeconds: number = 60): void {
    this.cache.set(key, {
      data,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  invalidatePrefix(prefix: string): void {
    for (const key of this.cache.keys()) {
      if (key.startsWith(prefix)) {
        this.cache.delete(key);
      }
    }
  }

  clear(): void {
    this.cache.clear();
  }
}

export const backendCache = new MemoryCacheManager();

// -------------------------------------------------------------
// Default Seed Users (Exclusively SuperAdmin ubaidnasir401@gmail.com)
// -------------------------------------------------------------

const superAdminHash = hashPassword("ubaidnasir401@gmail.com");

const initialUsers: StoredUser[] = [
  {
    id: "usr-superadmin-01",
    email: "ubaidnasir401@gmail.com",
    name: "Ubaid Nasir (Super Admin)",
    passwordHash: superAdminHash.hash,
    salt: superAdminHash.salt,
    role: "SUPER_ADMIN",
    permissions: [
      "overview",
      "leads",
      "plots",
      "content",
      "masterplan",
      "paymentplans",
      "seo",
      "settings",
      "users",
    ],
    failedAttempts: 0,
    lockedUntil: null,
    isActive: true,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
];

export interface PasswordResetRecord {
  id: string;
  email: string;
  token: string;
  expiresAt: string;
  used: boolean;
  createdAt: string;
}

const defaultSettings: StoredSettings = {
  siteName: "Saffron City Islamabad",
  contactPhone: "+92 321 5554321",
  secondaryPhone: "+92 51 111 723 376",
  whatsappPhone: "923215554321",
  officialEmail: "info@saffroncity.pk",
  officeAddress: "Main GT Road, Near T-Chowk, Rawat, Islamabad / Rawalpindi",
  googleMapsUrl: "https://maps.google.com/?q=Saffron+City+Rawat+Islamabad",
  rdaNocStatus: "RDA Approved (Full 15,000 Kanal)",
  rdaVerificationUrl: "https://punjab.gov.pk",
  announcement: "10% Pre-Launch Discount Active on 5 & 10 Marla Plots in Sector B",
  activePreLaunchDiscount: true,

  smtpEnabled: true,
  smtpHost: "smtp.gmail.com",
  smtpPort: 465,
  smtpSecure: true,
  smtpUser: "ubaidnasir401@gmail.com",
  smtpPass: "",
  smtpFromEmail: "no-reply@saffroncity.pk",
  leadNotificationEmail: "ubaidnasir401@gmail.com",

  metaTitle: "Saffron City Islamabad | RDA Approved Plots on GT Road Rawat",
  metaDescription:
    "Invest in Saffron City Islamabad — a premier 15,000 Kanal RDA NOC-approved housing society on Main GT Road near Rawat. 5, 10 Marla & 1 Kanal plots on easy 3-year installments.",
  metaKeywords:
    "Saffron City, Saffron City Islamabad, RDA approved plots, GT Road Rawat, SKB Builders, 5 Marla plot, 10 Marla plot, 1 Kanal plot, Rawalpindi Ring Road",
  ogTitle: "Saffron City Islamabad | RDA Approved Plots on GT Road Rawat",
  ogDescription:
    "15,000 Kanal RDA NOC Approved housing society on Main GT Road, Rawat. Flexible 3-year installment plans with 10% down payment.",
  ogImage: "/images/hero-bg.jpg",
  canonicalUrl: "https://saffroncity.pk",
  googleSiteVerification: "",

  heroTitle: "Invest in Premium Living at",
  heroHighlightedWord: "Saffron City",
  heroSubtitle:
    "RDA Approved master-planned community on Main GT Road Rawat by SKB Group. Secure your future with flexible 30-month installment plans.",
  heroBgImage: "/images/hero-bg.jpg",
  heroButtonText: "Book Your Plot",

  chairmanName: "Malik Tariq Mehmood",
  chairmanTitle: "Chairman & Founder",
  chairmanBioShort:
    "Saffron City Islamabad, developed by Saadullah Khan and Brothers (SKB Group), is a thoughtfully planned gated community located on GT Road, Rawat. Backed by over 70 years of engineering pedigree, the project sets a new benchmark in luxury, security, and transparent real estate.",
  chairmanBioFull:
    "Saadullah Khan & Brothers (SKB) was founded in 1954 and has built some of the most critical infrastructure networks, highways, flyovers, and mega developments across Pakistan, Dubai, Abu Dhabi, and Saudi Arabia. Under the visionary leadership of Chairman Malik Tariq Mehmood, Saffron City offers 100% legal security with an official No Objection Certificate (NOC) granted by the Rawalpindi Development Authority (RDA) across the full 15,000 Kanal master plan.",
  chairmanPortrait: "/images/chairman_portrait_hd.png",

  masterPlanImage: "/images/saffron-city-master-plan.webp",
  masterPlanFullImage: "/images/saffron-city-master-plan-full.jpg",
  masterPlanPdf: "/images/saffron-city-master-plan.webp",
  masterPlanDescription:
    "The master plan divides Saffron City into residential blocks alongside dedicated space for commercial area, mosque, schools, and parks.",

  sectorATitle: "Sector A (Block B - New Rates)",
  sectorATagline:
    "Prestigious residential sector featuring Grand Jamia Mosque, underground utilities, and wider carpeted roads.",
  sectorAPlots: "5M, 10M & 1 Kanal",
  sectorAPrice: "From PKR 45 Lakh",
  sectorAImage: "/images/sectors/sector-a-luxury.jpg",

  sectorBTitle: "Sector B (Affordable Block)",
  sectorBTagline:
    "Family-friendly sector with easy 3-year installment plans, dedicated sports courts, and community parks.",
  sectorBPlots: "5M, 10M & 1 Kanal",
  sectorBPrice: "From PKR 45 Lakh",
  sectorBImage: "/images/sectors/sector-b-residential.jpg",

  residentialPaymentPlanImage: "/images/payment-plans/official-residential-payment-plan.jpg",
  commercialPaymentPlanImage: "/images/payment-plans/official-commercial-payment-plan.jpg",
  officialPaymentPlanPdf: "/images/saffron-city-master-plan.webp",

  amenities: [
    { id: "am-1", title: "Grand Jamia Mosque", desc: "A central, magnificent mosque sized for the entire community.", image: "/images/amenities/amenity_mosque.jpg" },
    { id: "am-2", title: "Modern Hospital & Trauma", desc: "On-site 24/7 healthcare access for everyday medical needs.", image: "/images/amenities/amenity_hospital.jpg" },
    { id: "am-3", title: "International Standard Schools", desc: "Top-tier schools planned within safe walking distance.", image: "/images/amenities/amenity_school.jpg" },
    { id: "am-4", title: "24/7 Gated Security & CCTV", desc: "3-tier gated perimeter with biometric checkpoints.", image: "/images/amenities/amenity_security.jpg" },
    { id: "am-5", title: "Commercial Shopping Plazas", desc: "Retail centers and supermarkets within each sector.", image: "/images/amenities/amenity_shopping.jpg" },
    { id: "am-6", title: "250ft Main Boulevard", desc: "Wide arterial road network designed for signal-free flow.", image: "/images/amenities/amenity_boulevard.jpg" },
    { id: "am-7", title: "Underground Utilities & Water", desc: "Underground electrification, gas, and dedicated water filtration.", image: "/images/amenities/amenity_water.jpg" },
    { id: "am-8", title: "Family Parks & Sports Courts", desc: "Lush green belts, walking tracks, and children play grounds.", image: "/images/amenities/amenity_park.jpg" },
  ],

  landmarks: [
    { id: "lm-1", title: "T-Chowk, Rawat", subtitle: "Main GT Road Junction", driveTime: "5 Mins Drive", image: "/images/landmark_t_chowk.jpg" },
    { id: "lm-2", title: "Giga Mall & DHA", subtitle: "Premier Shopping & Dining", driveTime: "12 Mins Drive", image: "/images/landmark_giga_mall.jpg" },
    { id: "lm-3", title: "DHA Islamabad", subtitle: "Executive Housing Society", driveTime: "10 Mins Drive", image: "/images/landmark_dha_islamabad.jpg" },
    { id: "lm-4", title: "Zero Point & Blue Area", subtitle: "Capital Business District", driveTime: "20 Mins Drive", image: "/images/hero-bg.jpg" },
    { id: "lm-5", title: "Bahria Town", subtitle: "Gated Residential Community", driveTime: "10 Mins Drive", image: "/images/imgi_25_saffron-city-islamabad.jpg" },
    { id: "lm-6", title: "Islamabad Airport", subtitle: "International Air Terminal", driveTime: "30 Mins Drive", image: "/images/landmark_t_chowk.jpg" },
    { id: "lm-7", title: "Rawalpindi Ring Road", subtitle: "Direct Bypass Interchange", driveTime: "2 Mins Drive", image: "/images/imgi_25_saffron-city-islamabad.jpg" },
    { id: "lm-8", title: "Islamabad Expressway", subtitle: "Signal-Free Arterial Route", driveTime: "15 Mins Drive", image: "/images/hero-bg.jpg" },
  ],

  paymentTiers: [
    { size: "5 Marla", type: "Residential", totalPrice: "PKR 4,500,000", downPayment: "PKR 450,000 (10%)", confirmation: "PKR 450,000 (10%)", monthlyInstallment: "PKR 45,000 × 30", balloonPayment: "PKR 350,000 × 4", possession: "PKR 850,000", duration: "30 Months" },
    { size: "10 Marla", type: "Residential", totalPrice: "PKR 8,200,000", downPayment: "PKR 820,000 (10%)", confirmation: "PKR 820,000 (10%)", monthlyInstallment: "PKR 82,000 × 30", balloonPayment: "PKR 650,000 × 4", possession: "PKR 1,500,000", duration: "30 Months" },
    { size: "1 Kanal", type: "Residential", totalPrice: "PKR 15,500,000", downPayment: "PKR 1,550,000 (10%)", confirmation: "PKR 1,550,000 (10%)", monthlyInstallment: "PKR 155,000 × 30", balloonPayment: "PKR 1,200,000 × 4", possession: "PKR 3,000,000", duration: "30 Months" },
    { size: "4 Marla", type: "Commercial", totalPrice: "PKR 18,000,000", downPayment: "PKR 1,800,000 (10%)", confirmation: "PKR 1,800,000 (10%)", monthlyInstallment: "PKR 180,000 × 30", balloonPayment: "PKR 1,500,000 × 4", possession: "PKR 3,000,000", duration: "30 Months" },
    { size: "8 Marla", type: "Commercial", totalPrice: "PKR 34,000,000", downPayment: "PKR 3,400,000 (10%)", confirmation: "PKR 3,400,000 (10%)", monthlyInstallment: "PKR 340,000 × 30", balloonPayment: "PKR 2,800,000 × 4", possession: "PKR 6,000,000", duration: "30 Months" },
  ],
};

const initialInquiries: StoredInquiry[] = [
  {
    id: "lead-001",
    name: "Tariq Mehmood",
    phone: "+92 321 5554321",
    message: "Interested in 1 Kanal residential plot in Sector A with park facing option.",
    plotSize: "1 Kanal",
    plotType: "Residential",
    sector: "Sector A",
    status: "New",
    source: "Website Hero Form",
    notes: "Requires remote overseas booking guidance.",
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: "lead-002",
    name: "Dr. Usman Farooq",
    phone: "+92 300 9876543",
    message: "Looking for 4 Marla commercial plot on GT Road frontage for clinic setup.",
    plotSize: "4 Marla",
    plotType: "Commercial",
    sector: "Commercial Block",
    status: "Contacted",
    source: "WhatsApp Lead",
    notes: "Sent payment plan brochure. Follow-up scheduled for Friday.",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 18).toISOString(),
  },
  {
    id: "lead-003",
    name: "Bilal Ahmad",
    phone: "+92 333 1234567",
    message: "I need a 5 Marla plot in Saffron City Sector B on 3-year installment.",
    plotSize: "5 Marla",
    plotType: "Residential",
    sector: "Sector B",
    status: "FollowUp",
    source: "Plot For Sale Page",
    notes: "Checking down payment readiness.",
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
];

const initialPlots: StoredPlot[] = [
  {
    id: "plt-a-01",
    plotNumber: "A-101",
    sector: "Sector A",
    category: "5 Marla",
    type: "Residential",
    totalPrice: 4500000,
    downPayment: 450000,
    monthlyInst: 45000,
    status: "Available",
    features: "Underground Utilities, Near Central Park",
    image: "/images/sectors/sector-a-luxury.jpg",
  },
  {
    id: "plt-a-02",
    plotNumber: "A-102",
    sector: "Sector A",
    category: "10 Marla",
    type: "Residential",
    totalPrice: 8200000,
    downPayment: 820000,
    monthlyInst: 82000,
    status: "Reserved",
    features: "Main Boulevard, Underground Electrification",
    image: "/images/sectors/sector-a-luxury.jpg",
  },
  {
    id: "plt-a-03",
    plotNumber: "A-105",
    sector: "Sector A",
    category: "1 Kanal",
    type: "Residential",
    totalPrice: 15500000,
    downPayment: 1550000,
    monthlyInst: 155000,
    status: "Available",
    features: "Corner Plot, Park Facing, 60-ft Road",
    image: "/images/sectors/sector-a-luxury.jpg",
  },
  {
    id: "plt-b-01",
    plotNumber: "B-201",
    sector: "Sector B",
    category: "5 Marla",
    type: "Residential",
    totalPrice: 4500000,
    downPayment: 450000,
    monthlyInst: 45000,
    status: "Available",
    features: "Near Community Mosque, 40-ft Wide Road",
    image: "/images/sectors/sector-b-residential.jpg",
  },
  {
    id: "plt-b-02",
    plotNumber: "B-205",
    sector: "Sector B",
    category: "10 Marla",
    type: "Residential",
    totalPrice: 8200000,
    downPayment: 820000,
    monthlyInst: 82000,
    status: "Available",
    features: "Family Zone, Green Belt Adjacent",
    image: "/images/sectors/sector-b-residential.jpg",
  },
  {
    id: "plt-com-01",
    plotNumber: "COM-01",
    sector: "Commercial Block",
    category: "4 Marla",
    type: "Commercial",
    totalPrice: 18000000,
    downPayment: 1800000,
    monthlyInst: 180000,
    status: "Available",
    features: "Main GT Road Frontage, High Footfall Plaza Plot",
    image: "/images/sectors/commercial-plaza.jpg",
  },
  {
    id: "plt-com-02",
    plotNumber: "COM-04",
    sector: "Commercial Block",
    category: "8 Marla",
    type: "Commercial",
    totalPrice: 34000000,
    downPayment: 3400000,
    monthlyInst: 340000,
    status: "Booked",
    features: "Corporate Plaza Hub, Multi-Storey Approved",
    image: "/images/sectors/commercial-plaza.jpg",
  },
];

// -------------------------------------------------------------
// Persistent Store Implementation (JSON File + Memory Cache)
// -------------------------------------------------------------

const dataDir = path.join(process.cwd(), "data");
const storeFilePath = path.join(dataDir, "cms_store.json");

interface CMSStoreData {
  users: StoredUser[];
  resetTokens: PasswordResetRecord[];
  inquiries: StoredInquiry[];
  plots: StoredPlot[];
  settings: StoredSettings;
}

const globalForStore = globalThis as unknown as {
  cmsStore?: CMSStoreData;
};

function loadStore(): CMSStoreData {
  if (
    globalForStore.cmsStore &&
    Array.isArray(globalForStore.cmsStore.users) &&
    globalForStore.cmsStore.users.length > 0
  ) {
    return globalForStore.cmsStore;
  }

  try {
    if (fs.existsSync(storeFilePath)) {
      const raw = fs.readFileSync(storeFilePath, "utf-8");
      const parsed = JSON.parse(raw);

      // Strictly keep only SuperAdmin ubaidnasir401@gmail.com
      let users: StoredUser[] = Array.isArray(parsed.users)
        ? (parsed.users as StoredUser[]).filter(
            (u: StoredUser) =>
              u && u.email && u.email.toLowerCase() === "ubaidnasir401@gmail.com"
          )
        : [];

      if (users.length === 0) {
        users = [initialUsers[0]];
      } else {
        users = [
          {
            ...users[0],
            role: "SUPER_ADMIN",
            permissions: ALL_PERMISSIONS.map((p) => p.id),
            isActive: true,
          },
        ];
      }

      globalForStore.cmsStore = {
        users,
        resetTokens: Array.isArray(parsed.resetTokens) ? parsed.resetTokens : [],
        inquiries: Array.isArray(parsed.inquiries) ? parsed.inquiries : initialInquiries,
        plots: Array.isArray(parsed.plots) ? parsed.plots : initialPlots,
        settings: { ...defaultSettings, ...(parsed.settings || {}) },
      };
      return globalForStore.cmsStore;
    }
  } catch (err) {
    console.warn("Could not read cms_store.json, using defaults:", err);
  }

  const initialData: CMSStoreData = {
    users: initialUsers,
    resetTokens: [],
    inquiries: initialInquiries,
    plots: initialPlots,
    settings: defaultSettings,
  };

  saveStore(initialData);
  globalForStore.cmsStore = initialData;
  return initialData;
}

function saveStore(data: CMSStoreData) {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(storeFilePath, JSON.stringify(data, null, 2), "utf-8");
    globalForStore.cmsStore = data;
    backendCache.clear();
  } catch (err) {
    console.error("Failed to save cms_store.json:", err);
  }
}

// -------------------------------------------------------------
// Exported Repository Helpers
// -------------------------------------------------------------

export const db = {
  // -------------------------
  // Auth & User Management
  // -------------------------
  getUsers: async (): Promise<SafeUser[]> => {
    const cached = backendCache.get<SafeUser[]>("all_users");
    if (cached) return cached;

    const store = loadStore();
    const safeUsers = store.users.map(({ passwordHash, salt, ...rest }) => rest);
    backendCache.set("all_users", safeUsers, 30);
    return safeUsers;
  },

  getUserByEmail: async (email: string): Promise<StoredUser | null> => {
    const store = loadStore();
    const cleanEmail = email.trim().toLowerCase();
    const user = store.users.find(
      (u) =>
        u.email.toLowerCase() === cleanEmail ||
        (cleanEmail === "ubaid" && u.email.toLowerCase() === "ubaidnasir401@gmail.com") ||
        (cleanEmail === "admin" && u.email.toLowerCase() === "admin@saffroncity.pk")
    );
    return user ? { ...user } : null;
  },

  getUserById: async (id: string): Promise<StoredUser | null> => {
    const store = loadStore();
    const user = store.users.find((u) => u.id === id);
    return user ? { ...user } : null;
  },

  createUser: async (data: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    permissions: DashboardPermission[];
  }): Promise<SafeUser> => {
    const store = loadStore();
    const existing = store.users.find((u) => u.email.toLowerCase() === data.email.trim().toLowerCase());
    if (existing) {
      throw new Error(`User with email ${data.email} already exists`);
    }

    const { hash, salt } = hashPassword(data.password);
    const newUser: StoredUser = {
      id: `usr-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      passwordHash: hash,
      salt,
      role: data.role,
      permissions: data.permissions || ["overview", "leads"],
      failedAttempts: 0,
      lockedUntil: null,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    store.users.push(newUser);
    saveStore(store);

    const { passwordHash, salt: _, ...safeUser } = newUser;
    return safeUser;
  },

  updateUser: async (
    id: string,
    updates: Partial<Omit<StoredUser, "id" | "passwordHash" | "salt">> & { password?: string }
  ): Promise<SafeUser | null> => {
    const store = loadStore();
    const index = store.users.findIndex((u) => u.id === id);
    if (index === -1) return null;

    const user = store.users[index];

    if (updates.password) {
      const { hash, salt } = hashPassword(updates.password);
      user.passwordHash = hash;
      user.salt = salt;
    }

    if (updates.name !== undefined) user.name = updates.name.trim();
    if (updates.email !== undefined) user.email = updates.email.trim().toLowerCase();
    if (updates.role !== undefined) user.role = updates.role;
    if (updates.permissions !== undefined) user.permissions = updates.permissions;
    if (updates.isActive !== undefined) user.isActive = updates.isActive;
    if (updates.lockedUntil !== undefined) user.lockedUntil = updates.lockedUntil;
    if (updates.failedAttempts !== undefined) user.failedAttempts = updates.failedAttempts;

    user.updatedAt = new Date().toISOString();
    store.users[index] = user;
    saveStore(store);

    const { passwordHash, salt: _, ...safeUser } = user;
    return safeUser;
  },

  unlockUser: async (id: string): Promise<boolean> => {
    const store = loadStore();
    const index = store.users.findIndex((u) => u.id === id);
    if (index === -1) return false;

    store.users[index].failedAttempts = 0;
    store.users[index].lockedUntil = null;
    store.users[index].updatedAt = new Date().toISOString();
    saveStore(store);
    return true;
  },

  deleteUser: async (id: string): Promise<boolean> => {
    const store = loadStore();
    const user = store.users.find((u) => u.id === id);
    if (!user) return false;
    if (user.role === "SUPER_ADMIN" || user.email.toLowerCase() === "ubaidnasir401@gmail.com") {
      throw new Error("SuperAdmin account cannot be deleted");
    }

    const prevLen = store.users.length;
    store.users = store.users.filter((u) => u.id !== id);
    if (store.users.length !== prevLen) {
      saveStore(store);
      return true;
    }
    return false;
  },

  // -------------------------
  // Secure Login with Multi-Credential & 30-min Lockout
  // -------------------------
  authenticateUser: async (
    identifierInput: string,
    passwordInput: string
  ): Promise<{
    success: boolean;
    user?: SafeUser;
    token?: string;
    locked?: boolean;
    lockExpiresAt?: string;
    remainingMinutes?: number;
    attemptsLeft?: number;
    message?: string;
  }> => {
    const store = loadStore();
    const identifier = identifierInput.trim().toLowerCase();

    // Map common aliases (e.g. "ubaid" -> "ubaidnasir401@gmail.com")
    let userIndex = store.users.findIndex((u) => u.email.toLowerCase() === identifier);

    if (userIndex === -1 && (identifier === "ubaid" || identifier === "admin")) {
      userIndex = store.users.findIndex((u) => u.email.toLowerCase() === "ubaidnasir401@gmail.com");
    }

    if (userIndex === -1) {
      return {
        success: false,
        message: "Invalid administrator credentials. Please verify your email and password.",
      };
    }

    const user = store.users[userIndex];

    if (!user.isActive) {
      return {
        success: false,
        message: "This account has been deactivated by SuperAdmin. Please contact support.",
      };
    }

    // 1. Check if account is currently locked
    if (user.lockedUntil) {
      const lockExpiry = new Date(user.lockedUntil).getTime();
      const now = Date.now();

      if (now < lockExpiry) {
        const remainingMs = lockExpiry - now;
        const remainingMinutes = Math.ceil(remainingMs / (60 * 1000));
        return {
          success: false,
          locked: true,
          lockExpiresAt: user.lockedUntil,
          remainingMinutes,
          message: `Account is temporarily locked due to 3 incorrect attempts. Please try again in ${remainingMinutes} minute(s) or contact SuperAdmin.`,
        };
      } else {
        // Lock expired -> reset lockout
        user.failedAttempts = 0;
        user.lockedUntil = null;
      }
    }

    // 2. Verify password strictly with PBKDF2
    const isMatch = verifyPassword(passwordInput, user.passwordHash, user.salt);

    if (!isMatch) {
      user.failedAttempts = (user.failedAttempts || 0) + 1;
      const attemptsLeft = Math.max(0, 3 - user.failedAttempts);

      if (user.failedAttempts >= 3) {
        // Lock account for 30 minutes
        const lockDurationMs = 30 * 60 * 1000;
        const lockUntilDate = new Date(Date.now() + lockDurationMs).toISOString();
        user.lockedUntil = lockUntilDate;
        user.updatedAt = new Date().toISOString();
        saveStore(store);

        return {
          success: false,
          locked: true,
          lockExpiresAt: lockUntilDate,
          remainingMinutes: 30,
          attemptsLeft: 0,
          message: "Account locked! You entered 3 incorrect passwords. The account is locked for 30 minutes.",
        };
      }

      user.updatedAt = new Date().toISOString();
      saveStore(store);

      return {
        success: false,
        attemptsLeft,
        message: `Incorrect password. ${attemptsLeft} attempt(s) remaining before a 30-minute security lock.`,
      };
    }

    // 3. Password is valid! Reset failure counters & generate unique TLS token
    user.failedAttempts = 0;
    user.lockedUntil = null;
    user.lastLoginAt = new Date().toISOString();

    const sessionToken = generateUserSessionToken(user.id, user.email);
    user.sessionToken = sessionToken;
    user.updatedAt = new Date().toISOString();
    saveStore(store);

    const { passwordHash, salt, ...safeUser } = user;
    return {
      success: true,
      user: safeUser,
      token: sessionToken,
      message: "Authentication successful.",
    };
  },

  // -------------------------
  // Forgot Password Flow
  // -------------------------
  createPasswordResetRequest: async (emailInput: string): Promise<{ success: boolean; token?: string; message: string }> => {
    const store = loadStore();
    const email = emailInput.trim().toLowerCase();
    const user = store.users.find((u) => u.email.toLowerCase() === email);

    if (!user) {
      return {
        success: false,
        message: "No account found with this email address.",
      };
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1 hour

    store.resetTokens = store.resetTokens.filter((r) => r.email !== email || !r.used);
    store.resetTokens.push({
      id: `rst-${Date.now()}`,
      email,
      token: resetToken,
      expiresAt,
      used: false,
      createdAt: new Date().toISOString(),
    });
    saveStore(store);

    return {
      success: true,
      token: resetToken,
      message: `Password reset instructions generated for ${email}.`,
    };
  },

  resetPasswordWithToken: async (token: string, newPassword: string): Promise<{ success: boolean; message: string }> => {
    const store = loadStore();
    const record = store.resetTokens.find((r) => r.token === token && !r.used);

    if (!record) {
      return { success: false, message: "Invalid or expired reset token." };
    }

    if (Date.now() > new Date(record.expiresAt).getTime()) {
      return { success: false, message: "Password reset token has expired. Please request a new one." };
    }

    const userIndex = store.users.findIndex((u) => u.email.toLowerCase() === record.email.toLowerCase());
    if (userIndex === -1) {
      return { success: false, message: "User account not found." };
    }

    const { hash, salt } = hashPassword(newPassword);
    store.users[userIndex].passwordHash = hash;
    store.users[userIndex].salt = salt;
    store.users[userIndex].failedAttempts = 0;
    store.users[userIndex].lockedUntil = null;
    store.users[userIndex].updatedAt = new Date().toISOString();

    record.used = true;
    saveStore(store);

    return { success: true, message: "Password updated successfully. You may now sign in." };
  },

  // -------------------------
  // Inquiries (Leads)
  // -------------------------
  getInquiries: async (): Promise<StoredInquiry[]> => {
    const cached = backendCache.get<StoredInquiry[]>("all_inquiries");
    if (cached) return cached;

    const store = loadStore();
    backendCache.set("all_inquiries", store.inquiries, 30);
    return store.inquiries;
  },

  createInquiry: async (data: Omit<StoredInquiry, "id" | "createdAt" | "updatedAt">): Promise<StoredInquiry> => {
    const store = loadStore();
    const newInquiry: StoredInquiry = {
      id: `lead-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    store.inquiries.unshift(newInquiry);
    saveStore(store);
    return newInquiry;
  },

  updateInquiry: async (id: string, updates: Partial<StoredInquiry>): Promise<StoredInquiry | null> => {
    const store = loadStore();
    const index = store.inquiries.findIndex((i) => i.id === id);
    if (index === -1) return null;

    store.inquiries[index] = {
      ...store.inquiries[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    saveStore(store);
    return store.inquiries[index];
  },

  deleteInquiry: async (id: string): Promise<boolean> => {
    const store = loadStore();
    const prevLen = store.inquiries.length;
    store.inquiries = store.inquiries.filter((i) => i.id !== id);
    if (store.inquiries.length !== prevLen) {
      saveStore(store);
      return true;
    }
    return false;
  },

  // -------------------------
  // Plots
  // -------------------------
  getPlots: async (): Promise<StoredPlot[]> => {
    const cached = backendCache.get<StoredPlot[]>("all_plots");
    if (cached) return cached;

    const store = loadStore();
    backendCache.set("all_plots", store.plots, 30);
    return store.plots;
  },

  getPlotById: async (id: string): Promise<StoredPlot | null> => {
    const store = loadStore();
    return store.plots.find((p) => p.id === id) || null;
  },

  createPlot: async (data: Omit<StoredPlot, "id">): Promise<StoredPlot> => {
    const store = loadStore();
    const newPlot: StoredPlot = {
      id: `plt-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      ...data,
    };
    store.plots.push(newPlot);
    saveStore(store);
    return newPlot;
  },

  updatePlot: async (id: string, updates: Partial<StoredPlot>): Promise<StoredPlot | null> => {
    const store = loadStore();
    const index = store.plots.findIndex((p) => p.id === id);
    if (index === -1) return null;

    store.plots[index] = {
      ...store.plots[index],
      ...updates,
    };
    saveStore(store);
    return store.plots[index];
  },

  deletePlot: async (id: string): Promise<boolean> => {
    const store = loadStore();
    const prevLen = store.plots.length;
    store.plots = store.plots.filter((p) => p.id !== id);
    if (store.plots.length !== prevLen) {
      saveStore(store);
      return true;
    }
    return false;
  },

  // -------------------------
  // Settings & CMS Content
  // -------------------------
  getSettings: async (): Promise<StoredSettings> => {
    const cached = backendCache.get<StoredSettings>("site_settings");
    if (cached) return cached;

    const store = loadStore();
    backendCache.set("site_settings", store.settings, 60);
    return store.settings;
  },

  updateSettings: async (updates: Partial<StoredSettings>): Promise<StoredSettings> => {
    const store = loadStore();
    store.settings = {
      ...store.settings,
      ...updates,
    };
    saveStore(store);
    return store.settings;
  },

  // -------------------------
  // Overview Stats
  // -------------------------
  getStats: async () => {
    const store = loadStore();
    const totalLeads = store.inquiries.length;
    const newLeads = store.inquiries.filter((l) => l.status === "New").length;
    const contactedLeads = store.inquiries.filter((l) => l.status === "Contacted").length;
    const totalPlots = store.plots.length;
    const availablePlots = store.plots.filter((p) => p.status === "Available").length;
    const reservedPlots = store.plots.filter((p) => p.status === "Reserved").length;
    const bookedPlots = store.plots.filter((p) => p.status === "Booked").length;
    const inventoryValue = store.plots.reduce((acc, p) => acc + (p.totalPrice || 0), 0);
    const totalUsers = store.users.length;

    return {
      totalLeads,
      newLeads,
      contactedLeads,
      totalPlots,
      availablePlots,
      reservedPlots,
      bookedPlots,
      inventoryValue,
      totalUsers,
      settings: store.settings,
    };
  },
};
