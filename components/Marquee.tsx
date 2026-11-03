import { logos } from "@/content/site";

/** Customer logo strip. The list is duplicated so the CSS loop is seamless; reduced motion wraps it instead. */
export function LogoMarquee({ label = "Trusted by product teams at" }: { label?: string }) {
  const items = [...logos, ...logos];
  return (
    <div className="border-y border-line bg-white py-8">
      <p className="text-center font-mono text-xs uppercase tracking-[0.2em] text-muted">{label}</p>
      <div className="relative mt-5 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <ul className="marquee flex w-max items-center gap-14 px-7" aria-label="Customers">
          {items.map((l, i) => (
            <li key={i} aria-hidden={i >= logos.length} className="font-display text-2xl text-ink/50 transition-colors hover:text-ink" style={{ fontStyle: i % 3 === 0 ? "italic" : "normal", fontWeight: i % 2 ? 600 : 400, fontVariationSettings: '"opsz" 48' }}>
              {l}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
