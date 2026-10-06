import React from "react";
import Link from "next/link";
import { 
  Building2, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  MessageCircle, 
  ArrowRight, 
  Download,
  Sparkles,
  Award,
  Zap,
  Layers,
  Car,
  MapPin,
  ExternalLink,
  Navigation,
  Compass,
  CheckCircle,
  Truck,
  Wifi,
  Coins,
  DollarSign
} from "lucide-react";
import StaggerReveal from "@/components/animations/StaggerReveal";
import ScrollReveal from "@/components/animations/ScrollReveal";
import WordReveal from "@/components/animations/WordReveal";
import EnquiryForm from "@/components/forms/EnquiryForm";
import FaqAccordion from "@/components/ui/FaqAccordion";
import { COMMERCIAL_PRICES, SITE_CONFIG } from "@/data/saffron-data";
import { getPageMetadata } from "@/lib/seo";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return await getPageMetadata("/plots/commercial");
}

const DEFAULT_COMMERCIAL_AMENITIES = [
  {
    title: "Direct GT Road Frontage",
    desc: "Unbeatable visibility to over 100,000 daily vehicles traversing between Islamabad, Rawalpindi, and Punjab.",
    image: "/images/amenities/amenity_boulevard.webp"
  },
  {
    title: "Dedicated Customer Parking Bays",
    desc: "Engineered with spacious multi-lane customer parking areas to ensure frictionless access for retail patrons.",
    image: "/images/sectors/commercial-plaza.webp"
  },
  {
    title: "Multi-Storey Commercial Permission",
    desc: "Approved building bylaws allowing multi-level retail plazas, executive offices, and rooftop restaurants.",
    image: "/images/about/about-hero-banner.webp"
  },
  {
    title: "High-Capacity Power & 100% Underground Grid",
    desc: "Subterranean utility infrastructure with dedicated transformers to power high-demand commercial equipment.",
    image: "/images/facilities/underground-utilities.webp"
  },
  {
    title: "24/7 Gated Business Security",
    desc: "Round-the-clock surveillance, CCTV monitoring, and dedicated security guards protecting your business assets.",
    image: "/images/facilities/gated-security.webp"
  },
  {
    title: "Dedicated Loading & Logistic Bays",
    desc: "Rear loading zones designed for supermarkets, pharmacies, banks, and corporate franchises.",
    image: "/images/facilities/water-filtration.webp"
  }
];

const DEFAULT_COMMERCIAL_PLOT_CARDS = [
  {
    size: "Signature Commercial (5.33 Marla)",
    dimensions: "30' × 40' Prime Size",
    totalPrice: "PKR 1,55,00,000",
    discountBadge: "PKR 45 Lac Discount Applied",
    downPayment: "PKR 35,00,000",
    monthly: "PKR 2,50,000 / month",
    possession: "PKR 30,00,000",
    image: "/images/sectors/commercial-plaza.webp",
    tag: "Exclusive Launch Offer",
    desc: "Located on the dedicated commercial boulevard, ideal for multi-storey retail, banks, cafes, and business offices.",
    whatsappText: "Hi, I am interested in the Signature Commercial (5.33 Marla) 30x40 Plot with PKR 45 Lac Discount."
  },
  {
    size: "4 Marla Commercial",
    dimensions: "30' × 30' High-Footfall",
    totalPrice: "PKR 2,20,00,000",
    discountBadge: "Main Highway Exposure",
    downPayment: "PKR 22,00,000 (10%)",
    monthly: "PKR 4,69,333 / month",
    possession: "PKR 44,00,000 (20%)",
    image: "/images/amenities/amenity_boulevard.webp",
    tag: "GT Road Frontage",
    desc: "Direct visibility to commuter traffic between Islamabad, Rawalpindi, and Rawat with customer parking.",
    whatsappText: "Hi, I am interested in the 4 Marla Commercial Plot on GT Road Frontage."
  },
  {
    size: "8 Marla Commercial",
    dimensions: "40' × 45' Mega Commercial",
    totalPrice: "PKR 4,20,00,000",
    discountBadge: "High Rental Multiplier",
    downPayment: "PKR 42,00,000 (10%)",
    monthly: "PKR 8,96,000 / month",
    possession: "PKR 84,00,000 (20%)",
    image: "/images/about/about-hero-banner.webp",
    tag: "Flagship Corporate Plaza",
    desc: "Suited for mega supermarkets, healthcare facilities, shopping complexes, and multinational franchise outlets.",
    whatsappText: "Hi, I am interested in the 8 Marla Mega Commercial Plot in Saffron City."
  }
];

