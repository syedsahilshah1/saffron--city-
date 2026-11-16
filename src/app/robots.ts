import { MetadataRoute } from "next";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await db.getSettings();
  let rawBase = settings?.canonicalUrl || "https://saffroncity.org";
  if (rawBase.includes("saffroncity.pk")) {
    rawBase = "https://saffroncity.org";
  }
  const baseUrl = rawBase.replace(/\/$/, "");

  const allowIndexing = settings?.defaultRobotsIndex !== false;

  return {
    rules: [
      {
        userAgent: "*",
        allow: allowIndexing ? "/" : undefined,
        disallow: allowIndexing
          ? ["/dashboard/", "/api/", "/ubaid/"]
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
