import type { Metadata } from "next";
import { customers } from "@/content/site";
import { ArrowRight, Button, Container, PageIntro, SectionHead } from "@/components/ui";
import { LogoMarquee } from "@/components/Marquee";
import { CountUp } from "@/components/CountUp";
import { Sparkline } from "@/components/product";

export const metadata: Metadata = { title: "Customers", description: "How product teams use Lightkeep to catch outages faster and keep customers informed." };

const stories = [
  { ...customers[0], challenge: "Parcelry's API powers checkout for 300 online shops. Outages turned into a flood of support tickets before engineers even knew something was wrong.", solution: "Multi-region API checks with body assertions, on-call routing to the platform team, and a public status page linked from every error message.", before: 412, after: 131, unit: "tickets / incident", seed: 51 },
  { ...customers[1], challenge: "Enterprise contracts promised 99.95% uptime, but proving it meant a day of spreadsheet work every month.", solution: "SLA reports generated per customer-facing component, exported straight into the monthly customer review.", before: 8, after: 0.2, unit: "hours / report", seed: 52 },
  { ...customers[2], challenge: "Forty microservices, each with its own ad-hoc health checks, and no single view of what was actually up.", solution: "Monitors defined in Terraform next to each service, so nothing ships without monitoring.", before: 11, after: 40, unit: "services monitored", seed: 53 },
];

export default function CustomersPage() {
  return (
    <>
      <PageIntro kicker="Customers" title={<>Teams that found out <em className="text-signal">first</em>.</>} intro="From two-person startups to companies with enterprise SLAs, here's how teams run Lightkeep. These customer stories are fictional, written for this concept site." />
      <LogoMarquee label="Product teams running Lightkeep" />
      <section className="py-16 sm:py-20 lg:py-24">
        <Container className="space-y-6">
          {stories.map((s, i) => {
            const dark = i % 2 === 1;
            return (
              <article key={s.company} data-reveal className={`grid overflow-hidden rounded-3xl border lg:grid-cols-[0.85fr_1.15fr] ${dark ? "night-glow border-white/10 bg-night text-white" : "border-line bg-white"}`}>
                <div className={`relative flex flex-col justify-between p-8 sm:p-10 ${dark ? "" : "bg-signal-soft/60"}`}>
                  <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-32 opacity-50">
                    <Sparkline seed={s.seed} draw className="h-full w-full" stroke={dark ? "#7fd3ac" : "#17895c"} />
                  </div>
                  <div className="relative">
                    <p className="font-display text-4xl">{s.company}</p>
                    <p className={`mt-1 font-mono text-xs uppercase tracking-[0.2em] ${dark ? "text-signal-3" : "text-signal-2"}`}>{s.industry}</p>
                  </div>
                  <div className="relative mt-14">
                    <p className="font-display text-7xl leading-none lg:text-8xl">{s.metric}</p>
                    <p className={`mt-2 ${dark ? "text-fog" : "text-ink-2"}`}>{s.metricLabel}</p>
                    <div className={`mt-6 flex items-center gap-3 rounded-full border px-4 py-2 font-mono text-xs ${dark ? "border-white/15 bg-night-2" : "border-line bg-white"}`}>
                      <span className={dark ? "text-fog" : "text-muted"}>Before</span>
                      <span className="tabular">{s.before}</span>
                      <ArrowRight className="h-3 w-3 opacity-60" />
                      <span className={dark ? "text-fog" : "text-muted"}>After</span>
                      <span className={`tabular font-semibold ${dark ? "text-signal-3" : "text-signal-2"}`}>
                        <CountUp value={s.after} decimals={s.after % 1 ? 1 : 0} />
                      </span>
                      <span className={`ml-auto ${dark ? "text-fog" : "text-muted"}`}>{s.unit}</span>
                    </div>
                  </div>
                </div>
                <div className="p-8 sm:p-10 lg:p-12">
                  <blockquote className="font-display text-2xl leading-snug sm:text-3xl lg:text-[2.1rem]">“{s.quote}”</blockquote>
                  <p className={`mt-5 ${dark ? "text-fog" : "text-muted"}`}>
                    <span className={dark ? "text-white" : "text-ink"}>{s.person}</span>, {s.role}
                  </p>
                  <div className={`mt-8 grid gap-6 border-t pt-8 sm:grid-cols-2 ${dark ? "border-white/10" : "border-line"}`}>
                    <div>
                      <h2 className={`font-mono text-xs uppercase tracking-[0.2em] ${dark ? "text-signal-3" : "text-signal"}`}>The challenge</h2>
                      <p className={`mt-2 leading-relaxed ${dark ? "text-[#dfe7e3]" : ""}`}>{s.challenge}</p>
                    </div>
                    <div>
                      <h2 className={`font-mono text-xs uppercase tracking-[0.2em] ${dark ? "text-signal-3" : "text-signal"}`}>With Lightkeep</h2>
                      <p className={`mt-2 leading-relaxed ${dark ? "text-[#dfe7e3]" : ""}`}>{s.solution}</p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </Container>
      </section>
      <section className="border-t border-line bg-white py-16 sm:py-20">
        <Container className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <SectionHead kicker="Your turn" title="Tell us what you're running." intro="Twenty minutes, your real endpoints, and an alert you can see land in Slack." />
          <Button href="/contact">
            Talk to us about your setup <ArrowRight />
          </Button>
        </Container>
      </section>
    </>
  );
}
