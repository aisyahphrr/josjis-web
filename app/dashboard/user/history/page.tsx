"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Package, Truck, CheckCircle, Clock, ShoppingBag, 
  Eye, Star, RotateCcw, MessageSquare
} from "lucide-react"

// Mock order history
const orders = [
  { 
    id: "ORD-2026-001", 
    date: "10 Mar 2026", 
    status: "delivered",
    total: 275000,
    items: [
      { name: "Lapis Talas Bogor Sangkuriang", qty: 2, price: 85000 },
      { name: "Roti Unyil Venus Original", qty: 3, price: 35000 },
    ]
  },
  { 
    id: "ORD-2026-002", 
    date: "8 Mar 2026", 
    status: "shipping",
    total: 180000,
    items: [
      { name: "Kopi Bogor Arabika Premium", qty: 2, price: 75000 },
      { name: "Makaroni Ngehe Level 5", qty: 2, price: 15000 },
    ]
  },
  { 
    id: "ORD-2026-003", 
    date: "5 Mar 2026", 
    status: "processing",
    total: 120000,
    items: [
      { name: "Dodol Talas Bogor", qty: 1, price: 55000 },
      { name: "Brownies Talas Amanda", qty: 1, price: 65000 },
    ]
  },
  { 
    id: "ORD-2026-004", 
    date: "1 Mar 2026", 
    status: "delivered",
    total: 95000,
    items: [
      { name: "Keripik Talas Premium", qty: 1, price: 45000 },
      { name: "Asinan Bogor Gedung Dalam", qty: 2, price: 25000 },
    ]
  },
  { 
    id: "ORD-2026-005", 
    date: "25 Feb 2026", 
    status: "cancelled",
    total: 85000,
    items: [
      { name: "Lapis Talas Bogor Sangkuriang", qty: 1, price: 85000 },
    ]
  },
]

const statusConfig = {
  processing: { label: "Diproses", icon: Clock, color: "bg-yellow-500/20 text-yellow-500" },
  shipping: { label: "Dikirim", icon: Truck, color: "bg-blue-500/20 text-blue-500" },
  delivered: { label: "Selesai", icon: CheckCircle, color: "bg-green-500/20 text-green-500" },
  cancelled: { label: "Dibatalkan", icon: RotateCcw, color: "bg-red-500/20 text-red-500" },
}

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState("all")

  const filteredOrders = activeTab === "all" 
    ? orders 
    : orders.filter(order => order.status === activeTab)

  return (
    <DashboardLayout role="user">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Riwayat Pembelian</h1>
          <p className="text-muted-foreground">Lacak dan kelola pesanan Anda</p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-muted/50 border border-[#F99912]/10">
            <TabsTrigger value="all" className="data-[state=active]:bg-[#F99912] data-[state=active]:text-[#181612]">
              Semua
            </TabsTrigger>
            <TabsTrigger value="processing" className="data-[state=active]:bg-[#F99912] data-[state=active]:text-[#181612]">
              Diproses
            </TabsTrigger>
            <TabsTrigger value="shipping" className="data-[state=active]:bg-[#F99912] data-[state=active]:text-[#181612]">
              Dikirim
            </TabsTrigger>
            <TabsTrigger value="delivered" className="data-[state=active]:bg-[#F99912] data-[state=active]:text-[#181612]">
              Selesai
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6 space-y-4">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => {
                const status = statusConfig[order.status as keyof typeof statusConfig]
                return (
                  <Card key={order.id} className="bg-card/50 backdrop-blur border-[#F99912]/10 hover:border-[#F99912]/30 transition-all duration-300">
                    <CardContent className="p-6">
                      {/* Order Header */}
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-[#F99912]/10">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-[#F99912]/10 flex items-center justify-center">
                            <Package className="w-5 h-5 text-[#F99912]" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{order.id}</p>
                            <p className="text-sm text-muted-foreground">{order.date}</p>
                          </div>
                        </div>
                        <Badge className={status.color}>
                          <status.icon className="w-3 h-3 mr-1" />
                          {status.label}
                        </Badge>
                      </div>

                      {/* Order Items */}
                      <div className="space-y-3 mb-4">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#F99912]/20 to-[#64762C]/20 flex items-center justify-center flex-shrink-0">
                              <ShoppingBag className="w-6 h-6 text-[#F99912]/50" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-foreground truncate">{item.name}</h3>
                              <p className="text-sm text-muted-foreground">{item.qty}x Rp {item.price.toLocaleString()}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Order Footer */}
                      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#F99912]/10">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Pembayaran</p>
                          <p className="text-lg font-bold text-[#F99912]">Rp {order.total.toLocaleString()}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button variant="outline" size="sm" className="border-[#F99912]/30 hover:bg-[#F99912]/10">
                            <Eye className="w-4 h-4 mr-1" />
                            Detail
                          </Button>
                          {order.status === "delivered" && (
                            <>
                              <Button variant="outline" size="sm" className="border-[#F99912]/30 hover:bg-[#F99912]/10">
                                <Star className="w-4 h-4 mr-1" />
                                Beri Rating
                              </Button>
                              <Button size="sm" className="bg-gradient-to-r from-[#F99912] to-[#64762C] text-[#181612]">
                                <RotateCcw className="w-4 h-4 mr-1" />
                                Beli Lagi
                              </Button>
                            </>
                          )}
                          {order.status === "shipping" && (
                            <Button variant="outline" size="sm" className="border-blue-500/30 text-blue-500 hover:bg-blue-500/10">
                              <Truck className="w-4 h-4 mr-1" />
                              Lacak
                            </Button>
                          )}
                          {order.status === "processing" && (
                            <Button variant="outline" size="sm" className="border-[#F99912]/30 hover:bg-[#F99912]/10">
                              <MessageSquare className="w-4 h-4 mr-1" />
                              Chat Seller
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            ) : (
              <Card className="bg-card/50 backdrop-blur border-[#F99912]/10">
                <CardContent className="p-12 text-center">
                  <Package className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">Tidak Ada Pesanan</h3>
                  <p className="text-muted-foreground">Belum ada pesanan dengan status ini</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
