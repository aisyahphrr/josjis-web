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
    color: "from-[#64762C] to-[#424F17]",
  },
  {
    name: "Pala Premium",
    emoji: "🥜",
    growthTime: "14 hari",
    reward: 120,
    color: "from-[#F99912] to-[#C9C9C3]",
  },
  {
    name: "Jambu Kristal",
    emoji: "🍐",
    growthTime: "10 hari",
    reward: 80,
    color: "from-[#C9C9C3] to-[#64762C]",
  },
];

export function HarvestBogorSection() {
  return (
    <section id="game" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#424F17]/10 via-background to-[#64762C]/10" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#64762C]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#F99912]/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#64762C]/10 border border-[#64762C]/20 mb-6">
              <Sparkles className="w-4 h-4 text-[#64762C]" />
              <span className="text-sm text-[#64762C] font-medium">
                Gamification
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-balance">
              <span className="bg-gradient-to-r from-[#64762C] to-[#F99912] bg-clip-text text-transparent">
                Harvest Bogor
              </span>
              <br />
              <span className="text-foreground">Mini Game Farming</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8 text-pretty">
              Tanam, rawat, dan panen tanaman khas Bogor secara virtual!
              Dapatkan{" "}
              <span className="text-[#F99912] font-semibold">
                Koin Asli Bogor
              </span>{" "}
              yang dapat ditukar dengan diskon belanja. 1 koin = Rp1 diskon saat
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
                <p className="text-xs text-muted-foreground">Max Koin/Panen</p>
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
                className="bg-gradient-to-r from-[#64762C] to-[#424F17] hover:from-[#64762C]/90 hover:to-[#424F17]/90 text-foreground font-semibold shadow-[0_0_30px_rgba(100,118,44,0.3)] hover:shadow-[0_0_40px_rgba(100,118,44,0.5)] transition-all duration-300 group"
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
            <div className="relative backdrop-blur-xl bg-card/60 border border-[#64762C]/20 rounded-3xl p-6 shadow-[0_20px_60px_rgba(100,118,44,0.2)]">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#64762C] to-[#424F17] flex items-center justify-center">
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
                    className="group relative aspect-square rounded-2xl bg-muted/50 border border-[#64762C]/20 p-4 flex flex-col items-center justify-center hover:border-[#64762C]/40 hover:bg-[#64762C]/5 transition-all duration-300 cursor-pointer"
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
                    className="h-full bg-gradient-to-r from-[#64762C] to-[#F99912] rounded-full transition-all duration-500"
                    style={{ width: "67%" }}
                  />
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl bg-gradient-to-br from-[#F99912] to-[#64762C] p-0.5 shadow-[0_10px_30px_rgba(249,153,18,0.3)] animate-bounce-slow">
              <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                <span className="text-3xl">🌾</span>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#64762C] to-[#424F17] p-0.5 shadow-[0_10px_30px_rgba(100,118,44,0.3)] animate-pulse">
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
