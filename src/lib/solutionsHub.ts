/**
 * Solutions hub content for the internal pages.
 *
 * ACCURACY: every capability carries a status, derived from what actually exists:
 *   built    : present in an operational system LUNAR has built (hauling / logistics / ERP platform, F&B POS, demo sites)
 *   proposed : a workflow has been designed or documented, but delivered software is not claimed
 *   bespoke  : not claimed as existing; built to a client's scope
 * Client names are deliberately absent. Add a project to a page only once the client has approved it.
 */

export interface L {
  en: string;
  id: string;
}

export type CapStatus = "built" | "proposed" | "bespoke";
export type VisualKey = "custom" | "fleet" | "hauling" | "equipment" | "erp" | "web" | "ai" | "iot" | "integration";

export interface Capability {
  label: L;
  status: CapStatus;
}

export interface HubSolution {
  slug: string;
  num: string;
  visual: VisualKey;
  /** uppercase list label in the selector */
  name: L;
  /** two-line editorial headline */
  headline: [L, L];
  statement: L;
  body: L;
  problem: L;
  capabilities: Capability[];
  workflow: { title: L; detail: L }[];
  /** project slug from content.projects, if one is genuinely related */
  relatedProject?: string;
  note?: L;
  /** a real screenshot (own product, or client-approved) shown instead of a schematic */
  shot?: string;
  /** caption shown under the real screenshot */
  shotCaption?: L;
  /** LUNAR's own product, when the "related work" is that product rather than a client project */
  ownProduct?: { name: string; body: L };
}

export const statusMeta: Record<CapStatus, { label: L; hint: L }> = {
  built: {
    label: { en: "Built", id: "Sudah dibangun" },
    hint: { en: "Exists in a system LUNAR has built", id: "Ada dalam sistem yang telah dibangun LUNAR" },
  },
  proposed: {
    label: { en: "Proposed", id: "Diusulkan" },
    hint: { en: "Workflow designed; not claimed as delivered", id: "Alur kerja sudah dirancang; belum diklaim sebagai hasil kerja" },
  },
  bespoke: {
    label: { en: "Bespoke", id: "Sesuai kebutuhan" },
    hint: { en: "Built to your scope", id: "Dibangun sesuai lingkup Anda" },
  },
};

const c = (en: string, id: string, status: CapStatus): Capability => ({ label: { en, id }, status });

