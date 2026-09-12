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
import DownloadButtonWithLeadModal from "@/components/ui/DownloadButtonWithLeadModal";
import GsapSplitReveal from "@/components/animations/GsapSplitReveal";
import StaggerReveal from "@/components/animations/StaggerReveal";
import ScrollReveal from "@/components/animations/ScrollReveal";
import ScrollParallax from "@/components/animations/ScrollParallax";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import InstallmentCalculator from "@/components/calculator/InstallmentCalculator";
import BookingStepsSection from "@/components/home/BookingStepsSection";
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
  REVIEWS,
  HOME_FAQS
} from "@/data/saffron-data";
import ChairmanSection from "@/components/home/ChairmanSection";
import ScrollingTextButtons from "@/components/ui/ScrollingTextButtons";
import LocationMapCard from "@/components/home/LocationMapCard";
import SectorComparison from "@/components/home/SectorComparison";
import SectorsAccordion from "@/components/home/SectorsAccordion";
import PlotsForSaleGrid from "@/components/home/PlotsForSaleGrid";
import FaqAccordion from "@/components/home/FaqAccordion";
import HomeBlogsSection from "@/components/home/HomeBlogsSection";
import NocApprovalSection from "@/components/home/NocApprovalSection";
import SeeMoreDrawer from "@/components/ui/SeeMoreDrawer";
import PaymentPlanCard from "@/components/home/PaymentPlanCard";

import { db } from "@/lib/db";

