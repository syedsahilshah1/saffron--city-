import React from "react";
import Link from "next/link";
import {
  Award,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Building2,
  Trees,
  MapPin,
  Clock,
  Sparkles,
  HelpCircle,
  Download,
  Layers,
  Check,
  Compass,
  PhoneCall,
  Calendar,
  ExternalLink,
  Navigation,
  CheckCircle,
  Car,
  Droplets,
  Camera
} from "lucide-react";
import StaggerReveal from "@/components/animations/StaggerReveal";
import ScrollReveal from "@/components/animations/ScrollReveal";
import WordReveal from "@/components/animations/WordReveal";
import EnquiryForm from "@/components/forms/EnquiryForm";
import FaqAccordion from "@/components/ui/FaqAccordion";
import SectorAPlotsGrid from "@/components/sectors/SectorAPlotsGrid";
import { RESIDENTIAL_PRICES, SITE_CONFIG } from "@/data/saffron-data";
import { getPageMetadata } from "@/lib/seo";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return await getPageMetadata("/sectors/sector-a");
}

const SECTOR_A_AMENITIES = [
  {
    title: "100% Underground Electrification",
    desc: "Clean open skies without hanging wires. Advanced subterranean electrical grid with backup provisions.",
    icon: Zap,
    image: "/images/facilities/underground-utilities.webp"
  },
  {
    title: "Direct GT Road (N-5) Access",
    desc: "Situated right at the main gated gateway of Saffron City with instant highway connectivity.",
    icon: Compass,
    image: "/images/amenities/amenity_boulevard.webp"
  },
  {
    title: "Grand Jamia Mosque Walking Distance",
    desc: "Convenient walking distance to the architecturally stunning central Grand Jamia Mosque.",
    icon: Building2,
    image: "/images/amenities/grand-mosque.webp"
  },
  {
    title: "24/7 Gated Security & CCTV",
    desc: "Multi-layered perimeter security, electronic RFID barrier gates, and continuous patrolling.",
    icon: ShieldCheck,
    image: "/images/facilities/gated-security.webp"
  },
  {
    title: "Dedicated Eco-Parks & Jogging Tracks",
    desc: "Lush green community parks, children play facilities, and paved running trails across Sector A.",
    icon: Trees,
    image: "/images/sectors/green-community-park.webp"
  },
  {
    title: "Clean Water Filtration Plant",
    desc: "Dedicated RO water filtration facilities supplying pure drinking water to all Sector A residents.",
    icon: Droplets,
    image: "/images/facilities/water-filtration.webp"
  }
];

const SECTOR_A_INVESTOR_REASONS = [
  {
    title: "100% Underground Electrification",
    description: "Zero overhead wires. All electricity, high-speed fiber optics, gas, and water supply are routed through subterranean conduits.",
    image: "/images/facilities/underground-utilities.webp",
    tag: "Clean Skyline"
  },
  {
    title: "Direct GT Road (N-5) Gate Access",
    description: "Located right at the front entrance of Saffron City on Main GT Road, giving Sector A residents the fastest 0-minute highway commute.",
    image: "/images/amenities/amenity_boulevard.webp",
    tag: "Prime Location"
  },
  {
    title: "40% Eco-Friendly Green Parks",
    description: "Surrounded by landscaped community parks, jogging tracks, kids' play areas, and lush green medians across all sectors.",
    image: "/images/sectors/green-community-park.webp",
    tag: "Green Living"
  },
  {
    title: "Approved 15,000 Kanal Master Plan",
    description: "Complete legal security with approved town planning, clear plot demarcations, and transparent allotment procedures.",
    image: "/images/facilities/gated-security.webp",
    tag: "Verified Title"
  }
];

