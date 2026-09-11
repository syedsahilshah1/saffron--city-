import React from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink, 
  FileText, 
  Building2, 
  HelpCircle, 
  Search, 
  ArrowRight,
  Download,
  Sparkles,
  Layers,
  Award,
  Check
} from "lucide-react";
import StaggerReveal from "@/components/animations/StaggerReveal";
import ScrollReveal from "@/components/animations/ScrollReveal";
import WordReveal from "@/components/animations/WordReveal";
import FaqAccordion from "@/components/ui/FaqAccordion";
import { SITE_CONFIG } from "@/data/saffron-data";

export const metadata = {
  title: "Saffron City NOC Status | Legal & Regulatory Approvals",
  description: "Saffron City NOC status and legal verification on Main GT Road Rawat. Check official legal approval status, verify on the Punjab portal, and inspect documents.",
};

const NOC_LEGAL_DOCUMENTS = [
  {
    title: "Official RDA No Objection Certificate (NOC)",
    authority: "Rawalpindi Development Authority (RDA)",
    status: "100% Approved & Issued",
    image: "/images/facilities/gated-security.jpg",
    tag: "Primary Approval",
    description: "Confirms official regulatory clearance for Saffron City covering the entire 15,000 Kanal housing scheme on Main GT Road."
  },
  {
    title: "Sanctioned Master Layout Plan (LOP)",
    authority: "Town Planning Directorate",
    status: "Approved Town Planning",
    image: "/images/saffron-city-master-plan.jpg",
    tag: "Layout Clearance",
    description: "Legally sanctioned road widths (up to 250ft), dedicated civic amenities, green belts, and plot demarcations."
  },
  {
    title: "Clear Land Ownership & Revenue Registry",
    authority: "Punjab Land Records Authority",
    status: "Verified Clear Title",
    image: "/images/about/about-hero-banner.jpg",
    tag: "Land Title",
    description: "Complete unencumbered legal title with transparent transfer and registry procedures for individual allottees."
  },
  {
    title: "Underground Infrastructure Sanctions",
    authority: "IESCO, SNGPL & WASA Guidelines",
    status: "Civic Compliance",
    image: "/images/facilities/underground-utilities.jpg",
    tag: "Utility Clearance",
    description: "Sanctioned underground utility network for zero-load shedding power grid, gas piping, and water filtration plants."
  }
];

const NOC_FAQS = [
  {
    question: "Does Saffron City fall under RDA or CDA jurisdiction?",
    answer: "Saffron City is located on Main GT Road near Rawat within Rawalpindi's territorial boundary, placing it under the complete regulatory jurisdiction of the Rawalpindi Development Authority (RDA).",
    category: "Jurisdiction"
  },
  {
    question: "What is the total land area approved under Saffron City's NOC?",
    answer: "The RDA No Objection Certificate covers the comprehensive 15,000 Kanal master-planned project area, ensuring legal protection for residential, commercial, and civic sectors.",
    category: "Approval Area"
  },
  {
    question: "How can I verify Saffron City's NOC status myself?",
    answer: "You can verify the approval directly on the official Punjab Government web portal (ptc.punjab.gov.pk or rda.gop.pk) under the approved housing societies list, or visit the RDA headquarters in Rawalpindi.",
    category: "Verification"
  },
  {
    question: "Can I legally construct a house on an RDA-approved plot?",
    answer: "Yes. Once possession is handed over in line with the payment schedule, buyers can submit their architectural maps to RDA for immediate construction approval.",
    category: "Construction"
  },
  {
    question: "Are plots eligible for bank home loans and financing?",
    answer: "Yes. Major Pakistani commercial banks and financial institutions only sanction home loans and mortgage financing for legally approved projects with valid NOC clearance like Saffron City.",
    category: "Financing"
  }
];

