import { MetadataRoute } from "next";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await db.getSettings();
  const baseUrl = (settings?.canonicalUrl || "https://saffroncity.org").replace(/\/$/, "");

  const allowIndexing = settings?.defaultRobotsIndex !== false;

  return {
    rules: [
      {
        userAgent: "*",
        allow: allowIndexing ? "/" : undefined,
        disallow: allowIndexing
          ? ["/dashboard/", "/api/", "/ubaid/", "/_next/", "/static/"]
          : "/",
      },
      {
        userAgent: "Googlebot",
        allow: allowIndexing ? "/" : undefined,
        disallow: allowIndexing ? ["/dashboard/", "/api/", "/ubaid/"] : "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
