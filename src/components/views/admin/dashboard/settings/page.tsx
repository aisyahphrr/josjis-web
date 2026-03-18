"use client"

import { useEffect, useState } from "react"
import { Moon, Sun, Bell } from "lucide-react"
import toast from "react-hot-toast"
import { useTheme } from "next-themes"

import { PageHeader } from "@/components/admin/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { StatusBadge } from "@/components/admin/status-badge"

export default function AdminSettingsPage() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [notifEnabled, setNotifEnabled] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = mounted ? resolvedTheme === "dark" : false

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        subtitle="Pengaturan profil admin, tema, dan notifikasi. (Frontend-only)"
      />

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="rounded-2xl border-[#F99912]/10 bg-card/60 backdrop-blur-xl xl:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Profile Admin</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Nama</Label>
                <Input
                  defaultValue="Administrator"
                  className="h-10 rounded-2xl border-border/60 bg-muted/30"
                  onBlur={() => toast.success("Profile tersimpan (dummy).")}
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  defaultValue="admin@josjis.com"
                  className="h-10 rounded-2xl border-border/60 bg-muted/30"
                  onBlur={() => toast.success("Profile tersimpan (dummy).")}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-border/60 bg-muted/20 p-4">
              <div className="text-sm font-semibold text-foreground">Status</div>
              <div className="mt-2">
                <StatusBadge tone="success">Active</StatusBadge>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="rounded-2xl border-[#F99912]/10 bg-card/60 backdrop-blur-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Appearance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-2xl border border-border/60 bg-muted/20 p-4 flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-foreground">Theme</div>
                  <div className="text-sm text-muted-foreground">
                    Toggle dark/light mode
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="rounded-2xl border-border/60"
                  onClick={() => {
                    const next = isDark ? "light" : "dark"
                    setTheme(next)
                    toast(`Theme: ${next}`)
                  }}
                >
                  {isDark ? <Sun className="mr-2 size-4" /> : <Moon className="mr-2 size-4" />}
                  {isDark ? "Light" : "Dark"}
                </Button>
              </div>

              <div className="rounded-2xl border border-border/60 bg-muted/20 p-4">
                <div className="text-xs text-muted-foreground">Current</div>
                <div className="mt-1 font-semibold text-foreground">
                  {mounted ? theme : "system"}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-[#F99912]/10 bg-card/60 backdrop-blur-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-2xl border border-border/60 bg-muted/20 p-4 flex items-center justify-between gap-3">
                <div className="flex items-start gap-2">
                  <Bell className="mt-0.5 size-4 text-[#F99912]" />
                  <div>
                    <div className="text-sm font-semibold text-foreground">
                      Enable notifications
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Notifikasi admin console (dummy).
                    </div>
                  </div>
                </div>
                <Switch
                  checked={notifEnabled}
                  onCheckedChange={(checked) => {
                    setNotifEnabled(checked)
                    toast(checked ? "Notifikasi diaktifkan." : "Notifikasi dimatikan.")
                  }}
                />
              </div>

              <StatusBadge tone={notifEnabled ? "success" : "danger"}>
                {notifEnabled ? "Enabled" : "Disabled"}
              </StatusBadge>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

