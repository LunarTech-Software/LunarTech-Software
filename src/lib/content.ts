import type { Differentiator, Localized, NavLink, ProcessStep, Project, Solution } from "@/types/content";

// All copy sourced verbatim from a live crawl of bylunartech.com (EN + ID toggle) on 2026-08-21.
// Do not invent taglines, stats, prices, clients, or testimonials — see docs/research/LUNARTECH_CONTENT_AUDIT.md.

export const contact = {
  whatsappNumber: "62819880388",
  whatsapp: (text: string) => `https://wa.me/62819880388?text=${encodeURIComponent(text)}`,
  email: "by.lunartech@gmail.com",
  mailto: "mailto:by.lunartech@gmail.com",
  location: "Indonesia",
};

export const tagline = "The Orbit of Intelligent Operations";

export const navLinks: NavLink[] = [
  { label: { en: "Position", id: "Posisi" }, href: "/#position" },
  { label: { en: "Solutions", id: "Solusi" }, href: "/#solutions" },
  { label: { en: "Our Work", id: "Karya Kami" }, href: "/our-work" },
  { label: { en: "Process", id: "Proses" }, href: "/#process" },
  { label: { en: "Contact", id: "Kontak" }, href: "/contact" },
];

export const hero = {
  kicker: { en: "Digital Engineering & Automation", id: "Rekayasa Digital & Otomasi" },
  headline: {
    en: "Enter the orbit of intelligent operations.",
    id: "Masuki orbit operasi yang cerdas.",
  },
  subhead: {
    en: "LUNAR builds custom websites, business systems, automation, and IoT monitoring — engineered around how your operation actually works.",
    id: "LUNAR membangun website kustom, sistem bisnis, otomasi, dan monitoring IoT — dirancang sesuai cara kerja operasi Anda yang sesungguhnya.",
  },
  serviceOptions: [
    { en: "Website", id: "Website" },
    { en: "Business System", id: "Sistem Bisnis" },
    { en: "Automation / IoT", id: "Otomasi / IoT" },
    { en: "Farm / Plantation", id: "Pertanian / Perkebunan" },
    { en: "Factory / Facility", id: "Pabrik / Fasilitas" },
    { en: "Education / STEM", id: "Pendidikan / STEM" },
    { en: "Service Sector", id: "Sektor Jasa" },
    { en: "Other", id: "Lainnya" },
  ],
};

export const credibility = {
  lead: { en: "Engineering digital systems for real-world operations —", id: "Merekayasa sistem digital untuk operasi dunia nyata —" },
  highlight: { en: "not templates.", id: "bukan template." },
};

export const position = {
  kicker: { en: "Position", id: "Posisi" },
  heading: {
    en: "Most operations are still run on hope.",
    id: "Sebagian besar operasi masih berjalan mengandalkan harapan.",
  },
  body: {
    en: "Stock is guessed, not counted. Tanks are checked when someone remembers. Reports get built by hand, after the fact, once it's too late to act on them.",
    id: "Stok diperkirakan, bukan dihitung. Tangki diperiksa hanya jika ada yang ingat. Laporan dibuat manual, belakangan, setelah terlambat untuk ditindaklanjuti.",
  },
  highlight: {
    en: "LUNAR replaces the guessing with systems that watch, log, and alert.",
    id: "LUNAR menggantikan tebakan dengan sistem yang memantau, mencatat, dan memberi notifikasi.",
  },
};

