"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import {
  Gift,
  Sparkles,
  Coins,
  Ticket,
  Percent,
  Star,
  Lock,
  Unlock,
  Package,
  Zap,
} from "lucide-react";

// Mock mystery box data
const mysteryBoxes = [
  {
    id: 1,
    name: "Bronze Box",
    cost: 100,
    available: 3,
    color: "from-amber-700 to-amber-900",
    rewards: ["50-100 Daya Poin", "Voucher 5%", "Badge Bronze"],
    rarity: "Common",
  },
  {
    id: 2,
    name: "Silver Box",
    cost: 250,
    available: 2,
    color: "from-gray-400 to-gray-600",
    rewards: ["100-250 Daya Poin", "Voucher 10%", "Badge Silver"],
    rarity: "Rare",
  },
  {
    id: 3,
    name: "Gold Box",
    cost: 500,
    available: 1,
    color: "from-[#F99912] to-amber-600",
    rewards: ["250-500 Daya Poin", "Voucher 25%", "Badge Gold"],
    rarity: "Epic",
  },
  {
    id: 4,
    name: "Diamond Box",
    cost: 1000,
    available: 0,
    color: "from-cyan-400 to-blue-600",
    rewards: ["500-1000 Daya Poin", "Voucher 50%", "Badge Diamond"],
    rarity: "Legendary",
  },
];

const rewardHistory = [
  {
    id: 1,
    box: "Gold Box",
    reward: "Voucher 25%",
    date: "10 Mar 2026",
    icon: Percent,
  },
  {
    id: 2,
    box: "Silver Box",
    reward: "150 Daya Poin",
    date: "8 Mar 2026",
    icon: Coins,
  },
  {
    id: 3,
    box: "Bronze Box",
    reward: "Badge Bronze",
    date: "5 Mar 2026",
    icon: Star,
  },
  {
    id: 4,
    box: "Silver Box",
    reward: "Voucher 10%",
    date: "3 Mar 2026",
    icon: Percent,
  },
];

function getBoxTheme(rarity: string) {
  switch (rarity) {
    case "Legendary":
      return {
        shell: "from-cyan-300 via-sky-400 to-blue-600",
        lid: "from-cyan-200 to-sky-500",
        side: "from-sky-700 to-blue-950",
        ribbon: "from-white to-cyan-100",
        badge: "bg-cyan-500",
        glow: "shadow-[0_0_40px_rgba(34,211,238,0.22)]",
      };
    case "Epic":
      return {
        shell: "from-[#ffd27a] via-[#F99912] to-amber-700",
        lid: "from-amber-200 to-[#F99912]",
        side: "from-amber-800 to-amber-950",
        ribbon: "from-amber-50 to-yellow-200",
        badge: "bg-[#F99912]",
        glow: "shadow-[0_0_40px_rgba(249,153,18,0.24)]",
      };
    case "Rare":
      return {
        shell: "from-slate-200 via-slate-400 to-slate-700",
        lid: "from-slate-100 to-slate-500",
        side: "from-slate-700 to-slate-950",
        ribbon: "from-white to-slate-200",
        badge: "bg-gray-500",
        glow: "shadow-[0_0_36px_rgba(148,163,184,0.2)]",
      };
    default:
      return {
        shell: "from-amber-400 via-amber-700 to-amber-950",
        lid: "from-amber-300 to-amber-700",
        side: "from-amber-800 to-[#2d1607]",
        ribbon: "from-amber-50 to-orange-200",
        badge: "bg-amber-700",
        glow: "shadow-[0_0_32px_rgba(180,83,9,0.18)]",
      };
  }
}