const DEFAULT_COMMERCIAL_REASONS = [
  {
    title: "Unbeatable Highway Exposure",
    desc: "Direct visual presence on Main GT Road ensuring continuous brand exposure and sustained customer flow.",
    image: "/images/amenities/amenity_boulevard.webp",
    tag: "High Footfall"
  },
  {
    title: "High Rental Appreciation & Yields",
    desc: "Commercial plazas command top-tier rental demand from banks, pharmacies, supermarkets, and dining brands.",
    image: "/images/sectors/commercial-plaza.webp",
    tag: "Maximum ROI"
  },
  {
    title: "Approved Multi-Storey Construction",
    desc: "Architecturally sanctioned bylaws allowing multiple retail floors plus executive corporate suites.",
    image: "/images/about/about-hero-banner.webp",
    tag: "Multi-Storey"
  },
  {
    title: "Flexible 3-Year Payment Terms",
    desc: "Structured milestone installments with transparent pricing and verified title protection.",
    image: "/images/facilities/underground-utilities.webp",
    tag: "Flexible Plan"
  }
];

const DEFAULT_COMMERCIAL_LANDMARKS = [
  {
    name: "Main GT Road (N-5 Highway)",
    time: "Direct Access",
    timeHighlight: "text-[#D49E17]",
    distance: "Direct Frontage Exposure",
    image: "/images/amenities/amenity_boulevard.webp"
  },
  {
    name: "T-Chowk Rawat Commercial Hub",
    time: "5 Minutes",
    timeHighlight: "text-slate-900",
    distance: "3.5 km Direct Commute",
    image: "/images/landmark_t_chowk.webp"
  },
  {
    name: "DHA Phase II Commercial Corridor",
    time: "10 Minutes",
    timeHighlight: "text-slate-900",
    distance: "8.0 km Expressway Link",
    image: "/images/landmark_giga_mall.webp"
  },
  {
    name: "Rawalpindi Ring Road Interchange",
    time: "15 Minutes",
    timeHighlight: "text-emerald-700",
    distance: "11.0 km Direct Bypass",
    image: "/images/landmark_dha_islamabad.webp"
  }
];

const DEFAULT_COMMERCIAL_FAQS = [
  {
    question: "What makes Saffron City Commercial plots high-return investments?",
    answer: "Saffron City commercial plots boast direct frontage along Main GT Road (N-5 Highway) near Rawat, capturing massive daily commuter traffic between Islamabad and Punjab. Combined with multi-storey building permissions and a dedicated launch discount, the rental yields and capital appreciation are unmatched.",
    category: "Investment"
  },
  {
    question: "What is the installment schedule for Commercial plots?",
    answer: "Commercial plots follow a convenient 3-year payment structure with a 10% down payment (or PKR 35 Lac for Signature 30x40), followed by 30 monthly installments and possession payments upon completion.",
    category: "Payment"
  },
  {
    question: "Are commercial plots covered under the approved master layout?",
    answer: "Yes, Saffron City holds full authentic approval covering 15,000 Kanals, including all commercial zones, layout designs, and utility infrastructure.",
    category: "Legal"
  }
];

