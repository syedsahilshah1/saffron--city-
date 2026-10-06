"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Image as ImageIcon,
  Save,
  Plus,
  Trash2,
  HelpCircle,
  ExternalLink,
  Award,
  Building2,
  ShieldCheck,
  Zap,
  TrendingUp,
  FileText,
  Phone,
  Layers,
  ArrowRight,
  UserCheck
} from "lucide-react";
import { StoredSettings } from "@/lib/types";
import FileUploadField from "@/components/dashboard/FileUploadField";
import RichTextEditor from "@/components/dashboard/RichTextEditor";
import { REVIEWS } from "@/data/saffron-data";

interface HomeReviewItem {
  id: string;
  rating: number;
  quote: string;
  author: string;
  location: string;
  role?: string;
}

interface HomepageHeroCmsProps {
  settings: StoredSettings;
  updateSettingField: (field: keyof StoredSettings, value: any) => void;
  onSave: () => void;
  saving: boolean;
}

interface HomeAmenityItem {
  id: string;
  title: string;
  desc: string;
  image: string;
  tag: string;
}

interface HomeFaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

const DEFAULT_AMENITIES: HomeAmenityItem[] = [
  {
    id: "amenity-1",
    title: "250 Ft Grand Central Boulevard",
    desc: "Unobstructed multi-lane central boulevard connecting directly to Main GT Road (N-5 Highway).",
    image: "/images/amenities/amenity_boulevard.webp",
    tag: "Main Arterial"
  },
  {
    id: "amenity-2",
    title: "100% Subterranean Power Grid",
    desc: "Underground electrical wiring, optical fiber, and natural gas lines ensuring safe, clutter-free streets.",
    image: "/images/facilities/underground-utilities.webp",
    tag: "Underground Grid"
  },
  {
    id: "amenity-3",
    title: "Lush Themed Parks & Lakes",
    desc: "Over 45% land allocated to green belts, family amusement parks, jogging trails, and water bodies.",
    image: "/images/amenities/amenity_park.webp",
    tag: "45% Greenery"
  },
  {
    id: "amenity-4",
    title: "Grand Architectural Central Mosque",
    desc: "Iconic central mosque designed with contemporary Islamic architecture and spacious prayer halls.",
    image: "/images/amenities/amenity_mosque.webp",
    tag: "Spiritual Landmark"
  },
  {
    id: "amenity-5",
    title: "Smart 24/7 Gated Security",
    desc: "High-definition CCTV surveillance, automated license plate recognition, and security patrols.",
    image: "/images/facilities/gated-security.webp",
    tag: "Gated Security"
  },
  {
    id: "amenity-6",
    title: "Advanced RO Water Filtration",
    desc: "Dedicated reverse osmosis water treatment plants providing clean, tested drinking water.",
    image: "/images/facilities/water-filtration.webp",
    tag: "Clean Water"
  }
];

const DEFAULT_FAQS: HomeFaqItem[] = [
  {
    id: "faq-1",
    question: "Where is Saffron City located in Islamabad / Rawalpindi?",
    answer: "Saffron City is prime-positioned directly on Main GT Road near Rawat, offering seamless access to Islamabad Expressway, T-Chowk, Giga Mall, and the upcoming Rawalpindi Ring Road.",
    category: "Location"
  },
  {
    id: "faq-2",
    question: "Is Saffron City an RDA-approved housing project?",
    answer: "Yes. Saffron City holds an authentic No Objection Certificate (NOC) granted by the Rawalpindi Development Authority (RDA) covering the complete 15,000 Kanal master scheme.",
    category: "NOC & Legal"
  },
  {
    id: "faq-3",
    question: "Who is the master developer behind Saffron City?",
    answer: "Saffron City is developed by SKB Builders (Saadullah Khan & Brothers) — a premier civil engineering powerhouse with a 70+ year legacy of delivering mega bridges, highways, and infrastructure across Pakistan and the Middle East.",
    category: "Developer"
  },
  {
    id: "faq-4",
    question: "What installment plans are available for residential plots?",
    answer: "Residential plots are offered on flexible 3-year installment plans with an easy 10% down payment, 30 affordable monthly installments, and possession payments upon completion.",
    category: "Payment Plans"
  }
];

