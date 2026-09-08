"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Search, 
  Filter, 
  MapPin, 
  TrendingUp, 
  MessageSquare, 
  Ruler, 
  DollarSign, 
  SlidersHorizontal, 
  RotateCcw, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Building2,
  Home,
  Check,
  CreditCard,
  Eye,
  X,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { SITE_CONFIG, RESIDENTIAL_PRICES, COMMERCIAL_PRICES } from "@/data/saffron-data";
import StaggerReveal from "@/components/animations/StaggerReveal";

export interface PlotInventoryItem {
  id: string;
  plotNumber: string;
  title: string;
  category: "Residential" | "Commercial";
  sector: "Sector A (Block B)" | "Sector B" | "Commercial Broadway" | "GT Road Frontage";
  sizeScale: "5 Marla" | "10 Marla" | "1 Kanal" | "4 Marla" | "5.33 Marla" | "8 Marla";
  tag: string;
  dimensions: string;
  totalPriceNumeric: number;
  totalPriceFormatted: string;
  downPaymentNumeric: number;
  downPaymentFormatted: string;
  monthlyNumeric: number;
  monthlyFormatted: string;
  possessionNumeric: number;
  possessionFormatted: string;
  biAnnualFormatted: string;
  image: string;
  features: string[];
  href: string;
}

