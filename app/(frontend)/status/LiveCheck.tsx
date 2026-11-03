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

  const ago = info ? Math.max(0, Math.round(((now || info.at) - info.at) / 1000)) : 0;
  return (
    <span className="inline-flex min-h-11 items-center gap-2.5 rounded-full border border-signal-3/30 bg-night/60 px-4 font-mono text-sm text-signal-3 backdrop-blur" aria-live="polite">
      <span className="relative inline-block h-2 w-2 rounded-full bg-signal-3 text-signal-3 pulse" />
      {info ? (
        <>
          Checked {ago < 2 ? "just now" : `${ago}s ago`} · {info.ms} ms
        </>
      ) : (
        "Checking…"
      )}
    </span>
  );
}
