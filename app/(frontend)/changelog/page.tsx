import type { Metadata } from "next";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { Container, PageIntro, formatDate } from "@/components/ui";
import { getCMS } from "@/lib/payload";

export const metadata: Metadata = { title: "Changelog", description: "New features, improvements and fixes, shipped every two weeks." };
export const revalidate = 300;

const tagStyle: Record<string, string> = {
  new: "bg-signal-soft text-signal-2",
  improved: "bg-[#e4ebf7] text-[#2f4f86]",
  fixed: "bg-amber-soft text-[#8a5a0d]",
};

export default async function ChangelogPage() {
  const payload = await getCMS();
  const { docs } = await payload.find({ collection: "changelog", where: { _status: { equals: "published" } }, sort: "-date", limit: 50 });
  return (
    <>
      <PageIntro kicker="Changelog" title="What's new in Lightkeep." intro="We ship every two weeks. Here's everything that changed." />
      <section className="py-16 sm:py-24">
        <Container className="max-w-4xl">
          <ol className="space-y-14">
            {docs.map((c) => (
              <li key={c.id} data-reveal className="grid gap-4 sm:grid-cols-[10rem_1fr]">
                <div className="sm:pt-2">
                  <p className="font-mono text-sm text-muted">{formatDate(c.date)}</p>
                  <p className="mt-1 font-mono text-sm text-signal">v{c.version}</p>
                </div>
                <div className="border-l border-line pl-6 sm:pl-8">
                  <div className="flex flex-wrap gap-2">
                    {(c.tags ?? []).map((t) => (
                      <span key={t} className={`rounded-full px-2.5 py-0.5 font-mono text-xs capitalize ${tagStyle[t]}`}>{t}</span>
                    ))}
                  </div>
                  <h2 className="mt-3 text-3xl sm:text-4xl">{c.title}</h2>
                  {c.content ? <RichText data={c.content} className="rt mt-4" /> : <p className="mt-4 text-lg text-muted">{c.summary}</p>}
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}
