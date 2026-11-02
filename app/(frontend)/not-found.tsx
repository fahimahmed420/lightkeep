import { ArrowRight, Button, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="dots py-28 sm:py-36">
      <Container className="max-w-2xl text-center">
        <p className="font-mono text-sm text-signal">404 · Monitor check failed</p>
        <h1 className="mt-4 text-5xl sm:text-7xl">This page is down.</h1>
        <p className="mt-5 text-lg text-muted">Permanently, we&apos;re afraid. The address may have changed, or it never existed.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Button href="/">Back to home <ArrowRight /></Button>
          <Button href="/docs" variant="outline">Search the docs</Button>
        </div>
      </Container>
    </section>
  );
}
