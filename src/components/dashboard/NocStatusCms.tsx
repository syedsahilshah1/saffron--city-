"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Building2,
  ExternalLink,
  Save,
  Plus,
  Trash2,
  HelpCircle,
  FileText,
  FileCheck,
  CheckCircle2,
  Compass,
  FileDown,
  Sparkles,
  Phone,
  Layers,
  ArrowRight
} from "lucide-react";
import { StoredSettings } from "@/lib/types";
import FileUploadField from "@/components/dashboard/FileUploadField";
import RichTextEditor from "@/components/dashboard/RichTextEditor";

interface NocStatusCmsProps {
  settings: StoredSettings;
  updateSettingField: (field: keyof StoredSettings, value: any) => void;
  onSave: () => void;
  saving: boolean;
}

interface NocDocumentItem {
  id: string;
  title: string;
  authority: string;
  status: string;
  tag: string;
  image: string;
  description: string;
}

interface NocStepItem {
  id: string;
  stepNumber: string;
  title: string;
  desc: string;
}

interface NocFaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

const DEFAULT_DOCUMENTS: NocDocumentItem[] = [
  {
    id: "doc-1",
    title: "Official RDA No Objection Certificate (NOC)",
    authority: "Rawalpindi Development Authority (RDA)",
    status: "100% Approved & Issued",
    image: "/images/facilities/gated-security.webp",
    tag: "Primary Approval",
    description: "Confirms official regulatory clearance for Saffron City covering the entire 15,000 Kanal housing scheme on Main GT Road."
  },
  {
    id: "doc-2",
    title: "Sanctioned Master Layout Plan (LOP)",
    authority: "Town Planning Directorate",
    status: "Approved Town Planning",
    image: "/images/saffron-city-master-plan.webp",
    tag: "Layout Clearance",
    description: "Legally sanctioned road widths (up to 250ft), dedicated civic amenities, green belts, and plot demarcations."
  },
  {
    id: "doc-3",
    title: "Clear Land Ownership & Revenue Registry",
    authority: "Punjab Land Records Authority",
    status: "Verified Clear Title",
    image: "/images/about/about-hero-banner.webp",
    tag: "Land Title",
    description: "Complete unencumbered legal title with transparent transfer and registry procedures for individual allottees."
  },
  {
    id: "doc-4",
    title: "Underground Infrastructure Sanctions",
    authority: "IESCO, SNGPL & WASA Guidelines",
    status: "Civic Compliance",
    image: "/images/facilities/underground-utilities.webp",
    tag: "Utility Clearance",
    description: "Sanctioned underground utility network for zero-load shedding power grid, gas piping, and water filtration plants."
  }
];

const DEFAULT_STEPS: NocStepItem[] = [
  {
    id: "step-1",
    stepNumber: "1",
    title: "Visit RDA Portal",
    desc: "Open your browser and navigate to rda.gop.pk or ptc.punjab.gov.pk"
  },
  {
    id: "step-2",
    stepNumber: "2",
    title: "Approved Schemes",
    desc: "Navigate to the official registry of RDA Approved Housing Schemes in Rawalpindi."
  },
  {
    id: "step-3",
    stepNumber: "3",
    title: "Search Saffron City",
    desc: "Search for \"Saffron City\" to review the approved 15,000 Kanal area status."
  },
  {
    id: "step-4",
    stepNumber: "4",
    title: "Cross-Check Letters",
    desc: "Request the official signed clearance copies directly from our sales advisors."
  }
];

const DEFAULT_FAQS: NocFaqItem[] = [
  {
    id: "faq-1",
    question: "Does Saffron City fall under RDA or CDA jurisdiction?",
    answer: "Saffron City is located on Main GT Road near Rawat within Rawalpindi's territorial boundary, placing it under the complete regulatory jurisdiction of the Rawalpindi Development Authority (RDA).",
    category: "Jurisdiction"
  },
  {
    id: "faq-2",
    question: "What is the total land area approved under Saffron City's NOC?",
    answer: "The RDA No Objection Certificate covers the comprehensive 15,000 Kanal master-planned project area, ensuring legal protection for residential, commercial, and civic sectors.",
    category: "Approval Area"
  },
  {
    id: "faq-3",
    question: "How can I verify Saffron City's NOC status myself?",
    answer: "You can verify the approval directly on the official Punjab Government web portal (ptc.punjab.gov.pk or rda.gop.pk) under the approved housing societies list, or visit the RDA headquarters in Rawalpindi.",
    category: "Verification"
  },
  {
    id: "faq-4",
    question: "Can I legally construct a house on an RDA-approved plot?",
    answer: "Yes. Once possession is handed over in line with the payment schedule, buyers can submit their architectural maps to RDA for immediate construction approval.",
    category: "Construction"
  },
  {
    id: "faq-5",
    question: "Are plots eligible for bank home loans and financing?",
    answer: "Yes. Major Pakistani commercial banks and financial institutions only sanction home loans and mortgage financing for legally approved projects with valid NOC clearance like Saffron City.",
    category: "Financing"
  }
];