function MysteryBoxVisual({
  rarity,
  isOpening,
  isAvailable,
}: {
  rarity: string;
  isOpening: boolean;
  isAvailable: boolean;
}) {
  const theme = getBoxTheme(rarity);

  return (
    <div className="relative mx-auto mb-6 h-40 w-40">
      <div
        className={`absolute inset-x-4 bottom-1 h-5 rounded-full bg-black/15 blur-md ${theme.glow}`}
      />
      <div
        className={`absolute inset-x-6 top-5 h-8 rounded-[18px] bg-gradient-to-r ${theme.lid} border border-white/30 shadow-[0_10px_20px_rgba(0,0,0,0.18)] ${
          isOpening ? "-rotate-6 -translate-y-2" : ""
        } transition-all duration-500`}
      />
      <div
        className={`absolute left-7 top-11 h-20 w-24 rounded-[22px] bg-gradient-to-b ${theme.shell} border border-white/20 shadow-[0_18px_30px_rgba(0,0,0,0.22)] ${
          isOpening ? "translate-y-1 scale-[1.02]" : ""
        } transition-all duration-500`}
      >
        <div className="absolute inset-y-0 left-1/2 w-3 -translate-x-1/2 bg-gradient-to-b from-white/90 to-white/40" />
        <div className="absolute inset-x-0 top-1/2 h-3 -translate-y-1/2 bg-gradient-to-r from-white/90 via-white/65 to-white/90" />
        <div className="absolute inset-x-3 top-3 h-4 rounded-full bg-white/15 blur-sm" />
      </div>
      <div
        className={`absolute right-5 top-[52px] h-[74px] w-7 skew-y-[12deg] rounded-r-[18px] bg-gradient-to-b ${theme.side} border border-white/10`}
      />
      <div
        className={`absolute left-1/2 top-3 z-10 h-[96px] w-3 -translate-x-1/2 rounded-full bg-gradient-to-b ${theme.ribbon} shadow-sm`}
      />
      <div
        className={`absolute left-1/2 top-[52px] z-10 h-3 w-[96px] -translate-x-1/2 rounded-full bg-gradient-to-r ${theme.ribbon} shadow-sm`}
      />
      <div className="absolute left-1/2 top-9 z-20 h-6 w-6 -translate-x-1/2 rounded-full border border-white/50 bg-white/90 shadow-sm" />
      <div className="absolute left-1/2 top-8 z-20 h-4 w-10 -translate-x-1/2 rounded-full border border-white/40 bg-white/70" />
      <div className="absolute left-1/2 top-8 z-20 h-10 w-4 -translate-x-1/2 rounded-full border border-white/40 bg-white/70" />

      {isOpening ? (
        <>
          <Sparkles className="absolute left-2 top-4 h-6 w-6 animate-pulse text-[#F99912]" />
          <Sparkles className="absolute right-2 top-9 h-5 w-5 animate-pulse text-white" />
          <Sparkles className="absolute right-7 bottom-8 h-4 w-4 animate-pulse text-[#F99912]" />
        </>
      ) : !isAvailable ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-2xl bg-background/75 p-4 backdrop-blur">
            <Lock className="h-10 w-10 text-muted-foreground" />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function MysteryBoxPage() {
  const [coins, setCoins] = useState(2450);
  const [isOpening, setIsOpening] = useState<number | null>(null);
  const [showReward, setShowReward] = useState<{
    box: string;
    reward: string;
  } | null>(null);

  const openBox = async (boxId: number, cost: number) => {
    if (coins < cost) return;

    setIsOpening(boxId);
    setCoins(coins - cost);

    // Simulate opening animation
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const box = mysteryBoxes.find((b) => b.id === boxId);
    const randomReward =
      box?.rewards[Math.floor(Math.random() * box.rewards.length)] ||
      "Mystery Reward";

    setIsOpening(null);
    setShowReward({ box: box?.name || "", reward: randomReward });
  };

  return (
    <div className="space-y-8">
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
                <p className="text-xs text-muted-foreground">
                  Daya Poin Asli Bogor
                </p>
                <p className="text-xl font-bold text-[#F99912]">
                  {coins.toLocaleString()}
                </p>
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
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Selamat!
              </h2>
              <p className="text-muted-foreground mb-4">
                Anda mendapatkan dari {showReward.box}:
              </p>
              <div className="p-4 rounded-xl bg-[#F99912]/10 border border-[#F99912]/30 mb-6">
                <p className="text-xl font-bold text-[#F99912]">
                  {showReward.reward}
                </p>
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
          const canAfford = coins >= box.cost;
          const isAvailable = box.available > 0;
          const isThisOpening = isOpening === box.id;
          const theme = getBoxTheme(box.rarity);

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
                className={`absolute top-3 right-3 z-10 ${theme.badge} text-white`}
              >
                {box.rarity}
              </Badge>

              <CardContent className="p-6">
                <MysteryBoxVisual
                  rarity={box.rarity}
                  isOpening={isThisOpening}
                  isAvailable={isAvailable}
                />

                <h3 className="text-lg font-bold text-center text-foreground mb-2">
                  {box.name}
                </h3>

                {/* Cost */}
                <div className="flex items-center justify-center gap-1 mb-3">
                  <Coins className="w-4 h-4 text-[#F99912]" />
                  <span className="font-semibold text-[#F99912]">
                    {box.cost}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Daya Poin
                  </span>
                </div>

                {/* Available Count */}
                <p className="text-center text-sm text-muted-foreground mb-4">
                  {isAvailable ? `${box.available} tersedia` : "Tidak tersedia"}
                </p>

                {/* Possible Rewards */}
                <div className="space-y-1 mb-4">
                  {box.rewards.map((reward, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-xs text-muted-foreground"
                    >
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
                  onClick={() =>
                    isAvailable && canAfford && openBox(box.id, box.cost)
                  }
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
                        Daya Poin Tidak Cukup
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
          );
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
              <div
                key={item.id}
                className="flex items-center gap-4 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F99912]/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-[#F99912]" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{item.reward}</p>
                  <p className="text-sm text-muted-foreground">
                    dari {item.box}
                  </p>
                </div>
                <span className="text-sm text-muted-foreground">
                  {item.date}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
