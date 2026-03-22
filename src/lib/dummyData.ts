export type Id = string

export type UserRole = "user" | "umkm" | "driver" | "admin"

export type UserStatus = "active" | "suspended"

export type UserRecord = {
  id: Id
  name: string
  email: string
  role: Exclude<UserRole, "admin">
  status: UserStatus
  createdAt: string // ISO
  lastLoginAt: string // ISO

  // Optional fields for admin "Detail" view (driver currently)
  phone?: string
  address?: string
  vehicleType?: string
  licenseNumber?: string
  ktpUrl?: string
  driverLicenseUrl?: string
  otherDocumentUrls?: string[]
  approvalStatus?: "pending" | "approved" | "rejected"
  rejectionReason?: string
}

export type UmkmApprovalStatus = "pending" | "approved" | "rejected"

export type UmkmRecord = {
  id: Id
  name: string
  ownerName: string
  email: string
  phone: string
  address: string
  productCount: number
  rating: number
  totalSales: number
  approvalStatus: UmkmApprovalStatus

  // Business info for admin "Detail" view
  productType: string
  description: string
  category: string

  // Supporting documents (dummy URLs)
  ktpUrl: string
  businessLicenseUrl: string
  otherDocumentUrls: string[]

  createdAt: string // ISO
}

export type TransactionStatus = "pending" | "success" | "failed"

export type TransactionRecord = {
  id: Id
  userName: string
  userEmail: string
  total: number
  status: TransactionStatus
  createdAt: string // ISO
  items?: { name: string; qty: number; price: number }[]
  umkmName?: string
  driverName?: string
  paymentMethod?: string
  failedReason?: string
}

export type ReportStatus = "pending" | "processing" | "done"

export type ReportRecord = {
  id: Id
  title: string
  userName: string
  category: "produk" | "pengiriman" | "refund" | "lainnya"
  status: ReportStatus
  createdAt: string // ISO
  description?: string
  adminReply?: string
}

export type ArticleStatus = "draft" | "published"

export type ArticleRecord = {
  id: Id
  title: string
  content: string
  status: ArticleStatus
  imageUrl?: string
  updatedAt: string // ISO
}

export type LeaderboardRecord = {
  id: Id
  username: string
  points: number
  level: "Newbie" | "Amateur" | "Pro"
}

export type AiUsageLog = {
  id: Id
  userName: string
  feature: "ai-generator" | "recommendation" | "chat-cs"
  query: string
  createdAt: string // ISO
}

export type AcademyWebinar = {
  id: Id
  title: string
  speaker: string
  description: string
  date: string // ISO
  time: string
  quota: number
  remainingSeats: number
}

export type AcademyVideo = {
  id: Id
  title: string
  thumbnailUrl: string
  durationMinutes: number
}

export type AnalyticsPoint = { label: string; value: number }

const now = new Date()
const isoDaysAgo = (daysAgo: number) =>
  new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000).toISOString()

