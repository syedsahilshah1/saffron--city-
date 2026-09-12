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
  Car
} from "lucide-react";
import StaggerReveal from "@/components/animations/StaggerReveal";
import ScrollReveal from "@/components/animations/ScrollReveal";
import WordReveal from "@/components/animations/WordReveal";
import EnquiryForm from "@/components/forms/EnquiryForm";
import FaqAccordion from "@/components/ui/FaqAccordion";
import { RESIDENTIAL_PRICES, SITE_CONFIG } from "@/data/saffron-data";

import { getPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return await getPageMetadata("/sectors/sector-a");
}

const SECTOR_A_PLOTS_FOR_SALE = [
  {
    size: "5 Marla",
    category: "Executive Residential",
    dimensions: "25' × 45' (1,125 Sq. Ft.)",
    totalPrice: "PKR 45,00,000",
    booking: "PKR 4,50,000 (10%)",
    allocation: "PKR 4,50,000 (10%)",
    monthly: "PKR 45,000 / month (×30)",
    biAnnual: "PKR 2,25,000 (×6)",
    possession: "PKR 9,00,000 (20%)",
    image: "/images/sectors/sector-a-luxury.jpg",
    tag: "Most Demanded",
    description: "Ideal executive home plot with 100% underground electrification, minimum 40ft wide carpeted street, and instant access to Sector A parks.",
    whatsappText: "Hi, I want to book a 5 Marla Executive Plot in Saffron City Sector A (Block B)."
  },
  {
    size: "10 Marla",
    category: "Executive Residential",
    dimensions: "35' × 65' (2,275 Sq. Ft.)",
    totalPrice: "PKR 82,50,000",
    booking: "PKR 8,25,000 (10%)",
    allocation: "PKR 8,25,000 (10%)",
    monthly: "PKR 82,500 / month (×30)",
    biAnnual: "PKR 4,12,500 (×6)",
    possession: "PKR 16,50,000 (20%)",
    image: "/images/sectors/sector-b-residential.jpg",
    tag: "Spacious Villa Plot",
    description: "Premium size designed for spacious multi-storey family villas with large front lawn, dual-car parking porch, and wide boulevard facing options.",
    whatsappText: "Hi, I want to book a 10 Marla Executive Plot in Saffron City Sector A (Block B)."
  },
  {
    size: "1 Kanal",
    category: "Luxury Boulevard Estate",
    dimensions: "50' × 90' (4,500 Sq. Ft.)",
    totalPrice: "PKR 1,55,00,000",
    booking: "PKR 15,50,000 (10%)",
    allocation: "PKR 15,50,000 (10%)",
    monthly: "PKR 1,55,000 / month (×30)",
    biAnnual: "PKR 7,75,000 (×6)",
    possession: "PKR 31,00,000 (20%)",
    image: "/images/about/about-hero-banner.jpg",
    tag: "Flagship Luxury Estate",
    description: "Elite mansion plots directly facing the 250-foot Grand Central Boulevard with immediate walking distance to the Grand Jamia Mosque.",
    whatsappText: "Hi, I want to book a 1 Kanal Luxury Estate Plot in Saffron City Sector A (Block B)."
  }
];

const SECTOR_A_INVESTOR_REASONS = [
  {
    title: "100% Underground Electrification",
    description: "Zero overhead wires. All electricity, high-speed fiber optics, gas, and water supply are routed through subterranean conduits.",
    image: "/images/facilities/underground-utilities.jpg",
    tag: "Clean Skyline"
  },
  {
    title: "Direct GT Road (N-5) Gate Access",
    description: "Located right at the front entrance of Saffron City on Main GT Road, giving Sector A residents the fastest 0-minute highway commute.",
    image: "/images/amenities/amenity_boulevard.jpg",
    tag: "0-Min Highway Link"
  },
  {
    title: "40% Eco-Friendly Green Parks",
    description: "Surrounded by landscaped community parks, jogging tracks, kids' play areas, and lush green medians across all boulevards.",
    image: "/images/sectors/green-community-park.jpg",
    tag: "Green Community"
  },
  {
    title: "RDA Approved 15,000 Kanal Master Plan",
    description: "Complete legal security with approved town planning, clear plot demarcations, and swift registry/transfer allotment procedures.",
    image: "/images/facilities/gated-security.jpg",
    tag: "100% Legal Title"
  }
];

