import React from "react";
import Link from "next/link";
import {
  Building2,
  ShieldCheck,
  Award,
  Clock,
  Users,
  HeartHandshake,
  ArrowRight,
  Sparkles,
  MapPin,
  CheckCircle2,
  Calendar,
  Globe2,
  TrendingUp,
  Home
} from "lucide-react";
import StaggerReveal from "@/components/animations/StaggerReveal";
import ScrollReveal from "@/components/animations/ScrollReveal";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import WordReveal from "@/components/animations/WordReveal";
import LegacyOverviewWithSeeMore from "@/components/about/LegacyOverviewWithSeeMore";
import DifferentiatorsSection from "@/components/about/DifferentiatorsSection";
import CoreValuesSection from "@/components/about/CoreValuesSection";
import {
  SITE_CONFIG,
  LEADERSHIP,
  TIMELINE_MILESTONES
} from "@/data/saffron-data";

import { getPageMetadata } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return await getPageMetadata("/about-us");
}

const COMMITMENTS = [
  {
    title: "For Families",
    subtitle: "A Secure Home for Generations",
    desc: "Infrastructure delivered on time, secure gated neighborhoods, top schools, and lush parks where your family can thrive with pride.",
    image: "/images/amenities/amenity_park.webp",
    icon: Home,
    accent: "text-amber-600",
    border: "border-amber-200"
  },
  {
    title: "For Investors",
    subtitle: "High Yield & Capital Growth",
    desc: "100% legal RDA standing, prime GT Road commercial exposure, and strong appreciation potential backed by SKB's 70-year delivery legacy.",
    image: "/images/about/val-integrity.webp",
    icon: TrendingUp,
    accent: "text-emerald-600",
    border: "border-emerald-200"
  },
  {
    title: "For Overseas Pakistanis",
    subtitle: "Seamless Remote Ownership",
    desc: "Digital remote booking, verified Power of Attorney support, transparent video updates, and dedicated overseas sales desks.",
    image: "/images/about/about-hero-banner.webp",
    icon: Globe2,
    accent: "text-blue-600",
    border: "border-blue-200"
  }
];

