/**
 * Lightkeep is a fictional company created by Zordev as a portfolio project.
 * Customers, figures and quotes are invented.
 */
export const site = {
  name: "Lightkeep",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://lightkeep.zordev.com",
  caseStudyUrl: "https://www.zordev.com/work/lightkeep",
  tagline: "Uptime monitoring and status pages for small software teams.",
  description:
    "Lightkeep checks your sites and APIs every 30 seconds from 12 regions, alerts the right person in seconds, and keeps customers informed with a beautiful status page.",
  email: "hello@lightkeep-demo.example",
};

export const nav = [
  { href: "/product", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "/customers", label: "Customers" },
  { href: "/docs", label: "Docs" },
  { href: "/blog", label: "Blog" },
  { href: "/changelog", label: "Changelog" },
];

export const productLinks = [
  { href: "/product/monitoring", label: "Monitoring", body: "HTTP, API, SSL, cron and keyword checks from 12 regions." },
  { href: "/product/status-pages", label: "Status pages", body: "Branded public pages with incident updates and subscribers." },
  { href: "/product", label: "Alerts & on-call", body: "Slack, SMS, phone, email and webhooks, with escalation." },
  { href: "/status", label: "Live status", body: "Our own status page, built on Lightkeep." },
];

export const logos = ["Northwind", "Parcelry", "Ledgerline", "Kitebase", "Fernhill", "Quillstack", "Orbitly", "Tidepool"];

export const plans = [
  {
    id: "starter",
    name: "Starter",
    monthly: 0,
    annual: 0,
    blurb: "For side projects and first launches.",
    cta: "Start free",
    features: ["10 monitors", "3-minute checks", "1 status page", "Email and Slack alerts", "30 days of history"],
  },
  {
    id: "team",
    name: "Team",
    monthly: 29,
    annual: 24,
    blurb: "For product teams with customers relying on them.",
    cta: "Start 14-day trial",
    highlight: true,
    features: ["50 monitors", "30-second checks from 12 regions", "3 branded status pages", "SMS and phone alerts", "On-call schedules", "1 year of history"],
  },
  {
    id: "business",
    name: "Business",
    monthly: 99,
    annual: 82,
    blurb: "For companies with SLAs to keep.",
    cta: "Book a demo",
    features: ["250 monitors", "Custom domains and SSO", "Unlimited status pages", "Escalation policies", "SLA reports", "Priority support"],
  },
];

export const pricingFaq = [
  { q: "What counts as a monitor?", a: "One URL, API endpoint, SSL certificate, cron heartbeat or keyword check. Checking the same URL from 12 regions still counts as one monitor." },
  { q: "Can I change plans later?", a: "Yes, any time. Upgrades apply immediately; downgrades apply at the end of the billing period." },
  { q: "Do you charge for SMS and phone alerts?", a: "Team and Business include 200 SMS and 50 voice calls a month. Extra messages are billed at cost." },
  { q: "Is there a free trial?", a: "Team comes with a 14-day trial, no card required. Starter is free forever." },
  { q: "Do you offer discounts for non-profits and education?", a: "Yes, 50% off Team and Business. Email us from your organisation's address." },
];

export const customers = [
  {
    company: "Parcelry",
    industry: "Logistics API",
    quote: "We used to find out about outages from angry tweets. Now our on-call engineer knows within 40 seconds, and the status page answers customers before they ask.",
    person: "Maya Okafor",
    role: "Head of Platform",
    metric: "−68%",
    metricLabel: "support tickets during incidents",
  },
  {
    company: "Ledgerline",
    industry: "Fintech",
    quote: "Our SLA reports used to take a day each month. Lightkeep generates them, and our auditors accept them as they are.",
    person: "Tom Reyes",
    role: "CTO",
    metric: "99.98%",
    metricLabel: "uptime reported to enterprise customers",
  },
  {
    company: "Kitebase",
    industry: "Developer tools",
    quote: "Setting up monitoring for 40 services took an afternoon. The Terraform provider meant it went through code review like everything else.",
    person: "Priya Shah",
    role: "Staff Engineer",
    metric: "4 hrs",
    metricLabel: "from sign-up to full coverage",
  },
];

export const integrations = ["Slack", "Microsoft Teams", "PagerDuty", "Opsgenie", "Discord", "Email", "SMS", "Phone call", "Webhooks", "Terraform", "GitHub", "Zapier"];

export const regions = ["Virginia", "Oregon", "São Paulo", "Toronto", "London", "Frankfurt", "Stockholm", "Mumbai", "Singapore", "Tokyo", "Sydney", "Johannesburg"];
