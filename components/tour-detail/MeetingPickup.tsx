import React from "react";
import { MapPin, Navigation, Info, ExternalLink } from "lucide-react";

interface DepartureDetailsData {
  meetingPoint: string;
  meetingAddress: string;
  pickupNotes: string;
  returnDetails: string;
}

interface MeetingPickupProps {
  details?: DepartureDetailsData;
  departureDetails?: DepartureDetailsData;
}

export function MeetingPickup({ details, departureDetails }: MeetingPickupProps) {
  const d = details || departureDetails || {
    meetingPoint: "Camp & Explorer Base Pavilion",
    meetingAddress: "Mount Jali Road, Jali Sector, Gasabo District, Kigali, Rwanda",
    pickupNotes: "Located 15 minutes north of Nyabugogo, central Kigali. Accessible by taxi, car, or moto. Private transfers arranged via WhatsApp (+250 788 621 474).",
    returnDetails: "Returns to the departure point at Camp & Explorer Base.",
  };

  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(`${d.meetingPoint}, ${d.meetingAddress}`)}`;

  return (
    <section id="meeting-point" className="scroll-mt-32 py-8 border-b border-neutral-200">
      <h2 className="text-base sm:text-lg font-bold text-neutral-900 mb-6 font-display">Meeting & Departure Details</h2>

      <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
        {/* Map Preview Banner */}
        <div className="relative h-44 sm:h-48 bg-neutral-100 flex items-center justify-center border-b border-neutral-200 overflow-hidden">
          {/* Subtle stylized grid map pattern */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#00875a_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="text-center z-10 px-4 max-w-md">
            <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center mx-auto mb-2 shadow-md">
              <MapPin className="w-5 h-5 fill-current" />
            </div>
            <p className="text-xs font-bold text-neutral-900 leading-snug">{d.meetingPoint}</p>
            <p className="text-[11px] text-neutral-500 mt-0.5">{d.meetingAddress}</p>
            <a
              href={mapsUrl}
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
              <h4 className="text-xs font-bold text-neutral-900">Directions & Location</h4>
              <p className="text-xs text-neutral-600 mt-1 leading-relaxed">{d.meetingAddress}</p>
              <p className="text-[11px] text-neutral-500 mt-0.5">
                {d.pickupNotes}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 pt-3 border-t border-neutral-100">
            <Info className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" />
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-neutral-900">End Point</h4>
              <p className="text-xs text-neutral-600 mt-0.5">{d.returnDetails}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
