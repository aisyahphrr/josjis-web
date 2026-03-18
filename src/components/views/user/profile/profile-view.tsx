"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { Badge } from "@/src/components/ui/badge";
import { Progress } from "@/src/components/ui/progress";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Edit2,
  Coins,
  Trophy,
  ShoppingBag,
  Star,
  Calendar,
  Shield,
  Bell,
  Lock,
  Save,
} from "lucide-react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "user@josjis.com",
    phone: "081234567890",
    address:
      "Jl. Pajajaran No. 123, RT 01/RW 02, Tegallega, Bogor Tengah, Kota Bogor, Jawa Barat 16143",
  });

  // Mock stats
  const stats = {
    coins: 2450,
    level: 5,
    xp: 850,
    totalOrders: 12,
    reviews: 8,
    memberSince: "Jan 2026",
  };

  const achievements = [
    { name: "Pemula", icon: Star, unlocked: true },
    { name: "Pembeli Setia", icon: ShoppingBag, unlocked: true },
    { name: "Reviewer", icon: Edit2, unlocked: true },
    { name: "VIP", icon: Trophy, unlocked: false },
  ];

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="relative overflow-hidden bg-card/50 backdrop-blur border-[#F99912]/10">
        {/* Cover */}
        <div className="h-32 bg-gradient-to-r from-[#F99912]/30 via-[#64762C]/20 to-[#424F17]/30" />

        <CardContent className="relative -mt-16 px-6 pb-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-[#F99912] to-[#64762C] p-1 shadow-lg">
                <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                  <User className="w-16 h-16 text-[#F99912]" />
                </div>
              </div>
              <button className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-[#F99912] flex items-center justify-center text-[#181612] hover:shadow-lg transition-shadow">
                <Camera className="w-5 h-5" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 pt-4 md:pt-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    {profile.name}
                  </h1>
                  <p className="text-muted-foreground">{profile.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className="bg-[#F99912] text-[#181612]">
                      Level {stats.level}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-[#64762C]/30 text-[#64762C]"
                    >
                      Member sejak {stats.memberSince}
                    </Badge>
                  </div>
                </div>
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant={isEditing ? "default" : "outline"}
                  className={
                    isEditing
                      ? "bg-gradient-to-r from-[#F99912] to-[#64762C] text-[#181612]"
                      : "border-[#F99912]/30 hover:bg-[#F99912]/10"
                  }
                >
                  {isEditing ? (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Simpan
                    </>
                  ) : (
                    <>
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit Profil
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Stats & Achievements */}
        <div className="space-y-6">
          {/* Stats */}
          <Card className="bg-card/50 backdrop-blur border-[#F99912]/10">
            <CardHeader>
              <CardTitle className="text-lg">Statistik</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#F99912]/10">
                <div className="flex items-center gap-3">
                  <Coins className="w-5 h-5 text-[#F99912]" />
                  <span className="text-sm text-foreground">
                    Koin Asli Bogor
                  </span>
                </div>
                <span className="font-bold text-[#F99912]">
                  {stats.coins.toLocaleString()}
                </span>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">
                    Level {stats.level}
                  </span>
                  <span className="text-[#F99912]">{stats.xp}/1000 XP</span>
                </div>
                <Progress value={(stats.xp / 1000) * 100} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-muted/30 text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {stats.totalOrders}
                  </p>
                  <p className="text-xs text-muted-foreground">Total Pesanan</p>
                </div>
                <div className="p-3 rounded-xl bg-muted/30 text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {stats.reviews}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Review Diberikan
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="bg-card/50 backdrop-blur border-[#F99912]/10">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#F99912]" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.name}
                    className={`p-3 rounded-xl text-center transition-all ${
                      achievement.unlocked
                        ? "bg-[#F99912]/10 border border-[#F99912]/30"
                        : "bg-muted/30 opacity-50"
                    }`}
                  >
                    <achievement.icon
                      className={`w-6 h-6 mx-auto mb-1 ${
                        achievement.unlocked
                          ? "text-[#F99912]"
                          : "text-muted-foreground"
                      }`}
                    />
                    <p className="text-xs font-medium">{achievement.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Profile Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Info */}
          <Card className="bg-card/50 backdrop-blur border-[#F99912]/10">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="w-5 h-5 text-[#F99912]" />
                Informasi Pribadi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) =>
                        setProfile({ ...profile, name: e.target.value })
                      }
                      disabled={!isEditing}
                      className="pl-10 bg-muted/50 border-[#F99912]/10 focus:border-[#F99912]/50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })
                      }
                      disabled={!isEditing}
                      className="pl-10 bg-muted/50 border-[#F99912]/10 focus:border-[#F99912]/50"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Nomor Telepon</Label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                    disabled={!isEditing}
                    className="pl-10 bg-muted/50 border-[#F99912]/10 focus:border-[#F99912]/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Alamat</Label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 w-4 h-4 text-muted-foreground" />
                  <Textarea
                    id="address"
                    value={profile.address}
                    onChange={(e) =>
                      setProfile({ ...profile, address: e.target.value })
                    }
                    disabled={!isEditing}
                    className="pl-10 min-h-[100px] bg-muted/50 border-[#F99912]/10 focus:border-[#F99912]/50"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card className="bg-card/50 backdrop-blur border-[#F99912]/10">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#F99912]" />
                Pengaturan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-muted-foreground" />
                  <span className="text-foreground">Notifikasi</span>
                </div>
                <Badge variant="secondary">Aktif</Badge>
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-muted-foreground" />
                  <span className="text-foreground">Ubah Password</span>
                </div>
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-muted-foreground" />
                  <span className="text-foreground">Keamanan Akun</span>
                </div>
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