export const dummyUsers: UserRecord[] = [
  {
    id: "USR-001",
    name: "Budi Santoso",
    email: "budi.santoso@mail.com",
    role: "user",
    status: "active",
    createdAt: isoDaysAgo(180),
    lastLoginAt: isoDaysAgo(0),
    phone: "+62812-7777-8888",
    address: "Perumahan Budi Asri, Blok C4 No. 12, Bogor",
  },
  {
    id: "USR-002",
    name: "Citra Nuraini",
    email: "citra.nuraini@mail.com",
    role: "user",
    status: "active",
    createdAt: isoDaysAgo(92),
    lastLoginAt: isoDaysAgo(1),
    phone: "+62813-5555-1234",
    address: "Jl. Merpati Putih No. 5, Bogor Selatan",
  },
  {
    id: "USR-003",
    name: "Sarah Wijaya",
    email: "sarah.wijaya@mail.com",
    role: "user",
    status: "suspended",
    createdAt: isoDaysAgo(30),
    lastLoginAt: isoDaysAgo(12),
    phone: "+62857-9999-0000",
    address: "Apartemen Sentul Indah, Unit 12B, Bogor Raya",
  },
  {
    id: "UMKM-USER-001",
    name: "Ahmad Susanto",
    email: "ahmad.susanto@umkm.com",
    role: "umkm",
    status: "active",
    createdAt: isoDaysAgo(210),
    lastLoginAt: isoDaysAgo(0),
  },
  {
    id: "DRV-001",
    name: "Rizky Pratama",
    email: "rizky.driver@josjis.com",
    role: "driver",
    status: "active",
    createdAt: isoDaysAgo(120),
    lastLoginAt: isoDaysAgo(2),
    phone: "+62812-7777-8888",
    address: "Jl. Merdeka No. 99, Bogor",
    vehicleType: "Motor (Matic)",
    licenseNumber: "SIM A-1234567",
    ktpUrl: "/images/dummy/ktp-driver-1.jpg",
    driverLicenseUrl: "/images/dummy/sim-driver-1.jpg",
    otherDocumentUrls: [
      "/images/dummy/helm-driver-1.jpg",
      "/images/dummy/bpkb-driver-1.jpg",
    ],
    approvalStatus: "approved",
  },
  {
    id: "DRV-002",
    name: "Agus Kurniawan",
    email: "agus.kurniawan@mail.com",
    role: "driver",
    status: "active",
    createdAt: isoDaysAgo(1),
    lastLoginAt: isoDaysAgo(0),
    phone: "+62811-2222-3333",
    address: "Jl. Pemuda No. 12, Cibinong",
    vehicleType: "Mobil (Pick-up)",
    licenseNumber: "SIM B-8765432",
    approvalStatus: "pending",
  },
  {
    id: "DRV-003",
    name: "Bambang Supriyadi",
    email: "bambang.sup@mail.com",
    role: "driver",
    status: "suspended",
    createdAt: isoDaysAgo(5),
    lastLoginAt: isoDaysAgo(5),
    phone: "+62822-4444-5555",
    address: "Jl. Veteran No. 45, Sentul",
    vehicleType: "Motor (Manual)",
    licenseNumber: "SIM C-1122334",
    approvalStatus: "rejected",
    rejectionReason: "Foto KTP sangat buram tidak dapat terbaca, dan foto STNK tidak menampakkan masa berlaku.",
  },
]

