import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { formatDate, Kicker } from "@/components/ui";
import { getCMS } from "@/lib/payload";

type Props = { params: Promise<{ slug: string }> };
export const revalidate = 300;

const sectionNames: Record<string, string> = { start: "Getting started", monitors: "Monitors", status: "Status pages", alerts: "Alerts" };

async function load(slug: string) {
  const payload = await getCMS();
  const { docs } = await payload.find({ collection: "docs", where: { slug: { equals: slug }, _status: { equals: "published" } }, limit: 1 });
  return docs[0];
}

export async function generateStaticParams() {
  const payload = await getCMS();
  const { docs } = await payload.find({ collection: "docs", where: { _status: { equals: "published" } }, limit: 200 });
  return docs.map((d) => ({ slug: d.slug ?? "" }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const doc = await load((await params).slug);
  return doc ? { title: `${doc.title} · Docs`, description: doc.description } : { title: "Not found" };
}

export default async function DocPage({ params }: Props) {
  const doc = await load((await params).slug);
  if (!doc) notFound();
  const payload = await getCMS();
  const { docs: all } = await payload.find({ collection: "docs", where: { _status: { equals: "published" } }, sort: "order", limit: 200 });
  const i = all.findIndex((d) => d.id === doc.id);
  const prev = i > 0 ? all[i - 1] : null;
  const next = i >= 0 && i < all.length - 1 ? all[i + 1] : null;

  return (
    <article className="max-w-3xl">
      <nav aria-label="Breadcrumb" className="flex min-h-11 items-center gap-2 font-mono text-xs text-muted">
        <Link href="/docs" className="inline-flex min-h-11 min-w-11 items-center hover:text-ink">
          Docs
        </Link>
        <span aria-hidden="true">/</span>
        <span>{sectionNames[doc.section] ?? doc.section}</span>
      </nav>
      <Kicker className="mt-4">{sectionNames[doc.section] ?? doc.section}</Kicker>
      <h1 className="fade-up mt-3 text-5xl lg:text-6xl">{doc.title}</h1>
      <p className="fade-up mt-4 text-xl text-muted lg:text-[1.35rem]" style={{ ["--d" as string]: "80ms" }}>
        {doc.description}
      </p>
      <RichText data={doc.content} className="rt mt-10" />
      <p className="mt-14 border-t border-line pt-6 font-mono text-xs text-muted">Last updated {formatDate(doc.updatedAt)}</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {prev ? (
          <Link href={`/docs/${prev.slug}`} className="group rounded-2xl border border-line bg-white p-5 transition-colors hover:border-ink">
            <span className="font-mono text-xs text-muted">← Previous</span>
            <span className="mt-1 block font-medium group-hover:text-signal-2">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={`/docs/${next.slug}`} className="group rounded-2xl border border-line bg-white p-5 text-right transition-colors hover:border-ink">
            <span className="font-mono text-xs text-muted">Next →</span>
            <span className="mt-1 block font-medium group-hover:text-signal-2">{next.title}</span>
          </Link>
        )}
      </div>
    </article>
  );
}