const SECTOR_A_NEARBY_LANDMARKS = [
  {
    name: "Main GT Road (N-5 Highway)",
    time: "Direct Access",
    timeHighlight: "text-[#D49E17]",
    distance: "Direct Frontage Access",
    bgClass: "bg-amber-50/70 border-amber-300 shadow-amber-100/50",
    image: "/images/amenities/amenity_boulevard.webp",
    description: "Instant access to the multi-lane National Highway with no detours or secondary village roads."
  },
  {
    name: "T-Chowk Rawat Interchange",
    time: "5 Minutes",
    timeHighlight: "text-slate-900",
    distance: "3.5 km via Main GT Road",
    bgClass: "bg-white border-slate-200 hover:border-amber-300",
    image: "/images/landmark_t_chowk.webp",
    description: "Strategic commercial and transit junction linking Rawalpindi, Islamabad Expressway, and GT Road."
  },
  {
    name: "DHA Phase II & Giga Mall",
    time: "10 Minutes",
    timeHighlight: "text-slate-900",
    distance: "8.0 km Expressway Link",
    bgClass: "bg-white border-slate-200 hover:border-amber-300",
    image: "/images/landmark_giga_mall.webp",
    description: "Premier twin-city commercial shopping destination with hypermarkets, banks, and cinema complexes."
  },
  {
    name: "Rawalpindi Ring Road Interchange",
    time: "15 Minutes",
    timeHighlight: "text-emerald-700",
    distance: "11.0 km Direct Bypass",
    bgClass: "bg-white border-slate-200 hover:border-emerald-400",
    image: "/images/landmark_dha_islamabad.webp",
    description: "Direct expressway link connecting Saffron City to New Islamabad Airport and M-2 Motorway."
  }
];

const SECTOR_A_FAQS = [
  {
    question: "What makes Sector A (Block B) the flagship sector in Saffron City?",
    answer: "Sector A is designed as the highest-tier executive enclave of Saffron City Islamabad. It features 100% underground electrification, closest proximity to the main entrance and Main GT Road, immediate walking access to the Grand Jamia Mosque, and superior architectural controls.",
    category: "Features"
  },
  {
    question: "What plot categories and sizes are available in Sector A for sale?",
    answer: "Sector A offers premium residential plots in three standard sizes: 5 Marla (25' × 45'), 10 Marla (35' × 65'), and 1 Kanal (50' × 90'). All plots have direct access to wide internal carpeted streets.",
    category: "Plots"
  },
  {
    question: "What is the payment structure and installment plan for Sector A?",
    answer: "Plots can be booked with a 10% down payment, followed by 10% at confirmation/allocation. The remaining balance is spread conveniently over 30 monthly installments and 6 bi-annual installments across 3 years, with 20% due at possession.",
    category: "Payment"
  },
  {
    question: "Is Sector A covered by the official society No Objection Certificate (NOC)?",
    answer: "Yes. Saffron City holds an authentic 15,000 Kanal layout approval, and Sector A is fully covered under the approved town planning guidelines with complete legal title.",
    category: "Legal & NOC"
  },
  {
    question: "How do I visit Sector A on-site or view the location on Google Maps?",
    answer: "Sector A is directly accessible from Main GT Road near Rawat. You can use our embedded Google Map on this page or message our sales team on WhatsApp to arrange a guided on-site visit.",
    category: "Location & Visit"
  }
];