export const hubSolutions: HubSolution[] = [
  {
    slug: "custom-business-systems",
    num: "01",
    visual: "custom",
    name: { en: "Custom Business Systems", id: "Sistem Bisnis Kustom" },
    headline: [
      { en: "SYSTEMS SHAPED", id: "SISTEM YANG DIBENTUK" },
      { en: "BY YOUR WORKFLOW.", id: "OLEH ALUR KERJA ANDA." },
    ],
    statement: {
      en: "Software built around how your operation really runs, not a template it has to fit.",
      id: "Perangkat lunak yang dibangun di sekitar cara operasi Anda benar-benar berjalan, bukan template yang harus dipaksakan.",
    },
    body: {
      en: "Off-the-shelf software forces a business to change its habits. We start from your forms, approvals and reports, and engineer the system to match: roles, permissions, records, printouts and dashboards included.",
      id: "Perangkat lunak siap pakai memaksa bisnis mengubah kebiasaannya. Kami mulai dari formulir, persetujuan, dan laporan Anda, lalu merekayasa sistem agar sesuai: peran, hak akses, catatan, cetakan, dan dasbor.",
    },
    problem: {
      en: "Spreadsheets, chat threads and paper forms hold the real process. Nobody can see the whole picture, and every report is rebuilt by hand.",
      id: "Spreadsheet, chat, dan formulir kertas menyimpan proses yang sebenarnya. Tidak ada yang melihat gambaran utuh, dan setiap laporan dibuat ulang manual.",
    },
    capabilities: [
      c("Role-based access and permissions", "Akses dan hak berbasis peran", "built"),
      c("Activity log of who changed what", "Log aktivitas siapa mengubah apa", "built"),
      c("Print and report templates", "Template cetak dan laporan", "built"),
      c("Configurable dashboards", "Dasbor yang dapat dikonfigurasi", "built"),
      c("Data migration from spreadsheets", "Migrasi data dari spreadsheet", "bespoke"),
      c("Integrations with your existing tools", "Integrasi dengan alat yang sudah ada", "bespoke"),
    ],
    workflow: [
      { title: { en: "Observe", id: "Amati" }, detail: { en: "We follow the real process on the ground.", id: "Kami mengikuti proses nyata di lapangan." } },
      { title: { en: "Model", id: "Modelkan" }, detail: { en: "Records, roles and approvals are mapped.", id: "Catatan, peran, dan persetujuan dipetakan." } },
      { title: { en: "Build", id: "Bangun" }, detail: { en: "The first phase ships focused and working.", id: "Fase pertama dirilis fokus dan berfungsi." } },
      { title: { en: "Hand over", id: "Serah terima" }, detail: { en: "Your team is trained to run it.", id: "Tim Anda dilatih untuk menjalankannya." } },
    ],
    relatedProject: "custom-business-system",
  },
  {
    slug: "fleet-management",
    num: "02",
    visual: "fleet",
    name: { en: "Fleet & Vehicle Rental", id: "Armada & Rental Kendaraan" },
    headline: [
      { en: "EVERY VEHICLE.", id: "SETIAP KENDARAAN." },
      { en: "EVERY OPERATION. ONE SYSTEM.", id: "SETIAP OPERASI. SATU SISTEM." },
    ],
    statement: {
      en: "One platform for the vehicles you own, assign and rent out.",
      id: "Satu platform untuk kendaraan yang Anda miliki, tugaskan, dan sewakan.",
    },
    body: {
      en: "Vehicle records, drivers, fuel, repairs and documents already live together in the operations platform we have built for transport work. Rental scheduling, contracts and billing are the natural next layer, scoped to how your rental business runs.",
      id: "Data kendaraan, pengemudi, BBM, perbaikan, dan dokumen sudah terpadu dalam platform operasional yang kami bangun untuk pekerjaan transportasi. Penjadwalan sewa, kontrak, dan penagihan adalah lapisan berikutnya, disesuaikan dengan cara bisnis sewa Anda berjalan.",
    },
    problem: {
      en: "Where is each vehicle, who has it, when is the next service, and is it earning? Answers are scattered across notebooks and chat groups.",
      id: "Di mana setiap kendaraan, siapa yang memakainya, kapan servis berikutnya, dan apakah menghasilkan? Jawabannya tersebar di buku catatan dan grup chat.",
    },
    capabilities: [
      c("Vehicle master data", "Data induk kendaraan", "built"),
      c("Vehicle documents and expiry records", "Dokumen kendaraan dan masa berlaku", "built"),
      c("Driver management and assignments", "Manajemen pengemudi dan penugasan", "built"),
      c("Fuel issue and consumption records", "Catatan pengeluaran dan konsumsi BBM", "built"),
      c("Maintenance and workshop records", "Catatan perawatan dan bengkel", "built"),
      c("Operational reports", "Laporan operasional", "built"),
      c("Live fleet availability", "Ketersediaan armada langsung", "bespoke"),
      c("Rental scheduling", "Penjadwalan sewa", "bespoke"),
      c("Rental contracts", "Kontrak sewa", "bespoke"),
      c("Fleet utilisation analytics", "Analitik utilisasi armada", "bespoke"),
      c("Rental billing", "Penagihan sewa", "bespoke"),
    ],
    workflow: [
      { title: { en: "Register", id: "Daftarkan" }, detail: { en: "Vehicles and documents enter the master record.", id: "Kendaraan dan dokumen masuk ke data induk." } },
      { title: { en: "Assign", id: "Tugaskan" }, detail: { en: "Drivers and vehicles are paired per job.", id: "Pengemudi dan kendaraan dipasangkan per pekerjaan." } },
      { title: { en: "Operate", id: "Operasikan" }, detail: { en: "Fuel and repairs are logged as they happen.", id: "BBM dan perbaikan dicatat saat terjadi." } },
      { title: { en: "Review", id: "Tinjau" }, detail: { en: "Reports show cost and performance by vehicle.", id: "Laporan menunjukkan biaya dan kinerja per kendaraan." } },
    ],
    note: {
      en: "Fleet records are built in our operations platform for dump trucks. Vehicle rental is scoped per client.",
      id: "Catatan armada telah dibangun dalam platform operasional kami untuk dump truck. Rental kendaraan disesuaikan per klien.",
    },
  },
  {
    slug: "hauling-management",
    num: "03",
    visual: "hauling",
    shot: "/images/work/vpl-dashboard.webp",
    shotCaption: { en: "Real VPL screen, captured from a test environment", id: "Layar VPL asli, diambil dari lingkungan uji" },
    name: { en: "Hauling Management", id: "Manajemen Hauling" },
    headline: [
      { en: "BUILT TO MOVE", id: "DIBANGUN UNTUK" },
      { en: "OPERATIONS FORWARD.", id: "MENGGERAKKAN OPERASI." },
    ],
    statement: {
      en: "From the first trip to the monthly settlement, hauling work recorded in one place.",
      id: "Dari trip pertama hingga penyelesaian bulanan, pekerjaan hauling tercatat di satu tempat.",
    },
    body: {
      en: "Trips, trucks, drivers, routes, fuel and repairs feed the same records, so tonnage can be reconciled and costs seen before the month closes. Rates, bonuses and settlements follow the rules your contracts define.",
      id: "Trip, truk, pengemudi, rute, BBM, dan perbaikan masuk ke catatan yang sama, sehingga tonase dapat direkonsiliasi dan biaya terlihat sebelum bulan ditutup. Tarif, bonus, dan penyelesaian mengikuti aturan kontrak Anda.",
    },
    problem: {
      en: "Trip sheets arrive late, tonnage disagrees with the client, and nobody knows the real cost per route until payroll is done.",
      id: "Lembar trip terlambat, tonase berbeda dengan klien, dan tidak ada yang tahu biaya sebenarnya per rute sampai penggajian selesai.",
    },
    capabilities: [
      c("Hauling trip records with attachments", "Catatan trip hauling dengan lampiran", "built"),
      c("Dump truck and driver management", "Manajemen dump truck dan pengemudi", "built"),
      c("Route management and rate schemes", "Manajemen rute dan skema tarif", "built"),
      c("Tonnage reconciliation", "Rekonsiliasi tonase", "built"),
      c("Fuel issue records", "Catatan pengeluaran BBM", "built"),
      c("Repair and maintenance monitoring", "Pemantauan perbaikan dan perawatan", "built"),
      c("Operating cost budgets and transactions", "Anggaran dan transaksi biaya operasional", "built"),
      c("Monthly hauling settlement", "Penyelesaian hauling bulanan", "built"),
      c("Operational reports and printouts", "Laporan dan cetakan operasional", "built"),
      c("Fleet performance analytics", "Analitik kinerja armada", "bespoke"),
    ],
    workflow: [
      { title: { en: "Record trips", id: "Catat trip" }, detail: { en: "Each trip is logged with truck, driver and route.", id: "Setiap trip dicatat dengan truk, pengemudi, dan rute." } },
      { title: { en: "Reconcile", id: "Rekonsiliasi" }, detail: { en: "Tonnage is checked against delivery documents.", id: "Tonase dicocokkan dengan dokumen pengiriman." } },
      { title: { en: "Settle", id: "Selesaikan" }, detail: { en: "Rates and rules produce the monthly settlement.", id: "Tarif dan aturan menghasilkan penyelesaian bulanan." } },
      { title: { en: "Report", id: "Laporkan" }, detail: { en: "Cost and performance by route and vehicle.", id: "Biaya dan kinerja per rute dan kendaraan." } },
    ],
    note: {
      en: "These modules are built and in use in our hauling and logistics platform. Client names are shared only with approval.",
      id: "Modul-modul ini sudah dibangun dan digunakan dalam platform hauling dan logistik kami. Nama klien hanya dibagikan dengan persetujuan.",
    },
  },
  {
    slug: "heavy-equipment-rental",
    num: "04",
    visual: "equipment",
    name: { en: "Heavy Equipment Rental", id: "Rental Alat Berat" },
    headline: [
      { en: "CONTROL EVERY ASSET.", id: "KENDALIKAN SETIAP ASET." },
      { en: "MAXIMISE EVERY HOUR.", id: "MAKSIMALKAN SETIAP JAM." },
    ],
    statement: {
      en: "Rental operations designed around the machine-hour: availability, timesheets, billing.",
      id: "Operasi rental dirancang di sekitar jam mesin: ketersediaan, timesheet, penagihan.",
    },
    body: {
      en: "For companies that rent or run heavy machinery, the unit of value is the operating hour. A rental operations workflow has been designed covering equipment records, timesheets, operators and invoicing; it is a proposal, not a delivered product, and we scope the build to your fleet.",
      id: "Bagi perusahaan yang menyewakan atau mengoperasikan alat berat, satuan nilainya adalah jam operasi. Alur kerja operasi rental telah dirancang meliputi data alat, timesheet, operator, dan penagihan; ini usulan, bukan produk yang sudah diserahkan, dan pembangunannya disesuaikan dengan armada Anda.",
    },
    problem: {
      en: "Timesheets live in spreadsheets, availability is guesswork, and rental invoices are rebuilt from paper at month end.",
      id: "Timesheet ada di spreadsheet, ketersediaan hanya perkiraan, dan faktur sewa dibuat ulang dari kertas di akhir bulan.",
    },
    capabilities: [
      c("Heavy equipment inventory and categories", "Inventaris dan kategori alat berat", "proposed"),
      c("Equipment availability", "Ketersediaan alat", "proposed"),
      c("Rental bookings and contracts", "Pemesanan dan kontrak sewa", "proposed"),
      c("Operating-hour timesheets", "Timesheet jam operasi", "proposed"),
      c("Operator assignments", "Penugasan operator", "proposed"),
      c("Maintenance scheduling", "Penjadwalan perawatan", "proposed"),
      c("Rental invoices", "Faktur sewa", "proposed"),
      c("Utilisation and operating-cost analytics", "Analitik utilisasi dan biaya operasi", "bespoke"),
      c("Equipment mobilisation tracking", "Pelacakan mobilisasi alat", "bespoke"),
    ],
    workflow: [
      { title: { en: "Book", id: "Pesan" }, detail: { en: "A machine is reserved against a contract.", id: "Alat dipesan berdasarkan kontrak." } },
      { title: { en: "Operate", id: "Operasikan" }, detail: { en: "Operators log hours on the timesheet.", id: "Operator mencatat jam pada timesheet." } },
      { title: { en: "Maintain", id: "Rawat" }, detail: { en: "Service is scheduled by hours run.", id: "Servis dijadwalkan berdasarkan jam pakai." } },
      { title: { en: "Invoice", id: "Tagih" }, detail: { en: "Approved hours become the rental invoice.", id: "Jam yang disetujui menjadi faktur sewa." } },
    ],
    note: {
      en: "Status: workflow proposal. No delivered heavy-equipment rental product is claimed.",
      id: "Status: usulan alur kerja. Tidak ada klaim produk rental alat berat yang sudah diserahkan.",
    },
  },
  {
    slug: "erp",
    num: "05",
    visual: "erp",
    name: { en: "ERP & Operations", id: "ERP & Operasional" },
    headline: [
      { en: "ONE CONNECTED", id: "SATU LINGKUNGAN BISNIS" },
      { en: "BUSINESS ENVIRONMENT.", id: "YANG TERHUBUNG." },
    ],
    statement: {
      en: "Modules that share one record of the business, instead of five tools that disagree.",
      id: "Modul-modul yang berbagi satu catatan bisnis, bukan lima alat yang saling bertentangan.",
    },
    body: {
      en: "Procurement, inventory, payroll and approvals work from the same data in the platform we have built, so a purchase request becomes a receipt, a stock movement and a payable without being retyped. Modules are added to match your business, not bundled for the sake of it.",
      id: "Pengadaan, persediaan, penggajian, dan persetujuan bekerja dari data yang sama dalam platform yang kami bangun, sehingga permintaan pembelian menjadi penerimaan, pergerakan stok, dan utang tanpa diketik ulang. Modul ditambahkan sesuai bisnis Anda.",
    },
    problem: {
      en: "Purchasing, stock, HR and finance each keep their own list. Month end is a reconciliation exercise.",
      id: "Pembelian, stok, SDM, dan keuangan masing-masing memiliki daftar sendiri. Akhir bulan menjadi latihan rekonsiliasi.",
    },
    capabilities: [
      c("Procurement: requests, purchase orders, receipts", "Pengadaan: permohonan, pesanan pembelian, penerimaan", "built"),
      c("Inventory: stock, transfers, stock opname", "Persediaan: stok, transfer, stock opname", "built"),
      c("Purchase invoices and returns", "Faktur dan retur pembelian", "built"),
      c("Payroll, attendance and leave", "Penggajian, absensi, dan cuti", "built"),
      c("Operating-cost budgets", "Anggaran biaya operasional", "built"),
      c("Roles, permissions and approvers", "Peran, hak akses, dan penyetuju", "built"),
      c("Documents and attachments", "Dokumen dan lampiran", "built"),
      c("Custom reports and print templates", "Laporan kustom dan template cetak", "built"),
      c("General ledger and accounting integration", "Buku besar dan integrasi akuntansi", "bespoke"),
      c("Business analytics beyond standard reports", "Analitik bisnis di luar laporan standar", "bespoke"),
    ],
    workflow: [
      { title: { en: "Request", id: "Minta" }, detail: { en: "A department raises a purchase request.", id: "Departemen mengajukan permintaan pembelian." } },
      { title: { en: "Approve", id: "Setujui" }, detail: { en: "Approvers review and release it.", id: "Penyetuju meninjau dan merilisnya." } },
      { title: { en: "Receive", id: "Terima" }, detail: { en: "Goods arrive; stock updates itself.", id: "Barang tiba; stok diperbarui otomatis." } },
      { title: { en: "Settle", id: "Selesaikan" }, detail: { en: "The invoice and cost follow the same record.", id: "Faktur dan biaya mengikuti catatan yang sama." } },
    ],
    relatedProject: "custom-business-system",
    note: {
      en: "Procurement, inventory and payroll are built in our operations platform. Finance depth depends on the scope.",
      id: "Pengadaan, persediaan, dan penggajian telah dibangun dalam platform operasional kami. Kedalaman keuangan tergantung lingkup.",
    },
  },
  {
    slug: "insurance-policy-management",
    num: "06",
    visual: "custom",
    shot: "/images/work/insurance-dashboard.webp",
    shotCaption: { en: "Real interface, shown with fictional companies and demo data", id: "Antarmuka asli, ditampilkan dengan perusahaan dan data fiktif" },
    name: { en: "Insurance & Policy Management", id: "Asuransi & Manajemen Polis" },
    headline: [
      { en: "EVERY POLICY.", id: "SETIAP POLIS." },
      { en: "EVERY RENEWAL.", id: "SETIAP PERPANJANGAN." },
    ],
    statement: {
      en: "Policy accounts, renewals and premiums in one place, in place of the spreadsheet.",
      id: "Account polis, renewal, dan premi di satu tempat, menggantikan spreadsheet.",
    },
    body: {
      en: "A web system that replaces the Excel policy-account and renewal sheets for an insurance business. Every column of the old sheet is kept; renewals are watched by end date; premiums, customers and reports sit on the same record, with Excel import and export for the transition.",
      id: "Sistem web yang menggantikan lembar Excel account polis dan renewal untuk bisnis asuransi. Setiap kolom lembar lama dipertahankan; renewal dipantau berdasarkan tanggal berakhir; premi, nasabah, dan laporan berada pada catatan yang sama, dengan impor dan ekspor Excel untuk masa transisi.",
    },
    problem: {
      en: "Policies live in spreadsheets, renewals slip because nobody sees end dates coming, and premiums, receivables and payables are reconciled by hand.",
      id: "Polis ada di spreadsheet, renewal terlewat karena tidak ada yang melihat tanggal berakhir mendekat, dan premi, piutang, serta hutang direkonsiliasi manual.",
    },
    capabilities: [
      c("Policy account table with every column, search and sort", "Tabel account polis dengan semua kolom, pencarian, dan pengurutan", "built"),
      c("Multi-step policy entry with a premium suggestion you can always edit", "Input polis bertahap dengan saran premi yang selalu bisa diedit", "built"),
      c("Renewal queue by end date, with status and notes", "Antrean renewal berdasarkan tanggal berakhir, dengan status dan catatan", "built"),
      c("Renewal opens a linked new policy; the old one is never changed", "Renewal membuka polis baru yang terhubung; polis lama tidak pernah diubah", "built"),
      c("Customer ranking and policy history", "Peringkat nasabah dan riwayat polis", "built"),
      c("Reports by insurer and agent, receivables and payables", "Laporan per asuransi dan agen, piutang dan hutang", "built"),
      c("Premium calculators for motor and property", "Kalkulator premi untuk kendaraan dan properti", "built"),
      c("Excel import and export", "Impor dan ekspor Excel", "built"),
      c("Role-based access and an activity log", "Akses berbasis peran dan log aktivitas", "built"),
    ],
    workflow: [
      { title: { en: "Record", id: "Catat" }, detail: { en: "The policy enters the account, with its premium.", id: "Polis masuk ke account, beserta premi." } },
      { title: { en: "Watch", id: "Pantau" }, detail: { en: "The end date puts it in the renewal queue.", id: "Tanggal berakhir memasukkannya ke antrean renewal." } },
      { title: { en: "Renew", id: "Perpanjang" }, detail: { en: "A linked new policy is opened from the old one.", id: "Polis baru yang terhubung dibuka dari polis lama." } },
      { title: { en: "Report", id: "Laporkan" }, detail: { en: "Premiums and balances by insurer, agent and month.", id: "Premi dan saldo per asuransi, agen, dan bulan." } },
    ],
    note: {
      en: "Client work, name withheld. The interface is real; every customer, insurer, agent and the company name shown here are fictional.",
      id: "Karya klien, nama dirahasiakan. Antarmukanya asli; seluruh nasabah, asuransi, agen, dan nama perusahaan yang ditampilkan di sini fiktif.",
    },
  },
  {
    slug: "fnb-hospitality",
    num: "07",
    visual: "custom",
    shot: "/images/work/hidang-pos.webp",
    shotCaption: { en: "Real Hidang screen, shown with built-in demo data", id: "Layar Hidang asli, dengan data demo bawaan" },
    name: { en: "F&B & Hospitality Systems", id: "Sistem F&B & Perhotelan" },
    headline: [
      { en: "FROM THE TABLE", id: "DARI MEJA" },
      { en: "TO THE KITCHEN.", id: "KE DAPUR." },
    ],
    statement: {
      en: "One system for the counter, the floor, the kitchen and the back office.",
      id: "Satu sistem untuk kasir, lantai, dapur, dan back office.",
    },
    body: {
      en: "Hidang, our own F&B product, puts a touch-first cashier POS, a live orders board, a floor plan, a kitchen display and a back office on one record, so a sale reaches the kitchen, the stock and the report without being retyped. The screens shown here are real, with the app's built-in demo data.",
      id: "Hidang, produk F&B kami sendiri, menyatukan POS kasir layar sentuh, papan pesanan langsung, denah meja, layar dapur, dan back office dalam satu catatan, sehingga penjualan sampai ke dapur, stok, dan laporan tanpa diketik ulang. Layar yang ditampilkan di sini asli, dengan data demo bawaan aplikasi.",
    },
    problem: {
      en: "Orders reach the kitchen late, stock is guessed at the end of the week, and nobody is sure which menu items really earn money.",
      id: "Pesanan terlambat sampai ke dapur, stok diperkirakan di akhir pekan, dan tidak ada yang yakin menu mana yang benar-benar menghasilkan uang.",
    },
    capabilities: [
      c("Touch-first cashier POS with modifiers and discounts", "POS kasir layar sentuh dengan opsi dan diskon", "built"),
      c("Orders board and live floor plan", "Papan pesanan dan denah meja langsung", "built"),
      c("Kitchen display with station routing", "Layar dapur dengan pengarahan ke stasiun", "built"),
      c("Stock deducted by recipe when an order is paid", "Stok berkurang berdasarkan resep saat pesanan dibayar", "built"),
      c("Menu costing and margins from recipes", "Biaya menu dan margin dari resep", "built"),
      c("Customers and loyalty", "Pelanggan dan loyalitas", "built"),
      c("Staff, attendance and shifts", "Staf, absensi, dan shift", "built"),
      c("Reports with CSV export", "Laporan dengan ekspor CSV", "built"),
      c("Offline mode for cash sales, synced once", "Mode offline untuk penjualan tunai, disinkronkan sekali", "built"),
      c("Online payment provider connection (QRIS, e-wallet)", "Koneksi penyedia pembayaran online (QRIS, e-wallet)", "bespoke"),
    ],
    workflow: [
      { title: { en: "Take the order", id: "Ambil pesanan" }, detail: { en: "At the counter, the table or online.", id: "Di kasir, di meja, atau online." } },
      { title: { en: "Send to the kitchen", id: "Kirim ke dapur" }, detail: { en: "Tickets route to the right station.", id: "Tiket diarahkan ke stasiun yang tepat." } },
      { title: { en: "Pay and deduct stock", id: "Bayar dan kurangi stok" }, detail: { en: "Ingredients are deducted by recipe.", id: "Bahan dikurangi berdasarkan resep." } },
      { title: { en: "Report", id: "Laporkan" }, detail: { en: "Sales, costs and margins from one record.", id: "Penjualan, biaya, dan margin dari satu catatan." } },
    ],
    ownProduct: {
      name: "Hidang",
      body: {
        en: "LUNAR's own F&B product, built and run by us. Shown with its real screens and built-in demo data, not client data.",
        id: "Produk F&B milik LUNAR sendiri, dibangun dan dijalankan oleh kami. Ditampilkan dengan layar aslinya dan data demo bawaan, bukan data klien.",
      },
    },
    note: {
      en: "Payments are never faked: cash is confirmed by the cashier, and card or transfer is recorded with a staff-entered reference unless a provider is connected.",
      id: "Pembayaran tidak pernah dipalsukan: tunai dikonfirmasi kasir, dan kartu atau transfer dicatat dengan referensi yang dimasukkan staf kecuali penyedia pembayaran terhubung.",
    },
  },
  {
    slug: "websites-platforms",
    num: "08",
    visual: "web",
    name: { en: "Websites & Platforms", id: "Website & Platform" },
    headline: [
      { en: "A PRESENCE AS CAPABLE", id: "KEHADIRAN YANG SEHANDAL" },
      { en: "AS THE BUSINESS.", id: "SEPERTI BISNISNYA." },
    ],
    statement: {
      en: "Fast, credible sites and customer-facing platforms with clear enquiry paths.",
      id: "Situs yang cepat dan kredibel serta platform untuk pelanggan dengan jalur pertanyaan yang jelas.",
    },
    body: {
      en: "From company sites to portals and booking flows, we build the public face of your operation and connect it to the systems behind it.",
      id: "Dari situs perusahaan hingga portal dan alur pemesanan, kami membangun wajah publik operasi Anda dan menghubungkannya dengan sistem di belakangnya.",
    },
    problem: {
      en: "The website understates the business, loads slowly on phones, and leads go nowhere.",
      id: "Website meremehkan bisnis, lambat di ponsel, dan prospek tidak ke mana-mana.",
    },
    capabilities: [
      c("Responsive company websites", "Website perusahaan responsif", "built"),
      c("Lead capture and enquiry routing", "Penangkapan prospek dan pengarahan pertanyaan", "built"),
      c("Bilingual content (EN / ID)", "Konten dwibahasa (EN / ID)", "built"),
      c("Customer and partner portals", "Portal pelanggan dan mitra", "bespoke"),
      c("Booking and ordering flows", "Alur pemesanan", "bespoke"),
    ],
    workflow: [
      { title: { en: "Position", id: "Posisikan" }, detail: { en: "Define what the business must be known for.", id: "Tentukan apa yang harus dikenal dari bisnis." } },
      { title: { en: "Design", id: "Rancang" }, detail: { en: "Structure and visual direction agreed.", id: "Struktur dan arah visual disepakati." } },
      { title: { en: "Build", id: "Bangun" }, detail: { en: "Fast, accessible and measurable.", id: "Cepat, mudah diakses, dan terukur." } },
      { title: { en: "Launch", id: "Luncurkan" }, detail: { en: "Go live with handover and support.", id: "Tayang dengan serah terima dan dukungan." } },
    ],
    relatedProject: "company-website-build",
  },
  {
    slug: "ai-automation",
    num: "09",
    visual: "ai",
    name: { en: "AI & Automation", id: "AI & Otomasi" },
    headline: [
      { en: "LET THE SYSTEM", id: "BIARKAN SISTEM" },
      { en: "DO THE REPEATING.", id: "MENGERJAKAN PENGULANGAN." },
    ],
    statement: {
      en: "Automation that removes retyping and chasing, applied where it is safe and measurable.",
      id: "Otomasi yang menghilangkan pengetikan ulang dan pengejaran, diterapkan di tempat yang aman dan terukur.",
    },
    body: {
      en: "We automate the steady, rule-based work first: intake, routing, notifications, approvals. Where AI genuinely helps, such as reading documents, it is added with a human check, and scoped to your data.",
      id: "Kami mengotomasi pekerjaan rutin berbasis aturan terlebih dahulu: penerimaan, pengarahan, notifikasi, persetujuan. Bila AI benar-benar membantu, seperti membaca dokumen, ditambahkan dengan pemeriksaan manusia dan disesuaikan dengan data Anda.",
    },
    problem: {
      en: "Staff retype the same data between systems and chase approvals by message.",
      id: "Staf mengetik ulang data yang sama antar sistem dan mengejar persetujuan lewat pesan.",
    },
    capabilities: [
      c("Document and receipt intake (OCR, when configured)", "Penerimaan dokumen dan struk (OCR, bila dikonfigurasi)", "built"),
      c("Automated notifications", "Notifikasi otomatis", "built"),
      c("Rule-based approvals and routing", "Persetujuan dan pengarahan berbasis aturan", "bespoke"),
      c("AI-assisted reporting", "Pelaporan berbantuan AI", "bespoke"),
      c("Assistants over your own data", "Asisten atas data Anda sendiri", "bespoke"),
    ],
    workflow: [
      { title: { en: "Find", id: "Temukan" }, detail: { en: "Identify the repeated, rule-based work.", id: "Identifikasi pekerjaan berulang berbasis aturan." } },
      { title: { en: "Automate", id: "Otomasi" }, detail: { en: "Build the flow with a clear fallback.", id: "Bangun alur dengan cadangan yang jelas." } },
      { title: { en: "Check", id: "Periksa" }, detail: { en: "Humans review what matters.", id: "Manusia meninjau yang penting." } },
      { title: { en: "Measure", id: "Ukur" }, detail: { en: "Time saved is tracked.", id: "Waktu yang dihemat dilacak." } },
    ],
  },
  {
    slug: "iot-integration",
    num: "10",
    visual: "iot",
    name: { en: "IoT & Integration", id: "IoT & Integrasi" },
    headline: [
      { en: "SEE THE FLOOR.", id: "LIHAT LAPANGAN." },
      { en: "CONNECT THE SYSTEMS.", id: "HUBUNGKAN SISTEMNYA." },
    ],
    statement: {
      en: "Sensors, dashboards and alerts that connect physical operations to the systems that manage them.",
      id: "Sensor, dasbor, dan peringatan yang menghubungkan operasi fisik dengan sistem yang mengelolanya.",
    },
    body: {
      en: "Monitoring for farms, factories and facilities, and the integration work that lets those readings reach the rest of your software. This work is in progress and is scoped to each site.",
      id: "Pemantauan untuk pertanian, pabrik, dan fasilitas, serta pekerjaan integrasi agar pembacaan tersebut sampai ke perangkat lunak lain. Pekerjaan ini sedang berjalan dan disesuaikan dengan setiap lokasi.",
    },
    problem: {
      en: "Tanks, pumps and cold rooms are checked when someone remembers, and problems are found after the loss.",
      id: "Tangki, pompa, dan ruang pendingin diperiksa saat ada yang ingat, dan masalah ditemukan setelah kerugian.",
    },
    capabilities: [
      c("Sensor readings and live dashboards", "Pembacaan sensor dan dasbor langsung", "proposed"),
      c("Threshold alerts", "Peringatan ambang batas", "proposed"),
      c("Logged history and reports", "Riwayat dan laporan tercatat", "proposed"),
      c("Integration with your existing systems", "Integrasi dengan sistem yang sudah ada", "bespoke"),
    ],
    workflow: [
      { title: { en: "Sense", id: "Rasakan" }, detail: { en: "Readings are captured at the source.", id: "Pembacaan diambil di sumbernya." } },
      { title: { en: "Log", id: "Catat" }, detail: { en: "Values are stored with time and place.", id: "Nilai disimpan dengan waktu dan tempat." } },
      { title: { en: "Alert", id: "Beri peringatan" }, detail: { en: "The right person is told in time.", id: "Orang yang tepat diberi tahu tepat waktu." } },
      { title: { en: "Connect", id: "Hubungkan" }, detail: { en: "Data flows on to other systems.", id: "Data mengalir ke sistem lain." } },
    ],
    note: {
      en: "Status: in progress. No delivered monitoring deployment is claimed.",
      id: "Status: sedang berjalan. Tidak ada klaim penerapan pemantauan yang sudah diserahkan.",
    },
  },
];

