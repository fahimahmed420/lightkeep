import type { CollectionConfig } from "payload";
import { revalidatePath } from "next/cache";
import { slugField } from "./slug";

export const Docs: CollectionConfig = {
  slug: "docs",
  labels: { singular: "Doc page", plural: "Docs" },
  admin: { useAsTitle: "title", group: "Content", defaultColumns: ["title", "section", "order"] },
  access: { read: ({ req }) => (req.user ? true : { _status: { equals: "published" } }) },
  versions: { drafts: true },
  defaultSort: "order",
  hooks: {
    afterChange: [
      ({ doc }) => {
        try {
          revalidatePath("/docs");
          revalidatePath(`/docs/${doc.slug}`);
        } catch {}
      },
    ],
  },
  fields: [
    { name: "title", type: "text", required: true },
    slugField(),
    {
      name: "section",
      type: "select",
      required: true,
      admin: { position: "sidebar" },
      options: [
        { label: "Getting started", value: "start" },
        { label: "Monitors", value: "monitors" },
        { label: "Status pages", value: "status" },
        { label: "Alerts", value: "alerts" },
      ],
    },
    { name: "order", type: "number", required: true, defaultValue: 10, admin: { position: "sidebar" } },
    { name: "description", type: "textarea", required: true },
    { name: "content", type: "richText", required: true },
  ],
};
