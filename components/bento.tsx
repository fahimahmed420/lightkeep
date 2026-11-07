import { regions } from "@/content/site";
import { Check, StatusDot } from "./ui";

/*
  Small pieces of product UI that sit inside the feature grid. Each one is
  static markup with CSS motion, so it prerenders and costs no JavaScript.
*/

export function Cell({ children, className = "", dark = false, delay = 0 }: { children: React.ReactNode; className?: string; dark?: boolean; delay?: number }) {
  return (
    <div
      data-reveal
      style={{ ["--d" as string]: `${delay}ms` }}
      className={`relative flex flex-col overflow-hidden rounded-3xl border ${dark ? "night-glow border-white/10 bg-night text-white" : "border-line bg-white"} ${className}`}
    >
      {children}
    </div>
  );
}

export function CellHead({ kicker, title, body, light = false }: { kicker: string; title: string; body?: string; light?: boolean }) {
  return (
    <div className="p-6 pb-0 sm:p-7 sm:pb-0">
      <p className={`font-mono text-[0.75rem] uppercase tracking-[0.2em] ${light ? "text-signal-3" : "text-signal"}`}>{kicker}</p>
      <h3 className={`mt-2 text-2xl leading-tight lg:text-[1.7rem] ${light ? "text-white" : "text-ink"}`}>{title}</h3>
      {body && <p className={`mt-2 leading-relaxed ${light ? "text-fog" : "text-muted"}`}>{body}</p>}
    </div>
  );
}

/** "3 of 12": the regions light up one by one; three agree before the alert fires. */
export function ConfirmationDots() {
  return (
    <div className="mt-auto p-6 pt-6 sm:p-7">
      <div className="grid grid-cols-6 gap-2">
        {regions.map((r, i) => (
          <span key={r} title={r} className="lightup block aspect-square rounded-lg bg-signal-3/15" style={{ ["--d" as string]: `${i * 0.38}s` }} />
        ))}
      </div>
      <p className="mt-5 font-display text-6xl leading-none text-white lg:text-7xl">
        3 <span className="text-signal-3">of</span> 12
      </p>
      <p className="mt-3 text-sm leading-relaxed text-fog">regions must agree before anyone is paged. Typical failure-to-page: 41 seconds.</p>
    </div>
  );
}

const steps: [string, string, string][] = [
  ["Investigating", "14:08", "Elevated latency from Frankfurt"],
  ["Identified", "14:15", "Upstream DNS resolver slow in eu-central"],
  ["Monitoring", "14:31", "Switched resolver, latency recovering"],
  ["Resolved", "14:52", "All regions under 300 ms for 20 min"],
];

