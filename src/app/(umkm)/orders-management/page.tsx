"use client";

import { useState } from "react";
import {
  Package,
  Clock,
  Check,
  Truck,
  Eye,
  Filter,
  Search,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  product: string;
  quantity: number;
  price: number;
  date: string;
  status: "diproses" | "dikirim" | "selesai";
  notes?: string;
}

const dummyOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-2026-001",
    customer: "Budi Santoso",
    product: "Dodol Kacang Bogor",
    quantity: 5,
    price: 225000,
    date: "2026-03-18",
    status: "diproses",
    notes: "Segera dikirim sebelum jam 5 sore",
  },
  {
    id: "2",
    orderNumber: "ORD-2026-002",
    customer: "Siti Nurhaliza",
    product: "Kue Lapis Sumedang",
    quantity: 10,
    price: 350000,
    date: "2026-03-17",
    status: "dikirim",
    notes: "Gunakan packaging premium",
  },
  {
    id: "3",
    orderNumber: "ORD-2026-003",
    customer: "Ahmad Wijaya",
    product: "Manisan Jambu",
    quantity: 3,
    price: 75000,
    date: "2026-03-16",
    status: "selesai",
  },
  {
    id: "4",
    orderNumber: "ORD-2026-004",
    customer: "Dewi Lestari",
    product: "Cookies Almond Premium",
    quantity: 2,
    price: 110000,
    date: "2026-03-18",
    status: "diproses",
    notes: "Tambahan catatan: Bisa ada diskon?",
  },
  {
    id: "5",
    orderNumber: "ORD-2026-005",
    customer: "Rudi Hermawan",
    product: "Tahu Goreng Crispy",
    quantity: 20,
    price: 300000,
    date: "2026-03-15",
    status: "dikirim",
  },
  {
    id: "6",
    orderNumber: "ORD-2026-006",
    customer: "Ani Wijaya",
    product: "Teh Herbal Bogor",
    quantity: 15,
    price: 450000,
    date: "2026-03-14",
    status: "selesai",
  },
  {
    id: "7",
    orderNumber: "ORD-2026-007",
    customer: "Hendra Kusuma",
    product: "Dodol Kacang Bogor",
    quantity: 8,
    price: 360000,
    date: "2026-03-18",
    status: "diproses",
  },
  {
    id: "8",
    orderNumber: "ORD-2026-008",
    customer: "Ratna Putri",
    product: "Manisan Jambu",
    quantity: 6,
    price: 150000,
    date: "2026-03-17",
    status: "dikirim",
    notes: "COD - Bayar di tempat",
  },
];

const statusConfig = {
  diproses: {
    label: "Diproses",
    color: "bg-blue-500/20 text-blue-400",
    icon: Clock,
  },
  dikirim: {
    label: "Dikirim",
    color: "bg-[#F99912]/20 text-[#F99912]",
    icon: Truck,
  },
  selesai: {
    label: "Selesai",
    color: "bg-[#64762C]/20 text-[#64762C]",
    icon: Check,
  },
};

