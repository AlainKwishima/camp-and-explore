"use client";

import React, { useState } from "react";
import { FilterState } from "@/types/tour";
import { Star, RotateCcw, Check, Flame, SlidersHorizontal, ChevronDown, ChevronUp, Search } from "lucide-react";

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  totalResults: number;
}

const CATEGORIES = [
  "All Categories",
  "Adventure & Outdoors",
  "Home Host & Culture",
  "Agro-Tourism",
  "Hiking & Trails",
];

const RATINGS = [
  { label: "4.5 & up", min: 4.5 },
  { label: "4.0 & up", min: 4.0 },
  { label: "3.5 & up", min: 3.5 },
];

export function FilterSidebar({
  filters,
  onChange,
  onReset,
  totalResults,
}: FilterSidebarProps) {
  const [mobileExpanded, setMobileExpanded] = useState(false);

  const handleCategoryChange = (cat: string) => {
    onChange({
      ...filters,
      category: cat === "All Categories" ? "" : cat,
    });
  };

  const handlePriceChange = (maxPrice: number) => {
    onChange({
      ...filters,
      maxPrice,
    });
  };

  const handleRatingChange = (rating: number) => {
    onChange({
      ...filters,
      minRating: filters.minRating === rating ? 0 : rating,
    });
  };

  const handleFreeCancellationToggle = () => {
    onChange({
      ...filters,
      freeCancellationOnly: !filters.freeCancellationOnly,
    });
  };

  const handleLikelyToSellOutToggle = () => {
    onChange({
      ...filters,
      likelyToSellOutOnly: !filters.likelyToSellOutOnly,
    });
  };

  const activeFilterCount =
    (filters.category ? 1 : 0) +
    (filters.maxPrice < 300 ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.freeCancellationOnly ? 1 : 0) +
    (filters.likelyToSellOutOnly ? 1 : 0);

  return (
    <aside className="w-full lg:w-64 flex-shrink-0 bg-white border border-neutral-200 rounded-xl p-4 sm:p-5 shadow-sm space-y-5">
      {/* Mobile Toggle Trigger Header */}
      <div className="flex items-center justify-between pb-2 lg:pb-4 border-b border-neutral-200">
        <button
          type="button"
          onClick={() => setMobileExpanded(!mobileExpanded)}
          className="lg:hidden flex items-center space-x-2 text-left py-1"
        >
          <SlidersHorizontal className="w-4 h-4 text-brand-primary" />
          <span className="text-sm font-bold text-neutral-900">
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </span>
          <span className="text-xs text-neutral-500 font-normal">
            • {totalResults} tours
          </span>
          {mobileExpanded ? (
            <ChevronUp className="w-4 h-4 text-neutral-500 ml-1" />
          ) : (
            <ChevronDown className="w-4 h-4 text-neutral-500 ml-1" />
          )}
        </button>

        <div className="hidden lg:block">
          <h2 className="text-base font-bold text-neutral-900">Filter Tours</h2>
          <span className="text-xs text-neutral-500">{totalResults} tours found</span>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center space-x-1 text-xs font-semibold text-brand-primary hover:text-brand-hover transition-colors py-1"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Filter Options Content (Collapsible on mobile, always visible on lg:) */}
      <div className={`space-y-5 ${mobileExpanded ? "block" : "hidden lg:block"}`}>
        {/* Search Tours Keyword Input */}
        <div className="space-y-1.5 pb-4 border-b border-neutral-200">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-700">Search Tours</h3>
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="e.g. Hiking, coffee, camping..."
              value={filters.searchQuery}
              onChange={(e) => onChange({ ...filters, searchQuery: e.target.value })}
              className="w-full pl-8 pr-2.5 py-1.5 text-xs border border-neutral-300 rounded-lg outline-none focus:ring-1 focus:ring-brand-primary"
            />
          </div>
        </div>

        {/* Special Highlights Toggles */}
        <div className="space-y-2.5 pb-4 border-b border-neutral-200">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-700">Special Filters</h3>
          
          <label className="flex items-center space-x-2.5 cursor-pointer text-xs sm:text-sm text-neutral-800 select-none">
            <input
              type="checkbox"
              checked={filters.freeCancellationOnly}
              onChange={handleFreeCancellationToggle}
              className="w-4 h-4 rounded text-brand-primary focus:ring-brand-primary border-neutral-300"
            />
            <span className="font-medium">Free Cancellation</span>
          </label>

          <label className="flex items-center space-x-2.5 cursor-pointer text-xs sm:text-sm text-neutral-800 select-none">
            <input
              type="checkbox"
              checked={filters.likelyToSellOutOnly}
              onChange={handleLikelyToSellOutToggle}
              className="w-4 h-4 rounded text-brand-primary focus:ring-brand-primary border-neutral-300"
            />
            <span className="font-medium flex items-center space-x-1">
              <span>Likely to Sell Out</span>
              <Flame className="w-3.5 h-3.5 text-brand-accent fill-brand-accent" />
            </span>
          </label>
        </div>

        {/* Categories */}
        <div className="space-y-2.5 pb-4 border-b border-neutral-200">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-700">Categories</h3>
          <div className="space-y-1 max-h-52 overflow-y-auto pr-1">
            {CATEGORIES.map((cat) => {
              const isSelected =
                cat === "All Categories"
                  ? filters.category === ""
                  : filters.category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryChange(cat)}
                  className={`w-full text-left text-xs py-1.5 px-2 rounded-md font-medium transition-colors flex items-center justify-between ${
                    isSelected
                      ? "bg-brand-light text-brand-dark font-bold"
                      : "text-neutral-700 hover:bg-neutral-100"
                  }`}
                >
                  <span className="truncate">{cat}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-brand-primary flex-shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Maximum Price Range */}
        <div className="space-y-2.5 pb-4 border-b border-neutral-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-700">Max Price</h3>
            <span className="text-xs font-bold text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded font-display">
              Up to ${filters.maxPrice}
            </span>
          </div>
          <input
            type="range"
            min="15"
            max="100"
            step="5"
            value={filters.maxPrice}
            onChange={(e) => handlePriceChange(Number(e.target.value))}
            className="w-full accent-brand-primary cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-neutral-500 font-medium">
            <span>$15</span>
            <span>$50</span>
            <span>$100</span>
          </div>
        </div>

        {/* Star Rating Filter */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-700">Traveler Rating</h3>
          <div className="space-y-1.5">
            {RATINGS.map((r) => {
              const isSelected = filters.minRating === r.min;
              return (
                <button
                  key={r.min}
                  type="button"
                  onClick={() => handleRatingChange(r.min)}
                  className={`w-full flex items-center space-x-2 text-xs py-1.5 px-2 rounded-md transition-colors ${
                    isSelected
                      ? "bg-brand-light text-brand-dark font-bold"
                      : "text-neutral-700 hover:bg-neutral-100"
                  }`}
                >
                  <div className="flex items-center text-brand-gold flex-shrink-0">
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <span>{r.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
