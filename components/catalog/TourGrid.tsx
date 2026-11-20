"use client";

import React from "react";
import { Tour } from "@/types/tour";
import { TourCard } from "./TourCard";
import { ArrowUpDown } from "lucide-react";

interface TourGridProps {
  tours: Tour[];
  totalCount: number;
  sortBy: string;
  onSortChange: (sort: "featured" | "price-asc" | "price-desc" | "rating" | "duration") => void;
  onResetFilters: () => void;
}

export function TourGrid({
  tours,
  totalCount,
  sortBy,
  onSortChange,
  onResetFilters,
}: TourGridProps) {
  return (
    <div className="flex-1 min-w-0">
      {/* Top Controls Bar: Count and Sort Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-neutral-200 gap-3">
        <div>
          <span className="text-xs sm:text-sm font-bold text-neutral-900 block sm:inline">
            Showing {tours.length} of {totalCount} experiences in Paris
          </span>
          <p className="text-[11px] sm:text-xs text-neutral-500 mt-0.5">
            Prices include taxes and booking fees. Free cancellation available on most tours.
          </p>
        </div>

        {/* Sort Select */}
        <div className="flex items-center space-x-2 self-start sm:self-auto flex-shrink-0">
          <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
          <label htmlFor="sort-tours" className="text-xs font-medium text-neutral-600 whitespace-nowrap">
            Sort by:
          </label>
          <select
            id="sort-tours"
            value={sortBy}
            onChange={(e) =>
              onSortChange(
                e.target.value as "featured" | "price-asc" | "price-desc" | "rating" | "duration"
              )
            }
            className="text-xs font-semibold text-neutral-900 bg-white border border-neutral-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-brand-primary cursor-pointer shadow-sm"
          >
            <option value="featured">Featured / Top Picks</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Traveler Rating</option>
          </select>
        </div>
      </div>

      {/* Grid or Empty State */}
      {tours.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-neutral-50 border border-dashed border-neutral-300 rounded-2xl p-6 sm:p-8">
          <div className="w-12 h-12 rounded-full bg-neutral-200 text-neutral-500 flex items-center justify-center mx-auto mb-3 text-lg font-bold">
            ?
          </div>
          <h3 className="text-sm sm:text-base font-bold text-neutral-900 mb-1">
            No tours matched your filters
          </h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto mb-4 leading-relaxed">
            Try broadening your price range, searching for a different keyword, or resetting your filters.
          </p>
          <button
            type="button"
            onClick={onResetFilters}
            className="px-4 py-2 bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold rounded-lg transition-colors shadow-sm active:scale-95"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}
