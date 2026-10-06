"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Link2,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Image as ImageIcon,
  Upload,
  Eraser,
  Code,
  Eye,
  Minus,
  Undo2,
  Redo2,
  ExternalLink,
  Check,
  X,
  Trash2,
  Globe,
  Compass,
  Loader2,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  onOpenMediaGallery?: () => void;
  insertedImageUrl?: string | null;
  insertedImageAlt?: string;
  onImageInserted?: () => void;
}

const PRESET_INTERNAL_LINKS = [
  { label: "Home Page", url: "/" },
  { label: "About Saffron City & SKB", url: "/about-us" },
  { label: "RDA NOC & Legal Clearances", url: "/noc-status" },
  { label: "15,000 Kanal Master Plan", url: "/master-plan" },
  { label: "3-Year Installment Payment Plan", url: "/payment-plan" },
  { label: "Location & GT Road Access", url: "/location" },
  { label: "Sector A (Executive / Luxury)", url: "/sectors/sector-a" },
  { label: "Sector B (Affordable / Smart Living)", url: "/sectors/sector-b" },
  { label: "Residential Plots (5M, 10M, 1K)", url: "/plots/residential" },
  { label: "Commercial Plots & Plazas", url: "/plots/commercial" },
  { label: "Plots Inventory Explorer", url: "/plot-for-sale" },
  { label: "Blogs, News & Market Insights", url: "/blogs" },
  { label: "Privacy Policy", url: "/privacy-policy" },
];

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Start writing your article here like Microsoft Word...",
  onOpenMediaGallery,
  insertedImageUrl,
  insertedImageAlt,
  onImageInserted,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isHtmlMode, setIsHtmlMode] = useState(false);
  const [currentBlock, setCurrentBlock] = useState("p");
  const lastHtmlRef = useRef<string>(value || "");
  const isTypingRef = useRef(false);

  // Link Dialog Modal State
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [linkOpenNewTab, setLinkOpenNewTab] = useState(false);
  const [savedRange, setSavedRange] = useState<Range | null>(null);
  const [isEditingExistingLink, setIsEditingExistingLink] = useState(false);

  // Image Upload State
  const [uploadingImage, setUploadingImage] = useState(false);

  // Sync external value changes into the contentEditable div
  useEffect(() => {
    if (editorRef.current && value !== lastHtmlRef.current && !isTypingRef.current) {
      editorRef.current.innerHTML = value || "";
      lastHtmlRef.current = value || "";
    }
  }, [value]);

  // Handle external image insertion from Gallery
  useEffect(() => {
    if (insertedImageUrl) {
      insertImageAtCursor(insertedImageUrl, insertedImageAlt || "Article Photo");
      if (onImageInserted) onImageInserted();
    }
  }, [insertedImageUrl, insertedImageAlt, onImageInserted]);

  const emitChange = useCallback(() => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      lastHtmlRef.current = html;
      onChange(html);
    }
  }, [onChange]);

  const handleInput = () => {
    isTypingRef.current = true;
    emitChange();
    updateToolbarState();
    setTimeout(() => {
      isTypingRef.current = false;
    }, 100);
  };

  const updateToolbarState = () => {
    try {
      const block = document.queryCommandValue("formatBlock") || "";
      if (block.toLowerCase().includes("h1")) setCurrentBlock("h1");
      else if (block.toLowerCase().includes("h2")) setCurrentBlock("h2");
      else if (block.toLowerCase().includes("h3")) setCurrentBlock("h3");
      else if (block.toLowerCase().includes("blockquote")) setCurrentBlock("blockquote");
      else setCurrentBlock("p");
    } catch {
      // ignore
    }
  };

  // Helper to save active selection range before opening dialogs/pickers
  const saveCurrentSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      // Ensure the selection is actually inside the editor
      if (editorRef.current && editorRef.current.contains(range.commonAncestorContainer)) {
        setSavedRange(range.cloneRange());
        return range;
      }
    }
    return null;
  };

  // Helper to restore saved selection range
  const restoreSelection = () => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
    if (savedRange) {
      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(savedRange);
      }
    }
  };

  const executeCommand = (command: string, value: string | undefined = undefined) => {
    if (isHtmlMode) return;
    if (editorRef.current) {
      editorRef.current.focus();
    }
    document.execCommand(command, false, value);
    emitChange();
    updateToolbarState();
  };

  const handleFormatBlock = (tag: string) => {
    if (isHtmlMode) return;
    if (editorRef.current) {
      editorRef.current.focus();
    }
    setCurrentBlock(tag);
    if (tag === "p") {
      document.execCommand("formatBlock", false, "<p>");
    } else if (tag === "h1") {
      document.execCommand("formatBlock", false, "<h1>");
    } else if (tag === "h2") {
      document.execCommand("formatBlock", false, "<h2>");
    } else if (tag === "h3") {
      document.execCommand("formatBlock", false, "<h3>");
    } else if (tag === "blockquote") {
      document.execCommand("formatBlock", false, "<blockquote>");
    }
    emitChange();
  };

  // Open Link Dialog with saved selection
  const handleOpenLinkModal = () => {
    if (isHtmlMode) return;
    const sel = window.getSelection();
    let selectedText = "";
    let existingHref = "";
    let isExisting = false;
    let newTab = false;

    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      setSavedRange(range.cloneRange());
      selectedText = range.toString();

      // Check if clicked inside an existing anchor
      let node: Node | null = range.startContainer;
      while (node && node !== editorRef.current) {
        if (node.nodeName === "A") {
          const a = node as HTMLAnchorElement;
          existingHref = a.getAttribute("href") || "";
          if (!selectedText) selectedText = a.textContent || "";
          newTab = a.getAttribute("target") === "_blank";
          isExisting = true;
          break;
        }
        node = node.parentNode;
      }
    } else {
      setSavedRange(null);
    }

    setIsEditingExistingLink(isExisting);
    setLinkUrl(existingHref || "");
    setLinkText(selectedText || "");
    if (isExisting) {
      setLinkOpenNewTab(newTab);
    } else {
      setLinkOpenNewTab(existingHref.startsWith("http"));
    }
    setShowLinkModal(true);
  };

  const handleApplyLink = () => {
    if (!linkUrl.trim()) return;

    let targetUrl = linkUrl.trim();
    if (!targetUrl.startsWith("/") && !targetUrl.startsWith("http://") && !targetUrl.startsWith("https://") && !targetUrl.startsWith("mailto:") && !targetUrl.startsWith("tel:") && !targetUrl.startsWith("#")) {
      targetUrl = `https://${targetUrl}`;
    }

    const displayText = linkText.trim() || targetUrl;
    const isNewTab = linkOpenNewTab || targetUrl.startsWith("http");

    restoreSelection();

    const targetAttr = isNewTab ? ' target="_blank" rel="noopener noreferrer"' : '';
    const anchorHtml = `<a href="${targetUrl}"${targetAttr} class="text-[#800020] underline font-semibold hover:text-amber-700">${displayText}</a>`;

    document.execCommand("insertHTML", false, anchorHtml);

    emitChange();
    setShowLinkModal(false);
    setSavedRange(null);
  };

  const handleRemoveLink = () => {
    restoreSelection();
    document.execCommand("unlink", false);
    emitChange();
    setShowLinkModal(false);
    setSavedRange(null);
  };

  // Insert image at the exact saved cursor position with robust DOM range insertion
  const insertImageAtCursor = (url: string, alt: string) => {
    if (editorRef.current) {
      editorRef.current.focus();
    }

    const cleanAlt = alt.trim() || "Article Photo";
    const container = document.createElement("div");
    container.innerHTML = `<figure class="my-6 block"><img src="${url}" alt="${cleanAlt}" title="${cleanAlt}" class="w-full rounded-2xl shadow-md border border-slate-200 object-cover max-h-[480px]" /><figcaption class="text-xs text-center text-slate-500 mt-2 italic font-medium">${cleanAlt}</figcaption></figure><p><br></p>`;

    let inserted = false;

    // 1. Try DOM range insertion if range was captured inside editor
    if (savedRange && editorRef.current && editorRef.current.contains(savedRange.commonAncestorContainer)) {
      try {
        savedRange.deleteContents();
        const frag = document.createDocumentFragment();
        while (container.firstChild) {
          frag.appendChild(container.firstChild);
        }
        savedRange.insertNode(frag);
        inserted = true;
      } catch {
        inserted = false;
      }
    }

    // 2. Fallback to execCommand or append
    if (!inserted) {
      const imgHtml = container.innerHTML;
      if (!editorRef.current?.innerHTML.trim()) {
        if (editorRef.current) {
          editorRef.current.innerHTML = imgHtml;
        }
      } else {
        const success = document.execCommand("insertHTML", false, imgHtml);
        if (!success && editorRef.current) {
          editorRef.current.innerHTML += imgHtml;
        }
      }
    }

    setSavedRange(null);
    emitChange();
  };

  // Direct upload from Device into the cursor position
  const handleDirectDeviceUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const formData = new FormData();
      formData.append("file", file);

      const token = typeof window !== "undefined" ? localStorage.getItem("saffron_session_token") : "";
      const headers: Record<string, string> = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch("/api/upload", {
        method: "POST",
        headers,
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success && data.url) {
        const defaultAlt = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
        insertImageAtCursor(data.url, defaultAlt);
      } else {
        alert(data.message || "Failed to upload image from device");
      }
    } catch (err: any) {
      console.error("Upload error:", err);
      alert("Error uploading image");
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleTriggerGallery = () => {
    saveCurrentSelection();
    if (onOpenMediaGallery) {
      onOpenMediaGallery();
    }
  };

  const handleClearFormat = () => {
    if (isHtmlMode) return;
    executeCommand("removeFormat");
    document.execCommand("formatBlock", false, "<p>");
    emitChange();
    updateToolbarState();
  };

  const handleInsertHorizontalRule = () => {
    executeCommand("insertHorizontalRule");
  };

  return (
    <div className="rounded-2xl border border-slate-300/90 bg-white shadow-xs focus-within:border-[#D49E17] focus-within:ring-1 focus-within:ring-[#D49E17]/20 transition-all relative">
      {/* Hidden File Input for Direct Device Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleDirectDeviceUpload}
      />

      {/* Top MS-Word Style Toolbar */}
      <div className="bg-slate-50 border-b border-slate-200 p-2 sm:p-2.5 flex flex-wrap items-center justify-between gap-1.5 select-none rounded-t-2xl">
        <div className="flex flex-wrap items-center gap-1">
          {/* History Undo / Redo */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => executeCommand("undo")}
            className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700 transition"
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => executeCommand("redo")}
            className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700 transition"
            title="Redo (Ctrl+Y)"
          >
            <Redo2 className="w-3.5 h-3.5" />
          </button>

          <div className="h-4 w-[1px] bg-slate-300 mx-1" />

          {/* Heading Dropdown */}
          <select
            value={currentBlock}
            disabled={isHtmlMode}
            onChange={(e) => handleFormatBlock(e.target.value)}
            className="px-2.5 py-1 text-xs font-semibold text-slate-800 bg-white border border-slate-300 rounded-lg outline-none cursor-pointer hover:border-slate-400 focus:border-[#D49E17]"
          >
            <option value="p">Normal Text (Paragraph)</option>
            <option value="h1">Heading 1 (Large H1)</option>
            <option value="h2">Heading 2 (Medium H2)</option>
            <option value="h3">Heading 3 (Small H3)</option>
            <option value="blockquote">Quote Block</option>
          </select>

          <div className="h-4 w-[1px] bg-slate-300 mx-1" />

          {/* Inline Text Styles */}
          <button
            type="button"
            disabled={isHtmlMode}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => executeCommand("bold")}
            className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-800 font-bold transition disabled:opacity-40"
            title="Bold (Ctrl+B)"
          >
            <Bold className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            disabled={isHtmlMode}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => executeCommand("italic")}
            className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-800 font-serif italic transition disabled:opacity-40"
            title="Italic (Ctrl+I)"
          >
            <Italic className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            disabled={isHtmlMode}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => executeCommand("underline")}
            className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-800 underline transition disabled:opacity-40"
            title="Underline (Ctrl+U)"
          >
            <Underline className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            disabled={isHtmlMode}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => executeCommand("strikeThrough")}
            className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-800 line-through transition disabled:opacity-40"
            title="Strikethrough"
          >
            <Strikethrough className="w-3.5 h-3.5" />
          </button>

          <div className="h-4 w-[1px] bg-slate-300 mx-1" />

          {/* Alignment */}
          <button
            type="button"
            disabled={isHtmlMode}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => executeCommand("justifyLeft")}
            className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700 transition disabled:opacity-40"
            title="Align Left"
          >
            <AlignLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            disabled={isHtmlMode}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => executeCommand("justifyCenter")}
            className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700 transition disabled:opacity-40"
            title="Align Center"
          >
            <AlignCenter className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            disabled={isHtmlMode}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => executeCommand("justifyRight")}
            className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700 transition disabled:opacity-40"
            title="Align Right"
          >
            <AlignRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            disabled={isHtmlMode}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => executeCommand("justifyFull")}
            className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700 transition disabled:opacity-40"
            title="Justify"
          >
            <AlignJustify className="w-3.5 h-3.5" />
          </button>

          <div className="h-4 w-[1px] bg-slate-300 mx-1" />

          {/* Lists */}
          <button
            type="button"
            disabled={isHtmlMode}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => executeCommand("insertUnorderedList")}
            className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-800 transition disabled:opacity-40"
            title="Bullet List"
          >
            <List className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            disabled={isHtmlMode}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => executeCommand("insertOrderedList")}
            className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-800 transition disabled:opacity-40"
            title="Numbered List"
          >
            <ListOrdered className="w-3.5 h-3.5" />
          </button>

          <div className="h-4 w-[1px] bg-slate-300 mx-1" />

          {/* Insert Link with Sleek Modal */}
          <button
            type="button"
            disabled={isHtmlMode}
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleOpenLinkModal}
            className="p-1.5 rounded-lg bg-white hover:bg-amber-100 text-slate-800 border border-slate-200 hover:border-amber-300 transition flex items-center gap-1 font-semibold text-xs disabled:opacity-40"
            title="Insert or Edit Internal/External Link (Ctrl+K)"
          >
            <Link2 className="w-3.5 h-3.5 text-[#D49E17]" />
            <span className="hidden sm:inline text-[11px]">Link</span>
          </button>

          <button
            type="button"
            disabled={isHtmlMode}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => handleFormatBlock("blockquote")}
            className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-800 transition disabled:opacity-40"
            title="Quote Block"
          >
            <Quote className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            disabled={isHtmlMode}
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleInsertHorizontalRule}
            className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-800 transition disabled:opacity-40"
            title="Horizontal Divider"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>

          <div className="h-4 w-[1px] bg-slate-300 mx-1" />

          {/* Insert Photo Controls */}
          {/* 1. Direct Upload from PC */}
          <button
            type="button"
            disabled={isHtmlMode || uploadingImage}
            onMouseDown={(e) => {
              e.preventDefault();
              saveCurrentSelection();
            }}
            onClick={() => fileInputRef.current?.click()}
            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] shadow-xs flex items-center gap-1 transition cursor-pointer disabled:opacity-40"
            title="Upload image file from computer directly into cursor position"
          >
            {uploadingImage ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
            ) : (
              <Upload className="w-3.5 h-3.5 text-amber-400" />
            )}
            <span>{uploadingImage ? "Uploading..." : "Upload Photo"}</span>
          </button>

          {/* 2. Choose from Media Gallery */}
          {onOpenMediaGallery && (
            <button
              type="button"
              disabled={isHtmlMode}
              onMouseDown={(e) => {
                e.preventDefault();
                saveCurrentSelection();
              }}
              onClick={handleTriggerGallery}
              className="px-2.5 py-1 rounded-lg bg-[#D49E17] hover:bg-amber-600 text-white font-bold text-[11px] shadow-xs flex items-center gap-1 transition cursor-pointer disabled:opacity-40"
              title="Insert photo from gallery into cursor position"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Gallery Photo</span>
            </button>
          )}

          {/* Clear Style */}
          <button
            type="button"
            disabled={isHtmlMode}
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleClearFormat}
            className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition disabled:opacity-40"
            title="Clear Formatting"
          >
            <Eraser className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Visual / HTML Mode Toggle */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              if (isHtmlMode) {
                // Switching from HTML to Visual
                if (editorRef.current) {
                  editorRef.current.innerHTML = value || "";
                  lastHtmlRef.current = value || "";
                }
              }
              setIsHtmlMode(!isHtmlMode);
            }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition flex items-center gap-1 cursor-pointer ${
              isHtmlMode
                ? "bg-slate-900 text-amber-300 border-slate-900"
                : "bg-white text-slate-700 hover:bg-slate-100 border-slate-300"
            }`}
          >
            {isHtmlMode ? (
              <>
                <Eye className="w-3 h-3 text-amber-400" />
                <span>Switch to Visual Editor</span>
              </>
            ) : (
              <>
                <Code className="w-3 h-3 text-slate-500" />
                <span>View HTML Source</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor Body */}
      {isHtmlMode ? (
        <textarea
          value={value}
          onChange={(e) => {
            lastHtmlRef.current = e.target.value;
            onChange(e.target.value);
          }}
          rows={12}
          className="w-full p-4 font-mono text-xs bg-slate-900 text-amber-200 outline-none leading-relaxed resize-y border-none"
          placeholder="<h1>Type HTML code directly...</h1>"
        />
      ) : (
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          onKeyUp={updateToolbarState}
          onMouseUp={updateToolbarState}
          onBlur={emitChange}
          data-placeholder={placeholder}
          className="min-h-[280px] max-h-[500px] overflow-y-auto p-4 sm:p-5 text-sm sm:text-base text-slate-800 outline-none leading-relaxed 
            empty:before:content-[attr(data-placeholder)] empty:before:text-slate-400 empty:before:pointer-events-none empty:before:italic
            [&>h1]:font-serif [&>h1]:font-black [&>h1]:text-2xl sm:[&>h1]:text-3xl [&>h1]:text-slate-950 [&>h1]:my-3 [&>h1]:pb-1 [&>h1]:border-b [&>h1]:border-amber-200
            [&>h2]:font-serif [&>h2]:font-bold [&>h2]:text-xl sm:[&>h2]:text-2xl [&>h2]:text-slate-950 [&>h2]:my-2.5 [&>h2]:pb-1 [&>h2]:border-b [&>h2]:border-amber-100
            [&>h3]:font-serif [&>h3]:font-bold [&>h3]:text-lg [&>h3]:text-slate-900 [&>h3]:my-2
            [&>p]:my-2 [&>p]:leading-relaxed
            [&>blockquote]:border-l-4 [&>blockquote]:border-[#D49E17] [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:bg-amber-50/60 [&>blockquote]:p-3 [&>blockquote]:rounded-r-xl [&>blockquote]:my-3
            [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:my-2
            [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:my-2
            [&>a]:text-[#800020] [&>a]:underline [&>a]:font-semibold hover:[&>a]:text-amber-700
            [&>figure]:my-4 [&_img]:rounded-xl [&_img]:shadow-md [&_img]:my-2 [&_img]:max-h-80 [&_img]:object-cover"
        />
      )}

      {/* Editor Status Bar */}
      <div className="bg-slate-50 border-t border-slate-200 px-3 py-1.5 flex items-center justify-between text-[11px] text-slate-500 rounded-b-2xl">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-600">
            {isHtmlMode ? "HTML Source Mode" : "WYSIWYG Visual Mode (Word Style)"}
          </span>
        </div>
        <div>
          <span>
            {value ? value.replace(/<[^>]*>/g, "").trim().split(/\s+/).filter(Boolean).length : 0}{" "}
            words
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* Sleek Interactive Link Manager Modal */}
      {/* ========================================================================= */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden space-y-0">
            {/* Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Link2 className="w-4 h-4 text-[#D49E17]" />
                <h3 className="font-bold text-sm">
                  {isEditingExistingLink ? "Edit Link" : "Insert Internal / External Link"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowLinkModal(false);
                  setSavedRange(null);
                }}
                className="text-slate-400 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Link Form Container */}
            <div
              className="p-4 sm:p-5 space-y-4"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleApplyLink();
                }
              }}
            >
              {/* Preset Internal Pages Quick-Select */}
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1 flex items-center gap-1">
                  <Compass className="w-3 h-3 text-[#D49E17]" />
                  <span>Quick Pick Internal Page:</span>
                </label>
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      setLinkUrl(e.target.value);
                      const matched = PRESET_INTERNAL_LINKS.find((p) => p.url === e.target.value);
                      if (matched && !linkText) {
                        setLinkText(matched.label);
                      }
                      setLinkOpenNewTab(false);
                    }
                  }}
                  defaultValue=""
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:border-[#D49E17] outline-none cursor-pointer"
                >
                  <option value="" disabled>-- Select an internal page --</option>
                  {PRESET_INTERNAL_LINKS.map((preset, idx) => (
                    <option key={idx} value={preset.url}>
                      {preset.label} ({preset.url})
                    </option>
                  ))}
                </select>
              </div>

              {/* Target URL */}
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1 flex items-center justify-between">
                  <span>Target URL *</span>
                  <span className="text-[10px] text-slate-400 font-normal">
                    Internal (e.g. /payment-plan) or External (https://...)
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={linkUrl}
                    onChange={(e) => {
                      const val = e.target.value;
                      setLinkUrl(val);
                      if (val.startsWith("http://") || val.startsWith("https://")) {
                        setLinkOpenNewTab(true);
                      } else if (val.startsWith("/")) {
                        setLinkOpenNewTab(false);
                      }
                    }}
                    placeholder="/sectors/sector-a or https://example.com"
                    className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#D49E17] focus:bg-white bg-slate-50 outline-none font-mono"
                    autoFocus
                  />
                  <Globe className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
                </div>
              </div>

              {/* Link Anchor Text */}
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Display Anchor Text (Optional)
                </label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="e.g. Explore Sector A Payment Details"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#D49E17] focus:bg-white bg-slate-50 outline-none"
                />
              </div>

              {/* Target Option */}
              <div className="pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 font-medium">
                  <input
                    type="checkbox"
                    checked={linkOpenNewTab}
                    onChange={(e) => setLinkOpenNewTab(e.target.checked)}
                    className="w-4 h-4 rounded text-[#800020] accent-[#800020]"
                  />
                  <span className="flex items-center gap-1">
                    <span>Open link in new browser tab</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </span>
                </label>
                <p className="text-[10px] text-slate-400 pl-6 mt-0.5">
                  (Recommended for external websites, unchecked for internal site links)
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                {isEditingExistingLink ? (
                  <button
                    type="button"
                    onClick={handleRemoveLink}
                    className="px-3 py-1.5 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove Link</span>
                  </button>
                ) : (
                  <div />
                )}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowLinkModal(false);
                      setSavedRange(null);
                    }}
                    className="px-3.5 py-1.5 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => handleApplyLink()}
                    className="px-4 py-1.5 rounded-xl bg-[#800020] hover:bg-[#600018] text-white text-xs font-bold shadow-md transition flex items-center gap-1 cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{isEditingExistingLink ? "Update Link" : "Apply Link"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
