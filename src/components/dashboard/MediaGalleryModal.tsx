"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Search,
  Upload,
  Check,
  Image as ImageIcon,
  Loader2,
  FolderOpen,
  RefreshCw
} from "lucide-react";

interface MediaItem {
  url: string;
  name: string;
  category: string;
  alt: string;
}

const FALLBACK_ITEMS: MediaItem[] = [
  {
    url: "/images/hero-bg.webp",
    name: "Hero Executive Panorama",
    category: "Banners",
    alt: "Saffron City Executive Master View and Grand Boulevard",
  },
  {
    url: "/images/about/about-hero-banner.webp",
    name: "About Us Master Skyline",
    category: "Banners",
    alt: "Saffron City Master Planned Urban Development",
  },
  {
    url: "/images/location/location-hero-banner.webp",
    name: "Prime Location Main GT Road",
    category: "Banners",
    alt: "Direct Connectivity to Rawalpindi Ring Road & Motorway",
  },
  {
    url: "/images/sectors/sector-a-luxury.webp",
    name: "Sector A Luxury Living",
    category: "Sectors",
    alt: "Sector A Luxury Residential Plots and Wide Boulevards",
  },
  {
    url: "/images/sectors/sector-a-overview.webp",
    name: "Sector A Overview & Parks",
    category: "Sectors",
    alt: "Sector A Overview and Green Belts",
  },
  {
    url: "/images/sectors/sector-b-residential.webp",
    name: "Sector B Residential Overview",
    category: "Sectors",
    alt: "Sector B Modern Housing and Parks",
  },
  {
    url: "/images/sectors/commercial-plaza.webp",
    name: "Commercial Plaza & Hub",
    category: "Sectors",
    alt: "Sector C Prime Commercial and Corporate Boulevard",
  },
  {
    url: "/images/sectors/green-community-park.webp",
    name: "Green Community Park",
    category: "Amenities",
    alt: "Eco-friendly Living & Community Gardens",
  },
  {
    url: "/images/amenities/amenity_mosque.webp",
    name: "Jamia Grand Mosque",
    category: "Facilities",
    alt: "Architectural Landmark Grand Jamia Mosque in Saffron City",
  },
  {
    url: "/images/amenities/amenity_hospital.webp",
    name: "Modern Healthcare Complex",
    category: "Facilities",
    alt: "24/7 International Standard Hospital and Medical Complex",
  },
  {
    url: "/images/amenities/amenity_school.webp",
    name: "International School Campus",
    category: "Facilities",
    alt: "Grammar School and University Campus Saffron City",
  },
  {
    url: "/images/amenities/amenity_shopping.webp",
    name: "Financial Square & Shopping",
    category: "Facilities",
    alt: "Shopping Mall and Business District Boulevard",
  },
  {
    url: "/images/amenities/amenity_park.webp",
    name: "Botanical Central Park",
    category: "Amenities",
    alt: "Lush Green Theme Parks and Walking Trails",
  },
  {
    url: "/images/facilities/gated-security.webp",
    name: "24/7 Gated Security",
    category: "Amenities",
    alt: "Smart CCTV Surveillance and Smart RFID Access Control Gates",
  },
  {
    url: "/images/facilities/underground-utilities.webp",
    name: "Underground Electrification",
    category: "Facilities",
    alt: "Uninterrupted Underground Electricity, Water & Fiber Optic",
  },
  {
    url: "/images/landmark_t_chowk.webp",
    name: "Rawat T-Chowk Interchange",
    category: "Landmarks",
    alt: "Direct Connectivity to Rawat T-Chowk & GT Road",
  },
  {
    url: "/images/landmark_giga_mall.webp",
    name: "Giga Mall Proximity",
    category: "Landmarks",
    alt: "10-Minute Drive to Giga Mall & DHA",
  },
  {
    url: "/images/saffron-city-master-plan-full.webp",
    name: "Official Master Plan Map",
    category: "Banners",
    alt: "Official RDA Approved Master Plan Layout Saffron City",
  },
];

interface MediaGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string, altText?: string) => void;
}

