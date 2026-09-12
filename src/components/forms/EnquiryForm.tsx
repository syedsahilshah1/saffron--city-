"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface EnquiryFormProps {
  id?: string;
  title?: string;
  subtitle?: string;
  defaultPlotSize?: string;
  defaultSector?: string;
  defaultPlotType?: string;
  className?: string;
  variant?: "light" | "glassDark";
}

export default function EnquiryForm({
  id,
  title = "Book Your Plot Today",
  subtitle = "",
  defaultPlotSize = "",
  defaultSector = "",
  defaultPlotType = "",
  className = "",
  variant = "light",
}: EnquiryFormProps) {
  const isDark = variant === "glassDark";
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
    plotSize: defaultPlotSize,
    plotType: defaultPlotType,
    sector: defaultSector,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setError("Please fill in your Name and Phone/WhatsApp number.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
        setFormData({
          name: "",
          phone: "",
          message: "",
          plotSize: defaultPlotSize,
          plotType: defaultPlotType,
          sector: defaultSector,
        });
      } else {
        setError(data.message || "Failed to submit enquiry. Please try again.");
      }
    } catch {
      setError("Network error. Please try again or message directly on WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id={id}
      className={`w-full max-w-lg mx-auto p-6 sm:p-8 rounded-3xl relative shadow-2xl transition-all ${
        isDark
          ? "bg-slate-950/75 backdrop-blur-2xl border border-amber-400/40 text-white shadow-black/60"
          : "bg-white/90 backdrop-blur-xl border border-amber-200/80 text-slate-900"
      } ${className}`}
    >
      {/* Decorative top gold accent */}
      <div className="absolute top-0 inset-x-8 h-1.5 bg-gradient-to-r from-amber-400 via-[#D49E17] to-amber-600 rounded-b shadow-sm" />

      <div className="mb-4 sm:mb-5">
        <h3 className={`text-xl sm:text-2xl font-bold font-heading ${isDark ? "text-white" : "text-slate-900"}`}>
          {title}
        </h3>
        {subtitle && (
          <p className={`mt-1 text-xs sm:text-sm leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
            {subtitle}
          </p>
        )}
      </div>

      {success ? (
        <div className="p-5 rounded-2xl bg-emerald-500/20 backdrop-blur-md border border-emerald-400/50 text-emerald-200 space-y-2.5 text-center">
          <CheckCircle2 className="w-9 h-9 mx-auto text-emerald-400" />
          <h4 className="font-bold text-base text-white">Enquiry Received!</h4>
          <p className="text-xs text-emerald-200 leading-relaxed">
            Thank you. Our sales team will contact you via WhatsApp/phone shortly with official availability.
          </p>
          <button
            type="button"
            onClick={() => setSuccess(false)}
            className="mt-2 text-xs font-semibold text-amber-300 underline underline-offset-4 hover:text-amber-200 cursor-pointer"
          >
            Send another enquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
          {error && (
            <div className="p-2.5 rounded-xl bg-red-500/20 border border-red-400/50 text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className={`block text-xs font-bold mb-1.5 uppercase tracking-wider ${isDark ? "text-amber-300" : "text-slate-700"}`}>
              Your Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Syed Sahil Shah"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#D49E17] transition-all ${
                isDark
                  ? "bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:bg-white/15 focus:border-[#D49E17]"
                  : "bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-[#D49E17]"
              }`}
            />
          </div>

          <div>
            <label className={`block text-xs font-bold mb-1.5 uppercase tracking-wider ${isDark ? "text-amber-300" : "text-slate-700"}`}>
              Phone / WhatsApp Number *
            </label>
            <input
              type="tel"
              required
              placeholder="e.g. 0333 111 3551"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#D49E17] transition-all ${
                isDark
                  ? "bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:bg-white/15 focus:border-[#D49E17]"
                  : "bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-[#D49E17]"
              }`}
            />
          </div>


          <div>
            <label className={`block text-xs font-bold mb-1.5 uppercase tracking-wider ${isDark ? "text-amber-300" : "text-slate-700"}`}>
              Message / Specific Requirements
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Inquiring about 5 Marla booking in Sector A Block B"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={`w-full px-4 py-2 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#D49E17] transition-all resize-none ${
                isDark
                  ? "bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:bg-white/15 focus:border-[#D49E17]"
                  : "bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-[#D49E17]"
              }`}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-[#D49E17] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-sm tracking-wide shadow-lg shadow-amber-500/25 border border-amber-400 flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-60 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting Enquiry...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send Enquiry</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
