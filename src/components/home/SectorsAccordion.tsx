"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface BlockItem {
  id: string;
  name: string;
  shortLabel: string;
  badge: string;
  tagline: string;
  plots: string;
  image: string;
  href: string;
}

const BLOCKS_DATA: BlockItem[] = [
  {
    id: "block-a",
    name: "Sector A (Block B - New Rates)",
    shortLabel: "Sector A",
    badge: "Sector A • Premium Living",
    tagline: "Prestigious residential sector featuring Grand Jamia Mosque, underground utilities, and wider carpeted roads.",
    plots: "5M, 10M & 1 Kanal",
    image: "/images/amenities/amenity_mosque.jpg",
    href: "/sectors/sector-a",
  },
  {
    id: "block-b",
    name: "Sector B (Affordable Block)",
    shortLabel: "Sector B",
    badge: "Sector B • Family Friendly",
    tagline: "Family-friendly sector with easy 3-year installment plans, dedicated sports courts, and community parks.",
    plots: "5M, 10M & 1 Kanal",
    image: "/images/hero-bg.jpg",
    href: "/sectors/sector-b",
  },
];

export default function SectorsAccordion() {
  const [activeId, setActiveId] = useState<string>("block-a");

  return (
    <div className="w-full">
      {/* Desktop & Tablet Expanding Horizontal Accordion */}
      <div className="hidden md:flex w-full h-[460px] lg:h-[500px] rounded-2xl lg:rounded-3xl overflow-hidden border border-amber-200/90 bg-white shadow-2xl relative">
        {BLOCKS_DATA.map((block) => {
          const isActive = activeId === block.id;

          return (
            <div
              key={block.id}
              onClick={() => setActiveId(block.id)}
              onMouseEnter={() => setActiveId(block.id)}
              className={`relative h-full cursor-pointer overflow-hidden transition-all duration-500 ease-out border-r border-slate-200 last:border-r-0 ${
                isActive
                  ? "flex-[1.6] lg:flex-[1.75]"
                  : "flex-1 hover:flex-[1.1]"
              }`}
            >
              {/* Background Image */}
              <Image
                src={block.image}
                alt={block.name}
                fill
                sizes="(max-width: 1024px) 100vw, 800px"
                className={`object-cover object-center transition-transform duration-700 ease-out ${
                  isActive ? "scale-105 filter-none" : "scale-100 brightness-75 contrast-95"
                }`}
                priority={block.id === "block-a"}
              />

              {/* Inactive Overlay */}
              <div
                className={`absolute inset-0 transition-opacity duration-500 ${
                  isActive
                    ? "bg-gradient-to-t from-black/90 via-black/40 to-transparent"
                    : "bg-black/50 hover:bg-black/35"
                }`}
              />

              {/* Inactive Collapsed Label */}
              {!isActive && (
                <div className="absolute inset-0 flex flex-col justify-end p-6 z-10 space-y-2">
                  <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-black/60 border border-amber-300/30 w-fit backdrop-blur-sm">
                    {block.badge}
                  </span>
                  <span className="text-white font-serif text-2xl lg:text-3xl font-bold tracking-tight drop-shadow-md">
                    {block.name}
                  </span>
                  <p className="text-xs text-slate-200 line-clamp-1">
                    Click to view details &amp; plots
                  </p>
                </div>
              )}

              {/* Active Expanded Content */}
              {isActive && (
                <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8 z-20 space-y-4 animate-in fade-in duration-300">
                  {/* Badge & Plot sizes */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider px-3 py-1 rounded-full bg-[#D4A017]/30 border border-[#D4A017] backdrop-blur-md">
                      {block.badge}
                    </span>
                    <span className="text-[11px] font-medium text-white px-2.5 py-1 rounded-full bg-black/60 border border-white/20 backdrop-blur-sm">
                      {block.plots}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div className="space-y-1.5 max-w-lg">
                    <h3 className="text-2xl lg:text-4xl font-serif font-bold text-white tracking-tight drop-shadow-md">
                      {block.name}
                    </h3>
                    <p className="text-xs lg:text-sm text-slate-100 leading-relaxed drop-shadow line-clamp-2">
                      {block.tagline}
                    </p>
                  </div>

                  {/* Explore Sector Gold Button */}
                  <div className="pt-1">
                    <Link
                      href={block.href}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-[#D4A017] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs lg:text-sm font-bold tracking-wider uppercase transition-all shadow-lg hover:scale-[1.03] active:scale-95 border border-amber-300"
                    >
                      <span>EXPLORE SECTOR</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-3">
        {BLOCKS_DATA.map((block) => {
          const isActive = activeId === block.id;

          return (
            <div
              key={block.id}
              onClick={() => setActiveId(isActive ? "" : block.id)}
              className="rounded-2xl overflow-hidden border border-amber-200 bg-white transition-all duration-300 relative shadow-md"
            >
              <div className="relative h-44 w-full">
                <Image
                  src={block.image}
                  alt={block.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                <div className="absolute inset-0 p-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-300 uppercase px-2.5 py-0.5 rounded-full bg-black/60 border border-amber-300/40">
                      {block.badge}
                    </span>
                    <span className="text-[10px] text-white bg-black/60 px-2 py-0.5 rounded-full border border-white/20">
                      {block.plots}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold text-white">
                      {block.name}
                    </h3>
                    <p className="text-xs text-slate-200 mt-1 line-clamp-1">
                      {block.tagline}
                    </p>
                  </div>
                </div>
              </div>

              {isActive && (
                <div className="p-4 bg-amber-50/50 border-t border-amber-200 space-y-3">
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {block.tagline}
                  </p>
                  <Link
                    href={block.href}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-[#D4A017] text-white text-xs font-bold uppercase tracking-wider"
                  >
                    <span>EXPLORE SECTOR</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
