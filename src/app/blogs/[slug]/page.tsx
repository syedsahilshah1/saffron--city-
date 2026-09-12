import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Bookmark,
  ShieldCheck,
  Building2,
  Sparkles,
  Phone,
  MessageCircle,
  CheckCircle2,
  FileDown,
  ExternalLink,
  ChevronRight,
  HelpCircle,
  Award,
  Layers,
  MapPin,
  Compass,
} from "lucide-react";
import { db } from "@/lib/db";
import { SITE_CONFIG } from "@/data/saffron-data";
import EnquiryForm from "@/components/forms/EnquiryForm";

import { ArticleSchema, BreadcrumbSchema, CustomJsonLd } from "@/components/seo/JsonLd";

export const dynamic = "force-dynamic";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const [blog, settings] = await Promise.all([
    db.getBlogBySlug(slug),
    db.getSettings(),
  ]);

  if (!blog) {
    return {
      title: "Article Not Found | Saffron City Islamabad",
    };
  }

  const baseUrl = (settings?.canonicalUrl || "https://saffroncity.org").replace(/\/$/, "");
  const canonicalUrl = blog.canonicalUrl || `${baseUrl}/blogs/${slug}`;
  const title = blog.seoTitle || `${blog.title} | Saffron City Real Estate Portal`;
  const description = blog.metaDescription || blog.excerpt;
  const image = blog.ogImage || blog.image || "/images/hero-bg.jpg";
  const fullImage = image.startsWith("http") ? image : `${baseUrl}${image}`;

  const isIndexable = blog.isPublished && blog.robotsIndex !== false;

  const keywords = [blog.focusKeyword, blog.secondaryKeywords]
    .filter(Boolean)
    .join(", ")
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);

  return {
    title,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: isIndexable,
      follow: blog.robotsFollow !== false,
      googleBot: {
        index: isIndexable,
        follow: blog.robotsFollow !== false,
        "max-image-preview": "large",
      },
    },
    openGraph: {
      title: blog.ogTitle || blog.seoTitle || blog.title,
      description: blog.ogDescription || blog.metaDescription || blog.excerpt,
      url: canonicalUrl,
      type: "article",
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: blog.imageAlt || blog.title,
        },
      ],
      publishedTime: blog.createdAt,
      modifiedTime: blog.updatedAt,
      authors: [blog.author],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.twitterTitle || blog.seoTitle || blog.title,
      description: blog.twitterDescription || blog.metaDescription || blog.excerpt,
      images: [fullImage],
    },
  };
}

