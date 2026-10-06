"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Layers,
  Save,
  ExternalLink,
  Plus,
  Trash2,
  Image as ImageIcon,
  MapPin,
  Building2,
  HelpCircle,
  Phone,
  FileDown,
  Check,
  ChevronDown,
  ChevronUp,
  Link2,
} from "lucide-react";
import { StoredSettings } from "@/lib/types";
import FileUploadField from "@/components/dashboard/FileUploadField";
import RichTextEditor from "@/components/dashboard/RichTextEditor";

interface SectorBlockCmsProps {
  sectorKey: "sector-a" | "sector-b";
  settings: StoredSettings;
  updateSettingField: (field: keyof StoredSettings, value: any) => void;
  onSave: () => void;
  saving: boolean;
}

export interface SectorAmenityItem {
  title: string;
  desc: string;
  image: string;
}

export interface SectorLandmarkItem {
  name: string;
  time: string;
  distance: string;
  description: string;
  image: string;
}

export interface SectorWhyChooseItem {
  title: string;
  description: string;
  tag: string;
  image: string;
}

export interface SectorFaqItem {
  question: string;
  answer: string;
  category?: string;
}

const DEFAULT_SECTOR_A_AMENITIES: SectorAmenityItem[] = [
  {
    title: "100% Underground Electrification",
    desc: "Clean open skies without hanging wires. Advanced subterranean electrical grid with backup provisions.",
    image: "/images/facilities/underground-utilities.webp",
  },
  {
    title: "Direct GT Road (N-5) Access",
    desc: "Situated right at the main gated gateway of Saffron City with instant highway connectivity.",
    image: "/images/amenities/amenity_boulevard.webp",
  },
  {
    title: "Grand Jamia Mosque Walking Distance",
    desc: "Convenient walking distance to the architecturally stunning central Grand Jamia Mosque.",
    image: "/images/amenities/grand-mosque.webp",
  },
  {
    title: "24/7 Gated Security & CCTV",
    desc: "Multi-layered perimeter security, electronic RFID barrier gates, and continuous patrolling.",
    image: "/images/facilities/gated-security.webp",
  },
  {
    title: "Dedicated Eco-Parks & Jogging Tracks",
    desc: "Lush green community parks, children play facilities, and paved running trails across Sector A.",
    image: "/images/sectors/green-community-park.webp",
  },
  {
    title: "Clean Water Filtration Plant",
    desc: "Dedicated RO water filtration facilities supplying pure drinking water to all Sector A residents.",
    image: "/images/facilities/water-filtration.webp",
  },
];

const DEFAULT_SECTOR_A_LANDMARKS: SectorLandmarkItem[] = [
  {
    name: "Main GT Road (N-5 Highway)",
    time: "Direct Access",
    distance: "Direct Frontage Access",
    description: "Instant access to the multi-lane National Highway with no detours.",
    image: "/images/amenities/amenity_boulevard.webp",
  },
  {
    name: "T-Chowk Rawat Interchange",
    time: "5 Minutes",
    distance: "3.5 km via Main GT Road",
    description: "Strategic commercial and transit junction linking Rawalpindi, Islamabad Expressway, and GT Road.",
    image: "/images/landmark_t_chowk.webp",
  },
  {
    name: "DHA Phase II & Giga Mall",
    time: "10 Minutes",
    distance: "8.0 km Expressway Link",
    description: "Premier twin-city commercial shopping destination with hypermarkets, banks, and cinema complexes.",
    image: "/images/landmark_giga_mall.webp",
  },
  {
    name: "Rawalpindi Ring Road Interchange",
    time: "15 Minutes",
    distance: "11.0 km Direct Bypass",
    description: "Direct expressway link connecting Saffron City to New Islamabad Airport and M-2 Motorway.",
    image: "/images/landmark_dha_islamabad.webp",
  },
];

