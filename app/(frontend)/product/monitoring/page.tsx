import type { Metadata } from "next";
import { regions } from "@/content/site";
import { ArrowRight, Button, Check, Container, PageIntro, SectionHead, StatusDot } from "@/components/ui";
import { DashboardMock, Sparkline } from "@/components/product";

export const metadata: Metadata = { title: "Monitoring", description: "HTTP, API, SSL, cron heartbeat and keyword checks every 30 seconds from 12 regions, with multi-region confirmation." };

const types = [
  ["HTTP & HTTPS", "Status codes, redirects, response time and TLS handshake time."],
  ["API checks", "Send headers and a body, then assert on the JSON response."],
  ["Keyword", "Alert when a page stops containing, or starts containing, a phrase."],
  ["Cron heartbeats", "Your jobs ping us; silence means trouble."],
  ["SSL certificates", "Warnings 30, 14 and 3 days before expiry, plus chain errors."],
  ["Domains", "Know before a domain registration lapses."],
];

export default function MonitoringPage() {
  return (
    <>
      <PageIntro kicker="Monitoring" title="Every 30 seconds, from 12 regions." intro="Lightkeep checks what your customers actually use and confirms every failure from three locations before it alerts anyone.">
        <Button href="/pricing">Start free <ArrowRight /></Button>
        <Button href="/docs" variant="outline">Read the docs</Button>
      </PageIntro>

      <section className="py-24 sm:py-28">
        <Container>
          <SectionHead kicker="Check types" title="Six ways to know it works." />
          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {types.map(([t, d], i) => (
              <div key={t} data-reveal style={{ ["--d" as string]: `${(i % 3) * 70}ms` }} className="bg-white p-7">
                <Sparkline seed={i + 30} className="h-8 w-full" />
                <h3 className="mt-5 text-2xl">{t}</h3>
                <p className="mt-2 text-muted">{d}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-white py-24 sm:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHead kicker="Global network" title="Twelve regions, one verdict." intro="When a check fails, three other regions retry immediately. You only hear about failures that are real." />
            <ul className="mt-8 space-y-3">
              {["Median confirmation time: 9 seconds", "Response time measured per region", "Per-region thresholds for latency-sensitive APIs"].map((t) => (
                <li key={t} className="flex items-center gap-3"><Check /> {t}</li>
              ))}
            </ul>
          </div>
          <ul data-reveal className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {regions.map((r, i) => (
              <li key={r} className="flex items-center justify-between gap-2 rounded-2xl border border-line bg-paper px-4 py-3 text-sm">
                <span className="flex items-center gap-2"><StatusDot status={i === 5 ? "degraded" : "up"} /> {r}</span>
                <span className="font-mono text-xs text-muted">{[38, 41, 112, 52, 76, 91, 84, 168, 143, 155, 201, 189][i]}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-24 sm:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <div data-reveal className="lg:order-2"><DashboardMock /></div>
          <SectionHead kicker="Monitoring as code" title="Review monitors like any other change." intro="Manage monitors with our Terraform provider or REST API, so new services ship with monitoring from day one." />
        </Container>
      </section>
    </>
  );
}
