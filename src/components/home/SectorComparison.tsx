"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ImageComparison,
  ImageComparisonImage,
  ImageComparisonSlider,
} from "@/components/core/image-comparison";
import { ArrowRight, Sparkles, Building2, Layers } from "lucide-react";

export default function SectorComparison() {
  const [activeTab, setActiveTab] = useState<"master-vs-ground" | "entrance-day-night">("master-vs-ground");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#D4A017] uppercase tracking-wider">
            Interactive Visual Comparison
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading mt-0.5">
            Compare Master Plan with Ground Vision
          </h3>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 border border-slate-200 text-xs self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab("master-vs-ground")}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              activeTab === "master-vs-ground"
                ? "bg-[#D4A017] text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Master Plan vs Vision
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("entrance-day-night")}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              activeTab === "entrance-day-night"
                ? "bg-[#D4A017] text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Boulevard &amp; Grand Gate
          </button>
        </div>
      </div>

      {/* Interactive Image Comparison Slider Container */}
      <div className="w-full rounded-3xl border border-amber-200/90 overflow-hidden shadow-2xl bg-white p-2 sm:p-3">
        {activeTab === "master-vs-ground" ? (
          <ImageComparison
            className="w-full h-[360px] sm:h-[450px] lg:h-[500px] rounded-2xl border border-slate-200"
            defaultPosition={50}
          >
            <ImageComparisonImage
              src="/images/imgi_25_saffron-city-islamabad.jpg"
              alt="Saffron City Master Vision"
              position="left"
              label="Approved Master Layout (15,000 Kanal)"
            />
            <ImageComparisonImage
              src="/images/hero-bg.jpg"
              alt="Saffron City Master Community"
              position="right"
              label="Master Community Vision"
            />
            <ImageComparisonSlider className="bg-amber-400" />
          </ImageComparison>
        ) : (
          <ImageComparison
            className="w-full h-[360px] sm:h-[450px] lg:h-[500px] rounded-2xl border border-slate-200"
            defaultPosition={50}
          >
            <ImageComparisonImage
              src="/images/imgi_25_saffron-city-islamabad.jpg"
              alt="Grand Entrance Gate GT Road"
              position="left"
              label="Main Entrance Gate (GT Road)"
            />
            <ImageComparisonImage
              src="/images/hero-bg.jpg"
              alt="250ft Main Boulevard & Community"
              position="right"
              label="250-Foot Main Boulevard"
            />
            <ImageComparisonSlider className="bg-amber-400" />
          </ImageComparison>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 px-2">
        <span>↔ Drag the center slider left or right to compare</span>
        <Link
          href="/master-plan"
          className="font-bold text-[#D4A017] hover:text-amber-700 inline-flex items-center gap-1"
        >
          <span>Explore Full Master Plan</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
