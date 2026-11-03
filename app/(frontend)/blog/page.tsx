import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageIntro, formatDate } from "@/components/ui";
import { CoverArt, PostCard, catLabel } from "@/components/PostCard";
import { getCMS } from "@/lib/payload";

export const metadata: Metadata = { title: "Blog", description: "Guides, postmortems and engineering notes on running reliable software." };
export const revalidate = 300;

const cats = [
  ["", "All"],
  ["guides", "Guides"],
  ["incidents", "Incidents"],
  ["product", "Product"],
  ["engineering", "Engineering"],
];

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category = "" } = await searchParams;
  const payload = await getCMS();
  const { docs } = await payload.find({
    collection: "posts",
    where: { _status: { equals: "published" }, ...(category ? { category: { equals: category } } : {}) },
    sort: "-publishedAt",
    limit: 30,
    depth: 1,
  });
  const [lead, ...rest] = docs;

  return (
    <>
      <PageIntro kicker="Blog" title={<>Notes on <em className="text-signal">reliability</em>.</>} intro="Practical guides, honest postmortems and how we build Lightkeep. New posts most weeks; there's an RSS feed if you prefer." />
      <section className="py-12 sm:py-16">
        <Container>
          <nav aria-label="Categories" className="flex gap-2 overflow-x-auto pb-2">
            {cats.map(([v, l]) => (
              <Link
                key={l}
                href={v ? `/blog?category=${v}` : "/blog"}
                aria-current={category === v ? "page" : undefined}
                className={`flex min-h-11 shrink-0 items-center rounded-full border px-5 text-sm transition-colors ${category === v ? "border-ink bg-ink text-white" : "border-line bg-white hover:border-ink"}`}
              >
                {l}
              </Link>
            ))}
            <a href="/blog/rss.xml" className="ml-auto flex min-h-11 shrink-0 items-center gap-2 rounded-full px-4 font-mono text-xs text-muted hover:text-ink">
              RSS
            </a>
          </nav>
          {lead ? (
            <>
              <Link href={`/blog/${lead.slug}`} data-reveal className="group mt-8 grid overflow-hidden rounded-3xl border border-line bg-white transition-shadow hover:shadow-[var(--shadow-float)] md:grid-cols-[1.1fr_0.9fr]">
                <CoverArt category={lead.category} seed={(lead.slug ?? "").length * 977 + 5} className="min-h-60 md:min-h-full" />
                <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">Latest · {catLabel[lead.category] ?? lead.category}</p>
                  <h2 className="mt-4 text-4xl leading-[1.05] group-hover:text-signal-2 lg:text-5xl">{lead.title}</h2>
                  <p className="mt-5 text-lg leading-relaxed text-muted">{lead.excerpt}</p>
                  <p className="mt-6 font-mono text-xs text-muted">
                    {lead.author} · {formatDate(lead.publishedAt)}
                    {lead.readingTime ? ` · ${lead.readingTime} min read` : ""}
                  </p>
                </div>
              </Link>
              <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((p, i) => (
                  <div key={p.id} data-reveal style={{ ["--d" as string]: `${(i % 3) * 70}ms` }}>
                    <PostCard post={p} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="mt-16 text-center text-lg text-muted">No posts in this category yet.</p>
          )}
        </Container>
      </section>
    </>
  );
}
