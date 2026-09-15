"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { MessageCircle, CheckCircle2 } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { StoredPlot } from "@/lib/types";
import { SITE_CONFIG } from "@/data/saffron-data";

export const DEFAULT_SECTOR_B_PLOTS = [
  {
    id: "sec-b-5m-default",
    plotNumber: "#B-101",
    size: "5 Marla",
    category: "Family Residential",
    dimensions: "25' × 45' (1,125 Sq. Ft.)",
    totalPrice: "PKR 4,000,000",
    rawPrice: 4000000,
    booking: "PKR 400,000 (10%)",
    allocation: "PKR 400,000 (10%)",
    monthly: "PKR 40,000 / month (×30)",
    biAnnual: "PKR 200,000 (×6)",
    possession: "PKR 800,000 (20%)",
    image: "/images/sectors/sector-b-residential.webp",
    tag: "Family Favorite",
    description: "Ideal family plot near central green parks, wide carpeted streets, and 100% underground utilities in Sector B.",
    whatsappText: "Hi, I want to book a 5 Marla Family Plot in Saffron City Sector B."
  },
  {
    id: "sec-b-10m-default",
    plotNumber: "#B-102",
    size: "10 Marla",
    category: "Family Residential",
    dimensions: "35' × 65' (2,275 Sq. Ft.)",
    totalPrice: "PKR 7,500,000",
    rawPrice: 7500000,
    booking: "PKR 750,000 (10%)",
    allocation: "PKR 750,000 (10%)",
    monthly: "PKR 75,000 / month (×30)",
    biAnnual: "PKR 375,000 (×6)",
    possession: "PKR 1,500,000 (20%)",
    image: "/images/sectors/green-community-park.webp",
    tag: "Spacious Garden Plot",
    description: "Spacious layout with generous front lawn space, wide paved roads, and walking distance to sector mosque and school.",
    whatsappText: "Hi, I want to book a 10 Marla Family Plot in Saffron City Sector B."
  },
  {
    id: "sec-b-1k-default",
    plotNumber: "#B-105",
    size: "1 Kanal",
    category: "Executive Park Facing",
    dimensions: "50' × 90' (4,500 Sq. Ft.)",
    totalPrice: "PKR 14,000,000",
    rawPrice: 14000000,
    booking: "PKR 1,400,000 (10%)",
    allocation: "PKR 1,400,000 (10%)",
    monthly: "PKR 140,000 / month (×30)",
    biAnnual: "PKR 700,000 (×6)",
    possession: "PKR 2,800,000 (20%)",
    image: "/images/about/about-hero-banner.webp",
    tag: "Park Facing Estate",
    description: "Exclusive luxury plot with serene park views, perimeter security, and high investment appreciation in Sector B.",
    whatsappText: "Hi, I want to book a 1 Kanal Park Facing Plot in Saffron City Sector B."
  }
];

function getImageForPlot(category: string = "", customImage?: string): string {
  if (customImage && customImage.trim().length > 5 && !customImage.includes("default")) {
    return customImage;
  }
  const cat = category.toLowerCase();
  if (cat.includes("5 marla")) return "/images/sectors/sector-b-residential.webp";
  if (cat.includes("10 marla")) return "/images/sectors/green-community-park.webp";
  if (cat.includes("1 kanal")) return "/images/about/about-hero-banner.webp";
  if (cat.includes("commercial") || cat.includes("4 marla") || cat.includes("8 marla")) {
    return "/images/sectors/commercial-plaza.webp";
  }
  return "/images/sectors/sector-b-residential.webp";
}

function formatPriceDisplay(val: number): string {
  if (!val || val <= 0) return "PKR Price on Request";
  const num = val > 0 && val <= 500 ? val * 100000 : val;
  return `PKR ${num.toLocaleString()}`;
}

interface SectorBPlotsGridProps {
  initialPlots?: StoredPlot[];
}

