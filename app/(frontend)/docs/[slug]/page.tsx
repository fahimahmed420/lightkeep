import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { formatDate, Kicker } from "@/components/ui";
import { getCMS } from "@/lib/payload";

type Props = { params: Promise<{ slug: string }> };
export const revalidate = 300;

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
  return (
    <article className="max-w-3xl">
      <Link href="/docs" className="inline-flex min-h-11 items-center text-sm text-muted hover:text-ink">
        ← Docs
      </Link>
      <Kicker>{({ start: "Getting started", monitors: "Monitors", status: "Status pages", alerts: "Alerts" } as Record<string, string>)[doc.section]}</Kicker>
      <h1 className="mt-3 text-5xl">{doc.title}</h1>
      <p className="mt-4 text-xl text-muted">{doc.description}</p>
      <RichText data={doc.content} className="rt mt-10" />
      <p className="mt-14 border-t border-line pt-6 font-mono text-xs text-muted">Last updated {formatDate(doc.updatedAt)}</p>
    </article>
  );
}
