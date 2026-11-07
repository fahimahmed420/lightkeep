import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Kicker } from "@/components/ui";
import { getCMS } from "@/lib/payload";

export const metadata: Metadata = { title: "Documentation", description: "Set up monitors, alerts and status pages with Lightkeep." };
export const revalidate = 300;

const sectionNames: Record<string, string> = { start: "Getting started", monitors: "Monitors", status: "Status pages", alerts: "Alerts" };
const sectionGlyph: Record<string, string> = { start: "▶", monitors: "◉", status: "▣", alerts: "◆" };

export default async function DocsHome() {
  const payload = await getCMS();
  const { docs } = await payload.find({ collection: "docs", where: { _status: { equals: "published" } }, sort: "order", limit: 200 });
  const first = docs[0];
  return (
    <div>
      <Kicker>Documentation</Kicker>
      <h1 className="fade-up mt-4 text-5xl sm:text-6xl lg:text-7xl">Learn Lightkeep.</h1>
      <p className="fade-up mt-5 max-w-2xl text-lg text-muted lg:text-xl" style={{ ["--d" as string]: "80ms" }}>
        Everything you need to monitor your services, alert the right people and keep customers informed.
      </p>
      {first && (
        <Link href={`/docs/${first.slug}`} className="hairline fade-up group mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-night px-6 py-5 text-white" style={{ ["--d" as string]: "160ms" }}>
          <span>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-signal-3">Start here</span>
            <span className="mt-1 block text-xl">{first.title}</span>
          </span>
          <span className="inline-flex items-center gap-2 font-medium text-signal-3">
            Read <ArrowRight />
          </span>
        </Link>
      )}
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {docs.map((d, i) => (
          <Link key={d.id} href={`/docs/${d.slug}`} data-reveal style={{ ["--d" as string]: `${(i % 2) * 70}ms` }} className="group rounded-2xl border border-line bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]">
            <p className="flex items-center gap-2 font-mono text-[0.75rem] uppercase tracking-[0.2em] text-signal">
              <span aria-hidden="true">{sectionGlyph[d.section] ?? "•"}</span> {sectionNames[d.section] ?? d.section}
            </p>
            <h2 className="mt-3 text-2xl group-hover:text-signal-2">{d.title}</h2>
            <p className="mt-2 text-muted">{d.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
