"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Tour } from "@/types/tour";
import { Star, Clock, Check, Heart, Flame, Award } from "lucide-react";

interface TourCardProps {
  tour: Tour;
}

export function TourCard({ tour }: TourCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("camp_explorer_wishlist") || "[]");
      setIsFavorited(saved.includes(tour.id));
    } catch {
      setIsFavorited(false);
    }
  }, [tour.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
      console.error("Wishlist error", err);
    }
  };

  return (
    <article className="group bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm hover:shadow-cardHover transition-all flex flex-col h-full">
      {/* Tour Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
        <Image
          src={tour.featuredImage}
          alt={tour.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges on Image */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {tour.badges.includes("Likely to Sell Out") && (
            <span className="inline-flex items-center space-x-1 bg-brand-accent text-white text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded shadow-sm">
              <Flame className="w-3 h-3 fill-current flex-shrink-0" />
              <span>Likely to Sell Out</span>
            </span>
          )}
          {tour.badges.includes("Badge of Excellence") && (
            <span className="inline-flex items-center space-x-1 bg-brand-dark/95 backdrop-blur-sm text-white text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded shadow-sm">
              <Award className="w-3 h-3 text-brand-light flex-shrink-0" />
              <span>Badge of Excellence</span>
            </span>
          )}
        </div>

        {/* Favorite Wishlist Button */}
        <button
          type="button"
          onClick={toggleFavorite}
          aria-label={isFavorited ? "Remove from wishlist" : "Save to wishlist"}
          className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white backdrop-blur-sm flex items-center justify-center shadow-md transition-colors"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorited ? "fill-red-500 text-red-500" : "text-neutral-700"
            }`}
          />
        </button>

        {tour.slug === "mount-jali-hiking" && (
          <div className="absolute bottom-2.5 left-2.5 z-10 bg-brand-primary text-white text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded shadow-sm">
            Featured Experience
          </div>
        )}
      </div>

      {/* Tour Details Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Category & Location */}
        <div className="text-[11px] font-medium text-neutral-500 uppercase tracking-wide mb-1 truncate">
          {tour.categories[0]} • {tour.location}
        </div>

        {/* Tour Title */}
        <h3 className="text-xs sm:text-sm font-bold text-neutral-900 group-hover:text-brand-primary transition-colors line-clamp-2 leading-snug mb-2">
          <Link href={`/tours/${tour.slug}`}>
            {tour.title}
          </Link>
        </h3>

        {/* Star Rating & Review Count */}
        <div className="flex items-center space-x-1 text-xs mb-3">
          <div className="flex items-center text-brand-gold flex-shrink-0">
            <Star className="w-3.5 h-3.5 fill-current" />
          </div>
          <span className="font-bold text-neutral-900">{tour.rating}</span>
          <span className="text-neutral-500">({tour.reviewCount.toLocaleString()})</span>
        </div>

        {/* Duration & Key Features */}
        <div className="space-y-1.5 text-xs text-neutral-600 mb-4 flex-1">
          <div className="flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
            <span>{tour.duration}</span>
          </div>

          {tour.freeCancellation && (
            <div className="flex items-center space-x-1.5 text-brand-primary font-medium">
              <Check className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Free cancellation</span>
            </div>
          )}
        </div>

        {/* Price & Action Bottom Row */}
        <div className="pt-3 border-t border-neutral-100 flex items-end justify-between gap-2">
          <div>
            <span className="text-[10px] sm:text-[11px] text-neutral-500 block leading-tight">from</span>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-base sm:text-lg font-extrabold text-neutral-900">
                ${tour.price.toFixed(2)}
              </span>
              {tour.originalPrice && (
                <span className="text-[11px] sm:text-xs text-neutral-400 line-through">
                  ${tour.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-neutral-500">per adult</span>
          </div>

          <Link
            href={`/tours/${tour.slug}`}
            className="px-3.5 py-1.5 bg-neutral-900 group-hover:bg-brand-primary text-white text-xs font-bold rounded-lg transition-colors whitespace-nowrap active:scale-95"
          >
            Explore
          </Link>
        </div>
      </div>
    </article>
  );
}
