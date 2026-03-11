"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Gift, Sparkles, Coins, Ticket, Percent, Star, 
  Lock, Unlock, Package, Zap
} from "lucide-react"

// Mock mystery box data
const mysteryBoxes = [
  { 
    id: 1, 
    name: "Bronze Box", 
    cost: 100, 
    available: 3,
    color: "from-amber-700 to-amber-900",
    rewards: ["50-100 Koin", "Voucher 5%", "Badge Bronze"],
    rarity: "Common"
  },
  { 
    id: 2, 
    name: "Silver Box", 
    cost: 250, 
    available: 2,
    color: "from-gray-400 to-gray-600",
    rewards: ["100-250 Koin", "Voucher 10%", "Badge Silver"],
    rarity: "Rare"
  },
  { 
    id: 3, 
    name: "Gold Box", 
    cost: 500, 
    available: 1,
    color: "from-[#F99912] to-amber-600",
    rewards: ["250-500 Koin", "Voucher 25%", "Badge Gold"],
    rarity: "Epic"
  },
  { 
    id: 4, 
    name: "Diamond Box", 
    cost: 1000, 
    available: 0,
    color: "from-cyan-400 to-blue-600",
    rewards: ["500-1000 Koin", "Voucher 50%", "Badge Diamond"],
    rarity: "Legendary"
  },
]

const rewardHistory = [
  { id: 1, box: "Gold Box", reward: "Voucher 25%", date: "10 Mar 2026", icon: Percent },
  { id: 2, box: "Silver Box", reward: "150 Koin", date: "8 Mar 2026", icon: Coins },
  { id: 3, box: "Bronze Box", reward: "Badge Bronze", date: "5 Mar 2026", icon: Star },
  { id: 4, box: "Silver Box", reward: "Voucher 10%", date: "3 Mar 2026", icon: Percent },
]

