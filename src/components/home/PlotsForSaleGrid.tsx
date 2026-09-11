"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, TrendingUp, MessageSquare, Ruler, ChevronDown, ChevronUp, Eye, Sparkles } from "lucide-react";
import { SITE_CONFIG } from "@/data/saffron-data";
import StaggerReveal from "@/components/animations/StaggerReveal";

interface PlotCardItem {
  id: string;
  plotNumber: string;
  title: string;
  category: "Residential" | "Commercial";
  sector: string;
  tag: string;
  dimensions: string;
  marketPrice: string;
  priceFormatted: string;
  trend: string;
  image: string;
  href: string;
}

const PLOTS_INVENTORY: PlotCardItem[] = [
  {
    id: "plot-5m-a",
    plotNumber: "#A104",
    title: "5 Marla Plot",
    category: "Residential",
    sector: "Sector A (Block B)",
    tag: "Near Mosque",
    dimensions: "25 × 45 ft",
    marketPrice: "NEW RATE",
    priceFormatted: "PKR 45.0 Lac",
    trend: "Active",
    image: "/images/sectors/sector-a-luxury.jpg",
    href: "/sectors/sector-a",
  },
  {
    id: "plot-5m-b",
    plotNumber: "#B388",
    title: "5 Marla Plot",
    category: "Residential",
    sector: "Sector B",
    tag: "Park Facing",
    dimensions: "25 × 45 ft",
    marketPrice: "OFFICIAL RATE",
    priceFormatted: "PKR 45.0 Lac",
    trend: "Active",
    image: "/images/sectors/sector-b-residential.jpg",
    href: "/sectors/sector-b",
  },
  {
    id: "plot-10m-a",
    plotNumber: "#A290",
    title: "10 Marla Plot",
    category: "Residential",
    sector: "Sector A (Block B)",
    tag: "Boulevard Frontage",
    dimensions: "35 × 65 ft",
    marketPrice: "NEW RATE",
    priceFormatted: "PKR 82.5 Lac",
    trend: "Hot",
    image: "/images/sectors/sector-a-luxury.jpg",
    href: "/sectors/sector-a",
  },
  {
    id: "plot-10m-b",
    plotNumber: "#B590",
    title: "10 Marla Plot",
    category: "Residential",
    sector: "Sector B",
    tag: "Family Zone",
    dimensions: "35 × 65 ft",
    marketPrice: "OFFICIAL RATE",
    priceFormatted: "PKR 82.5 Lac",
    trend: "Active",
    image: "/images/sectors/sector-b-residential.jpg",
    href: "/sectors/sector-b",
  },
  {
    id: "plot-1k-a",
    plotNumber: "#A123",
    title: "1 Kanal Plot",
    category: "Residential",
    sector: "Sector A (Block B)",
    tag: "Main Boulevard",
    dimensions: "50 × 90 ft",
    marketPrice: "NEW RATE",
    priceFormatted: "PKR 1.55 Crore",
    trend: "Luxury",
    image: "/images/sectors/sector-a-luxury.jpg",
    href: "/sectors/sector-a",
  },
  {
    id: "plot-sig-comm",
    plotNumber: "#SC01",
    title: "Signature Commercial",
    category: "Commercial",
    sector: "Commercial Block",
    tag: "30×40 (5.33 Marla)",
    dimensions: "30 × 40 ft",
    marketPrice: "SPECIAL OFFER",
    priceFormatted: "PKR 1.55 Crore (Net)",
    trend: "Save 45 Lac",
    image: "/images/sectors/commercial-plaza.jpg",
    href: "/payment-plan",
  },
  {
    id: "plot-4m-comm",
    plotNumber: "#C408",
    title: "4 Marla Commercial",
    category: "Commercial",
    sector: "GT Road Frontage",
    tag: "High Footfall",
    dimensions: "30 × 30 ft",
    marketPrice: "COMMERCIAL RATE",
    priceFormatted: "PKR 2.20 Crore",
    trend: "Prime",
    image: "/images/sectors/commercial-plaza.jpg",
    href: "/plots/commercial",
  },
  {
    id: "plot-8m-comm",
    plotNumber: "#C880",
    title: "8 Marla Commercial",
    category: "Commercial",
    sector: "Main Boulevard",
    tag: "Mega Plaza Scale",
    dimensions: "40 × 45 ft",
    marketPrice: "COMMERCIAL RATE",
    priceFormatted: "PKR 4.20 Crore",
    trend: "Prime",
    image: "/images/sectors/commercial-plaza.jpg",
    href: "/plots/commercial",
  },
];

