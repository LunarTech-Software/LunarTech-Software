/**
 * Selected work: the verified set. Every claim here comes from something that exists: the Hidang README and
 * code, the VPL project docs, the policy-management build, or the project descriptions already on this site.
 * No metrics, testimonials or client names are invented. Years are omitted because they are not verified.
 * Client names stay withheld except VPL, which the owner asked to show.
 */

export type L = { en: string; id: string };
const l = (en: string, id: string): L => ({ en, id });

export type WorkCat = "websites" | "business" | "fleet" | "fnb" | "ai" | "hardware";
export type WorkStatus = "own-product" | "client-platform" | "demo" | "in-development" | "concept";

export const workCats: { key: WorkCat | "all"; label: L }[] = [
  { key: "all", label: l("All work", "Semua karya") },
  { key: "websites", label: l("Websites", "Website") },
  { key: "business", label: l("Business systems", "Sistem bisnis") },
  { key: "fleet", label: l("Fleet & hauling", "Armada & hauling") },
  { key: "fnb", label: l("F&B technology", "Teknologi F&B") },
  { key: "ai", label: l("AI & automation", "AI & otomasi") },
  { key: "hardware", label: l("Hardware & IoT", "Perangkat keras & IoT") },
];

export const statusMeta: Record<WorkStatus, { label: L; note: L }> = {
  "own-product": { label: l("Own product", "Produk sendiri"), note: l("Built and owned by LUNAR", "Dibangun dan dimiliki LUNAR") },
  "client-platform": { label: l("Client platform", "Platform klien"), note: l("Built for a client", "Dibangun untuk klien") },
  demo: { label: l("Demo project", "Proyek demo"), note: l("Built to demonstrate capability, not a client delivery", "Dibuat untuk memperlihatkan kemampuan, bukan hasil kerja klien") },
  "in-development": { label: l("In development", "Dalam pengembangan"), note: l("Being built now", "Sedang dibangun") },
  concept: { label: l("Concept", "Konsep"), note: l("A designed proposal, not delivered", "Usulan yang dirancang, belum diserahkan") },
};

export type Layout = "web" | "dashboard" | "screens" | "type";

export interface Feature {
  title: L;
  body: L;
  img?: string;
}

export interface WorkItem {
  slug: string;
  num: string;
  cat: WorkCat;
  status: WorkStatus;
  name: string;
  kicker: L;
  headline: [L, L];
  blurb: L;
  caps: L[];
  layout: Layout;
  /** where the card links: a case study page, or an existing dedicated page */
  href: string;
  images: { main?: string; second?: string; mobile?: string; alt: string };
  imageNote?: L;
  external?: { url: string; label: L };
  overview: L;
  challenge?: L;
  approach: L;
  solution: L;
  features: Feature[];
  tech?: L[];
  outcome: L;
}

