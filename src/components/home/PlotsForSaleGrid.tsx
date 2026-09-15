"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, TrendingUp, MessageSquare, Ruler, ChevronRight } from "lucide-react";
import { SITE_CONFIG } from "@/data/saffron-data";
import StaggerReveal from "@/components/animations/StaggerReveal";
import { StoredPlot } from "@/lib/types";

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

const DEFAULT_PLOTS_INVENTORY: PlotCardItem[] = [
  {
    id: "plot-5m-a",
    plotNumber: "#A104",
    title: "5 Marla Plot",
    category: "Residential",
    sector: "Sector A (Block B)",
    tag: "Near Mosque",
    dimensions: "25 × 45 ft",
    marketPrice: "OFFICIAL RATE",
    priceFormatted: "PKR 45.0 Lac",
    trend: "Active",
    image: "/images/sectors/sector-a-luxury.webp",
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
    image: "/images/sectors/sector-b-residential.webp",
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
    marketPrice: "OFFICIAL RATE",
    priceFormatted: "PKR 82.5 Lac",
    trend: "Hot",
    image: "/images/sectors/sector-a-luxury.webp",
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
    image: "/images/sectors/sector-b-residential.webp",
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
    marketPrice: "OFFICIAL RATE",
    priceFormatted: "PKR 1.55 Crore",
    trend: "Luxury",
    image: "/images/sectors/sector-a-luxury.webp",
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
    image: "/images/sectors/commercial-plaza.webp",
    href: "/payment-plan",
  },
];

function formatPriceString(rawPrice: number): string {
  const price = rawPrice > 0 && rawPrice <= 500 ? rawPrice * 100000 : rawPrice;
  if (price >= 10000000) {
    const crore = price / 10000000;
    return `PKR ${crore % 1 === 0 ? crore.toFixed(0) : crore.toFixed(2)} Crore`;
  }
  if (price >= 100000) {
    const lac = price / 100000;
    return `PKR ${lac % 1 === 0 ? lac.toFixed(0) : lac.toFixed(1)} Lac`;
  }
  return `PKR ${price.toLocaleString()}`;
}

function mapStoredPlotToCard(p: StoredPlot): PlotCardItem {
  const isComm = (p.type && p.type.toLowerCase().includes("commercial")) || (p.category && p.category.toLowerCase().includes("commercial"));
  const sectorLower = (p.sector || "").toLowerCase();
  
  let href = "/plot-for-sale";
  if (sectorLower.includes("sector a") || sectorLower.includes("block b")) {
    href = "/sectors/sector-a";
  } else if (sectorLower.includes("sector b")) {
    href = "/sectors/sector-b";
  } else if (isComm) {
    href = "/plots/commercial";
  }

  let dimensions = "Standard Dimensions";
  if (p.category) {
    if (p.category.includes("5 Marla")) dimensions = "25 × 45 ft";
    else if (p.category.includes("10 Marla")) dimensions = "35 × 65 ft";
    else if (p.category.includes("1 Kanal")) dimensions = "50 × 90 ft";
    else if (p.category.includes("4 Marla")) dimensions = "30 × 30 ft";
    else if (p.category.includes("8 Marla")) dimensions = "40 × 45 ft";
  }

  let defaultImage = "/images/sectors/sector-a-luxury.webp";
  if (p.category?.includes("10 Marla")) defaultImage = "/images/sectors/sector-b-residential.webp";
  else if (p.category?.includes("1 Kanal")) defaultImage = "/images/sectors/sector-a-overview.webp";
  else if (sectorLower.includes("sector b")) defaultImage = "/images/sectors/sector-b-residential.webp";
  else if (isComm || p.category?.includes("Commercial") || p.category?.includes("4 Marla") || p.category?.includes("8 Marla")) {
    defaultImage = "/images/sectors/commercial-plaza.webp";
  }

  return {
    id: p.id,
    plotNumber: p.plotNumber?.startsWith("#") ? p.plotNumber : `#${p.plotNumber || "PLT"}`,
    title: `${p.category || "Plot"} (${p.type || "Residential"})`,
    category: isComm ? "Commercial" : "Residential",
    sector: p.sector || "Saffron City",
    tag: p.status === "Available" ? "Open for Booking" : p.status || "Verified",
    dimensions,
    marketPrice: p.status === "Available" ? "OFFICIAL RATE" : p.status?.toUpperCase() || "NEW",
    priceFormatted: formatPriceString(p.totalPrice || 0),
    trend: p.status || "Active",
    image: p.image && p.image.trim().length > 3 ? p.image : defaultImage,
    href,
  };
}

interface PlotsForSaleGridProps {
  initialPlots?: StoredPlot[];
}

