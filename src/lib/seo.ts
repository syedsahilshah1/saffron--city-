import type { Metadata } from "next";
import { db } from "@/lib/db";

const DEFAULT_BASE_URL = "https://saffroncity.org";

/**
 * Builds server-side Next.js Metadata for any given page route by fetching
 * stored page-level SEO overrides and falling back to global settings.
 */
export async function getPageMetadata(
  path: string,
  customFallback?: Partial<Metadata>
): Promise<Metadata> {
  const cleanPath = path === "" ? "/" : path.startsWith("/") ? path : `/${path}`;

  try {
    const [settings, pageSeo] = await Promise.all([
      db.getSettings(),
      db.getPageSeoByPath(cleanPath),
    ]);

    const siteName = settings?.siteName || "Saffron City Islamabad";
    const canonicalBase = settings?.canonicalUrl?.replace(/\/$/, "") || DEFAULT_BASE_URL;
    const pageUrl = `${canonicalBase}${cleanPath === "/" ? "" : cleanPath}`;

    // Compute Title & Description
    const metaTitle =
      pageSeo?.metaTitle ||
      (cleanPath === "/" ? settings?.metaTitle : `${siteName}`);
    const metaDescription =
      pageSeo?.metaDescription || settings?.metaDescription || "";

    // Canonical & Robots
    const canonicalUrl = pageSeo?.canonicalUrl || pageUrl;
    const robotsIndex =
      pageSeo?.robotsIndex !== undefined
        ? pageSeo.robotsIndex
        : settings?.defaultRobotsIndex !== undefined
        ? settings.defaultRobotsIndex
        : true;
    const robotsFollow =
      pageSeo?.robotsFollow !== undefined
        ? pageSeo.robotsFollow
        : settings?.defaultRobotsFollow !== undefined
        ? settings.defaultRobotsFollow
        : true;

    // Keywords
    const keywordsRaw = pageSeo?.secondaryKeywords
      ? `${pageSeo.focusKeyword || ""}, ${pageSeo.secondaryKeywords}, ${settings?.metaKeywords || ""}`
      : settings?.metaKeywords || "";
    const keywords = keywordsRaw
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean);

    // Social OpenGraph & Twitter
    const ogTitle = pageSeo?.ogTitle || metaTitle;
    const ogDesc = pageSeo?.ogDescription || metaDescription;
    const ogImg = pageSeo?.ogImage || settings?.ogImage || "/images/hero-bg.jpg";
    const fullOgImage = ogImg.startsWith("http") ? ogImg : `${canonicalBase}${ogImg}`;

    const twTitle = pageSeo?.twitterTitle || settings?.twitterTitle || ogTitle;
    const twDesc = pageSeo?.twitterDescription || settings?.twitterDescription || ogDesc;
    const twImg = pageSeo?.twitterImage || settings?.twitterImage || ogImg;
    const fullTwImage = twImg.startsWith("http") ? twImg : `${canonicalBase}${twImg}`;

    const metadata: Metadata = {
      title: metaTitle,
      description: metaDescription,
      keywords: keywords.length > 0 ? keywords : undefined,
      metadataBase: new URL(canonicalBase),
      alternates: {
        canonical: canonicalUrl,
      },
      robots: {
        index: robotsIndex,
        follow: robotsFollow,
        googleBot: {
          index: robotsIndex,
          follow: robotsFollow,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      openGraph: {
        title: ogTitle,
        description: ogDesc,
        url: canonicalUrl,
        siteName: siteName,
        images: [
          {
            url: fullOgImage,
            width: 1200,
            height: 630,
            alt: ogTitle,
          },
        ],
        locale: "en_PK",
        type: "website",
      },
      twitter: {
        card: settings?.twitterCard || "summary_large_image",
        site: settings?.twitterSite || "@SaffronCityPk",
        creator: settings?.twitterCreator || "@SaffronCityPk",
        title: twTitle,
        description: twDesc,
        images: [fullTwImage],
      },
      verification: settings?.googleSiteVerification
        ? {
            google: settings.googleSiteVerification,
          }
        : undefined,
      ...customFallback,
    };

    return metadata;
  } catch (err) {
    console.error(`[SEO Metadata Error for ${cleanPath}]:`, err);
    return {
      title: "Saffron City Islamabad | RDA Approved Housing Scheme",
      description: "Premier 15,000 Kanal RDA NOC approved project on Main GT Road Rawat.",
      alternates: { canonical: `${DEFAULT_BASE_URL}${cleanPath}` },
      ...customFallback,
    };
  }
}
