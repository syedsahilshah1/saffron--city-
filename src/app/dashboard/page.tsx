"use client";

export const dynamic = "force-dynamic";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  CreditCard, 
  Settings, 
  Search, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Phone, 
  MessageCircle, 
  RefreshCw, 
  ExternalLink,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  Filter,
  Bell,
  Home,
  Check,
  X,
  Compass,
  Layers,
  Sparkles,
  Menu,
  SlidersHorizontal,
  FileText,
  ArrowRight,
  ChevronRight,
  Eye,
  Activity,
  MapPin,
  Clock,
  Briefcase
} from "lucide-react";
import { StoredInquiry, StoredPlot, StoredSettings } from "@/lib/db";
import { formatPKR } from "@/lib/utils";
import { SITE_CONFIG } from "@/data/saffron-data";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "leads" | "plots" | "settings">("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Data States
  const [leads, setLeads] = useState<StoredInquiry[]>([]);
  const [plots, setPlots] = useState<StoredPlot[]>([]);
  const [settings, setSettings] = useState<StoredSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [sectorFilter, setSectorFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");

  // New plot modal
  const [showAddPlot, setShowAddPlot] = useState(false);
  const [newPlot, setNewPlot] = useState<{
    plotNumber: string;
    sector: "Sector A" | "Sector B" | "Commercial Block";
    category: "5 Marla" | "10 Marla" | "1 Kanal" | "4 Marla" | "8 Marla";
    type: "Residential" | "Commercial";
    totalPrice: number;
    downPayment: number;
    monthlyInst: number;
    status: "Available" | "Reserved" | "Booked";
    features: string;
  }>({
    plotNumber: "",
    sector: "Sector A",
    category: "5 Marla",
    type: "Residential",
    totalPrice: 4000000,
    downPayment: 400000,
    monthlyInst: 40000,
    status: "Available",
    features: "100% Underground Utilities, 50ft Wide Carpeted Road",
  });

  // Fetch all dashboard data
  const fetchData = async () => {
    setLoading(true);
    try {
      const [leadsRes, plotsRes, statsRes] = await Promise.all([
        fetch("/api/inquiries"),
        fetch("/api/plots"),
        fetch("/api/dashboard/stats"),
      ]);

      const leadsData = await leadsRes.json();
      const plotsData = await plotsRes.json();
      const statsData = await statsRes.json();

      if (leadsData.success) setLeads(leadsData.data);
      if (plotsData.success) setPlots(plotsData.data);
      if (statsData.success && statsData.data.settings) setSettings(statsData.data.settings);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Update lead status
  const handleUpdateLeadStatus = async (id: string, newStatus: StoredInquiry["status"]) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
        );
      }
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  // Delete lead
  const handleDeleteLead = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: "DELETE" });
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

  // Update plot status
  const handleUpdatePlotStatus = async (id: string, newStatus: StoredPlot["status"]) => {
    try {
      const res = await fetch(`/api/plots/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setPlots((prev) =>
          prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
        );
      }
    } catch (err) {
      console.error("Failed to update plot status", err);
    }
  };

  // Create new plot
  const handleCreatePlot = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/plots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPlot),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPlots((prev) => [...prev, data.data]);
        setShowAddPlot(false);
        setNewPlot({
          plotNumber: "",
          sector: "Sector A",
          category: "5 Marla",
          type: "Residential",
          totalPrice: 4000000,
          downPayment: 400000,
          monthlyInst: 40000,
          status: "Available",
          features: "100% Underground Utilities, 50ft Wide Carpeted Road",
        });
      }
    } catch (err) {
      console.error("Failed to create plot", err);
    }
  };

  // Save settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        alert("Site settings saved successfully!");
      }
    } catch (err) {
      console.error("Failed to save settings", err);
    }
  };

  // Metrics
  const totalLeadsCount = leads.length;
  const newLeadsCount = leads.filter((l) => l.status === "New").length;
  const bookedPlotsCount = plots.filter((p) => p.status === "Booked" || p.status === "Reserved").length;
  const availablePlotsCount = plots.filter((p) => p.status === "Available").length;
  const totalInventoryValue = plots.reduce((acc, p) => acc + p.totalPrice, 0);

  // Filtered Leads
  const filteredLeads = leads.filter((l) => {
    const matchesStatus = statusFilter === "All" || l.status === statusFilter;
    const matchesSearch =
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.phone.includes(searchTerm) ||
      (l.message && l.message.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  // Filtered Plots
  const filteredPlots = plots.filter((p) => {
    const matchesSector = sectorFilter === "All" || p.sector === sectorFilter;
    const matchesSearch =
      p.plotNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSector && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-100/80 text-slate-900 flex flex-col pt-16 sm:pt-20">
      
      {/* 1. TOP NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Brand & Sidebar Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-[#D4A017] transition-colors"
              title="Toggle Sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-[#D4A017] to-amber-600 flex items-center justify-center text-slate-950 font-bold shadow-sm">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-sm sm:text-base font-bold text-slate-900 font-heading leading-none">
                  Saffron City Portal
                </h1>
                <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  RDA Official Management
                </span>
              </div>
            </div>
          </div>

          {/* Quick Search in Navbar */}
          <div className="hidden md:flex items-center relative flex-1 max-w-md mx-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search leads, phone numbers, or plot IDs..."
              className="w-full pl-9 pr-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:border-[#D4A017] focus:bg-white focus:outline-none transition-all"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={fetchData}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
              title="Sync Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-[#D4A017]" : ""}`} />
              <span className="hidden sm:inline">Sync Data</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-[#D4A017] hover:bg-amber-100 text-xs font-bold transition-colors"
            >
              <span className="hidden sm:inline">View Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* 2. BODY WITH SIDEBAR & CONTENT */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-6">
        
        {/* LEFT SIDEBAR */}
        <aside className={`${sidebarOpen ? "w-64 block" : "hidden lg:w-20 lg:block"} shrink-0 transition-all duration-300`}>
          <div className="bg-white border border-amber-200/80 rounded-3xl shadow-lg p-4 space-y-6 sticky top-24">
            
            {/* Sidebar Navigation Links */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 block mb-2">
                Main Console
              </span>

              <button
                onClick={() => setActiveTab("overview")}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === "overview"
                    ? "bg-[#D4A017] text-white shadow-md shadow-amber-500/20"
                    : "text-slate-700 hover:bg-amber-50 hover:text-[#D4A017]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <LayoutDashboard className="w-4 h-4" />
                  <span className={sidebarOpen ? "inline" : "lg:hidden"}>Overview</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("leads")}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === "leads"
                    ? "bg-[#D4A017] text-white shadow-md shadow-amber-500/20"
                    : "text-slate-700 hover:bg-amber-50 hover:text-[#D4A017]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4" />
                  <span className={sidebarOpen ? "inline" : "lg:hidden"}>Leads CRM</span>
                </div>
                {newLeadsCount > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    activeTab === "leads" ? "bg-white text-slate-950" : "bg-emerald-100 text-emerald-800"
                  }`}>
                    {newLeadsCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab("plots")}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === "plots"
                    ? "bg-[#D4A017] text-white shadow-md shadow-amber-500/20"
                    : "text-slate-700 hover:bg-amber-50 hover:text-[#D4A017]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Building2 className="w-4 h-4" />
                  <span className={sidebarOpen ? "inline" : "lg:hidden"}>Plot Inventory</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  activeTab === "plots" ? "bg-white text-slate-950" : "bg-slate-100 text-slate-700"
                }`}>
                  {plots.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === "settings"
                    ? "bg-[#D4A017] text-white shadow-md shadow-amber-500/20"
                    : "text-slate-700 hover:bg-amber-50 hover:text-[#D4A017]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Settings className="w-4 h-4" />
                  <span className={sidebarOpen ? "inline" : "lg:hidden"}>Site Settings</span>
                </div>
              </button>
            </div>

            {/* Direct Pages Section */}
            <div className="pt-4 border-t border-slate-100 space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 block mb-1">
                Portals &amp; Views
              </span>
              <Link
                href="/plot-for-sale"
                target="_blank"
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-[#D4A017] hover:bg-amber-50/60 transition-colors"
              >
                <Layers className="w-4 h-4 text-slate-400" />
                <span className={sidebarOpen ? "inline" : "lg:hidden"}>Plots Explorer</span>
              </Link>
              <Link
                href="/master-plan"
                target="_blank"
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-[#D4A017] hover:bg-amber-50/60 transition-colors"
              >
                <Compass className="w-4 h-4 text-slate-400" />
                <span className={sidebarOpen ? "inline" : "lg:hidden"}>4K Master Plan</span>
              </Link>
              <Link
                href="/payment-plan"
                target="_blank"
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-[#D4A017] hover:bg-amber-50/60 transition-colors"
              >
                <CreditCard className="w-4 h-4 text-slate-400" />
                <span className={sidebarOpen ? "inline" : "lg:hidden"}>Payment Plans</span>
              </Link>
              <Link
                href="/noc-status"
                target="_blank"
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-[#D4A017] hover:bg-amber-50/60 transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-slate-400" />
                <span className={sidebarOpen ? "inline" : "lg:hidden"}>RDA Clearance</span>
              </Link>
            </div>

            {/* Direct Support Desk Card */}
            <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-[11px]">Sales Desk</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              </div>
              <p className="text-[10px] text-slate-600 leading-tight">
                Direct helpline connected for investor assistance.
              </p>
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 hover:underline pt-0.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Sales WhatsApp</span>
              </a>
            </div>
          </div>
        </aside>

        {/* RIGHT MAIN CONTENT AREA */}
        <main className="flex-1 min-w-0 space-y-6">
          
          {/* 3. EXECUTIVE HERO BANNER */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl text-white p-6 sm:p-8 bg-slate-950 border border-amber-500/20">
            <div className="absolute inset-0 z-0">
              <img
                src="/images/about/about-hero-banner.jpg"
                alt="Saffron City Executive Portal"
                className="w-full h-full object-cover opacity-20 scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-900/60" />
              <div className="absolute inset-0 bg-[radial-gradient(#D4A017_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
            </div>

            <div className="relative z-10 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4A017]/20 border border-[#D4A017]/40 text-[#D4A017] text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Executive Dashboard</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
                    Saffron City Operations Command
                  </h2>
                  <p className="text-xs text-slate-300">
                    Live telemetry on investor leads, plot inventory allocations, and RDA approvals.
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setActiveTab("plots");
                      setShowAddPlot(true);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-[#D4A017] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Plot Listing</span>
                  </button>
                </div>
              </div>

              {/* Metric KPI Cards in Hero */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span>Total Inquiries</span>
                    <Users className="w-4 h-4 text-[#D4A017]" />
                  </div>
                  <span className="text-2xl font-black text-white font-mono block">
                    {totalLeadsCount}
                  </span>
                  <span className="text-[10px] text-emerald-300 font-bold block">
                    {newLeadsCount} New pending review
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span>Available Plots</span>
                    <Building2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-2xl font-black text-white font-mono block">
                    {availablePlotsCount}
                  </span>
                  <span className="text-[10px] text-slate-300 block">
                    Sector A, B &amp; Commercial
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span>Reserved / Booked</span>
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                  </div>
                  <span className="text-2xl font-black text-white font-mono block">
                    {bookedPlotsCount}
                  </span>
                  <span className="text-[10px] text-amber-300 block">
                    Active allocations
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span>Inventory Pipeline</span>
                    <DollarSign className="w-4 h-4 text-[#D4A017]" />
                  </div>
                  <span className="text-base sm:text-lg font-black text-[#D4A017] font-mono block truncate">
                    {formatPKR(totalInventoryValue)}
                  </span>
                  <span className="text-[10px] text-slate-300 block">
                    Gross inventory book value
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 4. TAB CONTENTS */}

          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Recent Inquiries Quick Table */}
              <div className="p-6 rounded-3xl bg-white border border-amber-200/80 shadow-lg space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-base font-bold text-slate-900 font-heading">
                      Recent Customer Inquiries
                    </h3>
                    <p className="text-xs text-slate-500">Latest leads submitted through website and campaign portals</p>
                  </div>
                  <button
                    onClick={() => setActiveTab("leads")}
                    className="text-xs font-bold text-[#D4A017] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All ({leads.length})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-100">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-amber-50/80 text-amber-900 font-bold border-b border-amber-200">
                      <tr>
                        <th className="py-3 px-4">Customer Name</th>
                        <th className="py-3 px-4">Phone / WhatsApp</th>
                        <th className="py-3 px-4">Interested Size</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {leads.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-6 text-center text-slate-400">
                            No inquiries recorded yet.
                          </td>
                        </tr>
                      ) : (
                        leads.slice(0, 5).map((lead) => (
                          <tr key={lead.id} className="hover:bg-amber-50/40 transition-colors">
                            <td className="py-3 px-4 font-bold text-slate-900">{lead.name}</td>
                            <td className="py-3 px-4 font-mono">{lead.phone}</td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 text-[11px] font-bold">
                                {lead.plotSize || "General Inquiry"}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                lead.status === "New" ? "bg-emerald-100 text-emerald-800" :
                                lead.status === "Contacted" ? "bg-blue-100 text-blue-800" :
                                lead.status === "Booked" ? "bg-purple-100 text-purple-800" : "bg-slate-100 text-slate-700"
                              }`}>
                                {lead.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <a
                                href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 inline-flex items-center gap-1 text-[11px] font-bold"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span>WhatsApp</span>
                              </a>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Sector Allotment Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-3xl bg-white border border-amber-200/80 shadow-md space-y-3">
                  <span className="text-xs font-bold text-[#D4A017] uppercase tracking-wider block">
                    Flagship Executive
                  </span>
                  <h4 className="text-base font-bold text-slate-900">Sector A (Block B)</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    100% Underground Electrification, 250ft Grand Boulevard access, and Mosque proximity.
                  </p>
                  <Link
                    href="/sectors/sector-a"
                    className="text-xs font-bold text-[#D4A017] hover:underline flex items-center gap-1 pt-1"
                  >
                    <span>View Sector Page</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-emerald-200 shadow-md space-y-3">
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                    Family &amp; Affordable
                  </span>
                  <h4 className="text-base font-bold text-slate-900">Sector B Residential</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Dedicated sector parks, neighborhood mosque, and pocket-friendly 30-month installment plans.
                  </p>
                  <Link
                    href="/sectors/sector-b"
                    className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 pt-1"
                  >
                    <span>View Sector Page</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-amber-200/80 shadow-md space-y-3">
                  <span className="text-xs font-bold text-[#D4A017] uppercase tracking-wider block">
                    High Commercial Yield
                  </span>
                  <h4 className="text-base font-bold text-slate-900">Commercial Broadway</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Signature 30×40 plots with PKR 45 Lac discount and prime GT Road multi-storey approval.
                  </p>
                  <Link
                    href="/plots/commercial"
                    className="text-xs font-bold text-[#D4A017] hover:underline flex items-center gap-1 pt-1"
                  >
                    <span>View Commercial Page</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LEADS CRM */}
          {activeTab === "leads" && (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-white border border-amber-200/80 shadow-lg space-y-4">
                
                {/* Search & Status Filters for Leads */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500">Filter Status:</span>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="py-1.5 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none"
                    >
                      <option value="All">All Inquiries ({leads.length})</option>
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="FollowUp">Follow-up</option>
                      <option value="Booked">Booked</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>

                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search customer name or phone..."
                      className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#D4A017]"
                    />
                  </div>
                </div>

                {/* Leads Table */}
                <div className="overflow-x-auto rounded-2xl border border-slate-100">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-amber-50/80 text-amber-900 font-bold border-b border-amber-200">
                      <tr>
                        <th className="py-3.5 px-4">Name</th>
                        <th className="py-3.5 px-4">Phone / WhatsApp</th>
                        <th className="py-3.5 px-4">Size &amp; Sector</th>
                        <th className="py-3.5 px-4">Message Notes</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {filteredLeads.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-slate-400">
                            No inquiries found matching your filters.
                          </td>
                        </tr>
                      ) : (
                        filteredLeads.map((lead) => (
                          <tr key={lead.id} className="hover:bg-amber-50/30 transition-colors">
                            <td className="py-3.5 px-4 font-bold text-slate-900">{lead.name}</td>
                            <td className="py-3.5 px-4 font-mono">{lead.phone}</td>
                            <td className="py-3.5 px-4">
                              <span className="font-semibold text-slate-800 block">{lead.plotSize || "General"}</span>
                              <span className="text-[10px] text-slate-400">{lead.sector || "Any Sector"}</span>
                            </td>
                            <td className="py-3.5 px-4 max-w-xs truncate text-slate-500">
                              {lead.message || "—"}
                            </td>
                            <td className="py-3.5 px-4">
                              <select
                                value={lead.status}
                                onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as any)}
                                className="py-1 px-2 rounded-lg bg-slate-100 font-bold text-[11px] focus:outline-none cursor-pointer"
                              >
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="FollowUp">Follow-up</option>
                                <option value="Booked">Booked</option>
                                <option value="Closed">Closed</option>
                              </select>
                            </td>
                            <td className="py-3.5 px-4 text-right space-x-2">
                              <a
                                href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                                  `Hi ${lead.name}, regarding your Saffron City plot inquiry:`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 inline-flex items-center"
                                title="Chat on WhatsApp"
                              >
                                <MessageCircle className="w-4 h-4" />
                              </a>
                              <a
                                href={`tel:${lead.phone}`}
                                className="p-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 inline-flex items-center"
                                title="Call"
                              >
                                <Phone className="w-4 h-4" />
                              </a>
                              <button
                                onClick={() => handleDeleteLead(lead.id)}
                                className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 inline-flex items-center cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PLOTS INVENTORY */}
          {activeTab === "plots" && (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-white border border-amber-200/80 shadow-lg space-y-4">
                
                {/* Header with Add Plot Button */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500">Sector:</span>
                    <select
                      value={sectorFilter}
                      onChange={(e) => setSectorFilter(e.target.value)}
                      className="py-1.5 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none"
                    >
                      <option value="All">All Sectors ({plots.length})</option>
                      <option value="Sector A">Sector A</option>
                      <option value="Sector B">Sector B</option>
                      <option value="Commercial Block">Commercial Block</option>
                    </select>
                  </div>

                  <button
                    onClick={() => setShowAddPlot(true)}
                    className="px-4 py-2 rounded-xl bg-[#D4A017] hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create New Plot</span>
                  </button>
                </div>

                {/* Plots Table */}
                <div className="overflow-x-auto rounded-2xl border border-slate-100">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-amber-50/80 text-amber-900 font-bold border-b border-amber-200">
                      <tr>
                        <th className="py-3.5 px-4">Plot ID</th>
                        <th className="py-3.5 px-4">Sector</th>
                        <th className="py-3.5 px-4">Size &amp; Type</th>
                        <th className="py-3.5 px-4">Total Price</th>
                        <th className="py-3.5 px-4">Down Payment</th>
                        <th className="py-3.5 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {filteredPlots.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-slate-400">
                            No plots found matching your filter.
                          </td>
                        </tr>
                      ) : (
                        filteredPlots.map((plot) => (
                          <tr key={plot.id} className="hover:bg-amber-50/30 transition-colors">
                            <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{plot.plotNumber}</td>
                            <td className="py-3.5 px-4 font-semibold text-slate-800">{plot.sector}</td>
                            <td className="py-3.5 px-4">
                              <span className="font-bold text-slate-900 block">{plot.category}</span>
                              <span className="text-[10px] text-slate-500">{plot.type}</span>
                            </td>
                            <td className="py-3.5 px-4 font-mono font-bold text-[#D4A017]">
                              {formatPKR(plot.totalPrice)}
                            </td>
                            <td className="py-3.5 px-4 font-mono">
                              {formatPKR(plot.downPayment)}
                            </td>
                            <td className="py-3.5 px-4">
                              <select
                                value={plot.status}
                                onChange={(e) => handleUpdatePlotStatus(plot.id, e.target.value as any)}
                                className={`py-1 px-2 rounded-lg font-bold text-[11px] focus:outline-none cursor-pointer ${
                                  plot.status === "Available" ? "bg-emerald-100 text-emerald-800" :
                                  plot.status === "Reserved" ? "bg-amber-100 text-amber-800" : "bg-purple-100 text-purple-800"
                                }`}
                              >
                                <option value="Available">Available</option>
                                <option value="Reserved">Reserved</option>
                                <option value="Booked">Booked</option>
                              </select>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SETTINGS */}
          {activeTab === "settings" && (
            <div className="p-8 rounded-3xl bg-white border border-amber-200/80 shadow-lg space-y-6">
              <div className="space-y-1 pb-4 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  System &amp; Contact Configurations
                </h3>
                <p className="text-xs text-slate-500">
                  Manage official contact channels, RDA clearance status, and site-wide notifications.
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-4 max-w-2xl text-xs">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">Portal Site Title</label>
                  <input
                    type="text"
                    value={settings?.siteName || "Saffron City Islamabad"}
                    onChange={(e) => setSettings((prev) => prev ? { ...prev, siteName: e.target.value } : null)}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium focus:border-[#D4A017] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">WhatsApp Phone Number</label>
                    <input
                      type="text"
                      value={settings?.whatsappPhone || SITE_CONFIG.whatsapp}
                      onChange={(e) => setSettings((prev) => prev ? { ...prev, whatsappPhone: e.target.value } : null)}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-mono font-medium focus:border-[#D4A017] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">Official Support Phone</label>
                    <input
                      type="text"
                      value={settings?.contactPhone || SITE_CONFIG.phone}
                      onChange={(e) => setSettings((prev) => prev ? { ...prev, contactPhone: e.target.value } : null)}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-mono font-medium focus:border-[#D4A017] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">Official Support Email</label>
                  <input
                    type="email"
                    value={settings?.officialEmail || SITE_CONFIG.email}
                    onChange={(e) => setSettings((prev) => prev ? { ...prev, officialEmail: e.target.value } : null)}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium focus:border-[#D4A017] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">Site Office Physical Address</label>
                  <input
                    type="text"
                    value={settings?.officeAddress || SITE_CONFIG.address}
                    onChange={(e) => setSettings((prev) => prev ? { ...prev, officeAddress: e.target.value } : null)}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium focus:border-[#D4A017] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">RDA NOC Status Description</label>
                  <input
                    type="text"
                    value={settings?.rdaNocStatus || "RDA Approved (Jan 2025, 15,000 Kanal)"}
                    onChange={(e) => setSettings((prev) => prev ? { ...prev, rdaNocStatus: e.target.value } : null)}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium focus:border-[#D4A017] focus:outline-none"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-[#D4A017] hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    Save Site Settings
                  </button>
                </div>
              </form>
            </div>
          )}

        </main>
      </div>

      {/* CREATE PLOT MODAL */}
      {showAddPlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-white border border-amber-200 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                Create New Plot Listing
              </h3>
              <button
                onClick={() => setShowAddPlot(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePlot} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Plot Number / ID</label>
                  <input
                    type="text"
                    required
                    value={newPlot.plotNumber}
                    onChange={(e) => setNewPlot({ ...newPlot, plotNumber: e.target.value })}
                    placeholder="#A-105"
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-bold focus:outline-none focus:border-[#D4A017]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Sector / Block</label>
                  <select
                    value={newPlot.sector}
                    onChange={(e) => setNewPlot({ ...newPlot, sector: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-bold focus:outline-none focus:border-[#D4A017]"
                  >
                    <option value="Sector A">Sector A</option>
                    <option value="Sector B">Sector B</option>
                    <option value="Commercial Block">Commercial Block</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Size Category</label>
                  <select
                    value={newPlot.category}
                    onChange={(e) => setNewPlot({ ...newPlot, category: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-bold focus:outline-none focus:border-[#D4A017]"
                  >
                    <option value="5 Marla">5 Marla (25×45)</option>
                    <option value="10 Marla">10 Marla (35×65)</option>
                    <option value="1 Kanal">1 Kanal (50×90)</option>
                    <option value="4 Marla">4 Marla Commercial (30×30)</option>
                    <option value="8 Marla">8 Marla Commercial (30×60)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Total Price (PKR)</label>
                  <input
                    type="number"
                    required
                    value={newPlot.totalPrice}
                    onChange={(e) => setNewPlot({ ...newPlot, totalPrice: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-mono font-bold focus:outline-none focus:border-[#D4A017]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddPlot(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#D4A017] hover:bg-amber-600 text-slate-950 font-bold shadow transition-all cursor-pointer"
                >
                  Save Plot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
