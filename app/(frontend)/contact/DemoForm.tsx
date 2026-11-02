"use client";

import { useActionState, useSyncExternalStore } from "react";
import { requestDemo, type ContactState } from "./actions";

const field =
  "mt-2 block w-full rounded-xl border border-line-2 bg-white px-4 py-3 text-base outline-none transition-colors placeholder:text-muted/60 focus:border-ink aria-[invalid=true]:border-red";
const noop = () => () => {};

export function DemoForm() {
  const [state, action, pending] = useActionState<ContactState, FormData>(requestDemo, { status: "idle" });
  const planFromUrl = useSyncExternalStore(noop, () => new URLSearchParams(location.search).get("plan") ?? "", () => "");

  if (state.status === "success")
    return (
      <div role="status" className="rounded-3xl border border-line bg-white p-10">
        <p className="font-display text-4xl">Thanks, we&apos;ll be in touch.</p>
        <p className="mt-3 text-lg text-muted">Someone from our team will reply within one business day with a few times for a 20-minute call.</p>
      </div>
    );

  const v = state.values ?? {};
  const e = state.errors ?? {};
  const err = (k: keyof NonNullable<ContactState["errors"]>) =>
    e[k] ? (
      <p id={`${k}-error`} className="mt-1.5 text-sm text-red">
        {e[k]}
      </p>
    ) : null;
  const a = (k: keyof NonNullable<ContactState["errors"]>) => ({ "aria-invalid": !!e[k], "aria-describedby": e[k] ? `${k}-error` : undefined });

  return (
    <form action={action} noValidate className="space-y-5 rounded-3xl border border-line bg-white p-7 sm:p-10">
      {state.status === "error" && state.message && (
        <p role="alert" className="rounded-xl bg-red-soft p-4 text-sm text-red">
          {state.message}
        </p>
      )}
      <input type="hidden" name="plan" value={v.plan ?? planFromUrl} />
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium">Full name</label>
          <input id="name" name="name" autoComplete="name" defaultValue={v.name} className={field} {...a("name")} />
          {err("name")}
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium">Work email</label>
          <input id="email" name="email" type="email" autoComplete="email" defaultValue={v.email} className={field} {...a("email")} />
          {err("email")}
        </div>
        <div>
          <label htmlFor="company" className="text-sm font-medium">Company</label>
          <input id="company" name="company" autoComplete="organization" defaultValue={v.company} className={field} {...a("company")} />
          {err("company")}
        </div>
        <div>
          <label htmlFor="size" className="text-sm font-medium">Team size</label>
          <select id="size" name="size" defaultValue={v.size ?? ""} className={field} {...a("size")}>
            <option value="" disabled>
              Choose one
            </option>
            {["1–10", "11–50", "51–200", "200+"].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
          {err("size")}
        </div>
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-medium">
          What are you monitoring today? <span className="text-muted">(optional)</span>
        </label>
        <textarea id="message" name="message" rows={4} defaultValue={v.message} className={field} {...a("message")} />
        {err("message")}
      </div>
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <input name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <button type="submit" disabled={pending} className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-ink px-8 font-medium text-white transition-colors hover:bg-signal-2 disabled:opacity-60 sm:w-auto">
        {pending ? "Sending…" : "Request a demo"}
      </button>
    </form>
  );
}
