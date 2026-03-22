"use client"

import { Toaster as HotToaster } from "react-hot-toast"

import { SidebarInset, SidebarProvider, SidebarRail } from "@/src/components/ui/sidebar"
import { AdminSidebar } from "@/src/components/views/admin/layouts/admin-sidebar"
import { AdminTopbar } from "@/src/components/views/admin/layouts/admin-topbar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen>
      <AdminSidebar />
      <SidebarRail />

      <SidebarInset>
        <AdminTopbar
          title="Admin Dashboard"
          description="Kelola sistem JOSJIS dengan dummy data (frontend-only)"
          right={
            <div className="hidden sm:flex items-center gap-2 rounded-2xl border border-border/60 bg-muted/30 px-3 py-2">
              <div className="size-8 rounded-full bg-gradient-to-br from-[#F99912] to-[#64762C] flex items-center justify-center text-xs font-semibold text-[#181612]">
                A
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold text-foreground">Administrator</div>
                <div className="text-xs text-muted-foreground">admin@josjis.com</div>
              </div>
            </div>
          }
        />

        <div className="p-4 md:p-6">
          {children}
        </div>

        <HotToaster
          position="top-right"
          toastOptions={{
            style: {
              borderRadius: "16px",
            },
          }}
        />
      </SidebarInset>
    </SidebarProvider>
  )
}

