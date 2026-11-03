import { ArrowRight, Button, Container, StatusDot } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="dots dots-fade absolute inset-0" />
      <Container className="relative max-w-2xl text-center">
        <p className="inline-flex items-center gap-2.5 rounded-full border border-red/30 bg-red-soft px-4 py-1.5 font-mono text-sm text-red">
          <StatusDot status="down" pulse /> 404 · check failed from 12 of 12 regions
        </p>
        <h1 className="fade-up mt-6 text-5xl sm:text-7xl lg:text-8xl">This page is down.</h1>
        <p className="fade-up mt-5 text-lg text-muted lg:text-xl" style={{ ["--d" as string]: "80ms" }}>
          Permanently, we&apos;re afraid. The address may have changed, or it never existed.
        </p>
        <div className="fade-up mt-8 flex flex-wrap justify-center gap-3" style={{ ["--d" as string]: "160ms" }}>
          <Button href="/">
            Back to home <ArrowRight />
          </Button>
          <Button href="/docs" variant="outline">
            Search the docs
          </Button>
        </div>
      </Container>
    </section>
  );
}