export default function OrdersManagement() {
  const [orders, setOrders] = useState<Order[]>(dummyOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: newStatus as "diproses" | "dikirim" | "selesai",
            }
          : order
      )
    );
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || order.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: orders.length,
    diproses: orders.filter((o) => o.status === "diproses").length,
    dikirim: orders.filter((o) => o.status === "dikirim").length,
    selesai: orders.filter((o) => o.status === "selesai").length,
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Package className="w-8 h-8 text-[#F99912]" />
          Manajemen Pesanan Masuk
        </h1>
        <p className="text-muted-foreground mt-2">
          Kelola dan lacak semua pesanan masuk dari pelanggan
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="backdrop-blur-xl bg-card/60 border border-[#F99912]/10 rounded-2xl p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Pesanan</p>
          <p className="text-2xl font-bold text-foreground">{stats.total}</p>
        </div>
        <div className="backdrop-blur-xl bg-card/60 border border-blue-500/10 rounded-2xl p-4">
          <p className="text-sm text-blue-400 mb-1">Diproses</p>
          <p className="text-2xl font-bold text-blue-400">{stats.diproses}</p>
        </div>
        <div className="backdrop-blur-xl bg-card/60 border border-[#F99912]/10 rounded-2xl p-4">
          <p className="text-sm text-[#F99912] mb-1">Dikirim</p>
          <p className="text-2xl font-bold text-[#F99912]">{stats.dikirim}</p>
        </div>
        <div className="backdrop-blur-xl bg-card/60 border border-[#64762C]/10 rounded-2xl p-4">
          <p className="text-sm text-[#64762C] mb-1">Selesai</p>
          <p className="text-2xl font-bold text-[#64762C]">{stats.selesai}</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Cari nomor pesanan, pelanggan, atau produk..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-background/50 border-[#F99912]/10 text-foreground placeholder:text-muted-foreground focus:border-[#F99912]/30 focus:ring-[#F99912]/20"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40 bg-background/50 border-[#F99912]/10 text-foreground focus:ring-[#F99912]/20">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent className="bg-card border-[#F99912]/10">
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="diproses">Diproses</SelectItem>
              <SelectItem value="dikirim">Dikirim</SelectItem>
              <SelectItem value="selesai">Selesai</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Tidak ada pesanan yang sesuai dengan filter Anda
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const StatusIcon =
              statusConfig[order.status as keyof typeof statusConfig].icon;
            return (
              <div
                key={order.id}
                className="bg-muted/30 hover:bg-muted/50 rounded-xl p-4 transition-colors border border-[#F99912]/5"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-start mb-3">
                  {/* Order Number & Customer */}
                  <div className="lg:col-span-2">
                    <p className="text-sm text-muted-foreground">
                      Nomor Pesanan
                    </p>
                    <p className="font-semibold text-foreground">
                      {order.orderNumber}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {order.customer}
                    </p>
                  </div>

                  {/* Product */}
                  <div>
                    <p className="text-sm text-muted-foreground">Produk</p>
                    <p className="font-medium text-foreground line-clamp-1">
                      {order.product}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Qty: {order.quantity}
                    </p>
                  </div>

                  {/* Date & Price */}
                  <div className="hidden lg:block">
                    <p className="text-sm text-muted-foreground">Tanggal</p>
                    <p className="font-medium text-foreground">
                      {new Date(order.date).toLocaleDateString("id-ID")}
                    </p>
                    <p className="text-sm font-semibold text-[#F99912] mt-1">
                      Rp {order.price.toLocaleString("id-ID")}
                    </p>
                  </div>

                  {/* Status Dropdown */}
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Status</p>
                    <Select
                      value={order.status}
                      onValueChange={(value) => handleStatusChange(order.id, value)}
                    >
                      <SelectTrigger
                        className={`w-full text-sm font-medium ${
                          statusConfig[
                            order.status as keyof typeof statusConfig
                          ].color
                        } bg-background/30 border-none focus:ring-2 focus:ring-[#F99912]/20`}
                      >
                        <div className="flex items-center gap-2">
                          <StatusIcon className="w-4 h-4" />
                          <SelectValue />
                        </div>
                      </SelectTrigger>
                      <SelectContent className="bg-card border-[#F99912]/10">
                        <SelectItem value="diproses">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Diproses
                          </div>
                        </SelectItem>
                        <SelectItem value="dikirim">
                          <div className="flex items-center gap-2">
                            <Truck className="w-4 h-4" />
                            Dikirim
                          </div>
                        </SelectItem>
                        <SelectItem value="selesai">
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4" />
                            Selesai
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Order Notes */}
                {order.notes && (
                  <div className="mt-3 pt-3 border-t border-[#F99912]/10">
                    <p className="text-xs text-muted-foreground mb-1">Catatan:</p>
                    <p className="text-sm text-foreground italic">
                      "{order.notes}"
                    </p>
                  </div>
                )}

                {/* Mobile: Additional Info */}
                <div className="lg:hidden mt-3 pt-3 border-t border-[#F99912]/10 flex justify-between text-sm">
                  <div>
                    <p className="text-muted-foreground">Tanggal</p>
                    <p className="font-medium text-foreground">
                      {new Date(order.date).toLocaleDateString("id-ID")}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-right">Total</p>
                    <p className="font-semibold text-[#F99912] text-right">
                      Rp {order.price.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-3 pt-3 border-t border-[#F99912]/10 flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#F99912] hover:text-[#F99912]/80 hover:bg-[#F99912]/5"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Detail
                  </Button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
