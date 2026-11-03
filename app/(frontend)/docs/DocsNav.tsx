"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type Group = { id: string; name: string; pages: { slug: string; title: string; description: string }[] };

/** Docs sidebar with instant search over titles and descriptions. */
export function DocsNav({ groups }: { groups: Group[] }) {
  const pathname = usePathname();
  const [q, setQ] = useState("");
  const term = q.trim().toLowerCase();
  const filtered = groups
    .map((g) => ({ ...g, pages: g.pages.filter((p) => !term || p.title.toLowerCase().includes(term) || p.description.toLowerCase().includes(term)) }))
    .filter((g) => g.pages.length);
  const total = groups.reduce((n, g) => n + g.pages.length, 0);

  return (
    <aside className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto lg:pr-2">
      <label htmlFor="doc-search" className="sr-only">
        Search docs
      </label>
      <div className="relative">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          id="doc-search"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={`Search ${total} pages`}
          className="min-h-11 w-full rounded-xl border border-line bg-white pl-10 pr-12 text-base shadow-[var(--shadow-card)] outline-none transition-colors focus:border-ink"
        />
        <kbd aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-line bg-cloud px-1.5 font-mono text-[0.7rem] text-muted sm:block">
          /
        </kbd>
      </div>
      <nav aria-label="Documentation" className="mt-6 space-y-6">
        {filtered.map((g) => (
          <div key={g.id}>
            <p className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted">
              <span aria-hidden="true" className="h-px w-3 bg-current opacity-60" />
              {g.name}
            </p>
            <ul className="mt-2 space-y-0.5 border-l border-line">
              {g.pages.map((p) => {
                const href = `/docs/${p.slug}`;
                const active = pathname === href;
                return (
                  <li key={p.slug}>
                    <Link
                      href={href}
                      aria-current={active ? "page" : undefined}
                      className={`-ml-px flex min-h-10 items-center border-l-2 pl-4 pr-3 text-[0.95rem] transition-colors ${active ? "border-signal font-medium text-signal-2" : "border-transparent text-ink-2 hover:border-line-2 hover:text-ink"}`}
                    >
                      {p.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
        {!filtered.length && <p className="text-sm text-muted">No pages match “{q}”.</p>}
      </nav>
    </aside>
  );
}