export const solutions: Solution[] = [
  {
    slug: "web-digital-presence",
    name: { en: "Web & Digital Presence", id: "Website & Kehadiran Digital" },
    promise: { en: "Look credible. Be found. Convert.", id: "Terlihat kredibel. Ditemukan. Konversi." },
    description: {
      en: "Professional websites and digital foundations that look as capable as the business really is.",
      id: "Website profesional dan fondasi digital yang mencerminkan kapasitas bisnis Anda yang sesungguhnya.",
    },
    whoFor: {
      en: "SMEs, professional services, and institutions that need a serious online presence.",
      id: "UKM, jasa profesional, dan institusi yang membutuhkan kehadiran online yang serius.",
    },
    problems: {
      en: ["Outdated or no website", "Poor search visibility", "No clear way for customers to enquire", "A brand that looks smaller than the business really is"],
      id: ["Website ketinggalan zaman atau belum ada", "Visibilitas pencarian yang rendah", "Tidak ada cara jelas bagi pelanggan untuk bertanya", "Brand yang terlihat lebih kecil dari bisnis sesungguhnya"],
    },
    whatWeBuild: {
      en: ["Responsive websites", "Content management", "Lead-capture forms", "Catalogue integration", "SEO fundamentals", "Analytics"],
      id: ["Website responsif", "Manajemen konten", "Formulir lead-capture", "Integrasi katalog", "Dasar-dasar SEO", "Analitik"],
    },
  },
  {
    slug: "business-systems",
    name: { en: "Custom Business Systems", id: "Sistem Bisnis Kustom" },
    promise: { en: "Software that fits how you actually work.", id: "Software yang sesuai cara kerja Anda." },
    description: {
      en: "Custom software shaped to a specific operation — including the dashboards and reports you need to run it.",
      id: "Perangkat lunak kustom yang dibentuk sesuai operasi spesifik — termasuk dasbor dan laporan yang Anda butuhkan.",
    },
    whoFor: {
      en: "Distributors, workshops, and SMEs that are starting to be overwhelmed by spreadsheets.",
      id: "Distributor, bengkel, dan UKM yang mulai kewalahan dengan spreadsheet.",
    },
    problems: {
      en: ["Data re-entered across multiple files", "Version chaos", "No single source of truth", "Manual processes that can't scale", "No real-time visibility into the numbers"],
      id: ["Data dimasukkan ulang di banyak file", "Kekacauan versi", "Tidak ada satu sumber data yang akurat", "Proses manual yang tidak dapat berkembang", "Tidak ada visibilitas real-time terhadap angka"],
    },
    whatWeBuild: {
      en: ["Inventory and stock control", "Records and workflows", "Roles, approvals, and admin panels", "KPI dashboards and analytics views", "Exports and scheduled reports (incl. PDF)", "Finance, tax, and operations summaries", "Integrations with tools you already use"],
      id: ["Kontrol inventaris dan stok", "Catatan dan alur kerja", "Peran, persetujuan, dan panel admin", "Dasbor KPI dan tampilan analitik", "Ekspor dan laporan terjadwal (termasuk PDF)", "Ringkasan keuangan, pajak, dan operasional", "Integrasi dengan tools yang sudah Anda gunakan"],
    },
  },
  {
    slug: "automation-iot-monitoring",
    name: { en: "Automation & IoT Monitoring", id: "Otomasi & Monitoring IoT" },
    promise: { en: "Catch problems before they cost you.", id: "Tangkap masalah sebelum merugikan Anda." },
    description: {
      en: "Sensors, automation, and monitoring that catch problems before they become losses.",
      id: "Sensor, otomasi, dan monitoring yang menangkap masalah sebelum menjadi kerugian.",
    },
    whoFor: {
      en: "Factories, cold storage, and facilities that depend on stable conditions.",
      id: "Pabrik, cold storage, dan fasilitas yang bergantung pada kondisi yang stabil.",
    },
    problems: {
      en: ["Manual checks and logs", "Problems discovered too late", "Repetitive tasks eating staff time", "No record of what happened", "No visibility into the site when nobody's there"],
      id: ["Pengecekan dan pencatatan manual", "Masalah baru diketahui setelah terlambat", "Tugas berulang yang menyita waktu staf", "Tidak ada catatan kejadian", "Tidak ada visibilitas lokasi saat tidak ada orang"],
    },
    whatWeBuild: {
      en: ["Real-time sensor feeds", "Threshold alerts (SMS / WhatsApp / email)", "Automated tasks and routines", "CCTV and camera monitoring integration", "Event logs and history", "Escalation rules"],
      id: ["Feed sensor real-time", "Notifikasi ambang batas (SMS / WhatsApp / email)", "Tugas dan rutinitas otomatis", "Integrasi monitoring CCTV dan kamera", "Log dan riwayat kejadian", "Aturan eskalasi"],
    },
  },
  {
    slug: "agriculture-plantation-monitoring",
    name: { en: "Agriculture & Plantation Monitoring", id: "Monitoring Pertanian & Perkebunan" },
    promise: { en: "Field-level visibility, from anywhere.", id: "Visibilitas tingkat lapangan, dari mana saja." },
    description: {
      en: "Field-level visibility for farms and plantations, from anywhere.",
      id: "Visibilitas tingkat lapangan untuk pertanian dan perkebunan, dari mana saja.",
    },
    whoFor: {
      en: "Farms, plantations, and estates managing land and assets at scale.",
      id: "Pertanian, perkebunan, dan estate yang mengelola lahan dan aset dalam skala besar.",
    },
    problems: {
      en: ["Conditions checked on foot", "Problems detected too late", "Scattered records", "Hard to see the whole estate at once"],
      id: ["Kondisi diperiksa dengan berjalan kaki", "Masalah baru terdeteksi setelah terlambat", "Catatan yang tersebar", "Sulit melihat keseluruhan estate sekaligus"],
    },
    whatWeBuild: {
      en: ["Environmental sensors", "Field / estate mapping", "Status dashboards", "Alerts", "Harvest and activity records"],
      id: ["Sensor lingkungan", "Pemetaan lahan / estate", "Dasbor status", "Notifikasi", "Catatan hasil panen dan aktivitas"],
    },
  },
  {
    slug: "factory-facility-monitoring",
    name: { en: "Factory & Facility Monitoring", id: "Monitoring Pabrik & Fasilitas" },
    promise: { en: "Real-time visibility across the floor.", id: "Visibilitas real-time di seluruh lantai." },
    description: {
      en: "Real-time visibility across the factory floor and facility conditions.",
      id: "Visibilitas real-time di seluruh lantai pabrik dan kondisi fasilitas.",
    },
    whoFor: {
      en: "Manufacturers, cold storage operators, and facility managers.",
      id: "Manufaktur, operator cold storage, dan manajer fasilitas.",
    },
    problems: {
      en: ["Unexpected downtime", "Cold-chain risk", "Manual inspection rounds", "No early warning", "Fragmented equipment data", "Limited facility security visibility"],
      id: ["Downtime yang tidak terduga", "Risiko rantai dingin", "Ronde pemeriksaan manual", "Tidak ada peringatan dini", "Data peralatan yang terpecah-pecah", "Visibilitas keamanan lokasi yang terbatas"],
    },
    whatWeBuild: {
      en: ["Equipment and temperature monitoring", "Downtime alerts", "Real-time floor status", "CCTV and access monitoring integration", "Reporting", "Maintenance history"],
      id: ["Monitoring peralatan dan suhu", "Notifikasi downtime", "Status lantai produksi real-time", "Integrasi monitoring CCTV dan akses", "Pelaporan", "Riwayat perawatan"],
    },
  },
  {
    slug: "education-stem-solutions",
    name: { en: "Education & STEM Solutions", id: "Solusi Pendidikan & STEM" },
    promise: { en: "Turn theory into things students can build.", id: "Ubah teori menjadi karya nyata siswa." },
    description: {
      en: "Digital portals and applied STEM platforms for schools and institutions.",
      id: "Portal digital dan platform STEM terapan untuk sekolah dan institusi.",
    },
    whoFor: {
      en: "Schools, polytechnics, and institutions building industry-standard, hands-on labs.",
      id: "Sekolah, politeknik, dan institusi yang membangun laboratorium nyata sesuai standar industri.",
    },
    problems: {
      en: ["AI / robotics taught only through slides", "Fragmented DIY kits", "Outdated lab equipment", "The gap between theory and verified, hands-on skill"],
      id: ["AI / robotika hanya diajarkan lewat slide", "Kit DIY yang terpecah-pecah", "Perangkat laboratorium yang ketinggalan zaman", "Kesenjangan antara teori dan keterampilan praktis yang terverifikasi"],
    },
    whatWeBuild: {
      en: ["Learning portals", "Monitoring dashboards", "Applied STEM curricula", "Milestone-based learning tracks"],
      id: ["Portal pembelajaran", "Dasbor monitoring", "Kurikulum STEM terapan", "Jalur pembelajaran berbasis milestone"],
    },
  },
  {
    slug: "service-sector-systems",
    name: { en: "Service Sector Digital Systems", id: "Sistem Digital Sektor Jasa" },
    promise: { en: "Run bookings, jobs, and clients from one place.", id: "Kelola booking, pekerjaan, dan klien dari satu tempat." },
    description: {
      en: "Booking, scheduling, and client management systems for service-based businesses.",
      id: "Sistem booking, penjadwalan, dan manajemen klien untuk bisnis berbasis jasa.",
    },
    whoFor: {
      en: "Clinics, salons, contractors, and other operational service businesses.",
      id: "Klinik, salon, kontraktor, dan bisnis jasa operasional lainnya.",
    },
    problems: {
      en: ["Bookings tracked by phone or paper", "Double-bookings and missed appointments", "No client or job history on record", "No facility/site monitoring visibility where relevant"],
      id: ["Booking dicatat lewat telepon atau kertas", "Booking ganda dan janji temu terlewat", "Tidak ada catatan riwayat klien atau pekerjaan", "Tidak ada visibilitas monitoring lokasi/fasilitas bila relevan"],
    },
    whatWeBuild: {
      en: ["Booking and scheduling systems", "Client and job records", "Staff and resource management", "Facility and CCTV monitoring integration where relevant", "Reminders and notifications"],
      id: ["Sistem booking dan penjadwalan", "Catatan klien dan pekerjaan", "Manajemen staf dan sumber daya", "Integrasi monitoring fasilitas dan CCTV bila relevan", "Pengingat dan notifikasi"],
    },
  },
];

