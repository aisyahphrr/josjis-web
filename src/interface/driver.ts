import { ComponentType } from "react";

export interface DriverStat {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  trend: string;
  color: string;
}

export interface ActiveOrder {
  id: string;
  customer: string;
  address: string;
  store: string;
  items: number;
  status: "pickup" | "delivering" | "pending";
  distance: string;
  phone: string;
}

export interface DeliveryHistory {
  id: string;
  customer: string;
  time: string;
  status: "completed";
  rating: number;
}
