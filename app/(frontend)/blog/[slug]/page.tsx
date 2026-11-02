import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { Container, formatDate } from "@/components/ui";
import { PostCard } from "@/components/PostCard";
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
      {editor && post._status !== "published" && (
        <div className="bg-amber-soft py-2 text-center text-sm text-ink">Draft preview, only visible to signed-in editors.</div>
      )}
      <article>
        <header className="dots border-b border-line">
          <Container className="max-w-3xl pb-14 pt-14 sm:pt-20">
            <Link href="/blog" className="inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-ink">
              ← All posts
            </Link>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-signal">{post.category}</p>
            <h1 className="mt-4 text-[2.6rem] leading-[1.05] sm:text-6xl">{post.title}</h1>
            <p className="mt-5 text-xl leading-relaxed text-muted">{post.excerpt}</p>
            <p className="mt-8 font-mono text-sm text-muted">
              {post.author} · {formatDate(post.publishedAt)}
              {post.readingTime ? ` · ${post.readingTime} min read` : ""}
            </p>
          </Container>
        </header>
        <Container className="max-w-3xl py-14 sm:py-20">
          <RichText data={post.content} className="rt" />
        </Container>
      </article>
      {more.length > 0 && (
        <section className="border-t border-line bg-white py-20">
          <Container>
            <h2 className="text-4xl">Keep reading</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
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
