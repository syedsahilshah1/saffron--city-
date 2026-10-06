"use client";

import React, { useState } from "react";
import {
  Building2,
  TrendingUp,
  Save,
  Plus,
  Trash2,
  HelpCircle,
  ExternalLink,
  Car,
  Compass,
  Zap,
  ShieldCheck,
  Truck,
  Sparkles,
  MapPin,
  DollarSign,
  Phone,
  Layers,
  ArrowRight,
  FileText
} from "lucide-react";
import { StoredSettings } from "@/lib/types";
import FileUploadField from "@/components/dashboard/FileUploadField";
import RichTextEditor from "@/components/dashboard/RichTextEditor";

interface CommercialPlotsCmsProps {
  settings: StoredSettings;
  updateSettingField: (field: keyof StoredSettings, value: any) => void;
  onSave: () => void;
  saving: boolean;
}

interface CommercialAmenityItem {
  id: string;
  title: string;
  desc: string;
  image: string;
}

interface CommercialLandmarkItem {
  id: string;
  name: string;
  time: string;
  distance: string;
  image: string;
}

interface CommercialPlotCardItem {
  id: string;
  size: string;
  dimensions: string;
  totalPrice: string;
  discountBadge: string;
  downPayment: string;
  monthly: string;
  possession: string;
  image: string;
  tag: string;
  desc: string;
  whatsappText: string;
}

interface CommercialReasonItem {
  id: string;
  title: string;
  tag: string;
  desc: string;
  image: string;
}

interface CommercialPricingRow {
  id: string;
  size: string;
  dimensions: string;
  totalPriceFormatted: string;
  bookingAmountFormatted: string;
  monthlyInstallmentFormatted: string;
  possessionAmountFormatted: string;
}

interface CommercialFaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

const DEFAULT_AMENITIES: CommercialAmenityItem[] = [
  {
    id: "amenity-1",
    title: "Direct GT Road Frontage",
    desc: "Unbeatable visibility to over 100,000 daily vehicles traversing between Islamabad, Rawalpindi, and Punjab.",
    image: "/images/amenities/amenity_boulevard.webp"
  },
  {
    id: "amenity-2",
    title: "Dedicated Customer Parking Bays",
    desc: "Engineered with spacious multi-lane customer parking areas to ensure frictionless access for retail patrons.",
    image: "/images/sectors/commercial-plaza.webp"
  },
  {
    id: "amenity-3",
    title: "Multi-Storey Commercial Permission",
    desc: "Approved building bylaws allowing multi-level retail plazas, executive offices, and rooftop restaurants.",
    image: "/images/about/about-hero-banner.webp"
  },
  {
    id: "amenity-4",
    title: "High-Capacity Power & 100% Underground Grid",
    desc: "Subterranean utility infrastructure with dedicated transformers to power high-demand commercial equipment.",
    image: "/images/facilities/underground-utilities.webp"
  },
  {
    id: "amenity-5",
    title: "24/7 Gated Business Security",
    desc: "Round-the-clock surveillance, CCTV monitoring, and dedicated security guards protecting your business assets.",
    image: "/images/facilities/gated-security.webp"
  },
  {
    id: "amenity-6",
    title: "Dedicated Loading & Logistic Bays",
    desc: "Rear loading zones designed for supermarkets, pharmacies, banks, and corporate franchises.",
    image: "/images/facilities/water-filtration.webp"
  }
];

const DEFAULT_LANDMARKS: CommercialLandmarkItem[] = [
  {
    id: "lm-1",
    name: "Main GT Road (N-5 Highway)",
    time: "Direct Access",
    distance: "Direct Frontage Exposure",
    image: "/images/amenities/amenity_boulevard.webp"
  },
  {
    id: "lm-2",
    name: "T-Chowk Rawat Commercial Hub",
    time: "5 Minutes",
    distance: "3.5 km Direct Commute",
    image: "/images/landmark_t_chowk.webp"
  },
  {
    id: "lm-3",
    name: "DHA Phase II Commercial Corridor",
    time: "10 Minutes",
    distance: "8.0 km Expressway Link",
    image: "/images/landmark_giga_mall.webp"
  },
  {
    id: "lm-4",
    name: "Rawalpindi Ring Road Interchange",
    time: "15 Minutes",
    distance: "11.0 km Direct Bypass",
    image: "/images/landmark_dha_islamabad.webp"
  }
];

