import type { Metadata } from "next";
import HidangView from "@/components/products/HidangView";

export const metadata: Metadata = {
  title: "Hidang POS — LUNAR",
  description: "Hidang: F&B point of sale and restaurant management by LUNAR, configured to each business.",
};

export default function HidangPage() {
  return <HidangView />;
}
