"use client";

import React, { useState } from "react";
import { Review } from "@/types/tour";
import { Star, CheckCircle, Search, ThumbsUp } from "lucide-react";

interface ReviewsSectionProps {
  rating: number;
  reviewCount: number;
  reviews: Review[];
}

export function ReviewsSection({ rating, reviewCount, reviews }: ReviewsSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredReviews = reviews.filter((r) => {
    if (selectedFilter !== "all" && r.travelerType.toLowerCase() !== selectedFilter.toLowerCase()) {
      return false;
    }
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return r.content.toLowerCase().includes(q) || r.title.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <section id="reviews" className="scroll-mt-32 py-8 border-b border-neutral-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-neutral-900">Traveler Reviews</h2>
          <p className="text-xs text-neutral-500 mt-1">
            Real reviews from verified travelers who booked this experience
          </p>
        </div>
      </div>

      {/* Overall Score & Distribution Card */}
      <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Big Score Block */}
          <div className="text-center md:text-left border-b md:border-b-0 md:border-r border-neutral-200 pb-4 md:pb-0 md:pr-6">
            <div className="text-4xl font-extrabold text-neutral-900 mb-1">{rating.toFixed(1)}</div>
            <div className="flex items-center justify-center md:justify-start text-brand-gold mb-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(rating) ? "fill-current" : "fill-neutral-300 text-neutral-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-neutral-500">Based on {reviewCount.toLocaleString()} verified ratings</p>
          </div>

          {/* Breakdown Bars (Takes 2 cols) */}
          <div className="md:col-span-2 space-y-2 text-xs">
            <div className="flex items-center space-x-2.5 sm:space-x-3">
              <span className="w-12 text-[11px] sm:text-xs text-neutral-600 font-medium">5 stars</span>
              <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                <div className="h-full bg-brand-primary w-[72%] rounded-full" />
              </div>
              <span className="w-9 text-right text-[11px] sm:text-xs text-neutral-500 font-medium">72%</span>
            </div>

            <div className="flex items-center space-x-2.5 sm:space-x-3">
              <span className="w-12 text-[11px] sm:text-xs text-neutral-600 font-medium">4 stars</span>
              <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                <div className="h-full bg-brand-primary w-[18%] rounded-full" />
              </div>
              <span className="w-9 text-right text-[11px] sm:text-xs text-neutral-500 font-medium">18%</span>
            </div>

            <div className="flex items-center space-x-2.5 sm:space-x-3">
              <span className="w-12 text-[11px] sm:text-xs text-neutral-600 font-medium">3 stars</span>
              <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                <div className="h-full bg-brand-gold w-[6%] rounded-full" />
              </div>
              <span className="w-9 text-right text-[11px] sm:text-xs text-neutral-500 font-medium">6%</span>
            </div>

            <div className="flex items-center space-x-2.5 sm:space-x-3">
              <span className="w-12 text-[11px] sm:text-xs text-neutral-600 font-medium">2 stars</span>
              <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                <div className="h-full bg-neutral-400 w-[2%] rounded-full" />
              </div>
              <span className="w-9 text-right text-[11px] sm:text-xs text-neutral-500 font-medium">2%</span>
            </div>

            <div className="flex items-center space-x-2.5 sm:space-x-3">
              <span className="w-12 text-[11px] sm:text-xs text-neutral-600 font-medium">1 star</span>
              <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                <div className="h-full bg-neutral-400 w-[2%] rounded-full" />
              </div>
              <span className="w-9 text-right text-[11px] sm:text-xs text-neutral-500 font-medium">2%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search within Reviews */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search reviews by keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-neutral-300 rounded-lg outline-none focus:ring-1 focus:ring-brand-primary"
          />
        </div>

        <div className="flex items-center space-x-1.5 flex-wrap gap-y-1 text-xs">
          <span className="text-neutral-500 font-medium mr-1 text-[11px] sm:text-xs">Traveler:</span>
          {["all", "Couples", "Families", "Friends"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setSelectedFilter(t)}
              className={`px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-medium transition-colors ${
                selectedFilter === t
                  ? "bg-neutral-900 text-white shadow-sm"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {t === "all" ? "All" : t}
            </button>
          ))}
        </div>
      </div>

      {/* Review Cards List */}
      <div className="space-y-4">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((rev) => (
            <div key={rev.id} className="bg-white border border-neutral-200 rounded-xl p-4 sm:p-5 shadow-sm space-y-2.5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-xs flex items-center justify-center flex-shrink-0">
                    {rev.author[0]}
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="text-xs font-bold text-neutral-900">{rev.author}</span>
                      {rev.verified && (
                        <span className="inline-flex items-center text-[10px] text-brand-dark bg-brand-light px-1.5 py-0.5 rounded font-medium border border-brand-primary/20">
                          <CheckCircle className="w-3 h-3 mr-0.5 text-brand-primary" />
                          <span>Verified</span>
                        </span>
                      )}
                    </div>
                    {rev.location && <span className="text-[11px] text-neutral-500">{rev.location}</span>}
                  </div>
                </div>

                <span className="text-[11px] text-neutral-400">{rev.date}</span>
              </div>

              {/* Star Rating & Title */}
              <div className="flex items-center space-x-2 pt-1">
                <div className="flex items-center text-brand-gold flex-shrink-0">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < rev.rating ? "fill-current" : "fill-neutral-200 text-neutral-200"
                      }`}
                    />
                  ))}
                </div>
                <h4 className="text-xs font-bold text-neutral-900 leading-snug">{rev.title}</h4>
              </div>

              {/* Content */}
              <p className="text-xs text-neutral-700 leading-relaxed">{rev.content}</p>

              {/* Footer row with traveler type & helpful button */}
              <div className="pt-2 text-[11px] text-neutral-500 flex items-center justify-between border-t border-neutral-100">
                <span>Traveled as {rev.travelerType}</span>
                <button
                  type="button"
                  className="inline-flex items-center space-x-1 text-neutral-400 hover:text-neutral-700 py-1"
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>Helpful</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-neutral-500 text-xs bg-neutral-50 rounded-xl border border-dashed border-neutral-200">
            No reviews matching your search criteria.
          </div>
        )}
      </div>
    </section>
  );
}
