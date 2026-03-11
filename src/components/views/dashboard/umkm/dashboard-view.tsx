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
  Package,
  ShoppingCart,
  TrendingUp,
  Star,
  Coins,
  Eye,
  ArrowRight,
  BarChart3,
  Clock,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

// Mock data
const stats = [
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

const recentOrders = [
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

const topProducts = [
  { name: "Lapis Talas Bogor Premium", sales: 156, revenue: 13260000 },
  { name: "Roti Unyil Venus Original", sales: 234, revenue: 8190000 },
  { name: "Asinan Bogor Gedung Dalam", sales: 89, revenue: 2225000 },
];

export default function UMKMDashboardPage() {
  return (
    <DashboardLayout role="umkm">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#64762C]/20 via-[#424F17]/10 to-[#F99912]/20 p-6 border border-[#64762C]/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#64762C]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Selamat Datang, UMKM Seller!
            </h1>
            <p className="text-muted-foreground mb-4">
              Kelola toko Anda dan tingkatkan penjualan dengan fitur-fitur
              JOSJIS
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/dashboard-umkm/products/add">
                <Button className="bg-gradient-to-r from-[#64762C] to-[#424F17] text-white hover:shadow-[0_0_20px_rgba(100,118,44,0.3)]">
                  <Package className="w-4 h-4 mr-2" />
                  Tambah Produk
                </Button>
              </Link>
              <Link href="/dashboard-umkm/orders">
                <Button
                  variant="outline"
                  className="border-[#64762C]/30 hover:bg-[#64762C]/10"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Lihat Pesanan
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card
              key={stat.label}
              className="bg-card/50 backdrop-blur border-[#64762C]/10 hover:border-[#64762C]/30 transition-all duration-300"
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
                    <p className="text-xs mt-1 text-green-500">{stat.change}</p>
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <Card className="lg:col-span-2 bg-card/50 backdrop-blur border-[#64762C]/10">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Pesanan Terbaru</CardTitle>
              <Link href="/dashboard-umkm/orders">
                <Button variant="ghost" size="sm" className="text-[#64762C]">
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
                      <div className="w-12 h-12 rounded-xl bg-[#64762C]/10 flex items-center justify-center">
                        <ShoppingCart className="w-5 h-5 text-[#64762C]" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {order.product}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {order.customer} - {order.id}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">
                        Rp {order.total.toLocaleString()}
                      </p>
                      <Badge
                        className={
                          order.status === "pending"
                            ? "bg-yellow-500/20 text-yellow-500"
                            : order.status === "processing"
                              ? "bg-blue-500/20 text-blue-500"
                              : "bg-green-500/20 text-green-500"
                        }
                      >
                        {order.status === "pending"
                          ? "Menunggu"
                          : order.status === "processing"
                            ? "Diproses"
                            : "Dikirim"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Seller Level */}
          <Card className="bg-card/50 backdrop-blur border-[#64762C]/10">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Star className="w-5 h-5 text-[#F99912]" />
                Level Seller
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-[#64762C]/20 to-[#F99912]/10">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#64762C] to-[#F99912] flex items-center justify-center mb-3">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="font-semibold text-foreground">Silver Seller</h3>
                <p className="text-sm text-muted-foreground">
                  1,200 XP / 2,000 XP
                </p>
              </div>

              <Progress value={60} className="h-2" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Benefit saat ini
                  </span>
                </div>
                <div className="flex items-center gap-2 text-green-500">
                  <CheckCircle className="w-4 h-4" />
                  <span>Prioritas tampil di pencarian</span>
                </div>
                <div className="flex items-center gap-2 text-green-500">
                  <CheckCircle className="w-4 h-4" />
                  <span>Badge Silver Seller</span>
                </div>
              </div>

              <Link href="/dashboard-umkm/academy">
                <Button
                  variant="outline"
                  className="w-full border-[#64762C]/30 hover:bg-[#64762C]/10"
                >
                  Tingkatkan Level
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Top Products */}
        <Card className="bg-card/50 backdrop-blur border-[#64762C]/10">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#64762C]" />
              Produk Terlaris
            </CardTitle>
            <Link href="/dashboard-umkm/products">
              <Button variant="ghost" size="sm" className="text-[#64762C]">
                Lihat Semua <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, idx) => (
                <div key={product.name} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-[#64762C]/10 flex items-center justify-center text-[#64762C] font-bold">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">
                      {product.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {product.sales} terjual
                    </p>
                  </div>
                  <p className="font-semibold text-[#64762C]">
                    Rp {(product.revenue / 1000000).toFixed(1)}M
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