export const work: WorkItem[] = [
  {
    slug: "lumara-design",
    num: "01",
    cat: "websites",
    status: "demo",
    name: "Lumara",
    kicker: l("Website / Digital presence", "Website / Kehadiran digital"),
    headline: [l("Digital presence,", "Kehadiran digital,"), l("reimagined.", "dibayangkan ulang.")],
    blurb: l("A responsive digital experience built to communicate the brand, showcase its offering, and simplify customer enquiries.", "Pengalaman digital responsif yang dibangun untuk menyampaikan merek, menampilkan penawarannya, dan mempermudah pertanyaan pelanggan."),
    caps: [l("Responsive website", "Website responsif"), l("Brand-focused design", "Desain berfokus pada merek"), l("Lead generation", "Penjaringan prospek"), l("Navigation and content structure", "Navigasi dan struktur konten")],
    layout: "web",
    href: "/our-work/lumara-design",
    images: { main: "/images/work/lumara-desktop.webp", mobile: "/images/work/lumara-mobile.webp", alt: "Lumara website on desktop and phone" },
    external: { url: "https://lumaradesign.netlify.app/", label: l("Visit the live demo", "Kunjungi demo langsung") },
    overview: l("Lumara is a demonstration website for a fictional Indonesian furniture brand. It was built to show how a company site can present a brand, an offering and a clear path to an enquiry.", "Lumara adalah website demonstrasi untuk merek furnitur Indonesia fiktif. Dibuat untuk menunjukkan bagaimana situs perusahaan dapat menyajikan merek, penawaran, dan jalur yang jelas menuju permintaan."),
    approach: l("The structure starts from what a visitor needs to decide: who the brand is, what it makes, and how to start a conversation. Content is ordered around that, with one clear action on every screen.", "Strukturnya dimulai dari apa yang perlu diputuskan pengunjung: siapa merek ini, apa yang dibuatnya, dan bagaimana memulai percakapan. Konten diurutkan di sekitarnya, dengan satu tindakan jelas di setiap layar."),
    solution: l("A responsive site with a full-bleed hero, a clear menu of collections, materials, craftsmanship, projects and hospitality, and a persistent \"Discuss a project\" action.", "Situs responsif dengan hero layar penuh, menu yang jelas untuk koleksi, material, pengerjaan, proyek, dan hospitality, serta tombol \"Diskusikan proyek\" yang selalu tersedia."),
    features: [
      { title: l("Desktop and phone from one design", "Desktop dan ponsel dari satu rancangan"), body: l("The same content order and call to action carry across screen sizes.", "Urutan konten dan ajakan bertindak yang sama berlaku di semua ukuran layar."), img: "/images/work/lumara-mobile.webp" },
      { title: l("A clear route to an enquiry", "Jalur jelas menuju permintaan"), body: l("\"Discuss a project\" stays visible in the header and in the hero.", "\"Diskusikan proyek\" tetap terlihat di header dan di hero.") },
    ],
    outcome: l("A live demonstration site. It is not a client delivery and no performance figures are claimed.", "Situs demonstrasi yang aktif. Bukan hasil kerja klien dan tidak ada klaim angka kinerja."),
  },
  {
    slug: "vpl",
    num: "02",
    cat: "fleet",
    status: "client-platform",
    name: "VPL",
    kicker: l("Fleet & hauling / Operations platform", "Armada & hauling / Platform operasional"),
    headline: [l("Operations.", "Operasi."), l("Under control.", "Terkendali.")],
    blurb: l("An integrated management platform for hauling operations, fleet, fuel, reporting and oversight in one connected environment.", "Platform manajemen terpadu untuk operasi hauling, armada, BBM, pelaporan, dan pengawasan dalam satu lingkungan terhubung."),
    caps: [l("Hauling trip records", "Catatan trip hauling"), l("Fuel and goods issue", "BBM dan pengeluaran barang"), l("Fleet and unit detail", "Armada dan detail unit"), l("Reconciliation and reporting", "Rekonsiliasi dan pelaporan")],
    layout: "dashboard",
    href: "/our-work/vpl",
    images: { main: "/images/work/vpl-dashboard.webp", alt: "The VPL hauling operations dashboard" },
    imageNote: l("Real VPL screen, test environment", "Layar VPL asli, lingkungan uji"),
    overview: l("", ""),
    approach: l("", ""),
    solution: l("", ""),
    features: [],
    outcome: l("", ""),
  },
  {
    slug: "hidang",
    num: "03",
    cat: "fnb",
    status: "own-product",
    name: "Hidang",
    kicker: l("F&B technology / Point of sale", "Teknologi F&B / Point of sale"),
    headline: [l("Restaurant operations,", "Operasi restoran,"), l("on one record.", "dalam satu catatan.")],
    blurb: l("A touch-first cashier POS and restaurant back office: orders, tables, kitchen display, inventory with recipes, customers, staff and reports.", "POS kasir layar sentuh dan back office restoran: pesanan, meja, layar dapur, persediaan dengan resep, pelanggan, staf, dan laporan."),
    caps: [l("Cashier POS", "POS kasir"), l("Kitchen display", "Layar dapur"), l("Inventory and recipes", "Persediaan dan resep"), l("Multi-outlet", "Multi-outlet")],
    layout: "screens",
    href: "/products/hidang",
    images: { main: "/images/work/hidang-pos.webp", second: "/images/work/hidang-tables.webp", alt: "Hidang cashier POS and floor plan" },
    imageNote: l("Real Hidang screens, built-in demo data", "Layar Hidang asli, data demo bawaan"),
    overview: l("", ""),
    approach: l("", ""),
    solution: l("", ""),
    features: [],
    outcome: l("", ""),
  },
  {
    slug: "insurance-policy-management",
    num: "04",
    cat: "business",
    status: "client-platform",
    name: l("Policy management", "Manajemen polis").en,
    kicker: l("Business systems / Insurance", "Sistem bisnis / Asuransi"),
    headline: [l("From spreadsheets", "Dari spreadsheet"), l("to a system.", "menjadi sistem.")],
    blurb: l("A web system that replaces the Excel policy-account and renewal sheets: every column kept, renewals watched by end date, with premiums, customers, reports and Excel import and export.", "Sistem web yang menggantikan lembar Excel account polis dan renewal: semua kolom dipertahankan, renewal dipantau berdasarkan tanggal berakhir, dengan premi, nasabah, laporan, serta impor dan ekspor Excel."),
    caps: [l("Policy accounts", "Account polis"), l("Renewal tracking", "Pemantauan renewal"), l("Premium suggestions", "Saran premi"), l("Excel import and export", "Impor dan ekspor Excel")],
    layout: "screens",
    href: "/our-work/insurance-policy-management",
    images: { main: "/images/work/insurance-dashboard.webp", second: "/images/work/insurance-renewal.webp", alt: "Insurance policy management dashboard and renewal screen" },
    imageNote: l("Real interface, fictional names and data. Client not named.", "Antarmuka asli, nama dan data fiktif. Klien tidak disebutkan."),
    overview: l("A web system built for an insurance business that ran its policy accounts and renewals on Excel sheets. It keeps every column of the original sheets and adds the controls a spreadsheet cannot give.", "Sistem web untuk bisnis asuransi yang menjalankan account polis dan renewal di lembar Excel. Sistem ini mempertahankan setiap kolom lembar asli dan menambahkan kendali yang tidak dapat diberikan spreadsheet."),
    challenge: l("Policy accounts and renewals lived in separate Excel sheets, so renewals depended on someone remembering to check end dates.", "Account polis dan renewal berada di lembar Excel terpisah, sehingga renewal bergantung pada seseorang yang ingat memeriksa tanggal berakhir."),
    approach: l("Keep what people already know: the same columns and the same vocabulary, in a system that watches the dates for them.", "Pertahankan yang sudah dikenal orang: kolom dan istilah yang sama, dalam sistem yang memantau tanggalnya untuk mereka."),
    solution: l("Policy accounts, renewals watched by end date, premiums, customers, reports, and import and export to Excel.", "Account polis, renewal yang dipantau berdasarkan tanggal berakhir, premi, nasabah, laporan, serta impor dan ekspor ke Excel."),
    features: [
      { title: l("Renewals watched by end date", "Renewal dipantau berdasarkan tanggal berakhir"), body: l("A renewal opens a linked new policy; the old one is never changed.", "Renewal membuka polis baru yang terhubung; polis lama tidak pernah diubah."), img: "/images/work/insurance-renewal.webp" },
      { title: l("Policy account detail", "Detail account polis"), body: l("Premium is a calculated suggestion that can always be edited by hand.", "Premi berupa saran hitungan yang selalu dapat diedit manual."), img: "/images/work/insurance-account.webp" },
      { title: l("Overview dashboard", "Dasbor ringkasan"), body: l("The portfolio and upcoming renewals at a glance.", "Portofolio dan renewal mendatang dalam sekilas."), img: "/images/work/insurance-dashboard.webp" },
    ],
    outcome: l("A working client system. No performance figures are published.", "Sistem klien yang berfungsi. Tidak ada angka kinerja yang dipublikasikan."),
  },
  {
    slug: "baja-makmur-erp",
    num: "05",
    cat: "business",
    status: "demo",
    name: "Baja Makmur",
    kicker: l("Business systems / Inventory", "Sistem bisnis / Persediaan"),
    headline: [l("Stock you can", "Stok yang bisa"), l("trust.", "dipercaya.")],
    blurb: l("A demonstration inventory and records system with real-time dashboards and low-stock alerts.", "Sistem inventaris dan catatan demonstrasi dengan dasbor langsung dan notifikasi stok rendah."),
    caps: [l("Inventory records", "Catatan persediaan"), l("Live dashboards", "Dasbor langsung"), l("Low-stock alerts", "Notifikasi stok rendah")],
    layout: "type",
    href: "/our-work/baja-makmur-erp",
    images: { alt: "" },
    overview: l("Baja Makmur is a demonstration system for a steel-supply business: an inventory and records application with live dashboards and low-stock alerts, built to show what a custom business system can look like.", "Baja Makmur adalah sistem demonstrasi untuk bisnis pasokan baja: aplikasi persediaan dan catatan dengan dasbor langsung dan notifikasi stok rendah, dibuat untuk menunjukkan seperti apa sistem bisnis kustom."),
    approach: l("Start from the records a business already keeps, make stock levels visible as they change, and warn before an item runs out.", "Mulai dari catatan yang sudah dimiliki bisnis, tampilkan tingkat stok saat berubah, dan beri peringatan sebelum barang habis."),
    solution: l("An inventory and records application with real-time dashboards and low-stock alerts.", "Aplikasi persediaan dan catatan dengan dasbor waktu nyata dan notifikasi stok rendah."),
    features: [],
    outcome: l("A demonstration system, not a client delivery. Its public demo is currently offline, so no link is shown and we are not publishing a screenshot of it.", "Sistem demonstrasi, bukan hasil kerja klien. Demo publiknya saat ini sedang offline, sehingga tidak ada tautan dan kami tidak menerbitkan tangkapan layarnya."),
  },
  {
    slug: "document-ocr",
    num: "06",
    cat: "ai",
    status: "client-platform",
    name: "Ticket OCR",
    kicker: l("AI & automation / Document OCR", "AI & otomasi / OCR dokumen"),
    headline: [l("Paperwork that", "Kertas yang"), l("reads itself.", "membaca dirinya.")],
    blurb: l("Photographed weighing tickets are read by OCR and returned as structured data, with a person reviewing and saving every record.", "Foto tiket timbang dibaca oleh OCR dan dikembalikan sebagai data terstruktur, dengan manusia yang meninjau dan menyimpan setiap catatan."),
    caps: [l("Photo upload", "Unggah foto"), l("Confidence scores", "Skor keyakinan"), l("Review before saving", "Tinjau sebelum menyimpan")],
    layout: "type",
    href: "/our-work/document-ocr",
    images: { alt: "" },
    overview: l("Inside a hauling operations system, drivers' weighing and exit tickets are photographed and read by OCR on a separate computer. The results come back into the form as suggestions.", "Di dalam sistem operasi hauling, tiket timbang dan tiket keluar milik pengemudi difoto dan dibaca oleh OCR di komputer terpisah. Hasilnya kembali ke formulir sebagai usulan."),
    challenge: l("Ticket numbers and weights were typed by hand from paper, which is slow and easy to get wrong.", "Nomor tiket dan berat diketik manual dari kertas, yang lambat dan mudah keliru."),
    approach: l("Automate the retyping, not the decision. Results carry a confidence score, fill only empty fields at high confidence, and never overwrite what a person typed.", "Otomatiskan pengetikan ulang, bukan keputusannya. Hasil membawa skor keyakinan, hanya mengisi kolom kosong pada keyakinan tinggi, dan tidak pernah menimpa isian manusia."),
    solution: l("Photo upload to storage, OCR on a separate computer, results returned through an authenticated API, and a results panel in the hauling form.", "Unggah foto ke penyimpanan, OCR di komputer terpisah, hasil dikembalikan lewat API terautentikasi, dan panel hasil pada formulir hauling."),
    features: [
      { title: l("Three photo types", "Tiga jenis foto"), body: l("Weighing ticket, exit ticket, or both in one photo; HEIC phone photos are accepted.", "Tiket timbang, tiket keluar, atau keduanya dalam satu foto; foto ponsel HEIC diterima.") },
      { title: l("Confidence and review hints", "Keyakinan dan petunjuk tinjauan"), body: l("The panel refreshes on its own and shows what needs a person's attention.", "Panel diperbarui otomatis dan menunjukkan apa yang perlu perhatian manusia.") },
    ],
    tech: [l("Supabase Storage for photos", "Supabase Storage untuk foto"), l("OCR on a separate computer, results as JSON over an authenticated API", "OCR di komputer terpisah, hasil berupa JSON lewat API terautentikasi")],
    outcome: l("Part of a client platform. No accuracy figures are published: accuracy depends on the photos and is measured on the customer's own documents.", "Bagian dari platform klien. Tidak ada angka akurasi yang dipublikasikan: akurasi bergantung pada foto dan diukur pada dokumen pelanggan sendiri."),
  },
  {
    slug: "hardware-monitoring",
    num: "07",
    cat: "hardware",
    status: "in-development",
    name: "Sensor monitoring",
    kicker: l("Hardware & IoT / Monitoring", "Perangkat keras & IoT / Pemantauan"),
    headline: [l("From the machine", "Dari mesin"), l("to the screen.", "ke layar.")],
    blurb: l("Our first sensor and automation monitoring prototype is being built now.", "Prototipe pemantauan sensor dan otomasi pertama kami sedang dibangun."),
    caps: [l("Sensor readings", "Pembacaan sensor"), l("Threshold alerts", "Peringatan ambang batas"), l("Live dashboards", "Dasbor langsung")],
    layout: "type",
    href: "/our-work/hardware-monitoring",
    images: { alt: "" },
    overview: l("A monitoring prototype that connects sensors to a dashboard and raises an alert when a limit is crossed. It is in development and not yet delivered to anyone.", "Prototipe pemantauan yang menghubungkan sensor ke dasbor dan memicu peringatan saat batas terlewati. Masih dalam pengembangan dan belum diserahkan kepada siapa pun."),
    approach: l("Prove the chain end to end on one machine first: sensor, controller, storage, display, alert.", "Buktikan rantainya dari ujung ke ujung pada satu mesin dulu: sensor, pengendali, penyimpanan, tampilan, peringatan."),
    solution: l("Not yet delivered. The concept is explained on the Solutions page as an example architecture.", "Belum diserahkan. Konsepnya dijelaskan di halaman Solusi sebagai contoh arsitektur."),
    features: [],
    outcome: l("In development. We will publish what it does once it has run on real equipment.", "Dalam pengembangan. Kami akan menerbitkan hasilnya setelah berjalan pada peralatan nyata."),
  },
  {
    slug: "equipment-rental-concept",
    num: "08",
    cat: "fleet",
    status: "concept",
    name: "Equipment rental",
    kicker: l("Fleet & hauling / Rental operations", "Armada & hauling / Operasi rental"),
    headline: [l("Every asset.", "Setiap aset."), l("Every hour.", "Setiap jam.")],
    blurb: l("A designed workflow for machine availability, operating-hour timesheets, operators and rental invoicing. A proposal.", "Alur kerja yang dirancang untuk ketersediaan mesin, timesheet jam operasi, operator, dan faktur sewa. Sebuah usulan."),
    caps: [l("Availability", "Ketersediaan"), l("Operating-hour timesheets", "Timesheet jam operasi"), l("Rental invoicing", "Faktur sewa")],
    layout: "type",
    href: "/our-work/equipment-rental-concept",
    images: { alt: "" },
    overview: l("A proposed workflow for heavy-equipment rental: which machine is available, how many hours it ran, who operated it, and what to invoice.", "Alur kerja yang diusulkan untuk rental alat berat: mesin mana yang tersedia, berapa jam beroperasi, siapa operatornya, dan apa yang ditagihkan."),
    approach: l("Design the workflow first, so a build can start from agreed screens and rules.", "Rancang alur kerjanya dulu, agar pembangunan dapat dimulai dari layar dan aturan yang disepakati."),
    solution: l("A schematic workflow proposal. No rental product has been delivered.", "Usulan alur kerja skematis. Belum ada produk rental yang diserahkan."),
    features: [],
    outcome: l("A concept. Shown for discussion, not as finished work.", "Sebuah konsep. Ditampilkan untuk didiskusikan, bukan sebagai karya jadi."),
  },
];

export const workBySlug = (s: string) => work.find((w) => w.slug === s);
