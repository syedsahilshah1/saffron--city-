"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Download, Eye, EyeOff, FileText, MessageCircle } from "lucide-react";
import DownloadLeadModal from "@/components/forms/DownloadLeadModal";

interface PaymentPlanCardProps {
  badgeText: string;
  badgeHighlight?: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  downloadFilename: string;
  downloadButtonText: string;
  extraAction?: {
    type: "link" | "whatsapp";
    href: string;
    label: string;
  };
}

export default function PaymentPlanCard({
  badgeText,
  badgeHighlight,
  title,
  description,
  imageSrc,
  imageAlt,
  downloadFilename,
  downloadButtonText,
  extraAction,
}: PaymentPlanCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  return (
    <div className="p-6 rounded-3xl bg-white border border-amber-200/90 shadow-xl space-y-4 flex flex-col justify-between h-full hover:border-[#D49E17] transition-all">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-xs uppercase tracking-wider">
            {badgeText}
          </span>
          {badgeHighlight && (
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              {badgeHighlight}
            </span>
          )}
        </div>
        <h3 className="text-xl font-bold text-slate-900 font-heading">
          {title}
        </h3>
        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Button to show / hide payment plan flyer */}
      <div className="pt-1">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full py-3 px-5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm ${
            isOpen
              ? "bg-slate-900 text-white hover:bg-slate-800"
              : "bg-gradient-to-r from-amber-500 via-[#D49E17] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md hover:scale-[1.01]"
          }`}
        >
          {isOpen ? (
            <>
              <EyeOff className="w-4 h-4" />
              <span>Hide Payment Plan Flyer</span>
            </>
          ) : (
            <>
              <Eye className="w-4 h-4" />
              <span>View Payment Plan Flyer</span>
            </>
          )}
        </button>
      </div>

      {/* Expandable Image Area */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen
            ? "max-h-[1200px] opacity-100 mt-3"
            : "max-h-0 opacity-0 mt-0 pointer-events-none"
        }`}
      >
        <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 group my-2">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      {/* Action Buttons (Download & Full Table / WhatsApp) */}
      <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
        <button
          type="button"
          onClick={() => setIsDownloadModalOpen(true)}
          className="flex-1 py-2.5 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs text-center flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-[#D49E17]" />
          <span>{downloadButtonText}</span>
        </button>

        {extraAction && extraAction.type === "link" && (
          <Link
            href={extraAction.href}
            className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-slate-600" />
            <span>{extraAction.label}</span>
          </Link>
        )}

        {extraAction && extraAction.type === "whatsapp" && (
          <a
            href={extraAction.href}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>{extraAction.label}</span>
          </a>
        )}
      </div>

      {/* Gated Lead Capture Modal */}
      <DownloadLeadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        downloadUrl={imageSrc}
        downloadFileName={downloadFilename}
        documentTitle={title}
        documentType="Payment Plan"
      />
    </div>
  );
}
