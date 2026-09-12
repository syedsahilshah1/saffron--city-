import React from "react";
import Link from "next/link";
import { 
  Users, 
  HeartHandshake, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle,
  Sparkles,
  HelpCircle,
  Layers,
  Trees,
  Home,
  Clock,
  Award,
  MapPin,
  Compass,
  ExternalLink,
  Navigation,
  Zap,
  Building2
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
  return await getPageMetadata("/sectors/sector-b");
}

const SECTOR_B_PLOTS_FOR_SALE = [
  {
    size: "5 Marla",
    category: "Family Residential",
    dimensions: "25' × 45' (1,125 Sq. Ft.)",
    totalPrice: "PKR 45,00,000",
    booking: "PKR 4,50,000 (10%)",
    allocation: "PKR 4,50,000 (10%)",
    monthly: "PKR 45,000 / month (×30)",
    biAnnual: "PKR 2,25,000 (×6)",
    possession: "PKR 9,00,000 (20%)",
    image: "/images/sectors/sector-b-residential.webp",
    tag: "Budget Friendly",
    description: "The most sought-after family plot size in Sector B, offering affordable monthly installments and close walking access to neighborhood parks.",
    whatsappText: "Hi, I want to book a 5 Marla Residential Plot in Saffron City Sector B."
  },
  {
    size: "10 Marla",
    category: "Family Villa Plot",
    dimensions: "35' × 65' (2,275 Sq. Ft.)",
    totalPrice: "PKR 82,50,000",
    booking: "PKR 8,25,000 (10%)",
    allocation: "PKR 8,25,000 (10%)",
    monthly: "PKR 82,500 / month (×30)",
    biAnnual: "PKR 4,12,500 (×6)",
    possession: "PKR 16,50,000 (20%)",
    image: "/images/sectors/sector-b-residential.webp",
    tag: "Spacious Living",
    description: "Ideal for growing families desiring a 4-5 bedroom home with spacious rooms, lawn area, and multi-vehicle parking.",
    whatsappText: "Hi, I want to book a 10 Marla Residential Plot in Saffron City Sector B."
  },
  {
    size: "1 Kanal",
    category: "Executive Estate",
    dimensions: "50' × 90' (4,500 Sq. Ft.)",
    totalPrice: "PKR 1,55,00,000",
    booking: "PKR 15,50,000 (10%)",
    allocation: "PKR 15,50,000 (10%)",
    monthly: "PKR 1,55,000 / month (×30)",
    biAnnual: "PKR 7,75,000 (×6)",
    possession: "PKR 31,00,000 (20%)",
    image: "/images/about/about-hero-banner.webp",
    tag: "Park Facing Option",
    description: "Generous 1 Kanal residential plots positioned along wide carpeted secondary boulevards with direct views of green community belts.",
    whatsappText: "Hi, I want to book a 1 Kanal Residential Plot in Saffron City Sector B."
  }
];

const SECTOR_B_HIGHLIGHTS = [
  {
    title: "Dedicated Sector B Community Mosque",
    desc: "Built within the sector boundary for quick 2-minute daily walking access to prayers.",
    image: "/images/amenities/amenity_mosque.webp",
    tag: "Sector Mosque"
  },
  {
    title: "Family Neighborhood Parks",
    desc: "Lush landscaped gardens, children's play area, and shaded benches for peaceful evenings.",
    image: "/images/sectors/green-community-park.webp",
    tag: "Community Parks"
  },
  {
    title: "Budget-Friendly 3-Year Plan",
    desc: "Accessible 10% booking with manageable monthly installments spread over 36 months.",
    image: "/images/sectors/sector-b-residential.webp",
    tag: "Easy Payment"
  },
  {
    title: "Gated Security & CCTV Patrols",
    desc: "Manned security checkpoints, boundary wall, and round-the-clock motorized patrol units.",
    image: "/images/facilities/gated-security.webp",
    tag: "24/7 Security"
  }
];

const SECTOR_B_NEARBY_LANDMARKS = [
  {
    name: "Main GT Road (N-5 Highway)",
    time: "0 Minutes Direct",
    timeHighlight: "text-[#D49E17]",
    distance: "Direct Project Access",
    bgClass: "bg-emerald-50/70 border-emerald-300",
    image: "/images/amenities/amenity_boulevard.webp",
    description: "Instant access to the multi-lane National Highway."
  },
  {
    name: "T-Chowk Rawat Interchange",
    time: "5 Minutes",
    timeHighlight: "text-slate-900",
    distance: "3.5 km via Main GT Road",
    bgClass: "bg-white border-slate-200 hover:border-emerald-300",
    image: "/images/landmark_t_chowk.webp",
    description: "Major commercial and transit connection hub."
  },
  {
    name: "DHA Phase II & Giga Mall",
    time: "10 Minutes",
    timeHighlight: "text-slate-900",
    distance: "8.0 km Expressway Link",
    bgClass: "bg-white border-slate-200 hover:border-emerald-300",
    image: "/images/landmark_giga_mall.webp",
    description: "Shopping mall, cinema, and retail center."
  },
  {
    name: "Rawalpindi Ring Road Interchange",
    time: "15 Minutes",
    timeHighlight: "text-emerald-700",
    distance: "11.0 km Direct Bypass",
    bgClass: "bg-white border-slate-200 hover:border-emerald-400",
    image: "/images/landmark_dha_islamabad.webp",
    description: "Fast bypass route to Islamabad International Airport."
  }
];

