import { notFound } from "next/navigation";
import { solutions } from "@/lib/content";
import SolutionDetail from "@/components/SolutionDetail";

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = solutions.find((s) => s.slug === slug);
  if (!solution) notFound();
  return <SolutionDetail solution={solution} />;
}
