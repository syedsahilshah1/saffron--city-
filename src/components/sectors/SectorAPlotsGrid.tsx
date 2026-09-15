"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { MessageCircle, CheckCircle2, Building2, Sparkles, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { StoredPlot } from "@/lib/types";
import { SITE_CONFIG } from "@/data/saffron-data";

export const DEFAULT_SECTOR_A_PLOTS = [
  {
    id: "sec-a-5m-default",
    plotNumber: "#A-101",
    size: "5 Marla",
    category: "Executive Residential",
    dimensions: "25' × 45' (1,125 Sq. Ft.)",
    totalPrice: "PKR 4,500,000",
    rawPrice: 4500000,
    booking: "PKR 450,000 (10%)",
    allocation: "PKR 450,000 (10%)",
    monthly: "PKR 45,000 / month (×30)",
    biAnnual: "PKR 225,000 (×6)",
    possession: "PKR 900,000 (20%)",
    image: "/images/sectors/sector-a-luxury.webp",
    tag: "Most Demanded",
    description: "Ideal executive home plot with 100% underground electrification, minimum 40ft wide carpeted street, and instant access to Sector A parks.",
    whatsappText: "Hi, I want to book a 5 Marla Executive Plot in Saffron City Sector A."
  },
  {
    id: "sec-a-10m-default",
    plotNumber: "#A-102",
    size: "10 Marla",
    category: "Executive Residential",
    dimensions: "35' × 65' (2,275 Sq. Ft.)",
    totalPrice: "PKR 8,250,000",
    rawPrice: 8250000,
    booking: "PKR 825,000 (10%)",
    allocation: "PKR 825,000 (10%)",
    monthly: "PKR 82,500 / month (×30)",
    biAnnual: "PKR 412,500 (×6)",
    possession: "PKR 1,650,000 (20%)",
    image: "/images/sectors/sector-b-residential.webp",
    tag: "Spacious Villa Plot",
    description: "Premium size designed for spacious multi-storey family villas with large front lawn, dual-car parking porch, and wide boulevard facing options.",
    whatsappText: "Hi, I want to book a 10 Marla Executive Plot in Saffron City Sector A."
  },
  {
    id: "sec-a-1k-default",
    plotNumber: "#A-105",
    size: "1 Kanal",
    category: "Luxury Boulevard Estate",
    dimensions: "50' × 90' (4,500 Sq. Ft.)",
    totalPrice: "PKR 15,500,000",
    rawPrice: 15500000,
    booking: "PKR 1,550,000 (10%)",
    allocation: "PKR 1,550,000 (10%)",
    monthly: "PKR 155,000 / month (×30)",
    biAnnual: "PKR 775,000 (×6)",
    possession: "PKR 3,100,000 (20%)",
    image: "/images/sectors/sector-a-overview.webp",
    tag: "Flagship Luxury Estate",
    description: "Elite mansion plots directly facing the wide Central Boulevard with immediate walking distance to the Grand Jamia Mosque.",
    whatsappText: "Hi, I want to book a 1 Kanal Luxury Estate Plot in Saffron City Sector A."
  }
];

function getImageForPlot(category: string = "", customImage?: string): string {
  if (customImage && customImage.trim().length > 5 && !customImage.includes("default")) {
    return customImage;
  }
  const cat = category.toLowerCase();
  if (cat.includes("5 marla")) return "/images/sectors/sector-a-luxury.webp";
  if (cat.includes("10 marla")) return "/images/sectors/sector-b-residential.webp";
  if (cat.includes("1 kanal")) return "/images/sectors/sector-a-overview.webp";
  if (cat.includes("commercial") || cat.includes("4 marla") || cat.includes("8 marla")) {
    return "/images/sectors/commercial-plaza.webp";
  }
  return "/images/sectors/sector-a-overview.webp";
}

