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
  Check,
  X,
  Compass,
  Layers,
  Sparkles,
  Menu,
  FileText,
  ArrowRight,
  Eye,
  MapPin,
  Clock,
  Briefcase,
  LogOut,
  Upload,
  Globe,
  Mail,
  Sliders,
  Image as ImageIcon,
  Save,
  CheckCheck,
  Send,
  ChevronRight,
  UserCheck,
  UserPlus,
  Key,
  Unlock,
  Lock,
  ShieldAlert,
  Shield,
  BadgeCheck,
  Edit3
} from "lucide-react";
import {
  StoredInquiry,
  StoredPlot,
  StoredSettings,
  StoredUser,
  DashboardPermission,
  UserRole,
  ALL_PERMISSIONS
} from "@/lib/types";
import { formatPKR } from "@/lib/utils";
import FileUploadField from "@/components/dashboard/FileUploadField";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<
    | "overview"
    | "leads"
    | "plots"
    | "content"
    | "masterplan"
    | "paymentplans"
    | "seo"
    | "settings"
    | "users"
  >("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Auth & Session States
  const [currentUser, setCurrentUser] = useState<Omit<StoredUser, "passwordHash" | "salt"> | null>(null);
  const [usersList, setUsersList] = useState<Omit<StoredUser, "passwordHash" | "salt">[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  // User Management Modals
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditPermissionsModal, setShowEditPermissionsModal] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [selectedUserForAction, setSelectedUserForAction] = useState<Omit<StoredUser, "passwordHash" | "salt"> | null>(null);
  const [userModalMessage, setUserModalMessage] = useState("");
  const [userModalError, setUserModalError] = useState("");

  const [newUserForm, setNewUserForm] = useState<{
    name: string;
    email: string;
    password: string;
    role: UserRole;
    permissions: DashboardPermission[];
  }>({
    name: "",
    email: "",
    password: "",
    role: "AGENT",
    permissions: ["overview", "leads"],
  });

  const [editPermissionsForm, setEditPermissionsForm] = useState<DashboardPermission[]>([]);
  const [resetPasswordInput, setResetPasswordInput] = useState("");

  // Data States
  const [leads, setLeads] = useState<StoredInquiry[]>([]);
  const [plots, setPlots] = useState<StoredPlot[]>([]);
  const [settings, setSettings] = useState<StoredSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState("");
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
    image: string;
  }>({
    plotNumber: "",
    sector: "Sector A",
    category: "5 Marla",
    type: "Residential",
    totalPrice: 4500000,
    downPayment: 450000,
    monthlyInst: 45000,
    status: "Available",
    features: "100% Underground Utilities, 50ft Wide Carpeted Road",
    image: "/images/sectors/sector-a-luxury.jpg",
  });

  // Permission Verification Helper
  const hasPermission = (tabKey: DashboardPermission): boolean => {
    if (!currentUser) return true; // Default fallback while loading
    if (currentUser.role === "SUPER_ADMIN" || currentUser.email.toLowerCase() === "ubaidnasir401@gmail.com") {
      return true;
    }
    return currentUser.permissions ? currentUser.permissions.includes(tabKey) : false;
  };

  // Fetch Current User & Team Users
  const fetchCurrentUser = async () => {
    try {
      const stored = typeof window !== "undefined" ? localStorage.getItem("saffron_current_user") : null;
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setCurrentUser(parsed);
        } catch {}
      }

      const res = await fetch("/api/auth/me");
      const data = await res.json();
      if (res.ok && data.success && data.user) {
        setCurrentUser(data.user);
        if (typeof window !== "undefined") {
          localStorage.setItem("saffron_current_user", JSON.stringify(data.user));
        }
      }
    } catch (err) {
      console.warn("Could not fetch current auth user:", err);
    }
  };

  const fetchUsersList = async () => {
    setLoadingUsers(true);
    try {
      const res = await fetch("/api/auth/users");
      const data = await res.json();
      if (res.ok && data.success) {
        setUsersList(data.data);
      }
    } catch (err) {
      console.error("Error fetching users list:", err);
    } finally {
      setLoadingUsers(false);
    }
  };

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
      if (statsData.success && statsData.data.settings) {
        setSettings(statsData.data.settings);
      }
      fetchUsersList();
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
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
          totalPrice: 4500000,
          downPayment: 450000,
          monthlyInst: 45000,
          status: "Available",
          features: "100% Underground Utilities, 50ft Wide Carpeted Road",
          image: "/images/sectors/sector-a-luxury.jpg",
        });
      }
    } catch (err) {
      console.error("Failed to create plot", err);
    }
  };

  // Delete plot
  const handleDeletePlot = async (id: string) => {
    if (!confirm("Are you sure you want to remove this plot from inventory?")) return;
    try {
      const res = await fetch(`/api/plots/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPlots((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete plot", err);
    }
  };

  // Save settings
  const handleSaveSettings = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!settings) return;
    setSavingSettings(true);
    setSaveSuccessMessage("");

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSettings(data.data);
        setSaveSuccessMessage("Settings & CMS updates saved successfully across the site!");
        setTimeout(() => setSaveSuccessMessage(""), 4000);
      } else {
        alert("Failed to save settings: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Failed to save settings", err);
      alert("Error saving settings.");
    } finally {
      setSavingSettings(false);
    }
  };

  // Helper for updating specific settings field
  const updateSettingField = <K extends keyof StoredSettings>(
    field: K,
    value: StoredSettings[K]
  ) => {
    if (!settings) return;
    setSettings({
      ...settings,
      [field]: value,
    });
  };

  // User Management Actions
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setUserModalError("");
    setUserModalMessage("");

    try {
      const res = await fetch("/api/auth/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUserForm),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setUserModalMessage("New user account created successfully!");
        fetchUsersList();
        setTimeout(() => {
          setShowAddUserModal(false);
          setNewUserForm({
            name: "",
            email: "",
            password: "",
            role: "AGENT",
            permissions: ["overview", "leads"],
          });
          setUserModalMessage("");
        }, 1200);
      } else {
        setUserModalError(data.message || "Failed to create user");
      }
    } catch (err) {
      setUserModalError("Network error creating user");
    }
  };

  const handleUpdatePermissions = async () => {
    if (!selectedUserForAction) return;
    setUserModalError("");
    setUserModalMessage("");

    try {
      const res = await fetch(`/api/auth/users/${selectedUserForAction.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ permissions: editPermissionsForm }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setUserModalMessage("Permissions updated successfully!");
        fetchUsersList();
        setTimeout(() => {
          setShowEditPermissionsModal(false);
          setSelectedUserForAction(null);
          setUserModalMessage("");
        }, 1000);
      } else {
        setUserModalError(data.message || "Failed to update permissions");
      }
    } catch (err) {
      setUserModalError("Error updating permissions");
    }
  };

  const handleUnlockUser = async (userId: string) => {
    try {
      const res = await fetch(`/api/auth/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "unlock" }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSaveSuccessMessage("Account successfully unlocked!");
        fetchUsersList();
        setTimeout(() => setSaveSuccessMessage(""), 3000);
      } else {
        alert(data.message || "Failed to unlock account");
      }
    } catch (err) {
      console.error("Unlock user error:", err);
    }
  };

  const handleResetPassword = async () => {
    if (!selectedUserForAction || !resetPasswordInput) return;
    setUserModalError("");
    setUserModalMessage("");

    try {
      const res = await fetch(`/api/auth/users/${selectedUserForAction.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: resetPasswordInput }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setUserModalMessage("Password encrypted and updated successfully!");
        setResetPasswordInput("");
        setTimeout(() => {
          setShowResetPasswordModal(false);
          setSelectedUserForAction(null);
          setUserModalMessage("");
        }, 1000);
      } else {
        setUserModalError(data.message || "Failed to update password");
      }
    } catch (err) {
      setUserModalError("Error updating password");
    }
  };

  const handleDeleteUser = async (userId: string, email: string) => {
    if (email.toLowerCase() === "ubaidnasir401@gmail.com") {
      alert("SuperAdmin account cannot be deleted.");
      return;
    }
    if (!confirm(`Are you sure you want to delete user account "${email}"?`)) return;

    try {
      const res = await fetch(`/api/auth/users/${userId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSaveSuccessMessage("User account removed.");
        fetchUsersList();
        setTimeout(() => setSaveSuccessMessage(""), 3000);
      } else {
        alert(data.message || "Failed to delete user");
      }
    } catch (err) {
      console.error("Delete user error:", err);
    }
  };

  // Metrics
  const totalLeadsCount = leads.length;
  const newLeadsCount = leads.filter((l) => l.status === "New").length;
  const bookedPlotsCount = plots.filter(
    (p) => p.status === "Booked" || p.status === "Reserved"
  ).length;
  const availablePlotsCount = plots.filter((p) => p.status === "Available").length;
  const totalInventoryValue = plots.reduce((acc, p) => acc + (p.totalPrice || 0), 0);

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
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col selection:bg-[#D4A017] selection:text-slate-950">
      {/* 1. TOP NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand & Sidebar Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-[#D4A017] transition-colors cursor-pointer"
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
            {/* Current Logged In SuperAdmin / User Badge */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-amber-50 border border-amber-200/80 text-xs">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-[#D4A017] text-white flex items-center justify-center font-bold text-[10px] shadow-sm">
                {currentUser?.name?.charAt(0) || "U"}
              </div>
              <div className="text-left leading-none">
                <span className="font-bold text-slate-900 block text-[11px] truncate max-w-[130px]">
                  {currentUser?.name || "Ubaid Nasir"}
                </span>
                <span className="text-[9px] font-bold text-amber-700 uppercase">
                  {currentUser?.role === "SUPER_ADMIN" ? "★ Super Admin" : currentUser?.role || "Admin"}
                </span>
              </div>
            </div>

            <button
              onClick={fetchData}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
              title="Sync Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-[#D4A017]" : ""}`} />
              <span className="hidden sm:inline">Sync Data</span>
            </button>

            <button
              onClick={() => handleSaveSettings()}
              disabled={savingSettings}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 via-[#D4A017] to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 text-xs font-bold shadow-sm transition-all cursor-pointer disabled:opacity-50"
            >
              <Save className={`w-3.5 h-3.5 ${savingSettings ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">
                {savingSettings ? "Saving..." : "Save All Changes"}
              </span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-[#D4A017] hover:bg-amber-100 text-xs font-bold transition-colors"
            >
              <span className="hidden sm:inline">View Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/ubaid/login/admin"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-600 hover:text-rose-600 text-xs font-bold transition-all"
              title="Sign Out to Login Portal"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Global Save Notification Toast */}
      {saveSuccessMessage && (
        <div className="bg-emerald-600 text-white px-4 py-2.5 text-center text-xs font-bold flex items-center justify-center gap-2 shadow-md animate-in slide-in-from-top duration-200">
          <CheckCheck className="w-4 h-4" />
          <span>{saveSuccessMessage}</span>
        </div>
      )}

      {/* 2. BODY WITH SIDEBAR & CONTENT */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-6">
        {/* LEFT SIDEBAR */}
        <aside
          className={`${
            sidebarOpen ? "w-64 block" : "hidden lg:w-20 lg:block"
          } shrink-0 transition-all duration-300`}
        >
          <div className="bg-white border border-amber-200/80 rounded-3xl shadow-lg p-3 space-y-4 sticky top-24">
            {/* Sidebar Navigation Links */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 block mb-1">
                Main Console
              </span>

              <button
                onClick={() => setActiveTab("overview")}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
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
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
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
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      activeTab === "leads"
                        ? "bg-white text-slate-950"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {newLeadsCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab("plots")}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "plots"
                    ? "bg-[#D4A017] text-white shadow-md shadow-amber-500/20"
                    : "text-slate-700 hover:bg-amber-50 hover:text-[#D4A017]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Building2 className="w-4 h-4" />
                  <span className={sidebarOpen ? "inline" : "lg:hidden"}>Plots Inventory</span>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    activeTab === "plots"
                      ? "bg-white text-slate-950"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {plots.length}
                </span>
              </button>
            </div>

            <div className="space-y-1 pt-2 border-t border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 block mb-1">
                CMS &amp; Media Control
              </span>

              <button
                onClick={() => setActiveTab("content")}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "content"
                    ? "bg-[#D4A017] text-white shadow-md shadow-amber-500/20"
                    : "text-slate-700 hover:bg-amber-50 hover:text-[#D4A017]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <ImageIcon className="w-4 h-4" />
                  <span className={sidebarOpen ? "inline" : "lg:hidden"}>Content &amp; Images</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("masterplan")}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "masterplan"
                    ? "bg-[#D4A017] text-white shadow-md shadow-amber-500/20"
                    : "text-slate-700 hover:bg-amber-50 hover:text-[#D4A017]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Compass className="w-4 h-4" />
                  <span className={sidebarOpen ? "inline" : "lg:hidden"}>Master Plan &amp; Media</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("paymentplans")}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "paymentplans"
                    ? "bg-[#D4A017] text-white shadow-md shadow-amber-500/20"
                    : "text-slate-700 hover:bg-amber-50 hover:text-[#D4A017]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <CreditCard className="w-4 h-4" />
                  <span className={sidebarOpen ? "inline" : "lg:hidden"}>Payment Plans</span>
                </div>
              </button>
            </div>

            <div className="space-y-1 pt-2 border-t border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 block mb-1">
                Configuration &amp; SEO
              </span>

              <button
                onClick={() => setActiveTab("seo")}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "seo"
                    ? "bg-[#D4A017] text-white shadow-md shadow-amber-500/20"
                    : "text-slate-700 hover:bg-amber-50 hover:text-[#D4A017]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4" />
                  <span className={sidebarOpen ? "inline" : "lg:hidden"}>SEO &amp; Meta Tags</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "settings"
                    ? "bg-[#D4A017] text-white shadow-md shadow-amber-500/20"
                    : "text-slate-700 hover:bg-amber-50 hover:text-[#D4A017]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4" />
                  <span className={sidebarOpen ? "inline" : "lg:hidden"}>Contact &amp; SMTP</span>
                </div>
              </button>
            </div>

            {/* User & Access Management Section in Sidebar */}
            <div className="space-y-1 pt-2 border-t border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 block mb-1">
                Security &amp; Team
              </span>

              <button
                onClick={() => setActiveTab("users")}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "users"
                    ? "bg-[#D4A017] text-white shadow-md shadow-amber-500/20"
                    : "text-slate-700 hover:bg-amber-50 hover:text-[#D4A017]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-amber-500" />
                  <span className={sidebarOpen ? "inline" : "lg:hidden"}>Users &amp; Access</span>
                </div>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  activeTab === "users" ? "bg-white text-slate-950" : "bg-amber-100 text-amber-900"
                }`}>
                  {usersList.length}
                </span>
              </button>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT PANEL */}
        <main className="flex-1 min-w-0 space-y-6">
          {/* ========================================================
              TAB 1: OVERVIEW
          ======================================================== */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stat Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-amber-200/80 rounded-3xl p-5 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase">Total Leads</span>
                    <div className="w-8 h-8 rounded-xl bg-amber-50 text-[#D4A017] flex items-center justify-center">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                    {totalLeadsCount}
                  </div>
                  <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                    <span>{newLeadsCount} New Unread</span>
                  </p>
                </div>

                <div className="bg-white border border-amber-200/80 rounded-3xl p-5 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase">Available Plots</span>
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <Building2 className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                    {availablePlotsCount}
                  </div>
                  <p className="text-[11px] text-slate-500">Out of {plots.length} total inventory</p>
                </div>

                <div className="bg-white border border-amber-200/80 rounded-3xl p-5 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase">Booked / Reserved</span>
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                    {bookedPlotsCount}
                  </div>
                  <p className="text-[11px] text-slate-500">Active investor commitments</p>
                </div>

                <div className="bg-white border border-amber-200/80 rounded-3xl p-5 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase">Inventory Value</span>
                    <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                      <DollarSign className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading truncate">
                    {formatPKR(totalInventoryValue)}
                  </div>
                  <p className="text-[11px] text-slate-500">Total listed plot valuation</p>
                </div>
              </div>

              {/* Quick Actions & Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 bg-white border border-amber-200/80 rounded-3xl p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 font-heading text-base">
                      Recent Enquiries &amp; Leads
                    </h3>
                    <button
                      onClick={() => setActiveTab("leads")}
                      className="text-xs font-bold text-[#D4A017] hover:underline inline-flex items-center gap-1"
                    >
                      <span>View All CRM</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {leads.slice(0, 5).map((lead) => (
                      <div
                        key={lead.id}
                        className="py-3 flex items-center justify-between gap-4 text-xs"
                      >
                        <div className="space-y-0.5">
                          <p className="font-bold text-slate-900 text-sm">{lead.name}</p>
                          <p className="text-slate-500 flex items-center gap-2">
                            <span>{lead.phone}</span>
                            <span>•</span>
                            <span>{lead.plotSize}</span>
                            <span>•</span>
                            <span>{lead.sector}</span>
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                              lead.status === "New"
                                ? "bg-amber-100 text-amber-900"
                                : lead.status === "Contacted"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-emerald-100 text-emerald-800"
                            }`}
                          >
                            {lead.status}
                          </span>
                          <a
                            href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600 transition-colors"
                            title="Chat on WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-4">
                  <div className="bg-white border border-amber-200/80 rounded-3xl p-6 shadow-sm space-y-4">
                    <h3 className="font-bold text-slate-900 font-heading text-base">
                      Quick Content Shortcuts
                    </h3>
                    <div className="space-y-2 text-xs">
                      <button
                        onClick={() => setActiveTab("content")}
                        className="w-full text-left p-3 rounded-2xl bg-slate-50 hover:bg-amber-50 border border-slate-200 flex items-center justify-between font-bold text-slate-800 transition-colors cursor-pointer"
                      >
                        <span>Edit Chairman Portrait &amp; Bio</span>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </button>

                      <button
                        onClick={() => setActiveTab("masterplan")}
                        className="w-full text-left p-3 rounded-2xl bg-slate-50 hover:bg-amber-50 border border-slate-200 flex items-center justify-between font-bold text-slate-800 transition-colors cursor-pointer"
                      >
                        <span>Update Master Plan 4K Map &amp; PDF</span>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </button>

                      <button
                        onClick={() => setActiveTab("paymentplans")}
                        className="w-full text-left p-3 rounded-2xl bg-slate-50 hover:bg-amber-50 border border-slate-200 flex items-center justify-between font-bold text-slate-800 transition-colors cursor-pointer"
                      >
                        <span>Edit Payment Plan Tables</span>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </button>

                      <button
                        onClick={() => setActiveTab("seo")}
                        className="w-full text-left p-3 rounded-2xl bg-slate-50 hover:bg-amber-50 border border-slate-200 flex items-center justify-between font-bold text-slate-800 transition-colors cursor-pointer"
                      >
                        <span>Update SEO Meta &amp; Keywords</span>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 2: LEADS CRM
          ======================================================== */}
          {activeTab === "leads" && (
            <div className="bg-white border border-amber-200/80 rounded-3xl p-6 shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 font-heading">
                    Customer Leads &amp; Enquiries CRM
                  </h2>
                  <p className="text-xs text-slate-500">
                    Manage buyer requests received from website booking forms and calculator submissions.
                  </p>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 text-xs self-start sm:self-auto">
                  {["All", "New", "Contacted", "FollowUp", "Booked"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                        statusFilter === st
                          ? "bg-[#D4A017] text-white shadow-sm"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Leads Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                      <th className="py-3.5 px-4">Client Name</th>
                      <th className="py-3.5 px-4">Contact Phone</th>
                      <th className="py-3.5 px-4">Plot Interest</th>
                      <th className="py-3.5 px-4">Message / Request</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-amber-50/40 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-slate-900">
                          {lead.name}
                          {lead.email && (
                            <a 
                              href={`mailto:${lead.email}`}
                              className="block text-[11px] text-blue-600 hover:underline font-normal"
                            >
                              {lead.email}
                            </a>
                          )}
                          <span className="block text-[10px] text-slate-400 font-normal">
                            {new Date(lead.createdAt).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-medium text-slate-700">
                          <a
                            href={`tel:${lead.phone}`}
                            className="hover:text-[#D4A017] inline-flex items-center gap-1"
                          >
                            <Phone className="w-3 h-3 text-slate-400" />
                            <span>{lead.phone}</span>
                          </a>
                        </td>
                        <td className="py-3.5 px-4">
                          {lead.plotSize ? (
                            <>
                              <span className="font-bold text-slate-800">{lead.plotSize}</span>
                              {lead.sector && <span className="block text-[10px] text-slate-500">{lead.sector}</span>}
                            </>
                          ) : (
                            <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-[10px] font-bold">
                              {lead.source || "Document Download"}
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 max-w-xs text-slate-600 truncate" title={lead.message}>
                          {lead.message || "No specific message"}
                        </td>
                        <td className="py-3.5 px-4">
                          <select
                            value={lead.status}
                            onChange={(e) =>
                              handleUpdateLeadStatus(
                                lead.id,
                                e.target.value as StoredInquiry["status"]
                              )
                            }
                            className="px-2.5 py-1 rounded-xl text-xs font-bold border border-slate-200 bg-white focus:outline-none focus:border-[#D4A017] cursor-pointer"
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="FollowUp">FollowUp</option>
                            <option value="Booked">Booked</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <a
                              href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                                `Hi ${lead.name}, thanks for reaching out to Saffron City Islamabad. How can we assist you today?`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600 transition-colors"
                              title="Message on WhatsApp"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </a>
                            <button
                              onClick={() => handleDeleteLead(lead.id)}
                              className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors cursor-pointer"
                              title="Delete Lead"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 3: PLOTS INVENTORY
          ======================================================== */}
          {activeTab === "plots" && (
            <div className="bg-white border border-amber-200/80 rounded-3xl p-6 shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 font-heading">
                    Plot Inventory Management
                  </h2>
                  <p className="text-xs text-slate-500">
                    Add new plots, edit pricing, change booking status, and upload plot photos.
                  </p>
                </div>

                <button
                  onClick={() => setShowAddPlot(true)}
                  className="px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-500 via-[#D4A017] to-amber-600 text-white text-xs font-bold shadow-md hover:scale-105 transition-all inline-flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Plot</span>
                </button>
              </div>

              {/* Add Plot Modal / Drawer */}
              {showAddPlot && (
                <div className="p-5 rounded-3xl bg-amber-50/60 border border-amber-300 space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-sm">Add New Plot to Inventory</h4>
                    <button
                      onClick={() => setShowAddPlot(false)}
                      className="p-1 rounded-lg hover:bg-amber-200 text-slate-600 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handleCreatePlot} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Plot Number / Code</label>
                      <input
                        type="text"
                        required
                        value={newPlot.plotNumber}
                        onChange={(e) => setNewPlot({ ...newPlot, plotNumber: e.target.value })}
                        placeholder="e.g. A-108 or COM-05"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-medium"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Sector</label>
                      <select
                        value={newPlot.sector}
                        onChange={(e) =>
                          setNewPlot({
                            ...newPlot,
                            sector: e.target.value as any,
                            type: e.target.value === "Commercial Block" ? "Commercial" : "Residential",
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-medium"
                      >
                        <option value="Sector A">Sector A</option>
                        <option value="Sector B">Sector B</option>
                        <option value="Commercial Block">Commercial Block</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Plot Size Category</label>
                      <select
                        value={newPlot.category}
                        onChange={(e) => setNewPlot({ ...newPlot, category: e.target.value as any })}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-medium"
                      >
                        <option value="5 Marla">5 Marla (25×50)</option>
                        <option value="10 Marla">10 Marla (35×70)</option>
                        <option value="1 Kanal">1 Kanal (50×90)</option>
                        <option value="4 Marla">4 Marla Commercial</option>
                        <option value="8 Marla">8 Marla Commercial</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Total Price (PKR)</label>
                      <input
                        type="number"
                        required
                        value={newPlot.totalPrice}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setNewPlot({
                            ...newPlot,
                            totalPrice: val,
                            downPayment: val * 0.1,
                            monthlyInst: (val * 0.3) / 30,
                          });
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-medium"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Down Payment (10%)</label>
                      <input
                        type="number"
                        value={newPlot.downPayment}
                        onChange={(e) => setNewPlot({ ...newPlot, downPayment: Number(e.target.value) })}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-medium"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Initial Status</label>
                      <select
                        value={newPlot.status}
                        onChange={(e) => setNewPlot({ ...newPlot, status: e.target.value as any })}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-medium"
                      >
                        <option value="Available">Available</option>
                        <option value="Reserved">Reserved</option>
                        <option value="Booked">Booked</option>
                      </select>
                    </div>

                    <div className="sm:col-span-3">
                      <FileUploadField
                        label="Plot Photo / Layout Diagram"
                        currentValue={newPlot.image}
                        onUploadSuccess={(url) => setNewPlot({ ...newPlot, image: url })}
                        helperText="Upload specific plot view or sector photo."
                      />
                    </div>

                    <div className="sm:col-span-3 flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAddPlot(false)}
                        className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-[#D4A017] text-white font-bold shadow-md"
                      >
                        Save Plot
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Plots Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                      <th className="py-3.5 px-4">Plot ID</th>
                      <th className="py-3.5 px-4">Sector &amp; Type</th>
                      <th className="py-3.5 px-4">Size Category</th>
                      <th className="py-3.5 px-4">Total Price</th>
                      <th className="py-3.5 px-4">Monthly Plan</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredPlots.map((plot) => (
                      <tr key={plot.id} className="hover:bg-amber-50/40 transition-colors">
                        <td className="py-3 px-4 font-bold text-slate-900">
                          <div className="flex items-center gap-2">
                            {plot.image && (
                              <img
                                src={plot.image}
                                alt="Plot"
                                className="w-7 h-7 rounded-lg object-cover border border-slate-200"
                              />
                            )}
                            <span>{plot.plotNumber}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-medium text-slate-700">
                          <span>{plot.sector}</span>
                          <span className="block text-[10px] text-slate-400">{plot.type}</span>
                        </td>
                        <td className="py-3 px-4 font-bold text-slate-800">{plot.category}</td>
                        <td className="py-3 px-4 font-bold text-[#D4A017]">
                          {formatPKR(plot.totalPrice)}
                        </td>
                        <td className="py-3 px-4 text-slate-600">
                          {formatPKR(plot.monthlyInst)}/mo
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={plot.status}
                            onChange={(e) =>
                              handleUpdatePlotStatus(
                                plot.id,
                                e.target.value as StoredPlot["status"]
                              )
                            }
                            className={`px-2.5 py-1 rounded-xl text-xs font-bold border focus:outline-none cursor-pointer ${
                              plot.status === "Available"
                                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                                : plot.status === "Reserved"
                                ? "bg-amber-50 text-amber-800 border-amber-200"
                                : "bg-rose-50 text-rose-800 border-rose-200"
                            }`}
                          >
                            <option value="Available">Available</option>
                            <option value="Reserved">Reserved</option>
                            <option value="Booked">Booked</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => handleDeletePlot(plot.id)}
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors cursor-pointer"
                            title="Remove Plot"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 4: WEBSITE CONTENT & IMAGES
          ======================================================== */}
          {activeTab === "content" && settings && (
            <div className="space-y-6">
              {/* Section: Hero Banner */}
              <div className="bg-white border border-amber-200/80 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Sparkles className="w-4 h-4 text-[#D4A017]" />
                  <h3 className="font-bold text-slate-900 font-heading text-base">
                    Hero Banner &amp; Headline Content
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Headline Prefix</label>
                    <input
                      type="text"
                      value={settings.heroTitle}
                      onChange={(e) => updateSettingField("heroTitle", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Highlighted Golden Word
                    </label>
                    <input
                      type="text"
                      value={settings.heroHighlightedWord}
                      onChange={(e) => updateSettingField("heroHighlightedWord", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-[#D4A017]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-bold text-slate-700 block mb-1">Hero Subtitle / Description</label>
                    <textarea
                      rows={2}
                      value={settings.heroSubtitle}
                      onChange={(e) => updateSettingField("heroSubtitle", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <FileUploadField
                      label="Hero Background Image (Full Cover)"
                      currentValue={settings.heroBgImage}
                      onUploadSuccess={(url) => updateSettingField("heroBgImage", url)}
                      helperText="High-resolution panoramic photo of Saffron City community or landscape."
                    />
                  </div>
                </div>
              </div>

              {/* Section: Chairman & Founder */}
              <div className="bg-white border border-amber-200/80 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Briefcase className="w-4 h-4 text-[#D4A017]" />
                  <h3 className="font-bold text-slate-900 font-heading text-base">
                    Chairman &amp; Founder Leadership Section
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Chairman Name</label>
                    <input
                      type="text"
                      value={settings.chairmanName}
                      onChange={(e) => updateSettingField("chairmanName", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Official Designation</label>
                    <input
                      type="text"
                      value={settings.chairmanTitle}
                      onChange={(e) => updateSettingField("chairmanTitle", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#D4A017] font-bold"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-bold text-slate-700 block mb-1">Brief Overview</label>
                    <textarea
                      rows={2}
                      value={settings.chairmanBioShort}
                      onChange={(e) => updateSettingField("chairmanBioShort", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-bold text-slate-700 block mb-1">
                      Expanded Bio &amp; SKB Legacy (Shown on &quot;See More&quot;)
                    </label>
                    <textarea
                      rows={3}
                      value={settings.chairmanBioFull}
                      onChange={(e) => updateSettingField("chairmanBioFull", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <FileUploadField
                      label="Chairman HD Portrait Photo (Transparent PNG or Cutout)"
                      currentValue={settings.chairmanPortrait}
                      onUploadSuccess={(url) => updateSettingField("chairmanPortrait", url)}
                      helperText="Official portrait of Malik Tariq Mehmood seamlessly blended into background."
                    />
                  </div>
                </div>
              </div>

              {/* Section: Sectors Showcase */}
              <div className="bg-white border border-amber-200/80 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Layers className="w-4 h-4 text-[#D4A017]" />
                  <h3 className="font-bold text-slate-900 font-heading text-base">
                    Sectors Comparison &amp; Visuals
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                  {/* Sector A */}
                  <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200 space-y-3">
                    <h4 className="font-bold text-slate-900 text-sm text-[#D4A017]">Sector A Settings</h4>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Title</label>
                      <input
                        type="text"
                        value={settings.sectorATitle}
                        onChange={(e) => updateSettingField("sectorATitle", e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-medium"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Tagline</label>
                      <input
                        type="text"
                        value={settings.sectorATagline}
                        onChange={(e) => updateSettingField("sectorATagline", e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200"
                      />
                    </div>
                    <FileUploadField
                      label="Sector A Image"
                      currentValue={settings.sectorAImage}
                      onUploadSuccess={(url) => updateSettingField("sectorAImage", url)}
                    />
                  </div>

                  {/* Sector B */}
                  <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200 space-y-3">
                    <h4 className="font-bold text-slate-900 text-sm text-[#D4A017]">Sector B Settings</h4>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Title</label>
                      <input
                        type="text"
                        value={settings.sectorBTitle}
                        onChange={(e) => updateSettingField("sectorBTitle", e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-medium"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Tagline</label>
                      <input
                        type="text"
                        value={settings.sectorBTagline}
                        onChange={(e) => updateSettingField("sectorBTagline", e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200"
                      />
                    </div>
                    <FileUploadField
                      label="Sector B Image"
                      currentValue={settings.sectorBImage}
                      onUploadSuccess={(url) => updateSettingField("sectorBImage", url)}
                    />
                  </div>
                </div>
              </div>

              {/* Save Button for Content */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => handleSaveSettings()}
                  disabled={savingSettings}
                  className="px-6 py-3 rounded-2xl bg-[#D4A017] text-white font-bold text-xs shadow-md hover:scale-105 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Website Content Changes</span>
                </button>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 5: MASTER PLAN & MEDIA
          ======================================================== */}
          {activeTab === "masterplan" && settings && (
            <div className="bg-white border border-amber-200/80 rounded-3xl p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-900 font-heading text-base">
                    Master Plan Layout &amp; PDF Brochure Uploader
                  </h3>
                  <p className="text-xs text-slate-500">
                    Updating files here automatically synchronizes the Interactive Zoom Viewer, download buttons, and master plan pages.
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Master Plan Description</label>
                  <textarea
                    rows={2}
                    value={settings.masterPlanDescription}
                    onChange={(e) => updateSettingField("masterPlanDescription", e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200 space-y-4">
                  <FileUploadField
                    label="1. Interactive Master Plan Layout Image (WebP / JPG / PNG)"
                    currentValue={settings.masterPlanImage}
                    onUploadSuccess={(url) => updateSettingField("masterPlanImage", url)}
                    helperText="Used inside the interactive panning & zooming viewer on Homepage and /master-plan."
                  />
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200 space-y-4">
                  <FileUploadField
                    label="2. Full High-Resolution 4K Master Layout Image"
                    currentValue={settings.masterPlanFullImage}
                    onUploadSuccess={(url) => updateSettingField("masterPlanFullImage", url)}
                    helperText="High-res full map opened when visitors click 'Expand 4K Layout'."
                  />
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200 space-y-4">
                  <FileUploadField
                    label="3. Official Master Plan PDF Document"
                    currentValue={settings.masterPlanPdf}
                    onUploadSuccess={(url) => updateSettingField("masterPlanPdf", url)}
                    accept=".pdf,image/*"
                    previewType="file"
                    helperText="Downloadable PDF brochure served when users click 'Download Plan PDF'."
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => handleSaveSettings()}
                    disabled={savingSettings}
                    className="px-6 py-3 rounded-2xl bg-[#D4A017] text-white font-bold text-xs shadow-md hover:scale-105 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Sync Master Plan Files Everywhere</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 6: PAYMENT PLANS
          ======================================================== */}
          {activeTab === "paymentplans" && settings && (
            <div className="bg-white border border-amber-200/80 rounded-3xl p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-900 font-heading text-base">
                    Payment Plan Tables &amp; Brochures
                  </h3>
                  <p className="text-xs text-slate-500">
                    Customize installment breakdown rows and upload official payment schedule sheets.
                  </p>
                </div>
              </div>

              {/* Payment Schedule Tiers Editor */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                  Payment Schedule Breakdown Rows
                </h4>
                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                        <th className="py-2.5 px-3">Size</th>
                        <th className="py-2.5 px-3">Type</th>
                        <th className="py-2.5 px-3">Total Price</th>
                        <th className="py-2.5 px-3">Down Payment</th>
                        <th className="py-2.5 px-3">Monthly Inst.</th>
                        <th className="py-2.5 px-3">Possession</th>
                        <th className="py-2.5 px-3">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {settings.paymentTiers.map((tier, idx) => (
                        <tr key={idx} className="hover:bg-amber-50/30">
                          <td className="py-2 px-3">
                            <input
                              type="text"
                              value={tier.size}
                              onChange={(e) => {
                                const newTiers = [...settings.paymentTiers];
                                newTiers[idx].size = e.target.value;
                                updateSettingField("paymentTiers", newTiers);
                              }}
                              className="w-24 px-2 py-1 rounded-lg border border-slate-200 font-bold text-xs"
                            />
                          </td>
                          <td className="py-2 px-3 font-semibold text-slate-700">{tier.type}</td>
                          <td className="py-2 px-3">
                            <input
                              type="text"
                              value={tier.totalPrice}
                              onChange={(e) => {
                                const newTiers = [...settings.paymentTiers];
                                newTiers[idx].totalPrice = e.target.value;
                                updateSettingField("paymentTiers", newTiers);
                              }}
                              className="w-28 px-2 py-1 rounded-lg border border-slate-200 font-bold text-[#D4A017] text-xs"
                            />
                          </td>
                          <td className="py-2 px-3">
                            <input
                              type="text"
                              value={tier.downPayment}
                              onChange={(e) => {
                                const newTiers = [...settings.paymentTiers];
                                newTiers[idx].downPayment = e.target.value;
                                updateSettingField("paymentTiers", newTiers);
                              }}
                              className="w-28 px-2 py-1 rounded-lg border border-slate-200 text-xs"
                            />
                          </td>
                          <td className="py-2 px-3">
                            <input
                              type="text"
                              value={tier.monthlyInstallment}
                              onChange={(e) => {
                                const newTiers = [...settings.paymentTiers];
                                newTiers[idx].monthlyInstallment = e.target.value;
                                updateSettingField("paymentTiers", newTiers);
                              }}
                              className="w-28 px-2 py-1 rounded-lg border border-slate-200 text-xs"
                            />
                          </td>
                          <td className="py-2 px-3">
                            <input
                              type="text"
                              value={tier.possession}
                              onChange={(e) => {
                                const newTiers = [...settings.paymentTiers];
                                newTiers[idx].possession = e.target.value;
                                updateSettingField("paymentTiers", newTiers);
                              }}
                              className="w-24 px-2 py-1 rounded-lg border border-slate-200 text-xs"
                            />
                          </td>
                          <td className="py-2 px-3">
                            <input
                              type="text"
                              value={tier.duration}
                              onChange={(e) => {
                                const newTiers = [...settings.paymentTiers];
                                newTiers[idx].duration = e.target.value;
                                updateSettingField("paymentTiers", newTiers);
                              }}
                              className="w-24 px-2 py-1 rounded-lg border border-slate-200 text-xs"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Payment Plan Images Uploader */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200">
                  <FileUploadField
                    label="Residential Payment Plan Image"
                    currentValue={settings.residentialPaymentPlanImage}
                    onUploadSuccess={(url) => updateSettingField("residentialPaymentPlanImage", url)}
                    helperText="Official residential installment schedule photo."
                  />
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200">
                  <FileUploadField
                    label="Commercial Payment Plan Image"
                    currentValue={settings.commercialPaymentPlanImage}
                    onUploadSuccess={(url) => updateSettingField("commercialPaymentPlanImage", url)}
                    helperText="Official commercial installment schedule photo."
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => handleSaveSettings()}
                  disabled={savingSettings}
                  className="px-6 py-3 rounded-2xl bg-[#D4A017] text-white font-bold text-xs shadow-md hover:scale-105 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Payment Plans</span>
                </button>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 7: SEO & META TAGS
          ======================================================== */}
          {activeTab === "seo" && settings && (
            <div className="bg-white border border-amber-200/80 rounded-3xl p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-900 font-heading text-base">
                    Search Engine Optimization (SEO) &amp; OpenGraph Meta
                  </h3>
                  <p className="text-xs text-slate-500">
                    Configure Google rankings meta tags, social sharing cards, and domain verification.
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-slate-700">Meta Title Tag</label>
                    <span className="text-[11px] text-slate-400">
                      {settings.metaTitle.length}/65 recommended
                    </span>
                  </div>
                  <input
                    type="text"
                    value={settings.metaTitle}
                    onChange={(e) => updateSettingField("metaTitle", e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-slate-700">Meta Description Tag</label>
                    <span className="text-[11px] text-slate-400">
                      {settings.metaDescription.length}/160 recommended
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    value={settings.metaDescription}
                    onChange={(e) => updateSettingField("metaDescription", e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 leading-relaxed"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Focus SEO Keywords (Comma-separated)
                  </label>
                  <textarea
                    rows={2}
                    value={settings.metaKeywords}
                    onChange={(e) => updateSettingField("metaKeywords", e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200"
                    placeholder="Saffron City, RDA approved plots, GT Road Rawat, 5 Marla plots..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Canonical URL</label>
                    <input
                      type="text"
                      value={settings.canonicalUrl}
                      onChange={(e) => updateSettingField("canonicalUrl", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200"
                      placeholder="https://saffroncity.pk"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Google Search Console Verification Tag
                    </label>
                    <input
                      type="text"
                      value={settings.googleSiteVerification}
                      onChange={(e) => updateSettingField("googleSiteVerification", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200"
                      placeholder="e.g. google-site-verification=abc123xyz"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200 space-y-3">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                    Social Sharing / OpenGraph Card
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">OG Title</label>
                      <input
                        type="text"
                        value={settings.ogTitle}
                        onChange={(e) => updateSettingField("ogTitle", e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">OG Description</label>
                      <input
                        type="text"
                        value={settings.ogDescription}
                        onChange={(e) => updateSettingField("ogDescription", e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <FileUploadField
                        label="Social Share Preview Image (OG:Image 1200×630)"
                        currentValue={settings.ogImage}
                        onUploadSuccess={(url) => updateSettingField("ogImage", url)}
                        helperText="Image displayed when sharing link on Facebook, WhatsApp, or Twitter."
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => handleSaveSettings()}
                    disabled={savingSettings}
                    className="px-6 py-3 rounded-2xl bg-[#D4A017] text-white font-bold text-xs shadow-md hover:scale-105 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save SEO Configuration</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 8: CONTACT & SMTP SETTINGS
          ======================================================== */}
          {activeTab === "settings" && settings && (
            <div className="space-y-6">
              {/* Contact Information */}
              <div className="bg-white border border-amber-200/80 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Phone className="w-4 h-4 text-[#D4A017]" />
                  <h3 className="font-bold text-slate-900 font-heading text-base">
                    Official Contact &amp; Location Details
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Primary Phone Number</label>
                    <input
                      type="text"
                      value={settings.contactPhone}
                      onChange={(e) => updateSettingField("contactPhone", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Secondary / UAN Helpline
                    </label>
                    <input
                      type="text"
                      value={settings.secondaryPhone}
                      onChange={(e) => updateSettingField("secondaryPhone", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      WhatsApp Booking Number (Without + or spaces)
                    </label>
                    <input
                      type="text"
                      value={settings.whatsappPhone}
                      onChange={(e) => updateSettingField("whatsappPhone", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-emerald-700"
                      placeholder="e.g. 923215554321"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Official Support Email</label>
                    <input
                      type="email"
                      value={settings.officialEmail}
                      onChange={(e) => updateSettingField("officialEmail", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-bold text-slate-700 block mb-1">Head Office Address</label>
                    <input
                      type="text"
                      value={settings.officeAddress}
                      onChange={(e) => updateSettingField("officeAddress", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-bold text-slate-700 block mb-1">Google Maps Direction URL</label>
                    <input
                      type="text"
                      value={settings.googleMapsUrl}
                      onChange={(e) => updateSettingField("googleMapsUrl", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-bold text-slate-700 block mb-1">Top Announcement Marquee</label>
                    <input
                      type="text"
                      value={settings.announcement}
                      onChange={(e) => updateSettingField("announcement", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* SMTP Lead Alerts Configuration */}
              <div className="bg-white border border-amber-200/80 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4 text-[#D4A017]" />
                    <h3 className="font-bold text-slate-900 font-heading text-base">
                      SMTP &amp; Lead Email Alert Notification
                    </h3>
                  </div>

                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.smtpEnabled}
                      onChange={(e) => updateSettingField("smtpEnabled", e.target.checked)}
                      className="w-4 h-4 rounded text-[#D4A017] accent-[#D4A017]"
                    />
                    <span>Enable SMTP Lead Emails</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">SMTP Host</label>
                    <input
                      type="text"
                      value={settings.smtpHost}
                      onChange={(e) => updateSettingField("smtpHost", e.target.value)}
                      placeholder="smtp.gmail.com or mail.saffroncity.pk"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">SMTP Port</label>
                    <input
                      type="number"
                      value={settings.smtpPort}
                      onChange={(e) => updateSettingField("smtpPort", Number(e.target.value))}
                      placeholder="465 or 587"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Lead Receiver Email</label>
                    <input
                      type="email"
                      value={settings.leadNotificationEmail}
                      onChange={(e) => updateSettingField("leadNotificationEmail", e.target.value)}
                      placeholder="leads@saffroncity.pk"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-emerald-800"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">SMTP Username / Email</label>
                    <input
                      type="text"
                      value={settings.smtpUser}
                      onChange={(e) => updateSettingField("smtpUser", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">SMTP Password / App Password</label>
                    <input
                      type="password"
                      value={settings.smtpPass}
                      onChange={(e) => updateSettingField("smtpPass", e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">From Email Address</label>
                    <input
                      type="text"
                      value={settings.smtpFromEmail}
                      onChange={(e) => updateSettingField("smtpFromEmail", e.target.value)}
                      placeholder="no-reply@saffroncity.pk"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200"
                    />
                  </div>
                </div>
              </div>

              {/* Save Button for Settings */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => handleSaveSettings()}
                  disabled={savingSettings}
                  className="px-6 py-3 rounded-2xl bg-[#D4A017] text-white font-bold text-xs shadow-md hover:scale-105 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Contact &amp; SMTP Configuration</span>
                </button>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 9: USERS & ACCESS CONTROL (RBAC)
          ======================================================== */}
          {activeTab === "users" && (
            <div className="space-y-6">
              {/* Header Banner */}
              <div className="bg-gradient-to-r from-slate-900 via-[#1e293b] to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-amber-300/30 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4A017]/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                  <div className="space-y-1.5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-[#D4A017] text-[11px] font-bold uppercase tracking-wider">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Role-Based Access Control (RBAC)</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
                      Team Accounts &amp; Permissions
                    </h2>
                    <p className="text-xs text-slate-300 max-w-2xl">
                      Manage administrator accounts, assign granular section access, monitor failed attempts, and control 30-minute lockout protection.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setUserModalError("");
                      setUserModalMessage("");
                      setShowAddUserModal(true);
                    }}
                    className="self-start sm:self-auto px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-[#D4A017] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-bold shadow-[0_4px_20px_rgba(212,160,23,0.35)] transition-all flex items-center gap-2 cursor-pointer shrink-0 active:scale-95"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Create Team User</span>
                  </button>
                </div>
              </div>

              {/* User KPI Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-amber-200/80 rounded-3xl p-5 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase">Total Accounts</span>
                    <div className="w-8 h-8 rounded-xl bg-amber-50 text-[#D4A017] flex items-center justify-center">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                    {usersList.length}
                  </div>
                  <p className="text-[11px] text-slate-500">Registered staff profiles</p>
                </div>

                <div className="bg-white border border-amber-200/80 rounded-3xl p-5 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase">Super Admins</span>
                    <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-xs">
                      ★
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                    {usersList.filter((u) => u.role === "SUPER_ADMIN").length}
                  </div>
                  <p className="text-[11px] text-amber-700 font-semibold">Full system authorization</p>
                </div>

                <div className="bg-white border border-amber-200/80 rounded-3xl p-5 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase">Active Users</span>
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <UserCheck className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                    {usersList.filter((u) => u.isActive && !u.lockedUntil).length}
                  </div>
                  <p className="text-[11px] text-emerald-600 font-bold">Authorized &amp; Unlocked</p>
                </div>

                <div className="bg-white border border-amber-200/80 rounded-3xl p-5 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase">Locked Accounts</span>
                    <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                      <Lock className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                    {usersList.filter((u) => u.lockedUntil && new Date(u.lockedUntil).getTime() > Date.now()).length}
                  </div>
                  <p className="text-[11px] text-rose-600 font-bold">30-min security lockout</p>
                </div>
              </div>

              {/* Users Table */}
              <div className="bg-white border border-amber-200/80 rounded-3xl shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base font-heading">
                      User Accounts Directory
                    </h3>
                    <p className="text-xs text-slate-500">
                      View roles, granular module permissions, and manage account security status.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={fetchUsersList}
                    className="self-start sm:self-auto px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loadingUsers ? "animate-spin text-[#D4A017]" : ""}`} />
                    <span>Refresh Team</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] uppercase tracking-wider font-bold text-slate-600">
                        <th className="py-3.5 px-5">User Profile</th>
                        <th className="py-3.5 px-4">Role</th>
                        <th className="py-3.5 px-4">Granted Permissions</th>
                        <th className="py-3.5 px-4">Security Status</th>
                        <th className="py-3.5 px-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {usersList.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-12 text-center text-slate-400">
                            No team users found.
                          </td>
                        </tr>
                      ) : (
                        usersList.map((user) => {
                          const isLocked = Boolean(
                            user.lockedUntil && new Date(user.lockedUntil).getTime() > Date.now()
                          );
                          const isSuperAdmin = user.role === "SUPER_ADMIN" || user.email.toLowerCase() === "ubaidnasir401@gmail.com";

                          return (
                            <tr key={user.id} className="hover:bg-amber-50/30 transition-colors">
                              {/* Profile */}
                              <td className="py-4 px-5">
                                <div className="flex items-center gap-3">
                                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-500 via-[#D4A017] to-amber-600 text-white font-bold flex items-center justify-center text-xs shadow-sm shrink-0">
                                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                                  </div>
                                  <div>
                                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                                      <span>{user.name}</span>
                                      {isSuperAdmin && (
                                        <span className="px-1.5 py-0.5 rounded-full bg-amber-100 text-[#D4A017] text-[10px] font-extrabold flex items-center gap-0.5">
                                          ★ Primary SuperAdmin
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-[11px] text-slate-500 font-mono">
                                      {user.email}
                                    </div>
                                  </div>
                                </div>
                              </td>

                              {/* Role */}
                              <td className="py-4 px-4">
                                <span
                                  className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                                    user.role === "SUPER_ADMIN"
                                      ? "bg-amber-100 text-amber-900 border border-amber-300"
                                      : user.role === "ADMIN"
                                      ? "bg-indigo-100 text-indigo-800"
                                      : user.role === "MANAGER"
                                      ? "bg-emerald-100 text-emerald-800"
                                      : user.role === "EDITOR"
                                      ? "bg-purple-100 text-purple-800"
                                      : "bg-slate-100 text-slate-700"
                                  }`}
                                >
                                  {user.role.replace("_", " ")}
                                </span>
                              </td>

                              {/* Permissions */}
                              <td className="py-4 px-4">
                                {isSuperAdmin ? (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-[#D4A017] border border-amber-200 font-bold text-[11px]">
                                    <Check className="w-3 h-3" />
                                    <span>All 9 Modules Unlocked</span>
                                  </span>
                                ) : (
                                  <div className="flex flex-wrap gap-1 max-w-xs">
                                    {user.permissions && user.permissions.length > 0 ? (
                                      user.permissions.map((p) => (
                                        <span
                                          key={p}
                                          className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[10px] font-semibold"
                                        >
                                          {p}
                                        </span>
                                      ))
                                    ) : (
                                      <span className="text-slate-400 italic text-[11px]">No access assigned</span>
                                    )}
                                  </div>
                                )}
                              </td>

                              {/* Security Status */}
                              <td className="py-4 px-4">
                                {isLocked ? (
                                  <div className="space-y-1">
                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold text-[10px]">
                                      <Lock className="w-3 h-3 text-rose-600" />
                                      <span>Locked (3 Failed Attempts)</span>
                                    </span>
                                    <div className="text-[10px] text-rose-600 font-medium">
                                      Unlock at: {new Date(user.lockedUntil!).toLocaleTimeString()}
                                    </div>
                                  </div>
                                ) : (
                                  <div className="space-y-0.5">
                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                      <span>Active &amp; Secure</span>
                                    </span>
                                    {user.failedAttempts > 0 && (
                                      <div className="text-[10px] text-amber-700 font-semibold">
                                        {user.failedAttempts}/3 failed tries
                                      </div>
                                    )}
                                  </div>
                                )}
                              </td>

                              {/* Action Buttons */}
                              <td className="py-4 px-5 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  {isLocked && (
                                    <button
                                      type="button"
                                      onClick={() => handleUnlockUser(user.id)}
                                      className="px-2.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-[11px] flex items-center gap-1 transition-all shadow-sm cursor-pointer"
                                      title="Unlock account now"
                                    >
                                      <Unlock className="w-3 h-3" />
                                      <span>Unlock</span>
                                    </button>
                                  )}

                                  <button
                                    type="button"
                                    onClick={() => {
                                      setSelectedUserForAction(user);
                                      setEditPermissionsForm(user.permissions || []);
                                      setUserModalError("");
                                      setUserModalMessage("");
                                      setShowEditPermissionsModal(true);
                                    }}
                                    disabled={isSuperAdmin}
                                    className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-amber-100 border border-slate-200 text-slate-700 hover:text-amber-900 font-bold text-[11px] flex items-center gap-1 transition-colors disabled:opacity-40 cursor-pointer"
                                    title="Edit module permissions"
                                  >
                                    <Edit3 className="w-3 h-3" />
                                    <span>Permissions</span>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => {
                                      setSelectedUserForAction(user);
                                      setResetPasswordInput("");
                                      setUserModalError("");
                                      setUserModalMessage("");
                                      setShowResetPasswordModal(true);
                                    }}
                                    className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-bold text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                                    title="Reset password"
                                  >
                                    <Key className="w-3 h-3" />
                                    <span>Reset Key</span>
                                  </button>

                                  {!isSuperAdmin && (
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteUser(user.id, user.email)}
                                      className="p-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
                                      title="Delete user"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Fallback Permission Guard */}
          {!hasPermission(activeTab) && (
            <div className="bg-white border-2 border-amber-300 rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-lg max-w-2xl mx-auto my-12">
              <div className="w-16 h-16 rounded-full bg-amber-50 text-[#D4A017] flex items-center justify-center mx-auto border border-amber-200 shadow-sm">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
                Access Permission Restricted
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Your current administrative role does not have permission to access the <strong>{activeTab.toUpperCase()}</strong> module.
              </p>
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 font-medium">
                Please contact SuperAdmin <strong>(ubaidnasir401@gmail.com)</strong> to grant access to this section.
              </div>
              <button
                type="button"
                onClick={() => setActiveTab("overview")}
                className="px-6 py-2.5 rounded-2xl bg-[#D4A017] text-white font-bold text-xs shadow-md hover:bg-amber-600 transition-all cursor-pointer"
              >
                Return to Overview
              </button>
            </div>
          )}
        </main>
      </div>

      {/* ========================================================
          USER MANAGEMENT MODALS
      ======================================================== */}

      {/* 1. Create New User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 text-slate-900 shadow-2xl relative border border-amber-300 max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setShowAddUserModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-100">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-[#D4A017] border border-amber-200 flex items-center justify-center font-bold">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-serif text-slate-900">Create New Team Account</h3>
                <p className="text-xs text-slate-500">SuperAdmin authorization &bull; Granular RBAC Permissions</p>
              </div>
            </div>

            {userModalError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{userModalError}</span>
              </div>
            )}

            {userModalMessage && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>{userModalMessage}</span>
              </div>
            )}

            <form onSubmit={handleCreateUser} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newUserForm.name}
                  onChange={(e) => setNewUserForm({ ...newUserForm, name: e.target.value })}
                  placeholder="e.g. Tariq Khan"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:border-[#D4A017] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={newUserForm.email}
                    onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                    placeholder="user@saffroncity.pk"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:border-[#D4A017] outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Assigned Role</label>
                  <select
                    value={newUserForm.role}
                    onChange={(e) => setNewUserForm({ ...newUserForm, role: e.target.value as UserRole })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold focus:border-[#D4A017] outline-none"
                  >
                    <option value="ADMIN">Admin (Full Control)</option>
                    <option value="MANAGER">Sales Manager</option>
                    <option value="AGENT">CRM Agent</option>
                    <option value="EDITOR">Content Editor</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Initial Password (Encrypted with PBKDF2)
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={newUserForm.password}
                  onChange={(e) => setNewUserForm({ ...newUserForm, password: e.target.value })}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:border-[#D4A017] outline-none"
                />
              </div>

              {/* Granular Permission Checkboxes */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="font-bold text-slate-800 block">
                    Granted Dashboard Permissions
                  </label>
                  <div className="flex items-center gap-2 text-[11px]">
                    <button
                      type="button"
                      onClick={() =>
                        setNewUserForm({
                          ...newUserForm,
                          permissions: ALL_PERMISSIONS.map((p) => p.id),
                        })
                      }
                      className="text-[#D4A017] hover:underline font-bold"
                    >
                      Select All
                    </button>
                    <span>&bull;</span>
                    <button
                      type="button"
                      onClick={() => setNewUserForm({ ...newUserForm, permissions: [] })}
                      className="text-slate-400 hover:underline"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 bg-slate-50 rounded-2xl border border-slate-200">
                  {ALL_PERMISSIONS.map((perm) => {
                    const isChecked = newUserForm.permissions.includes(perm.id);
                    return (
                      <label
                        key={perm.id}
                        className={`flex items-start gap-2 p-2 rounded-xl cursor-pointer transition-colors ${
                          isChecked ? "bg-amber-100/50 border border-amber-300/60" : "hover:bg-white"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewUserForm({
                                ...newUserForm,
                                permissions: [...newUserForm.permissions, perm.id],
                              });
                            } else {
                              setNewUserForm({
                                ...newUserForm,
                                permissions: newUserForm.permissions.filter((p) => p !== perm.id),
                              });
                            }
                          }}
                          className="w-4 h-4 rounded text-[#D4A017] accent-[#D4A017] mt-0.5"
                        />
                        <div>
                          <div className="font-bold text-slate-900 text-[11px]">{perm.label}</div>
                          <div className="text-[10px] text-slate-500 leading-tight">{perm.desc}</div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#D4A017] hover:bg-amber-600 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Create Account</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Edit Permissions Modal */}
      {showEditPermissionsModal && selectedUserForAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-slate-900 shadow-2xl relative border border-amber-300">
            <button
              type="button"
              onClick={() => setShowEditPermissionsModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-4">
              <h3 className="text-lg font-bold font-serif text-slate-900">Edit Permissions</h3>
              <p className="text-xs text-slate-500">
                Grant or restrict dashboard modules for <strong>{selectedUserForAction.name}</strong> ({selectedUserForAction.email})
              </p>
            </div>

            {userModalError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{userModalError}</span>
              </div>
            )}

            {userModalMessage && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>{userModalMessage}</span>
              </div>
            )}

            <div className="space-y-2 max-h-72 overflow-y-auto p-2 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
              {ALL_PERMISSIONS.map((perm) => {
                const isChecked = editPermissionsForm.includes(perm.id);
                return (
                  <label
                    key={perm.id}
                    className={`flex items-start gap-2.5 p-2.5 rounded-xl cursor-pointer transition-colors ${
                      isChecked ? "bg-amber-100/60 border border-amber-300/80" : "hover:bg-white"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setEditPermissionsForm([...editPermissionsForm, perm.id]);
                        } else {
                          setEditPermissionsForm(editPermissionsForm.filter((p) => p !== perm.id));
                        }
                      }}
                      className="w-4 h-4 rounded text-[#D4A017] accent-[#D4A017] mt-0.5"
                    />
                    <div>
                      <div className="font-bold text-slate-900 text-xs">{perm.label}</div>
                      <div className="text-[10px] text-slate-500">{perm.desc}</div>
                    </div>
                  </label>
                );
              })}
            </div>

            <div className="mt-5 flex justify-end gap-2 text-xs">
              <button
                type="button"
                onClick={() => setShowEditPermissionsModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUpdatePermissions}
                className="px-5 py-2.5 rounded-xl bg-[#D4A017] hover:bg-amber-600 text-white font-bold shadow-md transition-all flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>Save Permissions</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Reset User Password Modal */}
      {showResetPasswordModal && selectedUserForAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-slate-900 shadow-2xl relative border border-amber-300">
            <button
              type="button"
              onClick={() => setShowResetPasswordModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-4">
              <h3 className="text-lg font-bold font-serif text-slate-900">Reset User Security Key</h3>
              <p className="text-xs text-slate-500">
                Set a new encrypted password for <strong>{selectedUserForAction.name}</strong> ({selectedUserForAction.email}).
              </p>
            </div>

            {userModalError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{userModalError}</span>
              </div>
            )}

            {userModalMessage && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>{userModalMessage}</span>
              </div>
            )}

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  New Password (min 6 characters)
                </label>
                <input
                  type="password"
                  value={resetPasswordInput}
                  onChange={(e) => setResetPasswordInput(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:border-[#D4A017] outline-none"
                />
              </div>

              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
                Setting this will immediately hash with a new cryptographic salt and reset any active failed attempts or lockouts.
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2 text-xs">
              <button
                type="button"
                onClick={() => setShowResetPasswordModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleResetPassword}
                disabled={resetPasswordInput.length < 6}
                className="px-5 py-2.5 rounded-xl bg-[#D4A017] hover:bg-amber-600 text-white font-bold shadow-md transition-all flex items-center gap-1.5 disabled:opacity-50"
              >
                <Key className="w-4 h-4" />
                <span>Update Password</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
