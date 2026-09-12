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
  Sparkles
} from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import WordReveal from "@/components/animations/WordReveal";
import EnquiryForm from "@/components/forms/EnquiryForm";
import LocationMapViewer from "@/components/location/LocationMapViewer";
import { LANDMARKS, ACCESS_ROUTES, SITE_CONFIG } from "@/data/saffron-data";

import { getPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return await getPageMetadata("/location");
}

const LOCATION_NEARBY_LANDMARKS = [
  {
    name: "Main GT Road (N-5 Highway)",
    time: "0 Minutes Direct",
    timeHighlight: "text-[#D49E17]",
    distance: "Direct Frontage Access",
    bgClass: "bg-amber-50/70 border-amber-300",
    image: "/images/amenities/amenity_boulevard.jpg",
    description: "Instant access to the multi-lane National Highway with no secondary village roads."
  },
  {
    name: "T-Chowk Rawat Interchange",
    time: "5 Minutes",
    timeHighlight: "text-slate-900",
    distance: "3.5 km via Main GT Road",
    bgClass: "bg-white border-slate-200 hover:border-amber-300",
    image: "/images/landmark_t_chowk.jpg",
    description: "Strategic commercial and transit junction linking Rawalpindi, Islamabad Expressway, and GT Road."
  },
  {
    name: "DHA Phase II & Giga Mall",
    time: "10 Minutes",
    timeHighlight: "text-slate-900",
    distance: "8.0 km Expressway Link",
    bgClass: "bg-white border-slate-200 hover:border-amber-300",
    image: "/images/landmark_giga_mall.jpg",
    description: "Premier twin-city commercial shopping destination with hypermarkets, banks, and cinema complexes."
  },
  {
    name: "Rawalpindi Ring Road Interchange",
    time: "15 Minutes",
    timeHighlight: "text-emerald-700",
    distance: "11.0 km Direct Bypass",
    bgClass: "bg-white border-slate-200 hover:border-emerald-400",
    image: "/images/landmark_dha_islamabad.jpg",
    description: "Direct expressway link connecting Saffron City to New Islamabad Airport and M-2 Motorway."
  }
];

export default function LocationPage() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
    "Hi, I want to arrange a site visit to Saffron City on Main GT Road Rawat."
  )}`;

  return (
    <div className="space-y-20 lg:space-y-28 pb-24 text-slate-900 bg-white">
      
      {/* Hero Banner Section with Background Image */}
      <section className="relative w-full pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/landmark_dha_islamabad.jpg"
            alt="Saffron City Prime Location GT Road Rawat"
            className="w-full h-full object-cover object-center scale-105 animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/50" />
          <div className="absolute inset-0 bg-[radial-gradient(#D49E17_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <WordReveal
            text="Strategic Location: GT Road Rawat, Islamabad"
            highlightWords={["Strategic", "Location", "GT", "Road", "Islamabad"]}
            as="h1"
            className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading tracking-tight text-white block"
          />

          <ScrollReveal animation="fade-up" delay={100}>
            <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-200 font-light leading-relaxed">
              Situated directly on Main GT Road near Rawat, providing effortless 0-minute highway access, seamless connectivity to DHA &amp; Bahria Town, and rapid link to the Rawalpindi Ring Road.
            </p>
          </ScrollReveal>

          {/* Location Quick Metrics Counter */}
          <ScrollReveal animation="fade-up" delay={150}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-4">
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center space-y-1">
                <span className="text-2xl sm:text-3xl font-bold text-[#D49E17] font-mono">0 Min</span>
                <p className="text-xs text-slate-300 font-medium">GT Road Access</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center space-y-1">
                <span className="text-2xl sm:text-3xl font-bold text-[#D49E17] font-mono">5 Mins</span>
                <p className="text-xs text-slate-300 font-medium">T-Chowk Rawat</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center space-y-1">
                <span className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono">10 Mins</span>
                <p className="text-xs text-slate-300 font-medium">DHA &amp; Giga Mall</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center space-y-1">
                <span className="text-2xl sm:text-3xl font-bold text-[#D49E17] font-mono">15 Mins</span>
                <p className="text-xs text-slate-300 font-medium">Ring Road Interchange</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={200} className="flex flex-wrap justify-center gap-4 pt-2">
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
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg hover:scale-105 transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Book Site Visit on WhatsApp</span>
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
              text="Location Overview: Gateway of Twin Cities"
              highlightWords={["Location", "Overview", "Gateway"]}
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight block"
            />

            <ScrollReveal animation="fade-up" delay={100}>
              <p className="text-sm text-slate-600 leading-relaxed">
                Placed right on Main GT Road (N-5 Highway) near Rawat, Saffron City offers unmatched direct connectivity to both Islamabad and Rawalpindi.
              </p>
            </ScrollReveal>
          </div>

          {/* Full Screen Interactive Location Map & Google Map Viewer */}
          <ScrollReveal animation="fade-up" delay={150} className="w-full">
            <LocationMapViewer imageSrc="/images/imgi_87_LOCATION.jpg" className="w-full" />
          </ScrollReveal>
        </section>

        {/* 2. DEDICATED SEPARATE SECTION: Nearby Landmarks & Travel Times with Image Thumbnails */}
        <section id="nearby-landmarks" className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <WordReveal
              text="Nearby Landmarks & Travel Distances"
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
            {LOCATION_NEARBY_LANDMARKS.map((item, idx) => (
              <ScrollReveal
                key={item.name}
                animation={idx % 2 === 0 ? "fade-right" : "fade-left"}
                delay={idx * 70}
              >
                <div className={`w-full p-3 sm:p-4 pr-6 sm:pr-8 rounded-2xl sm:rounded-full border shadow-md hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group ${item.bgClass}`}>
                  <div className="flex items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-full overflow-hidden shrink-0 border-2 border-amber-300/80 shadow group-hover:scale-105 transition-transform duration-300">
                      <img
                        src={item.image}
                        alt={item.name}
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
                    <strong className={`text-sm sm:text-lg font-bold font-mono tracking-tight ${item.timeHighlight}`}>
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
                  {LANDMARKS.map((lm) => (
                    <tr key={lm.name} className="hover:bg-amber-50/50 transition-colors">
                      <td className="py-4 px-5 font-bold text-slate-900">{lm.name}</td>
                      <td className="py-4 px-5 font-mono font-bold text-[#D49E17]">{lm.time}</td>
                      <td className="py-4 px-5 text-slate-600">{lm.distance}</td>
                      <td className="py-4 px-5">
                        <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px]">
                          {lm.category}
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
              text="Schedule an On-Site Location Visit"
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
