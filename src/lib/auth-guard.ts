import { NextRequest, NextResponse } from "next/server";
import { db, verifyUserSessionToken } from "./db";
import { DashboardPermission, StoredUser } from "./types";

export interface AuthResult {
  authenticated: boolean;
  user?: StoredUser;
  errorResponse?: NextResponse;
}

/**
 * Validates admin session from request cookies or Authorization header.
 * Optionally checks if user has a specific required dashboard permission.
 */
export async function requireAdminAuth(
  req: NextRequest,
  requiredPermission?: DashboardPermission
): Promise<AuthResult> {
  try {
    const authHeader = req.headers.get("Authorization");
    const cookieToken = req.cookies.get("saffron_session_token")?.value;
    const token = authHeader?.replace(/^Bearer\s+/i, "") || cookieToken;

    if (!token) {
      return {
        authenticated: false,
        errorResponse: NextResponse.json(
          { success: false, message: "Unauthorized: Authentication required" },
          { status: 401 }
        ),
      };
    }

    const { valid, userId } = verifyUserSessionToken(token);
    if (!valid || !userId) {
      return {
        authenticated: false,
        errorResponse: NextResponse.json(
          { success: false, message: "Unauthorized: Invalid or expired session" },
          { status: 401 }
        ),
      };
    }

    const user = await db.getUserById(userId);
    if (!user || !user.isActive) {
      return {
        authenticated: false,
        errorResponse: NextResponse.json(
          { success: false, message: "Forbidden: Account inactive or disabled" },
          { status: 403 }
        ),
      };
    }

    // Check specific permission if requested (Super Admin has all permissions)
    if (requiredPermission && user.role !== "SUPER_ADMIN") {
      const perms = Array.isArray(user.permissions) ? user.permissions : [];
      if (!perms.includes(requiredPermission)) {
        return {
          authenticated: false,
          errorResponse: NextResponse.json(
            { success: false, message: `Forbidden: Missing required permission (${requiredPermission})` },
            { status: 403 }
          ),
        };
      }
    }

    return {
      authenticated: true,
      user,
    };
  } catch (error: any) {
    console.error("requireAdminAuth error:", error?.message);
    return {
      authenticated: false,
      errorResponse: NextResponse.json(
        { success: false, message: "Authentication verification failed" },
        { status: 500 }
      ),
    };
  }
}
