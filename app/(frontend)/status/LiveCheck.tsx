"use client";

import { useEffect, useState } from "react";

/** Polls /status.json every 30 seconds, like a real status page, and shows when it last checked. */
export function LiveCheck() {
  const [info, setInfo] = useState<{ at: number; ms: number } | null>(null);
  const [now, setNow] = useState(0);

  useEffect(() => {
    let alive = true;
    const check = async () => {
      const t = performance.now();
      try {
        const r = await fetch("/status.json", { cache: "no-store" });
        await r.json();
        if (alive) setInfo({ at: Date.now(), ms: Math.round(performance.now() - t) });
      } catch {}
    };
    check();
    const poll = setInterval(check, 30_000);
    const tick = setInterval(() => setNow(Date.now()), 1000);
    return () => {
      alive = false;
      clearInterval(poll);
      clearInterval(tick);
    };
  }, []);

  if (!info) return <span className="font-mono text-sm opacity-70">Checking…</span>;
  const ago = Math.max(0, Math.round(((now || info.at) - info.at) / 1000));
  return (
    <span className="font-mono text-sm opacity-80" aria-live="polite">
      Checked {ago < 2 ? "just now" : `${ago}s ago`} · {info.ms} ms
    </span>
  );
}
