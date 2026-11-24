import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleView from "@/components/insights/ArticleView";
import { articles, bySlug } from "@/lib/insights";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = bySlug(slug);
  if (!a) return {};
  return {
    title: `${a.title.en} — LUNAR Insights`,
    description: a.description.en,
    alternates: { canonical: `/insights/${a.slug}` },
    openGraph: { type: "article", title: a.title.en, description: a.description.en, publishedTime: a.date, url: `/insights/${a.slug}`, siteName: "LUNAR", images: [{ url: "/og.png", width: 1200, height: 630 }] },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = bySlug(slug);
  if (!a) notFound();
  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title.en,
    description: a.description.en,
    datePublished: a.date,
    inLanguage: ["en", "id"],
    author: { "@type": "Organization", name: "LUNAR" },
    publisher: { "@type": "Organization", name: "LUNAR" },
    keywords: a.tags.join(", "),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <ArticleView slug={slug} />
    </>
  );
}
