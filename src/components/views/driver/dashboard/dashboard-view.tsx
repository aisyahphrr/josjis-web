"use client";
import {
  Truck,
  Package,
  MapPin,
  Clock,
  TrendingUp,
  ArrowRight,
  Navigation,
  Phone,
  CheckCircle,
  Star,
  User,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";

const stats = [
  {
    icon: Package,
    label: "Pengiriman Hari Ini",
    value: "8",
    trend: "+2",
    color: "from-[#F99912] to-[#C9C9C3]",
  },
  {
    icon: Truck,
    label: "Total Pengiriman",
    value: "1,234",
    trend: "+45",
    color: "from-[#64762C] to-[#424F17]",
  },
  {
    icon: Star,
    label: "Rating",
    value: "4.9",
    trend: "+0.1",
    color: "from-[#F99912] to-[#64762C]",
  },
  {
    icon: Clock,
    label: "Waktu Rata-rata",
    value: "25 min",
    trend: "-3 min",
    color: "from-[#C9C9C3] to-[#F99912]",
  },
];

const activeOrders = [
  {
    id: "DLV-001",
    customer: "Sarah W.",
    address: "Jl. Sudirman No. 45, Bogor Tengah",
    store: "Toko Oleh-Oleh Khas Bogor",
    items: 2,
    status: "pickup",
    distance: "2.3 km",
    phone: "+62812xxxxx89",
  },
  {
    id: "DLV-002",
    customer: "Budi A.",
    address: "Jl. Pajajaran No. 123, Bogor Utara",
    store: "Venus Bakery Bogor",
    items: 3,
    status: "delivering",
    distance: "4.5 km",
    phone: "+62813xxxxx56",
  },
  {
    id: "DLV-003",
    customer: "Citra N.",
    address: "Jl. Raya Puncak Km. 5, Cisarua",
    store: "Asinan Pak Jamal",
    items: 1,
    status: "pending",
    distance: "8.2 km",
    phone: "+62857xxxxx34",
  },
];

const deliveryHistory = [
  {
    id: "DLV-098",
    customer: "Dewi M.",
    time: "14:30",
    status: "completed",
    rating: 5,
  },
  {
    id: "DLV-097",
    customer: "Eko P.",
    time: "13:15",
    status: "completed",
    rating: 5,
  },
  {
    id: "DLV-096",
    customer: "Fitri R.",
    time: "11:45",
    status: "completed",
    rating: 4,
  },
];

export default function DriverDashboard() {
  return (
    <div className="space-y-8">
      {/* Driver Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#64762C]/20 via-[#F99912]/10 to-[#424F17]/20 border border-[#64762C]/20 p-6 lg:p-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#64762C]/10 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F99912] to-[#64762C] p-0.5">
              <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                <Truck className="w-8 h-8 text-[#F99912]" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Selamat Bekerja, Driver!
              </h2>
              <div className="flex items-center gap-3 mt-1">
                <span className="px-2 py-0.5 rounded-full bg-[#64762C]/20 text-[#64762C] text-xs font-medium flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#64762C] animate-pulse" />
                  Online
                </span>
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="w-4 h-4 fill-[#F99912] text-[#F99912]" />
                  4.9 (856 trips)
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-[#F99912]/20 border border-[#F99912]/30">
              <p className="text-xs text-muted-foreground">
                Penghasilan Hari Ini
              </p>
              <p className="text-xl font-bold text-[#F99912]">Rp 245.000</p>
            </div>
            <Button className="bg-gradient-to-r from-[#64762C] to-[#424F17] text-foreground font-semibold h-14">
              <Navigation className="mr-2 w-5 h-5" />
              Mulai Navigasi
            </Button>
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
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} p-0.5 mb-4`}
            >
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
        {/* Active Orders */}
        <div className="lg:col-span-2 backdrop-blur-xl bg-card/60 border border-[#F99912]/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-foreground">
                Pesanan Aktif
              </h3>
              <span className="px-2 py-1 rounded-full bg-[#F99912]/20 text-[#F99912] text-xs font-medium">
                {activeOrders.length} pesanan
              </span>
            </div>
            <Link href="/driver/orders">
              <Button
                variant="ghost"
                size="sm"
                className="text-[#F99912] hover:text-[#F99912]/80"
              >
                Lihat Semua
                <ArrowRight className="ml-1 w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            {activeOrders.map((order) => (
              <div
                key={order.id}
                className={`p-4 rounded-xl border transition-all ${
                  order.status === "delivering"
                    ? "bg-[#F99912]/5 border-[#F99912]/30"
                    : order.status === "pickup"
                      ? "bg-[#64762C]/5 border-[#64762C]/30"
                      : "bg-muted/30 border-[#F99912]/10"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        order.status === "delivering"
                          ? "bg-gradient-to-br from-[#F99912] to-[#64762C]"
                          : order.status === "pickup"
                            ? "bg-gradient-to-br from-[#64762C] to-[#424F17]"
                            : "bg-muted"
                      }`}
                    >
                      {order.status === "delivering" ? (
                        <Truck className="w-5 h-5 text-[#181612]" />
                      ) : order.status === "pickup" ? (
                        <Package className="w-5 h-5 text-foreground" />
                      ) : (
                        <Clock className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.store}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === "delivering"
                        ? "bg-[#F99912]/20 text-[#F99912]"
                        : order.status === "pickup"
                          ? "bg-[#64762C]/20 text-[#64762C]"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {order.status === "delivering"
                      ? "Mengantar"
                      : order.status === "pickup"
                        ? "Ambil Pesanan"
                        : "Pending"}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{order.customer}</span>
                    <span className="text-muted-foreground">
                      - {order.items} item
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <span className="text-muted-foreground">
                      {order.address}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border/50">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Navigation className="w-4 h-4" />
                      {order.distance}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 border-[#F99912]/30 hover:bg-[#F99912]/10"
                    >
                      <Phone className="w-4 h-4 mr-1" />
                      Telepon
                    </Button>
                    {order.status === "pickup" ? (
                      <Button
                        size="sm"
                        className="h-8 bg-gradient-to-r from-[#64762C] to-[#424F17] text-foreground"
                      >
                        <Package className="w-4 h-4 mr-1" />
                        Ambil
                      </Button>
                    ) : order.status === "delivering" ? (
                      <Button
                        size="sm"
                        className="h-8 bg-gradient-to-r from-[#F99912] to-[#64762C] text-[#181612]"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Selesai
                      </Button>
                    ) : (
                      <Button size="sm" className="h-8" variant="secondary">
                        <Navigation className="w-4 h-4 mr-1" />
                        Navigasi
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Today's Summary */}
          <div className="backdrop-blur-xl bg-card/60 border border-[#F99912]/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Ringkasan Hari Ini
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                <span className="text-sm text-muted-foreground">
                  Pengiriman Selesai
                </span>
                <span className="font-semibold text-foreground">6/8</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                <span className="text-sm text-muted-foreground">
                  Jarak Tempuh
                </span>
                <span className="font-semibold text-foreground">32.5 km</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                <span className="text-sm text-muted-foreground">
                  Tips Diterima
                </span>
                <span className="font-semibold text-[#F99912]">Rp 45.000</span>
              </div>
            </div>
          </div>

          {/* Recent Deliveries */}
          <div className="backdrop-blur-xl bg-card/60 border border-[#F99912]/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">
                Riwayat Terbaru
              </h3>
              <Link href="/driver/history">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#F99912] hover:text-[#F99912]/80"
                >
                  Semua
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {deliveryHistory.map((delivery) => (
                <div
                  key={delivery.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-muted/30"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#64762C]/20 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-[#64762C]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {delivery.customer}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {delivery.id} - {delivery.time}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-[#F99912] text-[#F99912]" />
                    <span className="text-sm font-medium text-foreground">
                      {delivery.rating}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
