/**
 * Deterministic mock monitoring data. Same seed → same history on server and client,
 * so pages prerender and the live widget never contradicts them.
 */
function rng(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
}

export type DayStatus = "up" | "degraded" | "down";
export type Component = { name: string; group: string; uptime: number; days: DayStatus[]; latency: number };

const defs = [
  ["Website", "Public", 1],
  ["Dashboard", "Public", 2],
  ["Public API", "API", 3],
  ["Webhooks", "API", 4],
  ["Check runners", "Monitoring", 5],
  ["Alert delivery", "Monitoring", 6],
  ["Status pages", "Monitoring", 7],
] as const;

export function components(): Component[] {
  return defs.map(([name, group, seed]) => {
    const r = rng(seed * 7919);
    const days: DayStatus[] = Array.from({ length: 90 }, () => {
      const x = r();
      return x > 0.985 ? "down" : x > 0.955 ? "degraded" : "up";
    });
    const bad = days.reduce((s, d) => s + (d === "down" ? 0.012 : d === "degraded" ? 0.003 : 0), 0);
    return { name, group, days, uptime: Math.max(99.9, 100 - bad), latency: Math.round(60 + r() * 140) };
  });
}

export const incidents = [
  {
    title: "Delayed alert delivery for SMS in EU",
    date: "Oct 28, 2026",
    impact: "degraded" as DayStatus,
    updates: [
      ["Resolved", "14:52 UTC", "Messages are delivering normally. Queued alerts were sent within 6 minutes of the delay."],
      ["Monitoring", "14:31 UTC", "Our SMS provider has deployed a fix. We are watching delivery times."],
      ["Investigating", "14:08 UTC", "Some SMS alerts to EU numbers are arriving up to 5 minutes late. Email, Slack and phone alerts are not affected."],
    ],
  },
  {
    title: "Check runners in Sydney paused",
    date: "Oct 12, 2026",
    impact: "down" as DayStatus,
    updates: [
      ["Resolved", "03:40 UTC", "Sydney checks are running again. Monitors were automatically confirmed from Singapore during the outage, so no false alerts were sent."],
      ["Identified", "03:15 UTC", "A network change at our Sydney provider is blocking outbound checks."],
    ],
  },
];

/** A day of response-time samples for sparklines (ms). */
export function responseSeries(seed: number, n = 48) {
  const r = rng(seed * 104729);
  let v = 120 + r() * 60;
  return Array.from({ length: n }, () => (v = Math.max(40, Math.min(420, v + (r() - 0.5) * 50 + (r() > 0.97 ? 140 : 0)))));
}
