import Link from "next/link";
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
        className={`fixed top-0 left-0 h-full w-64 bg-sidebar border-r border-sidebar-border z-50 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#F99912] to-[#64762C] p-0.5">
              <div className="w-full h-full rounded-xl bg-sidebar flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#F99912]" />
              </div>
            </div>
            <span className="text-xl font-bold bg-linear-to-r from-[#F99912] to-[#64762C] bg-clip-text text-transparent">
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
                    ? "bg-linear-to-r from-[#F99912]/20 to-[#64762C]/10 text-[#F99912] border border-[#F99912]/20"
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
            onClick={onLogout}
            className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
}
