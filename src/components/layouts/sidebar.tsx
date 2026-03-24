import Link from "next/link";
import Image from "next/image";
import { X, LogOut } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import type { MenuItem, RoleConfig } from "@/src/interface/dashboard";

interface DashboardSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  config: RoleConfig;
  menuItems: MenuItem[];
  pathname: string;
  onLogout: () => void;
}

export function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  config,
  menuItems,
  pathname,
  onLogout,
}: DashboardSidebarProps) {
  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[linear-gradient(165deg,#FFB14A_0%,#F99912_24%,#F06A4A_50%,#7DBB43_100%)] text-white shadow-[24px_0_50px_-18px_rgba(90,132,38,0.34)] border-r border-white/24 z-50 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="relative h-20 flex items-center justify-center px-4 border-b border-white/24 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.04))] backdrop-blur-sm">
          <Link href="/" className="flex items-center justify-center w-full group">
            <Image 
              src="/sadaya-logo-ver1.svg" 
              alt="Sadaya Logo" 
              width={180} 
              height={50} 
              className="h-10 w-auto object-contain brightness-0 invert transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute right-4 lg:hidden text-white/75 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="px-4 py-3 border-b border-white/22 bg-[linear-gradient(180deg,rgba(255,255,255,0.10),rgba(255,255,255,0.03))]">
          <div
            className="px-3 py-2 rounded-xl text-xs font-bold tracking-[0.08em] text-center bg-[linear-gradient(135deg,rgba(255,255,255,0.28),rgba(255,255,255,0.10))] text-white border border-white/24 backdrop-blur-sm shadow-[0_10px_25px_rgba(90,132,38,0.24)]"
          >
            {config.title}
          </div>
        </div>

        <nav className="hide-scrollbar p-4 space-y-1 overflow-y-auto h-[calc(100%-12rem)]">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-[linear-gradient(135deg,rgba(255,255,255,0.32),rgba(240,106,74,0.16),rgba(125,187,67,0.18))] text-white border border-white/24 shadow-[0_14px_30px_rgba(90,132,38,0.28)] font-bold"
                    : "text-white/72 hover:text-white hover:bg-white/12 hover:border-white/14 border border-transparent"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.95)]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/22 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.14))] backdrop-blur-sm">
          <Button
            variant="ghost"
            onClick={onLogout}
            className="w-full justify-start rounded-xl text-white hover:text-white hover:bg-white/14"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
}
