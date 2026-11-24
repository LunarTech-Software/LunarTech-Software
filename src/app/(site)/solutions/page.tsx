import type { Metadata } from "next";
import SolutionsView from "@/components/internal/SolutionsView";

export const metadata: Metadata = {
  title: "Solutions — LUNAR",
  description: "Custom business systems, fleet and hauling management, equipment rental, ERP, websites, automation and IoT, built around how your operation actually works.",
};

export default function SolutionsPage() {
  return <SolutionsView />;
}
