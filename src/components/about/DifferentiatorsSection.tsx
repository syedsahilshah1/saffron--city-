"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import WordReveal from "@/components/animations/WordReveal";
import ScrollReveal from "@/components/animations/ScrollReveal";

interface DifferentiatorItem {
  number: string;
  title: string;
  desc: string;
  image: string;
  badge: string;
}

const DIFFERENTIATORS: DifferentiatorItem[] = [
  {
    number: "01",
    title: "RDA Approved — Verified Legal Standing",
    desc: "The NOC is officially approved and independently verifiable on the RDA portal, ensuring complete regulatory compliance.",
    image: "/images/about/val-integrity.webp",
    badge: "100% Legal"
  },
  {
    number: "02",
    title: "Developer with 70+ Years Track Record",
    desc: "SKB Builders has delivered mega civil and commercial infrastructure projects across Pakistan and the Middle East since 1954.",
    image: "/images/about/val-quality.webp",
    badge: "Since 1954"
  },
  {
    number: "03",
    title: "Prime GT Road, Rawat Location",
    desc: "Located on Main GT Road near Rawat, providing effortless access to Rawalpindi, Islamabad Expressway, and upcoming Ring Road.",
    image: "/images/landmark_t_chowk.webp",
    badge: "Main GT Road"
  },
  {
    number: "04",
    title: "Master Plan Built for Community Life",
    desc: "Integrated residential and commercial zones with educational hubs, healthcare, and 250-foot grand boulevards.",
    image: "/images/amenities/amenity_boulevard.webp",
    badge: "250ft Boulevard"
  },
  {
    number: "05",
    title: "Infrastructure That Precedes Residents",
    desc: "Underground utilities, boundary walls, and paved roads are constructed early so physical progress supports your plot investment.",
    image: "/images/amenities/amenity_security.webp",
    badge: "Gated Security"
  },
  {
    number: "06",
    title: "Grand Mosque & Lush Green Belts",
    desc: "Spacious family parks, lakes, and an architectural landmark Grand Mosque at the core of the community.",
    image: "/images/amenities/amenity_mosque.webp",
    badge: "Green Belts"
  }
];

export default function DifferentiatorsSection() {
  const [showAllMobile, setShowAllMobile] = useState(false);

  return (
    <section className="space-y-8 sm:space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <WordReveal
          text="What Makes Saffron City Different"
          highlightWords={["Different", "Saffron", "City"]}
          as="h2"
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight block"
        />

        <ScrollReveal animation="fade-up" delay={100}>
          <p className="text-xs sm:text-sm text-slate-600">
            Engineered for transparency, prime connectivity, and superior living standards.
          </p>
        </ScrollReveal>
      </div>

      {/* 3 Cards In a Line (Exactly 2 Lines Total on Tablet/Desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {DIFFERENTIATORS.map((diff, index) => (
          <div
            key={diff.number}
            className={`rounded-3xl bg-white border border-amber-200 hover:border-[#D49E17] shadow-md hover:shadow-xl transition-all overflow-hidden group flex flex-col justify-between ${
              !showAllMobile && index >= 3 ? "hidden sm:flex" : "flex"
            }`}
          >
            <div>
              {/* Card Image */}
              <div className="relative h-36 sm:h-44 md:h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={diff.image}
                  alt={diff.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-bold">
                  <span>{diff.number}</span>
                </div>
                <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3">
                  <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-[#D49E17] text-slate-950 text-[10px] sm:text-[11px] font-bold shadow">
                    {diff.badge}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4 sm:p-5 md:p-6 space-y-1.5 sm:space-y-2">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 font-heading group-hover:text-[#D49E17] transition-colors leading-snug">
                  {diff.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {diff.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile "See More / Show Less" for Differentiators */}
      <div className="block sm:hidden text-center pt-1">
        <button
          type="button"
          onClick={() => setShowAllMobile(!showAllMobile)}
          className="w-full py-2.5 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-[#D49E17] text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-98 cursor-pointer"
        >
          <span>{showAllMobile ? "Show Less" : "See More Features (3 more)"}</span>
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
