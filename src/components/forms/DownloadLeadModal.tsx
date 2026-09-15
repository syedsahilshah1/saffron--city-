"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Download, CheckCircle2, AlertCircle, Loader2, FileDown, ShieldCheck } from "lucide-react";

interface DownloadLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  downloadUrl: string;
  downloadFileName?: string;
  documentTitle: string;
  documentType?: string;
}

export default function DownloadLeadModal({
  isOpen,
  onClose,
  downloadUrl,
  downloadFileName,
  documentTitle,
  documentType = "Official Map",
}: DownloadLeadModalProps) {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const triggerDownload = () => {
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = downloadFileName || downloadUrl.split("/").pop() || "saffron-city-document.jpg";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setError("Please provide your name and phone/WhatsApp number.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim() || undefined,
          message: formData.message.trim() || `Requested document download: ${documentTitle}`,
          source: `Map Download: ${documentTitle}`,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
        triggerDownload();
      } else {
        triggerDownload();
        setSuccess(true);
      }
    } catch {
      triggerDownload();
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setSuccess(false);
    setError(null);
    onClose();
  };

  const modalContent = (
    <div className="fixed inset-0 z-[99999] overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity animate-fade-in"
        onClick={handleResetAndClose}
      />

      {/* Centering Wrapper */}
      <div className="flex min-h-full items-center justify-center p-3 sm:p-6 text-center">
        <div 
          className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl border border-amber-300 transition-all w-full max-w-lg z-10 my-8 animate-scale-up"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative Top Gold Strip */}
          <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-[#D49E17] to-amber-600" />

          {/* Modal Header */}
          <div className="flex items-start justify-between p-4 sm:px-6 sm:py-4 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#D49E17] shrink-0 shadow-sm">
                <FileDown className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100/70 px-2 py-0.5 rounded-md">
                  {documentType} Download
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 font-heading leading-tight mt-0.5">
                  Download {documentTitle}
                </h3>
              </div>
            </div>
            <button
              type="button"
              onClick={handleResetAndClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-4 sm:px-6 sm:py-5">
          {success ? (
            <div className="text-center py-3 space-y-3.5">
              <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto shadow-inner animate-bounce">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <h4 className="text-base sm:text-lg font-black text-slate-900 font-heading">
                  Download Started!
                </h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Your official high-resolution copy of <strong>{documentTitle}</strong> has started downloading.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 flex items-center justify-center gap-2 max-w-md mx-auto">
                <ShieldCheck className="w-4 h-4 text-[#D49E17] shrink-0" />
                <span>Our facilitation team has logged your inquiry for priority assistance.</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={triggerDownload}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-amber-100 text-slate-800 hover:text-amber-950 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 border border-slate-200 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#D49E17]" />
                  <span>Click Here If Download Didn't Start</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-[#D49E17] text-white hover:text-slate-950 text-xs font-bold transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <p className="text-xs text-slate-600 leading-relaxed">
                Please enter your contact details below to instantly download the official document &amp; receive updates via WhatsApp.
              </p>

              {error && (
                <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Muhammad Ali"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#D49E17] focus:ring-1 focus:ring-[#D49E17] transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    WhatsApp / Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0333 1113551"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#D49E17] focus:ring-1 focus:ring-[#D49E17] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#D49E17] focus:ring-1 focus:ring-[#D49E17] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Message / Specific Interest <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Looking for 5 Marla / 10 Marla installment options or site visit"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#D49E17] focus:ring-1 focus:ring-[#D49E17] transition-all resize-none"
                />
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-[#D49E17] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs sm:text-sm tracking-wide shadow-md shadow-amber-500/20 border border-amber-400 flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-60 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                      <span>Processing &amp; Starting Download...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Submit Details &amp; Download Document</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-center pt-0.5">
                <span className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Your privacy is 100% protected. Official Saffron City facilitation.
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  </div>
);

  return createPortal(modalContent, document.body);
}
