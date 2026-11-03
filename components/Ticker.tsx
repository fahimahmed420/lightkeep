"use client";

import { useEffect, useState } from "react";

/**
 * A response-time figure that drifts a few milliseconds every couple of seconds,
 * so the dashboard mock reads as live. Server renders the base value.
 */
export function Ticker({ base, spread = 9, suffix = " ms", className = "", interval = 2200 }: { base: number; spread?: number; suffix?: string; className?: string; interval?: number }) {
  const [v, setV] = useState(base);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setV(base + Math.round((Math.random() - 0.5) * 2 * spread)), interval);
    return () => clearInterval(id);
  }, [base, spread, interval]);
  return (
    <span className={`tabular ${className}`}>
      {v}
      {suffix}
    </span>
  );
}
