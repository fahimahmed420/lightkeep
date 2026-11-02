import Link from "next/link";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full px-5 sm:px-8 ${/max-w-/.test(className) ? "" : "max-w-7xl"} ${className}`}>{children}</div>;
}

export function Kicker({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`font-mono text-xs font-medium uppercase tracking-[0.18em] ${light ? "text-[#7fd3ac]" : "text-signal"}`}>{children}</p>;
}

export function SectionHead({ kicker, title, intro, center = false, light = false }: { kicker: string; title: ReactNode; intro?: string; center?: boolean; light?: boolean }) {
  return (
    <div data-reveal className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <Kicker light={light}>{kicker}</Kicker>
      <h2 className={`mt-4 text-[2.3rem] leading-[1.05] sm:text-5xl lg:text-6xl ${light ? "text-white" : "text-ink"}`}>{title}</h2>
      {intro && <p className={`mt-5 text-lg leading-relaxed ${light ? "text-[#b7c4be]" : "text-muted"}`}>{intro}</p>}
    </div>
  );
}

const base = "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.95rem] font-medium transition-all duration-200";
const styles = {
  primary: "bg-ink text-white hover:bg-signal-2",
  signal: "bg-signal text-white hover:bg-signal-2",
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
  return <span aria-hidden="true" className={`relative inline-block h-2 w-2 rounded-full ${c} ${pulse ? "pulse" : ""}`} />;
}

export function PageIntro({ kicker, title, intro, children }: { kicker: string; title: ReactNode; intro: string; children?: ReactNode }) {
  return (
    <section className="dots border-b border-line">
      <Container className="pb-16 pt-16 sm:pb-20 sm:pt-24">
        <div className="max-w-3xl">
          <Kicker>{kicker}</Kicker>
          <h1 className="mt-4 text-[2.9rem] leading-[1.02] sm:text-6xl lg:text-7xl">{title}</h1>
          <p className="mt-6 text-lg leading-relaxed text-muted sm:text-xl">{intro}</p>
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
      </Container>
    </section>
  );
}

export function formatDate(d?: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}
