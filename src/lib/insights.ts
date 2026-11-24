/**
 * LUNAR Insights: article content.
 *
 * Publishing model (no database or login exists on this site yet): each article is plain data in this file or
 * a sibling file. Adding an article means adding one object to `articles`; the landing page, filters, search,
 * article page, table of contents, RSS feed and sitemap all read from here, so no frontend code changes.
 * A visual admin (drafts, uploads, scheduling) needs a database and authentication and is a separate piece of work.
 *
 * Editorial rules followed here: no invented statistics, clients, quotes or results; claims about what LUNAR has
 * built are limited to what the site already states; limits and the need for human review are stated plainly.
 */

export type Lang = "en" | "id";
export type T = { en: string; id: string };
export type Cat = "business-systems" | "ai-automation" | "digital-presence" | "engineering-iot" | "lunartech-notes";

export const categories: { key: Cat | "all"; label: T }[] = [
  { key: "all", label: { en: "All articles", id: "Semua artikel" } },
  { key: "business-systems", label: { en: "Business systems", id: "Sistem bisnis" } },
  { key: "ai-automation", label: { en: "AI & automation", id: "AI & otomasi" } },
  { key: "digital-presence", label: { en: "Digital presence", id: "Kehadiran digital" } },
  { key: "engineering-iot", label: { en: "Engineering & IoT", id: "Rekayasa & IoT" } },
  { key: "lunartech-notes", label: { en: "LUNAR notes", id: "Catatan LUNAR" } },
];

export type Block =
  | { t: "p"; en: string; id: string }
  | { t: "h2"; key: string; en: string; id: string }
  | { t: "ul"; items: T[] }
  | { t: "ol"; items: T[] }
  | { t: "quote"; en: string; id: string }
  | { t: "note"; en: string; id: string }
  | { t: "fig"; fig: "erp" | "ocr" | "web" };

export interface Article {
  slug: string;
  category: Cat;
  date: string; // ISO
  readMin: number;
  cover: "erp" | "ocr" | "web";
  title: T;
  dek: T;
  description: T;
  tags: string[];
  cta: { label: T; href: string };
  related?: string[];
  body: Block[];
}

const p = (en: string, id: string): Block => ({ t: "p", en, id });
const h = (key: string, en: string, id: string): Block => ({ t: "h2", key, en, id });
const li = (en: string, id: string): T => ({ en, id });

