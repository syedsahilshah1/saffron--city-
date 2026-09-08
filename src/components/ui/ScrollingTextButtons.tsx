"use client";

import React from "react";
import {
  ShieldCheck,
  Building2,
  MapPin,
  CreditCard,
  Sparkles,
  TrendingUp,
  Award,
  Flame,
  PhoneCall
} from "lucide-react";

export interface ScrollingTextItem {
  id: string;
  badge?: string;
  text: string;
  highlight?: string;
  icon?: React.ReactNode;
  variant?: "saffron" | "emerald" | "burgundy" | "amber" | "cyan";
}

const DEFAULT_TEXT_ITEMS: ScrollingTextItem[] = [
  {
    id: "item-1",
    badge: "Sector A (Block B)",
    text: "5, 10 Marla & 1 Kanal Residential Plots",
    highlight: "New Official Rates",
    icon: <Building2 className="w-3.5 h-3.5 text-[#D4A017]" />,
    variant: "saffron",
  },
  {
    id: "item-2",
    badge: "Flexible Plan",
    text: "10% Down Payment • 3-Year Easy Installments",
    highlight: "30 Monthly Installments",
    icon: <CreditCard className="w-3.5 h-3.5 text-emerald-600" />,
    variant: "emerald",
  },
  {
    id: "item-3",
    badge: "Signature Commercial",
    text: "30×40 (5.33 Marla) Commercial Plots",
    highlight: "PKR 45 Lac Discount",
    icon: <TrendingUp className="w-3.5 h-3.5 text-[#D4A017]" />,
    variant: "saffron",
  },
  {
    id: "item-4",
    badge: "RDA Approved",
    text: "100% Legal & Approved NOC (15,000 Kanal)",
    highlight: "Verified Land",
    icon: <ShieldCheck className="w-3.5 h-3.5 text-cyan-700" />,
    variant: "cyan",
  },
  {
    id: "item-5",
    badge: "Prime Location",
    text: "Main GT Road Near T-Chowk, Rawat",
    highlight: "Direct N-5 Access",
    icon: <MapPin className="w-3.5 h-3.5 text-amber-700" />,
    variant: "amber",
  },
  {
    id: "item-6",
    badge: "Official Desk",
    text: "24/7 Official Sales Helpline: 0333 1113551",
    highlight: "Call Now",
    icon: <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />,
    variant: "emerald",
  },
];

interface ScrollingTextProps {
  items?: ScrollingTextItem[];
  speed?: "slow" | "normal" | "fast";
  reverse?: boolean;
  className?: string;
}

export default function ScrollingTextButtons({
  items = DEFAULT_TEXT_ITEMS,
  speed = "slow",
  reverse = false,
  className = "",
}: ScrollingTextProps) {
  let animClass = reverse ? "animate-marquee-reverse" : "animate-marquee";
  if (speed === "fast") {
    animClass = reverse
      ? "animate-marquee-reverse [animation-duration:35s]"
      : "animate-marquee [animation-duration:35s]";
  } else if (speed === "slow") {
    animClass = reverse
      ? "animate-marquee-reverse [animation-duration:75s]"
      : "animate-marquee [animation-duration:75s]";
  } else {
    animClass = reverse
      ? "animate-marquee-reverse [animation-duration:55s]"
      : "animate-marquee [animation-duration:55s]";
  }

  const repeatedItems = [...items, ...items, ...items, ...items];

  const getVariantStyles = (variant?: string) => {
    switch (variant) {
      case "emerald":
        return {
          badge: "bg-emerald-50 text-emerald-800 border-emerald-200",
          highlight: "text-emerald-700",
          dot: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]",
        };
      case "cyan":
        return {
          badge: "bg-cyan-50 text-cyan-800 border-cyan-200",
          highlight: "text-cyan-700",
          dot: "bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]",
        };
      case "amber":
        return {
          badge: "bg-amber-50 text-amber-900 border-amber-200",
          highlight: "text-amber-800",
          dot: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]",
        };
      case "saffron":
      default:
        return {
          badge: "bg-amber-50 text-amber-900 border-amber-300",
          highlight: "text-[#D4A017]",
          dot: "bg-[#D4A017] shadow-[0_0_8px_rgba(212,160,23,0.8)]",
        };
    }
  };

  return (
    <div
      className={`relative w-full py-2.5 bg-white border-y border-amber-200/80 shadow-sm overflow-hidden select-none pointer-events-none ${className}`}
    >
      {/* Left and Right Smooth Fade Gradients */}
      <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-white to-transparent z-10" />

      {/* Marquee Track */}
      <div className={`marquee-track ${animClass} flex items-center gap-4 sm:gap-5`}>
        {repeatedItems.map((item, index) => {
          const styles = getVariantStyles(item.variant);

          return (
            <div
              key={`${item.id}-${index}`}
              className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0 text-slate-800"
            >
              {/* Glowing Indicator Dot */}
              <div className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />

              {/* Icon */}
              {item.icon && (
                <span className="inline-flex items-center justify-center">
                  {item.icon}
                </span>
              )}

              {/* Tag / Badge */}
              {item.badge && (
                <span
                  className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${styles.badge}`}
                >
                  {item.badge}
                </span>
              )}

              {/* Text */}
              <span className="text-xs font-semibold text-slate-800 tracking-normal">
                {item.text}
              </span>

              {/* Highlight snippet */}
              {item.highlight && (
                <span
                  className={`text-xs font-bold ${styles.highlight}`}
                >
                  ({item.highlight})
                </span>
              )}

              {/* Divider between items */}
              <span className="text-amber-300 text-xs pl-2 font-mono select-none">
                ✦
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
