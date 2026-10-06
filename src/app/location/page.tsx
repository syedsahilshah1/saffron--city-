import React from "react";
import Link from "next/link";
import { 
  MapPin, 
  Compass, 
  Navigation, 
  ExternalLink, 
  CheckCircle2, 
  MessageCircle,
  Clock,
  Car,
  Sparkles,
  Phone
} from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import WordReveal from "@/components/animations/WordReveal";
import EnquiryForm from "@/components/forms/EnquiryForm";
import LocationMapViewer from "@/components/location/LocationMapViewer";
import { LANDMARKS, ACCESS_ROUTES, SITE_CONFIG } from "@/data/saffron-data";
import { db } from "@/lib/db";
import { getPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return await getPageMetadata("/location");
}

const DEFAULT_LANDMARKS = [
  {
    name: "Main GT Road (N-5 Highway)",
    time: "Direct Access",
    timeHighlight: "text-[#D49E17]",
    distance: "Direct Frontage Access",
    bgClass: "bg-amber-50/70 border-amber-300",
    image: "/images/amenities/amenity_boulevard.webp",
    description: "Instant access to the multi-lane National Highway with no secondary village roads."
  },
  {
    name: "T-Chowk Rawat Interchange",
    time: "5 Minutes",
    timeHighlight: "text-slate-900",
    distance: "3.5 km via Main GT Road",
    bgClass: "bg-white border-slate-200 hover:border-amber-300",
    image: "/images/landmark_t_chowk.webp",
    description: "Strategic commercial and transit junction linking Rawalpindi, Islamabad Expressway, and GT Road."
  },
  {
    name: "DHA Phase II & Giga Mall",
    time: "10 Minutes",
    timeHighlight: "text-slate-900",
    distance: "8.0 km Expressway Link",
    bgClass: "bg-white border-slate-200 hover:border-amber-300",
    image: "/images/landmark_giga_mall.webp",
    description: "Premier twin-city commercial shopping destination with hypermarkets, banks, and cinema complexes."
  },
  {
    name: "Rawalpindi Ring Road Interchange",
    time: "15 Minutes",
    timeHighlight: "text-emerald-700",
    distance: "11.0 km Direct Bypass",
    bgClass: "bg-white border-slate-200 hover:border-emerald-400",
    image: "/images/landmark_dha_islamabad.webp",
    description: "Direct expressway link connecting Saffron City to New Islamabad Airport and M-2 Motorway."
  }
];

const DEFAULT_STATS = {
  stat1: "Direct Frontage",
  stat1Label: "Main GT Road (N-5)",
  stat2: "5 Minutes",
  stat2Label: "T-Chowk Rawat",
  stat3: "10 Minutes",
  stat3Label: "DHA-2 & Giga Mall",
  stat4: "15 Minutes",
  stat4Label: "Ring Road Interchange"
};

