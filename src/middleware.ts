import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// In-memory or fallback cache for redirects in edge/Node runtime
let cachedRedirects: { sourcePath: string; destinationUrl: string; statusCode: number }[] = [
  { sourcePath: "/plots-for-sale", destinationUrl: "/plot-for-sale", statusCode: 301 },
  { sourcePath: "/plots", destinationUrl: "/plot-for-sale", statusCode: 301 },
];
let lastFetchedAt = 0;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Skip static files, Next internals, and asset files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.includes(".") // image/pdf/css/js files
  ) {
    return NextResponse.next();
  }

  // 2. Protected Route Authentication Check (/dashboard)
  if (pathname.startsWith("/dashboard")) {
    const sessionToken = req.cookies.get("saffron_session_token")?.value;
    if (!sessionToken || !sessionToken.startsWith("tls_saff_")) {
      const loginUrl = new URL("/ubaid/login/admin", req.url);
      loginUrl.searchParams.set("from", pathname);
      const res = NextResponse.redirect(loginUrl);
      res.headers.set("Cache-Control", "private, no-cache, no-store, must-revalidate");
      return res;
    }
  }

  // 3. Fast In-Memory Redirects Evaluation (Zero Network Blocking)
  const normalizedPath = pathname.endsWith("/") && pathname.length > 1
    ? pathname.slice(0, -1)
    : pathname;

  const match = cachedRedirects.find(
    (r) => r.sourcePath === pathname || r.sourcePath === normalizedPath
  );

  if (match) {
    const destination = match.destinationUrl.startsWith("http")
      ? match.destinationUrl
      : new URL(match.destinationUrl, req.url).toString();

    const redirectRes = NextResponse.redirect(destination, {
      status: match.statusCode === 302 ? 302 : 301,
    });
    redirectRes.headers.set("Cache-Control", "public, max-age=3600");
    return redirectRes;
  }

  // 4. Default Response with Standard Security & TLS Headers
  const response = NextResponse.next();

  // Security Headers
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");

  // Private vs Public Cache Control
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/api/auth") || pathname.startsWith("/api/dashboard")) {
    response.headers.set("Cache-Control", "private, no-cache, no-store, must-revalidate");
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
