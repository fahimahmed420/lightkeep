import type { Metadata } from "next";
import { ArrowRight, Button, Check, Container, PageIntro, SectionHead } from "@/components/ui";
import { StatusPageMock } from "@/components/product";
import { Cell, CellHead, IncidentTimeline } from "@/components/bento";
import { CountUp } from "@/components/CountUp";

export const metadata: Metadata = { title: "Status pages", description: "Branded public and private status pages with incident updates, subscribers and 90-day uptime history." };

const features = [
  ["Your brand, your domain", "Logo, colors and status.yourcompany.com, with HTTPS handled for you."],
  ["Automatic component status", "Linked monitors update components the moment something breaks."],
  ["Post from Slack", "Type /incident and your update is live on the page and emailed to subscribers."],
  ["Subscribers", "Email, RSS and webhook subscriptions, per component if customers prefer."],
  ["Private pages", "Password or SSO-protected pages for internal teams and enterprise customers."],
  ["Scheduled maintenance", "Announce maintenance windows in advance, with automatic reminders."],
];

export default function StatusPagesPage() {
  return (
    <>
      <PageIntro kicker="Status pages" title={<>Fewer tickets. <em className="text-signal">More trust.</em></>} intro="A status page answers the question every customer asks during an outage. Lightkeep keeps it accurate without anyone remembering to update it." aside={<StatusPageMock compact />}>
        <Button href="/pricing">
          Create a status page <ArrowRight />
        </Button>
        <Button href="/status" variant="outline">
          See ours
        </Button>
      </PageIntro>
      <section className="py-16 sm:py-20 lg:py-24">
        <Container className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="grid gap-5">
            <Cell>
              <CellHead kicker="Incident" title="Updates, stamped and posted." body="Every state change goes to the page, email subscribers and RSS." />
              <IncidentTimeline />
            </Cell>
            <div data-reveal className="hairline night-glow rounded-3xl bg-night p-7 text-white">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal-3">Slack</p>
              <p className="mt-3 font-mono text-sm leading-relaxed text-[#d6e2dc]">
                <span className="text-fog">maya ·</span> /incident update monitoring &quot;Switched resolver, latency recovering&quot;
              </p>
              <p className="mt-3 rounded-xl bg-white/5 px-3 py-2 font-mono text-xs text-fog">✓ Posted to status.parcelry.com · 1,204 subscribers emailed</p>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {features.map(([t, d], i) => (
              <div key={t} data-reveal style={{ ["--d" as string]: `${i * 60}ms` }} className="rounded-2xl border border-line bg-white p-6">
                <Check className="h-5 w-5 text-signal" />
                <h2 className="mt-3 text-2xl">{t}</h2>
                <p className="mt-1.5 text-muted">{d}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section className="border-t border-line bg-white py-16 sm:py-20 lg:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
          <p className="font-display text-[6rem] leading-none text-signal sm:text-[8rem] lg:text-[10rem]">
            <CountUp value={68} prefix="−" suffix="%" />
          </p>
          <div>
            <SectionHead kicker="Result" title="Parcelry cut incident tickets by two thirds." intro="Their status page now answers customers before the support inbox fills up." />
            <div className="mt-8">
              <Button href="/customers">
                Read the story <ArrowRight />
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
