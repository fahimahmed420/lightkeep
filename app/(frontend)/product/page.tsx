import type { Metadata } from "next";
import Link from "next/link";
import { integrations, productLinks } from "@/content/site";
import { ArrowRight, Button, Check, Container, PageIntro, SectionHead } from "@/components/ui";
import { AlertCard, DashboardMock, StatusPageMock } from "@/components/product";
import { Cell, CellHead, OnCallRota } from "@/components/bento";
import { AlertPayload } from "@/components/CodeBlock";

export const metadata: Metadata = { title: "Product", description: "Monitoring, alerting, on-call and status pages in one place for small software teams." };

export default function ProductPage() {
  return (
    <>
      <PageIntro kicker="Product" title={<>One tool for knowing, <em className="text-signal">telling</em> and fixing.</>} intro="Monitoring finds the problem, alerting finds the person, and the status page tells your customers. Lightkeep does all three without the enterprise price tag." aside={<AlertCard className="slide-in mx-auto w-full max-w-sm" />}>
        <Button href="/pricing">
          Start free <ArrowRight />
        </Button>
        <Button href="/contact" variant="outline">
          Book a demo
        </Button>
      </PageIntro>

      <section className="py-16 sm:py-20 lg:py-24">
        <Container className="grid gap-4 md:grid-cols-2 lg:gap-5">
          {productLinks.map((l, i) => (
            <Link key={l.label} href={l.href} data-reveal style={{ ["--d" as string]: `${i * 70}ms` }} className="group relative overflow-hidden rounded-3xl border border-line bg-white p-8 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-float)]">
              <p className="font-mono text-xs text-signal">0{i + 1}</p>
              <h2 className="mt-3 text-3xl group-hover:text-signal-2 lg:text-4xl">{l.label}</h2>
              <p className="mt-2 text-lg text-muted">{l.body}</p>
              <span className="mt-6 inline-flex items-center gap-2 font-medium">
                Learn more <ArrowRight />
              </span>
            </Link>
          ))}
        </Container>
      </section>

      <section className="border-y border-line bg-white py-16 sm:py-20 lg:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHead kicker="Dashboard" title="Everything that matters, on one screen." intro="Response times, uptime and open incidents for every monitor, updated live. No dashboards to build." />
          <div data-reveal className="min-w-0">
            <DashboardMock live />
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <Container className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <SectionHead kicker="Alerts & on-call" title="The right person, not the whole team." intro="Schedules, overrides and escalation, so the engineer on call is paged and everyone else keeps sleeping." />
            <ul className="mt-8 space-y-3 text-lg">
              {["Weekly or custom rotations with overrides", "Escalate after 5, 10 or 15 minutes without acknowledgement", "Acknowledge and resolve straight from Slack", "Quiet hours for non-critical monitors"].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <Check /> {t}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-muted">Works with {integrations.slice(0, 6).join(", ")} and more.</p>
          </div>
          <div className="grid min-w-0 gap-5">
            <Cell>
              <CellHead kicker="This week" title="Who gets paged." />
              <OnCallRota />
            </Cell>
            <div data-reveal className="min-w-0">
              <AlertPayload />
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-white py-16 sm:py-20 lg:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <SectionHead kicker="Status pages" title="Tell customers before they ask." intro="Public or private status pages on your own domain, with incident history and subscriber notifications." />
          <div data-reveal>
            <StatusPageMock />
          </div>
        </Container>
      </section>
    </>
  );
}
