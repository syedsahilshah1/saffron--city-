"use client";

import React, { useEffect, useRef, useState } from "react";

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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px 50px 0px",
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`grid grid-cols-1 lg:grid-cols-2 items-center ${className ? className : "gap-8"}`}
    >
      <div
        className={`w-full transition-all duration-700 ease-out ${leftClassName} ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
        }`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {leftContent}
      </div>
      <div
        className={`w-full transition-all duration-700 ease-out ${rightClassName} ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
        }`}
        style={{ transitionDelay: `${delay + 100}ms` }}
      >
        {rightContent}
      </div>
    </div>
  );
}
