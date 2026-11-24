import type { L } from "@/lib/solutionsHub";

/**
 * Product catalogue. Hidang module statuses come from the Hidang project's own README and code
 * (New_Ideas/FNB_POS), not from marketing intent. Nothing here claims more than that source shows.
 *
 *  implemented : exists in the current Hidang build and is used by the demo data
 *  configurable: exists and is changed from settings, without writing code
 *  integration : exists, but needs an outside account or connection to be live
 *  custom      : not in the build; would be scoped, quoted and built for a specific customer
 */
export type ModuleStatus = "implemented" | "configurable" | "integration" | "custom";

export const moduleStatusMeta: Record<ModuleStatus, { label: L; hint: L }> = {
  implemented: { label: { en: "In the product", id: "Ada di produk" }, hint: { en: "Exists in the current build", id: "Ada di versi saat ini" } },
  configurable: { label: { en: "Configurable", id: "Dapat dikonfigurasi" }, hint: { en: "Changed from settings, no code", id: "Diubah lewat pengaturan, tanpa kode" } },
  integration: { label: { en: "Needs a connection", id: "Perlu koneksi" }, hint: { en: "Built, but needs an outside account or service to go live", id: "Sudah dibuat, tetapi perlu akun atau layanan luar agar aktif" } },
  custom: { label: { en: "Custom work", id: "Pekerjaan khusus" }, hint: { en: "Not in the build; scoped and quoted per customer", id: "Belum ada di versi ini; dirancang dan ditawarkan per pelanggan" } },
};

export interface HidangModule {
  key: string;
  name: L;
  summary: L;
  points: { label: L; status: ModuleStatus }[];
  shot?: { src: string; cap: L };
}

const l = (en: string, id: string): L => ({ en, id });

