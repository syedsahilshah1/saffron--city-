"use client";

import React, { useState } from "react";
import {
  Layers,
  Compass,
  Download,
  Save,
  Plus,
  Trash2,
  HelpCircle,
  ExternalLink,
  Sparkles,
  Building2,
  Trees,
  ShieldCheck,
  Zap,
  Droplets,
  FileText,
  Phone,
  ArrowRight
} from "lucide-react";
import { StoredSettings } from "@/lib/types";
import FileUploadField from "@/components/dashboard/FileUploadField";
import RichTextEditor from "@/components/dashboard/RichTextEditor";

interface MasterPlanCmsProps {
  settings: StoredSettings;
  updateSettingField: (field: keyof StoredSettings, value: any) => void;
  onSave: () => void;
  saving: boolean;
}

interface MasterPlanSectorItem {
  id: string;
  name: string;
  type: string;
  tagline: string;
  image: string;
  priceStarting: string;
  status: string;
  href: string;
  features: string[];
}

interface MasterPlanFacilityItem {
  id: string;
  title: string;
  desc: string;
  image: string;
  tag: string;
}

interface MasterPlanFaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

const DEFAULT_SECTORS: MasterPlanSectorItem[] = [
  {
    id: "sector-a",
    name: "Sector A Residential",
    type: "Premium Flagship",
    tagline: "Underground Utilities & Wide Boulevards",
    image: "/images/sectors/sector-a-luxury.webp",
    priceStarting: "PKR 45 Lakh",
    status: "Active Development",
    href: "/sectors/sector-a",
    features: [
      "Underground electricity, gas & optical fiber",
      "Extra-wide carpeted boulevards",
      "Immediate proximity to Grand Mosque & Schools"
    ]
  },
  {
    id: "sector-b",
    name: "Sector B Residential",
    type: "Affordable Community",
    tagline: "Structured 3-Year Installments (10% Down)",
    image: "/images/sectors/sector-b-residential.webp",
    priceStarting: "PKR 45 Lakh",
    status: "Active Development",
    href: "/sectors/sector-b",
    features: [
      "10% down payment easy booking",
      "100% RDA NOC legal protection",
      "Dedicated community mosque & family parks"
    ]
  },
  {
    id: "commercial-block",
    name: "Signature Commercial Block",
    type: "Highway Frontage",
    tagline: "Direct GT Road (N-5 Highway) Exposure",
    image: "/images/sectors/commercial-plaza.webp",
    priceStarting: "PKR 1.55 Crore",
    status: "Open for Booking",
    href: "/plots/commercial",
    features: [
      "Direct frontage on premier N-5 corridor",
      "Multi-storey commercial plaza permissions",
      "Dedicated customer parking & high footfall"
    ]
  },
  {
    id: "green-zone",
    name: "Green & Community Belts",
    type: "Civic & Parks",
    tagline: "45% Allocated to Parks & Green Spaces",
    image: "/images/sectors/green-community-park.webp",
    priceStarting: "Master Amenity",
    status: "Integrated Layout",
    href: "/payment-plan",
    features: [
      "Grand Community Mosque landmark",
      "Lakes, sports grounds & jogging tracks",
      "Community club & recreational hubs"
    ]
  }
];

const DEFAULT_FACILITIES: MasterPlanFacilityItem[] = [
  {
    id: "fac-1",
    title: "Roads & Underground Utilities",
    desc: "Carpeted wide boulevards with complete underground electrical, optical fiber, and drainage networks.",
    image: "/images/facilities/underground-utilities.webp",
    tag: "Underground Wiring"
  },
  {
    id: "fac-2",
    title: "Water Filtration & Power Grid",
    desc: "Dedicated RO water filtration plant for 24/7 pure water and uninterrupted power grid station.",
    image: "/images/facilities/water-filtration.webp",
    tag: "RO Plant"
  },
  {
    id: "fac-3",
    title: "Green Parks & Sports Complexes",
    desc: "Over 45% land allocated to themed family parks, sports grounds, community gardens, and lakes.",
    image: "/images/facilities/green-parks.webp",
    tag: "45% Green Spaces"
  },
  {
    id: "fac-4",
    title: "Gated Smart 24/7 Security",
    desc: "Round-the-clock CCTV surveillance, biometric entrance barriers, and active security patrols.",
    image: "/images/facilities/gated-security.webp",
    tag: "Smart Security"
  }
];

