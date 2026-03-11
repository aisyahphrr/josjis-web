import { ComponentType, ReactNode } from "react";
import type { DashboardRole } from "../lib/type/dashboard";

export interface MenuItem {
  icon: ComponentType<{ className?: string }>;
  label: string;
  href: string;
}

export interface DashboardLayoutProps {
  children: ReactNode;
  role?: DashboardRole;
}

export interface RoleConfig {
  menuItems: MenuItem[];
  title: string;
  color: string;
}

export interface RoleInfo {
  name: string;
  email: string;
  initial: string;
}
