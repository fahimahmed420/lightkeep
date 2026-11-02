import type { Metadata } from "next";
import { Container, StatusDot } from "@/components/ui";
import { UptimeBars } from "@/components/product";
import { components, incidents } from "@/lib/status";
import { LiveCheck } from "./LiveCheck";

export const metadata: Metadata = { title: "System status", description: "Live status of Lightkeep's website, API, check runners and alert delivery." };

export default function StatusPage() {
  const comps = components();
  const groups = [...new Set(comps.map((c) => c.group))];
  return (
    <section className="py-14 sm:py-20">
      <Container className="max-w-4xl">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">status.lightkeep.io</p>
        <h1 className="mt-3 text-5xl sm:text-6xl">System status</h1>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-signal-soft px-6 py-5 text-signal-2">
          <p className="flex items-center gap-3 text-lg font-medium">
            <StatusDot pulse /> All systems operational
          </p>
          <LiveCheck />
        </div>

        <div className="mt-10 space-y-8">
          {groups.map((g) => (
            <div key={g} className="overflow-hidden rounded-2xl border border-line bg-white">
              <p className="border-b border-line bg-cloud/60 px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] text-muted">{g}</p>
              <ul className="divide-y divide-line">
                {comps
                  .filter((c) => c.group === g)
                  .map((c) => (
                    <li key={c.name} className="px-6 py-5">
                      <div className="flex items-center justify-between gap-4">
                        <span className="flex items-center gap-2.5 font-medium">
                          <StatusDot /> {c.name}
                        </span>
                        <span className="font-mono text-sm tabular-nums text-muted">{c.uptime.toFixed(3)}% uptime</span>
                      </div>
                      <UptimeBars days={c.days} className="mt-3 h-8" />
                      <div className="mt-1.5 flex justify-between font-mono text-[0.7rem] text-muted">
                        <span>90 days ago</span>
                        <span>Today</span>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>

        <h2 className="mt-16 text-4xl">Past incidents</h2>
        <div className="mt-6 space-y-5">
          {incidents.map((inc) => (
            <article key={inc.title} className="rounded-2xl border border-line bg-white p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="flex items-center gap-2.5 text-2xl">
                  <StatusDot status={inc.impact} /> {inc.title}
                </h3>
                <span className="font-mono text-sm text-muted">{inc.date}</span>
              </div>
              <ol className="mt-4 space-y-3 border-l border-line pl-5">
                {inc.updates.map(([state, time, text]) => (
                  <li key={time}>
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
  );
}