const DEFAULT_SECTOR_A_REASONS: SectorWhyChooseItem[] = [
  {
    title: "100% Underground Electrification",
    description: "Zero overhead wires. All electricity, fiber optics, gas, and water are subterranean.",
    image: "/images/facilities/underground-utilities.webp",
    tag: "Clean Skyline",
  },
  {
    title: "Direct GT Road (N-5) Gate Access",
    description: "Located right at the front entrance of Saffron City on Main GT Road for fast commutes.",
    image: "/images/amenities/amenity_boulevard.webp",
    tag: "Prime Location",
  },
  {
    title: "40% Eco-Friendly Green Parks",
    description: "Surrounded by landscaped community parks, jogging tracks, and kids play areas.",
    image: "/images/sectors/green-community-park.webp",
    tag: "Green Living",
  },
  {
    title: "Approved 15,000 Kanal Master Plan",
    description: "Complete legal security with approved town planning and transparent allotment.",
    image: "/images/facilities/gated-security.webp",
    tag: "Verified Title",
  },
];

const DEFAULT_SECTOR_A_FAQS: SectorFaqItem[] = [
  {
    question: "What makes Sector A (Block B) the flagship sector in Saffron City?",
    answer: "Sector A is designed as the highest-tier executive enclave of Saffron City Islamabad. It features 100% underground electrification, closest proximity to the main entrance on Main GT Road, immediate walking access to the Grand Jamia Mosque, and superior architectural controls.",
  },
  {
    question: "What plot categories and sizes are available in Sector A for sale?",
    answer: "Sector A offers premium residential plots in three standard sizes: 5 Marla (25' × 45'), 10 Marla (35' × 65'), and 1 Kanal (50' × 90'). All plots have direct access to wide internal carpeted streets.",
  },
  {
    question: "What is the payment structure and installment plan for Sector A?",
    answer: "Plots can be booked with a 10% down payment, followed by 10% at confirmation/allocation. The remaining balance is spread conveniently over 30 monthly installments and 6 bi-annual installments across 3 years, with 20% due at possession.",
  },
  {
    question: "Is Sector A covered by the official society No Objection Certificate (NOC)?",
    answer: "Yes. Saffron City holds an authentic 15,000 Kanal layout approval, and Sector A is fully covered under the approved town planning guidelines with complete legal title.",
  },
  {
    question: "How do I visit Sector A on-site or view the location on Google Maps?",
    answer: "Sector A is directly accessible from Main GT Road near Rawat. You can use our embedded Google Map on this page or message our sales team on WhatsApp to arrange a guided on-site visit.",
  },
];

const DEFAULT_SECTOR_B_AMENITIES: SectorAmenityItem[] = [
  {
    title: "Dedicated Sector Mosque",
    desc: "Built directly within the sector boundary for convenient 2-minute daily prayer access.",
    image: "/images/amenities/amenity_mosque.webp",
  },
  {
    title: "Family Community Parks",
    desc: "Lush landscaped gardens, children's play area, and shaded walkways for peaceful evenings.",
    image: "/images/sectors/green-community-park.webp",
  },
  {
    title: "100% Underground Electrification",
    desc: "Safe, wire-free environment ensuring dependable electricity supply without overhead clutter.",
    image: "/images/facilities/underground-utilities.webp",
  },
  {
    title: "24/7 Gated Security",
    desc: "Round-the-clock perimeter monitoring, manned entry checkpoints, and active security patrolling.",
    image: "/images/facilities/gated-security.webp",
  },
  {
    title: "Clean Water Supply & RO Plant",
    desc: "Dedicated clean water storage and modern filtration systems for every household.",
    image: "/images/facilities/water-filtration.webp",
  },
  {
    title: "Wide Carpeted Streets",
    desc: "Minimum 40-foot to 60-foot wide asphalt paved streets designed for smooth neighborhood transit.",
    image: "/images/amenities/amenity_boulevard.webp",
  },
];