export const industries: Localized[] = [
  { en: "SMEs", id: "UKM" },
  { en: "Factories", id: "Pabrik" },
  { en: "Farms", id: "Pertanian" },
  { en: "Plantations", id: "Perkebunan" },
  { en: "Schools", id: "Sekolah" },
  { en: "Institutions", id: "Institusi" },
  { en: "Workshops", id: "Bengkel" },
  { en: "F&B Businesses", id: "Bisnis F&B" },
  { en: "Cold Storage", id: "Cold Storage" },
  { en: "Distributors", id: "Distributor" },
  { en: "Professional Services", id: "Jasa Profesional" },
  { en: "Clinics & Salons", id: "Klinik & Salon" },
  { en: "Contractors", id: "Kontraktor" },
];

export const automationPanel = {
  kicker: { en: "Automation & IoT", id: "Otomasi & IoT" },
  heading: { en: "Monitoring that prevents costly problems.", id: "Monitoring yang mencegah masalah berbiaya besar." },
  body: {
    en: "LUNAR connects sensors, dashboards, and alerts so farms, factories, cold storage, and facilities can see problems before they become losses.",
    id: "LUNAR menghubungkan sensor, dasbor, dan notifikasi sehingga pertanian, pabrik, cold storage, dan fasilitas dapat melihat masalah sebelum menjadi kerugian.",
  },
  readouts: [
    { value: "3.4°C", label: { en: "Cold storage", id: "Cold storage" }, status: { en: "within range", id: "dalam batas normal" } },
    { value: "99.1%", label: { en: "Line 2 uptime", id: "Uptime Line 2" }, status: { en: "nominal", id: "normal" } },
    { value: "41%", label: { en: "Field moisture", id: "Kelembapan lahan" }, status: { en: "trending dry", id: "cenderung kering" } },
    { value: "High", label: { en: "Pump vibration", id: "Getaran pompa" }, status: { en: "inspect today", id: "periksa hari ini" } },
  ],
};

