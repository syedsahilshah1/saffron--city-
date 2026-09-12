"use client";

import React, { useState } from "react";
import { Download } from "lucide-react";
import DownloadLeadModal from "@/components/forms/DownloadLeadModal";

interface MasterPlanDownloadButtonProps {
  className?: string;
  downloadUrl?: string;
  buttonText?: string;
  documentTitle?: string;
}

export default function MasterPlanDownloadButton({
  className = "px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-[#D49E17] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs shadow-md hover:scale-105 transition-all flex items-center gap-2 cursor-pointer",
  downloadUrl = "/images/saffron-city-master-plan.webp",
  buttonText = "Download Master Plan",
  documentTitle = "Master Plan Layout",
}: MasterPlanDownloadButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={className}
      >
        <Download className="w-4 h-4" />
        <span>{buttonText}</span>
      </button>

      <DownloadLeadModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        downloadUrl={downloadUrl}
        downloadFileName="saffron-city-master-plan.jpg"
        documentTitle={documentTitle}
        documentType="Master Plan"
      />
    </>
  );
}
