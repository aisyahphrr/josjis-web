import { ComponentType } from "react";

export interface UserStat {
  label: string;
  value: string;
  icon: ComponentType<{ className?: string }>;
  change: string;
  color: string;
}

export interface Order {
  id: string;
  product: string;
  status: string;
  date: string;
  price?: string;
}

export interface Product {
  name: string;
  price: number;
  rating: number;
  image: string;
}

export interface DailyQuest {
  title: string;
  reward: string;
  completed: boolean;
  icon: ComponentType<{ className?: string }>;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  store: string;
  image: string;
}

export interface ChatMessage {
  id: number;
  role: "user" | "bot";
  content: string;
  time: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  fee: number;
}

export interface Plant {
  id: number;
  name: string;
  growth: number;
  harvestable: boolean;
  coinReward: number;
  emoji: string;
}

export interface HistoryOrder {
  id: string;
  date: string;
  product: string;
  store: string;
  status: "delivered" | "shipping" | "processing" | "cancelled";
  total: number;
  items: number;
}

export interface MarketplaceProduct {
  id: number;
  name: string;
  price: number;
  rating: number;
  sold: number;
  store: string;
  badge?: string;
  image: string;
  category: string;
}

export interface MysteryBox {
  id: string;
  name: string;
  cost: number;
  color: string;
  locked: boolean;
  description: string;
}

export interface Achievement {
  title: string;
  description: string;
  unlocked: boolean;
  icon: string;
}

export interface Quest {
  title: string;
  description: string;
  current: number;
  target: number;
  reward: number;
  completed: boolean;
}

export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  rating: number;
  store: string;
  image: string;
}