export const dummyUmkm: UmkmRecord[] = [
  {
    id: "UMKM-001",
    name: "Toko Kue Lapis Bogor",
    ownerName: "Ahmad Susanto",
    email: "ahmad.susanto@umkm.com",
    phone: "+62812-1234-5678",
    address: "Jl. Pajajaran No. 10, Bogor",
    productType: "Kuliner Lokal",
    description:
      "Kue lapis handmade dengan resep warisan keluarga, topping variatif, dan kemasan khusus travel yang cocok untuk oleh-oleh langsung.",
    category: "Makanan",
    ktpUrl: "/images/dummy/ktp-umkm-1.jpg",
    businessLicenseUrl: "/images/dummy/izin-umkm-1.jpg",
    otherDocumentUrls: [
      "/images/dummy/produk-umkm-1.jpg",
      "/images/dummy/sertifikat-umkm-1.jpg",
    ],
    productCount: 24,
    rating: 4.8,
    totalSales: 152340000,
    approvalStatus: "approved",
    createdAt: isoDaysAgo(152),
  },
  {
    id: "UMKM-002",
    name: "Batik Trusmi Bogor",
    ownerName: "Ratna Sari",
    email: "ratna.batik@umkm.com",
    phone: "+62813-2222-3344",
    address: "Jl. Raya Tajur No. 21, Bogor",
    productType: "Pakaian Tradisional",
    description:
      "Desain batik khas motif daun talas dan kujang. Menjual kemeja, kebaya, kain panjang, hingga setelan modern.",
    category: "Pakaian",
    ktpUrl: "/images/dummy/ktp-umkm-2.jpg",
    businessLicenseUrl: "/images/dummy/izin-umkm-2.jpg",
    otherDocumentUrls: ["/images/dummy/produk-umkm-2.jpg"],
    productCount: 85,
    rating: 4.9,
    totalSales: 410320000,
    approvalStatus: "approved",
    createdAt: isoDaysAgo(300),
  },
  {
    id: "UMKM-003",
    name: "Kerajinan Bambu Khas",
    ownerName: "Bambang Wijaya",
    email: "bambang.wijaya@umkm.com",
    phone: "+62811-9876-5432",
    address: "Jl. Puncak Km. 5, Cisarua",
    productType: "Anyaman Bambu",
    description:
      "Produk anyaman bambu premium dengan finishing halus dan bahan bambu pilihan untuk daya tahan tinggi.",
    category: "Kerajinan",
    ktpUrl: "/images/dummy/ktp-umkm-3.jpg",
    businessLicenseUrl: "/images/dummy/izin-umkm-3.jpg",
    otherDocumentUrls: ["/images/dummy/produk-umkm-3.jpg"],
    productCount: 36,
    rating: 4.9,
    totalSales: 223900000,
    approvalStatus: "approved",
    createdAt: isoDaysAgo(45),
  },
  {
    id: "UMKM-004",
    name: "Jasa Cuci Karpet Bintang",
    ownerName: "Dedi Supardi",
    email: "dedi.clean@umkm.com",
    phone: "+62814-4444-1212",
    address: "Jl. Kedung Halang No. 7, Bogor Utara",
    productType: "Layanan Kebersihan",
    description:
      "Servis cuci karpet, sofa, dan matras untuk rumah dan perkantoran. Dijemput dan diantar kembali dengan garansi wangi.",
    category: "Jasa",
    ktpUrl: "/images/dummy/ktp-umkm-4.jpg",
    businessLicenseUrl: "/images/dummy/izin-umkm-4.jpg",
    otherDocumentUrls: ["/images/dummy/produk-umkm-4.jpg"],
    productCount: 12,
    rating: 4.7,
    totalSales: 89450000,
    approvalStatus: "approved",
    createdAt: isoDaysAgo(80),
  },
  {
    id: "UMKM-005",
    name: "Asinan Segar Bu Eni",
    ownerName: "Eni Rahayu",
    email: "eni.rahayu@umkm.com",
    phone: "+62815-5555-9898",
    address: "Jl. Binamarga No. 3, Bogor",
    productType: "Kuliner",
    description:
      "Asinan bogor racikan kuno. Kuah medok pedas manis, buah dan sayur segar pilihan dari petani lokal parung.",
    category: "Makanan",
    ktpUrl: "/images/dummy/ktp-umkm-5.jpg",
    businessLicenseUrl: "/images/dummy/izin-umkm-5.jpg",
    otherDocumentUrls: ["/images/dummy/produk-umkm-5.jpg"],
    productCount: 9,
    rating: 4.6,
    totalSales: 131200000,
    approvalStatus: "approved",
    createdAt: isoDaysAgo(120),
  },
  {
    id: "UMKM-006",
    name: "Distro Kaos Josjis Sunda",
    ownerName: "Iqbal Ramadhan",
    email: "iqbal.distro@umkm.com",
    phone: "+62858-9999-7777",
    address: "Ruko Pandu Raya, Bogor Utara",
    productType: "Apparel Muda",
    description:
      "Brand clothing distro lokal dengan grafis estetik kultur sunda. Katun premium.",
    category: "Pakaian",
    ktpUrl: "/images/dummy/ktp-umkm-6.jpg",
    businessLicenseUrl: "/images/dummy/izin-umkm-6.jpg",
    otherDocumentUrls: [],
    productCount: 45,
    rating: 4.8,
    totalSales: 275000000,
    approvalStatus: "approved",
    createdAt: isoDaysAgo(210),
  },
  {
    id: "UMKM-007",
    name: "Warung Kopi Nako",
    ownerName: "Reza Pahlevi",
    email: "reza.kopi@umkm.com",
    phone: "+62816-1111-2222",
    address: "Jl. Pajajaran No. 34, Bogor",
    productType: "Kopi & Minuman",
    description: "Kedai kopi estetik dan minuman kekinian dengan ruang semi-outdoor.",
    category: "Makanan",
    ktpUrl: "/images/dummy/ktp-umkm-1.jpg",
    businessLicenseUrl: "/images/dummy/izin-umkm-2.jpg",
    otherDocumentUrls: [],
    productCount: 15,
    rating: 0,
    totalSales: 0,
    approvalStatus: "pending",
    createdAt: isoDaysAgo(1),
  },
  {
    id: "UMKM-008",
    name: "Bengkel AC & Dinamo Tono",
    ownerName: "Tono Mulyadi",
    email: "tono.servis@umkm.com",
    phone: "+62817-3333-4444",
    address: "Jl. Tajur Indah No 14, Bogor",
    productType: "Perbaikan Mekanik Eletronik",
    description: "Reparasi khusus AC mobil, dinamo, dan kelistrikan mobil dengan garansi.",
    category: "Jasa",
    ktpUrl: "/images/dummy/ktp-umkm-3.jpg",
    businessLicenseUrl: "/images/dummy/izin-umkm-3.jpg",
    otherDocumentUrls: [],
    productCount: 8,
    rating: 0,
    totalSales: 0,
    approvalStatus: "pending",
    createdAt: isoDaysAgo(2),
  },
  {
    id: "UMKM-009",
    name: "Toko Aksesoris Kayu",
    ownerName: "Siti Aminah",
    email: "siti.kayu@umkm.com",
    phone: "+62818-5555-6666",
    address: "Pusat Kerajinan Dekranasda Bogor",
    productType: "Gantungan Kunci & Pajangan",
    description: "Aksesoris berbahan dasar limbah kayu yang didaur ulang menjadi cinderamata unik.",
    category: "Kerajinan",
    ktpUrl: "/images/dummy/ktp-umkm-5.jpg",
    businessLicenseUrl: "/images/dummy/izin-umkm-5.jpg",
    otherDocumentUrls: [],
    productCount: 22,
    rating: 0,
    totalSales: 0,
    approvalStatus: "rejected",
    createdAt: isoDaysAgo(5),
  },
]

