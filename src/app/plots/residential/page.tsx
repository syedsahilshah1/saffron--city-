import React from "react";
import Link from "next/link";
import { 
  Home, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle,
  Sparkles,
  Award,
  Layers,
  HelpCircle,
  Zap,
  Trees
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
  return await getPageMetadata("/plots/residential");
}

const RESIDENTIAL_PLOT_CARDS = [
  {
    size: "5 Marla",
    dimensions: "25' × 45' (1,125 Sq. Ft.)",
    totalPrice: "PKR 45,00,000",
    downPayment: "PKR 4,50,000 (10%)",
    monthly: "PKR 45,000 / month",
    possession: "PKR 9,00,000 (20%)",
    image: "/images/sectors/sector-a-luxury.jpg",
    tag: "Most Popular",
    desc: "Perfect for young families and smart investors seeking maximum ROI with high liquidity in Sector A & B."
  },
  {
    size: "10 Marla",
    dimensions: "35' × 65' (2,275 Sq. Ft.)",
    totalPrice: "PKR 82,50,000",
    downPayment: "PKR 8,25,000 (10%)",
    monthly: "PKR 82,500 / month",
    possession: "PKR 16,50,000 (20%)",
    image: "/images/sectors/sector-b-residential.jpg",
    tag: "Spacious Family Living",
    desc: "Spacious luxury plots allowing for custom multi-storey villas, double car parking, and private front lawns."
  },
  {
    size: "1 Kanal",
    dimensions: "50' × 90' (4,500 Sq. Ft.)",
    totalPrice: "PKR 1,55,00,000",
    downPayment: "PKR 15,50,000 (10%)",
    monthly: "PKR 1,55,000 / month",
    possession: "PKR 31,00,000 (20%)",
    image: "/images/about/about-hero-banner.jpg",
    tag: "Executive Boulevard",
    desc: "Flagship luxury estate plots facing extra-wide 250-foot boulevards and close to the central Grand Mosque."
  }
];

