import type { Metadata } from "next";
import ContactView from "@/components/contact/ContactView";

export const metadata: Metadata = {
  title: "Start a project — LUNAR",
  description: "Tell us what you are trying to achieve: a custom business system, software product, website, automation project or hardware integration.",
};

export default function ContactPage() {
  return <ContactView />;
}
