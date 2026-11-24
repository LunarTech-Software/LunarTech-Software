import type { Metadata } from "next";
import ProcessView from "@/components/internal/ProcessView";

export const metadata: Metadata = {
  title: "Process — LUNAR",
  description: "Six connected stages from the first conversation to a system your team can run: discover, architect, design, develop, validate, deploy and support.",
};

export default function ProcessPage() {
  return <ProcessView />;
}