export default function NocStatusPage() {
  return (
    <div className="space-y-20 lg:space-y-28 pb-24 text-slate-900 bg-white">
      
      {/* Hero Banner Section with Background Image */}
      <section className="relative w-full pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/about/about-hero-banner.jpg"
            alt="Saffron City NOC Status RDA Approved"
            className="w-full h-full object-cover object-center scale-105 animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/50" />
          <div className="absolute inset-0 bg-[radial-gradient(#D4A017_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <WordReveal
            text="Saffron City NOC Status"
            highlightWords={["NOC", "Status"]}
            as="h1"
            className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading tracking-tight text-white block"
          />

          {/* Key Metrics Counter Grid */}
          <ScrollReveal animation="fade-up" delay={150}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-4">
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center space-y-1">
                <span className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono">15,000 K</span>
                <p className="text-xs text-slate-300 font-medium">Approved Area</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center space-y-1">
                <span className="text-2xl sm:text-3xl font-bold text-[#D4A017] font-mono">RDA</span>
                <p className="text-xs text-slate-300 font-medium">Regulatory Authority</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center space-y-1">
                <span className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono">100%</span>
                <p className="text-xs text-slate-300 font-medium">Clear Legal Title</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center space-y-1">
                <span className="text-2xl sm:text-3xl font-bold text-[#D4A017] font-mono">Active</span>
                <p className="text-xs text-slate-300 font-medium">Ground Construction</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={200} className="flex flex-wrap justify-center gap-4 pt-2">
            <a
              href={SITE_CONFIG.rdaVerificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-[#D4A017] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs shadow-lg hover:scale-105 transition-all flex items-center gap-2"
            >
              <span>Verify on Punjab Govt Portal</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="#legal-documents"
              className="px-6 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white font-bold text-xs shadow-lg hover:scale-105 transition-all flex items-center gap-2 backdrop-blur-md"
            >
              <FileText className="w-4 h-4 text-[#D4A017]" />
              <span>Inspect Legal Documents</span>
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 lg:space-y-28">

        {/* 1. Official Regulatory Sanctions & Legal Documents (With Real Images!) */}
        <section id="legal-documents" className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <ScrollReveal animation="fade-up">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold tracking-wide uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Documentation</span>
              </div>
            </ScrollReveal>

            <WordReveal
              text="Official Regulatory Sanctions & Documents"
              highlightWords={["Regulatory", "Sanctions", "Documents"]}
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight block"
            />

            <ScrollReveal animation="fade-up" delay={100}>
              <p className="text-sm text-slate-600 leading-relaxed">
                Saffron City fulfills all statutory town planning, environmental, and civic infrastructure criteria mandated by the government.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {NOC_LEGAL_DOCUMENTS.map((doc, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <ScrollReveal
                  key={doc.title}
                  animation={isLeft ? "fade-right" : "fade-left"}
                  delay={idx * 80}
                >
                  <div className="rounded-3xl bg-white border border-emerald-200 hover:border-emerald-500 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group flex flex-col justify-between h-full">
                    <div>
                      {/* Document Image Header */}
                      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                        <img
                          src={doc.image}
                          alt={doc.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                        <div className="absolute top-3 right-3">
                          <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-bold shadow">
                            {doc.tag}
                          </span>
                        </div>
                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <span className="text-[10px] text-emerald-300 font-bold block">{doc.authority}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 space-y-3">
                        <h4 className="font-bold text-slate-900 text-base group-hover:text-emerald-700 transition-colors">
                          {doc.title}
                        </h4>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>{doc.status}</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {doc.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        {/* 2. Step-by-Step Verification Guide */}
        <section className="p-8 sm:p-12 rounded-3xl bg-amber-50/50 border border-amber-200 space-y-8 shadow-xl">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
              How to Verify Saffron City&apos;s NOC Yourself
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Verify legal status independently on the official Punjab Government portals with 4 simple steps.
            </p>
          </div>

          <StaggerReveal
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs"
            staggerDelay={70}
            direction="up"
          >
            <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-2 hover:border-[#D4A017] transition-all">
              <span className="w-8 h-8 rounded-xl bg-amber-100 text-[#D4A017] flex items-center justify-center font-bold font-mono">1</span>
              <h5 className="font-bold text-slate-900 text-sm">Visit RDA Portal</h5>
              <p className="text-slate-600">Open your browser and navigate to <code>rda.gop.pk</code> or <code>ptc.punjab.gov.pk</code></p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-2 hover:border-[#D4A017] transition-all">
              <span className="w-8 h-8 rounded-xl bg-amber-100 text-[#D4A017] flex items-center justify-center font-bold font-mono">2</span>
              <h5 className="font-bold text-slate-900 text-sm">Approved Schemes</h5>
              <p className="text-slate-600">Navigate to the official registry of RDA Approved Housing Schemes in Rawalpindi.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-2 hover:border-[#D4A017] transition-all">
              <span className="w-8 h-8 rounded-xl bg-amber-100 text-[#D4A017] flex items-center justify-center font-bold font-mono">3</span>
              <h5 className="font-bold text-slate-900 text-sm">Search Saffron City</h5>
              <p className="text-slate-600">Search for &ldquo;Saffron City&rdquo; to review the approved 15,000 Kanal area status.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-sm space-y-2 hover:border-[#D4A017] transition-all">
              <span className="w-8 h-8 rounded-xl bg-amber-100 text-[#D4A017] flex items-center justify-center font-bold font-mono">4</span>
              <h5 className="font-bold text-slate-900 text-sm">Cross-Check Letters</h5>
              <p className="text-slate-600">Request the official signed clearance copies directly from our sales advisors.</p>
            </div>
          </StaggerReveal>
        </section>

        {/* 3. Redesigned Interactive Frequently Asked Questions */}
        <section className="space-y-8 max-w-4xl mx-auto">
          <div className="text-center space-y-3">
            <ScrollReveal animation="fade-up">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold tracking-wide uppercase">
                <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Legal Questions</span>
              </div>
            </ScrollReveal>

            <WordReveal
              text="Frequently Asked Questions on NOC Status"
              highlightWords={["Frequently", "Questions", "NOC", "Status"]}
              as="h2"
              className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight block"
            />
          </div>

          <ScrollReveal animation="fade-up" delay={100}>
            <FaqAccordion items={NOC_FAQS} defaultOpenIndex={0} />
          </ScrollReveal>
        </section>

      </div>
    </div>
  );
}
