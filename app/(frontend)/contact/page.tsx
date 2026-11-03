import type { Metadata } from "next";
import { site } from "@/content/site";
import { Check, Container, Kicker } from "@/components/ui";
import { AlertCard } from "@/components/product";
import { DemoForm } from "./DemoForm";

export const metadata: Metadata = { title: "Book a demo", description: "See Lightkeep on your own services in a 20-minute call." };

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden py-14 sm:py-20 lg:py-24">
      <div aria-hidden="true" className="dots dots-fade absolute inset-0" />
      <Container className="relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <Kicker>Book a demo</Kicker>
          <h1 className="fade-up mt-4 text-5xl leading-[1.0] sm:text-6xl lg:text-7xl">See it on your own services.</h1>
          <p className="fade-up mt-6 text-lg leading-relaxed text-muted lg:text-xl" style={{ ["--d" as string]: "80ms" }}>
            In 20 minutes we&apos;ll set up monitors for your real endpoints, connect your Slack, and show you what an alert looks like.
          </p>
          <ul className="fade-up mt-8 space-y-3 text-lg" style={{ ["--d" as string]: "160ms" }}>
            {["No slides, just your setup", "Migration help from Pingdom, UptimeRobot or Better Stack", "Annual plans and invoicing for Business"].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <Check /> {t}
              </li>
            ))}
          </ul>
          <div className="fade-up mt-10 hidden lg:block" style={{ ["--d" as string]: "320ms" }}>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">What you&apos;ll see</p>
            <AlertCard className="slide-in" />
          </div>
          <p className="mt-10 text-sm text-muted">
            Prefer email? <span className="select-all font-medium text-ink">{site.email}</span>
          </p>
        </div>
        <div className="fade-up" style={{ ["--d" as string]: "200ms" }}>
          <DemoForm />
        </div>
      </Container>
    </section>
  );
}
