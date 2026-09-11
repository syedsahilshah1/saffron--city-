"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, Navigation, Layers, Globe, ExternalLink, Download } from "lucide-react";
import DownloadLeadModal from "@/components/forms/DownloadLeadModal";

export default function LocationMapCard() {
  const [mode, setMode] = useState<"map" | "official">("official");
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  return (
    <>
      <div className="w-full h-[380px] lg:h-[460px] rounded-3xl overflow-hidden border border-amber-200/90 shadow-2xl relative bg-slate-100 group flex flex-col">
        {/* View Switcher Controls */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 p-1 bg-white/95 rounded-2xl border border-amber-300/80 shadow-lg backdrop-blur-md">
          <button
            type="button"
            onClick={() => setMode("official")}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
              mode === "official"
                ? "bg-slate-900 text-[#D4A017] shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Layers className="w-3 h-3" />
            <span>Official Map</span>
          </button>
          <button
            type="button"
            onClick={() => setMode("map")}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
              mode === "map"
                ? "bg-slate-900 text-[#D4A017] shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Globe className="w-3 h-3" />
            <span>Google Map</span>
          </button>
        </div>

        {mode === "official" ? (
          <div className="relative w-full h-full flex items-center justify-center bg-white p-2">
            <img
              src="/images/imgi_87_LOCATION.jpg"
              alt="Saffron City Official Location Map"
              className="w-full h-full object-contain rounded-2xl"
            />
            <div className="absolute bottom-4 left-4 z-10 flex flex-wrap items-center gap-2">
              <Link
                href="/location"
                className="px-3.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-[#D4A017] text-white hover:text-slate-950 text-xs font-bold transition-colors flex items-center gap-1.5 shadow-lg backdrop-blur-sm"
              >
                <span>Interactive Location Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <button
                type="button"
                onClick={() => setIsDownloadModalOpen(true)}
                className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition-colors flex items-center gap-1.5 shadow-lg cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Map</span>
              </button>
            </div>
          </div>
        ) : (
        <iframe
          title="Saffron City Google Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106450.60155606992!2d73.11181283995874!3d33.49397682977461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfebbe487dc843%3A0x6b63d76b1f237efb!2sRawat%2C%20Rawalpindi%2C%20Punjab!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
          width="100%"
          height="100%"
          className="w-full h-full"
          style={{
            border: 0,
          }}
          allowFullScreen
          loading="lazy"
        />
      )}

      {/* Top Floating Badge */}
      <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-white/95 border border-amber-300 text-amber-900 text-xs font-bold backdrop-blur-md flex items-center gap-2 shadow-lg pointer-events-none">
        <MapPin className="w-3.5 h-3.5 text-[#D4A017] animate-pulse" />
        <span>Saffron City — Main GT Road, Rawat</span>
      </div>

      {/* Bottom Route Indicator */}
      <div className="absolute bottom-4 right-4 z-10 px-3 py-1.5 rounded-xl bg-white/95 border border-slate-200 text-slate-700 text-[11px] font-semibold backdrop-blur-md flex items-center gap-2 shadow-lg pointer-events-none">
        <Navigation className="w-3 h-3 text-emerald-600" />
        <span>Near T-Chowk &amp; Ring Road</span>
      </div>
    </div>

    {/* Lead Capture Modal */}
    <DownloadLeadModal
      isOpen={isDownloadModalOpen}
      onClose={() => setIsDownloadModalOpen(false)}
      downloadUrl="/images/imgi_87_LOCATION.jpg"
      downloadFileName="saffron-city-official-location-map.jpg"
      documentTitle="Saffron City Location Map"
      documentType="Location Map"
    />
    </>
  );
}
