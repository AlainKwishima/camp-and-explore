"use client";

import React, { useState } from "react";
import { TourDetail } from "@/types/tour";
import { Smartphone, Clock, Globe2, ShieldCheck, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";

interface TourOverviewProps {
  tour: TourDetail;
}

export function TourOverview({ tour }: TourOverviewProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="overview" className="scroll-mt-32 pb-8 border-b border-neutral-200 space-y-6">
      {/* 4 Quick Facts Feature Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 bg-neutral-50 border border-neutral-200 rounded-xl p-3 sm:p-4">
        <div className="flex items-center space-x-2.5 p-1.5 sm:p-0 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-brand-light/80 flex items-center justify-center flex-shrink-0">
            <Smartphone className="w-4 h-4 text-brand-primary" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] sm:text-[11px] text-neutral-500 block leading-tight truncate">Ticket Type</span>
            <span className="text-xs font-bold text-neutral-900 block truncate">Mobile Ticket</span>
          </div>
        </div>

        <div className="flex items-center space-x-2.5 p-1.5 sm:p-0 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-brand-light/80 flex items-center justify-center flex-shrink-0">
            <Clock className="w-4 h-4 text-brand-primary" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] sm:text-[11px] text-neutral-500 block leading-tight truncate">Duration</span>
            <span className="text-xs font-bold text-neutral-900 block truncate">{tour.duration}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2.5 p-1.5 sm:p-0 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-brand-light/80 flex items-center justify-center flex-shrink-0">
            <Globe2 className="w-4 h-4 text-brand-primary" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] sm:text-[11px] text-neutral-500 block leading-tight truncate">Languages</span>
            <span className="text-xs font-bold text-neutral-900 block truncate">English, Kinyarwanda, French</span>
          </div>
        </div>

        <div className="flex items-center space-x-2.5 p-1.5 sm:p-0 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-brand-light/80 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-4 h-4 text-brand-primary" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] sm:text-[11px] text-neutral-500 block leading-tight truncate">Cancellation</span>
            <span className="text-xs font-bold text-brand-primary block truncate">Free up to 24h</span>
          </div>
        </div>
      </div>

      {/* Why Choose This Tour Card */}
      <div className="bg-brand-light/60 border border-brand-primary/20 rounded-xl p-4 sm:p-5">
        <h3 className="text-xs sm:text-sm font-bold text-brand-dark mb-3 flex items-center">
          <CheckCircle2 className="w-4 h-4 text-brand-primary mr-2 flex-shrink-0" />
          <span>Why Travelers Choose This Experience</span>
        </h3>
        <ul className="space-y-2">
          {tour.whyChooseThis.map((item, idx) => (
            <li key={idx} className="text-xs text-neutral-800 flex items-start space-x-2">
              <span className="text-brand-primary font-bold leading-none mt-1">•</span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Overview Description with Expand/Collapse */}
      <div>
        <h2 className="text-base sm:text-lg font-bold text-neutral-900 mb-2.5">Overview</h2>
        <div
          className={`text-xs sm:text-sm text-neutral-700 leading-relaxed space-y-3 whitespace-pre-line ${
            !expanded ? "line-clamp-4" : ""
          }`}
        >
          {tour.overview}
        </div>
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-xs font-bold text-brand-primary hover:text-brand-hover inline-flex items-center space-x-1 transition-colors py-1"
        >
          <span>{expanded ? "Read less" : "Read more"}</span>
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Highlights List */}
      <div>
        <h3 className="text-sm font-bold text-neutral-900 mb-3">Tour Highlights</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {tour.highlights.map((h, i) => (
            <li key={i} className="text-xs text-neutral-700 flex items-start space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-primary mt-0.5 flex-shrink-0" />
              <span className="leading-relaxed">{h}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
