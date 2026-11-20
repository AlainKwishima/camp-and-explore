"use client";

import React, { useState } from "react";
import { ItineraryStop } from "@/types/tour";
import { Clock, Ticket, ChevronDown, ChevronUp } from "lucide-react";

interface ItineraryTimelineProps {
  stops: ItineraryStop[];
  totalDuration: string;
}

export function ItineraryTimeline({ stops, totalDuration }: ItineraryTimelineProps) {
  // Store expanded state per stop; first 3 open by default
  const [openStops, setOpenStops] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: true,
    3: false,
    4: false,
  });

  const toggleStop = (index: number) => {
    setOpenStops((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <section id="itinerary" className="scroll-mt-32 py-8 border-b border-neutral-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-neutral-900">Tour Itinerary</h2>
          <p className="text-xs text-neutral-500 mt-1">
            Total duration: {totalDuration} • {stops.length} major stops and landmarks
          </p>
        </div>
      </div>

      <div className="relative pl-8 sm:pl-10 space-y-5 before:absolute before:left-[13px] before:top-3 before:bottom-3 before:w-[2px] before:bg-neutral-200">
        {stops.map((stop, idx) => {
          const isOpen = !!openStops[idx];
          return (
            <div key={stop.stopNumber} className="relative group">
              {/* Timeline numbered bubble */}
              <div className="absolute -left-8 sm:-left-10 top-0.5 w-7 h-7 rounded-full bg-neutral-900 text-white font-bold text-xs flex items-center justify-center ring-4 ring-white shadow-sm flex-shrink-0">
                {stop.stopNumber}
              </div>

              {/* Stop Card */}
              <div className="bg-white border border-neutral-200 rounded-xl p-4 sm:p-5 shadow-sm hover:border-neutral-300 transition-colors">
                <div
                  onClick={() => toggleStop(idx)}
                  className="flex items-start justify-between cursor-pointer select-none gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-neutral-500 mb-1.5">
                      <span className="flex items-center font-medium">
                        <Clock className="w-3.5 h-3.5 mr-1 text-neutral-400 flex-shrink-0" />
                        <span>{stop.duration}</span>
                      </span>
                      {stop.admissionIncluded && (
                        <span className="inline-flex items-center text-brand-dark bg-brand-light px-2 py-0.5 rounded font-semibold text-[10px] border border-brand-primary/20">
                          <Ticket className="w-3 h-3 mr-1 text-brand-primary flex-shrink-0" />
                          <span>Admission Included</span>
                        </span>
                      )}
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-neutral-900 leading-snug">
                      {stop.title}
                    </h3>
                  </div>

                  <button
                    type="button"
                    aria-label={isOpen ? "Collapse stop details" : "Expand stop details"}
                    className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 flex-shrink-0 mt-0.5"
                  >
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {isOpen && (
                  <div className="mt-3 pt-3 border-t border-neutral-100 text-xs text-neutral-600 leading-relaxed">
                    {stop.description}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
