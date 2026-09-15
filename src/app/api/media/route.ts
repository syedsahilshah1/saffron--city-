import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { requireAdminAuth } from "@/lib/auth-guard";

export const dynamic = "force-dynamic";

interface MediaFile {
  url: string;
  name: string;
  category: "Banners" | "Sectors" | "Facilities" | "Landmarks" | "Amenities" | "Uploads" | "General";
  alt: string;
  size?: number;
}

function getFilesRecursively(dir: string, baseDir: string): string[] {
  let results: string[] = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(fullPath, baseDir));
    } else {
      const ext = path.extname(file).toLowerCase();
      if ([".webp", ".png", ".jpg", ".jpeg", ".svg"].includes(ext)) {
        const rel = path.relative(baseDir, fullPath).replace(/\\/g, "/");
        results.push("/" + rel);
      }
    }
  }
  return results;
}

export async function GET(req: NextRequest) {
  const auth = await requireAdminAuth(req);
  if (!auth.authenticated) return auth.errorResponse!;

  try {
    const publicDir = path.join(process.cwd(), "public");
    const imagesDir = path.join(publicDir, "images");
    const uploadsDir = path.join(publicDir, "uploads");

    const imageFiles = getFilesRecursively(imagesDir, publicDir);
    const uploadFiles = getFilesRecursively(uploadsDir, publicDir);

    const formatName = (url: string) => {
      const base = path.basename(url, path.extname(url));
      return base
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
    };

    const categorize = (url: string): MediaFile["category"] => {
      if (url.includes("/uploads/")) return "Uploads";
      if (url.includes("/sectors/")) return "Sectors";
      if (url.includes("/amenities/")) return "Amenities";
      if (url.includes("/facilities/")) return "Facilities";
      if (url.includes("/landmarks/") || url.includes("landmark_")) return "Landmarks";
      if (url.includes("/about/") || url.includes("/location/") || url.includes("hero-bg")) return "Banners";
      return "General";
    };

    const allUrls = [...uploadFiles, ...imageFiles];
    const items: MediaFile[] = allUrls.map((url) => {
      const name = formatName(url);
      const category = categorize(url);
      return {
        url,
        name,
        category,
        alt: `Saffron City ${name}`,
      };
    });

    return NextResponse.json({ success: true, count: items.length, data: items });
  } catch (error: any) {
    console.error("Media API error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch media assets" },
      { status: 500 }
    );
  }
}