export const dashboardPanel = {
  kicker: { en: "Dashboards & Reporting", id: "Dasbor & Pelaporan" },
  heading: { en: "See your whole operation in real time.", id: "Lihat seluruh operasi Anda secara real-time." },
  body: {
    en: "Live figures replace manual checking and scattered files. KPIs, alerts, and status — clean, uncluttered, and always current.",
    id: "Angka real-time menggantikan pengecekan manual dan file yang tersebar. KPI, notifikasi, dan status — rapi, jelas, dan selalu terkini.",
  },
  mockLabel: { en: "Operations · Live (mockup)", id: "Operasi · Live (mockup)" },
  kpis: [
    { label: { en: "Output today", id: "Output hari ini" }, value: "1,284", delta: "+6.2%" },
    { label: { en: "On-time", id: "Tepat waktu" }, value: "97.4%", delta: "+1.1%" },
    { label: { en: "Downtime", id: "Downtime" }, value: "22m", delta: "-14%" },
  ],
  statuses: [
    { label: { en: "Cold storage A", id: "Cold storage A" }, status: { en: "in range", id: "dalam batas normal" } },
    { label: { en: "Line 2 · packaging", id: "Line 2 · pengemasan" }, status: { en: "running", id: "berjalan" } },
    { label: { en: "Sensor · warehouse 4", id: "Sensor · gudang 4" }, status: { en: "check required", id: "perlu diperiksa" } },
  ],
};