export default async function SingleBlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const [blog, settings] = await Promise.all([
    db.getBlogBySlug(slug),
    db.getSettings(),
  ]);

  if (!blog) {
    notFound();
  }

  const allBlogs = await db.getBlogs(true);
  const relatedBlogs = allBlogs.filter((b) => b.id !== blog.id).slice(0, 4);

  const baseUrl = (settings?.canonicalUrl || "https://saffroncity.org").replace(/\/$/, "");
  const pageUrl = `${baseUrl}/blogs/${blog.slug}`;
  const fullImage = (blog.image || "/images/hero-bg.jpg").startsWith("http")
    ? blog.image
    : `${baseUrl}${blog.image || "/images/hero-bg.jpg"}`;

  // Format paragraphs or parse sections
  const paragraphs = blog.content.split("\n\n").filter(Boolean);

  return (
    <main className="flex-grow bg-[#fcfaf7] min-h-screen text-slate-900 pb-20 font-sans">
      {/* Structured Data: Article & Breadcrumbs */}
      <ArticleSchema
        headline={blog.title}
        description={blog.metaDescription || blog.excerpt}
        url={pageUrl}
        image={fullImage}
        datePublished={blog.createdAt}
        dateModified={blog.updatedAt}
        authorName={blog.author}
        publisherName={settings?.siteName || "Saffron City Islamabad"}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Blogs & Insights", url: "/blogs" },
          { name: blog.title, url: `/blogs/${blog.slug}` },
        ]}
      />
      <CustomJsonLd jsonString={blog.customSchema} />

      {/* 1. Header Banner / Hero inspired by Faisal Hills style */}
      <section className="bg-gradient-to-r from-[#1a1109] via-[#2c1c0e] to-[#120803] text-white pt-28 sm:pt-36 lg:pt-40 pb-12 sm:pb-16 relative border-b border-amber-900/30">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400/90">
            <Link
              href="/"
              className="hover:text-white transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-amber-400/50" />
            <Link
              href="/blogs"
              className="hover:text-white transition-colors"
            >
              Blogs &amp; Insights
            </Link>
            <ChevronRight className="w-3 h-3 text-amber-400/50" />
            <span className="text-amber-200 truncate max-w-[200px] sm:max-w-md">
              {blog.title}
            </span>
          </div>

          <div className="pt-2">
            <span className="text-[10px] sm:text-xs font-bold text-[#fed65b] tracking-[0.2em] uppercase bg-white/10 border border-amber-400/30 px-3.5 py-1 rounded-full inline-block backdrop-blur-md">
              {blog.category || "Market Insight"}
            </span>
          </div>

          <h1 className="font-serif font-black text-2xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight max-w-5xl">
            {blog.h1Heading || blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs text-slate-300 font-medium">
            <span className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-[10px]">
                {blog.author.charAt(0)}
              </div>
              <span>By {blog.author}</span>
            </span>
            <span className="hidden sm:inline w-1 h-1 bg-amber-400/40 rounded-full"></span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </span>
            <span className="hidden sm:inline w-1 h-1 bg-amber-400/40 rounded-full"></span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{blog.readTime || "4 min read"}</span>
            </span>
            <span className="hidden sm:inline w-1 h-1 bg-amber-400/40 rounded-full"></span>
            <span className="flex items-center gap-1.5 text-emerald-300 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-md text-[11px] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>RDA NOC Verified</span>
            </span>
          </div>
        </div>
      </section>

      {/* 2. Main Content Grid (8 Cols Article, 4 Cols Sticky Sidebar) */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Article Body */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white p-5 sm:p-8 md:p-10 rounded-3xl border border-slate-200/90 shadow-sm space-y-6 sm:space-y-8">
            {/* Featured Image */}
            <div className="h-64 sm:h-[420px] rounded-2xl overflow-hidden shadow-sm bg-slate-900 shrink-0 relative group">
              <img
                src={blog.image || "/images/hero-bg.jpg"}
                alt={blog.imageAlt || blog.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Quick Key Takeaways Box */}
            <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/70 border border-amber-200/90 space-y-3">
              <div className="flex items-center gap-2 text-amber-950 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span className="uppercase tracking-wider font-mono text-xs">
                  Executive Summary &amp; Key Takeaways
                </span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed italic border-l-2 border-amber-500 pl-3">
                {blog.excerpt}
              </p>
            </div>

            {/* Article Body Content */}
            <div className="prose prose-slate max-w-none text-sm sm:text-base text-slate-800 leading-relaxed space-y-5">
              {paragraphs.map((p, idx) => {
                // If line looks like a sub-heading (short and doesn't end with period or starts with Step/Phase)
                const isHeading =
                  (p.length < 80 && !p.endsWith(".") && !p.endsWith(",")) ||
                  p.startsWith("Step ") ||
                  p.startsWith("Phase ") ||
                  p.startsWith("Overview") ||
                  p.startsWith("Why ");

                if (isHeading) {
                  return (
                    <h2
                      key={idx}
                      className="font-serif font-bold text-xl sm:text-2xl text-slate-950 pt-4 pb-1 border-b border-amber-100 flex items-center gap-2.5"
                    >
                      <span className="w-2 h-6 bg-[#D49E17] rounded-full inline-block shrink-0" />
                      <span>{p}</span>
                    </h2>
                  );
                }

                return (
                  <p key={idx} className="text-slate-700 leading-relaxed text-justify sm:text-left">
                    {p}
                  </p>
                );
              })}
            </div>

            {/* Actionable Project Highlights Table / Badges */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-600" />
                <span>Saffron City Verified Project Snapshot</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="text-slate-500 block text-[10px]">Legal Clearance</span>
                    <strong className="text-slate-900">RDA NOC Approved (15,000 Kanal)</strong>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200">
                  <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                  <div>
                    <span className="text-slate-500 block text-[10px]">Prime Location</span>
                    <strong className="text-slate-900">Main GT Road Rawat / Islamabad</strong>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200">
                  <Building2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <div>
                    <span className="text-slate-500 block text-[10px]">Plot Categories</span>
                    <strong className="text-slate-900">5M, 10M, 1 Kanal &amp; Commercial Plazas</strong>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200">
                  <Layers className="w-4 h-4 text-amber-600 shrink-0" />
                  <div>
                    <span className="text-slate-500 block text-[10px]">Payment Ease</span>
                    <strong className="text-slate-900">10% Down Payment &bull; 30 Installments</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Author Profile Footer */}
            <div className="p-6 rounded-2xl bg-[#fbf8f3] border border-amber-200/80 flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
              <div className="w-14 h-14 rounded-2xl bg-[#D49E17] text-white flex items-center justify-center font-serif font-black text-xl shadow-md shrink-0">
                {blog.author.charAt(0)}
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span className="font-bold text-slate-900 text-sm">{blog.author}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full">
                    Official Advisory Desk
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Senior Real Estate &amp; Regulatory Specialist covering RDA master planned developments, property ownership laws, and overseas Pakistani investment security.
                </p>
              </div>
            </div>

            {/* Social Share & Direct Connect */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <Share2 className="w-4 h-4 text-amber-600" />
                <span>Share this article:</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                    blog.title + " - Saffron City Islamabad: "
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition shadow-sm"
                >
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>


        {/* Right Column: Sticky Sidebar with Consultation Form & Recent Articles */}
        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          {/* Quick Direct Consultation Card */}
          <div className="bg-white rounded-3xl border border-amber-300 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#1c110a] via-[#352010] to-[#120803] p-5 text-white space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#fed65b] block">
                Direct Booking Desk
              </span>
              <h3 className="font-serif font-bold text-lg leading-snug">
                Book a Free Site Tour or File Consultation
              </h3>
              <p className="text-xs text-slate-300">
                Official RDA approved inventory on 30-month easy plans.
              </p>
            </div>

            <div className="p-5 sm:p-6 space-y-4">
              {/* Direct Call & WhatsApp Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:03331113551"
                  className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-slate-900 hover:bg-black text-amber-400 font-bold text-xs transition border border-amber-500/30"
                >
                  <Phone className="w-3.5 h-3.5 text-[#fed65b]" />
                  <span>Call Now</span>
                </a>
                <a
                  href="https://wa.me/923331113551?text=Hello%2C%20I%20am%20interested%20in%20Saffron%20City%20plots."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <EnquiryForm className="p-0 border-0 shadow-none bg-transparent" />
              </div>
            </div>
          </div>

          {/* Project NOC & Location Summary Card */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-[#D49E17]" />
              </div>
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900">
                  NOC Status &amp; Legal Protection
                </h4>
                <span className="text-[11px] text-emerald-600 font-semibold">
                  100% Approved by RDA
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Saffron City Islamabad holds complete No Objection Certificate (NOC) approvals across the full 15,000 Kanal master planned land bank.
            </p>

            <Link
              href="/noc-status"
              className="inline-flex items-center justify-between w-full p-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 font-bold text-xs transition group"
            >
              <span>Verify RDA NOC Status</span>
              <ExternalLink className="w-3.5 h-3.5 text-amber-700 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Recent / Trending Articles */}
          {relatedBlogs.length > 0 && (
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-widest flex items-center gap-2 pb-2 border-b border-slate-100">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Trending Insights</span>
              </h4>

              <div className="space-y-3">
                {relatedBlogs.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/blogs/${rel.slug}`}
                    className="flex gap-3 p-2.5 rounded-2xl hover:bg-amber-50/70 border border-transparent hover:border-amber-200 transition group"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                      <img
                        src={rel.image || "/images/hero-bg.jpg"}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="min-w-0 flex-1 space-y-1">
                      <span className="text-[9px] font-bold text-[#D49E17] uppercase tracking-wider block">
                        {rel.category}
                      </span>
                      <h5 className="font-bold text-slate-900 text-xs group-hover:text-amber-800 transition line-clamp-2 leading-snug">
                        {rel.title}
                      </h5>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </section>
    </main>
  );
}
