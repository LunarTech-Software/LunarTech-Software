"use client";

import ProductPage, { type ProductContent } from "./ProductPage";

const l = (en: string, id: string) => ({ en, id });

const C: ProductContent = {
  kicker: l("Document OCR / a LUNAR capability", "OCR Dokumen / kemampuan LUNAR"),
  headline: l("Paperwork that reads itself.", "Kertas yang membaca dirinya sendiri."),
  lead: l("A photographed ticket or document becomes structured data your system can check, instead of a retyping job.", "Tiket atau dokumen yang difoto menjadi data terstruktur yang dapat diperiksa sistem Anda, bukan pekerjaan mengetik ulang."),
  photo: "/images/products/ocr-scan.webp",
  photoPos: "50% 62%",
  imageNote: l("Product presentation image. The document and names shown are illustrative", "Gambar presentasi produk. Dokumen dan nama yang ditampilkan bersifat ilustratif"),
  accent: "#E98459",
  capabilities: [
    { label: l("Photo upload of weighing tickets, exit tickets, or both in one photo", "Unggah foto tiket timbang, tiket keluar, atau keduanya dalam satu foto"), status: "implemented" },
    { label: l("OCR on a separate computer, returning structured results with a confidence score", "OCR di komputer terpisah, mengembalikan hasil terstruktur dengan skor keyakinan"), status: "implemented" },
    { label: l("Results panel with confidence and review hints, refreshed automatically", "Panel hasil dengan keyakinan dan petunjuk tinjauan, diperbarui otomatis"), status: "implemented" },
    { label: l("Fills empty fields only when confidence is 98% or higher, and never overwrites what a person typed", "Mengisi kolom kosong hanya bila keyakinan 98% atau lebih, dan tidak pernah menimpa isian manusia"), status: "implemented" },
    { label: l("HEIC and HEIF phone photos accepted", "Foto ponsel HEIC dan HEIF diterima"), status: "implemented" },
    { label: l("Other documents such as invoices and delivery notes", "Dokumen lain seperti faktur dan surat jalan"), status: "custom" },
    { label: l("Posting extracted data into your own business system", "Mengirim data hasil ekstraksi ke sistem bisnis Anda sendiri"), status: "custom" },
  ],
  notes: [
    { title: l("A person stays in charge", "Manusia tetap memegang kendali"), body: l("In the hauling system where this runs, OCR never saves a record by itself. It suggests values; a person reviews and saves.", "Pada sistem hauling tempat ini berjalan, OCR tidak pernah menyimpan catatan sendiri. OCR mengusulkan nilai; manusia meninjau dan menyimpan.") },
    { title: l("Where it is proven", "Di mana terbukti"), body: l("The ticket workflow above comes from a hauling operations system. New document types are scoped, tested on your samples and quoted separately.", "Alur tiket di atas berasal dari sistem operasi hauling. Jenis dokumen baru dirancang, diuji pada contoh Anda, dan ditawarkan terpisah.") },
  ],
};

export default function OcrView() {
  return <ProductPage c={C} path="/products/ocr" />;
}
