"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, productLinks } from "@/content/site";
import { Container } from "./ui";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [menu, setMenu] = useState({ open: false, at: pathname });
  const [drop, setDrop] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const open = menu.open && menu.at === pathname;

  useEffect(() => {
    const on = () => setScrolled(scrollY > 8);
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const key = (e: KeyboardEvent) => e.key === "Escape" && (setMenu((m) => ({ ...m, open: false })), setDrop(false));
    addEventListener("keydown", key);
    return () => removeEventListener("keydown", key);
  }, [open]);
  useEffect(() => {
    if (!drop) return;
    const down = (e: PointerEvent) => !dropRef.current?.contains(e.target as Node) && setDrop(false);
    document.addEventListener("pointerdown", down);
    return () => document.removeEventListener("pointerdown", down);
  }, [drop]);

  const active = (h: string) => pathname === h || pathname.startsWith(h + "/");

  return (
    <header className={`sticky top-0 z-50 border-b transition-colors duration-300 ${scrolled || open ? "border-line bg-paper/90 backdrop-blur-lg" : "border-transparent bg-paper"}`}>
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" aria-label="Lightkeep home" className="py-2">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
          <div ref={dropRef} className="relative" onMouseEnter={() => setDrop(true)} onMouseLeave={() => setDrop(false)}>
            <button
              type="button"
              aria-expanded={drop}
              aria-controls="product-menu"
              onClick={() => setDrop((d) => !d)}
              className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.95rem] transition-colors hover:bg-cloud ${active("/product") ? "text-ink" : "text-muted"}`}
            >
              Product
              <svg aria-hidden="true" viewBox="0 0 24 24" className={`h-4 w-4 transition-transform ${drop ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <div id="product-menu" className={`absolute left-0 top-full w-[26rem] pt-3 transition-all duration-200 ${drop ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"}`}>
              <div className="grid gap-1 rounded-2xl border border-line bg-white p-2 shadow-[var(--shadow-float)]">
                {productLinks.map((l) => (
                  <Link key={l.label} href={l.href} onClick={() => setDrop(false)} className="rounded-xl p-3.5 transition-colors hover:bg-cloud">
                    <span className="block font-medium text-ink">{l.label}</span>
                    <span className="mt-0.5 block text-sm text-muted">{l.body}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {nav.slice(1).map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={active(l.href) ? "page" : undefined}
              className={`rounded-full px-3.5 py-2 text-[0.95rem] transition-colors hover:bg-cloud ${active(l.href) ? "text-ink" : "text-muted"}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/contact" className="rounded-full px-4 py-2 text-[0.95rem] text-ink hover:bg-cloud">
            Book a demo
          </Link>
          <Link href="/pricing" className="inline-flex min-h-10 items-center rounded-full bg-ink px-5 text-[0.95rem] font-medium text-white transition-colors hover:bg-signal-2">
            Start free
          </Link>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setMenu({ open: !open, at: pathname })}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line-2 bg-white lg:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 8h16M4 16h16" />}
          </svg>
        </button>
      </Container>

      <div id="mobile-nav" className={`overflow-hidden border-t border-line bg-paper transition-[max-height] duration-300 lg:hidden ${open ? "max-h-[calc(100dvh-4rem)] overflow-y-auto" : "max-h-0 border-transparent"}`}>
        <Container className="pb-8 pt-4">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Product</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {productLinks.map((l) => (
              <Link key={l.label} href={l.href} onClick={() => setMenu({ open: false, at: pathname })} className="rounded-xl border border-line bg-white p-3 text-sm font-medium">
                {l.label}
              </Link>
            ))}
          </div>
          <div className="mt-4 divide-y divide-line">
            {nav.slice(1).map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setMenu({ open: false, at: pathname })} className="flex min-h-13 items-center font-display text-2xl">
                {l.label}
              </Link>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Link href="/contact" onClick={() => setMenu({ open: false, at: pathname })} className="flex min-h-12 items-center justify-center rounded-full border border-line-2 bg-white font-medium">
              Book a demo
            </Link>
            <Link href="/pricing" onClick={() => setMenu({ open: false, at: pathname })} className="flex min-h-12 items-center justify-center rounded-full bg-ink font-medium text-white">
              Start free
            </Link>
          </div>
        </Container>
      </div>
    </header>
  );
}
