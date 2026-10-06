import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  Building2,
  ShieldCheck,
  MapPin,
  MessageCircle,
  ArrowRight,
  Ruler,
  CheckCircle2,
  TrendingUp,
  Download,
  Home,
  Phone,
  Mail,
  ExternalLink,
  FileText,
  Calendar,
  Tag,
  Hash,
  Banknote,
  Clock,
  Users,
  Award,
  Globe,
  ChevronRight,
  Share2,
  Bookmark,
  Copy,
  Check
} from "lucide-react";
import { SITE_CONFIG } from "@/data/saffron-data";
import ScrollReveal from "@/components/animations/ScrollReveal";
import WordReveal from "@/components/animations/WordReveal";
import StaggerReveal from "@/components/animations/StaggerReveal";
import FaqAccordion from "@/components/home/FaqAccordion";
import NocApprovalSection from "@/components/home/NocApprovalSection";
import EnquiryForm from "@/components/forms/EnquiryForm";
import DownloadButtonWithLeadModal from "@/components/ui/DownloadButtonWithLeadModal";
import { db } from "@/lib/db";
import { getPageMetadata } from "@/lib/seo";

interface PlotDetailPageProps {
  params: Promise<{ id: string }>;
}

function formatPricePKR(amount: number): string {
  if (amount >= 10000000) {
    const crore = amount / 10000000;
    return `PKR ${crore % 1 === 0 ? crore.toFixed(0) : crore.toFixed(2)} Crore`;
  }
  if (amount >= 100000) {
    const lac = amount / 100000;
    return `PKR ${lac % 1 === 0 ? lac.toFixed(0) : lac.toFixed(1)} Lac`;
  }
  return `PKR ${amount.toLocaleString()}`;
}

function formatNumberWithCommas(num: number): string {
  return num.toLocaleString("en-PK");
}

export async function generateMetadata({ params }: PlotDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const plot = await db.getPlotById(id);
  const settings = await db.getSettings();
  const baseUrl = settings?.canonicalUrl || "https://saffroncity.org";

  if (!plot) {
    return {
      title: "Plot Not Found | Saffron City Islamabad",
      description: "The requested plot could not be found in our inventory.",
      robots: { index: false, follow: false },
    };
  }

  const title = `${plot.category} Plot ${plot.plotNumber} | ${plot.sector} | Saffron City Islamabad`;
  const description = `Book ${plot.category} plot ${plot.plotNumber} in ${plot.sector} at Saffron City Islamabad. Total price ${formatPricePKR(plot.totalPrice)}, ${plot.type} with easy 3-year installments. RDA Approved.`;
  const canonicalUrl = `${baseUrl}/plots/${plot.id}`;

  return {
    title,
    description,
    keywords: [`${plot.sector} plots`, `${plot.category} Saffron City`, plot.plotNumber, "RDA approved plots", "Islamabad real estate"],
    metadataBase: new URL(baseUrl),
    alternates: { canonical: canonicalUrl },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: settings?.siteName || "Saffron City Islamabad",
      images: [{ url: plot.image || "/images/hero-bg.webp", width: 1200, height: 630, alt: `${plot.category} Plot ${plot.plotNumber}` }],
      locale: "en_PK",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [plot.image || "/images/hero-bg.webp"],
    },
  };
}

