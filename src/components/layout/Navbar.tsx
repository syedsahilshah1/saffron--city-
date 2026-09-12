"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Phone,
  ChevronDown,
} from "lucide-react";
import { SITE_CONFIG } from "@/data/saffron-data";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [phone, setPhone] = useState(SITE_CONFIG.phone);
  const lastScrollY = useRef(0);
  const [projectDropdown, setProjectDropdown] = useState(false);
  const [blocksDropdown, setBlocksDropdown] = useState(false);
  const projectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const blocksTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data?.contactPhone) {
          setPhone(data.data.contactPhone);
        }
      })
      .catch((err) => console.warn("Could not load dynamic navbar settings:", err));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (currentScrollY / totalHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));

      // If mobile drawer is open, keep navbar visible
      if (isOpen) {
        setVisible(true);
        return;
      }

      // Small threshold to prevent jitter
      if (Math.abs(currentScrollY - lastScrollY.current) < 6 && currentScrollY > 80) {
        return;
      }

      if (currentScrollY > 80) {
        if (currentScrollY > lastScrollY.current) {
          // Scrolling down: hide navbar
          setVisible(false);
          setBlocksDropdown(false);
          setProjectDropdown(false);
        } else {
          // Scrolling up: reveal navbar
          setVisible(true);
        }
      } else {
        // At the very top
        setVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  const handleProjectEnter = () => {
    if (projectTimeoutRef.current) clearTimeout(projectTimeoutRef.current);
    setProjectDropdown(true);
  };

  const handleProjectLeave = () => {
    projectTimeoutRef.current = setTimeout(() => {
      setProjectDropdown(false);
    }, 150);
  };

  const handleBlocksEnter = () => {
    if (blocksTimeoutRef.current) clearTimeout(blocksTimeoutRef.current);
    setBlocksDropdown(true);
  };

  const handleBlocksLeave = () => {
    blocksTimeoutRef.current = setTimeout(() => {
      setBlocksDropdown(false);
    }, 150);
  };

  const projectSubLinks = [
    { name: "Master Plan", href: "/master-plan" },
    { name: "Location & Access", href: "/location" },
    { name: "Payment Plan", href: "/payment-plan" },
  ];

  const blockSubLinks = [
    { name: "Sector A (Block B - New Rates)", href: "/sectors/sector-a" },
    { name: "Sector B (Affordable Block)", href: "/sectors/sector-b" },
    { name: "Signature Commercial (30×40)", href: "/plots/commercial" },
    { name: "Plots For Sale", href: "/plot-for-sale" },
  ];

  const isProjectActive =
    pathname === "/master-plan" || pathname === "/location" || pathname === "/payment-plan";
  const isBlocksActive =
    pathname.startsWith("/plot") || pathname.startsWith("/sector");

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-in-out bg-white/95 backdrop-blur-md border-b border-amber-200/50 shadow-sm py-2 ${
        visible ? "translate-y-0" : "-translate-y-full pointer-events-none"
      }`}
    >
      {/* Top Scroll Indicator Line */}
      <div className="absolute top-0 inset-x-0 h-[3px] bg-amber-100/30 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-600 via-[#D49E17] to-amber-300 transition-[width] duration-150 ease-out shadow-[0_0_12px_rgba(212, 158, 23,0.9)] relative"
          style={{ width: `${scrollProgress}%` }}
        >
          {/* Subtle glowing tip on the progress line */}
          <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/80 shadow-[0_0_8px_#ffffff]" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hidden lg:flex items-center justify-between gap-6 min-h-[58px]">

          {/* Left Side: Brand Logo */}
          <Link href="/" className="flex items-center group flex-shrink-0" aria-label="Saffron City">
            <img
              src="/images/saffron-city-logo.png"
              alt="Saffron City Islamabad"
              className="h-14 lg:h-16 w-auto object-contain group-hover:scale-105 transition-all flex-shrink-0 drop-shadow-sm"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
            <Link
              href="/"
              className={`text-sm font-semibold tracking-wide transition-colors py-1.5 ${
                pathname === "/"
                  ? "text-[#D49E17] border-b-2 border-[#D49E17]"
                  : "text-slate-700 hover:text-[#D49E17]"
              }`}
            >
              Home
            </Link>

            <Link
              href="/about-us"
              className={`text-sm font-semibold tracking-wide transition-colors py-1.5 ${
                pathname === "/about-us"
                  ? "text-[#D49E17] border-b-2 border-[#D49E17]"
                  : "text-slate-700 hover:text-[#D49E17]"
              }`}
            >
              About Us
            </Link>

            {/* Project Overview Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleProjectEnter}
              onMouseLeave={handleProjectLeave}
            >
              <button
                type="button"
                className={`flex items-center gap-1 text-sm font-semibold tracking-wide transition-colors py-1.5 ${
                  isProjectActive
                    ? "text-[#D49E17] border-b-2 border-[#D49E17]"
                    : "text-slate-700 hover:text-[#D49E17]"
                }`}
                onClick={() => setProjectDropdown((prev) => !prev)}
              >
                <span>Project Overview</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    projectDropdown ? "rotate-180 text-[#D49E17]" : "opacity-70"
                  }`}
                />
              </button>

              {projectDropdown && (
                <div className="absolute top-full left-0 mt-2 w-56 rounded-2xl bg-white border border-amber-200 p-2 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  {projectSubLinks.map((sub) => (
                    <Link
                      key={sub.name}
                      href={sub.href}
                      onClick={() => setProjectDropdown(false)}
                      className="block px-3.5 py-2 text-xs font-semibold text-slate-700 rounded-xl hover:bg-amber-50 hover:text-[#D49E17] transition-colors"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Blocks & Plots Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleBlocksEnter}
              onMouseLeave={handleBlocksLeave}
            >
              <button
                type="button"
                className={`flex items-center gap-1 text-sm font-semibold tracking-wide transition-colors py-1.5 ${
                  isBlocksActive
                    ? "text-[#D49E17] border-b-2 border-[#D49E17]"
                    : "text-slate-700 hover:text-[#D49E17]"
                }`}
                onClick={() => setBlocksDropdown((prev) => !prev)}
              >
                <span>Blocks & Plots</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    blocksDropdown ? "rotate-180 text-[#D49E17]" : "opacity-70"
                  }`}
                />
              </button>

              {blocksDropdown && (
                <div className="absolute top-full left-0 mt-2 w-64 rounded-2xl bg-white border border-amber-200 p-2 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  {blockSubLinks.map((sub) => (
                    <Link
                      key={sub.name}
                      href={sub.href}
                      onClick={() => setBlocksDropdown(false)}
                      className="block px-3.5 py-2 text-xs font-semibold text-slate-700 rounded-xl hover:bg-amber-50 hover:text-[#D49E17] transition-colors"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/noc-status"
              className={`text-sm font-semibold tracking-wide transition-colors py-1.5 ${
                pathname === "/noc-status"
                  ? "text-[#D49E17] border-b-2 border-[#D49E17]"
                  : "text-slate-700 hover:text-[#D49E17]"
              }`}
            >
              NOC Status
            </Link>

            <Link
              href="/blogs"
              className={`text-sm font-semibold tracking-wide transition-colors py-1.5 ${
                pathname.startsWith("/blogs")
                  ? "text-[#D49E17] border-b-2 border-[#D49E17]"
                  : "text-slate-700 hover:text-[#D49E17]"
              }`}
            >
              Blogs &amp; Insights
            </Link>
          </nav>

          {/* Right Side: Gold Call Button Pill */}
          <div className="hidden lg:flex items-center flex-shrink-0">
            <a
              href={`tel:${phone}`}
              className="inline-flex items-center gap-2 pl-3 pr-4 py-2 rounded-full bg-gradient-to-r from-amber-500 via-[#D49E17] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold border border-amber-400 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all whitespace-nowrap"
            >
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Phone className="w-3.5 h-3.5 text-white fill-white" />
              </div>
              <span className="font-bold text-xs tracking-wider text-white">
                {phone}
              </span>
            </a>
          </div>
        </div>

        {/* Mobile / Tablet Header (< lg) */}
        <div className="lg:hidden flex items-center justify-between min-h-[52px]">
          <Link href="/" className="flex items-center group" aria-label="Saffron City">
            <img
              src="/images/saffron-city-logo.png"
              alt="Saffron City Islamabad"
              className="h-12 sm:h-14 w-auto object-contain group-hover:scale-105 transition-transform flex-shrink-0 drop-shadow-sm"
            />
          </Link>

          <div className="flex items-center gap-2">
            {/* Quick Call Pill on Mobile */}
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-[#D49E17] text-white text-xs font-bold shadow-sm"
            >
              <Phone className="w-3 h-3 fill-white text-white" />
              <span className="hidden sm:inline">{phone}</span>
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-[#D49E17] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-amber-200 px-6 py-6 space-y-3 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 gap-1">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold ${
                pathname === "/"
                  ? "bg-amber-50 text-[#D49E17]"
                  : "text-slate-800 hover:bg-slate-50"
              }`}
            >
              Home
            </Link>

            <Link
              href="/about-us"
              onClick={() => setIsOpen(false)}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold ${
                pathname === "/about-us"
                  ? "bg-amber-50 text-[#D49E17]"
                  : "text-slate-800 hover:bg-slate-50"
              }`}
            >
              About Us
            </Link>

            {/* Project Overview Mobile Group */}
            <div className="pt-2 border-t border-slate-100 mt-1">
              <span className="text-[11px] uppercase tracking-wider text-[#D49E17] px-4 font-bold">
                Project Overview
              </span>
              <div className="mt-1 space-y-1">
                {projectSubLinks.map((sub) => (
                  <Link
                    key={sub.name}
                    href={sub.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-2 text-xs rounded-lg transition-colors font-medium ${
                      pathname === sub.href
                        ? "bg-amber-50 text-[#D49E17] font-bold"
                        : "text-slate-700 hover:text-[#D49E17] hover:bg-amber-50"
                    }`}
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Blocks & Plots Mobile Group */}
            <div className="pt-2 border-t border-slate-100 mt-2">
              <span className="text-[11px] uppercase tracking-wider text-[#D49E17] px-4 font-bold">
                Blocks &amp; Plots
              </span>
              <div className="mt-1 space-y-1">
                {blockSubLinks.map((sub) => (
                  <Link
                    key={sub.name}
                    href={sub.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-2 text-xs rounded-lg transition-colors font-medium ${
                      pathname === sub.href
                        ? "bg-amber-50 text-[#D49E17] font-bold"
                        : "text-slate-700 hover:text-[#D49E17] hover:bg-amber-50"
                    }`}
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/noc-status"
              onClick={() => setIsOpen(false)}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold mt-1 ${
                pathname === "/noc-status"
                  ? "bg-amber-50 text-[#D49E17]"
                  : "text-slate-800 hover:bg-slate-50"
              }`}
            >
              NOC Status
            </Link>

            <Link
              href="/blogs"
              onClick={() => setIsOpen(false)}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold mt-1 ${
                pathname.startsWith("/blogs")
                  ? "bg-amber-50 text-[#D49E17]"
                  : "text-slate-800 hover:bg-slate-50"
              }`}
            >
              Blogs &amp; Insights
            </Link>

            <div className="pt-4 flex flex-col gap-2">
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-[#D49E17] text-white font-bold text-xs shadow-md"
              >
                <Phone className="w-3.5 h-3.5 fill-white text-white" />
                <span>Call Sales: {SITE_CONFIG.phone}</span>
              </a>
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(SITE_CONFIG.whatsappDefaultMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors"
              >
                WhatsApp Inquiry
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