const DEFAULT_SECTOR_B_LANDMARKS: SectorLandmarkItem[] = [
  {
    name: "Main GT Road (N-5 Highway)",
    time: "Direct Access",
    distance: "Direct Project Access",
    description: "Instant access to the multi-lane National Highway.",
    image: "/images/amenities/amenity_boulevard.webp",
  },
  {
    name: "T-Chowk Rawat Interchange",
    time: "5 Minutes",
    distance: "3.5 km via Main GT Road",
    description: "Major commercial and transit connection hub.",
    image: "/images/landmark_t_chowk.webp",
  },
  {
    name: "DHA Phase II & Giga Mall",
    time: "10 Minutes",
    distance: "8.0 km Expressway Link",
    description: "Shopping mall, cinema, and retail center.",
    image: "/images/landmark_giga_mall.webp",
  },
  {
    name: "Rawalpindi Ring Road Interchange",
    time: "15 Minutes",
    distance: "11.0 km Direct Bypass",
    description: "Fast bypass route to Islamabad International Airport.",
    image: "/images/landmark_dha_islamabad.webp",
  },
];

const DEFAULT_SECTOR_B_REASONS: SectorWhyChooseItem[] = [
  {
    title: "Dedicated Sector B Community Mosque",
    description: "Built within the sector boundary for quick 2-minute daily walking access to prayers.",
    image: "/images/amenities/amenity_mosque.webp",
    tag: "Sector Mosque",
  },
  {
    title: "Family Neighborhood Parks",
    description: "Lush landscaped gardens, children's play area, and shaded benches for peaceful evenings.",
    image: "/images/sectors/green-community-park.webp",
    tag: "Community Parks",
  },
  {
    title: "Budget-Friendly 3-Year Plan",
    description: "Accessible 10% booking with manageable monthly installments spread over 36 months.",
    image: "/images/sectors/sector-b-residential.webp",
    tag: "Easy Payment",
  },
  {
    title: "Gated Security & CCTV Patrols",
    description: "Manned security checkpoints, boundary wall, and round-the-clock motorized patrol units.",
    image: "/images/facilities/gated-security.webp",
    tag: "24/7 Security",
  },
];

const DEFAULT_SECTOR_B_FAQS: SectorFaqItem[] = [
  {
    question: "What makes Sector B ideal for families and first-time investors?",
    answer: "Sector B is designed with affordability and community living in mind. It offers the same approved master plan and civic amenities as the rest of the project, with a pocket-friendly 10% down payment and 3-year installment schedule.",
  },
  {
    question: "What plot sizes are available in Sector B for sale?",
    answer: "Sector B offers standard residential plots in 5 Marla (25×45), 10 Marla (35×65), and 1 Kanal (50×90) sizes on 40-foot to 60-foot wide carpeted residential streets.",
  },
  {
    question: "Is Sector B covered by the approved society master plan?",
    answer: "Yes, Sector B is completely covered under Saffron City's approved 15,000 Kanal layout plan and town planning authorization.",
  },
  {
    question: "What are the installment terms for Sector B plots?",
    answer: "Plots in Sector B require a 10% down payment at booking, 10% at allocation, 30 monthly installments, 6 bi-annual installments, and 20% on possession.",
  },
];

