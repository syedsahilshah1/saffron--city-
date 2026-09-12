"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, Sparkles, CheckCircle2 } from "lucide-react";

export interface FaqData {
  question: string;
  answer: string;
  category?: string;
}

interface FaqAccordionProps {
  items: FaqData[];
  className?: string;
  defaultOpenIndex?: number;
}

export default function FaqAccordion({
  items,
  className = "",
  defaultOpenIndex = 0,
}: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(items.map((i) => i.category).filter(Boolean)))];

  const filteredItems =
    activeCategory === "All"
      ? items
      : items.filter((i) => i.category === activeCategory);

  const toggleItem = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className={`w-full space-y-6 ${className}`}>
      {/* Category Tabs if multiple categories exist */}
      {categories.length > 2 && (
        <div className="flex flex-wrap items-center justify-center gap-2 pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setActiveCategory(cat as string);
                setOpenIndex(0);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#D49E17] text-slate-950 shadow-md scale-105"
                  : "bg-amber-50/80 hover:bg-amber-100 text-slate-700 border border-amber-200/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredItems.map((item, index) => {
          const isOpen = openIndex === index;
          const qNum = String(index + 1).padStart(2, "0");

          return (
            <div
              key={item.question}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? "bg-white border-amber-300 shadow-lg ring-1 ring-amber-300/40"
                  : "bg-white/80 hover:bg-white border-amber-200/70 hover:border-amber-300 shadow-sm"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleItem(index)}
                className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer select-none"
                aria-expanded={isOpen}
              >
                <div className="flex items-start gap-3.5">
                  <span
                    className={`inline-flex items-center justify-center w-7 h-7 rounded-xl font-mono text-xs font-bold shrink-0 transition-colors ${
                      isOpen
                        ? "bg-[#D49E17] text-slate-950 shadow"
                        : "bg-amber-50 text-amber-800 border border-amber-200"
                    }`}
                  >
                    {qNum}
                  </span>
                  <div>
                    <h4
                      className={`text-sm sm:text-base font-bold transition-colors ${
                        isOpen ? "text-[#D49E17]" : "text-slate-900 hover:text-amber-800"
                      }`}
                    >
                      {item.question}
                    </h4>
                    {item.category && (
                      <span className="inline-block mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                        {item.category}
                      </span>
                    )}
                  </div>
                </div>

                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isOpen
                      ? "bg-amber-100 text-[#D49E17] rotate-180"
                      : "bg-slate-100 text-slate-500 hover:bg-amber-50 hover:text-amber-700"
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {/* Collapsible Answer Body */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-amber-100/60 mt-1">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