const DEFAULT_FAQS: MasterPlanFaqItem[] = [
  {
    id: "faq-1",
    question: "How many sectors does Saffron City master plan comprise?",
    answer: "Saffron City spans 15,000 Kanal featuring Sector A (Premium flagship with underground utilities), Sector B (Affordable residential with 3-year installments), and a dedicated Signature Commercial block directly along Main GT Road.",
    category: "Master Plan"
  },
  {
    id: "faq-2",
    question: "What plot sizes are available in Sector A and Sector B?",
    answer: "Residential plots are available in 5 Marla (25×45), 10 Marla (35×65), and 1 Kanal (50×90) sizes. Commercial plots come in Signature 30×40 (5.33 Marla), 4 Marla, and 8 Marla on GT Road frontage.",
    category: "Plots"
  },
  {
    id: "faq-3",
    question: "Is the Saffron City Master Plan officially approved by RDA?",
    answer: "Yes. Saffron City holds an authentic No Objection Certificate (NOC) granted by the Rawalpindi Development Authority (RDA) covering the full 15,000 Kanal master expanse on GT Road, Rawat.",
    category: "Legal & NOC"
  },
  {
    id: "faq-4",
    question: "What is the width of the main entrance road & boulevard?",
    answer: "The grand main central boulevard is 250 feet wide, linking directly to Main GT Road (N-5 Highway) and providing smooth multi-lane access to all residential and commercial sectors without traffic bottlenecks.",
    category: "Infrastructure"
  }
];

