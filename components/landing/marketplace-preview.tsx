"use client"

import { Heart, Star, ShoppingCart, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const products = [
  {
    id: 1,
    name: "Lapis Talas Bogor Premium",
    price: 85000,
    rating: 4.9,
    reviews: 328,
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop",
    store: "Toko Oleh-Oleh Khas Bogor",
    badge: "Best Seller"
  },
  {
    id: 2,
    name: "Asinan Bogor Pak Jamal",
    price: 35000,
    rating: 4.8,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop",
    store: "Asinan Pak Jamal",
    badge: "Fresh"
  },
  {
    id: 3,
    name: "Roti Unyil Venus Original",
    price: 45000,
    rating: 4.9,
    reviews: 512,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop",
    store: "Venus Bakery Bogor",
    badge: "Popular"
  },
  {
    id: 4,
    name: "Keripik Talas Spicy",
    price: 28000,
    rating: 4.7,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1621447504864-d8686e12698c?w=400&h=400&fit=crop",
    store: "Camilan Khas Bogor",
    badge: null
  },
  {
    id: 5,
    name: "Dodol Talas Premium",
    price: 55000,
    rating: 4.8,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=400&fit=crop",
    store: "Toko Manisan Bogor",
    badge: "New"
  },
  {
    id: 6,
    name: "Kue Cubit Rainbow",
    price: 25000,
    rating: 4.6,
    reviews: 167,
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=400&fit=crop",
    store: "Jajanan Pasar Bogor",
    badge: null
  }
]

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price)
}

export function MarketplacePreview() {
  return (
    <section id="marketplace" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/30" />
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F99912]/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F99912]/10 border border-[#F99912]/20 mb-6">
              <span className="text-sm text-[#F99912] font-medium">Marketplace</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance">
              <span className="text-foreground">Produk </span>
              <span className="bg-gradient-to-r from-[#F99912] to-[#64762C] bg-clip-text text-transparent">
                Populer
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl text-pretty">
              Temukan oleh-oleh khas Bogor terbaik dari UMKM lokal terpercaya.
            </p>
          </div>
          <Link href="/marketplace">
            <Button 
              variant="outline" 
              className="border-[#F99912]/30 hover:bg-[#F99912]/10 hover:border-[#F99912]/50 group"
            >
              Lihat Semua Produk
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative backdrop-blur-xl bg-card/60 border border-[#F99912]/10 rounded-2xl overflow-hidden hover:border-[#F99912]/30 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_20px_40px_rgba(249,153,18,0.15)]"
            >
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gradient-to-r from-[#F99912] to-[#64762C] text-[#181612] text-xs font-semibold">
                    {product.badge}
                  </div>
                )}

                {/* Wishlist Button */}
                <button className="absolute top-3 right-3 w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background hover:scale-110">
                  <Heart className="w-5 h-5 text-muted-foreground hover:text-[#F99912] transition-colors" />
                </button>

                {/* Quick Add */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button className="w-full bg-gradient-to-r from-[#F99912] to-[#64762C] hover:from-[#F99912]/90 hover:to-[#64762C]/90 text-[#181612] font-semibold">
                    <ShoppingCart className="mr-2 w-4 h-4" />
                    Tambah ke Keranjang
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-xs text-muted-foreground mb-1">{product.store}</p>
                <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-[#F99912] transition-colors">
                  {product.name}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-4 h-4 fill-[#F99912] text-[#F99912]" />
                  <span className="text-sm font-medium text-foreground">{product.rating}</span>
                  <span className="text-sm text-muted-foreground">({product.reviews})</span>
                </div>

                {/* Price */}
                <p className="text-lg font-bold bg-gradient-to-r from-[#F99912] to-[#64762C] bg-clip-text text-transparent">
                  {formatPrice(product.price)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
