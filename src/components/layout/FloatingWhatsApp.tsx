"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/data/saffron-data";

export default function FloatingWhatsApp() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
    SITE_CONFIG.whatsappDefaultMsg
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center group">
      {/* Tooltip on hover */}
      <span className="hidden sm:inline-block mr-3 px-3 py-1.5 rounded-xl bg-navy-900/95 text-white text-xs font-medium border border-saffron-500/30 shadow-xl backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Chat with Sales Advisor
      </span>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Saffron City on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-green-400 text-white shadow-xl shadow-emerald-500/30 hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/20"
      >
        {/* Pulsing ring animation */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/40 animate-ping pointer-events-none" />
        <MessageCircle className="w-7 h-7 fill-white text-emerald-600" />
      </a>
    </div>
  );
}
