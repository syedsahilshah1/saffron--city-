"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollParallaxProps {
  children: React.ReactNode;
  speed?: number; // e.g. -0.2 (slower/parallax up) or 0.2 (moves down)
  className?: string;
}

export default function ScrollParallax({
  children,
  speed = -0.12,
  className = "",
}: ScrollParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const el = containerRef.current;
          if (el) {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            // Check if element is around viewport
            if (rect.top < windowHeight && rect.bottom > 0) {
              const distanceFromCenter = rect.top - windowHeight / 2;
              setOffsetY(distanceFromCenter * speed);
            }
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
  }, [speed]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div
        style={{
          transform: `translate3d(0, ${offsetY}px, 0)`,
          willChange: "transform",
          transition: "transform 0.1s cubic-bezier(0, 0, 0.2, 1)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