export const hidangModules: HidangModule[] = [
  {
    key: "pos",
    name: l("Point of sale", "Point of sale"),
    summary: l("A touch-first cashier screen for counter, dine-in and takeaway orders.", "Layar kasir sentuh untuk pesanan konter, makan di tempat, dan bawa pulang."),
    points: [
      { label: l("Tile grid ordering with modifier sheet", "Pemesanan dengan grid menu dan lembar modifier"), status: "implemented" },
      { label: l("Discounts, hold, void, split, merge and transfer", "Diskon, tahan, batal, pisah, gabung, dan pindah pesanan"), status: "implemented" },
      { label: l("Split payments, change due, receipts", "Pembayaran terpisah, kembalian, struk"), status: "implemented" },
      { label: l("QRIS and e-wallet through Midtrans", "QRIS dan e-wallet lewat Midtrans"), status: "integration" },
      { label: l("Direct thermal printer bridge", "Jembatan printer thermal langsung"), status: "custom" },
    ],
    shot: { src: "/images/work/hidang-pos.webp", cap: l("Cashier POS", "POS kasir") },
  },
  {
    key: "orders",
    name: l("Orders & tables", "Pesanan & meja"),
    summary: l("A live orders board and a floor plan with table states.", "Papan pesanan langsung dan denah meja dengan status."),
    points: [
      { label: l("Live statuses with slow-order alerts", "Status langsung dengan peringatan pesanan lambat"), status: "implemented" },
      { label: l("Floor plan: open, transfer, merge, split, close", "Denah: buka, pindah, gabung, pisah, tutup"), status: "implemented" },
      { label: l("Owners can drag tables and add zones", "Pemilik dapat menggeser meja dan menambah zona"), status: "configurable" },
    ],
    shot: { src: "/images/work/hidang-tables.webp", cap: l("Floor plan and table states", "Denah dan status meja") },
  },
  {
    key: "kds",
    name: l("Kitchen display", "Layar dapur"),
    summary: l("Tickets routed to kitchen stations, advanced by a tap.", "Tiket diarahkan ke stasiun dapur dan dimajukan dengan satu ketukan."),
    points: [
      { label: l("Station routing and tap-to-advance", "Rute stasiun dan ketuk untuk maju"), status: "implemented" },
      { label: l("Escalating timers and sound", "Penghitung waktu bertingkat dan suara"), status: "implemented" },
      { label: l("Kitchen stations defined per outlet", "Stasiun dapur ditentukan per outlet"), status: "configurable" },
    ],
    shot: { src: "/images/work/hidang-kds.webp", cap: l("Kitchen display", "Layar dapur") },
  },
  {
    key: "menu",
    name: l("Menu & recipes", "Menu & resep"),
    summary: l("Products, categories, prices and modifiers, with recipes behind them.", "Produk, kategori, harga, dan modifier, dengan resep di baliknya."),
    points: [
      { label: l("Products, categories, modifiers, recipes and costing", "Produk, kategori, modifier, resep, dan biaya"), status: "implemented" },
      { label: l("Quick menu import by pasting rows from a sheet", "Impor menu cepat dengan menempel baris dari lembar kerja"), status: "implemented" },
      { label: l("POS layout editor: tile size, order, favourites", "Editor tata letak POS: ukuran tile, urutan, favorit"), status: "configurable" },
    ],
  },
  {
    key: "inventory",
    name: l("Inventory", "Persediaan"),
    summary: l("Ingredients deducted by recipe when an order is paid.", "Bahan dikurangi menurut resep saat pesanan dibayar."),
    points: [
      { label: l("Recipe-based deduction, including modifier recipes", "Pengurangan menurut resep, termasuk resep modifier"), status: "implemented" },
      { label: l("Purchase orders, receiving, stock opname, waste, transfers", "Pesanan pembelian, penerimaan, stock opname, limbah, transfer"), status: "implemented" },
      { label: l("Production batches for made-ahead items", "Batch produksi untuk item yang dibuat lebih dulu"), status: "implemented" },
    ],
  },
  {
    key: "customers",
    name: l("Customers & loyalty", "Pelanggan & loyalitas"),
    summary: l("Customer records, loyalty tiers and ratings after QR or online orders.", "Data pelanggan, tingkat loyalitas, dan penilaian setelah pesanan QR atau online."),
    points: [
      { label: l("Customer records, loyalty tiers and rewards", "Data pelanggan, tingkat loyalitas, dan hadiah"), status: "implemented" },
      { label: l("WhatsApp campaign helper by segment (staff press send)", "Pembantu kampanye WhatsApp per segmen (staf menekan kirim)"), status: "implemented" },
      { label: l("QR ordering page per table", "Halaman pesan QR per meja"), status: "implemented" },
    ],
  },
  {
    key: "staff",
    name: l("Staff & access", "Staf & akses"),
    summary: l("Role-based sign-in, shift planning and an audit log.", "Masuk berbasis peran, perencanaan shift, dan log audit."),
    points: [
      { label: l("Roles with server-side permissions", "Peran dengan izin di sisi server"), status: "implemented" },
      { label: l("Shift planner, time off, timesheets, clock-in", "Perencana shift, cuti, timesheet, absen masuk"), status: "implemented" },
      { label: l("Manager-PIN approval for voids and refunds; audit log", "Persetujuan PIN manajer untuk pembatalan dan refund; log audit"), status: "implemented" },
    ],
  },
  {
    key: "reports",
    name: l("Reports & back office", "Laporan & back office"),
    summary: l("A dashboard of widgets, reports with CSV export and margins from recipes.", "Dasbor widget, laporan dengan ekspor CSV, dan margin dari resep."),
    points: [
      { label: l("Sales, best sellers, channels, outlets, period comparison", "Penjualan, terlaris, kanal, outlet, perbandingan periode"), status: "implemented" },
      { label: l("Margins from recipes and weighted-average cost", "Margin dari resep dan biaya rata-rata tertimbang"), status: "implemented" },
      { label: l("Customizable dashboard widgets", "Widget dasbor yang dapat diatur"), status: "configurable" },
      { label: l("Rule-based daily suggestions (not generative AI)", "Saran harian berbasis aturan (bukan AI generatif)"), status: "implemented" },
    ],
    shot: { src: "/images/work/hidang-admin.webp", cap: l("Back office dashboard", "Dasbor back office") },
  },
  {
    key: "outlets",
    name: l("Outlets & branding", "Outlet & merek"),
    summary: l("One business, several outlets, each with its own operating mode.", "Satu bisnis, beberapa outlet, masing-masing dengan mode operasi sendiri."),
    points: [
      { label: l("Multiple outlets in one installation", "Beberapa outlet dalam satu instalasi"), status: "implemented" },
      { label: l("Operating mode per outlet: quick, full, café or custom modules", "Mode operasi per outlet: cepat, lengkap, kafe, atau modul khusus"), status: "configurable" },
      { label: l("Brand: logo, colours, font, receipt; tax, service, order types, payment methods", "Merek: logo, warna, font, struk; pajak, layanan, jenis pesanan, metode pembayaran"), status: "configurable" },
      { label: l("Single-node database suits one site or a small chain; large cloud use needs a different data layer", "Database satu node cocok untuk satu lokasi atau jaringan kecil; skala cloud besar perlu lapisan data lain"), status: "custom" },
    ],
  },
];

/** Things customers ask for that Hidang does not do today. Said plainly. */
export const hidangNotIncluded: L[] = [
  l("Direct ESC/POS receipt-printer bridge (printing uses the browser print dialog)", "Jembatan printer struk ESC/POS langsung (pencetakan memakai dialog cetak browser)"),
  l("Kiosk build or other dedicated hardware", "Versi kiosk atau perangkat keras khusus lainnya"),
  l("Generative AI features (the daily suggestions are rule-based)", "Fitur AI generatif (saran harian berbasis aturan)"),
  l("A fully English back office (navigation and core cashier strings are translated; the back office is Indonesian-first)", "Back office penuh berbahasa Inggris (navigasi dan teks kasir inti sudah diterjemahkan; back office berbahasa Indonesia dahulu)"),
];

export const businessTypes: { key: string; label: L; modules: string[] }[] = [
  { key: "cafe", label: l("Café or bakery", "Kafe atau toko roti"), modules: ["pos", "menu", "inventory", "reports"] },
  { key: "restaurant", label: l("Full-service restaurant", "Restoran layanan penuh"), modules: ["pos", "orders", "kds", "menu", "inventory", "staff", "reports"] },
  { key: "chain", label: l("Small chain, several outlets", "Jaringan kecil, beberapa outlet"), modules: ["pos", "orders", "kds", "menu", "inventory", "customers", "staff", "reports", "outlets"] },
  { key: "delivery", label: l("Delivery or cloud kitchen", "Dapur pengiriman atau cloud kitchen"), modules: ["pos", "kds", "menu", "inventory", "customers", "reports"] },
];
