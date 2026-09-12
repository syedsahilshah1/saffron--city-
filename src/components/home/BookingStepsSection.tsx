"use client";

import React, { useState } from "react";
import { 
  Compass, 
  SearchCheck, 
  FileText, 
  Send, 
  CreditCard, 
  Award, 
  CheckCircle2, 
  MessageCircle, 
  Sparkles
} from "lucide-react";

interface StepItem {
  step: number;
  phase: string;
  title: string;
  desc: string;
  tag: string;
  icon: React.ElementType;
  tip: string;
}

const STEPS_DATA: StepItem[] = [
  {
    step: 1,
    phase: "Phase 01",
    title: "Choose Your Plot",
    desc: "Decide on your desired plot size: 5 Marla, 10 Marla, 1 Kanal residential, or 5.33 Marla (30×40) / 4 Marla / 8 Marla commercial based on your budget.",
    tag: "Residential & Commercial",
    icon: Compass,
    tip: "Sector A (Block B) & Sector B available"
  },
  {
    step: 2,
    phase: "Phase 02",
    title: "Confirm Availability & Pricing",
    desc: "Connect directly with our verified sales desk to verify real-time inventory, boulevard options, and park-facing plot availability.",
    tag: "Official Verification",
    icon: SearchCheck,
    tip: "Instant confirmation via WhatsApp"
  },
  {
    step: 3,
    phase: "Phase 03",
    title: "Prepare Your Documents",
    desc: "Collect applicant CNIC copy, next-of-kin CNIC copy, 2 passport-size photographs, and NICOP copy if applying as an overseas Pakistani.",
    tag: "Required Paperwork",
    icon: FileText,
    tip: "Overseas NICOP supported"
  },
  {
    step: 4,
    phase: "Phase 04",
    title: "Submit Your Application",
    desc: "Complete the official booking application form with your verified particulars and sector preferences.",
    tag: "Direct Registration",
    icon: Send,
    tip: "Digital or site office submission"
  },
  {
    step: 5,
    phase: "Phase 05",
    title: "Pay 10% Down Payment",
    desc: "Pay the 10% booking amount via bank transfer, demand draft / pay order in favor of SKB / Saffron City, or cash at the site office.",
    tag: "100% Transparent",
    icon: CreditCard,
    tip: "Official payment receipt issued"
  },
  {
    step: 6,
    phase: "Phase 06",
    title: "Receive Allotment Letter",
    desc: "Receive your officially stamped Allotment Letter followed by your customized 30-month installment payment schedule.",
    tag: "Guaranteed Ownership",
    icon: Award,
    tip: "Physical file & digital tracking"
  }
];

export default function BookingStepsSection({ whatsappUrl }: { whatsappUrl: string }) {
  const [activeStep, setActiveStep] = useState<number>(1);

  return (
    <div className="w-full space-y-8">
      {/* =========================================================
          1. UNIQUE MOBILE VIEW (Connected Golden Journey Stepper)
      ========================================================= */}
      <div className="block md:hidden space-y-6">
        {/* Mobile Horizontal Step Quick-Chips Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none px-1">
          {STEPS_DATA.map((s) => {
            const isActive = activeStep === s.step;
            return (
              <button
                key={`chip-${s.step}`}
                type="button"
                onClick={() => {
                  setActiveStep(s.step);
                  const el = document.getElementById(`step-card-${s.step}`);
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "center" });
                  }
                }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-amber-500 via-[#D49E17] to-amber-600 text-white shadow-md scale-105"
                    : "bg-amber-50 text-slate-700 border border-amber-200/80 hover:bg-amber-100"
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
                  {s.step}
                </span>
                <span>Step {s.step}</span>
              </button>
            );
          })}
        </div>

        {/* Vertical Connected Journey Timeline */}
        <div className="relative pl-6 space-y-5">
          {/* Continuous Glowing Golden Track Line */}
          <div className="absolute left-[17px] top-4 bottom-6 w-[2.5px] bg-gradient-to-b from-amber-400 via-[#D49E17] to-amber-500 rounded-full" />

          {STEPS_DATA.map((s) => {
            const IconComponent = s.icon;
            const isSelected = activeStep === s.step;

            return (
              <div
                key={`mobile-step-${s.step}`}
                id={`step-card-${s.step}`}
                onClick={() => setActiveStep(s.step)}
                className={`relative transition-all duration-300 rounded-2xl p-4 sm:p-5 border cursor-pointer ${
                  isSelected
                    ? "bg-gradient-to-br from-amber-50/90 via-white to-amber-50/40 border-[#D49E17] shadow-lg ring-2 ring-amber-300/40 -translate-y-0.5"
                    : "bg-white border-amber-200/80 shadow-sm hover:border-amber-400"
                }`}
              >
                {/* Milestone Node Badge on the Golden Spine */}
                <div
                  className={`absolute -left-6 top-4 -translate-x-1/2 w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold shadow-md transition-transform duration-300 ${
                    isSelected
                      ? "bg-gradient-to-br from-[#D49E17] to-amber-600 text-white border-white scale-110 ring-4 ring-amber-400/30"
                      : "bg-white text-[#D49E17] border-amber-400"
                  }`}
                >
                  {s.step}
                </div>

                {/* Card Header Content */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-100/80 text-amber-900 text-[10px] font-bold uppercase tracking-wider">
                      <Sparkles className="w-2.5 h-2.5 text-[#D49E17]" />
                      {s.phase}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      {s.tag}
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#D49E17] shrink-0 mt-0.5">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 font-heading">
                        {s.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed mt-1">
                        {s.desc}
                      </p>
                    </div>
                  </div>

                  {/* Footer Micro-Tip */}
                  <div className="pt-2 border-t border-amber-100/80 flex items-center gap-1.5 text-[11px] text-amber-900/90 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{s.tip}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================
          2. TABLET & DESKTOP 3-COLUMN LUXURY GRID
      ========================================================= */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {STEPS_DATA.map((s) => {
          const IconComponent = s.icon;
          return (
            <div
              key={`desk-step-${s.step}`}
              className="p-6 rounded-3xl bg-white border border-amber-200/80 hover:border-[#D49E17] shadow-md hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#D49E17] font-bold text-base group-hover:scale-110 group-hover:bg-[#D49E17] group-hover:text-white transition-all shadow-sm">
                    {s.step}
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-bold">
                    {s.phase}
                  </span>
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#D49E17]">
                    <IconComponent className="w-4 h-4 shrink-0" />
                    <span>{s.tag}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-heading group-hover:text-[#D49E17] transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{s.tip}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* WhatsApp Booking CTA Button */}
      <div className="text-center pt-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
        >
          <MessageCircle className="w-5 h-5" />
          <span>Start Booking Step 1 on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
