import type { MetadataRoute } from "next";
import { articles } from "@/lib/insights";
import { work } from "@/lib/work";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bylunartech.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/solutions", "/products", "/products/hidang", "/products/ocr", "/products/face-attendance", "/our-work", "/our-work/vpl", "/process", "/insights", "/contact"];
  return [
    ...pages.map((p) => ({ url: `${base}${p}`, changeFrequency: "monthly" as const })),
    ...work.filter((w) => w.slug !== "hidang" && w.slug !== "vpl").map((w) => ({ url: `${base}/our-work/${w.slug}`, changeFrequency: "yearly" as const })),
    ...articles.map((a) => ({ url: `${base}/insights/${a.slug}`, lastModified: a.date, changeFrequency: "yearly" as const })),
  ];
}
