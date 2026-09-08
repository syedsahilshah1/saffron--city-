import React from "react";
import Link from "next/link";
import { 
  Building2, 
  ShieldCheck, 
  MapPin, 
  MessageCircle, 
  Filter
} from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import WordReveal from "@/components/animations/WordReveal";
import PlotsInventoryExplorer from "@/components/plots/PlotsInventoryExplorer";
import { SITE_CONFIG } from "@/data/saffron-data";

export const metadata = {
  title: "Saffron City Plots for Sale 2026 | All Residential & Commercial Inventory",
  description: "Browse all available RDA approved plots for sale in Saffron City Islamabad — 5 Marla, 10 Marla, 1 Kanal & Commercial Plazas on Main GT Road with 3-year installments.",
};

export default function PlotForSalePage() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
    "Hi, I want to inquire about available plots for sale in Saffron City."
  )}`;

  return (
    <div className="space-y-16 lg:space-y-20 pb-24 text-slate-900 bg-white">
      
      {/* Hero Banner Section with Background Image */}
      <section className="relative w-full pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/landmark_dha_islamabad.jpg"
            alt="Saffron City All Plots For Sale"
            className="w-full h-full object-cover object-center scale-105 animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/50" />
          <div className="absolute inset-0 bg-[radial-gradient(#D4A017_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <ScrollReveal animation="fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4A017]/20 border border-[#D4A017]/40 text-[#D4A017] text-xs font-bold tracking-wider uppercase backdrop-blur-md">
              <Building2 className="w-3.5 h-3.5 text-[#D4A017]" />
              <span>Verified RDA Plot Inventory Open</span>
            </div>
          </ScrollReveal>

          <WordReveal
            text="All Plots for Sale in Saffron City"
            highlightWords={["All", "Plots", "Sale", "Saffron", "City"]}
            as="h1"
            className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading tracking-tight text-white block"
          />

          <ScrollReveal animation="fade-up" delay={100}>
            <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-200 font-light leading-relaxed">
              Explore authentic available residential &amp; commercial plots across Sector A, Sector B, and Commercial Broadway with instant search and filtering.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={200} className="flex flex-wrap justify-center gap-4 pt-2">
            <a
              href="#inventory-explorer"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-[#D4A017] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs shadow-lg hover:scale-105 transition-all"
            >
              Search &amp; Filter Plots
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg hover:scale-105 transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Inquire on WhatsApp</span>
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Content Container - Focused 100% on Plots for Sale */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Real-Time Search, Filter & Inventory Explorer */}
        <section id="inventory-explorer" className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <ScrollReveal animation="fade-up">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold tracking-wide uppercase">
                <Filter className="w-3.5 h-3.5 text-[#D4A017]" />
                <span>Live Inventory Search</span>
              </div>
            </ScrollReveal>

            <WordReveal
              text="Search & Filter All Available Plots"
              highlightWords={["Search", "Filter", "Plots"]}
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight block"
            />

            <ScrollReveal animation="fade-up" delay={100}>
              <p className="text-sm text-slate-600 leading-relaxed">
                Filter by plot category, specific sector block, size scale, and total budget to find your ideal investment.
              </p>
            </ScrollReveal>
          </div>

          {/* Interactive Live Explorer Component */}
          <PlotsInventoryExplorer />
        </section>

      </div>
    </div>
  );
}
