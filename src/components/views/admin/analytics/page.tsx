"use client"

import { useEffect, useState } from "react"
import { Users, Truck, Store, TrendingUp } from "lucide-react"

import {
  dummyMonthlyGrowth,
  dummyTransactionTrends,
  type AnalyticsPoint,
} from "@/src/lib/dummyData"
import { PageHeader } from "@/components/admin/page-header"
import { PageSkeleton } from "@/components/admin/loading-skeletons"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

function calculateGrowth(data: AnalyticsPoint[]) {
  if (data.length < 2) return 0;
  const first = data[0].value;
  const last = data[data.length - 1].value;
  return (((last - first) / first) * 100).toFixed(1);
}

function ProfessionalChartCard({
  title,
  data,
  color,
  icon: Icon,
  description,
}: {
  title: string
  data: AnalyticsPoint[]
  color: string
  icon: React.ElementType
  description: string
}) {
  const currentValue = data.length > 0 ? data[data.length - 1].value : 0;
  const growthRate = calculateGrowth(data);
  const isPositive = Number(growthRate) >= 0;

  return (
    <Card className="rounded-3xl border-border/40 bg-card/60 backdrop-blur-xl hover:border-border/80 transition-all duration-300 shadow-sm hover:shadow-md">
      <CardHeader className="pb-0 px-6 pt-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <div 
                className="flex size-8 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${color}15` }}
              >
                <Icon className="size-4" style={{ color }} />
              </div>
              <CardTitle className="text-sm font-semibold text-muted-foreground">
                {title}
              </CardTitle>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-extrabold tracking-tight text-foreground">
                {currentValue.toLocaleString("id-ID")}
              </span>
              <div 
                className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold ${
                  isPositive ? 'bg-success/15 text-success' : 'bg-destructive/15 text-destructive'
                }`}
              >
                {isPositive ? <TrendingUp className="size-3" /> : null}
                {growthRate}%
              </div>
            </div>
            <p className="text-xs text-muted-foreground font-medium pt-1">
              {description}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-0 pb-0 pt-6">
        <div className="h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={`gradient-${title.replace(/\s+/g, "")}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="label" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: "white", fontSize: 11, fontWeight: 500 }}
                tickMargin={12}
                padding={{ left: 20, right: 20 }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "16px",
                  border: "1px solid hsl(var(--border))",
                  background: "rgba(18,18,18,0.9)",
                  color: "white",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                  padding: "12px 16px",
                }}
                itemStyle={{ color: "white", fontWeight: 600, fontSize: "14px" }}
                labelStyle={{ color: "hsl(var(--muted-foreground))", fontSize: "12px", marginBottom: "4px" }}
                cursor={{ stroke: "hsl(var(--border))", strokeWidth: 1, strokeDasharray: "4 4" }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={3.5}
                fillOpacity={1}
                fill={`url(#gradient-${title.replace(/\s+/g, "")})`}
                activeDot={{ r: 6, fill: color, stroke: "var(--background)", strokeWidth: 3 }}
              />
            </AreaChart>
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

  if (isLoading) return <PageSkeleton />

  return (
    <div className="space-y-8">
      <PageHeader
        title="Analytics & Growth"
        subtitle="Analisis terperinci pertumbuhan sistem: Users, UMKM, dan Drivers."
      />

      <div className="grid gap-6 xl:grid-cols-3">
        <ProfessionalChartCard 
          title="User Growth" 
          data={dummyMonthlyGrowth.map((d) => ({ label: d.label, value: d.users }))} 
          color="#3b82f6" 
          icon={Users}
          description="Total pengguna aktif bulanan (1 Tahun)"
        />
        <ProfessionalChartCard 
          title="UMKM Growth" 
          data={dummyMonthlyGrowth.map((d) => ({ label: d.label, value: d.umkm }))} 
          color="#10b981" 
          icon={Store}
          description="Total mitra UMKM tervalidasi (1 Tahun)"
        />
        <ProfessionalChartCard 
          title="Driver Growth" 
          data={dummyMonthlyGrowth.map((d) => ({ label: d.label, value: d.drivers }))} 
          color="#F99912" 
          icon={Truck}
          description="Total driver terdaftar (1 Tahun)"
        />
      </div>

      <div className="mt-8">
        <Card className="rounded-3xl border-border/40 bg-card/60 backdrop-blur-xl">
          <CardHeader className="pb-2">
             <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="size-4 text-[#F99912]" />
                Transaction Overview (1 Tahun)
             </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
             <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={dummyTransactionTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                     <defs>
                       <linearGradient id="trxGradient" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                         <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                       </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.4} />
                     <XAxis 
                       dataKey="label" 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{ fill: "white", fontSize: 12 }}
                       tickMargin={10}
                     />
                     <YAxis 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{ fill: "white", fontSize: 12 }}
                     />
                     <Tooltip
                       contentStyle={{ borderRadius: "16px", border: "1px solid hsl(var(--border))", background: "rgba(18,18,18,0.9)", color: "white" }}
                       itemStyle={{ color: "white", fontWeight: 500 }}
                       cursor={{ stroke: "hsl(var(--border))", strokeDasharray: "4 4" }}
                     />
                     <Area
                       type="monotone"
                       dataKey="value"
                       stroke="#8b5cf6"
                       strokeWidth={3}
                       fillOpacity={1}
                       fill="url(#trxGradient)"
                       activeDot={{ r: 6, fill: "#8b5cf6", stroke: "var(--background)", strokeWidth: 2 }}
                     />
                   </AreaChart>
                </ResponsiveContainer>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

