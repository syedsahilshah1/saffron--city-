import React from "react";
import Link from "next/link";
import { 
  Layers, 
  Building2, 
  Trees, 
  ShieldCheck, 
  Download, 
  ArrowRight, 
  Droplets, 
  Zap, 
  CheckCircle2,
  Sparkles,
  MapPin,
  HelpCircle,
  Phone,
  MessageCircle
} from "lucide-react";
import StaggerReveal from "@/components/animations/StaggerReveal";
import ScrollReveal from "@/components/animations/ScrollReveal";
import WordReveal from "@/components/animations/WordReveal";
import MasterPlanViewer from "@/components/master-plan/MasterPlanViewer";
import MasterPlanDownloadButton from "@/components/master-plan/MasterPlanDownloadButton";
import FaqAccordion from "@/components/ui/FaqAccordion";
import { SITE_CONFIG } from "@/data/saffron-data";
import { db } from "@/lib/db";
import { getPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return await getPageMetadata("/master-plan");
}

const DEFAULT_STATS = {
  stat1: "15,000 Kanal",
  stat1Label: "Total Master Plan Expanse",
  stat2: "250 Feet",
  stat2Label: "Main Central Boulevard",
  stat3: "45%",
  stat3Label: "Green Open Spaces & Parks",
  stat4: "100%",
  stat4Label: "Underground Infrastructure"
};

const DEFAULT_SECTORS = [
  {
    id: "sector-a",
    name: "Sector A Residential",
    type: "Premium Flagship",
    tagline: "Underground Utilities & Wide Boulevards",
    image: "/images/sectors/sector-a-luxury.webp",
    features: [
      "Underground electricity, gas & optical fiber",
      "Extra-wide carpeted boulevards",
      "Immediate proximity to Grand Mosque & Schools"
    ],
    priceStarting: "PKR 45 Lakh",
    status: "Active Development",
    href: "/sectors/sector-a"
  },
  {
    id: "sector-b",
    name: "Sector B Residential",
    type: "Affordable Community",
    tagline: "Structured 3-Year Installments (10% Down)",
    image: "/images/sectors/sector-b-residential.webp",
    features: [
      "10% down payment easy booking",
      "100% RDA NOC legal protection",
      "Dedicated community mosque & family parks"
    ],
    priceStarting: "PKR 45 Lakh",
    status: "Active Development",
    href: "/sectors/sector-b"
  },
  {
    id: "commercial-block",
    name: "Signature Commercial Block",
    type: "Highway Frontage",
    tagline: "Direct GT Road (N-5 Highway) Exposure",
    image: "/images/sectors/commercial-plaza.webp",
    features: [
      "Direct frontage on premier N-5 corridor",
      "Multi-storey commercial plaza permissions",
      "Dedicated customer parking & high footfall"
    ],
    priceStarting: "PKR 1.55 Crore",
    status: "Open for Booking",
    href: "/plots/commercial"
  },
  {
    id: "green-zone",
    name: "Green & Community Belts",
    type: "Civic & Parks",
    tagline: "45% Allocated to Parks & Green Spaces",
    image: "/images/sectors/green-community-park.webp",
    features: [
      "Grand Community Mosque landmark",
      "Lakes, sports grounds & jogging tracks",
      "Community club & recreational hubs"
    ],
    priceStarting: "Master Amenity",
    status: "Integrated Layout",
    href: "/payment-plan"
  }
];

const DEFAULT_FACILITIES = [
  {
    id: "fac-1",
    title: "Roads & Underground Utilities",
    desc: "Carpeted wide boulevards with complete underground electrical, optical fiber, and drainage networks.",
    image: "/images/facilities/underground-utilities.webp",
    tag: "Underground Wiring"
  },
  {
    id: "fac-2",
    title: "Water Filtration & Power Grid",
    desc: "Dedicated RO water filtration plant for 24/7 pure water and uninterrupted power grid station.",
    image: "/images/facilities/water-filtration.webp",
    tag: "RO Plant"
  },
  {
    id: "fac-3",
    title: "Green Parks & Sports Complexes",
    desc: "Over 45% land allocated to themed family parks, sports grounds, community gardens, and lakes.",
    image: "/images/facilities/green-parks.webp",
    tag: "45% Green Spaces"
  },
  {
    id: "fac-4",
    title: "Gated Smart 24/7 Security",
    desc: "Round-the-clock CCTV surveillance, biometric entrance barriers, and active security patrols.",
    image: "/images/facilities/gated-security.webp",
    tag: "Smart Security"
  }
];

