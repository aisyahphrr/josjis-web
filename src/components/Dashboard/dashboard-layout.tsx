"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sparkles,
  Menu,
  X,
  LogOut,
  Bell,
  Search,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import type {
  DashboardLayoutProps,
  MenuItem,
  RoleInfo,
} from "@/src/interface/dashboard";
import { roleConfigs } from "@/src/lib/constants/dashboard/menu-items";

export function DashboardLayout({
  children,
  role = "user",
  menuItems: menuItemsOverride,
}: DashboardLayoutProps & { menuItems?: MenuItem[] }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const config = roleConfigs[role];
  const menuItems = menuItemsOverride ?? config.menuItems;

  const handleLogout = () => {
    localStorage.removeItem("josjis_user");
    router.push("/login");
  };

  const getRoleInfo = (): RoleInfo => {
    switch (role) {
      case "user":
        return { name: "User", email: "user@josjis.com", initial: "U" };
      case "umkm":
        return { name: "UMKM Seller", email: "umkm@josjis.com", initial: "S" };
      case "admin":
        return {
          name: "Administrator",
          email: "admin@josjis.com",
          initial: "A",
        };
      case "driver":
        return { name: "Driver", email: "driver@josjis.com", initial: "D" };
      default:
        return { name: "User", email: "user@josjis.com", initial: "U" };
    }
  };

  const roleInfo = getRoleInfo();

  return (
    <div className="min-h-screen bg-background">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-sidebar border-r border-sidebar-border z-50 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F99912] to-[#64762C] p-0.5">
              <div className="w-full h-full rounded-xl bg-sidebar flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#F99912]" />
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#F99912] to-[#64762C] bg-clip-text text-transparent">
              JOSJIS
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-muted-foreground hover:text-foreground"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="px-4 py-3 border-b border-sidebar-border">
          <div
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-center"
            style={{
              backgroundColor: `${config.color}20`,
              color: config.color,
              border: `1px solid ${config.color}40`,
            }}
          >
            {config.title}
          </div>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100%-12rem)]">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-[#F99912]/20 to-[#64762C]/10 text-[#F99912] border border-[#F99912]/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-[#F99912]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 h-16 bg-background/80 backdrop-blur-xl border-b border-border flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-muted-foreground hover:text-foreground"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/50 border border-border">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari..."
                className="bg-transparent border-none outline-none text-sm w-48 text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <button className="relative p-2 rounded-xl hover:bg-muted/50 transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#F99912]" />
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-border">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold"
                style={{
                  background: `linear-gradient(135deg, ${config.color}, ${config.color}80)`,
                }}
              >
                {roleInfo.initial}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-foreground">
                  {roleInfo.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {roleInfo.email}
                </p>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