export const dummyTransactions: TransactionRecord[] = [
  {
    id: "TRX-10001",
    userName: "Budi Santoso",
    userEmail: "budi.santoso@mail.com",
    total: 85000,
    status: "success",
    createdAt: isoDaysAgo(0),
    items: [
      { name: "Lapis Talas Premium", qty: 1, price: 55000 },
      { name: "Ongkos Kirim", qty: 1, price: 25000 },
      { name: "Biaya Layanan", qty: 1, price: 5000 },
    ],
    umkmName: "Toko Kue Lapis Bogor",
    driverName: "Rizky Pratama",
    paymentMethod: "QRIS",
  },
  {
    id: "TRX-10002",
    userName: "Citra Nuraini",
    userEmail: "citra.nuraini@mail.com",
    total: 145000,
    status: "pending",
    createdAt: isoDaysAgo(0),
    items: [
      { name: "Roti Unyil Mix Box", qty: 2, price: 60000 },
      { name: "Ongkos Kirim", qty: 1, price: 20000 },
      { name: "Biaya Layanan", qty: 1, price: 5000 },
    ],
    umkmName: "Roti Unyil Venus",
    driverName: "Menunggu Driver...",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "TRX-10003",
    userName: "Sarah Wijaya",
    userEmail: "sarah.wijaya@mail.com",
    total: 28000,
    status: "failed",
    createdAt: isoDaysAgo(1),
    items: [
      { name: "Keripik Talas Spicy", qty: 1, price: 18000 },
      { name: "Ongkos Kirim", qty: 1, price: 10000 },
    ],
    umkmName: "Keripik Talas Spicy",
    driverName: "Dibatalkan",
    paymentMethod: "E-Wallet (GoPay)",
    failedReason: "Dibatalkan otomatis oleh sistem karena gerai UMKM tutup mendadak saat driver dalam perjalanan.",
  },
  {
    id: "TRX-10004",
    userName: "Budi Santoso",
    userEmail: "budi.santoso@mail.com",
    total: 99000,
    status: "success",
    createdAt: isoDaysAgo(2),
    items: [
      { name: "Asinan Buah Segar", qty: 2, price: 40000 },
      { name: "Ongkos Kirim", qty: 1, price: 15000 },
      { name: "Biaya Layanan", qty: 1, price: 4000 },
    ],
    umkmName: "Asinan Segar Bu Eni",
    driverName: "Agus Kurniawan",
    paymentMethod: "QRIS",
  },
]

