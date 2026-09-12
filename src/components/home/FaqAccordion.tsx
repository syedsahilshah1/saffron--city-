"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";
import { HOME_FAQS } from "@/data/saffron-data";

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {HOME_FAQS.map((faq, idx) => {
        const isOpen = openIndex === idx;

        return (
          <div
            key={idx}
            className={`rounded-2xl lg:rounded-3xl border transition-all duration-300 overflow-hidden ${
              isOpen
                ? "bg-white border-[#D49E17] shadow-lg shadow-amber-500/10"
                : "bg-slate-50/80 border-slate-200 hover:border-amber-300 hover:bg-white"
            }`}
          >
            {/* Question Header Button */}
            <button
              type="button"
              onClick={() => toggleFaq(idx)}
              className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer select-none"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3.5">
                {/* Gold Dot */}
                <span
                  className={`w-2.5 h-2.5 rounded-full shrink-0 transition-colors duration-300 ${
                    isOpen
                      ? "bg-[#D49E17] shadow-[0_0_10px_rgba(212, 158, 23,0.6)]"
                      : "bg-amber-400"
                  }`}
                />
                <span className="text-base sm:text-lg font-bold text-slate-900 font-heading tracking-tight">
                  {faq.question}
                </span>
              </div>

              {/* Rotating Chevron Icon */}
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                  isOpen
                    ? "bg-amber-50 text-[#D49E17] rotate-180 border border-amber-300"
                    : "bg-white text-slate-400 border border-slate-200"
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            {/* Collapsible Answer Panel */}
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-6 pb-6 pt-1 pl-11 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                {faq.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
