"use client";

import * as React from "react";
import { DashboardLayout } from "@/src/components/Dashboard/dashboard-layout";
import { getProductById } from "@/src/lib/products";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel";
import { Star, Heart, ShoppingCart, Store } from "lucide-react";
import { useUserStore } from "@/src/store/user-store";

function Stars({ value }: { value: number }) {
  const rounded = Math.round(value * 10) / 10;
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        <Star className="w-4 h-4 fill-[#F99912] text-[#F99912]" />
        <span className="text-sm font-medium text-foreground">{rounded}</span>
      </div>
    </div>
  );
}

export default function ProductDetailView({ productId }: { productId: number }) {
  const product = getProductById(productId);
  const {
    addToCart,
    toggleWishlist,
    wishlist,
    reviews,
  } = useUserStore();

  if (!product) {
    return (
      <DashboardLayout role="user">
        <Card className="bg-card/50 backdrop-blur border-[#F99912]/10">
          <CardContent className="p-12 text-center">
            <p className="text-lg font-medium text-foreground">
              Produk tidak ditemukan
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Produk dengan ID {String(productId)} tidak tersedia.
            </p>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  const inWishlist = wishlist.includes(product.id);
  const productReviews = reviews.filter((r) => r.productId === product.id);

  return (
    <DashboardLayout role="user">
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-card/50 backdrop-blur border-[#F99912]/10 overflow-hidden">
            <CardContent className="p-6">
              <Carousel opts={{ loop: true }}>
                <CarouselContent>
                  {product.images.map((img) => (
                    <CarouselItem key={img.alt}>
                      <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#F99912]/20 to-[#64762C]/20 flex items-center justify-center">
                        {/* Placeholder visual */}
                        <ShoppingCart className="w-16 h-16 text-[#F99912]/30" />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-[#F99912]/10">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  {product.badge && (
                    <Badge className="mb-2 bg-[#F99912] text-[#181612]">
                      {product.badge}
                    </Badge>
                  )}
                  <h1 className="text-2xl font-bold text-foreground">
                    {product.name}
                  </h1>
                  <div className="flex items-center gap-2 mt-2">
                    <Stars value={product.rating} />
                    <span className="text-xs text-muted-foreground">
                      ({productReviews.length || product.reviewsCount} ulasan)
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors"
                  aria-label="Toggle wishlist"
                >
                  <Heart
                    className={
                      inWishlist
                        ? "w-5 h-5 fill-red-500 text-red-500"
                        : "w-5 h-5 text-muted-foreground"
                    }
                  />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <p className="text-2xl font-bold text-[#F99912]">
                  Rp {product.price.toLocaleString()}
                </p>
                {product.originalPrice ? (
                  <p className="text-sm text-muted-foreground line-through">
                    Rp {product.originalPrice.toLocaleString()}
                  </p>
                ) : null}
              </div>

              <div className="rounded-xl bg-muted/30 p-4 border border-[#F99912]/10">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-[#F99912]/10 flex items-center justify-center">
                    <Store className="w-5 h-5 text-[#F99912]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {product.sellerName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {product.sellerDescription}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  className="flex-1 bg-gradient-to-r from-[#F99912] to-[#64762C] text-[#181612] hover:shadow-[0_0_20px_rgba(249,153,18,0.3)]"
                  onClick={() => addToCart(product.id, 1)}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Tambah ke Keranjang
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-[#F99912]/30 hover:bg-[#F99912]/10"
                  onClick={() => toggleWishlist(product.id)}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Tambah ke Wishlist
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card/50 backdrop-blur border-[#F99912]/10">
          <CardContent className="p-6">
            <Tabs defaultValue="desc">
              <TabsList className="bg-muted/50 border border-[#F99912]/10">
                <TabsTrigger
                  value="desc"
                  className="data-[state=active]:bg-[#F99912] data-[state=active]:text-[#181612]"
                >
                  Deskripsi
                </TabsTrigger>
                <TabsTrigger
                  value="review"
                  className="data-[state=active]:bg-[#F99912] data-[state=active]:text-[#181612]"
                >
                  Review
                </TabsTrigger>
                <TabsTrigger
                  value="store"
                  className="data-[state=active]:bg-[#F99912] data-[state=active]:text-[#181612]"
                >
                  Detail Toko
                </TabsTrigger>
              </TabsList>

              <TabsContent value="desc" className="mt-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </TabsContent>

              <TabsContent value="review" className="mt-6 space-y-4">
                {productReviews.length > 0 ? (
                  productReviews.map((r) => (
                    <div
                      key={r.id}
                      className="rounded-xl bg-muted/30 p-4 border border-[#F99912]/10"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-foreground">
                          {r.userName}
                        </p>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-[#F99912] text-[#F99912]" />
                          <span className="text-sm">{r.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        {r.comment}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Belum ada ulasan. Setelah pesanan selesai, kamu bisa memberi rating dari menu riwayat.
                  </p>
                )}
              </TabsContent>

              <TabsContent value="store" className="mt-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">
                    {product.sellerName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {product.sellerDescription}
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

