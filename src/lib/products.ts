export type ProductImage = {
  src: string;
  alt: string;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice?: number | null;
  rating: number;
  reviewsCount: number;
  category: string;
  sellerName: string;
  sellerDescription: string;
  description: string;
  images: ProductImage[];
  badge?: string | null;
};

const placeholder = "/placeholder.svg";

export const products: Product[] = [
  {
    id: 1,
    name: "Lapis Talas Bogor Sangkuriang",
    price: 85000,
    originalPrice: 95000,
    rating: 4.9,
    reviewsCount: 234,
    category: "Kue",
    sellerName: "Toko Lapis Bogor",
    sellerDescription:
      "Spesialis oleh-oleh talas Bogor premium, fresh harian, dan sudah dipercaya ribuan pelanggan.",
    description:
      "Lapis talas lembut dengan rasa khas Bogor. Cocok untuk oleh-oleh keluarga dan rekan kerja. Dikemas aman untuk perjalanan.",
    images: [
      { src: placeholder, alt: "Lapis Talas Bogor - 1" },
      { src: placeholder, alt: "Lapis Talas Bogor - 2" },
      { src: placeholder, alt: "Lapis Talas Bogor - 3" },
    ],
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Roti Unyil Venus Original",
    price: 35000,
    originalPrice: null,
    rating: 4.8,
    reviewsCount: 189,
    category: "Roti",
    sellerName: "Venus Bakery",
    sellerDescription:
      "Roti unyil legendaris Bogor, varian lengkap, tekstur lembut, dan selalu fresh.",
    description:
      "Roti unyil original dengan isian lembut. Pas untuk camilan atau bekal perjalanan.",
    images: [
      { src: placeholder, alt: "Roti Unyil Venus - 1" },
      { src: placeholder, alt: "Roti Unyil Venus - 2" },
    ],
    badge: null,
  },
  {
    id: 3,
    name: "Asinan Bogor Gedung Dalam",
    price: 25000,
    originalPrice: 30000,
    rating: 4.7,
    reviewsCount: 156,
    category: "Makanan",
    sellerName: "Asinan Pak Maman",
    sellerDescription:
      "Asinan segar dengan racikan bumbu turun-temurun. Pedas-manis-asam yang nagih.",
    description:
      "Asinan buah/sayur Bogor dengan kuah segar. Disajikan dengan kacang dan kerupuk.",
    images: [{ src: placeholder, alt: "Asinan Bogor - 1" }],
    badge: "Promo",
  },
  {
    id: 4,
    name: "Tauge Goreng Pak Amin",
    price: 28000,
    originalPrice: null,
    rating: 4.6,
    reviewsCount: 98,
    category: "Makanan",
    sellerName: "RM Pak Amin",
    sellerDescription:
      "Menu khas Bogor dengan bumbu tauco yang kuat. Porsi pas, rasa konsisten.",
    description:
      "Tauge goreng Bogor dengan bumbu tauco khas. Cocok untuk makan siang praktis.",
    images: [{ src: placeholder, alt: "Tauge Goreng - 1" }],
    badge: null,
  },
  {
    id: 5,
    name: "Keripik Talas Premium",
    price: 45000,
    originalPrice: null,
    rating: 4.5,
    reviewsCount: 76,
    category: "Snack",
    sellerName: "Bogor Chips",
    sellerDescription:
      "Keripik talas premium renyah, tanpa pengawet berlebihan, cocok untuk oleh-oleh.",
    description:
      "Keripik talas gurih dan renyah dengan pilihan rasa. Dikemas rapat agar tetap kriuk.",
    images: [{ src: placeholder, alt: "Keripik Talas - 1" }],
    badge: "New",
  },
  {
    id: 6,
    name: "Makaroni Ngehe Level 5",
    price: 15000,
    originalPrice: null,
    rating: 4.4,
    reviewsCount: 312,
    category: "Snack",
    sellerName: "Makaroni Ngehe",
    sellerDescription:
      "Snack pedas favorit anak muda. Bisa pilih level pedas, dijamin nampol.",
    description:
      "Makaroni renyah level pedas 5. Cocok untuk pecinta pedas yang serius.",
    images: [{ src: placeholder, alt: "Makaroni Ngehe - 1" }],
    badge: null,
  },
  {
    id: 7,
    name: "Dodol Talas Bogor",
    price: 55000,
    originalPrice: 65000,
    rating: 4.8,
    reviewsCount: 145,
    category: "Kue",
    sellerName: "Dodol Picnic",
    sellerDescription:
      "Dodol premium dengan bahan pilihan. Tekstur lembut dan rasa talas yang khas.",
    description:
      "Dodol talas Bogor dengan cita rasa tradisional. Cocok untuk buah tangan.",
    images: [{ src: placeholder, alt: "Dodol Talas - 1" }],
    badge: "Promo",
  },
  {
    id: 8,
    name: "Soto Mie Bogor Pak Kadir",
    price: 32000,
    originalPrice: null,
    rating: 4.7,
    reviewsCount: 89,
    category: "Makanan",
    sellerName: "Soto Mie Pak Kadir",
    sellerDescription:
      "Soto mie hangat dengan kuah gurih. Favorit keluarga, porsi mengenyangkan.",
    description:
      "Soto mie Bogor dengan kuah gurih, risol, dan topping lengkap. Nikmat dinikmati hangat.",
    images: [{ src: placeholder, alt: "Soto Mie - 1" }],
    badge: null,
  },
  {
    id: 10,
    name: "Kopi Bogor Arabika",
    price: 75000,
    originalPrice: null,
    rating: 4.9,
    reviewsCount: 234,
    category: "Minuman",
    sellerName: "Kopi Gunung Salak",
    sellerDescription:
      "Kopi arabika pilihan dari lereng Gunung Salak. Aroma floral, aftertaste bersih.",
    description:
      "Biji kopi arabika Bogor dengan profil rasa seimbang. Cocok untuk V60, espresso, maupun tubruk.",
    images: [
      { src: placeholder, alt: "Kopi Arabika - 1" },
      { src: placeholder, alt: "Kopi Arabika - 2" },
    ],
    badge: "Premium",
  },
];

export function getProductById(id: number) {
  return products.find((p) => p.id === id) ?? null;
}

export function getFeaturedProducts() {
  return products.slice(0, 3);
}

