import type { Metadata } from "next";
import { ArrowRight, Button, Container, PageIntro, SectionHead } from "@/components/ui";
import { CountUp } from "@/components/CountUp";
import { WorldMap } from "@/components/WorldMap";

export const metadata: Metadata = { title: "About", description: "Lightkeep is a small, remote team building calm, reliable monitoring for product teams." };

const values = [
  ["Calm by default", "Every alert should mean a human needs to act. We'd rather miss a blip than wake you for one."],
  ["Honest numbers", "Our uptime, our incidents and our postmortems are public, including the embarrassing ones."],
  ["Small-team pricing", "Reliability tooling shouldn't need an enterprise budget. Our free plan is a real product."],
];

const stats: [number, string, string, number][] = [
  [2021, "", "founded", 0],
  [14, "", "people, fully remote", 0],
  [1.8, "B", "checks run last month", 1],
  [41, "s", "median time to alert", 0],
];

export default function AboutPage() {
  return (
    <>
      <PageIntro kicker="About" title={<>We build the tool we wanted <em className="text-signal">on call</em>.</>} intro="Lightkeep started after one too many nights debugging a false alarm. We're a small, remote team building monitoring that respects your sleep." />
      <section className="border-b border-line bg-white">
        <Container>
          <dl className="grid grid-cols-2 divide-x divide-line lg:grid-cols-4">
            {stats.map(([v, suf, l, dec], i) => (
              <div key={l} data-reveal style={{ ["--d" as string]: `${i * 70}ms` }} className="px-4 py-10 text-center sm:px-6">
                <dt className="sr-only">{l}</dt>
                <dd>
                  <span className="block font-display text-5xl lg:text-6xl">{i === 0 ? <span className="tabular">{v}</span> : <CountUp value={v} decimals={dec} suffix={suf} />}</span>
                  <span className="mt-2 block text-muted">{l}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>
      <section className="py-20 sm:py-24 lg:py-28">
        <Container>
          <SectionHead kicker="What we believe" title="Three rules we build by." />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {values.map(([t, d], i) => (
              <div key={t} data-reveal style={{ ["--d" as string]: `${i * 80}ms` }} className="rounded-3xl border border-line bg-white p-8 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]">
                <p className="font-mono text-sm text-signal">0{i + 1}</p>
                <h2 className="mt-4 text-3xl">{t}</h2>
                <p className="mt-3 text-lg leading-relaxed text-muted">{d}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section className="night-grid night-glow grain relative overflow-hidden py-20 text-white sm:py-24">
        <div aria-hidden="true" className="absolute inset-0 opacity-50 [mask-image:linear-gradient(180deg,transparent,#000_30%,#000_70%,transparent)]">
          <WorldMap dark className="absolute left-1/2 top-1/2 w-[max(100%,1100px)] -translate-x-1/2 -translate-y-1/2" />
        </div>
        <Container className="relative">
          <SectionHead light size="lg" kicker="Where we are" title="Fourteen people, nine time zones, zero offices." intro="We hire between UTC−5 and UTC+3 so there's always someone awake, and we run our own on-call on Lightkeep." />
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/contact" variant="white">
              We&apos;re hiring a reliability engineer <ArrowRight />
            </Button>
            <Button href="/status" variant="ghostLight">
              Our live status
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
