"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  FileCheck,
  ArrowRight,
  Landmark,
  Layers,
  Award,
} from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import StaggerReveal from "@/components/animations/StaggerReveal";
import { StoredSettings } from "@/lib/types";

export default function NocApprovalSection({
  settings,
}: {
  settings?: Partial<StoredSettings>;
}) {
  const rdaStatus = settings?.rdaNocStatus || "RDA Approved (Full 15,000 Kanal)";
  const rdaUrl = settings?.rdaVerificationUrl || "https://punjab.gov.pk";

  const legalPillars = [
    {
      title: "RDA Approved No Objection Certificate",
      desc: "Full regulatory clearance approved by Rawalpindi Development Authority across all residential and commercial zones.",
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
      tag: "Official NOC",
    },
    {
      title: "15,000 Kanal Sanctioned Master Layout",
      desc: "Legally sanctioned master layout plan (LOP) with wide 250-foot grand boulevards, civic amenities, and open parks.",
      icon: <Layers className="w-5 h-5 text-[#D49E17]" />,
      tag: "Sanctioned Plan",
    },
    {
      title: "Clear Land Title & Transparent Registry",
      desc: "100% verified land title with immediate allotment confirmation, mutation registry, and secure investor transfers.",
      icon: <FileCheck className="w-5 h-5 text-emerald-600" />,
      tag: "Verified Ownership",
    },
    {
      title: "Decades of Engineering Pedigree",
      desc: "Developed by premier builders of national highways, bridges, and planned master developments with proven delivery excellence.",
      icon: <Award className="w-5 h-5 text-[#D49E17]" />,
      tag: "Trusted Developer",
    },
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 sm:space-y-12">
      {/* Top Banner & Heading */}
      <ScrollReveal animation="fade-up" className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-slate-900 tracking-normal leading-[1.18]">
          100% Legal &amp; Verified{" "}
          <span className="font-serif italic font-normal text-slate-800">
            RDA NOC
          </span>{" "}
          <span className="font-serif font-semibold text-slate-900">
            Approval
          </span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Saffron City offers complete legal security with an official No Objection Certificate (NOC) granted by the Rawalpindi Development Authority across the entire 15,000 Kanal master community.
        </p>
      </ScrollReveal>

      {/* 4-Pillar Grid */}
      <StaggerReveal
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        staggerDelay={70}
        direction="up"
      >
        {legalPillars.map((item, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-7 rounded-3xl bg-white border border-amber-200/80 hover:border-[#D49E17] shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center group-hover:bg-amber-100 group-hover:scale-105 transition-all">
                  {item.icon}
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  {item.tag}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-base font-heading group-hover:text-[#D49E17] transition-colors leading-snug">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {item.desc}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified RDA Status</span>
            </div>
          </div>
        ))}
      </StaggerReveal>

      {/* Action CTA Bar */}
      <ScrollReveal animation="fade-up" delay={100}>
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-50 via-white to-amber-50 border border-amber-200/90 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
              Official Regulatory Status
            </span>
            <h4 className="text-lg sm:text-xl font-bold text-slate-900 font-heading">
              {rdaStatus}
            </h4>
            <p className="text-xs text-slate-600 max-w-xl">
              Independently verifiable on the official Punjab Government &amp; RDA portals for 100% peace of mind.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              href="/noc-status"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-[#D49E17] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-md hover:scale-105 transition-all"
            >
              <span>Inspect NOC Documents</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={rdaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs shadow-sm hover:border-[#D49E17] transition-all"
            >
              <span>Verify on Punjab Portal</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#D49E17]" />
            </a>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
