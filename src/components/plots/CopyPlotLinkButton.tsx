"use client";

import React, { useState } from "react";
import { Share2, Check } from "lucide-react";

interface CopyPlotLinkButtonProps {
  shareUrl: string;
}

export default function CopyPlotLinkButton({ shareUrl }: CopyPlotLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 border border-amber-200 hover:bg-amber-100 text-sm font-medium text-slate-800 transition-colors w-full text-left cursor-pointer"
      title="Copy plot link to clipboard"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-600" />
          <span className="text-emerald-700 font-semibold">Link Copied!</span>
        </>
      ) : (
        <>
          <Share2 className="w-3.5 h-3.5 text-[#D49E17]" />
          <span>Copy Plot Link</span>
        </>
      )}
    </button>
  );
}
