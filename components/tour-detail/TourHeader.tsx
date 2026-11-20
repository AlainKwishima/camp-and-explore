"use client";

import React, { useState, useEffect } from "react";
import { TourDetail } from "@/types/tour";
import { Star, MapPin, Share2, Heart, Award, Flame, Check } from "lucide-react";

interface TourHeaderProps {
  tour: TourDetail;
}

export function TourHeader({ tour }: TourHeaderProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("camp_explorer_wishlist") || "[]");
      setIsFavorited(saved.includes(tour.id));
    } catch {
      setIsFavorited(false);
    }
  }, [tour.id]);

  const toggleFavorite = () => {
    try {
      const saved: string[] = JSON.parse(localStorage.getItem("camp_explorer_wishlist") || "[]");
      let updated: string[];
      if (saved.includes(tour.id)) {
        updated = saved.filter((id) => id !== tour.id);
        setIsFavorited(false);
      } else {
        updated = [...saved, tour.id];
        setIsFavorited(true);
      }
      localStorage.setItem("camp_explorer_wishlist", JSON.stringify(updated));
      window.dispatchEvent(new Event("wishlist_updated"));
    } catch (err) {
      console.error(err);
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="pt-2 pb-4">
      {/* Badges & Location Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-2">
        {tour.badges.includes("Badge of Excellence") && (
          <span className="inline-flex items-center space-x-1.5 bg-brand-light text-brand-dark px-2.5 py-1 rounded-md text-xs font-bold border border-brand-primary/20">
            <Award className="w-3.5 h-3.5 text-brand-primary flex-shrink-0" />
            <span>Badge of Excellence</span>
          </span>
        )}
        {tour.badges.includes("Likely to Sell Out") && (
          <span className="inline-flex items-center space-x-1.5 bg-brand-accent text-white px-2.5 py-1 rounded-md text-xs font-bold shadow-sm">
            <Flame className="w-3.5 h-3.5 fill-current flex-shrink-0" />
            <span>Likely to Sell Out</span>
          </span>
        )}
        <span className="inline-flex items-center text-xs font-medium text-neutral-500 py-0.5">
          <MapPin className="w-3.5 h-3.5 mr-1 text-neutral-400 flex-shrink-0" />
          <span>{tour.location}</span>
        </span>
      </div>

      {/* Main H1 Title */}
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-extrabold text-neutral-900 tracking-tight leading-snug sm:leading-tight mb-3">
        {tour.title}
      </h1>

      {/* Ratings, Reviews & Social Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-center space-x-2.5 flex-wrap gap-y-1">
          <div className="flex items-center text-brand-gold flex-shrink-0">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                  i < Math.floor(tour.rating) ? "fill-current" : "fill-neutral-200 text-neutral-200"
                }`}
              />
            ))}
          </div>
          <span className="font-extrabold text-neutral-900">{tour.rating}</span>
          <a
            href="#reviews"
            className="text-neutral-600 hover:text-brand-primary underline transition-colors"
          >
            {tour.reviewCount.toLocaleString()} Reviews
          </a>
          <span className="text-neutral-300">•</span>
          <span className="text-neutral-600 font-medium">{tour.duration}</span>
        </div>

        {/* Share & Wishlist Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 border border-neutral-300 hover:border-neutral-400 rounded-full text-xs font-semibold text-neutral-700 bg-white hover:bg-neutral-50 transition-colors shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-brand-primary" />
                <span className="text-brand-primary font-bold">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-neutral-500" />
                <span>Share</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={toggleFavorite}
            className={`inline-flex items-center space-x-1.5 px-3 py-1.5 border rounded-full text-xs font-semibold transition-colors shadow-sm ${
              isFavorited
                ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
                : "border-neutral-300 hover:border-neutral-400 bg-white text-neutral-700 hover:bg-neutral-50"
            }`}
          >
            <Heart
              className={`w-3.5 h-3.5 ${
                isFavorited ? "fill-current text-red-600" : "text-neutral-500"
              }`}
            />
            <span>{isFavorited ? "Saved" : "Save"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
