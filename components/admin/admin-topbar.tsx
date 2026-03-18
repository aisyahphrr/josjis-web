"use client"

import { Bell, Search } from "lucide-react"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function AdminTopbar({
  title,
  description,
  right,
}: {
  title?: string
  description?: string
  right?: React.ReactNode
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between gap-4 px-4 md:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <SidebarTrigger className="shrink-0" />
          <div className="min-w-0">
            {title ? (
              <div className="truncate text-base font-semibold text-foreground">
                {title}
              </div>
            ) : null}
            {description ? (
              <div className="truncate text-xs text-muted-foreground">
                {description}
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden w-[320px] md:block">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Cari..."
              className={cn(
                "h-10 rounded-2xl border-border/60 bg-muted/40 pl-9",
                "focus-visible:ring-[#F99912]/30",
              )}
            />
          </div>

          <button className="relative rounded-2xl p-2 hover:bg-muted/60 transition-colors">
            <Bell className="size-5 text-muted-foreground" />
            <span className="absolute right-2 top-2 size-2 rounded-full bg-[#F99912]" />
          </button>

          {right}
        </div>
      </div>
    </header>
  )
}

