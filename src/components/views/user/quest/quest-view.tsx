"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Progress } from "@/src/components/ui/progress";
import { Badge } from "@/src/components/ui/badge";
import {
  Trophy,
  Star,
  Zap,
  CheckCircle,
  Clock,
  ShoppingBag,
  Share2,
  Eye,
  Sparkles,
  Medal,
  Crown,
  Target,
} from "lucide-react";

const dailyQuests = [
  {
    id: 1,
    title: "Login Harian",
    description: "Login ke aplikasi hari ini",
    xp: 50,
    progress: 100,
    completed: true,
    icon: CheckCircle,
  },
  {
    id: 2,
    title: "Review Produk",
    description: "Berikan review untuk 1 produk",
    xp: 100,
    progress: 0,
    completed: false,
    icon: Star,
  },
  {
    id: 3,
    title: "Belanja UMKM",
    description: "Beli minimal 3 produk UMKM",
    xp: 150,
    progress: 66,
    completed: false,
    icon: ShoppingBag,
  },
  {
    id: 4,
    title: "Bagikan Produk",
    description: "Bagikan 2 produk ke social media",
    xp: 75,
    progress: 50,
    completed: false,
    icon: Share2,
  },
  {
    id: 5,
    title: "Kunjungi Marketplace",
    description: "Lihat 10 produk di marketplace",
    xp: 30,
    progress: 80,
    completed: false,
    icon: Eye,
  },
];

const weeklyQuests = [
  {
    id: 1,
    title: "Pejuang Belanja",
    description: "Belanja total Rp 500.000",
    xp: 500,
    progress: 45,
    completed: false,
    icon: ShoppingBag,
  },
  {
    id: 2,
    title: "Reviewer Handal",
    description: "Berikan 5 review produk",
    xp: 300,
    progress: 40,
    completed: false,
    icon: Star,
  },
  {
    id: 3,
    title: "Petani Rajin",
    description: "Panen 10 tanaman di Harvest Bogor",
    xp: 400,
    progress: 70,
    completed: false,
    icon: Sparkles,
  },
];

const badges = [
  {
    id: 1,
    name: "Pemula",
    icon: Medal,
    unlocked: true,
    description: "Selesaikan 5 quest pertama",
  },
  {
    id: 2,
    name: "Pembeli Setia",
    icon: ShoppingBag,
    unlocked: true,
    description: "Belanja 10 kali",
  },
  {
    id: 3,
    name: "Reviewer",
    icon: Star,
    unlocked: true,
    description: "Berikan 5 review",
  },
  {
    id: 4,
    name: "Sosialita",
    icon: Share2,
    unlocked: false,
    description: "Bagikan 20 produk",
  },
  {
    id: 5,
    name: "Master Petani",
    icon: Crown,
    unlocked: false,
    description: "Panen 50 tanaman",
  },
  {
    id: 6,
    name: "VIP Member",
    icon: Trophy,
    unlocked: false,
    description: "Capai Level 10",
  },
];