export default function PlotsForSaleGrid() {
  const [filter, setFilter] = useState<"all" | "residential" | "commercial">("all");
  const [showAllMobile, setShowAllMobile] = useState(false);

  const filteredPlots = PLOTS_INVENTORY.filter((plot) => {
    if (filter === "residential") return plot.category === "Residential";
    if (filter === "commercial") return plot.category === "Commercial";
    return true;
  });

  // On mobile, show max 4 plots unless user clicks "See More"
  const mobileVisiblePlots = showAllMobile ? filteredPlots : filteredPlots.slice(0, 4);
  const remainingCount = Math.max(0, filteredPlots.length - 4);

  return (
    <div className="w-full space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6">
        <div className="space-y-2 sm:space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#D4A017]" />
            <span>Verified Inventory</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            Plots for Sale in Saffron City
          </h2>
          <p className="text-xs sm:text-base text-slate-600 leading-relaxed font-normal">
            Explore authentic available residential &amp; commercial plots across all sectors. Inspect official rates, dimensions, facing views, and connect directly with verified sales desks.
          </p>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/plot-for-sale"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-amber-500 via-[#D4A017] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <span>VIEW COMPLETE DIRECTORY</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-3 border-b border-slate-200 scrollbar-none">
        <button
          type="button"
          onClick={() => {
            setFilter("all");
            setShowAllMobile(false);
          }}
          className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            filter === "all"
              ? "bg-[#D4A017] text-white shadow-md"
              : "bg-slate-100 text-slate-700 hover:bg-amber-50 hover:text-[#D4A017]"
          }`}
        >
          All Inventory ({PLOTS_INVENTORY.length})
        </button>
        <button
          type="button"
          onClick={() => {
            setFilter("residential");
            setShowAllMobile(false);
          }}
          className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            filter === "residential"
              ? "bg-[#D4A017] text-white shadow-md"
              : "bg-slate-100 text-slate-700 hover:bg-amber-50 hover:text-[#D4A017]"
          }`}
        >
          Residential
        </button>
        <button
          type="button"
          onClick={() => {
            setFilter("commercial");
            setShowAllMobile(false);
          }}
          className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            filter === "commercial"
              ? "bg-[#D4A017] text-white shadow-md"
              : "bg-slate-100 text-slate-700 hover:bg-amber-50 hover:text-[#D4A017]"
          }`}
        >
          Commercial
        </button>
      </div>

      {/* 1. MOBILE IN-LINE 3-4 COMPACT BLOCKS (Hidden on sm screens) */}
      <div className="block sm:hidden space-y-4">
        {/* Compact 2-column or in-line blocks capped at 4 items */}
        <div className="grid grid-cols-2 gap-3">
          {mobileVisiblePlots.map((plot) => {
            const plotWhatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
              `Hi, I want to inquire about ${plot.title} (${plot.plotNumber} - ${plot.sector}, ${plot.dimensions}) listed for ${plot.priceFormatted} in Saffron City.`
            )}`;

            return (
              <div
                key={`mob-${plot.id}`}
                className="group rounded-2xl bg-white text-slate-900 overflow-hidden shadow-sm hover:shadow-md border border-amber-200/80 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-28 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={plot.image}
                      alt={`${plot.title} - ${plot.sector}`}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    <div className="absolute top-2 left-2 z-10">
                      <span className="px-1.5 py-0.5 rounded bg-white/90 text-slate-900 text-[9px] font-mono font-bold shadow">
                        {plot.plotNumber}
                      </span>
                    </div>

                    <div className="absolute bottom-1.5 left-2 right-2 z-10">
                      <span className="text-[12px] font-bold text-white drop-shadow font-mono block leading-tight">
                        {plot.priceFormatted}
                      </span>
                    </div>
                  </div>

                  <div className="p-2.5 space-y-1">
                    <h3 className="text-xs font-bold text-slate-900 truncate">
                      {plot.title}
                    </h3>
                    <div className="flex items-center gap-1 text-[10px] text-slate-600 truncate">
                      <MapPin className="w-2.5 h-2.5 text-[#D4A017] shrink-0" />
                      <span className="truncate">{plot.sector}</span>
                    </div>
                    <div className="inline-block px-1.5 py-0.5 rounded bg-slate-50 border border-slate-200 text-[9px] font-semibold text-slate-600 font-mono">
                      {plot.dimensions}
                    </div>
                  </div>
                </div>

                <div className="p-2 pt-0 flex gap-1 mt-1">
                  <Link
                    href={plot.href}
                    className="flex-1 py-1 px-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] font-bold text-center"
                  >
                    Details
                  </Link>
                  <a
                    href={plotWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-1 px-1.5 rounded-lg bg-emerald-600 text-white text-[10px] font-bold text-center inline-flex items-center justify-center gap-0.5"
                  >
                    <MessageSquare className="w-2.5 h-2.5" />
                    <span>Chat</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile "See More / Show Less" Action Button */}
        {filteredPlots.length > 4 && (
          <div className="pt-1 text-center">
            <button
              type="button"
              onClick={() => setShowAllMobile(!showAllMobile)}
              className="w-full py-2.5 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-[#D4A017] text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-98 cursor-pointer"
            >
              {showAllMobile ? (
                <>
                  <span>Show Less Plots</span>
                  <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>See More Plots ({remainingCount} more)</span>
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* 2. TABLET & DESKTOP 4-COLUMN CARD GRID */}
      <div className="hidden sm:block">
        <StaggerReveal
          key={filter}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          staggerDelay={70}
          direction="up"
        >
          {filteredPlots.map((plot) => {
            const plotWhatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
              `Hi, I want to inquire about ${plot.title} (${plot.plotNumber} - ${plot.sector}, ${plot.dimensions}) listed for ${plot.priceFormatted} in Saffron City.`
            )}`;

            return (
              <div
                key={plot.id}
                className="group rounded-3xl bg-white text-slate-900 overflow-hidden shadow-md hover:shadow-2xl border border-amber-200/70 hover:border-[#D4A017] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                {/* Card Image Area */}
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={plot.image}
                      alt={`${plot.title} - ${plot.sector}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Top-Left Inventory ID Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-slate-900 text-[11px] font-mono font-bold shadow">
                        {plot.plotNumber}
                      </span>
                    </div>

                    {/* Top-Right Category Pill */}
                    <div className="absolute top-3 right-3 z-10">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#D4A017] text-white text-[10px] font-bold uppercase tracking-wider shadow">
                        {plot.category}
                      </span>
                    </div>

                    {/* Bottom Overlays: Market Price & Trend */}
                    <div className="absolute bottom-3 left-3 right-3 z-10 flex items-end justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block drop-shadow">
                          {plot.marketPrice}
                        </span>
                        <span className="text-lg lg:text-xl font-serif font-bold text-white tracking-tight drop-shadow-md">
                          {plot.priceFormatted}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-md text-emerald-700 text-[10px] font-bold shadow">
                        <TrendingUp className="w-3 h-3" />
                        <span>{plot.trend}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body Content */}
                  <div className="p-4 sm:p-5 space-y-3">
                    {/* Location & Tag */}
                    <div className="flex items-center gap-1.5 text-xs text-amber-700 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#D4A017] shrink-0" />
                      <span className="font-bold text-slate-800">{plot.sector}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-500 text-[11px]">{plot.tag}</span>
                    </div>

                    {/* Plot Title */}
                    <h3 className="text-xl font-serif font-bold text-slate-900 tracking-tight group-hover:text-[#D4A017] transition-colors">
                      {plot.title}
                    </h3>

                    {/* Dimensions Badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600">
                      <Ruler className="w-3.5 h-3.5 text-slate-400" />
                      <span>{plot.dimensions}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Card Actions */}
                <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 flex items-center justify-between gap-2 mt-2">
                  <Link
                    href={plot.href}
                    className="flex-1 py-2 px-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 text-xs font-bold text-center transition-colors inline-flex items-center justify-center gap-1"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3 h-3 text-slate-500" />
                  </Link>

                  <a
                    href={plotWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shimmer-gold-btn flex-1 py-2 px-3 rounded-full bg-gradient-to-r from-amber-500 to-[#D4A017] hover:from-amber-600 hover:to-amber-700 text-white text-xs font-bold text-center transition-all inline-flex items-center justify-center gap-1 shadow-sm hover:shadow"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Inquire / Book</span>
                  </a>
                </div>
              </div>
            );
          })}
        </StaggerReveal>
      </div>
    </div>
  );
}
