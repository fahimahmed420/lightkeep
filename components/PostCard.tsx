import Link from "next/link";
import Image from "next/image";
import type { Post, Media } from "@/payload-types";
import { formatDate } from "./ui";

const catLabel: Record<string, string> = { guides: "Guides", incidents: "Incidents", product: "Product", engineering: "Engineering" };
const catArt: Record<string, string> = {
  guides: "from-[#e1f3ea] to-[#bfe6d3]",
  incidents: "from-[#fbf0d9] to-[#f3d9a8]",
  product: "from-[#e4ebf7] to-[#c5d4ee]",
  engineering: "from-[#efe7f6] to-[#d9c8ea]",
};

/** Blog card. Uses the uploaded cover if there is one, otherwise a category artwork. */
export function PostCard({ post }: { post: Post }) {
  const cover = typeof post.cover === "object" ? (post.cover as Media | null) : null;
  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-white transition-shadow hover:shadow-[var(--shadow-float)]">
      <div className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${catArt[post.category] ?? catArt.guides}`}>
        {cover?.url ? (
          <Image src={cover.url} alt={cover.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
        ) : (
          <svg aria-hidden="true" viewBox="0 0 160 100" className="absolute inset-0 h-full w-full opacity-60">
            <path d="M0 70 C30 60 40 30 70 40 S120 80 160 30" fill="none" stroke="#0f6e49" strokeWidth="1.5" />
            <path d="M0 85 C40 80 60 55 90 62 S140 75 160 55" fill="none" stroke="#0f6e49" strokeWidth="1" strokeDasharray="2 4" />
          </svg>
        )}
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 font-mono text-xs text-ink">{catLabel[post.category] ?? post.category}</span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-2xl leading-tight group-hover:text-signal-2">{post.title}</h3>
        <p className="mt-2 flex-1 leading-relaxed text-muted">{post.excerpt}</p>
        <p className="mt-5 font-mono text-xs text-muted">
          {formatDate(post.publishedAt)}
          {post.readingTime ? ` · ${post.readingTime} min read` : ""}
        </p>
      </div>
    </Link>
  );
}
