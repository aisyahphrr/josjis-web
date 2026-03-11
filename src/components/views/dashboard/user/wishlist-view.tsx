"use client";

import { useState } from "react";
import { DashboardLayout } from "@/src/components/Dashboard/dashboard-layout";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Heart, ShoppingCart, Trash2, Star, ShoppingBag } from "lucide-react";
import Link from "next/link";

// Mock wishlist data
const initialWishlist = [
  {
    id: 1,
    name: "Lapis Talas Bogor Sangkuriang",
    price: 85000,
    rating: 4.9,
    reviews: 234,
    seller: "Toko Lapis Bogor",
  },
  {
    id: 2,
    name: "Kopi Bogor Arabika Premium",
    price: 75000,
    rating: 4.8,
    reviews: 189,
    seller: "Kopi Gunung Salak",
  },
  {
    id: 3,
    name: "Dodol Talas Bogor",
    price: 55000,
    rating: 4.7,
    reviews: 156,
    seller: "Dodol Picnic",
  },
  {
    id: 4,
    name: "Brownies Talas Amanda",
    price: 65000,
    rating: 4.6,
    reviews: 98,
    seller: "Amanda Brownies",
  },
  {
    id: 5,
    name: "Keripik Talas Premium",
    price: 45000,
    rating: 4.5,
    reviews: 76,
    seller: "Bogor Chips",
  },
  {
    id: 6,
    name: "Makaroni Ngehe Level 5",
    price: 15000,
    rating: 4.8,
    reviews: 312,
    seller: "Makaroni Ngehe",
  },
];

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(initialWishlist);

  const removeFromWishlist = (id: number) => {
    setWishlist((items) => items.filter((item) => item.id !== id));
  };

  return (
    <DashboardLayout role="user">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Wishlist</h1>
            <p className="text-muted-foreground">
              {wishlist.length} produk tersimpan
            </p>
          </div>
        </div>

        {/* Wishlist Grid */}
        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {wishlist.map((item) => (
              <Card
                key={item.id}
                className="group bg-card/50 backdrop-blur border-[#F99912]/10 hover:border-[#F99912]/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(249,153,18,0.1)] overflow-hidden"
              >
                <div className="relative aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#F99912]/20 to-[#64762C]/20 flex items-center justify-center">
                    <ShoppingBag className="w-12 h-12 text-[#F99912]/30" />
                  </div>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-500/20 backdrop-blur flex items-center justify-center hover:bg-red-500/30 transition-colors"
                  >
                    <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                  </button>
                </div>

                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground mb-1">
                    {item.seller}
                  </p>
                  <h3 className="font-medium text-foreground group-hover:text-[#F99912] transition-colors line-clamp-2 mb-2">
                    {item.name}
                  </h3>

                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 fill-[#F99912] text-[#F99912]" />
                    <span className="text-sm font-medium text-foreground">
                      {item.rating}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({item.reviews})
                    </span>
                  </div>

                  <p className="text-lg font-bold text-[#F99912] mb-3">
                    Rp {item.price.toLocaleString()}
                  </p>

                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-gradient-to-r from-[#F99912] to-[#64762C] text-[#181612] hover:shadow-[0_0_20px_rgba(249,153,18,0.3)]"
                      size="sm"
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      Keranjang
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeFromWishlist(item.id)}
                      className="border-red-500/30 text-red-500 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-card/50 backdrop-blur border-[#F99912]/10">
            <CardContent className="p-12 text-center">
              <Heart className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                Wishlist Kosong
              </h3>
              <p className="text-muted-foreground mb-4">
                Simpan produk favoritmu untuk dibeli nanti
              </p>
              <Link href="/dashboard-user/marketplace">
                <Button className="bg-gradient-to-r from-[#F99912] to-[#64762C] text-[#181612]">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Jelajahi Produk
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
