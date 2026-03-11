"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { 
  ShoppingBag, Coins, Trophy, TrendingUp, ArrowRight, 
  Gift, Star, Zap, Leaf, Heart, Clock
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const stats = [
  { icon: ShoppingBag, label: "Total Belanja", value: "Rp 2.5M", trend: "+12%", color: "from-[#F99912] to-[#C9C9C3]" },
  { icon: Coins, label: "Koin Bogor", value: "1,250", trend: "+50", color: "from-[#64762C] to-[#424F17]" },
  { icon: Trophy, label: "Quest Points", value: "3,200", trend: "+150", color: "from-[#F99912] to-[#64762C]" },
  { icon: Heart, label: "Wishlist", value: "12", trend: "+3", color: "from-[#C9C9C3] to-[#F99912]" },
]

const recentOrders = [
  { id: "ORD-001", product: "Lapis Talas Premium", status: "delivered", date: "2 hari lalu", price: "Rp 85.000" },
  { id: "ORD-002", product: "Roti Unyil Venus", status: "shipping", date: "1 hari lalu", price: "Rp 45.000" },
  { id: "ORD-003", product: "Keripik Talas Spicy", status: "processing", date: "Hari ini", price: "Rp 28.000" },
]

const dailyQuests = [
  { title: "Daily Check-in", reward: "+10 Poin", completed: true, icon: Zap },
  { title: "Belanja Rp50.000", reward: "+25 Poin", completed: false, icon: ShoppingBag },
  { title: "Review Produk", reward: "+15 Poin", completed: false, icon: Star },
]

export default function UserDashboard() {
  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-8">
        {/* Welcome Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#F99912]/20 via-[#64762C]/10 to-[#424F17]/20 border border-[#F99912]/20 p-6 lg:p-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F99912]/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
              Selamat Datang, User! 
            </h2>
            <p className="text-muted-foreground mb-4 max-w-xl">
              Jelajahi produk UMKM Bogor, selesaikan quest, dan dapatkan reward menarik setiap hari.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/dashboard/marketplace">
                <Button className="bg-gradient-to-r from-[#F99912] to-[#64762C] text-[#181612] font-semibold">
                  <ShoppingBag className="mr-2 w-4 h-4" />
                  Mulai Belanja
                </Button>
              </Link>
              <Link href="/dashboard/game">
                <Button variant="outline" className="border-[#F99912]/30 hover:bg-[#F99912]/10">
                  <Leaf className="mr-2 w-4 h-4" />
                  Main Harvest
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
              <Link href="/dashboard/history">
                <Button variant="ghost" size="sm" className="text-[#F99912] hover:text-[#F99912]/80">
                  Lihat Semua
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div 
                  key={order.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F99912]/20 to-[#64762C]/20 flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-[#F99912]" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{order.product}</p>
                    <p className="text-sm text-muted-foreground">{order.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{order.price}</p>
                    <div className="flex items-center gap-1 text-xs">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-muted-foreground">{order.date}</span>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === 'delivered' ? 'bg-[#64762C]/20 text-[#64762C]' :
                    order.status === 'shipping' ? 'bg-[#F99912]/20 text-[#F99912]' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {order.status === 'delivered' ? 'Selesai' :
                     order.status === 'shipping' ? 'Dikirim' : 'Diproses'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Quests */}
          <div className="backdrop-blur-xl bg-card/60 border border-[#F99912]/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Misi Harian</h3>
              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#F99912]/10 border border-[#F99912]/20">
                <Trophy className="w-4 h-4 text-[#F99912]" />
                <span className="text-sm font-semibold text-[#F99912]">1/3</span>
              </div>
            </div>
            <div className="space-y-3">
              {dailyQuests.map((quest, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-xl border transition-all ${
                    quest.completed 
                      ? 'bg-[#64762C]/10 border-[#64762C]/30' 
                      : 'bg-muted/30 border-[#F99912]/10 hover:border-[#F99912]/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      quest.completed 
                        ? 'bg-gradient-to-br from-[#64762C] to-[#424F17]' 
                        : 'bg-gradient-to-br from-[#F99912]/20 to-[#64762C]/20'
                    }`}>
                      <quest.icon className={`w-5 h-5 ${quest.completed ? 'text-foreground' : 'text-[#F99912]'}`} />
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${quest.completed ? 'text-[#64762C] line-through' : 'text-foreground'}`}>
                        {quest.title}
                      </p>
                      <p className="text-sm text-muted-foreground">{quest.reward}</p>
                    </div>
                    {quest.completed && (
                      <div className="w-6 h-6 rounded-full bg-[#64762C] flex items-center justify-center">
                        <svg className="w-4 h-4 text-foreground" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Link href="/dashboard/quest">
              <Button className="w-full mt-4 bg-gradient-to-r from-[#F99912] to-[#64762C] text-[#181612] font-semibold">
                Lihat Semua Quest
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Mystery Box Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#64762C]/20 to-[#F99912]/20 border border-[#64762C]/20 p-6 lg:p-8">
          <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-40 h-40 animate-pulse">
            <div className="w-full h-full rounded-3xl bg-gradient-to-br from-[#F99912] to-[#64762C] flex items-center justify-center shadow-[0_0_60px_rgba(249,153,18,0.4)]">
              <Gift className="w-20 h-20 text-[#181612]" />
            </div>
          </div>
          <div className="relative z-10 max-w-lg">
            <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-2">
              Mystery Box Menanti!
            </h3>
            <p className="text-muted-foreground mb-4">
              Belanja minimal Rp100.000 untuk membuka Mystery Box dengan hadiah voucher, poin, dan merchandise eksklusif!
            </p>
            <Link href="/dashboard/mystery-box">
              <Button variant="outline" className="border-[#F99912]/30 hover:bg-[#F99912]/10">
                <Gift className="mr-2 w-4 h-4" />
                Buka Mystery Box
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
