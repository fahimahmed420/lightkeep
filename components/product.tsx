import { components, responseSeries, type DayStatus } from "@/lib/status";
import { StatusDot } from "./ui";

export function Sparkline({ seed, className = "h-8 w-28", stroke = "#17895c" }: { seed: number; className?: string; stroke?: string }) {
  const s = responseSeries(seed, 40);
  const max = 420;
  const pts = s.map((v, i) => `${(i / (s.length - 1)) * 100},${30 - (v / max) * 28}`).join(" ");
  return (
    <svg aria-hidden="true" viewBox="0 0 100 30" preserveAspectRatio="none" className={className}>
      <polyline points={`0,30 ${pts} 100,30`} fill={stroke} fillOpacity="0.08" stroke="none" />
      <polyline points={pts} fill="none" stroke={stroke} strokeWidth="1.4" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
    </svg>
  );
}

const dayColor: Record<DayStatus, string> = { up: "bg-signal", degraded: "bg-amber", down: "bg-red" };

export function UptimeBars({ days, className = "h-8", count = 90 }: { days: DayStatus[]; className?: string; count?: number }) {
  const shown = days.slice(-count);
  return (
    <div className={`bars flex items-stretch gap-[2px] ${className}`} role="img" aria-label={`Last ${shown.length} days: ${shown.filter((d) => d !== "up").length} days with issues`}>
      {shown.map((d, i) => (
        <span key={i} title={d} className={`flex-1 rounded-[2px] ${dayColor[d]} ${d === "up" ? "opacity-85" : ""}`} style={{ animationDelay: `${i * 8}ms` }} />
      ))}
    </div>
  );
}

const monitors = [
  { name: "api.parcelry.com", type: "HTTPS · 30s", region: "12 regions", status: "up" as const, ms: 182, seed: 11 },
  { name: "eu.api.parcelry.com", type: "HTTPS · 30s", region: "Frankfurt", status: "degraded" as const, ms: 912, seed: 14 },
  { name: "checkout.parcelry.com", type: "HTTPS · 30s", region: "12 regions", status: "up" as const, ms: 241, seed: 12 },
  { name: "Nightly invoice job", type: "Cron heartbeat", region: "Expected 02:00", status: "up" as const, ms: 0, seed: 13 },
  { name: "parcelry.com SSL", type: "Certificate", region: "Expires in 62 days", status: "up" as const, ms: 0, seed: 15 },
];

/** The dashboard as a real component, used in the home hero and product pages. */
export function DashboardMock({ compact = false }: { compact?: boolean }) {
  const shown = compact ? monitors.slice(0, 4) : monitors;
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white text-left shadow-[var(--shadow-float)]">
      <div className="flex items-center justify-between border-b border-line bg-cloud/60 px-4 py-3">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-line-2" />
          <span className="h-2.5 w-2.5 rounded-full bg-line-2" />
          <span className="h-2.5 w-2.5 rounded-full bg-line-2" />
        </div>
        <p className="truncate px-3 font-mono text-xs text-muted">app.lightkeep.io/parcelry/monitors</p>
        <span className="hidden w-10 sm:block" />
      </div>
      <div className="grid grid-cols-3 divide-x divide-line border-b border-line">
        {[
          ["Uptime · 30d", "99.982%"],
          ["Avg response", "214 ms"],
          ["Open incidents", "1"],
        ].map(([k, v], i) => (
          <div key={k} className="px-4 py-3">
            <p className="text-[0.7rem] uppercase tracking-wider text-muted">{k}</p>
            <p className={`mt-0.5 font-mono text-lg tabular-nums ${i === 2 ? "text-amber" : "text-ink"}`}>{v}</p>
          </div>
        ))}
      </div>
      <ul className="divide-y divide-line">
        {shown.map((m) => (
          <li key={m.name} className="flex items-center gap-3 px-4 py-3">
            <StatusDot status={m.status} pulse={m.status !== "up"} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink">{m.name}</p>
              <p className="truncate text-xs text-muted">
                {m.type} · {m.region}
              </p>
            </div>
            {m.ms ? (
              <>
                <Sparkline seed={m.seed} className="hidden h-7 w-24 sm:block" stroke={m.status === "up" ? "#17895c" : "#c7871f"} />
                <span className={`w-16 text-right font-mono text-xs tabular-nums ${m.status === "up" ? "text-muted" : "text-amber"}`}>{m.ms} ms</span>
              </>
            ) : (
              <span className="w-16 text-right font-mono text-xs text-signal">OK</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AlertCard() {
  return (
    <div className="w-72 rounded-2xl border border-line bg-white p-4 shadow-[var(--shadow-float)]">
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#4a154b] font-mono text-xs font-bold text-white">#</span>
        <p className="text-sm font-medium text-ink">#oncall-platform</p>
        <span className="ml-auto font-mono text-[0.7rem] text-muted">now</span>
      </div>
      <p className="mt-3 text-sm leading-snug text-ink-2">
        <span className="font-semibold text-amber">Degraded:</span> eu.api.parcelry.com responding in 912 ms from Frankfurt (threshold 500 ms). Confirmed from 3 regions.
      </p>
      <div className="mt-3 flex gap-2">
        <span className="rounded-md bg-ink px-2.5 py-1 text-xs font-medium text-white">Acknowledge</span>
        <span className="rounded-md border border-line px-2.5 py-1 text-xs text-ink">Open incident</span>
      </div>
    </div>
  );
}

export function StatusPageMock() {
  const comps = components().slice(0, 4);
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[var(--shadow-float)]">
      <div className="bg-[#1d3557] px-6 py-5 text-white">
        <p className="font-display text-xl">Parcelry status</p>
      </div>
      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-3 rounded-xl bg-signal-soft px-4 py-3 text-signal-2">
          <StatusDot pulse />
          <p className="font-medium">All systems operational</p>
        </div>
        <ul className="mt-5 space-y-5">
          {comps.map((c) => (
            <li key={c.name}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-ink">{c.name}</span>
                <span className="font-mono text-xs text-muted">{c.uptime.toFixed(2)}%</span>
              </div>
              <UptimeBars days={c.days} count={45} className="mt-2 h-7" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
