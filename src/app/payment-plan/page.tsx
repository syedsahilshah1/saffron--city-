import React from "react";
import Link from "next/link";
import { 
  CreditCard, 
  Download, 
  MessageCircle, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  Calculator,
  ShieldCheck,
  Building2,
  Clock,
  Sparkles,
  HelpCircle,
  Banknote,
  Percent,
  Calendar
} from "lucide-react";
import StaggerReveal from "@/components/animations/StaggerReveal";
import ScrollReveal from "@/components/animations/ScrollReveal";
import WordReveal from "@/components/animations/WordReveal";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import InstallmentCalculator from "@/components/calculator/InstallmentCalculator";
import FaqAccordion from "@/components/ui/FaqAccordion";
import DownloadButtonWithLeadModal from "@/components/ui/DownloadButtonWithLeadModal";
import { RESIDENTIAL_PRICES, COMMERCIAL_PRICES, SITE_CONFIG } from "@/data/saffron-data";

import { getPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return await getPageMetadata("/payment-plan");
}

const PAYMENT_PLAN_FAQS = [
  {
    question: "What is the down payment to book a plot in Saffron City?",
    answer: "Booking starts at just 10% of the total plot price. An additional 10% allocation payment is made upon plot confirmation, making the total initial commitment 20%.",
    category: "Booking"
  },
  {
    question: "What is the installment duration and schedule?",
    answer: "The payment plan spans 3 years (36 months) with 30 easy monthly installments, 6 bi-annual installments, and a final 20% payment due upon possession.",
    category: "Installments"
  },
  {
    question: "Are commercial plots available on installments?",
    answer: "Yes. Signature Commercial plots (30×40) on Main GT Road frontage are available on a 3-year installment schedule with special launch discounts up to PKR 45 Lakh.",
    category: "Commercial"
  },
  {
    question: "What official payment methods are accepted?",
    answer: "Payments can be made via direct bank transfer, pay order / demand draft in favor of Saffron City, or through Roshan Digital Accounts / Swift transfers for overseas buyers.",
    category: "Payment Methods"
  },
  {
    question: "Are there any hidden or extra category charges?",
    answer: "Prices are for regular plots. Category plots (corner, main boulevard, park-facing) carry a standard 10% category premium. The form processing fee is Rs. 5,000.",
    category: "Charges"
  }
];

