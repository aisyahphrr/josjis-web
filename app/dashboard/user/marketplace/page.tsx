"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Search, Filter, Star, Heart, ShoppingCart, 
  Grid3X3, List, ChevronDown
} from "lucide-react"

// Mock products data
const products = [
  { id: 1, name: "Lapis Talas Bogor Sangkuriang", price: 85000, originalPrice: 95000, rating: 4.9, reviews: 234, category: "Kue", seller: "Toko Lapis Bogor", image: "/placeholder.svg", badge: "Best Seller" },
  { id: 2, name: "Roti Unyil Venus Original", price: 35000, originalPrice: null, rating: 4.8, reviews: 189, category: "Roti", seller: "Venus Bakery", image: "/placeholder.svg", badge: null },
  { id: 3, name: "Asinan Bogor Gedung Dalam", price: 25000, originalPrice: 30000, rating: 4.7, reviews: 156, category: "Makanan", seller: "Asinan Pak Maman", image: "/placeholder.svg", badge: "Promo" },
  { id: 4, name: "Tauge Goreng Pak Amin", price: 28000, originalPrice: null, rating: 4.6, reviews: 98, category: "Makanan", seller: "RM Pak Amin", image: "/placeholder.svg", badge: null },
  { id: 5, name: "Keripik Talas Premium", price: 45000, originalPrice: null, rating: 4.5, reviews: 76, category: "Snack", seller: "Bogor Chips", image: "/placeholder.svg", badge: "New" },
  { id: 6, name: "Makaroni Ngehe Level 5", price: 15000, originalPrice: null, rating: 4.4, reviews: 312, category: "Snack", seller: "Makaroni Ngehe", image: "/placeholder.svg", badge: null },
  { id: 7, name: "Dodol Talas Bogor", price: 55000, originalPrice: 65000, rating: 4.8, reviews: 145, category: "Kue", seller: "Dodol Picnic", image: "/placeholder.svg", badge: "Promo" },
  { id: 8, name: "Soto Mie Bogor Pak Kadir", price: 32000, originalPrice: null, rating: 4.7, reviews: 89, category: "Makanan", seller: "Soto Mie Pak Kadir", image: "/placeholder.svg", badge: null },
  { id: 9, name: "Pisang Molen Venus", price: 28000, originalPrice: null, rating: 4.6, reviews: 167, category: "Kue", seller: "Venus Bakery", image: "/placeholder.svg", badge: null },
  { id: 10, name: "Kopi Bogor Arabika", price: 75000, originalPrice: null, rating: 4.9, reviews: 234, category: "Minuman", seller: "Kopi Gunung Salak", image: "/placeholder.svg", badge: "Premium" },
  { id: 11, name: "Brownies Talas Amanda", price: 65000, originalPrice: null, rating: 4.7, reviews: 198, category: "Kue", seller: "Amanda Brownies", image: "/placeholder.svg", badge: null },
  { id: 12, name: "Emping Melinjo Bogor", price: 48000, originalPrice: 55000, rating: 4.5, reviews: 67, category: "Snack", seller: "Emping Mbah Siti", image: "/placeholder.svg", badge: "Promo" },
]

const categories = ["Semua", "Makanan", "Kue", "Snack", "Minuman"]

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Semua")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [wishlist, setWishlist] = useState<number[]>([])

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "Semua" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleWishlist = (id: number) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    )
  }

  return (
    <DashboardLayout role="user">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Marketplace</h1>
            <p className="text-muted-foreground">Temukan produk UMKM terbaik dari Bogor</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-[#F99912] text-[#181612]" : "border-[#F99912]/30"}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-[#F99912] text-[#181612]" : "border-[#F99912]/30"}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Cari produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-muted/50 border-[#F99912]/10 focus:border-[#F99912]/50 rounded-xl"
            />
          </div>
          <Button variant="outline" className="h-12 border-[#F99912]/30 hover:bg-[#F99912]/10">
            <Filter className="w-4 h-4 mr-2" />
            Filter
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category 
                ? "bg-[#F99912] text-[#181612] hover:bg-[#F99912]/90" 
                : "border-[#F99912]/30 hover:bg-[#F99912]/10"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className={viewMode === "grid" 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" 
          : "space-y-4"
        }>
          {filteredProducts.map((product) => (
            <Card 
              key={product.id} 
              className={`group bg-card/50 backdrop-blur border-[#F99912]/10 hover:border-[#F99912]/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(249,153,18,0.1)] overflow-hidden ${
                viewMode === "list" ? "flex flex-row" : ""
              }`}
            >
              <div className={`relative ${viewMode === "list" ? "w-48 h-48" : "aspect-square"}`}>
                {/* Product Image */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#F99912]/20 to-[#64762C]/20 flex items-center justify-center">
                  <ShoppingCart className="w-12 h-12 text-[#F99912]/30" />
                </div>
                
                {/* Badge */}
                {product.badge && (
                  <Badge 
                    className={`absolute top-3 left-3 ${
                      product.badge === "Best Seller" ? "bg-[#F99912] text-[#181612]" :
                      product.badge === "Promo" ? "bg-red-500 text-white" :
                      product.badge === "New" ? "bg-green-500 text-white" :
                      "bg-[#64762C] text-white"
                    }`}
                  >
                    {product.badge}
                  </Badge>
                )}

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors"
                >
                  <Heart 
                    className={`w-4 h-4 ${wishlist.includes(product.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} 
                  />
                </button>
              </div>

              <CardContent className={`p-4 ${viewMode === "list" ? "flex-1 flex flex-col justify-center" : ""}`}>
                <p className="text-xs text-muted-foreground mb-1">{product.seller}</p>
                <h3 className="font-medium text-foreground group-hover:text-[#F99912] transition-colors line-clamp-2 mb-2">
                  {product.name}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 fill-[#F99912] text-[#F99912]" />
                  <span className="text-sm font-medium text-foreground">{product.rating}</span>
                  <span className="text-xs text-muted-foreground">({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-[#F99912]">
                    Rp {product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      Rp {product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Add to Cart */}
                <Button 
                  className="w-full bg-gradient-to-r from-[#F99912] to-[#64762C] text-[#181612] hover:shadow-[0_0_20px_rgba(249,153,18,0.3)]"
                  size="sm"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Tambah Keranjang
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Produk tidak ditemukan</h3>
            <p className="text-muted-foreground">Coba ubah kata kunci pencarian atau filter</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