export default function MediaGalleryModal({ isOpen, onClose, onSelect }: MediaGalleryModalProps) {
  const [items, setItems] = useState<MediaItem[]>(FALLBACK_ITEMS);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUrl, setSelectedUrl] = useState<string>("");
  const [selectedAlt, setSelectedAlt] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/media");
      const data = await res.json();
      if (res.ok && data.success && Array.isArray(data.data) && data.data.length > 0) {
        setItems(data.data);
      } else {
        setItems(FALLBACK_ITEMS);
      }
    } catch {
      setItems(FALLBACK_ITEMS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchMedia();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const categories = ["All", "Uploads", "Banners", "Sectors", "Facilities", "Amenities", "Landmarks", "General"];

  const filteredItems = items.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.alt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.url.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", files[0]);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && (data.url || data.data?.url)) {
        const uploadedUrl = data.url || data.data?.url;
        const baseName = files[0].name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
        const newItem: MediaItem = {
          url: uploadedUrl,
          name: baseName,
          category: "Uploads",
          alt: `Saffron City ${baseName}`,
        };
        setItems((prev) => [newItem, ...prev]);
        setSelectedUrl(uploadedUrl);
        setSelectedAlt(newItem.alt);
        setActiveCategory("Uploads");
      } else {
        alert(data.message || "Failed to upload image");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error uploading media file");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleConfirm = () => {
    if (!selectedUrl) return;
    onSelect(selectedUrl, selectedAlt);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-slate-900 to-slate-800 text-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#D49E17]/20 border border-[#D49E17]/40 flex items-center justify-center text-[#D49E17]">
              <FolderOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white tracking-wide">Media &amp; Assets Gallery</h3>
              <p className="text-xs text-slate-300">Choose from existing media assets or upload new imagery</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar & Search */}
        <div className="px-6 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-[#800020] text-white shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-56">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search media..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#D49E17]"
              />
            </div>

            <button
              type="button"
              onClick={fetchMedia}
              disabled={loading}
              title="Refresh Gallery"
              className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 transition"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />

            <button
              type="button"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-1.5 rounded-lg bg-[#D49E17] hover:bg-amber-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer shrink-0 disabled:opacity-50"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Image</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Media Grid */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 bg-slate-100/50">
          {loading && items.length === 0 ? (
            <div className="col-span-full py-16 flex flex-col items-center justify-center text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin text-[#800020] mb-2" />
              <p className="text-xs">Loading media assets...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="col-span-full py-16 flex flex-col items-center justify-center text-slate-400">
              <ImageIcon className="w-12 h-12 stroke-[1.5] mb-2 opacity-50" />
              <p className="text-sm font-medium">No media found matching this filter</p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory("All");
                  setSearchQuery("");
                }}
                className="mt-2 text-xs text-[#800020] font-bold hover:underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = selectedUrl === item.url;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedUrl(item.url);
                    setSelectedAlt(item.alt || item.name);
                  }}
                  className={`group relative rounded-xl overflow-hidden border-2 cursor-pointer transition-all bg-white flex flex-col ${
                    isSelected
                      ? "border-[#D49E17] shadow-lg ring-2 ring-[#D49E17]/30 scale-[1.02]"
                      : "border-slate-200 hover:border-slate-300 hover:shadow-md"
                  }`}
                >
                  <div className="aspect-[16/10] bg-slate-900 relative overflow-hidden flex items-center justify-center">
                    <img
                      src={item.url}
                      alt={item.alt || item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                      <span className="text-[10px] text-white font-medium truncate">{item.name}</span>
                    </div>

                    {isSelected && (
                      <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#D49E17] text-white flex items-center justify-center shadow-md">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                  </div>
                  <div className="p-2.5 bg-white flex flex-col justify-between flex-1">
                    <p className="text-xs font-bold text-slate-800 truncate" title={item.name}>
                      {item.name}
                    </p>
                    <div className="flex items-center justify-between mt-1 text-[10px] text-slate-400">
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Selected Image Metadata & Action Footer */}
        <div className="px-6 py-4 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-2/3 flex items-center gap-3">
            {selectedUrl ? (
              <>
                <div className="w-12 h-12 rounded-lg border border-slate-200 overflow-hidden shrink-0 bg-slate-900 flex items-center justify-center">
                  <img src={selectedUrl} alt="Selected preview" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-800 truncate font-mono">{selectedUrl}</p>
                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="text-[10px] text-slate-500 font-medium">Alt Text:</span>
                    <input
                      type="text"
                      value={selectedAlt}
                      onChange={(e) => setSelectedAlt(e.target.value)}
                      placeholder="Image Alt description for SEO"
                      className="flex-1 px-2 py-1 text-[11px] bg-slate-50 border border-slate-200 rounded focus:outline-none focus:border-[#D49E17]"
                    />
                  </div>
                </div>
              </>
            ) : (
              <p className="text-xs text-slate-400 italic">Select an image from the gallery above to proceed.</p>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!selectedUrl}
              onClick={handleConfirm}
              className="px-6 py-2 rounded-xl bg-[#800020] hover:bg-[#600018] text-white font-bold text-xs shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Use Selected Image</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