function formatPriceDisplay(val: number): string {
  if (!val || val <= 0) return "PKR Price on Request";
  // If user entered short number like 45 instead of 4,500,000
  if (val > 0 && val < 500) {
    return `PKR ${val} Lacs (PKR ${(val * 100000).toLocaleString()})`;
  }
  return `PKR ${val.toLocaleString()}`;
}

interface SectorAPlotsGridProps {
  initialPlots?: StoredPlot[];
}

export default function SectorAPlotsGrid({ initialPlots = [] }: SectorAPlotsGridProps) {
  const [plotsList, setPlotsList] = useState<StoredPlot[]>(initialPlots);

  // Live client-side fetch to guarantee instant updates when plots are added/modified in dashboard
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
    const sectorAPlots = plotsList.filter((p) => {
      const s = (p.sector || "").toLowerCase();
      return (
        s.includes("sector a") ||
        s.includes("sector-a") ||
        s.includes("block a") ||
        s.includes("block-a") ||
        s.includes("block b") ||
        s.includes("block-b")
      );
    });

    if (sectorAPlots.length === 0) {
      return DEFAULT_SECTOR_A_PLOTS;
    }

    const dynamicCards = sectorAPlots.map((p) => {
      const priceNum = Number(p.totalPrice) || 0;
      const normalizedPrice = priceNum > 0 && priceNum < 500 ? priceNum * 100000 : priceNum;
      const downPaymentNum = Number(p.downPayment) || normalizedPrice * 0.1;
      const monthlyInstNum = Number(p.monthlyInst) || (normalizedPrice * 0.3) / 30;
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
        category: p.type || "Executive Residential",
        dimensions,
        totalPrice: formatPriceDisplay(priceNum),
        rawPrice: normalizedPrice,
        booking: `PKR ${Math.round(downPaymentNum).toLocaleString()} (10%)`,
        allocation: `PKR ${Math.round(normalizedPrice * 0.1).toLocaleString()} (10%)`,
        monthly: `PKR ${Math.round(monthlyInstNum).toLocaleString()} / month (×30)`,
        biAnnual: `PKR ${Math.round(biAnnualNum).toLocaleString()} (×6)`,
        possession: `PKR ${Math.round(possessionNum).toLocaleString()} (20%)`,
        image: getImageForPlot(p.category, p.image),
        tag: p.status === "Available" ? "Open for Booking" : p.status || "Verified Plot",
        description:
          p.features && p.features.trim().length > 3
            ? p.features
            : `Authentic plot ${plotNumFormatted} in Sector A with direct road connectivity, zero overhead wires, and 100% underground utilities.`,
        whatsappText: `Hi, I want to book Plot ${plotNumFormatted} (${p.category || "Plot"}) in Saffron City Sector A.`,
      };
    });

    // Check which default categories are not present in dynamic to keep as fallback
    const dynamicCategories = new Set(
      sectorAPlots.map((p) => (p.category || "").toLowerCase().trim())
    );

    const missingDefaults = DEFAULT_SECTOR_A_PLOTS.filter(
      (def) => !dynamicCategories.has(def.size.toLowerCase().trim())
    );

    return [...dynamicCards, ...missingDefaults];
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
            <div className="rounded-3xl bg-white border border-amber-200 hover:border-[#D49E17] shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group flex flex-col justify-between h-full">
              <div>
                <Link href="/plot-for-sale" className="block relative h-56 w-full overflow-hidden bg-slate-100 cursor-pointer">
                  <img
                    src={plot.image}
                    alt={`${plot.size} Sector A Plot`}
                    title={`${plot.size} Sector A Plot`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[#D49E17] border border-[#D49E17]/40 text-[11px] font-bold shadow">
                      {plot.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">
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
                    <p className="text-2xl font-black text-[#D49E17]">{plot.totalPrice}</p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed min-h-[36px]">
                    {plot.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
                    <div className="flex justify-between py-1.5 px-2.5 rounded-lg bg-amber-50/60">
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
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-950 font-bold text-xs text-center block transition-all"
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
