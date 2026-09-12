import React from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Mail, 
  Phone, 
  MapPin, 
  Lock, 
  Eye, 
  FileText, 
  Users, 
  CheckCircle2, 
  ExternalLink 
} from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import WordReveal from "@/components/animations/WordReveal";
import { SITE_CONFIG } from "@/data/saffron-data";

import { getPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return await getPageMetadata("/privacy-policy");
}

const PRIVACY_SECTIONS = [
  {
    icon: Users,
    title: "1. Who We Are",
    content: (
      <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
        <p>
          Saffron City is a premier residential and commercial master-planned development by Saadullah Khan &amp; Brothers (SKB Group), located on Main GT Road, Rawat, Islamabad/Rawalpindi.
        </p>
        <p>
          For any privacy or data inquiries, reach our official desk at <strong>{SITE_CONFIG.email}</strong> or call <strong>{SITE_CONFIG.phone}</strong>.
        </p>
      </div>
    )
  },
  {
    icon: Eye,
    title: "2. Information We Collect",
    content: (
      <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
        <p>We collect personal information solely to facilitate verified real estate consultation:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Direct Inquiries:</strong> Full name, WhatsApp/phone number, email address, and preferred plot size when you submit an enquiry form.</li>
          <li><strong>Usage Analytics:</strong> Standard non-identifying telemetry (browser type, device screen size, referring page) to optimize site speed and performance.</li>
        </ul>
        <p className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-950 font-medium mt-2">
          Note: We never solicit credit card or bank credentials directly on this website. All financial bookings are executed via official banking challans.
        </p>
      </div>
    )
  },
  {
    icon: FileText,
    title: "3. How We Use Your Information",
    content: (
      <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
        <p>Your details are used exclusively for legitimate business communication:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Delivering requested plot pricing schedules, brochures, and payment breakdowns.</li>
          <li>Connecting you with our official on-site sales facilitation desk.</li>
          <li>Providing RDA NOC updates, balloting notices, and construction progress reports.</li>
          <li>Fulfilling legal and municipal regulatory compliance under Pakistani law.</li>
        </ul>
      </div>
    )
  },
  {
    icon: Lock,
    title: "4. Data Security & Confidentiality",
    content: (
      <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
        <p>
          We enforce 256-bit SSL encryption across all web traffic. We strictly do not sell, lease, or distribute your contact records to third-party telemarketers or external advertising networks.
        </p>
      </div>
    )
  },
  {
    icon: ShieldCheck,
    title: "5. Your Rights & Choices",
    content: (
      <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
        <p>
          You retain full authority over your personal records. You may request access, modification, or complete deletion of your contact data from our active records at any time by emailing <code>{SITE_CONFIG.email}</code>.
        </p>
      </div>
    )
  }
];

export default function PrivacyPolicyPage() {
  return (
    <div className="space-y-16 lg:space-y-24 pb-24 text-slate-900 bg-white">
      
      {/* Hero Banner Section with Background Image */}
      <section className="relative w-full pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/about/about-hero-banner.webp"
            alt="Saffron City Privacy Policy"
            className="w-full h-full object-cover object-center scale-105 animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/50" />
          <div className="absolute inset-0 bg-[radial-gradient(#D49E17_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <ScrollReveal animation="fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D49E17]/20 border border-[#D49E17]/40 text-[#D49E17] text-xs font-bold tracking-wider uppercase backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-[#D49E17]" />
              <span>Legal &amp; Data Transparency</span>
            </div>
          </ScrollReveal>

          <WordReveal
            text="Privacy Policy & Terms of Data Usage"
            highlightWords={["Privacy", "Policy", "Data", "Usage"]}
            as="h1"
            className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading tracking-tight text-white block"
          />

          <ScrollReveal animation="fade-up" delay={100}>
            <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-200 font-light leading-relaxed">
              We respect your privacy and are committed to safeguarding the personal information you share when inquiring about plots in Saffron City.
            </p>
          </ScrollReveal>

          <div className="text-xs text-amber-300 font-mono font-medium">
            Effective Date: 2026 • Saffron City (SKB Group)
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Intro Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-amber-50/50 border border-amber-200 shadow-sm space-y-3">
          <h2 className="text-lg font-bold text-slate-900 font-heading">
            Our Commitment to Transparency
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            This Privacy Policy describes the policies and practices of Saffron City regarding the collection, use, and disclosure of your personal information when you use our website. We ensure your details remain confidential and protected at all times.
          </p>
        </div>

        {/* Policy Section Cards */}
        <div className="space-y-6">
          {PRIVACY_SECTIONS.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <ScrollReveal
                key={sec.title}
                animation={idx % 2 === 0 ? "fade-right" : "fade-left"}
                delay={idx * 60}
              >
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-amber-200/80 hover:border-[#D49E17] shadow-md hover:shadow-xl transition-all duration-300 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#D49E17] shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 font-heading">
                      {sec.title}
                    </h3>
                  </div>
                  {sec.content}
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Contact Us Box */}
        <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-4">
          <h3 className="text-lg font-bold font-heading text-white flex items-center gap-2">
            <Mail className="w-5 h-5 text-[#D49E17]" />
            <span>Contact Our Privacy Officer</span>
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            If you have questions about our data handling or wish to update your records, please contact us directly:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 space-y-1">
              <span className="text-slate-400 block font-medium">Email:</span>
              <strong className="text-amber-300 font-mono">{SITE_CONFIG.email}</strong>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 space-y-1">
              <span className="text-slate-400 block font-medium">Phone / WhatsApp:</span>
              <strong className="text-white font-mono">{SITE_CONFIG.phone}</strong>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 space-y-1">
              <span className="text-slate-400 block font-medium">Site Office:</span>
              <strong className="text-white">{SITE_CONFIG.address}</strong>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