export default function SectorBlockCms({
  sectorKey,
  settings,
  updateSettingField,
  onSave,
  saving,
}: SectorBlockCmsProps) {
  const isSectorA = sectorKey === "sector-a";
  const themeColor = isSectorA ? "#D49E17" : "#059669";
  const themeBgLight = isSectorA ? "bg-amber-500/10" : "bg-emerald-500/10";
  const themeBorder = isSectorA ? "border-amber-500/30" : "border-emerald-500/30";
  const liveUrl = isSectorA ? "/sectors/sector-a" : "/sectors/sector-b";

  // Amenities list state
  const [amenities, setAmenities] = useState<SectorAmenityItem[]>(() => {
    const raw = isSectorA ? settings.sectorAAmenitiesJson : settings.sectorBAmenitiesJson;
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {}
    }
    return isSectorA ? DEFAULT_SECTOR_A_AMENITIES : DEFAULT_SECTOR_B_AMENITIES;
  });

  // Landmarks list state
  const [landmarks, setLandmarks] = useState<SectorLandmarkItem[]>(() => {
    const raw = isSectorA ? settings.sectorALandmarksJson : settings.sectorBLandmarksJson;
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {}
    }
    return isSectorA ? DEFAULT_SECTOR_A_LANDMARKS : DEFAULT_SECTOR_B_LANDMARKS;
  });

  // Why Choose / Highlights list state
  const [whyChoose, setWhyChoose] = useState<SectorWhyChooseItem[]>(() => {
    const raw = isSectorA ? settings.sectorAWhyChooseJson : settings.sectorBWhyChooseJson;
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {}
    }
    return isSectorA ? DEFAULT_SECTOR_A_REASONS : DEFAULT_SECTOR_B_REASONS;
  });

  // FAQs list state
  const [faqs, setFaqs] = useState<SectorFaqItem[]>(() => {
    const raw = isSectorA ? settings.sectorAFaqsJson : settings.sectorBFaqsJson;
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {}
    }
    return isSectorA ? DEFAULT_SECTOR_A_FAQS : DEFAULT_SECTOR_B_FAQS;
  });

  // Sync state to settings JSON fields whenever items change
  const handleAmenitiesChange = (newItems: SectorAmenityItem[]) => {
    setAmenities(newItems);
    const jsonKey = isSectorA ? "sectorAAmenitiesJson" : "sectorBAmenitiesJson";
    updateSettingField(jsonKey as any, JSON.stringify(newItems));
  };

  const handleLandmarksChange = (newItems: SectorLandmarkItem[]) => {
    setLandmarks(newItems);
    const jsonKey = isSectorA ? "sectorALandmarksJson" : "sectorBLandmarksJson";
    updateSettingField(jsonKey as any, JSON.stringify(newItems));
  };

  const handleWhyChooseChange = (newItems: SectorWhyChooseItem[]) => {
    setWhyChoose(newItems);
    const jsonKey = isSectorA ? "sectorAWhyChooseJson" : "sectorBWhyChooseJson";
    updateSettingField(jsonKey as any, JSON.stringify(newItems));
  };

  const handleFaqsChange = (newItems: SectorFaqItem[]) => {
    setFaqs(newItems);
    const jsonKey = isSectorA ? "sectorAFaqsJson" : "sectorBFaqsJson";
    updateSettingField(jsonKey as any, JSON.stringify(newItems));
  };

  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="bg-white border border-amber-200/80 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-2xl ${themeBgLight} border ${themeBorder} flex items-center justify-center`} style={{ color: themeColor }}>
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 font-heading text-lg">
              {isSectorA ? "Sector A (Executive / Luxury Block)" : "Sector B (Affordable / Smart Living)"} Full CMS
            </h3>
            <p className="text-xs text-slate-500">
              Visual image uploaders, rich SEO text with internal &amp; external links, amenities, landmarks, reasons &amp; FAQs.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={liveUrl}
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
            className="px-6 py-2.5 rounded-xl text-white font-bold text-xs shadow-md hover:scale-105 transition flex items-center gap-2 cursor-pointer disabled:opacity-60"
            style={{ backgroundColor: themeColor }}
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving..." : `Save ${isSectorA ? "Sector A" : "Sector B"}`}</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: HERO BANNER & MEDIA */}
      <div className="bg-white border border-amber-200/80 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-100 text-[#D49E17] font-bold text-xs flex items-center justify-center">1</span>
            <h4 className="font-bold text-slate-900 text-sm font-heading">Hero Banner &amp; Header Media</h4>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">Top Banner with HD Background Image</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Display Title (H1 Heading)</label>
            <input
              type="text"
              value={isSectorA ? settings.sectorATitle || "" : settings.sectorBTitle || ""}
              onChange={(e) => updateSettingField(isSectorA ? "sectorATitle" : "sectorBTitle", e.target.value)}
              placeholder={isSectorA ? "Sector A (Block B): Executive Plots For Sale" : "Sector B: Plots for Sale & Family Living"}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Tagline / Subtitle</label>
            <input
              type="text"
              value={isSectorA ? settings.sectorATagline || "" : settings.sectorBTagline || ""}
              onChange={(e) => updateSettingField(isSectorA ? "sectorATagline" : "sectorBTagline", e.target.value)}
              placeholder="Prime Executive Living with Underground Electrification"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200"
            />
          </div>

          <div className="sm:col-span-2">
            <FileUploadField
              label={`${isSectorA ? "Sector A" : "Sector B"} Hero Background Image (HD)`}
              currentValue={isSectorA ? settings.sectorAImage || "" : settings.sectorBImage || ""}
              onUploadSuccess={(url) => updateSettingField(isSectorA ? "sectorAImage" : "sectorBImage", url)}
              helperText="Full-screen hero background image shown on top of the page."
            />
          </div>

          <div className="sm:col-span-2">
            <label className="font-bold text-slate-700 block mb-1">Official Brochure / Map PDF Link</label>
            <input
              type="text"
              value={isSectorA ? settings.sectorABrochurePdf || "" : settings.sectorBBrochurePdf || ""}
              onChange={(e) => updateSettingField(isSectorA ? "sectorABrochurePdf" : "sectorBBrochurePdf", e.target.value)}
              placeholder="/brochures/sector-map.pdf"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: OVERVIEW SECTION WITH RICH TEXT (SEO INTERNAL/EXTERNAL LINKS) */}
      <div className="bg-white border border-amber-200/80 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-100 text-[#D49E17] font-bold text-xs flex items-center justify-center">2</span>
            <h4 className="font-bold text-slate-900 text-sm font-heading">Overview Section (Rich SEO Editor with Internal &amp; External Links)</h4>
          </div>
          <span className="text-[11px] text-amber-700 font-bold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 flex items-center gap-1">
            <Link2 className="w-3.5 h-3.5" />
            <span>Supports Internal &amp; External Hyperlinks</span>
          </span>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Overview Heading (H2)</label>
            <input
              type="text"
              value={isSectorA ? settings.sectorAOverviewHeading || "" : settings.sectorBOverviewHeading || ""}
              onChange={(e) => updateSettingField(isSectorA ? "sectorAOverviewHeading" : "sectorBOverviewHeading", e.target.value)}
              placeholder="Sector Overview: Premier Living"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">
              Overview Description &amp; Content (Use Link Tool in Toolbar for SEO Linking)
            </label>
            <RichTextEditor
              value={isSectorA ? settings.sectorADescription || "" : settings.sectorBDescription || ""}
              onChange={(html) => updateSettingField(isSectorA ? "sectorADescription" : "sectorBDescription", html)}
              placeholder="Write detailed sector overview. Highlight keywords and click the Link button to attach internal pages or external links..."
            />
          </div>

          <div>
            <FileUploadField
              label="Overview Right-Side Featured Image"
              currentValue={isSectorA ? settings.sectorAOverviewImage || "" : settings.sectorBOverviewImage || ""}
              onUploadSuccess={(url) => updateSettingField(isSectorA ? "sectorAOverviewImage" : "sectorBOverviewImage", url)}
              helperText="High-res preview photo shown right next to the overview text."
            />
          </div>
        </div>
      </div>

      {/* SECTION 3: COMMUNITY AMENITIES & INFRASTRUCTURE (WITH INDIVIDUAL IMAGE UPLOADERS) */}
      <div className="bg-white border border-amber-200/80 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-100 text-[#D49E17] font-bold text-xs flex items-center justify-center">3</span>
            <h4 className="font-bold text-slate-900 text-sm font-heading">
              Community Amenities &amp; Infrastructure ({amenities.length} Cards with Individual Images)
            </h4>
          </div>
          <button
            type="button"
            onClick={() => {
              const updated = [
                ...amenities,
                {
                  title: "New Amenity Feature",
                  desc: "Description of the facility or infrastructure.",
                  image: "/images/amenities/amenity_boulevard.webp",
                },
              ];
              handleAmenitiesChange(updated);
            }}
            className="px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-[#D49E17] font-bold text-xs flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Amenity</span>
          </button>
        </div>

        <div className="text-xs space-y-2">
          <label className="font-bold text-slate-700 block">Amenities Section Heading</label>
          <input
            type="text"
            value={isSectorA ? settings.sectorAAmenitiesHeading || "" : settings.sectorBAmenitiesHeading || ""}
            onChange={(e) => updateSettingField(isSectorA ? "sectorAAmenitiesHeading" : "sectorBAmenitiesHeading", e.target.value)}
            placeholder="Infrastructure &amp; Amenities"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
          {amenities.map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-3 relative group">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                  Amenity #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const updated = amenities.filter((_, i) => i !== idx);
                    handleAmenitiesChange(updated);
                  }}
                  className="p-1 rounded-lg text-rose-500 hover:bg-rose-50 transition cursor-pointer"
                  title="Remove Amenity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Title</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => {
                      const updated = [...amenities];
                      updated[idx].title = e.target.value;
                      handleAmenitiesChange(updated);
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-bold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={item.desc}
                    onChange={(e) => {
                      const updated = [...amenities];
                      updated[idx].desc = e.target.value;
                      handleAmenitiesChange(updated);
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                  />
                </div>

                <div>
                  <FileUploadField
                    label={`Amenity #${idx + 1} Photo`}
                    currentValue={item.image}
                    onUploadSuccess={(url) => {
                      const updated = [...amenities];
                      updated[idx].image = url;
                      handleAmenitiesChange(updated);
                    }}
                    helperText="Upload specific photo for this amenity card."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 4: NEARBY LANDMARKS & COMMUTE DISTANCES (WITH INDIVIDUAL IMAGE UPLOADERS) */}
      <div className="bg-white border border-amber-200/80 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-100 text-[#D49E17] font-bold text-xs flex items-center justify-center">4</span>
            <h4 className="font-bold text-slate-900 text-sm font-heading">
              Nearby Landmarks &amp; Commute Distances ({landmarks.length} Landmark Cards)
            </h4>
          </div>
          <button
            type="button"
            onClick={() => {
              const updated = [
                ...landmarks,
                {
                  name: "New Landmark Hub",
                  time: "10 Minutes",
                  distance: "5.0 km via GT Road",
                  description: "Major transit and commercial landmark.",
                  image: "/images/landmark_t_chowk.webp",
                },
              ];
              handleLandmarksChange(updated);
            }}
            className="px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-[#D49E17] font-bold text-xs flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Landmark</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Landmarks Section Heading</label>
            <input
              type="text"
              value={isSectorA ? settings.sectorALandmarksHeading || "" : settings.sectorBLandmarksHeading || ""}
              onChange={(e) => updateSettingField(isSectorA ? "sectorALandmarksHeading" : "sectorBLandmarksHeading", e.target.value)}
              placeholder="Location &amp; Commute Landmarks"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Google Maps Embed URL</label>
            <input
              type="text"
              value={isSectorA ? settings.sectorAMapEmbedUrl || "" : settings.sectorBMapEmbedUrl || ""}
              onChange={(e) => updateSettingField(isSectorA ? "sectorAMapEmbedUrl" : "sectorBMapEmbedUrl", e.target.value)}
              placeholder="https://www.google.com/maps/embed?pb=..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
          {landmarks.map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-3 relative">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                  Landmark #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const updated = landmarks.filter((_, i) => i !== idx);
                    handleLandmarksChange(updated);
                  }}
                  className="p-1 rounded-lg text-rose-500 hover:bg-rose-50 transition cursor-pointer"
                  title="Remove Landmark"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">Landmark Name</label>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => {
                      const updated = [...landmarks];
                      updated[idx].name = e.target.value;
                      handleLandmarksChange(updated);
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-bold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Travel Time (e.g. 5 Minutes)</label>
                  <input
                    type="text"
                    value={item.time}
                    onChange={(e) => {
                      const updated = [...landmarks];
                      updated[idx].time = e.target.value;
                      handleLandmarksChange(updated);
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-bold text-[#D49E17]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Distance Route Info</label>
                  <input
                    type="text"
                    value={item.distance}
                    onChange={(e) => {
                      const updated = [...landmarks];
                      updated[idx].distance = e.target.value;
                      handleLandmarksChange(updated);
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">Short Description</label>
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => {
                      const updated = [...landmarks];
                      updated[idx].description = e.target.value;
                      handleLandmarksChange(updated);
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                  />
                </div>

                <div className="sm:col-span-2">
                  <FileUploadField
                    label={`Landmark #${idx + 1} Photo`}
                    currentValue={item.image}
                    onUploadSuccess={(url) => {
                      const updated = [...landmarks];
                      updated[idx].image = url;
                      handleLandmarksChange(updated);
                    }}
                    helperText="Upload real photo for this landmark."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 5: WHY INVESTORS / FAMILIES CHOOSE THIS SECTOR (WITH INDIVIDUAL IMAGE UPLOADERS) */}
      <div className="bg-white border border-amber-200/80 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-100 text-[#D49E17] font-bold text-xs flex items-center justify-center">5</span>
            <h4 className="font-bold text-slate-900 text-sm font-heading">
              {isSectorA ? "Why Investors Choose Sector A" : "Why Families Choose Sector B"} ({whyChoose.length} Feature Cards)
            </h4>
          </div>
          <button
            type="button"
            onClick={() => {
              const updated = [
                ...whyChoose,
                {
                  title: "High Investment Yield",
                  description: "Designed for premium capital appreciation and safe family living.",
                  tag: "High ROI",
                  image: "/images/sectors/green-community-park.webp",
                },
              ];
              handleWhyChooseChange(updated);
            }}
            className="px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-[#D49E17] font-bold text-xs flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Reason Card</span>
          </button>
        </div>

        <div className="text-xs space-y-2">
          <label className="font-bold text-slate-700 block">Section Heading</label>
          <input
            type="text"
            value={isSectorA ? settings.sectorAWhyChooseHeading || "" : settings.sectorBWhyChooseHeading || ""}
            onChange={(e) => updateSettingField(isSectorA ? "sectorAWhyChooseHeading" : "sectorBWhyChooseHeading", e.target.value)}
            placeholder={isSectorA ? "Why Investors Choose Sector A" : "Why Families Choose Sector B"}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
          {whyChoose.map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-3 relative">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                  Feature Card #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const updated = whyChoose.filter((_, i) => i !== idx);
                    handleWhyChooseChange(updated);
                  }}
                  className="p-1 rounded-lg text-rose-500 hover:bg-rose-50 transition cursor-pointer"
                  title="Remove Card"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tag Badge (e.g. Clean Skyline)</label>
                  <input
                    type="text"
                    value={item.tag}
                    onChange={(e) => {
                      const updated = [...whyChoose];
                      updated[idx].tag = e.target.value;
                      handleWhyChooseChange(updated);
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-bold text-[#D49E17]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Card Title</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => {
                      const updated = [...whyChoose];
                      updated[idx].title = e.target.value;
                      handleWhyChooseChange(updated);
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-bold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={item.description}
                    onChange={(e) => {
                      const updated = [...whyChoose];
                      updated[idx].description = e.target.value;
                      handleWhyChooseChange(updated);
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                  />
                </div>

                <div className="sm:col-span-2">
                  <FileUploadField
                    label={`Feature Card #${idx + 1} Photo`}
                    currentValue={item.image}
                    onUploadSuccess={(url) => {
                      const updated = [...whyChoose];
                      updated[idx].image = url;
                      handleWhyChooseChange(updated);
                    }}
                    helperText="Upload image for this feature highlight."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 6: FREQUENTLY ASKED QUESTIONS (FAQS CMS) */}
      <div className="bg-white border border-amber-200/80 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-100 text-[#D49E17] font-bold text-xs flex items-center justify-center">6</span>
            <h4 className="font-bold text-slate-900 text-sm font-heading">
              Frequently Asked Questions ({faqs.length} FAQs Accordion)
            </h4>
          </div>
          <button
            type="button"
            onClick={() => {
              const updated = [
                ...faqs,
                {
                  question: "New Question Here?",
                  answer: "Answer to the question goes here.",
                },
              ];
              handleFaqsChange(updated);
            }}
            className="px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-[#D49E17] font-bold text-xs flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add FAQ</span>
          </button>
        </div>

        <div className="space-y-4 pt-2">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                  FAQ #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const updated = faqs.filter((_, i) => i !== idx);
                    handleFaqsChange(updated);
                  }}
                  className="p-1 rounded-lg text-rose-500 hover:bg-rose-50 transition cursor-pointer"
                  title="Remove FAQ"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Question</label>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => {
                      const updated = [...faqs];
                      updated[idx].question = e.target.value;
                      handleFaqsChange(updated);
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Answer</label>
                  <textarea
                    rows={3}
                    value={faq.answer}
                    onChange={(e) => {
                      const updated = [...faqs];
                      updated[idx].answer = e.target.value;
                      handleFaqsChange(updated);
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 leading-relaxed text-xs"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 7: CALL TO ACTION & DIRECT CONTACT */}
      <div className="bg-white border border-amber-200/80 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <span className="w-6 h-6 rounded-lg bg-amber-100 text-[#D49E17] font-bold text-xs flex items-center justify-center">7</span>
          <h4 className="font-bold text-slate-900 text-sm font-heading">Call-To-Action &amp; Direct Booking Inquiry</h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">CTA Heading</label>
            <input
              type="text"
              value={isSectorA ? settings.sectorACtaHeading || "" : settings.sectorBCtaHeading || ""}
              onChange={(e) => updateSettingField(isSectorA ? "sectorACtaHeading" : "sectorBCtaHeading", e.target.value)}
              placeholder="Book Your Plot Today"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">CTA Subtitle</label>
            <input
              type="text"
              value={isSectorA ? settings.sectorACtaSubtitle || "" : settings.sectorBCtaSubtitle || ""}
              onChange={(e) => updateSettingField(isSectorA ? "sectorACtaSubtitle" : "sectorBCtaSubtitle", e.target.value)}
              placeholder="Submit your inquiry to secure priority allotment."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">WhatsApp / Contact Hotline</label>
            <input
              type="text"
              value={isSectorA ? settings.sectorACtaPhone || "" : settings.sectorBCtaPhone || ""}
              onChange={(e) => updateSettingField(isSectorA ? "sectorACtaPhone" : "sectorBCtaPhone", e.target.value)}
              placeholder="923331113551"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs"
            />
          </div>
        </div>
      </div>

      {/* Save Button Bottom */}
      <div className="flex justify-end pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="px-8 py-3 rounded-2xl text-white font-bold text-xs shadow-md hover:scale-105 transition cursor-pointer flex items-center gap-2 disabled:opacity-60"
          style={{ backgroundColor: themeColor }}
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Saving Changes..." : `Save All ${isSectorA ? "Sector A" : "Sector B"} Changes`}</span>
        </button>
      </div>
    </div>
  );
}
