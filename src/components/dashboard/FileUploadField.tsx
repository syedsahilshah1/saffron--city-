"use client";

import React, { useState, useRef } from "react";
import { Upload, Check, AlertCircle, Loader2, Image as ImageIcon, FileText, Eye } from "lucide-react";

interface FileUploadFieldProps {
  label: string;
  currentValue: string;
  onUploadSuccess: (url: string) => void;
  accept?: string;
  helperText?: string;
  previewType?: "image" | "file";
}

export default function FileUploadField({
  label,
  currentValue,
  onUploadSuccess,
  accept = "image/*,.pdf",
  helperText,
  previewType = "image",
}: FileUploadFieldProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError("");
    setUploadSuccess(false);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        onUploadSuccess(data.url);
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3000);
      } else {
        setUploadError(data.message || "Upload failed");
      }
    } catch (err: any) {
      setUploadError(err.message || "Error uploading file");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const isPdf = currentValue?.toLowerCase().endsWith(".pdf");

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-700">{label}</label>
        {currentValue && (
          <a
            href={currentValue}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-[#D4A017] hover:underline inline-flex items-center gap-1 font-semibold"
          >
            <Eye className="w-3 h-3" />
            <span>View Current File</span>
          </a>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        {/* Preview Thumbnail */}
        <div className="relative w-24 h-16 sm:w-28 sm:h-18 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
          {currentValue ? (
            isPdf || previewType === "file" ? (
              <div className="flex flex-col items-center justify-center text-slate-600 p-1">
                <FileText className="w-6 h-6 text-rose-500" />
                <span className="text-[9px] font-bold uppercase truncate max-w-[90px]">PDF Document</span>
              </div>
            ) : (
              <img
                src={currentValue}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            )
          ) : (
            <div className="flex flex-col items-center text-slate-400">
              <ImageIcon className="w-5 h-5 opacity-50" />
              <span className="text-[9px]">No File</span>
            </div>
          )}
        </div>

        {/* Input & Upload Button */}
        <div className="flex-1 w-full space-y-1.5">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={currentValue || ""}
              onChange={(e) => onUploadSuccess(e.target.value)}
              placeholder="e.g. /images/hero-bg.jpg or https://..."
              className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:border-[#D4A017] focus:bg-white focus:outline-none transition-all"
            />
            <input
              type="file"
              ref={fileInputRef}
              accept={accept}
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-[#D4A017] hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 shrink-0 transition-all cursor-pointer disabled:opacity-50"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload</span>
                </>
              )}
            </button>
          </div>

          {helperText && (
            <p className="text-[11px] text-slate-500">{helperText}</p>
          )}

          {uploadSuccess && (
            <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 animate-in fade-in">
              <Check className="w-3 h-3" />
              <span>File uploaded successfully!</span>
            </p>
          )}

          {uploadError && (
            <p className="text-[11px] text-rose-600 font-semibold flex items-center gap-1 animate-in fade-in">
              <AlertCircle className="w-3 h-3" />
              <span>{uploadError}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
