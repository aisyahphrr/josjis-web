"use client"

import { useEffect, useMemo, useState } from "react"
import { BarChart3, Store, Truck, Users, CreditCard, ArrowRight } from "lucide-react"
import Link from "next/link"
import toast from "react-hot-toast"

import {
  dummyMonthlyGrowth,
  dummySalesSeries,
  dummyTopProducts,
  dummyTopUmkm,
  dummyTransactions,
  dummyUmkm,
  dummyUsers,
} from "@/src/lib/dummyData"
import { PageHeader } from "@/src/components/views/admin/layouts/page-header"
import { StatCard } from "@/src/components/views/admin/layouts/stat-card"
import { PageSkeleton } from "@/src/components/views/admin/layouts/loading-skeletons"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { StatusBadge } from "@/src/components/views/admin/layouts/status-badge"

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

export default function AdminDashboardPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const t = window.setTimeout(() => setIsLoading(false), 900)
    return () => window.clearTimeout(t)
  }, [])

  const stats = useMemo(() => {
    const totalUsers = dummyUsers.filter((u) => u.role === "user").length
    const totalDrivers = dummyUsers.filter((u) => u.role === "driver").length
    const totalUmkm = dummyUmkm.filter((u) => u.approvalStatus === "approved").length
    const totalTrx = dummyTransactions.length
    return { totalUsers, totalDrivers, totalUmkm, totalTrx }
  }, [])

  const pendingUmkmCount = dummyUmkm.filter((u) => u.approvalStatus === "pending").length
  const pendingReportsCount = 5

  if (isLoading) return <PageSkeleton />

  return (
    <div className="space-y-6">
      <PageHeader
        title="Overview"
        subtitle="Ringkasan performa sistem dan aktivitas terbaru."
        actions={
          <Button
            className="rounded-2xl bg-gradient-to-r from-[#F99912] to-[#64762C] text-[#181612] hover:from-[#F99912]/90 hover:to-[#64762C]/90"
            onClick={() => toast.success("Data terbaru sudah dimuat (dummy).")}
          >
            Refresh Data
          </Button>
        }
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Users}
          label="Total Users"
          value={stats.totalUsers.toLocaleString("id-ID")}
          trend="+3.2% minggu ini"
          gradient="from-[#F99912] to-[#C9C9C3]"
        />
        <StatCard
          icon={Store}
          label="Total UMKM (Approved)"
          value={stats.totalUmkm.toLocaleString("id-ID")}
          trend="+2 UMKM baru"
          gradient="from-[#64762C] to-[#424F17]"
        />
        <StatCard
          icon={Truck}
          label="Total Drivers"
          value={stats.totalDrivers.toLocaleString("id-ID")}
          trend="+1 driver aktif"
          gradient="from-[#C9C9C3] to-[#F99912]"
        />
        <StatCard
          icon={CreditCard}
          label="Total Transactions"
          value={stats.totalTrx.toLocaleString("id-ID")}
          trend="+18% hari ini"
          gradient="from-[#F99912] to-[#64762C]"
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="rounded-2xl border-[#F99912]/10 bg-card/60 backdrop-blur-xl xl:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 className="size-4 text-[#F99912]" />
              Pertumbuhan (1 Tahun Terakhir)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dummyMonthlyGrowth}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                  <XAxis dataKey="label" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 16,
                      border: "1px solid rgba(249,153,18,0.2)",
                      background: "rgba(18,18,18,0.85)",
                      color: "white",
                    }}
                    labelStyle={{ color: "white" }}
                    cursor={{ fill: "rgba(249,153,18,0.08)" }}
                  />
                  <Legend wrapperStyle={{ paddingTop: "20px" }} />
                  <Bar dataKey="users" name="Users" fill="#C9C9C3" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="umkm" name="UMKM" fill="#64762C" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="drivers" name="Drivers" fill="#F99912" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-[#F99912]/10 bg-card/60 backdrop-blur-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-2xl border border-[#F99912]/15 bg-[#F99912]/5 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold text-foreground">
                  {pendingUmkmCount} UMKM waiting for approval
                </div>
                <StatusBadge tone="warning">Action</StatusBadge>
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                Tinjau dokumen dan approve/reject.
              </div>
              <Link href="/validasi" className="mt-3 inline-flex">
                <Button variant="outline" className="rounded-2xl border-border/60">
                  Buka Validasi
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
            </div>

            <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold text-foreground">
                  {pendingReportsCount} reports need attention
                </div>
                <StatusBadge tone="danger">Urgent</StatusBadge>
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                Prioritaskan laporan pending.
              </div>
              <Link href="/laporan" className="mt-3 inline-flex">
                <Button variant="outline" className="rounded-2xl border-border/60">
                  Buka Laporan
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card className="rounded-2xl border-[#F99912]/10 bg-card/60 backdrop-blur-xl">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-base">Top UMKM (Sales)</CardTitle>
            <Link href="/umkm">
              <Button variant="ghost" className="rounded-2xl text-[#F99912] hover:text-[#F99912]/80">
                Lihat semua
                <ArrowRight className="ml-1 size-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {dummyTopUmkm.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 rounded-2xl border border-border/60 bg-muted/25 p-4 hover:bg-muted/40 transition-colors"
              >
                <div className="min-w-0">
                  <div className="truncate font-semibold text-foreground">{item.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Rp {item.sales.toLocaleString("id-ID")}
                  </div>
                </div>
                <StatusBadge tone="success">{item.trend}</StatusBadge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-[#F99912]/10 bg-card/60 backdrop-blur-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Top Products</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {dummyTopProducts.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 rounded-2xl border border-border/60 bg-muted/25 p-4 hover:bg-muted/40 transition-colors"
              >
                <div className="min-w-0">
                  <div className="truncate font-semibold text-foreground">{item.name}</div>
                  <div className="text-sm text-muted-foreground truncate">
                    {item.umkm}
                  </div>
                </div>
                <StatusBadge tone="info">{item.sold} sold</StatusBadge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

