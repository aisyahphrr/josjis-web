import { ComponentType } from "react";

export interface UmkmStat {
  label: string;
  value: string;
  icon: ComponentType<{ className?: string }>;
  change: string;
  color: string;
  up: boolean;
}

export interface UmkmOrder {
  id: string;
  customer: string;
  product: string;
  status: "pending" | "processing" | "shipped" | "delivered";
  total: number;
  date: string;
}

export interface TopProduct {
  name: string;
  sales: number;
  revenue: number;
}
