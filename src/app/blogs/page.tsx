import React from "react";
import { Sparkles, Phone, MessageCircle } from "lucide-react";
import { db } from "@/lib/db";
import BlogsListingClient from "@/components/blogs/BlogsListingClient";
import EnquiryForm from "@/components/forms/EnquiryForm";

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
            src="/images/about/about-hero-banner.webp"
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

      {/* Bottom Direct Booking Desk & Consultation Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-white rounded-3xl border border-amber-300 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#1c110a] via-[#352010] to-[#120803] p-6 text-white space-y-1.5 text-center sm:text-left">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#fed65b] block">
              Direct Booking Desk
            </span>
            <h3 className="font-serif font-bold text-xl sm:text-2xl leading-snug">
              Book a Free Site Tour or File Consultation
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Official RDA approved inventory on 30-month easy plans.
            </p>
          </div>

          <div className="p-5 sm:p-8 space-y-5">
            {/* Direct Call & WhatsApp Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="tel:03331113551"
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-amber-500 via-[#D49E17] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs sm:text-sm transition shadow-md"
              >
                <span>Call Now: 0333 1113551</span>
              </a>
              <a
                href="https://wa.me/923331113551?text=Hello%2C%20I%20am%20interested%20in%20Saffron%20City%20plots."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition shadow-md"
              >
                <span>WhatsApp Consultation</span>
              </a>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <EnquiryForm className="p-0 border-0 shadow-none bg-transparent" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
