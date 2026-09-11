"use client";

import React, { useState } from "react";
import { Calculator, Download, MessageCircle, Sparkles } from "lucide-react";
import { RESIDENTIAL_PRICES, COMMERCIAL_PRICES, SITE_CONFIG } from "@/data/saffron-data";
import DownloadLeadModal from "@/components/forms/DownloadLeadModal";

export default function InstallmentCalculator() {
  const allPlots = [...RESIDENTIAL_PRICES, ...COMMERCIAL_PRICES];
  const [selectedSize, setSelectedSize] = useState<string>("5 Marla");
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  const currentPlot = allPlots.find((p) => p.size === selectedSize) || allPlots[0];

  const isCommercial = currentPlot.category === "commercial";

  const whatsappMsg = `Hi, I am interested in the ${currentPlot.size} (${currentPlot.category}) plot in Saffron City. Total price is ${currentPlot.totalPriceFormatted} with ${currentPlot.bookingAmountFormatted} booking. Please send me the official booking plan.`;
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <div className="relative w-full rounded-3xl border border-amber-200/90 bg-white shadow-2xl overflow-hidden p-6 sm:p-8 lg:p-10 space-y-6 group">
      {/* Subtle Gold Ambient Glow */}
      <div className="absolute -top-28 -right-28 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-28 -left-28 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 space-y-6">
        {/* Header & Plot Selector Chips */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-start sm:items-center gap-3.5">
            {/* Calculator Icon Box */}
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#D4A017] shrink-0 shadow-sm">
              <Calculator className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading tracking-tight">
                  Official Installment Calculator
                </h3>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100/80 border border-amber-300 text-[10px] font-bold text-amber-900 uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-[#D4A017]" />
                  2026 NEW RATES
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Calculate official 3-year installment breakdown, monthly schedule, and booking payment
              </p>
            </div>
          </div>

          {/* Plot Selector Chips */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {allPlots.map((plot) => {
              const isSelected = selectedSize === plot.size;
              return (
                <button
                  key={plot.size}
                  type="button"
                  onClick={() => setSelectedSize(plot.size)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer select-none ${
                    isSelected
                      ? "bg-gradient-to-r from-amber-500 via-[#D4A017] to-amber-600 text-white shadow-lg shadow-amber-500/30 scale-105 border border-amber-400 ring-2 ring-amber-300/40"
                      : "bg-slate-50 text-slate-700 border border-slate-200 hover:bg-amber-100/80 hover:text-amber-900 hover:border-amber-400 hover:shadow-sm hover:scale-[1.03] active:scale-95"
                  }`}
                >
                  {plot.size}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4 Result Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Price */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              TOTAL PRICE
            </span>
            <span className="text-2xl lg:text-3xl font-bold text-slate-900 font-heading block">
              {currentPlot.totalPriceFormatted}
            </span>
            <span className="text-[11px] text-emerald-600 font-semibold block pt-0.5">
              Official Rate
            </span>
          </div>

          {/* Booking (10% or Down Payment) */}
          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-300 space-y-1 shadow-sm">
            <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block">
              {isCommercial ? "DOWN PAYMENT" : "BOOKING (10%)"}
            </span>
            <span className="text-2xl lg:text-3xl font-bold text-[#D4A017] font-heading block">
              {currentPlot.bookingAmountFormatted}
            </span>
            <span className="text-[11px] text-slate-600 block pt-0.5">
              Due at registration
            </span>
          </div>

          {/* Monthly */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              MONTHLY INSTALLMENT
            </span>
            <span className="text-2xl lg:text-3xl font-bold text-slate-900 font-heading block">
              {currentPlot.monthlyInstallmentFormatted}
            </span>
            <span className="text-[11px] text-slate-500 block pt-0.5">
              Spread over 30-36 months
            </span>
          </div>

          {/* Bi-Annual or Possession */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              {currentPlot.biAnnualCount > 0 ? "BI-ANNUAL (×6)" : "BALLOTING / POSSESSION"}
            </span>
            <span className="text-2xl lg:text-3xl font-bold text-slate-900 font-heading block">
              {currentPlot.biAnnualCount > 0 ? currentPlot.biAnnualInstallmentFormatted : currentPlot.possessionAmountFormatted}
            </span>
            <span className="text-[11px] text-slate-500 block pt-0.5">
              {currentPlot.biAnnualCount > 0 ? "Every 6 months" : "On handover"}
            </span>
          </div>
        </div>

        {/* Detailed Breakdown Rows */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 divide-y divide-slate-200 text-xs sm:text-sm">
          {!isCommercial && (
            <div className="flex justify-between items-center py-2.5">
              <span className="text-slate-600 font-medium">Allocation Payment (10%):</span>
              <span className="font-bold text-slate-900">{currentPlot.allocationAmountFormatted}</span>
            </div>
          )}
          <div className="flex justify-between items-center py-2.5">
            <span className="text-slate-600 font-medium">Possession / Handover:</span>
            <span className="font-bold text-slate-900">{currentPlot.possessionAmountFormatted}</span>
          </div>
          <div className="flex justify-between items-center py-2.5">
            <span className="text-slate-600 font-medium">Processing Fee (Non-refundable):</span>
            <span className="font-bold text-amber-700">PKR 5,000</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Get Official Plan on WhatsApp</span>
          </a>

          {/* Download Official Flyer with Lead Capture */}
          <button
            type="button"
            onClick={() => setIsDownloadModalOpen(true)}
            className="w-full py-3.5 px-6 rounded-2xl bg-[#D4A017] hover:bg-amber-600 text-slate-950 font-bold text-sm flex items-center justify-center gap-2.5 transition-all shadow-md hover:shadow-lg cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Official Rate Flyer</span>
          </button>
        </div>
      </div>

      {/* Gated Lead Capture Modal */}
      <DownloadLeadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        downloadUrl={isCommercial ? SITE_CONFIG.commercialPaymentPlanImg : SITE_CONFIG.residentialPaymentPlanImg}
        downloadFileName={`saffron-city-${currentPlot.size.toLowerCase().replace(/\s+/g, "-")}-plan.jpg`}
        documentTitle={`Saffron City ${currentPlot.size} Payment Plan`}
        documentType="Payment Plan"
      />
    </div>
  );
}
