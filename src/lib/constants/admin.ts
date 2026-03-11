import { Activity, Store, Truck, Users } from "lucide-react";
import type {
  AdminStat,
  PendingUMKM,
  Complaint,
  SystemStat,
} from "@/src/interface/admin";

export const adminStats: AdminStat[] = [
  {
    icon: Users,
    label: "Total User",
    value: "12,450",
    trend: "+234",
    color: "from-[#F99912] to-[#C9C9C3]",
  },
  {
    icon: Store,
    label: "Total UMKM",
    value: "548",
    trend: "+12",
    color: "from-[#64762C] to-[#424F17]",
  },
  {
    icon: Truck,
    label: "Total Driver",
    value: "89",
    trend: "+5",
    color: "from-[#F99912] to-[#64762C]",
  },
  {
    icon: Activity,
    label: "Transaksi Hari Ini",
    value: "1,234",
    trend: "+18%",
    color: "from-[#C9C9C3] to-[#F99912]",
  },
];

export const pendingUMKM: PendingUMKM[] = [
  {
    id: 1,
    name: "Toko Kue Lapis Bogor",
    owner: "Ahmad Susanto",
    date: "2 jam lalu",
    docs: 3,
  },
  {
    id: 2,
    name: "Asinan Segar Bu Eni",
    owner: "Eni Rahayu",
    date: "5 jam lalu",
    docs: 2,
  },
  {
    id: 3,
    name: "Kerajinan Bambu Khas",
    owner: "Bambang Wijaya",
    date: "1 hari lalu",
    docs: 4,
  },
];

export const recentComplaints: Complaint[] = [
  {
    id: "CMP-001",
    user: "Sarah W.",
    type: "Produk",
    status: "open",
    date: "1 jam lalu",
  },
  {
    id: "CMP-002",
    user: "Budi A.",
    type: "Pengiriman",
    status: "in-progress",
    date: "3 jam lalu",
  },
  {
    id: "CMP-003",
    user: "Citra N.",
    type: "Refund",
    status: "resolved",
    date: "1 hari lalu",
  },
];

export const systemStats: SystemStat[] = [
  { label: "Pendapatan Bulan Ini", value: "Rp 2.5B", change: "+15%" },
  { label: "Total Transaksi", value: "45,230", change: "+12%" },
  { label: "Rata-rata Rating", value: "4.7", change: "+0.1" },
  { label: "Tingkat Konversi", value: "3.2%", change: "+0.3%" },
];
