"use client";

import React, { useState } from "react";
import { FaqItem } from "@/types/tour";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

interface FaqAccordionProps {
  faqs: FaqItem[];
}

export function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    "faq-1": true,
  });

  const toggleFaq = (id: string) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="faqs" className="scroll-mt-32 py-8">
      <div className="flex items-center space-x-2 mb-6">
        <HelpCircle className="w-5 h-5 text-brand-primary flex-shrink-0" />
        <h2 className="text-base sm:text-lg font-bold text-neutral-900">Frequently Asked Questions</h2>
      </div>

      <div className="space-y-3">
        {faqs.map((faq) => {
          const isOpen = !!openItems[faq.id];
          return (
            <div
              key={faq.id}
              className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm transition-colors"
            >
              <button
                type="button"
                onClick={() => toggleFaq(faq.id)}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between text-xs sm:text-sm font-bold text-neutral-900 hover:text-brand-primary transition-colors select-none gap-3"
              >
                <span className="leading-snug">{faq.question}</span>
                <span className="p-1 rounded-full text-neutral-400 group-hover:text-neutral-700 flex-shrink-0">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
