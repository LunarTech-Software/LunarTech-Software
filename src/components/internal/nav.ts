import type { Localized } from "@/types/content";

/** Internal-page navigation. "Position" is replaced by "About" here; the homepage header is untouched. */
export const internalNav: { href: string; label: Localized }[] = [
  { href: "/", label: { en: "Home", id: "Beranda" } },
  { href: "/about", label: { en: "About", id: "Tentang" } },
  { href: "/solutions", label: { en: "Solutions", id: "Solusi" } },
  { href: "/products", label: { en: "Products", id: "Produk" } },
  { href: "/our-work", label: { en: "Our Work", id: "Karya Kami" } },
  { href: "/insights", label: { en: "Insights", id: "Insights" } },
  { href: "/process", label: { en: "Process", id: "Proses" } },
  { href: "/contact", label: { en: "Contact", id: "Kontak" } },
];
