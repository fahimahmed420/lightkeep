import { site } from "@/content/site";
import { getCMS } from "@/lib/payload";

export const revalidate = 300;

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[c]!);

export async function GET() {
  const payload = await getCMS();
  const { docs } = await payload.find({ collection: "posts", where: { _status: { equals: "published" } }, sort: "-publishedAt", limit: 30 });
  const items = docs
    .map(
      (p) =>
        `<item><title>${esc(p.title)}</title><link>${site.url}/blog/${p.slug}</link><guid>${site.url}/blog/${p.slug}</guid><pubDate>${new Date(p.publishedAt ?? p.createdAt).toUTCString()}</pubDate><description>${esc(p.excerpt)}</description></item>`,
    )
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Lightkeep blog</title><link>${site.url}/blog</link><description>${esc(site.tagline)}</description>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
