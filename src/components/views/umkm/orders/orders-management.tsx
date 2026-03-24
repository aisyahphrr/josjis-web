"use client";

import { useEffect, useState } from "react";
import {
  Package,
  Clock,
  Check,
  Truck,
  Eye,
  Filter,
  Search,
  Loader2,
  X,
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
import { toast } from "@/src/hooks/use-toast";

interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  customerPhone: string;
  total: number;
  status: string;
  date: string;
  deliveryStatus: string;
  driverName?: string;
  driverPhone?: string;
  items: OrderItem[];
}

const statusConfig: Record<
  string,
  { label: string; color: string; icon: typeof Clock }
> = {
  PENDING: {
    label: "Pending",
    color: "bg-gray-500/20 text-gray-500",
    icon: Clock,
  },
  PROCESSING: {
    label: "Diproses",
    color: "bg-blue-500/20 text-blue-400",
    icon: Clock,
  },
  SHIPPED: {
    label: "Dikirim",
    color: "bg-[#F99912]/20 text-[#F99912]",
    icon: Truck,
  },
  DELIVERED: {
    label: "Selesai",
    color: "bg-[#64762C]/20 text-[#64762C]",
    icon: Check,
  },
  CANCELLED: {
    label: "Dibatalkan",
    color: "bg-red-500/20 text-red-500",
    icon: X,
  },
};

export default function OrdersManagement() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/orders/umkm");
      const data = await response.json();

      if (!data.success) {
        toast({
          title: "Error",
          description: "Gagal mengambil data pesanan",
        });
        return;
      }

      setOrders(data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast({
        title: "Error",
        description: "Gagal mengambil data pesanan",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) =>
        item.productName.toLowerCase().includes(searchTerm.toLowerCase()),
      );

    const matchesStatus =
      filterStatus === "all" || order.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "PENDING").length,
    processing: orders.filter((o) => o.status === "PROCESSING").length,
    shipped: orders.filter((o) => o.status === "SHIPPED").length,
    delivered: orders.filter((o) => o.status === "DELIVERED").length,
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
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="backdrop-blur-xl bg-card/60 border border-[#F99912]/10 rounded-2xl p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Pesanan</p>
          <p className="text-2xl font-bold text-foreground">{stats.total}</p>
        </div>
        <div className="backdrop-blur-xl bg-card/60 border border-gray-500/10 rounded-2xl p-4">
          <p className="text-sm text-gray-400 mb-1">Pending</p>
          <p className="text-2xl font-bold text-gray-400">{stats.pending}</p>
        </div>
        <div className="backdrop-blur-xl bg-card/60 border border-blue-500/10 rounded-2xl p-4">
          <p className="text-sm text-blue-400 mb-1">Diproses</p>
          <p className="text-2xl font-bold text-blue-400">{stats.processing}</p>
        </div>
        <div className="backdrop-blur-xl bg-card/60 border border-[#F99912]/10 rounded-2xl p-4">
          <p className="text-sm text-[#F99912] mb-1">Dikirim</p>
          <p className="text-2xl font-bold text-[#F99912]">{stats.shipped}</p>
        </div>
        <div className="backdrop-blur-xl bg-card/60 border border-[#64762C]/10 rounded-2xl p-4">
          <p className="text-sm text-[#64762C] mb-1">Selesai</p>
          <p className="text-2xl font-bold text-[#64762C]">{stats.delivered}</p>
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
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="PROCESSING">Diproses</SelectItem>
              <SelectItem value="SHIPPED">Dikirim</SelectItem>
              <SelectItem value="DELIVERED">Selesai</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-[#F99912] animate-spin" />
        </div>
      )}

      {/* Orders List */}
      {!isLoading && (
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
                statusConfig[order.status as keyof typeof statusConfig]?.icon ||
                Clock;
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

                    {/* Items Count */}
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Jumlah Item
                      </p>
                      <p className="font-medium text-foreground">
                        {order.items.length} Item
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {order.items.reduce(
                          (sum, item) => sum + item.quantity,
                          0,
                        )}{" "}
                        Pcs
                      </p>
                    </div>

                    {/* Date & Price */}
                    <div className="hidden lg:block">
                      <p className="text-sm text-muted-foreground">Tanggal</p>
                      <p className="font-medium text-foreground">
                        {new Date(order.date).toLocaleDateString("id-ID")}
                      </p>
                      <p className="text-sm font-semibold text-[#F99912] mt-1">
                        Rp {order.total.toLocaleString("id-ID")}
                      </p>
                    </div>

                    {/* Status Badge */}
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Status
                      </p>
                      <span
                        className={`text-sm px-3 py-1 rounded-full font-medium inline-block ${
                          statusConfig[
                            order.status as keyof typeof statusConfig
                          ]?.color || statusConfig.PENDING.color
                        }`}
                      >
                        {statusConfig[order.status as keyof typeof statusConfig]
                          ?.label || order.status}
                      </span>
                    </div>
                  </div>

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
                        Rp {order.total.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
