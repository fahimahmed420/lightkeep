import Link from "next/link";
import { site } from "@/content/site";
import { Container, StatusDot } from "./ui";
import { Logo } from "./Logo";

const cols = [
  { title: "Product", links: [["/product", "Overview"], ["/product/monitoring", "Monitoring"], ["/product/status-pages", "Status pages"], ["/pricing", "Pricing"], ["/changelog", "Changelog"]] },
  { title: "Resources", links: [["/docs", "Documentation"], ["/blog", "Blog"], ["/customers", "Customers"], ["/status", "System status"]] },
  { title: "Company", links: [["/about", "About"], ["/contact", "Contact sales"], ["/privacy", "Privacy"], ["/terms", "Terms"], ["/credits", "Credits"]] },
];

export function Footer() {
  return (
    <footer className="bg-night text-[#b7c4be]">
      <Container className="grid gap-12 py-16 lg:grid-cols-[1.3fr_repeat(3,1fr)]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-xs leading-relaxed">{site.tagline}</p>
          <Link href="/status" className="mt-6 inline-flex min-h-11 items-center gap-2.5 rounded-full border border-white/15 px-4 text-sm text-white hover:border-white/40">
            <StatusDot pulse /> All systems operational
          </Link>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-white">{c.title}</h2>
            <ul className="mt-4 space-y-0.5">
              {c.links.map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="inline-flex min-h-11 items-center hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-sm md:flex-row md:justify-between">
          <p>© 2026 Lightkeep, Inc.</p>
          <p>
            Lightkeep is a fictional company. Site designed and built by{" "}
            <a href={site.caseStudyUrl} className="text-white underline-offset-4 hover:underline">
              Zordev
            </a>
            .
          </p>
        </Container>
      </div>
    </footer>
  );
}
