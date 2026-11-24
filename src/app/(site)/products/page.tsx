import type { Metadata } from "next";
import ProductsView from "@/components/products/ProductsView";

export const metadata: Metadata = {
  title: "Products — LUNAR",
  description: "Software platforms built by LUNAR that can be configured and extended to suit your operations.",
};

export default function ProductsPage() {
  return <ProductsView />;
}
