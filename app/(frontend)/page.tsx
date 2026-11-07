import Link from "next/link";
import { customers, integrations, plans, regions } from "@/content/site";
import { ArrowRight, Button, Check, Container, Kicker, SectionHead, StatusDot } from "@/components/ui";
import { AlertCard, DashboardMock, LatencyChart, StatusPageMock } from "@/components/product";
import { ApiAssert, Cell, CellHead, ConfirmationDots, CronCalendar, IncidentTimeline, OnCallRota, SslRing } from "@/components/bento";
import { WorldMap } from "@/components/WorldMap";
import { LogoMarquee } from "@/components/Marquee";
import { CountUp } from "@/components/CountUp";
import { AlertPayload } from "@/components/CodeBlock";
import { PostCard } from "@/components/PostCard";
import { latestPosts } from "@/lib/payload";

export const revalidate = 300;

const steps = [
  { t: "Add a URL", d: "Paste an address, an API endpoint or a cron schedule. No agent to install.", m: "2 min" },
  { t: "We check it worldwide", d: "Every 30 seconds from 12 regions. A failure is confirmed from three before anyone is woken up.", m: "30 s" },
  { t: "The right person hears first", d: "Slack, SMS or a phone call, following your on-call schedule, with escalation if nobody responds.", m: "41 s" },
  { t: "Customers stay informed", d: "Your status page updates itself, and subscribers get an email the moment you post an update.", m: "0 tickets" },
];

const regionMs = [38, 41, 112, 52, 76, 912, 84, 168, 143, 155, 201, 189];

