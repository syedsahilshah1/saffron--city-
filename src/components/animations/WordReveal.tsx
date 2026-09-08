"use client";

import React, { useEffect, useRef, useState } from "react";

interface WordRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  className?: string;
  wordClassName?: string;
  highlightWords?: string[];
  highlightClassName?: string;
  staggerMs?: number;
  delayMs?: number;
  threshold?: number;
  once?: boolean;
}

export default function WordReveal({
  text,
  as: Component = "h2",
  className = "",
  wordClassName = "",
  highlightWords = [],
  highlightClassName = "text-[#D4A017]",
  staggerMs = 60,
  delayMs = 0,
  threshold = 0.15,
  once = true,
}: WordRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Check if already in viewport
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
    return () => observer.disconnect();
  }, [threshold, once]);

  // Clean and split words while preserving punctuation
  const words = text.split(/\s+/).filter(Boolean);

  const isHighlighted = (word: string) => {
    const cleanWord = word.replace(/[^\w\s&]/gi, "").toLowerCase();
    return highlightWords.some(
      (hw) => hw.toLowerCase() === cleanWord || cleanWord.includes(hw.toLowerCase())
    );
  };

  return (
    // @ts-expect-error dynamic HTML tag
    <Component ref={containerRef} className={`inline-block ${className}`}>
      {words.map((word, i) => {
        const highlighted = isHighlighted(word);
        const transitionDelay = `${delayMs + i * staggerMs}ms`;

        return (
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden align-top mr-[0.25em] last:mr-0 pb-[0.08em]"
          >
            <span
              className={`inline-block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                highlighted ? highlightClassName : ""
              } ${wordClassName}`}
              style={{
                transform: isVisible
                  ? "translate3d(0, 0, 0) rotate(0deg)"
                  : "translate3d(0, 110%, 0) rotate(3deg)",
                opacity: isVisible ? 1 : 0,
                filter: isVisible ? "blur(0px)" : "blur(4px)",
                transitionDelay,
                willChange: "transform, opacity, filter",
              }}
            >
              {word}
            </span>
          </span>
        );
      })}
    </Component>
  );
}
