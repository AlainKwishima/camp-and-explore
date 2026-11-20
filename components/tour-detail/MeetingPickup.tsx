import React from "react";
import { MapPin, Navigation, Info, ExternalLink } from "lucide-react";

interface MeetingPickupProps {
  details: {
    meetingPoint: string;
    meetingAddress: string;
    pickupNotes: string;
    returnDetails: string;
  };
}

export function MeetingPickup({ details }: MeetingPickupProps) {
  return (
    <section id="meeting-point" className="scroll-mt-32 py-8 border-b border-neutral-200">
      <h2 className="text-base sm:text-lg font-bold text-neutral-900 mb-6">Meeting & Departure Details</h2>

      <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
        {/* Map Preview Banner */}
        <div className="relative h-44 sm:h-48 bg-neutral-100 flex items-center justify-center border-b border-neutral-200 overflow-hidden">
          {/* Subtle stylized grid map pattern */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#00875a_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="text-center z-10 px-4 max-w-md">
            <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center mx-auto mb-2 shadow-md">
              <MapPin className="w-5 h-5 fill-current" />
            </div>
            <p className="text-xs font-bold text-neutral-900 leading-snug">{details.meetingPoint}</p>
            <p className="text-[11px] text-neutral-500 mt-0.5">{details.meetingAddress}</p>
            <a
              href="https://maps.google.com/?q=18+Avenue+de+Suffren+75015+Paris"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center space-x-1.5 text-xs font-bold text-brand-primary hover:text-brand-hover bg-white px-3.5 py-1.5 rounded-full shadow-sm border border-neutral-200 transition-colors"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </a>
          </div>
        </div>

        {/* Meeting Information Details */}
        <div className="p-4 sm:p-5 space-y-4">
          <div className="flex items-start space-x-3">
            <Navigation className="w-4 h-4 text-brand-primary mt-0.5 flex-shrink-0" />
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-neutral-900">Meeting Point Directions</h4>
              <p className="text-xs text-neutral-600 mt-1 leading-relaxed">{details.meetingAddress}</p>
              <p className="text-[11px] text-neutral-500 mt-0.5">
                Nearest Metro: Bir-Hakeim (Line 6) or Champ de Mars-Tour Eiffel (RER C). 5-minute walk.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 pt-3 border-t border-neutral-100">
            <Info className="w-4 h-4 text-brand-primary mt-0.5 flex-shrink-0" />
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-neutral-900">Coordinator Check-in</h4>
              <p className="text-xs text-neutral-600 mt-1 leading-relaxed">{details.pickupNotes}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
