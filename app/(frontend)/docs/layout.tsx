import { Container } from "@/components/ui";
import { getCMS } from "@/lib/payload";
import { DocsNav } from "./DocsNav";

export const revalidate = 300;

const sectionNames: Record<string, string> = { start: "Getting started", monitors: "Monitors", status: "Status pages", alerts: "Alerts" };

export default async function DocsLayout({ children }: { children: React.ReactNode }) {
  const payload = await getCMS();
  const { docs } = await payload.find({ collection: "docs", where: { _status: { equals: "published" } }, sort: "order", limit: 200 });
  const groups = Object.entries(sectionNames)
    .map(([id, name]) => ({ id, name, pages: docs.filter((d) => d.section === id).map((d) => ({ slug: d.slug ?? "", title: d.title, description: d.description })) }))
    .filter((g) => g.pages.length);

  return (
    <Container className="grid gap-10 py-10 lg:grid-cols-[16rem_1fr] lg:py-14">
      <DocsNav groups={groups} />
      <div className="min-w-0">{children}</div>
    </Container>
  );
}