export const differentiators: Differentiator[] = [
  {
    title: { en: "Built around real operations", id: "Dibangun dari operasi nyata" },
    body: { en: "Systems designed from the actual workflow, not a template.", id: "Sistem dirancang dari alur kerja sesungguhnya, bukan template." },
  },
  {
    title: { en: "Engineering discipline + modern software", id: "Disiplin engineering + software modern" },
    body: { en: "The reliability of engineering with the speed of modern tooling.", id: "Keandalan engineering dengan kecepatan tooling modern." },
  },
  {
    title: { en: "Full span", id: "Cakupan menyeluruh" },
    body: {
      en: "Websites, systems, automation, IoT, and facility monitoring under one partner.",
      id: "Website, sistem, otomasi, IoT, dan monitoring fasilitas dalam satu mitra.",
    },
  },
  {
    title: { en: "Understand-first process", id: "Proses berbasis pemahaman" },
    body: { en: "LUNAR learns the operation before building anything.", id: "LUNAR memahami operasi Anda sebelum membangun apa pun." },
  },
  {
    title: { en: "Honest and scoped", id: "Jujur dan terukur" },
    body: {
      en: "Demos vs. delivered work are always clearly labelled; every project is scoped to the client.",
      id: "Demo vs. hasil kerja nyata selalu diberi label jelas; setiap proyek disesuaikan dengan klien.",
    },
  },
];

export const projects: Project[] = [
  {
    slug: "company-website-build",
    category: { en: "Web & Digital Presence", id: "Website & Kehadiran Digital" },
    label: "Demo",
    title: { en: "Company Website Build", id: "Pembuatan Website Perusahaan" },
    description: {
      en: "A professional, responsive site with lead capture and clear enquiry paths.",
      id: "Website profesional dan responsif dengan lead capture dan jalur pertanyaan yang jelas.",
    },
    liveUrl: "https://lumaradesign.netlify.app/",
  },
  {
    slug: "custom-business-system",
    category: { en: "Business System", id: "Sistem Bisnis" },
    label: "Demo",
    title: { en: "Custom Business System", id: "Sistem Bisnis Kustom" },
    description: {
      en: "A live inventory and records system with real-time dashboards and low-stock alerts.",
      id: "Sistem inventaris dan catatan real-time dengan dasbor langsung dan notifikasi stok rendah.",
    },
    liveUrl: "https://baja-makmur-erp.onrender.com/",
  },
  {
    slug: "automation-iot-wip",
    category: { en: "Automation & IoT", id: "Otomasi & IoT" },
    label: "In Progress",
    title: { en: "Automation & IoT Monitoring", id: "Otomasi & Monitoring IoT" },
    description: {
      en: "We're currently building our first sensor and automation monitoring prototype.",
      id: "Kami sedang membangun prototipe monitoring sensor dan otomasi pertama kami.",
    },
  },
  {
    slug: "agriculture-wip",
    category: { en: "Agriculture", id: "Pertanian" },
    label: "In Progress",
    title: { en: "Agriculture & Plantation Monitoring", id: "Monitoring Pertanian & Perkebunan" },
    description: {
      en: "We're currently building our first field and estate monitoring prototype.",
      id: "Kami sedang membangun prototipe monitoring lapangan dan perkebunan pertama kami.",
    },
  },
  {
    slug: "factory-wip",
    category: { en: "Factory", id: "Pabrik" },
    label: "In Progress",
    title: { en: "Factory & Facility Monitoring", id: "Monitoring Pabrik & Fasilitas" },
    description: {
      en: "We're currently building our first factory and facility monitoring prototype.",
      id: "Kami sedang membangun prototipe monitoring pabrik dan fasilitas pertama kami.",
    },
  },
  {
    slug: "education-wip",
    category: { en: "Education", id: "Pendidikan" },
    label: "In Progress",
    title: { en: "Education & STEM Solutions", id: "Solusi Pendidikan & STEM" },
    description: {
      en: "We're currently building our first learning-portal and applied STEM prototype.",
      id: "Kami sedang membangun prototipe portal belajar dan STEM terapan pertama kami.",
    },
  },
  {
    slug: "service-sector-wip",
    category: { en: "Service Sector", id: "Sektor Jasa" },
    label: "In Progress",
    title: { en: "Service Sector Digital Systems", id: "Sistem Digital Sektor Jasa" },
    description: {
      en: "We're currently building our first booking and client-management prototype.",
      id: "Kami sedang membangun prototipe booking dan manajemen klien pertama kami.",
    },
  },
];

