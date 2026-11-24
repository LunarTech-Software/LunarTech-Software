import type { Metadata } from "next";
import AboutView from "@/components/internal/AboutView";

export const metadata: Metadata = {
  title: "About — LUNAR",
  description: "LUNAR is a digital engineering studio building custom websites, business systems, automation and IoT monitoring around how your operation actually works.",
};

export default function AboutPage() {
  return <AboutView />;
}