export default function HomepageHeroCms({
  settings,
  updateSettingField,
  onSave,
  saving
}: HomepageHeroCmsProps) {
  // Parse 4 Stats
  const defaultStats = {
    stat1: "70+",
    stat1Label: "Years SKB Legacy",
    stat2: "15,000 Kanal",
    stat2Label: "Master Community Expanse",
    stat3: "100%",
    stat3Label: "RDA NOC Approved",
    stat4: "250 Ft",
    stat4Label: "Main Central Boulevard"
  };

  const getStats = () => {
    if (!settings.homeStatsJson) return defaultStats;
    try {
      const parsed = JSON.parse(settings.homeStatsJson);
      return { ...defaultStats, ...parsed };
    } catch {
      return defaultStats;
    }
  };

  const stats = getStats();

  const handleStatChange = (key: string, value: string) => {
    const updated = { ...stats, [key]: value };
    updateSettingField("homeStatsJson", JSON.stringify(updated));
  };

  // Parse Amenities
  const getAmenities = (): HomeAmenityItem[] => {
    if (!settings.homeAmenitiesJson) return DEFAULT_AMENITIES;
    try {
      const parsed = JSON.parse(settings.homeAmenitiesJson);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_AMENITIES;
    } catch {
      return DEFAULT_AMENITIES;
    }
  };

  const [amenities, setAmenities] = useState<HomeAmenityItem[]>(getAmenities());

  const handleAmenityChange = (index: number, field: keyof HomeAmenityItem, value: string) => {
    const updated = [...amenities];
    updated[index] = { ...updated[index], [field]: value };
    setAmenities(updated);
    updateSettingField("homeAmenitiesJson", JSON.stringify(updated));
  };

  const handleAddAmenity = () => {
    const newItem: HomeAmenityItem = {
      id: `amenity-${Date.now()}`,
      title: "New Master Amenity",
      desc: "Detailed description of community lifestyle feature.",
      image: "/images/amenities/amenity_boulevard.webp",
      tag: "World-Class"
    };
    const updated = [...amenities, newItem];
    setAmenities(updated);
    updateSettingField("homeAmenitiesJson", JSON.stringify(updated));
  };

  const handleRemoveAmenity = (index: number) => {
    const updated = amenities.filter((_, i) => i !== index);
    setAmenities(updated);
    updateSettingField("homeAmenitiesJson", JSON.stringify(updated));
  };

  // Parse FAQs
  const getFaqs = (): HomeFaqItem[] => {
    if (!settings.homeFaqsJson) return DEFAULT_FAQS;
    try {
      const parsed = JSON.parse(settings.homeFaqsJson);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_FAQS;
    } catch {
      return DEFAULT_FAQS;
    }
  };

  const [faqs, setFaqs] = useState<HomeFaqItem[]>(getFaqs());

  const handleFaqChange = (index: number, field: keyof HomeFaqItem, value: string) => {
    const updated = [...faqs];
    updated[index] = { ...updated[index], [field]: value };
    setFaqs(updated);
    updateSettingField("homeFaqsJson", JSON.stringify(updated));
  };

  const handleAddFaq = () => {
    const newFaq: HomeFaqItem = {
      id: `faq-${Date.now()}`,
      question: "New Homepage Question?",
      answer: "Authoritative response for potential buyers.",
      category: "General"
    };
    const updated = [...faqs, newFaq];
    setFaqs(updated);
    updateSettingField("homeFaqsJson", JSON.stringify(updated));
  };

  const handleRemoveFaq = (index: number) => {
    const updated = faqs.filter((_, i) => i !== index);
    setFaqs(updated);
    updateSettingField("homeFaqsJson", JSON.stringify(updated));
  };

  // Parse Reviews
  const getReviews = (): HomeReviewItem[] => {
    if (!settings.homeReviewsJson) return REVIEWS as HomeReviewItem[];
    try {
      const parsed = JSON.parse(settings.homeReviewsJson);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : REVIEWS as HomeReviewItem[];
    } catch {
      return REVIEWS as HomeReviewItem[];
    }
  };

  const [reviews, setReviews] = useState<HomeReviewItem[]>(getReviews());

  const handleReviewChange = (index: number, field: keyof HomeReviewItem, value: string | number) => {
    const updated = [...reviews];
    updated[index] = { ...updated[index], [field]: value };
    setReviews(updated);
    updateSettingField("homeReviewsJson", JSON.stringify(updated));
  };

  const handleAddReview = () => {
    const newReview: HomeReviewItem = {
      id: `review-${Date.now()}`,
      rating: 5,
      quote: "Amazing society with great potential.",
      author: "New Buyer",
      location: "Islamabad",
      role: "Investor"
    };
    const updated = [...reviews, newReview];
    setReviews(updated);
    updateSettingField("homeReviewsJson", JSON.stringify(updated));
  };

  const handleRemoveReview = (index: number) => {
    const updated = reviews.filter((_, i) => i !== index);
    setReviews(updated);
    updateSettingField("homeReviewsJson", JSON.stringify(updated));
  };

  return (
    <div className="bg-white border border-amber-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-10">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#D49E17] shadow-sm">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 font-heading text-xl">
              Homepage &amp; Hero CMS
            </h3>
            <p className="text-xs text-slate-500">
              Customize main hero banner, headline highlights, 4 stat counters, chairman story, amenities cards with photos, and FAQs.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Live Homepage</span>
          </a>
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-[#D49E17] hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-md hover:scale-105 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving Changes..." : "Save Homepage"}</span>
          </button>
        </div>
      </div>

      {/* 1. HERO BANNER & MAIN HEADLINE */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <ImageIcon className="w-5 h-5 text-[#D49E17]" />
          <h4 className="font-bold text-slate-900 text-base font-heading">
            1. Hero Banner, Headline &amp; Highlighted Text
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Hero Title Prefix</label>
            <input
              type="text"
              placeholder="Invest in Premium Living at"
              value={settings.heroTitle || ""}
              onChange={(e) => updateSettingField("heroTitle", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Highlighted Gold Word</label>
            <input
              type="text"
              placeholder="Saffron City"
              value={settings.heroHighlightedWord || ""}
              onChange={(e) => updateSettingField("heroHighlightedWord", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-[#D49E17]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="font-bold text-slate-700 block mb-1">Hero Subtitle</label>
            <input
              type="text"
              placeholder="RDA-Approved Luxury Housing on Main GT Road Rawat backed by 70+ Years SKB Legacy."
              value={settings.heroSubtitle || ""}
              onChange={(e) => updateSettingField("heroSubtitle", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Hero Button Text</label>
            <input
              type="text"
              placeholder="Book Your Plot"
              value={settings.heroButtonText || ""}
              onChange={(e) => updateSettingField("heroButtonText", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Hero Master Plan PDF Link</label>
            <input
              type="text"
              placeholder="/brochure.pdf"
              value={settings.masterPlanPdf || ""}
              onChange={(e) => updateSettingField("masterPlanPdf", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono"
            />
          </div>

          <div className="sm:col-span-2">
            <FileUploadField
              label="Hero Full-Screen Background Image (1920x1080 HD)"
              currentValue={settings.heroBgImage || "/images/hero-bg.webp"}
              onUploadSuccess={(url) => updateSettingField("heroBgImage", url)}
            />
          </div>

          {/* 4 Stat Metrics */}
          <div className="sm:col-span-2 p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-4">
            <span className="font-bold text-slate-900 text-sm block">
              4 Quick Metric Counters
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-2">
                <label className="font-bold text-slate-600 block text-[11px]">Stat 1 (Legacy)</label>
                <input
                  type="text"
                  value={stats.stat1}
                  onChange={(e) => handleStatChange("stat1", e.target.value)}
                  placeholder="70+"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 font-bold text-[#D49E17]"
                />
                <input
                  type="text"
                  value={stats.stat1Label}
                  onChange={(e) => handleStatChange("stat1Label", e.target.value)}
                  placeholder="Years SKB Legacy"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600"
                />
              </div>

              <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-2">
                <label className="font-bold text-slate-600 block text-[11px]">Stat 2 (Expanse)</label>
                <input
                  type="text"
                  value={stats.stat2}
                  onChange={(e) => handleStatChange("stat2", e.target.value)}
                  placeholder="15,000 Kanal"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 font-bold"
                />
                <input
                  type="text"
                  value={stats.stat2Label}
                  onChange={(e) => handleStatChange("stat2Label", e.target.value)}
                  placeholder="Master Community Expanse"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600"
                />
              </div>

              <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-2">
                <label className="font-bold text-slate-600 block text-[11px]">Stat 3 (RDA Approval)</label>
                <input
                  type="text"
                  value={stats.stat3}
                  onChange={(e) => handleStatChange("stat3", e.target.value)}
                  placeholder="100%"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 font-bold text-emerald-600"
                />
                <input
                  type="text"
                  value={stats.stat3Label}
                  onChange={(e) => handleStatChange("stat3Label", e.target.value)}
                  placeholder="RDA NOC Approved"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600"
                />
              </div>

              <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-2">
                <label className="font-bold text-slate-600 block text-[11px]">Stat 4 (Boulevard)</label>
                <input
                  type="text"
                  value={stats.stat4}
                  onChange={(e) => handleStatChange("stat4", e.target.value)}
                  placeholder="250 Ft"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 font-bold text-[#D49E17]"
                />
                <input
                  type="text"
                  value={stats.stat4Label}
                  onChange={(e) => handleStatChange("stat4Label", e.target.value)}
                  placeholder="Main Central Boulevard"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CHAIRMAN & LEADERSHIP STORY SECTION */}
      <div className="space-y-6 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <UserCheck className="w-5 h-5 text-blue-600" />
          <h4 className="font-bold text-slate-900 text-base font-heading">
            2. Chairman &amp; Developer Legacy Section
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Top Eyebrow Heading</label>
            <input
              type="text"
              placeholder="Leadership Vision &amp; Pedigree"
              value={settings.chairmanHeadingTop || ""}
              onChange={(e) => updateSettingField("chairmanHeadingTop", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Main Heading</label>
            <input
              type="text"
              placeholder="Guided by Decades of Engineering Excellence"
              value={settings.chairmanHeadingMain || ""}
              onChange={(e) => updateSettingField("chairmanHeadingMain", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-900"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Chairman Name</label>
            <input
              type="text"
              placeholder="Malik Tariq Awan"
              value={settings.chairmanName || ""}
              onChange={(e) => updateSettingField("chairmanName", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Designation</label>
            <input
              type="text"
              placeholder="Chairman & Founder — Saffron City"
              value={settings.chairmanTitle || ""}
              onChange={(e) => updateSettingField("chairmanTitle", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#D49E17] font-bold"
            />
          </div>

          <div className="sm:col-span-2">
            <FileUploadField
              label="Chairman Portrait Photo"
              currentValue={settings.chairmanPortrait || "/images/chairman-portrait.webp"}
              onUploadSuccess={(url) => updateSettingField("chairmanPortrait", url)}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="font-bold text-slate-700 block mb-1">
              Chairman Bio &amp; Vision (Select text to add Internal &amp; External SEO Links)
            </label>
            <RichTextEditor
              value={
                settings.chairmanBioFull ||
                `<p>With over seven decades of landmark mega infrastructure engineering delivered across Pakistan, Dubai, and Saudi Arabia under SKB Group, Saffron City represents our defining commitment to urban living.</p><p>We are creating a 100% legally approved, environmentally conscious master city that will stand as a generational asset for families and forward-looking investors.</p>`
              }
              onChange={(html) => updateSettingField("chairmanBioFull", html)}
            />
          </div>
        </div>
      </div>

      {/* 3. WORLD-CLASS AMENITIES & FACILITIES (CARDS WITH INDIVIDUAL PHOTOS) */}
      <div className="space-y-6 pt-4 border-t border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#D49E17]" />
            <div>
              <h4 className="font-bold text-slate-900 text-base font-heading">
                3. World-Class Community Amenities (Cards with Photos)
              </h4>
              <p className="text-xs text-slate-500">
                Manage Boulevard, Underground Power Grid, Themed Parks, Grand Mosque, Smart Security, and Water Filtration.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddAmenity}
            className="px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs border border-amber-300 transition flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Amenity Card</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {amenities.map((item, idx) => (
            <div
              key={item.id || idx}
              className="p-5 rounded-3xl bg-slate-50 border border-slate-200 hover:border-amber-300 transition-all space-y-3 relative group"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-[11px] font-mono">
                  Amenity #{idx + 1}
                </span>

                <button
                  type="button"
                  onClick={() => handleRemoveAmenity(idx)}
                  className="p-1 text-rose-500 hover:bg-rose-50 rounded transition"
                  title="Remove Amenity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <FileUploadField
                  label={`Amenity #${idx + 1} Photo`}
                  currentValue={item.image}
                  onUploadSuccess={(url) => handleAmenityChange(idx, "image", url)}
                />

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Title</label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleAmenityChange(idx, "title", e.target.value)}
                      placeholder="e.g. 250 Ft Grand Boulevard"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-bold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Tag Badge</label>
                    <input
                      type="text"
                      value={item.tag}
                      onChange={(e) => handleAmenityChange(idx, "tag", e.target.value)}
                      placeholder="e.g. Main Arterial"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-bold text-[#D49E17]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={item.desc}
                    onChange={(e) => handleAmenityChange(idx, "desc", e.target.value)}
                    placeholder="Description..."
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 leading-relaxed"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. HOMEPAGE FAQS ACCORDION CMS */}
      <div className="space-y-6 pt-4 border-t border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            <div>
              <h4 className="font-bold text-slate-900 text-base font-heading">
                4. Homepage FAQs Accordion CMS
              </h4>
              <p className="text-xs text-slate-500">
                Frequently asked questions on society location, NOC legality, developer history, and installments.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddFaq}
            className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 font-bold text-xs border border-blue-300 transition flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add FAQ</span>
          </button>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={faq.id || idx}
              className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition space-y-3"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-800 font-mono font-bold text-xs">
                  FAQ #{idx + 1}
                </span>

                <button
                  type="button"
                  onClick={() => handleRemoveFaq(idx)}
                  className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                  title="Remove FAQ"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">Question</label>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => handleFaqChange(idx, "question", e.target.value)}
                    placeholder="Question..."
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category Tag</label>
                  <input
                    type="text"
                    value={faq.category || ""}
                    onChange={(e) => handleFaqChange(idx, "category", e.target.value)}
                    placeholder="e.g. Location / Legal"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="font-bold text-slate-700 block mb-1">Answer</label>
                  <textarea
                    rows={3}
                    value={faq.answer}
                    onChange={(e) => handleFaqChange(idx, "answer", e.target.value)}
                    placeholder="Detailed response..."
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 leading-relaxed"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Editor Block */}
      <div className="pt-10 border-t border-slate-100 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-[#D49E17]" />
              Buyer Reviews (What Buyers Are Saying)
            </h4>
            <p className="text-sm text-slate-500">
              Manage the testimonials shown on the homepage.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddReview}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Review
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev, idx) => (
            <div key={rev.id || idx} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-slate-500 text-xs uppercase tracking-wider">
                  Review #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveReview(idx)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Author Name</label>
                  <input
                    type="text"
                    value={rev.author}
                    onChange={(e) => handleReviewChange(idx, "author", e.target.value)}
                    placeholder="e.g. Ahmed Khan"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Location</label>
                  <input
                    type="text"
                    value={rev.location}
                    onChange={(e) => handleReviewChange(idx, "location", e.target.value)}
                    placeholder="e.g. Rawalpindi"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Role/Tag</label>
                  <input
                    type="text"
                    value={rev.role || ""}
                    onChange={(e) => handleReviewChange(idx, "role", e.target.value)}
                    placeholder="e.g. Verified Buyer"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Rating (1-5)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={rev.rating || 5}
                    onChange={(e) => handleReviewChange(idx, "rating", parseInt(e.target.value) || 5)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">Quote</label>
                  <textarea
                    rows={2}
                    value={rev.quote}
                    onChange={(e) => handleReviewChange(idx, "quote", e.target.value)}
                    placeholder="Great location..."
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button Footer */}
      <div className="flex justify-end pt-6 border-t border-slate-100">
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-[#D49E17] hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-lg hover:scale-105 transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Saving Changes..." : "Save Homepage & Hero"}</span>
        </button>
      </div>
    </div>
  );
}
