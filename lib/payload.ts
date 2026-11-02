import config from "@payload-config";
import { getPayload } from "payload";
import { headers } from "next/headers";

export const getCMS = () => getPayload({ config });

/** The signed-in CMS user, if any (used to show drafts in preview). */
export async function getEditor() {
  const payload = await getCMS();
  const { user } = await payload.auth({ headers: await headers() });
  return user;
}

export async function latestPosts(limit = 3) {
  const payload = await getCMS();
  const res = await payload.find({ collection: "posts", where: { _status: { equals: "published" } }, sort: "-publishedAt", limit, depth: 1 });
  return res.docs;
}
