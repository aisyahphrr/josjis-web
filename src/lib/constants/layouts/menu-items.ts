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
  Store,
  Package,
  BarChart3,
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
  { icon: BookOpen, label: "Akademi UMKM", href: "/academy" },
  { icon: Package, label: "Manajemen Produk", href: "/products-management" },
  {
    icon: ShoppingCart,
    label: "Manajemen Pesanan",
    href: "/orders-management",
  },
  { icon: BarChart3, label: "Analisis Feedback", href: "/analysis-feedback" },
];

export const adminMenuItems: MenuItem[] = [
  { icon: Home, label: "Dashboard", href: "/dashboard-admin" },
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
