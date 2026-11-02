import type { Metadata } from "next";
import Link from "next/link";
import { integrations, productLinks } from "@/content/site";
import { ArrowRight, Button, Check, Container, PageIntro, SectionHead } from "@/components/ui";
import { AlertCard, DashboardMock, StatusPageMock } from "@/components/product";

export const metadata: Metadata = { title: "Product", description: "Monitoring, alerting, on-call and status pages in one place for small software teams." };

export default function ProductPage() {
  return (
    <>
      <PageIntro kicker="Product" title={<>One tool for knowing, <em className="text-signal">telling</em> and fixing.</>} intro="Monitoring finds the problem, alerting finds the person, and the status page tells your customers. Lightkeep does all three without the enterprise price tag.">
        <Button href="/pricing">Start free <ArrowRight /></Button>
        <Button href="/contact" variant="outline">Book a demo</Button>
      </PageIntro>

      <section className="py-24 sm:py-28">
        <Container className="grid gap-5 md:grid-cols-2">
          {productLinks.map((l, i) => (
            <Link key={l.label} href={l.href} data-reveal style={{ ["--d" as string]: `${i * 70}ms` }} className="group rounded-3xl border border-line bg-white p-8 transition-shadow hover:shadow-[var(--shadow-float)]">
              <p className="font-mono text-xs text-signal">0{i + 1}</p>
              <h2 className="mt-3 text-3xl group-hover:text-signal-2">{l.label}</h2>
              <p className="mt-2 text-lg text-muted">{l.body}</p>
              <span className="mt-6 inline-flex items-center gap-2 font-medium">Learn more <ArrowRight /></span>
            </Link>
          ))}
        </Container>
      </section>

      <section className="border-y border-line bg-white py-24 sm:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <SectionHead kicker="Dashboard" title="Everything that matters, on one screen." intro="Response times, uptime and open incidents for every monitor, updated live. No dashboards to build." />
          <div data-reveal><DashboardMock compact /></div>
        </Container>
      </section>

      <section className="py-24 sm:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <div data-reveal className="flex justify-center lg:order-2"><AlertCard /></div>
          <div>
            <SectionHead kicker="Alerts & on-call" title="The right person, not the whole team." intro="Schedules, overrides and escalation, so the engineer on call is paged and everyone else keeps sleeping." />
            <ul className="mt-8 space-y-3">
              {["Weekly or custom rotations with overrides", "Escalate after 5, 10 or 15 minutes without acknowledgement", "Acknowledge and resolve straight from Slack", "Quiet hours for non-critical monitors"].map((t) => (
                <li key={t} className="flex items-center gap-3"><Check /> {t}</li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-muted">Works with {integrations.slice(0, 6).join(", ")} and more.</p>
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-white py-24 sm:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <SectionHead kicker="Status pages" title="Tell customers before they ask." intro="Public or private status pages on your own domain, with incident history and subscriber notifications." />
          <div data-reveal><StatusPageMock /></div>
        </Container>
      </section>
    </>
  );
}
