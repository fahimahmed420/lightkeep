"use client";

import { useState, useSyncExternalStore } from "react";
import { site } from "@/content/site";

const KEY = "zd_demo_badge_lk";
const noop = () => () => {};
function dismissedThisSession() {
  try {
    return sessionStorage.getItem(KEY) === "0";
  } catch {
    return false;
  }
}

/** "Built by Zordev" pill linking to the case study. Dismissible for this browser session; ?shots=1 hides it for screenshots. */
export function DemoBadge() {
  const stored = useSyncExternalStore(noop, dismissedThisSession, () => false);
  const shots = useSyncExternalStore(noop, () => new URLSearchParams(location.search).has("shots"), () => false);
  const [dismissed, setDismissed] = useState(false);

  if (stored || dismissed || shots) return null;
  const href = `${site.caseStudyUrl}?utm_source=lightkeep-demo&utm_medium=badge`;

  return (
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom,0px))] left-[max(0.75rem,env(safe-area-inset-left,0px))] z-50 flex items-center gap-1 rounded-full bg-ink/90 py-1 pl-1.5 pr-1 text-sm text-paper shadow-xl ring-1 ring-white/10 backdrop-blur-md lg:left-5">
      <a href={href} className="flex items-center gap-2 rounded-full py-1.5 pl-1 pr-2 hover:text-[#7fd3ac]">
        <span aria-hidden="true" className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f37842] font-display text-xs font-extrabold text-[#0c0c0c]">
          Z
        </span>
        <span>
          Concept site by <strong>Zordev</strong>
          <span className="hidden sm:inline"> · see the case study</span> →
        </span>
      </a>
      <button
        type="button"
        onClick={() => {
          setDismissed(true);
          try {
            sessionStorage.setItem(KEY, "0");
          } catch {}
        }}
        className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/10"
        aria-label="Hide this notice for this visit"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>
    </div>
  );
}
