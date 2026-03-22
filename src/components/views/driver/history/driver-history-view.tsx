"use client";
import {
  Package,
  MapPin,
  Star,
  Calendar,
  Clock,
  User,
  MessageSquare,
  ArrowLeft,
  Search,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import Link from "next/link";
import { useState } from "react";

interface DeliveredOrder {
  id: string;
  customer: string;
  store: string;
  address: string;
  items: number;
  deliveredAt: string;
  duration: string;
  rating: number;
  feedback?: string;
  earnings: number;
}

const deliveredOrdersData: DeliveredOrder[] = [
  {
    id: "DLV-098",
    customer: "Dewi M.",
    store: "Toko Oleh-Oleh Khas Bogor",
    address: "Jl. Sudirman No. 45, Bogor Tengah",
    items: 2,
    deliveredAt: "2024-03-20 14:30",
    duration: "28 min",
    rating: 5,
    feedback: "Rapih, cepat, dan profesional!",
    earnings: 35000,
  },
  {
    id: "DLV-097",
    customer: "Eko P.",
    store: "Venus Bakery Bogor",
    address: "Jl. Pajajaran No. 123, Bogor Utara",
    items: 3,
    deliveredAt: "2024-03-20 13:15",
    duration: "22 min",
    rating: 5,
    feedback: "Makasih pak!",
    earnings: 45000,
  },
  {
    id: "DLV-096",
    customer: "Fitri R.",
    store: "Asinan Pak Jamal",
    address: "Jl. Raya Puncak Km. 5, Cisarua",
    items: 1,
    deliveredAt: "2024-03-20 11:45",
    duration: "35 min",
    rating: 4,
    feedback: "Baik, tapi lambat dikit",
    earnings: 40000,
  },
  {
    id: "DLV-095",
    customer: "Rahma S.",
    store: "Toko Oleh-Oleh Khas Bogor",
    address: "Jl. Ahmad Yani No. 78, Bogor Selatan",
    items: 2,
    deliveredAt: "2024-03-19 16:20",
    duration: "31 min",
    rating: 5,
    feedback: "",
    earnings: 38000,
  },
  {
    id: "DLV-094",
    customer: "Sandi B.",
    store: "Venus Bakery Bogor",
    address: "Jl. Gunung Batu No. 12, Bogor Pusat",
    items: 4,
    deliveredAt: "2024-03-19 14:50",
    duration: "26 min",
    rating: 4,
    feedback: "Cukup baik",
    earnings: 52000,
  },
];

export default function DriverHistoryView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<DeliveredOrder | null>(
    null,
  );

  const filteredOrders = deliveredOrdersData.filter(
    (order) =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.store.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalEarnings = deliveredOrdersData.reduce(
    (sum, order) => sum + order.earnings,
    0,
  );
  const averageRating = (
    deliveredOrdersData.reduce((sum, order) => sum + order.rating, 0) /
    deliveredOrdersData.length
  ).toFixed(1);

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard-driver">
            <Button size="sm" variant="outline">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Riwayat Pengiriman
            </h1>
            <p className="text-sm text-muted-foreground">
              Semua pengiriman yang telah diselesaikan
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="backdrop-blur-xl bg-card/60 border border-[#F99912]/10 rounded-2xl p-4">
          <p className="text-xs text-muted-foreground font-medium mb-2">
            Total Pengiriman
          </p>
          <p className="text-2xl font-bold text-foreground">
            {deliveredOrdersData.length}
          </p>
        </div>
        <div className="backdrop-blur-xl bg-card/60 border border-[#F99912]/10 rounded-2xl p-4">
          <p className="text-xs text-muted-foreground font-medium mb-2">
            Rating Rata-rata
          </p>
          <div className="flex items-center gap-1">
            <p className="text-2xl font-bold text-foreground">
              {averageRating}
            </p>
            <Star className="w-5 h-5 fill-[#F99912] text-[#F99912]" />
          </div>
        </div>
        <div className="backdrop-blur-xl bg-card/60 border border-[#F99912]/10 rounded-2xl p-4">
          <p className="text-xs text-muted-foreground font-medium mb-2">
            Total Penghasilan
          </p>
          <p className="text-2xl font-bold text-[#F99912]">
            Rp {totalEarnings.toLocaleString("id-ID")}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Cari order, pelanggan, atau toko..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-background border-[#64762C]/30"
        />
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Package className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>Tidak ada riwayat pengiriman</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="backdrop-blur-xl bg-card/60 border border-[#F99912]/10 rounded-2xl p-4 hover:border-[#F99912]/30 transition-all cursor-pointer"
              onClick={() => setSelectedOrder(order)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  {/* Order Header */}
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-foreground">
                      {order.id}
                    </h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-[#F99912] text-[#F99912]" />
                      <span className="text-sm font-medium text-foreground">
                        {order.rating}
                      </span>
                    </div>
                  </div>

                  {/* Store & Customer */}
                  <div className="space-y-2 mb-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Toko</p>
                      <p className="text-sm font-medium text-foreground">
                        {order.store}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        {order.customer}
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                      <p className="text-sm text-muted-foreground">
                        {order.address}
                      </p>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="flex items-center gap-2 text-xs">
                      <Package className="w-3 h-3 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {order.items} item
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {order.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Calendar className="w-3 h-3 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {order.deliveredAt}
                      </span>
                    </div>
                  </div>

                  {/* Feedback */}
                  {order.feedback && (
                    <div className="p-2 bg-muted/30 rounded-lg mb-3">
                      <p className="text-xs text-muted-foreground italic">
                        "{order.feedback}"
                      </p>
                    </div>
                  )}

                  {/* Earnings */}
                  <div className="flex items-center justify-between pt-3 border-t border-border/50">
                    <span className="text-xs text-muted-foreground">
                      Penghasilan
                    </span>
                    <span className="font-semibold text-[#F99912]">
                      + Rp {order.earnings.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50 p-4">
          <div className="bg-card rounded-t-3xl w-full max-w-md shadow-2xl animate-in slide-in-from-bottom">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-foreground">
                  {selectedOrder.id}
                </h2>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setSelectedOrder(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </Button>
              </div>

              {/* Details */}
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-1">
                    TOKO
                  </p>
                  <p className="font-semibold text-foreground">
                    {selectedOrder.store}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-1">
                    PELANGGAN
                  </p>
                  <p className="font-semibold text-foreground">
                    {selectedOrder.customer}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-1">
                    ALAMAT
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedOrder.address}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground font-medium mb-1">
                      ITEM
                    </p>
                    <p className="font-semibold text-foreground">
                      {selectedOrder.items}x
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium mb-1">
                      DURASI
                    </p>
                    <p className="font-semibold text-foreground">
                      {selectedOrder.duration}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground font-medium mb-1">
                      RATING
                    </p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < selectedOrder.rating
                              ? "fill-[#F99912] text-[#F99912]"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium mb-1">
                      PENGHASILAN
                    </p>
                    <p className="font-semibold text-[#F99912]">
                      + Rp {selectedOrder.earnings.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>

                {selectedOrder.feedback && (
                  <div>
                    <p className="text-xs text-muted-foreground font-medium mb-2">
                      FEEDBACK PELANGGAN
                    </p>
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <p className="text-sm text-muted-foreground italic">
                        "{selectedOrder.feedback}"
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 border-[#64762C]/30 hover:bg-[#64762C]/10"
                  onClick={() => setSelectedOrder(null)}
                >
                  Tutup
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