export default function PlotsForSaleGrid({ initialPlots = [] }: PlotsForSaleGridProps) {
  const [filter, setFilter] = useState<"all" | "residential" | "commercial">("all");
  const [plotsData, setPlotsData] = useState<StoredPlot[]>(initialPlots);

  // Client-side fetch to ensure immediate synchronization with MySQL changes
  useEffect(() => {
    fetch("/api/plots")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setPlotsData(json.data);
        }
      })
      .catch(() => {});
  }, []);

  const displayedPlots = useMemo<PlotCardItem[]>(() => {
    if (plotsData && plotsData.length > 0) {
      const dynamicItems = plotsData.map(mapStoredPlotToCard);
      const dynamicNumbers = new Set(dynamicItems.map((d) => d.plotNumber.toLowerCase()));
      const filteredDefaults = DEFAULT_PLOTS_INVENTORY.filter(
        (def) => !dynamicNumbers.has(def.plotNumber.toLowerCase())
      );
      return [...dynamicItems, ...filteredDefaults];
    }
    return DEFAULT_PLOTS_INVENTORY;
  }, [plotsData]);

  const filteredPlots = useMemo(() => {
    return displayedPlots.filter((plot) => {
      if (filter === "residential") return plot.category === "Residential";
      if (filter === "commercial") return plot.category === "Commercial";
      return true;
    });
  }, [displayedPlots, filter]);

  // Mobile: Strictly max 4 plots in inline horizontal format
  const mobilePlots = useMemo(() => filteredPlots.slice(0, 4), [filteredPlots]);

  // Desktop: Exactly 6 plots in 3 columns (2 rows of 3 plots)
  const desktopPlots = useMemo(() => filteredPlots.slice(0, 6), [filteredPlots]);

  return (
    <div className="w-full space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6">
        <div className="space-y-2 sm:space-y-3 max-w-3xl">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            Plots for Sale in Saffron City
          </h2>
          <p className="text-xs sm:text-base text-slate-600 leading-relaxed font-normal">
            Explore authentic available residential &amp; commercial plots across all sectors. Click on any plot image to explore full inventory details or connect directly with our sales team.
          </p>
        </div>

        {/* Action Button (Desktop/Tablet only) */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <Link
            href="/plot-for-sale"
            aria-label="View complete directory of residential and commercial plots for sale in Saffron City"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-amber-500 via-[#D49E17] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-md hover:shadow-lg active:scale-95"
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
          onClick={() => setFilter("all")}
          className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            filter === "all"
              ? "bg-[#D49E17] text-white shadow-md"
              : "bg-slate-100 text-slate-700 hover:bg-amber-50 hover:text-[#D49E17]"
          }`}
        >
          All Inventory
        </button>
        <button
          type="button"
          onClick={() => setFilter("residential")}
          className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            filter === "residential"
              ? "bg-[#D49E17] text-white shadow-md"
              : "bg-slate-100 text-slate-700 hover:bg-amber-50 hover:text-[#D49E17]"
          }`}
        >
          Residential
        </button>
        <button
          type="button"
          onClick={() => setFilter("commercial")}
          className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            filter === "commercial"
              ? "bg-[#D49E17] text-white shadow-md"
              : "bg-slate-100 text-slate-700 hover:bg-amber-50 hover:text-[#D49E17]"
          }`}
        >
          Commercial
        </button>
      </div>

      {/* =========================================================
          1. MOBILE VIEW — Max 4 Plots in INLINE Horizontal Swipe Format
      ========================================================= */}
      <div className="block sm:hidden space-y-3">
        {/* Swipe hint */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium px-1">
          <span>Swipe to explore plots</span>
          <span className="text-[#D49E17] font-bold flex items-center gap-0.5">
            4 Featured <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Inline Horizontal Scrollable Container */}
        <div className="flex flex-nowrap overflow-x-auto gap-3.5 pb-2 pt-1 px-1 snap-x snap-mandatory scrollbar-none -mx-4 px-4">
          {mobilePlots.map((plot) => {
            const plotWhatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
              `Hi, I want to inquire about ${plot.title} (${plot.plotNumber} - ${plot.sector}, ${plot.dimensions}) listed for ${plot.priceFormatted} in Saffron City.`
            )}`;

            return (
              <div
                key={`mob-inline-${plot.id}`}
                className="w-[260px] shrink-0 snap-start rounded-2xl bg-white text-slate-900 overflow-hidden shadow-md border border-amber-200/80 flex flex-col justify-between"
              >
                <div>
                  {/* Clickable Image -> Redirects to /plot-for-sale */}
                  <Link
                    href="/plot-for-sale"
                    className="block relative h-36 w-full overflow-hidden bg-slate-100 cursor-pointer"
                  >
                    <Image
                      src={plot.image}
                      alt={`${plot.title} - ${plot.sector}`}
                      title={`${plot.title} - ${plot.sector}`}
                      fill
                      sizes="260px"
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    <div className="absolute top-2.5 left-2.5 z-10">
                      <span className="px-2 py-0.5 rounded bg-white/95 text-slate-900 text-[10px] font-mono font-bold shadow">
                        {plot.plotNumber}
                      </span>
                    </div>

                    <div className="absolute top-2.5 right-2.5 z-10">
                      <span className="px-2 py-0.5 rounded-full bg-[#D49E17] text-white text-[9px] font-bold uppercase shadow">
                        {plot.category}
                      </span>
                    </div>

                    <div className="absolute bottom-2 left-2.5 right-2.5 z-10 flex items-end justify-between">
                      <span className="text-sm font-black text-white drop-shadow font-mono block leading-tight">
                        {plot.priceFormatted}
                      </span>
                      <span className="text-[10px] font-bold text-amber-300">
                        {plot.tag}
                      </span>
                    </div>
                  </Link>

                  <div className="p-3 space-y-1.5">
                    <Link href="/plot-for-sale" className="hover:text-[#D49E17] transition-colors block">
                      <h3 className="text-sm font-bold text-slate-900 truncate">
                        {plot.title}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 truncate">
                      <MapPin className="w-3 h-3 text-[#D49E17] shrink-0" />
                      <span className="truncate">{plot.sector}</span>
                    </div>
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-[10px] font-semibold text-slate-600 font-mono">
                      <Ruler className="w-3 h-3 text-slate-400" />
                      <span>{plot.dimensions}</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 pt-0 flex gap-2 mt-1">
                  <Link
                    href="/plot-for-sale"
                    aria-label={`View details for ${plot.title} in ${plot.sector}`}
                    className="flex-1 py-1.5 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold text-center transition-colors"
                  >
                    <span>Details</span>
                  </Link>
                  <a
                    href={plotWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-1.5 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold text-center inline-flex items-center justify-center gap-1 shadow-sm"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>Inquire</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Action Button Below Inline Plots */}
        <div className="pt-2">
          <Link
            href="/plot-for-sale"
            aria-label="View complete directory of residential and commercial plots for sale in Saffron City"
            className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-[#D49E17] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md active:scale-95"
          >
            <span>VIEW COMPLETE DIRECTORY</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* =========================================================
          2. TABLET & DESKTOP — Exactly 6 Plots (2 Rows of 3 Columns)
      ========================================================= */}
      <div className="hidden sm:block">
        <StaggerReveal
          key={filter}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          staggerDelay={70}
          direction="up"
        >
          {desktopPlots.map((plot) => {
            const plotWhatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
              `Hi, I want to inquire about ${plot.title} (${plot.plotNumber} - ${plot.sector}, ${plot.dimensions}) listed for ${plot.priceFormatted} in Saffron City.`
            )}`;

            return (
              <div
                key={plot.id}
                className="group rounded-3xl bg-white text-slate-900 overflow-hidden shadow-md hover:shadow-2xl border border-amber-200/70 hover:border-[#D49E17] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                {/* Card Image Area -> Clickable directly to /plot-for-sale */}
                <div>
                  <Link
                    href="/plot-for-sale"
                    className="block relative h-52 w-full overflow-hidden bg-slate-100 cursor-pointer"
                  >
                    <Image
                      src={plot.image}
                      alt={`${plot.title} - ${plot.sector}`}
                      title={`${plot.title} - ${plot.sector}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
                      <span className="px-2.5 py-0.5 rounded-full bg-[#D49E17] text-white text-[10px] font-bold uppercase tracking-wider shadow">
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
                  </Link>

                  {/* Card Body Content */}
                  <div className="p-5 space-y-3">
                    {/* Location & Tag */}
                    <div className="flex items-center gap-1.5 text-xs text-amber-700 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#D49E17] shrink-0" />
                      <span className="font-bold text-slate-800">{plot.sector}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-500 text-[11px]">{plot.tag}</span>
                    </div>

                    {/* Plot Title */}
                    <Link href="/plot-for-sale" className="block hover:text-[#D49E17] transition-colors">
                      <h3 className="text-xl font-serif font-bold text-slate-900 tracking-tight">
                        {plot.title}
                      </h3>
                    </Link>

                    {/* Dimensions Badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600">
                      <Ruler className="w-3.5 h-3.5 text-slate-400" />
                      <span>{plot.dimensions}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Card Actions */}
                <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between gap-2 mt-2">
                  <Link
                    href="/plot-for-sale"
                    aria-label={`View details for ${plot.title} in ${plot.sector}`}
                    className="flex-1 py-2 px-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 text-xs font-bold text-center transition-colors inline-flex items-center justify-center gap-1"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3 h-3 text-slate-500" />
                  </Link>

                  <a
                    href={plotWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shimmer-gold-btn flex-1 py-2 px-3 rounded-full bg-gradient-to-r from-amber-500 to-[#D49E17] hover:from-amber-600 hover:to-amber-700 text-white text-xs font-bold text-center transition-all inline-flex items-center justify-center gap-1 shadow-sm hover:shadow"
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
