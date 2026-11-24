import type { Metadata } from "next";
import InsightsView from "@/components/insights/InsightsView";

export const metadata: Metadata = {
  title: "Insights — LUNAR",
  description: "Perspectives on business technology, intelligent systems, automation, and building a more connected operation.",
  alternates: { canonical: "/insights", types: { "application/rss+xml": "/feed.xml" } },
};

export default function InsightsPage() {
  return <InsightsView />;
}
