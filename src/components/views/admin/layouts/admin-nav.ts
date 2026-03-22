"use client"

import {
  LayoutDashboard,
  Users,
  Store,
  BadgeCheck,
  Truck,
  CreditCard,
  Newspaper,
  AlertTriangle,
  Trophy,
  GraduationCap,
  LineChart,
  Settings,
} from "lucide-react"

export type AdminNavItem = {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

export const adminNavItems: AdminNavItem[] = [
  { title: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Manajemen User", href: "/admin/users", icon: Users },
  { title: "Manajemen UMKM", href: "/admin/umkm", icon: Store },
  { title: "Validasi UMKM", href: "/admin/validasi", icon: BadgeCheck },
  { title: "Manajemen Driver", href: "/admin/driver", icon: Truck },
  { title: "Transaksi", href: "/admin/transaksi", icon: CreditCard },
  { title: "Konten (Artikel)", href: "/admin/konten", icon: Newspaper },
  { title: "Laporan & Komplain", href: "/admin/laporan", icon: AlertTriangle },
  { title: "Gamification", href: "/admin/gamification", icon: Trophy },
  { title: "Academy", href: "/admin/academy", icon: GraduationCap },
  { title: "Analytics", href: "/admin/analytics", icon: LineChart },
  { title: "Settings", href: "/admin/settings", icon: Settings },
]

