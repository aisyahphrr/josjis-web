"use client"

import { useEffect, useMemo, useState } from "react"
import { Bot, LineChart as LineChartIcon } from "lucide-react"

import {
  dummyAiLogs,
  dummyTransactionTrends,
  dummyUmkmGrowth,
  dummyUserGrowth,
  type AnalyticsPoint,
} from "@/lib/dummyData"
import { PageHeader } from "@/components/admin/page-header"
import { PageSkeleton } from "@/components/admin/loading-skeletons"
import { StatusBadge } from "@/components/admin/status-badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

function ChartCard({
  title,
  data,
  color = "#F99912",
}: {
  title: string
  data: AnalyticsPoint[]
  color?: string
}) {
  return (
    <Card className="rounded-2xl border-[#F99912]/10 bg-card/60 backdrop-blur-xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <LineChartIcon className="size-4 text-[#F99912]" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
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
                cursor={{ stroke: "rgba(249,153,18,0.35)" }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={3}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default function AdminAnalyticsPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const t = window.setTimeout(() => setIsLoading(false), 800)
    return () => window.clearTimeout(t)
  }, [])

  const mostUsedFeature = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const log of dummyAiLogs) counts[log.feature] = (counts[log.feature] ?? 0) + 1
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1])
    return sorted[0] ? { feature: sorted[0][0], count: sorted[0][1] } : null
  }, [])

  if (isLoading) return <PageSkeleton />

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        subtitle="Grafik pertumbuhan dan monitoring AI (dummy)."
      />

      <div className="grid gap-4 xl:grid-cols-3">
        <ChartCard title="User growth" data={dummyUserGrowth} color="#F99912" />
        <ChartCard title="Transaction trends" data={dummyTransactionTrends} color="#64762C" />
        <ChartCard title="UMKM growth" data={dummyUmkmGrowth} color="#C9C9C3" />
      </div>

      <Card className="rounded-2xl border-[#F99912]/10 bg-card/60 backdrop-blur-xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Bot className="size-4 text-[#F99912]" />
            AI Monitoring
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-2xl border border-border/60 bg-muted/20 p-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-sm font-semibold text-foreground">Most used feature</div>
              <div className="text-sm text-muted-foreground">
                Berdasarkan dataset dummy AI logs.
              </div>
            </div>
            {mostUsedFeature ? (
              <StatusBadge tone="info">
                {mostUsedFeature.feature} • {mostUsedFeature.count}x
              </StatusBadge>
            ) : (
              <StatusBadge tone="neutral">No data</StatusBadge>
            )}
          </div>

          <div className="space-y-3">
            {dummyAiLogs.map((log) => (
              <div
                key={log.id}
                className="rounded-2xl border border-border/60 bg-muted/20 p-4 hover:bg-muted/30 transition-colors"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <div className="font-semibold text-foreground">{log.userName}</div>
                  <StatusBadge tone="info">{log.feature}</StatusBadge>
                  <span className="text-xs text-muted-foreground">
                    {new Date(log.createdAt).toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">{log.query}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

