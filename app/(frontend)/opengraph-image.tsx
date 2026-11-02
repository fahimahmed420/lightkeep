import { ImageResponse } from "next/og";

export const alt = "Lightkeep: know it's down before your customers do";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  const bars = Array.from({ length: 60 }, (_, i) => (i === 41 ? "#c7871f" : i === 17 ? "#c94a35" : "#17895c"));
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#fbfaf7", padding: 72, fontFamily: "serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 40, color: "#111a17" }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: "#111a17", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 16, height: 16, borderRadius: 99, background: "#17895c" }} />
          </div>
          Lightkeep
        </div>
        <div style={{ display: "flex", fontSize: 84, lineHeight: 1.02, color: "#111a17", maxWidth: 1000 }}>Know it&apos;s down before your customers do.</div>
        <div style={{ display: "flex", gap: 5, height: 48 }}>
          {bars.map((c, i) => (
            <div key={i} style={{ flex: 1, background: c, borderRadius: 3 }} />
          ))}
        </div>
      </div>
    ),
    size,
  );
}
