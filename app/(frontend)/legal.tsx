import { Container, Kicker } from "@/components/ui";

/** Shared layout for Privacy, Terms and Credits. */
export function LegalPage({ kicker, title, updated, sections }: { kicker: string; title: string; updated?: string; sections: [string, string][] }) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div aria-hidden="true" className="dots dots-fade absolute inset-0" />
        <Container className="relative max-w-3xl pb-12 pt-14 sm:pt-20">
          <Kicker>{kicker}</Kicker>
          <h1 className="fade-up mt-4 text-5xl sm:text-6xl lg:text-7xl">{title}</h1>
          {updated && <p className="mt-4 font-mono text-sm text-muted">Last updated {updated}</p>}
        </Container>
      </section>
      <section className="py-12 sm:py-16">
        <Container className="max-w-3xl space-y-10">
          {sections.map(([h, p], i) => (
            <section key={h} data-reveal className="grid gap-3 sm:grid-cols-[3rem_1fr]">
              <p className="font-mono text-sm text-signal">0{i + 1}</p>
              <div>
                <h2 className="text-3xl">{h}</h2>
                <p className="mt-3 text-lg leading-relaxed text-muted">{p}</p>
              </div>
            </section>
          ))}
        </Container>
      </section>
    </>
  );
}
