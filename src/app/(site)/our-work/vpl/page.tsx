import type { Metadata } from "next";
import VplView from "@/components/products/VplView";

export const metadata: Metadata = {
  title: "VPL Hauling Operations — LUNAR",
  description: "VPL: a hauling operations platform by LUNAR, shown with its real dashboard.",
};

export default function VplPage() {
  return <VplView />;
}
