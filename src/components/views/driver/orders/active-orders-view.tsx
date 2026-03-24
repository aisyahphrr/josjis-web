"use client";
import {
  Truck,
  Package,
  MapPin,
  MessageCircle,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "@/src/hooks/use-toast";

interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

interface ActiveOrder {
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

export default function ActiveOrdersView() {
  const [orders, setOrders] = useState<ActiveOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/orders/driver");
      const data = await response.json();

      if (!data.success) {
        toast({
          title: "Error",
          description: "Gagal mengambil data pesanan",
        });
        return;
      }

      // Transform delivery data to match our interface
      const transformedOrders: ActiveOrder[] = data.deliveries.map(
        (delivery: any) => ({
          id: delivery.id,
          orderNumber: `ORD-${delivery.orderId.substring(0, 8).toUpperCase()}`,
          customer: delivery.order.buyer.name,
          customerPhone: delivery.order.buyer.phone || "+62812xxxxx89",
          total: delivery.order.totalAmountInIdr,
          status: delivery.order.status,
          date: new Date(delivery.order.createdAt).toLocaleDateString(),
          deliveryStatus: delivery.status,
          driverName: delivery.driver?.name,
          driverPhone: delivery.driver?.phone,
          items: delivery.order.items.map((item: any) => ({
            id: item.id,
            productName: item.product.name,
            quantity: item.quantity,
            unitPrice: item.unitPriceInIdr,
            subtotal: item.subtotalInIdr,
          })),
        }),
      );

      setOrders(transformedOrders);
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

  const handleAcceptOrder = async (deliveryId: string) => {
    try {
      setProcessingId(deliveryId);
      const response = await fetch("/api/orders/driver", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deliveryId,
          action: "accept",
        }),
      });

      const data = await response.json();

      if (!data.success) {
        toast({
          title: "Error",
          description: data.message || "Gagal menerima pesanan",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Pesanan diterima! Mohon ambil dari UMKM",
      });
      await fetchOrders();
    } catch (error) {
      console.error("Error accepting order:", error);
      toast({
        title: "Error",
        description: "Gagal menerima pesanan",
      });
    } finally {
      setProcessingId(null);
    }
  };

  const handlePickupOrder = async (deliveryId: string) => {
    try {
      setProcessingId(deliveryId);
      const response = await fetch("/api/orders/driver", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deliveryId,
          action: "pickup",
        }),
      });

      const data = await response.json();

      if (!data.success) {
        toast({
          title: "Error",
          description: data.message || "Gagal memperbarui status",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Paket berhasil diambil, mulai pengiriman",
      });
      await fetchOrders();
    } catch (error) {
      console.error("Error picking up order:", error);
      toast({
        title: "Error",
        description: "Gagal memperbarui status",
      });
    } finally {
      setProcessingId(null);
    }
  };

  const handleCompleteOrder = async (deliveryId: string) => {
    try {
      setProcessingId(deliveryId);
      const response = await fetch("/api/orders/driver", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deliveryId,
          action: "deliver",
        }),
      });

      const data = await response.json();

      if (!data.success) {
        toast({
          title: "Error",
          description: data.message || "Gagal menyelesaikan pesanan",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Pesanan berhasil dikirim!",
      });
      await fetchOrders();
    } catch (error) {
      console.error("Error completing order:", error);
      toast({
        title: "Error",
        description: "Gagal menyelesaikan pesanan",
      });
    } finally {
      setProcessingId(null);
    }
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "ASSIGNED":
      case "PICKED_UP":
      case "ON_THE_WAY":
        return "bg-[#F99912]/20 text-[#F99912]";
      case "WAITING_DRIVER":
        return "bg-[#64762C]/20 text-[#64762C]";
      case "DELIVERED":
        return "bg-green-500/20 text-green-500";
      default:
        return "bg-gray-500/20 text-gray-500";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "WAITING_DRIVER":
        return "Menunggu Driver";
      case "ASSIGNED":
        return "Driver Accepted";
      case "PICKED_UP":
        return "Sedang Diambil";
      case "ON_THE_WAY":
        return "Sedang Dikirim";
      case "DELIVERED":
        return "Selesai";
      default:
        return status;
    }
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

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-[#F99912] animate-spin" />
        </div>
      )}

      {/* Active Orders Cards */}
      {!isLoading && (
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
                  ["PICKED_UP", "ON_THE_WAY"].includes(order.deliveryStatus)
                    ? "bg-[#F99912]/5 border-[#F99912]/30"
                    : "bg-[#64762C]/5 border-[#64762C]/30"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        ["PICKED_UP", "ON_THE_WAY"].includes(
                          order.deliveryStatus,
                        )
                          ? "bg-gradient-to-br from-[#F99912] to-[#64762C]"
                          : "bg-gradient-to-br from-[#64762C] to-[#424F17]"
                      }`}
                    >
                      {["PICKED_UP", "ON_THE_WAY"].includes(
                        order.deliveryStatus,
                      ) ? (
                        <Truck className="w-6 h-6 text-[#181612]" />
                      ) : (
                        <Package className="w-6 h-6 text-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-lg text-foreground">
                        {order.orderNumber}
                      </p>
                      <p className="text-sm text-muted-foreground font-medium">
                        {order.customer}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeStyle(order.deliveryStatus)}`}
                  >
                    {getStatusLabel(order.deliveryStatus)}
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
                    <span className="text-muted-foreground text-sm font-medium min-w-fit">
                      Telepon:
                    </span>
                    <span className="text-foreground">
                      {order.customerPhone}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-muted-foreground text-sm font-medium min-w-fit">
                      Total Items:
                    </span>
                    <span className="text-foreground">
                      {order.items.length} item
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-muted-foreground text-sm font-medium min-w-fit">
                      Total:
                    </span>
                    <span className="text-foreground font-semibold">
                      Rp {order.total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <Link
                    href={`/tracking?orderId=${order.id}`}
                    className="flex-1"
                  >
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

                  {order.deliveryStatus === "WAITING_DRIVER" && (
                    <Button
                      size="sm"
                      className="h-10 px-4 bg-linear-to-r from-[#64762C] to-[#424F17] text-foreground cursor-pointer"
                      onClick={() => handleAcceptOrder(order.id)}
                      disabled={processingId === order.id}
                    >
                      {processingId === order.id ? (
                        <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                      ) : (
                        <CheckCircle className="w-4 h-4 mr-1" />
                      )}
                      Terima
                    </Button>
                  )}

                  {order.deliveryStatus === "ASSIGNED" && (
                    <Button
                      size="sm"
                      className="h-10 px-4 bg-linear-to-r from-[#F99912] to-[#64762C] text-[#181612] cursor-pointer"
                      onClick={() => handlePickupOrder(order.id)}
                      disabled={processingId === order.id}
                    >
                      {processingId === order.id ? (
                        <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                      ) : (
                        <Package className="w-4 h-4 mr-1" />
                      )}
                      Ambil Pesanan
                    </Button>
                  )}

                  {["PICKED_UP", "ON_THE_WAY"].includes(
                    order.deliveryStatus,
                  ) && (
                    <Button
                      size="sm"
                      className="h-10 px-4 bg-linear-to-r from-[#F99912] to-[#64762C] text-[#181612] cursor-pointer"
                      onClick={() => handleCompleteOrder(order.id)}
                      disabled={processingId === order.id}
                    >
                      {processingId === order.id ? (
                        <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                      ) : (
                        <CheckCircle className="w-4 h-4 mr-1" />
                      )}
                      Selesai
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
