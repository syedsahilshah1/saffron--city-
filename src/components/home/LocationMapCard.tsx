import React from "react";
import { MapPin, Navigation } from "lucide-react";

export default function LocationMapCard() {
  return (
    <div className="w-full h-[380px] lg:h-[460px] rounded-3xl overflow-hidden border border-amber-200/90 shadow-2xl relative bg-slate-100 group">
      <iframe
        title="Saffron City Google Location Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106450.60155606992!2d73.11181283995874!3d33.49397682977461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfebbe487dc843%3A0x6b63d76b1f237efb!2sRawat%2C%20Rawalpindi%2C%20Punjab!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
        width="100%"
        height="100%"
        className="w-full h-full"
        style={{
          border: 0,
        }}
        allowFullScreen
        loading="lazy"
      />
      {/* Top Floating Badge */}
      <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-white/95 border border-amber-300 text-amber-900 text-xs font-bold backdrop-blur-md flex items-center gap-2 shadow-lg pointer-events-none">
        <MapPin className="w-3.5 h-3.5 text-[#D4A017] animate-pulse" />
        <span>Saffron City — Main GT Road, Rawat</span>
      </div>
      {/* Bottom Route Indicator */}
      <div className="absolute bottom-4 right-4 z-10 px-3 py-1.5 rounded-xl bg-white/95 border border-slate-200 text-slate-700 text-[11px] font-semibold backdrop-blur-md flex items-center gap-2 shadow-lg pointer-events-none">
        <Navigation className="w-3 h-3 text-emerald-600" />
        <span>Near T-Chowk &amp; Ring Road</span>
      </div>
    </div>
  );
}