const SECTOR_A_NEARBY_LANDMARKS = [
  {
    name: "Main GT Road (N-5 Highway)",
    time: "0 Minutes Direct",
    timeHighlight: "text-[#D49E17]",
    distance: "Direct Frontage Access",
    bgClass: "bg-amber-50/70 border-amber-300 shadow-amber-100/50",
    image: "/images/amenities/amenity_boulevard.jpg",
    description: "Instant access to the multi-lane National Highway with no detours or secondary village roads."
  },
  {
    name: "T-Chowk Rawat Interchange",
    time: "5 Minutes",
    timeHighlight: "text-slate-900",
    distance: "3.5 km via Main GT Road",
    bgClass: "bg-white border-slate-200 hover:border-amber-300",
    image: "/images/landmark_t_chowk.jpg",
    description: "Strategic commercial and transit junction linking Rawalpindi, Islamabad Expressway, and GT Road."
  },
  {
    name: "DHA Phase II & Giga Mall",
    time: "10 Minutes",
    timeHighlight: "text-slate-900",
    distance: "8.0 km Expressway Link",
    bgClass: "bg-white border-slate-200 hover:border-amber-300",
    image: "/images/landmark_giga_mall.jpg",
    description: "Premier twin-city commercial shopping destination with hypermarkets, banks, and cinema complexes."
  },
  {
    name: "Rawalpindi Ring Road Interchange",
    time: "15 Minutes",
    timeHighlight: "text-emerald-700",
    distance: "11.0 km Direct Bypass",
    bgClass: "bg-white border-slate-200 hover:border-emerald-400",
    image: "/images/landmark_dha_islamabad.jpg",
    description: "Direct expressway link connecting Saffron City to New Islamabad Airport and M-2 Motorway."
  }
];

const SECTOR_A_FAQS = [
  {
    question: "What makes Sector A (Block B) the flagship sector in Saffron City?",
    answer: "Sector A is designed as the highest-tier executive enclave of Saffron City Islamabad. It features 100% underground electrification, closest proximity to the 250-foot Grand Boulevard and Main GT Road, immediate walking access to the Grand Jamia Mosque, and superior architectural controls.",
    category: "Features"
  },
  {
    question: "What plot categories and sizes are available in Sector A for sale?",
    answer: "Sector A offers premium residential plots in three standard sizes: 5 Marla (25' × 45'), 10 Marla (35' × 65'), and 1 Kanal (50' × 90'). All plots have direct access to minimum 40-foot to 60-foot wide internal carpeted streets.",
    category: "Plots"
  },
  {
    question: "What is the payment structure and installment plan for Sector A?",
    answer: "Plots can be booked with a 10% down payment, followed by 10% at confirmation/allocation. The remaining balance is spread conveniently over 30 monthly installments and 6 bi-annual installments across 3 years, with 20% due at possession.",
    category: "Payment"
  },
  {
    question: "Is Sector A covered by the official RDA No Objection Certificate (NOC)?",
    answer: "Yes. Saffron City holds an authentic 15,000 Kanal RDA-approved layout, and Sector A is fully covered under the approved town planning guidelines with complete legal title.",
    category: "Legal & NOC"
  },
  {
    question: "How do I visit Sector A on-site or view the location on Google Maps?",
    answer: "Sector A is directly accessible from Main GT Road near Rawat. You can use our embedded Google Map on this page or message our sales team on WhatsApp to arrange a guided on-site visit.",
    category: "Location & Visit"
  }
];

