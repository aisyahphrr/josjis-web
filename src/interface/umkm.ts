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

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  rating: number;
  category:
    | "makanan"
    | "minuman"
    | "cemilan"
    | "baju"
    | "celana"
    | "aksesoris"
    | "elektronik"
    | "jasa";
}

export interface ProductFormData {
  name: string;
  description: string;
  price: string;
  stock: string;
  category:
    | "makanan"
    | "minuman"
    | "cemilan"
    | "baju"
    | "celana"
    | "aksesoris"
    | "elektronik"
    | "jasa";
  image: string;
}

export interface Notification {
  id: string;
  type: "order" | "status_update" | "delivery";
  title: string;
  message: string;
  orderId: string;
  orderNumber: string;
  customer?: string;
  product?: string;
  status?: "diproses" | "dikirim" | "selesai";
  fromRole: "customer" | "driver" | "umkm";
  createdAt: string;
  isRead: boolean;
}
