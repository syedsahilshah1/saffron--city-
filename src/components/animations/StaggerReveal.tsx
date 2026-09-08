"use client";

import React, { useEffect, useRef, useState } from "react";

export type StaggerDirection =
  | "up"
  | "down"
  | "left"
  | "right"
  | "fade"
  | "zoom"
  | "blur";

interface StaggerRevealProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
  direction?: StaggerDirection;
  distance?: number;
  threshold?: number;
  once?: boolean;
}

export default function StaggerReveal({
  children,
  className = "",
  staggerDelay = 70,
  initialDelay = 0,
  direction = "up",
  distance = 28,
  threshold = 0.1,
  once = true,
}: StaggerRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

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
        rootMargin: "0px 0px -30px 0px",
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold, once]);

  const getTransform = () => {
    switch (direction) {
      case "up":
        return `translate3d(0, ${distance}px, 0)`;
      case "down":
        return `translate3d(0, -${distance}px, 0)`;
      case "left":
        return `translate3d(${distance}px, 0, 0)`;
      case "right":
        return `translate3d(-${distance}px, 0, 0)`;
      case "zoom":
        return "scale3d(0.92, 0.92, 1)";
      case "blur":
      case "fade":
      default:
        return "translate3d(0, 0, 0)";
    }
  };

  const getFilter = () => {
    if (direction === "blur") {
      return "blur(6px)";
    }
    return "none";
  };

  const arrayChildren = React.Children.toArray(children);

  return (
    <div ref={containerRef} className={className}>
      {arrayChildren.map((child, index) => {
        const delay = initialDelay + index * staggerDelay;

        return (
          <div
            key={index}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translate3d(0, 0, 0) scale3d(1, 1, 1)" : getTransform(),
              filter: isVisible ? "blur(0px)" : getFilter(),
              transition: `opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, filter 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
              willChange: "transform, opacity, filter",
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}
