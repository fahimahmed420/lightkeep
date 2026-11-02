import type { Metadata } from "next";
import { LegalPage } from "../legal";

export const metadata: Metadata = { title: "Credits", description: "Fonts, tools and the people behind this site." };

export default function Credits() {
  return (
    <LegalPage
      kicker="Credits"
      title="About this site"
      sections={[
        ["Design and build", "Designed and built by Zordev as a portfolio project: a multi-page SaaS marketing site with a CMS editors can use without a developer."],
        ["Content management", "Blog, changelog and documentation are managed in Payload CMS, with drafts, live preview and scheduled publishing."],
        ["Type", "Fraunces (Undercase Type) and Geist (Vercel), both under the SIL Open Font License."],
        ["Product interface", "Dashboards, charts and status pages are real interface components drawn for this site, not screenshots."],
        ["Built with", "Next.js 16, React 19, TypeScript, Tailwind CSS 4 and Payload 3."],
      ]}
    />
  );
}
