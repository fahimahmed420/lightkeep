/**
 * Seeds the CMS with Lightkeep's launch content. Safe to re-run: it clears and recreates content.
 * Run: npm run seed
 * Admin login comes from SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD in .env.local (local development only).
 */
import { getPayload } from "payload";
import config from "../payload.config";
import { md } from "./lexical";

const payload = await getPayload({ config });

const email = process.env.SEED_ADMIN_EMAIL;
const password = process.env.SEED_ADMIN_PASSWORD;
if (!email || !password) throw new Error("Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD in .env.local first.");

for (const collection of ["posts", "changelog", "docs"] as const) await payload.delete({ collection, where: { id: { exists: true } } });
const existing = await payload.find({ collection: "users", where: { email: { equals: email } } });
if (!existing.docs.length) await payload.create({ collection: "users", data: { email, password, name: "Studio admin", role: "admin" } });

const posts = [
  {
    title: "The anatomy of a false alarm",
    category: "engineering",
    readingTime: 7,
    publishedAt: "2026-10-30",
    excerpt: "Why single-region checks page you at 3 am for problems that don't exist, and how multi-region confirmation fixes it.",
    body: `
Every on-call engineer knows the feeling: the phone buzzes, the site loads fine, and the alert resolves itself two minutes later. Do that three nights in a row and people start muting alerts. That is how real outages get missed.
## Where false alarms come from
Most false alarms are not your service failing. They are the network between one check location and your server having a bad minute.
- A congested transit link in a single region
- DNS resolvers that cache a stale record
- A cloud provider's health check briefly rate-limiting a monitoring IP
## Confirm before you page
Lightkeep runs every check from 12 regions. When one region sees a failure, three others are asked to check the same URL straight away. Only if three agree does anyone get paged.
> An alert should always mean a human needs to act. Anything else trains your team to ignore it.
## What changed for our customers
Across all accounts, confirmation cut pages that resolved without action by 87%, while median time-to-alert for real outages stayed at 41 seconds.
`,
  },
  {
    title: "Writing incident updates customers actually read",
    category: "guides",
    readingTime: 5,
    publishedAt: "2026-10-21",
    excerpt: "A simple four-part template for status page updates that reduce support tickets instead of creating them.",
    body: `
Your status page is the most-read page on your site during an incident. Most updates waste that attention.
## The four-part update
1. **What is affected**, in your customers' words, not your service names.
2. **What they will notice**, such as slow checkouts or delayed emails.
3. **What you are doing** right now.
4. **When the next update is**, even if there is nothing new.
## Write for the person refreshing the page
Promise the next update time and keep it. A short "still working on it, next update at 14:30" builds more trust than silence.
`,
  },
  {
    title: "Introducing cron heartbeats",
    category: "product",
    readingTime: 3,
    publishedAt: "2026-10-14",
    excerpt: "Know when the nightly job didn't run, not just when it failed. Heartbeat monitors are now available on every plan.",
    body: `
Scheduled jobs fail silently. The backup that stopped running in June is usually discovered in September.
## How it works
Add a heartbeat monitor, copy its URL, and ping it at the end of your job:
\`\`\`
curl -fsS https://hb.lightkeep.io/p/8f2c1a
\`\`\`
If the ping doesn't arrive within the window you set, Lightkeep alerts you like any other monitor.
`,
  },
  {
    title: "Postmortem: delayed SMS alerts in the EU",
    category: "incidents",
    readingTime: 6,
    publishedAt: "2026-10-30",
    excerpt: "On October 28, SMS alerts to EU numbers were delayed by up to five minutes for 44 minutes. Here's what happened and what we changed.",
    body: `
On October 28 between 14:08 and 14:52 UTC, SMS alerts to EU phone numbers arrived up to five minutes late. Email, Slack, phone and webhook alerts were not affected.
## What happened
Our primary SMS provider began queueing messages after a routing change on their side. Our delivery monitor caught the delay after 3 minutes, but failover to the secondary provider required a manual step.
## What we changed
- Failover between SMS providers is now automatic after 60 seconds of delayed delivery.
- We added a synthetic SMS every 5 minutes per region to measure end-to-end delivery time.
`,
  },
  {
    title: "SLOs for teams without an SRE",
    category: "guides",
    readingTime: 8,
    publishedAt: "2026-09-29",
    excerpt: "Service level objectives sound like big-company process. Here's a version a five-person team can set up in an afternoon.",
    body: `
You don't need an SRE team to benefit from SLOs. You need one number your team agrees on, and a way to see when you're close to breaking it.
## Pick one journey
Start with the one thing customers would email about first. For most products it's signing in or checking out.
## Set a realistic target
99.9% availability allows 43 minutes of downtime a month. Start there, measure for a month, then adjust.
`,
  },
  {
    title: "How we run checks from 12 regions for less than you'd think",
    category: "engineering",
    readingTime: 9,
    publishedAt: "2026-09-15",
    excerpt: "A look inside Lightkeep's check runners: small machines, shared nothing, and a scheduler that never stops.",
    body: `
Each region runs a small pool of stateless check runners. They pull work from a regional queue and push results to a central store.
## Shared nothing
A runner knows nothing about other regions. That keeps a failure in one region from becoming a failure everywhere.
## The scheduler
Checks are spread across each 30-second window so runners never see a thundering herd at the top of the minute.
`,
  },
];