export default function ResidentialPlotsPage() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
    "Hi, I am interested in booking a Residential Plot in Saffron City."
  )}`;

  return (
    <div className="space-y-20 lg:space-y-28 pb-24 text-slate-900 bg-white">
      
      {/* Hero Banner Section with Background Image */}
      <section className="relative w-full pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/sectors/sector-a-luxury.jpg"
            alt="Saffron City Residential Plots"
            className="w-full h-full object-cover object-center scale-105 animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/50" />
          <div className="absolute inset-0 bg-[radial-gradient(#D49E17_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <ScrollReveal animation="fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D49E17]/20 border border-[#D49E17]/40 text-[#D49E17] text-xs font-bold tracking-wider uppercase backdrop-blur-md">
              <Home className="w-3.5 h-3.5 text-[#D49E17]" />
              <span>RDA Approved Residential Community</span>
            </div>
          </ScrollReveal>

          <WordReveal
            text="Residential Plots for Sale: 5M, 10M & 1 Kanal"
            highlightWords={["Residential", "Plots", "Sale", "5M", "10M", "1", "Kanal"]}
            as="h1"
            className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading tracking-tight text-white block"
          />

          <ScrollReveal animation="fade-up" delay={100}>
            <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-200 font-light leading-relaxed">
              Designed for families and investors seeking secure ownership with 100% underground utilities, wide carpeted roads, and 3-year easy installment schedules.
            </p>
          </ScrollReveal>

          {/* Quick Metrics Counter */}
          <ScrollReveal animation="fade-up" delay={150}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-4">
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center space-y-1">
                <span className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono">10%</span>
                <p className="text-xs text-slate-300 font-medium">Down Payment</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center space-y-1">
                <span className="text-2xl sm:text-3xl font-bold text-[#D49E17] font-mono">3 Years</span>
                <p className="text-xs text-slate-300 font-medium">Payment Plan</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center space-y-1">
                <span className="text-2xl sm:text-3xl font-bold text-[#D49E17] font-mono">15,000 K</span>
                <p className="text-xs text-slate-300 font-medium">RDA Approved</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center space-y-1">
                <span className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono">100%</span>
                <p className="text-xs text-slate-300 font-medium">Underground Wiring</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={200} className="flex flex-wrap justify-center gap-4 pt-2">
            <a
              href="#plots"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-[#D49E17] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs shadow-lg hover:scale-105 transition-all"
            >
              Explore Available Plots
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

        {/* Residential Overview */}
        <section className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <ScrollReveal animation="fade-up">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#D49E17]" />
                <span>Modern Living</span>
              </div>
            </ScrollReveal>

            <WordReveal
              text="Residential Overview: Master Planned Community"
              highlightWords={["Residential", "Overview", "Master", "Planned"]}
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight block"
            />

            <ScrollReveal animation="fade-up" delay={100}>
              <p className="text-sm text-slate-600 leading-relaxed">
                Saffron City residential sectors are designed with international urban standards — prioritizing safety, tranquil open spaces, uninterrupted power supply, and wide carpeted roads.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScrollReveal animation="fade-right" delay={100}>
              <div className="p-6 rounded-3xl bg-amber-50/40 border border-amber-200 space-y-3 h-full">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-[#D49E17]">
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-base">Underground Electrification</h4>
                <p className="text-xs text-slate-600 leading-relaxed">Zero overhead cables and uninterrupted power grid ensure clean aesthetics and high safety.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={150}>
              <div className="p-6 rounded-3xl bg-emerald-50/40 border border-emerald-200 space-y-3 h-full">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <Trees className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-base">40% Parks &amp; Green Spaces</h4>
                <p className="text-xs text-slate-600 leading-relaxed">Every residential block features walking access to neighborhood family parks and jogging tracks.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-left" delay={200}>
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3 h-full">
                <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center text-slate-800">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-base">RDA Approved Title</h4>
                <p className="text-xs text-slate-600 leading-relaxed">100% legally clear land documentation offering complete peace of mind for buyers and overseas Pakistanis.</p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Visual Plot Cards with Images */}
        <section id="plots" className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <WordReveal
              text="Available Residential Plot Categories"
              highlightWords={["Available", "Residential", "Plot", "Categories"]}
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight block"
            />
            <p className="text-sm text-slate-600">
              Select your desired plot size to inspect exact dimensions, price breakdown, and booking requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {RESIDENTIAL_PLOT_CARDS.map((plot, idx) => (
              <ScrollReveal
                key={plot.size}
                animation={idx === 0 ? "fade-right" : idx === 1 ? "fade-up" : "fade-left"}
                delay={idx * 100}
              >
                <div className="rounded-3xl bg-white border border-amber-200 hover:border-[#D49E17] shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group flex flex-col justify-between h-full">
                  <div>
                    <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                      <img
                        src={plot.image}
                        alt={plot.size}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute top-3 right-3">
                        <span className="px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[#D49E17] border border-[#D49E17]/40 text-[10px] font-bold">
                          {plot.tag}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <span className="text-2xl font-black">{plot.size} Residential</span>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="space-y-1">
                        <p className="text-xs text-slate-500 font-mono font-medium">{plot.dimensions}</p>
                        <p className="text-2xl font-black text-[#D49E17]">{plot.totalPrice}</p>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {plot.desc}
                      </p>

                      <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                        <div className="flex justify-between py-1.5 px-2.5 rounded-lg bg-amber-50/60">
                          <span className="text-slate-600">Booking (10%):</span>
                          <strong className="text-slate-900">{plot.downPayment}</strong>
                        </div>
                        <div className="flex justify-between py-1.5 px-2.5 font-mono">
                          <span className="text-slate-600">Monthly (×30):</span>
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
                      href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
                        `Hi, I want to book a ${plot.size} Residential Plot in Saffron City.`
                      )}`}
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
                      Full Payment Breakdown
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Pricing Schedule Table */}
        <section className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
              Official 3-Year Installment Schedule
            </h3>
            <p className="text-xs text-slate-600">
              Transparent payment structure with fixed installments and zero hidden charges.
            </p>
          </div>
          
          <ScrollReveal animation="fade-up" delay={100}>
            <div className="overflow-x-auto rounded-3xl border border-amber-200 bg-white shadow-xl">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-amber-50 text-amber-900 uppercase text-[11px] font-bold border-b border-amber-200">
                  <tr>
                    <th className="py-4 px-5">Plot Size</th>
                    <th className="py-4 px-5">Total Price</th>
                    <th className="py-4 px-5">Booking (10%)</th>
                    <th className="py-4 px-5">Allocation (10%)</th>
                    <th className="py-4 px-5">Monthly (×30)</th>
                    <th className="py-4 px-5">Bi-Annual (×6)</th>
                    <th className="py-4 px-5">Possession (20%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {RESIDENTIAL_PRICES.map((p) => (
                    <tr key={p.size} className="hover:bg-amber-50/50 transition-colors">
                      <td className="py-4 px-5 font-bold text-slate-900 text-sm">{p.size}</td>
                      <td className="py-4 px-5 font-bold text-[#D49E17]">{p.totalPriceFormatted}</td>
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
              text="Book Your Residential Plot Today"
              highlightWords={["Book", "Residential", "Plot"]}
              as="h2"
              className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading block"
            />
            <p className="text-xs sm:text-sm text-slate-600">
              Submit your inquiry to reserve your preferred plot size with priority allotment.
            </p>
          </div>

          <ScrollReveal animation="zoom-in" delay={100}>
            <EnquiryForm defaultPlotType="Residential" />
          </ScrollReveal>
        </section>
      </div>
    </div>
  );
}
