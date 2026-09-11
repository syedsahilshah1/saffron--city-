"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
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
  const bioShort =
    settings?.chairmanBioShort ||
    `Saffron City's journey reflects vision, trust, and a dedication to excellence. Under ${name}'s leadership, it grew by delivering modern, affordable communities with transparency and timely development, continually enriching lives and shaping Pakistan's future through purposeful, people-focused progress.`;
  const bioFull =
    settings?.chairmanBioFull ||
    "Saadullah Khan & Brothers (SKB) was founded in 1954 and has built some of the most critical infrastructure networks, highways, flyovers, and mega developments across Pakistan, Dubai, Abu Dhabi, and Saudi Arabia. Under the visionary leadership of Chairman Malik Tariq Mehmood, Saffron City offers 100% legal security with an official No Objection Certificate (NOC) granted by the Rawalpindi Development Authority (RDA) across the full 15,000 Kanal master plan.";
  const portrait = settings?.chairmanPortrait || "/images/chairman_portrait_hd.png";

  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-6 sm:py-10 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center relative z-10">
        {/* Left Column: Content */}
        <ScrollReveal
          animation="fade-right"
          duration={850}
          className="lg:col-span-7 space-y-7"
        >
          {/* Styled Title: A STORY of LEGACY */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-slate-900 tracking-normal leading-[1.12]">
            A STORY
            <br />
            <span className="italic font-serif font-normal lowercase pr-3 inline-block">of</span>
            <span className="font-serif font-medium uppercase tracking-wider">LEGACY</span>
          </h2>

          {/* Description Text */}
          <div className="space-y-3 text-slate-600 text-sm sm:text-[15px] leading-relaxed max-w-xl">
            <p>
              {bioShort}
              {!isExpanded && (
                <button
                  onClick={() => setIsExpanded(true)}
                  type="button"
                  className="ml-2 font-medium text-amber-800 hover:text-amber-900 inline-flex items-center gap-1 cursor-pointer transition-colors text-xs underline underline-offset-2"
                >
                  <span>Read more</span>
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
                  className="font-medium text-amber-800 hover:text-amber-900 inline-flex items-center gap-1 cursor-pointer transition-colors text-xs underline underline-offset-2"
                >
                  <span>Read less</span>
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Discover More Link */}
          <div className="pt-2">
            <Link
              href="/about-us"
              className="group inline-flex items-center gap-2.5 text-[#5C1D24] hover:text-[#7E2430] font-medium text-sm sm:text-base transition-colors border-b-2 border-[#5C1D24] pb-0.5"
            >
              <span>Discover More</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Right Column: Portrait */}
        <ScrollReveal
          animation="fade-left"
          delay={150}
          duration={900}
          className="lg:col-span-5 flex justify-center lg:justify-end items-center relative"
        >
          <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg flex justify-center lg:justify-end">
            <img
              src={portrait}
              alt="Chairman & Founder Malik Tariq Mehmood - Saffron City"
              className="w-full h-auto object-contain select-none pointer-events-none transition-all duration-500"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