for (const p of posts) {
  await payload.create({
    collection: "posts",
    draft: false,
    data: { title: p.title, excerpt: p.excerpt, category: p.category as "guides", author: "The Lightkeep team", readingTime: p.readingTime, publishedAt: p.publishedAt, content: md(p.body) as never, _status: "published" },
  });
}

const changelog = [
  ["Cron heartbeats", "2.8", "2026-10-14", ["new"], "Monitor scheduled jobs with a simple ping. Get alerted when a job doesn't run on time."],
  ["SLA reports", "2.7", "2026-10-02", ["new"], "Monthly uptime reports per monitor or per status page, exportable as PDF or CSV."],
  ["Faster status pages", "2.6", "2026-09-18", ["improved"], "Status pages now load in under 300 ms worldwide, served from the edge."],
  ["Escalation policies", "2.5", "2026-09-03", ["new", "improved"], "Escalate to a second responder or the whole team when an alert isn't acknowledged."],
  ["Regional thresholds", "2.4", "2026-08-20", ["improved"], "Set different response-time thresholds for each region."],
  ["Slack thread replies", "2.3", "2026-08-06", ["fixed", "improved"], "Incident updates now reply in the original Slack thread instead of starting a new one."],
] as const;

for (const [title, version, date, tags, summary] of changelog) {
  await payload.create({ collection: "changelog", draft: false, data: { title, version, date, tags: [...tags], summary, content: md(summary) as never, _status: "published" } });
}

const docs = [
  ["Quickstart", "start", 1, "Create your first monitor and alert in under two minutes.", "## 1. Add a monitor\nOpen **Monitors → New** and paste a URL. Lightkeep checks it every 30 seconds.\n## 2. Choose who gets alerted\nConnect Slack or add a phone number under **Alerts**.\n## 3. Publish a status page\nPick the monitors to show and choose a subdomain."],
  ["How checks work", "start", 2, "Regions, intervals and how failures are confirmed.", "Each check runs from up to 12 regions. A failure in one region triggers confirmation checks from three others.\n- Interval: 30 seconds to 10 minutes\n- Timeout: 30 seconds by default"],
  ["HTTP monitors", "monitors", 1, "Check status codes, response times, headers and body content.", "## Assertions\nAdd assertions to check more than the status code:\n- Status code equals 200\n- Response time under 500 ms\n- Body contains `\"ok\":true`"],
  ["Cron heartbeats", "monitors", 2, "Get alerted when a scheduled job doesn't run.", "Ping your heartbeat URL at the end of each job:\n```\ncurl -fsS https://hb.lightkeep.io/p/<id>\n```\nSet the expected schedule and a grace period."],
  ["Custom domains", "status", 1, "Serve your status page from status.yourcompany.com.", "Add a CNAME record pointing `status` to `pages.lightkeep.io`. HTTPS is issued automatically within a few minutes."],
  ["Escalation policies", "alerts", 1, "Make sure someone always responds.", "An escalation policy notifies a first responder, then a second after a delay you choose, then the whole team."],
] as const;

for (const [title, section, order, description, body] of docs) {
  await payload.create({ collection: "docs", draft: false, data: { title, section, order, description, content: md(body) as never, _status: "published" } });
}

console.log(`Seeded ${posts.length} posts, ${changelog.length} changelog entries, ${docs.length} docs. Admin: ${email}`);
process.exit(0);
