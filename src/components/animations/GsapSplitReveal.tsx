"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

interface GsapSplitRevealProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  className?: string;
  leftClassName?: string;
  rightClassName?: string;
  delay?: number;
}

export default function GsapSplitReveal({
  leftContent,
  rightContent,
  className = "",
  leftClassName = "",
  rightClassName = "",
  delay = 0,
}: GsapSplitRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (leftRef.current && rightRef.current) {
        gsap.fromTo(
          leftRef.current,
          {
            x: -60,
            opacity: 0,
            force3D: true,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.95,
            delay,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );

        gsap.fromTo(
          rightRef.current,
          {
            x: 60,
            opacity: 0,
            force3D: true,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.95,
            delay: delay + 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, containerRef); 

    return () => ctx.revert();
  }, [delay]);

  return (
    <div
      ref={containerRef}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center overflow-hidden ${className}`}
    >
      <div ref={leftRef} className={`w-full ${leftClassName}`}>
        {leftContent}
      </div>
      <div ref={rightRef} className={`w-full ${rightClassName}`}>
        {rightContent}
      </div>
    </div>
  );
}
