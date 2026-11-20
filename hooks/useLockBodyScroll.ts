"use client";

import { useEffect } from "react";

/**
 * Global lock counter to handle nested or consecutive modals without scroll jumps.
 */
let activeLocks = 0;
let previousBodyOverflow = "";
let previousHtmlOverflow = "";
let previousBodyPaddingRight = "";

export function lockBodyScroll() {
  if (typeof document === "undefined" || typeof window === "undefined") return;

  if (activeLocks === 0) {
    const docEl = document.documentElement;
    const body = document.body;

    // Cache previous styling to restore accurately
    previousBodyOverflow = body.style.overflow;
    previousHtmlOverflow = docEl.style.overflow;
    previousBodyPaddingRight = body.style.paddingRight;

    // Compensate for scrollbar disappearance on desktop to avoid layout shift
    const scrollBarWidth = window.innerWidth - docEl.clientWidth;
    if (scrollBarWidth > 0) {
      body.style.paddingRight = `${scrollBarWidth}px`;
    }

    // Completely lock both body and documentElement to prevent scroll/bounce
    body.style.overflow = "hidden";
    docEl.style.overflow = "hidden";
    body.setAttribute("data-modal-open", "true");
    window.dispatchEvent(new CustomEvent("modal_visibility_change", { detail: { isOpen: true } }));
  }

  activeLocks++;
}

export function unlockBodyScroll() {
  if (typeof document === "undefined") return;

  activeLocks = Math.max(0, activeLocks - 1);

  if (activeLocks === 0) {
    const docEl = document.documentElement;
    const body = document.body;

    body.style.overflow = previousBodyOverflow;
    docEl.style.overflow = previousHtmlOverflow;
    body.style.paddingRight = previousBodyPaddingRight;
    body.removeAttribute("data-modal-open");
    window.dispatchEvent(new CustomEvent("modal_visibility_change", { detail: { isOpen: false } }));
  }
}

/**
 * Custom React Hook that disables background page scrolling whenever isLocked is true.
 * Restores scrolling normally as soon as isLocked becomes false or component unmounts.
 */
export function useLockBodyScroll(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) return;

    lockBodyScroll();

    return () => {
      unlockBodyScroll();
    };
  }, [isLocked]);
}