export const COMPLETE_PLOTS_INVENTORY: PlotInventoryItem[] = [
  {
    id: "plot-5m-sec-a",
    plotNumber: "#A104",
    title: "5 Marla Executive Plot",
    category: "Residential",
    sector: "Sector A (Block B)",
    sizeScale: "5 Marla",
    tag: "Near Grand Mosque",
    dimensions: "25' × 45' (1,125 Sq. Ft.)",
    totalPriceNumeric: 4500000,
    totalPriceFormatted: "PKR 45,00,000",
    downPaymentNumeric: 450000,
    downPaymentFormatted: "PKR 4,50,000 (10%)",
    monthlyNumeric: 45000,
    monthlyFormatted: "PKR 45,000 / mo",
    possessionNumeric: 900000,
    possessionFormatted: "PKR 9,00,000 (20%)",
    biAnnualFormatted: "PKR 2,25,000 (×6)",
    image: "/images/sectors/sector-a-luxury.jpg",
    features: ["100% Underground Electrification", "40ft Wide Street", "2 Min to Grand Mosque", "RDA Approved"],
    href: "/sectors/sector-a",
  },
  {
    id: "plot-5m-sec-b",
    plotNumber: "#B388",
    title: "5 Marla Family Plot",
    category: "Residential",
    sector: "Sector B",
    sizeScale: "5 Marla",
    tag: "Park Facing",
    dimensions: "25' × 45' (1,125 Sq. Ft.)",
    totalPriceNumeric: 4500000,
    totalPriceFormatted: "PKR 45,00,000",
    downPaymentNumeric: 450000,
    downPaymentFormatted: "PKR 4,50,000 (10%)",
    monthlyNumeric: 45000,
    monthlyFormatted: "PKR 45,000 / mo",
    possessionNumeric: 900000,
    possessionFormatted: "PKR 9,00,000 (20%)",
    biAnnualFormatted: "PKR 2,25,000 (×6)",
    image: "/images/sectors/sector-b-residential.jpg",
    features: ["Facing Family Park", "Quiet Residential Street", "Dedicated Sector Mosque", "3-Year Easy Plan"],
    href: "/sectors/sector-b",
  },
  {
    id: "plot-10m-sec-a",
    plotNumber: "#A290",
    title: "10 Marla Executive Villa Plot",
    category: "Residential",
    sector: "Sector A (Block B)",
    sizeScale: "10 Marla",
    tag: "Boulevard Frontage",
    dimensions: "35' × 65' (2,275 Sq. Ft.)",
    totalPriceNumeric: 8250000,
    totalPriceFormatted: "PKR 82,50,000",
    downPaymentNumeric: 825000,
    downPaymentFormatted: "PKR 8,25,000 (10%)",
    monthlyNumeric: 82500,
    monthlyFormatted: "PKR 82,500 / mo",
    possessionNumeric: 1650000,
    possessionFormatted: "PKR 16,50,000 (20%)",
    biAnnualFormatted: "PKR 4,12,500 (×6)",
    image: "/images/amenities/amenity_boulevard.jpg",
    features: ["Facing 60ft Boulevard", "Dual Car Porch Space", "Underground Gas & Power", "High Capital Growth"],
    href: "/sectors/sector-a",
  },
  {
    id: "plot-10m-sec-b",
    plotNumber: "#B590",
    title: "10 Marla Family Plot",
    category: "Residential",
    sector: "Sector B",
    sizeScale: "10 Marla",
    tag: "Family Enclave",
    dimensions: "35' × 65' (2,275 Sq. Ft.)",
    totalPriceNumeric: 8250000,
    totalPriceFormatted: "PKR 82,50,000",
    downPaymentNumeric: 825000,
    downPaymentFormatted: "PKR 8,25,000 (10%)",
    monthlyNumeric: 82500,
    monthlyFormatted: "PKR 82,500 / mo",
    possessionNumeric: 1650000,
    possessionFormatted: "PKR 16,50,000 (20%)",
    biAnnualFormatted: "PKR 4,12,500 (×6)",
    image: "/images/sectors/green-community-park.jpg",
    features: ["Corner Plot Option", "Near School & Clinic", "Peaceful Green Ambience", "Flexible Installments"],
    href: "/sectors/sector-b",
  },
  {
    id: "plot-1k-sec-a",
    plotNumber: "#A123",
    title: "1 Kanal Luxury Boulevard Estate",
    category: "Residential",
    sector: "Sector A (Block B)",
    sizeScale: "1 Kanal",
    tag: "250ft Boulevard Facing",
    dimensions: "50' × 90' (4,500 Sq. Ft.)",
    totalPriceNumeric: 15500000,
    totalPriceFormatted: "PKR 1,55,00,000",
    downPaymentNumeric: 1550000,
    downPaymentFormatted: "PKR 15,50,000 (10%)",
    monthlyNumeric: 155000,
    monthlyFormatted: "PKR 1,55,000 / mo",
    possessionNumeric: 3100000,
    possessionFormatted: "PKR 31,00,000 (20%)",
    biAnnualFormatted: "PKR 7,75,000 (×6)",
    image: "/images/about/about-hero-banner.jpg",
    features: ["Direct 250ft Boulevard Access", "Grand Mosque Landmark", "VIP Executive Enclave", "Rapid Possession"],
    href: "/sectors/sector-a",
  },
  {
    id: "plot-1k-sec-b",
    plotNumber: "#B108",
    title: "1 Kanal Park View Estate",
    category: "Residential",
    sector: "Sector B",
    sizeScale: "1 Kanal",
    tag: "Central Park View",
    dimensions: "50' × 90' (4,500 Sq. Ft.)",
    totalPriceNumeric: 15500000,
    totalPriceFormatted: "PKR 1,55,00,000",
    downPaymentNumeric: 1550000,
    downPaymentFormatted: "PKR 15,50,000 (10%)",
    monthlyNumeric: 155000,
    monthlyFormatted: "PKR 1,55,000 / mo",
    possessionNumeric: 3100000,
    possessionFormatted: "PKR 31,00,000 (20%)",
    biAnnualFormatted: "PKR 7,75,000 (×6)",
    image: "/images/hero-bg.jpg",
    features: ["Panoramic Park Facing", "Wide Secondary Boulevard", "Spacious Garden Space", "Low Density Living"],
    href: "/sectors/sector-b",
  },
  {
    id: "plot-sig-comm-533",
    plotNumber: "#SC01",
    title: "Signature Commercial Plaza Plot",
    category: "Commercial",
    sector: "Commercial Broadway",
    sizeScale: "5.33 Marla",
    tag: "PKR 45 Lac Off Special",
    dimensions: "30' × 40' Prime Size",
    totalPriceNumeric: 15500000,
    totalPriceFormatted: "PKR 1,55,00,000 (Net)",
    downPaymentNumeric: 3500000,
    downPaymentFormatted: "PKR 35,00,000",
    monthlyNumeric: 250000,
    monthlyFormatted: "PKR 2,50,000 / mo",
    possessionNumeric: 3000000,
    possessionFormatted: "PKR 30,00,000",
    biAnnualFormatted: "Included in Monthly",
    image: "/images/sectors/commercial-plaza.jpg",
    features: ["30×40 Prime Retail Frontage", "PKR 45 Lac Net Discount", "Dedicated Plaza Parking", "High Footfall Hub"],
    href: "/plots/commercial",
  },
  {
    id: "plot-4m-comm-gt",
    plotNumber: "#C408",
    title: "4 Marla GT Road Commercial",
    category: "Commercial",
    sector: "GT Road Frontage",
    sizeScale: "4 Marla",
    tag: "Direct N-5 Visibility",
    dimensions: "30' × 30' (900 Sq. Ft.)",
    totalPriceNumeric: 22000000,
    totalPriceFormatted: "PKR 2,20,00,000",
    downPaymentNumeric: 2200000,
    downPaymentFormatted: "PKR 22,00,000 (10%)",
    monthlyNumeric: 469333,
    monthlyFormatted: "PKR 4,69,333 / mo",
    possessionNumeric: 4400000,
    possessionFormatted: "PKR 44,00,000 (20%)",
    biAnnualFormatted: "PKR 5,86,667 (×6)",
    image: "/images/landmark_dha_islamabad.jpg",
    features: ["Highway Commuter Visibility", "Retail / Franchise Ideal", "Multi-Storey Approval", "High Rental Yield"],
    href: "/plots/commercial",
  },
  {
    id: "plot-8m-comm-gt",
    plotNumber: "#C880",
    title: "8 Marla Mega Commercial Plaza",
    category: "Commercial",
    sector: "GT Road Frontage",
    sizeScale: "8 Marla",
    tag: "Flagship Corporate Scale",
    dimensions: "40' × 45' (1,800 Sq. Ft.)",
    totalPriceNumeric: 42000000,
    totalPriceFormatted: "PKR 4,20,00,000",
    downPaymentNumeric: 4200000,
    downPaymentFormatted: "PKR 42,00,000 (10%)",
    monthlyNumeric: 896000,
    monthlyFormatted: "PKR 8,96,000 / mo",
    possessionNumeric: 8400000,
    possessionFormatted: "PKR 84,00,000 (20%)",
    biAnnualFormatted: "PKR 11,20,000 (×6)",
    image: "/images/landmark_giga_mall.jpg",
    features: ["Corner & Boulevard Facing", "Suited for Bank / Mega Store", "Spacious Customer Bays", "Maximum ROI"],
    href: "/plots/commercial",
  }
];

