"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type Tone = "success" | "warning" | "danger" | "neutral" | "info"

const toneClass: Record<Tone, string> = {
  success: "bg-[#64762C]/15 text-[#64762C] border-[#64762C]/30",
  warning: "bg-[#F99912]/15 text-[#F99912] border-[#F99912]/30",
  danger: "bg-destructive/15 text-destructive border-destructive/30",
  neutral: "bg-muted text-muted-foreground border-border/60",
  info: "bg-sky-500/15 text-sky-600 border-sky-500/30",
}

export function StatusBadge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode
  tone?: Tone
  className?: string
}) {
  return (
    <Badge
      variant="outline"
      className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", toneClass[tone], className)}
    >
      {children}
    </Badge>
  )
}