export default async function PlotDetailPage({ params }: PlotDetailPageProps) {
  const { id } = await params;
  const [plot, settings] = await Promise.all([
    db.getPlotById(id),
    db.getSettings(),
  ]);

  if (!plot) {
    notFound();
  }

  const whatsappMessage = encodeURIComponent(
    `Hi, I want to inquire about ${plot.category} Plot ${plot.plotNumber} in ${plot.sector}, Saffron City Islamabad. Total Price: ${formatPricePKR(plot.totalPrice)}. Please share more details.`
  );
  const whatsappUrl = `https://wa.me/${settings?.whatsappPhone || SITE_CONFIG.whatsapp}?text=${whatsappMessage}`;

  const downPayment = plot.downPayment || Math.round(plot.totalPrice * 0.1);
  const monthlyInst = plot.monthlyInst || Math.round((plot.totalPrice * 0.3) / 30);
  const possession = Math.round(plot.totalPrice * 0.2);
  const biAnnual = Math.round((plot.totalPrice * 0.4) / 6);

  const featuresList = plot.features
    ? plot.features.split(",").map((f) => f.trim()).filter(Boolean)
    : ["100% Underground Utilities", "RDA Approved Layout", "30-Month Installment Plan", "Gated Community Access"];

  const similarPlots = await db.getPlots();
  const relatedPlots = similarPlots
    .filter((p) => p.id !== plot.id && (p.sector === plot.sector || p.type === plot.type))
    .slice(0, 3);

  const baseUrl = settings?.canonicalUrl || "https://saffroncity.org";
  const shareUrl = `${baseUrl}/plots/${plot.id}`;

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24 overflow-hidden border-b border-amber-200/60 bg-slate-950">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src={plot.image || settings?.heroBgImage || "/images/hero-bg.webp"}
            alt={`${plot.category} Plot ${plot.plotNumber} - ${plot.sector}`}
            title={`${plot.category} Plot ${plot.plotNumber} - ${plot.sector}`}
            fill
            priority
            quality={85}
            sizes="100vw"
            className="object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950/90" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#D49E17]/20 border border-[#D49E17]/40 text-[#D49E17] text-xs font-bold tracking-wider uppercase backdrop-blur-md">
                  <Tag className="w-3.5 h-3.5" />
                  <span>{plot.status === "Available" ? "Open for Booking" : plot.status}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold tracking-wider uppercase backdrop-blur-md">
                  <Hash className="w-3.5 h-3.5" />
                  <span>{plot.plotNumber}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold tracking-wider uppercase backdrop-blur-md">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{plot.type}</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-white tracking-tight leading-[1.15]">
                {plot.category} Plot <span className="text-[#D49E17]">{plot.plotNumber}</span>
              </h1>

              <div className="flex items-center gap-2 text-amber-200">
                <MapPin className="w-4 h-4 text-[#D49E17]" />
                <span className="text-sm sm:text-base font-medium">{plot.sector} &middot; Saffron City Islamabad</span>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                Premium {plot.type.toLowerCase()} investment opportunity on Main GT Road Rawat. {plot.category} with {plot.status === "Available" ? "immediate booking available" : "limited availability"} and flexible 3-year installment plans.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Inquire Now</span>
              </a>
              <Link
                href="/plot-for-sale"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm backdrop-blur-md transition-all"
              >
                <ArrowRight className="w-4 h-4" />
                <span>Full Inventory</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Pricing Breakdown */}
            <ScrollReveal animation="fade-up">
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-amber-200/80 shadow-xl space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">Pricing Breakdown</h2>
                  <span className="text-3xl sm:text-4xl font-black font-mono text-[#D49E17]">
                    {formatPricePKR(plot.totalPrice)}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <Banknote className="w-3.5 h-3.5 text-[#D49E17]" />
                      <span>Total Price</span>
                    </div>
                    <p className="text-lg font-bold text-slate-900 font-mono">{formatPricePKR(plot.totalPrice)}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <ArrowRight className="w-3.5 h-3.5 text-[#D49E17]" />
                      <span>Booking (10%)</span>
                    </div>
                    <p className="text-lg font-bold text-slate-900 font-mono">{formatPricePKR(downPayment)}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <Calendar className="w-3.5 h-3.5 text-[#D49E17]" />
                      <span>Monthly Installment</span>
                    </div>
                    <p className="text-lg font-bold text-slate-900 font-mono">{formatPricePKR(monthlyInst)}/mo</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>On Possession (20%)</span>
                    </div>
                    <p className="text-lg font-bold text-slate-900 font-mono">{formatPricePKR(possession)}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <Clock className="w-3.5 h-3.5 text-[#D49E17]" />
                      <span>6 Bi-Annual Installments</span>
                    </div>
                    <p className="text-lg font-bold text-slate-900 font-mono">{formatPricePKR(biAnnual)}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Payment Duration</span>
                    </div>
                    <p className="text-lg font-bold text-slate-900">3 Years (30 Months)</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Plot Features */}
            <ScrollReveal animation="fade-up">
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-amber-200/80 shadow-xl space-y-5">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">Plot Features & Highlights</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {featuresList.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-amber-50/60 border border-amber-100">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      </div>
                      <span className="text-sm font-medium text-slate-800">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Why Choose Saffron City */}
            <ScrollReveal animation="fade-up">
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-50 via-white to-amber-50 border border-amber-200 shadow-xl space-y-5">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">Why Invest in Saffron City?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: ShieldCheck, title: "RDA Approved", desc: "Full 15,000 Kanal NOC from Rawalpindi Development Authority" },
                    { icon: Award, title: "70+ Years Legacy", desc: "Developed by SKB Group with decades of infrastructure excellence" },
                    { icon: MapPin, title: "Prime Location", desc: "Main GT Road Rawat, 2 mins from Rawalpindi Ring Road interchange" },
                    { icon: Globe, title: "Overseas Friendly", desc: "Dedicated support for overseas Pakistanis with remote booking" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-amber-100">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-[#D49E17]" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                        <p className="text-xs text-slate-600 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Related Plots */}
            {relatedPlots.length > 0 && (
              <ScrollReveal animation="fade-up">
                <div className="space-y-6">
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">Similar Plots You May Like</h2>
                  <StaggerReveal
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    staggerDelay={70}
                    direction="up"
                  >
                    {relatedPlots.map((rp) => (
                      <Link
                        key={rp.id}
                        href={`/plots/${rp.id}`}
                        className="group rounded-3xl bg-white border border-amber-200 hover:border-[#D49E17] shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                      >
                        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                          <Image
                            src={rp.image || "/images/sectors/sector-a-luxury.webp"}
                            alt={`${rp.category} ${rp.plotNumber} - ${rp.sector}`}
                            title={`${rp.category} ${rp.plotNumber} - ${rp.sector}`}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                            <span className="text-sm font-bold drop-shadow">{formatPricePKR(rp.totalPrice)}</span>
                            <span className="text-[10px] font-bold text-amber-300">{rp.status}</span>
                          </div>
                        </div>
                        <div className="p-4 space-y-1.5 flex-1">
                          <h3 className="text-sm font-bold text-slate-900 truncate">{rp.plotNumber} &middot; {rp.sector}</h3>
                          <p className="text-xs text-slate-600">{rp.type} &middot; {rp.category}</p>
                        </div>
                      </Link>
                    ))}
                  </StaggerReveal>
                </div>
              </ScrollReveal>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Plot Summary Card */}
            <ScrollReveal animation="fade-up" className="p-6 rounded-3xl bg-white border border-amber-200/80 shadow-xl space-y-5">
              <div className="space-y-3">
                <h3 className="text-lg font-serif font-bold text-slate-900">Plot Summary</h3>
                <div className="space-y-2.5">
                  {[
                    { label: "Plot Number", value: plot.plotNumber, icon: Hash },
                    { label: "Sector", value: plot.sector, icon: MapPin },
                    { label: "Category", value: plot.category, icon: Tag },
                    { label: "Type", value: plot.type, icon: Home },
                    { label: "Status", value: plot.status, icon: CheckCircle2 },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                      <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                        <item.icon className="w-3.5 h-3.5 text-[#D49E17]" />
                        {item.label}
                      </span>
                      <span className="text-xs font-bold text-slate-900 text-right max-w-[140px] truncate">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 space-y-2.5">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm text-center flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Book on WhatsApp</span>
                </a>
                <Link
                  href="/plot-for-sale"
                  className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm text-center flex items-center justify-center gap-2 transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>View All Plots</span>
                </Link>
              </div>
            </ScrollReveal>

            {/* Quick Actions */}
            <ScrollReveal animation="fade-up" className="p-6 rounded-3xl bg-white border border-amber-200/80 shadow-xl space-y-4">
              <h3 className="text-lg font-serif font-bold text-slate-900">Quick Actions</h3>
              <div className="space-y-2.5">
                <a
                  href={`tel:${settings?.contactPhone || SITE_CONFIG.phone}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 border border-amber-200 hover:bg-amber-100 text-sm font-medium text-slate-800 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#D49E17]" />
                  <span>Call Sales Office</span>
                </a>
                <a
                  href={`mailto:${settings?.officialEmail || SITE_CONFIG.email}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 border border-amber-200 hover:bg-amber-100 text-sm font-medium text-slate-800 transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#D49E17]" />
                  <span>Email Inquiry</span>
                </a>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(shareUrl);
                  }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 border border-amber-200 hover:bg-amber-100 text-sm font-medium text-slate-800 transition-colors w-full text-left"
                >
                  <Share2 className="w-4 h-4 text-[#D49E17]" />
                  <span>Copy Plot Link</span>
                </button>
              </div>
            </ScrollReveal>

            {/* Download Brochure */}
            <ScrollReveal animation="fade-up">
              <DownloadButtonWithLeadModal
                downloadUrl={settings?.masterPlanPdf || SITE_CONFIG.masterPlanPdf}
                downloadFileName="Saffron-City-Master-Plan.pdf"
                documentTitle="Saffron City Master Plan"
                documentType="Master Plan"
                buttonText="Download Brochure"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-[#D49E17] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              />
            </ScrollReveal>
          </div>
        </div>

        {/* Inquiry Form Section */}
        <section className="mt-16 lg:mt-24">
          <ScrollReveal animation="fade-up" className="max-w-3xl mx-auto">
            <EnquiryForm
              title={`Inquire about Plot ${plot.plotNumber}`}
              plotDetails={`${plot.sector} - ${plot.category} (${plot.type}) - ${formatPricePKR(plot.totalPrice)}`}
            />
          </ScrollReveal>
        </section>
      </div>
    </div>
  );
}
