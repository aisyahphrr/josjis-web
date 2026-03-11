"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { 
  Store, Package, ShoppingCart, Star, TrendingUp, ArrowRight, 
  Plus, BarChart3, Bot, GraduationCap, FileCheck, Eye, Edit, Trash2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  Home, Package as PackageIcon, ClipboardList, MessageSquare, 
  BookOpen, User, Settings
} from "lucide-react"

const umkmMenuItems = [
  { icon: Home, label: "Dashboard", href: "/umkm" },
  { icon: BarChart3, label: "Statistik", href: "/umkm/statistics" },
  { icon: PackageIcon, label: "Produk", href: "/umkm/products" },
  { icon: ClipboardList, label: "Pesanan", href: "/umkm/orders" },
  { icon: Star, label: "Review", href: "/umkm/reviews" },
  { icon: Bot, label: "AI Generator", href: "/umkm/ai-generator" },
  { icon: GraduationCap, label: "Academy", href: "/umkm/academy" },
  { icon: FileCheck, label: "Status Pendaftaran", href: "/umkm/status" },
  { icon: MessageSquare, label: "Chat", href: "/umkm/chat" },
  { icon: User, label: "Profil", href: "/umkm/profile" },
  { icon: Settings, label: "Pengaturan", href: "/umkm/settings" },
]

const stats = [
  { icon: ShoppingCart, label: "Total Penjualan", value: "Rp 15.2M", trend: "+23%", color: "from-[#F99912] to-[#C9C9C3]" },
  { icon: Package, label: "Total Produk", value: "48", trend: "+5", color: "from-[#64762C] to-[#424F17]" },
  { icon: ClipboardList, label: "Pesanan Baru", value: "12", trend: "+8", color: "from-[#F99912] to-[#64762C]" },
  { icon: Star, label: "Rating Toko", value: "4.8", trend: "+0.2", color: "from-[#C9C9C3] to-[#F99912]" },
]

const recentOrders = [
  { id: "ORD-101", customer: "Sarah W.", product: "Lapis Talas Premium", status: "pending", date: "10 menit lalu", price: "Rp 85.000" },
  { id: "ORD-102", customer: "Budi A.", product: "Roti Unyil Venus x3", status: "processing", date: "1 jam lalu", price: "Rp 135.000" },
  { id: "ORD-103", customer: "Citra N.", product: "Keripik Talas Spicy", status: "shipped", date: "3 jam lalu", price: "Rp 28.000" },
  { id: "ORD-104", customer: "Dewi M.", product: "Dodol Talas Premium", status: "delivered", date: "1 hari lalu", price: "Rp 55.000" },
]

const topProducts = [
  { name: "Lapis Talas Premium", sales: 156, revenue: "Rp 13.2M", rating: 4.9, image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=100&h=100&fit=crop" },
  { name: "Roti Unyil Venus", sales: 234, revenue: "Rp 10.5M", rating: 4.8, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100&h=100&fit=crop" },
  { name: "Keripik Talas Spicy", sales: 89, revenue: "Rp 2.5M", rating: 4.7, image: "https://images.unsplash.com/photo-1621447504864-d8686e12698c?w=100&h=100&fit=crop" },
]

export default function UMKMDashboard() {
  return (
    <DashboardLayout title="Dashboard UMKM" menuItems={umkmMenuItems}>
      <div className="space-y-8">
        {/* Store Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#64762C]/20 via-[#F99912]/10 to-[#424F17]/20 border border-[#64762C]/20 p-6 lg:p-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#64762C]/10 rounded-full blur-3xl" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F99912] to-[#64762C] p-0.5">
                <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                  <Store className="w-8 h-8 text-[#F99912]" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Toko Oleh-Oleh Khas Bogor</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 rounded-full bg-[#64762C]/20 text-[#64762C] text-xs font-medium">Verified</span>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="w-4 h-4 fill-[#F99912] text-[#F99912]" />
                    4.8 (328 reviews)
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Link href="/umkm/products/new">
                <Button className="bg-gradient-to-r from-[#F99912] to-[#64762C] text-[#181612] font-semibold">
                  <Plus className="mr-2 w-4 h-4" />
                  Tambah Produk
                </Button>
              </Link>
              <Link href="/umkm/ai-generator">
                <Button variant="outline" className="border-[#F99912]/30 hover:bg-[#F99912]/10">
                  <Bot className="mr-2 w-4 h-4" />
                  AI Generator
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="relative overflow-hidden backdrop-blur-xl bg-card/60 border border-[#F99912]/10 rounded-2xl p-5 hover:border-[#F99912]/30 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} p-0.5 mb-4`}>
                <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-[#F99912]" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <span className="text-xs text-[#64762C] font-medium flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {stat.trend}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <div className="lg:col-span-2 backdrop-blur-xl bg-card/60 border border-[#F99912]/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Pesanan Terbaru</h3>
              <Link href="/umkm/orders">
                <Button variant="ghost" size="sm" className="text-[#F99912] hover:text-[#F99912]/80">
                  Lihat Semua
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div 
                  key={order.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-foreground truncate">{order.product}</p>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${
                        order.status === 'delivered' ? 'bg-[#64762C]/20 text-[#64762C]' :
                        order.status === 'shipped' ? 'bg-[#F99912]/20 text-[#F99912]' :
                        order.status === 'processing' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {order.status === 'delivered' ? 'Selesai' :
                         order.status === 'shipped' ? 'Dikirim' : 
                         order.status === 'processing' ? 'Diproses' : 'Pending'}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {order.customer} - {order.id} - {order.date}
                    </p>
                  </div>
                  <p className="font-semibold text-foreground shrink-0">{order.price}</p>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-[#F99912]">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="backdrop-blur-xl bg-card/60 border border-[#F99912]/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Produk Terlaris</h3>
              <Link href="/umkm/products">
                <Button variant="ghost" size="sm" className="text-[#F99912] hover:text-[#F99912]/80">
                  Semua
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm truncate">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.sales} terjual</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-[#F99912]">{product.revenue}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="w-3 h-3 fill-[#F99912] text-[#F99912]" />
                      {product.rating}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Plus, label: "Tambah Produk", href: "/umkm/products/new", color: "from-[#F99912] to-[#64762C]" },
            { icon: Bot, label: "AI Generator", href: "/umkm/ai-generator", color: "from-[#64762C] to-[#424F17]" },
            { icon: GraduationCap, label: "Academy", href: "/umkm/academy", color: "from-[#C9C9C3] to-[#F99912]" },
            { icon: BarChart3, label: "Statistik", href: "/umkm/statistics", color: "from-[#F99912] to-[#C9C9C3]" },
          ].map((action, index) => (
            <Link key={index} href={action.href}>
              <div className="group backdrop-blur-xl bg-card/60 border border-[#F99912]/10 rounded-2xl p-5 hover:border-[#F99912]/30 transition-all duration-300 hover:translate-y-[-2px] cursor-pointer">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} p-0.5 mb-3 group-hover:shadow-[0_0_20px_rgba(249,153,18,0.3)] transition-shadow`}>
                  <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                    <action.icon className="w-6 h-6 text-[#F99912]" />
                  </div>
                </div>
                <p className="font-medium text-foreground group-hover:text-[#F99912] transition-colors">{action.label}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
