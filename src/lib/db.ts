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
  StoredBlog,
  StoredPageSeo,
  StoredRedirect,
} from "./types";
import { getMySQLPool, query } from "./mysql";

export * from "./types";

// -------------------------------------------------------------
// Session Token Cryptography (Direct HMAC Session Tokens)
// -------------------------------------------------------------

const APP_SECRET = process.env.APP_SECRET || "saffron-city-executive-secret-key-2026-secure";

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
// In-Memory Cache Manager
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

  set<T>(key: string, data: T, ttlSeconds: number = 30): void {
    this.cache.set(key, {
      data,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }
}

export const backendCache = new MemoryCacheManager();

// -------------------------------------------------------------
// Helper to verify database user password (supports direct string & hashed)
// -------------------------------------------------------------
function verifyUserPasswordInDb(inputPassword: string, storedHash: string, storedSalt?: string): boolean {
  if (!inputPassword || !storedHash) return false;
  // 1. Direct match (plain text in DB)
  if (inputPassword === storedHash) return true;

  // 2. Hash verification if salt exists
  if (storedSalt) {
    try {
      const h10k = crypto.pbkdf2Sync(inputPassword, storedSalt, 10000, 64, "sha512").toString("hex");
      if (h10k === storedHash) return true;
      const h100k = crypto.pbkdf2Sync(inputPassword, storedSalt, 100000, 64, "sha512").toString("hex");
      if (h100k === storedHash) return true;
    } catch {}
  }

  return false;
}

// -------------------------------------------------------------
// Direct MySQL Database API (Mapped to exact live saffron_city tables)
// -------------------------------------------------------------

export const db = {
  // -------------------------
  // 1. User Authentication (Direct from MySQL `user` table)
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
    try {
      const pool = getMySQLPool();
      const identifier = identifierInput.trim().toLowerCase();

      // Query database directly for matching user
      const [rows]: any = await pool.query(
        "SELECT * FROM `user` WHERE LOWER(`email`) = ? OR `id` = ? LIMIT 1",
        [identifier, identifier]
      );

      if (!rows || rows.length === 0) {
        return {
          success: false,
          message: "Invalid administrator credentials. User not found in database.",
        };
      }

      const userRow = rows[0];

      if (!userRow.isActive) {
        return {
          success: false,
          message: "This account has been deactivated by SuperAdmin. Please contact support.",
        };
      }

      // Verify password from DB
      const isPasswordValid = verifyUserPasswordInDb(
        passwordInput,
        userRow.passwordHash || userRow.password,
        userRow.salt
      );

      if (!isPasswordValid) {
        return {
          success: false,
          message: "Invalid administrator credentials. Incorrect password.",
        };
      }

      // Update last login timestamp in database
      await pool.query("UPDATE `user` SET `lastLoginAt` = NOW(), `failedAttempts` = 0 WHERE `id` = ?", [userRow.id]);

      const token = generateUserSessionToken(userRow.id, userRow.email);

      const permissions = typeof userRow.permissions === "string" ? JSON.parse(userRow.permissions) : (userRow.permissions || []);

      const safeUser: SafeUser = {
        id: userRow.id,
        email: userRow.email,
        name: userRow.name,
        role: userRow.role,
        permissions,
        isActive: Boolean(userRow.isActive),
        lastLoginAt: new Date().toISOString(),
        createdAt: userRow.createdAt,
      };

      return {
        success: true,
        user: safeUser,
        token,
      };
    } catch (err: any) {
      console.error("[MySQL Auth Error]:", err.message);
      return {
        success: false,
        message: `Database connection error: ${err.message}. Please verify MySQL service is running in XAMPP.`,
      };
    }
  },

  getUserById: async (id: string): Promise<SafeUser | null> => {
    try {
      const pool = getMySQLPool();
      const [rows]: any = await pool.query("SELECT * FROM `user` WHERE `id` = ? LIMIT 1", [id]);
      if (!rows || rows.length === 0) return null;
      const u = rows[0];
      return {
        id: u.id,
        email: u.email,
        name: u.name,
        role: u.role,
        permissions: typeof u.permissions === "string" ? JSON.parse(u.permissions) : (u.permissions || []),
        isActive: Boolean(u.isActive),
        lastLoginAt: u.lastLoginAt,
        createdAt: u.createdAt,
      };
    } catch (err: any) {
      console.error("[MySQL getUserById Error]:", err.message);
      return null;
    }
  },

  getUsers: async (): Promise<SafeUser[]> => {
    try {
      const pool = getMySQLPool();
      const [rows]: any = await pool.query("SELECT `id`, `email`, `name`, `role`, `permissions`, `isActive`, `lastLoginAt`, `createdAt` FROM `user` ORDER BY `createdAt` ASC");
      return (rows || []).map((u: any) => ({
        id: u.id,
        email: u.email,
        name: u.name,
        role: u.role,
        permissions: typeof u.permissions === "string" ? JSON.parse(u.permissions) : (u.permissions || []),
        isActive: Boolean(u.isActive),
        lastLoginAt: u.lastLoginAt,
        createdAt: u.createdAt,
      }));
    } catch (err: any) {
      console.error("[MySQL getUsers Error]:", err.message);
      return [];
    }
  },

  createUser: async (
    data: Omit<StoredUser, "id" | "failedAttempts" | "lockedUntil" | "createdAt" | "updatedAt"> & { password?: string }
  ): Promise<SafeUser | null> => {
    try {
      const pool = getMySQLPool();
      const id = `usr-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      const password = data.password || data.email;
      const salt = crypto.randomBytes(32).toString("hex");
      const passwordHash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
      const permissionsJson = JSON.stringify(data.permissions || []);

      await pool.query(
        `INSERT INTO \`user\` (\`id\`, \`email\`, \`name\`, \`passwordHash\`, \`salt\`, \`role\`, \`permissions\`, \`isActive\`, \`createdAt\`)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [id, data.email.toLowerCase().trim(), data.name, passwordHash, salt, data.role, permissionsJson, data.isActive ? 1 : 0]
      );

      return {
        id,
        email: data.email,
        name: data.name,
        role: data.role,
        permissions: data.permissions,
        isActive: data.isActive,
        createdAt: new Date().toISOString(),
      };
    } catch (err: any) {
      console.error("[MySQL createUser Error]:", err.message);
      return null;
    }
  },

  updateUser: async (id: string, updates: Partial<StoredUser> & { password?: string }): Promise<SafeUser | null> => {
    try {
      const pool = getMySQLPool();
      const fields: string[] = [];
      const values: any[] = [];

      if (updates.name !== undefined) {
        fields.push("`name` = ?");
        values.push(updates.name);
      }
      if (updates.email !== undefined) {
        fields.push("`email` = ?");
        values.push(updates.email.toLowerCase().trim());
      }
      if (updates.password !== undefined) {
        const salt = crypto.randomBytes(32).toString("hex");
        const passwordHash = crypto.pbkdf2Sync(updates.password, salt, 10000, 64, "sha512").toString("hex");
        fields.push("`passwordHash` = ?, `salt` = ?");
        values.push(passwordHash, salt);
      }
      if (updates.role !== undefined) {
        fields.push("`role` = ?");
        values.push(updates.role);
      }
      if (updates.permissions !== undefined) {
        fields.push("`permissions` = ?");
        values.push(JSON.stringify(updates.permissions));
      }
      if (updates.isActive !== undefined) {
        fields.push("`isActive` = ?");
        values.push(updates.isActive ? 1 : 0);
      }

      if (fields.length === 0) return null;

      values.push(id);
      await pool.query(`UPDATE \`user\` SET ${fields.join(", ")} WHERE \`id\` = ?`, values);

      const [rows]: any = await pool.query("SELECT * FROM `user` WHERE `id` = ? LIMIT 1", [id]);
      if (!rows || rows.length === 0) return null;
      const u = rows[0];
      return {
        id: u.id,
        email: u.email,
        name: u.name,
        role: u.role,
        permissions: typeof u.permissions === "string" ? JSON.parse(u.permissions) : u.permissions,
        isActive: Boolean(u.isActive),
        createdAt: u.createdAt,
      };
    } catch (err: any) {
      console.error("[MySQL updateUser Error]:", err.message);
      return null;
    }
  },

  unlockUser: async (id: string): Promise<boolean> => {
    try {
      const pool = getMySQLPool();
      const [res]: any = await pool.query("UPDATE `user` SET `failedAttempts` = 0, `lockedUntil` = NULL WHERE `id` = ?", [id]);
      return res.affectedRows > 0;
    } catch (err: any) {
      console.error("[MySQL unlockUser Error]:", err.message);
      return false;
    }
  },

  deleteUser: async (id: string): Promise<boolean> => {
    try {
      const pool = getMySQLPool();
      const [res]: any = await pool.query("DELETE FROM `user` WHERE `id` = ?", [id]);
      return res.affectedRows > 0;
    } catch (err: any) {
      console.error("[MySQL deleteUser Error]:", err.message);
      return false;
    }
  },

  createPasswordResetRequest: async (email: string): Promise<{ success: boolean; token?: string; message?: string }> => {
    try {
      const pool = getMySQLPool();
      const [rows]: any = await pool.query("SELECT * FROM `user` WHERE LOWER(`email`) = ? LIMIT 1", [email.toLowerCase().trim()]);
      if (!rows || rows.length === 0) {
        return { success: false, message: "No account found with this email." };
      }
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      await pool.query("INSERT INTO `passwordresettoken` (`id`, `token`, `userId`, `expiresAt`, `createdAt`) VALUES (?, ?, ?, DATE_ADD(NOW(), INTERVAL 15 MINUTE), NOW())", [
        `rst-${Date.now()}`,
        otp,
        rows[0].id,
      ]);
      return { success: true, token: otp, message: "Reset code generated." };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  },

  resetPasswordWithToken: async (token: string, newPassword: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const pool = getMySQLPool();
      const [rows]: any = await pool.query("SELECT * FROM `passwordresettoken` WHERE `token` = ? AND `expiresAt` > NOW() ORDER BY `createdAt` DESC LIMIT 1", [token]);
      if (!rows || rows.length === 0) {
        return { success: false, message: "Invalid or expired reset token." };
      }
      const userId = rows[0].userId;
      const salt = crypto.randomBytes(32).toString("hex");
      const passwordHash = crypto.pbkdf2Sync(newPassword, salt, 10000, 64, "sha512").toString("hex");
      await pool.query("UPDATE `user` SET `passwordHash` = ?, `salt` = ? WHERE `id` = ?", [passwordHash, salt, userId]);
      await pool.query("DELETE FROM `passwordresettoken` WHERE `token` = ?", [token]);
      return { success: true, message: "Password updated successfully." };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  },

  // -------------------------
  // 2. Dashboard Stats (Direct MySQL)
  // -------------------------
  getStats: async (): Promise<any> => {
    try {
      const pool = getMySQLPool();
      const [inqRows]: any = await pool.query("SELECT COUNT(*) AS total, SUM(CASE WHEN status = 'New' THEN 1 ELSE 0 END) AS unread FROM `leadinquiry`");
      const [plotRows]: any = await pool.query("SELECT COUNT(*) AS total, SUM(CASE WHEN status = 'Available' THEN 1 ELSE 0 END) AS available, SUM(CASE WHEN status IN ('Booked', 'Reserved') THEN 1 ELSE 0 END) AS booked, SUM(totalPrice) AS totalValuation FROM `plotinventory`");
      const [blogRows]: any = await pool.query("SELECT COUNT(*) AS total FROM `blogs`");

      return {
        totalLeads: inqRows[0]?.total || 0,
        unreadLeads: inqRows[0]?.unread || 0,
        totalPlots: plotRows[0]?.total || 0,
        availablePlots: plotRows[0]?.available || 0,
        bookedPlots: plotRows[0]?.booked || 0,
        totalInventoryValue: plotRows[0]?.totalValuation || 0,
        totalBlogs: blogRows[0]?.total || 0,
      };
    } catch (err: any) {
      console.error("[MySQL getStats Error]:", err.message);
      return {
        totalLeads: 0,
        unreadLeads: 0,
        totalPlots: 0,
        availablePlots: 0,
        bookedPlots: 0,
        totalInventoryValue: 0,
        totalBlogs: 0,
      };
    }
  },

  // -------------------------
  // 3. Inquiries / Leads (Direct MySQL `leadinquiry` table)
  // -------------------------
  getInquiries: async (): Promise<StoredInquiry[]> => {
    try {
      const pool = getMySQLPool();
      const [rows]: any = await pool.query("SELECT * FROM `leadinquiry` ORDER BY `createdAt` DESC");
      return rows || [];
    } catch (err: any) {
      console.error("[MySQL getInquiries Error]:", err.message);
      return [];
    }
  },

  createInquiry: async (inquiry: Omit<StoredInquiry, "id" | "createdAt" | "updatedAt">): Promise<StoredInquiry> => {
    const id = `lead-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    try {
      const pool = getMySQLPool();
      await pool.query(
        `INSERT INTO \`leadinquiry\` (\`id\`, \`name\`, \`phone\`, \`message\`, \`plotSize\`, \`plotType\`, \`sector\`, \`status\`, \`source\`, \`notes\`, \`createdAt\`)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [
          id,
          inquiry.name,
          inquiry.phone,
          inquiry.message || null,
          inquiry.plotSize || null,
          inquiry.plotType || null,
          inquiry.sector || null,
          inquiry.status || "New",
          inquiry.source || "Website Form",
          inquiry.notes || null,
        ]
      );
    } catch (err: any) {
      console.error("[MySQL createInquiry Error]:", err.message);
    }

    return {
      ...inquiry,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  },

  updateInquiry: async (id: string, updates: Partial<StoredInquiry>): Promise<StoredInquiry | null> => {
    try {
      const pool = getMySQLPool();
      const fields: string[] = [];
      const values: any[] = [];

      for (const [key, val] of Object.entries(updates)) {
        if (key !== "id") {
          fields.push(`\`${key}\` = ?`);
          values.push(val);
        }
      }

      if (fields.length > 0) {
        values.push(id);
        await pool.query(`UPDATE \`leadinquiry\` SET ${fields.join(", ")} WHERE \`id\` = ?`, values);
      }

      const [rows]: any = await pool.query("SELECT * FROM `leadinquiry` WHERE `id` = ? LIMIT 1", [id]);
      return rows && rows.length > 0 ? rows[0] : null;
    } catch (err: any) {
      console.error("[MySQL updateInquiry Error]:", err.message);
      return null;
    }
  },

  deleteInquiry: async (id: string): Promise<boolean> => {
    try {
      const pool = getMySQLPool();
      const [res]: any = await pool.query("DELETE FROM `leadinquiry` WHERE `id` = ?", [id]);
      return res.affectedRows > 0;
    } catch (err: any) {
      console.error("[MySQL deleteInquiry Error]:", err.message);
      return false;
    }
  },

  // -------------------------
  // 4. Plots Inventory (Direct MySQL `plotinventory` table)
  // -------------------------
  getPlots: async (): Promise<StoredPlot[]> => {
    try {
      const pool = getMySQLPool();
      const [rows]: any = await pool.query("SELECT * FROM `plotinventory` ORDER BY `createdAt` ASC");
      return (rows || []).map((p: any) => ({
        ...p,
        totalPrice: Number(p.totalPrice) || 0,
        downPayment: Number(p.downPayment) || 0,
        monthlyInst: Number(p.monthlyInst) || 0,
      }));
    } catch (err: any) {
      console.error("[MySQL getPlots Error]:", err.message);
      return [];
    }
  },

  createPlot: async (plot: Omit<StoredPlot, "id">): Promise<StoredPlot> => {
    const id = `plt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    try {
      const pool = getMySQLPool();
      await pool.query(
        `INSERT INTO \`plotinventory\` (\`id\`, \`plotNumber\`, \`sector\`, \`category\`, \`type\`, \`totalPrice\`, \`downPayment\`, \`monthlyInst\`, \`status\`, \`features\`, \`image\`, \`createdAt\`)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [
          id,
          plot.plotNumber,
          plot.sector,
          plot.category,
          plot.type,
          plot.totalPrice,
          plot.downPayment,
          plot.monthlyInst,
          plot.status || "Available",
          plot.features || "",
          plot.image || "/images/sectors/sector-a-luxury.jpg",
        ]
      );
    } catch (err: any) {
      console.error("[MySQL createPlot Error]:", err.message);
    }

    return { ...plot, id };
  },

  updatePlot: async (id: string, updates: Partial<StoredPlot>): Promise<StoredPlot | null> => {
    try {
      const pool = getMySQLPool();
      const fields: string[] = [];
      const values: any[] = [];

      for (const [key, val] of Object.entries(updates)) {
        if (key !== "id") {
          fields.push(`\`${key}\` = ?`);
          values.push(val);
        }
      }

      if (fields.length > 0) {
        values.push(id);
        await pool.query(`UPDATE \`plotinventory\` SET ${fields.join(", ")} WHERE \`id\` = ?`, values);
      }

      const [rows]: any = await pool.query("SELECT * FROM `plotinventory` WHERE `id` = ? LIMIT 1", [id]);
      return rows && rows.length > 0 ? rows[0] : null;
    } catch (err: any) {
      console.error("[MySQL updatePlot Error]:", err.message);
      return null;
    }
  },

  deletePlot: async (id: string): Promise<boolean> => {
    try {
      const pool = getMySQLPool();
      const [res]: any = await pool.query("DELETE FROM `plotinventory` WHERE `id` = ?", [id]);
      return res.affectedRows > 0;
    } catch (err: any) {
      console.error("[MySQL deletePlot Error]:", err.message);
      return false;
    }
  },

  // -------------------------
  // 5. Blogs CMS (Direct MySQL `blogs` table)
  // -------------------------
  getBlogs: async (publishedOnly: boolean = false): Promise<StoredBlog[]> => {
    try {
      const pool = getMySQLPool();
      const sql = publishedOnly
        ? "SELECT * FROM `blogs` WHERE `isPublished` = 1 ORDER BY `createdAt` DESC"
        : "SELECT * FROM `blogs` ORDER BY `createdAt` DESC";
      const [rows]: any = await pool.query(sql);
      return (rows || []).map((b: any) => ({
        ...b,
        isPublished: Boolean(b.isPublished),
        robotsIndex: Boolean(b.robotsIndex),
        robotsFollow: Boolean(b.robotsFollow),
      }));
    } catch (err: any) {
      console.error("[MySQL getBlogs Error]:", err.message);
      return [];
    }
  },

  getBlogBySlug: async (slug: string): Promise<StoredBlog | null> => {
    try {
      const pool = getMySQLPool();
      const [rows]: any = await pool.query("SELECT * FROM `blogs` WHERE `slug` = ? LIMIT 1", [slug]);
      if (!rows || rows.length === 0) return null;
      const b = rows[0];
      return {
        ...b,
        isPublished: Boolean(b.isPublished),
        robotsIndex: Boolean(b.robotsIndex),
        robotsFollow: Boolean(b.robotsFollow),
      };
    } catch (err: any) {
      console.error("[MySQL getBlogBySlug Error]:", err.message);
      return null;
    }
  },

  createBlog: async (blog: Omit<StoredBlog, "id" | "createdAt" | "updatedAt">): Promise<StoredBlog> => {
    const id = `blog-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    try {
      const pool = getMySQLPool();
      await pool.query(
        `INSERT INTO \`blogs\` (\`id\`, \`slug\`, \`title\`, \`excerpt\`, \`content\`, \`image\`, \`category\`, \`author\`, \`readTime\`, \`isPublished\`, \`seoTitle\`, \`metaDescription\`, \`canonicalUrl\`, \`robotsIndex\`, \`robotsFollow\`, \`focusKeyword\`, \`secondaryKeywords\`, \`h1Heading\`, \`createdAt\`) ` +
          "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())",
        [
          id,
          blog.slug,
          blog.title,
          blog.excerpt || "",
          blog.content || "",
          blog.image || "/images/blogs/rda-noc-guide.jpg",
          blog.category || "General",
          blog.author || "Editorial Team",
          blog.readTime || "5 min read",
          blog.isPublished ? 1 : 0,
          blog.seoTitle || null,
          blog.metaDescription || null,
          blog.canonicalUrl || null,
          blog.robotsIndex ? 1 : 0,
          blog.robotsFollow ? 1 : 0,
          blog.focusKeyword || null,
          blog.secondaryKeywords || null,
          blog.h1Heading || null,
        ]
      );
    } catch (err: any) {
      console.error("[MySQL createBlog Error]:", err.message);
    }

    return {
      ...blog,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  },

  updateBlog: async (id: string, updates: Partial<StoredBlog>): Promise<StoredBlog | null> => {
    try {
      const pool = getMySQLPool();
      const fields: string[] = [];
      const values: any[] = [];

      for (const [key, val] of Object.entries(updates)) {
        if (key !== "id") {
          fields.push(`\`${key}\` = ?`);
          values.push(typeof val === "boolean" ? (val ? 1 : 0) : val);
        }
      }

      if (fields.length > 0) {
        values.push(id);
        await pool.query(`UPDATE \`blogs\` SET ${fields.join(", ")} WHERE \`id\` = ?`, values);
      }

      return (await db.getBlogBySlug(updates.slug || id)) || null;
    } catch (err: any) {
      console.error("[MySQL updateBlog Error]:", err.message);
      return null;
    }
  },

  deleteBlog: async (id: string): Promise<boolean> => {
    try {
      const pool = getMySQLPool();
      const [res]: any = await pool.query("DELETE FROM `blogs` WHERE `id` = ? OR `slug` = ?", [id, id]);
      return res.affectedRows > 0;
    } catch (err: any) {
      console.error("[MySQL deleteBlog Error]:", err.message);
      return false;
    }
  },

  // -------------------------
  // 6. Settings & CMS Content (Direct MySQL `sitesetting` table)
  // -------------------------
  getSettings: async (): Promise<StoredSettings> => {
    const cached = backendCache.get<StoredSettings>("site_settings");
    if (cached) return cached;

    try {
      const pool = getMySQLPool();
      const [rows]: any = await pool.query("SELECT * FROM `sitesetting` WHERE `id` = 'default' LIMIT 1");
      if (rows && rows.length > 0) {
        const row = rows[0];
        const meta = row.metaSettingsJson ? (typeof row.metaSettingsJson === "string" ? JSON.parse(row.metaSettingsJson) : row.metaSettingsJson) : {};
        const hero = row.heroSettingsJson ? (typeof row.heroSettingsJson === "string" ? JSON.parse(row.heroSettingsJson) : row.heroSettingsJson) : {};
        const chairman = row.chairmanSettingsJson ? (typeof row.chairmanSettingsJson === "string" ? JSON.parse(row.chairmanSettingsJson) : row.chairmanSettingsJson) : {};
        const amenities = row.amenitiesJson ? (typeof row.amenitiesJson === "string" ? JSON.parse(row.amenitiesJson) : row.amenitiesJson) : [];
        const landmarks = row.landmarksJson ? (typeof row.landmarksJson === "string" ? JSON.parse(row.landmarksJson) : row.landmarksJson) : [];
        const paymentTiers = row.paymentTiersJson ? (typeof row.paymentTiersJson === "string" ? JSON.parse(row.paymentTiersJson) : row.paymentTiersJson) : [];

        const settings: StoredSettings = {
          siteName: row.siteName || "Saffron City Islamabad",
          contactPhone: row.contactPhone || "0333 1113551",
          secondaryPhone: row.secondaryPhone || "",
          whatsappPhone: row.whatsappPhone || "923331113551",
          officialEmail: row.officialEmail || "info@saffroncity.org",
          officeAddress: row.officeAddress || "Main GT Road, Near T-Chowk, Rawat, Islamabad / Rawalpindi",
          googleMapsUrl: "https://maps.google.com/?q=Saffron+City+Rawat+Islamabad",
          rdaNocStatus: row.rdaNocStatus || "RDA Approved (Full 15,000 Kanal)",
          rdaVerificationUrl: "https://punjab.gov.pk",
          announcement: row.announcement || "10% Pre-Launch Discount Active on 5 & 10 Marla Plots in Sector B",
          activePreLaunchDiscount: Boolean(row.activePreLaunchDiscount),
          smtpEnabled: Boolean(row.smtpEnabled),
          smtpHost: row.smtpHost || "smtp.hostinger.com",
          smtpPort: row.smtpPort || 465,
          smtpSecure: Boolean(row.smtpSecure),
          smtpUser: row.smtpUser || "info@saffroncity.org",
          smtpPass: row.smtpPass || "",
          smtpFromEmail: row.smtpFromEmail || "info@saffroncity.org",
          leadNotificationEmail: row.leadNotificationEmail || "info@saffroncity.org",
          ...meta,
          ...hero,
          ...chairman,
          amenities,
          landmarks,
          paymentTiers,
        };

        backendCache.set("site_settings", settings, 60);
        return settings;
      }
    } catch (err: any) {
      console.error("[MySQL getSettings Error]:", err.message);
    }

    return {
      siteName: "Saffron City Islamabad",
      contactPhone: "0333 1113551",
      secondaryPhone: "",
      whatsappPhone: "923331113551",
      officialEmail: "info@saffroncity.org",
      officeAddress: "Main GT Road, Near T-Chowk, Rawat, Islamabad / Rawalpindi",
      googleMapsUrl: "https://maps.google.com/?q=Saffron+City+Rawat+Islamabad",
      rdaNocStatus: "RDA Approved (Full 15,000 Kanal)",
      rdaVerificationUrl: "https://punjab.gov.pk",
      announcement: "10% Pre-Launch Discount Active on 5 & 10 Marla Plots in Sector B",
      activePreLaunchDiscount: true,
      smtpEnabled: true,
      smtpHost: "smtp.hostinger.com",
      smtpPort: 465,
      smtpSecure: true,
      smtpUser: "info@saffroncity.org",
      smtpPass: "",
      smtpFromEmail: "info@saffroncity.org",
      leadNotificationEmail: "info@saffroncity.org",
    } as StoredSettings;
  },

  updateSettings: async (updates: Partial<StoredSettings>): Promise<StoredSettings> => {
    try {
      const pool = getMySQLPool();
      const current = await db.getSettings();
      const merged: StoredSettings = { ...current, ...updates };

      await pool.query(
        `INSERT INTO \`sitesetting\` (
          \`id\`, \`siteName\`, \`contactPhone\`, \`secondaryPhone\`, \`whatsappPhone\`, \`officialEmail\`, \`officeAddress\`, \`rdaNocStatus\`, \`announcement\`, \`activePreLaunchDiscount\`, \`smtpEnabled\`, \`smtpHost\`, \`smtpPort\`, \`smtpSecure\`, \`smtpUser\`, \`smtpPass\`, \`smtpFromEmail\`, \`leadNotificationEmail\`
        ) VALUES ('default', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          \`siteName\` = VALUES(\`siteName\`),
          \`contactPhone\` = VALUES(\`contactPhone\`),
          \`secondaryPhone\` = VALUES(\`secondaryPhone\`),
          \`whatsappPhone\` = VALUES(\`whatsappPhone\`),
          \`officialEmail\` = VALUES(\`officialEmail\`),
          \`officeAddress\` = VALUES(\`officeAddress\`),
          \`rdaNocStatus\` = VALUES(\`rdaNocStatus\`),
          \`announcement\` = VALUES(\`announcement\`),
          \`activePreLaunchDiscount\` = VALUES(\`activePreLaunchDiscount\`),
          \`smtpEnabled\` = VALUES(\`smtpEnabled\`),
          \`smtpHost\` = VALUES(\`smtpHost\`),
          \`smtpPort\` = VALUES(\`smtpPort\`),
          \`smtpSecure\` = VALUES(\`smtpSecure\`),
          \`smtpUser\` = VALUES(\`smtpUser\`),
          \`smtpPass\` = VALUES(\`smtpPass\`),
          \`smtpFromEmail\` = VALUES(\`smtpFromEmail\`),
          \`leadNotificationEmail\` = VALUES(\`leadNotificationEmail\`);`,
        [
          merged.siteName,
          merged.contactPhone,
          merged.secondaryPhone || null,
          merged.whatsappPhone,
          merged.officialEmail,
          merged.officeAddress,
          merged.rdaNocStatus,
          merged.announcement || null,
          merged.activePreLaunchDiscount ? 1 : 0,
          merged.smtpEnabled ? 1 : 0,
          merged.smtpHost || null,
          merged.smtpPort || 465,
          merged.smtpSecure ? 1 : 0,
          merged.smtpUser || null,
          merged.smtpPass || null,
          merged.smtpFromEmail || null,
          merged.leadNotificationEmail || null,
        ]
      );

      backendCache.delete("site_settings");
      return merged;
    } catch (err: any) {
      console.error("[MySQL updateSettings Error]:", err.message);
      return updates as StoredSettings;
    }
  },

  // -------------------------
  // 7. Page SEO (Direct MySQL `pageseo` table)
  // -------------------------
  getPageSeoList: async (): Promise<StoredPageSeo[]> => {
    try {
      const pool = getMySQLPool();
      const [rows]: any = await pool.query("SELECT * FROM `pageseo` ORDER BY `path` ASC");
      return (rows || []).map((r: any) => ({
        ...r,
        robotsIndex: Boolean(r.robotsIndex),
        robotsFollow: Boolean(r.robotsFollow),
      }));
    } catch (err: any) {
      console.error("[MySQL getPageSeoList Error]:", err.message);
      return [];
    }
  },

  getPageSeoByPath: async (path: string): Promise<StoredPageSeo | null> => {
    try {
      const pool = getMySQLPool();
      const [rows]: any = await pool.query("SELECT * FROM `pageseo` WHERE `path` = ? LIMIT 1", [path]);
      if (!rows || rows.length === 0) return null;
      const r = rows[0];
      return {
        ...r,
        robotsIndex: Boolean(r.robotsIndex),
        robotsFollow: Boolean(r.robotsFollow),
      };
    } catch (err: any) {
      console.error("[MySQL getPageSeoByPath Error]:", err.message);
      return null;
    }
  },

  upsertPageSeo: async (data: Partial<StoredPageSeo> & { path: string }): Promise<StoredPageSeo | null> => {
    const id = data.id || `seo-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    try {
      const pool = getMySQLPool();
      await pool.query(
        `INSERT INTO \`pageseo\` (
          \`id\`, \`path\`, \`pageName\`, \`metaTitle\`, \`metaDescription\`, \`h1Heading\`, \`focusKeyword\`, \`secondaryKeywords\`, \`canonicalUrl\`, \`robotsIndex\`, \`robotsFollow\`, \`ogTitle\`, \`ogDescription\`, \`ogImage\`, \`twitterTitle\`, \`twitterDescription\`, \`twitterImage\`, \`schemaType\`, \`customJsonLd\`, \`updatedAt\`
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
        ON DUPLICATE KEY UPDATE
          \`pageName\` = VALUES(\`pageName\`),
          \`metaTitle\` = VALUES(\`metaTitle\`),
          \`metaDescription\` = VALUES(\`metaDescription\`),
          \`h1Heading\` = VALUES(\`h1Heading\`),
          \`focusKeyword\` = VALUES(\`focusKeyword\`),
          \`secondaryKeywords\` = VALUES(\`secondaryKeywords\`),
          \`canonicalUrl\` = VALUES(\`canonicalUrl\`),
          \`robotsIndex\` = VALUES(\`robotsIndex\`),
          \`robotsFollow\` = VALUES(\`robotsFollow\`),
          \`ogTitle\` = VALUES(\`ogTitle\`),
          \`ogDescription\` = VALUES(\`ogDescription\`),
          \`ogImage\` = VALUES(\`ogImage\`),
          \`twitterTitle\` = VALUES(\`twitterTitle\`),
          \`twitterDescription\` = VALUES(\`twitterDescription\`),
          \`twitterImage\` = VALUES(\`twitterImage\`),
          \`schemaType\` = VALUES(\`schemaType\`),
          \`customJsonLd\` = VALUES(\`customJsonLd\`),
          \`updatedAt\` = NOW();`,
        [
          id,
          data.path,
          data.pageName || data.path,
          data.metaTitle || "Saffron City Islamabad",
          data.metaDescription || "",
          data.h1Heading || null,
          data.focusKeyword || null,
          data.secondaryKeywords || null,
          data.canonicalUrl || null,
          data.robotsIndex !== false ? 1 : 0,
          data.robotsFollow !== false ? 1 : 0,
          data.ogTitle || null,
          data.ogDescription || null,
          data.ogImage || null,
          data.twitterTitle || null,
          data.twitterDescription || null,
          data.twitterImage || null,
          data.schemaType || "WebSite",
          data.customJsonLd || null,
        ]
      );

      return await db.getPageSeoByPath(data.path);
    } catch (err: any) {
      console.error("[MySQL upsertPageSeo Error]:", err.message);
      return null;
    }
  },

  deletePageSeo: async (id: string): Promise<boolean> => {
    try {
      const pool = getMySQLPool();
      const [res]: any = await pool.query("DELETE FROM `pageseo` WHERE `id` = ? OR `path` = ?", [id, id]);
      return res.affectedRows > 0;
    } catch (err: any) {
      console.error("[MySQL deletePageSeo Error]:", err.message);
      return false;
    }
  },

  // -------------------------
  // 8. Redirects (Direct MySQL `redirects` table)
  // -------------------------
  getRedirects: async (): Promise<StoredRedirect[]> => {
    try {
      const pool = getMySQLPool();
      const [rows]: any = await pool.query("SELECT * FROM `redirects` ORDER BY `createdAt` DESC");
      return (rows || []).map((r: any) => ({
        ...r,
        isActive: Boolean(r.isActive),
      }));
    } catch (err: any) {
      console.error("[MySQL getRedirects Error]:", err.message);
      return [];
    }
  },

  createRedirect: async (redirect: Omit<StoredRedirect, "id" | "hitCount" | "createdAt" | "updatedAt">): Promise<StoredRedirect> => {
    const id = `red-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    try {
      const pool = getMySQLPool();
      await pool.query(
        `INSERT INTO \`redirects\` (\`id\`, \`sourcePath\`, \`destinationUrl\`, \`statusCode\`, \`isActive\`, \`hitCount\`, \`createdAt\`)
         VALUES (?, ?, ?, ?, ?, 0, NOW())`,
        [id, redirect.sourcePath, redirect.destinationUrl, redirect.statusCode || 301, redirect.isActive ? 1 : 0]
      );
    } catch (err: any) {
      console.error("[MySQL createRedirect Error]:", err.message);
    }

    return {
      ...redirect,
      id,
      hitCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  },

  updateRedirect: async (id: string, updates: Partial<StoredRedirect>): Promise<StoredRedirect | null> => {
    try {
      const pool = getMySQLPool();
      const fields: string[] = [];
      const values: any[] = [];

      for (const [key, val] of Object.entries(updates)) {
        if (key !== "id") {
          fields.push(`\`${key}\` = ?`);
          values.push(typeof val === "boolean" ? (val ? 1 : 0) : val);
        }
      }

      if (fields.length > 0) {
        values.push(id);
        await pool.query(`UPDATE \`redirects\` SET ${fields.join(", ")} WHERE \`id\` = ?`, values);
      }

      const [rows]: any = await pool.query("SELECT * FROM `redirects` WHERE `id` = ? LIMIT 1", [id]);
      return rows && rows.length > 0 ? rows[0] : null;
    } catch (err: any) {
      console.error("[MySQL updateRedirect Error]:", err.message);
      return null;
    }
  },

  deleteRedirect: async (id: string): Promise<boolean> => {
    try {
      const pool = getMySQLPool();
      const [res]: any = await pool.query("DELETE FROM `redirects` WHERE `id` = ?", [id]);
      return res.affectedRows > 0;
    } catch (err: any) {
      console.error("[MySQL deleteRedirect Error]:", err.message);
      return false;
    }
  },
};