export const hubBySlug = (slug: string) => hubSolutions.find((s) => s.slug === slug);

/** The six capability areas shown as the overview on the Solutions page. */
export const overviewAreas: { num: string; name: L; slug: string }[] = [
  { num: "01", name: { en: "Custom Business Systems", id: "Sistem Bisnis Kustom" }, slug: "custom-business-systems" },
  { num: "02", name: { en: "Website & Digital Platforms", id: "Website & Platform Digital" }, slug: "websites-platforms" },
  { num: "03", name: { en: "ERP & Operational Management", id: "ERP & Manajemen Operasional" }, slug: "erp" },
  { num: "04", name: { en: "AI & Business Automation", id: "AI & Otomasi Bisnis" }, slug: "ai-automation" },
  { num: "05", name: { en: "IoT & Monitoring", id: "IoT & Pemantauan" }, slug: "iot-integration" },
  { num: "06", name: { en: "System Integration", id: "Integrasi Sistem" }, slug: "iot-integration" },
  { num: "07", name: { en: "F&B & Hospitality Systems", id: "Sistem F&B & Perhotelan" }, slug: "fnb-hospitality" },
  { num: "08", name: { en: "Insurance & Policy Management", id: "Asuransi & Manajemen Polis" }, slug: "insurance-policy-management" },
];
