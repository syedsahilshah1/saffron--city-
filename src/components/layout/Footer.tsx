"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/data/saffron-data";
import { Phone, Mail, MapPin, ExternalLink, ShieldCheck, Clock, Award, Building2 } from "lucide-react";
import { StoredSettings } from "@/lib/types";

export default function Footer() {
  const [settings, setSettings] = useState<Partial<StoredSettings>>({
    contactPhone: SITE_CONFIG.phone,
    officialEmail: SITE_CONFIG.email,
    officeAddress: SITE_CONFIG.address,
    rdaVerificationUrl: SITE_CONFIG.rdaVerificationUrl,
  });

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setSettings(data.data);
        }
      })
      .catch((err) => console.warn("Could not load dynamic footer settings:", err));
  }, []);

  const phone = settings.contactPhone || SITE_CONFIG.phone;
  const email = settings.officialEmail || SITE_CONFIG.email;
  const address = settings.officeAddress || SITE_CONFIG.address;
  const rdaUrl = settings.rdaVerificationUrl || SITE_CONFIG.rdaVerificationUrl;
  return (
    <footer className="relative bg-[#fbfaf8] border-t border-amber-200/80 text-slate-600 text-sm overflow-hidden">
      {/* Subtle top golden glow line */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#D49E17] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <img
                src="/images/saffron-city-logo.png"
                alt="Saffron City Islamabad"
                className="h-20 sm:h-24 w-auto object-contain drop-shadow-sm"
              />
            </Link>
            <p className="text-slate-600 text-xs leading-relaxed max-w-sm">
              A planned residential and commercial community spread over 15,000 Kanal on Main GT Road, Rawat with official RDA NOC approval.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#D49E17]" />
              <span>RDA NOC Approved</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-slate-900 text-sm font-bold font-heading uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-[#D49E17] transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-[#D49E17] transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/location" className="hover:text-[#D49E17] transition-colors">Location & Access</Link>
              </li>
              <li>
                <Link href="/master-plan" className="hover:text-[#D49E17] transition-colors">Master Plan</Link>
              </li>
              <li>
                <Link href="/payment-plan" className="hover:text-[#D49E17] transition-colors">Payment Plan</Link>
              </li>
              <li>
                <Link href="/noc-status" className="hover:text-[#D49E17] transition-colors">NOC & Legal Status</Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-[#D49E17] transition-colors">Blogs & Insights</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Sectors & Plots */}
          <div className="space-y-3">
            <h4 className="text-slate-900 text-sm font-bold font-heading uppercase tracking-wider">
              Plots & Sectors
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/plot-for-sale" className="hover:text-[#D49E17] transition-colors">All Plots For Sale</Link>
              </li>
              <li>
                <Link href="/sectors/sector-a" className="hover:text-[#D49E17] transition-colors">Sector A (Block B - New Rates)</Link>
              </li>
              <li>
                <Link href="/sectors/sector-b" className="hover:text-[#D49E17] transition-colors">Sector B (Affordable)</Link>
              </li>
              <li>
                <Link href="/plots/commercial" className="hover:text-[#D49E17] transition-colors">Signature Commercial (30×40)</Link>
              </li>
              <li>
                <Link href="/plots/residential" className="hover:text-[#D49E17] transition-colors">Residential Plots (5, 10, 1 Kanal)</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Verification & Contact */}
          <div className="space-y-3">
            <h4 className="text-slate-900 text-sm font-bold font-heading uppercase tracking-wider">
              Contact & Verify
            </h4>
            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D49E17] shrink-0 mt-0.5" />
                <span>{address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D49E17] shrink-0" />
                <a href={`tel:${phone}`} className="hover:text-slate-900 font-semibold transition-colors">
                  {phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D49E17] shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-slate-900 transition-colors">
                  {email}
                </a>
              </div>
              <div className="pt-2">
                <a
                  href={rdaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#D49E17] hover:text-amber-700 font-semibold text-xs underline underline-offset-2"
                >
                  <span>Verify NOC on Punjab Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Saffron City Islamabad / Rawalpindi. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-slate-800 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/noc-status" className="hover:text-slate-800 transition-colors">
              RDA Approval
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
