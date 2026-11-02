import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageIntro } from "@/components/ui";
import { PostCard } from "@/components/PostCard";
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
      <PageIntro kicker="Blog" title="Notes on reliability." intro="Practical guides, honest postmortems and how we build Lightkeep." />
      <section className="py-14 sm:py-20">
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
          </nav>
          {lead ? (
            <>
              <div className="mt-10">
                <Link href={`/blog/${lead.slug}`} className="group grid overflow-hidden rounded-3xl border border-line bg-white md:grid-cols-2">
                  <div className="relative min-h-56 bg-gradient-to-br from-signal-soft to-[#bfe6d3]">
                    <svg aria-hidden="true" viewBox="0 0 160 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full opacity-60">
                      <path d="M0 70 C30 60 40 30 70 40 S120 80 160 30" fill="none" stroke="#0f6e49" strokeWidth="1.2" />
                    </svg>
                  </div>
                  <div className="p-8 sm:p-10">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-signal">Latest</p>
                    <h2 className="mt-3 text-4xl leading-tight group-hover:text-signal-2">{lead.title}</h2>
                    <p className="mt-4 text-lg text-muted">{lead.excerpt}</p>
                  </div>
                </Link>
              </div>
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((p) => (
                  <PostCard key={p.id} post={p} />
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
