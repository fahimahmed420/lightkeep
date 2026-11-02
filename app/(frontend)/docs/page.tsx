import type { Metadata } from "next";
import Link from "next/link";
import { Kicker } from "@/components/ui";
import { getCMS } from "@/lib/payload";

export const metadata: Metadata = { title: "Documentation", description: "Set up monitors, alerts and status pages with Lightkeep." };
export const revalidate = 300;

export default async function DocsHome() {
  const payload = await getCMS();
  const { docs } = await payload.find({ collection: "docs", where: { _status: { equals: "published" } }, sort: "order", limit: 200 });
  return (
    <div>
      <Kicker>Documentation</Kicker>
      <h1 className="mt-4 text-5xl sm:text-6xl">Learn Lightkeep.</h1>
      <p className="mt-5 max-w-2xl text-lg text-muted">Everything you need to monitor your services, alert the right people and keep customers informed.</p>
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {docs.map((d) => (
          <Link key={d.id} href={`/docs/${d.slug}`} className="group rounded-2xl border border-line bg-white p-6 transition-shadow hover:shadow-[var(--shadow-card)]">
            <h2 className="text-2xl group-hover:text-signal-2">{d.title}</h2>
            <p className="mt-2 text-muted">{d.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
