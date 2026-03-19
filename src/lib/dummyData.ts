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
}

export type UmkmApprovalStatus = "pending" | "approved" | "rejected"

export type UmkmRecord = {
  id: Id
  name: string
  ownerName: string
  productCount: number
  rating: number
  totalSales: number
  approvalStatus: UmkmApprovalStatus
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
}

export type ReportStatus = "pending" | "processing" | "done"

export type ReportRecord = {
  id: Id
  title: string
  userName: string
  category: "produk" | "pengiriman" | "refund" | "lainnya"
  status: ReportStatus
  createdAt: string // ISO
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
  date: string // ISO
  participants: number
  xpReward: number
  certificationApproved: boolean
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
  },
  {
    id: "USR-002",
    name: "Citra Nuraini",
    email: "citra.nuraini@mail.com",
    role: "user",
    status: "active",
    createdAt: isoDaysAgo(92),
    lastLoginAt: isoDaysAgo(1),
  },
  {
    id: "USR-003",
    name: "Sarah Wijaya",
    email: "sarah.wijaya@mail.com",
    role: "user",
    status: "suspended",
    createdAt: isoDaysAgo(30),
    lastLoginAt: isoDaysAgo(12),
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
  },
]

export const dummyUmkm: UmkmRecord[] = [
  {
    id: "UMKM-001",
    name: "Toko Kue Lapis Bogor",
    ownerName: "Ahmad Susanto",
    productCount: 24,
    rating: 4.8,
    totalSales: 152340000,
    approvalStatus: "pending",
    createdAt: isoDaysAgo(2),
  },
  {
    id: "UMKM-002",
    name: "Asinan Segar Bu Eni",
    ownerName: "Eni Rahayu",
    productCount: 12,
    rating: 4.6,
    totalSales: 78320000,
    approvalStatus: "pending",
    createdAt: isoDaysAgo(1),
  },
  {
    id: "UMKM-003",
    name: "Kerajinan Bambu Khas",
    ownerName: "Bambang Wijaya",
    productCount: 36,
    rating: 4.9,
    totalSales: 223900000,
    approvalStatus: "approved",
    createdAt: isoDaysAgo(45),
  },
  {
    id: "UMKM-004",
    name: "Roti Unyil Venus",
    ownerName: "Nita Lestari",
    productCount: 18,
    rating: 4.7,
    totalSales: 189450000,
    approvalStatus: "approved",
    createdAt: isoDaysAgo(80),
  },
  {
    id: "UMKM-005",
    name: "Keripik Talas Spicy",
    ownerName: "Dimas Saputra",
    productCount: 9,
    rating: 4.2,
    totalSales: 31200000,
    approvalStatus: "rejected",
    createdAt: isoDaysAgo(7),
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
  },
  {
    id: "TRX-10002",
    userName: "Citra Nuraini",
    userEmail: "citra.nuraini@mail.com",
    total: 145000,
    status: "pending",
    createdAt: isoDaysAgo(0),
  },
  {
    id: "TRX-10003",
    userName: "Sarah Wijaya",
    userEmail: "sarah.wijaya@mail.com",
    total: 28000,
    status: "failed",
    createdAt: isoDaysAgo(1),
  },
  {
    id: "TRX-10004",
    userName: "Budi Santoso",
    userEmail: "budi.santoso@mail.com",
    total: 99000,
    status: "success",
    createdAt: isoDaysAgo(2),
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
  },
  {
    id: "RPT-002",
    title: "Pengiriman terlambat 3 hari",
    userName: "Budi Santoso",
    category: "pengiriman",
    status: "processing",
    createdAt: isoDaysAgo(1),
  },
  {
    id: "RPT-003",
    title: "Request refund belum diproses",
    userName: "Citra Nuraini",
    category: "refund",
    status: "done",
    createdAt: isoDaysAgo(4),
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
    title: "Cara Meningkatkan Penjualan di Marketplace SADAYA",
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
    date: isoDaysAgo(7),
    participants: 128,
    xpReward: 50,
    certificationApproved: true,
  },
  {
    id: "WBN-002",
    title: "Optimasi Listing: Judul, Kata Kunci, dan Deskripsi",
    date: isoDaysAgo(2),
    participants: 96,
    xpReward: 40,
    certificationApproved: false,
  },
  {
    id: "WBN-003",
    title: "Manajemen Keuangan UMKM: Cashflow Sederhana",
    date: isoDaysAgo(14),
    participants: 210,
    xpReward: 60,
    certificationApproved: true,
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

export const dummyTransactionTrends: AnalyticsPoint[] = [
  { label: "W1", value: 90 },
  { label: "W2", value: 130 },
  { label: "W3", value: 150 },
  { label: "W4", value: 210 },
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