export default function MasterPlanCms({
  settings,
  updateSettingField,
  onSave,
  saving
}: MasterPlanCmsProps) {
  // Parse 4 Stats
  const defaultStats = {
    stat1: "15,000 Kanal",
    stat1Label: "Total Master Plan Expanse",
    stat2: "250 Feet",
    stat2Label: "Main Central Boulevard",
    stat3: "45%",
    stat3Label: "Green Open Spaces & Parks",
    stat4: "100%",
    stat4Label: "Underground Infrastructure"
  };

  const getStats = () => {
    if (!settings.masterPlanStatsJson) return defaultStats;
    try {
      const parsed = JSON.parse(settings.masterPlanStatsJson);
      return { ...defaultStats, ...parsed };
    } catch {
      return defaultStats;
    }
  };

  const stats = getStats();

  const handleStatChange = (key: string, value: string) => {
    const updated = { ...stats, [key]: value };
    updateSettingField("masterPlanStatsJson", JSON.stringify(updated));
  };

  // Parse Sectors
  const getSectors = (): MasterPlanSectorItem[] => {
    if (!settings.masterPlanSectorsJson) return DEFAULT_SECTORS;
    try {
      const parsed = JSON.parse(settings.masterPlanSectorsJson);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_SECTORS;
    } catch {
      return DEFAULT_SECTORS;
    }
  };

  const [sectors, setSectors] = useState<MasterPlanSectorItem[]>(getSectors());

  const handleSectorChange = (index: number, field: keyof MasterPlanSectorItem, value: any) => {
    const updated = [...sectors];
    updated[index] = { ...updated[index], [field]: value };
    setSectors(updated);
    updateSettingField("masterPlanSectorsJson", JSON.stringify(updated));
  };

  const handleSectorFeatureChange = (sectorIndex: number, featureIndex: number, value: string) => {
    const updated = [...sectors];
    const newFeatures = [...updated[sectorIndex].features];
    newFeatures[featureIndex] = value;
    updated[sectorIndex].features = newFeatures;
    setSectors(updated);
    updateSettingField("masterPlanSectorsJson", JSON.stringify(updated));
  };

  const handleAddSector = () => {
    const newItem: MasterPlanSectorItem = {
      id: `sector-${Date.now()}`,
      name: "New Sector / Block",
      type: "Residential / Commercial",
      tagline: "Sector Overview Tagline",
      image: "/images/sectors/sector-a-luxury.webp",
      priceStarting: "PKR 50 Lakh",
      status: "Open for Booking",
      href: "/plot-for-sale",
      features: ["Feature 1", "Feature 2", "Feature 3"]
    };
    const updated = [...sectors, newItem];
    setSectors(updated);
    updateSettingField("masterPlanSectorsJson", JSON.stringify(updated));
  };

  const handleRemoveSector = (index: number) => {
    const updated = sectors.filter((_, i) => i !== index);
    setSectors(updated);
    updateSettingField("masterPlanSectorsJson", JSON.stringify(updated));
  };

  // Parse Facilities
  const getFacilities = (): MasterPlanFacilityItem[] => {
    if (!settings.masterPlanFacilitiesJson) return DEFAULT_FACILITIES;
    try {
      const parsed = JSON.parse(settings.masterPlanFacilitiesJson);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_FACILITIES;
    } catch {
      return DEFAULT_FACILITIES;
    }
  };

  const [facilities, setFacilities] = useState<MasterPlanFacilityItem[]>(getFacilities());

  const handleFacilityChange = (index: number, field: keyof MasterPlanFacilityItem, value: string) => {
    const updated = [...facilities];
    updated[index] = { ...updated[index], [field]: value };
    setFacilities(updated);
    updateSettingField("masterPlanFacilitiesJson", JSON.stringify(updated));
  };

  const handleAddFacility = () => {
    const newItem: MasterPlanFacilityItem = {
      id: `fac-${Date.now()}`,
      title: "New Civic Facility",
      desc: "Detailed description of master infrastructure amenity.",
      image: "/images/facilities/underground-utilities.webp",
      tag: "Civic Infrastructure"
    };
    const updated = [...facilities, newItem];
    setFacilities(updated);
    updateSettingField("masterPlanFacilitiesJson", JSON.stringify(updated));
  };

  const handleRemoveFacility = (index: number) => {
    const updated = facilities.filter((_, i) => i !== index);
    setFacilities(updated);
    updateSettingField("masterPlanFacilitiesJson", JSON.stringify(updated));
  };

  // Parse FAQs
  const getFaqs = (): MasterPlanFaqItem[] => {
    if (!settings.masterPlanFaqsJson) return DEFAULT_FAQS;
    try {
      const parsed = JSON.parse(settings.masterPlanFaqsJson);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_FAQS;
    } catch {
      return DEFAULT_FAQS;
    }
  };

  const [faqs, setFaqs] = useState<MasterPlanFaqItem[]>(getFaqs());

  const handleFaqChange = (index: number, field: keyof MasterPlanFaqItem, value: string) => {
    const updated = [...faqs];
    updated[index] = { ...updated[index], [field]: value };
    setFaqs(updated);
    updateSettingField("masterPlanFaqsJson", JSON.stringify(updated));
  };

  const handleAddFaq = () => {
    const newFaq: MasterPlanFaqItem = {
      id: `faq-${Date.now()}`,
      question: "New Master Plan Question?",
      answer: "Authoritative answer regarding master layout, plot demarcations, or road network.",
      category: "Master Plan"
    };
    const updated = [...faqs, newFaq];
    setFaqs(updated);
    updateSettingField("masterPlanFaqsJson", JSON.stringify(updated));
  };

  const handleRemoveFaq = (index: number) => {
    const updated = faqs.filter((_, i) => i !== index);
    setFaqs(updated);
    updateSettingField("masterPlanFaqsJson", JSON.stringify(updated));
  };

  return (
    <div className="bg-white border border-amber-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-10">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#D49E17] shadow-sm">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 font-heading text-xl">
              Master Plan &amp; Media Page CMS
            </h3>
            <p className="text-xs text-slate-500">
              Update 4K interactive master plan image, PDF download link, sector blocks with photos, civic infrastructure, and FAQs.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/master-plan"
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
            <span>{saving ? "Saving Changes..." : "Save Master Plan"}</span>
          </button>
        </div>
      </div>

      {/* 1. HERO BANNER & 4 STAT COUNTERS */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Sparkles className="w-5 h-5 text-[#D49E17]" />
          <h4 className="font-bold text-slate-900 text-base font-heading">
            1. Master Plan Hero Banner &amp; 4 Metric Counters
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">
              Hero Headline (Use &apos;|&apos; for gold highlight)
            </label>
            <input
              type="text"
              placeholder="Master Plan | 15,000 Kanal Sustainable Urban Vision"
              value={settings.masterPlanHeroHeading || ""}
              onChange={(e) => updateSettingField("masterPlanHeroHeading", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-900"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Official Master Plan PDF Download Link</label>
            <input
              type="text"
              placeholder="/brochure.pdf"
              value={settings.masterPlanPdf || ""}
              onChange={(e) => updateSettingField("masterPlanPdf", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="font-bold text-slate-700 block mb-1">Hero Subtitle</label>
            <input
              type="text"
              placeholder="RDA-approved 15,000 Kanal master-planned community with 250ft Main Boulevard and 45% open green spaces."
              value={settings.masterPlanHeroSubtitle || ""}
              onChange={(e) => updateSettingField("masterPlanHeroSubtitle", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800"
            />
          </div>

          <div className="sm:col-span-2">
            <FileUploadField
              label="Master Plan Hero Banner Background Image (1920x1080 HD)"
              currentValue={settings.masterPlanHeroImage || "/images/saffron-city-master-plan.webp"}
              onUploadSuccess={(url) => updateSettingField("masterPlanHeroImage", url)}
            />
          </div>

          {/* 4 Stat Metrics */}
          <div className="sm:col-span-2 p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-4">
            <span className="font-bold text-slate-900 text-sm block">
              4 Quick Master Plan Metric Counters
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-2">
                <label className="font-bold text-slate-600 block text-[11px]">Stat 1 (Expanse)</label>
                <input
                  type="text"
                  value={stats.stat1}
                  onChange={(e) => handleStatChange("stat1", e.target.value)}
                  placeholder="15,000 Kanal"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 font-bold text-[#D49E17]"
                />
                <input
                  type="text"
                  value={stats.stat1Label}
                  onChange={(e) => handleStatChange("stat1Label", e.target.value)}
                  placeholder="Total Master Plan Expanse"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600"
                />
              </div>

              <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-2">
                <label className="font-bold text-slate-600 block text-[11px]">Stat 2 (Boulevard)</label>
                <input
                  type="text"
                  value={stats.stat2}
                  onChange={(e) => handleStatChange("stat2", e.target.value)}
                  placeholder="250 Feet"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 font-bold text-slate-900"
                />
                <input
                  type="text"
                  value={stats.stat2Label}
                  onChange={(e) => handleStatChange("stat2Label", e.target.value)}
                  placeholder="Main Central Boulevard"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600"
                />
              </div>

              <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-2">
                <label className="font-bold text-slate-600 block text-[11px]">Stat 3 (Green Space)</label>
                <input
                  type="text"
                  value={stats.stat3}
                  onChange={(e) => handleStatChange("stat3", e.target.value)}
                  placeholder="45%"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 font-bold text-emerald-600"
                />
                <input
                  type="text"
                  value={stats.stat3Label}
                  onChange={(e) => handleStatChange("stat3Label", e.target.value)}
                  placeholder="Green Open Spaces & Parks"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600"
                />
              </div>

              <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-2">
                <label className="font-bold text-slate-600 block text-[11px]">Stat 4 (Utilities)</label>
                <input
                  type="text"
                  value={stats.stat4}
                  onChange={(e) => handleStatChange("stat4", e.target.value)}
                  placeholder="100%"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 font-bold text-[#D49E17]"
                />
                <input
                  type="text"
                  value={stats.stat4Label}
                  onChange={(e) => handleStatChange("stat4Label", e.target.value)}
                  placeholder="Underground Infrastructure"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 4K INTERACTIVE MASTER PLAN GRAPHIC & RICHTEXT OVERVIEW */}
      <div className="space-y-6 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <FileText className="w-5 h-5 text-emerald-600" />
          <h4 className="font-bold text-slate-900 text-base font-heading">
            2. High-Resolution Interactive Master Plan Graphic &amp; Overview
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
          <div className="sm:col-span-2">
            <label className="font-bold text-slate-700 block mb-1">Master Plan Overview Heading</label>
            <input
              type="text"
              placeholder="Interactive 4K Master Plan: Explore Sectors &amp; Infrastructure"
              value={settings.masterPlanOverviewHeading || ""}
              onChange={(e) => updateSettingField("masterPlanOverviewHeading", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-900"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="font-bold text-slate-700 block mb-1">
              Overview Description (Select text to add Internal &amp; External SEO Links)
            </label>
            <RichTextEditor
              value={
                settings.masterPlanOverviewText ||
                `<p>Saffron City Islamabad is meticulously planned across 15,000 Kanals by leading master urban planners. Featuring designated sectors for luxurious living, high-yield commercial hubs, and world-class educational and healthcare clusters.</p><p>With a 250-foot wide grand central boulevard connected directly to Main GT Road, access to every residential plot is swift and unhindered.</p>`
              }
              onChange={(html) => updateSettingField("masterPlanOverviewText", html)}
            />
          </div>

          <div className="sm:col-span-2">
            <FileUploadField
              label="4K Interactive Master Plan Layout Graphic (Main High-Res Map)"
              currentValue={settings.masterPlanImage || "/images/saffron-city-master-plan.webp"}
              onUploadSuccess={(url) => updateSettingField("masterPlanImage", url)}
            />
          </div>
        </div>
      </div>

      {/* 3. MASTER PLAN SECTORS & BLOCKS (CARDS WITH INDIVIDUAL PHOTOS) */}
      <div className="space-y-6 pt-4 border-t border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#D49E17]" />
            <div>
              <h4 className="font-bold text-slate-900 text-base font-heading">
                3. Master Plan Sectors &amp; Blocks (Cards with Photos)
              </h4>
              <p className="text-xs text-slate-500">
                Manage Sector A, Sector B, Signature Commercial, and Green Zone cards with custom images and features.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddSector}
            className="px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs border border-amber-300 transition flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Sector Card</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sectors.map((sec, idx) => (
            <div
              key={sec.id || idx}
              className="p-5 rounded-3xl bg-slate-50 border border-slate-200 hover:border-amber-300 transition-all space-y-4 relative group"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-xs font-mono">
                  Sector #{idx + 1}
                </span>

                <button
                  type="button"
                  onClick={() => handleRemoveSector(idx)}
                  className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                  title="Remove Sector"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <FileUploadField
                  label={`Sector #${idx + 1} Photo`}
                  currentValue={sec.image}
                  onUploadSuccess={(url) => handleSectorChange(idx, "image", url)}
                />

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Sector Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Sector A Residential"
                      value={sec.name}
                      onChange={(e) => handleSectorChange(idx, "name", e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-bold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Type Badge</label>
                    <input
                      type="text"
                      placeholder="e.g. Premium Flagship"
                      value={sec.type}
                      onChange={(e) => handleSectorChange(idx, "type", e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-bold text-[#D49E17]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Price Starting</label>
                    <input
                      type="text"
                      placeholder="e.g. PKR 45 Lakh"
                      value={sec.priceStarting}
                      onChange={(e) => handleSectorChange(idx, "priceStarting", e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-bold text-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Status</label>
                    <input
                      type="text"
                      placeholder="e.g. Active Development"
                      value={sec.status}
                      onChange={(e) => handleSectorChange(idx, "status", e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tagline</label>
                  <input
                    type="text"
                    placeholder="e.g. Underground Utilities & Wide Boulevards"
                    value={sec.tagline}
                    onChange={(e) => handleSectorChange(idx, "tagline", e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-800"
                  />
                </div>

                {/* 3 Bullet Features */}
                <div className="space-y-1.5 pt-1">
                  <label className="font-bold text-slate-700 block text-[11px]">3 Key Sector Features</label>
                  {sec.features && sec.features.map((feat, fIdx) => (
                    <input
                      key={fIdx}
                      type="text"
                      value={feat}
                      onChange={(e) => handleSectorFeatureChange(idx, fIdx, e.target.value)}
                      placeholder={`Feature ${fIdx + 1}`}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. CIVIC FACILITIES & INFRASTRUCTURE HIGHLIGHTS */}
      <div className="space-y-6 pt-4 border-t border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-emerald-600" />
            <div>
              <h4 className="font-bold text-slate-900 text-base font-heading">
                4. Master Civic Facilities &amp; Infrastructure (Cards with Photos)
              </h4>
              <p className="text-xs text-slate-500">
                Manage civic amenities (Underground wiring, Water filtration, Green parks, 24/7 smart security).
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddFacility}
            className="px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-300 transition flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Civic Facility</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {facilities.map((fac, idx) => (
            <div
              key={fac.id || idx}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 relative group"
            >
              <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                <span className="font-bold font-mono text-[11px] text-slate-700">
                  Facility #{idx + 1}
                </span>

                <button
                  type="button"
                  onClick={() => handleRemoveFacility(idx)}
                  className="p-1 text-rose-500 hover:bg-rose-50 rounded transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <FileUploadField
                label="Facility Photo"
                currentValue={fac.image}
                onUploadSuccess={(url) => handleFacilityChange(idx, "image", url)}
              />

              <div className="space-y-2 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tag</label>
                  <input
                    type="text"
                    value={fac.tag}
                    onChange={(e) => handleFacilityChange(idx, "tag", e.target.value)}
                    placeholder="e.g. Underground Wiring"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 font-bold text-[#D49E17]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Title</label>
                  <input
                    type="text"
                    value={fac.title}
                    onChange={(e) => handleFacilityChange(idx, "title", e.target.value)}
                    placeholder="e.g. Roads & Underground Utilities"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={fac.desc}
                    onChange={(e) => handleFacilityChange(idx, "desc", e.target.value)}
                    placeholder="Description..."
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 leading-relaxed text-xs"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. MASTER PLAN FAQS ACCORDION CMS */}
      <div className="space-y-6 pt-4 border-t border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            <div>
              <h4 className="font-bold text-slate-900 text-base font-heading">
                5. Master Plan FAQs Accordion CMS
              </h4>
              <p className="text-xs text-slate-500">
                Frequently asked questions on master layout, plot sizes, road widths, and RDA approvals.
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
                    placeholder="e.g. How many sectors does Saffron City master plan comprise?"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category Tag</label>
                  <input
                    type="text"
                    value={faq.category || ""}
                    onChange={(e) => handleFaqChange(idx, "category", e.target.value)}
                    placeholder="e.g. Master Plan / Infrastructure"
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

      {/* 6. DIRECT MASTER PLAN ADVISORY & CTA */}
      <div className="space-y-6 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Phone className="w-5 h-5 text-emerald-600" />
          <h4 className="font-bold text-slate-900 text-base font-heading">
            6. Master Plan Advisory Desk &amp; WhatsApp Contact
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Advisory Desk Phone / WhatsApp</label>
            <input
              type="text"
              placeholder="+92 300 1234567"
              value={settings.masterPlanCtaPhone || settings.whatsappPhone || ""}
              onChange={(e) => updateSettingField("masterPlanCtaPhone", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="font-bold text-slate-700 block mb-1">CTA Heading</label>
            <input
              type="text"
              placeholder="Need Official Map Demarcation or Corner Plot Assistance?"
              value={settings.masterPlanCtaHeading || ""}
              onChange={(e) => updateSettingField("masterPlanCtaHeading", e.target.value)}
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
          <span>{saving ? "Saving Changes..." : "Save Master Plan Page"}</span>
        </button>
      </div>
    </div>
  );
}
