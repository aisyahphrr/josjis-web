"use client";

import { Leaf, Droplets, Sun, Coins, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";

const plants = [
  {
    name: "Talas Bogor",
    emoji: "🌿",
    growthTime: "7 hari",
    reward: 50,
    color: "from-[#9ACD32] to-[#9370DB]",
  },
  {
    name: "Pala Premium",
    emoji: "🥜",
    growthTime: "14 hari",
    reward: 120,
    color: "from-[#F99912] to-[#9ACD32]",
  },
  {
    name: "Jambu Kristal",
    emoji: "🍐",
    growthTime: "10 hari",
    reward: 80,
    color: "from-[#9370DB] to-[#9ACD32]",
  },
];

export function HarvestBogorSection() {
  return (
    <section id="game" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-white to-background" />
      <div className="absolute top-10 left-0 w-[34rem] h-[34rem] bg-[radial-gradient(circle_at_center,#9ACD32_0%,transparent_62%)] opacity-60 rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[40rem] h-[40rem] bg-[radial-gradient(circle_at_center,#9370DB_0%,transparent_62%)] opacity-35 rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-[radial-gradient(circle_at_center,#F99912_0%,transparent_60%)] opacity-35 rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#9ACD32]/10 border border-[#9ACD32]/20 mb-6">
              <Sparkles className="w-4 h-4 text-[#9ACD32]" />
              <span className="text-sm text-[#9ACD32] font-medium">
                Gamification
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-balance">
              <span className="bg-gradient-to-r from-[#9ACD32] to-[#F99912] bg-clip-text text-transparent">
                Harvest Bogor
              </span>
              <br />
              <span className="text-foreground">Mini Game Farming</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8 text-pretty">
              Tanam, rawat, dan panen tanaman khas Bogor secara virtual!
              Dapatkan{" "}
              <span className="text-[#F99912] font-semibold">
                Daya Poin Asli Bogor
              </span>{" "}
              yang dapat ditukar dengan diskon belanja. 1 Daya Poin = Rp1 diskon saat
              checkout!
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 rounded-xl bg-muted/50 backdrop-blur border border-[#F99912]/10">
                <div className="flex justify-center mb-2">
                  <Sun className="w-6 h-6 text-[#F99912]" />
                </div>
                <p className="text-2xl font-bold text-foreground">3</p>
                <p className="text-xs text-muted-foreground">Jenis Tanaman</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-muted/50 backdrop-blur border border-[#F99912]/10">
                <div className="flex justify-center mb-2">
                  <Coins className="w-6 h-6 text-[#F99912]" />
                </div>
                <p className="text-2xl font-bold text-foreground">250</p>
                <p className="text-xs text-muted-foreground">Max Daya Poin/Panen</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-muted/50 backdrop-blur border border-[#F99912]/10">
                <div className="flex justify-center mb-2">
                  <Droplets className="w-6 h-6 text-[#F99912]" />
                </div>
                <p className="text-2xl font-bold text-foreground">2x</p>
                <p className="text-xs text-muted-foreground">Siram/Hari</p>
              </div>
            </div>

            <Link href="/game/harvest">
              <Button
                size="lg"
                suppressHydrationWarning
                className="bg-gradient-to-r from-[#F99912] to-[#9ACD32] hover:from-[#F99912]/90 hover:to-[#9ACD32]/90 text-[#2B3236] font-semibold shadow-none transition-all duration-300 group"
              >
                <Leaf className="mr-2 w-5 h-5" />
                Mulai Bertani
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Game Preview */}
          <div className="relative">
            {/* Main Game Card */}
            <div className="relative backdrop-blur bg-white/80 border border-border rounded-3xl p-6 shadow-[0_18px_40px_rgba(40,50,56,0.08)] transition-all duration-300 hover:shadow-[0_26px_60px_rgba(40,50,56,0.12)]">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#9ACD32] to-[#9370DB] flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      Kebun Virtual
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Level 5 Farmer
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F99912]/10 border border-[#F99912]/20">
                  <Coins className="w-4 h-4 text-[#F99912]" />
                  <span className="text-sm font-semibold text-[#F99912]">
                    1,250
                  </span>
                </div>
              </div>

              {/* Plants Grid */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {plants.map((plant) => (
                  <div
                    key={plant.name}
                    className="group relative aspect-square rounded-2xl bg-white/70 border border-border p-4 flex flex-col items-center justify-center hover:border-[#9ACD32]/40 hover:bg-background transition-all duration-300 cursor-pointer"
                  >
                    <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                      {plant.emoji}
                    </span>
                    <p className="text-xs font-medium text-foreground text-center">
                      {plant.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {plant.growthTime}
                    </p>
                    <div className="absolute bottom-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#F99912]/20">
                      <Coins className="w-3 h-3 text-[#F99912]" />
                      <span className="text-[10px] font-semibold text-[#F99912]">
                        {plant.reward}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress */}
              <div className="p-4 rounded-xl bg-muted/30 border border-[#F99912]/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    Progress Panen
                  </span>
                  <span className="text-sm font-semibold text-[#F99912]">
                    67%
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#9ACD32] to-[#F99912] rounded-full transition-all duration-500"
                    style={{ width: "67%" }}
                  />
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl bg-gradient-to-br from-[#F99912] to-[#9ACD32] p-0.5 shadow-[0_10px_30px_rgba(249,153,18,0.12)] animate-bounce-slow">
              <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                <span className="text-3xl">🌾</span>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#9ACD32] to-[#9370DB] p-0.5 shadow-[0_10px_30px_rgba(147,112,219,0.12)] animate-pulse">
              <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                <Coins className="w-8 h-8 text-[#F99912]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
