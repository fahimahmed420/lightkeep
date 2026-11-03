import Link from "next/link";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full px-5 sm:px-8 ${/max-w-/.test(className) ? "" : "max-w-7xl"} ${className}`}>{children}</div>;
}

export function Kicker({ children, light = false, className = "" }: { children: ReactNode; light?: boolean; className?: string }) {
  return (
    <p className={`flex items-center gap-2.5 font-mono text-xs font-medium uppercase tracking-[0.2em] ${light ? "text-signal-3" : "text-signal"} ${className}`}>
      <span aria-hidden="true" className="h-px w-5 bg-current opacity-70" />
      {children}
    </p>
  );
}

export function SectionHead({ kicker, title, intro, center = false, light = false, size = "md" }: { kicker: string; title: ReactNode; intro?: string; center?: boolean; light?: boolean; size?: "md" | "lg" }) {
  const h = size === "lg" ? "text-[2.6rem] sm:text-6xl lg:text-7xl" : "text-[2.4rem] sm:text-5xl lg:text-[3.6rem]";
  return (
    <div data-reveal className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <Kicker light={light} className={center ? "justify-center" : ""}>
        {kicker}
      </Kicker>
      <h2 className={`mt-4 leading-[1.02] ${h} ${light ? "text-white" : "text-ink"}`}>{title}</h2>
      {intro && <p className={`mt-5 text-lg leading-relaxed lg:text-xl ${light ? "text-fog" : "text-muted"}`}>{intro}</p>}
    </div>
  );
}

const base = "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.95rem] font-medium transition-all duration-200";
const styles = {
  primary: "bg-ink text-white shadow-[0_1px_0_rgb(255_255_255/0.1)_inset,0_8px_20px_-10px_rgb(17_26_23/0.6)] hover:bg-signal-2 hover:shadow-[var(--shadow-glow)]",
  signal: "bg-signal text-white hover:bg-signal-2 hover:shadow-[var(--shadow-glow)]",
  outline: "border border-line-2 bg-white text-ink hover:border-ink",
  ghostLight: "border border-white/25 text-white hover:bg-white hover:text-ink",
  white: "bg-white text-ink hover:bg-signal-soft",
};

export function Button({ href, children, variant = "primary", className = "" }: { href: string; children: ReactNode; variant?: keyof typeof styles; className?: string }) {
  return (
    <Link href={href} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export function ArrowRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={`${className} transition-transform duration-200 group-hover:translate-x-0.5`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

export function Check({ className = "h-4 w-4 text-signal" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={`shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export function StatusDot({ status = "up", pulse = false }: { status?: "up" | "degraded" | "down"; pulse?: boolean }) {
  const c = { up: "bg-signal text-signal", degraded: "bg-amber text-amber", down: "bg-red text-red" }[status];
  return <span aria-hidden="true" className={`relative inline-block h-2 w-2 shrink-0 rounded-full ${c} ${pulse ? "pulse" : ""}`} />;
}

/** Big page opener used by every secondary page. */
export function PageIntro({ kicker, title, intro, children, aside }: { kicker: string; title: ReactNode; intro: string; children?: ReactNode; aside?: ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div aria-hidden="true" className="dots dots-fade absolute inset-0" />
      <Container className={`relative pb-16 pt-14 sm:pb-20 sm:pt-20 lg:pt-24 ${aside ? "grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]" : ""}`}>
        <div className="max-w-3xl">
          <Kicker>{kicker}</Kicker>
          <h1 className="fade-up mt-5 text-[3rem] leading-[0.98] sm:text-6xl lg:text-[5.2rem]" style={{ ["--d" as string]: "60ms" }}>
            {title}
          </h1>
          <p className="fade-up mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl lg:text-[1.35rem]" style={{ ["--d" as string]: "140ms" }}>
            {intro}
          </p>
          {children && (
            <div className="fade-up mt-8 flex flex-wrap gap-3" style={{ ["--d" as string]: "220ms" }}>
              {children}
            </div>
          )}
        </div>
        {aside && (
          <div className="fade-up" style={{ ["--d" as string]: "260ms" }}>
            {aside}
          </div>
        )}
      </Container>
    </section>
  );
}

export function formatDate(d?: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}
