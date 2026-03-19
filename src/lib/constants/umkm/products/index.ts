import { Product } from "@/src/interface/umkm";

export const CATEGORIES = [
  { id: "makanan", label: "🍜 Makanan" },
  { id: "minuman", label: "🥤 Minuman" },
  { id: "cemilan", label: "🍪 Cemilan" },
  { id: "baju", label: "👕 Baju" },
  { id: "celana", label: "👖 Celana" },
  { id: "aksesoris", label: "⌚ Aksesoris" },
  { id: "elektronik", label: "📱 Elektronik" },
  { id: "jasa", label: "🛠️ Jasa" },
];

export const dummyProducts: Product[] = [
  // Makanan
  {
    id: 1,
    name: "Dodol Kacang Bogor",
    description:
      "Dodol tradisional dengan rasa kacang yang nikmat dan bertahan lama",
    price: 45000,
    image: "https://via.placeholder.com/300x300?text=Dodol+Kacang",
    stock: 245,
    rating: 4.8,
    category: "makanan",
  },
  {
    id: 2,
    name: "Kue Lapis Sumedang",
    description: "Kue lapis berlapis dengan cita rasa manis dan tekstur lembut",
    price: 35000,
    image: "https://via.placeholder.com/300x300?text=Kue+Lapis",
    stock: 156,
    rating: 4.9,
    category: "makanan",
  },
  {
    id: 3,
    name: "Tahu Goreng Crispy",
    description:
      "Tahu goreng dengan kulit yang renyah dan tekstur di dalamnya yang empuk",
    price: 15000,
    image: "https://via.placeholder.com/300x300?text=Tahu+Goreng",
    stock: 320,
    rating: 4.6,
    category: "makanan",
  },
  // Minuman
  {
    id: 4,
    name: "Teh Herbal Bogor",
    description:
      "Teh herbal organik yang menyegarkan dengan manfaat kesehatan maksimal",
    price: 30000,
    image: "https://via.placeholder.com/300x300?text=Teh+Herbal",
    stock: 445,
    rating: 4.5,
    category: "minuman",
  },
  {
    id: 5,
    name: "Kopi Premium Arabika",
    description:
      "Kopi specialty arabika pilihan dari highland Bogor yang nikmat",
    price: 65000,
    image: "https://via.placeholder.com/300x300?text=Kopi+Arabika",
    stock: 120,
    rating: 4.9,
    category: "minuman",
  },
  {
    id: 6,
    name: "Jus Buah Segar",
    description: "Jus buah organik segar tanpa pengawet yang menyehatkan",
    price: 22000,
    image: "https://via.placeholder.com/300x300?text=Jus+Buah",
    stock: 200,
    rating: 4.7,
    category: "minuman",
  },
  // Cemilan
  {
    id: 7,
    name: "Cookies Almond Premium",
    description:
      "Kue kering premium dengan bahan almond pilihan dan resep rahasia",
    price: 55000,
    image: "https://via.placeholder.com/300x300?text=Cookies+Almond",
    stock: 67,
    rating: 5.0,
    category: "cemilan",
  },
  {
    id: 8,
    name: "Manisan Jambu",
    description:
      "Manisan buah jambu yang segar dengan rasa asam manis yang sempurna",
    price: 25000,
    image: "https://via.placeholder.com/300x300?text=Manisan+Jambu",
    stock: 89,
    rating: 4.7,
    category: "cemilan",
  },
  {
    id: 9,
    name: "Keripik Singkong Pedas",
    description:
      "Keripik singkong renyah dengan bumbu pedas yang menggugah selera",
    price: 18000,
    image: "https://via.placeholder.com/300x300?text=Keripik+Singkong",
    stock: 310,
    rating: 4.6,
    category: "cemilan",
  },
  // Baju
  {
    id: 10,
    name: "Kaos Premium Cotton Putih",
    description:
      "Kaos berkualitas tinggi dari bahan cotton premium yang nyaman",
    price: 85000,
    image: "https://via.placeholder.com/300x300?text=Kaos+Premium",
    stock: 150,
    rating: 4.8,
    category: "baju",
  },
  {
    id: 11,
    name: "Kemeja Casual Motif Batik",
    description: "Kemeja casual dengan motif batik tradisional yang elegan",
    price: 125000,
    image: "https://via.placeholder.com/300x300?text=Kemeja+Batik",
    stock: 80,
    rating: 4.7,
    category: "baju",
  },
  {
    id: 12,
    name: "Hoodie Teknologi Thermal",
    description: "Hoodie dengan teknologi thermal yang hangat dan stylish",
    price: 185000,
    image: "https://via.placeholder.com/300x300?text=Hoodie+Thermal",
    stock: 55,
    rating: 4.9,
    category: "baju",
  },
  // Celana
  {
    id: 13,
    name: "Celana Jeans Skinny Fit",
    description: "Celana jeans klasik dengan potongan skinny fit yang sempurna",
    price: 145000,
    image: "https://via.placeholder.com/300x300?text=Celana+Jeans",
    stock: 120,
    rating: 4.7,
    category: "celana",
  },
  {
    id: 14,
    name: "Celana Chino Casual",
    description: "Celana chino kasual yang versatile untuk berbagai acara",
    price: 165000,
    image: "https://via.placeholder.com/300x300?text=Celana+Chino",
    stock: 95,
    rating: 4.8,
    category: "celana",
  },
  {
    id: 15,
    name: "Celana Olahraga Lari",
    description: "Celana olahraga breathable dan ergonomis untuk aktivitas",
    price: 105000,
    image: "https://via.placeholder.com/300x300?text=Celana+Olahraga",
    stock: 140,
    rating: 4.6,
    category: "celana",
  },
  // Aksesoris
  {
    id: 16,
    name: "Jam Tangan Digital Modern",
    description: "Jam tangan digital dengan fitur smartwatch dasar",
    price: 295000,
    image: "https://via.placeholder.com/300x300?text=Jam+Tangan+Digital",
    stock: 45,
    rating: 4.8,
    category: "aksesoris",
  },
  {
    id: 17,
    name: "Topi Baseball Adjustable",
    description: "Topi baseball dengan desain minimalis dan kulit berkualitas",
    price: 65000,
    image: "https://via.placeholder.com/300x300?text=Topi+Baseball",
    stock: 200,
    rating: 4.5,
    category: "aksesoris",
  },
  {
    id: 18,
    name: "Tas Ransel Travel Pro",
    description: "Tas ransel dengan multiple compartment untuk perjalanan",
    price: 385000,
    image: "https://via.placeholder.com/300x300?text=Tas+Ransel",
    stock: 60,
    rating: 4.9,
    category: "aksesoris",
  },
  // Elektronik
  {
    id: 19,
    name: "Power Bank 20000mAh",
    description: "Power bank berkualitas dengan fast charging technology",
    price: 145000,
    image: "https://via.placeholder.com/300x300?text=Power+Bank",
    stock: 75,
    rating: 4.7,
    category: "elektronik",
  },
  {
    id: 20,
    name: "Headphone Wireless Noise Cancelling",
    description: "Headphone wireless dengan fitur noise cancelling aktif",
    price: 425000,
    image: "https://via.placeholder.com/300x300?text=Headphone+Wireless",
    stock: 40,
    rating: 4.8,
    category: "elektronik",
  },
  {
    id: 21,
    name: "Smart LED Lamp RGB",
    description: "Lampu LED pintar dengan kontrol RGB dan timer",
    price: 95000,
    image: "https://via.placeholder.com/300x300?text=LED+Lamp",
    stock: 110,
    rating: 4.6,
    category: "elektronik",
  },
  // Jasa
  {
    id: 22,
    name: "Konsultasi Bisnis Umkm",
    description:
      "Layanan konsultasi bisnis untuk mengembangkan UMKM Anda dengan strategi yang tepat",
    price: 500000,
    image: "https://via.placeholder.com/300x300?text=Konsultasi+Bisnis",
    stock: 999,
    rating: 4.9,
    category: "jasa",
  },
  {
    id: 23,
    name: "Desain Grafis Produk",
    description:
      "Jasa desain grafis profesional untuk kemasan dan materi marketing produk Anda",
    price: 350000,
    image: "https://via.placeholder.com/300x300?text=Desain+Grafis",
    stock: 999,
    rating: 4.8,
    category: "jasa",
  },
  {
    id: 24,
    name: "Pelatihan Digital Marketing",
    description:
      "Program pelatihan lengkap untuk meningkatkan skill digital marketing Anda",
    price: 750000,
    image: "https://via.placeholder.com/300x300?text=Digital+Marketing",
    stock: 999,
    rating: 4.7,
    category: "jasa",
  },
];

export const dummyAIDescription = `Produk premium ini dibuat dengan menggunakan bahan-bahan pilihan terbaik yang dikurasi khusus untuk memberikan pengalaman terbaik bagi pelanggan. Setiap detail dirancang dengan cermat untuk memastikan kualitas tertinggi. 

Dengan proses pembuatan yang teliti dan pengalaman bertahun-tahun, kami menghadirkan inovasi terbaru yang menggabungkan cita rasa tradisional dengan sentuhan modern. Produk ini cocok untuk berbagai kesempatan dan dapat dinikmati oleh seluruh keluarga.

Dapatkan diskon spesial untuk pembelian dalam jumlah besar. Kepuasan pelanggan adalah prioritas utama kami!`;
