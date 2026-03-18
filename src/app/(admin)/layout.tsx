"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Bell, Search, ChevronDown } from "lucide-react";
import { Sidebar } from "@/src/components/layouts/sidebar";
import { roleConfigs } from "@/src/lib/constants/layouts/menu-items";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const config = roleConfigs.admin;
  const roleInfo = {
    name: "Administrator",
    email: "admin@josjis.com",
    initial: "A",
  };

  const handleLogout = () => {
    localStorage.removeItem("josjis_user");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        config={config}
        menuItems={config.menuItems}
        pathname={pathname}
        onLogout={handleLogout}
      />

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
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#dc2626]" />
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
