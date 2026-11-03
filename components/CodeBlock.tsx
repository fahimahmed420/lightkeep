/*
  A webhook payload with hand-placed syntax colours. No highlighter dependency:
  the payload is fixed content, so tokens are written out as spans.
*/

const K = ({ children }: { children: string }) => <span className="text-[#9ec5ff]">&quot;{children}&quot;</span>;
const S = ({ children }: { children: string }) => <span className="text-[#f2c879]">&quot;{children}&quot;</span>;
const N = ({ children }: { children: string }) => <span className="text-signal-3">{children}</span>;
const P = ({ children }: { children: React.ReactNode }) => <span className="text-fog">{children}</span>;

export function AlertPayload({ className = "" }: { className?: string }) {
  const lines: React.ReactNode[] = [
    <>
      <P>{"{"}</P>
    </>,
    <>
      {"  "}
      <K>event</K>
      <P>: </P>
      <S>monitor.degraded</S>
      <P>,</P>
    </>,
    <>
      {"  "}
      <K>monitor</K>
      <P>: </P>
      <S>eu.api.parcelry.com</S>
      <P>,</P>
    </>,
    <>
      {"  "}
      <K>region</K>
      <P>: </P>
      <S>fra1</S>
      <P>,</P>
    </>,
    <>
      {"  "}
      <K>response_ms</K>
      <P>: </P>
      <N>912</N>
      <P>,</P>
    </>,
    <>
      {"  "}
      <K>threshold_ms</K>
      <P>: </P>
      <N>500</N>
      <P>,</P>
    </>,
    <>
      {"  "}
      <K>confirmed_by</K>
      <P>: [</P>
      <S>lhr1</S>
      <P>, </P>
      <S>arn1</S>
      <P>, </P>
      <S>iad1</S>
      <P>],</P>
    </>,
    <>
      {"  "}
      <K>on_call</K>
      <P>: {"{ "}</P>
      <K>name</K>
      <P>: </P>
      <S>Maya Okafor</S>
      <P>, </P>
      <K>via</K>
      <P>: </P>
      <S>slack</S>
      <P>{" },"}</P>
    </>,
    <>
      {"  "}
      <K>escalate_after</K>
      <P>: </P>
      <N>300</N>
      <P>,</P>
    </>,
    <>
      {"  "}
      <K>incident_url</K>
      <P>: </P>
      <S>https://app.lightkeep.io/i/8f2c</S>
    </>,
    <>
      <P>{"}"}</P>
    </>,
  ];
  return (
    <div className={`hairline min-w-0 overflow-hidden rounded-2xl bg-night shadow-[var(--shadow-glow)] ${className}`}>
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 font-mono text-[0.7rem] text-fog">
        <span className="flex min-w-0 items-center gap-2 truncate">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-signal" /> POST https://hooks.yourapp.com/lightkeep
        </span>
        <span>application/json</span>
      </div>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-[0.8rem] leading-[1.7] text-[#d6e2dc] sm:text-[0.85rem]">
        <code>
          {lines.map((l, i) => (
            <span key={i} className="fade-up block" style={{ ["--d" as string]: `${i * 60}ms` }}>
              <span className="mr-4 inline-block w-4 select-none text-right text-white/25">{i + 1}</span>
              {l}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