const DEFAULT_ROUTES = [
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

export default async function LocationPage() {
  const settings = await db.getSettings();

  // Parse dynamic landmarks
  let dynamicLandmarks = DEFAULT_LANDMARKS;
  if (settings.locationLandmarksJson) {
    try {
      const parsed = JSON.parse(settings.locationLandmarksJson);
      if (Array.isArray(parsed) && parsed.length > 0) {
        dynamicLandmarks = parsed.map((item: any) => ({
          name: item.name || "Landmark Destination",
          time: item.time || "10 Mins",
          timeHighlight: item.time === "Direct Access" ? "text-[#D49E17]" : "text-slate-900",
          distance: item.distance || "Direct Route",
          bgClass: "bg-white border-slate-200 hover:border-amber-300",
          image: item.image || "/images/landmark_t_chowk.webp",
          description: item.description || "Strategic transit and commercial access."
        }));
      }
    } catch {}
  }

  // Parse dynamic stats
  let dynamicStats = DEFAULT_STATS;
  if (settings.locationStatsJson) {
    try {
      const parsed = JSON.parse(settings.locationStatsJson);
      dynamicStats = { ...DEFAULT_STATS, ...parsed };
    } catch {}
  }

  // Parse dynamic routes
  let dynamicRoutes = DEFAULT_ROUTES;
  if (settings.locationRoutesJson) {
    try {
      const parsed = JSON.parse(settings.locationRoutesJson);
      if (Array.isArray(parsed) && parsed.length > 0) {
        dynamicRoutes = parsed;
      }
    } catch {}
  }

  const heroHeading = settings.locationHeroHeading || "Strategic Location: GT Road Rawat, Islamabad";
  const heroSubtitle = settings.locationHeroSubtitle || "Direct access to Main GT Road (N-5 Highway) linking Islamabad Expressway, Ring Road, and Rawalpindi.";
  const heroImage = settings.locationHeroImage || "/images/location/location-hero-banner.webp";
  const mapImage = settings.locationMapImage || "/images/imgi_87_LOCATION.webp";

  const ctaPhone = settings.locationCtaPhone || settings.whatsappPhone || SITE_CONFIG.whatsapp;
  const whatsappUrl = `https://wa.me/${ctaPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    "Hi, I want to arrange a site visit to Saffron City on Main GT Road Rawat."
  )}`;

  return (
    <div className="space-y-20 lg:space-y-28 pb-24 text-slate-900 bg-white">
      
      {/* Hero Banner Section with Background Image */}
      <section className="relative w-full min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden text-white">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt={heroHeading}
            title={heroHeading}
            className="w-full h-full object-cover object-center scale-105 animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/50" />
          <div className="absolute inset-0 bg-[radial-gradient(#D49E17_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <WordReveal
            text={heroHeading}
            highlightWords={["Strategic", "Location", "GT", "Road", "Islamabad", "Rawat"]}
            as="h1"
            className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading tracking-tight text-white block"
          />

          {heroSubtitle && (
            <ScrollReveal animation="fade-up" delay={100}>
              <p className="text-sm sm:text-base text-slate-200 max-w-3xl mx-auto font-medium leading-relaxed">
                {heroSubtitle}
              </p>
            </ScrollReveal>
          )}

          {/* Quick Commute 4 Metric Badges */}
          <ScrollReveal animation="fade-up" delay={120} className="pt-2">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
                <span className="block text-base sm:text-lg font-bold font-mono text-amber-300">{dynamicStats.stat1}</span>
                <span className="text-[11px] text-slate-200">{dynamicStats.stat1Label}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
                <span className="block text-base sm:text-lg font-bold font-mono text-amber-300">{dynamicStats.stat2}</span>
                <span className="text-[11px] text-slate-200">{dynamicStats.stat2Label}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
                <span className="block text-base sm:text-lg font-bold font-mono text-amber-300">{dynamicStats.stat3}</span>
                <span className="text-[11px] text-slate-200">{dynamicStats.stat3Label}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
                <span className="block text-base sm:text-lg font-bold font-mono text-emerald-300">{dynamicStats.stat4}</span>
                <span className="text-[11px] text-slate-200">{dynamicStats.stat4Label}</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={150} className="flex flex-wrap justify-center gap-4 pt-4">
            <a
              href="#location-map"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-[#D49E17] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs shadow-lg hover:scale-105 transition-all"
            >
              View Location Map
            </a>
            <a
              href="#nearby-landmarks"
              className="px-6 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white font-bold text-xs shadow-lg hover:scale-105 transition-all flex items-center gap-2 backdrop-blur-md"
            >
              <Compass className="w-4 h-4 text-[#D49E17]" />
              <span>Nearby Landmarks</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg hover:scale-105 transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Site Visit Booking</span>
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 lg:space-y-28">

        {/* 1. Location Overview & Google Map Section */}
        <section id="location-map" className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <WordReveal
              text={settings.locationOverviewHeading || "Location Overview: Gateway of Twin Cities"}
              highlightWords={["Location", "Overview", "Gateway"]}
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight block"
            />

            <ScrollReveal animation="fade-up" delay={100}>
              {settings.locationOverviewText ? (
                <div
                  className="prose prose-sm sm:prose max-w-none text-slate-600 leading-relaxed text-center"
                  dangerouslySetInnerHTML={{ __html: settings.locationOverviewText }}
                />
              ) : (
                <p className="text-sm text-slate-600 leading-relaxed">
                  Placed right on Main GT Road (N-5 Highway) near Rawat, Saffron City offers unmatched direct connectivity to both Islamabad and Rawalpindi.
                </p>
              )}
            </ScrollReveal>
          </div>

          {/* Full Screen Interactive Location Map & Google Map Viewer */}
          <ScrollReveal animation="fade-up" delay={150} className="w-full">
            <LocationMapViewer imageSrc={mapImage} className="w-full" />
          </ScrollReveal>
        </section>

        {/* 2. DEDICATED SEPARATE SECTION: Nearby Landmarks & Travel Times with Image Thumbnails */}
        <section id="nearby-landmarks" className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <WordReveal
              text={settings.locationLandmarksHeading || "Nearby Landmarks & Travel Distances"}
              highlightWords={["Nearby", "Landmarks", "Travel", "Distances"]}
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight block"
            />

            <ScrollReveal animation="fade-up" delay={100}>
              <p className="text-sm text-slate-600">
                Direct driving times and highway distances from Saffron City on Main GT Road (N-5 Highway).
              </p>
            </ScrollReveal>
          </div>

          {/* Landmark Milestone Rows with Image Thumbnails */}
          <div className="max-w-4xl mx-auto space-y-4">
            {dynamicLandmarks.map((item, idx) => (
              <ScrollReveal
                key={item.name + idx}
                animation={idx % 2 === 0 ? "fade-right" : "fade-left"}
                delay={idx * 70}
              >
                <div className={`w-full p-3 sm:p-4 pr-6 sm:pr-8 rounded-2xl sm:rounded-full border shadow-md hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group ${item.bgClass || "bg-white border-slate-200 hover:border-amber-300"}`}>
                  <div className="flex items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-full overflow-hidden shrink-0 border-2 border-amber-300/80 shadow group-hover:scale-105 transition-transform duration-300">
                      <img
                        src={item.image}
                        alt={item.name}
                        title={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#D49E17] transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
                        {item.distance}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                    <span className="sm:hidden text-xs text-slate-500">Travel Time:</span>
                    <strong className={`text-sm sm:text-lg font-bold font-mono tracking-tight ${item.timeHighlight || "text-[#D49E17]"}`}>
                      {item.time}
                    </strong>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Full Landmarks Reference Table */}
          <ScrollReveal animation="fade-up" delay={150}>
            <div className="overflow-x-auto rounded-3xl border border-amber-200 bg-white shadow-xl">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-amber-50 text-amber-900 uppercase font-bold text-[11px] border-b border-amber-200">
                  <tr>
                    <th className="py-4 px-5">Landmark Destination</th>
                    <th className="py-4 px-5">Approximate Travel Time</th>
                    <th className="py-4 px-5">Approx. Distance</th>
                    <th className="py-4 px-5">Category</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {dynamicRoutes.map((rt: any, idx: number) => (
                    <tr key={rt.id || idx} className="hover:bg-amber-50/50 transition-colors">
                      <td className="py-4 px-5 font-bold text-slate-900">{rt.name}</td>
                      <td className="py-4 px-5 font-mono font-bold text-[#D49E17]">{rt.time}</td>
                      <td className="py-4 px-5 text-slate-600">{rt.distance} ({rt.route})</td>
                      <td className="py-4 px-5">
                        <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px]">
                          {rt.tag || "Corridor"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </section>

        {/* 3. Schedule Site Visit Form */}
        <section className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <WordReveal
              text={settings.locationCtaHeading || "Schedule an On-Site Location Visit"}
              highlightWords={["Schedule", "Location", "Visit"]}
              as="h2"
              className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading block"
            />
            <p className="text-xs sm:text-sm text-slate-600">
              Our official sales facilitation team is available 7 days a week to show you the ground development and sector demarcations on GT Road.
            </p>
          </div>

          <ScrollReveal animation="zoom-in" delay={100}>
            <EnquiryForm defaultPlotType="Residential" />
          </ScrollReveal>
        </section>

      </div>
    </div>
  );
}
