"use client";

import React, { useState } from "react";
import {
  Building2,
  Save,
  ExternalLink,
  Plus,
  Trash2,
  Image as ImageIcon,
  Sparkles,
  Users,
  Award,
  Clock,
  TrendingUp,
  Globe2,
  Home,
  CheckCircle2,
  Link2,
} from "lucide-react";
import { StoredSettings } from "@/lib/types";
import FileUploadField from "@/components/dashboard/FileUploadField";
import RichTextEditor from "@/components/dashboard/RichTextEditor";

interface AboutUsCmsProps {
  settings: StoredSettings;
  updateSettingField: (field: keyof StoredSettings, value: any) => void;
  onSave: () => void;
  saving: boolean;
}

export interface AboutStatItem {
  value: string;
  suffix: string;
  label: string;
}

export interface AboutLeaderItem {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface AboutTimelineItem {
  year: string;
  milestone: string;
}

export interface AboutDifferentiatorItem {
  number: string;
  title: string;
  desc: string;
  image: string;
  badge: string;
}

export interface AboutCoreValueItem {
  title: string;
  desc: string;
  image: string;
  tag: string;
}

export interface AboutCommitmentItem {
  title: string;
  subtitle: string;
  desc: string;
  image: string;
  accent?: string;
  border?: string;
}

const DEFAULT_STATS: AboutStatItem[] = [
  { value: "70", suffix: "+", label: "Years Legacy" },
  { value: "15000", suffix: " Kanal", label: "Total Land Expanse" },
  { value: "100", suffix: "%", label: "RDA Approved" },
  { value: "250", suffix: " Ft", label: "Main Boulevard" },
];

const DEFAULT_LEADERS: AboutLeaderItem[] = [
  {
    name: "Malik Tariq Mehmood",
    role: "Chairman",
    bio: "Guiding the strategic vision and institutional governance of Saffron City with over three decades of business and infrastructure leadership.",
    image: "/images/chairman_portrait_hd.webp",
  },
  {
    name: "Ali Muhammad",
    role: "Chief Executive Officer",
    bio: "Leading day-to-day corporate operations, financial structuring, and transparent investor relations across domestic and overseas markets.",
    image: "/images/imgi_8_ceo-150x150.webp",
  },
  {
    name: "Haroon Awan",
    role: "Project Director",
    bio: "Overseeing on-site engineering, master planning execution, contractor coordination, and timely delivery of infrastructure.",
    image: "/images/imgi_9_director-150x150.webp",
  },
];

const DEFAULT_TIMELINE: AboutTimelineItem[] = [
  { year: "1954", milestone: "SKB Builders established in Pakistan by the late Saadullah Khan." },
  { year: "2009", milestone: "Land acquisition and strategic planning for Saffron City begins." },
  { year: "2012", milestone: "Master plan development: residential, commercial, educational, and green zones." },
  { year: "2015", milestone: "Official project launch; residential plot bookings commence." },
  { year: "2018", milestone: "Major infrastructure development: roads, utilities, sewerage, electricity." },
  { year: "2021", milestone: "Project expansion: additional residential sectors and commercial planning." },
  { year: "2024", milestone: "RDA NOC approval process completed; community development actively progressing." },
  { year: "2026", milestone: "Sector A (Block B) and Signature Commercial active; ongoing development activities." },
];

const DEFAULT_DIFFERENTIATORS: AboutDifferentiatorItem[] = [
  {
    number: "01",
    title: "RDA Approved — Verified Legal Standing",
    desc: "The NOC is officially approved and independently verifiable on the RDA portal, ensuring complete regulatory compliance.",
    image: "/images/about/val-integrity.webp",
    badge: "100% Legal",
  },
  {
    number: "02",
    title: "Developer with 70+ Years Track Record",
    desc: "SKB Builders has delivered mega civil and commercial infrastructure projects across Pakistan and the Middle East since 1954.",
    image: "/images/about/val-quality.webp",
    badge: "Since 1954",
  },
  {
    number: "03",
    title: "Prime GT Road, Rawat Location",
    desc: "Located on Main GT Road near Rawat, providing effortless access to Rawalpindi, Islamabad Expressway, and upcoming Ring Road.",
    image: "/images/landmark_t_chowk.webp",
    badge: "Main GT Road",
  },
  {
    number: "04",
    title: "Master Plan Built for Community Life",
    desc: "Integrated residential and commercial zones with educational hubs, healthcare, and 250-foot grand boulevards.",
    image: "/images/amenities/amenity_boulevard.webp",
    badge: "250ft Boulevard",
  },
  {
    number: "05",
    title: "Infrastructure That Precedes Residents",
    desc: "Underground utilities, boundary walls, and paved roads are constructed early so physical progress supports your plot investment.",
    image: "/images/amenities/amenity_security.webp",
    badge: "Gated Security",
  },
  {
    number: "06",
    title: "Grand Mosque & Lush Green Belts",
    desc: "Spacious family parks, lakes, and an architectural landmark Grand Mosque at the core of the community.",
    image: "/images/amenities/amenity_mosque.webp",
    badge: "Green Belts",
  },
];

const DEFAULT_CORE_VALUES: AboutCoreValueItem[] = [
  {
    title: "Transparency & Integrity",
    desc: "Every buyer receives clear development timelines, verifiable legal documentation, and honest milestone progress.",
    image: "/images/about/val-integrity.webp",
    tag: "Integrity",
  },
  {
    title: "Engineering Excellence",
    desc: "From 250-foot wide boulevards to underground utilities, every structure is built with top-tier civil engineering precision.",
    image: "/images/about/val-quality.webp",
    tag: "Excellence",
  },
  {
    title: "Family & Community Well-Being",
    desc: "Neighborhoods designed with extensive parks, dedicated schools, and family recreation for lifelong comfort.",
    image: "/images/amenities/amenity_park.webp",
    tag: "Community",
  },
  {
    title: "Eco-Friendly & Green Living",
    desc: "Generous green buffers, modern water filtration, and eco-friendly drainage systems embedded into the master plan.",
    image: "/images/amenities/amenity_water.webp",
    tag: "Sustainability",
  },
  {
    title: "Gated Security & Peace of Mind",
    desc: "Round-the-clock gated security, CCTV surveillance, and dedicated perimeter security for peaceful living.",
    image: "/images/amenities/amenity_security.webp",
    tag: "Security",
  },
  {
    title: "Long-Term Capital Appreciation",
    desc: "Strategic GT Road positioning designed to yield superior return on investment and solid generational asset growth.",
    image: "/images/about/about-hero-banner.webp",
    tag: "Long-Term Value",
  },
];

const DEFAULT_COMMITMENTS: AboutCommitmentItem[] = [
  {
    title: "For Families",
    subtitle: "A Secure Home for Generations",
    desc: "Infrastructure delivered on time, secure gated neighborhoods, top schools, and lush parks where your family can thrive with pride.",
    image: "/images/amenities/amenity_park.webp",
    accent: "text-amber-600",
    border: "border-amber-200",
  },
  {
    title: "For Investors",
    subtitle: "High Yield & Capital Growth",
    desc: "100% legal RDA standing, prime GT Road commercial exposure, and strong appreciation potential backed by SKB's 70-year delivery legacy.",
    image: "/images/about/val-integrity.webp",
    accent: "text-emerald-600",
    border: "border-emerald-200",
  },
  {
    title: "For Overseas Pakistanis",
    subtitle: "Seamless Remote Ownership",
    desc: "Digital remote booking, verified Power of Attorney support, transparent video updates, and dedicated overseas sales desks.",
    image: "/images/about/about-hero-banner.webp",
    accent: "text-blue-600",
    border: "border-blue-200",
  },
];

export default function AboutUsCms({
  settings,
  updateSettingField,
  onSave,
  saving,
}: AboutUsCmsProps) {
  // Stats state
  const [stats, setStats] = useState<AboutStatItem[]>(() => {
    if (settings.aboutStatsJson) {
      try {
        const parsed = JSON.parse(settings.aboutStatsJson);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {}
    }
    return DEFAULT_STATS;
  });

  // Leaders state
  const [leaders, setLeaders] = useState<AboutLeaderItem[]>(() => {
    if (settings.aboutLeadershipJson) {
      try {
        const parsed = JSON.parse(settings.aboutLeadershipJson);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {}
    }
    return DEFAULT_LEADERS;
  });

  // Timeline state
  const [timeline, setTimeline] = useState<AboutTimelineItem[]>(() => {
    if (settings.aboutTimelineJson) {
      try {
        const parsed = JSON.parse(settings.aboutTimelineJson);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {}
    }
    return DEFAULT_TIMELINE;
  });

  // Differentiators state
  const [differentiators, setDifferentiators] = useState<AboutDifferentiatorItem[]>(() => {
    if (settings.aboutDifferentiatorsJson) {
      try {
        const parsed = JSON.parse(settings.aboutDifferentiatorsJson);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {}
    }
    return DEFAULT_DIFFERENTIATORS;
  });

  // Core Values state
  const [coreValues, setCoreValues] = useState<AboutCoreValueItem[]>(() => {
    if (settings.aboutCoreValuesJson) {
      try {
        const parsed = JSON.parse(settings.aboutCoreValuesJson);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {}
    }
    return DEFAULT_CORE_VALUES;
  });

  // Commitments state
  const [commitments, setCommitments] = useState<AboutCommitmentItem[]>(() => {
    if (settings.aboutCommitmentsJson) {
      try {
        const parsed = JSON.parse(settings.aboutCommitmentsJson);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {}
    }
    return DEFAULT_COMMITMENTS;
  });

  const handleStatsChange = (newStats: AboutStatItem[]) => {
    setStats(newStats);
    updateSettingField("aboutStatsJson", JSON.stringify(newStats));
  };

  const handleLeadersChange = (newLeaders: AboutLeaderItem[]) => {
    setLeaders(newLeaders);
    updateSettingField("aboutLeadershipJson", JSON.stringify(newLeaders));
  };

  const handleTimelineChange = (newTimeline: AboutTimelineItem[]) => {
    setTimeline(newTimeline);
    updateSettingField("aboutTimelineJson", JSON.stringify(newTimeline));
  };

  const handleDifferentiatorsChange = (newDiffs: AboutDifferentiatorItem[]) => {
    setDifferentiators(newDiffs);
    updateSettingField("aboutDifferentiatorsJson", JSON.stringify(newDiffs));
  };

  const handleCoreValuesChange = (newValues: AboutCoreValueItem[]) => {
    setCoreValues(newValues);
    updateSettingField("aboutCoreValuesJson", JSON.stringify(newValues));
  };

  const handleCommitmentsChange = (newComm: AboutCommitmentItem[]) => {
    setCommitments(newComm);
    updateSettingField("aboutCommitmentsJson", JSON.stringify(newComm));
  };

  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="bg-white border border-blue-200/80 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-600">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 font-heading text-lg">
              About Us Page Full CMS
            </h3>
            <p className="text-xs text-slate-500">
              Hero banner, company story, leadership team, timeline milestones, differentiators, core values &amp; commitments.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/about-us"
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
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md hover:scale-105 transition flex items-center gap-2 cursor-pointer disabled:opacity-60"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving..." : "Save About Us"}</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: HERO BANNER & STAT COUNTERS */}
      <div className="bg-white border border-amber-200/80 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">1</span>
            <h4 className="font-bold text-slate-900 text-sm font-heading">Hero Banner &amp; Quick Stat Counters</h4>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">Top Banner with Animated Metrics</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Hero Heading (Use | to split color, e.g. About | Us)</label>
            <input
              type="text"
              value={settings.aboutHeroHeading || "About | Us"}
              onChange={(e) => updateSettingField("aboutHeroHeading", e.target.value)}
              placeholder="About | Us"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Hero Subtitle</label>
            <input
              type="text"
              value={settings.aboutHeroSubtitle || "A Legacy Built on Quality & Trust with Over 70 Years Experience"}
              onChange={(e) => updateSettingField("aboutHeroSubtitle", e.target.value)}
              placeholder="A Legacy Built on Quality & Trust"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200"
            />
          </div>

          <div className="sm:col-span-2">
            <FileUploadField
              label="About Us Hero Background Image (HD)"
              currentValue={settings.aboutHeroImage || "/images/about/about-hero-banner.webp"}
              onUploadSuccess={(url) => updateSettingField("aboutHeroImage", url)}
              helperText="Full-width background image displayed in the About Us top banner."
            />
          </div>
        </div>

        {/* 4 Quick Stat Counters */}
        <div className="pt-2 border-t border-slate-100 space-y-3">
          <span className="font-bold text-slate-800 text-xs block">4 Key Metric Counters</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {stats.map((st, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div>
                  <label className="font-bold text-slate-600 text-[10px] block mb-0.5">Value &amp; Suffix</label>
                  <div className="flex gap-1">
                    <input
                      type="text"
                      value={st.value}
                      onChange={(e) => {
                        const updated = [...stats];
                        updated[idx].value = e.target.value;
                        handleStatsChange(updated);
                      }}
                      className="w-2/3 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 font-mono font-bold text-[#D49E17]"
                    />
                    <input
                      type="text"
                      value={st.suffix}
                      onChange={(e) => {
                        const updated = [...stats];
                        updated[idx].suffix = e.target.value;
                        handleStatsChange(updated);
                      }}
                      className="w-1/3 px-2 py-1.5 rounded-lg bg-white border border-slate-200 font-mono text-center text-xs"
                      placeholder="+"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-bold text-slate-600 text-[10px] block mb-0.5">Label</label>
                  <input
                    type="text"
                    value={st.label}
                    onChange={(e) => {
                      const updated = [...stats];
                      updated[idx].label = e.target.value;
                      handleStatsChange(updated);
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-medium"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 2: DEVELOPER STORY & LEGACY (RICH TEXT SEO LINKS) */}
      <div className="bg-white border border-amber-200/80 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">2</span>
            <h4 className="font-bold text-slate-900 text-sm font-heading">
              Developer Story &amp; Overview (Rich Text with Internal &amp; External Links)
            </h4>
          </div>
          <span className="text-[11px] text-amber-700 font-bold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 flex items-center gap-1">
            <Link2 className="w-3.5 h-3.5" />
            <span>SEO Hyperlinks Enabled</span>
          </span>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Story Section Heading (H2)</label>
            <input
              type="text"
              value={settings.aboutStoryHeading || "A Legacy Built on Quality & Trust"}
              onChange={(e) => updateSettingField("aboutStoryHeading", e.target.value)}
              placeholder="A Legacy Built on Quality & Trust"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-900"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">
              Main Story Content (Use Link Tool in Toolbar to Add Internal &amp; External SEO Links)
            </label>
            <RichTextEditor
              value={settings.aboutStoryText || ""}
              onChange={(html) => updateSettingField("aboutStoryText", html)}
              placeholder="Write the company background, SKB history, and development goals..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Our Mission Statement</label>
              <textarea
                rows={3}
                value={settings.aboutMissionText || ""}
                onChange={(e) => updateSettingField("aboutMissionText", e.target.value)}
                placeholder="Our mission is to deliver master-planned, legally secure, and high-standard communities..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 leading-relaxed"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Our Vision Statement</label>
              <textarea
                rows={3}
                value={settings.aboutVisionText || ""}
                onChange={(e) => updateSettingField("aboutVisionText", e.target.value)}
                placeholder="To set the benchmark for quality urban development and long-term capital growth in Pakistan..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 leading-relaxed"
              />
            </div>
          </div>

          <div>
            <FileUploadField
              label="Legacy Overview Featured Photo"
              currentValue={settings.aboutLegacyImage || "/images/imgi_25_saffron-city-islamabad.webp"}
              onUploadSuccess={(url) => updateSettingField("aboutLegacyImage", url)}
              helperText="Image displayed beside the legacy story on the About Us page."
            />
          </div>
        </div>
      </div>

      {/* SECTION 3: LEADERSHIP TEAM CMS (WITH INDIVIDUAL IMAGE UPLOADERS) */}
      <div className="bg-white border border-amber-200/80 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">3</span>
            <h4 className="font-bold text-slate-900 text-sm font-heading">
              Our Leadership Team ({leaders.length} Members with Individual Photos)
            </h4>
          </div>
          <button
            type="button"
            onClick={() => {
              const updated = [
                ...leaders,
                {
                  name: "New Executive Member",
                  role: "Director Operations",
                  bio: "Over two decades of civil and commercial infrastructure management experience.",
                  image: "/images/imgi_8_ceo-150x150.webp",
                },
              ];
              handleLeadersChange(updated);
            }}
            className="px-3 py-1.5 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold text-xs flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Leader</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-2">
          {leaders.map((leader, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-3 relative">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                  Leader #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const updated = leaders.filter((_, i) => i !== idx);
                    handleLeadersChange(updated);
                  }}
                  className="p-1 rounded-lg text-rose-500 hover:bg-rose-50 transition cursor-pointer"
                  title="Remove Leader"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={leader.name}
                    onChange={(e) => {
                      const updated = [...leaders];
                      updated[idx].name = e.target.value;
                      handleLeadersChange(updated);
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-bold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Role / Designation</label>
                  <input
                    type="text"
                    value={leader.role}
                    onChange={(e) => {
                      const updated = [...leaders];
                      updated[idx].role = e.target.value;
                      handleLeadersChange(updated);
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-bold text-[#D49E17]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Short Bio</label>
                  <textarea
                    rows={3}
                    value={leader.bio}
                    onChange={(e) => {
                      const updated = [...leaders];
                      updated[idx].bio = e.target.value;
                      handleLeadersChange(updated);
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs leading-relaxed"
                  />
                </div>

                <div>
                  <FileUploadField
                    label="Portrait Photo"
                    currentValue={leader.image}
                    onUploadSuccess={(url) => {
                      const updated = [...leaders];
                      updated[idx].image = url;
                      handleLeadersChange(updated);
                    }}
                    helperText="Upload official headshot / portrait."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 4: DEVELOPMENT TIMELINE & MILESTONES */}
      <div className="bg-white border border-amber-200/80 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">4</span>
            <h4 className="font-bold text-slate-900 text-sm font-heading">
              Development Timeline &amp; Milestones ({timeline.length} Milestones)
            </h4>
          </div>
          <button
            type="button"
            onClick={() => {
              const updated = [
                ...timeline,
                {
                  year: "2027",
                  milestone: "Phase completion and next sector possession delivery.",
                },
              ];
              handleTimelineChange(updated);
            }}
            className="px-3 py-1.5 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold text-xs flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Milestone</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {timeline.map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-2 relative">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200">
                  Phase 0{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const updated = timeline.filter((_, i) => i !== idx);
                    handleTimelineChange(updated);
                  }}
                  className="p-1 rounded-lg text-rose-500 hover:bg-rose-50 transition cursor-pointer"
                  title="Remove Milestone"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-0.5">Year</label>
                  <input
                    type="text"
                    value={item.year}
                    onChange={(e) => {
                      const updated = [...timeline];
                      updated[idx].year = e.target.value;
                      handleTimelineChange(updated);
                    }}
                    className="w-full px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 font-mono font-bold text-[#D49E17]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-0.5">Milestone Summary</label>
                  <textarea
                    rows={3}
                    value={item.milestone}
                    onChange={(e) => {
                      const updated = [...timeline];
                      updated[idx].milestone = e.target.value;
                      handleTimelineChange(updated);
                    }}
                    className="w-full px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 5: WHAT MAKES SAFFRON CITY DIFFERENT (DIFFERENTIATORS) */}
      <div className="bg-white border border-amber-200/80 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">5</span>
            <h4 className="font-bold text-slate-900 text-sm font-heading">
              What Makes Saffron City Different ({differentiators.length} Cards with Photos)
            </h4>
          </div>
          <button
            type="button"
            onClick={() => {
              const updated = [
                ...differentiators,
                {
                  number: `0${differentiators.length + 1}`,
                  badge: "Feature Badge",
                  title: "New Key Differentiator",
                  desc: "Clear explanation of what sets this development apart.",
                  image: "/images/about/val-quality.webp",
                },
              ];
              handleDifferentiatorsChange(updated);
            }}
            className="px-3 py-1.5 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold text-xs flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Differentiator</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
          {differentiators.map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-3 relative">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                  Differentiator #{idx + 1} ({item.number})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const updated = differentiators.filter((_, i) => i !== idx);
                    handleDifferentiatorsChange(updated);
                  }}
                  className="p-1 rounded-lg text-rose-500 hover:bg-rose-50 transition cursor-pointer"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Badge Tag</label>
                  <input
                    type="text"
                    value={item.badge}
                    onChange={(e) => {
                      const updated = [...differentiators];
                      updated[idx].badge = e.target.value;
                      handleDifferentiatorsChange(updated);
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-bold text-[#D49E17]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Title</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => {
                      const updated = [...differentiators];
                      updated[idx].title = e.target.value;
                      handleDifferentiatorsChange(updated);
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-bold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={item.desc}
                    onChange={(e) => {
                      const updated = [...differentiators];
                      updated[idx].desc = e.target.value;
                      handleDifferentiatorsChange(updated);
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                  />
                </div>

                <div className="sm:col-span-2">
                  <FileUploadField
                    label={`Differentiator #${idx + 1} Photo`}
                    currentValue={item.image}
                    onUploadSuccess={(url) => {
                      const updated = [...differentiators];
                      updated[idx].image = url;
                      handleDifferentiatorsChange(updated);
                    }}
                    helperText="Upload photo for this feature."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 6: OUR CORE VALUES CMS */}
      <div className="bg-white border border-amber-200/80 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">6</span>
            <h4 className="font-bold text-slate-900 text-sm font-heading">
              Our Core Values ({coreValues.length} Values Cards with Photos)
            </h4>
          </div>
          <button
            type="button"
            onClick={() => {
              const updated = [
                ...coreValues,
                {
                  tag: "Value Tag",
                  title: "New Core Value",
                  desc: "Guiding principle description.",
                  image: "/images/about/val-integrity.webp",
                },
              ];
              handleCoreValuesChange(updated);
            }}
            className="px-3 py-1.5 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold text-xs flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Core Value</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
          {coreValues.map((val, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-3 relative">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                  Value #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const updated = coreValues.filter((_, i) => i !== idx);
                    handleCoreValuesChange(updated);
                  }}
                  className="p-1 rounded-lg text-rose-500 hover:bg-rose-50 transition cursor-pointer"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tag (e.g. Integrity)</label>
                  <input
                    type="text"
                    value={val.tag}
                    onChange={(e) => {
                      const updated = [...coreValues];
                      updated[idx].tag = e.target.value;
                      handleCoreValuesChange(updated);
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-bold text-[#D49E17]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Title</label>
                  <input
                    type="text"
                    value={val.title}
                    onChange={(e) => {
                      const updated = [...coreValues];
                      updated[idx].title = e.target.value;
                      handleCoreValuesChange(updated);
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-bold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={val.desc}
                    onChange={(e) => {
                      const updated = [...coreValues];
                      updated[idx].desc = e.target.value;
                      handleCoreValuesChange(updated);
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                  />
                </div>

                <div className="sm:col-span-2">
                  <FileUploadField
                    label={`Core Value #${idx + 1} Photo`}
                    currentValue={val.image}
                    onUploadSuccess={(url) => {
                      const updated = [...coreValues];
                      updated[idx].image = url;
                      handleCoreValuesChange(updated);
                    }}
                    helperText="Upload photo for this core value."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 7: OUR COMMITMENTS TO STAKEHOLDERS */}
      <div className="bg-white border border-amber-200/80 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">7</span>
            <h4 className="font-bold text-slate-900 text-sm font-heading">
              Our Commitment to Stakeholders ({commitments.length} Commitment Cards)
            </h4>
          </div>
          <button
            type="button"
            onClick={() => {
              const updated = [
                ...commitments,
                {
                  title: "For Commercial Partners",
                  subtitle: "Prime Business Visibility",
                  desc: "Modern infrastructure and prime frontage on GT Road.",
                  image: "/images/amenities/amenity_park.webp",
                },
              ];
              handleCommitmentsChange(updated);
            }}
            className="px-3 py-1.5 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold text-xs flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Commitment</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-2">
          {commitments.map((comm, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-3 relative">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                  Target: {comm.title}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const updated = commitments.filter((_, i) => i !== idx);
                    handleCommitmentsChange(updated);
                  }}
                  className="p-1 rounded-lg text-rose-500 hover:bg-rose-50 transition cursor-pointer"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Title</label>
                  <input
                    type="text"
                    value={comm.title}
                    onChange={(e) => {
                      const updated = [...commitments];
                      updated[idx].title = e.target.value;
                      handleCommitmentsChange(updated);
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-bold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={comm.subtitle}
                    onChange={(e) => {
                      const updated = [...commitments];
                      updated[idx].subtitle = e.target.value;
                      handleCommitmentsChange(updated);
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-bold text-[#D49E17]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={comm.desc}
                    onChange={(e) => {
                      const updated = [...commitments];
                      updated[idx].desc = e.target.value;
                      handleCommitmentsChange(updated);
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                  />
                </div>

                <div>
                  <FileUploadField
                    label="Commitment Card Photo"
                    currentValue={comm.image}
                    onUploadSuccess={(url) => {
                      const updated = [...commitments];
                      updated[idx].image = url;
                      handleCommitmentsChange(updated);
                    }}
                    helperText="Upload image for this card."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button Bottom */}
      <div className="flex justify-end pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="px-8 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md hover:scale-105 transition cursor-pointer flex items-center gap-2 disabled:opacity-60"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Saving Changes..." : "Save All About Us Changes"}</span>
        </button>
      </div>
    </div>
  );
}
