import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  ArrowRight,
  FileCheck,
  MapPin,
  ExternalLink,
  Sparkles,
  Clock,
  CheckCircle2,
  Download,
  MessageCircle,
  Building2,
  Globe,
  Headphones,
  Award,
  Compass,
  Layers,
  HelpCircle,
  Quote,
  Plane,
  ShoppingBag,
  Landmark,
  Navigation,
  TrendingUp,
  Star,
  FileText
} from "lucide-react";
import MasterPlanViewer from "@/components/master-plan/MasterPlanViewer";
import GsapSplitReveal from "@/components/animations/GsapSplitReveal";
import StaggerReveal from "@/components/animations/StaggerReveal";
import ScrollReveal from "@/components/animations/ScrollReveal";
import ScrollParallax from "@/components/animations/ScrollParallax";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import InstallmentCalculator from "@/components/calculator/InstallmentCalculator";
import EnquiryForm from "@/components/forms/EnquiryForm";
import {
  SITE_CONFIG,
  HOME_OVERVIEW,
  DEVELOPER_INFO,
  LANDMARKS,
  SECTORS,
  AMENITIES,
  RESIDENTIAL_PRICES,
  COMMERCIAL_PRICES,
  BOOKING_STEPS,
  REVIEWS,
  HOME_FAQS
} from "@/data/saffron-data";
import SeeMoreDrawer from "@/components/ui/SeeMoreDrawer";
import ChairmanSection from "@/components/home/ChairmanSection";
import ScrollingTextButtons from "@/components/ui/ScrollingTextButtons";
import LocationMapCard from "@/components/home/LocationMapCard";
import SectorComparison from "@/components/home/SectorComparison";
import SectorsAccordion from "@/components/home/SectorsAccordion";
import PlotsForSaleGrid from "@/components/home/PlotsForSaleGrid";
import FaqAccordion from "@/components/home/FaqAccordion";

