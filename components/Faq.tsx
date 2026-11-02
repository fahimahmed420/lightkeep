"use client";

import { useId, useState } from "react";

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q}>
            <h3>
              <button
                type="button"
                id={`${id}-q${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-a${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left font-display text-xl sm:text-2xl"
              >
                {f.q}
                <span aria-hidden="true" className={`relative h-4 w-4 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
                  <span className="absolute left-0 top-1/2 h-px w-4 bg-ink" />
                  <span className="absolute left-1/2 top-0 h-4 w-px bg-ink" />
                </span>
              </button>
            </h3>
            <div id={`${id}-a${i}`} role="region" aria-labelledby={`${id}-q${i}`} className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="overflow-hidden">
                <p className="pb-6 pr-10 text-lg leading-relaxed text-muted">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
