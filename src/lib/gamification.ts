import type { LucideIcon } from "lucide-react";
import {
  Users,
  ShoppingCart,
  Crown,
  Store,
  TrendingUp,
  Trophy,
  HandHeart,
  GraduationCap,
} from "lucide-react";

export const DAYA_POIN_CURRENCY = "Daya Poin";

export type PangkatGroup = "customer" | "umkm" | "education";

export type PangkatTier = {
  group: PangkatGroup;
  level: 1 | 2 | 3;
  name: string;
  description: string;
  icon: LucideIcon;
  iconGradientClass: string; // e.g. "from-[#F99912] to-[#9ACD32]"
  iconColorClass: string; // e.g. "text-[#F99912]"
  borderClass: string; // e.g. "border-[#F99912]/10"
  activeBorderClass: string; // e.g. "border-[#9ACD32]/40"
};

export const pangkatCustomer: PangkatTier[] = [
  {
    group: "customer",
    level: 1,
    name: "Warga",
    description: "New user: mulai belanja dan kumpulkan Daya Poin.",
    icon: Users,
    iconGradientClass: "from-[#F99912] to-[#9ACD32]",
    iconColorClass: "text-[#F99912]",
    borderClass: "border-[#F99912]/10",
    activeBorderClass: "border-[#9ACD32]/40",
  },
  {
    group: "customer",
    level: 2,
    name: "Baraya",
    description: "Active shopper: rutin belanja, makin dekat ke VIP.",
    icon: ShoppingCart,
    iconGradientClass: "from-[#F99912] to-[#9ACD32]",
    iconColorClass: "text-[#F99912]",
    borderClass: "border-[#F99912]/10",
    activeBorderClass: "border-[#9ACD32]/40",
  },
  {
    group: "customer",
    level: 3,
    name: "Dulur",
    description: "VIP/Loyal: konsisten, jadi pelanggan andalan.",
    icon: Crown,
    iconGradientClass: "from-[#9ACD32] to-[#F99912]",
    iconColorClass: "text-[#9ACD32]",
    borderClass: "border-[#9ACD32]/10",
    activeBorderClass: "border-[#F99912]/40",
  },
];

export const pangkatUmkm: PangkatTier[] = [
  {
    group: "umkm",
    level: 1,
    name: "Mitra Sadaya",
    description: "Newbie UMKM: mulai listing dan tingkatkan kualitas.",
    icon: Store,
    iconGradientClass: "from-[#F99912] to-[#9370DB]",
    iconColorClass: "text-[#F99912]",
    borderClass: "border-[#F99912]/10",
    activeBorderClass: "border-[#9370DB]/40",
  },
  {
    group: "umkm",
    level: 2,
    name: "Saudagar",
    description: "Growing UMKM: tumbuh bersama dan perkuat performa.",
    icon: TrendingUp,
    iconGradientClass: "from-[#F99912] to-[#9370DB]",
    iconColorClass: "text-[#9370DB]",
    borderClass: "border-[#9370DB]/10",
    activeBorderClass: "border-[#F99912]/40",
  },
  {
    group: "umkm",
    level: 3,
    name: "Juragan",
    description: "Top tier: reputasi tinggi dan dampak lebih besar.",
    icon: Trophy,
    iconGradientClass: "from-[#9370DB] to-[#F99912]",
    iconColorClass: "text-[#9370DB]",
    borderClass: "border-[#9370DB]/10",
    activeBorderClass: "border-[#F99912]/40",
  },
];

export const pangkatEducation: PangkatTier[] = [
  {
    group: "education",
    level: 1,
    name: "Relawan",
    description: "Edukasi & pendampingan: bantu UMKM makin berdaya.",
    icon: HandHeart,
    iconGradientClass: "from-[#9370DB] to-[#9370DB]/60",
    iconColorClass: "text-[#9370DB]",
    borderClass: "border-[#9370DB]/10",
    activeBorderClass: "border-[#9370DB]/40",
  },
  {
    group: "education",
    level: 2,
    name: "Sadaya Belajar",
    description: "Belajar interaktif: dari dasar sampai praktik siap pakai.",
    icon: GraduationCap,
    iconGradientClass: "from-[#9370DB] to-[#9370DB]/60",
    iconColorClass: "text-[#9370DB]",
    borderClass: "border-[#9370DB]/10",
    activeBorderClass: "border-[#9370DB]/40",
  },
];

export function getPangkatByGroup(group: PangkatGroup, level: 1 | 2 | 3) {
  const map: Record<PangkatGroup, PangkatTier[]> = {
    customer: pangkatCustomer,
    umkm: pangkatUmkm,
    education: pangkatEducation,
  };
  return map[group].find((t) => t.level === level);
}

