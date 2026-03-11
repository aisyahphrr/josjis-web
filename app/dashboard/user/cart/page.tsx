"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  ShoppingCart, Trash2, Minus, Plus, ShoppingBag, ArrowRight
} from "lucide-react"
import Link from "next/link"

// Mock cart data
const initialCartItems = [
  { id: 1, name: "Lapis Talas Bogor Sangkuriang", price: 85000, quantity: 2, seller: "Toko Lapis Bogor", image: "/placeholder.svg" },
  { id: 2, name: "Roti Unyil Venus Original", price: 35000, quantity: 3, seller: "Venus Bakery", image: "/placeholder.svg" },
  { id: 3, name: "Asinan Bogor Gedung Dalam", price: 25000, quantity: 1, seller: "Asinan Pak Maman", image: "/placeholder.svg" },
  { id: 4, name: "Keripik Talas Premium", price: 45000, quantity: 2, seller: "Bogor Chips", image: "/placeholder.svg" },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [selectedItems, setSelectedItems] = useState<number[]>(initialCartItems.map(item => item.id))

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    )
  }

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id))
    setSelectedItems(items => items.filter(itemId => itemId !== id))
  }

  const toggleSelect = (id: number) => {
    setSelectedItems(items => 
      items.includes(id) ? items.filter(i => i !== id) : [...items, id]
    )
  }

  const toggleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(cartItems.map(item => item.id))
    }
  }

  const selectedCartItems = cartItems.filter(item => selectedItems.includes(item.id))
  const subtotal = selectedCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = selectedCartItems.length > 0 ? 15000 : 0
  const total = subtotal + shipping

  return (
    <DashboardLayout role="user">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Keranjang Belanja</h1>
          <p className="text-muted-foreground">{cartItems.length} produk dalam keranjang</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Select All */}
            <Card className="bg-card/50 backdrop-blur border-[#F99912]/10">
              <CardContent className="p-4 flex items-center gap-4">
                <Checkbox
                  checked={selectedItems.length === cartItems.length && cartItems.length > 0}
                  onCheckedChange={toggleSelectAll}
                  className="border-[#F99912]/30 data-[state=checked]:bg-[#F99912] data-[state=checked]:border-[#F99912]"
                />
                <span className="text-sm font-medium text-foreground">
                  Pilih Semua ({cartItems.length} produk)
                </span>
              </CardContent>
            </Card>

            {/* Cart Items List */}
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <Card key={item.id} className="bg-card/50 backdrop-blur border-[#F99912]/10 hover:border-[#F99912]/30 transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <Checkbox
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={() => toggleSelect(item.id)}
                        className="mt-2 border-[#F99912]/30 data-[state=checked]:bg-[#F99912] data-[state=checked]:border-[#F99912]"
                      />
                      
                      {/* Product Image */}
                      <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-[#F99912]/20 to-[#64762C]/20 flex items-center justify-center flex-shrink-0">
                        <ShoppingBag className="w-8 h-8 text-[#F99912]/50" />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground mb-1">{item.seller}</p>
                        <h3 className="font-medium text-foreground truncate">{item.name}</h3>
                        <p className="text-lg font-bold text-[#F99912] mt-2">
                          Rp {item.price.toLocaleString()}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 rounded-lg bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 rounded-lg bg-[#F99912]/20 hover:bg-[#F99912]/30 text-[#F99912] flex items-center justify-center transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="bg-card/50 backdrop-blur border-[#F99912]/10">
                <CardContent className="p-12 text-center">
                  <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">Keranjang Kosong</h3>
                  <p className="text-muted-foreground mb-4">Yuk mulai belanja produk UMKM Bogor!</p>
                  <Link href="/dashboard/user/marketplace">
                    <Button className="bg-gradient-to-r from-[#F99912] to-[#64762C] text-[#181612]">
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Belanja Sekarang
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-card/50 backdrop-blur border-[#F99912]/10 sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Ringkasan Pesanan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal ({selectedCartItems.length} produk)</span>
                    <span className="text-foreground">Rp {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Ongkos Kirim</span>
                    <span className="text-foreground">Rp {shipping.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-[#F99912]/10 pt-3">
                    <div className="flex justify-between">
                      <span className="font-medium text-foreground">Total</span>
                      <span className="text-xl font-bold text-[#F99912]">Rp {total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <Link href="/dashboard/user/checkout">
                  <Button 
                    className="w-full bg-gradient-to-r from-[#F99912] to-[#64762C] text-[#181612] hover:shadow-[0_0_20px_rgba(249,153,18,0.3)]"
                    disabled={selectedCartItems.length === 0}
                  >
                    Checkout
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>

                <p className="text-xs text-center text-muted-foreground">
                  Dapatkan +50 Koin Asli Bogor untuk setiap pembelian
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
