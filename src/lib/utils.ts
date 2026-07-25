import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function scrollToSection(id: string) {
  const el = document.querySelector(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/**
 * Smooth-scroll on the homepage; otherwise navigate to `/#section` so hash
 * links work from project pages and other routes.
 */
export function navigateToSection(hash: string) {
  if (typeof window === "undefined") return;
  const normalized = hash.startsWith("#") ? hash : `#${hash}`;
  const onHome =
    window.location.pathname === "/" || window.location.pathname === "";

  if (onHome) {
    scrollToSection(normalized);
    window.history.replaceState(null, "", normalized);
    return;
  }

  window.location.assign(`/${normalized}`);
}


