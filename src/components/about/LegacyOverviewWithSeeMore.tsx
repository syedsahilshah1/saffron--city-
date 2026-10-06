"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Sparkles, Target, Compass } from "lucide-react";
import WordReveal from "@/components/animations/WordReveal";
import ScrollReveal from "@/components/animations/ScrollReveal";

interface LegacyOverviewProps {
  heading?: string;
  storyHtml?: string;
  mission?: string;
  vision?: string;
  image?: string;
}

export default function LegacyOverviewWithSeeMore({
  heading = "A Legacy Built on Quality & Trust",
  storyHtml,
  mission,
  vision,
  image = "/images/imgi_25_saffron-city-islamabad.webp"
}: LegacyOverviewProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const defaultText = `Islamabad has long set the benchmark for planned urban living in Pakistan. Saffron City is built to carry that standard forward — not as another speculative housing scheme, but as a structured, long-term residential and commercial community designed for families and forward-looking investors.`;

  const defaultExpandedText = `Located on Main GT Road, Rawat, Saffron City sits at one of the most accessible addresses in the Islamabad-Rawalpindi corridor. RDA approved, actively developing, and backed by a developer with over seven decades of mega civil engineering experience across Pakistan, Dubai, and Saudi Arabia.`;

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
      <div className="lg:col-span-7 space-y-4">
        <WordReveal
          text={heading || "A Legacy Built on Quality & Trust"}
          highlightWords={["Quality", "Trust", "&", "Legacy", "Story"]}
          as="h2"
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight leading-tight block"
        />

        <ScrollReveal animation="fade-up" delay={150}>
          <div className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {storyHtml ? (
              <div
                className="prose prose-sm max-w-none text-slate-600 leading-relaxed [&_a]:text-[#D49E17] [&_a]:underline [&_a]:font-bold [&_a]:transition-colors [&_a:hover]:text-amber-700 space-y-3"
                dangerouslySetInnerHTML={{ __html: storyHtml }}
              />
            ) : (
              <div>
                <span>{defaultText}</span>
                
                {!isExpanded ? (
                  <button
                    type="button"
                    onClick={() => setIsExpanded(true)}
                    className="inline-flex items-center gap-0.5 ml-2 font-bold text-[#D49E17] hover:text-amber-700 underline underline-offset-2 cursor-pointer text-xs sm:text-sm select-none"
                  >
                    <span>See more</span>
                    <ChevronDown className="w-3.5 h-3.5 inline text-[#D49E17]" />
                  </button>
                ) : null}

                {/* Expanded Content with inline Show less */}
                {isExpanded && (
                  <div className="space-y-3 pt-3 animate-fade-in">
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                      {defaultExpandedText}
                    </p>
                    <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 font-medium flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#D49E17] shrink-0" />
                        <span>Over 15,000 Kanal master plan with 100% legal RDA NOC protection.</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsExpanded(false)}
                        className="inline-flex items-center gap-0.5 font-bold text-slate-700 hover:text-slate-900 underline cursor-pointer text-xs shrink-0 select-none"
                      >
                        <span>Show less</span>
                        <ChevronUp className="w-3.5 h-3.5 inline" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {(mission || vision) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                {mission && (
                  <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs space-y-1">
                    <span className="font-bold text-amber-950 flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5 text-[#D49E17]" />
                      <span>Our Mission</span>
                    </span>
                    <p className="text-slate-600 leading-relaxed">{mission}</p>
                  </div>
                )}
                {vision && (
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                    <span className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-[#D49E17]" />
                      <span>Our Vision</span>
                    </span>
                    <p className="text-slate-600 leading-relaxed">{vision}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>

      <div className="lg:col-span-5 space-y-4">
        <ScrollReveal animation="zoom-in" duration={900}>
          <div className="relative rounded-3xl overflow-hidden border border-amber-200 shadow-xl group">
            <img
              src={image || "/images/imgi_25_saffron-city-islamabad.webp"}
              alt="Saffron City Overview"
              title="Saffron City Overview"
              className="w-full h-64 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
              <span className="px-3 py-1 rounded-full bg-[#D49E17] text-slate-950 text-xs font-bold shadow">
                Saffron City Project
              </span>
              <span className="text-xs font-medium">Main GT Road, Rawat</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
