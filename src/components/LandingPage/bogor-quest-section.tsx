"use client";

import {
  Trophy,
  Gift,
  Star,
  Zap,
  CheckCircle2,
  Crown,
  Medal,
  Award,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";

const quests = [
  {
    title: "Daily Check-in",
    description: "Login setiap hari untuk mendapat Talas Power",
    reward: "+10 Poin",
    icon: Zap,
    progress: 5,
    total: 7,
    completed: false,
  },
  {
    title: "Pertama Kali Belanja",
    description: "Selesaikan transaksi pertama Anda",
    reward: "+100 Poin",
    icon: CheckCircle2,
    progress: 1,
    total: 1,
    completed: true,
  },
  {
    title: "Review Master",
    description: "Berikan 5 review produk",
    reward: "+50 Poin",
    icon: Star,
    progress: 3,
    total: 5,
    completed: false,
  },
];

const leaderboard = [
  { rank: 1, name: "Sarah W.", points: 12500, avatar: "S", badge: "gold" },
  { rank: 2, name: "Budi A.", points: 11200, avatar: "B", badge: "silver" },
  { rank: 3, name: "Citra N.", points: 10800, avatar: "C", badge: "bronze" },
  { rank: 4, name: "Dewi M.", points: 9500, avatar: "D", badge: null },
  { rank: 5, name: "Eko P.", points: 8900, avatar: "E", badge: null },
];

const badges = [
  {
    icon: Crown,
    name: "Raja Belanja",
    color: "from-[#F99912] to-[#C9C9C3]",
    earned: true,
  },
  {
    icon: Medal,
    name: "Petani Pro",
    color: "from-[#64762C] to-[#424F17]",
    earned: true,
  },
  {
    icon: Award,
    name: "Review Expert",
    color: "from-[#C9C9C3] to-[#F99912]",
    earned: false,
  },
  {
    icon: Trophy,
    name: "Top 10",
    color: "from-[#F99912] to-[#64762C]",
    earned: false,
  },
];

export function BogorQuestSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#F99912]/5 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#F99912]/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F99912]/10 border border-[#F99912]/20 mb-6">
            <Trophy className="w-4 h-4 text-[#F99912]" />
            <span className="text-sm text-[#F99912] font-medium">
              Reward System
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-balance">
            <span className="bg-gradient-to-r from-[#F99912] to-[#C9C9C3] bg-clip-text text-transparent">
              Bogor Quest
            </span>
            <br />
            <span className="text-foreground">
              Selesaikan Misi, Raih Hadiah
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Sistem gamification seperti Duolingo! Selesaikan misi harian,
            kumpulkan badge, dan dapatkan voucher diskon eksklusif.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Daily Quests */}
          <div className="lg:col-span-2 backdrop-blur-xl bg-card/60 border border-[#F99912]/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-foreground">
                Misi Harian
              </h3>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F99912]/10">
                <Gift className="w-4 h-4 text-[#F99912]" />
                <span className="text-sm font-semibold text-[#F99912]">
                  +160 Poin
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {quests.map((quest, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border transition-all duration-300 ${
                    quest.completed
                      ? "bg-[#64762C]/10 border-[#64762C]/30"
                      : "bg-muted/30 border-[#F99912]/10 hover:border-[#F99912]/30 hover:bg-[#F99912]/5"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        quest.completed
                          ? "bg-gradient-to-br from-[#64762C] to-[#424F17]"
                          : "bg-gradient-to-br from-[#F99912]/20 to-[#64762C]/20"
                      }`}
                    >
                      <quest.icon
                        className={`w-6 h-6 ${quest.completed ? "text-foreground" : "text-[#F99912]"}`}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-foreground">
                          {quest.title}
                        </h4>
                        <span
                          className={`text-sm font-semibold ${quest.completed ? "text-[#64762C]" : "text-[#F99912]"}`}
                        >
                          {quest.reward}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {quest.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              quest.completed
                                ? "bg-gradient-to-r from-[#64762C] to-[#424F17]"
                                : "bg-gradient-to-r from-[#F99912] to-[#64762C]"
                            }`}
                            style={{
                              width: `${(quest.progress / quest.total) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {quest.progress}/{quest.total}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mystery Box */}
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-[#F99912]/10 to-[#64762C]/10 border border-[#F99912]/20">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#F99912] to-[#64762C] flex items-center justify-center animate-pulse">
                  <Gift className="w-8 h-8 text-[#181612]" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">
                    Mystery Box
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Belanja min. Rp100.000 untuk membuka Mystery Box dengan
                    hadiah menarik!
                  </p>
                </div>
                <Button className="bg-gradient-to-r from-[#F99912] to-[#64762C] text-[#181612] font-semibold">
                  Buka
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="backdrop-blur-xl bg-card/60 border border-[#F99912]/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Badge Collection
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {badges.map((badge, index) => (
                  <div
                    key={index}
                    className={`relative p-3 rounded-xl border text-center transition-all duration-300 ${
                      badge.earned
                        ? "bg-muted/50 border-[#F99912]/20 hover:border-[#F99912]/40"
                        : "bg-muted/20 border-muted/30 opacity-50"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 mx-auto rounded-xl bg-gradient-to-br ${badge.color} p-0.5 mb-2`}
                    >
                      <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                        <badge.icon
                          className={`w-5 h-5 ${badge.earned ? "text-[#F99912]" : "text-muted-foreground"}`}
                        />
                      </div>
                    </div>
                    <p className="text-xs font-medium text-foreground">
                      {badge.name}
                    </p>
                    {!badge.earned && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/50 rounded-xl">
                        <span className="text-2xl">🔒</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Leaderboard */}
            <div className="backdrop-blur-xl bg-card/60 border border-[#F99912]/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Leaderboard
                </h3>
                <Link
                  href="/leaderboard"
                  className="text-sm text-[#F99912] hover:underline"
                >
                  Lihat Semua
                </Link>
              </div>
              <div className="space-y-3">
                {leaderboard.map((user) => (
                  <div
                    key={user.rank}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors"
                  >
                    <span
                      className={`w-6 text-center font-bold ${
                        user.rank === 1
                          ? "text-[#F99912]"
                          : user.rank === 2
                            ? "text-[#C9C9C3]"
                            : user.rank === 3
                              ? "text-[#64762C]"
                              : "text-muted-foreground"
                      }`}
                    >
                      {user.rank}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        user.badge === "gold"
                          ? "bg-gradient-to-br from-[#F99912] to-[#C9C9C3] text-[#181612]"
                          : user.badge === "silver"
                            ? "bg-gradient-to-br from-[#C9C9C3] to-[#a8a8a3] text-[#181612]"
                            : user.badge === "bronze"
                              ? "bg-gradient-to-br from-[#64762C] to-[#424F17] text-foreground"
                              : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {user.avatar}
                    </div>
                    <span className="flex-1 text-sm font-medium text-foreground">
                      {user.name}
                    </span>
                    <span className="text-sm text-[#F99912] font-semibold">
                      {user.points.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
