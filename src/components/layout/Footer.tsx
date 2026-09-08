import React from "react";
import Link from "next/link";
import { ShieldCheck, MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import { SITE_CONFIG } from "@/data/saffron-data";

export default function Footer() {
  return (
    <footer className="relative bg-[#fbfaf8] border-t border-amber-200/80 text-slate-600 text-sm overflow-hidden">
      {/* Subtle top golden glow line */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4A017] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <img
                src="/images/saffron-city-logo.png"
                alt="Saffron City Islamabad"
                className="h-14 sm:h-16 w-auto object-contain"
              />
            </Link>
            <p className="text-slate-600 text-xs leading-relaxed max-w-sm">
              A planned residential and commercial community spread over 15,000 Kanal on Main GT Road, Rawat. Developed by Saadullah Khan & Brothers (SKB) with official RDA NOC approval.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#D4A017]" />
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
                <Link href="/" className="hover:text-[#D4A017] transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-[#D4A017] transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/location" className="hover:text-[#D4A017] transition-colors">Location & Access</Link>
              </li>
              <li>
                <Link href="/master-plan" className="hover:text-[#D4A017] transition-colors">Master Plan</Link>
              </li>
              <li>
                <Link href="/payment-plan" className="hover:text-[#D4A017] transition-colors">Payment Plan</Link>
              </li>
              <li>
                <Link href="/noc-status" className="hover:text-[#D4A017] transition-colors">NOC & Legal Status</Link>
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
                <Link href="/plot-for-sale" className="hover:text-[#D4A017] transition-colors">All Plots For Sale</Link>
              </li>
              <li>
                <Link href="/sectors/sector-a" className="hover:text-[#D4A017] transition-colors">Sector A (Block B - New Rates)</Link>
              </li>
              <li>
                <Link href="/sectors/sector-b" className="hover:text-[#D4A017] transition-colors">Sector B (Affordable)</Link>
              </li>
              <li>
                <Link href="/plots/commercial" className="hover:text-[#D4A017] transition-colors">Signature Commercial (30×40)</Link>
              </li>
              <li>
                <Link href="/plots/residential" className="hover:text-[#D4A017] transition-colors">Residential Plots (5, 10, 1 Kanal)</Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-[#D4A017] font-semibold hover:underline">Staff Management Portal</Link>
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
                <MapPin className="w-4 h-4 text-[#D4A017] shrink-0 mt-0.5" />
                <span>{SITE_CONFIG.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4A017] shrink-0" />
                <a href={`tel:${SITE_CONFIG.phone}`} className="hover:text-slate-900 font-semibold transition-colors">
                  {SITE_CONFIG.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D4A017] shrink-0" />
                <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-slate-900 transition-colors">
                  {SITE_CONFIG.email}
                </a>
              </div>
              <div className="pt-2">
                <a
                  href={SITE_CONFIG.rdaVerificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#D4A017] hover:text-amber-700 font-semibold text-xs underline underline-offset-2"
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
          <p>© {new Date().getFullYear()} Saffron City Islamabad / Rawalpindi. Developed by SKB Group. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-slate-800 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/noc-status" className="hover:text-slate-800 transition-colors">
              RDA Approval
            </Link>
            <Link href="/dashboard" className="text-slate-600 hover:text-[#D4A017] transition-colors">
              Staff Dashboard
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
