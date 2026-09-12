"use client";

import React, { useState } from "react";
import { CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import WordReveal from "@/components/animations/WordReveal";
import ScrollReveal from "@/components/animations/ScrollReveal";

interface CoreValueItem {
  title: string;
  desc: string;
  image: string;
  tag: string;
}

const CORE_VALUES: CoreValueItem[] = [
  {
    title: "Transparency & Integrity",
    desc: "Every buyer receives clear development timelines, verifiable legal documentation, and honest milestone progress.",
    image: "/images/about/val-integrity.webp",
    tag: "Integrity"
  },
  {
    title: "Engineering Excellence",
    desc: "From 250-foot wide boulevards to underground utilities, every structure is built with top-tier civil engineering precision.",
    image: "/images/about/val-quality.webp",
    tag: "Excellence"
  },
  {
    title: "Family & Community Well-Being",
    desc: "Neighborhoods designed with extensive parks, dedicated schools, and family recreation for lifelong comfort.",
    image: "/images/amenities/amenity_park.webp",
    tag: "Community"
  },
  {
    title: "Eco-Friendly & Green Living",
    desc: "Generous green buffers, modern water filtration, and eco-friendly drainage systems embedded into the master plan.",
    image: "/images/amenities/amenity_water.webp",
    tag: "Sustainability"
  },
  {
    title: "Gated Security & Peace of Mind",
    desc: "Round-the-clock gated security, CCTV surveillance, and dedicated perimeter security for peaceful living.",
    image: "/images/amenities/amenity_security.webp",
    tag: "Security"
  },
  {
    title: "Long-Term Capital Appreciation",
    desc: "Strategic GT Road positioning designed to yield superior return on investment and solid generational asset growth.",
    image: "/images/about/about-hero-banner.webp",
    tag: "Long-Term Value"
  }
];

export default function CoreValuesSection() {
  const [showAllMobile, setShowAllMobile] = useState(false);

  return (
    <section className="space-y-8 sm:space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <WordReveal
          text="Our Core Values"
          highlightWords={["Core", "Values"]}
          as="h2"
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight block"
        />

        <ScrollReveal animation="fade-up" delay={100}>
          <p className="text-xs sm:text-sm text-slate-600">
            The ethical and architectural pillars that guide every decision at Saffron City.
          </p>
        </ScrollReveal>
      </div>

      {/* 3 Cards In a Row (Exactly 2 Rows on Tablet/Desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {CORE_VALUES.map((val, index) => (
          <div
            key={val.title}
            className={`rounded-3xl bg-white border border-amber-200 hover:border-[#D49E17] shadow-md hover:shadow-xl transition-all overflow-hidden group flex flex-col justify-between ${
              !showAllMobile && index >= 3 ? "hidden sm:flex" : "flex"
            }`}
          >
            <div>
              <div className="relative h-36 sm:h-44 md:h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={val.image}
                  alt={val.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3">
                  <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-900 text-[10px] sm:text-[11px] font-bold shadow">
                    {val.tag}
                  </span>
                </div>
              </div>

              <div className="p-4 sm:p-5 md:p-6 space-y-1.5 sm:space-y-2">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2 group-hover:text-[#D49E17] transition-colors leading-snug">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{val.title}</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile "See More / Show Less" */}
      <div className="block sm:hidden text-center pt-1">
        <button
          type="button"
          onClick={() => setShowAllMobile(!showAllMobile)}
          className="w-full py-2.5 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-[#D49E17] text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-98 cursor-pointer"
        >
          <span>{showAllMobile ? "Show Less" : "See More Values (3 more)"}</span>
          {showAllMobile ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      </div>
    </section>
  );
}
