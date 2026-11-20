"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Search, X } from "lucide-react";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("search");
      if (q) setQuery(q);
    }
  }, []);

  const handleSearchChange = (val: string) => {
    setQuery(val);
    if (pathname === "/") {
      window.dispatchEvent(new CustomEvent("header_search", { detail: val }));
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pathname === "/") {
      window.dispatchEvent(new CustomEvent("header_search", { detail: query }));
    } else {
      router.push(`/?search=${encodeURIComponent(query)}`);
    }
  };

  const handleClear = () => {
    setQuery("");
    if (pathname === "/") {
      window.dispatchEvent(new CustomEvent("header_search", { detail: "" }));
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3 sm:gap-6">
          {/* Left: Camp & Explorer Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2.5 sm:space-x-3 group flex-shrink-0"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 overflow-hidden rounded-lg border border-neutral-200/80 shadow-xs flex-shrink-0 bg-white">
              <Image
                src="/images/logo.jpg"
                alt="Camp & Explorer"
                fill
                priority
                className="object-contain p-0.5"
              />
            </div>
            <span className="font-extrabold text-sm sm:text-lg tracking-tight text-neutral-900 group-hover:text-brand-primary transition-colors whitespace-nowrap">
              Camp & Explorer
            </span>
          </Link>

          {/* Search Bar Only */}
          <div className="flex-1 max-w-md sm:max-w-lg md:max-w-xl ml-auto">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search tours, activities..."
                value={query}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-9 py-2 text-xs sm:text-sm bg-neutral-50 hover:bg-neutral-100/80 focus:bg-white border border-neutral-300 focus:border-brand-primary rounded-full outline-none transition-all placeholder:text-neutral-400 text-neutral-800 shadow-xs"
              />
              {query && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-neutral-400 hover:text-neutral-700 rounded-full"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}
