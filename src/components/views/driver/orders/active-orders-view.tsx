"use client";
import {
  Truck,
  Package,
  MapPin,
  MessageCircle,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { useState } from "react";

interface ActiveOrder {
  id: string;
  customer: string;
  address: string;
  store: string;
  items: number;
  status: "pickup" | "delivering";
  distance: string;
  phone: string;
}

const activeOrdersData: ActiveOrder[] = [
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
];

export default function ActiveOrdersView() {
  const [orders, setOrders] = useState(activeOrdersData);

  const handleTakeOrder = (orderId: string) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: "delivering" } : order,
      ),
    );
  };

  const handleCompleteOrder = (orderId: string) => {
    setOrders(orders.filter((order) => order.id !== orderId));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Pesanan Aktif</h1>
          <p className="text-muted-foreground mt-1">Kelola pengiriman Anda</p>
        </div>
        <span className="px-4 py-2 rounded-xl bg-[#F99912]/20 text-[#F99912] font-semibold text-lg">
          {orders.length} pesanan
        </span>
      </div>

      {/* Active Orders Cards */}
      <div className="space-y-4">
        {orders.length === 0 ? (
          <div className="text-center py-12 bg-card/60 border border-border rounded-2xl">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">Tidak ada pesanan aktif</p>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className={`p-6 rounded-2xl border transition-all backdrop-blur-xl ${
                order.status === "delivering"
                  ? "bg-[#F99912]/5 border-[#F99912]/30"
                  : "bg-[#64762C]/5 border-[#64762C]/30"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      order.status === "delivering"
                        ? "bg-gradient-to-br from-[#F99912] to-[#64762C]"
                        : "bg-gradient-to-br from-[#64762C] to-[#424F17]"
                    }`}
                  >
                    {order.status === "delivering" ? (
                      <Truck className="w-6 h-6 text-[#181612]" />
                    ) : (
                      <Package className="w-6 h-6 text-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-lg text-foreground">
                      {order.id}
                    </p>
                    <p className="text-sm text-muted-foreground font-medium">
                      {order.store}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === "delivering"
                      ? "bg-[#F99912]/20 text-[#F99912]"
                      : "bg-[#64762C]/20 text-[#64762C]"
                  }`}
                >
                  {order.status === "delivering"
                    ? "Mengantar"
                    : "Ambil Pesanan"}
                </span>
              </div>

              {/* Order Details */}
              <div className="space-y-3 mb-4 p-4 rounded-xl bg-background/50">
                <div className="flex items-start gap-3">
                  <span className="text-muted-foreground text-sm font-medium min-w-fit">
                    Penerima:
                  </span>
                  <span className="text-foreground">{order.customer}</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    {order.address}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground font-medium">
                    Item: {order.items}
                  </span>
                  <span className="text-sm text-muted-foreground font-medium">
                    Jarak: {order.distance}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <Link href={`/tracking?orderId=${order.id}`} className="flex-1">
                  <Button className="w-full h-10 bg-linear-to-r from-[#64762C] to-[#424F17] text-foreground font-semibold cursor-pointer">
                    <MapPin className="w-4 h-4 mr-2" />
                    Lihat Peta
                  </Button>
                </Link>
                <Link href="/chat-driver">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-10 px-4 border-[#F99912]/30 hover:bg-[#F99912]/10"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </Link>
                <Button
                  size="sm"
                  className="h-10 px-4 bg-linear-to-r from-[#F99912] to-[#64762C] text-[#181612] cursor-pointer"
                  onClick={() => handleCompleteOrder(order.id)}
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Selesai
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
