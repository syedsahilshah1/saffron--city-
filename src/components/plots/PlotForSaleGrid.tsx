"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, Tag, ArrowRight, MessageSquare, Sparkles, TrendingUp, Download, ShieldCheck } from "lucide-react";
import { RESIDENTIAL_PRICES, COMMERCIAL_PRICES, SITE_CONFIG } from "@/data/saffron-data";

export interface PlotListingItem {
  id: string;
  code: string;
  size: string;
  title: string;
  category: "residential" | "commercial";
  sector: string;
  priceFormatted: string;
  priceShort: string;
  bookingFormatted: string;
  dimensions: string;
  image: string;
  trend: string;
  features: string[];
  href: string;
}

export const PLOT_LISTINGS: PlotListingItem[] = [
  {
    id: "sec-a-5m",
    code: "#A-501",
    size: "5 Marla",
    title: "5 Marla Residential Plot",
    category: "residential",
    sector: "Sector A • Standard",
    priceFormatted: "PKR 40,00,000",
    priceShort: "PKR 40.0 Lacs",
    bookingFormatted: "PKR 4,00,000",
    dimensions: "25 × 45 ft",
    image: "/images/hero-bg.jpg",
    trend: "+0%",
    features: ["RDA Approved", "Underground Electricity", "3-Year Plan"],
    href: "/plots/residential"
  },
  {
    id: "sec-a-10m",
    code: "#A-102",
    size: "10 Marla",
    title: "10 Marla Luxury Plot",
    category: "residential",
    sector: "Sector A • Boulevard",
    priceFormatted: "PKR 75,00,000",
    priceShort: "PKR 75.0 Lacs",
    bookingFormatted: "PKR 7,50,000",
    dimensions: "35 × 65 ft",
    image: "/images/imgi_25_saffron-city-islamabad.jpg",
    trend: "+0%",
    features: ["Wide Carpeted Road", "Near Central Mosque", "10% Down Payment"],
    href: "/plots/residential"
  },
  {
    id: "sec-a-1k",
    code: "#A-1K1",
    size: "1 Kanal",
    title: "1 Kanal Executive Estate",
    category: "residential",
    sector: "Sector A • Executive Park Facing",
    priceFormatted: "PKR 1,40,00,000",
    priceShort: "PKR 1.40 Crore",
    bookingFormatted: "PKR 14,00,000",
    dimensions: "50 × 90 ft",
    image: "/images/hero-bg.jpg",
    trend: "+0%",
    features: ["Park Facing", "Prime Frontage", "30 Monthly Installments"],
    href: "/plots/residential"
  },
  {
    id: "sec-b-5m",
    code: "#B-502",
    size: "5 Marla",
    title: "5 Marla Family Plot",
    category: "residential",
    sector: "Sector B • Standard",
    priceFormatted: "PKR 40,00,000",
    priceShort: "PKR 40.0 Lacs",
    bookingFormatted: "PKR 4,00,000",
    dimensions: "25 × 45 ft",
    image: "/images/imgi_25_saffron-city-islamabad.jpg",
    trend: "+0%",
    features: ["Gated Security", "Near Community Center", "Easy Booking"],
    href: "/plots/residential"
  },
  {
    id: "comm-4m",
    code: "#C-401",
    size: "4 Marla",
    title: "4 Marla Commercial Plot",
    category: "commercial",
    sector: "Main Boulevard • GT Road Frontage",
    priceFormatted: "PKR 2,20,00,000",
    priceShort: "PKR 2.20 Crore",
    bookingFormatted: "PKR 22,00,000",
    dimensions: "30 × 30 ft",
    image: "/images/hero-bg.jpg",
    trend: "+0%",
    features: ["Direct GT Road Frontage", "High Footfall Hub", "Multi-Storey Allowed"],
    href: "/plots/commercial"
  },
  {
    id: "comm-8m",
    code: "#C-801",
    size: "8 Marla",
    title: "8 Marla Mega Commercial",
    category: "commercial",
    sector: "Commercial Plaza Zone",
    priceFormatted: "PKR 4,20,00,000",
    priceShort: "PKR 4.20 Crore",
    bookingFormatted: "PKR 42,00,000",
    dimensions: "40 × 45 ft",
    image: "/images/imgi_25_saffron-city-islamabad.jpg",
    trend: "+0%",
    features: ["Corporate & Retail Hub", "Corner Frontage", "High ROI Asset"],
    href: "/plots/commercial"
  }
];

export default function PlotForSaleGrid() {
  const [filter, setFilter] = useState<"all" | "residential" | "commercial">("all");

  const filteredPlots = PLOT_LISTINGS.filter((item) => {
    if (filter === "all") return true;
    return item.category === filter;
  });

  return (
    <div className="space-y-8">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {[
          { key: "all", label: "All Available Plots" },
          { key: "residential", label: "Residential Plots (5M, 10M, 1K)" },
          { key: "commercial", label: "Commercial Plots (4M, 8M)" }
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setFilter(tab.key as any)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              filter === tab.key
                ? "bg-[#801323] text-white shadow-lg shadow-[#801323]/30 scale-105"
                : "bg-white/10 text-slate-200 border border-slate-700/80 hover:border-saffron-500/50 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid of Plot Cards matching Reference Screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPlots.map((plot) => {
          const bookingMsg = `Hi, I am interested in booking the ${plot.title} (${plot.code}) in Saffron City. Market Price: ${plot.priceFormatted}. Please share the official booking procedure.`;
          const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(bookingMsg)}`;

          return (
            <div
              key={plot.id}
              className="rounded-2xl bg-white text-slate-900 border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between group hover:-translate-y-1"
            >
              {/* Top Image Container */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
                <img
                  src={plot.image}
                  alt={plot.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Top-Left ID Code Pill */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/60 text-white text-[11px] font-mono font-bold backdrop-blur-md border border-white/10">
                  {plot.code}
                </div>

                {/* Top-Right Category Tag */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-[#801323]/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                  {plot.size}
                </div>

                {/* Bottom Overlay: Market Price and Trend */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3.5 pt-8 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] text-slate-300 font-semibold tracking-wider block uppercase">
                      Market Price
                    </span>
                    <span className="text-lg sm:text-xl font-bold text-white font-heading">
                      {plot.priceShort}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-black/60 text-emerald-300 text-[10px] font-mono font-bold backdrop-blur-sm border border-emerald-500/30 flex items-center gap-0.5">
                    <TrendingUp className="w-2.5 h-2.5" />
                    <span>{plot.trend}</span>
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  {/* Location info */}
                  <div className="flex items-center gap-1.5 text-xs text-[#801323] font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-[#801323] flex-shrink-0" />
                    <span className="truncate">{plot.sector}</span>
                  </div>

                  {/* Title */}
                  <h4 className="text-base font-bold text-slate-900 font-heading leading-snug">
                    {plot.title}
                  </h4>

                  {/* Dimensions Tag */}
                  <div className="pt-1">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-600 text-xs font-mono font-medium">
                      <Tag className="w-3 h-3 text-slate-400" />
                      <span>{plot.dimensions}</span>
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                  <Link
                    href={plot.href}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-xl bg-[#801323] hover:bg-[#9e1c30] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-[#801323]/20 transition-all text-center"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Inquire / Book</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
