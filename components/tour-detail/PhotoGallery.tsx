"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Camera, X, ChevronLeft, ChevronRight } from "lucide-react";

interface PhotoGalleryProps {
  images: string[];
  tourTitle: string;
}

export function PhotoGallery({ images, tourTitle }: PhotoGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }
      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, images.length]);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      {/* Photo Mosaic Grid: Responsive aspect ratio on mobile, fixed height on desktop */}
      <div className="relative rounded-2xl overflow-hidden shadow-sm my-3 sm:my-4 bg-neutral-100 border border-neutral-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 aspect-[16/10] sm:aspect-[16/9] md:aspect-auto md:h-[440px]">
          {/* Main Hero Photo (Takes 2 columns on desktop, full width on mobile) */}
          <div
            onClick={() => openLightbox(0)}
            className="md:col-span-2 relative w-full h-full cursor-pointer overflow-hidden group"
          >
            <Image
              src={images[0]}
              alt={`${tourTitle} - Main View`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
          </div>

          {/* Column 2: 2 stacked photos (hidden on mobile) */}
          <div className="hidden md:grid grid-rows-2 gap-2 h-full">
            <div
              onClick={() => openLightbox(1 % images.length)}
              className="relative h-full cursor-pointer overflow-hidden group"
            >
              <Image
                src={images[1 % images.length]}
                alt={`${tourTitle} - Interior`}
                fill
                sizes="25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
            </div>
            <div
              onClick={() => openLightbox(2 % images.length)}
              className="relative h-full cursor-pointer overflow-hidden group"
            >
              <Image
                src={images[2 % images.length]}
                alt={`${tourTitle} - Gardens`}
                fill
                sizes="25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
            </div>
          </div>

          {/* Column 3: 2 stacked photos (hidden on mobile) */}
          <div className="hidden md:grid grid-rows-2 gap-2 h-full">
            <div
              onClick={() => openLightbox(3 % images.length)}
              className="relative h-full cursor-pointer overflow-hidden group"
            >
              <Image
                src={images[3 % images.length]}
                alt={`${tourTitle} - Architecture`}
                fill
                sizes="25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
            </div>
            <div
              onClick={() => openLightbox(4 % images.length)}
              className="relative h-full cursor-pointer overflow-hidden group"
            >
              <Image
                src={images[4 % images.length]}
                alt={`${tourTitle} - Fountains`}
                fill
                sizes="25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
            </div>
          </div>
        </div>

        {/* View All Photos Button */}
        <button
          type="button"
          onClick={() => openLightbox(0)}
          className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10 bg-white/95 hover:bg-white text-neutral-900 text-xs font-bold px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg shadow-md flex items-center space-x-1.5 transition-all hover:shadow-lg border border-neutral-200 backdrop-blur-sm"
        >
          <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-primary" />
          <span>View all {images.length} photos</span>
        </button>
      </div>

      {/* Full-Screen Interactive Lightbox Modal */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 text-white animate-fadeIn"
        >
          {/* Top Bar: Title & Close Button */}
          <div className="flex items-center justify-between z-10">
            <span className="text-xs sm:text-sm font-medium text-neutral-300 truncate max-w-[70vw]">
              {tourTitle} ({currentIndex + 1} of {images.length})
            </span>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close photo gallery"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Center: Main Image with Prev/Next Controls */}
          <div className="relative flex-1 flex items-center justify-center my-3 sm:my-4 min-h-0">
            <button
              type="button"
              onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
              className="absolute left-2 sm:left-4 z-20 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white transition-all shadow-lg border border-white/10"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <div className="relative w-full max-w-5xl h-full max-h-[70vh]">
              <Image
                src={images[currentIndex]}
                alt={`${tourTitle} - Slide ${currentIndex + 1}`}
                fill
                priority
                className="object-contain"
              />
            </div>

            <button
              type="button"
              onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
              className="absolute right-2 sm:right-4 z-20 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white transition-all shadow-lg border border-white/10"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Bottom Thumbnails Strip */}
          <div className="flex items-center justify-center space-x-2 overflow-x-auto py-2 z-10 max-w-full">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`relative w-14 h-10 sm:w-16 sm:h-12 rounded-md overflow-hidden flex-shrink-0 transition-all ${
                  currentIndex === idx ? "ring-2 ring-brand-primary scale-105" : "opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
