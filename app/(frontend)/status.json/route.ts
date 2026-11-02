import { components } from "@/lib/status";

export const dynamic = "force-dynamic";

/** Machine-readable status, polled by the status page. */
export function GET() {
  const comps = components();
  return Response.json(
    {
      status: "operational",
      checkedAt: new Date().toISOString(),
      components: comps.map((c) => ({ name: c.name, group: c.group, status: "up", uptime90d: Number(c.uptime.toFixed(3)), latencyMs: c.latency })),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
