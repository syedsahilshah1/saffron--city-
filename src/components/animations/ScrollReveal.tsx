"use client";

import React, { useEffect, useRef, useState } from "react";

export type RevealAnimation =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "zoom-in"
  | "blur-in"
  | "fade";

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: RevealAnimation;
  delay?: number; // in milliseconds
  duration?: number; // in milliseconds
  distance?: number; // distance in px for translation
  threshold?: number; // 0 to 1
  className?: string;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 800,
  distance = 32,
  threshold = 0.15,
  className = "",
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check if element is already in viewport on mount
    const rect = el.getBoundingClientRect();
    if (rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.95) {
      setIsVisible(true);
      if (once) return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(el);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold, once]);

  const getInitialStyles = (): React.CSSProperties => {
    switch (animation) {
      case "fade-up":
        return {
          opacity: 0,
          transform: `translate3d(0, ${distance}px, 0)`,
        };
      case "fade-down":
        return {
          opacity: 0,
          transform: `translate3d(0, -${distance}px, 0)`,
        };
      case "fade-left":
        return {
          opacity: 0,
          transform: `translate3d(-${distance}px, 0, 0)`,
        };
      case "fade-right":
        return {
          opacity: 0,
          transform: `translate3d(${distance}px, 0, 0)`,
        };
      case "zoom-in":
        return {
          opacity: 0,
          transform: "scale3d(0.93, 0.93, 1)",
        };
      case "blur-in":
        return {
          opacity: 0,
          filter: "blur(8px)",
          transform: `translate3d(0, ${distance * 0.5}px, 0)`,
        };
      case "fade":
      default:
        return {
          opacity: 0,
        };
    }
  };

  const getVisibleStyles = (): React.CSSProperties => {
    return {
      opacity: 1,
      transform: "translate3d(0, 0, 0) scale3d(1, 1, 1)",
      filter: "blur(0px)",
    };
  };

  const dynamicStyles: React.CSSProperties = isVisible
    ? getVisibleStyles()
    : getInitialStyles();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...dynamicStyles,
        transitionProperty: "opacity, transform, filter",
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "transform, opacity, filter",
      }}
    >
      {children}
    </div>
  );
}
