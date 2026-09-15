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
import { getMySQLPool } from "./mysql";

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
// Helper to verify database user password (supports direct string & PBKDF2 hashed)
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

declare global {
  // eslint-disable-next-line no-var
  var __dbOfflineLogged: boolean | undefined;
}

function logDbNotice(context: string, err: any): void {
  const code = err?.code || err?.errno;
  const isConnError =
    code === "ECONNREFUSED" ||
    code === "ETIMEDOUT" ||
    code === "ENOTFOUND" ||
    code === "PROTOCOL_CONNECTION_LOST" ||
    code === "ER_ACCESS_DENIED_ERROR" ||
    code === "EHOSTUNREACH";

  if (isConnError) {
    if (process.env.NODE_ENV === "development" && !globalThis.__dbOfflineLogged) {
      console.info("[Database Notice] MySQL server is offline. Serving gracefully with resilient fallback data.");
      globalThis.__dbOfflineLogged = true;
    }
  } else {
    // Only log unexpected database logic errors
    if (err?.message) {
      console.warn(`[${context}]`, err.message);
    }
  }
}

// -------------------------------------------------------------
// Safe query helper with table name fallback
// -------------------------------------------------------------
async function safeQuery<T = any>(primarySql: string, fallbackSql: string, params: any[] = []): Promise<T> {
  const pool = getMySQLPool();
  try {
    const [results] = await pool.query(primarySql, params);
    return results as T;
  } catch (err: any) {
    // If table doesn't exist error (ER_NO_SUCH_TABLE: 1146), try fallback table
    if (err.errno === 1146 || err.code === "ER_NO_SUCH_TABLE") {
      const [fallbackResults] = await pool.query(fallbackSql, params);
      return fallbackResults as T;
    }
    throw err;
  }
}

// -------------------------------------------------------------
// Direct MySQL Database API (Online Database Only)
// -------------------------------------------------------------

