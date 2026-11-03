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
  const latest = docs[0];
  return (
    <>
      <PageIntro
        kicker="Changelog"
        title={<>What&apos;s new in Lightkeep.</>}
        intro="We ship every two weeks. Here's everything that changed, newest first."
        aside={
          latest ? (
            <div className="hairline night-glow rounded-3xl bg-night p-7 text-white">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal-3">Latest release · v{latest.version}</p>
              <p className="mt-3 text-2xl lg:text-3xl">{latest.title}</p>
              <p className="mt-2 text-fog">{latest.summary}</p>
              <p className="mt-5 font-mono text-xs text-fog">{formatDate(latest.date)}</p>
            </div>
          ) : undefined
        }
      />
      <section className="py-14 sm:py-20">
        <Container className="max-w-4xl">
          <ol className="relative space-y-12 before:absolute before:bottom-0 before:left-[9.5rem] before:top-2 before:hidden before:w-px before:bg-line sm:before:block">
            {docs.map((c, i) => (
              <li key={c.id} data-reveal className="grid gap-4 sm:grid-cols-[10rem_1fr]">
                <div className="sm:pt-1.5">
                  <p className="font-mono text-sm text-muted">{formatDate(c.date)}</p>
                  <p className="mt-1 inline-block rounded-full border border-line bg-white px-2.5 py-0.5 font-mono text-xs text-signal">v{c.version}</p>
                </div>
                <div className="relative rounded-3xl border border-line bg-white p-6 sm:p-8">
                  <span aria-hidden="true" className={`absolute -left-[1.55rem] top-7 hidden h-3 w-3 rounded-full ring-4 ring-paper sm:block ${i === 0 ? "bg-signal" : "bg-line-2"}`} />
                  <div className="flex flex-wrap gap-2">
                    {(c.tags ?? []).map((t) => (
                      <span key={t} className={`rounded-full px-2.5 py-0.5 font-mono text-xs capitalize ${tagStyle[t]}`}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <h2 className="mt-3 text-3xl lg:text-4xl">{c.title}</h2>
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
