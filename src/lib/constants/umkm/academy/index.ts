import { Workshop, Course } from "@/src/interface/umkm";

export const academyWorkshops: Workshop[] = [
  {
    id: 1,
    title: "Workshop: Strategi Pemasaran TikTok untuk UMKM",
    description:
      "Pelajari cara memanfaatkan TikTok untuk meningkatkan brand awareness dan penjualan produk Anda secara viral",
    instructor: "Dina Wijaya",
    date: "2026-03-22",
    time: "19:00 - 21:00",
    zoomLink: "https://zoom.us/j/123456789",
    capacity: 500,
    registered: 342,
    status: "upcoming",
    topics: [
      "Konten viral",
      "Strategi hashtag",
      "Kolaborasi influencer",
      "Analitik TikTok",
    ],
  },
  {
    id: 2,
    title: "Workshop: Packaging Design yang Menarik Konsumen",
    description:
      "Desain kemasan yang tepat dapat meningkatkan nilai jual produk Anda hingga 300%",
    instructor: "Reza Handoko",
    date: "2026-03-25",
    time: "15:00 - 17:00",
    zoomLink: "https://zoom.us/j/987654321",
    capacity: 300,
    registered: 156,
    status: "upcoming",
    topics: [
      "Psikologi warna",
      "Typography",
      "Material packaging",
      "Branding visual",
    ],
  },
  {
    id: 3,
    title: "Workshop: Ekspor Internasional untuk Pemula",
    description:
      "Langkah-langkah praktis untuk memulai bisnis ekspor ke pasar internasional",
    instructor: "Bambang Rianto",
    date: "2026-03-28",
    time: "10:00 - 12:00",
    zoomLink: "https://zoom.us/j/456789123",
    capacity: 250,
    registered: 89,
    status: "upcoming",
    topics: ["Regulasi ekspor", "Dokumentasi", "Logistik", "Payment gateway"],
  },
  {
    id: 4,
    title: "Workshop: Finansial Management untuk Bisnis Online",
    description:
      "Kelola keuangan bisnis Anda dengan lebih efisien dan menguntungkan",
    instructor: "Hendra Kusuma",
    date: "2026-03-20",
    time: "20:00 - 21:30",
    zoomLink: "https://zoom.us/j/789123456",
    capacity: 400,
    registered: 287,
    status: "ongoing",
    topics: ["Laporan keuangan", "Margin keuntungan", "Cashflow", "Pajak UMKM"],
  },
];

export const academyCourses: Course[] = [
  {
    id: 1,
    title: "Dasar-Dasar E-Commerce",
    description:
      "Pelajari fundamental dalam memulai bisnis online dengan platform JOSJIS",
    instructor: "Budi Santoso",
    duration: "2 minggu",
    level: "beginner",
    progress: 100,
    isCompleted: true,
    icon: "BookOpen",
  },
  {
    id: 2,
    title: "Strategi Marketing Digital",
    description:
      "Tingkatkan penjualan dengan strategi marketing yang efektif di era digital",
    instructor: "Sita Dewi",
    duration: "3 minggu",
    level: "intermediate",
    progress: 65,
    icon: "Video",
  },
  {
    id: 3,
    title: "Optimasi Produk & SEO",
    description: "Buat produk Anda mudah ditemukan dengan teknik SEO terbaik",
    instructor: "Ahmad Rizki",
    duration: "2.5 minggu",
    level: "intermediate",
    progress: 40,
    icon: "BookOpen",
  },
  {
    id: 4,
    title: "Manajemen Customer Relationship",
    description:
      "Kelola hubungan dengan pelanggan untuk meningkatkan loyalitas dan repeat order",
    instructor: "Rini Kusuma",
    duration: "2 minggu",
    level: "beginner",
    icon: "Video",
  },
  {
    id: 5,
    title: "Analitik & Data Driven Decision",
    description:
      "Manfaatkan data untuk membuat keputusan bisnis yang lebih baik",
    instructor: "Bambang Hermanto",
    duration: "3 minggu",
    level: "advanced",
    icon: "BookOpen",
  },
  {
    id: 6,
    title: "Packaging & Branding",
    description:
      "Ciptakan brand identity yang kuat melalui packaging yang menarik",
    instructor: "Tia Wijaya",
    duration: "2.5 minggu",
    level: "intermediate",
    icon: "Video",
  },
];
