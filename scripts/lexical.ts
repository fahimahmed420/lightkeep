/**
 * Tiny Markdown-ish → Lexical JSON converter for seed content.
 * Supports: ## / ### headings, paragraphs, - lists, 1. lists, > quotes, ``` code blocks, `code`, **bold**.
 */
type Node = Record<string, unknown>;

function text(t: string): Node[] {
  const out: Node[] = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let last = 0;
  for (const m of t.matchAll(re)) {
    if (m.index! > last) out.push(leaf(t.slice(last, m.index)));
    const s = m[0];
    out.push(s.startsWith("**") ? leaf(s.slice(2, -2), 1) : leaf(s.slice(1, -1), 16));
    last = m.index! + s.length;
  }
  if (last < t.length) out.push(leaf(t.slice(last)));
  return out;
}
const leaf = (t: string, format = 0): Node => ({ type: "text", text: t, format, detail: 0, mode: "normal", style: "", version: 1 });
const block = (type: string, children: Node[], extra: Node = {}): Node => ({ type, children, direction: "ltr", format: "", indent: 0, version: 1, ...extra });

export function md(src: string) {
  const lines = src.trim().split("\n");
  const children: Node[] = [];
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (!l.trim()) continue;
    if (l.startsWith("```")) {
      const code: string[] = [];
      while (++i < lines.length && !lines[i].startsWith("```")) code.push(lines[i]);
      children.push(block("paragraph", [leaf(code.join("\n"), 16)], { textFormat: 16 }));
    } else if (l.startsWith("### ")) children.push(block("heading", text(l.slice(4)), { tag: "h3" }));
    else if (l.startsWith("## ")) children.push(block("heading", text(l.slice(3)), { tag: "h2" }));
    else if (l.startsWith("> ")) children.push(block("quote", text(l.slice(2))));
    else if (/^(- |\d+\. )/.test(l)) {
      const ordered = /^\d+\. /.test(l);
      const items: Node[] = [];
      while (i < lines.length && /^(- |\d+\. )/.test(lines[i])) {
        items.push(block("listitem", text(lines[i].replace(/^(- |\d+\. )/, "")), { value: items.length + 1 }));
        i++;
      }
      i--;
      children.push(block("list", items, { listType: ordered ? "number" : "bullet", start: 1, tag: ordered ? "ol" : "ul" }));
    } else children.push(block("paragraph", text(l), { textFormat: 0 }));
  }
  return { root: { type: "root", children, direction: "ltr", format: "", indent: 0, version: 1 } } as const;
}
