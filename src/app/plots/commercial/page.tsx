import React from "react";
import Link from "next/link";
import { 
  Building2, 
  TrendingUp, 
  ShieldCheck, 
  MapPin, 
  CheckCircle2, 
  MessageCircle, 
  ArrowRight, 
  Download,
  Sparkles,
  Award,
  Zap,
  Layers,
  Car
} from "lucide-react";
import StaggerReveal from "@/components/animations/StaggerReveal";
import ScrollReveal from "@/components/animations/ScrollReveal";
import WordReveal from "@/components/animations/WordReveal";
import EnquiryForm from "@/components/forms/EnquiryForm";
import FaqAccordion from "@/components/ui/FaqAccordion";
import { COMMERCIAL_PRICES, SITE_CONFIG } from "@/data/saffron-data";

export const metadata = {
  title: "Saffron City Commercial Plots | GT Road Frontage & Signature 30×40",
  description: "Invest in high-footfall commercial plots on Main GT Road (N-5 Highway). Signature 30×40 (5.33 Marla), 4 Marla and 8 Marla commercial plots in Saffron City on easy 3-year installments.",
};

const COMMERCIAL_PLOT_CARDS = [
  {
    size: "Signature Commercial (5.33 Marla)",
    dimensions: "30' × 40' Prime Size",
    totalPrice: "PKR 1,55,00,000",
    discountBadge: "PKR 45 Lac Discount Applied",
    downPayment: "PKR 35,00,000",
    monthly: "PKR 2,50,000 / month",
    possession: "PKR 30,00,000",
    image: "/images/sectors/commercial-plaza.jpg",
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
    image: "/images/amenities/amenity_boulevard.jpg",
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
    image: "/images/about/about-hero-banner.jpg",
    tag: "Flagship Corporate Plaza",
    desc: "Suited for mega supermarkets, healthcare facilities, shopping complexes, and multinational franchise outlets.",
    whatsappText: "Hi, I am interested in the 8 Marla Mega Commercial Plot in Saffron City."
  }
];

