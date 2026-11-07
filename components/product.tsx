import { components, responseSeries, type DayStatus } from "@/lib/status";
import { StatusDot } from "./ui";
import { Ticker } from "./Ticker";

export function Sparkline({ seed, className = "h-8 w-28", stroke = "#17895c", draw = false, delay = 0 }: { seed: number; className?: string; stroke?: string; draw?: boolean; delay?: number }) {
  const s = responseSeries(seed, 40);
  const max = 420;
  const pts = s.map((v, i) => `${(i / (s.length - 1)) * 100},${30 - (v / max) * 28}`).join(" ");
  return (
    <svg aria-hidden="true" viewBox="0 0 100 30" preserveAspectRatio="none" className={className}>
      <polyline points={`0,30 ${pts} 100,30`} fill={stroke} fillOpacity="0.08" stroke="none" />
      <polyline points={pts} pathLength={1} fill="none" stroke={stroke} strokeWidth="1.4" vectorEffect="non-scaling-stroke" strokeLinejoin="round" className={draw ? "draw" : ""} style={draw ? { ["--d" as string]: `${delay}s` } : undefined} />
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

function BrowserBar({ url }: { url: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-line bg-cloud/70 px-4 py-2.5">
      <div className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-line-2" />
        <span className="h-2.5 w-2.5 rounded-full bg-line-2" />
        <span className="h-2.5 w-2.5 rounded-full bg-line-2" />
      </div>
      <p className="min-w-0 flex-1 truncate rounded-md bg-white/80 px-3 py-1 text-center font-mono text-[0.75rem] text-muted ring-1 ring-line">{url}</p>
      <span className="hidden w-10 sm:block" />
    </div>
  );
}

/** The dashboard as a real component, used in the home hero and product pages. */
export function DashboardMock({ compact = false, live = false }: { compact?: boolean; live?: boolean }) {
  const shown = compact ? monitors.slice(0, 4) : monitors;
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white text-left shadow-[var(--shadow-float)]">
      <BrowserBar url="app.lightkeep.io/parcelry/monitors" />
      <div className="grid min-w-0 grid-cols-3 divide-x divide-line border-b border-line">
        {[
          ["Uptime · 30d", "99.982%", "text-ink"],
          ["Avg response", live ? <Ticker key="t" base={214} /> : "214 ms", "text-ink"],
          ["Open incidents", "1", "text-amber"],
        ].map(([k, v, c], i) => (
          <div key={i} className="min-w-0 px-3 py-3 sm:px-5 sm:py-4">
            <p className="truncate text-[0.75rem] uppercase tracking-wider text-muted sm:text-[0.75rem]">{k as string}</p>
            <p className={`mt-0.5 truncate font-mono text-base tabular-nums sm:text-2xl ${c as string}`}>{v as React.ReactNode}</p>
          </div>
        ))}
      </div>
      <ul className="divide-y divide-line">
        {shown.map((m, i) => (
          <li key={m.name} className={`flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-3.5 ${m.status !== "up" ? "bg-amber-soft/40" : ""}`}>
            <StatusDot status={m.status} pulse={m.status !== "up"} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink sm:text-[0.95rem]">{m.name}</p>
              <p className="truncate text-xs text-muted">
                {m.type} · {m.region}
              </p>
            </div>
            {m.ms ? (
              <>
                <Sparkline seed={m.seed} draw={live} delay={0.4 + i * 0.15} className="hidden h-8 w-28 sm:block lg:w-40" stroke={m.status === "up" ? "#17895c" : "#c7871f"} />
                <span className={`w-16 text-right font-mono text-xs tabular-nums sm:text-sm ${m.status === "up" ? "text-muted" : "text-amber"}`}>{live && m.status === "up" ? <Ticker base={m.ms} spread={6} /> : `${m.ms} ms`}</span>
              </>
            ) : (
              <span className="w-16 text-right font-mono text-xs text-signal sm:text-sm">OK</span>
            )}
          </li>
        ))}
      </ul>
      {!compact && (
        <div className="flex items-center justify-between border-t border-line bg-cloud/50 px-4 py-2 font-mono text-[0.75rem] text-muted sm:px-5">
          <span className="flex items-center gap-2">
            <span className="blink inline-block h-1.5 w-1.5 rounded-full bg-signal" /> Checking from 12 regions · next in 14s
          </span>
          <span className="hidden sm:inline">{monitors.length} monitors · 1,847,203 checks today</span>
        </div>
      )}
    </div>
  );
}

export function AlertCard({ className = "" }: { className?: string }) {
  return (
    <div className={`w-[18.5rem] rounded-2xl border border-line bg-white p-4 shadow-[var(--shadow-float)] ${className}`}>
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#4a154b] font-mono text-xs font-bold text-white">#</span>
        <p className="text-sm font-medium text-ink">#oncall-platform</p>
        <span className="ml-auto font-mono text-[0.75rem] text-muted">now</span>
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

export function StatusPageMock({ compact = false }: { compact?: boolean }) {
  const comps = components().slice(0, compact ? 3 : 4);
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[var(--shadow-float)]">
      <div className="flex items-center justify-between bg-[#1d3557] px-6 py-4 text-white">
        <p className="font-display text-xl">Parcelry status</p>
        <span className="rounded-full border border-white/20 px-2.5 py-0.5 font-mono text-[0.75rem] text-white/80">status.parcelry.com</span>
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

const regionLines: [string, number, string][] = [
  ["Virginia", 21, "#17895c"],
  ["London", 23, "#0f6e49"],
  ["Singapore", 26, "#7fd3ac"],
  ["Frankfurt", 14, "#c7871f"],
];

/** Multi-region latency over 24 hours, with the hour axis. Used in the bento and on the status page. */
export function LatencyChart({ className = "h-56", dark = false, seeds = regionLines }: { className?: string; dark?: boolean; seeds?: [string, number, string][] }) {
  const n = 48;
  const max = 480;
  const W = 400;
  const H = 120;
  const grid = dark ? "rgb(255 255 255 / 0.08)" : "rgb(17 26 23 / 0.08)";
  const text = dark ? "fill-fog" : "fill-muted";
  return (
    <div className={`relative ${className}`}>
      <svg aria-hidden="true" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {[0, 1, 2, 3].map((g) => (
          <line key={g} x1={0} x2={W} y1={(H / 4) * g + 1} y2={(H / 4) * g + 1} stroke={grid} strokeWidth={1} />
        ))}
        <line x1={0} x2={W} y1={H - (300 / max) * H} y2={H - (300 / max) * H} stroke="#c7871f" strokeWidth={1} strokeDasharray="4 4" opacity={0.6} />
        {seeds.map(([name, seed, color], i) => {
          const s = responseSeries(seed, n);
          const pts = s.map((v, j) => `${(j / (n - 1)) * W},${H - (v / max) * H}`).join(" ");
          return <polyline key={name} points={pts} pathLength={1} fill="none" stroke={color} strokeWidth={1.6} vectorEffect="non-scaling-stroke" strokeLinejoin="round" className="draw" style={{ ["--d" as string]: `${0.2 + i * 0.2}s` }} />;
        })}
      </svg>
      <svg aria-hidden="true" viewBox="0 0 400 120" className="pointer-events-none absolute inset-0 h-full w-full">
        <text x={2} y={H - (300 / max) * H - 4} className={`${text} font-mono`} fontSize="7" opacity={0.9}>
          threshold 300 ms
        </text>
        {["00:00", "06:00", "12:00", "18:00", "now"].map((t, i) => (
          <text key={t} x={i === 4 ? W - 2 : (W / 4) * i + (i === 0 ? 2 : 0)} y={H - 3} textAnchor={i === 4 ? "end" : i === 0 ? "start" : "middle"} className={`${text} font-mono`} fontSize="7">
            {t}
          </text>
        ))}
      </svg>
      <ul className="absolute right-2 top-2 flex flex-wrap justify-end gap-x-3 gap-y-1 font-mono text-[0.75rem]">
        {seeds.map(([name, , color]) => (
          <li key={name} className={`flex items-center gap-1.5 ${dark ? "text-fog" : "text-muted"}`}>
            <span className="h-1.5 w-3 rounded-full" style={{ background: color }} /> {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