export const solutionDetailCopy = {
  whoFor: { en: "Who it's for", id: "Untuk siapa" },
  problems: { en: "Problems solved", id: "Masalah yang diselesaikan" },
  whatWeBuild: { en: "What we build", id: "Apa yang kami bangun" },
  exploreOther: { en: "Explore other solutions", id: "Jelajahi solusi lainnya" },
  allSolutions: { en: "All solutions", id: "Semua solusi" },
  ctaHeading: { en: "Discuss your project.", id: "Diskusikan proyek Anda." },
  ctaBody: {
    en: "Every project starts with understanding your operation. Let's map it out.",
    id: "Setiap proyek dimulai dengan memahami operasi Anda. Mari kita petakan.",
  },
};

export const ourWorkPage = {
  kicker: { en: "Selected work", id: "Karya terpilih" },
  heading: { en: "Systems, prototypes & working concepts.", id: "Sistem, prototipe & konsep yang berfungsi." },
  subhead: {
    en: "Proof we build real, working systems — not just talk.",
    id: "Bukti bahwa kami membangun sistem nyata yang berfungsi — bukan sekadar kata-kata.",
  },
  honesty: {
    en: "Demo, prototype, and in-progress work is clearly labelled and never presented as client delivery. Real, scoped client systems are shared on request as they're delivered.",
    id: "Karya demo, prototipe, dan yang sedang dikerjakan diberi label jelas dan tidak pernah disajikan sebagai hasil kerja klien. Sistem klien nyata dibagikan atas permintaan seiring pengiriman.",
  },
  ctaHeading: { en: "Discuss a similar project.", id: "Diskusikan proyek serupa." },
  ctaBody: {
    en: "Tell us what you're trying to see or control, and we'll scope it around your operation.",
    id: "Ceritakan apa yang ingin Anda lihat atau kendalikan, dan kami akan menyusun rencananya sesuai operasi Anda.",
  },
};

export const processSteps: ProcessStep[] = [
  { title: { en: "Understand your operation", id: "Memahami operasi Anda" }, body: { en: "How the business really runs, on the ground.", id: "Bagaimana bisnis benar-benar berjalan, di lapangan." } },
  { title: { en: "Map the problem", id: "Memetakan masalah" }, body: { en: "Where time, data, and money leak.", id: "Di mana waktu, data, dan uang terbuang." } },
  { title: { en: "Design the system", id: "Merancang sistem" }, body: { en: "A clear plan shaped to your workflow.", id: "Rencana yang jelas, dibentuk sesuai alur kerja Anda." } },
  { title: { en: "Build the first phase", id: "Membangun fase pertama" }, body: { en: "Start focused, deliver something working.", id: "Mulai fokus, hasilkan sesuatu yang benar-benar berfungsi." } },
  { title: { en: "Test and refine", id: "Menguji dan menyempurnakan" }, body: { en: "Validate against real use.", id: "Validasi terhadap penggunaan nyata." } },
  { title: { en: "Train and hand over", id: "Melatih dan serah terima" }, body: { en: "Your team can actually run it.", id: "Tim Anda benar-benar bisa menjalankannya." } },
  { title: { en: "Support and improve", id: "Dukungan dan pengembangan" }, body: { en: "Keep it reliable and grow it.", id: "Menjaga sistem tetap andal dan terus berkembang." } },
];

export const scopingNote = {
  en: "Every project is scoped to your operation, requirements, and system complexity — we don't publish fixed prices.",
  id: "Setiap proyek disesuaikan dengan operasi, kebutuhan, dan kompleksitas sistem Anda — kami tidak mempublikasikan harga tetap.",
};

