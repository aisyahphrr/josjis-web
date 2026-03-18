import {
  Home,
  ShoppingBag,
  ShoppingCart,
  Heart,
  History,
  Gamepad2,
  Trophy,
  Gift,
  BookOpen,
  MessageSquare,
  User,
  Package,
  PlusCircle,
  Star,
  Bot,
  GraduationCap,
  CheckCircle,
  Users,
  Shield,
  Truck,
  FileText,
  BarChart3,
  AlertCircle,
  MapPin,
  Navigation,
  Clock,
} from "lucide-react";
import type { MenuItem } from "@/src/interface/dashboard";
import type { RoleConfig } from "@/src/interface/dashboard";

export const userMenuItems: MenuItem[] = [
  { icon: Home, label: "Home", href: "/dashboard-user" },
  {
    icon: ShoppingBag,
    label: "Marketplace",
    href: "/dashboard-user/marketplace",
  },
  { icon: ShoppingCart, label: "Keranjang", href: "/cart" },
  { icon: Heart, label: "Wishlist", href: "/wishlist" },
  { icon: History, label: "Pesanan", href: "/orders" },
  { icon: Gamepad2, label: "Harvest Bogor", href: "/dashboard-user/game" },
  { icon: Trophy, label: "Bogor Quest", href: "/dashboard-user/quest" },
  { icon: Gift, label: "Mystery Box", href: "/dashboard-user/mystery-box" },
  { icon: BookOpen, label: "Artikel", href: "/dashboard-user/articles" },
  { icon: MessageSquare, label: "Chat CS", href: "/dashboard-user/chat" },
  { icon: User, label: "Profil", href: "/dashboard-user/profile" },
];

export const umkmMenuItems: MenuItem[] = [
  { icon: Home, label: "Dashboard", href: "/dashboard-umkm" },
  { icon: Package, label: "Produk Saya", href: "/dashboard-umkm/products" },
  {
    icon: PlusCircle,
    label: "Tambah Produk",
    href: "/dashboard-umkm/products/add",
  },
  { icon: ShoppingBag, label: "Pesanan", href: "/dashboard-umkm/orders" },
  { icon: Star, label: "Rating & Review", href: "/dashboard-umkm/reviews" },
  { icon: Bot, label: "AI Generator", href: "/dashboard-umkm/ai-generator" },
  {
    icon: GraduationCap,
    label: "Academy UMKM",
    href: "/dashboard-umkm/academy",
  },
  {
    icon: CheckCircle,
    label: "Status Tenant",
    href: "/dashboard-umkm/tenant-status",
  },
  { icon: User, label: "Profil Toko", href: "/dashboard-umkm/profile" },
];

export const adminMenuItems: MenuItem[] = [
  { icon: Home, label: "Dashboard", href: "/dashboard-admin" },
  {
    icon: CheckCircle,
    label: "Validasi UMKM",
    href: "/dashboard-admin/validation",
  },
  { icon: Package, label: "Manajemen UMKM", href: "/dashboard-admin/umkm" },
  { icon: Users, label: "Manajemen User", href: "/dashboard-admin/users" },
  { icon: Truck, label: "Manajemen Driver", href: "/dashboard-admin/drivers" },
  {
    icon: Shield,
    label: "Moderasi Review",
    href: "/dashboard-admin/moderation",
  },
  {
    icon: FileText,
    label: "Manajemen Artikel",
    href: "/dashboard-admin/articles",
  },
  {
    icon: BarChart3,
    label: "Statistik Sistem",
    href: "/dashboard-admin/statistics",
  },
  {
    icon: AlertCircle,
    label: "Laporan Komplain",
    href: "/dashboard-admin/complaints",
  },
];

export const driverMenuItems: MenuItem[] = [
  { icon: Home, label: "Dashboard", href: "/dashboard-driver" },
  {
    icon: Package,
    label: "Daftar Pengiriman",
    href: "/dashboard-driver/deliveries",
  },
  {
    icon: Navigation,
    label: "Update Status",
    href: "/dashboard-driver/update-status",
  },
  {
    icon: MapPin,
    label: "Tracking Lokasi",
    href: "/dashboard-driver/tracking",
  },
  {
    icon: Clock,
    label: "Riwayat Pengiriman",
    href: "/dashboard-driver/history",
  },
  { icon: User, label: "Profil Driver", href: "/dashboard-driver/profile" },
];

export const roleConfigs: Record<string, RoleConfig> = {
  user: { menuItems: userMenuItems, title: "Dashboard User", color: "#F99912" },
  umkm: { menuItems: umkmMenuItems, title: "Dashboard UMKM", color: "#64762C" },
  admin: {
    menuItems: adminMenuItems,
    title: "Dashboard Admin",
    color: "#dc2626",
  },
  driver: {
    menuItems: driverMenuItems,
    title: "Dashboard Driver",
    color: "#3b82f6",
  },
};
