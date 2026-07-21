export type EventCategory =
  | "Konser"
  | "Workshop"
  | "Olahraga"
  | "Seni & Teater"
  | "Lainnya";

export type Event = {
  id: string;
  title: string;
  category: EventCategory;
  date: string;
  dateISO: string;
  time: string;
  location: string;
  price: number;
  priceLabel: string;
  image: string;
  description: string;
  lineup: string[];
  terms: string;
  refundPolicy: string;
  mapEmbed: string;
  available: boolean;
  maxTickets: number;
};

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`;

export const EVENTS: Event[] = [
  {
    id: "festival-musik-jakarta",
    title: "Festival Musik Jakarta",
    category: "Konser",
    date: "10 Januari 2026",
    dateISO: "2026-01-10",
    time: "10.00 - 22.00",
    location: "Stadion GBK",
    price: 150000,
    priceLabel: "Rp. 150.000",
    image: unsplash("photo-1459749411175-04bf5292ceea"),
    description:
      "Bersiaplah untuk event musik yang paling dinantikan tahun ini! Festival Musik Jakarta 2026 menghadirkan deretan artis internasional dan lokal ternama. Instalasi seni imersif, serta area kuliner yang menyajikan jajanan terbaik khas Jakarta.",
    lineup: [
      "Rich Brian",
      "Joji",
      "Hindia",
      "Fourtwnty",
      "JKT 48",
      "Dan masih banyak lagi!",
    ],
    terms:
      "Event ini hanya diperuntukkan bagi pengunjung berusia minimal 18 tahun. Pengunjung wajib membawa kartu identitas resmi (KTP/SIM/Paspor) untuk keperluan verifikasi usia saat memasuki area event. Penyelenggara berhak menolak masuk pengunjung yang tidak memenuhi ketentuan usia tanpa pengembalian dana.",
    refundPolicy:
      "Tiket yang sudah dibeli tidak dapat dikembalikan (non-refundable). Pengalihan tiket ke orang lain diperbolehkan maksimal 7 hari sebelum event dengan biaya administrasi Rp 25.000.",
    mapEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=106.7950%2C-6.2250%2C106.8100%2C-6.2050&amp;layer=mapnik&amp;marker=-6.2150%2C106.8025",
    available: true,
    maxTickets: 2,
  },
  {
    id: "half-marathon-pocarirun",
    title: "Half Marathon - PocariRun",
    category: "Olahraga",
    date: "29 Januari 2026 - 05.00",
    dateISO: "2026-01-29",
    time: "05.00 - 10.00",
    location: "Bandung",
    price: 350000,
    priceLabel: "Rp. 350.000",
    image: unsplash("photo-1452626038306-9aae5e071dd3"),
    description:
      "Half Marathon PocariRun adalah event lari sejauh 21K yang diadakan di kota Bandung dengan rute scenic pegunungan dan udara segar. Tersedia kategori 21K, 10K, dan 5K untuk semua kalangan.",
    lineup: [
      "Kategori 21K",
      "Kategori 10K",
      "Kategori 5K",
      "Race Pack Eksklusif",
      "Medali Finisher",
    ],
    terms:
      "Peserta berusia minimal 17 tahun untuk kategori 21K. Wajib membawa KTP/SIM saat registrasi ulang. Peserta di bawah 18 tahun harus disertai orang tua/wali.",
    refundPolicy:
      "Pembatalan tiket dapat dilakukan maksimal 14 hari sebelum event dengan potongan 25% biaya administrasi. Pengalihan tiket ke peserta lain diperbolehkan tanpa biaya.",
    mapEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=107.5700%2C-6.9500%2C107.6500%2C-6.8800&amp;layer=mapnik&amp;marker=-6.9175%2C107.6100",
    available: true,
    maxTickets: 4,
  },
  {
    id: "pameran-kesenian-ikj",
    title: "Pameran Kesenian IKJ",
    category: "Seni & Teater",
    date: "16 Januari 2026 - 10.00",
    dateISO: "2026-01-16",
    time: "10.00 - 21.00",
    location: "Jakarta",
    price: 0,
    priceLabel: "Gratis",
    image: unsplash("photo-1564399263809-d3f5f2c1e2c0"),
    description:
      "Pameran Kesenian Institut Kesenian Jakarta (IKJ) menampilkan karya seni instalasi, patung, dan lukisan dari mahasiswa serta alumni IKJ. Acara terbuka untuk umum dan gratis.",
    lineup: [
      "Instalasi Seni Patung",
      "Pameran Lukisan",
      "Pertunjukan Teater Mahasiswa",
      "Workshop Seni Rupa",
    ],
    terms:
      "Event terbuka untuk semua usia. Anak di bawah 12 tahun harus didampingi orang tua. Dilarang membawa makanan dan minuman dari luar.",
    refundPolicy:
      "Tiket gratis tidak memerlukan pengembalian dana. Pendaftaran ulang dapat dilakukan di tempat pada hari H.",
    mapEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=106.7900%2C-6.1850%2C106.8100%2C-6.1650&amp;layer=mapnik&amp;marker=-6.1750%2C106.8000",
    available: true,
    maxTickets: 5,
  },
  {
    id: "vibe-coding-code-with-ai",
    title: "Vibe Coding - Code with AI",
    category: "Workshop",
    date: "28 Februari 2026 - 13.00",
    dateISO: "2026-02-28",
    time: "13.00 - 17.00",
    location: "Online - Zoom",
    price: 100000,
    priceLabel: "Rp. 100.000",
    image: unsplash("photo-1517694712202-14dd9538aa97"),
    description:
      "Workshop online intensif untuk belajar coding dengan bantuan AI. Peserta akan dipandu langsung oleh praktisi industri dan mendapat sertifikat digital setelah selesai.",
    lineup: [
      "Sesi 1: Pengenalan AI untuk Developer",
      "Sesi 2: Hands-on: Build App with AI",
      "Sesi 3: Best Practices & QnA",
      "E-certificate",
    ],
    terms:
      "Peserta wajib memiliki laptop/komputer dengan koneksi internet stabil. Link Zoom akan dikirimkan H-1 sebelum event melalui email. Recording akan tersedia selama 30 hari setelah event.",
    refundPolicy:
      "Pembatalan tiket dapat dilakukan maksimal 7 hari sebelum event dengan pengembalian 100%. Setelah itu, pengembalian hanya 50%.",
    mapEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=106.8000%2C-6.2000%2C106.8500%2C-6.1500&amp;layer=mapnik&amp;marker=-6.1750%2C106.8250",
    available: true,
    maxTickets: 2,
  },
  {
    id: "jakarta-jazz-festival",
    title: "Jakarta Jazz Festival 2026",
    category: "Konser",
    date: "15 Maret 2026",
    dateISO: "2026-03-15",
    time: "18.00 - 23.00",
    location: "Jiexpo Kemayoran",
    price: 450000,
    priceLabel: "Rp. 450.000",
    image: unsplash("photo-1511192336575-5a79af67a629"),
    description:
      "Festival jazz tahunan terbesar di Jakarta yang menampilkan musisi jazz kelas dunia. Nikmati malam penuh alunan jazz yang memukau di venue terbuka dengan suasana tropis.",
    lineup: ["Tompi", "Andien", "Kunto Aji", "Bali Lounge"],
    terms:
      "Event ini terbuka untuk semua usia. Anak di bawah 12 tahun wajib didampingi orang tua. Dilarang membawa makanan dari luar.",
    refundPolicy:
      "Tiket tidak dapat dikembalikan. Pengalihan tiket diperbolehkan maksimal 3 hari sebelum event.",
    mapEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=106.8500%2C-6.1550%2C106.8700%2C-6.1350&amp;layer=mapnik&amp;marker=-6.1450%2C106.8600",
    available: true,
    maxTickets: 4,
  },
  {
    id: "yoga-sunrise-session",
    title: "Yoga Sunrise Session",
    category: "Olahraga",
    date: "8 Februari 2026",
    dateISO: "2026-02-08",
    time: "05.30 - 07.00",
    location: "Pantai Ancol",
    price: 75000,
    priceLabel: "Rp. 75.000",
    image: unsplash("photo-1506126613408-eca07ce68773"),
    description:
      "Sesi yoga pagi di pinggir pantai dengan instruktur bersertifikat internasional. Cocok untuk pemula maupun yang sudah mahir. Sesi ditutup dengan healthy breakfast bersama.",
    lineup: [
      "Instruktur Bersertifikat RYT-500",
      "Mat Yoga Premium",
      "Healthy Breakfast",
      "Photo Session",
    ],
    terms:
      "Peserta berusia minimal 12 tahun. Anak di bawah 15 tahun wajib didampingi orang tua. Bawa pakaian ganti dan handuk pribadi.",
    refundPolicy:
      "Pembatalan maksimal 3 hari sebelum event dengan pengembalian 80%. Cuaca buruk bukan alasan refund.",
    mapEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=106.8300%2C-6.1300%2C106.8500%2C-6.1100&amp;layer=mapnik&amp;marker=-6.1200%2C106.8400",
    available: true,
    maxTickets: 1,
  },
  {
    id: "pameran-batik-nusantara",
    title: "Pameran Batik Nusantara",
    category: "Seni & Teater",
    date: "20 Februari 2026",
    dateISO: "2026-02-20",
    time: "10.00 - 20.00",
    location: "Museum Nasional",
    price: 25000,
    priceLabel: "Rp. 25.000",
    image: unsplash("photo-1582719471384-894fbb16e074"),
    description:
      "Pameran batik dari seluruh nusantara dengan koleksi lebih dari 200 kain batik antik dan modern. Dilengkapi dengan workshop membatik untuk anak-anak dan dewasa.",
    lineup: [
      "Galeri Batik Antik",
      "Workshop Membatik",
      "Fashion Show Batik Modern",
      "Talk Show: Sejarah Batik Indonesia",
    ],
    terms:
      "Anak di bawah 5 tahun gratis. Workshop membatik memiliki kuota terbatas per sesi. Pendaftaran workshop dapat dilakukan di tempat.",
    refundPolicy:
      "Tiket masuk dapat dikembalikan maksimal 2x24 jam setelah pembelian. Workshop tidak dapat di-refund.",
    mapEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=106.8250%2C-6.1850%2C106.8400%2C-6.1700&amp;layer=mapnik&amp;marker=-6.1775%2C106.8325",
    available: true,
    maxTickets: 3,
  },
  {
    id: "intro-to-blockchain",
    title: "Intro to Blockchain - Web3 Workshop",
    category: "Workshop",
    date: "14 Maret 2026",
    dateISO: "2026-03-14",
    time: "10.00 - 16.00",
    location: "Jakarta - SCBD",
    price: 250000,
    priceLabel: "Rp. 250.000",
    image: unsplash("photo-1639762681485-074b507681dd"),
    description:
      "Workshop hands-on untuk pengenalan blockchain, smart contract, dan pengembangan Web3. Peserta akan membangun DApp sederhana di akhir sesi.",
    lineup: [
      "Blockchain Fundamentals",
      "Solidity Smart Contract",
      "Build Your First DApp",
      "Web3 Career Path",
    ],
    terms:
      "Peserta wajib membawa laptop. Pengalaman coding dasar (JavaScript) direkomendasikan. Termasuk lunch dan coffee break.",
    refundPolicy:
      "Pembatalan maksimal 7 hari sebelum event dengan pengembalian 100%. Pengalihan tiket gratis hingga H-1.",
    mapEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=106.8050%2C-6.2300%2C106.8250%2C-6.2100&amp;layer=mapnik&amp;marker=-6.2200%2C106.8150",
    available: true,
    maxTickets: 1,
  },
  {
    id: "rock-festival-jogja",
    title: "Rock Festival Jogja",
    category: "Konser",
    date: "5 April 2026",
    dateISO: "2026-04-05",
    time: "16.00 - 23.00",
    location: "Jogja Expo Center",
    price: 300000,
    priceLabel: "Rp. 300.000",
    image: unsplash("photo-1501386761578-eac5c94b800a"),
    description:
      "Festival rock terbesar di Yogyakarta dengan line-up band rock legendaris Indonesia. Pengalaman rock yang tak terlupakan dengan sound system premium.",
    lineup: [
      "Slank",
      "Iwan Fals",
      "Dewa 19",
      "Kotak",
      "Andra & The Backbone",
    ],
    terms:
      "Event ini terbuka untuk semua usia. Anak di bawah 15 tahun wajib didampingi orang tua. Dilarang membawa senjata tajam, minuman keras, dan narkoba.",
    refundPolicy:
      "Tiket tidak dapat dikembalikan. Pengalihan tiket diperbolehkan maksimal 5 hari sebelum event dengan biaya Rp 30.000.",
    mapEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=110.3800%2C-7.8100%2C110.4200%2C-7.7700&amp;layer=mapnik&amp;marker=-7.7950%2C110.4000",
    available: true,
    maxTickets: 2,
  },
  {
    id: "fun-run-cowo-cowo",
    title: "Fun Run COWO COWO 5K",
    category: "Olahraga",
    date: "12 April 2026",
    dateISO: "2026-04-12",
    time: "06.00 - 09.00",
    location: "Senayan",
    price: 150000,
    priceLabel: "Rp. 150.000",
    image: unsplash("photo-1486218119243-13883505764c"),
    description:
      "Fun Run 5K dengan konsep car free day di area Sudirman. Dilengkapi dengan jersey eksklusif, race pack, dan medali finisher untuk semua peserta.",
    lineup: [
      "Race Jersey Eksklusif",
      "Medali Finisher",
      "Race Pack (BIB, Strap, Refreshment)",
      "Photo Booth",
    ],
    terms:
      "Peserta berusia minimal 10 tahun. Anak di bawah 12 tahun wajib didampingi orang tua. Disarankan membawa sepatu lari dan botol minum pribadi.",
    refundPolicy:
      "Pembatalan maksimal 10 hari sebelum event dengan pengembalian 75%. Pengalihan tiket gratis hingga H-3.",
    mapEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=106.8100%2C-6.2300%2C106.8350%2C-6.2050&amp;layer=mapnik&amp;marker=-6.2200%2C106.8225",
    available: true,
    maxTickets: 2,
  },
  {
    id: "teater-kita-bersama",
    title: "Teater Kita Bersama",
    category: "Seni & Teater",
    date: "22 April 2026",
    dateISO: "2026-04-22",
    time: "19.30 - 21.30",
    location: "Gedung Kesenian Jakarta",
    price: 100000,
    priceLabel: "Rp. 100.000",
    image: unsplash("photo-1503095396549-807759245b35"),
    description:
      "Pertunjukan teater kontemporer yang mengangkat kisah persahabatan dan kehidupan urban Jakarta. Dibawakan oleh komunitas teater independen ternama.",
    lineup: ["Koma Theater", "Sutradara: Ratna Riantiarno"],
    terms:
      "Pertunjukan terbuka untuk umum. Anak di bawah 7 tahun tidak diperkenankan masuk. Pintu dibuka 30 menit sebelum pertunjukan dimulai.",
    refundPolicy:
      "Tiket dapat dikembalikan maksimal 3 hari sebelum pertunjukan dengan potongan 20% biaya administrasi.",
    mapEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=106.8200%2C-6.1900%2C106.8400%2C-6.1700&amp;layer=mapnik&amp;marker=-6.1800%2C106.8300",
    available: true,
    maxTickets: 4,
  },
  {
    id: "intro-to-figma",
    title: "Intro to Figma - UI/UX for Beginners",
    category: "Workshop",
    date: "5 Mei 2026",
    dateISO: "2026-05-05",
    time: "10.00 - 15.00",
    location: "Bandung - Dago",
    price: 175000,
    priceLabel: "Rp. 175.000",
    image: unsplash("photo-1581291518857-4e27b48c24ef"),
    description:
      "Workshop UI/UX design dengan Figma untuk pemula. Peserta akan belajar fundamental design thinking, wireframing, dan prototyping interaktif.",
    lineup: [
      "Pengenalan UI/UX",
      "Design Thinking",
      "Wireframing dengan Figma",
      "Interactive Prototype",
    ],
    terms:
      "Peserta wajib membawa laptop dengan Figma terinstall (akun gratis cukup). Termasuk lunch dan snack. Sertifikat digital diberikan setelah workshop.",
    refundPolicy:
      "Pembatalan maksimal 5 hari sebelum workshop dengan pengembalian 100%. Pengalihan tiket gratis hingga H-1.",
    mapEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=107.6100%2C-6.8900%2C107.6400%2C-6.8600&amp;layer=mapnik&amp;marker=-6.8750%2C107.6250",
    available: true,
    maxTickets: 1,
  },
  {
    id: "baliem-valley-fest",
    title: "Baliem Valley Festival",
    category: "Konser",
    date: "10 Mei 2026",
    dateISO: "2026-05-10",
    time: "08.00 - 18.00",
    location: "Wamena, Papua",
    price: 0,
    priceLabel: "Gratis",
    image: unsplash("photo-1533174072545-7a4b6ad7a6c0"),
    description:
      "Festival budaya tahunan masyarakat Lembah Baliem Papua. Menampilkan tarian perang suku Dani, Lani, dan Yali, serta pasar tradisional dan kuliner lokal.",
    lineup: [
      "Tarian Perang Suku Dani",
      "Tarian Suku Lani",
      "Tarian Suku Yali",
      "Pasar Tradisional",
    ],
    terms:
      "Event terbuka untuk umum. Disarankan membawa pakaian hangat dan sepatu yang nyaman untuk medan berbukit.",
    refundPolicy:
      "Tiket gratis tidak memerlukan pengembalian dana. Event ini terbuka untuk umum tanpa registrasi.",
    mapEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=138.9300%2C-4.1300%2C138.9700%2C-4.0900&amp;layer=mapnik&amp;marker=-4.1100%2C138.9500",
    available: true,
    maxTickets: 1,
  },
  {
    id: "padel-tournament",
    title: "Jakarta Padel Tournament",
    category: "Olahraga",
    date: "17 Mei 2026",
    dateISO: "2026-05-17",
    time: "08.00 - 17.00",
    location: "Jakarta - Senopati",
    price: 500000,
    priceLabel: "Rp. 500.000",
    image: unsplash("photo-1554068865-24cecd4e34b8"),
    description:
      "Turnamen padel terbesar di Jakarta dengan kategori Men's, Women's, dan Mixed Doubles. Hadiah total puluhan juta rupiah untuk para pemenang.",
    lineup: [
      "Kategori Men's Doubles",
      "Kategori Women's Doubles",
      "Kategori Mixed Doubles",
      "Hadiah Total Rp 50.000.000",
    ],
    terms:
      "Peserta berusia minimal 18 tahun. Membawa raket sendiri (disediakan juga dengan biaya sewa Rp 50.000). Sudah memiliki pengalaman bermain padel minimal 6 bulan.",
    refundPolicy:
      "Pembatalan maksimal 14 hari sebelum event dengan potongan 30% biaya. Pengalihan tim diperbolehkan hingga H-3.",
    mapEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=106.8050%2C-6.2300%2C106.8200%2C-6.2150&amp;layer=mapnik&amp;marker=-6.2225%2C106.8125",
    available: true,
    maxTickets: 1,
  },
  {
    id: "festival-lampion",
    title: "Festival Lampion Nasional",
    category: "Seni & Teater",
    date: "20 Mei 2026",
    dateISO: "2026-05-20",
    time: "17.00 - 22.00",
    location: "Taman Mini Indonesia Indah",
    price: 50000,
    priceLabel: "Rp. 50.000",
    image: unsplash("photo-1572883454114-1cf0031ede2a"),
    description:
      "Festival lampion terbesar se-Asia Tenggara dengan lebih dari 10.000 lampion warna-warni. Dilengkapi dengan pertunjukan budaya dan kuliner nusantara.",
    lineup: [
      "10.000+ Lampion Hias",
      "Pertunjukan Barongsai",
      "Tarian Tradisional",
      "Bazaar UMKM",
    ],
    terms:
      "Anak di bawah 3 tahun gratis. Dilarang membawa korek api atau benda mudah terbakar. Tersedia area parkir luas.",
    refundPolicy:
      "Tiket tidak dapat dikembalikan. Pengalihan tiket gratis hingga H-1.",
    mapEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=106.8900%2C-6.3100%2C106.9100%2C-6.2900&amp;layer=mapnik&amp;marker=-6.3000%2C106.9000",
    available: true,
    maxTickets: 5,
  },
  {
    id: "data-science-bootcamp",
    title: "Data Science Bootcamp - Python",
    category: "Workshop",
    date: "7 Juni 2026",
    dateISO: "2026-06-07",
    time: "09.00 - 17.00",
    location: "Surabaya",
    price: 350000,
    priceLabel: "Rp. 350.000",
    image: unsplash("photo-1551288049-bebda4e38f71"),
    description:
      "Bootcamp intensif data science dengan Python selama 1 hari penuh. Cocok untuk profesional yang ingin pivot ke data science atau upgrade skill.",
    lineup: [
      "Python untuk Data Science",
      "Pandas & NumPy",
      "Data Visualization",
      "Mini Project: EDA",
    ],
    terms:
      "Peserta wajib membawa laptop. Termasuk lunch, coffee break, dan materi digital. Pengalaman Python dasar direkomendasikan.",
    refundPolicy:
      "Pembatalan maksimal 7 hari sebelum event dengan pengembalian 100%. Pengalihan tiket gratis hingga H-3.",
    mapEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=112.7300%2C-7.2900%2C112.7600%2C-7.2600&amp;layer=mapnik&amp;marker=-7.2750%2C112.7450",
    available: true,
    maxTickets: 1,
  },
  {
    id: "konser-enda",
    title: "Konser ENDA Onde-Onde",
    category: "Konser",
    date: "15 Juni 2026",
    dateISO: "2026-06-15",
    time: "19.00 - 22.00",
    location: "Surabaya - Ciputra World",
    price: 250000,
    priceLabel: "Rp. 250.000",
    image: unsplash("photo-1470229722913-7c0e2dbbafd3"),
    description:
      "Konser solo ENDA dengan konsep intimate performance. Lagu-lagu hits dari album terbaru akan dibawakan dengan aransemen khusus.",
    lineup: ["ENDA"],
    terms:
      "Event ini terbuka untuk semua usia. Anak di bawah 12 tahun wajib didampingi orang tua. Pintu dibuka 1 jam sebelum konser.",
    refundPolicy:
      "Tiket tidak dapat dikembalikan. Pengalihan tiket diperbolehkan dengan biaya administrasi Rp 25.000.",
    mapEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=112.7050%2C-7.2900%2C112.7300%2C-7.2650&amp;layer=mapnik&amp;marker=-7.2775%2C106.7175",
    available: true,
    maxTickets: 4,
  },
  {
    id: "surfing-class-beginner",
    title: "Surfing Class for Beginners",
    category: "Olahraga",
    date: "20 Juni 2026",
    dateISO: "2026-06-20",
    time: "07.00 - 11.00",
    location: "Pantai Kuta, Bali",
    price: 400000,
    priceLabel: "Rp. 400.000",
    image: unsplash("photo-1502680390469-be75c86b636f"),
    description:
      "Kelas surfing untuk pemula dengan instruktur bersertifikat internasional. Termasuk sewa papan dan rash guard. Cocok untuk liburan keluarga.",
    lineup: [
      "Instruktur Bersertifikat ISA",
      "Sewa Papan Surfing",
      "Rash Guard",
      "Foto di Air",
    ],
    terms:
      "Peserta berusia minimal 10 tahun. Anak di bawah 15 tahun wajib didampingi orang tua. Bisa berenang adalah syarat mutlak.",
    refundPolicy:
      "Pembatalan maksimal 5 hari sebelum event dengan potongan 30%. Cuaca buruk akan dijadwal ulang tanpa biaya.",
    mapEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=115.1600%2C-8.7300%2C115.1850%2C-6.7050&amp;layer=mapnik&amp;marker=-8.7200%2C115.1725",
    available: true,
    maxTickets: 1,
  },
  {
    id: "pameran-seni-kontemporer",
    title: "Pameran Seni Kontemporer",
    category: "Seni & Teater",
    date: "28 Juni 2026",
    dateISO: "2026-06-28",
    time: "11.00 - 19.00",
    location: "Galeri Nasional Indonesia",
    price: 35000,
    priceLabel: "Rp. 35.000",
    image: unsplash("photo-1531058020387-3be344556be6"),
    description:
      "Pameran seni kontemporer yang menampilkan 50+ karya dari seniman muda Indonesia. Medium campuran: instalasi, video art, dan seni digital.",
    lineup: [
      "Instalasi Media Campuran",
      "Video Art Installation",
      "Digital Art Exhibition",
      "Artist Talk Mingguan",
    ],
    terms:
      "Dilarang menyentuh karya seni. Flash photography tidak diperbolehkan. Disediakan tur berpemandu setiap Sabtu dan Minggu.",
    refundPolicy:
      "Tiket tidak dapat di-refund. Pengalihan tiket ke hari lain diperbolehkan gratis dengan konfirmasi H-1.",
    mapEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=106.8200%2C-6.1800%2C106.8400%2C-6.1600&amp;layer=mapnik&amp;marker=-6.1700%2C106.8300",
    available: true,
    maxTickets: 3,
  },
  {
    id: "react-advanced-workshop",
    title: "React Advanced - Performance & Patterns",
    category: "Workshop",
    date: "5 Juli 2026",
    dateISO: "2026-07-05",
    time: "09.00 - 16.00",
    location: "Jakarta - Kemang",
    price: 600000,
    priceLabel: "Rp. 600.000",
    image: unsplash("photo-1633356122544-a134099a8cdf"),
    description:
      "Workshop advanced React untuk profesional yang ingin mendalami performance optimization, custom hooks, dan design patterns. Termasuk code review session.",
    lineup: [
      "React Performance Optimization",
      "Custom Hooks & Patterns",
      "Server Components",
      "Code Review Session",
    ],
    terms:
      "Peserta wajib memiliki pengalaman minimal 1 tahun dengan React. Wajib membawa laptop dengan Node.js 18+ terinstall.",
    refundPolicy:
      "Pembatalan maksimal 10 hari sebelum event dengan potongan 20%. Pengalihan tiket gratis hingga H-3.",
    mapEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=106.8100%2C-6.2600%2C106.8350%2C-6.2350&amp;layer=mapnik&amp;marker=-6.2475%2C106.8225",
    available: true,
    maxTickets: 1,
  },
  {
    id: "konser-pesta-rakyat",
    title: "Konser Pesta Rakyat 2026",
    category: "Konser",
    date: "17 Agustus 2026",
    dateISO: "2026-08-17",
    time: "19.00 - 23.00",
    location: "Monas, Jakarta",
    price: 0,
    priceLabel: "Gratis",
    image: unsplash("photo-1493676304819-0d7a8d026dcf"),
    description:
      "Konser amal dalam rangka HUT RI ke-81. Menampilkan artis-artis ternama Indonesia dengan konsep open air di Monas. Tiket gratis namun registrasi wajib.",
    lineup: [
      "Iwan Fals",
      "Slank",
      "Padi Reborn",
      "Once Dewa",
      "Ari Lasso",
    ],
    terms:
      "Event terbuka untuk umum dengan registrasi online. Bawa identitas diri untuk verifikasi di pintu masuk. Dilarang membawa senjata tajam dan minuman keras.",
    refundPolicy:
      "Tiket gratis. Pembatalan dapat dilakukan kapan saja melalui dashboard tiket. Slot yang dibatalkan akan dibuka untuk umum.",
    mapEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=106.8200%2C-6.1800%2C106.8450%2C-6.1550&amp;layer=mapnik&amp;marker=-6.1750%2C106.8325",
    available: true,
    maxTickets: 2,
  },
  {
    id: "maraton-virtual-bandung",
    title: "Virtual Marathon Bandung 5K",
    category: "Olahraga",
    date: "1 - 7 September 2026",
    dateISO: "2026-09-01",
    time: "Fleksibel",
    location: "Dimana Saja",
    price: 120000,
    priceLabel: "Rp. 120.000",
    image: unsplash("photo-1502904550040-4f6c6f60b3f6"),
    description:
      "Marathon virtual yang bisa diselesaikan di mana saja dalam periode 1 minggu. Submit hasil lari via aplikasi dan dapatkan medali serta jersey eksklusif.",
    lineup: [
      "Jersey Eksklusif",
      "Medali Finisher",
      "BIB Number Unik",
      "Sertifikat Digital",
    ],
    terms:
      "Peserta berusia minimal 12 tahun. Wajib memiliki aplikasi tracking lari (Strava, Nike Run Club, dll). Jarak 5K harus diselesaikan dalam 1 minggu.",
    refundPolicy:
      "Tidak ada pengembalian dana setelah paket dikirimkan. Jersey dapat ditukar ukuran maksimal 3 hari setelah diterima.",
    mapEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=107.5700%2C-6.9500%2C107.6500%2C-6.8800&amp;layer=mapnik&amp;marker=-6.9175%2C107.6100",
    available: true,
    maxTickets: 2,
  },
  {
    id: "konser-musik-akustik",
    title: "Konser Musik Akustik Nusantara",
    category: "Konser",
    date: "12 September 2026",
    dateISO: "2026-09-12",
    time: "19.00 - 22.00",
    location: "Yogyakarta",
    price: 200000,
    priceLabel: "Rp. 200.000",
    image: unsplash("photo-1514525253161-7a46d19cd819"),
    description:
      "Konser akustik intimate yang menampilkan musisi indie Indonesia dalam suasana unplugged. Pengalaman mendengarkan musik yang lebih personal dan otentik.",
    lineup: [
      "Payung Teduh",
      "Sal Priadi",
      "Pamungkas",
      "Ardhito Pramono",
    ],
    terms:
      "Konser ini terbuka untuk semua usia. Anak di bawah 10 tahun wajib didampingi orang tua. Pintu dibuka 1 jam sebelum acara.",
    refundPolicy:
      "Tiket tidak dapat dikembalikan. Pengalihan tiket gratis hingga H-2.",
    mapEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=110.3500%2C-7.8200%2C110.3900%2C-7.7800&amp;layer=mapnik&amp;marker=-7.8000%2C110.3700",
    available: true,
    maxTickets: 4,
  },
  {
    id: "pameran-foto-jurnalistik",
    title: "Pameran Foto Jurnalistik Indonesia",
    category: "Seni & Teater",
    date: "20 September 2026",
    dateISO: "2026-09-20",
    time: "10.00 - 18.00",
    location: "Galeri Foto Jurnalistik Antara",
    price: 0,
    priceLabel: "Gratis",
    image: unsplash("photo-1542038784456-1ea8e935640e"),
    description:
      "Pameran foto jurnalistik yang menampilkan karya-karya terbaik dari fotografer Indonesia. Mengangkat tema sosial, budaya, dan lingkungan.",
    lineup: [
      "Foto Jurnalistik Sosial",
      "Foto Lingkungan",
      "Foto Budaya Nusantara",
      "Bedah Foto Mingguan",
    ],
    terms:
      "Event terbuka untuk umum. Dilarang menggunakan flash. Tersedia tur berpemandu gratis setiap hari Sabtu.",
    refundPolicy:
      "Tiket gratis. Tidak perlu registrasi. Datang langsung ke lokasi pada jam buka.",
    mapEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=106.8300%2C-6.2300%2C106.8550%2C-6.2050&amp;layer=mapnik&amp;marker=-6.2175%2C106.8425",
    available: true,
    maxTickets: 1,
  },
  {
    id: "intro-to-product-management",
    title: "Intro to Product Management",
    category: "Workshop",
    date: "26 September 2026",
    dateISO: "2026-09-26",
    time: "10.00 - 16.00",
    location: "Jakarta - SCBD",
    price: 300000,
    priceLabel: "Rp. 300.000",
    image: unsplash("photo-1552664730-d07ca5cf4ade"),
    description:
      "Workshop product management untuk profesional yang ingin beralih ke role PM atau startup founder. Termasuk framework dan case study real-world.",
    lineup: [
      "Product Discovery",
      "User Story Mapping",
      "Prioritization Framework",
      "Go-to-Market Strategy",
    ],
    terms:
      "Peserta wajib membawa laptop. Termasuk lunch, coffee break, dan template digital. Pengalaman kerja di tech/Startup direkomendasikan.",
    refundPolicy:
      "Pembatalan maksimal 7 hari sebelum event dengan pengembalian 100%. Pengalihan tiket gratis hingga H-1.",
    mapEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=106.8050%2C-6.2300%2C106.8250%2C-6.2100&amp;layer=mapnik&amp;marker=-6.2200%2C106.8150",
    available: true,
    maxTickets: 1,
  },
];

export function getEventById(id: string): Event | undefined {
  return EVENTS.find((e) => e.id === id);
}

export function getEventByCategory(category: string): Event[] {
  if (category === "Semua Event") return EVENTS;
  return EVENTS.filter((e) => e.category === category);
}