export default function SectorAPage() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
    "Hi, I want to inquire about Sector A (Block B) executive plots in Saffron City Islamabad."
  )}`;

  return (
    <div className="space-y-20 lg:space-y-28 pb-24 text-slate-900 bg-white">
      
      {/* Hero Banner Section with Background Image */}
      <section className="relative w-full pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden text-white">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/sectors/sector-a-luxury.jpg"
            alt="Saffron City Sector A Executive Enclave"
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

          <ScrollReveal animation="fade-up" delay={100}>
            <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-200 font-light leading-relaxed">
              Featuring 100% underground utilities, extra-wide 250ft boulevards, direct Grand Mosque access, and transparent 3-year installment plans.
            </p>
          </ScrollReveal>

          {/* Quick Metrics Counter Grid */}
          <ScrollReveal animation="fade-up" delay={150}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-4">
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center space-y-1">
                <span className="text-2xl sm:text-3xl font-bold text-[#D49E17] font-mono">100%</span>
                <p className="text-xs text-slate-300 font-medium">Underground Wiring</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center space-y-1">
                <span className="text-2xl sm:text-3xl font-bold text-[#D49E17] font-mono">250 Ft</span>
                <p className="text-xs text-slate-300 font-medium">Boulevard Connectivity</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center space-y-1">
                <span className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono">10%</span>
                <p className="text-xs text-slate-300 font-medium">Booking Amount</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center space-y-1">
                <span className="text-2xl sm:text-3xl font-bold text-[#D49E17] font-mono">3 Years</span>
                <p className="text-xs text-slate-300 font-medium">Installment Schedule</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={200} className="flex flex-wrap justify-center gap-4 pt-2">
            <a
              href="#plots-for-sale"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-[#D49E17] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs shadow-lg hover:scale-105 transition-all"
            >
              View Sector A Plots For Sale
            </a>
            <a
              href="#nearby-landmarks"
              className="px-6 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white font-bold text-xs shadow-lg hover:scale-105 transition-all flex items-center gap-2 backdrop-blur-md"
            >
              <MapPin className="w-4 h-4 text-[#D49E17]" />
              <span>Nearby Landmarks</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg hover:scale-105 transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Inquire on WhatsApp</span>
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 lg:space-y-28">

        {/* 1. Dedicated Sector A Overview Section */}
        <section className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <WordReveal
              text="Sector A Overview: Flagship Executive Living"
              highlightWords={["Sector", "A", "Overview", "Flagship", "Executive"]}
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight block"
            />

            <ScrollReveal animation="fade-up" delay={100}>
              <p className="text-sm text-slate-600 leading-relaxed">
                Sector A is the premier front-gate enclave of Saffron City Islamabad — master-planned with 100% underground utilities, wide 250-foot boulevards, and elite architectural standards.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScrollReveal animation="fade-right" delay={80}>
              <div className="p-7 rounded-3xl bg-amber-50/40 border border-amber-200 hover:border-[#D49E17] transition-all space-y-3 h-full">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-[#D49E17] shadow-sm">
                  <Zap className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 text-base">100% Underground Utilities</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Zero overhead cables across all streets. Modern subterranean grid for electricity, high-speed fiber optics, and dedicated water filtration.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={120}>
              <div className="p-7 rounded-3xl bg-emerald-50/40 border border-emerald-200 hover:border-emerald-500 transition-all space-y-3 h-full">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm">
                  <Compass className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 text-base">Prime GT Road Frontage</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Located directly at the entrance on Main GT Road (N-5 Highway) with 0-minute access and a carpeted 250-foot grand boulevard.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-left" delay={160}>
              <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200 hover:border-slate-400 transition-all space-y-3 h-full">
                <div className="w-12 h-12 rounded-2xl bg-slate-200 flex items-center justify-center text-slate-800 shadow-sm">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 text-base">Approved RDA Legal Title</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  100% authentic title backed by the approved 15,000 Kanal RDA No Objection Certificate (NOC) and transparent town planning.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* 2. Sector A Plots for Sale with High Quality Images */}
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
                Explore available residential plots in Sector A (Block B) with visual specifications, breakdown, and instant booking options.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SECTOR_A_PLOTS_FOR_SALE.map((plot, idx) => {
              const isLeft = idx === 0;
              const isRight = idx === 2;
              return (
                <ScrollReveal
                  key={plot.size}
                  animation={isLeft ? "fade-right" : isRight ? "fade-left" : "fade-up"}
                  delay={idx * 100}
                >
                  <div className="rounded-3xl bg-white border border-amber-200 hover:border-[#D49E17] shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group flex flex-col justify-between h-full">
                    <div>
                      {/* Plot Image Header */}
                      <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                        <img
                          src={plot.image}
                          alt={`${plot.size} Sector A Plot`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                        <div className="absolute top-3 right-3">
                          <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[#D49E17] border border-[#D49E17]/40 text-[11px] font-bold shadow">
                            {plot.tag}
                          </span>
                        </div>
                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">
                            {plot.category}
                          </span>
                          <h3 className="text-2xl font-black text-white drop-shadow-sm">
                            {plot.size} Residential
                          </h3>
                        </div>
                      </div>

                      {/* Details & Pricing */}
                      <div className="p-6 space-y-4">
                        <div className="space-y-1">
                          <p className="text-xs text-slate-500 font-mono font-medium">{plot.dimensions}</p>
                          <p className="text-2xl font-black text-[#D49E17]">{plot.totalPrice}</p>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed">
                          {plot.description}
                        </p>

                        <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
                          <div className="flex justify-between py-1.5 px-2.5 rounded-lg bg-amber-50/60">
                            <span className="text-slate-600">Booking (10%):</span>
                            <strong className="text-slate-900">{plot.booking}</strong>
                          </div>
                          <div className="flex justify-between py-1.5 px-2.5">
                            <span className="text-slate-600">Allocation (10%):</span>
                            <strong className="text-slate-900">{plot.allocation}</strong>
                          </div>
                          <div className="flex justify-between py-1.5 px-2.5 font-mono">
                            <span className="text-slate-600">Monthly Installment:</span>
                            <strong className="text-slate-900">{plot.monthly}</strong>
                          </div>
                          <div className="flex justify-between py-1.5 px-2.5 font-mono">
                            <span className="text-slate-600">Bi-Annual (×6):</span>
                            <strong className="text-slate-900">{plot.biAnnual}</strong>
                          </div>
                          <div className="flex justify-between py-1.5 px-2.5">
                            <span className="text-slate-600">On Possession (20%):</span>
                            <strong className="text-emerald-700 font-bold">{plot.possession}</strong>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action CTAs */}
                    <div className="p-6 pt-0 space-y-2">
                      <a
                        href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(plot.whatsappText)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs text-center flex items-center justify-center gap-2 shadow transition-all"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Book on WhatsApp</span>
                      </a>
                      <Link
                        href="/payment-plan"
                        className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs text-center block transition-colors"
                      >
                        View Full Payment Plan
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        {/* 2. Detailed Sector A Pricing Schedule Table */}
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
            <div className="overflow-x-auto rounded-3xl border border-amber-200 bg-white shadow-xl">
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

        {/* 3. Why Investors Choose Sector A (with Rich Images!) */}
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

        {/* 4. DEDICATED SEPARATE SECTION: Nearby Landmarks & Travel Distances with IMAGES */}
        <section id="nearby-landmarks" className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <WordReveal
              text="Nearby Landmarks & Travel Distances"
              highlightWords={["Nearby", "Landmarks", "Travel", "Distances"]}
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight block"
            />

            <ScrollReveal animation="fade-up" delay={100}>
              <p className="text-sm text-slate-600">
                Direct highway commute times from Sector A on Main GT Road (N-5 Highway) to major twin-city destinations.
              </p>
            </ScrollReveal>
          </div>

          {/* Landmark Milestone Rows with Images */}
          <div className="max-w-4xl mx-auto space-y-4">
            {SECTOR_A_NEARBY_LANDMARKS.map((item, idx) => (
              <ScrollReveal
                key={item.name}
                animation={idx % 2 === 0 ? "fade-right" : "fade-left"}
                delay={idx * 70}
              >
                <div className={`w-full p-3 sm:p-4 pr-6 sm:pr-8 rounded-2xl sm:rounded-full border shadow-md hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group ${item.bgClass}`}>
                  <div className="flex items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-full overflow-hidden shrink-0 border-2 border-amber-300/80 shadow group-hover:scale-105 transition-transform duration-300">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#D49E17] transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
                        {item.distance}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                    <span className="sm:hidden text-xs text-slate-500">Travel Time:</span>
                    <strong className={`text-sm sm:text-lg font-bold font-mono tracking-tight ${item.timeHighlight}`}>
                      {item.time}
                    </strong>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* 5. Sector A Location & Embedded Google Map */}
        <section id="sector-location" className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">

            <WordReveal
              text="Sector A Location & Google Map"
              highlightWords={["Sector", "A", "Location", "Google", "Map"]}
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight block"
            />

            <ScrollReveal animation="fade-up" delay={100}>
              <p className="text-sm text-slate-600">
                Sector A is situated right at the prime entrance of Saffron City on Main GT Road near Rawat, Islamabad.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Location Highlights Left (fade-right) */}
            <ScrollReveal animation="fade-right" className="lg:col-span-6 space-y-6">
              <div className="p-8 rounded-3xl bg-white border border-amber-200 shadow-xl space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-[#D49E17] text-xs font-bold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Main GT Road (N-5) Direct Gateway</span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 font-heading">
                  Instant Highway Connectivity
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Sector A occupies the premier front portion of Saffron City. Residents enter directly from the multi-lane National Highway onto the 250-foot carpeted central boulevard with dedicated security checkpoints and zero rural bypasses.
                </p>

                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2 text-xs text-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-800">Project Coordinates:</span>
                    <span className="font-mono font-bold text-slate-900">33.4939° N, 73.1118° E</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-800">Highway Access:</span>
                    <span className="font-bold text-[#D49E17]">Main GT Road (N-5)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-800">Authority Jurisdiction:</span>
                    <span className="font-bold text-emerald-700">RDA Approved</span>
                  </div>
                </div>

                <div className="pt-3 flex flex-wrap gap-3">
                  <a
                    href="https://maps.google.com/?q=Saffron+City+Rawat+Islamabad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-[#D49E17] text-white hover:text-slate-950 font-bold text-xs shadow transition-all flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open in Google Maps</span>
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow transition-all flex items-center gap-2"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Schedule Site Visit</span>
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* Embedded Google Map Right (fade-left) */}
            <ScrollReveal animation="fade-left" className="lg:col-span-6">
              <div className="w-full h-[450px] sm:h-[480px] rounded-3xl overflow-hidden border-2 border-amber-300 shadow-2xl relative bg-slate-100">
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

        {/* Master Plan Map Callout */}
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

        {/* Sector A FAQs */}
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

        {/* Priority Booking Form Section */}
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
