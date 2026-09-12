import { MetadataRoute } from "next";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await db.getSettings();
  const baseUrl = (settings?.canonicalUrl || "https://saffroncity.org").replace(/\/$/, "");

  const [pageSeoList, blogs] = await Promise.all([
    db.getPageSeoList(),
    db.getBlogs(true),
  ]);

  // Static / Dashboard-managed core pages
  const pageEntries: MetadataRoute.Sitemap = pageSeoList
    .filter((p) => p.robotsIndex !== false)
    .map((p) => {
      const cleanPath = p.path === "/" ? "" : p.path;
      const isHome = p.path === "/";
      const isHighPriority =
        p.path === "/payment-plan" ||
        p.path === "/noc-status" ||
        p.path === "/master-plan" ||
        p.path === "/plot-for-sale";

      return {
        url: `${baseUrl}${cleanPath}`,
        lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
        changeFrequency: isHome ? "daily" : isHighPriority ? "weekly" : "monthly",
        priority: isHome ? 1.0 : isHighPriority ? 0.9 : 0.8,
      };
    });

  // Dynamic Blog Posts
  const blogEntries: MetadataRoute.Sitemap = blogs
    .filter((b) => b.robotsIndex !== false)
    .map((b) => ({
      url: `${baseUrl}/blogs/${b.slug}`,
      lastModified: b.updatedAt ? new Date(b.updatedAt) : new Date(b.createdAt),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

  return [...pageEntries, ...blogEntries];
}
