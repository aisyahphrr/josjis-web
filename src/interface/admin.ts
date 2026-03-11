import { ComponentType } from "react";

export interface AdminStat {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  trend: string;
  color: string;
}

export interface PendingUMKM {
  id: number;
  name: string;
  owner: string;
  date: string;
  docs: number;
}

export interface Complaint {
  id: string;
  user: string;
  type: string;
  status: "open" | "in-progress" | "resolved";
  date: string;
}

export interface SystemStat {
  label: string;
  value: string;
  change: string;
}
