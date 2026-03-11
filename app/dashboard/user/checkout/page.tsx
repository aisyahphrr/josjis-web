"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { 
  MapPin, CreditCard, Wallet, Building2, ShoppingBag, 
  Check, Truck, Clock, Shield
} from "lucide-react"

// Mock order data
const orderItems = [
  { id: 1, name: "Lapis Talas Bogor Sangkuriang", price: 85000, quantity: 2, seller: "Toko Lapis Bogor" },
  { id: 2, name: "Roti Unyil Venus Original", price: 35000, quantity: 3, seller: "Venus Bakery" },
]

const paymentMethods = [
  { id: "ewallet", name: "E-Wallet", icon: Wallet, options: ["GoPay", "OVO", "DANA", "ShopeePay"] },
  { id: "bank", name: "Transfer Bank", icon: Building2, options: ["BCA", "Mandiri", "BNI", "BRI"] },
  { id: "card", name: "Kartu Kredit/Debit", icon: CreditCard, options: ["Visa", "Mastercard"] },
]

export default function CheckoutPage() {
  const [selectedPayment, setSelectedPayment] = useState("ewallet")
  const [isProcessing, setIsProcessing] = useState(false)

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = 15000
  const discount = 10000
  const total = subtotal + shipping - discount

  const handlePayment = async () => {
    setIsProcessing(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    // Redirect to success page or show success modal
    setIsProcessing(false)
  }

  return (
    <DashboardLayout role="user">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Checkout</h1>
          <p className="text-muted-foreground">Lengkapi pesanan Anda</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
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
                    defaultValue="Jl. Pajajaran No. 123, RT 01/RW 02, Tegallega, Bogor Tengah"
                    className="bg-muted/50 border-[#F99912]/10 focus:border-[#F99912]/50 min-h-[100px]"
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
                <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment} className="space-y-3">
                  {paymentMethods.map((method) => (
                    <div 
                      key={method.id}
                      className={`relative flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                        selectedPayment === method.id 
                          ? "border-[#F99912] bg-[#F99912]/5" 
                          : "border-[#F99912]/10 hover:border-[#F99912]/30"
                      }`}
                      onClick={() => setSelectedPayment(method.id)}
                    >
                      <RadioGroupItem 
                        value={method.id} 
                        id={method.id}
                        className="mt-1 border-[#F99912]/30 text-[#F99912]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <method.icon className="w-5 h-5 text-[#F99912]" />
                          <Label htmlFor={method.id} className="font-medium cursor-pointer">
                            {method.name}
                          </Label>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {method.options.join(" | ")}
                        </p>
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
                  <div key={item.id} className="flex items-center gap-4 p-3 rounded-xl bg-muted/30">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#F99912]/20 to-[#64762C]/20 flex items-center justify-center flex-shrink-0">
                      <ShoppingBag className="w-6 h-6 text-[#F99912]/50" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground">{item.seller}</p>
                      <h3 className="font-medium text-foreground truncate">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.quantity}x Rp {item.price.toLocaleString()}</p>
                    </div>
                    <p className="font-semibold text-foreground">
                      Rp {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
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
                    <span className="text-foreground">Rp {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Ongkos Kirim</span>
                    <span className="text-foreground">Rp {shipping.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Diskon</span>
                    <span className="text-green-500">-Rp {discount.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-[#F99912]/10 pt-3">
                    <div className="flex justify-between">
                      <span className="font-medium text-foreground">Total Pembayaran</span>
                      <span className="text-xl font-bold text-[#F99912]">Rp {total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-[#F99912] to-[#64762C] text-[#181612] hover:shadow-[0_0_20px_rgba(249,153,18,0.3)]"
                  onClick={handlePayment}
                  disabled={isProcessing}
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
    </DashboardLayout>
  )
}
