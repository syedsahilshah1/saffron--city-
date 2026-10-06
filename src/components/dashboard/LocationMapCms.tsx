"use client";

import React, { useState } from "react";
import {
  MapPin,
  Compass,
  Navigation,
  ExternalLink,
  Save,
  Plus,
  Trash2,
  Clock,
  Car,
  Sparkles,
  FileText,
  Phone,
  Layers,
  Table
} from "lucide-react";
import { StoredSettings } from "@/lib/types";
import FileUploadField from "@/components/dashboard/FileUploadField";
import RichTextEditor from "@/components/dashboard/RichTextEditor";

interface LocationMapCmsProps {
  settings: StoredSettings;
  updateSettingField: (field: keyof StoredSettings, value: any) => void;
  onSave: () => void;
  saving: boolean;
}

interface LocationLandmarkItem {
  id: string;
  name: string;
  time: string;
  distance: string;
  image: string;
  description: string;
}

interface LocationRouteItem {
  id: string;
  name: string;
  route: string;
  distance: string;
  time: string;
  tag: string;
}

const DEFAULT_LANDMARKS: LocationLandmarkItem[] = [
  {
    id: "lm-1",
    name: "Main GT Road (N-5 Highway)",
    time: "Direct Access",
    distance: "Direct Frontage Access",
    image: "/images/amenities/amenity_boulevard.webp",
    description: "Instant access to the multi-lane National Highway with no secondary village roads."
  },
  {
    id: "lm-2",
    name: "T-Chowk Rawat Interchange",
    time: "5 Minutes",
    distance: "3.5 km via Main GT Road",
    image: "/images/landmark_t_chowk.webp",
    description: "Strategic commercial and transit junction linking Rawalpindi, Islamabad Expressway, and GT Road."
  },
  {
    id: "lm-3",
    name: "DHA Phase II & Giga Mall",
    time: "10 Minutes",
    distance: "8.0 km Expressway Link",
    image: "/images/landmark_giga_mall.webp",
    description: "Premier twin-city commercial shopping destination with hypermarkets, banks, and cinema complexes."
  },
  {
    id: "lm-4",
    name: "Rawalpindi Ring Road Interchange",
    time: "15 Minutes",
    distance: "11.0 km Direct Bypass",
    image: "/images/landmark_dha_islamabad.webp",
    description: "Direct expressway link connecting Saffron City to New Islamabad Airport and M-2 Motorway."
  }
];

const DEFAULT_ROUTES: LocationRouteItem[] = [
  {
    id: "rt-1",
    name: "Islamabad Expressway",
    route: "Zero Point via Expressway & GT Road",
    distance: "22 km",
    time: "20 Mins",
    tag: "Primary Arterial"
  },
  {
    id: "rt-2",
    name: "Rawalpindi Saddar & Cantt",
    route: "Via Main GT Road Corridor",
    distance: "18 km",
    time: "18 Mins",
    tag: "Commercial Link"
  },
  {
    id: "rt-3",
    name: "New Islamabad Airport",
    route: "Via Upcoming Ring Road Bypass",
    distance: "28 km",
    time: "25 Mins",
    tag: "Airport Express"
  },
  {
    id: "rt-4",
    name: "M-2 Motorway Link",
    route: "Via Chakri / Ring Road Interchange",
    distance: "24 km",
    time: "22 Mins",
    tag: "Motorway Access"
  }
];

