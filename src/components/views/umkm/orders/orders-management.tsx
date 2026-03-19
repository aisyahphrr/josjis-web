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
  Bell,
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
import { Notification, Order } from "@/src/interface/umkm";
import { dummyOrders, statusConfig } from "@/src/lib/constants/umkm/orders";
import DriverTrackingMap from "./driver-tracking-map";

export default function OrdersManagement() {
  const [orders, setOrders] = useState<Order[]>(dummyOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotificationToast, setShowNotificationToast] = useState(false);
  const [lastNotification, setLastNotification] = useState<Notification | null>(
    null,
  );
  const [selectedOrderDetail, setSelectedOrderDetail] = useState<Order | null>(
    null,
  );

  const createNotification = (order: Order, newStatus: string) => {
    const statusMessages: Record<string, { title: string; message: string }> = {
      diproses: {
        title: "Pesanan Diterima ✓",
        message: `Pesanan ${order.orderNumber} berhasil diterima. Status: Diproses. Akan segera dipersiapkan untuk pengiriman.`,
      },
      dikirim: {
        title: "Siap Dikirim 📦",
        message: `Pesanan ${order.orderNumber} untuk ${order.customer} siap dikirim. Driver akan segera mengambil barang Anda.`,
      },
      selesai: {
        title: "Pesanan Selesai 🎊",
        message: `Pesanan ${order.orderNumber} telah sampai dan diterima oleh pelanggan. Terima kasih atas pembeliannya!`,
      },
    };

    const roleMapping: Record<string, "umkm" | "driver" | "customer"> = {
      diproses: "customer",
      dikirim: "driver",
      selesai: "customer",
    };

    const notification: Notification = {
      id: `notif-${Date.now()}`,
      type:
        newStatus === "selesai"
          ? "delivery"
          : newStatus === "dikirim"
            ? "status_update"
            : "order",
      title: statusMessages[newStatus].title,
      message: statusMessages[newStatus].message,
      orderId: order.id,
      orderNumber: order.orderNumber,
      customer: order.customer,
      product: order.product,
      status: newStatus as "diproses" | "dikirim" | "selesai",
      fromRole: roleMapping[newStatus],
      createdAt: new Date().toISOString(),
      isRead: false,
    };

    setNotifications((prev) => [notification, ...prev]);
    setLastNotification(notification);
    setShowNotificationToast(true);

    // Auto hide toast after 5 seconds
    setTimeout(() => setShowNotificationToast(false), 5000);
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    const order = orders.find((o) => o.id === orderId);
    if (order) {
      createNotification(order, newStatus);
    }

    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: newStatus as "diproses" | "dikirim" | "selesai",
            }
          : order,
      ),
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
                      onValueChange={(value: string) =>
                        handleStatusChange(order.id, value)
                      }
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
                    <p className="text-xs text-muted-foreground mb-1">
                      Catatan:
                    </p>
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
                    onClick={() => setSelectedOrderDetail(order)}
                    variant="ghost"
                    size="sm"
                    className="cursor-pointer text-[#F99912] hover:text-[#F99912]/80 hover:bg-[#F99912]/5"
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

      {/* Order Detail Modal */}
      {selectedOrderDetail && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <style>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
          <div className="backdrop-blur-xl bg-card/60 border border-[#F99912]/10 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-hide">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                Detail Pesanan
              </h2>
              <button
                onClick={() => setSelectedOrderDetail(null)}
                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Driver Tracking Map - Show when status is "dikirim" */}
              {selectedOrderDetail.status === "dikirim" &&
                selectedOrderDetail.driverName && (
                  <div className="border-b border-[#F99912]/10 pb-6">
                    <h3 className="font-semibold text-foreground mb-4">
                      Tracking Real-Time Driver
                    </h3>
                    <DriverTrackingMap
                      orderId={selectedOrderDetail.id}
                      driverName={selectedOrderDetail.driverName}
                      customerLocation={selectedOrderDetail.customerLocation}
                    />
                  </div>
                )}

              {/* Order Header */}
              <div className="space-y-3 border-b border-[#F99912]/10 pb-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Nomor Pesanan
                    </p>
                    <h1 className="text-2xl font-bold text-foreground">
                      {selectedOrderDetail.orderNumber}
                    </h1>
                  </div>
                  <div>
                    <span
                      className={`text-sm px-4 py-2 rounded-full font-medium ${
                        statusConfig[
                          selectedOrderDetail.status as keyof typeof statusConfig
                        ].color
                      }`}
                    >
                      {
                        statusConfig[
                          selectedOrderDetail.status as keyof typeof statusConfig
                        ].label
                      }
                    </span>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">
                    Informasi Pelanggan
                  </h3>
                  <div className="bg-muted/30 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">
                      Nama Pelanggan
                    </p>
                    <p className="font-medium text-foreground">
                      {selectedOrderDetail.customer}
                    </p>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">
                      Tanggal Pesanan
                    </p>
                    <p className="font-medium text-foreground">
                      {new Date(selectedOrderDetail.date).toLocaleDateString(
                        "id-ID",
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )}
                    </p>
                  </div>
                </div>

                {/* Product Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">
                    Informasi Produk
                  </h3>
                  <div className="bg-muted/30 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">
                      Nama Produk
                    </p>
                    <p className="font-medium text-foreground">
                      {selectedOrderDetail.product}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-muted/30 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-1">
                        Kuantitas
                      </p>
                      <p className="text-xl font-bold text-foreground">
                        {selectedOrderDetail.quantity}
                      </p>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-1">
                        Unit Price
                      </p>
                      <p className="text-sm font-medium text-[#F99912]">
                        Rp{" "}
                        {(
                          selectedOrderDetail.price /
                          selectedOrderDetail.quantity
                        ).toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Driver Information - Show when status is "dikirim" or "diproses" with driver assigned */}
              {(selectedOrderDetail.status === "dikirim" ||
                selectedOrderDetail.status === "diproses") &&
                selectedOrderDetail.driverName && (
                  <div className="space-y-3 border-b border-[#F99912]/10 pb-6">
                    <h3 className="font-semibold text-foreground">
                      Detail Driver
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-[#F99912]/20 to-[#F99912]/5 border border-[#F99912]/30 rounded-lg p-4">
                        <p className="text-sm text-muted-foreground mb-1">
                          Nama Driver
                        </p>
                        <p className="font-semibold text-foreground">
                          {selectedOrderDetail.driverName}
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30 rounded-lg p-4">
                        <p className="text-sm text-muted-foreground mb-1">
                          Nomor Telepon Driver
                        </p>
                        <p className="font-semibold text-foreground">
                          {selectedOrderDetail.driverPhone}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

              {/* Total Price */}
              <div className="bg-linear-to-r from-[#F99912]/20 to-[#64762C]/10 rounded-lg p-4 border border-[#F99912]/20">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-foreground">
                    Total Pesanan
                  </p>
                  <p className="text-3xl font-bold text-[#F99912]">
                    Rp {selectedOrderDetail.price.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>

              {/* Notes */}
              {selectedOrderDetail.notes && (
                <div className="space-y-3 border-t border-[#F99912]/10 pt-6">
                  <h3 className="font-semibold text-foreground">
                    Catatan Pesanan
                  </h3>
                  <div className="bg-muted/30 rounded-lg p-4">
                    <p className="text-foreground leading-relaxed">
                      {selectedOrderDetail.notes}
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-6 border-t border-[#F99912]/10">
                <Button
                  onClick={() => setSelectedOrderDetail(null)}
                  className="flex-1 bg-linear-to-r from-[#F99912] to-[#64762C] text-[#181612] font-semibold hover:shadow-lg hover:shadow-[#F99912]/30 transition-all duration-300 cursor-pointer"
                >
                  Tutup
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notification Toast */}
      {showNotificationToast && lastNotification && (
        <div className="fixed bottom-4 right-4 z-50 max-w-sm animate-in slide-in-from-bottom-4">
          <div className="backdrop-blur-xl bg-card/60 border border-[#F99912]/30 rounded-2xl p-4 shadow-xl shadow-[#F99912]/20">
            <div className="flex gap-3">
              <Bell className="w-5 h-5 text-[#F99912] shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground">
                  {lastNotification.title}
                </h4>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {lastNotification.message}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
