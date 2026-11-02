import type { Metadata } from "next";
import { pricingFaq } from "@/content/site";
import { Container, PageIntro, SectionHead } from "@/components/ui";
import { Faq } from "@/components/Faq";
import { PricingTable } from "./PricingTable";

export const metadata: Metadata = { title: "Pricing", description: "Free for 10 monitors. Team from $24 a month, Business from $82 a month billed annually." };

const compare: [string, string, string, string][] = [
  ["Monitors", "10", "50", "250"],
  ["Check interval", "3 min", "30 sec", "30 sec"],
  ["Regions", "3", "12", "12"],
  ["Status pages", "1", "3", "Unlimited"],
  ["Custom domain", "—", "✓", "✓"],
  ["SMS & phone alerts", "—", "✓", "✓"],
  ["On-call schedules", "—", "✓", "✓"],
  ["Escalation policies", "—", "—", "✓"],
  ["SLA reports", "—", "—", "✓"],
  ["SSO", "—", "—", "✓"],
  ["History", "30 days", "1 year", "3 years"],
];

export default function PricingPage() {
  return (
    <>
      <PageIntro kicker="Pricing" title="Start free. Pay when it matters." intro="Every plan includes multi-region confirmation, Slack and email alerts, and a status page." />
      <section className="py-20 sm:py-24">
        <Container>
          <PricingTable />
        </Container>
      </section>
      <section className="border-y border-line bg-white py-20 sm:py-24">
        <Container>
          <SectionHead kicker="Compare" title="Every feature, side by side." />
          <div data-reveal className="mt-10 overflow-x-auto rounded-3xl border border-line">
            <table className="w-full min-w-[36rem] text-left">
              <thead className="bg-cloud text-sm">
                <tr>
                  <th className="px-6 py-4 font-medium text-muted">Feature</th>
                  {["Starter", "Team", "Business"].map((h) => (
                    <th key={h} className={`px-6 py-4 font-medium ${h === "Team" ? "text-signal-2" : ""}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {compare.map(([f, ...v]) => (
                  <tr key={f}>
                    <td className="px-6 py-3.5">{f}</td>
                    {v.map((x, i) => (
                      <td key={i} className={`px-6 py-3.5 font-mono text-sm tabular-nums ${x === "—" ? "text-line-2" : x === "✓" ? "text-signal" : ""} ${i === 1 ? "bg-signal-soft/40" : ""}`}>{x}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>
      <section className="py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead kicker="FAQ" title="Billing questions." />
          <div data-reveal><Faq items={pricingFaq} /></div>
        </Container>
      </section>
    </>
  );
}