export const articles: Article[] = [
  {
    slug: "why-growing-businesses-need-connected-systems",
    category: "business-systems",
    date: "2026-11-24",
    readMin: 8,
    cover: "erp",
    title: { en: "Why Growing Businesses Need Connected Systems", id: "Mengapa ERP Penting untuk Bisnis yang Sedang Berkembang?" },
    dek: {
      en: "When a business grows, its operations become more complex. What once worked through spreadsheets and separate applications can become difficult to manage. ERP helps connect information, teams and workflows in a more structured system.",
      id: "Ketika bisnis tumbuh, operasinya menjadi lebih kompleks. Apa yang dulu cukup dengan spreadsheet dan aplikasi terpisah bisa menjadi sulit dikelola. ERP membantu menghubungkan informasi, tim, dan alur kerja dalam satu sistem yang lebih terstruktur.",
    },
    description: {
      en: "What ERP actually is, the problems of disconnected spreadsheets, when a growing business should consider it, and the trade-offs between custom and off-the-shelf systems.",
      id: "Apa itu ERP, masalah akibat spreadsheet yang terpisah, kapan bisnis yang berkembang perlu mempertimbangkannya, dan perbandingan sistem kustom dengan perangkat lunak siap pakai.",
    },
    tags: ["ERP", "inventory", "finance", "integration"],
    cta: { label: { en: "Explore business systems", id: "Jelajahi sistem bisnis" }, href: "/solutions/erp" },
    related: ["ai-in-modern-business-from-ocr-to-practical-automation", "why-your-business-still-needs-a-professional-website"],
    body: [
      h("what", "What ERP actually is", "Apa itu ERP sebenarnya"),
      p(
        "ERP stands for enterprise resource planning. In plain terms it is one system, with one shared set of records, that several parts of a business work in: sales, purchasing, stock, finance, people and operations. The key word is shared. A sale, a stock movement and an invoice are not three separate facts typed into three places; they are connected steps of one story.",
        "ERP adalah singkatan dari enterprise resource planning. Secara sederhana, ERP adalah satu sistem dengan satu set catatan bersama yang dipakai berbagai bagian bisnis: penjualan, pembelian, stok, keuangan, SDM, dan operasional. Kata kuncinya adalah bersama. Penjualan, pergerakan stok, dan faktur bukan tiga fakta terpisah yang diketik di tiga tempat; ketiganya adalah langkah yang saling terhubung dalam satu cerita.",
      ),
      h("without", "What goes wrong without it", "Apa yang salah tanpa sistem terhubung"),
      p(
        "Most growing businesses do not start with a system. They start with a spreadsheet, a messaging app and someone who remembers things. That works while the business is small. As orders, products, staff and locations multiply, the same information starts to live in several places, and the places drift apart.",
        "Kebanyakan bisnis yang berkembang tidak memulai dengan sebuah sistem. Mereka memulai dengan spreadsheet, aplikasi pesan, dan seseorang yang mengingat banyak hal. Itu berjalan baik selama bisnis kecil. Seiring pesanan, produk, staf, dan lokasi bertambah, informasi yang sama mulai tersimpan di beberapa tempat, dan tempat-tempat itu mulai tidak sinkron.",
      ),
      { t: "fig", fig: "erp" },
      h("duplicate", "Spreadsheets and duplicated data", "Spreadsheet dan data ganda"),
      p(
        "Duplicated data is not just untidy. When the sales sheet, the warehouse sheet and the finance sheet each hold their own copy of an order, every change has to be made three times, and someone has to notice when one copy is wrong. The cost shows up as time spent reconciling, arguments about which number is right, and decisions made on figures nobody fully trusts.",
        "Data ganda bukan sekadar tidak rapi. Ketika lembar penjualan, lembar gudang, dan lembar keuangan masing-masing menyimpan salinan pesanan, setiap perubahan harus dilakukan tiga kali, dan seseorang harus menyadari ketika salah satu salinan keliru. Dampaknya muncul sebagai waktu untuk rekonsiliasi, perdebatan tentang angka mana yang benar, dan keputusan yang diambil dari angka yang tidak sepenuhnya dipercaya.",
      ),
      h("inventory", "Inventory and purchasing", "Persediaan dan pembelian"),
      p(
        "Stock is where disconnection hurts first. If sales do not reduce stock automatically, the count in the warehouse and the count in the sheet diverge; purchasing then orders from a number that is already wrong. Connecting sales, receiving and stock movements means the quantity on hand is a by-product of the work, not a separate chore.",
        "Stok adalah tempat keterputusan paling cepat terasa. Jika penjualan tidak mengurangi stok secara otomatis, hitungan di gudang dan di lembar kerja akan berbeda; bagian pembelian lalu memesan berdasarkan angka yang sudah keliru. Dengan menghubungkan penjualan, penerimaan, dan pergerakan stok, jumlah barang yang ada menjadi hasil sampingan dari pekerjaan, bukan tugas terpisah.",
      ),
      h("finance", "Financial visibility", "Visibilitas keuangan"),
      p(
        "Finance depends on everything upstream. When invoices, purchase costs and payments come from the same records as operations, a manager can see what is owed, what is due and what a job actually cost without waiting for someone to assemble it. The benefit is not a prettier report; it is that the report is built from the same facts the operation used.",
        "Keuangan bergantung pada semua yang ada di hulu. Ketika faktur, biaya pembelian, dan pembayaran berasal dari catatan yang sama dengan operasional, manajer dapat melihat apa yang terutang, apa yang jatuh tempo, dan berapa biaya sebuah pekerjaan tanpa menunggu seseorang menyusunnya. Manfaatnya bukan laporan yang lebih cantik, melainkan laporan yang dibangun dari fakta yang sama dengan yang dipakai operasional.",
      ),
      h("people", "People and operational coordination", "SDM dan koordinasi operasional"),
      p(
        "Attendance, schedules, leave and payroll are also records that touch operations: who was assigned, who worked, what was paid. In businesses with shift work or field crews, connecting those records removes a great deal of manual cross-checking.",
        "Absensi, jadwal, cuti, dan penggajian juga merupakan catatan yang bersinggungan dengan operasional: siapa yang ditugaskan, siapa yang bekerja, dan apa yang dibayarkan. Pada bisnis dengan sistem shift atau tim lapangan, menghubungkan catatan tersebut menghilangkan banyak pemeriksaan silang manual.",
      ),
      { t: "quote", en: "Integration is not about having more software. It is about each fact being entered once and used everywhere it matters.", id: "Integrasi bukan tentang memiliki lebih banyak perangkat lunak. Integrasi berarti setiap fakta dimasukkan sekali dan dipakai di mana pun ia diperlukan." },
      h("when", "When to consider ERP", "Kapan mempertimbangkan ERP"),
      p("There is no fixed size at which a company needs ERP. These signs are more useful than headcount:", "Tidak ada ukuran tetap kapan perusahaan membutuhkan ERP. Tanda-tanda berikut lebih berguna daripada jumlah karyawan:"),
      {
        t: "ul",
        items: [
          li("The same information is entered in more than one place.", "Informasi yang sama dimasukkan di lebih dari satu tempat."),
          li("Month-end close depends on a person stitching sheets together.", "Penutupan bulan bergantung pada seseorang yang menggabungkan banyak lembar kerja."),
          li("Stock figures are regularly disputed or corrected.", "Angka stok sering diperdebatkan atau dikoreksi."),
          li("Nobody can answer a simple question, such as what a job cost, without a day of work.", "Tidak ada yang bisa menjawab pertanyaan sederhana, seperti berapa biaya sebuah pekerjaan, tanpa bekerja seharian."),
          li("Growth is being held back by manual coordination rather than demand.", "Pertumbuhan terhambat oleh koordinasi manual, bukan oleh permintaan."),
        ],
      },
      h("custom", "Custom ERP versus off-the-shelf", "ERP kustom versus siap pakai"),
      p(
        "Off-the-shelf systems are proven and usually quicker to start, and they suit businesses whose processes match common practice. Their cost is fit: you adapt the business to the software, and unusual workflows may need workarounds. A custom system is built around how the business actually works, which can remove those workarounds, but it needs a clearer specification, takes longer to start and depends on the quality of whoever builds and maintains it. Many businesses end up with a mix: a standard core and custom parts where their process is genuinely different.",
        "Sistem siap pakai sudah teruji dan biasanya lebih cepat dimulai, serta cocok untuk bisnis yang prosesnya sesuai praktik umum. Harganya adalah kecocokan: bisnis menyesuaikan diri dengan perangkat lunak, dan alur kerja yang tidak lazim mungkin memerlukan akal-akalan. Sistem kustom dibangun mengikuti cara bisnis benar-benar bekerja sehingga dapat menghilangkan akal-akalan itu, tetapi membutuhkan spesifikasi yang lebih jelas, memakan waktu lebih lama untuk dimulai, dan bergantung pada kualitas pihak yang membangun dan memeliharanya. Banyak bisnis akhirnya memakai campuran: inti standar dan bagian kustom di tempat proses mereka benar-benar berbeda.",
      ),
      h("limits", "Limits and implementation considerations", "Batasan dan pertimbangan implementasi"),
      p(
        "ERP is not automatically right for every company. A very small business with simple processes may be better served by a good spreadsheet and discipline. Implementation is also mostly a people problem: data has to be cleaned before it is moved, staff have to be trained, and the new system will expose habits and gaps in the old process. Start with the part that hurts most, deliver something working, and extend from there rather than attempting everything at once.",
        "ERP tidak otomatis tepat untuk setiap perusahaan. Bisnis yang sangat kecil dengan proses sederhana mungkin lebih terbantu oleh spreadsheet yang baik dan disiplin. Implementasi juga sebagian besar adalah masalah manusia: data harus dibersihkan sebelum dipindahkan, staf harus dilatih, dan sistem baru akan menyingkap kebiasaan dan celah pada proses lama. Mulailah dari bagian yang paling menyakitkan, hasilkan sesuatu yang berfungsi, lalu perluas, daripada mencoba semuanya sekaligus.",
      ),
      { t: "note", en: "LUNAR builds custom business systems around a client's operation. The examples above are general illustrations, not results from a specific client.", id: "LUNAR membangun sistem bisnis kustom yang dirancang sesuai operasi klien. Contoh di atas adalah ilustrasi umum, bukan hasil dari klien tertentu." },
    ],
  },
  {
    slug: "ai-in-modern-business-from-ocr-to-practical-automation",
    category: "ai-automation",
    date: "2026-11-23",
    readMin: 9,
    cover: "ocr",
    title: { en: "AI in Modern Business: From OCR to Practical Automation", id: "Seberapa Relevan AI dalam Industri Saat Ini? Dari OCR hingga Otomatisasi Bisnis" },
    dek: {
      en: "Artificial intelligence is becoming part of everyday business operations, but its real value depends on how effectively it solves a specific problem. Technologies such as OCR, document processing and workflow automation can help reduce repetitive manual tasks when implemented appropriately.",
      id: "Kecerdasan buatan semakin menjadi bagian dari operasi bisnis sehari-hari, tetapi nilai sebenarnya bergantung pada seberapa efektif ia memecahkan masalah tertentu. Teknologi seperti OCR, pemrosesan dokumen, dan otomatisasi alur kerja dapat membantu mengurangi tugas manual berulang bila diterapkan dengan tepat.",
    },
    description: {
      en: "Practical business uses of AI beyond chatbots: OCR, document understanding, classification, computer vision and workflow automation, with their limits and how to choose a first use case.",
      id: "Penggunaan AI yang praktis di bisnis selain chatbot: OCR, pemahaman dokumen, klasifikasi, computer vision, dan otomatisasi alur kerja, beserta batasannya dan cara memilih kasus penggunaan pertama.",
    },
    tags: ["AI", "OCR", "automation", "documents"],
    cta: { label: { en: "Explore AI & automation", id: "Jelajahi AI & otomasi" }, href: "/solutions/ai-automation" },
    related: ["why-growing-businesses-need-connected-systems", "why-your-business-still-needs-a-professional-website"],
    body: [
      h("meaning", "What AI means in business", "Apa arti AI dalam bisnis"),
      p(
        "In most businesses, AI is not one product. It is a set of techniques for tasks that are hard to write fixed rules for: reading a messy document, recognising what is in an image, sorting requests by meaning. The useful question is not whether to use AI, but which specific, repetitive task is costing time and could be helped by it.",
        "Di sebagian besar bisnis, AI bukan satu produk. AI adalah sekumpulan teknik untuk tugas yang sulit dibuatkan aturan tetap: membaca dokumen yang tidak rapi, mengenali isi sebuah gambar, memilah permintaan menurut maknanya. Pertanyaan yang berguna bukan apakah memakai AI, melainkan tugas berulang apa yang memakan waktu dan bisa terbantu olehnya.",
      ),
      h("beyond", "Practical uses beyond chatbots", "Penggunaan praktis selain chatbot"),
      p(
        "Chat interfaces get the attention, but much of the practical value is quieter: capturing data from paper, sorting incoming documents, flagging unusual items for a person to look at, and moving information between systems without retyping.",
        "Antarmuka percakapan mendapat banyak perhatian, tetapi sebagian besar nilai praktisnya lebih senyap: menangkap data dari kertas, memilah dokumen masuk, menandai item tidak biasa agar dilihat manusia, dan memindahkan informasi antar sistem tanpa mengetik ulang.",
      ),
      h("ocr", "OCR and document digitisation", "OCR dan digitalisasi dokumen"),
      p(
        "OCR, optical character recognition, turns the text in a photo or scan into machine-readable text. That is the first step of digitising paperwork: a weighing ticket, a delivery note or a form stops being a picture and becomes characters a system can search and store.",
        "OCR, optical character recognition, mengubah teks pada foto atau hasil pindai menjadi teks yang dapat dibaca mesin. Itu adalah langkah pertama digitalisasi dokumen: tiket timbang, surat jalan, atau formulir berhenti menjadi gambar dan menjadi karakter yang dapat dicari dan disimpan sistem.",
      ),
      h("understanding", "OCR versus document understanding", "OCR versus pemahaman dokumen"),
      p(
        "Plain OCR gives you text, not meaning. It does not know which number is the total and which is the tax. Document understanding adds that layer: it identifies fields such as a reference number, a date or a total, often by combining OCR with layout rules or a trained model. The second is more useful and also has more ways to be wrong, which is why validation matters.",
        "OCR biasa memberi teks, bukan makna. OCR tidak tahu angka mana yang total dan mana yang pajak. Pemahaman dokumen menambahkan lapisan itu: mengenali bidang seperti nomor referensi, tanggal, atau total, sering kali dengan menggabungkan OCR dengan aturan tata letak atau model terlatih. Yang kedua lebih berguna dan juga lebih banyak cara untuk keliru, itulah sebabnya validasi penting.",
      ),
      { t: "fig", fig: "ocr" },
      h("invoices", "Invoice extraction and classification", "Ekstraksi faktur dan klasifikasi"),
      p(
        "Invoices are a typical target: reference number, date, supplier, line items and totals. A related task is classification, deciding whether an incoming file is an invoice, a delivery note or something else, so it reaches the right person. Both work best when documents are reasonably consistent, and need more care when every supplier uses a different layout.",
        "Faktur adalah sasaran yang umum: nomor referensi, tanggal, pemasok, rincian barang, dan total. Tugas terkait adalah klasifikasi, yaitu menentukan apakah file masuk adalah faktur, surat jalan, atau hal lain, agar sampai ke orang yang tepat. Keduanya paling baik bila dokumen cukup seragam, dan perlu lebih hati-hati bila setiap pemasok memakai tata letak berbeda.",
      ),
      h("vision", "Image recognition and computer vision", "Pengenalan gambar dan computer vision"),
      p(
        "Computer vision extends the idea from documents to the physical world: counting, checking that something is present, or reading a label from a camera. It depends heavily on lighting, camera position and the variety of what is being seen, so it is usually proven in a pilot on the actual site rather than assumed.",
        "Computer vision memperluas gagasan dari dokumen ke dunia fisik: menghitung, memeriksa apakah sesuatu ada, atau membaca label dari kamera. Hasilnya sangat bergantung pada pencahayaan, posisi kamera, dan keragaman objek yang dilihat, sehingga biasanya dibuktikan lewat uji coba di lokasi sebenarnya, bukan diasumsikan.",
      ),
      h("workflow", "Workflow automation and integration", "Otomatisasi alur kerja dan integrasi"),
      p(
        "Extracting data is only useful if it goes somewhere. Workflow automation connects the result to the next step: a record to review, a field filled in a form, a notification to a person. The strongest designs keep a person in charge of the decision and automate the retyping around it.",
        "Mengekstrak data hanya berguna bila data itu sampai ke tujuan. Otomatisasi alur kerja menghubungkan hasilnya ke langkah berikutnya: catatan untuk ditinjau, kolom yang terisi di formulir, atau pemberitahuan kepada seseorang. Rancangan terbaik menjaga manusia tetap memegang keputusan dan mengotomatiskan pengetikan ulang di sekitarnya.",
      ),
      h("limits", "Limits: accuracy, validation and privacy", "Batasan: akurasi, validasi, dan privasi"),
      {
        t: "ul",
        items: [
          li("No extraction is perfect. Treat any claim of 100% accuracy with suspicion, and measure accuracy on your own documents.", "Tidak ada ekstraksi yang sempurna. Curigai klaim akurasi 100%, dan ukur akurasi pada dokumen Anda sendiri."),
          li("Low-confidence results should go to a person. A good system shows its confidence and does not overwrite what a person has already entered.", "Hasil dengan keyakinan rendah sebaiknya diserahkan kepada manusia. Sistem yang baik menampilkan tingkat keyakinannya dan tidak menimpa isian yang sudah dimasukkan manusia."),
          li("Documents often contain personal or commercial data. Decide where they are stored, who can see them and how long they are kept.", "Dokumen sering berisi data pribadi atau komersial. Tentukan di mana disimpan, siapa yang dapat melihat, dan berapa lama disimpan."),
          li("Photo quality matters: blur, glare and skew all reduce accuracy.", "Kualitas foto penting: buram, silau, dan miring menurunkan akurasi."),
        ],
      },
      h("usecase", "Choosing a first use case", "Memilih kasus penggunaan pertama"),
      p(
        "Look for a task that is frequent, rule-like, currently typed by hand and easy to check. Count how often it happens and how long it takes, define what a correct result looks like, and start with a small batch. If the people doing the work would rather not do it, that is a good sign.",
        "Carilah tugas yang sering terjadi, mirip aturan, saat ini diketik manual, dan mudah diperiksa. Hitung seberapa sering terjadi dan berapa lama memakan waktu, tentukan seperti apa hasil yang benar, dan mulai dari kumpulan kecil. Jika orang yang mengerjakannya lebih suka tidak melakukannya, itu pertanda baik.",
      ),
      h("roi", "Implementation and return on investment", "Implementasi dan pengembalian investasi"),
      p(
        "Return depends on volume and on the cost of errors, and it should be estimated from your own numbers rather than borrowed from someone else's. Include the time spent reviewing results and maintaining the system, not only the time saved typing.",
        "Pengembalian bergantung pada volume dan biaya kesalahan, dan sebaiknya diperkirakan dari angka Anda sendiri, bukan meminjam angka orang lain. Sertakan waktu untuk meninjau hasil dan memelihara sistem, bukan hanya waktu mengetik yang dihemat.",
      ),
      { t: "note", en: "In a hauling system LUNAR has worked on, photographed weighing tickets are read by OCR on a separate computer; results come back with a confidence score, fill only empty fields at high confidence, and never overwrite a person's input. A person still reviews and saves every record. Other document types would be scoped and tested on your samples first.", id: "Pada sistem hauling yang pernah dikerjakan LUNAR, foto tiket timbang dibaca oleh OCR di komputer terpisah; hasilnya kembali dengan skor keyakinan, hanya mengisi kolom kosong pada keyakinan tinggi, dan tidak pernah menimpa isian manusia. Manusia tetap meninjau dan menyimpan setiap catatan. Jenis dokumen lain akan dirancang dan diuji dulu pada contoh Anda." },
    ],
  },
  {
    slug: "why-your-business-still-needs-a-professional-website",
    category: "digital-presence",
    date: "2026-11-22",
    readMin: 7,
    cover: "web",
    title: { en: "Why Your Business Still Needs a Professional Website", id: "Mengapa Website Profesional Masih Penting untuk Bisnis di Era Digital?" },
    dek: {
      en: "Social media helps businesses reach customers, but a professional website provides a dedicated digital presence where a company can present its services, communicate its identity and guide visitors toward an enquiry or purchase.",
      id: "Media sosial membantu bisnis menjangkau pelanggan, tetapi website profesional menyediakan kehadiran digital tersendiri tempat perusahaan menyajikan layanannya, menyampaikan identitasnya, dan mengarahkan pengunjung ke permintaan atau pembelian.",
    },
    description: {
      en: "The role of a company website next to social media: credibility, search visibility, enquiries, mobile use, performance, security, and why strategy matters more than appearance.",
      id: "Peran website perusahaan di samping media sosial: kredibilitas, visibilitas pencarian, permintaan, penggunaan di ponsel, kinerja, keamanan, dan mengapa strategi lebih penting daripada tampilan.",
    },
    tags: ["website", "SEO", "UX", "digital presence"],
    cta: { label: { en: "Explore web & digital presence", id: "Jelajahi web & kehadiran digital" }, href: "/solutions/websites-platforms" },
    related: ["why-growing-businesses-need-connected-systems", "ai-in-modern-business-from-ocr-to-practical-automation"],
    body: [
      h("role", "The role of a company website", "Peran website perusahaan"),
      p(
        "A website is the one place online that a business controls. It can explain what the company does, show how it works, answer common questions and give a visitor a clear next step. Everything else, including social media and marketplaces, is space rented on someone else's platform, under rules and algorithms that can change.",
        "Website adalah satu-satunya tempat di internet yang sepenuhnya dikendalikan bisnis. Website dapat menjelaskan apa yang dikerjakan perusahaan, menunjukkan cara kerjanya, menjawab pertanyaan umum, dan memberi pengunjung langkah berikutnya yang jelas. Yang lain, termasuk media sosial dan marketplace, adalah ruang sewaan di platform milik pihak lain, dengan aturan dan algoritma yang dapat berubah.",
      ),
      h("social", "Website versus social media", "Website versus media sosial"),
      p(
        "They do different jobs. Social media is good for reach, conversation and showing activity. A website is good for depth, structure and being found when someone searches for a specific need. Most businesses benefit from both, with the website as the stable home that social posts point to.",
        "Keduanya punya fungsi berbeda. Media sosial baik untuk jangkauan, percakapan, dan menunjukkan aktivitas. Website baik untuk kedalaman, struktur, dan agar ditemukan ketika seseorang mencari kebutuhan tertentu. Sebagian besar bisnis diuntungkan oleh keduanya, dengan website sebagai rumah yang stabil yang dituju oleh unggahan media sosial.",
      ),
      { t: "fig", fig: "web" },
      h("identity", "A credible digital identity", "Identitas digital yang kredibel"),
      p(
        "Before contacting a business they do not know, many people look it up. A clear website with real information about what the company does, where it works and how to reach it answers the first question every buyer has: is this a real, careful business? Clarity matters more than decoration.",
        "Sebelum menghubungi bisnis yang belum dikenal, banyak orang mencarinya lebih dulu. Website yang jelas dengan informasi nyata tentang apa yang dikerjakan perusahaan, di mana beroperasi, dan bagaimana menghubunginya menjawab pertanyaan pertama setiap pembeli: apakah ini bisnis yang nyata dan berhati-hati? Kejelasan lebih penting daripada hiasan.",
      ),
      h("search", "Search visibility and customer discovery", "Visibilitas pencarian dan penemuan pelanggan"),
      p(
        "A website can be found by people searching for what you offer. That depends on useful content, clear page titles and descriptions, sensible structure and a site search engines can read. It is a gradual effect, and nobody can honestly promise a ranking or a number of visitors.",
        "Website dapat ditemukan oleh orang yang mencari apa yang Anda tawarkan. Hal itu bergantung pada konten yang berguna, judul dan deskripsi halaman yang jelas, struktur yang masuk akal, dan situs yang dapat dibaca mesin pencari. Efeknya bertahap, dan tidak ada yang dapat dengan jujur menjanjikan peringkat atau jumlah pengunjung tertentu.",
      ),
      h("mobile", "Mobile usability and performance", "Kemudahan di ponsel dan kinerja"),
      p(
        "In Indonesia, a large share of browsing happens on phones, often on variable connections. A site that is hard to read on a small screen or slow to load loses visitors before they read a word. Practical basics: readable text, tappable buttons, compressed images and as little unnecessary code as possible.",
        "Di Indonesia, sebagian besar penelusuran terjadi di ponsel, sering dengan koneksi yang bervariasi. Situs yang sulit dibaca di layar kecil atau lambat dimuat kehilangan pengunjung sebelum mereka membaca sepatah kata pun. Dasar praktisnya: teks yang terbaca, tombol yang mudah disentuh, gambar yang terkompresi, dan kode tak perlu sesedikit mungkin.",
      ),
      h("security", "Security and maintenance", "Keamanan dan pemeliharaan"),
      p(
        "A website is not finished when it launches. Software needs updating, certificates renew, forms need protection from spam and abuse, and content goes out of date. Decide who is responsible for this before launch, not after the first problem.",
        "Website tidak selesai begitu diluncurkan. Perangkat lunak perlu diperbarui, sertifikat diperpanjang, formulir perlu dilindungi dari spam dan penyalahgunaan, dan konten menjadi usang. Tentukan siapa yang bertanggung jawab sebelum peluncuran, bukan setelah masalah pertama muncul.",
      ),
      h("conversion", "Conversion-focused design", "Desain yang berorientasi pada tindakan"),
      p(
        "Every page should make the next step obvious: call, message, request a quote, book. That means a clear primary action, few competing choices, and information in the order a visitor needs it. A beautiful page with no clear path is a brochure, not a tool.",
        "Setiap halaman sebaiknya membuat langkah berikutnya jelas: menelepon, mengirim pesan, meminta penawaran, memesan. Artinya ada satu tindakan utama yang jelas, sedikit pilihan yang bersaing, dan informasi dalam urutan yang dibutuhkan pengunjung. Halaman yang indah tanpa jalur yang jelas hanyalah brosur, bukan alat.",
      ),
      h("integration", "Connecting the website to your systems", "Menghubungkan website ke sistem Anda"),
      p(
        "Enquiries that arrive by form or message are most useful when they land where the team already works: an inbox, a CRM, a booking tool or a business system. A small amount of integration turns the website from a display into the front door of the operation.",
        "Permintaan yang masuk lewat formulir atau pesan paling berguna bila mendarat di tempat tim sudah bekerja: kotak masuk, CRM, alat pemesanan, atau sistem bisnis. Sedikit integrasi mengubah website dari etalase menjadi pintu depan operasi.",
      ),
      h("strategy", "Why strategy matters more than appearance", "Mengapa strategi lebih penting daripada tampilan"),
      p(
        "Good design helps, but a site succeeds when it is built for a defined audience and goal: who it is for, what they need to decide, and what you want them to do. Start there; the visual design follows. And be wary of any promise that a website alone will bring traffic or revenue; it creates the conditions, and the rest depends on the business.",
        "Desain yang baik membantu, tetapi sebuah situs berhasil bila dibangun untuk audiens dan tujuan yang jelas: untuk siapa, apa yang perlu mereka putuskan, dan apa yang Anda ingin mereka lakukan. Mulailah dari sana; desain visual mengikuti. Dan waspadai janji bahwa website saja akan mendatangkan lalu lintas atau pendapatan; website menciptakan kondisinya, selebihnya bergantung pada bisnis.",
      ),
    ],
  },
];

export const bySlug = (slug: string) => articles.find((a) => a.slug === slug);
export const sorted = () => [...articles].sort((a, b) => b.date.localeCompare(a.date));
export const catLabel = (k: Cat) => categories.find((c) => c.key === k)!.label;
export const fmtDate = (iso: string, lang: Lang) => new Date(iso + "T00:00:00Z").toLocaleDateString(lang === "id" ? "id-ID" : "en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
