"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Scroll reveal for every [data-reveal] element. Content stays visible without JS:
 * the "js" class (which enables the hidden start state) is only added once this runs.
 */
export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    const els = document.querySelectorAll("[data-reveal]:not(.in)");
    // Anything already on screen is shown immediately so nothing flashes.
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > 0) el.classList.add("in");
      else io.observe(el);
    });
    root.classList.add("js");
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