const DEFAULT_PLOT_CARDS: CommercialPlotCardItem[] = [
  {
    id: "plot-1",
    size: "Signature Commercial (5.33 Marla)",
    dimensions: "30' × 40' Prime Size",
    totalPrice: "PKR 1,55,00,000",
    discountBadge: "PKR 45 Lac Discount Applied",
    downPayment: "PKR 35,00,000",
    monthly: "PKR 2,50,000 / month",
    possession: "PKR 30,00,000",
    image: "/images/sectors/commercial-plaza.webp",
    tag: "Exclusive Launch Offer",
    desc: "Located on the dedicated commercial boulevard, ideal for multi-storey retail, banks, cafes, and business offices.",
    whatsappText: "Hi, I am interested in the Signature Commercial (5.33 Marla) 30x40 Plot with PKR 45 Lac Discount."
  },
  {
    id: "plot-2",
    size: "4 Marla Commercial",
    dimensions: "30' × 30' High-Footfall",
    totalPrice: "PKR 2,20,00,000",
    discountBadge: "Main Highway Exposure",
    downPayment: "PKR 22,00,000 (10%)",
    monthly: "PKR 4,69,333 / month",
    possession: "PKR 44,00,000 (20%)",
    image: "/images/amenities/amenity_boulevard.webp",
    tag: "GT Road Frontage",
    desc: "Direct visibility to commuter traffic between Islamabad, Rawalpindi, and Rawat with customer parking.",
    whatsappText: "Hi, I am interested in the 4 Marla Commercial Plot on GT Road Frontage."
  },
  {
    id: "plot-3",
    size: "8 Marla Commercial",
    dimensions: "40' × 45' Mega Commercial",
    totalPrice: "PKR 4,20,00,000",
    discountBadge: "High Rental Multiplier",
    downPayment: "PKR 42,00,000 (10%)",
    monthly: "PKR 8,96,000 / month",
    possession: "PKR 84,00,000 (20%)",
    image: "/images/about/about-hero-banner.webp",
    tag: "Flagship Corporate Plaza",
    desc: "Suited for mega supermarkets, healthcare facilities, shopping complexes, and multinational franchise outlets.",
    whatsappText: "Hi, I am interested in the 8 Marla Mega Commercial Plot in Saffron City."
  }
];

const DEFAULT_REASONS: CommercialReasonItem[] = [
  {
    id: "reason-1",
    title: "Unbeatable Highway Exposure",
    tag: "High Footfall",
    desc: "Direct visual presence on Main GT Road ensuring continuous brand exposure and sustained customer flow.",
    image: "/images/amenities/amenity_boulevard.webp"
  },
  {
    id: "reason-2",
    title: "High Rental Appreciation & Yields",
    tag: "Maximum ROI",
    desc: "Commercial plazas command top-tier rental demand from banks, pharmacies, supermarkets, and dining brands.",
    image: "/images/sectors/commercial-plaza.webp"
  },
  {
    id: "reason-3",
    title: "Approved Multi-Storey Construction",
    tag: "Multi-Storey",
    desc: "Architecturally sanctioned bylaws allowing multiple retail floors plus executive corporate suites.",
    image: "/images/about/about-hero-banner.webp"
  },
  {
    id: "reason-4",
    title: "Flexible 3-Year Payment Terms",
    tag: "Flexible Plan",
    desc: "Structured milestone installments with transparent pricing and verified title protection.",
    image: "/images/facilities/underground-utilities.webp"
  }
];

const DEFAULT_PRICING_ROWS: CommercialPricingRow[] = [
  {
    id: "price-1",
    size: "4 Marla Commercial",
    dimensions: "30' × 30' (900 Sq. Ft.)",
    totalPriceFormatted: "PKR 22,000,000",
    bookingAmountFormatted: "PKR 2,200,000 (10%)",
    monthlyInstallmentFormatted: "PKR 469,333",
    possessionAmountFormatted: "PKR 4,400,000 (20%)"
  },
  {
    id: "price-2",
    size: "8 Marla Commercial",
    dimensions: "40' × 45' (1,800 Sq. Ft.)",
    totalPriceFormatted: "PKR 42,000,000",
    bookingAmountFormatted: "PKR 4,200,000 (10%)",
    monthlyInstallmentFormatted: "PKR 896,000",
    possessionAmountFormatted: "PKR 8,400,000 (20%)"
  },
  {
    id: "price-3",
    size: "Signature Commercial (5.33 Marla)",
    dimensions: "30' × 40' (1,200 Sq. Ft.)",
    totalPriceFormatted: "PKR 15,500,000",
    bookingAmountFormatted: "PKR 3,500,000",
    monthlyInstallmentFormatted: "PKR 250,000",
    possessionAmountFormatted: "PKR 3,000,000"
  }
];

const DEFAULT_FAQS: CommercialFaqItem[] = [
  {
    id: "faq-1",
    question: "What makes Saffron City Commercial plots high-return investments?",
    answer: "Saffron City commercial plots boast direct frontage along Main GT Road (N-5 Highway) near Rawat, capturing massive daily commuter traffic between Islamabad and Punjab. Combined with multi-storey building permissions and dedicated launch discount pricing, the rental yields and capital appreciation are unmatched.",
    category: "Investment"
  },
  {
    id: "faq-2",
    question: "What is the installment schedule for Commercial plots?",
    answer: "Commercial plots follow a convenient 3-year payment structure with a 10% down payment (or PKR 35 Lac for Signature 30x40), followed by 30 monthly installments and possession payments upon completion.",
    category: "Payment"
  },
  {
    id: "faq-3",
    question: "Are commercial plots covered under the approved master layout?",
    answer: "Yes, Saffron City holds full authentic approval covering 15,000 Kanals, including all commercial zones, layout designs, and utility infrastructure.",
    category: "Legal"
  }
];

