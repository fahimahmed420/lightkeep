"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(80),
  email: z.email("Enter a work email address."),
  company: z.string().trim().min(2, "Enter your company name.").max(100),
  size: z.enum(["1–10", "11–50", "51–200", "200+"], { error: "Choose your team size." }),
  plan: z.string().max(20).optional().default(""),
  message: z.string().trim().max(1500, "Keep it under 1,500 characters.").optional().default(""),
});

export type ContactState = { status: "idle" | "error" | "success"; message?: string; errors?: Partial<Record<keyof z.infer<typeof schema>, string>>; values?: Record<string, string> };

const hits = new Map<string, number[]>();
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function requestDemo(_prev: ContactState, form: FormData): Promise<ContactState> {
  const values = Object.fromEntries(["name", "email", "company", "size", "plan", "message"].map((k) => [k, String(form.get(k) ?? "")]));
  if (form.get("website")) return { status: "success" };

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 600_000);
  hits.set(ip, [...recent, now]);
  if (recent.length >= 5) return { status: "error", message: "Too many requests. Please email us instead.", values };

  const parsed = schema.safeParse(values);
  if (!parsed.success) {
    const errors: ContactState["errors"] = {};
    for (const i of parsed.error.issues) errors[i.path[0] as keyof typeof errors] ??= i.message;
    return { status: "error", message: "Please check the highlighted fields.", errors, values };
  }
  const d = parsed.data;

  const key = process.env.RESEND_API_KEY;
  const to = process.env.DEMO_TO_EMAIL;
  if (!key || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[demo request] email not configured:", d);
      return { status: "success" };
    }
    return { status: "error", message: "Our form is offline right now. Please email us directly.", values };
  }
  const rows = Object.entries({ Name: d.name, Email: d.email, Company: d.company, "Team size": d.size, Plan: d.plan || "—", Message: d.message || "—" });
  try {
    const { error } = await new Resend(key).emails.send({
      from: process.env.DEMO_FROM_EMAIL || "Lightkeep <onboarding@resend.dev>",
      to: to.split(",").map((s) => s.trim()),
      replyTo: d.email,
      subject: `Demo request: ${d.company} (${d.size})`,
      html: `<h2>New demo request</h2><table>${rows.map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#5d6b66">${k}</td><td style="padding:6px 0"><b>${esc(v)}</b></td></tr>`).join("")}</table>`,
      text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
    });
    if (error) throw new Error(error.message);
    return { status: "success" };
  } catch (e) {
    console.error("[demo request] send failed", e);
    return { status: "error", message: "We couldn't send that just now. Please try again in a minute.", values };
  }
}