export const dummyReports: ReportRecord[] = [
  {
    id: "RPT-001",
    title: "Produk tidak sesuai deskripsi",
    userName: "Sarah Wijaya",
    category: "produk",
    status: "pending",
    createdAt: isoDaysAgo(0),
    description: "Halo min, saya baru pesan produk Lapis Bogor kemasan isi 4, tapi yang sampai ternyata isi 2. Tolong bantu penyelesaiannya karena ini pesanan untuk acara besok.",
  },
  {
    id: "RPT-002",
    title: "Pengiriman terlambat 3 hari",
    userName: "Budi Santoso",
    category: "pengiriman",
    status: "processing",
    createdAt: isoDaysAgo(1),
    description: "Pesanan saya sudah statusnya 'Dikirim' dari 3 hari yang lalu tapi resi tidak berubah posisinya. Mohon dibantu tanyakan ke pihak ekspedisi terkait kendalanya.",
    adminReply: "Mohon maaf atas keterlambatannya Bapak Budi. Kami sedang investigasi ke pihak kurir ekspedisi, tunggu update dari kami maksimal 1x24 jam ya.",
  },
  {
    id: "RPT-003",
    title: "Request refund belum diproses",
    userName: "Citra Nuraini",
    category: "refund",
    status: "done",
    createdAt: isoDaysAgo(4),
    description: "Uang pembatalan pembelanjaan saya dari minggu lalu belum masuk kembali ke limit rekening. Bagaimana status ganti ruginya ya min?",
    adminReply: "Dana refund Anda senilai Rp. 145.000 sudah kami proses pengembaliannya ke rekening tujuan kemarin sore melalui sistem pencairan bank. Mohon cek mutasi rekening Anda, dan apabila masih belum masuk kabari kami. Terima kasih.",
  },
]

export const dummyLeaderboard: LeaderboardRecord[] = [
  { id: "LB-001", username: "budi_s", points: 3250, level: "Pro" },
  { id: "LB-002", username: "citra_n", points: 1840, level: "Amateur" },
  { id: "LB-003", username: "sarah_w", points: 720, level: "Newbie" },
  { id: "LB-004", username: "ahmad_umkm", points: 2690, level: "Pro" },
]

export const dummyArticles: ArticleRecord[] = [
  {
    id: "ART-001",
    title: "Tips Packaging Produk UMKM Agar Aman di Pengiriman",
    content:
      "Packaging yang baik menurunkan risiko komplain. Mulai dari material, sealing, hingga label fragile.",
    status: "published",
    imageUrl: "/images/dummy/article-1.jpg",
    updatedAt: isoDaysAgo(3),
  },
  {
    id: "ART-002",
    title: "Cara Meningkatkan Penjualan di Marketplace JOSJIS",
    content:
      "Optimasi foto, judul, dan deskripsi. Gunakan promo terjadwal, dan respon chat cepat untuk conversion lebih tinggi.",
    status: "draft",
    imageUrl: "/images/dummy/article-2.jpg",
    updatedAt: isoDaysAgo(1),
  },
]

export const dummyAiLogs: AiUsageLog[] = [
  {
    id: "AI-001",
    userName: "Kerajinan Bambu Khas",
    feature: "ai-generator",
    query: "Buat deskripsi produk anyaman bambu yang premium dan ramah lingkungan",
    createdAt: isoDaysAgo(0),
  },
  {
    id: "AI-002",
    userName: "Roti Unyil Venus",
    feature: "recommendation",
    query: "Rekomendasi produk untuk pembeli yang suka makanan manis",
    createdAt: isoDaysAgo(0),
  },
  {
    id: "AI-003",
    userName: "Budi Santoso",
    feature: "chat-cs",
    query: "Bagaimana cara klaim voucher mystery box?",
    createdAt: isoDaysAgo(2),
  },
  {
    id: "AI-004",
    userName: "Asinan Segar Bu Eni",
    feature: "ai-generator",
    query: "Judul promosi untuk asinan bogor segar, tone fun",
    createdAt: isoDaysAgo(3),
  },
]

export const dummyAcademy: AcademyWebinar[] = [
  {
    id: "WBN-001",
    title: "Foto Produk yang Menjual (Praktik)",
    speaker: "Maya Kurnia",
    description:
      "Workshop praktik fotografi produk untuk meningkatkan conversion. Fokus pencahayaan, komposisi, dan editing sederhana.",
    date: isoDaysAgo(7),
    time: "10:00",
    quota: 150,
    remainingSeats: 42,
  },
  {
    id: "WBN-002",
    title: "Optimasi Listing: Judul, Kata Kunci, dan Deskripsi",
    speaker: "Rangga Wijaya",
    description:
      "Workshop SEO listing marketplace: cara menyusun judul, memilih kata kunci, dan menulis deskripsi yang informatif.",
    date: isoDaysAgo(2),
    time: "13:30",
    quota: 120,
    remainingSeats: 18,
  },
  {
    id: "WBN-003",
    title: "Manajemen Keuangan UMKM: Cashflow Sederhana",
    speaker: "Siska Ramadhani",
    description:
      "Workshop cashflow untuk UMKM: menyusun arus kas, memisahkan pengeluaran, dan membuat proyeksi sederhana.",
    date: isoDaysAgo(14),
    time: "09:15",
    quota: 200,
    remainingSeats: 73,
  },
]