export default function MysteryBoxPage() {
  const [coins, setCoins] = useState(2450)
  const [isOpening, setIsOpening] = useState<number | null>(null)
  const [showReward, setShowReward] = useState<{ box: string; reward: string } | null>(null)

  const openBox = async (boxId: number, cost: number) => {
    if (coins < cost) return
    
    setIsOpening(boxId)
    setCoins(coins - cost)
    
    // Simulate opening animation
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const box = mysteryBoxes.find(b => b.id === boxId)
    const randomReward = box?.rewards[Math.floor(Math.random() * box.rewards.length)] || "Mystery Reward"
    
    setIsOpening(null)
    setShowReward({ box: box?.name || "", reward: randomReward })
  }

  return (
    <DashboardLayout role="user">
      <div className="space-y-6">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#F99912]/30 via-purple-500/20 to-cyan-500/20 p-6 border border-[#F99912]/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F99912]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse" />
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
                <Gift className="w-8 h-8 text-[#F99912]" />
                Mystery Box
              </h1>
              <p className="text-muted-foreground">
                Buka mystery box dan dapatkan hadiah menarik!
              </p>
            </div>
            <Card className="bg-card/80 backdrop-blur border-[#F99912]/20">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F99912]/20 flex items-center justify-center">
                  <Coins className="w-5 h-5 text-[#F99912]" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Koin Asli Bogor</p>
                  <p className="text-xl font-bold text-[#F99912]">{coins.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Reward Modal */}
        {showReward && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <Card className="w-full max-w-md mx-4 bg-card border-[#F99912]/30 overflow-hidden">
              <CardContent className="p-8 text-center">
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#F99912] to-[#64762C] rounded-2xl animate-pulse" />
                  <div className="absolute inset-1 bg-card rounded-xl flex items-center justify-center">
                    <Sparkles className="w-12 h-12 text-[#F99912]" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Selamat!</h2>
                <p className="text-muted-foreground mb-4">
                  Anda mendapatkan dari {showReward.box}:
                </p>
                <div className="p-4 rounded-xl bg-[#F99912]/10 border border-[#F99912]/30 mb-6">
                  <p className="text-xl font-bold text-[#F99912]">{showReward.reward}</p>
                </div>
                <Button 
                  onClick={() => setShowReward(null)}
                  className="w-full bg-gradient-to-r from-[#F99912] to-[#64762C] text-[#181612]"
                >
                  Tutup
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Mystery Boxes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mysteryBoxes.map((box) => {
            const canAfford = coins >= box.cost
            const isAvailable = box.available > 0
            const isThisOpening = isOpening === box.id

            return (
              <Card 
                key={box.id}
                className={`relative overflow-hidden transition-all duration-300 ${
                  isAvailable && canAfford 
                    ? "border-[#F99912]/30 hover:border-[#F99912]/60 hover:shadow-[0_0_30px_rgba(249,153,18,0.2)]" 
                    : "border-muted/50 opacity-70"
                }`}
              >
                {/* Rarity Badge */}
                <Badge 
                  className={`absolute top-3 right-3 z-10 ${
                    box.rarity === "Legendary" ? "bg-cyan-500" :
                    box.rarity === "Epic" ? "bg-[#F99912]" :
                    box.rarity === "Rare" ? "bg-gray-500" :
                    "bg-amber-700"
                  } text-white`}
                >
                  {box.rarity}
                </Badge>

                <CardContent className="p-6">
                  {/* Box Visual */}
                  <div className={`relative w-32 h-32 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${box.color} p-1 ${
                    isThisOpening ? "animate-bounce" : ""
                  }`}>
                    <div className="w-full h-full rounded-xl bg-card/80 backdrop-blur flex items-center justify-center">
                      {isThisOpening ? (
                        <Sparkles className="w-12 h-12 text-[#F99912] animate-spin" />
                      ) : isAvailable ? (
                        <Gift className="w-12 h-12 text-foreground" />
                      ) : (
                        <Lock className="w-12 h-12 text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-center text-foreground mb-2">{box.name}</h3>
                  
                  {/* Cost */}
                  <div className="flex items-center justify-center gap-1 mb-3">
                    <Coins className="w-4 h-4 text-[#F99912]" />
                    <span className="font-semibold text-[#F99912]">{box.cost}</span>
                    <span className="text-sm text-muted-foreground">Koin</span>
                  </div>

                  {/* Available Count */}
                  <p className="text-center text-sm text-muted-foreground mb-4">
                    {isAvailable ? `${box.available} tersedia` : "Tidak tersedia"}
                  </p>

                  {/* Possible Rewards */}
                  <div className="space-y-1 mb-4">
                    {box.rewards.map((reward, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Zap className="w-3 h-3 text-[#F99912]" />
                        <span>{reward}</span>
                      </div>
                    ))}
                  </div>

                  {/* Open Button */}
                  <Button 
                    className={`w-full ${
                      isAvailable && canAfford
                        ? "bg-gradient-to-r from-[#F99912] to-[#64762C] text-[#181612] hover:shadow-[0_0_20px_rgba(249,153,18,0.3)]"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    }`}
                    onClick={() => isAvailable && canAfford && openBox(box.id, box.cost)}
                    disabled={!isAvailable || !canAfford || isOpening !== null}
                  >
                    {isThisOpening ? (
                      <>
                        <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                        Membuka...
                      </>
                    ) : isAvailable ? (
                      canAfford ? (
                        <>
                          <Unlock className="w-4 h-4 mr-2" />
                          Buka Box
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 mr-2" />
                          Koin Tidak Cukup
                        </>
                      )
                    ) : (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Tidak Tersedia
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Reward History */}
        <Card className="bg-card/50 backdrop-blur border-[#F99912]/10">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Package className="w-5 h-5 text-[#F99912]" />
              Riwayat Hadiah
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {rewardHistory.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#F99912]/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-[#F99912]" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{item.reward}</p>
                    <p className="text-sm text-muted-foreground">dari {item.box}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{item.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
