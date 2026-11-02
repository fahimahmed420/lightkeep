import type { Metadata } from "next";
import { ArrowRight, Button, Container, PageIntro, SectionHead } from "@/components/ui";

export const metadata: Metadata = { title: "About", description: "Lightkeep is a small, remote team building calm, reliable monitoring for product teams." };

const values = [
  ["Calm by default", "Every alert should mean a human needs to act. We'd rather miss a blip than wake you for one."],
  ["Honest numbers", "Our uptime, our incidents and our postmortems are public, including the embarrassing ones."],
  ["Small-team pricing", "Reliability tooling shouldn't need an enterprise budget. Our free plan is a real product."],
];

const stats = [
  ["2021", "founded"],
  ["14", "people, fully remote"],
  ["1.8B", "checks run last month"],
  ["41s", "median time to alert"],
];

export default function AboutPage() {
  return (
    <>
      <PageIntro kicker="About" title="We build the tool we wanted on call." intro="Lightkeep started after one too many nights debugging a false alarm. We're a small, remote team building monitoring that respects your sleep." />
      <section className="border-b border-line bg-white">
        <Container>
          <dl className="grid grid-cols-2 divide-x divide-line lg:grid-cols-4">
            {stats.map(([v, l]) => (
              <div key={l} className="px-4 py-10 text-center sm:px-6">
                <dt className="sr-only">{l}</dt>
                <dd>
                  <span className="block font-display text-5xl">{v}</span>
                  <span className="mt-1 block text-muted">{l}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>
      <section className="py-24 sm:py-28">
        <Container>
          <SectionHead kicker="What we believe" title="Three rules we build by." />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {values.map(([t, d], i) => (
              <div key={t} data-reveal style={{ ["--d" as string]: `${i * 80}ms` }} className="rounded-3xl border border-line bg-white p-8">
                <p className="font-mono text-sm text-signal">0{i + 1}</p>
                <h2 className="mt-4 text-3xl">{t}</h2>
                <p className="mt-3 text-lg leading-relaxed text-muted">{d}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section className="bg-night py-24 text-white">
        <Container className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <SectionHead light kicker="Careers" title="We're hiring a reliability engineer." intro="Remote, anywhere between UTC−5 and UTC+3." />
          <Button href="/contact" variant="white">
            Get in touch <ArrowRight />
          </Button>
        </Container>
      </section>
    </>
  );
}
