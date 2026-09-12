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

  // Skip static files, Next internals, and APIs
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.includes(".") // image/pdf/css files
  ) {
    return NextResponse.next();
  }

  // Refresh redirects from internal API cache periodically (every 30s)
  const now = Date.now();
  if (now - lastFetchedAt > 30000) {
    try {
      const res = await fetch(new URL("/api/seo/redirects", req.url), {
        next: { revalidate: 30 },
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          cachedRedirects = json.data
            .filter((r: any) => r.isActive)
            .map((r: any) => ({
              sourcePath: r.sourcePath.trim(),
              destinationUrl: r.destinationUrl.trim(),
              statusCode: r.statusCode || 301,
            }));
          lastFetchedAt = now;
        }
      }
    } catch {
      // Fall back to existing cachedRedirects
    }
  }

  // Clean current path
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

    return NextResponse.redirect(destination, {
      status: match.statusCode === 302 ? 302 : 301,
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
