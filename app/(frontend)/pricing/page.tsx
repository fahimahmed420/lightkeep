import type { Metadata } from "next";
import { pricingFaq } from "@/content/site";
import { Check, Container, PageIntro, SectionHead } from "@/components/ui";
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
      <PageIntro kicker="Pricing" title={<>Start free. Pay when it <em className="text-signal">matters</em>.</>} intro="Every plan includes multi-region confirmation, Slack and email alerts, and a status page." />
      <section className="py-16 sm:py-20 lg:py-24">
        <Container>
          <PricingTable />
          <ul className="mx-auto mt-12 flex max-w-3xl flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-muted">
            {["No card for the free plan", "Cancel any time", "50% off for non-profits and education", "Invoicing on Business"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-signal" /> {t}
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <section className="border-y border-line bg-white py-16 sm:py-20 lg:py-24">
        <Container>
          <SectionHead kicker="Compare" title="Every feature, side by side." />
          <div data-reveal className="relative mt-10 max-h-[min(85vh,48rem)] overflow-auto rounded-3xl border border-line">
            <table className="w-full min-w-[36rem] text-left">
              <thead className="sticky top-0 z-10 bg-cloud/95 text-sm shadow-[0_1px_0_var(--color-line)] backdrop-blur">
                <tr>
                  <th className="px-6 py-4 font-medium text-muted">Feature</th>
                  {["Starter", "Team", "Business"].map((h) => (
                    <th key={h} className={`px-6 py-4 font-medium ${h === "Team" ? "text-signal-2" : ""}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line bg-white">
                {compare.map(([f, ...v]) => (
                  <tr key={f} className="hover:bg-paper">
                    <td className="px-6 py-3.5">{f}</td>
                    {v.map((x, i) => (
                      <td key={i} className={`px-6 py-3.5 font-mono text-sm tabular-nums ${x === "—" ? "text-line-2" : x === "✓" ? "text-signal" : ""} ${i === 1 ? "bg-signal-soft/40" : ""}`}>
                        {x === "✓" ? <Check className="h-4 w-4 text-signal" /> : x}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>
      <section className="py-16 sm:py-20 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead kicker="FAQ" title="Billing questions." intro="Anything else, email us and a person answers within a business day." />
          <div data-reveal>
            <Faq items={pricingFaq} />
          </div>
        </Container>
      </section>
    </>
  );
}
