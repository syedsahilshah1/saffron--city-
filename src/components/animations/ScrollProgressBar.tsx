"use client";

import React, { useEffect, useState } from "react";

export default function ScrollProgressBar() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight =
            document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            const currentScroll = window.scrollY;
            const progress = Math.min(
              100,
              Math.max(0, (currentScroll / totalHeight) * 100)
            );
            setScrollPercentage(progress);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] z-[9999] pointer-events-none bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-amber-500 via-[#D4A017] to-amber-400 shadow-[0_0_12px_rgba(212,160,23,0.8)] transition-all duration-75 ease-out"
        style={{
          width: `${scrollPercentage}%`,
        }}
      />
    </div>
  );
}