export default async function SectorAPage() {
  const allPlots = await db.getPlots();
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
    "Hi, I want to inquire about Sector A executive plots and schedule a site visit in Saffron City Islamabad."
  )}`;

  return (
    <div className="space-y-20 lg:space-y-28 pb-24 text-slate-900 bg-white">

      {/* 1. Hero Banner Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/sectors/sector-a-luxury.webp"
            alt="Saffron City Sector A Executive Enclave"
            title="Saffron City Sector A Executive Enclave"
            className="w-full h-full object-cover object-center scale-105 animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/50" />
          <div className="absolute inset-0 bg-[radial-gradient(#D49E17_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <WordReveal
            text="Sector A (Block B): Executive Plots For Sale"
            highlightWords={["Sector", "A", "Executive", "Plots", "Sale"]}
            as="h1"
            className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading tracking-tight text-white block"
          />

          <ScrollReveal animation="fade-up" delay={150} className="flex flex-wrap justify-center gap-4 pt-4">
            <a
              href="#plots-for-sale"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-[#D49E17] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs shadow-lg hover:scale-105 transition-all"
            >
              View Sector A Plots For Sale
            </a>
            <a
              href="#sector-location"
              className="px-6 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white font-bold text-xs shadow-lg hover:scale-105 transition-all flex items-center gap-2 backdrop-blur-md"
            >
              <MapPin className="w-4 h-4 text-[#D49E17]" />
              <span>Location &amp; Map</span>
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 lg:space-y-28">

        {/* 2. Overview Section (TEXT ON LEFT, IMAGE ON RIGHT) */}
        <section className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Text Content */}
            <ScrollReveal animation="fade-right" className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-slate-900 tracking-tight leading-tight">
                Sector A Overview: Premier Front-Gate Living
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light">
                Sector A is the premier front-gate residential enclave of Saffron City Islamabad. Master-planned with 100% underground electrification, wide carpeted roadways, and strict architectural standards, it offers executive living right off Main GT Road.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <a
                  href="#plots-for-sale"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-[#D49E17] text-white hover:text-slate-950 font-bold text-xs shadow transition-all"
                >
                  <span>Explore Available Plots</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </ScrollReveal>

            {/* Right: Image Card */}
            <ScrollReveal animation="fade-left" className="lg:col-span-5">
              <div className="relative w-full h-80 sm:h-[420px] rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-200 group">
                <img
                  src="/images/sectors/sector-a-overview.webp"
                  alt="Saffron City Sector A Executive Enclave"
                  title="Saffron City Sector A Executive Enclave"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1.5 rounded-full bg-[#D49E17] text-white text-xs font-bold uppercase tracking-wider shadow-md">
                    Sector A Overview
                  </span>
                </div>
                <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
                  <p className="text-xs font-semibold text-amber-300">Front-Gate Enclave • GT Road Gateway</p>
                  <h3 className="text-xl font-bold font-heading text-white">Executive Residential Living</h3>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* 3. Amenities Section */}
        <section className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <WordReveal
              text="Sector A Infrastructure & Amenities"
              highlightWords={["Sector", "A", "Amenities", "Infrastructure"]}
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight block"
            />
            <ScrollReveal animation="fade-up" delay={100}>
              <p className="text-sm text-slate-600 leading-relaxed">
                Engineered with international standards to provide seamless everyday convenience, recreation, and total security.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SECTOR_A_AMENITIES.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <ScrollReveal
                  key={item.title}
                  animation={idx % 3 === 0 ? "fade-right" : idx % 3 === 1 ? "fade-up" : "fade-left"}
                  delay={idx * 80}
                >
                  <div className="rounded-3xl bg-white border border-amber-200 hover:border-[#D49E17] shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col justify-between h-full">
                    <div>
                      <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                        <img
                          src={item.image}
                          alt={item.title}
                          title={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-3 w-10 h-10 rounded-xl bg-white/95 backdrop-blur-md flex items-center justify-center text-[#D49E17] shadow">
                          <IconComp className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="p-5 space-y-2">
                        <h4 className="font-bold text-slate-900 text-sm group-hover:text-[#D49E17] transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        {/* 4. Location & Nearby Landmarks Section */}
        <section id="sector-location" className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <WordReveal
              text="Sector A Location & Commute Landmarks"
              highlightWords={["Sector", "A", "Location", "Landmarks"]}
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight block"
            />
            <ScrollReveal animation="fade-up" delay={100}>
              <p className="text-sm text-slate-600">
                Situated right at the prime entrance on Main GT Road near Rawat, Islamabad.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Landmarks List Left */}
            <ScrollReveal animation="fade-right" className="lg:col-span-6 space-y-4">
              <div className="p-6 rounded-3xl bg-white border border-amber-200 shadow-xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-[#D49E17] text-xs font-bold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Main GT Road (N-5) Gateway</span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 font-heading">
                  Prime Highway Commute Times
                </h3>

                <div className="space-y-3">
                  {SECTOR_A_NEARBY_LANDMARKS.map((item, idx) => (
                    <div
                      key={item.name}
                      className={`p-3 rounded-2xl border flex items-center justify-between gap-3 ${item.bgClass}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-amber-300/80 shadow-sm">
                          <img
                            src={item.image}
                            alt={item.name}
                            title={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900">{item.name}</h4>
                          <p className="text-[11px] text-slate-500">{item.distance}</p>
                        </div>
                      </div>
                      <strong className={`text-xs sm:text-sm font-bold font-mono ${item.timeHighlight}`}>
                        {item.time}
                      </strong>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex flex-wrap gap-3">
                  <a
                    href="https://maps.google.com/?q=Saffron+City+Rawat+Islamabad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-[#D49E17] text-white hover:text-slate-950 font-bold text-xs shadow transition-all flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open in Google Maps</span>
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow transition-all flex items-center gap-2"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Schedule Site Visit</span>
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* Embedded Google Map Right */}
            <ScrollReveal animation="fade-left" className="lg:col-span-6 space-y-3">
              <div className="w-full h-[380px] sm:h-[450px] rounded-3xl overflow-hidden border-2 border-amber-300 shadow-2xl relative bg-slate-100">
                <iframe
                  title="Sector A Saffron City Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106450.60155606992!2d73.11181283995874!3d33.49397682977461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfebbe487dc843%3A0x6b63d76b1f237efb!2sRawat%2C%20Rawalpindi%2C%20Punjab!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 z-10 px-4 py-2 rounded-full bg-white/95 border border-amber-300 text-amber-900 text-xs font-bold shadow-lg flex items-center gap-2 backdrop-blur-md">
                  <MapPin className="w-4 h-4 text-[#D49E17]" />
                  <span>Sector A (Block B) • GT Road Gate</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* 5. Plots for Sale Section */}
        <section id="plots-for-sale" className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <WordReveal
              text="Sector A Plots for Sale"
              highlightWords={["Sector", "A", "Plots", "Sale"]}
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight block"
            />
            <ScrollReveal animation="fade-up" delay={100}>
              <p className="text-sm text-slate-600">
                Explore available residential plots in Sector A with visual specifications, breakdown, and instant booking options.
              </p>
            </ScrollReveal>
          </div>

          <SectorAPlotsGrid initialPlots={allPlots} />
        </section>

        {/* 6. Master Map / Demarcation Callout Section */}
        <section className="p-8 sm:p-12 rounded-3xl bg-amber-50/50 border border-amber-200 shadow-xl space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold text-[#D49E17] uppercase tracking-wider block">
                Official Layout &amp; Demarcation
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
                Inspect Sector A on the 4K Master Plan
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Explore the complete sector road network, park placements, mosque landmarks, and plot demarcations on our interactive high-resolution master plan viewer.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Link
                href="/master-plan"
                className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-[#D49E17] text-white hover:text-slate-950 font-bold text-xs text-center shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Layers className="w-4 h-4" />
                <span>Open Master Plan Viewer</span>
              </Link>
              <Link
                href="/payment-plan"
                className="px-6 py-3.5 rounded-xl bg-white border border-slate-300 hover:border-amber-300 text-slate-800 font-bold text-xs text-center transition-colors"
              >
                Payment Schedule
              </Link>
            </div>
          </div>
        </section>

        {/* 7. Features / Why Investors Choose Sector A */}
        <section className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <WordReveal
              text="Why Investors Choose Sector A"
              highlightWords={["Investors", "Choose", "Sector", "A"]}
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight block"
            />
            <ScrollReveal animation="fade-up" delay={100}>
              <p className="text-sm text-slate-600">
                Engineered with international infrastructure to ensure maximum capital appreciation and superior living standards.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SECTOR_A_INVESTOR_REASONS.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <ScrollReveal
                  key={item.title}
                  animation={isLeft ? "fade-right" : "fade-left"}
                  delay={index * 80}
                >
                  <div className="rounded-3xl bg-white border border-amber-200 hover:border-[#D49E17] shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group flex flex-col justify-between h-full">
                    <div>
                      <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                        <img
                          src={item.image}
                          alt={item.title}
                          title={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-3">
                          <span className="px-2.5 py-1 rounded-full bg-[#D49E17] text-slate-950 text-[10px] font-bold shadow">
                            {item.tag}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 space-y-2">
                        <h4 className="font-bold text-slate-900 text-sm group-hover:text-[#D49E17] transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        {/* 8. Detailed Sector A Payment Plan Breakdown */}
        <section className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
              Sector A (Block B) 3-Year Installment Breakdown
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Approved payment plan for residential plots in Sector A with confirmed possession schedule.
            </p>
          </div>

          <ScrollReveal animation="fade-up" delay={100}>
            {/* Mobile Cards View */}
            <div className="block md:hidden space-y-3">
              {RESIDENTIAL_PRICES.map((p) => (
                <div
                  key={`mob-sec-a-${p.size}`}
                  className="rounded-2xl border border-amber-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-amber-100">
                    <div>
                      <span className="text-base font-bold text-slate-900 font-heading block">
                        {p.size}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">
                        {p.dimensions}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        TOTAL PRICE
                      </span>
                      <span className="text-base font-bold text-[#D49E17] font-heading">
                        {p.totalPriceFormatted}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-3 text-xs">
                    <div className="p-2 rounded-xl bg-amber-50/60 border border-amber-100">
                      <span className="text-[10px] text-amber-900/80 font-medium block">Booking (10%)</span>
                      <span className="font-bold text-slate-800 text-[11px]">{p.bookingAmountFormatted}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] text-slate-500 font-medium block">Allocation (10%)</span>
                      <span className="font-bold text-slate-800 text-[11px]">{p.allocationAmountFormatted}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] text-slate-500 font-medium block">Monthly (×30)</span>
                      <span className="font-bold text-slate-800 font-mono text-[11px]">{p.monthlyInstallmentFormatted}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] text-slate-500 font-medium block">Bi-Annual (×6)</span>
                      <span className="font-bold text-slate-800 font-mono text-[11px]">{p.biAnnualInstallmentFormatted}</span>
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-500 font-medium">On Possession (20%):</span>
                    <span className="font-bold text-emerald-700">{p.possessionAmountFormatted}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Full Table View */}
            <div className="hidden md:block overflow-x-auto rounded-3xl border border-amber-200 bg-white shadow-xl">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-amber-50 text-amber-900 uppercase font-bold text-[11px] border-b border-amber-200">
                  <tr>
                    <th className="py-4 px-5">Plot Size</th>
                    <th className="py-4 px-5">Dimensions</th>
                    <th className="py-4 px-5">Total Price</th>
                    <th className="py-4 px-5">Booking (10%)</th>
                    <th className="py-4 px-5">Allocation (10%)</th>
                    <th className="py-4 px-5">Monthly (×30)</th>
                    <th className="py-4 px-5">Bi-Annual (×6)</th>
                    <th className="py-4 px-5">On Possession (20%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {RESIDENTIAL_PRICES.map((p) => (
                    <tr key={p.size} className="hover:bg-amber-50/50 transition-colors">
                      <td className="py-4 px-5 font-bold text-slate-900 text-sm">{p.size}</td>
                      <td className="py-4 px-5 text-slate-500 font-mono">{p.dimensions}</td>
                      <td className="py-4 px-5 font-bold text-[#D49E17] text-sm">{p.totalPriceFormatted}</td>
                      <td className="py-4 px-5">{p.bookingAmountFormatted}</td>
                      <td className="py-4 px-5">{p.allocationAmountFormatted}</td>
                      <td className="py-4 px-5 font-mono">{p.monthlyInstallmentFormatted}</td>
                      <td className="py-4 px-5 font-mono">{p.biAnnualInstallmentFormatted}</td>
                      <td className="py-4 px-5 font-bold text-emerald-700">{p.possessionAmountFormatted}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </section>

        {/* 9. Sector A FAQs */}
        <section className="space-y-8 max-w-4xl mx-auto">
          <div className="text-center space-y-3">
            <WordReveal
              text="Frequently Asked Questions"
              highlightWords={["Frequently", "Questions"]}
              as="h2"
              className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight block"
            />
          </div>

          <ScrollReveal animation="fade-up" delay={100}>
            <FaqAccordion items={SECTOR_A_FAQS} defaultOpenIndex={0} />
          </ScrollReveal>
        </section>

        {/* 10. Priority Booking Form Section */}
        <section id="booking" className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <WordReveal
              text="Book Your Sector A Plot Today"
              highlightWords={["Book", "Sector", "A"]}
              as="h2"
              className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading block"
            />
            <p className="text-xs sm:text-sm text-slate-600">
              Submit your inquiry directly to our official sales team to secure Sector A priority allotment.
            </p>
          </div>

          <ScrollReveal animation="zoom-in" delay={100}>
            <EnquiryForm defaultSector="Sector A (Block B)" defaultPlotType="Residential" />
          </ScrollReveal>
        </section>
      </div>
    </div>
  );
}