export default async function Home() {
  const posts = await latestPosts(3);
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div aria-hidden="true" className="dots dots-fade absolute inset-0" />
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 w-[min(180vw,1700px)] -translate-x-1/2 [mask-image:radial-gradient(ellipse_62%_56%_at_50%_42%,transparent_0%,transparent_22%,#000_48%,transparent_82%)] sm:-top-10 lg:-top-16">
          <WorldMap className="aspect-[1000/520] w-full" />
        </div>
        <Container className="relative pb-16 pt-12 sm:pt-16 lg:pb-24 lg:pt-20">
          <div className="mx-auto max-w-4xl text-center">
            <Link
              href="/changelog"
              className="fade-up inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-white py-1.5 pl-1.5 pr-4 text-sm text-ink-2 shadow-[var(--shadow-card)] hover:border-line-2"
            >
              <span className="rounded-full bg-signal-soft px-2.5 py-0.5 font-mono text-xs text-signal-2">New</span>
              Cron heartbeats and SLA reports
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <h1 className="fade-up mt-7 text-[3.2rem] leading-[0.95] sm:text-7xl lg:text-[6.6rem]" style={{ ["--d" as string]: "80ms" }}>
              Know it&apos;s down <em className="text-signal">before</em> your customers do.
            </h1>
            <p className="fade-up mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl lg:text-[1.35rem]" style={{ ["--d" as string]: "160ms" }}>
              Lightkeep checks your sites and APIs every 30 seconds from 12 regions, wakes the right person in seconds, and keeps customers informed with a status page that updates itself.
            </p>
            <div className="fade-up mt-9 flex flex-wrap justify-center gap-3" style={{ ["--d" as string]: "240ms" }}>
              <Button href="/pricing">
                Start monitoring free <ArrowRight />
              </Button>
              <Button href="/contact" variant="outline">
                Book a demo
              </Button>
            </div>
            <p className="fade-up mt-5 font-mono text-xs uppercase tracking-[0.16em] text-muted" style={{ ["--d" as string]: "300ms" }}>
              Free for 10 monitors · No card · 2&#8209;minute setup
            </p>
          </div>

          {/* Stage: map behind, dashboard in front, alert sliding in */}
          <div className="relative mx-auto mt-12 max-w-6xl sm:mt-16 md:mb-16 lg:mb-20">
            <div className="fade-up hairline relative rounded-[1.6rem] bg-white/50 p-1.5 shadow-[0_40px_90px_-40px_rgb(17_26_23/0.4)] backdrop-blur-sm sm:p-2" style={{ ["--d" as string]: "320ms" }}>
              <DashboardMock live />
            </div>
            <AlertCard className="slide-in absolute -bottom-20 right-3 hidden md:block lg:-right-6 lg:-bottom-16" />
            <ul className="fade-up relative mt-5 hidden max-w-[calc(100%-21rem)] flex-wrap gap-1.5 lg:flex" style={{ ["--d" as string]: "600ms" }} aria-label="Check regions">
              {regions.map((r, i) => (
                <li key={r} className={`flex items-center gap-1.5 rounded-full border bg-white/80 px-2.5 py-1 font-mono text-[0.75rem] backdrop-blur ${i === 5 ? "border-amber/40 text-amber" : "border-line text-muted"}`}>
                  <StatusDot status={i === 5 ? "degraded" : "up"} /> {r} <span className="tabular opacity-70">{regionMs[i]}ms</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <LogoMarquee />

      {/* Feature bento */}
      <section className="py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHead size="lg" kicker="Monitoring" title={<>Fewer false alarms.<br />Faster real ones.</>} intro="Most tools wake you for a blip in one region. Lightkeep confirms every failure from three locations first, so an alert always means something." />
            <Button href="/product/monitoring" variant="outline" className="shrink-0">
              Explore monitoring <ArrowRight />
            </Button>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            <Cell className="md:col-span-2">
              <CellHead kicker="Response time" title="Checked from where your customers are." body="Per-region latency, side by side. Frankfurt crossed the threshold at 14:08; the other eleven never noticed." />
              <LatencyChart className="mx-6 mb-6 mt-6 h-48 sm:mx-7 sm:mb-7 sm:h-56" />
            </Cell>
            <Cell dark delay={80}>
              <CellHead light kicker="Confirmation" title="Three must agree." />
              <ConfirmationDots />
            </Cell>
            <Cell delay={120}>
              <CellHead kicker="Incidents" title="A timeline writes itself." body="Every state change is stamped and posted to the status page." />
              <IncidentTimeline />
            </Cell>
            <Cell delay={160}>
              <CellHead kicker="Cron heartbeats" title="Silence is a signal." body="Jobs ping us when they finish. When they don't, you hear about it." />
              <CronCalendar />
            </Cell>
            <Cell delay={200}>
              <CellHead kicker="SSL & domains" title="Expiry, counted down." body="Chain errors and renewals caught before a browser warns a customer." />
              <SslRing />
            </Cell>
            <Cell delay={240}>
              <CellHead kicker="API checks" title="Assert on the body." body="Headers, JSON paths and regexes, not just a 200." />
              <ApiAssert />
            </Cell>
            <Cell className="md:col-span-2" delay={280}>
              <CellHead kicker="On-call" title="The right person, not the whole team." body="Rotations with overrides, and an escalation path when nobody acknowledges. Tom is on today." />
              <OnCallRota />
            </Cell>
          </div>
        </Container>
      </section>

      {/* How it works · night */}
      <section className="night-grid night-glow grain relative overflow-hidden py-20 text-white sm:py-24 lg:py-28">
        <Container>
          <SectionHead light size="lg" kicker="How it works" title="From URL to on-call in two minutes." />
          <ol className="relative mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <span aria-hidden="true" className="absolute left-0 right-0 top-5 hidden h-px bg-gradient-to-r from-signal-3/0 via-signal-3/60 to-signal-3/0 lg:block" />
            {steps.map((s, i) => (
              <li key={s.t} data-reveal style={{ ["--d" as string]: `${i * 90}ms` }} className="relative">
                <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-signal-3/40 bg-night font-mono text-sm text-signal-3 shadow-[var(--shadow-glow)]">0{i + 1}</span>
                <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-signal-3">{s.m}</p>
                <h3 className="mt-2 text-2xl text-white lg:text-[1.75rem]">{s.t}</h3>
                <p className="mt-2 leading-relaxed text-fog">{s.d}</p>
              </li>
            ))}
          </ol>
          <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 lg:grid-cols-4">
            {[
              [1.8, "B", "checks run last month", 1],
              [41, "s", "median time to alert", 0],
              [12, "", "regions, 3 must agree", 0],
              [99.99, "%", "our own uptime, 12 months", 2],
            ].map(([v, suf, l, dec], i) => (
              <div key={l as string} data-reveal style={{ ["--d" as string]: `${i * 80}ms` }} className="bg-night/90 px-6 py-8 backdrop-blur">
                <dt className="sr-only">{l as string}</dt>
                <dd>
                  <span className="block font-display text-5xl text-white lg:text-6xl">
                    <CountUp value={v as number} decimals={dec as number} suffix={suf as string} />
                  </span>
                  <span className="mt-2 block text-sm text-fog">{l as string}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Status pages */}
      <section className="overflow-hidden py-20 sm:py-24 lg:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHead kicker="Status pages" title="The page that answers support tickets for you." intro="When something breaks, customers check your status page before they email. Lightkeep keeps it current automatically, on your domain and in your colors." />
            <ul className="mt-8 space-y-3 text-lg">
              {["Custom domain, logo and colors", "Updates posted from Slack in one command", "Email and RSS subscribers", "90-day uptime history per component"].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <Check /> {t}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/product/status-pages">See status pages</Button>
              <Button href="/status" variant="outline">
                View our live status
              </Button>
            </div>
          </div>
          <div data-reveal className="relative">
            <div aria-hidden="true" className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(60%_60%_at_50%_50%,rgb(23_137_92/0.12),transparent)]" />
            <div className="relative">
              <StatusPageMock />
            </div>
          </div>
        </Container>
      </section>

      {/* Customers */}
      <section className="night-glow bg-night-2 py-20 text-white sm:py-24 lg:py-28">
        <Container>
          <SectionHead light kicker="Customers" title="Teams that sleep through the night." />
          <div className="mt-12 grid gap-4 lg:grid-cols-3 lg:gap-5">
            {customers.map((c, i) => (
              <figure key={c.company} data-reveal style={{ ["--d" as string]: `${i * 80}ms` }} className="hairline flex flex-col rounded-3xl bg-night p-7">
                <p className="font-display text-6xl text-signal-3">{c.metric}</p>
                <p className="mt-1 text-sm text-fog">{c.metricLabel}</p>
                <blockquote className="mt-6 flex-1 text-lg leading-relaxed">“{c.quote}”</blockquote>
                <figcaption className="mt-6 border-t border-white/10 pt-5 text-sm">
                  <span className="block font-medium">{c.person}</span>
                  <span className="text-fog">
                    {c.role}, {c.company}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-10">
            <Button href="/customers" variant="ghostLight">
              Read customer stories <ArrowRight />
            </Button>
          </div>
        </Container>
      </section>

      {/* Alerts & integrations */}
      <section className="border-b border-line bg-white py-20 sm:py-24 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          <div className="min-w-0">
            <SectionHead kicker="Alerts & integrations" title="Alerts where your team already works." intro="Route by service and severity, follow on-call schedules, and escalate when nobody acknowledges. Every alert is also a signed webhook." />
            <ul data-reveal className="mt-8 flex flex-wrap gap-2">
              {integrations.map((n) => (
                <li key={n} className="rounded-full border border-line bg-paper px-4 py-2 text-sm font-medium transition-colors hover:border-ink">
                  {n}
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal className="min-w-0">
            <AlertPayload />
          </div>
        </Container>
      </section>

      {/* Pricing teaser */}
      <section className="py-20 sm:py-24 lg:py-28">
        <Container>
          <SectionHead center kicker="Pricing" title="Simple plans that grow with you." intro="Start free. Upgrade when your customers depend on you." />
          <div className="mt-12 grid gap-4 lg:grid-cols-3 lg:gap-5">
            {plans.map((p, i) => (
              <div key={p.id} data-reveal style={{ ["--d" as string]: `${i * 80}ms` }} className={`rounded-3xl p-7 ${p.highlight ? "hairline bg-ink text-white shadow-[var(--shadow-float)]" : "border border-line bg-white"}`}>
                <p className="font-mono text-xs uppercase tracking-[0.2em] opacity-70">{p.name}</p>
                <p className="mt-3 font-display text-6xl">
                  ${p.annual}
                  <span className="font-sans text-base opacity-60"> /mo</span>
                </p>
                <p className={`mt-2 ${p.highlight ? "text-fog" : "text-muted"}`}>{p.blurb}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button href="/pricing" variant="outline">
              Compare plans <ArrowRight />
            </Button>
          </div>
        </Container>
      </section>

      {/* Blog */}
      {posts.length > 0 && (
        <section className="border-t border-line bg-white py-20 sm:py-24">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHead kicker="From the blog" title="Notes on reliability." />
              <Button href="/blog" variant="outline">
                All posts <ArrowRight />
              </Button>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {posts.map((p, i) => (
                <div key={p.id} data-reveal style={{ ["--d" as string]: `${i * 80}ms` }}>
                  <PostCard post={p} />
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="px-3 pb-3 pt-3 sm:px-5 sm:pb-5">
        <div className="night-glow grain relative mx-auto max-w-[90rem] overflow-hidden rounded-[2rem] bg-signal-2 text-white">
          <div aria-hidden="true" className="absolute inset-0 opacity-30 [mask-image:linear-gradient(90deg,transparent,#000_40%,#000_60%,transparent)]">
            <WorldMap dark className="absolute left-1/2 top-1/2 w-[max(100%,1100px)] -translate-x-1/2 -translate-y-1/2" />
          </div>
          <Container className="relative flex flex-col items-start justify-between gap-8 py-16 sm:py-20 lg:flex-row lg:items-center lg:py-24">
            <div>
              <Kicker light>Get started</Kicker>
              <h2 className="mt-4 max-w-2xl text-4xl leading-[1.02] sm:text-6xl lg:text-7xl">Your next outage could be a non-event.</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href="/pricing" variant="white">
                Start free <ArrowRight />
              </Button>
              <Button href="/contact" variant="ghostLight">
                Talk to us
              </Button>
            </div>
          </Container>
        </div>
      </section>
    </>
  );
}
