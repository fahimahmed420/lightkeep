import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  admin: { group: "Content" },
  access: { read: () => true },
  upload: {
    staticDir: "media",
    imageSizes: [
      { name: "card", width: 800, height: 500, position: "centre" },
      { name: "hero", width: 1600, height: undefined },
    ],
    mimeTypes: ["image/*"],
  },
  fields: [{ name: "alt", type: "text", required: true }],
};
