import type { Metadata } from "next";
import { customers, logos } from "@/content/site";
import { ArrowRight, Button, Container, PageIntro } from "@/components/ui";

export const metadata: Metadata = { title: "Customers", description: "How product teams use Lightkeep to catch outages faster and keep customers informed." };

const stories = [
  { ...customers[0], challenge: "Parcelry's API powers checkout for 300 online shops. Outages turned into a flood of support tickets before engineers even knew something was wrong.", solution: "Multi-region API checks with body assertions, on-call routing to the platform team, and a public status page linked from every error message." },
  { ...customers[1], challenge: "Enterprise contracts promised 99.95% uptime, but proving it meant a day of spreadsheet work every month.", solution: "SLA reports generated per customer-facing component, exported straight into the monthly customer review." },
  { ...customers[2], challenge: "Forty microservices, each with its own ad-hoc health checks, and no single view of what was actually up.", solution: "Monitors defined in Terraform next to each service, so nothing ships without monitoring." },
];

export default function CustomersPage() {
  return (
    <>
      <PageIntro kicker="Customers" title="Teams that found out first." intro="From two-person startups to companies with enterprise SLAs, here's how teams run Lightkeep. These customer stories are fictional, written for this concept site." />
      <section className="border-b border-line bg-white">
        <Container className="grid grid-cols-2 gap-6 py-10 sm:grid-cols-4 lg:grid-cols-8">
          {logos.map((l) => (
            <p key={l} className="text-center font-display text-xl text-ink/45">
              {l}
            </p>
          ))}
        </Container>
      </section>
      <section className="py-20 sm:py-28">
        <Container className="space-y-8">
          {stories.map((s, i) => (
            <article key={s.company} data-reveal className="grid overflow-hidden rounded-3xl border border-line bg-white lg:grid-cols-[0.8fr_1.2fr]">
              <div className={`flex flex-col justify-between p-8 sm:p-10 ${i % 2 ? "bg-night text-white" : "bg-signal-soft"}`}>
                <div>
                  <p className="font-display text-3xl">{s.company}</p>
                  <p className={`mt-1 font-mono text-xs uppercase tracking-[0.18em] ${i % 2 ? "text-[#7fd3ac]" : "text-signal-2"}`}>{s.industry}</p>
                </div>
                <div className="mt-12">
                  <p className="font-display text-6xl">{s.metric}</p>
                  <p className={`mt-1 ${i % 2 ? "text-[#b7c4be]" : "text-ink-2"}`}>{s.metricLabel}</p>
                </div>
              </div>
              <div className="p-8 sm:p-10">
                <blockquote className="font-display text-2xl leading-snug sm:text-3xl">“{s.quote}”</blockquote>
                <p className="mt-4 text-muted">
                  {s.person}, {s.role}
                </p>
                <div className="mt-8 grid gap-6 border-t border-line pt-8 sm:grid-cols-2">
                  <div>
                    <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-muted">The challenge</h2>
                    <p className="mt-2 leading-relaxed">{s.challenge}</p>
                  </div>
                  <div>
                    <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-muted">With Lightkeep</h2>
                    <p className="mt-2 leading-relaxed">{s.solution}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </Container>
      </section>
      <section className="pb-24 text-center">
        <Button href="/contact">
          Talk to us about your setup <ArrowRight />
        </Button>
      </section>
    </>
  );
}
