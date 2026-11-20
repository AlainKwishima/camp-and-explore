"use client";

import React, { useState, useMemo, useEffect } from "react";
import { toursList } from "@/data/tours";
import { FilterState, Tour } from "@/types/tour";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FilterSidebar } from "@/components/catalog/FilterSidebar";
import { TourGrid } from "@/components/catalog/TourGrid";
import { MapPin, Compass } from "lucide-react";

const INITIAL_FILTERS: FilterState = {
  searchQuery: "",
  category: "",
  minPrice: 0,
  maxPrice: 300,
  duration: [],
  minRating: 0,
  freeCancellationOnly: false,
  likelyToSellOutOnly: false,
  sortBy: "featured",
};

export default function CatalogPage() {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("search");
      if (q) {
        setFilters((prev) => ({ ...prev, searchQuery: q }));
      }
    }

    const handleHeaderSearch = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setFilters((prev) => ({ ...prev, searchQuery: customEvent.detail }));
    };

    window.addEventListener("header_search", handleHeaderSearch);
    return () => window.removeEventListener("header_search", handleHeaderSearch);
  }, []);

  // Compute filtered & sorted tours
  const filteredTours = useMemo(() => {
    return toursList
      .filter((tour: Tour) => {
        // Search query match
        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.toLowerCase();
          const matchesTitle = tour.title.toLowerCase().includes(q);
          const matchesDesc = tour.description.toLowerCase().includes(q);
          const matchesCategory = tour.categories.some((c) =>
            c.toLowerCase().includes(q)
          );
          if (!matchesTitle && !matchesDesc && !matchesCategory) return false;
        }

        // Category filter
        if (filters.category && !tour.categories.includes(filters.category)) {
          return false;
        }

        // Max price filter
        if (tour.price > filters.maxPrice) {
          return false;
        }

        // Min rating filter
        if (filters.minRating > 0 && tour.rating < filters.minRating) {
          return false;
        }

        // Free cancellation filter
        if (filters.freeCancellationOnly && !tour.freeCancellation) {
          return false;
        }

        // Likely to sell out filter
        if (
          filters.likelyToSellOutOnly &&
          !tour.badges.includes("Likely to Sell Out")
        ) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === "price-asc") return a.price - b.price;
        if (filters.sortBy === "price-desc") return b.price - a.price;
        if (filters.sortBy === "rating") return b.rating - a.rating;
        // Default "featured": prioritize Versailles tour and top rated
        if (a.slug === "versailles-palace-tour") return -1;
        if (b.slug === "versailles-palace-tour") return 1;
        return b.reviewCount - a.reviewCount;
      });
  }, [filters]);

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-16">
        {/* Breadcrumb Trail */}
        <Breadcrumbs
          items={[
            { label: "France", href: "/" },
            { label: "Île-de-France", href: "/" },
            { label: "Paris", href: "/" },
            { label: "Paris Tours" },
          ]}
        />

        {/* Clean Header Title */}
        <div className="pt-2 pb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            All Paris Tours & Excursions in 2026
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Top-rated sightseeing, skip-the-line admissions, and day trips in Paris and Île-de-France.
          </p>
        </div>

        {/* Main Content Layout: Sidebar + Grid */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          <FilterSidebar
            filters={filters}
            onChange={setFilters}
            onReset={handleResetFilters}
            totalResults={filteredTours.length}
          />

          <TourGrid
            tours={filteredTours}
            totalCount={toursList.length}
            sortBy={filters.sortBy}
            onSortChange={(sort) => setFilters({ ...filters, sortBy: sort })}
            onResetFilters={handleResetFilters}
          />
        </div>

        {/* Informative Paris Travel Guide Section */}
        <section className="mt-16 sm:mt-20 pt-8 sm:pt-12 border-t border-neutral-200">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-4">
              Planning Your Paris Excursions & Day Trips
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-neutral-600 leading-relaxed">
              <div>
                <h3 className="font-bold text-neutral-800 text-xs sm:text-sm mb-2 flex items-center">
                  <MapPin className="w-4 h-4 text-brand-primary mr-1.5 flex-shrink-0" />
                  <span>Why Book Ahead in Paris?</span>
                </h3>
                <p>
                  Major Parisian monuments—including the Palace of Versailles, the Louvre Museum, the Catacombs, and the Eiffel Tower summit—strictly mandate timed reservations. Booking verified guided tours guarantees your time slot, skips general ticket queues, and offers expert historical narratives.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-neutral-800 text-xs sm:text-sm mb-2 flex items-center">
                  <Compass className="w-4 h-4 text-brand-primary mr-1.5 flex-shrink-0" />
                  <span>Top Day Trips Beyond Paris</span>
                </h3>
                <p>
                  While central Paris holds boundless charm, legendary destinations like Versailles, Monet’s Giverny gardens, the Mont-Saint-Michel abbey, and Champagne vineyards are all within easy reach via comfortable executive coaches.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
