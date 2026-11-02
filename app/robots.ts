import type { MetadataRoute } from "next";

// Portfolio concept: keep crawlers out. No sitemap on purpose.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}
