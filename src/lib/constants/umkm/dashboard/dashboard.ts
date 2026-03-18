import type { LucideIcon } from "lucide-react";
import { Coins, Package, ShoppingCart, Star } from "lucide-react";

interface UMKMDashboardStat {
  label: string;
  value: string;
  icon: LucideIcon;
  change: string;
  color: string;
  up: boolean;
}

interface UMKMDashboardRecentOrder {
  id: string;
  customer: string;
  product: string;
  status: "pending" | "processing" | "shipped";
  total: number;
  date: string;
}

interface UMKMDashboardTopProduct {
  name: string;
  sales: number;
  revenue: number;
}

export const umkmDashboardStats: UMKMDashboardStat[] = [
  {
    label: "Total Penjualan",
    value: "Rp 12.5M",
    icon: Coins,
    change: "+12% bulan ini",
    color: "#F99912",
    up: true,
  },
  {
    label: "Produk Aktif",
    value: "24",
    icon: Package,
    change: "2 menunggu",
    color: "#64762C",
    up: true,
  },
  {
    label: "Pesanan Baru",
    value: "15",
    icon: ShoppingCart,
    change: "5 hari ini",
    color: "#3b82f6",
    up: true,
  },
  {
    label: "Rating Toko",
    value: "4.8",
    icon: Star,
    change: "156 review",
    color: "#F99912",
    up: true,
  },
];

export const umkmDashboardRecentOrders: UMKMDashboardRecentOrder[] = [
  {
    id: "ORD-001",
    customer: "John Doe",
    product: "Lapis Talas Premium",
    status: "pending",
    total: 170000,
    date: "10 Mar",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    product: "Roti Unyil x3",
    status: "processing",
    total: 105000,
    date: "10 Mar",
  },
  {
    id: "ORD-003",
    customer: "Ahmad",
    product: "Kopi Bogor",
    status: "shipped",
    total: 75000,
    date: "9 Mar",
  },
];

export const umkmDashboardTopProducts: UMKMDashboardTopProduct[] = [
  { name: "Lapis Talas Bogor Premium", sales: 156, revenue: 13260000 },
  { name: "Roti Unyil Venus Original", sales: 234, revenue: 8190000 },
  { name: "Asinan Bogor Gedung Dalam", sales: 89, revenue: 2225000 },
];
