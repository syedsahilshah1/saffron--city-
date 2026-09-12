"use client";

import React, { useState } from "react";
import { Download } from "lucide-react";
import DownloadLeadModal from "@/components/forms/DownloadLeadModal";

interface DownloadButtonWithLeadModalProps {
  downloadUrl: string;
  downloadFileName?: string;
  documentTitle: string;
  documentType?: string;
  buttonText?: string;
  className?: string;
  iconOnly?: boolean;
}

export default function DownloadButtonWithLeadModal({
  downloadUrl,
  downloadFileName,
  documentTitle,
  documentType = "Document",
  buttonText = "Download",
  className = "px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer",
  iconOnly = false,
}: DownloadButtonWithLeadModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={className}
        title={`Download ${documentTitle}`}
      >
        <Download className="w-4 h-4 text-[#D49E17]" />
        {!iconOnly && <span>{buttonText}</span>}
      </button>

      <DownloadLeadModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        downloadUrl={downloadUrl}
        downloadFileName={downloadFileName}
        documentTitle={documentTitle}
        documentType={documentType}
      />
    </>
  );
}