export default function AboutUsPage() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
    "Hi, I want to learn more about Saffron City's development team and RDA approval."
  )}`;

  return (
    <div className="space-y-20 lg:space-y-28 pb-24 text-slate-900 bg-white">

      {/* Hero Banner Section with Background Image */}
      <section className="relative w-full pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden text-white">
        {/* Background Hero Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/about/about-hero-banner.webp"
            alt="Saffron City Islamabad Master View"
            className="w-full h-full object-cover object-center opacity-100 scale-105 animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
          <div className="absolute inset-0 bg-[radial-gradient(#D49E17_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading tracking-tight text-white">
            About <span className="text-[#D49E17]">Us</span>
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-200 font-light leading-relaxed">
            Building Pakistan’s premier 15,000 Kanal RDA approved master planned community on Main GT Road, Rawat — delivering trust, architectural excellence, and generational living.
          </p>

          {/* Quick Stats Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center space-y-1">
              <span className="text-2xl sm:text-3xl font-bold text-[#D49E17] font-mono">
                <AnimatedCounter end={70} suffix="+" />
              </span>
              <p className="text-xs text-slate-300 font-medium">Years Legacy</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center space-y-1">
              <span className="text-2xl sm:text-3xl font-bold text-[#D49E17] font-mono">
                <AnimatedCounter end={15000} suffix=" Kanal" />
              </span>
              <p className="text-xs text-slate-300 font-medium">Total Land Expanse</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center space-y-1">
              <span className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono">100%</span>
              <p className="text-xs text-slate-300 font-medium">RDA Approved</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center space-y-1">
              <span className="text-2xl sm:text-3xl font-bold text-[#D49E17] font-mono">250 Ft</span>
              <p className="text-xs text-slate-300 font-medium">Main Boulevard</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 lg:space-y-28">

        {/* Introduction & Developer Overview with See More */}
        <LegacyOverviewWithSeeMore />

        {/* Leadership Section */}
        <section className="space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <WordReveal
              text="Our Leadership"
              highlightWords={["Leadership"]}
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight block"
            />

            <ScrollReveal animation="fade-up" delay={100}>
              <p className="text-sm text-slate-600">
                Decades of real estate, construction, and community development experience guiding every milestone.
              </p>
            </ScrollReveal>
          </div>

          <StaggerReveal
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            staggerDelay={120}
            direction="up"
          >
            {LEADERSHIP.map((leader) => (
              <div
                key={leader.name}
                className="p-6 rounded-3xl bg-white border border-amber-200 hover:border-[#D49E17] shadow-md hover:shadow-xl transition-all space-y-4 group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-amber-200 group-hover:border-[#D49E17] transition-colors shadow-sm flex-shrink-0 bg-slate-100 flex items-center justify-center">
                      <img
                        src={leader.image}
                        alt={leader.name}
                        className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 group-hover:text-[#D49E17] transition-colors">
                        {leader.name}
                      </h4>
                      <span className="text-xs text-[#D49E17] font-bold">{leader.role}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {leader.bio}
                  </p>
                </div>
              </div>
            ))}
          </StaggerReveal>
        </section>

        {/* Development Timeline (Redesigned Style) */}
        <section className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <WordReveal
              text="Development Timeline & Journey"
              highlightWords={["Timeline", "Journey", "&"]}
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight block"
            />

            <ScrollReveal animation="fade-up" delay={100}>
              <p className="text-sm text-slate-600">
                Key milestones demonstrating continuous progress from foundation to modern master development.
              </p>
            </ScrollReveal>
          </div>

          {/* Sleek Grid Roadmap Cards */}
          <StaggerReveal
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            staggerDelay={80}
            direction="up"
          >
            {TIMELINE_MILESTONES.map((item, index) => (
              <div
                key={item.year}
                className="relative p-6 rounded-3xl bg-white border border-amber-200 hover:border-[#D49E17] shadow-md hover:shadow-xl transition-all duration-300 space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-xl bg-gradient-to-r from-amber-500 to-[#D49E17] text-white font-mono font-bold text-sm shadow">
                    {item.year}
                  </span>
                  <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md">
                    Phase 0{index + 1}
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium pt-2">
                  {item.milestone}
                </p>
              </div>
            ))}
          </StaggerReveal>
        </section>

        {/* What Makes Saffron City Different (3 cards per line - 2 lines total) */}
        <DifferentiatorsSection />

        {/* Our Core Values (3 cards per row - 2 rows total) */}
        <CoreValuesSection />

        {/* Our Commitment to You (With Images & Icons) */}
        <section className="space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <WordReveal
              text="Our Commitment to You"
              highlightWords={["Commitment"]}
              as="h2"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 font-heading block"
            />
            <ScrollReveal animation="fade-up" delay={100}>
              <p className="text-xs sm:text-sm text-slate-600">
                Tailored promises to ensure complete satisfaction, transparency, and trust for all stakeholders.
              </p>
            </ScrollReveal>
          </div>

          <div className="p-6 sm:p-10 rounded-3xl bg-amber-50/60 border border-amber-200 shadow-xl space-y-8">
            <StaggerReveal
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              staggerDelay={100}
              direction="up"
            >
              {COMMITMENTS.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.title}
                    className={`rounded-3xl bg-white border ${item.border} shadow-md hover:shadow-xl transition-all overflow-hidden group flex flex-col justify-between`}
                  >
                    <div>
                      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-3 flex items-center gap-2">
                          <div className="p-1.5 rounded-xl bg-white/95 text-slate-900 shadow">
                            <IconComponent className={`w-4 h-4 ${item.accent}`} />
                          </div>
                          <span className="text-white font-bold text-sm">
                            {item.title}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 space-y-2">
                        <span className={`text-xs font-bold block ${item.accent}`}>
                          {item.subtitle}
                        </span>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </StaggerReveal>

            <ScrollReveal animation="fade-up" delay={200} className="pt-2 text-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-[#D49E17] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-md hover:scale-105 transition-all cursor-pointer"
              >
                <span>Connect with Saffron City Official Representative</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </div>
  );
}