export const dummyAcademyVideos: AcademyVideo[] = [
  {
    id: "VID-001",
    title: "Belajar Menulis Deskripsi Produk yang Menjual",
    thumbnailUrl: "/images/dummy/video-1.jpg",
    durationMinutes: 18,
  },
  {
    id: "VID-002",
    title: "Tips Foto Produk untuk Marketplace",
    thumbnailUrl: "/images/dummy/video-2.jpg",
    durationMinutes: 12,
  },
]

export const dummySalesSeries: AnalyticsPoint[] = [
  { label: "Jan", value: 120 },
  { label: "Feb", value: 180 },
  { label: "Mar", value: 240 },
  { label: "Apr", value: 200 },
  { label: "May", value: 310 },
  { label: "Jun", value: 380 },
]

export const dummyMonthlyGrowth = [
  { label: "Jan", users: 120, umkm: 15, drivers: 30 },
  { label: "Feb", users: 180, umkm: 25, drivers: 45 },
  { label: "Mar", users: 240, umkm: 35, drivers: 60 },
  { label: "Apr", users: 300, umkm: 40, drivers: 75 },
  { label: "May", users: 380, umkm: 55, drivers: 90 },
  { label: "Jun", users: 450, umkm: 70, drivers: 105 },
  { label: "Jul", users: 510, umkm: 85, drivers: 120 },
  { label: "Aug", users: 600, umkm: 100, drivers: 150 },
  { label: "Sep", users: 680, umkm: 120, drivers: 180 },
  { label: "Oct", users: 750, umkm: 140, drivers: 210 },
  { label: "Nov", users: 840, umkm: 165, drivers: 240 },
  { label: "Dec", users: 950, umkm: 200, drivers: 280 },
]

export const dummyUserGrowth: AnalyticsPoint[] = [
  { label: "W1", value: 40 },
  { label: "W2", value: 65 },
  { label: "W3", value: 80 },
  { label: "W4", value: 120 },
]

export const dummyUmkmGrowth: AnalyticsPoint[] = [
  { label: "W1", value: 8 },
  { label: "W2", value: 10 },
  { label: "W3", value: 14 },
  { label: "W4", value: 17 },
]

export const dummyDriverGrowth: AnalyticsPoint[] = [
  { label: "W1", value: 10 },
  { label: "W2", value: 15 },
  { label: "W3", value: 25 },
  { label: "W4", value: 40 },
]

export const dummyTransactionTrends: AnalyticsPoint[] = [
  { label: "Jan", value: 1250 },
  { label: "Feb", value: 1480 },
  { label: "Mar", value: 1750 },
  { label: "Apr", value: 2100 },
  { label: "May", value: 2500 },
  { label: "Jun", value: 2900 },
  { label: "Jul", value: 3200 },
  { label: "Aug", value: 3600 },
  { label: "Sep", value: 4100 },
  { label: "Oct", value: 4800 },
  { label: "Nov", value: 5500 },
  { label: "Dec", value: 6200 },
]

export const dummyTopUmkm = [
  { id: "UMKM-003", name: "Kerajinan Bambu Khas", sales: 223900000, trend: "+12%" },
  { id: "UMKM-004", name: "Roti Unyil Venus", sales: 189450000, trend: "+8%" },
  { id: "UMKM-001", name: "Toko Kue Lapis Bogor", sales: 152340000, trend: "+5%" },
]

export const dummyTopProducts = [
  { id: "PRD-001", name: "Anyaman Bambu Premium", umkm: "Kerajinan Bambu Khas", sold: 1240 },
  { id: "PRD-002", name: "Roti Unyil Mix Box", umkm: "Roti Unyil Venus", sold: 980 },
  { id: "PRD-003", name: "Lapis Talas Premium", umkm: "Toko Kue Lapis Bogor", sold: 870 },
]

