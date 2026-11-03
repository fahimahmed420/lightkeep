import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { Container, formatDate } from "@/components/ui";
import { CoverArt, PostCard, catLabel } from "@/components/PostCard";
import { RefreshOnSave } from "@/components/RefreshOnSave";
import { getCMS, getEditor } from "@/lib/payload";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ preview?: string }> };

async function load(slug: string, preview: boolean) {
  const payload = await getCMS();
  const editor = preview ? await getEditor() : null;
  const { docs } = await payload.find({
    collection: "posts",
    where: { slug: { equals: slug } },
    draft: !!editor,
    overrideAccess: false,
    user: editor ?? undefined,
    limit: 1,
    depth: 1,
  });
  return { post: docs[0], editor };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { post } = await load(slug, false);
  if (!post) return { title: "Not found" };
  return { title: post.title, description: post.excerpt, openGraph: { type: "article", title: post.title, description: post.excerpt, publishedTime: post.publishedAt ?? undefined } };
}

function hash(s: string) {
  let h = 7;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) % 100003;
  return h;
}

export default async function PostPage({ params, searchParams }: Props) {
  const [{ slug }, { preview }] = await Promise.all([params, searchParams]);
  const { post, editor } = await load(slug, preview === "1");
  if (!post) notFound();

  const payload = await getCMS();
  const { docs: more } = await payload.find({
    collection: "posts",
    where: { _status: { equals: "published" }, slug: { not_equals: slug } },
    sort: "-publishedAt",
    limit: 3,
  });

  return (
    <>
      {editor && <RefreshOnSave />}
      {editor && post._status !== "published" && <div className="bg-amber-soft py-2 text-center text-sm text-ink">Draft preview, only visible to signed-in editors.</div>}
      <article>
        <header className="relative overflow-hidden border-b border-line">
          <div aria-hidden="true" className="dots dots-fade absolute inset-0" />
          <Container className="relative max-w-3xl pb-12 pt-12 sm:pt-16">
            <Link href="/blog" className="inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-ink">
              ← All posts
            </Link>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-signal">{catLabel[post.category] ?? post.category}</p>
            <h1 className="fade-up mt-4 text-[2.7rem] leading-[1.02] sm:text-6xl lg:text-[4.4rem]" style={{ ["--d" as string]: "60ms" }}>
              {post.title}
            </h1>
            <p className="fade-up mt-6 text-xl leading-relaxed text-muted lg:text-[1.35rem]" style={{ ["--d" as string]: "140ms" }}>
              {post.excerpt}
            </p>
            <div className="fade-up mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-sm text-muted" style={{ ["--d" as string]: "200ms" }}>
              <span className="flex items-center gap-2.5">
                <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-full bg-ink font-display text-sm text-white">
                  {post.author?.[0] ?? "L"}
                </span>
                {post.author}
              </span>
              <span>{formatDate(post.publishedAt)}</span>
              {post.readingTime ? <span>{post.readingTime} min read</span> : null}
            </div>
          </Container>
        </header>
        <Container className="max-w-5xl">
          <CoverArt category={post.category} seed={hash(post.slug ?? post.title)} className="-mt-px h-40 rounded-b-3xl border-x border-b border-line sm:h-56" />
        </Container>
        <Container className="max-w-3xl py-12 sm:py-16">
          <RichText data={post.content} className="rt" />
          <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
            <p className="font-mono text-xs text-muted">Filed under {catLabel[post.category] ?? post.category}</p>
            <Link href="/blog/rss.xml" className="inline-flex min-h-11 items-center font-mono text-xs text-muted hover:text-ink">
              Subscribe via RSS →
            </Link>
          </div>
        </Container>
      </article>
      {more.length > 0 && (
        <section className="border-t border-line bg-white py-16 sm:py-20">
          <Container>
            <h2 className="text-4xl lg:text-5xl">Keep reading</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {more.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          </Container>
        </section>
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: post.excerpt, datePublished: post.publishedAt, author: { "@type": "Organization", name: "Lightkeep" } }).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
