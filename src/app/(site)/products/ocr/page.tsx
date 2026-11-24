import type { Metadata } from "next";
import OcrView from "@/components/products/OcrView";

export const metadata: Metadata = {
  title: "Document OCR — LUNAR",
  description: "Photographed tickets and documents turned into structured data, with a person in charge of every record.",
};

export default function OcrPage() {
  return <OcrView />;
}
