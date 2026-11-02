/** Lightkeep mark: a lighthouse beam as a signal arc. */
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <svg aria-hidden="true" viewBox="0 0 32 32" className="h-8 w-8 shrink-0">
        <rect width="32" height="32" rx="9" className={light ? "fill-white" : "fill-ink"} />
        <path d="M13.5 25h5l-1-11h-3Z" className={light ? "fill-ink" : "fill-white"} />
        <circle cx="16" cy="11" r="2.6" className="fill-signal" />
        <path d="M20.5 8.2a6 6 0 0 1 0 5.6M23.6 6a10 10 0 0 1 0 10" fill="none" strokeWidth="1.8" strokeLinecap="round" className="stroke-signal" />
      </svg>
      <span className={`font-display text-[1.45rem] leading-none tracking-tight ${light ? "text-white" : "text-ink"}`} style={{ fontVariationSettings: '"opsz" 48' }}>
        Lightkeep
      </span>
    </span>
  );
}
