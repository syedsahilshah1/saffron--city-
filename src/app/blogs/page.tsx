import React from "react";
import { Sparkles } from "lucide-react";
import { db } from "@/lib/db";
import BlogsListingClient from "@/components/blogs/BlogsListingClient";

import { getPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return await getPageMetadata("/blogs");
}

export default async function BlogsPage() {
  const blogs = await db.getBlogs(true);

  return (
    <div className="space-y-12 sm:space-y-16 pb-24 text-slate-900 bg-white">
      {/* Hero Header */}
      <section className="relative w-full pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/images/about/about-hero-banner.jpg"
            alt="Saffron City Blogs & News"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#D49E17]" />
            <span>Official Journal &amp; Market Insights</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-white tracking-normal leading-tight">
            News, Updates &amp;{" "}
            <span className="font-serif italic font-normal text-amber-200">
              Expert
            </span>{" "}
            <span className="font-serif font-semibold text-white">
              Analysis
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
            Direct reports on Ring Road progress, Sector A development milestones, official NOC legal status, and real estate guidance.
          </p>
        </div>
      </section>

      {/* Main Interactive Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BlogsListingClient initialBlogs={blogs} />
      </section>
    </div>
  );
}
