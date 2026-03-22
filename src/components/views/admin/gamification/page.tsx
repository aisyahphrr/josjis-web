"use client"

import { useEffect, useMemo, useState } from "react"
import { Medal, Trophy } from "lucide-react"
import toast from "react-hot-toast"

import { dummyLeaderboard, type LeaderboardRecord } from "@/src/lib/dummyData"
import { PageHeader } from "@/components/admin/page-header"
import { TableSkeleton } from "@/components/admin/loading-skeletons"
import { StatusBadge } from "@/components/admin/status-badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Switch } from "@/src/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table"

export default function AdminGamificationPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [rewardsEnabled, setRewardsEnabled] = useState(true)
  const [rows] = useState<LeaderboardRecord[]>(
    [...dummyLeaderboard].sort((a, b) => b.points - a.points),
  )

  useEffect(() => {
    const t = window.setTimeout(() => setIsLoading(false), 650)
    return () => window.clearTimeout(t)
  }, [])

  const totalPoints = useMemo(
    () => rows.reduce((acc, r) => acc + r.points, 0),
    [rows],
  )

  if (isLoading) return <TableSkeleton rows={6} />

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gamification"
        subtitle="Leaderboard dan kontrol reward (dummy)."
      />

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="rounded-2xl border-[#F99912]/10 bg-card/60 backdrop-blur-xl xl:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Trophy className="size-4 text-[#F99912]" />
              Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-hidden rounded-2xl">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30 hover:bg-muted/30">
                    <TableHead>#</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Points</TableHead>
                    <TableHead>Level</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((r, idx) => (
                    <TableRow key={r.id} className="hover:bg-muted/20">
                      <TableCell className="font-semibold text-foreground">
                        {idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : idx + 1}
                      </TableCell>
                      <TableCell className="font-semibold text-foreground">
                        {r.username}
                      </TableCell>
                      <TableCell className="font-semibold text-foreground">
                        {r.points.toLocaleString("id-ID")}
                      </TableCell>
                      <TableCell>
                        <StatusBadge
                          tone={
                            r.level === "Pro"
                              ? "success"
                              : r.level === "Amateur"
                                ? "warning"
                                : "neutral"
                          }
                        >
                          {r.level}
                        </StatusBadge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-[#F99912]/10 bg-card/60 backdrop-blur-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Medal className="size-4 text-[#F99912]" />
              System Points
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl border border-border/60 bg-muted/20 p-4">
              <div className="text-xs text-muted-foreground">Total points in system</div>
              <div className="mt-1 text-2xl font-bold text-foreground">
                {totalPoints.toLocaleString("id-ID")}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                Konfigurasi ini dummy dan siap dihubungkan ke API.
              </div>
            </div>

            <div className="rounded-2xl border border-border/60 bg-muted/20 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-foreground">Rewards</div>
                  <div className="text-sm text-muted-foreground">
                    Enable/disable reward distribution.
                  </div>
                </div>
                <Switch
                  checked={rewardsEnabled}
                  onCheckedChange={(checked) => {
                    setRewardsEnabled(checked)
                    toast(checked ? "Rewards diaktifkan." : "Rewards dimatikan.", {
                      icon: checked ? "🎁" : "🚫",
                    })
                  }}
                />
              </div>
              <div className="mt-3">
                <StatusBadge tone={rewardsEnabled ? "success" : "danger"}>
                  {rewardsEnabled ? "Enabled" : "Disabled"}
                </StatusBadge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

