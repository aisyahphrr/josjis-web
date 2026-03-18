"use client"

import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

export function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  gradient = "from-[#F99912] to-[#64762C]",
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  trend?: string
  gradient?: string
}) {
  return (
    <Card className="rounded-2xl border-[#F99912]/10 bg-card/60 backdrop-blur-xl shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm text-muted-foreground">{label}</div>
            <div className="mt-1 text-2xl font-bold text-foreground">{value}</div>
            {trend ? (
              <div className="mt-1 text-xs font-medium text-[#64762C]">{trend}</div>
            ) : null}
          </div>
          <div className={cn("rounded-2xl p-0.5 bg-gradient-to-br", gradient)}>
            <div className="flex size-12 items-center justify-center rounded-2xl bg-background">
              <Icon className="size-6 text-[#F99912]" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

