"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  Leaf, Droplets, Sun, Coins, Clock, Sparkles, 
  TreeDeciduous, Apple, Flower2
} from "lucide-react"

// Mock plant data
const initialPlants = [
  { 
    id: 1, 
    name: "Talas Bogor", 
    icon: Leaf, 
    growth: 75, 
    watered: true, 
    harvestable: false,
    coinsReward: 50,
    growthTime: "2 jam lagi"
  },
  { 
    id: 2, 
    name: "Pala Bogor", 
    icon: TreeDeciduous, 
    growth: 100, 
    watered: true, 
    harvestable: true,
    coinsReward: 100,
    growthTime: "Siap panen!"
  },
  { 
    id: 3, 
    name: "Jambu Kristal", 
    icon: Apple, 
    growth: 30, 
    watered: false, 
    harvestable: false,
    coinsReward: 75,
    growthTime: "5 jam lagi"
  },
  { 
    id: 4, 
    name: "Bunga Bangkai", 
    icon: Flower2, 
    growth: 0, 
    watered: false, 
    harvestable: false,
    coinsReward: 200,
    growthTime: "Belum ditanam"
  },
]

export default function GamePage() {
  const [plants, setPlants] = useState(initialPlants)
  const [coins, setCoins] = useState(2450)
  const [totalHarvest, setTotalHarvest] = useState(15)

  const waterPlant = (id: number) => {
    setPlants(plants.map(plant => 
      plant.id === id ? { ...plant, watered: true, growth: Math.min(100, plant.growth + 10) } : plant
    ))
  }

  const harvestPlant = (id: number) => {
    const plant = plants.find(p => p.id === id)
    if (plant && plant.harvestable) {
      setCoins(coins + plant.coinsReward)
      setTotalHarvest(totalHarvest + 1)
      setPlants(plants.map(p => 
        p.id === id ? { ...p, growth: 0, harvestable: false, watered: false, growthTime: "Belum ditanam" } : p
      ))
    }
  }

  const plantSeed = (id: number) => {
    setPlants(plants.map(plant => 
      plant.id === id && plant.growth === 0 
        ? { ...plant, growth: 10, growthTime: "8 jam lagi" } 
        : plant
    ))
  }

  return (
    <DashboardLayout role="user">
      <div className="space-y-6">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#64762C]/30 via-[#424F17]/20 to-[#F99912]/20 p-6 border border-[#64762C]/30">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#64762C]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
                <Sparkles className="w-8 h-8 text-[#F99912]" />
                Harvest Bogor
              </h1>
              <p className="text-muted-foreground">
                Tanam, siram, dan panen untuk mendapatkan Koin Asli Bogor!
              </p>
            </div>
            <div className="flex gap-4">
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
              <Card className="bg-card/80 backdrop-blur border-[#64762C]/20">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#64762C]/20 flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-[#64762C]" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total Panen</p>
                    <p className="text-xl font-bold text-[#64762C]">{totalHarvest}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Farm Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plants.map((plant) => (
            <Card 
              key={plant.id}
              className={`bg-card/50 backdrop-blur border-[#64762C]/20 hover:border-[#64762C]/40 transition-all duration-300 overflow-hidden ${
                plant.harvestable ? "ring-2 ring-[#F99912] ring-offset-2 ring-offset-background" : ""
              }`}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <plant.icon className={`w-5 h-5 ${plant.harvestable ? "text-[#F99912]" : "text-[#64762C]"}`} />
                    {plant.name}
                  </CardTitle>
                  {plant.harvestable && (
                    <Badge className="bg-[#F99912] text-[#181612] animate-pulse">
                      Siap Panen!
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Plant Visual */}
                <div className="relative h-40 rounded-xl bg-gradient-to-b from-sky-900/20 to-[#64762C]/30 flex items-end justify-center overflow-hidden">
                  {/* Sun */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-yellow-500/80 shadow-[0_0_20px_rgba(234,179,8,0.5)]">
                    <Sun className="w-8 h-8 text-yellow-300" />
                  </div>
                  
                  {/* Plant */}
                  <div 
                    className="relative transition-all duration-500"
                    style={{ height: `${Math.max(20, plant.growth)}%` }}
                  >
                    {plant.growth > 0 ? (
                      <div className="flex flex-col items-center">
                        <plant.icon 
                          className={`w-16 h-16 ${plant.harvestable ? "text-[#F99912]" : "text-[#64762C]"} transition-colors`} 
                        />
                        {plant.growth < 100 && (
                          <div className="absolute -bottom-2 w-8 h-4 bg-[#8B4513] rounded-b-full" />
                        )}
                      </div>
                    ) : (
                      <div className="w-16 h-4 bg-[#8B4513]/50 rounded-full" />
                    )}
                  </div>
                  
                  {/* Ground */}
                  <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-[#8B4513] to-[#A0522D]" />
                </div>

                {/* Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Pertumbuhan</span>
                    <span className="text-foreground font-medium">{plant.growth}%</span>
                  </div>
                  <Progress 
                    value={plant.growth} 
                    className="h-2"
                  />
                </div>

                {/* Info */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{plant.growthTime}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#F99912]">
                    <Coins className="w-4 h-4" />
                    <span className="font-medium">+{plant.coinsReward}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {plant.growth === 0 ? (
                    <Button 
                      className="flex-1 bg-[#64762C] hover:bg-[#64762C]/90 text-white"
                      onClick={() => plantSeed(plant.id)}
                    >
                      <Leaf className="w-4 h-4 mr-2" />
                      Tanam
                    </Button>
                  ) : plant.harvestable ? (
                    <Button 
                      className="flex-1 bg-gradient-to-r from-[#F99912] to-[#64762C] text-[#181612] hover:shadow-[0_0_20px_rgba(249,153,18,0.3)]"
                      onClick={() => harvestPlant(plant.id)}
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Panen (+{plant.coinsReward} Koin)
                    </Button>
                  ) : (
                    <>
                      <Button 
                        variant="outline"
                        className={`flex-1 ${plant.watered ? "border-blue-500/30 text-blue-500" : "border-[#64762C]/30 hover:bg-[#64762C]/10"}`}
                        onClick={() => waterPlant(plant.id)}
                        disabled={plant.watered}
                      >
                        <Droplets className={`w-4 h-4 mr-2 ${plant.watered ? "text-blue-500" : ""}`} />
                        {plant.watered ? "Sudah Disiram" : "Siram"}
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tips */}
        <Card className="bg-card/50 backdrop-blur border-[#F99912]/10">
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#F99912]" />
              Tips Bermain
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <Droplets className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <span>Siram tanaman secara rutin untuk mempercepat pertumbuhan</span>
              </div>
              <div className="flex items-start gap-2">
                <Leaf className="w-4 h-4 text-[#64762C] mt-0.5 flex-shrink-0" />
                <span>Tanaman langka memberikan lebih banyak Koin Asli Bogor</span>
              </div>
              <div className="flex items-start gap-2">
                <Coins className="w-4 h-4 text-[#F99912] mt-0.5 flex-shrink-0" />
                <span>Koin bisa ditukar dengan voucher belanja di Marketplace</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
