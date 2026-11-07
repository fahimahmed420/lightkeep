import type { Metadata } from "next";
import { Container, StatusDot } from "@/components/ui";
import { LatencyChart, UptimeBars } from "@/components/product";
import { components, incidents } from "@/lib/status";
import { LiveCheck } from "./LiveCheck";

export const metadata: Metadata = { title: "System status", description: "Live status of Lightkeep's website, API, check runners and alert delivery." };

const impactLabel = { up: "Operational", degraded: "Degraded", down: "Outage" } as const;

export default function StatusPage() {
  const comps = components();
  const groups = [...new Set(comps.map((c) => c.group))];
  const overall = comps.reduce((s, c) => s + c.uptime, 0) / comps.length;
  return (
    <>
      <section className="night-grid night-glow grain relative overflow-hidden text-white">
        <Container className="relative max-w-5xl py-14 sm:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal-3">status.lightkeep.io</p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
            <h1 className="fade-up text-5xl sm:text-6xl lg:text-7xl">All systems operational.</h1>
            <LiveCheck />
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4">
            {[
              ["Uptime · 90d", `${overall.toFixed(3)}%`],
              ["Components", `${comps.length} of ${comps.length} up`],
              ["Open incidents", "0"],
              ["Last incident", incidents[0].date.replace(/,.*$/, "")],
            ].map(([k, v]) => (
              <div key={k} className="bg-night/80 px-5 py-4 backdrop-blur">
                <dt className="font-mono text-[0.75rem] uppercase tracking-wider text-fog">{k}</dt>
                <dd className="mt-1 font-mono text-xl tabular-nums text-white">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 rounded-2xl border border-white/10 bg-night/70 p-5 backdrop-blur">
            <p className="font-mono text-[0.75rem] uppercase tracking-wider text-fog">API response time · last 24 h · ms</p>
            <LatencyChart dark className="mt-3 h-44 sm:h-52" seeds={[["Public API", 3, "#7fd3ac"], ["Dashboard", 2, "#9ec5ff"], ["Status pages", 7, "#f2c879"]]} />
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container className="max-w-5xl space-y-6">
          {groups.map((g, gi) => (
            <div key={g} data-reveal style={{ ["--d" as string]: `${gi * 70}ms` }} className="overflow-hidden rounded-2xl border border-line bg-white">
              <p className="flex items-center justify-between border-b border-line bg-cloud/60 px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
                {g}
                <span className="normal-case tracking-normal">{comps.filter((c) => c.group === g).length} components</span>
              </p>
              <ul className="divide-y divide-line">
                {comps
                  .filter((c) => c.group === g)
                  .map((c) => (
                    <li key={c.name} className="px-6 py-5">
                      <div className="flex items-center justify-between gap-4">
                        <span className="flex items-center gap-2.5 font-medium">
                          <StatusDot /> {c.name}
                        </span>
                        <span className="flex items-center gap-4 font-mono text-sm tabular-nums text-muted">
                          <span className="hidden sm:inline">{c.latency} ms</span>
                          <span>{c.uptime.toFixed(3)}%</span>
                        </span>
                      </div>
                      <UptimeBars days={c.days} className="mt-3 h-8" />
                      <div className="mt-1.5 flex justify-between font-mono text-[0.75rem] text-muted">
                        <span>90 days ago</span>
                        <span>Today</span>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </Container>
      </section>

      <section className="border-t border-line bg-white py-12 sm:py-16">
        <Container className="max-w-5xl">
          <h2 className="text-4xl lg:text-5xl">Past incidents</h2>
          <div className="mt-8 space-y-5">
            {incidents.map((inc) => (
              <article key={inc.title} data-reveal className="rounded-2xl border border-line bg-paper p-6 sm:p-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="flex items-center gap-2.5 text-2xl">
                    <StatusDot status={inc.impact} /> {inc.title}
                  </h3>
                  <span className="flex items-center gap-3 font-mono text-sm text-muted">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs ${inc.impact === "down" ? "bg-red-soft text-red" : "bg-amber-soft text-amber"}`}>{impactLabel[inc.impact]}</span>
                    {inc.date}
                  </span>
                </div>
                <ol className="mt-5 space-y-4 border-l border-line pl-5">
                  {inc.updates.map(([state, time, text], i) => (
                    <li key={time} className="relative">
                      <span aria-hidden="true" className={`absolute -left-[26px] top-1.5 h-2.5 w-2.5 rounded-full ring-2 ring-paper ${i === 0 ? "bg-signal" : "bg-line-2"}`} />
                      <p className="text-sm">
                        <span className="font-medium">{state}</span> <span className="font-mono text-muted">· {time}</span>
                      </p>
                      <p className="mt-0.5 text-muted">{text}</p>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
