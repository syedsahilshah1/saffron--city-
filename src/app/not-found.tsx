import React from "react";
import Link from "next/link";
import { Home, Compass, MapPin, Layers, PhoneCall, ArrowRight, HelpCircle } from "lucide-react";
import { SITE_CONFIG } from "@/data/saffron-data";

export default function NotFound() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-28 pb-20 bg-gradient-to-b from-amber-50/40 via-white to-amber-50/20 text-slate-900">
      <div className="max-w-2xl w-full text-center space-y-8 p-8 sm:p-12 rounded-3xl bg-white border border-amber-200 shadow-2xl relative overflow-hidden">
        {/* Decorative Golden Top Glow */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-400 via-[#D4A017] to-amber-600" />

        {/* 404 Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-4 h-4 text-[#D4A017]" />
          <span>Error 404 • Page Missing</span>
        </div>

        {/* Big 404 Header with High Contrast */}
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-6xl font-black text-slate-950 font-heading tracking-tight">
            404 — Page Not Found
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
            The page you are looking for does not exist, has been moved, or the URL might be mistyped.
          </p>
        </div>

        {/* Primary Action Button */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-[#D4A017] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs shadow-lg hover:scale-105 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <a
            href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=Hi%2C%20I%20need%20help%20navigating%20the%20Saffron%20City%20website.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-amber-100 border border-slate-200 text-slate-800 font-bold text-xs transition-colors"
          >
            <PhoneCall className="w-4 h-4 text-[#D4A017]" />
            <span>Help Desk on WhatsApp</span>
          </a>
        </div>

        {/* Helpful Popular Quick Links */}
        <div className="pt-6 border-t border-slate-100">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
            Popular Destinations
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-semibold text-slate-700">
            <Link
              href="/payment-plan"
              className="p-3 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Payment Plans</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D4A017]" />
            </Link>
            <Link
              href="/master-plan"
              className="p-3 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Master Plan</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D4A017]" />
            </Link>
            <Link
              href="/location"
              className="p-3 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 transition-colors flex items-center justify-center gap-1.5 col-span-2 sm:col-span-1"
            >
              <span>Location Map</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D4A017]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
