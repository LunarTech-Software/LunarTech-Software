import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudy from "@/components/work/CaseStudy";
import { work } from "@/lib/work";

// VPL has its own dedicated page at /our-work/vpl and Hidang lives under /products, so they are not generated here.
const own = new Set(["vpl", "hidang"]);
const pages = () => work.filter((w) => !own.has(w.slug));

export function generateStaticParams() {
  return pages().map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const w = pages().find((x) => x.slug === slug);
  if (!w) return {};
  return { title: `${w.name}: ${w.headline[0].en} ${w.headline[1].en} — LUNAR`, description: w.blurb.en };
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!pages().some((w) => w.slug === slug)) notFound();
  return <CaseStudy slug={slug} />;
}
