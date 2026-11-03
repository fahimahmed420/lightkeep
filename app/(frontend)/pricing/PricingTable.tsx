"use client";

import Link from "next/link";
import { useState } from "react";
import { plans } from "@/content/site";
import { Check } from "@/components/ui";

export function PricingTable() {
  const [annual, setAnnual] = useState(true);
  return (
    <div>
      <div className="flex justify-center">
        <div role="radiogroup" aria-label="Billing period" className="inline-flex rounded-full border border-line bg-white p-1 shadow-[var(--shadow-card)]">
          {[
            [false, "Monthly"],
            [true, "Annual · save 17%"],
          ].map(([v, label]) => (
            <button
              key={String(v)}
              type="button"
              role="radio"
              aria-checked={annual === v}
              onClick={() => setAnnual(v as boolean)}
              className={`min-h-11 rounded-full px-5 text-sm font-medium transition-colors ${annual === v ? "bg-ink text-white" : "text-muted hover:text-ink"}`}
            >
              {label as string}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-12 grid gap-5 lg:grid-cols-3 lg:items-stretch">
        {plans.map((p, i) => {
          const price = annual ? p.annual : p.monthly;
          return (
            <div
              key={p.id}
              data-reveal
              style={{ ["--d" as string]: `${i * 80}ms` }}
              className={`relative flex flex-col rounded-3xl p-8 ${p.highlight ? "hairline night-glow bg-night text-white shadow-[var(--shadow-float)] lg:-my-5 lg:py-[3.25rem]" : "border border-line bg-white"}`}
            >
              {p.highlight && <span className="absolute -top-3 left-8 rounded-full bg-signal px-3 py-1 font-mono text-xs text-white shadow-[var(--shadow-glow)]">Most popular</span>}
              <p className={`font-mono text-xs uppercase tracking-[0.2em] ${p.highlight ? "text-signal-3" : "text-signal"}`}>{p.name}</p>
              <p className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-[4.2rem] leading-none tabular-nums lg:text-7xl">${price}</span>
                <span className="opacity-60">/ month</span>
              </p>
              <p className={`mt-2 font-mono text-xs ${p.highlight ? "text-fog" : "text-muted"}`}>{price === 0 ? "Free forever" : annual ? `Billed $${price * 12} yearly` : "Billed monthly"}</p>
              <p className={`mt-5 text-lg ${p.highlight ? "text-[#dfe7e3]" : "text-ink-2"}`}>{p.blurb}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <Check className={`h-4 w-4 ${p.highlight ? "text-signal-3" : "text-signal"}`} /> {f}
                  </li>
                ))}
              </ul>
              <Link
                href={p.id === "business" ? "/contact" : `/contact?plan=${p.id}`}
                className={`mt-8 inline-flex min-h-12 items-center justify-center rounded-full font-medium transition-all ${p.highlight ? "bg-signal text-white hover:bg-white hover:text-ink hover:shadow-[var(--shadow-glow)]" : "border border-line-2 hover:border-ink"}`}
              >
                {p.cta}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