export default function PlotsInventoryExplorer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSector, setSelectedSector] = useState<string>("all");
  const [selectedScale, setSelectedScale] = useState<string>("all");
  const [budgetTier, setBudgetTier] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"featured" | "price-low" | "price-high" | "size">("featured");
  
  // Mobile UI States
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [mobileShowAll, setMobileShowAll] = useState(false);

  // Filter & Search Logic
  const filteredInventory = useMemo(() => {
    return COMPLETE_PLOTS_INVENTORY.filter((item) => {
      // 1. Text Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchText = 
          item.title.toLowerCase().includes(q) ||
          item.plotNumber.toLowerCase().includes(q) ||
          item.sector.toLowerCase().includes(q) ||
          item.dimensions.toLowerCase().includes(q) ||
          item.tag.toLowerCase().includes(q) ||
          item.sizeScale.toLowerCase().includes(q);
        if (!matchText) return false;
      }

      // 2. Category Filter
      if (selectedCategory !== "all" && item.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }

      // 3. Sector / Block Filter
      if (selectedSector !== "all" && item.sector !== selectedSector) {
        return false;
      }

      // 4. Scale Filter
      if (selectedScale !== "all" && item.sizeScale !== selectedScale) {
        return false;
      }

      // 5. Budget Tier Filter
      if (budgetTier !== "all") {
        if (budgetTier === "under-50" && item.totalPriceNumeric > 5000000) return false;
        if (budgetTier === "50-100" && (item.totalPriceNumeric <= 5000000 || item.totalPriceNumeric > 10000000)) return false;
        if (budgetTier === "100-200" && (item.totalPriceNumeric <= 10000000 || item.totalPriceNumeric > 20000000)) return false;
        if (budgetTier === "above-200" && item.totalPriceNumeric <= 20000000) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.totalPriceNumeric - b.totalPriceNumeric;
      if (sortBy === "price-high") return b.totalPriceNumeric - a.totalPriceNumeric;
      if (sortBy === "size") return a.dimensions.localeCompare(b.dimensions);
      return 0;
    });
  }, [searchQuery, selectedCategory, selectedSector, selectedScale, budgetTier, sortBy]);

  const resetAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedSector("all");
    setSelectedScale("all");
    setBudgetTier("all");
    setSortBy("featured");
    setMobileShowAll(false);
  };

  const hasActiveFilters = searchQuery !== "" || selectedCategory !== "all" || selectedSector !== "all" || selectedScale !== "all" || budgetTier !== "all" || sortBy !== "featured";

  // Visible items on mobile
  const mobileVisiblePlots = mobileShowAll ? filteredInventory : filteredInventory.slice(0, 4);
  const remainingCount = Math.max(0, filteredInventory.length - 4);

  return (
    <div className="w-full space-y-6 sm:space-y-10">
      
      {/* 1. Interactive Search & Filter Command Center */}
      <div className="p-4 sm:p-8 rounded-3xl bg-white border border-amber-200/90 shadow-xl space-y-4 sm:space-y-6">
        
        {/* Top Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-[#D4A017]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search size (5M, 10M, 1K), sector, or tag..."
              className="w-full pl-10 sm:pl-12 pr-10 py-2.5 sm:py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#D4A017] focus:bg-white focus:outline-none text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 transition-all font-medium"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between md:justify-end gap-2 sm:gap-3">
            {/* Mobile Filter Expand Toggle */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="md:hidden flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 border border-amber-200 text-[#D4A017] text-xs font-bold"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters</span>
              {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 sm:gap-2 bg-slate-50 border border-slate-200 px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-2xl">
              <span className="text-[11px] sm:text-xs font-bold text-slate-500 whitespace-nowrap">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-[11px] sm:text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="size">Dimensions</option>
              </select>
            </div>

            {/* Reset Filters Button */}
            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-[#D4A017] text-xs font-bold transition-all flex items-center gap-1 shrink-0 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Multi-Filter Pills Grid (Always visible on desktop, toggleable on mobile) */}
        <div className={`${mobileFilterOpen ? "grid" : "hidden md:grid"} grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-2 border-t border-slate-100 text-xs`}>
          
          {/* Category Filter */}
          <div className="space-y-1 sm:space-y-1.5">
            <label className="font-bold text-slate-700 block flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#D4A017]" />
              <span>Plot Category</span>
            </label>
            <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200">
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className={`flex-1 py-1 sm:py-1.5 rounded-lg font-bold text-xs transition-all ${
                  selectedCategory === "all" ? "bg-white text-slate-950 shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory("residential")}
                className={`flex-1 py-1 sm:py-1.5 rounded-lg font-bold text-xs transition-all ${
                  selectedCategory === "residential" ? "bg-[#D4A017] text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Res.
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory("commercial")}
                className={`flex-1 py-1 sm:py-1.5 rounded-lg font-bold text-xs transition-all ${
                  selectedCategory === "commercial" ? "bg-[#D4A017] text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Comm.
              </button>
            </div>
          </div>

          {/* Sector / Block Filter */}
          <div className="space-y-1 sm:space-y-1.5">
            <label className="font-bold text-slate-700 block flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#D4A017]" />
              <span>Sector / Block</span>
            </label>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="w-full py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-bold focus:border-[#D4A017] focus:outline-none cursor-pointer"
            >
              <option value="all">All Sectors &amp; Blocks</option>
              <option value="Sector A (Block B)">Sector A (Block B)</option>
              <option value="Sector B">Sector B</option>
              <option value="Commercial Broadway">Commercial Broadway</option>
              <option value="GT Road Frontage">GT Road Frontage</option>
            </select>
          </div>

          {/* Plot Size Scale Filter */}
          <div className="space-y-1 sm:space-y-1.5">
            <label className="font-bold text-slate-700 block flex items-center gap-1.5">
              <Ruler className="w-3.5 h-3.5 text-[#D4A017]" />
              <span>Plot Size / Scale</span>
            </label>
            <select
              value={selectedScale}
              onChange={(e) => setSelectedScale(e.target.value)}
              className="w-full py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-bold focus:border-[#D4A017] focus:outline-none cursor-pointer"
            >
              <option value="all">All Sizes</option>
              <option value="5 Marla">5 Marla (25×45)</option>
              <option value="10 Marla">10 Marla (35×65)</option>
              <option value="1 Kanal">1 Kanal (50×90)</option>
              <option value="5.33 Marla">5.33 Marla (30×40)</option>
              <option value="4 Marla">4 Marla (30×30)</option>
              <option value="8 Marla">8 Marla (40×45)</option>
            </select>
          </div>

          {/* Budget Range Filter */}
          <div className="space-y-1 sm:space-y-1.5">
            <label className="font-bold text-slate-700 block flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              <span>Budget Tier</span>
            </label>
            <select
              value={budgetTier}
              onChange={(e) => setBudgetTier(e.target.value)}
              className="w-full py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-bold focus:border-[#D4A017] focus:outline-none cursor-pointer"
            >
              <option value="all">Any Price</option>
              <option value="under-50">&lt; 50 Lakh (5 Marla)</option>
              <option value="50-100">50 Lakh - 1 Crore</option>
              <option value="100-200">1 Cr - 2 Crore</option>
              <option value="above-200">&gt; 2 Crore</option>
            </select>
          </div>
        </div>

        {/* Results Count & Active Status Bar */}
        <div className="flex items-center justify-between text-xs pt-1 text-slate-500 font-medium">
          <div>
            Showing <strong className="text-slate-900 font-bold">{filteredInventory.length}</strong> verified plots
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-700 font-bold text-[11px] sm:text-xs">Live RDA Inventory</span>
          </div>
        </div>
      </div>

      {/* 2. Real-Time Plots for Sale Grid */}
      {filteredInventory.length === 0 ? (
        <div className="text-center py-12 sm:py-16 p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
          <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-amber-100 flex items-center justify-center text-[#D4A017] mx-auto">
            <Search className="w-7 sm:w-8 h-7 sm:h-8" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-heading">No matching plots found</h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Try adjusting your search criteria or resetting filters to see all available plots.
          </p>
          <button
            onClick={resetAllFilters}
            className="px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-[#D4A017] hover:text-slate-950 transition-all cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <>
          {/* MOBILE 2-COL COMPACT VIEW (Capped at 4 items with See More) */}
          <div className="block sm:hidden space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {mobileVisiblePlots.map((plot) => {
                const plotWhatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
                  `Hi, I want to inquire about ${plot.title} (${plot.plotNumber} in ${plot.sector}, ${plot.dimensions}) listed for ${plot.totalPriceFormatted} in Saffron City.`
                )}`;

                return (
                  <div
                    key={`mob-inv-${plot.id}`}
                    className="group rounded-2xl bg-white border border-amber-200 hover:border-[#D4A017] shadow-sm flex flex-col justify-between overflow-hidden"
                  >
                    <div>
                      <div className="relative h-28 w-full overflow-hidden bg-slate-100">
                        <img
                          src={plot.image}
                          alt={`${plot.title} - ${plot.sector}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                        
                        <div className="absolute top-2 left-2 z-10">
                          <span className="px-1.5 py-0.5 rounded bg-white/95 text-slate-950 text-[9px] font-mono font-bold shadow">
                            {plot.plotNumber}
                          </span>
                        </div>

                        <div className="absolute bottom-1.5 left-2 right-2 z-10">
                          <span className="text-[12px] font-black text-amber-300 font-mono drop-shadow block leading-tight">
                            {plot.totalPriceFormatted}
                          </span>
                        </div>
                      </div>

                      <div className="p-2.5 space-y-1">
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {plot.title}
                        </h4>
                        <div className="flex items-center gap-1 text-[10px] text-slate-600 truncate">
                          <MapPin className="w-2.5 h-2.5 text-[#D4A017] shrink-0" />
                          <span className="truncate">{plot.sector}</span>
                        </div>
                        <div className="text-[10px] text-emerald-700 font-semibold truncate">
                          Book: {plot.downPaymentFormatted}
                        </div>
                      </div>
                    </div>

                    <div className="p-2 pt-0 flex gap-1 mt-1">
                      <Link
                        href={plot.href}
                        className="flex-1 py-1 px-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] font-bold text-center"
                      >
                        Sector
                      </Link>
                      <a
                        href={plotWhatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-1 px-1.5 rounded-lg bg-emerald-600 text-white text-[10px] font-bold text-center inline-flex items-center justify-center gap-0.5"
                      >
                        <MessageSquare className="w-2.5 h-2.5" />
                        <span>Chat</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile "See More" Button */}
            {filteredInventory.length > 4 && (
              <div className="pt-1 text-center">
                <button
                  type="button"
                  onClick={() => setMobileShowAll(!mobileShowAll)}
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-[#D4A017] text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-98 cursor-pointer"
                >
                  {mobileShowAll ? (
                    <>
                      <span>Show Less Plots</span>
                      <ChevronUp className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <span>See More Plots ({remainingCount} more)</span>
                      <ChevronDown className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* TABLET & DESKTOP 3-COLUMN RICH GRID */}
          <div className="hidden sm:block">
            <StaggerReveal
              key={`${selectedCategory}-${selectedSector}-${selectedScale}-${budgetTier}-${searchQuery}-${sortBy}`}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
              staggerDelay={60}
              direction="up"
            >
              {filteredInventory.map((plot) => {
                const plotWhatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
                  `Hi, I want to inquire about ${plot.title} (${plot.plotNumber} in ${plot.sector}, ${plot.dimensions}) listed for ${plot.totalPriceFormatted} in Saffron City.`
                )}`;

                return (
                  <div
                    key={plot.id}
                    className="group rounded-3xl bg-white border border-amber-200 hover:border-[#D4A017] shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      {/* Plot Photographic Header */}
                      <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                        <img
                          src={plot.image}
                          alt={`${plot.title} - ${plot.sector}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                        
                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 z-10">
                          <span className="px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-md text-slate-950 text-[11px] font-mono font-bold shadow">
                            {plot.plotNumber}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3 z-10 flex gap-1.5">
                          <span className={`px-2.5 py-1 rounded-full text-white text-[10px] font-bold uppercase shadow backdrop-blur-md ${
                            plot.category === "Residential" ? "bg-[#D4A017]" : "bg-emerald-600"
                          }`}>
                            {plot.category}
                          </span>
                        </div>

                        {/* Bottom Header Overlays */}
                        <div className="absolute bottom-3 left-3 right-3 z-10 flex items-end justify-between text-white">
                          <div>
                            <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block drop-shadow">
                              {plot.tag}
                            </span>
                            <h3 className="text-xl font-bold font-heading text-white drop-shadow-md">
                              {plot.title}
                            </h3>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] text-slate-300 block">Total Price</span>
                            <span className="text-lg font-black text-[#D4A017] font-mono">
                              {plot.totalPriceFormatted}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Plot Body Content */}
                      <div className="p-6 space-y-4">
                        {/* Sector & Dimensions */}
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5 text-slate-700 font-bold">
                            <MapPin className="w-3.5 h-3.5 text-[#D4A017] shrink-0" />
                            <span>{plot.sector}</span>
                          </div>
                          <span className="px-2.5 py-0.5 rounded bg-slate-100 font-mono text-slate-600 font-semibold">
                            {plot.dimensions}
                          </span>
                        </div>

                        {/* Pricing Breakdown Breakdown Box */}
                        <div className="space-y-2 p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-xs text-slate-700">
                          <div className="flex justify-between py-0.5">
                            <span className="text-slate-600">Booking Amount (10%):</span>
                            <strong className="text-slate-900 font-bold">{plot.downPaymentFormatted}</strong>
                          </div>
                          <div className="flex justify-between py-0.5 font-mono">
                            <span className="text-slate-600">Monthly Installment:</span>
                            <strong className="text-slate-900">{plot.monthlyFormatted}</strong>
                          </div>
                          <div className="flex justify-between py-0.5">
                            <span className="text-slate-600">On Possession:</span>
                            <strong className="text-emerald-700 font-bold">{plot.possessionFormatted}</strong>
                          </div>
                        </div>

                        {/* Feature Bullets */}
                        <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px] text-slate-600">
                          {plot.features.slice(0, 4).map((f) => (
                            <div key={f} className="flex items-center gap-1.5">
                              <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                              <span className="truncate">{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card Action Buttons */}
                    <div className="p-6 pt-0 space-y-2">
                      <a
                        href={plotWhatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs text-center flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Inquire / Book on WhatsApp</span>
                      </a>

                      <div className="flex gap-2">
                        <Link
                          href={plot.href}
                          className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs text-center transition-colors"
                        >
                          Sector Details
                        </Link>
                        <Link
                          href="/payment-plan"
                          className="flex-1 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-[#D4A017] font-bold text-xs text-center transition-colors"
                        >
                          Payment Plan
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </StaggerReveal>
          </div>
        </>
      )}

      {/* 3. Budget & Installment Matcher Box */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-amber-50 via-white to-amber-50 border border-amber-200 shadow-xl space-y-4 sm:space-y-6">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4A017]/10 text-[#D4A017] text-xs font-bold uppercase">
            <CreditCard className="w-3.5 h-3.5" />
            <span>Smart Budget Matcher</span>
          </div>
          <h3 className="text-xl sm:text-3xl font-bold text-slate-900 font-heading">
            Need Help Matching Your Budget to the Right Plot?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Whether you are looking for an affordable 5 Marla family plot with PKR 45,000 monthly installments or a prime commercial plaza investment, our investment advisors will prepare a custom financial schedule tailored to your cash flow.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-1 sm:pt-2">
          <a
            href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
              "Hi, I want to calculate a customized payment plan based on my personal budget."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 text-center"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Discuss Budget on WhatsApp</span>
          </a>
          <Link
            href="/payment-plan"
            className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-slate-900 hover:bg-[#D4A017] text-white hover:text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-2 text-center"
          >
            <span>View Full 3-Year Payment Structure</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
