"use client"

import { useState, ReactNode } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { 
  Sparkles, Home, ShoppingBag, ShoppingCart, Heart, History, 
  Gamepad2, Trophy, Gift, BookOpen, MessageSquare, User, 
  Menu, X, LogOut, Bell, Search, ChevronDown, Package, 
  PlusCircle, Star, Bot, GraduationCap, CheckCircle,
  Users, Shield, Truck, FileText, BarChart3, AlertCircle,
  MapPin, Navigation, Clock
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface MenuItem {
  icon: React.ComponentType<{ className?: string }>
  label: string
  href: string
}

// User Menu Items
const userMenuItems: MenuItem[] = [
  { icon: Home, label: "Home", href: "/dashboard/user" },
  { icon: ShoppingBag, label: "Marketplace", href: "/dashboard/user/marketplace" },
  { icon: ShoppingCart, label: "Keranjang", href: "/dashboard/user/cart" },
  { icon: Heart, label: "Wishlist", href: "/dashboard/user/wishlist" },
  { icon: History, label: "Riwayat", href: "/dashboard/user/history" },
  { icon: Gamepad2, label: "Harvest Bogor", href: "/dashboard/user/game" },
  { icon: Trophy, label: "Bogor Quest", href: "/dashboard/user/quest" },
  { icon: Gift, label: "Mystery Box", href: "/dashboard/user/mystery-box" },
  { icon: BookOpen, label: "Artikel", href: "/dashboard/user/articles" },
  { icon: MessageSquare, label: "Chat CS", href: "/dashboard/user/chat" },
  { icon: User, label: "Profil", href: "/dashboard/user/profile" },
]

// UMKM Menu Items
const umkmMenuItems: MenuItem[] = [
  { icon: Home, label: "Dashboard", href: "/dashboard/umkm" },
  { icon: Package, label: "Produk Saya", href: "/dashboard/umkm/products" },
  { icon: PlusCircle, label: "Tambah Produk", href: "/dashboard/umkm/products/add" },
  { icon: ShoppingBag, label: "Pesanan", href: "/dashboard/umkm/orders" },
  { icon: Star, label: "Rating & Review", href: "/dashboard/umkm/reviews" },
  { icon: Bot, label: "AI Generator", href: "/dashboard/umkm/ai-generator" },
  { icon: GraduationCap, label: "Academy UMKM", href: "/dashboard/umkm/academy" },
  { icon: CheckCircle, label: "Status Tenant", href: "/dashboard/umkm/tenant-status" },
  { icon: User, label: "Profil Toko", href: "/dashboard/umkm/profile" },
]

// Admin Menu Items
const adminMenuItems: MenuItem[] = [
  { icon: Home, label: "Dashboard", href: "/dashboard/admin" },
  { icon: CheckCircle, label: "Validasi UMKM", href: "/dashboard/admin/validation" },
  { icon: Package, label: "Manajemen UMKM", href: "/dashboard/admin/umkm" },
  { icon: Users, label: "Manajemen User", href: "/dashboard/admin/users" },
  { icon: Truck, label: "Manajemen Driver", href: "/dashboard/admin/drivers" },
  { icon: Shield, label: "Moderasi Review", href: "/dashboard/admin/moderation" },
  { icon: FileText, label: "Manajemen Artikel", href: "/dashboard/admin/articles" },
  { icon: BarChart3, label: "Statistik Sistem", href: "/dashboard/admin/statistics" },
  { icon: AlertCircle, label: "Laporan Komplain", href: "/dashboard/admin/complaints" },
]

// Driver Menu Items
const driverMenuItems: MenuItem[] = [
  { icon: Home, label: "Dashboard", href: "/dashboard/driver" },
  { icon: Package, label: "Daftar Pengiriman", href: "/dashboard/driver/deliveries" },
  { icon: Navigation, label: "Update Status", href: "/dashboard/driver/update-status" },
  { icon: MapPin, label: "Tracking Lokasi", href: "/dashboard/driver/tracking" },
  { icon: Clock, label: "Riwayat Pengiriman", href: "/dashboard/driver/history" },
  { icon: User, label: "Profil Driver", href: "/dashboard/driver/profile" },
]

// Role configurations
const roleConfigs = {
  user: { menuItems: userMenuItems, title: "Dashboard User", color: "#F99912" },
  umkm: { menuItems: umkmMenuItems, title: "Dashboard UMKM", color: "#64762C" },
  admin: { menuItems: adminMenuItems, title: "Dashboard Admin", color: "#dc2626" },
  driver: { menuItems: driverMenuItems, title: "Dashboard Driver", color: "#3b82f6" },
}

interface DashboardLayoutProps {
  children: ReactNode
  role?: "user" | "umkm" | "admin" | "driver"
  /**
   * Backward-compat props (some pages still pass these).
   * If provided, `menuItems` overrides role-based menu config.
   */
  title?: string
  menuItems?: MenuItem[]
}

export function DashboardLayout({ 
  children, 
  role,
  menuItems: menuItemsOverride,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const roleFromPath: DashboardLayoutProps["role"] =
    pathname.startsWith("/dashboard/admin") || pathname.startsWith("/admin")
      ? "admin"
      : pathname.startsWith("/dashboard/umkm") || pathname.startsWith("/umkm")
        ? "umkm"
        : pathname.startsWith("/dashboard/driver") || pathname.startsWith("/driver")
          ? "driver"
          : pathname.startsWith("/dashboard/user")
            ? "user"
            : undefined

  const roleFromStorage: DashboardLayoutProps["role"] = (() => {
    try {
      const raw = localStorage.getItem("josjis_user")
      if (!raw) return undefined
      const parsed = JSON.parse(raw) as { role?: DashboardLayoutProps["role"] }
      return parsed?.role
    } catch {
      return undefined
    }
  })()

  const resolvedRole: NonNullable<DashboardLayoutProps["role"]> =
    role ?? roleFromPath ?? roleFromStorage ?? "user"
  
  const config = roleConfigs[resolvedRole]
  const menuItems = menuItemsOverride ?? config.menuItems

  const handleLogout = () => {
    localStorage.removeItem("josjis_user")
    router.push("/login")
  }

  // Get role display info
  const getRoleInfo = () => {
    switch(resolvedRole) {
      case "user": return { name: "User", email: "user@josjis.com", initial: "U" }
      case "umkm": return { name: "UMKM Seller", email: "umkm@josjis.com", initial: "S" }
      case "admin": return { name: "Administrator", email: "admin@josjis.com", initial: "A" }
      case "driver": return { name: "Driver", email: "driver@josjis.com", initial: "D" }
    }
  }
  
  const roleInfo = getRoleInfo()

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-sidebar border-r border-sidebar-border z-50 transform transition-transform duration-300 lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F99912] to-[#64762C] p-0.5">
              <div className="w-full h-full rounded-xl bg-sidebar flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#F99912]" />
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#F99912] to-[#64762C] bg-clip-text text-transparent">
              JOSJIS
            </span>
          </Link>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-muted-foreground hover:text-foreground"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Role Badge */}
        <div className="px-4 py-3 border-b border-sidebar-border">
          <div 
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-center"
            style={{ 
              backgroundColor: `${config.color}20`, 
              color: config.color,
              border: `1px solid ${config.color}40`
            }}
          >
            {config.title}
          </div>
        </div>

        {/* Nav Items */}
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100%-12rem)]">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-gradient-to-r from-[#F99912]/20 to-[#64762C]/10 text-[#F99912] border border-[#F99912]/20' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-[#F99912]" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border">
          <Button 
            variant="ghost" 
            onClick={handleLogout}
            className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-30 h-16 bg-background/80 backdrop-blur-xl border-b border-border flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-muted-foreground hover:text-foreground"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/50 border border-border">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Cari..." 
                className="bg-transparent border-none outline-none text-sm w-48 text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 rounded-xl hover:bg-muted/50 transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#F99912]" />
            </button>

            {/* User Menu */}
            <div className="flex items-center gap-3 pl-4 border-l border-border">
              <div 
                className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold"
                style={{ background: `linear-gradient(135deg, ${config.color}, ${config.color}80)` }}
              >
                {roleInfo.initial}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-foreground">{roleInfo.name}</p>
                <p className="text-xs text-muted-foreground">{roleInfo.email}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
