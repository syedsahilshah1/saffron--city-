"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home, MessageSquare } from "lucide-react";
import { SITE_CONFIG } from "@/data/saffron-data";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application runtime error:", error);
  }, [error]);

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-28 pb-20 bg-gradient-to-b from-red-50/30 via-white to-amber-50/20 text-slate-900">
      <div className="max-w-xl w-full text-center space-y-6 p-8 sm:p-12 rounded-3xl bg-white border border-red-200 shadow-2xl relative overflow-hidden">
        {/* Top Red-Gold Accent Bar */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-red-500 via-amber-500 to-[#D49E17]" />

        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-200 mx-auto flex items-center justify-center text-red-600 shadow-sm">
          <AlertTriangle className="w-8 h-8" />
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold uppercase tracking-wider">
            Server Error 500
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-heading tracking-tight">
            Something Went Wrong
          </h1>
          <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            An unexpected error occurred while loading this page. You can try refreshing or return to the homepage.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-[#D49E17] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs shadow-lg hover:scale-105 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-bold text-xs transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Go to Homepage</span>
          </Link>
        </div>

        {/* Contact Support */}
        <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
          Need booking assistance?{" "}
          <a
            href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[#D49E17] hover:underline inline-flex items-center gap-1"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Contact Support on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