export const clientSegments: Localized[] = [
  { en: "SMEs", id: "UKM" },
  { en: "Factories", id: "Pabrik" },
  { en: "Farms & Plantations", id: "Pertanian & Perkebunan" },
  { en: "Schools & Institutions", id: "Sekolah & Institusi" },
  { en: "Workshops", id: "Bengkel" },
  { en: "F&B and Cold Storage", id: "F&B dan Cold Storage" },
  { en: "Professional Businesses", id: "Bisnis Profesional" },
  { en: "Distributors", id: "Distributor" },
  { en: "Service Sector Businesses", id: "Bisnis Sektor Jasa" },
];

export const honestyStatement = {
  kicker: { en: "A note on honesty", id: "Catatan kejujuran" },
  body: {
    en: "LUNAR is early. We're not going to show you fake logos or invented testimonials — here's who we build for. As real client work is delivered, this page will show logos, industries, and results — with permission, and only work we actually did.",
    id: "LUNAR masih baru. Kami tidak akan menampilkan logo palsu atau testimoni rekaan — berikut siapa yang kami layani. Saat hasil kerja klien nyata mulai tersedia, halaman ini akan menampilkan logo, industri, dan hasil — dengan izin, dan hanya pekerjaan yang benar-benar kami lakukan.",
  },
};

export const techStack = ["Vercel", "Astro", "Figma", "Next.js", "React", "shadcn/ui", "Supabase", "Tailwind CSS", "Node.js", "PostgreSQL"];

export const faq: { q: Localized; a: Localized }[] = [
  {
    q: { en: "How does pricing work?", id: "Bagaimana cara kerja harga?" },
    a: {
      en: "Every project is scoped to your operation, requirements, and system complexity — LUNAR doesn't publish fixed prices. Tell us how you work today and we'll point to what earns its place first.",
      id: "Setiap proyek disesuaikan dengan operasi, kebutuhan, dan kompleksitas sistem Anda — LUNAR tidak mempublikasikan harga tetap. Ceritakan bagaimana Anda bekerja hari ini dan kami akan menentukan titik awal yang tepat.",
    },
  },
  {
    q: { en: "Do you show real client work?", id: "Apakah Anda menampilkan hasil kerja klien nyata?" },
    a: {
      en: "LUNAR is early, and we won't show fake logos or invented testimonials. Demo, prototype, and in-progress work is always clearly labelled and never presented as client delivery. Real, scoped client systems are shared on request as they're delivered.",
      id: "LUNAR masih baru, dan kami tidak akan menampilkan logo palsu atau testimoni rekaan. Karya demo, prototipe, dan yang sedang dikerjakan selalu diberi label jelas dan tidak pernah disajikan sebagai hasil kerja klien. Sistem klien nyata dibagikan atas permintaan seiring pengiriman.",
    },
  },
  {
    q: { en: "What can LUNAR actually build?", id: "Apa yang sebenarnya bisa dibangun LUNAR?" },
    a: {
      en: "Seven solution pillars: websites and digital presence, custom business systems, automation and IoT monitoring, agriculture and plantation monitoring, factory and facility monitoring, education and STEM solutions, and service-sector digital systems.",
      id: "Tujuh pilar solusi: website dan kehadiran digital, sistem bisnis kustom, otomasi dan monitoring IoT, monitoring pertanian dan perkebunan, monitoring pabrik dan fasilitas, solusi pendidikan dan STEM, serta sistem digital sektor jasa.",
    },
  },
  {
    q: { en: "What happens after launch?", id: "Apa yang terjadi setelah peluncuran?" },
    a: {
      en: "The engagement doesn't stop at handover. The final step of LUNAR's process is support and improvement — keeping the system reliable and growing it as your operation changes.",
      id: "Kerja sama tidak berhenti di serah terima. Langkah terakhir proses LUNAR adalah dukungan dan pengembangan — menjaga sistem tetap andal dan terus berkembang seiring perubahan operasi Anda.",
    },
  },
  {
    q: { en: "What's the fastest way to reach LUNAR?", id: "Apa cara tercepat menghubungi LUNAR?" },
    a: {
      en: "WhatsApp gets the fastest reply. Email works too, or use the enquiry form to describe your operation and project type directly.",
      id: "WhatsApp memberikan balasan tercepat. Email juga bisa, atau gunakan formulir pertanyaan untuk menjelaskan operasi dan jenis proyek Anda secara langsung.",
    },
  },
  {
    q: { en: "Where is LUNAR based?", id: "Di mana LUNAR berlokasi?" },
    a: {
      en: "Indonesia. The site and enquiry process work in English or Indonesian.",
      id: "Indonesia. Situs dan proses pertanyaan tersedia dalam Bahasa Inggris atau Indonesia.",
    },
  },
];

