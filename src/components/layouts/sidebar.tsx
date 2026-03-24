import Link from "next/link";
import Image from "next/image";
import { Sparkles, X, LogOut } from "lucide-react";
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
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-br from-[#FFB75E] via-[#FF9E7A] to-[#9370DB] text-white shadow-[20px_0_40px_-15px_rgba(147,112,219,0.2)] border-r border-white/20 z-50 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="relative h-20 flex items-center justify-center px-4 border-b border-white/20">
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
            className="absolute right-4 lg:hidden text-white/70 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="px-4 py-3 border-b border-white/20">
          <div
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-center bg-white/20 text-white border border-white/30 backdrop-blur-sm shadow-sm"
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
                    ? "bg-white/20 text-white border border-white/30 shadow-md font-bold"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-white shadow-[0_0_8px_white]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/20">
          <Button
            variant="ghost"
            onClick={onLogout}
            className="w-full justify-start text-white hover:text-white/90 hover:bg-white/10"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
}
