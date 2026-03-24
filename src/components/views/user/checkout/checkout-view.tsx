"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import { Textarea } from "@/src/components/ui/textarea";
import {
  MapPin,
  CreditCard,
  Wallet,
  Building2,
  ShoppingBag,
  Check,
  Truck,
  Clock,
  Shield,
  Copy,
} from "lucide-react";
import Link from "next/link";
import { useUserStore } from "@/src/store/user-store";
import { getProductById } from "@/src/lib/constants/user/marketplace/products";
import { useState, useMemo, useEffect } from "react";
import toast from "react-hot-toast";

declare global {
  interface Window {
    snap: any;
  }
}

const paymentMethods = [
  {
    id: "ewallet",
    name: "E-Wallet",
    icon: Wallet,
    options: ["GoPay", "OVO", "DANA", "ShopeePay"],
  },
  {
    id: "bank",
    name: "Transfer Bank",
    icon: Building2,
    options: ["BCA", "Mandiri", "BNI", "BRI"],
  },
  {
    id: "va",
    name: "Virtual Account",
    icon: CreditCard,
    options: ["VA Otomatis (instan)"],
  },
];

export default function CheckoutPage() {
  const { cart, checkout, orders } = useUserStore();
  const [selectedPayment, setSelectedPayment] = useState<
    "ewallet" | "bank" | "va"
  >("ewallet");
  const [selectedProvider, setSelectedProvider] = useState<string>("GoPay");
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastOrderId, setLastOrderId] = useState<string | null>(null);
  const [shippingAddress, setShippingAddress] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  useEffect(() => {
    // Load script Snap Midtrans
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "";

    const script = document.createElement("script");
    script.src = snapScript;
    script.setAttribute("data-client-key", clientKey);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const orderItems = useMemo(() => {
    return cart
      .map((c) => {
        // Try to get from stored product data first
        if (c.product) {
          return {
            id: c.productId,
            name: c.product.name,
            price: c.product.price,
            quantity: c.quantity,
            seller: c.product.sellerName,
          };
        }

        // Fallback to local database lookup
        const p = getProductById(c.productId as number);
        if (!p) return null;
        return {
          id: p.id,
          name: p.name,
          price: p.price,
          quantity: c.quantity,
          seller: p.sellerName,
        };
      })
      .filter(Boolean) as Array<{
      id: string | number;
      name: string;
      price: number;
      quantity: number;
      seller: string;
    }>;
  }, [cart]);

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const total = subtotal;

  const lastOrder = lastOrderId
    ? (orders.find((o) => o.id === lastOrderId) ?? null)
    : null;

  const handlePayment = async () => {
    setIsProcessing(true);

    if (!shippingAddress || shippingAddress.trim() === "") {
      toast.error("Alamat pengiriman diperlukan");
      setIsProcessing(false);
      return;
    }

    try {
      // For MVP: prepare order items with available data
      // In production, fetch sellerId from product database
      const apiOrderItems = cart.map((c) => ({
        productId: String(c.productId),
        productName: c.product?.name || "Produk Marketplace",
        sellerId: c.product?.sellerName || "unknown", // Temp: use sellerName as fallback
        quantity: c.quantity,
        unitPriceInIdr: c.product?.price || 0,
        subtotalInIdr: (c.product?.price || 0) * c.quantity,
      }));

      // Call API to create order in database and get snap token
      const orderResponse = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: apiOrderItems,
          totalAmountInIdr: total,
          shippingAddress,
          notes,
          paymentMethod: selectedPayment,
          paymentProvider: selectedProvider,
        }),
      });

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json();
        throw new Error(errorData.message || "Failed to create order");
      }

      const orderData = await orderResponse.json();

      // Trigger Midtrans Snap
      if (window.snap && orderData.token) {
        window.snap.pay(orderData.token, {
          onSuccess: function () {
            toast.success("Pembayaran Berhasil!");
            // Also save to local store just in case
            const order = checkout(selectedPayment, {
              provider: selectedProvider,
            });
            setLastOrderId(order.id);
            setIsProcessing(false);
          },
          onPending: function () {
            toast.success("Menunggu pembayaran Anda!");
            const order = checkout(selectedPayment, {
              provider: selectedProvider,
            });
            setLastOrderId(order.id);
            setIsProcessing(false);
          },
          onError: function () {
            toast.error("Pembayaran Gagal.");
            setIsProcessing(false);
          },
          onClose: function () {
            toast.error("Anda belum menyelesaikan pembayaran");
            setIsProcessing(false);
          },
        });
      } else {
        throw new Error("Gagal memuat sistem pembayaran");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      toast.error(
        error instanceof Error ? error.message : "Gagal membuat order",
      );
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Checkout</h1>
        <p className="text-muted-foreground">Lengkapi pesanan Anda</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Forms */}
        <div className="lg:col-span-2 space-y-6">
          {lastOrder ? (
            <Card className="bg-card/50 backdrop-blur border-[#F99912]/10">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  Pembayaran Berhasil Dibuat
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-xl bg-muted/30 p-4 border border-[#F99912]/10">
                  <p className="text-sm text-muted-foreground">Nomor Invoice</p>
                  <p className="text-lg font-bold text-foreground">
                    {lastOrder.payment.invoiceNumber}
                  </p>
                </div>

                <div className="rounded-xl bg-muted/30 p-4 border border-[#F99912]/10">
                  <p className="text-sm text-muted-foreground">
                    Metode Pembayaran
                  </p>
                  <p className="font-medium text-foreground">
                    {lastOrder.payment.method === "va"
                      ? "Virtual Account"
                      : lastOrder.payment.method === "bank"
                        ? `Transfer Bank (${(lastOrder.payment as any).bankName})`
                        : `E-Wallet (${(lastOrder.payment as any).provider})`}
                  </p>

                  {lastOrder.payment.method === "ewallet" ? (
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm text-muted-foreground">
                          Payment link
                        </p>
                        <p className="text-sm font-mono truncate">
                          {(lastOrder.payment as any).paymentLink}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        className="border-[#F99912]/30 hover:bg-[#F99912]/10"
                        onClick={async () => {
                          await navigator.clipboard.writeText(
                            (lastOrder.payment as any).paymentLink,
                          );
                        }}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                    </div>
                  ) : (
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm text-muted-foreground">
                          Nomor Virtual Account
                        </p>
                        <p className="text-lg font-mono font-semibold">
                          {(lastOrder.payment as any).virtualAccountNumber}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        className="border-[#F99912]/30 hover:bg-[#F99912]/10"
                        onClick={async () => {
                          await navigator.clipboard.writeText(
                            (lastOrder.payment as any).virtualAccountNumber,
                          );
                        }}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/orders" className="flex-1">
                    <Button className="w-full bg-linear-to-r from-[#F99912] to-[#64762C] text-[#181612]">
                      Lihat Riwayat
                    </Button>
                  </Link>
                  <Link href="/dashboard-user/marketplace" className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full border-[#F99912]/30 hover:bg-[#F99912]/10"
                    >
                      Belanja Lagi
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Shipping Address */}
              <Card className="bg-card/50 backdrop-blur border-[#F99912]/10">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#F99912]" />
                    Alamat Pengiriman
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama Penerima</Label>
                      <Input
                        id="name"
                        placeholder="Nama lengkap"
                        defaultValue="John Doe"
                        className="bg-muted/50 border-[#F99912]/10 focus:border-[#F99912]/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Nomor Telepon</Label>
                      <Input
                        id="phone"
                        placeholder="08xxxxxxxxxx"
                        defaultValue="081234567890"
                        className="bg-muted/50 border-[#F99912]/10 focus:border-[#F99912]/50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Alamat Lengkap</Label>
                    <Textarea
                      id="address"
                      placeholder="Jl. contoh No. 123, RT/RW, Kelurahan, Kecamatan"
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      className="bg-muted/50 border-[#F99912]/10 focus:border-[#F99912]/50 min-h-25"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Kota</Label>
                      <Input
                        id="city"
                        placeholder="Kota"
                        defaultValue="Kota Bogor"
                        className="bg-muted/50 border-[#F99912]/10 focus:border-[#F99912]/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="province">Provinsi</Label>
                      <Input
                        id="province"
                        placeholder="Provinsi"
                        defaultValue="Jawa Barat"
                        className="bg-muted/50 border-[#F99912]/10 focus:border-[#F99912]/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postal">Kode Pos</Label>
                      <Input
                        id="postal"
                        placeholder="Kode Pos"
                        defaultValue="16143"
                        className="bg-muted/50 border-[#F99912]/10 focus:border-[#F99912]/50"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="bg-card/50 backdrop-blur border-[#F99912]/10">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-[#F99912]" />
                    Metode Pembayaran
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={selectedPayment}
                    onValueChange={(v) =>
                      setSelectedPayment(v as "ewallet" | "bank" | "va")
                    }
                    className="space-y-3"
                  >
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className={`relative flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                          selectedPayment === method.id
                            ? "border-[#F99912] bg-[#F99912]/5"
                            : "border-[#F99912]/10 hover:border-[#F99912]/30"
                        }`}
                        onClick={() =>
                          setSelectedPayment(
                            method.id as "ewallet" | "bank" | "va",
                          )
                        }
                      >
                        <RadioGroupItem
                          value={method.id}
                          id={method.id}
                          className="mt-1 border-[#F99912]/30 text-[#F99912]"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <method.icon className="w-5 h-5 text-[#F99912]" />
                            <Label
                              htmlFor={method.id}
                              className="font-medium cursor-pointer"
                            >
                              {method.name}
                            </Label>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {method.options.join(" | ")}
                          </p>
                          {(method.id === "ewallet" ||
                            method.id === "bank") && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {method.options.map((opt) => (
                                <Button
                                  key={opt}
                                  type="button"
                                  size="sm"
                                  variant={
                                    selectedProvider === opt
                                      ? "default"
                                      : "outline"
                                  }
                                  className={
                                    selectedProvider === opt
                                      ? "bg-[#F99912] text-[#181612] hover:bg-[#F99912]/90"
                                      : "border-[#F99912]/30 hover:bg-[#F99912]/10"
                                  }
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setSelectedProvider(opt);
                                  }}
                                >
                                  {opt}
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>
                        {selectedPayment === method.id && (
                          <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-[#F99912] flex items-center justify-center">
                            <Check className="w-3 h-3 text-[#181612]" />
                          </div>
                        )}
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Order Items */}
              <Card className="bg-card/50 backdrop-blur border-[#F99912]/10">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-[#F99912]" />
                    Pesanan Anda
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {orderItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-3 rounded-xl bg-muted/30"
                    >
                      <div className="w-16 h-16 rounded-xl bg-linear-to-br from-[#F99912]/20 to-[#64762C]/20 flex items-center justify-center shrink-0">
                        <ShoppingBag className="w-6 h-6 text-[#F99912]/50" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground">
                          {item.seller}
                        </p>
                        <h3 className="font-medium text-foreground truncate">
                          {item.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {item.quantity}x Rp {item.price.toLocaleString()}
                        </p>
                      </div>
                      <p className="font-semibold text-foreground">
                        Rp {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                  {orderItems.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      Keranjang kosong. Tambahkan produk dulu dari marketplace.
                    </p>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Right Column - Summary */}
        <div className="lg:col-span-1">
          <Card className="bg-card/50 backdrop-blur border-[#F99912]/10 sticky top-24">
            <CardHeader>
              <CardTitle className="text-lg">Ringkasan Pembayaran</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">
                    Rp {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="border-t border-[#F99912]/10 pt-3">
                  <div className="flex justify-between">
                    <span className="font-medium text-foreground">
                      Total Pembayaran
                    </span>
                    <span className="text-xl font-bold text-[#F99912]">
                      Rp {total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                className="w-full bg-linear-to-r from-[#F99912] to-[#64762C] text-[#181612] hover:shadow-[0_0_20px_rgba(249,153,18,0.3)]"
                onClick={handlePayment}
                disabled={
                  isProcessing || orderItems.length === 0 || !!lastOrder
                }
              >
                {isProcessing ? "Memproses..." : "Bayar Sekarang"}
              </Button>

              {/* Trust Badges */}
              <div className="space-y-2 pt-4 border-t border-[#F99912]/10">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>Pembayaran Aman & Terenkripsi</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Truck className="w-4 h-4 text-blue-500" />
                  <span>Estimasi Pengiriman: 1-3 Hari</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-4 h-4 text-[#F99912]" />
                  <span>Garansi 7 Hari Pengembalian</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