export const projectTypes: Localized[] = [
  { en: "Website / Digital Presence", id: "Website / Kehadiran Digital" },
  { en: "Custom Business System", id: "Sistem Bisnis Kustom" },
  { en: "Automation / IoT Monitoring", id: "Otomasi / Monitoring IoT" },
  { en: "Agriculture / Plantation Monitoring", id: "Monitoring Pertanian / Perkebunan" },
  { en: "Factory / Facility Monitoring", id: "Monitoring Pabrik / Fasilitas" },
  { en: "Education / STEM", id: "Pendidikan / STEM" },
  { en: "Service Sector System", id: "Sistem Sektor Jasa" },
  { en: "CCTV / Facility Monitoring", id: "CCTV / Monitoring Fasilitas" },
  { en: "General Enquiry", id: "Pertanyaan Umum" },
];

export const contactCopy = {
  kicker: { en: "Start a project", id: "Mulai proyek" },
  heading: { en: "Let's map your operation.", id: "Mari petakan operasi Anda." },
  subhead: {
    en: "Tell us how your business runs today. We'll take it from there.",
    id: "Ceritakan bagaimana bisnis Anda berjalan hari ini. Kami akan melanjutkan dari sana.",
  },
  quickRoutes: { en: "Quick routes", id: "Jalur cepat" },
  fastestReply: { en: "Fastest reply", id: "Balasan tercepat" },
  basedIn: { en: "Based in", id: "Berlokasi di" },
  namePlaceholder: { en: "Name", id: "Nama" },
  companyPlaceholder: { en: "Company", id: "Perusahaan" },
  emailPlaceholder: { en: "Email", id: "Email" },
  messagePlaceholder: {
    en: "Tell us a little about your operation and what you'd like to see or control.",
    id: "Ceritakan sedikit tentang operasi Anda dan apa yang ingin Anda lihat atau kendalikan.",
  },
  send: { en: "Send enquiry", id: "Kirim pertanyaan" },
  thanksHeading: { en: "Thanks — we'll be in touch shortly.", id: "Terima kasih — kami akan segera menghubungi Anda." },
  thanksBody: {
    en: "Your email client should have opened with your enquiry prefilled. If it's urgent, WhatsApp is the fastest way to reach us.",
    id: "Email client Anda seharusnya sudah terbuka dengan pertanyaan Anda terisi otomatis. Jika mendesak, WhatsApp adalah cara tercepat menghubungi kami.",
  },
};

export const finalCta = {
  heading: { en: "Let's map your operation.", id: "Mari petakan operasi Anda." },
  body: {
    en: "Tell us how your business runs today. We'll take it from there.",
    id: "Ceritakan bagaimana bisnis Anda berjalan hari ini. Kami akan melanjutkan dari sana.",
  },
};

export const footerCopyright = {
  en: "© 2026 LunarTech Indonesia. All rights reserved.",
  id: "© 2026 LunarTech Indonesia. Hak cipta dilindungi.",
};

export const footerScopingNote = {
  en: "Every project is scoped to your operation. We don't publish fixed prices.",
  id: "Setiap proyek disesuaikan dengan operasi Anda. Kami tidak mempublikasikan harga tetap.",
};

export const support = {
  kicker: { en: "Ongoing Support", id: "Dukungan Berkelanjutan" },
  heading: { en: "Support and improve.", id: "Dukungan dan pengembangan." },
  body: {
    en: "The engagement doesn't end at handover. LUNAR stays on to keep the system reliable and grow it as your operation changes.",
    id: "Kerja sama tidak berhenti di serah terima. LUNAR tetap mendampingi untuk menjaga sistem tetap andal dan terus mengembangkannya seiring perubahan operasi Anda.",
  },
};