const DEFAULT_FAQS = [
  {
    question: "How many sectors does Saffron City master plan comprise?",
    answer: "Saffron City spans 15,000 Kanal featuring Sector A (Premium flagship with underground utilities), Sector B (Affordable residential with 3-year installments), and a dedicated Signature Commercial block directly along Main GT Road.",
    category: "Master Plan"
  },
  {
    question: "What plot sizes are available in Sector A and Sector B?",
    answer: "Residential plots are available in 5 Marla (25×45), 10 Marla (35×65), and 1 Kanal (50×90) sizes. Commercial plots come in Signature 30×40 (5.33 Marla), 4 Marla, and 8 Marla on GT Road frontage.",
    category: "Plots"
  },
  {
    question: "Is the Saffron City Master Plan officially approved by RDA?",
    answer: "Yes. Saffron City holds an authentic No Objection Certificate (NOC) granted by the Rawalpindi Development Authority (RDA) covering the full 15,000 Kanal master expanse on GT Road, Rawat.",
    category: "Legal & NOC"
  },
  {
    question: "What is the width of the main entrance road & boulevard?",
    answer: "The grand main central boulevard is 250 feet wide, linking directly to Main GT Road (N-5 Highway) and providing smooth multi-lane access to all residential and commercial sectors without traffic bottlenecks.",
    category: "Infrastructure"
  },
  {
    question: "How can I download the high-resolution Master Plan layout?",
    answer: "You can download the high-resolution master plan layout anytime directly using the Download button in the interactive viewer above, or request the complete official brochure via WhatsApp.",
    category: "Download"
  }
];

