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

  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
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
          placeholder="Search docs"
          className="min-h-11 w-full rounded-full border border-line bg-white pl-10 pr-4 text-base outline-none focus:border-ink"
        />
      </div>
      <nav aria-label="Documentation" className="mt-6 space-y-6">
        {filtered.map((g) => (
          <div key={g.id}>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">{g.name}</p>
            <ul className="mt-2 space-y-0.5">
              {g.pages.map((p) => {
                const href = `/docs/${p.slug}`;
                const active = pathname === href;
                return (
                  <li key={p.slug}>
                    <Link
                      href={href}
                      aria-current={active ? "page" : undefined}
                      className={`flex min-h-10 items-center rounded-lg px-3 text-[0.95rem] transition-colors ${active ? "bg-signal-soft font-medium text-signal-2" : "text-ink-2 hover:bg-cloud"}`}
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