export function IncidentTimeline() {
  return (
    <ol className="mt-auto space-y-0 p-6 pt-5 sm:p-7 sm:pt-5">
      {steps.map(([state, time, text], i) => {
        const last = i === steps.length - 1;
        return (
          <li key={state} className="relative flex gap-4 pb-4 last:pb-0">
            {!last && <span aria-hidden="true" className="absolute left-[5px] top-4 h-full w-px bg-line" />}
            <span aria-hidden="true" className={`relative mt-1.5 h-[11px] w-[11px] shrink-0 rounded-full ring-2 ring-white ${last ? "bg-signal" : i === 0 ? "bg-amber" : "bg-ink/35"}`} />
            <div className="min-w-0">
              <p className="flex items-baseline gap-2 text-sm">
                <span className={`font-medium ${last ? "text-signal-2" : "text-ink"}`}>{state}</span>
                <span className="font-mono text-xs text-muted">{time} UTC</span>
              </p>
              <p className="truncate text-sm text-muted">{text}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/** Four weeks of a nightly job, one square per run. One missed run shows how a heartbeat alert looks. */
export function CronCalendar() {
  const weeks = 4;
  const missed = 16; // index into the 28 days
  return (
    <div className="mt-auto p-6 pt-5 sm:p-7 sm:pt-5">
      <div className="grid grid-cols-7 gap-1.5">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <span key={i} className="text-center font-mono text-[0.75rem] text-muted">
            {d}
          </span>
        ))}
        {Array.from({ length: weeks * 7 }, (_, i) => (
          <span key={i} title={i === missed ? "Missed" : "02:00 · OK"} className={`aspect-square rounded-md ${i === missed ? "bg-red ring-2 ring-red-soft" : i > 24 ? "bg-line" : "bg-signal/85"}`} />
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-red-soft px-3 py-2 text-xs text-red">
        <span className="font-medium">Missed · Oct 14, 02:00</span>
        <span className="font-mono">no ping in 31 min</span>
      </div>
    </div>
  );
}

/** Certificate expiry as a ring with the days left. */
export function SslRing() {
  const days = 62;
  const total = 90;
  const r = 44;
  const c = 2 * Math.PI * r;
  return (
    <div className="mt-auto flex items-center gap-5 p-6 pt-5 sm:p-7 sm:pt-5">
      <svg aria-hidden="true" viewBox="0 0 100 100" className="h-28 w-28 shrink-0 -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="var(--color-line)" strokeWidth="7" />
        <circle cx="50" cy="50" r={r} fill="none" stroke="var(--color-signal)" strokeWidth="7" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - days / total)} pathLength={c} className="draw" style={{ ["--d" as string]: "0.4s", strokeDasharray: c, strokeDashoffset: c * (1 - days / total) }} />
        <text x="50" y="47" textAnchor="middle" transform="rotate(90 50 50)" className="fill-ink font-display" fontSize="26">
          {days}
        </text>
        <text x="50" y="62" textAnchor="middle" transform="rotate(90 50 50)" className="fill-muted font-mono" fontSize="8">
          DAYS LEFT
        </text>
      </svg>
      <dl className="min-w-0 space-y-1.5 text-sm">
        <div>
          <dt className="font-mono text-[0.75rem] uppercase tracking-wider text-muted">Certificate</dt>
          <dd className="truncate font-medium text-ink">*.parcelry.com</dd>
        </div>
        <div>
          <dt className="font-mono text-[0.75rem] uppercase tracking-wider text-muted">Issuer</dt>
          <dd className="text-ink-2">Let&apos;s Encrypt R11</dd>
        </div>
        <div>
          <dt className="font-mono text-[0.75rem] uppercase tracking-wider text-muted">Reminders</dt>
          <dd className="text-ink-2">30 · 14 · 3 days</dd>
        </div>
      </dl>
    </div>
  );
}

/** An API check with a JSON body assertion, shown as a tiny request/response pair. */
export function ApiAssert() {
  return (
    <div className="mt-auto p-6 pt-5 font-mono text-[0.78rem] leading-relaxed sm:p-7 sm:pt-5">
      <div className="rounded-xl bg-night p-4 text-[#d6e2dc]">
        <p>
          <span className="text-signal-3">POST</span> /v1/quotes <span className="text-fog">· 200 · 188 ms</span>
        </p>
        <p className="mt-2 text-fog">assert</p>
        <p className="pl-3">
          <span className="text-[#9ec5ff]">$.status</span> <span className="text-fog">==</span> <span className="text-[#f2c879]">&quot;ok&quot;</span> <Check className="ml-1 inline h-3.5 w-3.5 text-signal-3" />
        </p>
        <p className="pl-3">
          <span className="text-[#9ec5ff]">$.quotes.length</span> <span className="text-fog">&gt;</span> <span className="text-[#f2c879]">0</span> <Check className="ml-1 inline h-3.5 w-3.5 text-signal-3" />
        </p>
        <p className="pl-3">
          <span className="text-[#9ec5ff]">headers.cache-control</span> <span className="text-fog">~</span> <span className="text-[#f2c879]">/max-age/</span> <Check className="ml-1 inline h-3.5 w-3.5 text-signal-3" />
        </p>
      </div>
    </div>
  );
}

const rota = [
  ["Mon", "Maya", "signal"],
  ["Tue", "Maya", "signal"],
  ["Wed", "Tom", "ink"],
  ["Thu", "Tom", "ink"],
  ["Fri", "Priya", "amber"],
  ["Sat", "Priya", "amber"],
  ["Sun", "Maya", "signal"],
];
const rotaColor: Record<string, string> = { signal: "bg-signal/90 text-white", ink: "bg-ink text-white", amber: "bg-amber/90 text-white" };

/** This week's on-call rota and the escalation path under it. */
export function OnCallRota() {
  return (
    <div className="mt-auto p-6 pt-5 sm:p-7 sm:pt-5">
      <div className="grid grid-cols-7 gap-1.5">
        {rota.map(([d, who, c], i) => (
          <div key={d} className="min-w-0 text-center">
            <p className="font-mono text-[0.75rem] text-muted">{d}</p>
            <p className={`mt-1 truncate rounded-lg px-1 py-2 text-xs font-medium ${rotaColor[c]} ${i === 2 ? "ring-2 ring-ink/30 ring-offset-2" : ""}`}>{who}</p>
          </div>
        ))}
      </div>
      <ol className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs">
        {[
          ["Slack", "0 min"],
          ["SMS", "+5 min"],
          ["Phone", "+10 min"],
          ["Backup", "+15 min"],
        ].map(([via, at], i) => (
          <li key={via} className="flex items-center gap-2">
            {i > 0 && (
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3 w-3 text-line-2" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            )}
            <span className="rounded-full border border-line bg-paper px-2.5 py-1">
              <span className="font-medium text-ink">{via}</span> <span className="font-mono text-muted">{at}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Region list with live-looking latencies for the monitoring page. */
export function RegionGrid({ compact = false }: { compact?: boolean }) {
  const ms = [38, 41, 112, 52, 76, 91, 84, 168, 143, 155, 201, 189];
  return (
    <ul className={`grid gap-2 ${compact ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"}`}>
      {regions.map((r, i) => (
        <li key={r} className="flex min-w-0 items-center justify-between gap-2 rounded-2xl border border-line bg-paper px-3 py-3 text-sm">
          <span className="flex min-w-0 items-center gap-2 truncate">
            <StatusDot status={i === 5 ? "degraded" : "up"} /> {r}
          </span>
          <span className={`font-mono text-xs tabular-nums ${i === 5 ? "text-amber" : "text-muted"}`}>{i === 5 ? 912 : ms[i]}ms</span>
        </li>
      ))}
    </ul>
  );
}
