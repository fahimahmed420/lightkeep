import type { CollectionConfig } from "payload";
import { revalidatePath } from "next/cache";

export const Changelog: CollectionConfig = {
  slug: "changelog",
  labels: { singular: "Changelog entry", plural: "Changelog" },
  admin: { useAsTitle: "title", group: "Content", defaultColumns: ["title", "version", "date", "tags"] },
  access: { read: ({ req }) => (req.user ? true : { _status: { equals: "published" } }) },
  versions: { drafts: true },
  defaultSort: "-date",
  hooks: {
    afterChange: [
      () => {
        try {
          revalidatePath("/changelog");
        } catch {}
      },
    ],
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "version", type: "text", required: true, admin: { position: "sidebar", description: "e.g. 2.8" } },
    { name: "date", type: "date", required: true, admin: { position: "sidebar", date: { pickerAppearance: "dayOnly" } } },
    {
      name: "tags",
      type: "select",
      hasMany: true,
      admin: { position: "sidebar" },
      options: [
        { label: "New", value: "new" },
        { label: "Improved", value: "improved" },
        { label: "Fixed", value: "fixed" },
      ],
    },
    { name: "summary", type: "textarea", required: true },
    { name: "content", type: "richText" },
  ],
};
