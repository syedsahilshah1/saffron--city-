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
  Edit3,
  FileDown,
  BookOpen
} from "lucide-react";
import {
  StoredInquiry,
  StoredPlot,
  StoredBlog,
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
    | "blogs"
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

  // Granular Access Control Helpers
  const isSuperAdmin = currentUser?.role === "SUPER_ADMIN";

  const hasAccess = (perm: DashboardPermission): boolean => {
    if (!currentUser) return true; // during initial client hydration
    if (isSuperAdmin) return true;
    return Array.isArray(currentUser.permissions) && currentUser.permissions.includes(perm);
  };

  // Auto-switch to first permitted tab if activeTab is not allowed for this role
  useEffect(() => {
    if (!currentUser) return;
    if (currentUser.role === "SUPER_ADMIN") return;

    const userPerms = currentUser.permissions || [];
    if (userPerms.length === 0) return;

    if (!userPerms.includes(activeTab as DashboardPermission)) {
      const firstAllowed = ALL_PERMISSIONS.find((p) => userPerms.includes(p.id));
      if (firstAllowed) {
        setActiveTab(firstAllowed.id as any);
      }
    }
  }, [currentUser]);

  // Blog Management States
  const [blogsList, setBlogsList] = useState<StoredBlog[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState(false);
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<StoredBlog | null>(null);
  const [blogCategoryFilter, setBlogCategoryFilter] = useState<string>("All");
  const [blogForm, setBlogForm] = useState<{
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image: string;
    category: string;
    author: string;
    readTime: string;
    isPublished: boolean;
  }>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image: "/images/hero-bg.jpg",
    category: "Market Update",
    author: "Saffron City Official",
    readTime: "4 min read",
    isPublished: true,
  });

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
  const [testingSmtp, setTestingSmtp] = useState(false);
  const [smtpTestResult, setSmtpTestResult] = useState<{ success: boolean; message: string } | null>(null);
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
      const [leadsRes, plotsRes, statsRes, blogsRes] = await Promise.all([
        fetch("/api/inquiries"),
        fetch("/api/plots"),
        fetch("/api/dashboard/stats"),
        fetch("/api/blogs"),
      ]);

      const leadsData = await leadsRes.json();
      const plotsData = await plotsRes.json();
      const statsData = await statsRes.json();
      const blogsData = await blogsRes.json();

      if (leadsData.success) setLeads(leadsData.data);
      if (plotsData.success) setPlots(plotsData.data);
      if (blogsData.success && blogsData.data) setBlogsList(blogsData.data);
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

  const fetchBlogs = async () => {
    setLoadingBlogs(true);
    try {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      if (data.success && data.data) {
        setBlogsList(data.data);
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
    } finally {
      setLoadingBlogs(false);
    }
  };

  const handleOpenCreateBlog = () => {
    setEditingBlog(null);
    setBlogForm({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      image: "/images/hero-bg.jpg",
      category: "Market Update",
      author: currentUser?.name || "Saffron City Official",
      readTime: "4 min read",
      isPublished: true,
    });
    setShowBlogModal(true);
  };

  const handleOpenEditBlog = (blog: StoredBlog) => {
    setEditingBlog(blog);
    setBlogForm({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      image: blog.image || "/images/hero-bg.jpg",
      category: blog.category,
      author: blog.author,
      readTime: blog.readTime || "4 min read",
      isPublished: blog.isPublished ?? true,
    });
    setShowBlogModal(true);
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const isEdit = !!editingBlog;
      const url = "/api/blogs";
      const method = isEdit ? "PUT" : "POST";
      const payload = isEdit ? { id: editingBlog.id, ...blogForm } : blogForm;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSaveSuccessMessage(isEdit ? "Article updated successfully!" : "Article published successfully!");
        setShowBlogModal(false);
        fetchBlogs();
        setTimeout(() => setSaveSuccessMessage(""), 3000);
      } else {
        alert(data.message || "Failed to save blog post");
      }
    } catch (err) {
      console.error("Save blog error:", err);
      alert("Error saving blog article");
    }
  };

  const handleDeleteBlog = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/blogs?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        setSaveSuccessMessage("Article deleted successfully.");
        fetchBlogs();
        setTimeout(() => setSaveSuccessMessage(""), 3000);
      } else {
        alert(data.message || "Failed to delete article");
      }
    } catch (err) {
      console.error("Delete blog error:", err);
    }
  };

  const handleTogglePublishBlog = async (blog: StoredBlog) => {
    try {
      const res = await fetch("/api/blogs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: blog.id,
          isPublished: !blog.isPublished,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSaveSuccessMessage(blog.isPublished ? "Article moved to Drafts." : "Article Published Live!");
        fetchBlogs();
        setTimeout(() => setSaveSuccessMessage(""), 3000);
      }
    } catch (err) {
      console.error("Toggle publish error:", err);
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

  // Test SMTP Email Dispatch
  const handleTestSmtp = async () => {
    if (!settings) return;
    setTestingSmtp(true);
    setSmtpTestResult(null);

    try {
      const res = await fetch("/api/settings/test-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetEmail: settings.leadNotificationEmail || settings.officialEmail || "info@saffroncity.org",
          customSettings: settings,
        }),
      });
      const data = await res.json();
      setSmtpTestResult({
        success: Boolean(data.success),
        message: data.message || (data.success ? "Test email dispatched successfully!" : "SMTP test failed."),
      });
    } catch (err: any) {
      setSmtpTestResult({
        success: false,
        message: "Network error testing SMTP server: " + (err.message || err),
      });
    } finally {
      setTestingSmtp(false);
    }
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

  // Filtered Blogs
  const filteredDashboardBlogs = blogsList.filter((b) => {
    const matchesCategory =
      blogCategoryFilter === "All" ||
      b.category?.toLowerCase() === blogCategoryFilter.toLowerCase();
    const matchesSearch =
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.author && b.author.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const uniqueBlogCategories = [
    "All",
    ...Array.from(new Set(blogsList.map((b) => b.category).filter(Boolean))),
  ];

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
            {(hasAccess("overview") || hasAccess("leads") || hasAccess("plots")) && (
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 block mb-1">
                  Main Console
                </span>

                {hasAccess("overview") && (
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
                )}

                {hasAccess("leads") && (
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
                )}

                {hasAccess("plots") && (
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
                )}
              </div>
            )}

            {(hasAccess("blogs") || hasAccess("content") || hasAccess("masterplan") || hasAccess("paymentplans")) && (
              <div className="space-y-1 pt-2 border-t border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 block mb-1">
                  CMS &amp; Media Control
                </span>

                {hasAccess("blogs") && (
                  <button
                    onClick={() => setActiveTab("blogs")}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                      activeTab === "blogs"
                        ? "bg-[#D4A017] text-white shadow-md shadow-amber-500/20"
                        : "text-slate-700 hover:bg-amber-50 hover:text-[#D4A017]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <BookOpen className="w-4 h-4" />
                      <span className={sidebarOpen ? "inline" : "lg:hidden"}>Blogs &amp; News CMS</span>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        activeTab === "blogs"
                          ? "bg-white text-slate-950"
                          : "bg-amber-100 text-amber-900"
                      }`}
                    >
                      {blogsList.length}
                    </span>
                  </button>
                )}

                {hasAccess("content") && (
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
                )}

                {hasAccess("masterplan") && (
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
                )}

                {hasAccess("paymentplans") && (
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
                )}
              </div>
            )}

            {(hasAccess("seo") || hasAccess("settings")) && (
              <div className="space-y-1 pt-2 border-t border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 block mb-1">
                  Configuration &amp; SEO
                </span>

                {hasAccess("seo") && (
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
                )}

                {hasAccess("settings") && (
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
                )}
              </div>
            )}

            {/* User & Access Management Section in Sidebar (Only for SuperAdmin or users with 'users' permission) */}
            {(isSuperAdmin || hasAccess("users")) && (
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
            )}
          </div>
        </aside>

        {/* MAIN CONTENT PANEL */}
        <main className="flex-1 min-w-0 space-y-6">
          {/* If the logged-in user is not Super Admin and has zero permissions assigned */}
          {currentUser && !isSuperAdmin && (!currentUser.permissions || currentUser.permissions.length === 0) && (
            <div className="bg-white border border-amber-200/80 rounded-3xl p-8 sm:p-12 text-center shadow-sm space-y-4 max-w-xl mx-auto my-12">
              <div className="w-16 h-16 rounded-3xl bg-amber-50 text-[#D4A017] border border-amber-200 flex items-center justify-center mx-auto shadow-inner">
                <Shield className="w-8 h-8" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-xl font-bold font-heading text-slate-900">
                  Welcome, {currentUser.name}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto">
                  Your account ({currentUser.role}) has been activated successfully, but has not yet been assigned specific dashboard modules. Please ask your administrator to grant module permissions (e.g. Blogs, Content, CRM).
                </p>
              </div>
              <div className="pt-2 flex justify-center gap-3">
                <Link
                  href="/"
                  target="_blank"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
                >
                  <span>View Live Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 1: OVERVIEW
          ======================================================== */}
          {activeTab === "overview" && hasAccess("overview") && (
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
                  {/* Quick Content Actions (Filtered by permissions) */}
                  {(hasAccess("content") || hasAccess("masterplan") || hasAccess("paymentplans") || hasAccess("seo")) && (
                    <div className="bg-white border border-amber-200/80 rounded-3xl p-6 shadow-sm space-y-4">
                      <h3 className="font-bold text-slate-900 font-heading text-base">
                        Quick Content Shortcuts
                      </h3>
                      <div className="space-y-2 text-xs">
                        {hasAccess("content") && (
                          <button
                            onClick={() => setActiveTab("content")}
                            className="w-full text-left p-3 rounded-2xl bg-slate-50 hover:bg-amber-50 border border-slate-200 flex items-center justify-between font-bold text-slate-800 transition-colors cursor-pointer"
                          >
                            <span>Edit Story of Legacy &amp; Chairman Bio</span>
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                          </button>
                        )}

                        {hasAccess("masterplan") && (
                          <button
                            onClick={() => setActiveTab("masterplan")}
                            className="w-full text-left p-3 rounded-2xl bg-slate-50 hover:bg-amber-50 border border-slate-200 flex items-center justify-between font-bold text-slate-800 transition-colors cursor-pointer"
                          >
                            <span>Update Master Plan 4K Map &amp; PDF</span>
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                          </button>
                        )}

                        {hasAccess("paymentplans") && (
                          <button
                            onClick={() => setActiveTab("paymentplans")}
                            className="w-full text-left p-3 rounded-2xl bg-slate-50 hover:bg-amber-50 border border-slate-200 flex items-center justify-between font-bold text-slate-800 transition-colors cursor-pointer"
                          >
                            <span>Edit Payment Plan Tables</span>
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                          </button>
                        )}

                        {hasAccess("seo") && (
                          <button
                            onClick={() => setActiveTab("seo")}
                            className="w-full text-left p-3 rounded-2xl bg-slate-50 hover:bg-amber-50 border border-slate-200 flex items-center justify-between font-bold text-slate-800 transition-colors cursor-pointer"
                          >
                            <span>Update SEO Meta &amp; Keywords</span>
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 2: LEADS CRM
          ======================================================== */}
          {activeTab === "leads" && hasAccess("leads") && (
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
                        <td className="py-3.5 px-4 min-w-[150px]">
                          {lead.plotSize ? (
                            <div>
                              <span className="font-bold text-slate-800 block">{lead.plotSize}</span>
                              {lead.sector && <span className="block text-[10px] text-slate-500">{lead.sector}</span>}
                            </div>
                          ) : (
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-50 text-amber-950 border border-amber-200 text-[11px] font-semibold">
                              <FileDown className="w-3.5 h-3.5 text-[#D4A017] shrink-0" />
                              <span className="leading-snug">{lead.source?.replace(/^Map Download:\s*/i, "") || "Document Download"}</span>
                            </div>
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
          {activeTab === "plots" && hasAccess("plots") && (
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
              TAB: BLOGS & ARTICLES CMS
          ======================================================== */}
          {activeTab === "blogs" && hasAccess("blogs") && (
            <div className="space-y-6">
              {/* Header & Main Actions */}
              <div className="bg-white border border-amber-200/80 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-[#D4A017] text-[11px] font-bold uppercase tracking-wider">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Content Management System</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
                      Articles &amp; Market Insights CMS
                    </h2>
                    <p className="text-xs text-slate-500 max-w-2xl">
                      Draft, publish, edit, and categorize project updates, Ring Road infrastructure reports, and real estate guidance articles.
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5 self-start sm:self-auto">
                    <button
                      type="button"
                      onClick={fetchBlogs}
                      className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                      title="Refresh Blogs"
                    >
                      <RefreshCw className={`w-4 h-4 ${loadingBlogs ? "animate-spin text-[#D4A017]" : ""}`} />
                    </button>
                    <button
                      type="button"
                      onClick={handleOpenCreateBlog}
                      className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-[#D4A017] to-amber-600 text-white text-xs font-bold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Create New Article</span>
                    </button>
                  </div>
                </div>

                {/* Quick Blog Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Total Articles</span>
                    <strong className="text-xl font-extrabold text-slate-900 font-heading">{blogsList.length}</strong>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                    <span className="text-[10px] font-bold text-emerald-700 uppercase block">Published Live</span>
                    <strong className="text-xl font-extrabold text-emerald-800 font-heading">
                      {blogsList.filter((b) => b.isPublished).length}
                    </strong>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200">
                    <span className="text-[10px] font-bold text-amber-700 uppercase block">Drafts</span>
                    <strong className="text-xl font-extrabold text-amber-800 font-heading">
                      {blogsList.filter((b) => !b.isPublished).length}
                    </strong>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200">
                    <span className="text-[10px] font-bold text-indigo-700 uppercase block">Categories</span>
                    <strong className="text-xl font-extrabold text-indigo-800 font-heading">
                      {uniqueBlogCategories.length - 1}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Filters & Articles Table */}
              <div className="bg-white border border-amber-200/80 rounded-3xl p-6 shadow-sm space-y-4">
                {/* Category Pills & Search */}
                <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
                  {/* Category Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 w-full md:w-auto">
                    {uniqueBlogCategories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setBlogCategoryFilter(cat)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                          blogCategoryFilter === cat
                            ? "bg-[#D4A017] text-white shadow-sm"
                            : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Search Input */}
                  <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search articles by title or author..."
                      className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:border-[#D4A017] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 uppercase font-bold text-[10px] tracking-wider">
                        <th className="py-3 px-4">Article</th>
                        <th className="py-3 px-3">Category</th>
                        <th className="py-3 px-3">Author &amp; Read Time</th>
                        <th className="py-3 px-3">Date</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {filteredDashboardBlogs.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-10 text-center text-slate-400 italic">
                            No articles found matching &quot;{searchTerm || blogCategoryFilter}&quot;.
                          </td>
                        </tr>
                      ) : (
                        filteredDashboardBlogs.map((blog) => (
                          <tr key={blog.id} className="hover:bg-amber-50/40 transition-colors">
                            {/* Title & Image */}
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-3 max-w-sm sm:max-w-md">
                                <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                                  <img
                                    src={blog.image || "/images/hero-bg.jpg"}
                                    alt={blog.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="min-w-0">
                                  <h4 className="font-bold text-slate-900 text-sm line-clamp-1 leading-snug">
                                    {blog.title}
                                  </h4>
                                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                    {blog.excerpt}
                                  </p>
                                  <span className="text-[10px] text-slate-400 font-mono">
                                    /blogs/{blog.slug}
                                  </span>
                                </div>
                              </div>
                            </td>

                            {/* Category */}
                            <td className="py-4 px-3 whitespace-nowrap">
                              <span className="inline-block px-2.5 py-1 rounded-full bg-amber-50 text-[#D4A017] border border-amber-200/80 font-bold text-[10px]">
                                {blog.category}
                              </span>
                            </td>

                            {/* Author */}
                            <td className="py-4 px-3 whitespace-nowrap">
                              <div className="font-bold text-slate-900 text-xs">{blog.author}</div>
                              <div className="text-[10px] text-slate-400">{blog.readTime || "4 min read"}</div>
                            </td>

                            {/* Date */}
                            <td className="py-4 px-3 whitespace-nowrap text-slate-500 text-[11px]">
                              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </td>

                            {/* Live Status Toggle */}
                            <td className="py-4 px-3 whitespace-nowrap">
                              <button
                                type="button"
                                onClick={() => handleTogglePublishBlog(blog)}
                                className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 transition cursor-pointer ${
                                  blog.isPublished
                                    ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-300"
                                }`}
                                title={blog.isPublished ? "Click to set as Draft" : "Click to Publish Live"}
                              >
                                <span
                                  className={`w-1.5 h-1.5 rounded-full ${
                                    blog.isPublished ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
                                  }`}
                                />
                                <span>{blog.isPublished ? "Live" : "Draft"}</span>
                              </button>
                            </td>

                            {/* Actions */}
                            <td className="py-4 px-4 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-1.5">
                                <Link
                                  href={`/blogs/${blog.slug}`}
                                  target="_blank"
                                  className="p-2 rounded-xl bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 transition-colors cursor-pointer"
                                  title="Preview Article on Live Site"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </Link>

                                <button
                                  type="button"
                                  onClick={() => handleOpenEditBlog(blog)}
                                  className="p-2 rounded-xl bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 transition-colors cursor-pointer"
                                  title="Edit Article"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleDeleteBlog(blog.id, blog.title)}
                                  className="p-2 rounded-xl bg-slate-100 hover:bg-rose-100 text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
                                  title="Delete Article"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
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

          {/* ========================================================
              TAB 4: WEBSITE CONTENT & IMAGES
          ======================================================== */}
          {activeTab === "content" && hasAccess("content") && settings && (
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

              {/* Section: Story of Legacy & Chairman Leadership */}
              <div className="bg-white border border-amber-200/80 rounded-3xl p-6 shadow-sm space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#D4A017]">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 font-heading text-base">
                        Story of Legacy &amp; Leadership Section
                      </h3>
                      <p className="text-[11px] text-slate-500">
                        Controls Homepage Section 2 — &quot;A STORY of LEGACY&quot; &amp; Chairman profile
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                    Homepage Section 2
                  </span>
                </div>

                {/* Live Section Headline Preview */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50/60 via-amber-50/30 to-transparent border border-amber-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-amber-800 block mb-1">
                      Live Headline Typography Preview
                    </span>
                    <div className="text-xl sm:text-2xl font-serif text-slate-900 leading-tight">
                      <span>{settings.chairmanHeadingTop || "A STORY"}</span>
                      <br />
                      <span className="italic font-serif font-normal lowercase pr-2 inline-block">
                        {settings.chairmanHeadingSub || "of"}
                      </span>
                      <span className="font-serif font-medium uppercase tracking-wider text-[#5C1D24]">
                        {settings.chairmanHeadingMain || "LEGACY"}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 border-l border-amber-200/80 pl-3 sm:max-w-xs">
                    Renders with bespoke editorial typography and elegant serif styling on the homepage.
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  {/* Headline controls */}
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Top Heading Text</label>
                    <input
                      type="text"
                      placeholder="A STORY"
                      value={settings.chairmanHeadingTop ?? "A STORY"}
                      onChange={(e) => updateSettingField("chairmanHeadingTop", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Connector Word (Italic)</label>
                    <input
                      type="text"
                      placeholder="of"
                      value={settings.chairmanHeadingSub ?? "of"}
                      onChange={(e) => updateSettingField("chairmanHeadingSub", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 italic font-medium"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Main Accent Word (Uppercase)</label>
                    <input
                      type="text"
                      placeholder="LEGACY"
                      value={settings.chairmanHeadingMain ?? "LEGACY"}
                      onChange={(e) => updateSettingField("chairmanHeadingMain", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold uppercase tracking-wider text-[#5C1D24]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Chairman / Founder Name</label>
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
                    <label className="font-bold text-slate-700 block mb-1">
                      Brief Overview (Initial paragraph visible on homepage)
                    </label>
                    <textarea
                      rows={2}
                      value={settings.chairmanBioShort}
                      onChange={(e) => updateSettingField("chairmanBioShort", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-bold text-slate-700 block mb-1">
                      Expanded Bio &amp; SKB Legacy (Revealed when clicking &quot;Read more&quot;)
                    </label>
                    <textarea
                      rows={3}
                      value={settings.chairmanBioFull}
                      onChange={(e) => updateSettingField("chairmanBioFull", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Action Button Text</label>
                    <input
                      type="text"
                      placeholder="Discover More"
                      value={settings.chairmanCtaText ?? "Discover More"}
                      onChange={(e) => updateSettingField("chairmanCtaText", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Action Button Target Link</label>
                    <input
                      type="text"
                      placeholder="/about-us"
                      value={settings.chairmanCtaLink ?? "/about-us"}
                      onChange={(e) => updateSettingField("chairmanCtaLink", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium text-blue-600"
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
          {activeTab === "masterplan" && hasAccess("masterplan") && settings && (
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
          {activeTab === "paymentplans" && hasAccess("paymentplans") && settings && (
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
          {activeTab === "seo" && hasAccess("seo") && settings && (
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
          {activeTab === "settings" && hasAccess("settings") && settings && (
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
                      placeholder="e.g. 923331113551"
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

                {/* SMTP Test Alert Message */}
                {smtpTestResult && (
                  <div
                    className={`p-3.5 rounded-xl text-xs flex items-start gap-2.5 border ${
                      smtpTestResult.success
                        ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                        : "bg-red-50 border-red-200 text-red-800"
                    }`}
                  >
                    {smtpTestResult.success ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 font-medium">{smtpTestResult.message}</div>
                    <button
                      type="button"
                      onClick={() => setSmtpTestResult(null)}
                      className="text-slate-400 hover:text-slate-600 font-bold"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>

              {/* Save & Test Buttons for Settings */}
              <div className="flex flex-wrap items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleTestSmtp}
                  disabled={testingSmtp || !settings.smtpEnabled}
                  className="px-5 py-3 rounded-2xl bg-slate-800 text-white font-bold text-xs shadow-sm hover:bg-slate-700 disabled:opacity-50 transition-all cursor-pointer flex items-center gap-2"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${testingSmtp ? "animate-spin" : ""}`} />
                  <span>{testingSmtp ? "Testing Connection..." : "Test SMTP Delivery"}</span>
                </button>

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
          {activeTab === "users" && (isSuperAdmin || hasAccess("users")) && (
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
                    onChange={(e) => {
                      const newRole = e.target.value as UserRole;
                      let rolePerms: DashboardPermission[] = ["overview", "leads"];
                      if (newRole === "EDITOR") {
                        rolePerms = ["blogs", "content"];
                      } else if (newRole === "MANAGER") {
                        rolePerms = ["overview", "leads", "plots", "paymentplans"];
                      } else if (newRole === "ADMIN") {
                        rolePerms = ALL_PERMISSIONS.map((p) => p.id);
                      } else if (newRole === "AGENT") {
                        rolePerms = ["overview", "leads"];
                      }
                      setNewUserForm({ ...newUserForm, role: newRole, permissions: rolePerms });
                    }}
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

      {/* 4. Create / Edit Blog Post Modal */}
      {showBlogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 text-slate-900 shadow-2xl relative border border-amber-300 max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setShowBlogModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-100">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-[#D4A017] border border-amber-200 flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-serif text-slate-900">
                  {editingBlog ? "Edit Blog Article" : "Create New Blog Article"}
                </h3>
                <p className="text-xs text-slate-500">
                  Authoritative news, sector milestones, and real estate market analysis
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveBlog} className="space-y-4 text-xs">
              {/* Title */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  value={blogForm.title}
                  onChange={(e) => {
                    const newTitle = e.target.value;
                    const autoSlug = !editingBlog
                      ? newTitle
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/(^-|-$)/g, "")
                      : blogForm.slug;
                    setBlogForm({ ...blogForm, title: newTitle, slug: autoSlug });
                  }}
                  placeholder="e.g. Rawalpindi Ring Road Interchange — Transformative Value for Saffron City"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-900 focus:border-[#D4A017] focus:bg-white outline-none"
                />
              </div>

              {/* URL Slug */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-slate-700 block">URL Path Slug *</label>
                  <button
                    type="button"
                    onClick={() => {
                      const genSlug = blogForm.title
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/(^-|-$)/g, "");
                      setBlogForm({ ...blogForm, slug: genSlug });
                    }}
                    className="text-[10px] font-bold text-[#D4A017] hover:underline"
                  >
                    Auto-generate from Title
                  </button>
                </div>
                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 overflow-hidden focus-within:border-[#D4A017]">
                  <span className="px-3 py-2 text-[11px] text-slate-400 bg-slate-100/70 border-r border-slate-200 font-mono">
                    /blogs/
                  </span>
                  <input
                    type="text"
                    required
                    value={blogForm.slug}
                    onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                    placeholder="my-article-url-slug"
                    className="w-full px-3 py-2 bg-transparent text-xs font-mono text-slate-800 outline-none"
                  />
                </div>
              </div>

              {/* Category, Author, ReadTime in Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <input
                    type="text"
                    list="category-suggestions"
                    value={blogForm.category}
                    onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                    placeholder="e.g. Market Insights"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:border-[#D4A017] outline-none"
                  />
                  <datalist id="category-suggestions">
                    <option value="Market Insights" />
                    <option value="Development Update" />
                    <option value="Legal & Investment" />
                    <option value="Master Plan" />
                    <option value="News & Updates" />
                  </datalist>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Author Name</label>
                  <input
                    type="text"
                    value={blogForm.author}
                    onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                    placeholder="Saffron City Official"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:border-[#D4A017] outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Estimated Read Time</label>
                  <input
                    type="text"
                    value={blogForm.readTime}
                    onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                    placeholder="4 min read"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:border-[#D4A017] outline-none"
                  />
                </div>
              </div>

              {/* Featured Image */}
              <div>
                <FileUploadField
                  label="Featured Banner Image"
                  currentValue={blogForm.image}
                  onUploadSuccess={(url) => setBlogForm({ ...blogForm, image: url })}
                  helperText="Recommended size 1200×630. Appears on blog cards, headers, and social share previews."
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Executive Excerpt / Summary (Displayed on Cards &amp; Google Snippets)
                </label>
                <textarea
                  rows={2}
                  required
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                  placeholder="A concise 2-line summary highlighting the key takeaway..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:border-[#D4A017] outline-none leading-relaxed"
                />
              </div>

              {/* Full Content */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-slate-700 block">
                    Full Article Content *
                  </label>
                  <span className="text-[10px] text-slate-400">
                    Separate paragraphs with a blank line. Short standalone lines will render as sub-headings.
                  </span>
                </div>
                <textarea
                  rows={8}
                  required
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  placeholder="Write the complete article content here. Use blank lines between paragraphs.

Key Milestone Overview
Paragraph describing the construction milestones, underground utilities, or Ring Road connectivity..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-mono focus:border-[#D4A017] outline-none leading-relaxed"
                />
              </div>

              {/* Publish Toggle Switch */}
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block text-xs">Publish Article Live</span>
                  <span className="text-[10px] text-slate-500">
                    When enabled, this article is visible on the public website and homepage.
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={blogForm.isPublished}
                    onChange={(e) => setBlogForm({ ...blogForm, isPublished: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4A017]"></div>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowBlogModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-[#D4A017] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingBlog ? "Update Article" : "Publish Article"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