export default function QuestPage() {
  const [activeTab, setActiveTab] = useState<"daily" | "weekly">("daily");
  const currentXP = 850;
  const levelXP = 1000;
  const level = 5;

  return (
    <div className="space-y-8">
      {/* Header with Level Progress */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#F99912]/20 via-[#64762C]/10 to-blue-500/20 p-6 border border-[#F99912]/20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F99912]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#F99912] to-[#64762C] flex items-center justify-center shadow-[0_0_30px_rgba(249,153,18,0.3)]">
                  <Trophy className="w-10 h-10 text-[#181612]" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#F99912] flex items-center justify-center text-[#181612] font-bold text-sm border-2 border-background">
                  {level}
                </div>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  Bogor Quest
                </h1>
                <p className="text-muted-foreground">
                  Selesaikan misi dan dapatkan reward!
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Card className="bg-card/80 backdrop-blur border-[#F99912]/20">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F99912]/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-[#F99912]" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total XP</p>
                    <p className="text-xl font-bold text-[#F99912]">
                      {currentXP.toLocaleString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Level Progress */}
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Level {level}</span>
              <span className="text-[#F99912]">
                {currentXP}/{levelXP} XP
              </span>
            </div>
            <Progress value={(currentXP / levelXP) * 100} className="h-3" />
            <p className="text-xs text-muted-foreground mt-2">
              {levelXP - currentXP} XP lagi untuk mencapai Level {level + 1}
            </p>
          </div>
        </div>
      </div>

      {/* Quest Tabs */}
      <div className="flex gap-2">
        <Button
          variant={activeTab === "daily" ? "default" : "outline"}
          onClick={() => setActiveTab("daily")}
          className={
            activeTab === "daily"
              ? "bg-[#F99912] text-[#181612]"
              : "border-[#F99912]/30 hover:bg-[#F99912]/10"
          }
        >
          <Clock className="w-4 h-4 mr-2" />
          Quest Harian
        </Button>
        <Button
          variant={activeTab === "weekly" ? "default" : "outline"}
          onClick={() => setActiveTab("weekly")}
          className={
            activeTab === "weekly"
              ? "bg-[#F99912] text-[#181612]"
              : "border-[#F99912]/30 hover:bg-[#F99912]/10"
          }
        >
          <Target className="w-4 h-4 mr-2" />
          Quest Mingguan
        </Button>
      </div>

      {/* Quests List */}
      <div className="space-y-4">
        {(activeTab === "daily" ? dailyQuests : weeklyQuests).map((quest) => (
          <Card
            key={quest.id}
            className={`bg-card/50 backdrop-blur transition-all duration-300 ${
              quest.completed
                ? "border-green-500/30 bg-green-500/5"
                : "border-[#F99912]/10 hover:border-[#F99912]/30"
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    quest.completed ? "bg-green-500/20" : "bg-[#F99912]/10"
                  }`}
                >
                  <quest.icon
                    className={`w-7 h-7 ${
                      quest.completed ? "text-green-500" : "text-[#F99912]"
                    }`}
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">
                      {quest.title}
                    </h3>
                    {quest.completed && (
                      <Badge className="bg-green-500/20 text-green-500">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Selesai
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {quest.description}
                  </p>

                  {!quest.completed && (
                    <div className="flex items-center gap-4">
                      <Progress value={quest.progress} className="flex-1 h-2" />
                      <span className="text-xs text-muted-foreground">
                        {quest.progress}%
                      </span>
                    </div>
                  )}
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-1 text-[#F99912] font-semibold">
                    <Zap className="w-4 h-4" />+{quest.xp} XP
                  </div>
                  {quest.completed ? (
                    <span className="text-xs text-green-500">Claimed</span>
                  ) : quest.progress === 100 ? (
                    <Button
                      size="sm"
                      className="mt-2 bg-gradient-to-r from-[#F99912] to-[#64762C] text-[#181612]"
                    >
                      Klaim
                    </Button>
                  ) : null}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Badges Section */}
      <Card className="bg-card/50 backdrop-blur border-[#F99912]/10">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Medal className="w-5 h-5 text-[#F99912]" />
            Koleksi Badge
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`relative p-4 rounded-xl text-center transition-all ${
                  badge.unlocked
                    ? "bg-[#F99912]/10 border border-[#F99912]/30"
                    : "bg-muted/30 border border-muted/50 opacity-50"
                }`}
              >
                <div
                  className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-2 ${
                    badge.unlocked ? "bg-[#F99912]/20" : "bg-muted/50"
                  }`}
                >
                  <badge.icon
                    className={`w-6 h-6 ${
                      badge.unlocked
                        ? "text-[#F99912]"
                        : "text-muted-foreground"
                    }`}
                  />
                </div>
                <p
                  className={`text-sm font-medium ${
                    badge.unlocked ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {badge.name}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {badge.description}
                </p>
                {!badge.unlocked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/50 rounded-xl">
                    <span className="text-2xl">🔒</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
