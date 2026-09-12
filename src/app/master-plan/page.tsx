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
  HelpCircle
} from "lucide-react";
import StaggerReveal from "@/components/animations/StaggerReveal";
import ScrollReveal from "@/components/animations/ScrollReveal";
import WordReveal from "@/components/animations/WordReveal";
import MasterPlanViewer from "@/components/master-plan/MasterPlanViewer";
import MasterPlanDownloadButton from "@/components/master-plan/MasterPlanDownloadButton";
import FaqAccordion from "@/components/ui/FaqAccordion";
import { SITE_CONFIG } from "@/data/saffron-data";

import { getPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return await getPageMetadata("/master-plan");
}

const SECTOR_CARDS = [
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

const CIVIC_FACILITIES = [
  {
    title: "Roads & Underground Utilities",
    desc: "Carpeted wide boulevards with complete underground electrical, optical fiber, and drainage networks.",
    image: "/images/facilities/underground-utilities.webp",
    icon: Zap,
    tag: "Underground Wiring"
  },
  {
    title: "Water Filtration & Power Grid",
    desc: "Dedicated RO water filtration plant for 24/7 pure water and uninterrupted power grid station.",
    image: "/images/facilities/water-filtration.webp",
    icon: Droplets,
    tag: "RO Plant"
  },
  {
    title: "Green Parks & Sports Complexes",
    desc: "Over 45% land allocated to themed family parks, sports grounds, community gardens, and lakes.",
    image: "/images/facilities/green-parks.webp",
    icon: Trees,
    tag: "45% Green Spaces"
  },
  {
    title: "Gated Smart 24/7 Security",
    desc: "Round-the-clock CCTV surveillance, biometric entrance barriers, and active security patrols.",
    image: "/images/facilities/gated-security.webp",
    icon: ShieldCheck,
    tag: "Smart Security"
  }
];

const MASTER_PLAN_FAQS = [
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

export default function MasterPlanPage() {
  return (
    <div className="space-y-20 lg:space-y-28 pt-24 lg:pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-slate-900 bg-white">
      
      {/* Hero Section: Side-by-Side Split Layout */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left Side: Information & Highlights */}
        <div className="lg:col-span-6 space-y-6">
          <WordReveal
            text="Saffron City Master Plan: Sectors & Layout"
            highlightWords={["Master", "Plan", "Layout"]}
            as="h1"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight leading-tight block"
          />

          <ScrollReveal animation="fade-up" delay={100}>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Explore the master layout model of Saffron City on Main GT Road, Rawat. Features dedicated residential sectors, 250-foot grand boulevard, commercial hub, and 45% open green spaces.
            </p>
          </ScrollReveal>
        </div>

        {/* Right Side: Master Plan Viewer with Action Buttons below it */}
        <div className="lg:col-span-6 space-y-4">
          <ScrollReveal animation="fade-left" duration={850}>
            <MasterPlanViewer />
          </ScrollReveal>

          {/* Action Buttons placed below Master Map */}
          <ScrollReveal animation="fade-up" delay={200} className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
            <MasterPlanDownloadButton 
              downloadUrl={SITE_CONFIG.masterPlanPdf} 
              buttonText="Download Master Plan" 
              documentTitle="Saffron City Master Plan Layout"
            />
            <Link
              href="/payment-plan"
              className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-xs font-bold transition-colors"
            >
              View Payment Plans
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* 4 Sectors Visual Cards */}
      <section className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <WordReveal
            text="Saffron City Sector Layout"
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
          {SECTOR_CARDS.map((sector) => (
            <div
              key={sector.id}
              className="rounded-3xl bg-white border border-amber-200 hover:border-[#D49E17] shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group flex flex-col justify-between"
            >
              <div>
                {/* Sector Card Header Image */}
                <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-100">
                  <img
                    src={sector.image}
                    alt={sector.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700 text-amber-400 text-xs font-bold uppercase tracking-wider">
                      {sector.type}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/90 backdrop-blur-md text-white text-xs font-semibold">
                      {sector.status}
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
                    {sector.features.map((f, i) => (
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
                  href={sector.href}
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

      {/* Sector A vs Sector B Comparison */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <WordReveal
            text="Sector A vs Sector B: Which Fits You?"
            highlightWords={["Sector", "A", "B"]}
            as="h3"
            className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading block"
          />
          <p className="text-xs sm:text-sm text-slate-600">
            Compare premium features against budget-friendly installment flexibilities.
          </p>
        </div>

        <ScrollReveal animation="fade-up" duration={850}>
          <div className="p-8 sm:p-12 rounded-3xl bg-amber-50/60 border border-amber-200 shadow-xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700">
              <div className="p-6 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-[#D49E17]">Sector A (Premium Residential)</h4>
                  <span className="text-[11px] font-bold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                    Flagship
                  </span>
                </div>
                <ul className="space-y-2.5 pt-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D49E17] shrink-0" />
                    <span>Underground electrical lines, fiber optics &amp; utilities</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D49E17] shrink-0" />
                    <span>Extra-wide carpeted boulevards &amp; direct boulevard access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D49E17] shrink-0" />
                    <span>Nearest access to Grand Mosque and Central Commercial Hub</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-emerald-700">Sector B (Affordable Residential)</h4>
                  <span className="text-[11px] font-bold text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    High Value
                  </span>
                </div>
                <ul className="space-y-2.5 pt-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>10% booking amount with flexible 3-year installment schedule</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Same 15,000 Kanal RDA NOC verified legal protection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Dedicated community mosque &amp; local family parks</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Infrastructure & Civic Facilities (With Images) */}
      <section className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <WordReveal
            text="Infrastructure & Civic Facilities"
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
          {CIVIC_FACILITIES.map((facility) => {
            const IconComponent = facility.icon;
            return (
              <div
                key={facility.title}
                className="rounded-3xl bg-white border border-amber-200 hover:border-[#D49E17] shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                    <img
                      src={facility.image}
                      alt={facility.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <div className="p-2 rounded-xl bg-white/95 text-[#D49E17] shadow">
                        <IconComponent className="w-4 h-4 text-[#D49E17]" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="px-2.5 py-1 rounded-full bg-[#D49E17] text-slate-950 text-[11px] font-bold shadow">
                        {facility.tag}
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
            );
          })}
        </StaggerReveal>
      </section>

      {/* Redesigned Master Plan FAQs (Interactive Accordion) */}
      <section className="space-y-8 max-w-4xl mx-auto">
        <div className="text-center space-y-3">
          <WordReveal
            text="Frequently Asked Questions"
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
          <FaqAccordion items={MASTER_PLAN_FAQS} defaultOpenIndex={0} />
        </ScrollReveal>
      </section>
    </div>
  );
}
