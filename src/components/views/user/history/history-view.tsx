"use client";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  ShoppingBag,
  Eye,
  Star,
  RotateCcw,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Textarea } from "@/src/components/ui/textarea";
import { Label } from "@/src/components/ui/label";
import { useUserStore } from "@/src/store/user-store";
import { getProductById } from "@/src/lib/constants/user/marketplace/products";

const statusConfig = {
  processing: {
    label: "Diproses",
    icon: Clock,
    color: "bg-yellow-500/20 text-yellow-500",
  },
  shipping: {
    label: "Dikirim",
    icon: Truck,
    color: "bg-blue-500/20 text-blue-500",
  },
  delivered: {
    label: "Selesai",
    icon: CheckCircle,
    color: "bg-green-500/20 text-green-500",
  },
};

export default function HistoryPage() {
  const { orders, addReview } = useUserStore();
  const [activeTab, setActiveTab] = useState("all");
  const [detailOpen, setDetailOpen] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5>(5);
  const [comment, setComment] = useState("");

  const filteredOrders =
    activeTab === "all"
      ? orders
      : orders.filter((order) => order.status === activeTab);

  const selectedOrder = selectedOrderId
    ? orders.find((o) => o.id === selectedOrderId) ?? null
    : null;

  return (
    <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Riwayat Pembelian
          </h1>
          <p className="text-muted-foreground">Lacak dan kelola pesanan Anda</p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-muted/50 border border-[#F99912]/10">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-[#F99912] data-[state=active]:text-[#181612]"
            >
              Semua
            </TabsTrigger>
            <TabsTrigger
              value="processing"
              className="data-[state=active]:bg-[#F99912] data-[state=active]:text-[#181612]"
            >
              Diproses
            </TabsTrigger>
            <TabsTrigger
              value="shipping"
              className="data-[state=active]:bg-[#F99912] data-[state=active]:text-[#181612]"
            >
              Dikirim
            </TabsTrigger>
            <TabsTrigger
              value="delivered"
              className="data-[state=active]:bg-[#F99912] data-[state=active]:text-[#181612]"
            >
              Selesai
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6 space-y-4">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => {
                const status =
                  statusConfig[order.status as keyof typeof statusConfig];
                return (
                  <Card
                    key={order.id}
                    className="bg-card/50 backdrop-blur border-[#F99912]/10 hover:border-[#F99912]/30 transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      {/* Order Header */}
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-[#F99912]/10">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-[#F99912]/10 flex items-center justify-center">
                            <Package className="w-5 h-5 text-[#F99912]" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">
                              {order.id}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {order.date}
                            </p>
                          </div>
                        </div>
                        <Badge className={status.color}>
                          <status.icon className="w-3 h-3 mr-1" />
                          {status.label}
                        </Badge>
                      </div>

                      {/* Order Items */}
                      <div className="space-y-3 mb-4">
                        {order.items.map((item, idx) => {
                          const p = getProductById(item.productId);
                          return (
                          <div key={idx} className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#F99912]/20 to-[#64762C]/20 flex items-center justify-center flex-shrink-0">
                              <ShoppingBag className="w-6 h-6 text-[#F99912]/50" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-foreground truncate">
                                {p?.name ?? `Produk #${item.productId}`}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {item.quantity}x Rp {item.price.toLocaleString()}
                              </p>
                            </div>
                          </div>
                          );
                        })}
                      </div>

                      {/* Order Footer */}
                      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#F99912]/10">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Total Pembayaran
                          </p>
                          <p className="text-lg font-bold text-[#F99912]">
                            Rp {order.total.toLocaleString()}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-[#F99912]/30 hover:bg-[#F99912]/10"
                            onClick={() => {
                              setSelectedOrderId(order.id);
                              setDetailOpen(true);
                            }}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Detail
                          </Button>
                          {order.status === "delivered" && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-[#F99912]/30 hover:bg-[#F99912]/10"
                                onClick={() => {
                                  setSelectedOrderId(order.id);
                                  setSelectedProductId(order.items[0]?.productId ?? null);
                                  setRating(5);
                                  setComment("");
                                  setRatingOpen(true);
                                }}
                              >
                                <Star className="w-4 h-4 mr-1" />
                                Beri Rating
                              </Button>
                              <Link href="/dashboard-user/marketplace">
                                <Button
                                  size="sm"
                                  className="bg-gradient-to-r from-[#F99912] to-[#64762C] text-[#181612]"
                                >
                                  <RotateCcw className="w-4 h-4 mr-1" />
                                  Beli Lagi
                                </Button>
                              </Link>
                            </>
                          )}
                          {order.status === "shipping" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-blue-500/30 text-blue-500 hover:bg-blue-500/10"
                            >
                              <Truck className="w-4 h-4 mr-1" />
                              Lacak
                            </Button>
                          )}
                          {order.status === "processing" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-[#F99912]/30 hover:bg-[#F99912]/10"
                            >
                              <MessageSquare className="w-4 h-4 mr-1" />
                              Chat Seller
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <Card className="bg-card/50 backdrop-blur border-[#F99912]/10">
                <CardContent className="p-12 text-center">
                  <Package className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Tidak Ada Pesanan
                  </h3>
                  <p className="text-muted-foreground">
                    Belum ada pesanan dengan status ini
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Detail Dialog */}
        <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>Detail Pesanan</DialogTitle>
              <DialogDescription>
                Informasi lengkap pesanan dan daftar produk.
              </DialogDescription>
            </DialogHeader>
            {selectedOrder ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-muted/30 p-4 border border-[#F99912]/10">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Order ID</p>
                      <p className="font-semibold">{selectedOrder.id}</p>
                    </div>
                    <Badge
                      className={
                        statusConfig[selectedOrder.status].color +
                        " whitespace-nowrap"
                      }
                    >
                      <span className="inline-flex items-center">
                        {statusConfig[selectedOrder.status].label}
                      </span>
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Tanggal: {new Date(selectedOrder.createdAtISO).toLocaleString()}
                  </p>
                </div>

                <div className="rounded-xl bg-muted/30 p-4 border border-[#F99912]/10 space-y-2">
                  <p className="text-sm font-medium text-foreground">List Produk</p>
                  {selectedOrder.items.map((it) => {
                    const p = getProductById(it.productId);
                    return (
                      <div
                        key={`${selectedOrder.id}-${it.productId}`}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="truncate">
                          {p?.name ?? `Produk #${it.productId}`}{" "}
                          <span className="text-muted-foreground">
                            x{it.quantity}
                          </span>
                        </span>
                        <span className="font-medium">
                          Rp {(it.price * it.quantity).toLocaleString()}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="rounded-xl bg-muted/30 p-4 border border-[#F99912]/10">
                  <p className="text-sm text-muted-foreground">Alamat pengiriman</p>
                  <p className="text-sm">
                    {selectedOrder.shippingAddress ?? "Alamat belum diinput."}
                  </p>
                </div>

                <div className="rounded-xl bg-muted/30 p-4 border border-[#F99912]/10 flex items-center justify-between">
                  <span className="font-medium">Total harga</span>
                  <span className="text-lg font-bold text-[#F99912]">
                    Rp {selectedOrder.total.toLocaleString()}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Pesanan tidak ditemukan.</p>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                className="border-[#F99912]/30 hover:bg-[#F99912]/10"
                onClick={() => setDetailOpen(false)}
              >
                Tutup
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Rating Dialog */}
        <Dialog open={ratingOpen} onOpenChange={setRatingOpen}>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>Beri Rating & Ulasan</DialogTitle>
              <DialogDescription>
                Rating akan tampil di halaman produk secara permanen.
              </DialogDescription>
            </DialogHeader>
            {selectedOrder ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Pilih Produk</Label>
                  <div className="flex flex-wrap gap-2">
                    {selectedOrder.items.map((it) => {
                      const p = getProductById(it.productId);
                      const active = selectedProductId === it.productId;
                      return (
                        <Button
                          key={it.productId}
                          type="button"
                          size="sm"
                          variant={active ? "default" : "outline"}
                          className={
                            active
                              ? "bg-[#F99912] text-[#181612] hover:bg-[#F99912]/90"
                              : "border-[#F99912]/30 hover:bg-[#F99912]/10"
                          }
                          onClick={() => setSelectedProductId(it.productId)}
                        >
                          {p?.name ?? `Produk #${it.productId}`}
                        </Button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Rating</Label>
                  <div className="flex items-center gap-2">
                    {([1, 2, 3, 4, 5] as const).map((v) => (
                      <button
                        key={v}
                        className="p-1"
                        onClick={() => setRating(v)}
                        aria-label={`Beri ${v} bintang`}
                      >
                        <Star
                          className={
                            v <= rating
                              ? "w-6 h-6 fill-[#F99912] text-[#F99912]"
                              : "w-6 h-6 text-muted-foreground"
                          }
                        />
                      </button>
                    ))}
                    <span className="text-sm text-muted-foreground">{rating}/5</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="review">Ulasan</Label>
                  <Textarea
                    id="review"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tulis pengalaman kamu..."
                    className="bg-muted/50 border-[#F99912]/10 focus:border-[#F99912]/50 min-h-[120px]"
                  />
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Pesanan tidak ditemukan.</p>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                className="border-[#F99912]/30 hover:bg-[#F99912]/10"
                onClick={() => setRatingOpen(false)}
              >
                Batal
              </Button>
              <Button
                className="bg-gradient-to-r from-[#F99912] to-[#64762C] text-[#181612]"
                onClick={() => {
                  if (!selectedOrder || !selectedProductId) return;
                  addReview({
                    orderId: selectedOrder.id,
                    productId: selectedProductId,
                    rating,
                    comment: comment.trim() || "Produk bagus!",
                  });
                  setRatingOpen(false);
                }}
              >
                Submit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