export default function CommercialPlotsCms({
  settings,
  updateSettingField,
  onSave,
  saving
}: CommercialPlotsCmsProps) {
  // Parse 4 Stats
  const defaultStats = {
    stat1: "100,000+",
    stat1Label: "Daily Traffic",
    stat2: "Direct N-5",
    stat2Label: "GT Road Frontage",
    stat3: "Multi-Storey",
    stat3Label: "Building Approval",
    stat4: "3 Years",
    stat4Label: "Installment Plan"
  };

  const getStats = () => {
    if (!settings.commercialStatsJson) return defaultStats;
    try {
      const parsed = JSON.parse(settings.commercialStatsJson);
      return { ...defaultStats, ...parsed };
    } catch {
      return defaultStats;
    }
  };

  const stats = getStats();

  const handleStatChange = (key: string, value: string) => {
    const updated = { ...stats, [key]: value };
    updateSettingField("commercialStatsJson", JSON.stringify(updated));
  };

  // Parse Amenities
  const getAmenities = (): CommercialAmenityItem[] => {
    if (!settings.commercialAmenitiesJson) return DEFAULT_AMENITIES;
    try {
      const parsed = JSON.parse(settings.commercialAmenitiesJson);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_AMENITIES;
    } catch {
      return DEFAULT_AMENITIES;
    }
  };

  const [amenities, setAmenities] = useState<CommercialAmenityItem[]>(getAmenities());

  const handleAmenityChange = (index: number, field: keyof CommercialAmenityItem, value: string) => {
    const updated = [...amenities];
    updated[index] = { ...updated[index], [field]: value };
    setAmenities(updated);
    updateSettingField("commercialAmenitiesJson", JSON.stringify(updated));
  };

  const handleAddAmenity = () => {
    const newItem: CommercialAmenityItem = {
      id: `amenity-${Date.now()}`,
      title: "New Commercial Facility",
      desc: "Detailed description of high-capacity infrastructure for commercial patrons.",
      image: "/images/amenities/amenity_boulevard.webp"
    };
    const updated = [...amenities, newItem];
    setAmenities(updated);
    updateSettingField("commercialAmenitiesJson", JSON.stringify(updated));
  };

  const handleRemoveAmenity = (index: number) => {
    const updated = amenities.filter((_, i) => i !== index);
    setAmenities(updated);
    updateSettingField("commercialAmenitiesJson", JSON.stringify(updated));
  };

  // Parse Landmarks
  const getLandmarks = (): CommercialLandmarkItem[] => {
    if (!settings.commercialLandmarksJson) return DEFAULT_LANDMARKS;
    try {
      const parsed = JSON.parse(settings.commercialLandmarksJson);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_LANDMARKS;
    } catch {
      return DEFAULT_LANDMARKS;
    }
  };

  const [landmarks, setLandmarks] = useState<CommercialLandmarkItem[]>(getLandmarks());

  const handleLandmarkChange = (index: number, field: keyof CommercialLandmarkItem, value: string) => {
    const updated = [...landmarks];
    updated[index] = { ...updated[index], [field]: value };
    setLandmarks(updated);
    updateSettingField("commercialLandmarksJson", JSON.stringify(updated));
  };

  const handleAddLandmark = () => {
    const newItem: CommercialLandmarkItem = {
      id: `lm-${Date.now()}`,
      name: "New Commercial Route / Landmark",
      time: "10 Minutes",
      distance: "5.0 km Access",
      image: "/images/landmark_t_chowk.webp"
    };
    const updated = [...landmarks, newItem];
    setLandmarks(updated);
    updateSettingField("commercialLandmarksJson", JSON.stringify(updated));
  };

  const handleRemoveLandmark = (index: number) => {
    const updated = landmarks.filter((_, i) => i !== index);
    setLandmarks(updated);
    updateSettingField("commercialLandmarksJson", JSON.stringify(updated));
  };

  // Parse Plot Cards
  const getPlotCards = (): CommercialPlotCardItem[] => {
    if (!settings.commercialPlotsJson) return DEFAULT_PLOT_CARDS;
    try {
      const parsed = JSON.parse(settings.commercialPlotsJson);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_PLOT_CARDS;
    } catch {
      return DEFAULT_PLOT_CARDS;
    }
  };

  const [plotCards, setPlotCards] = useState<CommercialPlotCardItem[]>(getPlotCards());

  const handlePlotCardChange = (index: number, field: keyof CommercialPlotCardItem, value: string) => {
    const updated = [...plotCards];
    updated[index] = { ...updated[index], [field]: value };
    setPlotCards(updated);
    updateSettingField("commercialPlotsJson", JSON.stringify(updated));
  };

  const handleAddPlotCard = () => {
    const newItem: CommercialPlotCardItem = {
      id: `plot-${Date.now()}`,
      size: "Commercial Plaza Plot",
      dimensions: "30' × 40' Commercial",
      totalPrice: "PKR 1,80,00,000",
      discountBadge: "Prime Location",
      downPayment: "PKR 18,00,000 (10%)",
      monthly: "PKR 3,50,000 / month",
      possession: "PKR 36,00,000 (20%)",
      image: "/images/sectors/commercial-plaza.webp",
      tag: "Open for Booking",
      desc: "Prime commercial plot suited for multi-storey retail, banks, food chains, and offices.",
      whatsappText: "Hi, I am interested in booking a Commercial Plot in Saffron City."
    };
    const updated = [...plotCards, newItem];
    setPlotCards(updated);
    updateSettingField("commercialPlotsJson", JSON.stringify(updated));
  };

  const handleRemovePlotCard = (index: number) => {
    const updated = plotCards.filter((_, i) => i !== index);
    setPlotCards(updated);
    updateSettingField("commercialPlotsJson", JSON.stringify(updated));
  };

  // Parse Reasons
  const getReasons = (): CommercialReasonItem[] => {
    if (!settings.commercialWhyChooseJson) return DEFAULT_REASONS;
    try {
      const parsed = JSON.parse(settings.commercialWhyChooseJson);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_REASONS;
    } catch {
      return DEFAULT_REASONS;
    }
  };

  const [reasons, setReasons] = useState<CommercialReasonItem[]>(getReasons());

  const handleReasonChange = (index: number, field: keyof CommercialReasonItem, value: string) => {
    const updated = [...reasons];
    updated[index] = { ...updated[index], [field]: value };
    setReasons(updated);
    updateSettingField("commercialWhyChooseJson", JSON.stringify(updated));
  };

  const handleAddReason = () => {
    const newItem: CommercialReasonItem = {
      id: `reason-${Date.now()}`,
      title: "Commercial Growth Potential",
      tag: "High Returns",
      desc: "Unmatched footfall and capital growth driven by twin-city arterial traffic.",
      image: "/images/amenities/amenity_boulevard.webp"
    };
    const updated = [...reasons, newItem];
    setReasons(updated);
    updateSettingField("commercialWhyChooseJson", JSON.stringify(updated));
  };

  const handleRemoveReason = (index: number) => {
    const updated = reasons.filter((_, i) => i !== index);
    setReasons(updated);
    updateSettingField("commercialWhyChooseJson", JSON.stringify(updated));
  };

  // Parse Pricing Rows
  const getPricingRows = (): CommercialPricingRow[] => {
    if (!settings.commercialPricingJson) return DEFAULT_PRICING_ROWS;
    try {
      const parsed = JSON.parse(settings.commercialPricingJson);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_PRICING_ROWS;
    } catch {
      return DEFAULT_PRICING_ROWS;
    }
  };

  const [pricingRows, setPricingRows] = useState<CommercialPricingRow[]>(getPricingRows());

  const handlePricingRowChange = (index: number, field: keyof CommercialPricingRow, value: string) => {
    const updated = [...pricingRows];
    updated[index] = { ...updated[index], [field]: value };
    setPricingRows(updated);
    updateSettingField("commercialPricingJson", JSON.stringify(updated));
  };

  const handleAddPricingRow = () => {
    const newRow: CommercialPricingRow = {
      id: `price-${Date.now()}`,
      size: "6 Marla Commercial",
      dimensions: "35' × 40' (1,400 Sq. Ft.)",
      totalPriceFormatted: "PKR 30,000,000",
      bookingAmountFormatted: "PKR 3,000,000 (10%)",
      monthlyInstallmentFormatted: "PKR 640,000",
      possessionAmountFormatted: "PKR 6,000,000 (20%)"
    };
    const updated = [...pricingRows, newRow];
    setPricingRows(updated);
    updateSettingField("commercialPricingJson", JSON.stringify(updated));
  };

  const handleRemovePricingRow = (index: number) => {
    const updated = pricingRows.filter((_, i) => i !== index);
    setPricingRows(updated);
    updateSettingField("commercialPricingJson", JSON.stringify(updated));
  };

  // Parse FAQs
  const getFaqs = (): CommercialFaqItem[] => {
    if (!settings.commercialFaqsJson) return DEFAULT_FAQS;
    try {
      const parsed = JSON.parse(settings.commercialFaqsJson);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_FAQS;
    } catch {
      return DEFAULT_FAQS;
    }
  };

  const [faqs, setFaqs] = useState<CommercialFaqItem[]>(getFaqs());

  const handleFaqChange = (index: number, field: keyof CommercialFaqItem, value: string) => {
    const updated = [...faqs];
    updated[index] = { ...updated[index], [field]: value };
    setFaqs(updated);
    updateSettingField("commercialFaqsJson", JSON.stringify(updated));
  };

  const handleAddFaq = () => {
    const newFaq: CommercialFaqItem = {
      id: `faq-${Date.now()}`,
      question: "New Commercial Plot Question?",
      answer: "Authoritative response regarding commercial plot booking, possession, or building bylaws.",
      category: "Commercial Inquiry"
    };
    const updated = [...faqs, newFaq];
    setFaqs(updated);
    updateSettingField("commercialFaqsJson", JSON.stringify(updated));
  };

  const handleRemoveFaq = (index: number) => {
    const updated = faqs.filter((_, i) => i !== index);
    setFaqs(updated);
    updateSettingField("commercialFaqsJson", JSON.stringify(updated));
  };

  return (
    <div className="bg-white border border-amber-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-10">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#D49E17] shadow-sm">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 font-heading text-xl">
              Commercial Plots &amp; Broadway Plazas CMS
            </h3>
            <p className="text-xs text-slate-500">
              Customize commercial hero banner, 4 stat counters, overview with SEO links, facilities, landmarks, inventory cards, pricing table, and FAQs.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/plots/commercial"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Live Page</span>
          </a>
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-[#D49E17] hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-md hover:scale-105 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving Changes..." : "Save Commercial Page"}</span>
          </button>
        </div>
      </div>

      {/* 1. HERO BANNER & 4 STAT COUNTERS */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Sparkles className="w-5 h-5 text-[#D49E17]" />
          <h4 className="font-bold text-slate-900 text-base font-heading">
            1. Commercial Hero Banner &amp; 4 Stat Counters
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
          <div className="sm:col-span-2">
            <label className="font-bold text-slate-700 block mb-1">
              Hero Headline (Use &apos;|&apos; for gold highlight)
            </label>
            <input
              type="text"
              placeholder="Commercial Plots for Sale | High Footfall & High Yield"
              value={settings.commercialHeroHeading || ""}
              onChange={(e) => updateSettingField("commercialHeroHeading", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-900"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="font-bold text-slate-700 block mb-1">Hero Subtitle</label>
            <input
              type="text"
              placeholder="Positioned directly along Main GT Road (N-5 Highway) with dedicated customer parking, multistory building permission, and exceptional rental returns."
              value={settings.commercialHeroSubtitle || ""}
              onChange={(e) => updateSettingField("commercialHeroSubtitle", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800"
            />
          </div>

          <div className="sm:col-span-2">
            <FileUploadField
              label="Commercial Hero Banner Background Image (1920x1080 HD Recommended)"
              currentValue={settings.commercialHeroImage || "/images/sectors/commercial-plaza.webp"}
              onUploadSuccess={(url) => updateSettingField("commercialHeroImage", url)}
            />
          </div>

          {/* 4 Stat Metrics */}
          <div className="sm:col-span-2 p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-4">
            <span className="font-bold text-slate-900 text-sm block">
              4 Quick Metric Counters
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-2">
                <label className="font-bold text-slate-600 block text-[11px]">Stat 1 (Traffic)</label>
                <input
                  type="text"
                  value={stats.stat1}
                  onChange={(e) => handleStatChange("stat1", e.target.value)}
                  placeholder="100,000+"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 font-bold text-[#D49E17]"
                />
                <input
                  type="text"
                  value={stats.stat1Label}
                  onChange={(e) => handleStatChange("stat1Label", e.target.value)}
                  placeholder="Daily Traffic"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600"
                />
              </div>

              <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-2">
                <label className="font-bold text-slate-600 block text-[11px]">Stat 2 (Frontage)</label>
                <input
                  type="text"
                  value={stats.stat2}
                  onChange={(e) => handleStatChange("stat2", e.target.value)}
                  placeholder="Direct N-5"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 font-bold text-slate-900"
                />
                <input
                  type="text"
                  value={stats.stat2Label}
                  onChange={(e) => handleStatChange("stat2Label", e.target.value)}
                  placeholder="GT Road Frontage"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600"
                />
              </div>

              <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-2">
                <label className="font-bold text-slate-600 block text-[11px]">Stat 3 (Approval)</label>
                <input
                  type="text"
                  value={stats.stat3}
                  onChange={(e) => handleStatChange("stat3", e.target.value)}
                  placeholder="Multi-Storey"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 font-bold text-emerald-600"
                />
                <input
                  type="text"
                  value={stats.stat3Label}
                  onChange={(e) => handleStatChange("stat3Label", e.target.value)}
                  placeholder="Building Approval"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600"
                />
              </div>

              <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-2">
                <label className="font-bold text-slate-600 block text-[11px]">Stat 4 (Terms)</label>
                <input
                  type="text"
                  value={stats.stat4}
                  onChange={(e) => handleStatChange("stat4", e.target.value)}
                  placeholder="3 Years"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 font-bold text-[#D49E17]"
                />
                <input
                  type="text"
                  value={stats.stat4Label}
                  onChange={(e) => handleStatChange("stat4Label", e.target.value)}
                  placeholder="Installment Plan"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. COMMERCIAL OVERVIEW (WITH RICHTEXTEDITOR FOR SEO LINKS) */}
      <div className="space-y-6 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <FileText className="w-5 h-5 text-emerald-600" />
          <h4 className="font-bold text-slate-900 text-base font-heading">
            2. Commercial Overview &amp; Broadway Hub (Rich Text &amp; Hyperlinks)
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
          <div className="sm:col-span-2">
            <label className="font-bold text-slate-700 block mb-1">Commercial Overview Section Heading</label>
            <input
              type="text"
              placeholder="Commercial Overview: The Business Hub of Rawat"
              value={settings.commercialOverviewHeading || ""}
              onChange={(e) => updateSettingField("commercialOverviewHeading", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-900"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="font-bold text-slate-700 block mb-1">
              Overview Description (Select text to add Internal / External SEO links)
            </label>
            <RichTextEditor
              value={
                settings.commercialOverviewText ||
                `<p>Engineered to capture immense transit footfall along the twin cities National Highway corridor with multi-level construction allowances, dedicated customer parking, and high appreciation rates.</p><p>Saffron City Commercial Broadway offers prime frontage plots for flagship retail, multinational franchises, corporate banks, and executive healthcare centers with 100% legal RDA compliance.</p>`
              }
              onChange={(html) => updateSettingField("commercialOverviewText", html)}
            />
          </div>

          <div className="sm:col-span-2">
            <FileUploadField
              label="Commercial Overview Feature Image (Right Side Showcase)"
              currentValue={settings.commercialOverviewImage || "/images/sectors/commercial-plaza.webp"}
              onUploadSuccess={(url) => updateSettingField("commercialOverviewImage", url)}
            />
          </div>
        </div>
      </div>

      {/* 3. COMMERCIAL INFRASTRUCTURE & AMENITIES (CARDS WITH INDIVIDUAL IMAGES) */}
      <div className="space-y-6 pt-4 border-t border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#D49E17]" />
            <div>
              <h4 className="font-bold text-slate-900 text-base font-heading">
                3. Commercial Facilities &amp; Infrastructure (Cards with Photos)
              </h4>
              <p className="text-xs text-slate-500">
                Manage commercial amenities (GT Road Frontage, Parking Bays, Multi-Storey Permission, Underground Grid).
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddAmenity}
            className="px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs border border-amber-300 transition flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Facility Card</span>
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
                  Facility #{idx + 1}
                </span>

                <button
                  type="button"
                  onClick={() => handleRemoveAmenity(idx)}
                  className="p-1 text-rose-500 hover:bg-rose-50 rounded transition"
                  title="Remove Facility"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <FileUploadField
                  label={`Facility #${idx + 1} Photo`}
                  currentValue={item.image}
                  onUploadSuccess={(url) => handleAmenityChange(idx, "image", url)}
                />

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Facility Title</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleAmenityChange(idx, "title", e.target.value)}
                    placeholder="e.g. Direct GT Road Frontage"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={item.desc}
                    onChange={(e) => handleAmenityChange(idx, "desc", e.target.value)}
                    placeholder="Description of commercial benefit..."
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 leading-relaxed"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. COMMERCIAL PLOTS INVENTORY CARDS (WITH INDIVIDUAL IMAGES & PRICING) */}
      <div className="space-y-6 pt-4 border-t border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-600" />
            <div>
              <h4 className="font-bold text-slate-900 text-base font-heading">
                4. Commercial Plots for Sale (Inventory Cards with Photos &amp; Installments)
              </h4>
              <p className="text-xs text-slate-500">
                Manage commercial plot cards (Signature 5.33 Marla, 4 Marla, 8 Marla) with custom photos and installment numbers.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddPlotCard}
            className="px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-300 transition flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Commercial Plot</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plotCards.map((plot, idx) => (
            <div
              key={plot.id || idx}
              className="p-5 rounded-3xl bg-slate-50 border border-slate-200 hover:border-emerald-400 transition-all space-y-4 relative group"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs font-mono">
                  Plot #{idx + 1}
                </span>

                <button
                  type="button"
                  onClick={() => handleRemovePlotCard(idx)}
                  className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                  title="Remove Plot"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <FileUploadField
                  label={`Plot #${idx + 1} Image`}
                  currentValue={plot.image}
                  onUploadSuccess={(url) => handlePlotCardChange(idx, "image", url)}
                />

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Size / Name</label>
                    <input
                      type="text"
                      placeholder="e.g. 4 Marla Commercial"
                      value={plot.size}
                      onChange={(e) => handlePlotCardChange(idx, "size", e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-bold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Dimensions</label>
                    <input
                      type="text"
                      placeholder="e.g. 30' × 30'"
                      value={plot.dimensions}
                      onChange={(e) => handlePlotCardChange(idx, "dimensions", e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Total Price</label>
                    <input
                      type="text"
                      placeholder="e.g. PKR 2,20,00,000"
                      value={plot.totalPrice}
                      onChange={(e) => handlePlotCardChange(idx, "totalPrice", e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-bold text-[#D49E17]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Discount / Promo Badge</label>
                    <input
                      type="text"
                      placeholder="e.g. PKR 45 Lac Discount"
                      value={plot.discountBadge}
                      onChange={(e) => handlePlotCardChange(idx, "discountBadge", e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-emerald-700 font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1 text-[11px]">Down Payment</label>
                    <input
                      type="text"
                      placeholder="PKR 22,00,000"
                      value={plot.downPayment}
                      onChange={(e) => handlePlotCardChange(idx, "downPayment", e.target.value)}
                      className="w-full px-2 py-1.5 rounded-lg bg-white border border-slate-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1 text-[11px]">Monthly</label>
                    <input
                      type="text"
                      placeholder="PKR 4,69,333"
                      value={plot.monthly}
                      onChange={(e) => handlePlotCardChange(idx, "monthly", e.target.value)}
                      className="w-full px-2 py-1.5 rounded-lg bg-white border border-slate-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1 text-[11px]">Possession</label>
                    <input
                      type="text"
                      placeholder="PKR 44,00,000"
                      value={plot.possession}
                      onChange={(e) => handlePlotCardChange(idx, "possession", e.target.value)}
                      className="w-full px-2 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-emerald-700 font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tag Badge</label>
                  <input
                    type="text"
                    placeholder="e.g. GT Road Frontage"
                    value={plot.tag}
                    onChange={(e) => handlePlotCardChange(idx, "tag", e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-800"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Description</label>
                  <textarea
                    rows={2}
                    placeholder="Description..."
                    value={plot.desc}
                    onChange={(e) => handlePlotCardChange(idx, "desc", e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 leading-relaxed"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. COMMERCIAL COMMUTE LANDMARKS & HIGHWAY CONNECTIVITY */}
      <div className="space-y-6 pt-4 border-t border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-rose-500" />
            <div>
              <h4 className="font-bold text-slate-900 text-base font-heading">
                5. Location Landmarks &amp; Highway Connectivity Cards
              </h4>
              <p className="text-xs text-slate-500">
                Manage commute times to T-Chowk, DHA Phase II, Ring Road, and Google Maps embed URL.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddLandmark}
            className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-900 font-bold text-xs border border-rose-300 transition flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Landmark</span>
          </button>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Google Maps Embed URL</label>
            <input
              type="text"
              placeholder="https://www.google.com/maps/embed?pb=..."
              value={settings.commercialGoogleMapEmbed || ""}
              onChange={(e) => updateSettingField("commercialGoogleMapEmbed", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {landmarks.map((lm, idx) => (
              <div
                key={lm.id || idx}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 relative group"
              >
                <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                  <span className="font-bold font-mono text-[11px] text-slate-700">
                    Landmark #{idx + 1}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleRemoveLandmark(idx)}
                    className="p-1 text-rose-500 hover:bg-rose-50 rounded transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <FileUploadField
                  label="Landmark Photo"
                  currentValue={lm.image}
                  onUploadSuccess={(url) => handleLandmarkChange(idx, "image", url)}
                />

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Landmark Name</label>
                  <input
                    type="text"
                    value={lm.name}
                    onChange={(e) => handleLandmarkChange(idx, "name", e.target.value)}
                    placeholder="e.g. T-Chowk Rawat"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Time</label>
                    <input
                      type="text"
                      value={lm.time}
                      onChange={(e) => handleLandmarkChange(idx, "time", e.target.value)}
                      placeholder="e.g. 5 Minutes"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 font-bold text-[#D49E17]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Distance</label>
                    <input
                      type="text"
                      value={lm.distance}
                      onChange={(e) => handleLandmarkChange(idx, "distance", e.target.value)}
                      placeholder="e.g. 3.5 km"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. WHY INVEST IN COMMERCIAL HIGHLIGHTS */}
      <div className="space-y-6 pt-4 border-t border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <div>
              <h4 className="font-bold text-slate-900 text-base font-heading">
                6. Why Invest in Commercial Highlights (Cards with Photos)
              </h4>
              <p className="text-xs text-slate-500">
                Manage commercial investor benefits (Highway Exposure, Rental Yields, Multi-Storey bylaws, Flexible Terms).
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddReason}
            className="px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-300 transition flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Highlight</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reasons.map((item, idx) => (
            <div
              key={item.id || idx}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 relative group"
            >
              <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                <span className="font-bold font-mono text-[11px] text-slate-700">
                  Highlight #{idx + 1}
                </span>

                <button
                  type="button"
                  onClick={() => handleRemoveReason(idx)}
                  className="p-1 text-rose-500 hover:bg-rose-50 rounded transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <FileUploadField
                label="Highlight Image"
                currentValue={item.image}
                onUploadSuccess={(url) => handleReasonChange(idx, "image", url)}
              />

              <div className="space-y-2 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tag Badge</label>
                  <input
                    type="text"
                    value={item.tag}
                    onChange={(e) => handleReasonChange(idx, "tag", e.target.value)}
                    placeholder="e.g. Maximum ROI"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 font-bold text-[#D49E17]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Title</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleReasonChange(idx, "title", e.target.value)}
                    placeholder="e.g. High Rental Yields"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={item.desc}
                    onChange={(e) => handleReasonChange(idx, "desc", e.target.value)}
                    placeholder="Description..."
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 leading-relaxed text-xs"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. COMMERCIAL PRICING & PAYMENT SCHEDULE TABLE */}
      <div className="space-y-6 pt-4 border-t border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-[#D49E17]" />
            <div>
              <h4 className="font-bold text-slate-900 text-base font-heading">
                7. Official Commercial Pricing &amp; Payment Schedule Table
              </h4>
              <p className="text-xs text-slate-500">
                Manage tabular pricing details displayed on the commercial plot payment table.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddPricingRow}
            className="px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs border border-amber-300 transition flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Pricing Row</span>
          </button>
        </div>

        <div className="space-y-3">
          {pricingRows.map((row, idx) => (
            <div
              key={row.id || idx}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700 font-mono">Row #{idx + 1}</span>
                <button
                  type="button"
                  onClick={() => handleRemovePricingRow(idx)}
                  className="p-1 text-rose-500 hover:bg-rose-50 rounded transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
                <div className="lg:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">Size &amp; Category</label>
                  <input
                    type="text"
                    value={row.size}
                    onChange={(e) => handlePricingRowChange(idx, "size", e.target.value)}
                    placeholder="4 Marla Commercial"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 font-bold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Dimensions</label>
                  <input
                    type="text"
                    value={row.dimensions}
                    onChange={(e) => handlePricingRowChange(idx, "dimensions", e.target.value)}
                    placeholder="30' × 30'"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Total Price</label>
                  <input
                    type="text"
                    value={row.totalPriceFormatted}
                    onChange={(e) => handlePricingRowChange(idx, "totalPriceFormatted", e.target.value)}
                    placeholder="PKR 22,000,000"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 font-bold text-[#D49E17]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Down Payment</label>
                  <input
                    type="text"
                    value={row.bookingAmountFormatted}
                    onChange={(e) => handlePricingRowChange(idx, "bookingAmountFormatted", e.target.value)}
                    placeholder="PKR 2,200,000"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Monthly</label>
                  <input
                    type="text"
                    value={row.monthlyInstallmentFormatted}
                    onChange={(e) => handlePricingRowChange(idx, "monthlyInstallmentFormatted", e.target.value)}
                    placeholder="PKR 469,333"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 8. COMMERCIAL FAQS ACCORDION CMS */}
      <div className="space-y-6 pt-4 border-t border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            <div>
              <h4 className="font-bold text-slate-900 text-base font-heading">
                8. Commercial FAQs Accordion CMS
              </h4>
              <p className="text-xs text-slate-500">
                Frequently asked questions on high-yield investment, payment schedules, and commercial layout approvals.
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
                    placeholder="e.g. What makes Saffron City Commercial plots high-return investments?"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category Tag</label>
                  <input
                    type="text"
                    value={faq.category || ""}
                    onChange={(e) => handleFaqChange(idx, "category", e.target.value)}
                    placeholder="e.g. Investment / Payment"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="font-bold text-slate-700 block mb-1">Answer</label>
                  <textarea
                    rows={3}
                    value={faq.answer}
                    onChange={(e) => handleFaqChange(idx, "answer", e.target.value)}
                    placeholder="Detailed authoritative response..."
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 leading-relaxed"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 9. DIRECT COMMERCIAL HOTLINE & CTA */}
      <div className="space-y-6 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Phone className="w-5 h-5 text-emerald-600" />
          <h4 className="font-bold text-slate-900 text-base font-heading">
            9. Priority Commercial Sales Desk &amp; WhatsApp Contact
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Commercial Desk Phone / WhatsApp</label>
            <input
              type="text"
              placeholder="+92 300 1234567"
              value={settings.commercialCtaPhone || settings.whatsappPhone || ""}
              onChange={(e) => updateSettingField("commercialCtaPhone", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="font-bold text-slate-700 block mb-1">CTA Heading</label>
            <input
              type="text"
              placeholder="Reserve Your Commercial Plot on Main GT Road"
              value={settings.commercialCtaHeading || ""}
              onChange={(e) => updateSettingField("commercialCtaHeading", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold"
            />
          </div>
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
          <span>{saving ? "Saving Changes..." : "Save Commercial Page"}</span>
        </button>
      </div>
    </div>
  );
}
