"use client";

import React, { useState, useRef, useCallback } from "react";
import { 
  MapPin, 
  Maximize2, 
  X, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Download 
} from "lucide-react";

import DownloadLeadModal from "@/components/forms/DownloadLeadModal";

interface LocationMapViewerProps {
  className?: string;
  imageSrc?: string;
}

export default function LocationMapViewer({
  className = "",
  imageSrc = "/images/imgi_87_LOCATION.webp",
}: LocationMapViewerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  // Pan & Zoom State for the Card
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const initialPinchDist = useRef<number | null>(null);
  const initialScale = useRef(1);

  // Pan & Zoom State for the Modal
  const [modalScale, setModalScale] = useState(1.4);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [isModalDragging, setIsModalDragging] = useState(false);
  const modalDragStart = useRef({ x: 0, y: 0 });

  const handleReset = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const handleModalReset = useCallback(() => {
    setModalScale(1.4);
    setModalPosition({ x: 0, y: 0 });
  }, []);

  // Zoom helpers
  const zoomIn = () => setScale((prev) => Math.min(Math.round((prev + 0.5) * 10) / 10, 8));
  const zoomOut = () => {
    setScale((prev) => {
      const next = Math.max(Math.round((prev - 0.5) * 10) / 10, 1);
      if (next === 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const modalZoomIn = () => setModalScale((prev) => Math.min(Math.round((prev + 0.6) * 10) / 10, 10));
  const modalZoomOut = () => {
    setModalScale((prev) => {
      const next = Math.max(Math.round((prev - 0.6) * 10) / 10, 1);
      if (next === 1) setModalPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleModalWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.25 : 0.8;
    setModalScale((prev) => {
      const next = Math.min(Math.max(prev * factor, 1), 10);
      if (next <= 1) setModalPosition({ x: 0, y: 0 });
      return Math.round(next * 100) / 100;
    });
  };

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Modal Drag
  const handleModalMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsModalDragging(true);
    modalDragStart.current = { x: e.clientX - modalPosition.x, y: e.clientY - modalPosition.y };
  };

  const handleModalMouseMove = (e: React.MouseEvent) => {
    if (!isModalDragging) return;
    setModalPosition({
      x: e.clientX - modalDragStart.current.x,
      y: e.clientY - modalDragStart.current.y,
    });
  };

  const handleModalMouseUp = () => setIsModalDragging(false);

  // Touch handlers
  const getTouchDist = (t1: React.Touch, t2: React.Touch) => {
    const dx = t1.clientX - t2.clientX;
    const dy = t1.clientY - t2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      dragStart.current = {
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      };
    } else if (e.touches.length === 2) {
      setIsDragging(false);
      initialPinchDist.current = getTouchDist(e.touches[0], e.touches[1]);
      initialScale.current = scale;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging) {
      setPosition({
        x: e.touches[0].clientX - dragStart.current.x,
        y: e.touches[0].clientY - dragStart.current.y,
      });
    } else if (e.touches.length === 2 && initialPinchDist.current !== null) {
      const curDist = getTouchDist(e.touches[0], e.touches[1]);
      const ratio = curDist / initialPinchDist.current;
      const next = Math.min(Math.max(initialScale.current * ratio, 1), 8);
      setScale(Math.round(next * 100) / 100);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    initialPinchDist.current = null;
  };

  const handleDoubleClick = () => {
    setScale((prev) => (prev > 1.5 ? 1 : 2.8));
    if (scale > 1.5) setPosition({ x: 0, y: 0 });
  };

  return (
    <>
      <div className={`relative w-full rounded-3xl bg-white border border-amber-200 shadow-xl overflow-hidden group ${className}`}>
        {/* Content Canvas */}
        <div className="relative w-full h-[520px] sm:h-[620px] lg:h-[720px] bg-slate-100 overflow-hidden">
          <div
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onDoubleClick={handleDoubleClick}
            className={`relative w-full h-full flex items-center justify-center p-3 bg-white select-none overflow-hidden ${
              scale > 1 ? (isDragging ? "cursor-grabbing" : "cursor-grab") : "cursor-zoom-in"
            }`}
          >
            <div
              style={{
                transform: `translate3d(${position.x}px, ${position.y}px, 0px) scale(${scale})`,
                transformOrigin: "center center",
                transition: isDragging ? "none" : "transform 0.15s ease-out",
                willChange: "transform",
              }}
              className="flex items-center justify-center w-full h-full pointer-events-none"
            >
              <img
                src={imageSrc}
                alt="Saffron City Official Location and Access Map"
                className="w-auto h-auto max-w-full max-h-full object-contain rounded-xl shadow-lg border border-slate-100"
                draggable={false}
              />
            </div>

            {/* Floating Map Zoom & Action Controls */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/95 border border-slate-200 shadow-xl backdrop-blur-md">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  zoomIn();
                }}
                className="p-2 rounded-xl bg-slate-100 hover:bg-amber-100 text-slate-800 hover:text-amber-900 transition-colors cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  zoomOut();
                }}
                className="p-2 rounded-xl bg-slate-100 hover:bg-amber-100 text-slate-800 hover:text-amber-900 transition-colors cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              {scale > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReset();
                  }}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDownloadModalOpen(true);
                }}
                className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 transition-colors cursor-pointer"
                title="Download Map"
              >
                <Download className="w-4 h-4 text-[#D49E17]" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setModalScale(1.8);
                  setModalPosition({ x: 0, y: 0 });
                  setIsModalOpen(true);
                }}
                className="p-2 rounded-xl bg-slate-900 hover:bg-[#D49E17] text-white hover:text-slate-950 transition-colors cursor-pointer ml-0.5"
                title="Fullscreen HD View"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Floating Bottom Info Tip */}
            <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
              <span className="text-[11px] font-medium text-slate-600 bg-white/95 px-3 py-1 rounded-full border border-slate-200 shadow-md backdrop-blur-sm">
                Official Saffron City Master Highway Map • Pinch or drag to pan • Click Full Screen for HD zoom
              </span>
              {scale > 1 && (
                <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 shadow">
                  {Math.round(scale * 100)}%
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen HD Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-4">
          <div className="relative w-full h-full max-w-7xl rounded-3xl bg-white border border-slate-200 overflow-hidden flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 px-6 bg-white border-b border-slate-200 z-30">
              <div>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg font-heading flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#D49E17]" />
                  <span>Saffron City Official Location &amp; Access Map</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Main GT Road (N-5 Highway) Frontage &amp; Connecting Interchange Routes
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-xl bg-slate-100 text-xs font-mono font-bold text-slate-800 border border-slate-200">
                  {Math.round(modalScale * 100)}%
                </span>

                <button
                  type="button"
                  onClick={modalZoomIn}
                  className="p-2.5 rounded-xl bg-slate-100 hover:bg-amber-100 text-slate-800 hover:text-amber-900 transition-colors cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={modalZoomOut}
                  className="p-2.5 rounded-xl bg-slate-100 hover:bg-amber-100 text-slate-800 hover:text-amber-900 transition-colors cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleModalReset}
                  className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                  title="Reset View"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsDownloadModalOpen(true)}
                  className="p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer"
                  title="Download Image"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Save</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 border border-red-200 transition-colors ml-2 cursor-pointer"
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Canvas */}
            <div
              onWheel={handleModalWheel}
              onMouseDown={handleModalMouseDown}
              onMouseMove={handleModalMouseMove}
              onMouseUp={handleModalMouseUp}
              onMouseLeave={handleModalMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className={`flex-1 overflow-hidden flex items-center justify-center p-4 select-none bg-slate-50 ${
                isModalDragging ? "cursor-grabbing" : "cursor-grab"
              }`}
            >
              <div
                style={{
                  transform: `translate3d(${modalPosition.x}px, ${modalPosition.y}px, 0px) scale(${modalScale})`,
                  transformOrigin: "center center",
                  transition: isModalDragging ? "none" : "transform 0.12s ease-out",
                  willChange: "transform",
                }}
                className="pointer-events-none flex items-center justify-center"
              >
                <img
                  src={imageSrc}
                  alt="Saffron City Official Location Map Fullscreen"
                  className="max-w-none w-auto max-h-[82vh] object-contain rounded-xl shadow-2xl"
                  draggable={false}
                />
              </div>
            </div>

            {/* Modal Footer Note */}
            <div className="px-6 py-2.5 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>Scroll mouse wheel or pinch to zoom • Drag to explore landmarks &amp; routes</span>
              <span className="text-[#D49E17] font-bold">Official Saffron City Blueprint</span>
            </div>
          </div>
        </div>
      )}

      {/* Gated Lead Capture Download Modal */}
      <DownloadLeadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        downloadUrl={imageSrc}
        downloadFileName="saffron-city-official-location-map.jpg"
        documentTitle="Saffron City Location Map"
        documentType="Location Map"
      />
    </>
  );
}
