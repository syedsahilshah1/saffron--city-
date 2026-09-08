"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect
} from "react";
import { cn } from "@/lib/utils";
import { ChevronsLeftRight } from "lucide-react";

interface ImageComparisonContextValue {
  sliderPosition: number;
  setSliderPosition: (pos: number) => void;
  isDragging: boolean;
  setIsDragging: (dragging: boolean) => void;
}

const ImageComparisonContext = createContext<ImageComparisonContextValue | null>(null);

function useImageComparison() {
  const context = useContext(ImageComparisonContext);
  if (!context) {
    throw new Error("useImageComparison must be used within an ImageComparison");
  }
  return context;
}

export interface ImageComparisonProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  defaultPosition?: number;
  enableHover?: boolean;
}

export function ImageComparison({
  children,
  className,
  defaultPosition = 50,
  enableHover = false,
  ...props
}: ImageComparisonProps) {
  const [sliderPosition, setSliderPosition] = useState(defaultPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
    try {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // fallback
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging || enableHover) {
      handleMove(e.clientX);
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <ImageComparisonContext.Provider
      value={{
        sliderPosition,
        setSliderPosition,
        isDragging,
        setIsDragging,
      }}
    >
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={cn(
          "relative overflow-hidden select-none cursor-ew-resize touch-none rounded-3xl",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </ImageComparisonContext.Provider>
  );
}

export interface ImageComparisonImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  position: "left" | "right";
  className?: string;
  alt?: string;
  label?: string;
}

export function ImageComparisonImage({
  position,
  className,
  alt = "",
  label,
  src,
  ...props
}: ImageComparisonImageProps) {
  const { sliderPosition } = useImageComparison();

  if (position === "left") {
    return (
      <div
        className="absolute inset-0 z-10 w-full h-full overflow-hidden pointer-events-none"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className={cn("w-full h-full object-cover", className)}
          {...props}
        />
        {label && (
          <span className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full bg-navy-950/90 border border-saffron-500/40 text-saffron-300 text-xs font-bold backdrop-blur-md shadow-lg pointer-events-none">
            {label}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden pointer-events-none">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={cn("w-full h-full object-cover", className)}
        {...props}
      />
      {label && (
        <span className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-navy-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-bold backdrop-blur-md shadow-lg pointer-events-none">
          {label}
        </span>
      )}
    </div>
  );
}

export interface ImageComparisonSliderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function ImageComparisonSlider({
  className,
  ...props
}: ImageComparisonSliderProps) {
  const { sliderPosition, isDragging } = useImageComparison();

  return (
    <div
      className={cn(
        "absolute top-0 bottom-0 z-20 pointer-events-none flex items-center justify-center -translate-x-1/2",
        className
      )}
      style={{ left: `${sliderPosition}%` }}
      {...props}
    >
      {/* Vertical line indicator */}
      <div className="w-[2px] h-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]" />

      {/* Center Drag Handle Thumb */}
      <div
        className={cn(
          "absolute w-9 h-9 rounded-full bg-white text-navy-950 shadow-2xl flex items-center justify-center border-2 border-saffron-600 transition-transform duration-150",
          isDragging ? "scale-110 shadow-saffron-500/50" : "hover:scale-105"
        )}
      >
        <ChevronsLeftRight className="w-4 h-4 text-saffron-700" />
      </div>
    </div>
  );
}