export default function CommercialPlotsPage() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
    "Hi, I am interested in booking a Commercial Plot in Saffron City."
  )}`;

  return (
    <div className="space-y-20 lg:space-y-28 pb-24 text-slate-900 bg-white">
      
      {/* Hero Banner Section with Background Image */}
      <section className="relative w-full pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/sectors/commercial-plaza.jpg"
            alt="Saffron City Commercial Plazas"
            className="w-full h-full object-cover object-center scale-105 animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/50" />
          <div className="absolute inset-0 bg-[radial-gradient(#D4A017_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <ScrollReveal animation="fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4A017]/20 border border-[#D4A017]/40 text-[#D4A017] text-xs font-bold tracking-wider uppercase backdrop-blur-md">
              <Building2 className="w-3.5 h-3.5 text-[#D4A017]" />
              <span>Prime Highway Commercial Zone</span>
            </div>
          </ScrollReveal>

          <WordReveal
            text="Commercial Plots for Sale: High Footfall & High Yield"
            highlightWords={["Commercial", "Plots", "Sale", "Footfall", "Yield"]}
            as="h1"
            className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading tracking-tight text-white block"
          />

          <ScrollReveal animation="fade-up" delay={100}>
            <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-200 font-light leading-relaxed">
              Positioned directly along Main GT Road (N-5 Highway) with dedicated customer parking, multistory building permission, and exceptional rental returns.
            </p>
          </ScrollReveal>

          {/* Quick Metrics Counter */}
          <ScrollReveal animation="fade-up" delay={150}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-4">
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center space-y-1">
                <span className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono">PKR 45 L</span>
                <p className="text-xs text-slate-300 font-medium">Launch Discount</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center space-y-1">
                <span className="text-2xl sm:text-3xl font-bold text-[#D4A017] font-mono">0 Min</span>
                <p className="text-xs text-slate-300 font-medium">GT Road Visibility</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center space-y-1">
                <span className="text-2xl sm:text-3xl font-bold text-[#D4A017] font-mono">3 Years</span>
                <p className="text-xs text-slate-300 font-medium">Payment Plan</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center space-y-1">
                <span className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono">100%</span>
                <p className="text-xs text-slate-300 font-medium">RDA Approved</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={200} className="flex flex-wrap justify-center gap-4 pt-2">
            <a
              href="#commercial-inventory"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-[#D4A017] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs shadow-lg hover:scale-105 transition-all"
            >
              Explore Commercial Plots
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

        {/* Commercial Overview */}
        <section className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <ScrollReveal animation="fade-up">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#D4A017]" />
                <span>Commercial Advantage</span>
              </div>
            </ScrollReveal>

            <WordReveal
              text="Commercial Overview: The Business Hub of Rawat"
              highlightWords={["Commercial", "Overview", "Business", "Hub"]}
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight block"
            />

            <ScrollReveal animation="fade-up" delay={100}>
              <p className="text-sm text-slate-600 leading-relaxed">
                Engineered to capture immense transit footfall along the twin cities highway corridor with multi-level construction allowances and dedicated customer parking.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScrollReveal animation="fade-right" delay={100}>
              <div className="p-6 rounded-3xl bg-amber-50/40 border border-amber-200 space-y-3 h-full">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-[#D4A017]">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-base">Unbeatable Highway Exposure</h4>
                <p className="text-xs text-slate-600 leading-relaxed">Direct visual presence on the National Highway ensuring maximum daily brand awareness and customer foot traffic.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={150}>
              <div className="p-6 rounded-3xl bg-emerald-50/40 border border-emerald-200 space-y-3 h-full">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <Car className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-base">Spacious Dedicated Parking</h4>
                <p className="text-xs text-slate-600 leading-relaxed">Engineered with expansive parking lots to prevent street congestion and offer seamless retail visits.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-left" delay={200}>
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3 h-full">
                <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center text-slate-800">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-base">High Rental Appreciation</h4>
                <p className="text-xs text-slate-600 leading-relaxed">RDA approved commercial title ensuring swift tenant leasing to banks, supermarket chains, and corporate brands.</p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Visual Commercial Plot Cards with Images */}
        <section id="commercial-inventory" className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <WordReveal
              text="Commercial Plots for Sale"
              highlightWords={["Commercial", "Plots", "Sale"]}
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight block"
            />
            <p className="text-sm text-slate-600">
              Choose your commercial plot size with structured 3-year installments and special discount pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {COMMERCIAL_PLOT_CARDS.map((plot, idx) => (
              <ScrollReveal
                key={plot.size}
                animation={idx === 0 ? "fade-right" : idx === 1 ? "fade-up" : "fade-left"}
                delay={idx * 100}
              >
                <div className="rounded-3xl bg-white border border-amber-200 hover:border-[#D4A017] shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group flex flex-col justify-between h-full">
                  <div>
                    <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                      <img
                        src={plot.image}
                        alt={plot.size}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute top-3 right-3">
                        <span className="px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[#D4A017] border border-[#D4A017]/40 text-[10px] font-bold">
                          {plot.tag}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <span className="text-xl font-black">{plot.size}</span>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="space-y-1">
                        <div className="inline-block px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          {plot.discountBadge}
                        </div>
                        <p className="text-xs text-slate-500 font-mono font-medium">{plot.dimensions}</p>
                        <p className="text-2xl font-black text-[#D4A017]">{plot.totalPrice}</p>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {plot.desc}
                      </p>

                      <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                        <div className="flex justify-between py-1.5 px-2.5 rounded-lg bg-amber-50/60">
                          <span className="text-slate-600">Down Payment:</span>
                          <strong className="text-slate-900">{plot.downPayment}</strong>
                        </div>
                        <div className="flex justify-between py-1.5 px-2.5 font-mono">
                          <span className="text-slate-600">Monthly Installment:</span>
                          <strong className="text-slate-900">{plot.monthly}</strong>
                        </div>
                        <div className="flex justify-between py-1.5 px-2.5">
                          <span className="text-slate-600">On Possession:</span>
                          <strong className="text-emerald-700 font-bold">{plot.possession}</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 space-y-2">
                    <a
                      href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(plot.whatsappText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs text-center flex items-center justify-center gap-2 shadow transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Inquire on WhatsApp</span>
                    </a>
                    <Link
                      href="/payment-plan"
                      className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs text-center block transition-colors"
                    >
                      Full Commercial Plan
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Commercial Schedule Table */}
        <section className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
              Commercial Pricing &amp; Installment Schedule
            </h3>
            <p className="text-xs text-slate-600">
              Verified 3-year commercial installment schedules with transparent payment stages.
            </p>
          </div>
          
          <ScrollReveal animation="fade-up" delay={100}>
            <div className="overflow-x-auto rounded-3xl border border-amber-200 bg-white shadow-xl">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-amber-50 text-amber-900 uppercase text-[11px] font-bold border-b border-amber-200">
                  <tr>
                    <th className="py-4 px-5">Size</th>
                    <th className="py-4 px-5">Total / Net Price</th>
                    <th className="py-4 px-5">Down Payment</th>
                    <th className="py-4 px-5">Allocation</th>
                    <th className="py-4 px-5">Monthly (×30/36)</th>
                    <th className="py-4 px-5">Bi-Annual (×6)</th>
                    <th className="py-4 px-5">Possession</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {COMMERCIAL_PRICES.map((p) => (
                    <tr key={p.size} className="hover:bg-amber-50/50 transition-colors">
                      <td className="py-4 px-5 font-bold text-slate-900 text-sm">{p.size}</td>
                      <td className="py-4 px-5 font-bold text-[#D4A017]">{p.totalPriceFormatted}</td>
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

        {/* Booking Form */}
        <section className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <WordReveal
              text="Reserve Your Commercial Plot"
              highlightWords={["Reserve", "Commercial", "Plot"]}
              as="h2"
              className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading block"
            />
            <p className="text-xs sm:text-sm text-slate-600">
              Submit your booking request to receive prime commercial frontage plot options.
            </p>
          </div>

          <ScrollReveal animation="zoom-in" delay={100}>
            <EnquiryForm defaultPlotSize="Signature Commercial (5.33 Marla)" defaultPlotType="Commercial" defaultSector="Signature Commercial" />
          </ScrollReveal>
        </section>
      </div>
    </div>
  );
}
