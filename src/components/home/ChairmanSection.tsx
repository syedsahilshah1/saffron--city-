"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, ChevronUp, Award } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { StoredSettings } from "@/lib/types";

export default function ChairmanSection({ initialSettings }: { initialSettings?: Partial<StoredSettings> }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [settings, setSettings] = useState<Partial<StoredSettings> | null>(initialSettings || null);

  useEffect(() => {
    // If not provided from parent, fetch current settings
    if (!initialSettings) {
      fetch("/api/settings")
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.data) {
            setSettings(data.data);
          }
        })
        .catch((err) => console.warn("Could not load dynamic chairman settings:", err));
    }
  }, [initialSettings]);

  const name = settings?.chairmanName || "Malik Tariq Mehmood";
  const title = settings?.chairmanTitle || "Chairman & Founder";
  const bioShort =
    settings?.chairmanBioShort ||
    "Saffron City Islamabad, developed by Saadullah Khan and Brothers (SKB Group), is a thoughtfully planned gated community located on GT Road, Rawat. Backed by over 70 years of engineering pedigree, the project sets a new benchmark in luxury, security, and transparent real estate.";
  const bioFull =
    settings?.chairmanBioFull ||
    "Saadullah Khan & Brothers (SKB) was founded in 1954 and has built some of the most critical infrastructure networks, highways, flyovers, and mega developments across Pakistan, Dubai, Abu Dhabi, and Saudi Arabia. Under the visionary leadership of Chairman Malik Tariq Mehmood, Saffron City offers 100% legal security with an official No Objection Certificate (NOC) granted by the Rawalpindi Development Authority (RDA) across the full 15,000 Kanal master plan.";
  const portrait = settings?.chairmanPortrait || "/images/chairman_portrait_hd.png";

  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-2 sm:py-4 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        {/* Left Column: Content */}
        <ScrollReveal
          animation="fade-right"
          duration={850}
          className="lg:col-span-7 space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold tracking-wide uppercase">
            <Award className="w-3.5 h-3.5 text-[#D4A017]" />
            <span>Visionary Leadership</span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight leading-[1.15]">
            <span className="text-[#D4A017]">
              {title} &mdash;
            </span>
            <br />
            <span className="text-slate-900">{name}</span>
          </h2>

          {/* Description Text */}
          <div className="space-y-3 text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
            <p>
              {bioShort}
              {!isExpanded && (
                <button
                  onClick={() => setIsExpanded(true)}
                  type="button"
                  className="ml-2 font-bold text-[#D4A017] hover:text-amber-700 inline-flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>See More</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              )}
            </p>

            {/* Expandable Details */}
            {isExpanded && (
              <div className="space-y-4 pt-3 border-t border-slate-200 animate-in fade-in duration-300">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {bioFull}
                </p>
                <button
                  onClick={() => setIsExpanded(false)}
                  type="button"
                  className="font-bold text-[#D4A017] hover:text-amber-700 inline-flex items-center gap-1 cursor-pointer transition-colors text-xs"
                >
                  <span>See Less</span>
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Discover More Link */}
          <div className="pt-2">
            <Link
              href="/about-us"
              className="group inline-flex items-center gap-2 text-[#D4A017] font-bold text-sm sm:text-base hover:text-amber-700 transition-all border-b-2 border-amber-300 hover:border-[#D4A017] pb-1"
            >
              <span>Discover More About SKB Group &amp; Saffron City</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Right Column: Seamlessly Blended Portrait matching Official Website */}
        <ScrollReveal
          animation="fade-left"
          delay={150}
          duration={900}
          className="lg:col-span-5 flex justify-center lg:justify-end items-center relative"
        >
          <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg flex justify-center lg:justify-end">
            <img
              src={portrait}
              alt={`${name} - ${title} Saffron City`}
              className="w-full h-auto object-contain select-none pointer-events-none transition-all duration-500"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