export const db = {
  // -------------------------
  // 1. User Authentication (Strict MySQL Database)
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
    const identifier = identifierInput.trim().toLowerCase();

    try {
      // Query database directly for matching user (supporting `users` and `user`)
      const rows: any = await safeQuery(
        "SELECT * FROM `users` WHERE LOWER(`email`) = ? OR `id` = ? LIMIT 1",
        "SELECT * FROM `user` WHERE LOWER(`email`) = ? OR `id` = ? LIMIT 1",
        [identifier, identifier]
      );

      if (rows && rows.length > 0) {
        const userRow = rows[0];

        if (!userRow.isActive) {
          return {
            success: false,
            message: "This account has been deactivated by SuperAdmin. Please contact support.",
          };
        }

        // Check account lockout
        if (userRow.lockedUntil && new Date(userRow.lockedUntil) > new Date()) {
          const remainingMinutes = Math.ceil((new Date(userRow.lockedUntil).getTime() - Date.now()) / (60 * 1000));
          return {
            success: false,
            locked: true,
            remainingMinutes,
            message: `Account is temporarily locked due to repeated failed attempts. Please retry in ${remainingMinutes} minutes.`,
          };
        }

        // Verify password from DB
        const isPasswordValid = verifyUserPasswordInDb(
          passwordInput,
          userRow.passwordHash || userRow.password,
          userRow.salt
        );

        if (!isPasswordValid) {
          const newAttempts = (userRow.failedAttempts || 0) + 1;
          const maxAttempts = 5;

          if (newAttempts >= maxAttempts) {
            const lockTime = new Date(Date.now() + 15 * 60 * 1000); // 15 mins lock
            try {
              await safeQuery(
                "UPDATE `users` SET `failedAttempts` = ?, `lockedUntil` = ? WHERE `id` = ?",
                "UPDATE `user` SET `failedAttempts` = ?, `lockedUntil` = ? WHERE `id` = ?",
                [newAttempts, lockTime, userRow.id]
              );
            } catch {}
            return {
              success: false,
              locked: true,
              remainingMinutes: 15,
              message: "Account has been locked for 15 minutes due to 5 failed login attempts.",
            };
          } else {
            try {
              await safeQuery(
                "UPDATE `users` SET `failedAttempts` = ? WHERE `id` = ?",
                "UPDATE `user` SET `failedAttempts` = ? WHERE `id` = ?",
                [newAttempts, userRow.id]
              );
            } catch {}
            return {
              success: false,
              attemptsLeft: maxAttempts - newAttempts,
              message: `Invalid administrator password. ${maxAttempts - newAttempts} attempt(s) remaining before lock.`,
            };
          }
        }

        // Reset attempts and update last login timestamp in database
        try {
          await safeQuery(
            "UPDATE `users` SET `lastLoginAt` = NOW(), `failedAttempts` = 0, `lockedUntil` = NULL WHERE `id` = ?",
            "UPDATE `user` SET `lastLoginAt` = NOW(), `failedAttempts` = 0, `lockedUntil` = NULL WHERE `id` = ?",
            [userRow.id]
          );
        } catch {}

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
      }

      return {
        success: false,
        message: "Invalid administrator credentials. Account not found or password incorrect.",
      };
    } catch (err: any) {
      console.error("[MySQL Auth Error]:", err?.message || err);
      return {
        success: false,
        message: "Database connection failure. Please ensure MySQL database is running.",
      };
    }
  },

  getUserById: async (id: string): Promise<SafeUser | null> => {
    try {
      const rows: any = await safeQuery(
        "SELECT * FROM `users` WHERE `id` = ? LIMIT 1",
        "SELECT * FROM `user` WHERE `id` = ? LIMIT 1",
        [id]
      );
      if (rows && rows.length > 0) {
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
      }
    } catch (err: any) {
      logDbNotice("getUserById", err);
    }
    return null;
  },

  getUsers: async (): Promise<SafeUser[]> => {
    try {
      const rows: any = await safeQuery(
        "SELECT `id`, `email`, `name`, `role`, `permissions`, `isActive`, `lastLoginAt`, `createdAt` FROM `users` ORDER BY `createdAt` ASC",
        "SELECT `id`, `email`, `name`, `role`, `permissions`, `isActive`, `lastLoginAt`, `createdAt` FROM `user` ORDER BY `createdAt` ASC"
      );
      if (rows && rows.length > 0) {
        return rows.map((u: any) => ({
          id: u.id,
          email: u.email,
          name: u.name,
          role: u.role,
          permissions: typeof u.permissions === "string" ? JSON.parse(u.permissions) : (u.permissions || []),
          isActive: Boolean(u.isActive),
          lastLoginAt: u.lastLoginAt,
          createdAt: u.createdAt,
        }));
      }
    } catch (err: any) {
      logDbNotice("getUsers", err);
    }
    return [];
  },

  createUser: async (
    data: Omit<StoredUser, "id" | "failedAttempts" | "lockedUntil" | "createdAt" | "updatedAt"> & { password?: string }
  ): Promise<SafeUser | null> => {
    const id = `usr-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const password = data.password || data.email;
    const salt = crypto.randomBytes(32).toString("hex");
    const passwordHash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
    const permissionsJson = JSON.stringify(data.permissions || []);

    try {
      await safeQuery(
        `INSERT INTO \`users\` (\`id\`, \`email\`, \`name\`, \`passwordHash\`, \`salt\`, \`role\`, \`permissions\`, \`isActive\`, \`createdAt\`)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
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
      console.error("[MySQL createUser Error]:", err?.message);
      return null;
    }
  },

  updateUser: async (id: string, updates: Partial<StoredUser> & { password?: string }): Promise<SafeUser | null> => {
    try {
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

      if (fields.length > 0) {
        values.push(id);
        await safeQuery(
          `UPDATE \`users\` SET ${fields.join(", ")} WHERE \`id\` = ?`,
          `UPDATE \`user\` SET ${fields.join(", ")} WHERE \`id\` = ?`,
          values
        );
      }

      const rows: any = await safeQuery(
        "SELECT * FROM `users` WHERE `id` = ? LIMIT 1",
        "SELECT * FROM `user` WHERE `id` = ? LIMIT 1",
        [id]
      );
      if (rows && rows.length > 0) {
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
      }
    } catch (err: any) {
      console.error("[MySQL updateUser Error]:", err?.message);
    }
    return null;
  },

  unlockUser: async (id: string): Promise<boolean> => {
    try {
      const res: any = await safeQuery(
        "UPDATE `users` SET `failedAttempts` = 0, `lockedUntil` = NULL WHERE `id` = ?",
        "UPDATE `user` SET `failedAttempts` = 0, `lockedUntil` = NULL WHERE `id` = ?",
        [id]
      );
      return res.affectedRows > 0;
    } catch {
      return false;
    }
  },

  deleteUser: async (id: string): Promise<boolean> => {
    try {
      const res: any = await safeQuery(
        "DELETE FROM `users` WHERE `id` = ?",
        "DELETE FROM `user` WHERE `id` = ?",
        [id]
      );
      return res.affectedRows > 0;
    } catch {
      return false;
    }
  },

  createPasswordResetRequest: async (email: string): Promise<{ success: boolean; token?: string; message?: string }> => {
    try {
      const rows: any = await safeQuery(
        "SELECT * FROM `users` WHERE LOWER(`email`) = ? LIMIT 1",
        "SELECT * FROM `user` WHERE LOWER(`email`) = ? LIMIT 1",
        [email.toLowerCase().trim()]
      );
      if (rows && rows.length > 0) {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await safeQuery(
          "INSERT INTO `passwordresettoken` (`id`, `token`, `userId`, `expiresAt`, `createdAt`) VALUES (?, ?, ?, DATE_ADD(NOW(), INTERVAL 15 MINUTE), NOW())",
          "INSERT INTO `passwordresettoken` (`id`, `token`, `userId`, `expiresAt`, `createdAt`) VALUES (?, ?, ?, DATE_ADD(NOW(), INTERVAL 15 MINUTE), NOW())",
          [`rst-${Date.now()}`, otp, rows[0].id]
        );
        return { success: true, token: otp, message: "Reset code generated." };
      }
    } catch (err: any) {
      console.error("[MySQL createPasswordResetRequest Error]:", err?.message);
    }
    return { success: false, message: "No account found with this email or database offline." };
  },

  resetPasswordWithToken: async (token: string, newPassword: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const rows: any = await safeQuery(
        "SELECT * FROM `passwordresettoken` WHERE `token` = ? AND `expiresAt` > NOW() ORDER BY `createdAt` DESC LIMIT 1",
        "SELECT * FROM `passwordresettoken` WHERE `token` = ? AND `expiresAt` > NOW() ORDER BY `createdAt` DESC LIMIT 1",
        [token]
      );
      if (rows && rows.length > 0) {
        const userId = rows[0].userId;
        const salt = crypto.randomBytes(32).toString("hex");
        const passwordHash = crypto.pbkdf2Sync(newPassword, salt, 10000, 64, "sha512").toString("hex");

        await safeQuery(
          "UPDATE `users` SET `passwordHash` = ?, `salt` = ? WHERE `id` = ?",
          "UPDATE `user` SET `passwordHash` = ?, `salt` = ? WHERE `id` = ?",
          [passwordHash, salt, userId]
        );

        await safeQuery(
          "DELETE FROM `passwordresettoken` WHERE `token` = ?",
          "DELETE FROM `passwordresettoken` WHERE `token` = ?",
          [token]
        );
        return { success: true, message: "Password updated successfully." };
      }
    } catch (err: any) {
      console.error("[MySQL resetPasswordWithToken Error]:", err?.message);
    }
    return { success: false, message: "Invalid or expired reset token." };
  },

  // -------------------------
  // 2. Dashboard Stats (Strict MySQL Database)
  // -------------------------
  getStats: async (): Promise<any> => {
    try {
      const inqRows: any = await safeQuery(
        "SELECT COUNT(*) AS total, SUM(CASE WHEN status = 'New' THEN 1 ELSE 0 END) AS unread FROM `inquiries`",
        "SELECT COUNT(*) AS total, SUM(CASE WHEN status = 'New' THEN 1 ELSE 0 END) AS unread FROM `leadinquiry`"
      );
      const plotRows: any = await safeQuery(
        "SELECT COUNT(*) AS total, SUM(CASE WHEN status = 'Available' THEN 1 ELSE 0 END) AS available, SUM(CASE WHEN status IN ('Booked', 'Reserved') THEN 1 ELSE 0 END) AS booked, SUM(totalPrice) AS totalValuation FROM `plots`",
        "SELECT COUNT(*) AS total, SUM(CASE WHEN status = 'Available' THEN 1 ELSE 0 END) AS available, SUM(CASE WHEN status IN ('Booked', 'Reserved') THEN 1 ELSE 0 END) AS booked, SUM(totalPrice) AS totalValuation FROM `plotinventory`"
      );
      const blogRows: any = await safeQuery(
        "SELECT COUNT(*) AS total FROM `blogs`",
        "SELECT COUNT(*) AS total FROM `blogs`"
      );

      return {
        totalLeads: Number(inqRows[0]?.total) || 0,
        unreadLeads: Number(inqRows[0]?.unread) || 0,
        totalPlots: Number(plotRows[0]?.total) || 0,
        availablePlots: Number(plotRows[0]?.available) || 0,
        bookedPlots: Number(plotRows[0]?.booked) || 0,
        totalInventoryValue: Number(plotRows[0]?.totalValuation) || 0,
        totalBlogs: Number(blogRows[0]?.total) || 0,
      };
    } catch (err: any) {
      logDbNotice("getStats", err);
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
  // 3. Inquiries / Leads (Strict MySQL Database)
  // -------------------------
  getInquiries: async (): Promise<StoredInquiry[]> => {
    try {
      const rows: any = await safeQuery(
        "SELECT * FROM `inquiries` ORDER BY `createdAt` DESC",
        "SELECT * FROM `leadinquiry` ORDER BY `createdAt` DESC"
      );
      if (rows && Array.isArray(rows)) return rows;
    } catch (err: any) {
      logDbNotice("getInquiries", err);
    }
    return [];
  },

  createInquiry: async (inquiry: Omit<StoredInquiry, "id" | "createdAt" | "updatedAt">): Promise<StoredInquiry> => {
    const id = `lead-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    try {
      await safeQuery(
        `INSERT INTO \`inquiries\` (\`id\`, \`name\`, \`phone\`, \`message\`, \`plotSize\`, \`plotType\`, \`sector\`, \`status\`, \`source\`, \`notes\`, \`createdAt\`)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
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
      logDbNotice("createInquiry", err);
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
      const allowedColumns = new Set([
        "name", "phone", "email", "message", "plotSize", "plotType", "sector", "status", "source", "notes"
      ]);
      const fields: string[] = [];
      const values: any[] = [];

      for (const [key, val] of Object.entries(updates)) {
        if (allowedColumns.has(key)) {
          fields.push(`\`${key}\` = ?`);
          values.push(val);
        }
      }

      if (fields.length > 0) {
        values.push(id);
        await safeQuery(
          `UPDATE \`inquiries\` SET ${fields.join(", ")} WHERE \`id\` = ?`,
          `UPDATE \`leadinquiry\` SET ${fields.join(", ")} WHERE \`id\` = ?`,
          values
        );
      }

      const rows: any = await safeQuery(
        "SELECT * FROM `inquiries` WHERE `id` = ? LIMIT 1",
        "SELECT * FROM `leadinquiry` WHERE `id` = ? LIMIT 1",
        [id]
      );
      return rows && rows.length > 0 ? rows[0] : null;
    } catch (err: any) {
      logDbNotice("updateInquiry", err);
    }
    return null;
  },

  deleteInquiry: async (id: string): Promise<boolean> => {
    try {
      const res: any = await safeQuery(
        "DELETE FROM `inquiries` WHERE `id` = ?",
        "DELETE FROM `leadinquiry` WHERE `id` = ?",
        [id]
      );
      return res.affectedRows > 0;
    } catch {
      return false;
    }
  },

  // -------------------------
  // 4. Plots Inventory (Strict MySQL Database)
  // -------------------------
  getPlots: async (): Promise<StoredPlot[]> => {
    const cached = backendCache.get<StoredPlot[]>("plots_all");
    if (cached) return cached;

    let result: StoredPlot[] = [];
    try {
      const rows: any = await safeQuery(
        "SELECT * FROM `plots` ORDER BY `createdAt` DESC, `id` DESC",
        "SELECT * FROM `plotinventory` ORDER BY `createdAt` DESC, `id` DESC"
      );
      if (rows && Array.isArray(rows)) {
        result = rows.map((p: any) => ({
          ...p,
          totalPrice: Number(p.totalPrice) || 0,
          downPayment: Number(p.downPayment) || 0,
          monthlyInst: Number(p.monthlyInst) || 0,
        }));
        backendCache.set("plots_all", result, 60);
      }
    } catch (err: any) {
      logDbNotice("getPlots", err);
    }

    return result;
  },

  createPlot: async (plot: Omit<StoredPlot, "id">): Promise<StoredPlot> => {
    backendCache.delete("plots_all");
    const id = `plt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    try {
      await safeQuery(
        `INSERT INTO \`plots\` (\`id\`, \`plotNumber\`, \`sector\`, \`category\`, \`type\`, \`totalPrice\`, \`downPayment\`, \`monthlyInst\`, \`status\`, \`features\`, \`image\`, \`createdAt\`)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
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
          plot.image || "/images/sectors/sector-a-luxury.webp",
        ]
      );
    } catch (err: any) {
      console.error("[MySQL createPlot Error]:", err?.message);
    }

    return { ...plot, id };
  },

  updatePlot: async (id: string, updates: Partial<StoredPlot>): Promise<StoredPlot | null> => {
    backendCache.delete("plots_all");
    try {
      const allowedColumns = new Set([
        "plotNumber", "sector", "category", "type", "totalPrice", "downPayment", "monthlyInst", "status", "features", "image"
      ]);
      const fields: string[] = [];
      const values: any[] = [];

      for (const [key, val] of Object.entries(updates)) {
        if (allowedColumns.has(key)) {
          fields.push(`\`${key}\` = ?`);
          values.push(val);
        }
      }

      if (fields.length > 0) {
        values.push(id);
        await safeQuery(
          `UPDATE \`plots\` SET ${fields.join(", ")} WHERE \`id\` = ?`,
          `UPDATE \`plotinventory\` SET ${fields.join(", ")} WHERE \`id\` = ?`,
          values
        );
      }

      const rows: any = await safeQuery(
        "SELECT * FROM `plots` WHERE `id` = ? LIMIT 1",
        "SELECT * FROM `plotinventory` WHERE `id` = ? LIMIT 1",
        [id]
      );
      return rows && rows.length > 0 ? rows[0] : null;
    } catch (err: any) {
      console.error("[MySQL updatePlot Error]:", err?.message);
    }
    return null;
  },

  deletePlot: async (id: string): Promise<boolean> => {
    backendCache.delete("plots_all");
    try {
      const res: any = await safeQuery(
        "DELETE FROM `plots` WHERE `id` = ?",
        "DELETE FROM `plotinventory` WHERE `id` = ?",
        [id]
      );
      return res.affectedRows > 0;
    } catch {
      return false;
    }
  },

  // -------------------------
  // 5. Blogs CMS (Strict MySQL Database)
  // -------------------------
  getBlogs: async (publishedOnly: boolean = false): Promise<StoredBlog[]> => {
    const cacheKey = `blogs_all_${publishedOnly}`;
    const cached = backendCache.get<StoredBlog[]>(cacheKey);
    if (cached) return cached;

    const normalizeBlogImage = (img?: string, idx: number = 0): string => {
      if (!img || img === ".webp" || img === ".jpg" || img === ".png" || img.trim().length <= 5) {
        const fallbacks = [
          "/images/hero-bg.webp",
          "/images/sectors/sector-a-luxury.webp",
          "/images/facilities/gated-security.webp",
          "/images/landmark_t_chowk.webp",
          "/images/sectors/commercial-plaza.webp",
          "/images/about/about-hero-banner.webp",
        ];
        return fallbacks[idx % fallbacks.length];
      }
      return img;
    };

    const parseBlogFaqs = (rawFaqs: any): any[] => {
      if (!rawFaqs) return [];
      if (Array.isArray(rawFaqs)) return rawFaqs;
      if (typeof rawFaqs === "string") {
        try {
          const p = JSON.parse(rawFaqs);
          return Array.isArray(p) ? p : [];
        } catch {
          return [];
        }
      }
      return [];
    };

    let result: StoredBlog[] = [];
    try {
      const pool = getMySQLPool();
      const sql = publishedOnly
        ? "SELECT * FROM `blogs` WHERE `isPublished` = 1 ORDER BY `createdAt` DESC"
        : "SELECT * FROM `blogs` ORDER BY `createdAt` DESC";
      const [rows]: any = await pool.query(sql);
      if (rows && Array.isArray(rows)) {
        result = rows.map((b: any, index: number) => ({
          ...b,
          authorRole: b.authorRole || undefined,
          authorBio: b.authorBio || undefined,
          showProjectSnapshot: Boolean(b.showProjectSnapshot),
          image: normalizeBlogImage(b.image || b.coverImage, index),
          coverImage: normalizeBlogImage(b.coverImage || b.image, index),
          isPublished: Boolean(b.isPublished),
          robotsIndex: Boolean(b.robotsIndex),
          robotsFollow: Boolean(b.robotsFollow),
          faqs: parseBlogFaqs(b.faqs),
        }));
      }
    } catch (err: any) {
      logDbNotice("getBlogs", err);
    }

    backendCache.set(cacheKey, result, 60);
    return result;
  },

  getBlogBySlug: async (slug: string): Promise<StoredBlog | null> => {
    const cacheKey = `blog_slug_${slug}`;
    const cached = backendCache.get<StoredBlog>(cacheKey);
    if (cached) return cached;

    const normalizeBlogImage = (img?: string, idx: number = 0): string => {
      if (!img || img === ".webp" || img === ".jpg" || img === ".png" || img.trim().length <= 5) {
        const fallbacks = [
          "/images/hero-bg.webp",
          "/images/sectors/sector-a-luxury.webp",
          "/images/facilities/gated-security.webp",
          "/images/landmark_t_chowk.webp",
          "/images/sectors/commercial-plaza.webp",
          "/images/about/about-hero-banner.webp",
        ];
        return fallbacks[idx % fallbacks.length];
      }
      return img;
    };

    const parseBlogFaqs = (rawFaqs: any): any[] => {
      if (!rawFaqs) return [];
      if (Array.isArray(rawFaqs)) return rawFaqs;
      if (typeof rawFaqs === "string") {
        try {
          const p = JSON.parse(rawFaqs);
          return Array.isArray(p) ? p : [];
        } catch {
          return [];
        }
      }
      return [];
    };

    try {
      const pool = getMySQLPool();
      const [rows]: any = await pool.query("SELECT * FROM `blogs` WHERE `slug` = ? LIMIT 1", [slug]);
      if (rows && rows.length > 0) {
        const b = rows[0];
        const res = {
          ...b,
          authorRole: b.authorRole || undefined,
          authorBio: b.authorBio || undefined,
          showProjectSnapshot: Boolean(b.showProjectSnapshot),
          image: normalizeBlogImage(b.image || b.coverImage, 0),
          coverImage: normalizeBlogImage(b.coverImage || b.image, 0),
          isPublished: Boolean(b.isPublished),
          robotsIndex: Boolean(b.robotsIndex),
          robotsFollow: Boolean(b.robotsFollow),
          faqs: parseBlogFaqs(b.faqs),
        };
        backendCache.set(cacheKey, res, 60);
        return res;
      }
    } catch (err: any) {
      logDbNotice("getBlogBySlug", err);
    }

    return null;
  },

  createBlog: async (blog: Omit<StoredBlog, "id" | "createdAt" | "updatedAt">): Promise<StoredBlog> => {
    backendCache.delete("blogs_all_true");
    backendCache.delete("blogs_all_false");
    const id = `blog-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    try {
      const pool = getMySQLPool();
      await pool.query("ALTER TABLE `blogs` ADD COLUMN `faqs` JSON NULL;").catch(() => {});
      await pool.query("ALTER TABLE `blogs` ADD COLUMN `authorRole` VARCHAR(191) NULL;").catch(() => {});
      await pool.query("ALTER TABLE `blogs` ADD COLUMN `authorBio` TEXT NULL;").catch(() => {});
      await pool.query("ALTER TABLE `blogs` ADD COLUMN `showProjectSnapshot` BOOLEAN DEFAULT 0;").catch(() => {});
      await pool.query(
        `INSERT INTO \`blogs\` (\`id\`, \`slug\`, \`title\`, \`excerpt\`, \`content\`, \`image\`, \`category\`, \`author\`, \`authorRole\`, \`authorBio\`, \`showProjectSnapshot\`, \`readTime\`, \`isPublished\`, \`seoTitle\`, \`metaDescription\`, \`canonicalUrl\`, \`robotsIndex\`, \`robotsFollow\`, \`focusKeyword\`, \`secondaryKeywords\`, \`h1Heading\`, \`imageAlt\`, \`faqs\`, \`createdAt\`) ` +
          "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())",
        [
          id,
          blog.slug,
          blog.title,
          blog.excerpt || "",
          blog.content || "",
          blog.image || "/images/hero-bg.webp",
          blog.category || "General",
          blog.author || "Editorial Team",
          blog.authorRole || null,
          blog.authorBio || null,
          blog.showProjectSnapshot ? 1 : 0,
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
          blog.imageAlt || null,
          blog.faqs ? JSON.stringify(blog.faqs) : null,
        ]
      );
    } catch (err: any) {
      logDbNotice("createBlog", err);
      // Fallback in case table schema lacks custom columns
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
            blog.image || "/images/hero-bg.webp",
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
      } catch (fallbackErr: any) {
        logDbNotice("createBlog Fallback", fallbackErr);
      }
    }

    return {
      ...blog,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  },

  updateBlog: async (id: string, updates: Partial<StoredBlog>): Promise<StoredBlog | null> => {
    backendCache.delete("blogs_all_true");
    backendCache.delete("blogs_all_false");
    if (updates.slug) backendCache.delete(`blog_slug_${updates.slug}`);
    backendCache.delete(`blog_slug_${id}`);
    try {
      const allowedColumns = new Set([
        "slug", "title", "excerpt", "content", "image", "coverImage", "category",
        "author", "authorRole", "authorBio", "showProjectSnapshot", "readTime", "isPublished", "seoTitle", "metaDescription",
        "canonicalUrl", "robotsIndex", "robotsFollow", "focusKeyword",
        "secondaryKeywords", "h1Heading", "imageAlt", "ogTitle", "ogDescription",
        "ogImage", "twitterTitle", "twitterDescription", "twitterImage", "customSchema", "faqs"
      ]);
      const pool = getMySQLPool();
      const fields: string[] = [];
      const values: any[] = [];

      for (const [key, val] of Object.entries(updates)) {
        if (allowedColumns.has(key)) {
          fields.push(`\`${key}\` = ?`);
          if (key === "faqs") {
            values.push(val ? (typeof val === "string" ? val : JSON.stringify(val)) : null);
          } else {
            values.push(typeof val === "boolean" ? (val ? 1 : 0) : val);
          }
        }
      }

      if (fields.length > 0) {
        fields.push("`updatedAt` = NOW()");
        values.push(id, id);
        await pool.query(`UPDATE \`blogs\` SET ${fields.join(", ")} WHERE \`id\` = ? OR \`slug\` = ?`, values);
      }

      const [rows]: any = await pool.query("SELECT * FROM `blogs` WHERE `id` = ? OR `slug` = ? LIMIT 1", [id, updates.slug || id]);
      if (rows && rows.length > 0) {
        const b = rows[0];
        backendCache.delete(`blog_slug_${b.slug}`);
        return {
          ...b,
          image: b.image || b.coverImage || "/images/hero-bg.webp",
          coverImage: b.coverImage || b.image || "/images/hero-bg.webp",
          isPublished: Boolean(b.isPublished),
          robotsIndex: Boolean(b.robotsIndex),
          robotsFollow: Boolean(b.robotsFollow),
          faqs: Array.isArray(b.faqs)
            ? b.faqs
            : typeof b.faqs === "string"
            ? (() => {
                try {
                  const p = JSON.parse(b.faqs);
                  return Array.isArray(p) ? p : [];
                } catch {
                  return [];
                }
              })()
            : [],
        };
      }
    } catch (err: any) {
      console.error("[MySQL updateBlog Error]:", err?.message);
    }
    return null;
  },

  deleteBlog: async (id: string): Promise<boolean> => {
    backendCache.delete("blogs_all_true");
    backendCache.delete("blogs_all_false");
    backendCache.delete(`blog_slug_${id}`);
    try {
      const pool = getMySQLPool();
      const [res]: any = await pool.query("DELETE FROM `blogs` WHERE `id` = ? OR `slug` = ?", [id, id]);
      return res.affectedRows > 0;
    } catch {
      return false;
    }
  },

  // -------------------------
  // 6. Settings & CMS Content (Strict MySQL Database)
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

        // Auto-normalize image extensions (.jpg/.png -> .webp)
        if (settings.heroBgImage && settings.heroBgImage.endsWith(".jpg")) {
          settings.heroBgImage = settings.heroBgImage.replace(".jpg", ".webp");
        }
        if (!settings.heroBgImage || settings.heroBgImage === "") {
          settings.heroBgImage = "/images/hero-bg.webp";
        }
        if (settings.chairmanPortrait && (settings.chairmanPortrait.endsWith(".png") || settings.chairmanPortrait.endsWith(".jpg"))) {
          settings.chairmanPortrait = "/images/chairman_portrait_hd.webp";
        }
        if (!settings.chairmanPortrait || settings.chairmanPortrait === "") {
          settings.chairmanPortrait = "/images/chairman_portrait_hd.webp";
        }
        if (settings.ogImage && settings.ogImage.endsWith(".jpg")) {
          settings.ogImage = settings.ogImage.replace(".jpg", ".webp");
        }

        backendCache.set("site_settings", settings, 60);
        return settings;
      }
    } catch (err: any) {
      logDbNotice("getSettings", err);
    }

    const defaultFallback: StoredSettings = {
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
      heroBgImage: "/images/hero-bg.webp",
      chairmanPortrait: "/images/chairman_portrait_hd.webp",
    } as StoredSettings;

    backendCache.set("site_settings", defaultFallback, 60);
    return defaultFallback;
  },

  updateSettings: async (updates: Partial<StoredSettings>): Promise<StoredSettings> => {
    try {
      const pool = getMySQLPool();
      const current = await db.getSettings();
      const merged: StoredSettings = { ...current, ...updates };

      const metaKeys = [
        "metaTitle", "metaDescription", "metaKeywords", "canonicalUrl",
        "googleSiteVerification", "defaultRobotsIndex", "defaultRobotsFollow",
        "ogTitle", "ogDescription", "ogImage", "twitterCard", "twitterSite",
        "twitterCreator", "twitterTitle", "twitterDescription", "twitterImage",
        "orgName", "orgLogo", "orgLegalName", "orgPriceRange", "orgStreetAddress",
        "orgAddressLocality", "orgAddressRegion", "orgPostalCode", "orgAddressCountry",
        "orgGeoLat", "orgGeoLng", "orgOpeningHoursOpens", "orgOpeningHoursCloses",
        "facebookUrl", "instagramUrl", "youtubeUrl", "linkedinUrl", "twitterUrl",
        "googleAnalyticsId", "googleTagManagerId", "customHeadScript"
      ];
      const metaData: Record<string, any> = {};
      for (const key of metaKeys) {
        if (merged[key as keyof StoredSettings] !== undefined) {
          metaData[key] = merged[key as keyof StoredSettings];
        }
      }

      const heroKeys = [
        "heroTitle", "heroHighlightedWord", "heroSubtitle", "heroBgImage", "heroButtonText",
        "masterPlanImage", "masterPlanFullImage", "masterPlanPdf", "masterPlanDescription",
        "sectorATitle", "sectorATagline", "sectorAPlots", "sectorAPrice", "sectorAImage",
        "sectorBTitle", "sectorBTagline", "sectorBPlots", "sectorBPrice", "sectorBImage",
        "residentialPaymentPlanImage", "commercialPaymentPlanImage", "officialPaymentPlanPdf"
      ];
      const heroData: Record<string, any> = {};
      for (const key of heroKeys) {
        if (merged[key as keyof StoredSettings] !== undefined) {
          heroData[key] = merged[key as keyof StoredSettings];
        }
      }

      const chairmanKeys = [
        "chairmanHeadingTop", "chairmanHeadingSub", "chairmanHeadingMain", "chairmanName",
        "chairmanTitle", "chairmanBioShort", "chairmanBioFull", "chairmanCtaText",
        "chairmanCtaLink", "chairmanPortrait"
      ];
      const chairmanData: Record<string, any> = {};
      for (const key of chairmanKeys) {
        if (merged[key as keyof StoredSettings] !== undefined) {
          chairmanData[key] = merged[key as keyof StoredSettings];
        }
      }

      await pool.query(
        `INSERT INTO \`sitesetting\` (
          \`id\`, \`siteName\`, \`contactPhone\`, \`secondaryPhone\`, \`whatsappPhone\`, \`officialEmail\`, \`officeAddress\`, \`googleMapsUrl\`, \`rdaNocStatus\`, \`rdaVerificationUrl\`, \`announcement\`, \`activePreLaunchDiscount\`, \`smtpEnabled\`, \`smtpHost\`, \`smtpPort\`, \`smtpSecure\`, \`smtpUser\`, \`smtpPass\`, \`smtpFromEmail\`, \`leadNotificationEmail\`, \`metaSettingsJson\`, \`heroSettingsJson\`, \`chairmanSettingsJson\`, \`amenitiesJson\`, \`landmarksJson\`, \`paymentTiersJson\`
        ) VALUES ('default', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          \`siteName\` = VALUES(\`siteName\`),
          \`contactPhone\` = VALUES(\`contactPhone\`),
          \`secondaryPhone\` = VALUES(\`secondaryPhone\`),
          \`whatsappPhone\` = VALUES(\`whatsappPhone\`),
          \`officialEmail\` = VALUES(\`officialEmail\`),
          \`officeAddress\` = VALUES(\`officeAddress\`),
          \`googleMapsUrl\` = VALUES(\`googleMapsUrl\`),
          \`rdaNocStatus\` = VALUES(\`rdaNocStatus\`),
          \`rdaVerificationUrl\` = VALUES(\`rdaVerificationUrl\`),
          \`announcement\` = VALUES(\`announcement\`),
          \`activePreLaunchDiscount\` = VALUES(\`activePreLaunchDiscount\`),
          \`smtpEnabled\` = VALUES(\`smtpEnabled\`),
          \`smtpHost\` = VALUES(\`smtpHost\`),
          \`smtpPort\` = VALUES(\`smtpPort\`),
          \`smtpSecure\` = VALUES(\`smtpSecure\`),
          \`smtpUser\` = VALUES(\`smtpUser\`),
          \`smtpPass\` = VALUES(\`smtpPass\`),
          \`smtpFromEmail\` = VALUES(\`smtpFromEmail\`),
          \`leadNotificationEmail\` = VALUES(\`leadNotificationEmail\`),
          \`metaSettingsJson\` = VALUES(\`metaSettingsJson\`),
          \`heroSettingsJson\` = VALUES(\`heroSettingsJson\`),
          \`chairmanSettingsJson\` = VALUES(\`chairmanSettingsJson\`),
          \`amenitiesJson\` = VALUES(\`amenitiesJson\`),
          \`landmarksJson\` = VALUES(\`landmarksJson\`),
          \`paymentTiersJson\` = VALUES(\`paymentTiersJson\`);`,
        [
          merged.siteName,
          merged.contactPhone,
          merged.secondaryPhone || null,
          merged.whatsappPhone,
          merged.officialEmail,
          merged.officeAddress,
          merged.googleMapsUrl || "https://maps.google.com/?q=Saffron+City+Rawat+Islamabad",
          merged.rdaNocStatus,
          merged.rdaVerificationUrl || "https://punjab.gov.pk",
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
          JSON.stringify(metaData),
          JSON.stringify(heroData),
          JSON.stringify(chairmanData),
          JSON.stringify(merged.amenities || []),
          JSON.stringify(merged.landmarks || []),
          JSON.stringify(merged.paymentTiers || []),
        ]
      );

      backendCache.delete("site_settings");
      return merged;
    } catch (err: any) {
      console.error("[MySQL updateSettings Error]:", err?.message);
      backendCache.delete("site_settings");
      return updates as StoredSettings;
    }
  },

  // -------------------------
  // 7. Page SEO (Strict MySQL Database)
  // -------------------------
  getPageSeoList: async (): Promise<StoredPageSeo[]> => {
    try {
      const pool = getMySQLPool();
      const [rows]: any = await pool.query("SELECT * FROM `pageseo` ORDER BY `path` ASC");
      if (rows && Array.isArray(rows)) {
        return rows.map((r: any) => ({
          ...r,
          robotsIndex: Boolean(r.robotsIndex),
          robotsFollow: Boolean(r.robotsFollow),
        }));
      }
    } catch (err: any) {
      logDbNotice("getPageSeoList", err);
    }
    return [];
  },

  getPageSeoByPath: async (path: string): Promise<StoredPageSeo | null> => {
    const cacheKey = `pageseo_path_${path}`;
    const cached = backendCache.get<StoredPageSeo>(cacheKey);
    if (cached) return cached;

    try {
      const pool = getMySQLPool();
      const [rows]: any = await pool.query("SELECT * FROM `pageseo` WHERE `path` = ? LIMIT 1", [path]);
      if (rows && rows.length > 0) {
        const r = rows[0];
        const res = {
          ...r,
          robotsIndex: Boolean(r.robotsIndex),
          robotsFollow: Boolean(r.robotsFollow),
        };
        backendCache.set(cacheKey, res, 60);
        return res;
      }
    } catch (err: any) {
      logDbNotice("getPageSeoByPath", err);
    }

    return null;
  },

  upsertPageSeo: async (data: Partial<StoredPageSeo> & { path: string }): Promise<StoredPageSeo | null> => {
    backendCache.delete(`pageseo_path_${data.path}`);
    backendCache.delete("pageseo_all");
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
    } catch (err: any) {
      logDbNotice("upsertPageSeo", err);
    }

    return await db.getPageSeoByPath(data.path);
  },

  deletePageSeo: async (id: string): Promise<boolean> => {
    backendCache.clear();
    try {
      const pool = getMySQLPool();
      const [res]: any = await pool.query("DELETE FROM `pageseo` WHERE `id` = ? OR `path` = ?", [id, id]);
      return res.affectedRows > 0;
    } catch {
      return false;
    }
  },

  // -------------------------
  // 8. Redirects (Strict MySQL Database)
  // -------------------------
  getRedirects: async (): Promise<StoredRedirect[]> => {
    const cached = backendCache.get<StoredRedirect[]>("redirects_all");
    if (cached) return cached;

    let result: StoredRedirect[] = [];
    try {
      const pool = getMySQLPool();
      const [rows]: any = await pool.query("SELECT * FROM `redirects` ORDER BY `createdAt` DESC");
      if (rows && Array.isArray(rows)) {
        result = rows.map((r: any) => ({
          ...r,
          isActive: Boolean(r.isActive),
        }));
      }
    } catch (err: any) {
      logDbNotice("getRedirects", err);
    }

    backendCache.set("redirects_all", result, 60);
    return result;
  },

  createRedirect: async (redirect: Omit<StoredRedirect, "id" | "hitCount" | "createdAt" | "updatedAt">): Promise<StoredRedirect> => {
    backendCache.delete("redirects_all");
    const id = `red-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    try {
      const pool = getMySQLPool();
      await pool.query(
        `INSERT INTO \`redirects\` (\`id\`, \`sourcePath\`, \`destinationUrl\`, \`statusCode\`, \`isActive\`, \`hitCount\`, \`createdAt\`)
         VALUES (?, ?, ?, ?, ?, 0, NOW())`,
        [id, redirect.sourcePath, redirect.destinationUrl, redirect.statusCode || 301, redirect.isActive ? 1 : 0]
      );
    } catch (err: any) {
      console.error("[MySQL createRedirect Error]:", err?.message);
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
    backendCache.delete("redirects_all");
    try {
      const allowedColumns = new Set(["sourcePath", "destinationUrl", "statusCode", "isActive"]);
      const pool = getMySQLPool();
      const fields: string[] = [];
      const values: any[] = [];

      for (const [key, val] of Object.entries(updates)) {
        if (allowedColumns.has(key)) {
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
      console.error("[MySQL updateRedirect Error]:", err?.message);
    }
    return null;
  },

  deleteRedirect: async (id: string): Promise<boolean> => {
    backendCache.delete("redirects_all");
    try {
      const pool = getMySQLPool();
      const [res]: any = await pool.query("DELETE FROM `redirects` WHERE `id` = ?", [id]);
      return res.affectedRows > 0;
    } catch {
      return false;
    }
  },
};