export default function HomePage() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
    "Hi, I want to start booking a plot in Saffron City."
  )}`;

  return (
    <div className="pb-24 overflow-hidden bg-white text-slate-900">

      {/* =========================================================
          SECTION 1 — Hero & Overview
      ========================================================= */}
      <section className="relative pt-24 pb-14 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20 flex flex-col justify-center overflow-hidden border-b border-amber-200/60 bg-transparent">
        {/* Full-Cover Background Image extending behind headline and form on mobile and desktop */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src="/images/hero-bg.jpg"
            alt="Saffron City Master Community"
            className="w-full h-full object-cover object-center scale-105"
          />
          {/* Subtle multi-layer gradient overlay to ensure text and form stand out with luxury clarity */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/30 to-white/75 sm:bg-gradient-to-r sm:from-white/80 sm:via-white/50 sm:to-white/20" />
          <div className="absolute inset-0 bg-amber-500/[0.03]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <GsapSplitReveal
            leftContent={
              <div className="space-y-6 relative max-w-xl">
                {/* Headline */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight">
                  Invest in Premium Living at <span className="text-[#D4A017]">Saffron City</span>
                </h1>

                {/* Action Buttons (Desktop view - below headline) */}
                <div className="pt-2 hidden lg:flex flex-wrap items-center gap-3">
                  <a
                    href="#hero-booking-form"
                    className="shimmer-gold-btn inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-[#D4A017] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-sm shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                  >
                    <span>Book Your Plot</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href={SITE_CONFIG.masterPlanPdf}
                    download="Saffron-City-Master-Plan-Model.pdf"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/70 backdrop-blur-md border border-amber-300/80 text-slate-800 hover:bg-white font-bold text-sm shadow-sm transition-all"
                  >
                    <Download className="w-4 h-4 text-[#D4A017]" />
                    <span>Download Master Plan</span>
                  </a>
                </div>
              </div>
            }
            rightContent={
              <div className="relative flex flex-col items-center lg:items-end pr-0 lg:pr-10 xl:pr-14 space-y-4 w-full">
                <EnquiryForm
                  id="hero-booking-form"
                  title="Book Your Plot"
                  subtitle="Sector A (Block B) new rates with 10% down payment (PKR 450,000)."
                />

                {/* Action Buttons (Mobile view - below the form) */}
                <div className="w-full max-w-lg flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 lg:hidden pt-1">
                  <a
                    href="#hero-booking-form"
                    className="shimmer-gold-btn inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-[#D4A017] to-amber-600 text-white font-bold text-xs shadow-md transition-all text-center"
                  >
                    <span>Book Your Plot</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href={SITE_CONFIG.masterPlanPdf}
                    download="Saffron-City-Master-Plan-Model.pdf"
                    className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-white/90 backdrop-blur-md border border-amber-300 text-slate-800 font-bold text-xs shadow-sm transition-all text-center"
                  >
                    <Download className="w-4 h-4 text-[#D4A017]" />
                    <span>Download Master Plan</span>
                  </a>
                </div>
              </div>
            }
          />
        </div>
      </section>

      {/* =========================================================
          Interactive Scrolling Text / Announcement Ticker
      ========================================================= */}
      <ScrollingTextButtons />

      <div className="space-y-24 lg:space-y-32 mt-16 lg:mt-24">
        {/* =========================================================
            SECTION 2 — Chairman & Developer Leadership
        ========================================================= */}
        <ChairmanSection />

        {/* =========================================================
            SECTION 3 — Location & Accessibility
        ========================================================= */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <GsapSplitReveal
            leftContent={
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold tracking-wide uppercase">
                  <MapPin className="w-3.5 h-3.5 text-[#D4A017]" />
                  <span>Prime Highway Access</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight leading-tight">
                  Located on GT Road, <span className="text-[#D4A017]">Between Islamabad and Rawalpindi</span>
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Saffron City sits on Main GT Road near T-Chowk, Rawat, putting it within a reasonable drive of both Islamabad and Rawalpindi without being in the middle of either city&apos;s traffic. For residents, that means access to major commercial areas like Giga Mall and DHA without giving up the quieter pace that comes with being slightly outside the urban core.
                </p>

                <div className="pt-2">
                  <a
                    href="https://maps.google.com/?q=Saffron+City+Rawat+Islamabad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shimmer-gold-btn inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-[#D4A017] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-md hover:scale-105 transition-all"
                  >
                    <Compass className="w-4 h-4" />
                    <span>Get Directions on Google Maps</span>
                  </a>
                </div>
              </div>
            }
            rightContent={
              <LocationMapCard />
            }
          />

          <ScrollReveal animation="fade-up" delay={100}>
            <SeeMoreDrawer
              moreButtonText="See More Location & Access Routes"
              lessButtonText="Show Less Location Details"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs text-slate-600">
                <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200">
                  <h5 className="font-bold text-slate-900 mb-1">Islamabad Expressway Access</h5>
                  <p className="text-slate-600">Direct signal-free connectivity reaching Blue Area and Zero Point without interior city congestion.</p>
                </div>
                <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200">
                  <h5 className="font-bold text-slate-900 mb-1">Rawat–Chakbeli Road Access</h5>
                  <p className="text-slate-600">Fast connection to upcoming Ring Road interchanges and southern bypass networks.</p>
                </div>
                <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200">
                  <h5 className="font-bold text-slate-900 mb-1">Kallar Syedan Route</h5>
                  <p className="text-slate-600">Alternate northern approach keeping daily travel smooth during peak traffic hours.</p>
                </div>
              </div>
            </SeeMoreDrawer>
          </ScrollReveal>
        </section>

        {/* =========================================================
            SECTION 4 — Nearby Landmarks
        ========================================================= */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
          <ScrollReveal animation="fade-up" className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold tracking-wide uppercase">
              <Clock className="w-3.5 h-3.5 text-[#D4A017]" />
              <span>Proximity &amp; Transit Times</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
              Nearby Landmarks &amp; Distances
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Direct arterial access to major commercial hubs, business districts, and transit corridors across Islamabad and Rawalpindi.
            </p>
          </ScrollReveal>

          {/* 4-Column Grid of Landmark Cards with Stagger Reveal */}
          <StaggerReveal
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            staggerDelay={70}
            direction="up"
          >
            {[
              {
                title: "T-Chowk, Rawat",
                subtitle: "Main GT Road Junction",
                driveTime: "5 Mins Drive",
                image: "/images/landmark_t_chowk.jpg",
                icon: <Compass className="w-4 h-4 text-[#D4A017]" />,
              },
              {
                title: "Giga Mall & DHA",
                subtitle: "Premier Shopping & Dining",
                driveTime: "12 Mins Drive",
                image: "/images/landmark_giga_mall.jpg",
                icon: <ShoppingBag className="w-4 h-4 text-[#D4A017]" />,
              },
              {
                title: "DHA Islamabad",
                subtitle: "Executive Housing Society",
                driveTime: "10 Mins Drive",
                image: "/images/landmark_dha_islamabad.jpg",
                icon: <Building2 className="w-4 h-4 text-[#D4A017]" />,
              },
              {
                title: "Zero Point & Blue Area",
                subtitle: "Capital Business District",
                driveTime: "20 Mins Drive",
                image: "/images/hero-bg.jpg",
                icon: <TrendingUp className="w-4 h-4 text-[#D4A017]" />,
              },
              {
                title: "Bahria Town",
                subtitle: "Gated Residential Community",
                driveTime: "10 Mins Drive",
                image: "/images/imgi_25_saffron-city-islamabad.jpg",
                icon: <Landmark className="w-4 h-4 text-[#D4A017]" />,
              },
              {
                title: "Islamabad Airport",
                subtitle: "International Air Terminal",
                driveTime: "30 Mins Drive",
                image: "/images/landmark_t_chowk.jpg",
                icon: <Plane className="w-4 h-4 text-[#D4A017]" />,
              },
              {
                title: "Rawalpindi Ring Road",
                subtitle: "Direct Bypass Interchange",
                driveTime: "2 Mins Drive",
                image: "/images/imgi_25_saffron-city-islamabad.jpg",
                icon: <Navigation className="w-4 h-4 text-[#D4A017]" />,
              },
              {
                title: "Islamabad Expressway",
                subtitle: "Signal-Free Arterial Route",
                driveTime: "15 Mins Drive",
                image: "/images/hero-bg.jpg",
                icon: <ShieldCheck className="w-4 h-4 text-[#D4A017]" />,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group rounded-3xl overflow-hidden bg-white text-slate-900 border border-amber-200/80 hover:border-[#D4A017] shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
              >
                {/* Image Area with Badge */}
                <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Drive Time Badge on Top-Right */}
                  <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-[#D4A017] text-white text-[11px] font-bold tracking-wide shadow-md">
                    {item.driveTime}
                  </div>
                </div>

                {/* Bottom Content Area */}
                <div className="p-4 sm:p-5 flex items-center gap-3.5 flex-1 bg-white border-t border-slate-100">
                  <div className="w-10 h-10 rounded-xl border border-amber-200 bg-amber-50 flex items-center justify-center shrink-0 shadow-sm group-hover:border-[#D4A017] group-hover:bg-amber-100 transition-all">
                    {item.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-[15px] tracking-tight font-heading leading-snug group-hover:text-[#D4A017] transition-colors truncate">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 truncate mt-0.5 font-medium">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </StaggerReveal>
        </section>

        {/* =========================================================
            SECTION 5 — Master Plan Showcase
        ========================================================= */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <GsapSplitReveal
            leftContent={
              <div className="space-y-6">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight leading-tight">
                  A Planned Layout, <span className="text-[#D4A017]">Not Just Open Land</span>
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  The master plan divides Saffron City into residential blocks alongside dedicated space for a commercial area, mosque, schools, and parks — the kind of layout that determines how a society actually functions once people move in, not just how it looks on a brochure.
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Spanning across 15,000 Kanal with clear RDA legal approval, the community incorporates underground electrification, water reservoirs, dedicated family recreation belts, and high-speed multi-lane access from Main GT Road Rawat.
                </p>

                <div className="pt-2 flex flex-wrap gap-3">
                  <Link
                    href="/master-plan"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-[#D4A017] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-md hover:scale-105 transition-all"
                  >
                    <span>View Detailed Master Plan</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href={SITE_CONFIG.masterPlanPdf}
                    download="Saffron-City-Master-Plan-Model.pdf"
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
                  >
                    <Download className="w-4 h-4 text-[#D4A017]" />
                    <span>Download Plan PDF</span>
                  </a>
                </div>
              </div>
            }
            rightContent={
              <div className="relative">
                <MasterPlanViewer />
              </div>
            }
          />
        </section>

        {/* =========================================================
            SECTION 6 — Sectors & Community Breakdown
        ========================================================= */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
          <ScrollReveal animation="fade-up" className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
              Saffron City Sectors &amp; Development Zones
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Thoughtfully partitioned into specialized residential, commercial, and civic sectors to ensure tranquil living and high-growth commercial activity.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={100}>
            <SectorsAccordion />
          </ScrollReveal>
        </section>

        {/* =========================================================
            SECTION 7 — World-Class Amenities
        ========================================================= */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <ScrollReveal animation="fade-up" className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
              What&apos;s Actually Included in the Community
            </h2>
            <p className="text-sm text-slate-600">
              Infrastructure designed to precede resident arrival, ensuring every essential utility and community amenity is functional.
            </p>
          </ScrollReveal>

          {/* Amenities Grid with Stagger Reveal */}
          <StaggerReveal
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            staggerDelay={80}
            direction="up"
          >
            {AMENITIES.map((item, idx) => (
              <div
                key={idx}
                className="group rounded-3xl overflow-hidden bg-white text-slate-900 border border-amber-200/80 hover:border-[#D4A017] shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
              >
                {/* Amenity Image */}
                <div className="relative w-full h-40 sm:h-44 overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Amenity Content */}
                <div className="p-5 flex-1 flex flex-col justify-between bg-white border-t border-slate-100 space-y-2">
                  <div>
                    <h4 className="text-base font-bold text-slate-900 group-hover:text-[#D4A017] transition-colors font-heading">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </StaggerReveal>
        </section>

        {/* =========================================================
            SECTION 8 — Available Plots Directory
        ========================================================= */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <ScrollReveal animation="fade-up">
            <PlotsForSaleGrid />
          </ScrollReveal>
        </section>

        {/* =========================================================
            SECTION 9 — Official Payment Plan & Rates Showcase
        ========================================================= */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
          <ScrollReveal animation="fade-up" className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold tracking-wide uppercase">
              <Clock className="w-3.5 h-3.5 text-[#D4A017]" />
              <span>Official 2026 Payment Structure</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
              Sector A (Block B) &amp; Signature Commercial Rates
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Saffron City uses a 10% booking payment, 10% allocation payment, 30 monthly installments, 6 bi-annual installments, and 20% on possession over 3 years.
            </p>
          </ScrollReveal>

          {/* Official Flyers Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {/* Residential Plan Flyer Card */}
            <ScrollReveal animation="fade-right" duration={850}>
              <div className="p-6 rounded-3xl bg-white border border-amber-200 shadow-xl space-y-4 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-xs uppercase tracking-wider">
                      Residential (Sector A - Block B)
                    </span>
                    <span className="text-xs font-bold text-emerald-600">RDA Approved</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-heading">
                    Official Residential Payment Plan
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    5 Marla (PKR 45 Lac), 10 Marla (PKR 82.5 Lac), 1 Kanal (PKR 1.55 Crore) with easy 3-year installments.
                  </p>
                </div>

                <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 group my-2">
                  <img
                    src={SITE_CONFIG.residentialPaymentPlanImg}
                    alt="Saffron City Residential Payment Plan Sector A Block B"
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <a
                    href={SITE_CONFIG.residentialPaymentPlanImg}
                    download="Saffron-City-Residential-Payment-Plan.jpg"
                    className="shimmer-gold-btn flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-[#D4A017] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs text-center shadow-md flex items-center justify-center gap-2"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Residential Flyer</span>
                  </a>
                  <Link
                    href="/payment-plan"
                    className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs"
                  >
                    Full Table
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            {/* Commercial Plan Flyer Card */}
            <ScrollReveal animation="fade-left" delay={150} duration={850}>
              <div className="p-6 rounded-3xl bg-white border border-amber-200 shadow-xl space-y-4 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-[#D4A017] text-white font-bold text-xs uppercase tracking-wider">
                      Signature Commercial (30×40)
                    </span>
                    <span className="text-xs font-bold text-amber-700">Save 45 Lac</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-heading">
                    Signature Commercial 3-Year Plan
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    5.33 Marla (30×40) — Total PKR 2 Crore, Discount PKR 45 Lac, Net PKR 1.55 Crore (Down Payment 35 Lac, Monthly 250,000).
                  </p>
                </div>

                <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 group my-2">
                  <img
                    src={SITE_CONFIG.commercialPaymentPlanImg}
                    alt="Saffron City Signature Commercial Payment Plan"
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <a
                    href={SITE_CONFIG.commercialPaymentPlanImg}
                    download="Saffron-City-Commercial-Payment-Plan.jpg"
                    className="shimmer-gold-btn flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-[#D4A017] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs text-center shadow-md flex items-center justify-center gap-2"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Commercial Flyer</span>
                  </a>
                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent("Hi, I want to book a Signature Commercial 30x40 plot in Saffron City.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Pricing Table */}
          <ScrollReveal animation="fade-up" delay={100}>
            <div className="overflow-x-auto rounded-3xl border border-amber-200 bg-white shadow-xl">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-amber-50 text-[11px] text-amber-900 uppercase tracking-wider font-bold border-b border-amber-200">
                  <tr>
                    <th className="py-4 px-5">Plot Size</th>
                    <th className="py-4 px-5">Total Price</th>
                    <th className="py-4 px-5">Booking (10%)</th>
                    <th className="py-4 px-5">Allocation (10%)</th>
                    <th className="py-4 px-5">30 Monthly Inst.</th>
                    <th className="py-4 px-5">6 Bi-Annual Inst.</th>
                    <th className="py-4 px-5">Possession (20%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {RESIDENTIAL_PRICES.map((plot) => (
                    <tr key={plot.size} className="hover:bg-amber-50/50 transition-colors">
                      <td className="py-4 px-5 font-bold text-slate-900 text-sm">{plot.size}</td>
                      <td className="py-4 px-5 font-bold text-[#D4A017]">{plot.totalPriceFormatted}</td>
                      <td className="py-4 px-5">{plot.bookingAmountFormatted}</td>
                      <td className="py-4 px-5">{plot.allocationAmountFormatted}</td>
                      <td className="py-4 px-5 font-mono">{plot.monthlyInstallmentFormatted}</td>
                      <td className="py-4 px-5 font-mono">{plot.biAnnualInstallmentFormatted}</td>
                      <td className="py-4 px-5 font-bold text-slate-900">{plot.possessionAmountFormatted}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>

          {/* Interactive Payment Calculator Section */}
          <ScrollReveal animation="fade-up" delay={100} className="pt-6">
            <InstallmentCalculator />
          </ScrollReveal>
        </section>

        {/* =========================================================
            SECTION 10 — Booking Steps
        ========================================================= */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
          <ScrollReveal animation="fade-up" className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold tracking-wide uppercase">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D4A017]" />
              <span>Simple 6 Steps</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
              How Booking Actually Works
            </h2>
            <p className="text-sm text-slate-600">
              Booking a plot follows a fixed sequence, and knowing the steps in advance makes the process faster on both sides.
            </p>
          </ScrollReveal>

          <StaggerReveal
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            staggerDelay={80}
            direction="up"
          >
            {BOOKING_STEPS.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-3xl bg-white border border-amber-200/80 hover:border-[#D4A017] shadow-md hover:shadow-xl transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#D4A017] font-bold text-sm mb-4 group-hover:scale-110 transition-transform">
                  {step.step}
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2 group-hover:text-[#D4A017] transition-colors">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </StaggerReveal>

          <ScrollReveal animation="fade-up" className="text-center pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg hover:scale-105 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Start Booking on WhatsApp</span>
            </a>
          </ScrollReveal>
        </section>

        {/* =========================================================
            SECTION 11 — Reviews
        ========================================================= */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
          <ScrollReveal animation="fade-up" className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold tracking-wide uppercase">
              <Quote className="w-3.5 h-3.5 text-[#D4A017]" />
              <span>Buyer Feedback</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
              What Buyers Are Saying
            </h2>
          </ScrollReveal>

          <StaggerReveal
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            staggerDelay={90}
            direction="up"
          >
            {REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="p-6 sm:p-7 rounded-3xl bg-white border border-amber-200/80 hover:border-[#D4A017] transition-all duration-300 space-y-5 relative shadow-md hover:shadow-xl hover:-translate-y-1 group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Header: Rating Stars & Quote Icon */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[#D4A017]">
                      {[...Array(rev.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#D4A017] text-[#D4A017]" />
                      ))}
                    </div>
                    <Quote className="w-7 h-7 text-amber-200 group-hover:text-[#D4A017] transition-colors" />
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                    &ldquo;{rev.quote}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-slate-100 flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-[#D4A017] font-bold text-sm shrink-0">
                    {rev.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm block font-heading group-hover:text-[#D4A017] transition-colors">
                      {rev.author}
                    </h4>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                      <span className="text-[#D4A017] font-semibold">{rev.location}</span>
                      {rev.role && (
                        <>
                          <span>•</span>
                          <span>{rev.role}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </StaggerReveal>
        </section>

        {/* =========================================================
            SECTION 12 — FAQ
        ========================================================= */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
          <ScrollReveal animation="fade-up" className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold tracking-wide uppercase">
              <HelpCircle className="w-3.5 h-3.5 text-[#D4A017]" />
              <span>Common Queries</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
              Frequently Asked Questions
            </h2>
          </ScrollReveal>

          {/* Interactive Collapsible FAQ Accordion */}
          <ScrollReveal animation="fade-up" delay={100}>
            <FaqAccordion />
          </ScrollReveal>
        </section>

        {/* =========================================================
            SECTION 13 — Centered Booking Form
        ========================================================= */}
        <section id="booking-form" className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto flex flex-col items-center justify-center pt-6">
          <ScrollReveal animation="zoom-in" duration={800} className="w-full">
            <EnquiryForm className="mx-auto shadow-2xl" />
          </ScrollReveal>
        </section>
      </div>
    </div>
  );
}