export default function PaymentPlanPage() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
    "Hi, please send me the latest official Saffron City Payment Plan brochure."
  )}`;

  return (
    <div className="space-y-20 lg:space-y-28 pb-24 text-slate-900 bg-white">
      
      {/* Hero Banner Section with Background Image */}
      <section className="relative w-full pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden text-white">
        {/* Background Hero Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/about/about-hero-banner.webp"
            alt="Saffron City Payment Plan Overview"
            className="w-full h-full object-cover object-center opacity-100 scale-105 animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/45" />
          <div className="absolute inset-0 bg-[radial-gradient(#D49E17_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <WordReveal
            text="Saffron City Payment Plan"
            highlightWords={["Payment", "Plan"]}
            as="h1"
            className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading tracking-tight text-white block"
          />

          <ScrollReveal animation="fade-up" delay={100}>
            <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-200 font-light leading-relaxed">
              Transparent, RDA-approved payment structure for Sector A, Sector B residential plots, and Main GT Road commercial blocks. Book with just 10% down payment.
            </p>
          </ScrollReveal>

          {/* Quick Metrics Counter Grid */}
          <ScrollReveal animation="fade-up" delay={150}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-4">
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center space-y-1">
                <span className="text-2xl sm:text-3xl font-bold text-[#D49E17] font-mono">10%</span>
                <p className="text-xs text-slate-300 font-medium">Easy Booking</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center space-y-1">
                <span className="text-2xl sm:text-3xl font-bold text-[#D49E17] font-mono">3 Years</span>
                <p className="text-xs text-slate-300 font-medium">Installment Period</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center space-y-1">
                <span className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono">100%</span>
                <p className="text-xs text-slate-300 font-medium">RDA Approved</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center space-y-1">
                <span className="text-2xl sm:text-3xl font-bold text-[#D49E17] font-mono">30 Months</span>
                <p className="text-xs text-slate-300 font-medium">Monthly Schedule</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={200} className="flex flex-wrap justify-center gap-4 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg hover:scale-105 transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Get Plan on WhatsApp</span>
            </a>
            <DownloadButtonWithLeadModal
              downloadUrl={SITE_CONFIG.residentialPaymentPlanImg}
              downloadFileName="Saffron-City-Official-Payment-Plan.jpg"
              documentTitle="Saffron City Payment Plan"
              documentType="Payment Plan"
              buttonText="Download Rates Flyer"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-[#D49E17] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs shadow-lg hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 lg:space-y-28">

        {/* Official Payment Plan Rate Cards (Left & Right Entrance Animations) */}
        <section className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <WordReveal
              text="Official Payment Plan Documents"
              highlightWords={["Payment", "Documents"]}
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight block"
            />

            <ScrollReveal animation="fade-up" delay={100}>
              <p className="text-sm text-slate-600">
                Published rate cards for Sector A (Block B) and GT Road Signature Commercial plots.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Residential Flyer Card: Animates in from LEFT */}
            <ScrollReveal animation="fade-right" duration={900}>
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-amber-200 hover:border-[#D49E17] shadow-xl hover:shadow-2xl transition-all duration-500 space-y-5 h-full flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-xs uppercase">
                      Sector A (Block B)
                    </span>
                    <DownloadButtonWithLeadModal
                      downloadUrl={SITE_CONFIG.residentialPaymentPlanImg}
                      downloadFileName="Saffron-City-Residential-Payment-Plan.jpg"
                      documentTitle="Residential Payment Plan (Sector A)"
                      documentType="Payment Plan"
                      iconOnly={true}
                      className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-[#D49E17] border border-amber-200 transition-colors cursor-pointer"
                    />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 font-heading">
                    Residential 5M, 10M &amp; 1 Kanal
                  </h3>

                  <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-inner group">
                    <img
                      src={SITE_CONFIG.residentialPaymentPlanImg}
                      alt="Saffron City Residential Payment Plan Sector A Block B"
                      className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs text-slate-700 space-y-2">
                  <div className="flex justify-between items-center">
                    <span>5 Marla:</span>
                    <span className="font-bold text-slate-900">Total PKR 45 Lakh (Monthly: 45k)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>10 Marla:</span>
                    <span className="font-bold text-slate-900">Total PKR 82.5 Lakh (Monthly: 82.5k)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>1 Kanal:</span>
                    <span className="font-bold text-[#D49E17]">Total PKR 1.55 Crore (Monthly: 1.55 Lac)</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Commercial Flyer Card: Animates in from RIGHT */}
            <ScrollReveal animation="fade-left" delay={150} duration={900}>
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-amber-200 hover:border-[#D49E17] shadow-xl hover:shadow-2xl transition-all duration-500 space-y-5 h-full flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-[#D49E17] text-slate-950 font-bold text-xs uppercase">
                      Signature Commercial
                    </span>
                    <DownloadButtonWithLeadModal
                      downloadUrl={SITE_CONFIG.commercialPaymentPlanImg}
                      downloadFileName="Saffron-City-Commercial-Payment-Plan.jpg"
                      documentTitle="Signature Commercial Payment Plan"
                      documentType="Payment Plan"
                      iconOnly={true}
                      className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-[#D49E17] border border-amber-200 transition-colors cursor-pointer"
                    />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 font-heading">
                    GT Road Signature Commercial (30×40)
                  </h3>

                  <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-inner group">
                    <img
                      src={SITE_CONFIG.commercialPaymentPlanImg}
                      alt="Saffron City Signature Commercial Payment Plan"
                      className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs text-slate-700 space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Total / Net Price:</span>
                    <span className="font-bold text-[#D49E17]">PKR 1.55 Crore (Discounted)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Down Payment:</span>
                    <span className="font-bold text-slate-900">PKR 35 Lakh</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Monthly Installment:</span>
                    <span className="font-bold text-slate-900">PKR 250,000 / Month</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Residential Pricing Table */}
        <section className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <WordReveal
              text="Residential Payment Schedule"
              highlightWords={["Residential", "Schedule"]}
              as="h2"
              className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight block"
            />
            <p className="text-sm text-slate-600">
              Official 3-year structured installment details for 5 Marla, 10 Marla, and 1 Kanal plots.
            </p>
          </div>

          <ScrollReveal animation="fade-up" delay={100}>
            {/* 1. Mobile Cards View (Hidden on md and up) */}
            <div className="block md:hidden space-y-3">
              {RESIDENTIAL_PRICES.map((p) => (
                <div
                  key={`mob-res-plan-${p.size}`}
                  className="rounded-2xl border border-amber-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-amber-100">
                    <div>
                      <span className="text-base font-bold text-slate-900 font-heading block">
                        {p.size}
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-600">
                        {p.sector || "Sector A (Block B)"}
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
                      <span className="text-[10px] text-slate-500 font-medium block">Monthly × 30</span>
                      <span className="font-bold text-slate-800 font-mono text-[11px]">{p.monthlyInstallmentFormatted}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] text-slate-500 font-medium block">Bi-Annual × 6</span>
                      <span className="font-bold text-slate-800 font-mono text-[11px]">{p.biAnnualInstallmentFormatted}</span>
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-500 font-medium">On Possession (20%):</span>
                    <span className="font-bold text-slate-900">{p.possessionAmountFormatted}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* 2. Desktop Full Table View (Hidden on mobile) */}
            <div className="hidden md:block overflow-x-auto rounded-3xl border border-amber-200 bg-white shadow-xl">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-amber-50 text-amber-900 uppercase tracking-wider font-bold text-[11px] border-b border-amber-200">
                  <tr>
                    <th className="py-4 px-5">Plot Size</th>
                    <th className="py-4 px-5">Total Price</th>
                    <th className="py-4 px-5">Booking (10%)</th>
                    <th className="py-4 px-5">Allocation (10%)</th>
                    <th className="py-4 px-5">Monthly × 30</th>
                    <th className="py-4 px-5">Bi-Annual × 6</th>
                    <th className="py-4 px-5">On Possession (20%)</th>
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
                      <td className="py-4 px-5 font-bold text-slate-900">{p.possessionAmountFormatted}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </section>

        {/* Commercial Pricing Table */}
        <section className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <WordReveal
              text="Commercial Payment Schedule"
              highlightWords={["Commercial", "Schedule"]}
              as="h2"
              className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight block"
            />
            <p className="text-sm text-slate-600">
              High-return commercial options directly located on Main GT Road (N-5 Highway).
            </p>
          </div>

          <ScrollReveal animation="fade-up" delay={100}>
            {/* 1. Mobile Cards View (Hidden on md and up) */}
            <div className="block md:hidden space-y-3">
              {COMMERCIAL_PRICES.map((p) => (
                <div
                  key={`mob-comm-plan-${p.size}`}
                  className="rounded-2xl border border-amber-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-amber-100">
                    <div>
                      <span className="text-base font-bold text-slate-900 font-heading block">
                        {p.size}
                      </span>
                      <span className="text-[10px] font-semibold text-amber-700">
                        {p.sector || "Commercial Block"}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        NET / TOTAL PRICE
                      </span>
                      <span className="text-base font-bold text-[#D49E17] font-heading">
                        {p.totalPriceFormatted}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-3 text-xs">
                    <div className="p-2 rounded-xl bg-amber-50/60 border border-amber-100">
                      <span className="text-[10px] text-amber-900/80 font-medium block">Down Payment</span>
                      <span className="font-bold text-slate-800 text-[11px]">{p.bookingAmountFormatted}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] text-slate-500 font-medium block">Allocation</span>
                      <span className="font-bold text-slate-800 text-[11px]">{p.allocationAmountFormatted}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] text-slate-500 font-medium block">Monthly</span>
                      <span className="font-bold text-slate-800 font-mono text-[11px]">{p.monthlyInstallmentFormatted}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] text-slate-500 font-medium block">Bi-Annual</span>
                      <span className="font-bold text-slate-800 font-mono text-[11px]">{p.biAnnualInstallmentFormatted}</span>
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-500 font-medium">On Possession:</span>
                    <span className="font-bold text-slate-900">{p.possessionAmountFormatted}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* 2. Desktop Full Table View (Hidden on mobile) */}
            <div className="hidden md:block overflow-x-auto rounded-3xl border border-amber-200 bg-white shadow-xl">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-amber-50 text-amber-900 uppercase tracking-wider font-bold text-[11px] border-b border-amber-200">
                  <tr>
                    <th className="py-4 px-5">Plot Size</th>
                    <th className="py-4 px-5">Net Price</th>
                    <th className="py-4 px-5">Down Payment</th>
                    <th className="py-4 px-5">Allocation</th>
                    <th className="py-4 px-5">Monthly</th>
                    <th className="py-4 px-5">Bi-Annual</th>
                    <th className="py-4 px-5">On Possession</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {COMMERCIAL_PRICES.map((p) => (
                    <tr key={p.size} className="hover:bg-amber-50/50 transition-colors">
                      <td className="py-4 px-5 font-bold text-slate-900 text-sm">{p.size}</td>
                      <td className="py-4 px-5 font-bold text-[#D49E17]">{p.totalPriceFormatted}</td>
                      <td className="py-4 px-5">{p.bookingAmountFormatted}</td>
                      <td className="py-4 px-5">{p.allocationAmountFormatted}</td>
                      <td className="py-4 px-5 font-mono">{p.monthlyInstallmentFormatted}</td>
                      <td className="py-4 px-5 font-mono">{p.biAnnualInstallmentFormatted}</td>
                      <td className="py-4 px-5 font-bold text-slate-900">{p.possessionAmountFormatted}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </section>

        {/* Interactive Installment Calculator */}
        <section className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <WordReveal
              text="Interactive Installment Calculator"
              highlightWords={["Installment", "Calculator"]}
              as="h2"
              className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight block"
            />
            <p className="text-sm text-slate-600">
              Select any plot size to calculate down payment, monthly installments, and total budget.
            </p>
          </div>
          
          <ScrollReveal animation="fade-up" delay={100}>
            <InstallmentCalculator />
          </ScrollReveal>
        </section>

        {/* Terms & Conditions & Payment Methods (Left & Right Entrance Animations) */}
        <section className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <WordReveal
              text="Terms & Payment Methods"
              highlightWords={["Terms", "Payment"]}
              as="h2"
              className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight block"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Terms Card: Left Entrance */}
            <ScrollReveal animation="fade-right" duration={900}>
              <div className="p-6 sm:p-8 rounded-3xl bg-amber-50/50 border border-amber-200 space-y-4 shadow-xl h-full">
                <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-[#D49E17]" />
                  <span>Official Booking Terms</span>
                </h4>
                <div className="space-y-2.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D49E17] shrink-0" />
                    <span><strong>Processing Fee:</strong> Rs. 5,000/- non-refundable form fee.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D49E17] shrink-0" />
                    <span><strong>Category Premium:</strong> 10% extra for corner, boulevard, or park facing.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D49E17] shrink-0" />
                    <span><strong>Due Date:</strong> Monthly installments payable by 5th of each month.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D49E17] shrink-0" />
                    <span><strong>Plot Rates:</strong> Above prices are for general plots, exclusive of utility charges.</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Channels Card: Right Entrance */}
            <ScrollReveal animation="fade-left" delay={150} duration={900}>
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-4 h-full">
                <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Banknote className="w-5 h-5 text-emerald-600" />
                  <span>Accepted Payment Channels</span>
                </h4>
                <div className="space-y-2.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Bank Transfer:</strong> Official designated bank accounts of Saffron City.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Pay Order / Demand Draft:</strong> Issued in favor of Saffron City.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Overseas Remittances:</strong> Direct IBAN / Swift transfers with instant official e-receipt.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Site Office:</strong> Payments accepted directly at Main GT Road Rawat office.</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Payment Plan FAQs Accordion */}
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
                Clear answers regarding down payments, installment schedules, commercial booking, and overseas remittances.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal animation="fade-up" delay={150}>
            <FaqAccordion items={PAYMENT_PLAN_FAQS} defaultOpenIndex={0} />
          </ScrollReveal>
        </section>
      </div>
    </div>
  );
}


