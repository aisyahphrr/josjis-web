"use client"

import { useEffect, useState, useRef } from "react"
import { Moon, Sun, Bell, User, ShieldCheck, Settings, Smartphone, Laptop, Globe, Mail, AlertTriangle, UserCircle } from "lucide-react"
import toast from "react-hot-toast"
import { useTheme } from "next-themes"

import { PageHeader } from "@/src/components/views/admin/layouts/page-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Switch } from "@/src/components/ui/switch"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { StatusBadge } from "@/src/components/views/admin/layouts/status-badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"

export default function AdminSettingsPage() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Dummy states
  const [twoFactor, setTwoFactor] = useState(false)
  const [emailNotif, setEmailNotif] = useState(true)
  const [pushNotif, setPushNotif] = useState(true)
  const [alertAnomali, setAlertAnomali] = useState(true)
  const [maintenance, setMaintenance] = useState(false)

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [profileData, setProfileData] = useState({
    name: "Administrator Josjis",
    email: "admin@josjis.com",
    phone: "+62 812-3456-7890",
    bio: "Administrator pengelola penuh aplikasi JOSJIS."
  })
  const [isSaving, setIsSaving] = useState(false)
  const [isSavingPass, setIsSavingPass] = useState(false)

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarUrl(URL.createObjectURL(file))
      toast.success("Foto profil berhasil diperbarui (dummy).")
    }
  }

  useEffect(() => setMounted(true), [])

  const isDark = mounted ? resolvedTheme === "dark" : false

  const handleSaveProfile = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSaving(false)
    toast.success("Perubahan profil berhasil disimpan di sistem.")
  }

  const handleSavePassword = async () => {
    setIsSavingPass(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSavingPass(false)
    toast.success("Password baru telah diamankan ke server.")
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        subtitle="Konfigurasi profil admin, preferensi sistem, dan metrik sekuritas."
      />

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-muted/40 p-1 w-full sm:w-auto flex flex-col sm:flex-row rounded-2xl h-auto flex-wrap">
          <TabsTrigger value="profile" className="sm:flex-1 w-full rounded-xl h-10 text-sm data-[state=active]:bg-[#F99912] data-[state=active]:text-white dark:data-[state=active]:text-black">
            <User className="mr-2 mx-1 size-4" /> Profil Administrasi
          </TabsTrigger>
          <TabsTrigger value="security" className="sm:flex-1 w-full rounded-xl h-10 text-sm data-[state=active]:bg-[#F99912] data-[state=active]:text-white dark:data-[state=active]:text-black">
            <ShieldCheck className="mr-2 mx-1 size-4" /> Keamanan & Akses
          </TabsTrigger>
          <TabsTrigger value="notifications" className="sm:flex-1 w-full rounded-xl h-10 text-sm data-[state=active]:bg-[#F99912] data-[state=active]:text-white dark:data-[state=active]:text-black">
            <Bell className="mr-2 mx-1 size-4" /> Setup Notifikasi
          </TabsTrigger>
          <TabsTrigger value="system" className="sm:flex-1 w-full rounded-xl h-10 text-sm data-[state=active]:bg-[#F99912] data-[state=active]:text-white dark:data-[state=active]:text-black">
            <Settings className="mr-2 mx-1 size-4" /> Preferensi Sistem
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6 outline-none focus:outline-none focus:ring-0">
          <Card className="rounded-2xl border-[#F99912]/10 bg-card/60 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-xl">Informasi Profil</CardTitle>
              <CardDescription>Ubah detail informasi profil pribadi untuk akun Administrator Anda.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="flex flex-col items-center gap-3">
                  <div className="h-28 w-28 rounded-full border-4 border-border/60 bg-muted/40 flex items-center justify-center overflow-hidden relative">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
                    ) : (
                      <UserCircle className="size-16 text-muted-foreground" />
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl border-border/60"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Ubah Foto
                  </Button>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleAvatarChange}
                  />
                </div>

                <div className="flex-1 w-full grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Nama Lengkap</Label>
                    <Input
                      value={profileData.name}
                      onChange={(e) => setProfileData(p => ({ ...p, name: e.target.value }))}
                      className="h-10 rounded-2xl border-border/60 bg-muted/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Kewenangan (Role)</Label>
                    <Input defaultValue="Super Admin" disabled className="h-10 rounded-2xl border-border/60 bg-muted/10 opacity-70" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email Utama</Label>
                    <Input
                      value={profileData.email}
                      onChange={(e) => setProfileData(p => ({ ...p, email: e.target.value }))}
                      className="h-10 rounded-2xl border-border/60 bg-muted/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Nomor Telepon Standby</Label>
                    <Input
                      value={profileData.phone}
                      onChange={(e) => setProfileData(p => ({ ...p, phone: e.target.value }))}
                      className="h-10 rounded-2xl border-border/60 bg-muted/30"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Bio Singkat</Label>
                    <textarea
                      className="flex w-full rounded-2xl border border-input bg-muted/30 px-4 py-3 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring min-h-[80px] resize-none"
                      value={profileData.bio}
                      onChange={(e) => setProfileData(p => ({ ...p, bio: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end border-t border-border/60 pt-5 mt-2">
                <Button
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  className="rounded-2xl bg-[#F99912] text-white dark:text-black hover:bg-[#F99912]/90 flex items-center justify-center gap-2"
                >
                  {isSaving ? "Menyimpan ke Server..." : "Simpan Perubahan Profil"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6 outline-none focus:outline-none focus:ring-0">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="rounded-2xl border-[#F99912]/10 bg-card/60 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-xl">Ganti Kata Sandi</CardTitle>
                <CardDescription>Perbarui kata sandi secara berkala untuk proteksi optimal.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Password Saat Ini</Label>
                  <Input type="password" placeholder="••••••••" className="h-10 rounded-2xl border-border/60 bg-background/50" />
                </div>
                <div className="space-y-2">
                  <Label>Password Baru</Label>
                  <Input type="password" placeholder="••••••••" className="h-10 rounded-2xl border-border/60 bg-background/50" />
                </div>
                <div className="space-y-2">
                  <Label>Konfirmasi Password Baru</Label>
                  <Input type="password" placeholder="••••••••" className="h-10 rounded-2xl border-border/60 bg-background/50" />
                </div>
                <Button
                  onClick={handleSavePassword}
                  disabled={isSavingPass}
                  className="w-full rounded-2xl mt-2 bg-foreground text-background hover:bg-foreground/90 disabled:cursor-not-allowed"
                >
                  {isSavingPass ? "Mengupdate..." : "Update Password"}
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="rounded-2xl border-success/30 bg-success/5 backdrop-blur-xl">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-semibold text-foreground flex items-center gap-2">
                        <ShieldCheck className="size-5 text-success" /> Two-Factor Authentication (2FA)
                      </div>
                      <div className="text-sm text-foreground/70 mt-1.5">
                        Tambahkan lapisan validasi ekstra menggunakan OTP.
                      </div>
                    </div>
                    <Switch checked={twoFactor} onCheckedChange={(val) => { setTwoFactor(val); toast(val ? "2FA diaktifkan (dummy)." : "2FA dinonaktifkan (dummy).") }} />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-border/60 bg-card/60 backdrop-blur-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base">Sesi Log In Aktif</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-2xl border border-success/20 bg-success/10">
                    <div className="flex items-center gap-3">
                      <Laptop className="size-5 text-foreground/80" />
                      <div>
                        <div className="text-sm font-semibold">Windows PC • Chrome</div>
                        <div className="text-xs text-foreground/60">Bogor, ID • Sedang Aktif</div>
                      </div>
                    </div>
                    <StatusBadge tone="success">Active</StatusBadge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-2xl border border-border/60 bg-background/50">
                    <div className="flex items-center gap-3">
                      <Smartphone className="size-5 text-foreground/80" />
                      <div>
                        <div className="text-sm font-semibold">iPhone 14 Pro • Safari</div>
                        <div className="text-xs text-foreground/60">Jakarta, ID • 2 Jam lalu</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 text-destructive hover:text-destructive hover:bg-destructive/10 rounded-xl" onClick={() => toast.error("Akses dari perangkat dihapus (dummy)")}>Revoke</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6 outline-none focus:outline-none focus:ring-0">
          <Card className="rounded-2xl border-[#F99912]/10 bg-card/60 backdrop-blur-xl max-w-3xl">
            <CardHeader>
              <CardTitle className="text-xl">Setelan Pemberitahuan</CardTitle>
              <CardDescription>Atur berbagai prioritas peringatan ke email maupun antar-muka.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 mt-2">
              <div className="flex items-start justify-between gap-4 pb-5 border-b border-border/60">
                <div className="flex gap-4">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary h-fit"><Mail className="size-5" /></div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">Peringatan ke Email Utama</div>
                    <div className="text-sm text-muted-foreground mt-0.5">Terima rekap pembukuan, pendaftaran UMKM, dan metrik Laporan harian.</div>
                  </div>
                </div>
                <Switch checked={emailNotif} onCheckedChange={(v) => { setEmailNotif(v); toast("Preferensi email diperbarui.") }} />
              </div>

              <div className="flex items-start justify-between gap-4 pb-5 border-b border-border/60">
                <div className="flex gap-4">
                  <div className="p-2.5 rounded-xl bg-[#F99912]/20 text-[#F99912] h-fit"><Bell className="size-5" /></div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">Push/Browser Notifications</div>
                    <div className="text-sm text-muted-foreground mt-0.5">Dering *real-time* pesan *chat* dan tiket komplain saat *dashboard* dibuka.</div>
                  </div>
                </div>
                <Switch checked={pushNotif} onCheckedChange={(v) => { setPushNotif(v); toast("Browser notification diperbarui.") }} />
              </div>

              <div className="flex items-start justify-between gap-4 pb-2">
                <div className="flex gap-4">
                  <div className="p-2.5 rounded-xl bg-destructive/15 text-destructive h-fit"><AlertTriangle className="size-5" /></div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">Peringatan Anomali & Fraud</div>
                    <div className="text-sm text-muted-foreground mt-0.5">Notifikasi insiden dan *alert* lonjakan transaksi secara mendadak.</div>
                  </div>
                </div>
                <Switch checked={alertAnomali} onCheckedChange={(v) => { setAlertAnomali(v); toast("Alert Darurat diperbarui.") }} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6 outline-none focus:outline-none focus:ring-0">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="rounded-2xl border-[#F99912]/10 bg-card/60 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-xl">Sistem Terpusat</CardTitle>
                <CardDescription>Regionalisasi waktu, dan tampilan GUI.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label>Zona Waktu Server</Label>
                  <select className="flex h-10 w-full rounded-2xl border border-input bg-background/50 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring">
                    <option value="Asia/Jakarta">Indonesia (WIB / GMT+7)</option>
                    <option value="Asia/Makassar">Indonesia (WITA / GMT+8)</option>
                    <option value="Asia/Jayapura">Indonesia (WIT / GMT+9)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Translasi Antarmuka Default</Label>
                  <select className="flex h-10 w-full rounded-2xl border border-input bg-background/50 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring">
                    <option value="id">BAHASA INDONESIA</option>
                    <option value="en">ENGLISH (US)</option>
                  </select>
                </div>

                <div className="pt-3 border-t border-border/60 mt-4 space-y-3">
                  <Label>Tampilan Visual (Theme)</Label>
                  <div className="flex gap-3">
                    <Button
                      variant={!isDark ? "default" : "outline"}
                      className={`flex-1 rounded-2xl h-10 ${!isDark ? "bg-foreground text-background shadow-md border border-foreground/10" : "border-border/60"}`}
                      onClick={() => setTheme("light")}
                    >
                      <Sun className="mr-2 size-4" /> Mode Terang
                    </Button>
                    <Button
                      variant={isDark ? "default" : "outline"}
                      className={`flex-1 rounded-2xl h-10 ${isDark ? "bg-foreground text-background shadow-md border border-foreground/10" : "border-border/60"}`}
                      onClick={() => setTheme("dark")}
                    >
                      <Moon className="mr-2 size-4" /> Mode Gelap
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-destructive/30 bg-destructive/10 backdrop-blur-xl h-fit">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2 text-destructive">
                  <Globe className="size-5" /> Area Pemeliharaan
                </CardTitle>
                <CardDescription>Matikan sementara akses *client-end* untuk kepentingan perbaikan (*dummy*).</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 rounded-xl border border-destructive/20 bg-background/60 shadow-sm">
                  <div>
                    <div className="font-semibold text-foreground text-sm">Aktifkan Maintenance Mode</div>
                    <div className="text-xs text-muted-foreground mt-0.5">Admin akan tetap mendapati tampilan penuh aplikasi.</div>
                  </div>
                  <Switch checked={maintenance} onCheckedChange={(v) => { setMaintenance(v); toast(v ? "Maintenance Mode AKTIF!" : "Situs kembali ON", { icon: v ? '⚠️' : '✅' }) }} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

