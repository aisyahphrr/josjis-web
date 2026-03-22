"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sparkles } from "lucide-react"

import { cn } from "@/src/lib/utils"
import { adminNavItems } from "@/components/admin/admin-nav"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/src/components/ui/sidebar"
import { Button } from "@/src/components/ui/button"

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" className="border-r border-border/60">
      <SidebarHeader className="px-3 py-3">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <div className="relative size-10 rounded-xl bg-gradient-to-br from-[#F99912] to-[#64762C] p-0.5 shadow-sm">
            <div className="flex size-full items-center justify-center rounded-[0.7rem] bg-background">
              <Sparkles className="size-5 text-[#F99912]" />
            </div>
          </div>
          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <div className="text-sm font-semibold leading-tight">JOSJIS</div>
            <div className="text-xs text-muted-foreground">Admin Console</div>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarSeparator className="bg-border/60" />

      <SidebarContent className="px-2 py-2">
        <SidebarMenu>
          {adminNavItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin/dashboard" && pathname.startsWith(item.href))
            const Icon = item.icon
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.title}
                  className={cn(
                    "rounded-xl px-3 py-2.5",
                    isActive
                      ? "bg-gradient-to-r from-[#F99912]/20 to-[#64762C]/10 text-[#F99912] border border-[#F99912]/20"
                      : "hover:bg-muted/60",
                  )}
                >
                  <Link href={item.href}>
                    <Icon className="size-4" />
                    <span className="truncate">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-2">
        <Button
          variant="outline"
          className="w-full justify-start rounded-xl border-border/60 group-data-[collapsible=icon]:justify-center"
          onClick={() => {
            // demo-only (no auth backend yet)
            try {
              localStorage.removeItem("josjis_user")
            } catch {}
            window.location.href = "/login"
          }}
        >
          <span className="group-data-[collapsible=icon]:hidden">Logout</span>
          <span className="hidden group-data-[collapsible=icon]:inline">⟵</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}

