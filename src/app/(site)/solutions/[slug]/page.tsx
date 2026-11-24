import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { solutions } from "@/lib/content";
import { hubBySlug, hubSolutions } from "@/lib/solutionsHub";
import SolutionDetail from "@/components/SolutionDetail";
import HubSolutionPage from "@/components/internal/HubSolutionPage";

export function generateStaticParams() {
  return [...hubSolutions.map((s) => ({ slug: s.slug })), ...solutions.map((s) => ({ slug: s.slug }))];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const hub = hubBySlug(slug);
  if (hub) return { title: `${hub.name.en} — LUNAR Solutions`, description: hub.statement.en };
  const solution = solutions.find((x) => x.slug === slug);
  if (solution) return { title: `${solution.name.en} — LUNAR Solutions`, description: solution.promise.en };
  return {};
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // New business-solution pages first; the original solution pages keep working at their existing URLs.
  const hub = hubBySlug(slug);
  if (hub) return <HubSolutionPage solution={hub} />;
  const solution = solutions.find((s) => s.slug === slug);
  if (!solution) notFound();
  return <SolutionDetail solution={solution} />;
}
