import type { Metadata } from "next";
import { ArrowRight, Button, Check, Container, PageIntro, SectionHead } from "@/components/ui";
import { StatusPageMock } from "@/components/product";

export const metadata: Metadata = { title: "Status pages", description: "Branded public and private status pages with incident updates, subscribers and 90-day uptime history." };

const features = [
  ["Your brand, your domain", "Logo, colors and status.yourcompany.com, with HTTPS handled for you."],
  ["Automatic component status", "Linked monitors update components the moment something breaks."],
  ["Post from Slack", "Type /incident and your update is live on the page and emailed to subscribers."],
  ["Subscribers", "Email, RSS and webhook subscriptions, per component if customers prefer."],
  ["Private pages", "Password or SSO-protected pages for internal teams and enterprise customers."],
  ["Scheduled maintenance", "Announce maintenance windows in advance, with automatic reminders."],
];

export default function StatusPagesPage() {
  return (
    <>
      <PageIntro kicker="Status pages" title="Fewer tickets. More trust." intro="A status page answers the question every customer asks during an outage. Lightkeep keeps it accurate without anyone remembering to update it.">
        <Button href="/pricing">Create a status page <ArrowRight /></Button>
        <Button href="/status" variant="outline">See ours</Button>
      </PageIntro>
      <section className="py-24 sm:py-28">
        <Container className="grid items-start gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div data-reveal><StatusPageMock /></div>
          <div className="grid gap-6">
            {features.map(([t, d], i) => (
              <div key={t} data-reveal style={{ ["--d" as string]: `${i * 60}ms` }} className="flex gap-4">
                <Check className="mt-1.5 h-5 w-5 text-signal" />
                <div>
                  <h2 className="text-2xl">{t}</h2>
                  <p className="mt-1 text-muted">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section className="border-t border-line bg-white py-24">
        <Container className="text-center">
          <SectionHead center kicker="Result" title="Parcelry cut incident tickets by 68%." intro="Their status page now answers customers before the support inbox fills up." />
          <div className="mt-8"><Button href="/customers">Read the story <ArrowRight /></Button></div>
        </Container>
      </section>
    </>
  );
}
