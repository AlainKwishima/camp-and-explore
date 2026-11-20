"use client";

import React, { useState, useEffect } from "react";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "inclusions", label: "What's Included" },
  { id: "itinerary", label: "Itinerary" },
  { id: "meeting-point", label: "Meeting Point" },
  { id: "reviews", label: "Reviews" },
  { id: "faqs", label: "FAQs" },
];

export function TourNavigationTabs() {
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 130;
      for (let i = TABS.length - 1; i >= 0; i--) {
        const el = document.getElementById(TABS[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveTab(TABS[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 115;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveTab(id);
    }
  };

  return (
    <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-neutral-200 py-2.5 my-2 -mx-4 px-4 sm:mx-0 sm:px-0">
      <div className="flex items-center space-x-1.5 sm:space-x-2 overflow-x-auto no-scrollbar text-xs sm:text-sm font-semibold">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <a
              key={tab.id}
              href={`#${tab.id}`}
              onClick={(e) => scrollToSection(e, tab.id)}
              className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all ${
                isActive
                  ? "bg-neutral-900 text-white shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
              }`}
            >
              {tab.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