export default function LocationMapCms({
  settings,
  updateSettingField,
  onSave,
  saving
}: LocationMapCmsProps) {
  // Parse 4 Stats
  const defaultStats = {
    stat1: "Direct Frontage",
    stat1Label: "Main GT Road (N-5)",
    stat2: "5 Minutes",
    stat2Label: "T-Chowk Rawat",
    stat3: "10 Minutes",
    stat3Label: "DHA-2 & Giga Mall",
    stat4: "15 Minutes",
    stat4Label: "Ring Road Interchange"
  };

  const getStats = () => {
    if (!settings.locationStatsJson) return defaultStats;
    try {
      const parsed = JSON.parse(settings.locationStatsJson);
      return { ...defaultStats, ...parsed };
    } catch {
      return defaultStats;
    }
  };

  const stats = getStats();

  const handleStatChange = (key: string, value: string) => {
    const updated = { ...stats, [key]: value };
    updateSettingField("locationStatsJson", JSON.stringify(updated));
  };

  // Parse Landmarks
  const getLandmarks = (): LocationLandmarkItem[] => {
    if (!settings.locationLandmarksJson) return DEFAULT_LANDMARKS;
    try {
      const parsed = JSON.parse(settings.locationLandmarksJson);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_LANDMARKS;
    } catch {
      return DEFAULT_LANDMARKS;
    }
  };

  const [landmarks, setLandmarks] = useState<LocationLandmarkItem[]>(getLandmarks());

  const handleLandmarkChange = (index: number, field: keyof LocationLandmarkItem, value: string) => {
    const updated = [...landmarks];
    updated[index] = { ...updated[index], [field]: value };
    setLandmarks(updated);
    updateSettingField("locationLandmarksJson", JSON.stringify(updated));
  };

  const handleAddLandmark = () => {
    const newItem: LocationLandmarkItem = {
      id: `lm-${Date.now()}`,
      name: "New Landmark",
      time: "10 Minutes",
      distance: "5.0 km",
      image: "/images/landmark_t_chowk.webp",
      description: "Description of connectivity and commute convenience."
    };
    const updated = [...landmarks, newItem];
    setLandmarks(updated);
    updateSettingField("locationLandmarksJson", JSON.stringify(updated));
  };

  const handleRemoveLandmark = (index: number) => {
    const updated = landmarks.filter((_, i) => i !== index);
    setLandmarks(updated);
    updateSettingField("locationLandmarksJson", JSON.stringify(updated));
  };

  // Parse Routes
  const getRoutes = (): LocationRouteItem[] => {
    if (!settings.locationRoutesJson) return DEFAULT_ROUTES;
    try {
      const parsed = JSON.parse(settings.locationRoutesJson);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_ROUTES;
    } catch {
      return DEFAULT_ROUTES;
    }
  };

  const [routes, setRoutes] = useState<LocationRouteItem[]>(getRoutes());

  const handleRouteChange = (index: number, field: keyof LocationRouteItem, value: string) => {
    const updated = [...routes];
    updated[index] = { ...updated[index], [field]: value };
    setRoutes(updated);
    updateSettingField("locationRoutesJson", JSON.stringify(updated));
  };

  const handleAddRoute = () => {
    const newItem: LocationRouteItem = {
      id: `rt-${Date.now()}`,
      name: "New Access Corridor",
      route: "Route Details",
      distance: "15 km",
      time: "15 Mins",
      tag: "Expressway Access"
    };
    const updated = [...routes, newItem];
    setRoutes(updated);
    updateSettingField("locationRoutesJson", JSON.stringify(updated));
  };

  const handleRemoveRoute = (index: number) => {
    const updated = routes.filter((_, i) => i !== index);
    setRoutes(updated);
    updateSettingField("locationRoutesJson", JSON.stringify(updated));
  };

  return (
    <div className="bg-white border border-amber-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-10">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-600 shadow-sm">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 font-heading text-xl">
              Location &amp; Access Page CMS
            </h3>
            <p className="text-xs text-slate-500">
              Customize location hero banner, interactive high-res map image, Google Map iframe, commute landmarks with photos, and access routes.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/location"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Live Page</span>
          </a>
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-[#D49E17] hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-md hover:scale-105 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving Changes..." : "Save Location Page"}</span>
          </button>
        </div>
      </div>

      {/* 1. HERO BANNER & 4 STAT COUNTERS */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Sparkles className="w-5 h-5 text-[#D49E17]" />
          <h4 className="font-bold text-slate-900 text-base font-heading">
            1. Location Hero Banner &amp; 4 Commute Stat Counters
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
          <div className="sm:col-span-2">
            <label className="font-bold text-slate-700 block mb-1">
              Hero Headline (Use &apos;|&apos; for gold highlight)
            </label>
            <input
              type="text"
              placeholder="Strategic Location | GT Road Rawat, Islamabad"
              value={settings.locationHeroHeading || ""}
              onChange={(e) => updateSettingField("locationHeroHeading", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-900"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="font-bold text-slate-700 block mb-1">Hero Subtitle</label>
            <input
              type="text"
              placeholder="Direct access to Main GT Road (N-5 Highway) linking Islamabad Expressway, Ring Road, and Rawalpindi."
              value={settings.locationHeroSubtitle || ""}
              onChange={(e) => updateSettingField("locationHeroSubtitle", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800"
            />
          </div>

          <div className="sm:col-span-2">
            <FileUploadField
              label="Location Hero Banner Background Image (1920x1080 HD)"
              currentValue={settings.locationHeroImage || "/images/location/location-hero-banner.webp"}
              onUploadSuccess={(url) => updateSettingField("locationHeroImage", url)}
            />
          </div>

          {/* 4 Stat Metrics */}
          <div className="sm:col-span-2 p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-4">
            <span className="font-bold text-slate-900 text-sm block">
              4 Quick Commute Metric Counters
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-2">
                <label className="font-bold text-slate-600 block text-[11px]">Stat 1 (GT Road)</label>
                <input
                  type="text"
                  value={stats.stat1}
                  onChange={(e) => handleStatChange("stat1", e.target.value)}
                  placeholder="Direct Frontage"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 font-bold text-[#D49E17]"
                />
                <input
                  type="text"
                  value={stats.stat1Label}
                  onChange={(e) => handleStatChange("stat1Label", e.target.value)}
                  placeholder="Main GT Road (N-5)"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600"
                />
              </div>

              <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-2">
                <label className="font-bold text-slate-600 block text-[11px]">Stat 2 (T-Chowk)</label>
                <input
                  type="text"
                  value={stats.stat2}
                  onChange={(e) => handleStatChange("stat2", e.target.value)}
                  placeholder="5 Minutes"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 font-bold"
                />
                <input
                  type="text"
                  value={stats.stat2Label}
                  onChange={(e) => handleStatChange("stat2Label", e.target.value)}
                  placeholder="T-Chowk Rawat"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600"
                />
              </div>

              <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-2">
                <label className="font-bold text-slate-600 block text-[11px]">Stat 3 (DHA &amp; Giga)</label>
                <input
                  type="text"
                  value={stats.stat3}
                  onChange={(e) => handleStatChange("stat3", e.target.value)}
                  placeholder="10 Minutes"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 font-bold text-slate-900"
                />
                <input
                  type="text"
                  value={stats.stat3Label}
                  onChange={(e) => handleStatChange("stat3Label", e.target.value)}
                  placeholder="DHA-2 & Giga Mall"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600"
                />
              </div>

              <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-2">
                <label className="font-bold text-slate-600 block text-[11px]">Stat 4 (Ring Road)</label>
                <input
                  type="text"
                  value={stats.stat4}
                  onChange={(e) => handleStatChange("stat4", e.target.value)}
                  placeholder="15 Minutes"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 font-bold text-emerald-600"
                />
                <input
                  type="text"
                  value={stats.stat4Label}
                  onChange={(e) => handleStatChange("stat4Label", e.target.value)}
                  placeholder="Ring Road Interchange"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. LOCATION OVERVIEW & INTERACTIVE MAP (WITH RICHTEXTEDITOR FOR SEO LINKS) */}
      <div className="space-y-6 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <FileText className="w-5 h-5 text-emerald-600" />
          <h4 className="font-bold text-slate-900 text-base font-heading">
            2. Location Overview &amp; Interactive Map Viewer (Rich Text &amp; SEO Links)
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Location Section Heading</label>
            <input
              type="text"
              placeholder="Location Overview: Gateway of Twin Cities"
              value={settings.locationOverviewHeading || ""}
              onChange={(e) => updateSettingField("locationOverviewHeading", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-900"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Google Maps Embed URL</label>
            <input
              type="text"
              placeholder="https://www.google.com/maps/embed?pb=..."
              value={settings.locationGoogleEmbedUrl || ""}
              onChange={(e) => updateSettingField("locationGoogleEmbedUrl", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="font-bold text-slate-700 block mb-1">
              Location Description (Select text to add Internal &amp; External SEO Links)
            </label>
            <RichTextEditor
              value={
                settings.locationOverviewText ||
                `<p>Placed right on Main GT Road (N-5 Highway) near Rawat, Saffron City offers unmatched direct connectivity to both Islamabad and Rawalpindi. Unlike projects located deep inside rural links, Saffron City features immediate zero-kilometer access from the multi-lane National Highway.</p><p>With upcoming Rawalpindi Ring Road connectivity, travel times to the New Islamabad International Airport and M-2 Motorway are cut to under 25 minutes.</p>`
              }
              onChange={(html) => updateSettingField("locationOverviewText", html)}
            />
          </div>

          <div className="sm:col-span-2">
            <FileUploadField
              label="Location Map Graphic (High-Res Map Infographic for Viewer)"
              currentValue={settings.locationMapImage || "/images/imgi_87_LOCATION.webp"}
              onUploadSuccess={(url) => updateSettingField("locationMapImage", url)}
            />
          </div>
        </div>
      </div>

      {/* 3. NEARBY LANDMARKS & TRAVEL TIMES (CARDS WITH INDIVIDUAL PHOTOS) */}
      <div className="space-y-6 pt-4 border-t border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#D49E17]" />
            <div>
              <h4 className="font-bold text-slate-900 text-base font-heading">
                3. Nearby Landmarks &amp; Travel Distances (Cards with Photos)
              </h4>
              <p className="text-xs text-slate-500">
                Manage commute times to GT Road, T-Chowk, Giga Mall, Ring Road, Zero Point, etc.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddLandmark}
            className="px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs border border-amber-300 transition flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Landmark Card</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {landmarks.map((lm, idx) => (
            <div
              key={lm.id || idx}
              className="p-5 rounded-3xl bg-slate-50 border border-slate-200 hover:border-amber-300 transition-all space-y-4 relative group"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-xs font-mono">
                  Landmark #{idx + 1}
                </span>

                <button
                  type="button"
                  onClick={() => handleRemoveLandmark(idx)}
                  className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                  title="Remove Landmark"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <FileUploadField
                  label={`Landmark #${idx + 1} Photo`}
                  currentValue={lm.image}
                  onUploadSuccess={(url) => handleLandmarkChange(idx, "image", url)}
                />

                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <label className="font-bold text-slate-700 block mb-1">Landmark Name</label>
                    <input
                      type="text"
                      placeholder="e.g. DHA Phase II & Giga Mall"
                      value={lm.name}
                      onChange={(e) => handleLandmarkChange(idx, "name", e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-bold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Time</label>
                    <input
                      type="text"
                      placeholder="e.g. 10 Minutes"
                      value={lm.time}
                      onChange={(e) => handleLandmarkChange(idx, "time", e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 font-bold text-[#D49E17]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Distance &amp; Highway Corridor</label>
                  <input
                    type="text"
                    placeholder="e.g. 8.0 km Expressway Link"
                    value={lm.distance}
                    onChange={(e) => handleLandmarkChange(idx, "distance", e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Description</label>
                  <textarea
                    rows={2}
                    placeholder="Commute details..."
                    value={lm.description}
                    onChange={(e) => handleLandmarkChange(idx, "description", e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 leading-relaxed"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. PRIME ACCESS ROUTES & CORRIDORS TABLE */}
      <div className="space-y-6 pt-4 border-t border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Car className="w-5 h-5 text-emerald-600" />
            <div>
              <h4 className="font-bold text-slate-900 text-base font-heading">
                4. Primary Access Corridors &amp; Expressway Routes Table
              </h4>
              <p className="text-xs text-slate-500">
                Detailed reference table showing major highway routes (Expressway, Saddar, Airport, Motorway).
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddRoute}
            className="px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-300 transition flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Route Row</span>
          </button>
        </div>

        <div className="space-y-3 text-xs">
          {routes.map((rt, idx) => (
            <div
              key={rt.id || idx}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700 font-mono">Route #{idx + 1}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveRoute(idx)}
                  className="p-1 text-rose-500 hover:bg-rose-50 rounded transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                <div className="lg:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">Destination / Corridor</label>
                  <input
                    type="text"
                    value={rt.name}
                    onChange={(e) => handleRouteChange(idx, "name", e.target.value)}
                    placeholder="e.g. Islamabad Expressway"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 font-bold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Route Alignment</label>
                  <input
                    type="text"
                    value={rt.route}
                    onChange={(e) => handleRouteChange(idx, "route", e.target.value)}
                    placeholder="Zero Point via GT Road"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Distance &amp; Time</label>
                  <div className="grid grid-cols-2 gap-1.5">
                    <input
                      type="text"
                      value={rt.distance}
                      onChange={(e) => handleRouteChange(idx, "distance", e.target.value)}
                      placeholder="22 km"
                      className="w-full px-2 py-1.5 rounded-lg bg-white border border-slate-200 text-center"
                    />
                    <input
                      type="text"
                      value={rt.time}
                      onChange={(e) => handleRouteChange(idx, "time", e.target.value)}
                      placeholder="20 Mins"
                      className="w-full px-2 py-1.5 rounded-lg bg-white border border-slate-200 text-center font-bold text-[#D49E17]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tag Badge</label>
                  <input
                    type="text"
                    value={rt.tag}
                    onChange={(e) => handleRouteChange(idx, "tag", e.target.value)}
                    placeholder="Primary Arterial"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-emerald-700 font-bold"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. SITE VISIT & HELPLINE CTA */}
      <div className="space-y-6 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Phone className="w-5 h-5 text-emerald-600" />
          <h4 className="font-bold text-slate-900 text-base font-heading">
            5. Site Visit Coordination &amp; WhatsApp Desk
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Site Office Helpline / WhatsApp</label>
            <input
              type="text"
              placeholder="+92 300 1234567"
              value={settings.locationCtaPhone || settings.whatsappPhone || ""}
              onChange={(e) => updateSettingField("locationCtaPhone", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="font-bold text-slate-700 block mb-1">CTA Heading</label>
            <input
              type="text"
              placeholder="Schedule an Accompanied Site Visit on Main GT Road Rawat"
              value={settings.locationCtaHeading || ""}
              onChange={(e) => updateSettingField("locationCtaHeading", e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-bold"
            />
          </div>
        </div>
      </div>

      {/* Save Button Footer */}
      <div className="flex justify-end pt-6 border-t border-slate-100">
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-[#D49E17] hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-lg hover:scale-105 transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Saving Changes..." : "Save Location Page"}</span>
        </button>
      </div>
    </div>
  );
}
