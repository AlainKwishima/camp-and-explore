import React from "react";
import { Check, X } from "lucide-react";

interface InclusionsExclusionsProps {
  inclusions: string[];
  exclusions: string[];
}

export function InclusionsExclusions({ inclusions, exclusions }: InclusionsExclusionsProps) {
  return (
    <section id="inclusions" className="scroll-mt-32 py-8 border-b border-neutral-200">
      <h2 className="text-base sm:text-lg font-bold text-neutral-900 mb-6">What's Included & Excluded</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {/* Included Card */}
        <div className="bg-neutral-50/70 border border-neutral-200 rounded-xl p-4 sm:p-5">
          <h3 className="text-xs sm:text-sm font-bold text-brand-dark mb-4 flex items-center">
            <span className="w-5 h-5 rounded-full bg-brand-light border border-brand-primary/20 flex items-center justify-center mr-2 flex-shrink-0">
              <Check className="w-3.5 h-3.5 text-brand-primary" />
            </span>
            <span>Included with Your Ticket</span>
          </h3>
          <ul className="space-y-2.5">
            {inclusions.map((item, idx) => (
              <li key={idx} className="text-xs text-neutral-700 flex items-start space-x-2.5">
                <Check className="w-4 h-4 text-brand-primary mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Not Included Card */}
        <div className="bg-neutral-50/70 border border-neutral-200 rounded-xl p-4 sm:p-5">
          <h3 className="text-xs sm:text-sm font-bold text-neutral-800 mb-4 flex items-center">
            <span className="w-5 h-5 rounded-full bg-neutral-200/80 flex items-center justify-center mr-2 flex-shrink-0">
              <X className="w-3.5 h-3.5 text-neutral-600" />
            </span>
            <span>Not Included</span>
          </h3>
          <ul className="space-y-2.5">
            {exclusions.map((item, idx) => (
              <li key={idx} className="text-xs text-neutral-600 flex items-start space-x-2.5">
                <X className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
