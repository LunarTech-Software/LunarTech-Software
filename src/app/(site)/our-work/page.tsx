import type { Metadata } from "next";
import WorkView from "@/components/work/WorkView";

export const metadata: Metadata = {
  title: "Selected work — LUNAR",
  description: "A selection of digital experiences, operational platforms, and engineered solutions created by LUNAR.",
};

export default function OurWorkPage() {
  return <WorkView />;
}
