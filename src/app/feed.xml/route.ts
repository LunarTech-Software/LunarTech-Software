import { articles } from "@/lib/insights";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bylunartech.com";
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function GET() {
  const items = [...articles]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((a) => `<item><title>${esc(a.title.en)}</title><link>${base}/insights/${a.slug}</link><guid>${base}/insights/${a.slug}</guid><pubDate>${new Date(a.date).toUTCString()}</pubDate><description>${esc(a.description.en)}</description></item>`)
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>LUNAR Insights</title><link>${base}/insights</link><description>Perspectives on business technology, intelligent systems and automation.</description>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
