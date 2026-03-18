
"use client";
import {
  Shield,
  Store,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  XCircle,
  AlertTriangle,
  BarChart3,
  Eye,
  Clock,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { FileCheck, Flag } from "lucide-react";
import {
  adminStats,
  pendingUMKM,
  recentComplaints,
  systemStats,
} from "@/src/lib/constants/admin/dashboard/dashboard";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
        {/* Admin Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#F99912]/10 via-[#64762C]/20 to-[#424F17]/10 border border-[#F99912]/20 p-6 lg:p-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F99912]/10 rounded-full blur-3xl" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F99912] to-[#64762C] p-0.5">
                <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                  <Shield className="w-8 h-8 text-[#F99912]" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Admin Control Panel
                </h2>
                <p className="text-muted-foreground">
                  Kelola seluruh sistem JOSJIS dari sini
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-xl bg-[#64762C]/20 border border-[#64762C]/30">
                <p className="text-xs text-muted-foreground">UMKM Pending</p>
                <p className="text-xl font-bold text-[#64762C]">3</p>
              </div>
              <div className="px-4 py-2 rounded-xl bg-[#F99912]/20 border border-[#F99912]/30">
                <p className="text-xs text-muted-foreground">Komplain Open</p>
                <p className="text-xl font-bold text-[#F99912]">5</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {adminStats.map((stat, index) => (
            <div
              key={index}
              className="relative overflow-hidden backdrop-blur-xl bg-card/60 border border-[#F99912]/10 rounded-2xl p-5 hover:border-[#F99912]/30 transition-all duration-300"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} p-0.5 mb-4`}
              >
                <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-[#F99912]" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
                <span className="text-xs text-[#64762C] font-medium flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {stat.trend}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Pending UMKM Validation */}
          <div className="lg:col-span-2 backdrop-blur-xl bg-card/60 border border-[#F99912]/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold text-foreground">
                  Validasi UMKM Pending
                </h3>
                <span className="px-2 py-1 rounded-full bg-[#F99912]/20 text-[#F99912] text-xs font-medium">
                  {pendingUMKM.length} pending
                </span>
              </div>
              <Link href="/admin/umkm-validation">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#F99912] hover:text-[#F99912]/80"
                >
                  Lihat Semua
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {pendingUMKM.map((umkm) => (
                <div
                  key={umkm.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#64762C]/20 to-[#424F17]/20 flex items-center justify-center">
                    <Store className="w-6 h-6 text-[#64762C]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">
                      {umkm.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {umkm.owner} - {umkm.docs} dokumen
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {umkm.date}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      className="h-8 bg-[#64762C] hover:bg-[#64762C]/90 text-foreground"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="destructive" className="h-8">
                      <XCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Stats */}
          <div className="backdrop-blur-xl bg-card/60 border border-[#F99912]/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Statistik Sistem
            </h3>
            <div className="space-y-4">
              {systemStats.map((stat, index) => (
                <div key={index} className="p-4 rounded-xl bg-muted/30">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                    <span className="text-xs text-[#64762C] font-medium">
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-xl font-bold text-foreground">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Complaints */}
        <div className="backdrop-blur-xl bg-card/60 border border-[#F99912]/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-foreground">
                Komplain Terbaru
              </h3>
              <span className="px-2 py-1 rounded-full bg-destructive/20 text-destructive text-xs font-medium">
                1 urgent
              </span>
            </div>
            <Link href="/admin/complaints">
              <Button
                variant="ghost"
                size="sm"
                className="text-[#F99912] hover:text-[#F99912]/80"
              >
                Lihat Semua
                <ArrowRight className="ml-1 w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {recentComplaints.map((complaint) => (
              <div
                key={complaint.id}
                className={`p-4 rounded-xl border transition-all ${
                  complaint.status === "open"
                    ? "bg-destructive/5 border-destructive/20"
                    : complaint.status === "in-progress"
                      ? "bg-[#F99912]/5 border-[#F99912]/20"
                      : "bg-[#64762C]/5 border-[#64762C]/20"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-foreground">
                    {complaint.id}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      complaint.status === "open"
                        ? "bg-destructive/20 text-destructive"
                        : complaint.status === "in-progress"
                          ? "bg-[#F99912]/20 text-[#F99912]"
                          : "bg-[#64762C]/20 text-[#64762C]"
                    }`}
                  >
                    {complaint.status === "open"
                      ? "Open"
                      : complaint.status === "in-progress"
                        ? "In Progress"
                        : "Resolved"}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  {complaint.user}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {complaint.type}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {complaint.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              icon: FileCheck,
              label: "Validasi UMKM",
              href: "/admin/umkm-validation",
              color: "from-[#64762C] to-[#424F17]",
            },
            {
              icon: Flag,
              label: "Moderasi Review",
              href: "/admin/reviews",
              color: "from-[#F99912] to-[#C9C9C3]",
            },
            {
              icon: BarChart3,
              label: "Laporan",
              href: "/admin/statistics",
              color: "from-[#C9C9C3] to-[#64762C]",
            },
            {
              icon: AlertTriangle,
              label: "Komplain",
              href: "/admin/complaints",
              color: "from-[#F99912] to-[#64762C]",
            },
          ].map((action, index) => (
            <Link key={index} href={action.href}>
              <div className="group backdrop-blur-xl bg-card/60 border border-[#F99912]/10 rounded-2xl p-5 hover:border-[#F99912]/30 transition-all duration-300 hover:translate-y-[-2px] cursor-pointer">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} p-0.5 mb-3 group-hover:shadow-[0_0_20px_rgba(249,153,18,0.3)] transition-shadow`}
                >
                  <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                    <action.icon className="w-6 h-6 text-[#F99912]" />
                  </div>
                </div>
                <p className="font-medium text-foreground group-hover:text-[#F99912] transition-colors">
                  {action.label}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
  );
}
