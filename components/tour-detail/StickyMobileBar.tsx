"use client";

import React, { useState, useEffect } from "react";
import { Calendar } from "lucide-react";

interface StickyMobileBarProps {
  price: number;
}

export function StickyMobileBar({ price }: StickyMobileBarProps) {
  const [hiddenByModal, setHiddenByModal] = useState(false);

  useEffect(() => {
    if (typeof document !== "undefined") {
      setHiddenByModal(document.body.getAttribute("data-modal-open") === "true");
    }

    const handler = (e: Event) => {
      const custom = e as CustomEvent<{ isOpen: boolean }>;
      if (custom.detail !== undefined) {
        setHiddenByModal(!!custom.detail.isOpen);
      }
    };

    window.addEventListener("modal_visibility_change", handler);
    return () => window.removeEventListener("modal_visibility_change", handler);
  }, []);

  const scrollToBooking = () => {
    const el = document.getElementById("booking-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (hiddenByModal) {
    return null;
  }

  return (
    <div
      data-sticky-mobile-bar
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 px-4 py-3 shadow-2xl flex items-center justify-between pb-[max(12px,env(safe-area-inset-bottom))]"
    >
      <div>
        <span className="text-[10px] text-neutral-500 block leading-tight">From</span>
        <div className="flex items-baseline space-x-1">
          <span className="text-xl font-extrabold text-neutral-900">${price.toFixed(2)}</span>
          <span className="text-xs text-neutral-500">/ adult</span>
        </div>
      </div>

      <button
        type="button"
        onClick={scrollToBooking}
        className="px-5 py-2.5 bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center space-x-1.5 active:scale-95"
      >
        <Calendar className="w-3.5 h-3.5" />
        <span>Check Availability</span>
      </button>
    </div>
  );
}
