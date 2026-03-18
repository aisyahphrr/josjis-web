"use client";

import { DashboardLayout } from "@/src/components/Dashboard/dashboard-layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Progress } from "@/src/components/ui/progress";
import {
  Coins,
  ShoppingBag,
  Trophy,
  Gift,
  TrendingUp,
  Gamepad2,
  Star,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { getFeaturedProducts } from "@/src/lib/constants/user/marketplace/products";

// Mock data
const stats = [
  {
    label: "Koin Asli Bogor",
    value: "2,450",
    icon: Coins,
    change: "+150 hari ini",
    color: "#F99912",
  },
  {
    label: "Total Pesanan",
    value: "12",
    icon: ShoppingBag,
    change: "3 dalam proses",
    color: "#64762C",
  },
  {
    label: "Quest Points",
    value: "850",
    icon: Trophy,
    change: "Level 5",
    color: "#3b82f6",
  },
  {
    label: "Mystery Box",
    value: "3",
    icon: Gift,
    change: "Siap dibuka!",
    color: "#dc2626",
  },
];

const recentOrders = [
  {
    id: "ORD-001",
    product: "Lapis Talas Bogor",
    status: "Dikirim",
    date: "10 Mar 2026",
  },
  {
    id: "ORD-002",
    product: "Roti Unyil Venus",
    status: "Diproses",
    date: "9 Mar 2026",
  },
  {
    id: "ORD-003",
    product: "Asinan Bogor",
    status: "Selesai",
    date: "8 Mar 2026",
  },
];

const featuredProducts = getFeaturedProducts();

export default function UserDashboardPage() {
  return (
    <DashboardLayout role="user">
      <div className="space-y-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#F99912]/20 via-[#64762C]/10 to-[#424F17]/20 p-6 border border-[#F99912]/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F99912]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Selamat Datang, User!
            </h1>
            <p className="text-muted-foreground mb-4">
              Jelajahi produk UMKM Bogor dan kumpulkan Koin Asli Bogor
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/dashboard-user/marketplace">
                <Button className="bg-gradient-to-r from-[#F99912] to-[#64762C] text-[#181612] hover:shadow-[0_0_20px_rgba(249,153,18,0.3)]">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Belanja Sekarang
                </Button>
              </Link>
              <Link href="/dashboard-user/game">
                <Button
                  variant="outline"
                  className="border-[#F99912]/30 hover:bg-[#F99912]/10"
                >
                  <Gamepad2 className="w-4 h-4 mr-2" />
                  Main Harvest Bogor
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card
              key={stat.label}
              className="bg-card/50 backdrop-blur border-[#F99912]/10 hover:border-[#F99912]/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(249,153,18,0.1)]"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-xs mt-1" style={{ color: stat.color }}>
                      {stat.change}
                    </p>
                  </div>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <stat.icon
                      className="w-6 h-6"
                      style={{ color: stat.color }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 bg-card/50 backdrop-blur border-[#F99912]/10">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Pesanan Terbaru</CardTitle>
              <Link href="/orders">
                <Button variant="ghost" size="sm" className="text-[#F99912]">
                  Lihat Semua <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#F99912]/10 flex items-center justify-center">
                        <ShoppingBag className="w-5 h-5 text-[#F99912]" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {order.product}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {order.id} - {order.date}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        order.status === "Selesai" ? "default" : "secondary"
                      }
                      className={
                        order.status === "Selesai"
                          ? "bg-green-500/20 text-green-500"
                          : order.status === "Dikirim"
                            ? "bg-blue-500/20 text-blue-500"
                            : "bg-[#F99912]/20 text-[#F99912]"
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quest Progress */}
          <Card className="bg-card/50 backdrop-blur border-[#F99912]/10">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#F99912]" />
                Bogor Quest
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Level 5</span>
                  <span className="text-[#F99912]">850/1000 XP</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">
                      Login Harian
                    </span>
                    <Badge className="bg-green-500/20 text-green-500">
                      +50 XP
                    </Badge>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-muted/30">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">
                      Review Produk
                    </span>
                    <span className="text-xs text-muted-foreground">0/1</span>
                  </div>
                  <Progress value={0} className="h-1 mt-2" />
                </div>
                <div className="p-3 rounded-xl bg-muted/30">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">
                      Belanja UMKM
                    </span>
                    <span className="text-xs text-muted-foreground">2/3</span>
                  </div>
                  <Progress value={66} className="h-1 mt-2" />
                </div>
              </div>

              <Link href="/dashboard-user/quest">
                <Button
                  variant="outline"
                  className="w-full border-[#F99912]/30 hover:bg-[#F99912]/10"
                >
                  Lihat Semua Quest
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Featured Products */}
        <Card className="bg-card/50 backdrop-blur border-[#F99912]/10">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#F99912]" />
              Produk Unggulan
            </CardTitle>
            <Link href="/dashboard-user/marketplace">
              <Button variant="ghost" size="sm" className="text-[#F99912]">
                Lihat Semua <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {featuredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="group p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="aspect-square rounded-xl bg-gradient-to-br from-[#F99912]/20 to-[#64762C]/20 mb-3 flex items-center justify-center">
                    <ShoppingBag className="w-12 h-12 text-[#F99912]/50" />
                  </div>
                  <h3 className="font-medium text-foreground group-hover:text-[#F99912] transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-[#F99912] font-semibold">
                      Rp {product.price.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-[#F99912] text-[#F99912]" />
                      <span className="text-sm text-muted-foreground">
                        {product.rating}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
