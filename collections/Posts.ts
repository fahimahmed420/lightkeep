import type { CollectionConfig } from "payload";
import { revalidatePath } from "next/cache";
import { slugField } from "./slug";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3007";

export const Posts: CollectionConfig = {
  slug: "posts",
  labels: { singular: "Blog post", plural: "Blog posts" },
  admin: {
    useAsTitle: "title",
    group: "Content",
    defaultColumns: ["title", "category", "_status", "publishedAt"],
    livePreview: { url: ({ data }) => `${siteUrl}/blog/${data?.slug ?? ""}?preview=1` },
    preview: (doc) => `${siteUrl}/blog/${doc?.slug ?? ""}?preview=1`,
  },
  // Published posts are public; drafts are only visible to signed-in editors.
  access: { read: ({ req }) => (req.user ? true : { _status: { equals: "published" } }) },
  versions: { drafts: { autosave: { interval: 800 }, schedulePublish: true }, maxPerDoc: 25 },
  hooks: {
    afterChange: [
      ({ doc }) => {
        try {
          revalidatePath("/blog");
          revalidatePath(`/blog/${doc.slug}`);
          revalidatePath("/");
        } catch {}
      },
    ],
  },
  fields: [
    { name: "title", type: "text", required: true },
    slugField(),
    { name: "excerpt", type: "textarea", required: true, maxLength: 220, admin: { description: "Shown on cards and in search results. Up to 220 characters." } },
    {
      name: "category",
      type: "select",
      required: true,
      defaultValue: "guides",
      admin: { position: "sidebar" },
      options: [
        { label: "Guides", value: "guides" },
        { label: "Incidents", value: "incidents" },
        { label: "Product", value: "product" },
        { label: "Engineering", value: "engineering" },
      ],
    },
    { name: "author", type: "text", required: true, defaultValue: "The Lightkeep team", admin: { position: "sidebar" } },
    { name: "readingTime", type: "number", min: 1, admin: { position: "sidebar", description: "Minutes" } },
    { name: "publishedAt", type: "date", admin: { position: "sidebar", date: { pickerAppearance: "dayOnly" } } },
    { name: "cover", type: "upload", relationTo: "media" },
    { name: "content", type: "richText", required: true },
  ],
};