export default async function MasterPlanPage() {
  const settings = await db.getSettings();

  // Parse dynamic stats
  let dynamicStats = DEFAULT_STATS;
  if (settings.masterPlanStatsJson) {
    try {
      const parsed = JSON.parse(settings.masterPlanStatsJson);
      dynamicStats = { ...DEFAULT_STATS, ...parsed };
    } catch {}
  }

  // Parse dynamic sectors
  let dynamicSectors = DEFAULT_SECTORS;
  if (settings.masterPlanSectorsJson) {
    try {
      const parsed = JSON.parse(settings.masterPlanSectorsJson);
      if (Array.isArray(parsed) && parsed.length > 0) {
        dynamicSectors = parsed;
      }
    } catch {}
  }

  // Parse dynamic facilities
  let dynamicFacilities = DEFAULT_FACILITIES;
  if (settings.masterPlanFacilitiesJson) {
    try {
      const parsed = JSON.parse(settings.masterPlanFacilitiesJson);
      if (Array.isArray(parsed) && parsed.length > 0) {
        dynamicFacilities = parsed;
      }
    } catch {}
  }

  // Parse dynamic FAQs
  let dynamicFaqs = DEFAULT_FAQS;
  if (settings.masterPlanFaqsJson) {
    try {
      const parsed = JSON.parse(settings.masterPlanFaqsJson);
      if (Array.isArray(parsed) && parsed.length > 0) {
        dynamicFaqs = parsed;
      }
    } catch {}
  }

  const heroHeading = settings.masterPlanHeroHeading || "Saffron City Master Plan: Sectors & Layout";
  const heroSubtitle = settings.masterPlanHeroSubtitle || "Explore the master layout model of Saffron City on Main GT Road, Rawat. Features dedicated residential sectors, 250-foot grand boulevard, commercial hub, and 45% open green spaces.";
  const masterPlanPdf = settings.masterPlanPdf || SITE_CONFIG.masterPlanPdf;
  const masterPlanImg = settings.masterPlanImage || SITE_CONFIG.masterPlanImage || "/images/saffron-city-master-plan.webp";

  const ctaPhone = settings.masterPlanCtaPhone || settings.whatsappPhone || SITE_CONFIG.whatsapp;
  const whatsappUrl = `https://wa.me/${ctaPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    "Hi, I want more information about the Saffron City Master Plan layout."
  )}`;

  return (
    <div className="space-y-20 lg:space-y-28 pt-24 lg:pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-slate-900 bg-white">
      
      {/* Hero Section: Side-by-Side Split Layout */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left Side: Information & Highlights */}
        <div className="lg:col-span-6 space-y-6">
          <WordReveal
            text={heroHeading}
            highlightWords={["Master", "Plan", "Layout", "Sectors"]}
            as="h1"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight leading-tight block"
          />

          <ScrollReveal animation="fade-up" delay={100}>
            {settings.masterPlanOverviewText ? (
              <div
                className="prose prose-sm sm:prose max-w-none text-slate-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: settings.masterPlanOverviewText }}
              />
            ) : (
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {heroSubtitle}
              </p>
            )}
          </ScrollReveal>

          {/* 4 Quick Stat Counters */}
          <ScrollReveal animation="fade-up" delay={150}>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200">
                <span className="block text-lg font-bold font-mono text-[#D49E17]">{dynamicStats.stat1}</span>
                <span className="text-xs text-slate-600">{dynamicStats.stat1Label}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200">
                <span className="block text-lg font-bold font-mono text-slate-900">{dynamicStats.stat2}</span>
                <span className="text-xs text-slate-600">{dynamicStats.stat2Label}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200">
                <span className="block text-lg font-bold font-mono text-emerald-700">{dynamicStats.stat3}</span>
                <span className="text-xs text-slate-600">{dynamicStats.stat3Label}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200">
                <span className="block text-lg font-bold font-mono text-[#D49E17]">{dynamicStats.stat4}</span>
                <span className="text-xs text-slate-600">{dynamicStats.stat4Label}</span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Side: Master Plan Viewer with Action Buttons below it */}
        <div className="lg:col-span-6 space-y-4">
          <ScrollReveal animation="fade-left" duration={850}>
            <MasterPlanViewer initialImage={masterPlanImg} />
          </ScrollReveal>

          {/* Action Buttons placed below Master Map */}
          <ScrollReveal animation="fade-up" delay={200} className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
            <MasterPlanDownloadButton 
              downloadUrl={masterPlanPdf} 
              buttonText="Download Master Plan" 
              documentTitle="Saffron City Master Plan Layout"
            />
            <Link
              href="/payment-plan"
              className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-xs font-bold transition-colors"
            >
              View Payment Plans
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Advisory Desk</span>
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Sectors Visual Cards */}
      <section className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <WordReveal
            text={settings.masterPlanSectorsHeading || "Saffron City Sector Layout"}
            highlightWords={["Sector", "Layout"]}
            as="h2"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight block"
          />

          <ScrollReveal animation="fade-up" delay={100}>
            <p className="text-sm text-slate-600">
              Designed with dedicated residential enclaves, highway commercial frontage, and community green belts.
            </p>
          </ScrollReveal>
        </div>

        <StaggerReveal
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          staggerDelay={100}
          direction="up"
        >
          {dynamicSectors.map((sector: any) => (
            <div
              key={sector.id || sector.name}
              className="rounded-3xl bg-white border border-amber-200 hover:border-[#D49E17] shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group flex flex-col justify-between"
            >
              <div>
                {/* Sector Card Header Image */}
                <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-100">
                  <img
                    src={sector.image || "/images/sectors/sector-a-luxury.webp"}
                    alt={sector.name}
                    title={sector.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700 text-amber-400 text-xs font-bold uppercase tracking-wider">
                      {sector.type || "Residential"}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/90 backdrop-blur-md text-white text-xs font-semibold">
                      {sector.status || "Open"}
                    </span>
                  </div>

                  {/* Title on Image */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-2xl font-bold font-heading">{sector.name}</h3>
                    <p className="text-xs text-amber-300 font-medium mt-0.5">{sector.tagline}</p>
                  </div>
                </div>

                {/* Card Body with Key Points */}
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    {Array.isArray(sector.features) && sector.features.map((f: string, i: number) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#D49E17] shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
                <div>
                  <span className="text-[11px] text-slate-500 block uppercase tracking-wider">Starting Price</span>
                  <span className="text-base font-bold text-slate-900">{sector.priceStarting}</span>
                </div>
                <Link
                  href={sector.href || "/payment-plan"}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 group-hover:bg-[#D49E17] group-hover:text-slate-950 text-white text-xs font-bold transition-all shadow cursor-pointer"
                >
                  <span>Explore Sector</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </StaggerReveal>
      </section>

      {/* Infrastructure & Civic Facilities (With Images) */}
      <section className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <WordReveal
            text={settings.masterPlanFacilitiesHeading || "Infrastructure & Civic Facilities"}
            highlightWords={["Infrastructure", "Facilities"]}
            as="h2"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight block"
          />

          <ScrollReveal animation="fade-up" delay={100}>
            <p className="text-sm text-slate-600">
              High-standard civil engineering providing uninterrupted utilities, pure water, and smart security.
            </p>
          </ScrollReveal>
        </div>

        <StaggerReveal
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          staggerDelay={80}
          direction="up"
        >
          {dynamicFacilities.map((facility: any, idx: number) => (
            <div
              key={facility.id || idx}
              className="rounded-3xl bg-white border border-amber-200 hover:border-[#D49E17] shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                  <img
                    src={facility.image || "/images/facilities/underground-utilities.webp"}
                    alt={facility.title}
                    title={facility.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <div className="p-2 rounded-xl bg-white/95 text-[#D49E17] shadow">
                      <Zap className="w-4 h-4 text-[#D49E17]" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="px-2.5 py-1 rounded-full bg-[#D49E17] text-slate-950 text-[11px] font-bold shadow">
                      {facility.tag || "World-Class"}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm group-hover:text-[#D49E17] transition-colors">
                    {facility.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {facility.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </StaggerReveal>
      </section>

      {/* Master Plan FAQs (Interactive Accordion) */}
      <section className="space-y-8 max-w-4xl mx-auto">
        <div className="text-center space-y-3">
          <WordReveal
            text={settings.masterPlanFaqsHeading || "Frequently Asked Questions"}
            highlightWords={["Frequently", "Questions"]}
            as="h2"
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight block"
          />

          <ScrollReveal animation="fade-up" delay={100}>
            <p className="text-sm text-slate-600">
              Clear answers regarding plot allocations, sector specifications, legal approvals, and downloads.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal animation="fade-up" delay={150}>
          <FaqAccordion items={dynamicFaqs} defaultOpenIndex={0} />
        </ScrollReveal>
      </section>
    </div>
  );
}
