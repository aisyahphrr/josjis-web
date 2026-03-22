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
  Users,
  Store,
  Package,
  BarChart3,
  GraduationCap,
  Truck,
  FileText,
  Settings,
  CreditCard,
  ClipboardCheck,
} from "lucide-react";
import type { MenuItem, RoleConfig } from "@/src/interface/dashboard";

export const userMenuItems: MenuItem[] = [
  { icon: Home, label: "Home", href: "/dashboard-user" },
  { icon: ShoppingBag, label: "Marketplace", href: "/marketplace" },
  { icon: ShoppingCart, label: "Keranjang", href: "/cart" },
  { icon: Heart, label: "Wishlist", href: "/wishlist" },
  { icon: History, label: "Pesanan", href: "/orders" },
  { icon: Gamepad2, label: "Harvest Bogor", href: "/game" },
  { icon: Trophy, label: "Bogor Quest", href: "/quest" },
  { icon: Gift, label: "Mystery Box", href: "/mystery-box" },
  { icon: BookOpen, label: "Artikel", href: "/articles" },
  { icon: MessageSquare, label: "Chat CS", href: "/chat" },
  { icon: User, label: "Profil", href: "/profile" },
];

export const umkmMenuItems: MenuItem[] = [
  { icon: Home, label: "Dashboard", href: "/dashboard-umkm" },
  { icon: Store, label: "Pendaftaran Toko", href: "/register-umkm" },
  { icon: Package, label: "Manajemen Produk", href: "/products-management" },
  { icon: ShoppingCart, label: "Manajemen Pesanan", href: "/orders-management" },
  { icon: BarChart3, label: "Analisis Feedback", href: "/analysis-feedback" },
];

export const adminMenuItems: MenuItem[] = [
  { icon: Home, label: "Dashboard", href: "/dashboard-admin" },
  { icon: GraduationCap, label: "Academy + Konten", href: "/academy" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: Truck, label: "Driver", href: "/driver" },
  { icon: Trophy, label: "Gamification", href: "/gamification" },
  { icon: FileText, label: "Laporan", href: "/laporan" },
  { icon: Settings, label: "Settings", href: "/settings" },
  { icon: CreditCard, label: "Transaksi", href: "/transaksi" },
  { icon: Store, label: "UMKM", href: "/umkm" },
  { icon: Users, label: "Users", href: "/users" },
  { icon: ClipboardCheck, label: "Validasi", href: "/validasi" },
];

export const driverMenuItems: MenuItem[] = [
  { icon: Home, label: "Dashboard", href: "/dashboard-driver" },
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