const SECTOR_B_FAQS = [
  {
    question: "What makes Sector B ideal for families and first-time investors?",
    answer: "Sector B is designed with affordability and community living in mind. It offers the same approved master plan and civic amenities as the rest of the project, with a pocket-friendly 10% down payment and 3-year installment schedule.",
    category: "Overview"
  },
  {
    question: "What plot sizes are available in Sector B for sale?",
    answer: "Sector B offers standard residential plots in 5 Marla (25×45), 10 Marla (35×65), and 1 Kanal (50×90) sizes on 40-foot to 60-foot wide carpeted residential streets.",
    category: "Plots"
  },
  {
    question: "Is Sector B legally approved by RDA?",
    answer: "Yes, Sector B is completely covered under Saffron City's approved 15,000 Kanal RDA No Objection Certificate (NOC) and town planning authorization.",
    category: "Legal & NOC"
  },
  {
    question: "What are the installment terms for Sector B plots?",
    answer: "Plots in Sector B require a 10% down payment at booking, 10% at allocation, 30 monthly installments, 6 bi-annual installments, and 20% on possession.",
    category: "Payment"
  }
];

export default function SectorBPage() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
    "Hi, I want to inquire about affordable residential plots in Saffron City Sector B."
  )}`;

  return (
    <div className="space-y-20 lg:space-y-28 pb-24 text-slate-900 bg-white">
      
      {/* Hero Banner Section with Background Image */}
      <section className="relative w-full pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/sectors/sector-b-residential.webp"
            alt="Saffron City Sector B Family Living"
            className="w-full h-full object-cover object-center scale-105 animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/50" />
          <div className="absolute inset-0 bg-[radial-gradient(#D49E17_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">

          <WordReveal
            text="Sector B: Plots for Sale & Family Living"
            highlightWords={["Sector", "B", "Plots", "Sale", "Family"]}
            as="h1"
            className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading tracking-tight text-white block"
          />

          <ScrollReveal animation="fade-up" delay={100}>
            <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-200 font-light leading-relaxed">
              Designed for budget-conscious families and high-growth investors with accessible 10% booking, dedicated sector parks, and community mosque.
            </p>
          </ScrollReveal>

          {/* Quick Metrics Counter Grid */}
          <ScrollReveal animation="fade-up" delay={150}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-4">
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center space-y-1">
                <span className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono">10%</span>
                <p className="text-xs text-slate-300 font-medium">Down Payment</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center space-y-1">
                <span className="text-2xl sm:text-3xl font-bold text-[#D49E17] font-mono">3 Years</span>
                <p className="text-xs text-slate-300 font-medium">Installment Schedule</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center space-y-1">
                <span className="text-2xl sm:text-3xl font-bold text-[#D49E17] font-mono">15,000 K</span>
                <p className="text-xs text-slate-300 font-medium">RDA Approved</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center space-y-1">
                <span className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono">100%</span>
                <p className="text-xs text-slate-300 font-medium">Legal Security</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={200} className="flex flex-wrap justify-center gap-4 pt-2">
            <a
              href="#plots-for-sale"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-[#D49E17] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs shadow-lg hover:scale-105 transition-all"
            >
              View Sector B Plots For Sale
            </a>
            <a
              href="#sector-location"
              className="px-6 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white font-bold text-xs shadow-lg hover:scale-105 transition-all flex items-center gap-2 backdrop-blur-md"
            >
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Google Map Location</span>
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

        {/* 1. Dedicated Sector B Overview Section */}
        <section className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <WordReveal
              text="Sector B Overview: Affordable Family Living"
              highlightWords={["Sector", "B", "Overview", "Affordable", "Family"]}
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight block"
            />

            <ScrollReveal animation="fade-up" delay={100}>
              <p className="text-sm text-slate-600 leading-relaxed">
                Sector B is specifically master-planned for families seeking a peaceful, green, and self-contained neighborhood with easy payment terms.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScrollReveal animation="fade-right" delay={80}>
              <div className="p-7 rounded-3xl bg-emerald-50/40 border border-emerald-200 hover:border-emerald-500 transition-all space-y-3 h-full">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 text-base">Accessible 10% Down Payment</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Start booking your plot from as low as PKR 450,000 with simple 30 monthly installments and no sudden lump-sum balloon payments.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={120}>
              <div className="p-7 rounded-3xl bg-amber-50/40 border border-amber-200 hover:border-[#D49E17] transition-all space-y-3 h-full">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-[#D49E17] shadow-sm">
                  <Trees className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 text-base">Dedicated Parks &amp; Playgrounds</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Multiple pocket parks, jogging tracks, and safe children&apos;s play areas situated within easy walking distance of all residential streets.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-left" delay={160}>
              <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200 hover:border-slate-400 transition-all space-y-3 h-full">
                <div className="w-12 h-12 rounded-2xl bg-slate-200 flex items-center justify-center text-slate-800 shadow-sm">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 text-base">100% Legal RDA Protection</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Fully covered under the authentic 15,000 Kanal RDA No Objection Certificate (NOC) with guaranteed title ownership.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* 2. Available Plots in Sector B (With Photographic Image Headers!) */}
        <section id="plots-for-sale" className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <WordReveal
              text="Available Residential Plots in Sector B"
              highlightWords={["Residential", "Plots", "Sector", "B"]}
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight block"
            />
            <p className="text-sm text-slate-600">
              Choose your ideal plot size with structured 30-month installments, 6 bi-annual payments, and instant WhatsApp booking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SECTOR_B_PLOTS_FOR_SALE.map((plot, idx) => {
              const isLeft = idx === 0;
              const isRight = idx === 2;
              return (
                <ScrollReveal
                  key={plot.size}
                  animation={isLeft ? "fade-right" : isRight ? "fade-left" : "fade-up"}
                  delay={idx * 100}
                >
                  <div className="rounded-3xl bg-white border border-emerald-200 hover:border-emerald-500 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group flex flex-col justify-between h-full">
                    <div>
                      {/* Plot Photographic Header */}
                      <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                        <img
                          src={plot.image}
                          alt={`${plot.size} Sector B Plot`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                        <div className="absolute top-3 right-3">
                          <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-emerald-400 border border-emerald-500/40 text-[11px] font-bold shadow">
                            {plot.tag}
                          </span>
                        </div>
                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider block">
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
                          <div className="flex justify-between py-1.5 px-2.5 rounded-lg bg-emerald-50/60">
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

                    {/* Action Buttons */}
                    <div className="p-6 pt-0 space-y-2">
                      <a
                        href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(plot.whatsappText)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs text-center flex items-center justify-center gap-2 shadow transition-all"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Book via WhatsApp</span>
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

        {/* 3. Detailed Sector B Pricing Schedule Table */}
        <section className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
              Sector B 3-Year Installment Breakdown
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Verified payment plan for residential plots in Sector B with fixed monthly stages.
            </p>
          </div>

          <ScrollReveal animation="fade-up" delay={100}>
            {/* 1. Mobile Cards View (Hidden on md and up) */}
            <div className="block md:hidden space-y-3">
              {RESIDENTIAL_PRICES.map((p) => (
                <div
                  key={`mob-sec-b-${p.size}`}
                  className="rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
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
                    <div className="p-2 rounded-xl bg-emerald-50/60 border border-emerald-100">
                      <span className="text-[10px] text-emerald-900/80 font-medium block">Booking (10%)</span>
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

            {/* 2. Desktop Full Table View (Hidden on mobile) */}
            <div className="hidden md:block overflow-x-auto rounded-3xl border border-emerald-200 bg-white shadow-xl">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-emerald-50 text-emerald-900 uppercase font-bold text-[11px] border-b border-emerald-200">
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
                    <tr key={p.size} className="hover:bg-emerald-50/50 transition-colors">
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

        {/* 4. Sector B Community Amenities (4 Cards with Images) */}
        <section className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <WordReveal
              text="Sector B Community Highlights"
              highlightWords={["Community", "Highlights"]}
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight block"
            />

            <ScrollReveal animation="fade-up" delay={100}>
              <p className="text-sm text-slate-600">
                Thoughtfully planned to provide serene neighborhood living with top-tier community facilities.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SECTOR_B_HIGHLIGHTS.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <ScrollReveal 
                  key={item.title} 
                  animation={isEven ? "fade-right" : "fade-left"}
                  delay={index * 80}
                >
                  <div className="rounded-3xl bg-white border border-emerald-200 hover:border-emerald-500 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group flex flex-col justify-between h-full">
                    <div>
                      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-3">
                          <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-bold shadow">
                            {item.tag}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 space-y-2">
                        <h3 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition-colors">
                          {item.title}
                        </h3>
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

        {/* 5. DEDICATED SEPARATE SECTION: Nearby Landmarks with Image Thumbnails */}
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
                Direct highway commute times from Sector B to major twin-city destinations.
              </p>
            </ScrollReveal>
          </div>

          {/* Landmark Milestone Rows with Images */}
          <div className="max-w-4xl mx-auto space-y-4">
            {SECTOR_B_NEARBY_LANDMARKS.map((item, idx) => (
              <ScrollReveal
                key={item.name}
                animation={idx % 2 === 0 ? "fade-right" : "fade-left"}
                delay={idx * 70}
              >
                <div className={`w-full p-3 sm:p-4 pr-6 sm:pr-8 rounded-2xl sm:rounded-full border shadow-md hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group ${item.bgClass}`}>
                  <div className="flex items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-full overflow-hidden shrink-0 border-2 border-emerald-300/80 shadow group-hover:scale-105 transition-transform duration-300">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
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

        {/* 6. Sector B Location & Embedded Google Map */}
        <section id="sector-location" className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">


            <WordReveal
              text="Sector B Location & Google Map"
              highlightWords={["Sector", "B", "Location", "Google", "Map"]}
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight block"
            />

            <ScrollReveal animation="fade-up" delay={100}>
              <p className="text-sm text-slate-600">
                Sector B is located inside the master planned Saffron City on Main GT Road near Rawat, Islamabad.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Location Highlights Left (fade-right) */}
            <ScrollReveal animation="fade-right" className="lg:col-span-6 space-y-6">
              <div className="p-8 rounded-3xl bg-white border border-emerald-200 shadow-xl space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Main GT Road (N-5) Access</span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 font-heading">
                  Quiet Family Enclave with Fast Highway Link
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Sector B offers a peaceful residential ambiance set slightly behind the main commercial frontage, providing noise-free living for families while retaining direct connection to the 250-foot grand boulevard and Main GT Road.
                </p>

                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2 text-xs text-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-800">Project Coordinates:</span>
                    <span className="font-mono font-bold text-slate-900">33.4939° N, 73.1118° E</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-800">Highway Access:</span>
                    <span className="font-bold text-emerald-700">Main GT Road (N-5)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-800">Authority Jurisdiction:</span>
                    <span className="font-bold text-[#D49E17]">RDA Approved</span>
                  </div>
                </div>

                <div className="hidden lg:flex pt-3 flex-wrap gap-3">
                  <a
                    href="https://maps.google.com/?q=Saffron+City+Rawat+Islamabad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs shadow transition-all flex items-center gap-2"
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
            <ScrollReveal animation="fade-left" className="lg:col-span-6 space-y-3">
              <div className="w-full h-[360px] sm:h-[450px] rounded-3xl overflow-hidden border-2 border-emerald-300 shadow-2xl relative bg-slate-100">
                <iframe
                  title="Sector B Saffron City Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106450.60155606992!2d73.11181283995874!3d33.49397682977461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfebbe487dc843%3A0x6b63d76b1f237efb!2sRawat%2C%20Rawalpindi%2C%20Punjab!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 z-10 px-4 py-2 rounded-full bg-white/95 border border-emerald-300 text-emerald-900 text-xs font-bold shadow-lg flex items-center gap-2 backdrop-blur-md">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>Sector B • Family Residential Block</span>
                </div>
              </div>

              {/* Action Buttons below location map on mobile view */}
              <div className="flex lg:hidden flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 pt-1">
                <a
                  href="https://maps.google.com/?q=Saffron+City+Rawat+Islamabad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs shadow transition-all flex items-center justify-center gap-2 text-center"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open in Google Maps</span>
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow transition-all flex items-center justify-center gap-2 text-center"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Schedule Site Visit</span>
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* 7. Master Plan Map Callout */}
        <section className="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200 shadow-xl space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">
                Full Project Map
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
                Inspect Sector B on the 4K Master Plan
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
                className="px-6 py-3.5 rounded-xl bg-white border border-slate-300 hover:border-emerald-300 text-slate-800 font-bold text-xs text-center transition-colors"
              >
                Payment Schedule
              </Link>
            </div>
          </div>
        </section>

        {/* 8. Sector B FAQs */}
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
            <FaqAccordion items={SECTOR_B_FAQS} defaultOpenIndex={0} />
          </ScrollReveal>
        </section>

        {/* 9. Booking Form Section */}
        <section id="booking" className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <WordReveal
              text="Book Your Sector B Plot Today"
              highlightWords={["Book", "Sector", "B"]}
              as="h2"
              className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading block"
            />
            <p className="text-xs sm:text-sm text-slate-600">
              Submit your inquiry directly to our official sales team to secure Sector B priority allotment.
            </p>
          </div>

          <ScrollReveal animation="zoom-in" delay={100}>
            <EnquiryForm defaultSector="Sector B" defaultPlotType="Residential" />
          </ScrollReveal>
        </section>
      </div>
    </div>
  );
}
