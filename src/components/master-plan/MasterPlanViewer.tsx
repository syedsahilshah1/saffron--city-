"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { Maximize2, X, ZoomIn, ZoomOut, RotateCcw, Download } from "lucide-react";
import { SITE_CONFIG } from "@/data/saffron-data";
import DownloadLeadModal from "@/components/forms/DownloadLeadModal";

export default function MasterPlanViewer({
  className = "",
  initialImage,
}: {
  className?: string;
  initialImage?: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [masterPlanImg, setMasterPlanImg] = useState(
    initialImage || SITE_CONFIG.masterPlanImage || "/images/saffron-city-master-plan.webp"
  );

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data?.masterPlanImage) {
          setMasterPlanImg(data.data.masterPlanImage);
        }
      })
      .catch((err) => console.warn("Could not load dynamic master plan:", err));
  }, []);

  // Card Viewer Pan & Zoom State
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const initialPinchDist = useRef<number | null>(null);
  const initialScale = useRef(1);

  // Modal Pan & Zoom State
  const [modalScale, setModalScale] = useState(1.5);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [isModalDragging, setIsModalDragging] = useState(false);
  const modalDragStart = useRef({ x: 0, y: 0 });
  const modalPinchDist = useRef<number | null>(null);
  const modalInitialScale = useRef(1);

  // Reset helpers
  const handleReset = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const handleModalReset = useCallback(() => {
    setModalScale(1.5);
    setModalPosition({ x: 0, y: 0 });
  }, []);

  // Zoom Helpers (up to 12x deep zoom for full plot detail)
  const zoomIn = () => setScale((prev) => Math.min(Math.round((prev + 0.6) * 10) / 10, 12));
  const zoomOut = () => {
    setScale((prev) => {
      const next = Math.max(Math.round((prev - 0.6) * 10) / 10, 1);
      if (next === 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const modalZoomIn = () => setModalScale((prev) => Math.min(Math.round((prev + 0.8) * 10) / 10, 15));
  const modalZoomOut = () => {
    setModalScale((prev) => {
      const next = Math.max(Math.round((prev - 0.8) * 10) / 10, 1);
      if (next === 1) setModalPosition({ x: 0, y: 0 });
      return next;
    });
  };

  // --- Mouse Wheel Zooming ---
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.25 : 0.8;
    setScale((prev) => {
      const next = Math.min(Math.max(prev * zoomFactor, 1), 12);
      if (next <= 1) setPosition({ x: 0, y: 0 });
      return Math.round(next * 100) / 100;
    });
  };

  const handleModalWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.3 : 0.78;
    setModalScale((prev) => {
      const next = Math.min(Math.max(prev * zoomFactor, 1), 15);
      if (next <= 1) setModalPosition({ x: 0, y: 0 });
      return Math.round(next * 100) / 100;
    });
  };

  // --- Mouse Drag to Pan (Main) ---
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

  // --- Touch Gestures ---
  const getTouchDistance = (touch1: React.Touch, touch2: React.Touch) => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
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
      initialPinchDist.current = getTouchDistance(e.touches[0], e.touches[1]);
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
      const currentDist = getTouchDistance(e.touches[0], e.touches[1]);
      const ratio = currentDist / initialPinchDist.current;
      const nextScale = Math.min(Math.max(initialScale.current * ratio, 1), 12);
      setScale(Math.round(nextScale * 100) / 100);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    initialPinchDist.current = null;
  };

  // --- Modal Mouse Drag ---
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

  // --- Modal Touch Gestures ---
  const handleModalTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsModalDragging(true);
      modalDragStart.current = {
        x: e.touches[0].clientX - modalPosition.x,
        y: e.touches[0].clientY - modalPosition.y,
      };
    } else if (e.touches.length === 2) {
      setIsModalDragging(false);
      modalPinchDist.current = getTouchDistance(e.touches[0], e.touches[1]);
      modalInitialScale.current = modalScale;
    }
  };

  const handleModalTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isModalDragging) {
      setModalPosition({
        x: e.touches[0].clientX - modalDragStart.current.x,
        y: e.touches[0].clientY - modalDragStart.current.y,
      });
    } else if (e.touches.length === 2 && modalPinchDist.current !== null) {
      const currentDist = getTouchDistance(e.touches[0], e.touches[1]);
      const ratio = currentDist / modalPinchDist.current;
      const nextScale = Math.min(Math.max(modalInitialScale.current * ratio, 1), 15);
      setModalScale(Math.round(nextScale * 100) / 100);
    }
  };

  const handleModalTouchEnd = () => {
    setIsModalDragging(false);
    modalPinchDist.current = null;
  };

  // Double click quick zoom
  const handleDoubleClick = () => {
    setScale((prev) => (prev > 1.8 ? 1 : 3.5));
    if (scale > 1.8) setPosition({ x: 0, y: 0 });
  };

  const handleModalDoubleClick = () => {
    setModalScale((prev) => (prev > 2.5 ? 1.5 : 4.5));
    if (modalScale > 2.5) setModalPosition({ x: 0, y: 0 });
  };

  return (
    <>
      <div
        className={`relative w-full rounded-3xl bg-white border border-amber-200 shadow-xl overflow-hidden group ${className}`}
      >
        {/* Interactive Deep Pan & Zoom Canvas */}
        <div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onDoubleClick={handleDoubleClick}
          className={`relative w-full h-[380px] sm:h-[440px] lg:h-[480px] flex items-center justify-center p-2 bg-white select-none overflow-hidden ${
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
              src={masterPlanImg}
              alt="Saffron City Official Master Plan Layout"
              className="w-auto h-auto max-w-full max-h-full object-contain rounded-2xl shadow-md"
              style={{
                imageRendering: "auto",
              }}
              draggable={false}
            />
          </div>

          {/* Clean Floating Zoom Controls */}
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
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer text-xs font-bold"
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
              title="Download Master Plan"
            >
              <Download className="w-4 h-4 text-[#D4A017]" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setModalScale(2);
                setModalPosition({ x: 0, y: 0 });
                setIsModalOpen(true);
              }}
              className="p-2 rounded-xl bg-slate-900 hover:bg-[#D4A017] text-white hover:text-slate-950 transition-colors cursor-pointer ml-0.5"
              title="Fullscreen Deep Zoom"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Clean Tip Indicator */}
          <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
            <span className="text-[11px] font-medium text-slate-500 bg-white/90 px-3 py-1 rounded-full border border-slate-200 shadow-sm backdrop-blur-sm">
              Scroll wheel or pinch to zoom • Drag to pan plots
            </span>
            {scale > 1 && (
              <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                {Math.round(scale * 100)}%
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen HD Deep Zoom Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-4">
          <div className="relative w-full h-full max-w-7xl rounded-3xl bg-white border border-slate-200 overflow-hidden flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 px-6 bg-white border-b border-slate-200 z-30">
              <div>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg font-heading">
                  Saffron City Master Plan Layout (Full Detail View)
                </h3>
                <p className="text-xs text-slate-500">
                  Zoom in up to 1500% to inspect every plot number, road width, and sector facility.
                </p>
              </div>

              {/* Modal Zoom & Close Controls */}
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
                  title="Download Master Plan"
                >
                  <Download className="w-4 h-4 text-[#D4A017]" />
                  <span className="hidden sm:inline">Save HD</span>
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

            {/* Modal Canvas with Infinite Smooth Pan & Zoom */}
            <div
              onWheel={handleModalWheel}
              onMouseDown={handleModalMouseDown}
              onMouseMove={handleModalMouseMove}
              onMouseUp={handleModalMouseUp}
              onMouseLeave={handleModalMouseUp}
              onTouchStart={handleModalTouchStart}
              onTouchMove={handleModalTouchMove}
              onTouchEnd={handleModalTouchEnd}
              onDoubleClick={handleModalDoubleClick}
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
                  src={masterPlanImg}
                  alt="Saffron City Master Plan Fullscreen High Resolution"
                  className="max-w-none w-auto max-h-[82vh] object-contain rounded-xl shadow-2xl"
                  draggable={false}
                />
              </div>
            </div>

            {/* Modal Footer Note */}
            <div className="px-6 py-2.5 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>Scroll mouse wheel or pinch to zoom deep • Drag anywhere to pan across sectors</span>
              <span className="text-[#D4A017] font-bold">4K Ultra-HD Layout</span>
            </div>
          </div>
        </div>
      )}

      {/* Gated Lead Capture Download Modal for Master Plan */}
      <DownloadLeadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        downloadUrl={masterPlanImg}
        downloadFileName="saffron-city-official-master-plan.jpg"
        documentTitle="Master Plan Layout"
        documentType="Master Plan"
      />
    </>
  );
}