export default function SectorBPlotsGrid({ initialPlots = [] }: SectorBPlotsGridProps) {
  const [plotsList, setPlotsList] = useState<StoredPlot[]>(initialPlots);

  useEffect(() => {
    fetch("/api/plots")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setPlotsList(json.data);
        }
      })
      .catch(() => {});
  }, []);

  const displayedPlots = useMemo(() => {
    const sectorBPlots = plotsList.filter((p) => {
      const s = (p.sector || "").toLowerCase();
      return s.includes("sector b") || s.includes("sector-b");
    });

    if (sectorBPlots.length === 0) {
      return DEFAULT_SECTOR_B_PLOTS;
    }

    const dynamicCards = sectorBPlots.map((p) => {
      const priceNum = Number(p.totalPrice) || 0;
      const normalizedPrice = priceNum > 0 && priceNum <= 500 ? priceNum * 100000 : priceNum;

      const rawDown = Number(p.downPayment) || 0;
      const downPaymentNum = rawDown > 0 && rawDown <= 50 ? rawDown * 100000 : (rawDown > 0 ? rawDown : normalizedPrice * 0.1);

      const rawMonthly = Number(p.monthlyInst) || 0;
      const monthlyInstNum = rawMonthly > 0 && rawMonthly <= 5 ? rawMonthly * 100000 : (rawMonthly > 0 ? rawMonthly : (normalizedPrice * 0.3) / 30);

      const biAnnualNum = Math.round((normalizedPrice * 0.4) / 6);
      const possessionNum = normalizedPrice * 0.2;

      let dimensions = "50' × 90' (4,500 Sq. Ft.)";
      if (p.category?.includes("5 Marla")) dimensions = "25' × 45' (1,125 Sq. Ft.)";
      else if (p.category?.includes("10 Marla")) dimensions = "35' × 65' (2,275 Sq. Ft.)";
      else if (p.category?.includes("4 Marla")) dimensions = "30' × 30' (900 Sq. Ft.)";
      else if (p.category?.includes("8 Marla")) dimensions = "40' × 45' (1,800 Sq. Ft.)";

      const plotNumFormatted = p.plotNumber?.startsWith("#") ? p.plotNumber : `#${p.plotNumber || "PLT"}`;
      const plotTitle = `${p.category || "Plot"} (${plotNumFormatted})`;

      return {
        id: p.id,
        plotNumber: plotNumFormatted,
        size: plotTitle,
        category: p.type || "Family Residential",
        dimensions,
        totalPrice: formatPriceDisplay(priceNum),
        rawPrice: normalizedPrice,
        booking: `PKR ${Math.round(downPaymentNum).toLocaleString()} (10%)`,
        allocation: `PKR ${Math.round(normalizedPrice * 0.1).toLocaleString()} (10%)`,
        monthly: `PKR ${Math.round(monthlyInstNum).toLocaleString()} / month (×30)`,
        biAnnual: `PKR ${Math.round(biAnnualNum).toLocaleString()} (×6)`,
        possession: `PKR ${Math.round(possessionNum).toLocaleString()} (20%)`,
        image: getImageForPlot(p.category, p.image),
        tag: p.status === "Available" ? "Open for Booking" : p.status || "Family Choice",
        description:
          p.features && p.features.trim().length > 3
            ? p.features
            : `Authentic plot ${plotNumFormatted} in Sector B with park view, wide carpeted road, and 100% underground utilities.`,
        whatsappText: `Hi, I want to book Plot ${plotNumFormatted} (${p.category || "Plot"}) in Saffron City Sector B.`,
      };
    });

    return dynamicCards;
  }, [plotsList]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {displayedPlots.map((plot, idx) => {
        const isLeft = idx % 3 === 0;
        const isRight = idx % 3 === 2;
        return (
          <ScrollReveal
            key={`${plot.id || plot.plotNumber}-${idx}`}
            animation={isLeft ? "fade-right" : isRight ? "fade-left" : "fade-up"}
            delay={(idx % 3) * 100}
          >
            <div className="rounded-3xl bg-white border border-emerald-200 hover:border-emerald-500 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group flex flex-col justify-between h-full">
              <div>
                <Link href="/plot-for-sale" className="block relative h-56 w-full overflow-hidden bg-slate-100 cursor-pointer">
                  <img
                    src={plot.image}
                    alt={`${plot.size} Sector B Plot`}
                    title={`${plot.size} Sector B Plot`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-emerald-400 border border-emerald-500/40 text-[11px] font-bold shadow">
                      {plot.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider block">
                      {plot.category}
                    </span>
                    <h3 className="text-2xl font-black text-white drop-shadow-sm">
                      {plot.size}
                    </h3>
                  </div>
                </Link>

                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <p className="text-xs text-slate-500 font-mono font-medium">{plot.dimensions}</p>
                    <p className="text-2xl font-black text-emerald-700">{plot.totalPrice}</p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed min-h-[36px]">
                    {plot.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
                    <div className="flex justify-between py-1.5 px-2.5 rounded-lg bg-emerald-50/60">
                      <span className="text-slate-600">Booking (10%):</span>
                      <strong className="text-slate-900">{plot.booking}</strong>
                    </div>
                    <div className="flex justify-between py-1.5 px-2.5">
                      <span className="text-slate-600">Allocation (10%):</span>
                      <strong className="text-slate-900">{plot.allocation}</strong>
                    </div>
                    <div className="flex justify-between py-1.5 px-2.5 font-mono">
                      <span className="text-slate-600">Monthly Installment:</span>
                      <strong className="text-slate-900">{plot.monthly}</strong>
                    </div>
                    <div className="flex justify-between py-1.5 px-2.5 font-mono">
                      <span className="text-slate-600">Bi-Annual (×6):</span>
                      <strong className="text-slate-900">{plot.biAnnual}</strong>
                    </div>
                    <div className="flex justify-between py-1.5 px-2.5">
                      <span className="text-slate-600">On Possession (20%):</span>
                      <strong className="text-emerald-700 font-bold">{plot.possession}</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 space-y-2">
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(plot.whatsappText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs text-center flex items-center justify-center gap-2 shadow transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Book on WhatsApp</span>
                </a>
                <Link
                  href="/payment-plan"
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-950 font-bold text-xs text-center block transition-all"
                >
                  View Full Payment Plan
                </Link>
              </div>
            </div>
          </ScrollReveal>
        );
      })}
    </div>
  );
}