export default async function CommercialPlotsPage() {
  const settings = await db.getSettings();

  const heroBg = settings.commercialHeroImage || "/images/sectors/commercial-plaza.webp";
  const heroHeading = settings.commercialHeroHeading || "Commercial Plots for Sale | High Footfall & High Yield";
  const heroSubtitle = settings.commercialHeroSubtitle || "Positioned directly along Main GT Road (N-5 Highway) with dedicated customer parking, multistory building permission, and exceptional rental returns.";

  const whatsappPhone = settings.commercialCtaPhone || settings.whatsappPhone || SITE_CONFIG.whatsapp;
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
    "Hi, I am interested in booking a Commercial Plot in Saffron City."
  )}`;

  // Parse 4 Stats
  let stats = {
    stat1: "100,000+",
    stat1Label: "Daily Traffic",
    stat2: "Direct N-5",
    stat2Label: "GT Road Frontage",
    stat3: "Multi-Storey",
    stat3Label: "Building Approval",
    stat4: "3 Years",
    stat4Label: "Installment Plan"
  };
  if (settings.commercialStatsJson) {
    try {
      const parsed = JSON.parse(settings.commercialStatsJson);
      if (parsed) stats = { ...stats, ...parsed };
    } catch {}
  }

  // Parse Amenities
  let amenities = DEFAULT_COMMERCIAL_AMENITIES;
  if (settings.commercialAmenitiesJson) {
    try {
      const parsed = JSON.parse(settings.commercialAmenitiesJson);
      if (Array.isArray(parsed) && parsed.length > 0) {
        amenities = parsed;
      }
    } catch {}
  }

  // Parse Landmarks
  let landmarks = DEFAULT_COMMERCIAL_LANDMARKS;
  if (settings.commercialLandmarksJson) {
    try {
      const parsed = JSON.parse(settings.commercialLandmarksJson);
      if (Array.isArray(parsed) && parsed.length > 0) {
        landmarks = parsed.map((item: any) => ({
          name: item.name || item.title,
          time: item.time || item.driveTime || "Direct Access",
          timeHighlight: item.time?.includes("Direct") ? "text-[#D49E17]" : "text-slate-900",
          distance: item.distance || "Prime Commute",
          image: item.image || "/images/landmark_t_chowk.webp"
        }));
      }
    } catch {}
  }

  // Parse Plot Cards
  let plotCards = DEFAULT_COMMERCIAL_PLOT_CARDS;
  if (settings.commercialPlotsJson) {
    try {
      const parsed = JSON.parse(settings.commercialPlotsJson);
      if (Array.isArray(parsed) && parsed.length > 0) {
        plotCards = parsed;
      }
    } catch {}
  }

  // Parse Investor Reasons
  let reasons = DEFAULT_COMMERCIAL_REASONS;
  if (settings.commercialWhyChooseJson) {
    try {
      const parsed = JSON.parse(settings.commercialWhyChooseJson);
      if (Array.isArray(parsed) && parsed.length > 0) {
        reasons = parsed;
      }
    } catch {}
  }

  // Parse Pricing Table
  let pricingRows = COMMERCIAL_PRICES;
  if (settings.commercialPricingJson) {
    try {
      const parsed = JSON.parse(settings.commercialPricingJson);
      if (Array.isArray(parsed) && parsed.length > 0) {
        pricingRows = parsed;
      }
    } catch {}
  }

  // Parse FAQs
  let faqs = DEFAULT_COMMERCIAL_FAQS;
  if (settings.commercialFaqsJson) {
    try {
      const parsed = JSON.parse(settings.commercialFaqsJson);
      if (Array.isArray(parsed) && parsed.length > 0) {
        faqs = parsed;
      }
    } catch {}
  }

  const mapEmbedUrl = settings.commercialGoogleMapEmbed || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106450.60155606992!2d73.11181283995874!3d33.49397682977461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfebbe487dc843%3A0x6b63d76b1f237efb!2sRawat%2C%20Rawalpindi%2C%20Punjab!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s";

  return (
    <div className="space-y-20 lg:space-y-28 pb-24 text-slate-900 bg-white">
      
      {/* 1. Hero Banner Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden text-white">
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt="Saffron City Commercial Plazas"
            title="Saffron City Commercial Plazas"
            className="w-full h-full object-cover object-center scale-105 animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/50" />
          <div className="absolute inset-0 bg-[radial-gradient(#D49E17_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading tracking-tight text-white block">
            {heroHeading.includes("|") ? (
              <>
                {heroHeading.split("|")[0]} <span className="text-[#D49E17]">{heroHeading.split("|")[1]}</span>
              </>
            ) : (
              <>
                Commercial Plots <span className="text-[#D49E17]">for Sale</span>
              </>
            )}
          </h1>

          {heroSubtitle && (
            <ScrollReveal animation="fade-up" delay={100}>
              <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-200 font-light leading-relaxed">
                {heroSubtitle}
              </p>
            </ScrollReveal>
          )}

          {/* 4 Stat Metrics */}
          <ScrollReveal animation="fade-up" delay={150}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-4">
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center space-y-1">
                <span className="text-2xl sm:text-3xl font-bold text-[#D49E17] font-mono">{stats.stat1}</span>
                <p className="text-xs text-slate-300 font-medium">{stats.stat1Label}</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center space-y-1">
                <span className="text-2xl sm:text-3xl font-bold text-white font-mono">{stats.stat2}</span>
                <p className="text-xs text-slate-300 font-medium">{stats.stat2Label}</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center space-y-1">
                <span className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono">{stats.stat3}</span>
                <p className="text-xs text-slate-300 font-medium">{stats.stat3Label}</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center space-y-1">
                <span className="text-2xl sm:text-3xl font-bold text-[#D49E17] font-mono">{stats.stat4}</span>
                <p className="text-xs text-slate-300 font-medium">{stats.stat4Label}</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={200} className="flex flex-wrap justify-center gap-4 pt-4">
            <a
              href="#commercial-inventory"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-[#D49E17] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs shadow-lg hover:scale-105 transition-all"
            >
              Explore Commercial Plots
            </a>
            <a
              href="#commercial-location"
              className="px-6 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white font-bold text-xs shadow-lg hover:scale-105 transition-all flex items-center gap-2 backdrop-blur-md"
            >
              <MapPin className="w-4 h-4 text-[#D49E17]" />
              <span>Location &amp; Map</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg hover:scale-105 transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Inquire Commercial Inventory</span>
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 lg:space-y-28">

        {/* 2. Commercial Overview Section (TEXT ON LEFT, IMAGE ON RIGHT) */}
        <section className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Text Content */}
            <ScrollReveal animation="fade-right" className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-[#D49E17] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Commercial Broadway Hub</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-slate-900 tracking-tight leading-tight">
                {settings.commercialOverviewHeading || "Commercial Overview: The Business Hub of Rawat"}
              </h2>

              <div
                className="prose prose-sm max-w-none text-slate-600 leading-relaxed font-light [&_a]:text-[#D49E17] [&_a]:underline [&_a]:font-bold [&_a]:transition-colors [&_a:hover]:text-amber-700 space-y-3"
                dangerouslySetInnerHTML={{
                  __html:
                    settings.commercialOverviewText ||
                    `<p>Engineered to capture immense transit footfall along the twin cities National Highway corridor with multi-level construction allowances, dedicated customer parking, and high appreciation rates.</p><p>Saffron City Commercial Broadway offers prime frontage plots for flagship retail, multinational franchises, corporate banks, and executive healthcare centers with 100% legal RDA compliance.</p>`
                }}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-1">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <TrendingUp className="w-4 h-4 text-[#D49E17]" />
                    <span>Highway Exposure</span>
                  </div>
                  <p className="text-xs text-slate-600">Direct visibility on Main GT Road capturing daily twin-city commuters.</p>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-1">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <Car className="w-4 h-4 text-emerald-600" />
                    <span>Dedicated Parking</span>
                  </div>
                  <p className="text-xs text-slate-600">Wide customer parking bays engineered to prevent street congestion.</p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <a
                  href="#commercial-inventory"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-[#D49E17] text-white hover:text-slate-950 font-bold text-xs shadow transition-all"
                >
                  <span>View Commercial Inventory</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Inquiries</span>
                </a>
              </div>
            </ScrollReveal>

            {/* Right: Image Card */}
            <ScrollReveal animation="fade-left" className="lg:col-span-5">
              <div className="relative w-full h-80 sm:h-[420px] rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-200 group">
                <img
                  src={settings.commercialOverviewImage || "/images/sectors/commercial-plaza.webp"}
                  alt="Saffron City Commercial Broadway Plaza Overview"
                  title="Saffron City Commercial Broadway Plaza Overview"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1.5 rounded-full bg-[#D49E17] text-white text-xs font-bold uppercase tracking-wider shadow-md">
                    Commercial Overview
                  </span>
                </div>
                <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
                  <p className="text-xs font-semibold text-amber-300">National Highway Frontage • High Footfall</p>
                  <h3 className="text-xl font-bold font-heading text-white">Premier Retail &amp; Corporate Center</h3>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* 3. Commercial Amenities & Infrastructure Highlights */}
        <section className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <WordReveal
              text={settings.commercialAmenitiesHeading || "Commercial Infrastructure & Facilities"}
              highlightWords={["Commercial", "Infrastructure", "Facilities"]}
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight block"
            />
            <ScrollReveal animation="fade-up" delay={100}>
              <p className="text-sm text-slate-600 leading-relaxed">
                Engineered to meet corporate retail specifications with modern amenities and high convenience for customers.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {amenities.map((item, idx) => {
              return (
                <ScrollReveal
                  key={`${item.title}-${idx}`}
                  animation={idx % 3 === 0 ? "fade-right" : idx % 3 === 1 ? "fade-up" : "fade-left"}
                  delay={idx * 80}
                >
                  <div className="rounded-3xl bg-white border border-amber-200 hover:border-[#D49E17] shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col justify-between h-full">
                    <div>
                      <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                        <img
                          src={item.image || "/images/amenities/amenity_boulevard.webp"}
                          alt={item.title}
                          title={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-3 w-10 h-10 rounded-xl bg-white/95 backdrop-blur-md flex items-center justify-center text-[#D49E17] shadow">
                          <Building2 className="w-5 h-5" />
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

        {/* 4. Location & Strategic GT Road Highway Visibility */}
        <section id="commercial-location" className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <WordReveal
              text={settings.commercialLandmarksHeading || "Commercial Location & Commute Distances"}
              highlightWords={["Commercial", "Location", "Commute"]}
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight block"
            />
            <ScrollReveal animation="fade-up" delay={100}>
              <p className="text-sm text-slate-600">
                Fronting the National Highway (N-5) with direct accessibility from both Islamabad and Rawalpindi.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Landmarks List Left */}
            <ScrollReveal animation="fade-right" className="lg:col-span-6 space-y-4">
              <div className="p-6 rounded-3xl bg-white border border-amber-200 shadow-xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-[#D49E17] text-xs font-bold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Main GT Road Highway Corridor</span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 font-heading">
                  High-Footfall Commute Connections
                </h3>

                <div className="space-y-3">
                  {landmarks.map((item, idx) => (
                    <div
                      key={`${item.name}-${idx}`}
                      className="p-3 rounded-2xl border flex items-center justify-between gap-3 bg-white border-slate-200 hover:border-amber-300 transition-colors"
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
                      <strong className={`text-xs sm:text-sm font-bold font-mono ${item.timeHighlight || "text-[#D49E17]"}`}>
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
                  title="Saffron City Commercial Location"
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 z-10 px-4 py-2 rounded-full bg-white/95 border border-amber-300 text-amber-900 text-xs font-bold shadow-lg flex items-center gap-2 backdrop-blur-md">
                  <MapPin className="w-4 h-4 text-[#D49E17]" />
                  <span>Commercial Broadway • GT Road</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* 5. Commercial Plots for Sale */}
        <section id="commercial-inventory" className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <WordReveal
              text={settings.commercialPlotsHeading || "Commercial Plots for Sale"}
              highlightWords={["Commercial", "Plots", "Sale"]}
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight block"
            />
            <ScrollReveal animation="fade-up" delay={100}>
              <p className="text-sm text-slate-600">
                {settings.commercialPlotsSubtitle || "Choose your commercial plot size with structured 3-year installments and special discount pricing."}
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plotCards.map((plot, idx) => (
              <ScrollReveal
                key={`${plot.size}-${idx}`}
                animation={idx === 0 ? "fade-right" : idx === 1 ? "fade-up" : "fade-left"}
                delay={idx * 100}
              >
                <div className="rounded-3xl bg-white border border-amber-200 hover:border-[#D49E17] shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group flex flex-col justify-between h-full">
                  <div>
                    <Link href="/plot-for-sale" className="block relative h-52 w-full overflow-hidden bg-slate-100 cursor-pointer">
                      <img
                        src={plot.image || "/images/sectors/commercial-plaza.webp"}
                        alt={plot.size}
                        title={`${plot.size} Commercial Plot`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute top-3 right-3">
                        <span className="px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[#D49E17] border border-[#D49E17]/40 text-[10px] font-bold">
                          {plot.tag}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <span className="text-xl font-black">{plot.size}</span>
                      </div>
                    </Link>

                    <div className="p-6 space-y-4">
                      <div className="space-y-1">
                        <div className="inline-block px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          {plot.discountBadge}
                        </div>
                        <p className="text-xs text-slate-500 font-mono font-medium">{plot.dimensions}</p>
                        <p className="text-2xl font-black text-[#D49E17]">{plot.totalPrice}</p>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {plot.desc}
                      </p>

                      <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                        <div className="flex justify-between py-1">
                          <span className="text-slate-600">Booking / Down Payment:</span>
                          <strong className="text-slate-900">{plot.downPayment}</strong>
                        </div>
                        <div className="flex justify-between py-1 font-mono">
                          <span className="text-slate-600">Monthly Installment:</span>
                          <strong className="text-slate-900">{plot.monthly}</strong>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-slate-600">Possession:</span>
                          <strong className="text-emerald-700 font-bold">{plot.possession}</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 space-y-2">
                    <a
                      href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(plot.whatsappText || `Hi, I am interested in ${plot.size}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs text-center flex items-center justify-center gap-2 shadow transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Book on WhatsApp</span>
                    </a>
                    <Link
                      href="/plot-for-sale"
                      className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs text-center block transition-colors"
                    >
                      View All Plots Directory
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* 6. Master Map / Demarcation Callout Section */}
        <section className="p-8 sm:p-12 rounded-3xl bg-amber-50/50 border border-amber-200 shadow-xl space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold text-[#D49E17] uppercase tracking-wider block">
                Official Demarcation &amp; Layout
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
                Inspect Commercial Boulevard on the 4K Master Plan
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Review commercial plot demarcations, dedicated customer parking bays, and boulevard intersections on our interactive high-resolution master plan viewer.
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

        {/* 7. Features / Why Investors Choose Commercial */}
        <section className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <WordReveal
              text={settings.commercialWhyChooseHeading || "Why Invest in Saffron Commercial Plots"}
              highlightWords={["Invest", "Saffron", "Commercial"]}
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight block"
            />
            <ScrollReveal animation="fade-up" delay={100}>
              <p className="text-sm text-slate-600">
                Engineered for optimal commercial viability and highest possible capital growth.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reasons.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <ScrollReveal 
                  key={`${item.title}-${index}`} 
                  animation={isLeft ? "fade-right" : "fade-left"}
                  delay={index * 80}
                >
                  <div className="rounded-3xl bg-white border border-amber-200 hover:border-[#D49E17] shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group flex flex-col justify-between h-full">
                    <div>
                      <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                        <img
                          src={item.image || "/images/amenities/amenity_boulevard.webp"}
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

        {/* 8. Official Commercial Pricing & Payment Schedule Table */}
        <section className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
              {settings.commercialPricingHeading || "Official Commercial Pricing & Payment Schedule"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Approved rates for Saffron City commercial plots with 3-year flexible terms.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-amber-200 shadow-xl bg-white">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-950 text-white uppercase text-[10px] tracking-wider font-mono">
                <tr>
                  <th className="p-4 sm:p-5">Size &amp; Category</th>
                  <th className="p-4 sm:p-5">Dimensions</th>
                  <th className="p-4 sm:p-5 text-[#D49E17]">Total Price</th>
                  <th className="p-4 sm:p-5">Down Payment</th>
                  <th className="p-4 sm:p-5">Monthly Installment</th>
                  <th className="p-4 sm:p-5">On Possession</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {pricingRows.map((row: any, i: number) => (
                  <tr key={i} className="hover:bg-amber-50/40 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#D49E17]" />
                      <span>{row.size}</span>
                    </td>
                    <td className="p-4 sm:p-5 font-mono text-slate-500">{row.dimensions}</td>
                    <td className="p-4 sm:p-5 font-mono font-black text-slate-950 text-sm">{row.totalPriceFormatted}</td>
                    <td className="p-4 sm:p-5 font-mono text-slate-800">{row.bookingAmountFormatted}</td>
                    <td className="p-4 sm:p-5 font-mono text-slate-800">{row.monthlyInstallmentFormatted}</td>
                    <td className="p-4 sm:p-5 font-mono text-slate-800">{row.possessionAmountFormatted}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 9. Commercial FAQs & Priority Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start pt-8 border-t border-slate-200">
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#D49E17] uppercase tracking-wider">Book Now</span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
                {settings.commercialCtaHeading || "Reserve Your Commercial Plot"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                {settings.commercialCtaSubtitle || "Fill the priority commercial inquiry form or contact our corporate sales desk for customized corner & main boulevard allocations."}
              </p>
            </div>
            <EnquiryForm id="commercial-lead-form" title="Reserve Commercial Plot" />
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#D49E17] uppercase tracking-wider">FAQs</span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
                {settings.commercialFaqsHeading || "Commercial Frequently Asked Questions"}
              </h3>
            </div>
            <FaqAccordion items={faqs} />
          </div>
        </div>

      </div>
    </div>
  );
}
