import Link from "next/link";
import { customers, integrations, logos, plans, regions } from "@/content/site";
import { ArrowRight, Button, Check, Container, Kicker, SectionHead, StatusDot } from "@/components/ui";
import { AlertCard, DashboardMock, StatusPageMock } from "@/components/product";
import { PostCard } from "@/components/PostCard";
import { latestPosts } from "@/lib/payload";

export const revalidate = 300;

const steps = [
  { t: "Add a URL", d: "Paste an address, an API endpoint or a cron schedule. No agent to install." },
  { t: "We check it worldwide", d: "Every 30 seconds from 12 regions. A failure is confirmed from three before anyone is woken up." },
  { t: "The right person hears first", d: "Slack, SMS or a phone call, following your on-call schedule, with escalation if nobody responds." },
  { t: "Customers stay informed", d: "Your status page updates itself, and subscribers get an email the moment you post an update." },
];

export default async function Home() {
  const posts = await latestPosts(3);
  return (
    <>
      {/* Hero */}
      <section className="dots relative overflow-hidden border-b border-line">
        <Container className="pb-20 pt-14 sm:pt-20 lg:pb-28">
          <div className="mx-auto max-w-4xl text-center">
            <Link
              href="/changelog"
              data-reveal
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-white py-1.5 pl-1.5 pr-4 text-sm text-ink-2 shadow-[var(--shadow-card)] hover:border-line-2"
            >
              <span className="rounded-full bg-signal-soft px-2.5 py-0.5 font-mono text-xs text-signal-2">New</span>
              Cron heartbeats and SLA reports
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <h1 data-reveal style={{ ["--d" as string]: "80ms" }} className="mt-7 text-[3rem] leading-[0.98] sm:text-7xl lg:text-[5.6rem]">
              Know it&apos;s down <em className="text-signal">before</em> your customers do.
            </h1>
            <p data-reveal style={{ ["--d" as string]: "160ms" }} className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              Lightkeep checks your sites and APIs every 30 seconds from 12 regions, wakes the right person in seconds, and keeps customers informed with a status page that updates itself.
            </p>
            <div data-reveal style={{ ["--d" as string]: "240ms" }} className="mt-9 flex flex-wrap justify-center gap-3">
              <Button href="/pricing">
                Start monitoring free <ArrowRight />
              </Button>
              <Button href="/contact" variant="outline">
                Book a demo
              </Button>
            </div>
            <p data-reveal style={{ ["--d" as string]: "300ms" }} className="mt-5 text-sm text-muted">
              Free for 10 monitors · No card required · Set up in 2 minutes
            </p>
          </div>

          <div data-reveal style={{ ["--d" as string]: "200ms" }} className="relative mx-auto mt-16 max-w-5xl md:mb-32">
            <DashboardMock />
            <div className="absolute -bottom-40 right-6 hidden md:block lg:-right-12">
              <AlertCard />
            </div>
          </div>
        </Container>
      </section>

      {/* Logos */}
      <section className="border-b border-line bg-white">
        <Container className="py-10">
          <p className="text-center text-sm text-muted">Trusted by product teams at</p>
          <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4 lg:grid-cols-8">
            {logos.map((l, i) => (
              <li key={l} className="text-center font-display text-xl text-ink/45" style={{ fontStyle: i % 3 === 0 ? "italic" : "normal", fontWeight: i % 2 ? 600 : 400 }}>
                {l}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Features */}
      <section className="py-24 sm:py-32">
        <Container>
          <SectionHead kicker="Monitoring" title="Fewer false alarms. Faster real ones." intro="Most monitoring tools wake you for a blip in one region. Lightkeep confirms every failure from three locations first, so an alert always means something." />
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            <div data-reveal className="rounded-3xl border border-line bg-white p-7 lg:col-span-2">
              <Kicker>12 regions</Kicker>
              <h3 className="mt-3 text-3xl">Checked from where your customers are.</h3>
              <ul className="mt-6 flex flex-wrap gap-2">
                {regions.map((r, i) => (
                  <li key={r} className="flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1.5 text-sm">
                    <StatusDot status={i === 5 ? "degraded" : "up"} />
                    {r}
                    <span className="font-mono text-xs text-muted">{[38, 41, 112, 52, 76, 91, 84, 168, 143, 155, 201, 189][i]}ms</span>
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal style={{ ["--d" as string]: "80ms" }} className="rounded-3xl bg-night p-7 text-white">
              <Kicker light>Confirmation</Kicker>
              <p className="mt-3 font-display text-6xl">3 of 12</p>
              <p className="mt-3 text-[#b7c4be]">regions must agree before an alert fires. Typical time from failure to page: 41 seconds.</p>
            </div>
            {[
              ["HTTP & API checks", "Status codes, response time, headers and JSON body assertions."],
              ["Cron heartbeats", "Know when the nightly job didn't run, not just when it failed."],
              ["SSL & domains", "Warnings 30, 14 and 3 days before a certificate or domain expires."],
            ].map(([t, d], i) => (
              <div key={t} data-reveal style={{ ["--d" as string]: `${i * 80}ms` }} className="rounded-3xl border border-line bg-white p-7">
                <h3 className="text-2xl">{t}</h3>
                <p className="mt-2 leading-relaxed text-muted">{d}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Button href="/product/monitoring" variant="outline">
              Explore monitoring <ArrowRight />
            </Button>
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="border-y border-line bg-white py-24 sm:py-32">
        <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHead kicker="How it works" title="From URL to on-call in two minutes." />
          <ol className="space-y-px overflow-hidden rounded-3xl border border-line bg-line">
            {steps.map((s, i) => (
              <li key={s.t} data-reveal style={{ ["--d" as string]: `${i * 70}ms` }} className="flex gap-5 bg-white p-6 sm:p-7">
                <span className="font-mono text-sm text-signal">0{i + 1}</span>
                <div>
                  <h3 className="text-2xl">{s.t}</h3>
                  <p className="mt-1.5 leading-relaxed text-muted">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Status pages */}
      <section className="py-24 sm:py-32">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHead kicker="Status pages" title="The page that answers support tickets for you." intro="When something breaks, customers check your status page before they email. Lightkeep keeps it current automatically, on your domain and in your colors." />
            <ul className="mt-8 space-y-3">
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
          <div data-reveal>
            <StatusPageMock />
          </div>
        </Container>
      </section>

      {/* Customers */}
      <section className="bg-night py-24 text-white sm:py-32">
        <Container>
          <SectionHead light kicker="Customers" title="Teams that sleep through the night." />
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {customers.map((c, i) => (
              <figure key={c.company} data-reveal style={{ ["--d" as string]: `${i * 80}ms` }} className="flex flex-col rounded-3xl border border-white/10 bg-night-2 p-7">
                <p className="font-display text-5xl text-[#7fd3ac]">{c.metric}</p>
                <p className="mt-1 text-sm text-[#b7c4be]">{c.metricLabel}</p>
                <blockquote className="mt-6 flex-1 text-lg leading-relaxed">“{c.quote}”</blockquote>
                <figcaption className="mt-6 border-t border-white/10 pt-5 text-sm">
                  <span className="block font-medium">{c.person}</span>
                  <span className="text-[#b7c4be]">
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

      {/* Integrations */}
      <section className="py-24 sm:py-32">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <SectionHead kicker="Alerts & integrations" title="Alerts where your team already works." intro="Route by service and severity, follow on-call schedules, and escalate when nobody acknowledges." />
          <ul data-reveal className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {integrations.map((n) => (
              <li key={n} className="rounded-2xl border border-line bg-white px-4 py-4 text-center font-medium">
                {n}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Pricing teaser */}
      <section className="border-y border-line bg-white py-24 sm:py-32">
        <Container>
          <SectionHead center kicker="Pricing" title="Simple plans that grow with you." intro="Start free. Upgrade when your customers depend on you." />
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {plans.map((p) => (
              <div key={p.id} data-reveal className={`rounded-3xl p-7 ${p.highlight ? "bg-ink text-white" : "border border-line bg-paper"}`}>
                <p className="font-mono text-xs uppercase tracking-[0.18em] opacity-70">{p.name}</p>
                <p className="mt-3 font-display text-5xl">
                  ${p.annual}
                  <span className="font-sans text-base opacity-60"> /mo</span>
                </p>
                <p className={`mt-2 ${p.highlight ? "text-[#b7c4be]" : "text-muted"}`}>{p.blurb}</p>
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
        <section className="py-24 sm:py-32">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHead kicker="From the blog" title="Notes on reliability." />
              <Button href="/blog" variant="outline">
                All posts <ArrowRight />
              </Button>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {posts.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="px-3 pb-3 sm:px-5 sm:pb-5">
        <div className="mx-auto max-w-[90rem] overflow-hidden rounded-[2rem] bg-signal-2 text-white">
          <Container className="flex flex-col items-start justify-between gap-8 py-16 sm:py-20 lg:flex-row lg:items-center">
            <h2 className="max-w-2xl text-4xl leading-[1.05] sm:text-6xl">Your next outage could be a non-event.</h2>
            <div className="flex flex-wrap gap-3">
              <Button href="/pricing" variant="white">
                Start free
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
