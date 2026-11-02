import type { Field } from "payload";

const slugify = (v: string) =>
  v
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

/** URL slug that fills itself from the title until an editor changes it. */
export const slugField = (from = "title"): Field => ({
  name: "slug",
  type: "text",
  index: true,
  unique: true,
  admin: { position: "sidebar", description: "Part of the page address. Filled in from the title." },
  hooks: {
    beforeValidate: [({ value, data }) => (value ? slugify(String(value)) : data?.[from] ? slugify(String(data[from])) : value)],
  },
});