export default async function HomePage() {
  const settings = await db.getSettings();
  const blogs = await db.getBlogs(true);

  const whatsappUrl = `https://wa.me/${settings.whatsappPhone || SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
    "Hi, I want to start booking a plot in Saffron City."
  )}`;

  return (
    <div className="pb-24 overflow-hidden bg-white text-slate-900">

      {/* =========================================================
          SECTION 1 — Hero & Overview
      ========================================================= */}
      <section className="relative pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-20 flex flex-col justify-center overflow-hidden border-b border-amber-200/60 bg-transparent min-h-[92vh] sm:min-h-0">
        {/* Full-Cover Background Image extending behind headline and form on mobile and desktop */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src={settings.heroBgImage || "/images/hero-bg.webp"}
            alt="Saffron City Master Community"
            className="w-full h-full object-cover object-center scale-105"
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
          {/* Subtle dark gradient overlay so text is 100% crisp and readable while keeping background image vivid and visible in the center */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/75 sm:bg-gradient-to-r sm:from-black/80 sm:via-black/45 sm:to-black/10" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <GsapSplitReveal
            className="gap-24 sm:gap-28 lg:gap-12"
            leftContent={
              <div className="space-y-6 relative max-w-xl pb-8 sm:pb-12 lg:pb-0 text-center lg:text-left mx-auto lg:mx-0 flex flex-col items-center lg:items-start">
                {/* Headline: Strictly 2 lines with uniform Playfair Display font weight */}
                <h1 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-5xl font-serif font-normal text-white drop-shadow-md tracking-normal leading-[1.2] max-w-xl text-center lg:text-left">
                  Invest in Premium Living
                  <br />
                  <span className="italic font-serif font-normal text-amber-200/90 pr-2">at</span>
                  <span className="text-amber-400 font-semibold">{settings.heroHighlightedWord || "Saffron City"}</span>
                </h1>

                {/* Subtitle - hidden on mobile view, shown on desktop lg+ */}
                {settings.heroSubtitle && (
                  <p className="hidden lg:block text-sm sm:text-base text-slate-100 drop-shadow leading-relaxed font-normal">
                    {settings.heroSubtitle}
                  </p>
                )}

                {/* Action Buttons (Desktop view - below headline) */}
                <div className="pt-2 hidden lg:flex flex-wrap items-center gap-3">
                  <a
                    href="#hero-booking-form"
                    className="shimmer-gold-btn inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-[#D49E17] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                  >
                    <span>{settings.heroButtonText || "Book Your Plot"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <DownloadButtonWithLeadModal
                    downloadUrl={settings.masterPlanPdf || SITE_CONFIG.masterPlanPdf}
                    downloadFileName="Saffron-City-Master-Plan-Model.pdf"
                    documentTitle="Saffron City Master Plan Model"
                    documentType="Master Plan"
                    buttonText="Download Master Plan"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/90 hover:bg-white text-slate-900 border border-white/60 font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
                  />
                </div>
              </div>
            }
            rightContent={
              <div className="relative flex flex-col items-center lg:items-end pr-0 lg:pr-10 xl:pr-14 space-y-4 w-full pt-4 sm:pt-6 lg:pt-0">
                <EnquiryForm
                  id="hero-booking-form"
                  title="Book Your Plot"
                />

                {/* Action Buttons (Mobile view - below the form) */}
                <div className="w-full max-w-lg flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 lg:hidden pt-1">
                  <a
                    href="#hero-booking-form"
                    className="shimmer-gold-btn inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-[#D49E17] to-amber-600 text-white font-bold text-xs shadow-md transition-all text-center"
                  >
                    <span>{settings.heroButtonText || "Book Your Plot"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <DownloadButtonWithLeadModal
                    downloadUrl={settings.masterPlanPdf || SITE_CONFIG.masterPlanPdf}
                    downloadFileName="Saffron-City-Master-Plan-Model.pdf"
                    documentTitle="Saffron City Master Plan Model"
                    documentType="Master Plan"
                    buttonText="Download Master Plan"
                    className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-white/90 backdrop-blur-md border border-amber-300 text-slate-800 font-bold text-xs shadow-sm transition-all text-center cursor-pointer"
                  />
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

      <div className="space-y-16 sm:space-y-20 lg:space-y-24 mt-6 sm:mt-8 lg:mt-10">
        {/* =========================================================
            SECTION 2 — Chairman & Developer Leadership
        ========================================================= */}
        <ChairmanSection initialSettings={settings} />

        {/* =========================================================
            SECTION 3 — Location & Accessibility
        ========================================================= */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <GsapSplitReveal
            leftContent={
              <div className="space-y-6">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-slate-900 tracking-normal leading-[1.18]">
                  Located on GT Road,{" "}
                  <span className="font-serif italic font-normal text-slate-800">
                    Between
                  </span>{" "}
                  <span className="font-serif font-semibold text-slate-900">
                    Islamabad &amp; Rawalpindi
                  </span>
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Saffron City sits on Main GT Road near T-Chowk, Rawat, putting it within a reasonable drive of both Islamabad and Rawalpindi without being in the middle of either city&apos;s traffic. For residents, that means access to major commercial areas like Giga Mall and DHA without giving up the quieter pace that comes with being slightly outside the urban core.
                </p>
              </div>
            }
            rightContent={
              <div className="space-y-4">
                <LocationMapCard />
                <div className="flex flex-wrap items-center justify-center lg:justify-start pt-1">
                  <a
                    href="https://maps.google.com/?q=Saffron+City+Rawat+Islamabad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shimmer-gold-btn inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-[#D49E17] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-md hover:scale-105 transition-all"
                  >
                    <Compass className="w-4 h-4" />
                    <span>Get Directions on Google Maps</span>
                  </a>
                </div>
              </div>
            }
          />
        </section>

        {/* =========================================================
            SECTION 4 — Nearby Landmarks
        ========================================================= */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
          <ScrollReveal animation="fade-up" className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-slate-900 tracking-normal">
              Nearby Landmarks &amp; Distances
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Direct arterial access to major commercial hubs, business districts, and transit corridors across Islamabad and Rawalpindi.
            </p>
          </ScrollReveal>

          {/* 4-Item Row with See More Drawer for Remaining Landmarks */}
          {(() => {
            const allLandmarks = [
              {
                title: "T-Chowk, Rawat",
                subtitle: "Main GT Road Junction",
                driveTime: "5 Mins Drive",
                image: "/images/landmark_t_chowk.webp",
                icon: <Compass className="w-4 h-4 text-[#D49E17]" />,
              },
              {
                title: "Giga Mall & DHA",
                subtitle: "Premier Shopping & Dining",
                driveTime: "12 Mins Drive",
                image: "/images/landmark_giga_mall.webp",
                icon: <ShoppingBag className="w-4 h-4 text-[#D49E17]" />,
              },
              {
                title: "DHA Islamabad",
                subtitle: "Executive Housing Society",
                driveTime: "10 Mins Drive",
                image: "/images/landmark_dha_islamabad.webp",
                icon: <Building2 className="w-4 h-4 text-[#D49E17]" />,
              },
              {
                title: "Zero Point & Blue Area",
                subtitle: "Capital Business District",
                driveTime: "20 Mins Drive",
                image: "/images/hero-bg.webp",
                icon: <TrendingUp className="w-4 h-4 text-[#D49E17]" />,
              },
              {
                title: "Bahria Town",
                subtitle: "Gated Residential Community",
                driveTime: "10 Mins Drive",
                image: "/images/imgi_25_saffron-city-islamabad.webp",
                icon: <Landmark className="w-4 h-4 text-[#D49E17]" />,
              },
              {
                title: "Islamabad Airport",
                subtitle: "International Air Terminal",
                driveTime: "30 Mins Drive",
                image: "/images/landmark_t_chowk.webp",
                icon: <Plane className="w-4 h-4 text-[#D49E17]" />,
              },
              {
                title: "Rawalpindi Ring Road",
                subtitle: "Direct Bypass Interchange",
                driveTime: "2 Mins Drive",
                image: "/images/imgi_25_saffron-city-islamabad.webp",
                icon: <Navigation className="w-4 h-4 text-[#D49E17]" />,
              },
              {
                title: "Islamabad Expressway",
                subtitle: "Signal-Free Arterial Route",
                driveTime: "15 Mins Drive",
                image: "/images/hero-bg.webp",
                icon: <ShieldCheck className="w-4 h-4 text-[#D49E17]" />,
              },
            ];

            const renderCard = (item: typeof allLandmarks[0], idx: number) => (
              <div
                key={idx}
                className="group rounded-3xl overflow-hidden bg-white text-slate-900 border border-amber-200/80 hover:border-[#D49E17] shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
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
                  <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-[#D49E17] text-white text-[11px] font-bold tracking-wide shadow-md">
                    {item.driveTime}
                  </div>
                </div>

                {/* Bottom Content Area */}
                <div className="p-4 sm:p-5 flex items-center gap-3.5 flex-1 bg-white border-t border-slate-100">
                  <div className="w-10 h-10 rounded-xl border border-amber-200 bg-amber-50 flex items-center justify-center shrink-0 shadow-sm group-hover:border-[#D49E17] group-hover:bg-amber-100 transition-all">
                    {item.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-[15px] tracking-tight font-heading leading-snug group-hover:text-[#D49E17] transition-colors truncate">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 truncate mt-0.5 font-medium">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            );

            return (
              <SeeMoreDrawer
                moreButtonText="See More Landmarks"
                lessButtonText="Show Fewer Landmarks"
                previewContent={
                  <StaggerReveal
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    staggerDelay={70}
                    direction="up"
                  >
                    {allLandmarks.slice(0, 4).map((item, idx) => renderCard(item, idx))}
                  </StaggerReveal>
                }
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {allLandmarks.slice(4).map((item, idx) => renderCard(item, idx + 4))}
                </div>
              </SeeMoreDrawer>
            );
          })()}
        </section>

        {/* =========================================================
            SECTION 5 — Master Plan Showcase
        ========================================================= */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <GsapSplitReveal
            leftContent={
              <div className="space-y-6">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-slate-900 tracking-normal leading-tight">
                  A Planned Layout, <span className="font-serif italic font-normal text-slate-800">Not Just</span> Open Land
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  The master plan divides Saffron City into residential blocks alongside dedicated space for a commercial area, mosque, schools, and parks — the kind of layout that determines how a society actually functions once people move in, not just how it looks on a brochure.
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Spanning across 15,000 Kanal with clear RDA legal approval, the community incorporates underground electrification, water reservoirs, dedicated family recreation belts, and high-speed multi-lane access from Main GT Road Rawat.
                </p>
              </div>
            }
            rightContent={
              <div className="space-y-4">
                <MasterPlanViewer initialImage={settings.masterPlanImage} />
                {/* Action Buttons placed below Master Map */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                  <Link
                    href="/master-plan"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-[#D49E17] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-md hover:scale-105 transition-all"
                  >
                    <span>View Detailed Master Plan</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <DownloadButtonWithLeadModal
                    downloadUrl={settings.masterPlanPdf || SITE_CONFIG.masterPlanPdf}
                    downloadFileName="Saffron-City-Master-Plan-Model.pdf"
                    documentTitle="Saffron City Master Plan Model"
                    documentType="Master Plan"
                    buttonText="Download Plan PDF"
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors border border-slate-200 cursor-pointer"
                  />
                </div>
              </div>
            }
          />
        </section>

        {/* =========================================================
            SECTION 6 — Sectors & Community Breakdown
        ========================================================= */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
          <ScrollReveal animation="fade-up" className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-slate-900 tracking-normal">
              Saffron City Sectors &amp; Development Zones
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Thoughtfully partitioned into specialized residential, commercial, and civic sectors to ensure tranquil living and high-growth commercial activity.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={100}>
            <SectorsAccordion
              sectorA={{
                name: settings.sectorATitle,
                tagline: settings.sectorATagline,
                image: settings.sectorAImage || "/images/sectors/sector-a-luxury.webp",
                plots: settings.sectorAPlots,
              }}
              sectorB={{
                name: settings.sectorBTitle,
                tagline: settings.sectorBTagline,
                image: settings.sectorBImage || "/images/sectors/sector-b-residential.webp",
                plots: settings.sectorBPlots,
              }}
              commercial={{
                name: "Signature & GT Road Commercial",
                tagline: "Direct N-5 National Highway frontage with multi-storey permissions, customer parking, and exceptional footfall yields.",
                image: "/images/sectors/commercial-plaza.webp",
                plots: "30×40, 4M & 8M Plazas",
                badge: "Commercial • High ROI",
                href: "/plots/commercial",
              }}
            />
          </ScrollReveal>
        </section>

        {/* =========================================================
            SECTION 7 — World-Class Amenities
        ========================================================= */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
          <ScrollReveal animation="fade-up" className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-slate-900 tracking-normal">
              What&apos;s Actually Included in the Community
            </h2>
            <p className="text-sm text-slate-600">
              Infrastructure designed to precede resident arrival, ensuring every essential utility and community amenity is functional.
            </p>
          </ScrollReveal>

          {/* 4-Item Row with See More Drawer for Remaining Amenities */}
          {(() => {
            const renderAmenityCard = (item: typeof AMENITIES[0], idx: number) => (
              <div
                key={idx}
                className="group rounded-3xl overflow-hidden bg-white text-slate-900 border border-amber-200/80 hover:border-[#D49E17] shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
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
                <div className="p-4 sm:p-5 flex-1 flex items-center justify-center text-center bg-white border-t border-slate-100">
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#D49E17] transition-colors font-heading">
                    {item.title}
                  </h4>
                </div>
              </div>
            );

            return (
              <SeeMoreDrawer
                moreButtonText="See More Amenities"
                lessButtonText="Show Fewer Amenities"
                previewContent={
                  <StaggerReveal
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    staggerDelay={80}
                    direction="up"
                  >
                    {AMENITIES.slice(0, 4).map((item, idx) => renderAmenityCard(item, idx))}
                  </StaggerReveal>
                }
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {AMENITIES.slice(4).map((item, idx) => renderAmenityCard(item, idx + 4))}
                </div>
              </SeeMoreDrawer>
            );
          })()}
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-slate-900 tracking-normal">
              Sector A (Block B) &amp; Signature Commercial Rates
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Saffron City uses a 10% booking payment, 10% allocation payment, 30 monthly installments, 6 bi-annual installments, and 20% on possession over 3 years.
            </p>
          </ScrollReveal>

          {/* Official Flyers Showcase Grid with Click-to-Reveal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {/* Residential Plan Flyer Card */}
            <ScrollReveal animation="fade-right" duration={850}>
              <PaymentPlanCard
                badgeText="Residential (Sector A - Block B)"
                badgeHighlight="RDA Approved"
                title="Official Residential Payment Plan"
                description="5 Marla (PKR 45 Lac), 10 Marla (PKR 82.5 Lac), 1 Kanal (PKR 1.55 Crore) with easy 3-year installments."
                imageSrc={settings.residentialPaymentPlanImage || SITE_CONFIG.residentialPaymentPlanImg}
                imageAlt="Saffron City Residential Payment Plan Sector A Block B"
                downloadFilename="Saffron-City-Residential-Payment-Plan.jpg"
                downloadButtonText="Download Flyer"
                extraAction={{
                  type: "link",
                  href: "/payment-plan",
                  label: "Full Table",
                }}
              />
            </ScrollReveal>

            {/* Commercial Plan Flyer Card */}
            <ScrollReveal animation="fade-left" delay={150} duration={850}>
              <PaymentPlanCard
                badgeText="Signature Commercial (30×40)"
                badgeHighlight="Save 45 Lac"
                title="Signature Commercial 3-Year Plan"
                description="5.33 Marla (30×40) — Total PKR 2 Crore, Discount PKR 45 Lac, Net PKR 1.55 Crore (Down Payment 35 Lac, Monthly 250,000)."
                imageSrc={settings.commercialPaymentPlanImage || SITE_CONFIG.commercialPaymentPlanImg}
                imageAlt="Saffron City Signature Commercial Payment Plan"
                downloadFilename="Saffron-City-Commercial-Payment-Plan.jpg"
                downloadButtonText="Download Flyer"
                extraAction={{
                  type: "whatsapp",
                  href: `https://wa.me/${settings.whatsappPhone || SITE_CONFIG.whatsapp}?text=${encodeURIComponent("Hi, I want to book a Signature Commercial 30x40 plot in Saffron City.")}`,
                  label: "WhatsApp",
                }}
              />
            </ScrollReveal>
          </div>

          {/* Responsive Pricing Table / Cards */}
          <ScrollReveal animation="fade-up" delay={100}>
            {/* 1. Mobile Cards View (Hidden on md and up) */}
            <div className="block md:hidden space-y-3">
              {RESIDENTIAL_PRICES.map((plot) => (
                <div
                  key={`mob-rate-${plot.size}`}
                  className="rounded-2xl border border-amber-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-amber-100">
                    <div>
                      <span className="text-base font-bold text-slate-900 font-heading block">
                        {plot.size}
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-600">
                        Sector A (Block B)
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        TOTAL PRICE
                      </span>
                      <span className="text-base font-bold text-[#D49E17] font-heading">
                        {plot.totalPriceFormatted}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-3 text-xs">
                    <div className="p-2 rounded-xl bg-amber-50/60 border border-amber-100">
                      <span className="text-[10px] text-amber-900/80 font-medium block">Booking (10%)</span>
                      <span className="font-bold text-slate-800 text-[11px]">{plot.bookingAmountFormatted}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] text-slate-500 font-medium block">Allocation (10%)</span>
                      <span className="font-bold text-slate-800 text-[11px]">{plot.allocationAmountFormatted}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] text-slate-500 font-medium block">30 Monthly Inst.</span>
                      <span className="font-bold text-slate-800 font-mono text-[11px]">{plot.monthlyInstallmentFormatted}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] text-slate-500 font-medium block">6 Bi-Annual Inst.</span>
                      <span className="font-bold text-slate-800 font-mono text-[11px]">{plot.biAnnualInstallmentFormatted}</span>
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-500 font-medium">Possession (20%):</span>
                    <span className="font-bold text-slate-900">{plot.possessionAmountFormatted}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* 2. Desktop Full Table View (Hidden on mobile) */}
            <div className="hidden md:block overflow-x-auto rounded-3xl border border-amber-200 bg-white shadow-xl">
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
                      <td className="py-4 px-5 font-bold text-[#D49E17]">{plot.totalPriceFormatted}</td>
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-slate-900 tracking-normal">
              How Booking Actually Works
            </h2>
            <p className="text-sm text-slate-600">
              Booking a plot follows a fixed sequence, and knowing the steps in advance makes the process faster on both sides.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={100}>
            <BookingStepsSection whatsappUrl={whatsappUrl} />
          </ScrollReveal>
        </section>

        {/* =========================================================
            SECTION 11 — Reviews
        ========================================================= */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 sm:space-y-10">
          <ScrollReveal animation="fade-up" className="text-center max-w-3xl mx-auto space-y-2">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-slate-900 tracking-normal">
              What Buyers Are Saying
            </h2>
          </ScrollReveal>

          <StaggerReveal
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch"
            staggerDelay={90}
            direction="up"
          >
            {REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="p-6 sm:p-8 rounded-3xl bg-white border border-amber-200/80 hover:border-[#D49E17] transition-all duration-300 relative shadow-md hover:shadow-xl hover:-translate-y-1 group flex flex-col justify-between h-full"
              >
                <div className="space-y-4">
                  {/* Header: Rating Stars & Quote Icon */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[#D49E17]">
                      {[...Array(rev.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#D49E17] text-[#D49E17]" />
                      ))}
                    </div>
                    <Quote className="w-7 h-7 text-amber-200/80 group-hover:text-[#D49E17] transition-colors" />
                  </div>

                  {/* Review Text with consistent height */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic min-h-[64px] sm:min-h-[72px]">
                    &ldquo;{rev.quote}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-[#D49E17] font-bold text-sm shrink-0">
                    {rev.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm block font-heading group-hover:text-[#D49E17] transition-colors">
                      {rev.author}
                    </h4>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                      <span className="text-[#D49E17] font-semibold">{rev.location}</span>
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
            SECTION 12 — Blogs, News & Market Insights
        ========================================================= */}
        <HomeBlogsSection initialBlogs={blogs} />

        {/* =========================================================
            SECTION 13 — FAQ
        ========================================================= */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
          <ScrollReveal animation="fade-up" className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-slate-900 tracking-normal">
              Frequently Asked Questions
            </h2>
          </ScrollReveal>

          {/* Interactive Collapsible FAQ Accordion */}
          <ScrollReveal animation="fade-up" delay={100}>
            <FaqAccordion />
          </ScrollReveal>
        </section>

        {/* =========================================================
            SECTION 14 — Official RDA NOC Legal Verification
        ========================================================= */}
        <NocApprovalSection settings={settings} />

        {/* =========================================================
            SECTION 15 — Centered Booking Form
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
