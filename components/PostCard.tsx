import Link from "next/link";
import Image from "next/image";
import type { Post, Media } from "@/payload-types";
import { formatDate } from "./ui";
import { responseSeries } from "@/lib/status";

export const catLabel: Record<string, string> = { guides: "Guides", incidents: "Incidents", product: "Product", engineering: "Engineering" };
const catTheme: Record<string, { bg: string; ink: string; stroke: string }> = {
  guides: { bg: "bg-[#e1f3ea]", ink: "text-signal-2", stroke: "#0f6e49" },
  incidents: { bg: "bg-[#fbf0d9]", ink: "text-[#8a5a0d]", stroke: "#c7871f" },
  product: { bg: "bg-[#e4ebf7]", ink: "text-[#2f4f86]", stroke: "#2f4f86" },
  engineering: { bg: "bg-[#efe7f6]", ink: "text-[#5b3f85]", stroke: "#5b3f85" },
};

/** Generated cover art: a latency trace unique to the post, in the category's colour. */
export function CoverArt({ category, seed, className = "" }: { category: string; seed: number; className?: string }) {
  const t = catTheme[category] ?? catTheme.guides;
  const s = responseSeries(seed, 60);
  const pts = s.map((v, i) => `${(i / 59) * 160},${100 - (v / 420) * 80}`).join(" ");
  const bars = responseSeries(seed + 7, 30);
  return (
    <div className={`overflow-hidden ${/absolute|fixed/.test(className) ? "" : "relative"} ${t.bg} ${className}`}>
      <div aria-hidden="true" className="dots absolute inset-0 opacity-60" />
      <svg aria-hidden="true" viewBox="0 0 160 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {bars.map((v, i) => (
          <rect key={i} x={i * 5.4 + 1} y={100 - (v / 420) * 40} width={3.4} height={(v / 420) * 40} fill={t.stroke} opacity={0.12} />
        ))}
        <polyline points={`0,100 ${pts} 160,100`} fill={t.stroke} fillOpacity="0.1" stroke="none" />
        <polyline points={pts} fill="none" stroke={t.stroke} strokeWidth="1.4" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
        <line x1="0" x2="160" y1="42" y2="42" stroke={t.stroke} strokeWidth="0.6" strokeDasharray="2 3" opacity="0.6" />
      </svg>
    </div>
  );
}

function hash(s: string) {
  let h = 7;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) % 100003;
  return h;
}

/** Blog card. Uses the uploaded cover if there is one, otherwise generated art. */
export function PostCard({ post, large = false }: { post: Post; large?: boolean }) {
  const cover = typeof post.cover === "object" ? (post.cover as Media | null) : null;
  const t = catTheme[post.category] ?? catTheme.guides;
  return (
    <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-float)]">
      <div className={`relative overflow-hidden ${large ? "aspect-[16/9]" : "aspect-[16/10]"}`}>
        {cover?.url ? <Image src={cover.url} alt={cover.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" /> : <CoverArt category={post.category} seed={hash(post.slug ?? post.title)} className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.03]" />}
        <span className={`absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 font-mono text-xs ${t.ink}`}>{catLabel[post.category] ?? post.category}</span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className={`leading-tight group-hover:text-signal-2 ${large ? "text-3xl lg:text-4xl" : "text-2xl"}`}>{post.title}</h3>
        <p className="mt-2 flex-1 leading-relaxed text-muted">{post.excerpt}</p>
        <p className="mt-5 font-mono text-xs text-muted">
          {formatDate(post.publishedAt)}
          {post.readingTime ? ` · ${post.readingTime} min read` : ""}
        </p>
      </div>
    </Link>
  );
}
