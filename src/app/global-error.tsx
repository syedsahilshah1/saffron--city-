"use client";

import React from "react";
import { AlertOctagon, RotateCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6 p-8 rounded-3xl bg-slate-800 border border-slate-700 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-400/40 mx-auto flex items-center justify-center text-[#D49E17]">
            <AlertOctagon className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-black text-white font-heading">
              System Error
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed">
              A critical error occurred while rendering the page. Please reload the application.
            </p>
          </div>
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D49E17] hover:bg-amber-600 text-slate-950 font-bold text-xs shadow transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reload Application</span>
          </button>
        </div>
      </body>
    </html>
  );
}
