import type { Metadata } from "next";
import { ArrowRight, Button, Check, Container, PageIntro, SectionHead } from "@/components/ui";
import { DashboardMock, LatencyChart, Sparkline } from "@/components/product";
import { ApiAssert, Cell, CellHead, ConfirmationDots, CronCalendar, RegionGrid, SslRing } from "@/components/bento";
import { WorldMap } from "@/components/WorldMap";

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
      <PageIntro kicker="Monitoring" title={<>Every 30 seconds, from <em className="text-signal">12 regions</em>.</>} intro="Lightkeep checks what your customers actually use and confirms every failure from three locations before it alerts anyone.">
        <Button href="/pricing">
          Start free <ArrowRight />
        </Button>
        <Button href="/docs" variant="outline">
          Read the docs
        </Button>
      </PageIntro>

      <section className="py-16 sm:py-20 lg:py-24">
        <Container>
          <SectionHead kicker="Check types" title="Six ways to know it works." />
          <div className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {types.map(([t, d], i) => (
              <div key={t} data-reveal style={{ ["--d" as string]: `${(i % 3) * 70}ms` }} className="group bg-white p-7 transition-colors hover:bg-paper">
                <Sparkline seed={i + 30} draw delay={0.2 + i * 0.1} className="h-10 w-full" />
                <h3 className="mt-5 text-2xl group-hover:text-signal-2">{t}</h3>
                <p className="mt-2 text-muted">{d}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="night-grid night-glow grain relative overflow-hidden py-16 text-white sm:py-20 lg:py-24">
        <div aria-hidden="true" className="absolute inset-0 opacity-60 [mask-image:linear-gradient(180deg,transparent,#000_25%,#000_75%,transparent)]">
          <WorldMap dark className="absolute left-1/2 top-1/2 w-[max(100%,1100px)] -translate-x-1/2 -translate-y-1/2" />
        </div>
        <Container className="relative grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHead light kicker="Global network" title="Twelve regions, one verdict." intro="When a check fails, three other regions retry immediately. You only hear about failures that are real." />
            <ul className="mt-8 space-y-3 text-lg">
              {["Median confirmation time: 9 seconds", "Response time measured per region", "Per-region thresholds for latency-sensitive APIs"].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-signal-3" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal className="rounded-3xl border border-white/10 bg-night/70 p-5 backdrop-blur sm:p-6">
            <p className="font-mono text-[0.75rem] uppercase tracking-wider text-fog">api.parcelry.com · 24 h · ms</p>
            <LatencyChart dark className="mt-3 h-44 sm:h-52" />
            <div className="mt-5">
              <RegionGrid />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <Container>
          <SectionHead kicker="Beyond uptime" title="Checks that catch the quiet failures." intro="A 200 isn't proof of life. These checks look at what the response says, when jobs run and when certificates expire." />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            <Cell dark>
              <CellHead light kicker="Confirmation" title="Three must agree." />
              <ConfirmationDots />
            </Cell>
            <Cell delay={80}>
              <CellHead kicker="API checks" title="Assert on the body." />
              <ApiAssert />
            </Cell>
            <Cell delay={160}>
              <CellHead kicker="Cron heartbeats" title="Silence is a signal." />
              <CronCalendar />
            </Cell>
            <Cell delay={240}>
              <CellHead kicker="SSL & domains" title="Expiry, counted down." />
              <SslRing />
            </Cell>
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-white py-16 sm:py-20 lg:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div data-reveal className="min-w-0">
            <DashboardMock live />
          </div>
          <SectionHead kicker="Monitoring as code" title="Review monitors like any other change." intro="Manage monitors with our Terraform provider or REST API, so new services ship with monitoring from day one." />
        </Container>
      </section>
    </>
  );
}