export default function NocStatusCms({
  settings,
  updateSettingField,
  onSave,
  saving
}: NocStatusCmsProps) {
  // Parse Stats
  const defaultStats = {
    areaStat: "15,000 K",
    areaLabel: "Approved Area",
    authorityStat: "RDA",
    authorityLabel: "Regulatory Authority",
    titleStat: "100%",
    titleLabel: "Clear Legal Title",
    constStat: "Active",
    constLabel: "Ground Construction"
  };

  const getStats = () => {
    if (!settings.nocStatsJson) return defaultStats;
    try {
      const parsed = JSON.parse(settings.nocStatsJson);
      return { ...defaultStats, ...parsed };
    } catch {
      return defaultStats;
    }
  };

  const stats = getStats();

  const handleStatChange = (key: string, value: string) => {
    const updated = { ...stats, [key]: value };
    updateSettingField("nocStatsJson", JSON.stringify(updated));
  };

  // Parse Documents
  const getDocuments = (): NocDocumentItem[] => {
    if (!settings.nocDocumentsJson) return DEFAULT_DOCUMENTS;
    try {
      const parsed = JSON.parse(settings.nocDocumentsJson);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_DOCUMENTS;
    } catch {
      return DEFAULT_DOCUMENTS;
    }
  };

  const [documents, setDocuments] = useState<NocDocumentItem[]>(getDocuments());

  const handleDocumentChange = (index: number, field: keyof NocDocumentItem, value: string) => {
    const updated = [...documents];
    updated[index] = { ...updated[index], [field]: value };
    setDocuments(updated);
    updateSettingField("nocDocumentsJson", JSON.stringify(updated));
  };

  const handleAddDocument = () => {
    const newItem: NocDocumentItem = {
      id: `doc-${Date.now()}`,
      title: "New Statutory Sanction Document",
      authority: "Government Authority",
      status: "100% Approved",
      tag: "Statutory Approval",
      image: "/images/facilities/gated-security.webp",
      description: "Official legal sanction document and clearance letter details."
    };
    const updated = [...documents, newItem];
    setDocuments(updated);
    updateSettingField("nocDocumentsJson", JSON.stringify(updated));
  };

  const handleRemoveDocument = (index: number) => {
    const updated = documents.filter((_, i) => i !== index);
    setDocuments(updated);
    updateSettingField("nocDocumentsJson", JSON.stringify(updated));
  };

  // Parse Steps
  const getSteps = (): NocStepItem[] => {
    if (!settings.nocStepsJson) return DEFAULT_STEPS;
    try {
      const parsed = JSON.parse(settings.nocStepsJson);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_STEPS;
    } catch {
      return DEFAULT_STEPS;
    }
  };

  const [steps, setSteps] = useState<NocStepItem[]>(getSteps());

  const handleStepChange = (index: number, field: keyof NocStepItem, value: string) => {
    const updated = [...steps];
    updated[index] = { ...updated[index], [field]: value };
    setSteps(updated);
    updateSettingField("nocStepsJson", JSON.stringify(updated));
  };

  const handleAddStep = () => {
    const newItem: NocStepItem = {
      id: `step-${Date.now()}`,
      stepNumber: `${steps.length + 1}`,
      title: "New Verification Step",
      desc: "Instructions on how to verify legal records on official government portals."
    };
    const updated = [...steps, newItem];
    setSteps(updated);
    updateSettingField("nocStepsJson", JSON.stringify(updated));
  };

  const handleRemoveStep = (index: number) => {
    const updated = steps.filter((_, i) => i !== index);
    setSteps(updated);
    updateSettingField("nocStepsJson", JSON.stringify(updated));
  };

  // Parse FAQs
  const getFaqs = (): NocFaqItem[] => {
    if (!settings.nocFaqsJson) return DEFAULT_FAQS;
    try {
      const parsed = JSON.parse(settings.nocFaqsJson);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_FAQS;
    } catch {
      return DEFAULT_FAQS;
    }
  };

  const [faqs, setFaqs] = useState<NocFaqItem[]>(getFaqs());

  const handleFaqChange = (index: number, field: keyof NocFaqItem, value: string) => {
    const updated = [...faqs];
    updated[index] = { ...updated[index], [field]: value };
    setFaqs(updated);
    updateSettingField("nocFaqsJson", JSON.stringify(updated));
  };

  const handleAddFaq = () => {
    const newFaq: NocFaqItem = {
      id: `faq-${Date.now()}`,
      question: "New Legal & NOC Question?",
      answer: "Detailed answer explaining legal protections and RDA guidelines.",
      category: "Legal Verification"
    };
    const updated = [...faqs, newFaq];
    setFaqs(updated);
    updateSettingField("nocFaqsJson", JSON.stringify(updated));
  };

  const handleRemoveFaq = (index: number) => {
    const updated = faqs.filter((_, i) => i !== index);
    setFaqs(updated);
    updateSettingField("nocFaqsJson", JSON.stringify(updated));
  };

  return (
    <div className="bg-white border border-amber-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-10">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#D49E17] shadow-sm">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 font-heading text-xl">
              NOC Status &amp; Legal Clearances Page CMS
            </h3>
            <p className="text-xs text-slate-500">
              Manage hero banner, stat counters, statutory documents with image uploaders, verification steps, and FAQs.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/noc-status"
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
            <span>{saving ? "Saving Changes..." : "Save NOC Page"}</span>
          </button>
        </div>
      </div>

      {/* 1. HERO BANNER & STAT COUNTERS */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Sparkles className="w-5 h-5 text-[#D49E17]" />
          <h4 className="font-bold text-slate-900 text-base font-heading">
            1. Hero Banner, Verification Links &amp; 4 Stat Counters
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">
              NOC Hero Headline (Use &apos;|&apos; for gold highlight)
            </label>
            <input
              type="text"
              placeholder="Saffron City NOC Status | 100% RDA Approved"
              value={settings.nocHeroHeading || ""}
              onChange={(e) => updateSettingField("nocHeroHeading", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-900"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">
              Official RDA Verification URL (Gov Portal)
            </label>
            <input
              type="text"
              placeholder="https://ptc.punjab.gov.pk/noc or https://rda.gop.pk"
              value={settings.nocVerificationUrl || ""}
              onChange={(e) => updateSettingField("nocVerificationUrl", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="font-bold text-slate-700 block mb-1">Hero Subtitle</label>
            <input
              type="text"
              placeholder="Officially sanctioned master plan and verified legal standing backed by Rawalpindi Development Authority."
              value={settings.nocHeroSubtitle || ""}
              onChange={(e) => updateSettingField("nocHeroSubtitle", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800"
            />
          </div>

          <div className="sm:col-span-2">
            <FileUploadField
              label="Hero Background Image (1920x1080 HD Recommended)"
              currentValue={settings.nocHeroImage || "/images/about/about-hero-banner.webp"}
              onUploadSuccess={(url) => updateSettingField("nocHeroImage", url)}
            />
          </div>

          {/* 4 Stat Metrics */}
          <div className="sm:col-span-2 p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-4">
            <span className="font-bold text-slate-900 text-sm block">
              4 Hero Stat Counters (Under Main Headline)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-2">
                <label className="font-bold text-slate-600 block text-[11px]">Stat 1 (Area)</label>
                <input
                  type="text"
                  value={stats.areaStat}
                  onChange={(e) => handleStatChange("areaStat", e.target.value)}
                  placeholder="15,000 K"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 font-bold"
                />
                <input
                  type="text"
                  value={stats.areaLabel}
                  onChange={(e) => handleStatChange("areaLabel", e.target.value)}
                  placeholder="Approved Area"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600"
                />
              </div>

              <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-2">
                <label className="font-bold text-slate-600 block text-[11px]">Stat 2 (Authority)</label>
                <input
                  type="text"
                  value={stats.authorityStat}
                  onChange={(e) => handleStatChange("authorityStat", e.target.value)}
                  placeholder="RDA"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 font-bold"
                />
                <input
                  type="text"
                  value={stats.authorityLabel}
                  onChange={(e) => handleStatChange("authorityLabel", e.target.value)}
                  placeholder="Regulatory Authority"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600"
                />
              </div>

              <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-2">
                <label className="font-bold text-slate-600 block text-[11px]">Stat 3 (Title)</label>
                <input
                  type="text"
                  value={stats.titleStat}
                  onChange={(e) => handleStatChange("titleStat", e.target.value)}
                  placeholder="100%"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 font-bold text-emerald-600"
                />
                <input
                  type="text"
                  value={stats.titleLabel}
                  onChange={(e) => handleStatChange("titleLabel", e.target.value)}
                  placeholder="Clear Legal Title"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600"
                />
              </div>

              <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-2">
                <label className="font-bold text-slate-600 block text-[11px]">Stat 4 (Status)</label>
                <input
                  type="text"
                  value={stats.constStat}
                  onChange={(e) => handleStatChange("constStat", e.target.value)}
                  placeholder="Active"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 font-bold text-[#D49E17]"
                />
                <input
                  type="text"
                  value={stats.constLabel}
                  onChange={(e) => handleStatChange("constLabel", e.target.value)}
                  placeholder="Ground Construction"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. LEGAL OVERVIEW & STATUTORY FRAMEWORK (RICH TEXT & SEO LINKS) */}
      <div className="space-y-6 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <FileText className="w-5 h-5 text-emerald-600" />
          <h4 className="font-bold text-slate-900 text-base font-heading">
            2. Legal Overview &amp; Statutory Compliance (Rich Text &amp; Internal/External Links)
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Legal Section Title</label>
            <input
              type="text"
              placeholder="Official Regulatory Sanctions &amp; Statutory Compliance"
              value={settings.nocOverviewHeading || ""}
              onChange={(e) => updateSettingField("nocOverviewHeading", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Official Approval Letter Ref Number</label>
            <input
              type="text"
              placeholder="RDA/MP&TE/F-PHS-123/2023"
              value={settings.nocApprovalNumber || ""}
              onChange={(e) => updateSettingField("nocApprovalNumber", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono font-bold"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="font-bold text-slate-700 block mb-1">
              Legal Compliance Overview &amp; Statutory Details (Select text to add Internal &amp; External Links)
            </label>
            <RichTextEditor
              value={
                settings.nocOverviewText ||
                `<p>Saffron City Rawat fulfills all statutory town planning, environmental, and civic infrastructure criteria mandated by the <strong>Rawalpindi Development Authority (RDA)</strong>. With an expansive approved master-planned layout of over 15,000 Kanals, the project adheres strictly to Punjab Provincial Housing guidelines.</p><p>Buyers are guaranteed clear unencumbered title ownership, prompt allotment certificates, and sanctioned utilities network under zero-litigation land holding.</p>`
              }
              onChange={(html) => updateSettingField("nocOverviewText", html)}
            />
          </div>

          <div className="sm:col-span-2">
            <FileUploadField
              label="Official NOC Letter / Certificate Image (Optional Feature Certificate)"
              currentValue={settings.nocCertificateImage || "/images/saffron-city-master-plan.webp"}
              onUploadSuccess={(url) => updateSettingField("nocCertificateImage", url)}
            />
          </div>
        </div>
      </div>

      {/* 3. OFFICIAL REGULATORY SANCTIONS & LEGAL DOCUMENTS (INDIVIDUAL CARD IMAGES) */}
      <div className="space-y-6 pt-4 border-t border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-emerald-600" />
            <div>
              <h4 className="font-bold text-slate-900 text-base font-heading">
                3. Official Legal Sanctions &amp; Clearances (Cards with Individual Photos)
              </h4>
              <p className="text-xs text-slate-500">
                Each card represents a statutory clearance (RDA NOC, Sanctioned LOP, Revenue Registry, Utility Approvals).
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddDocument}
            className="px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-300 transition flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Sanction Card</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {documents.map((doc, idx) => (
            <div
              key={doc.id || idx}
              className="p-5 rounded-3xl bg-slate-50 border border-slate-200 hover:border-emerald-400 transition-all space-y-4 relative group"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs font-mono">
                  Document #{idx + 1}
                </span>

                <button
                  type="button"
                  onClick={() => handleRemoveDocument(idx)}
                  className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                  title="Remove Document"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <FileUploadField
                  label={`Document #${idx + 1} Photo`}
                  currentValue={doc.image}
                  onUploadSuccess={(url) => handleDocumentChange(idx, "image", url)}
                />

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Tag / Category</label>
                    <input
                      type="text"
                      placeholder="e.g. Primary Approval"
                      value={doc.tag}
                      onChange={(e) => handleDocumentChange(idx, "tag", e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-bold text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Status Badge</label>
                    <input
                      type="text"
                      placeholder="e.g. 100% Approved & Issued"
                      value={doc.status}
                      onChange={(e) => handleDocumentChange(idx, "status", e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-bold text-emerald-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Document Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Official RDA No Objection Certificate"
                    value={doc.title}
                    onChange={(e) => handleDocumentChange(idx, "title", e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Issuing Authority</label>
                  <input
                    type="text"
                    placeholder="e.g. Rawalpindi Development Authority (RDA)"
                    value={doc.authority}
                    onChange={(e) => handleDocumentChange(idx, "authority", e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-800"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Description &amp; Protection Scope</label>
                  <textarea
                    rows={3}
                    placeholder="Detailed explanation of statutory coverage..."
                    value={doc.description}
                    onChange={(e) => handleDocumentChange(idx, "description", e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 leading-relaxed"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. STEP-BY-STEP VERIFICATION GUIDE */}
      <div className="space-y-6 pt-4 border-t border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#D49E17]" />
            <div>
              <h4 className="font-bold text-slate-900 text-base font-heading">
                4. Step-by-Step Verification Guide Grid
              </h4>
              <p className="text-xs text-slate-500">
                Simple instructional cards guiding buyers on how to verify legal records on government portals.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddStep}
            className="px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs border border-amber-300 transition flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Step</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, idx) => (
            <div
              key={step.id || idx}
              className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-3 relative group"
            >
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  value={step.stepNumber}
                  onChange={(e) => handleStepChange(idx, "stepNumber", e.target.value)}
                  placeholder="1"
                  className="w-8 h-8 rounded-lg bg-amber-200/60 font-bold font-mono text-center text-xs text-amber-950"
                />

                <button
                  type="button"
                  onClick={() => handleRemoveStep(idx)}
                  className="p-1 text-rose-500 hover:bg-rose-50 rounded transition"
                  title="Remove Step"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <input
                  type="text"
                  placeholder="Step Title"
                  value={step.title}
                  onChange={(e) => handleStepChange(idx, "title", e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-amber-200 font-bold text-slate-900"
                />

                <textarea
                  rows={3}
                  placeholder="Step description..."
                  value={step.desc}
                  onChange={(e) => handleStepChange(idx, "desc", e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-amber-200 text-slate-700 leading-relaxed text-xs"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. NOC FREQUENTLY ASKED QUESTIONS ACCORDION CMS */}
      <div className="space-y-6 pt-4 border-t border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            <div>
              <h4 className="font-bold text-slate-900 text-base font-heading">
                5. Legal &amp; NOC FAQs Accordion CMS
              </h4>
              <p className="text-xs text-slate-500">
                Frequently asked questions on approvals, bank financing, jurisdiction, and construction permissions.
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
                    placeholder="e.g. Does Saffron City fall under RDA or CDA jurisdiction?"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category Tag</label>
                  <input
                    type="text"
                    value={faq.category || ""}
                    onChange={(e) => handleFaqChange(idx, "category", e.target.value)}
                    placeholder="e.g. Jurisdiction / Verification"
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

      {/* 6. DIRECT HELPLINE & CTA */}
      <div className="space-y-6 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Phone className="w-5 h-5 text-emerald-600" />
          <h4 className="font-bold text-slate-900 text-base font-heading">
            6. Legal Assistance Helpline &amp; WhatsApp Contact
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Legal Helpline Phone</label>
            <input
              type="text"
              placeholder="+92 300 1234567"
              value={settings.nocCtaPhone || settings.whatsappPhone || ""}
              onChange={(e) => updateSettingField("nocCtaPhone", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="font-bold text-slate-700 block mb-1">Helpline CTA Heading</label>
            <input
              type="text"
              placeholder="Need Official Signed Copies or Land Registry Assistance?"
              value={settings.nocCtaHeading || ""}
              onChange={(e) => updateSettingField("nocCtaHeading", e.target.value)}
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
          <span>{saving ? "Saving Changes..." : "Save NOC Status Page"}</span>
        </button>
      </div>
    </div>
  );
}
