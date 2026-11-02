import { Container, Kicker } from "@/components/ui";

/** Shared layout for Privacy, Terms and Credits. */
export function LegalPage({ kicker, title, updated, sections }: { kicker: string; title: string; updated?: string; sections: [string, string][] }) {
  return (
    <section className="py-16 sm:py-24">
      <Container className="max-w-3xl">
        <Kicker>{kicker}</Kicker>
        <h1 className="mt-4 text-5xl sm:text-6xl">{title}</h1>
        {updated && <p className="mt-4 font-mono text-sm text-muted">Last updated {updated}</p>}
        <div className="mt-12 space-y-10">
          {sections.map(([h, p]) => (
            <section key={h}>
              <h2 className="text-3xl">{h}</h2>
              <p className="mt-3 text-lg leading-relaxed text-muted">{p}</p>
            </section>
          ))}
        </div>
      </Container>
    </section>
  );
}
