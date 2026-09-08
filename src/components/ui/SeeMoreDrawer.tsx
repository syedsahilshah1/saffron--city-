"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Sparkles } from "lucide-react";

interface SeeMoreDrawerProps {
  previewContent?: React.ReactNode;
  children: React.ReactNode;
  moreButtonText?: string;
  lessButtonText?: string;
  defaultOpen?: boolean;
  className?: string;
}

export default function SeeMoreDrawer({
  previewContent,
  children,
  moreButtonText = "See More Details",
  lessButtonText = "Show Less Details",
  defaultOpen = false,
  className = "",
}: SeeMoreDrawerProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`w-full ${className}`}>
      {previewContent && <div>{previewContent}</div>}

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen
            ? "max-h-[3000px] opacity-100 mt-6"
            : "max-h-0 opacity-0 mt-0 pointer-events-none"
        }`}
      >
        <div className="pt-4 border-t border-amber-200">{children}</div>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 font-bold text-sm tracking-wide transition-all duration-300 hover:shadow-md hover:border-[#D4A017] cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-[#D4A017] group-hover:rotate-12 transition-transform" />
          <span>{isOpen ? lessButtonText : moreButtonText}</span>
          {isOpen ? (
            <ChevronUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
          ) : (
            <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
          )}
        </button>
      </div>
    </div>
  );
}
