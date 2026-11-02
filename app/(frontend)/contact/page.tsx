import type { Metadata } from "next";
import { site } from "@/content/site";
import { Check, Container, Kicker } from "@/components/ui";
import { DemoForm } from "./DemoForm";

export const metadata: Metadata = { title: "Book a demo", description: "See Lightkeep on your own services in a 20-minute call." };

export default function ContactPage() {
  return (
    <section className="dots py-16 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <Kicker>Book a demo</Kicker>
          <h1 className="mt-4 text-5xl leading-[1.02] sm:text-6xl">See it on your own services.</h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">In 20 minutes we&apos;ll set up monitors for your real endpoints, connect your Slack, and show you what an alert looks like.</p>
          <ul className="mt-8 space-y-3">
            {["No slides, just your setup", "Migration help from Pingdom, UptimeRobot or Better Stack", "Annual plans and invoicing for Business"].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <Check /> {t}
              </li>
            ))}
          </ul>
          <p className="mt-10 text-sm text-muted">
            Prefer email? <span className="select-all font-medium text-ink">{site.email}</span>
          </p>
        </div>
        <DemoForm />
      </Container>
    </section>
  );
}
