import type { LucideIcon } from "lucide-react";
import {
  Home,
  BarChart3,
  Package,
  ClipboardList,
  Star,
  Bot,
  GraduationCap,
  FileCheck,
  MessageSquare,
  User,
  Settings,
  ShoppingCart,
  Plus,
} from "lucide-react";
import type { MenuItem } from "@/src/interface/dashboard";

interface UMKMStatItem {
  icon: LucideIcon;
  label: string;
  value: string;
  trend: string;
  color: string;
}

interface UMKMOrderItem {
  id: string;
  customer: string;
  product: string;
  status: "pending" | "processing" | "shipped" | "delivered";
  date: string;
  price: string;
}

interface UMKMTopProductItem {
  name: string;
  sales: number;
  revenue: string;
  rating: number;
  image: string;
}

interface UMKMQuickActionItem {
  icon: LucideIcon;
  label: string;
  href: string;
  color: string;
}

export const umkmLegacyMenuItems: MenuItem[] = [
  { icon: Home, label: "Dashboard", href: "/umkm" },
  { icon: BarChart3, label: "Statistik", href: "/umkm/statistics" },
  { icon: Package, label: "Produk", href: "/umkm/products" },
  { icon: ClipboardList, label: "Pesanan", href: "/umkm/orders" },
  { icon: Star, label: "Review", href: "/umkm/reviews" },
  { icon: Bot, label: "AI Generator", href: "/umkm/ai-generator" },
  { icon: GraduationCap, label: "Academy", href: "/umkm/academy" },
  { icon: FileCheck, label: "Status Pendaftaran", href: "/umkm/status" },
  { icon: MessageSquare, label: "Chat", href: "/umkm/chat" },
  { icon: User, label: "Profil", href: "/umkm/profile" },
  { icon: Settings, label: "Pengaturan", href: "/umkm/settings" },
];

export const umkmLegacyStats: UMKMStatItem[] = [
  {
    icon: ShoppingCart,
    label: "Total Penjualan",
    value: "Rp 15.2M",
    trend: "+23%",
    color: "from-[#F99912] to-[#C9C9C3]",
  },
  {
    icon: Package,
    label: "Total Produk",
    value: "48",
    trend: "+5",
    color: "from-[#64762C] to-[#424F17]",
  },
  {
    icon: ClipboardList,
    label: "Pesanan Baru",
    value: "12",
    trend: "+8",
    color: "from-[#F99912] to-[#64762C]",
  },
  {
    icon: Star,
    label: "Rating Toko",
    value: "4.8",
    trend: "+0.2",
    color: "from-[#C9C9C3] to-[#F99912]",
  },
];

export const umkmLegacyRecentOrders: UMKMOrderItem[] = [
  {
    id: "ORD-101",
    customer: "Sarah W.",
    product: "Lapis Talas Premium",
    status: "pending",
    date: "10 menit lalu",
    price: "Rp 85.000",
  },
  {
    id: "ORD-102",
    customer: "Budi A.",
    product: "Roti Unyil Venus x3",
    status: "processing",
    date: "1 jam lalu",
    price: "Rp 135.000",
  },
  {
    id: "ORD-103",
    customer: "Citra N.",
    product: "Keripik Talas Spicy",
    status: "shipped",
    date: "3 jam lalu",
    price: "Rp 28.000",
  },
  {
    id: "ORD-104",
    customer: "Dewi M.",
    product: "Dodol Talas Premium",
    status: "delivered",
    date: "1 hari lalu",
    price: "Rp 55.000",
  },
];

export const umkmLegacyTopProducts: UMKMTopProductItem[] = [
  {
    name: "Lapis Talas Premium",
    sales: 156,
    revenue: "Rp 13.2M",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=100&h=100&fit=crop",
  },
  {
    name: "Roti Unyil Venus",
    sales: 234,
    revenue: "Rp 10.5M",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100&h=100&fit=crop",
  },
  {
    name: "Keripik Talas Spicy",
    sales: 89,
    revenue: "Rp 2.5M",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1621447504864-d8686e12698c?w=100&h=100&fit=crop",
  },
];

export const umkmLegacyQuickActions: UMKMQuickActionItem[] = [
  {
    icon: Plus,
    label: "Tambah Produk",
    href: "/umkm/products/new",
    color: "from-[#F99912] to-[#64762C]",
  },
  {
    icon: Bot,
    label: "AI Generator",
    href: "/umkm/ai-generator",
    color: "from-[#64762C] to-[#424F17]",
  },
  {
    icon: GraduationCap,
    label: "Academy",
    href: "/umkm/academy",
    color: "from-[#C9C9C3] to-[#F99912]",
  },
  {
    icon: BarChart3,
    label: "Statistik",
    href: "/umkm/statistics",
    color: "from-[#F99912] to-[#C9C9C3]",
  },
];
