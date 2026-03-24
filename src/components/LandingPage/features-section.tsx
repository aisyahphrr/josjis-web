"use client";

import { useMemo, useState } from "react";
import {
  Users,
  ShoppingCart,
  Crown,
  Store,
  TrendingUp,
  Trophy,
  HandHeart,
  GraduationCap,
  ArrowRight,
  Layers3,
  type LucideIcon,
} from "lucide-react";

type RoleCategory = "all" | "customer" | "umkm" | "edukasi";

type RoleCard = {
  key: string;
  category: Exclude<RoleCategory, "all">;
  title: string;
  description: string;
  details: string;
  highlights: string[];
  stats: { label: string; value: string }[];
  momentumLabel: string;
  ctaLabel: string;
  label: string;
  icon: LucideIcon;
  iconGradient: string; // e.g. "from-[#F99912] to-[#9ACD32]"
  iconColor: string; // e.g. "text-[#F99912]"
  borderClass: string; // e.g. "border-[#F99912]/10"
  hoverBorderClass: string; // e.g. "hover:border-[#9ACD32]/40"
  surfaceClass: string;
  glowClass: string;
  accentTextClass: string;
};

const roleCards: RoleCard[] = [
  // Customer Roles (Warga/Baraya/Dulur) - Orange + Green accents
  {
    key: "warga",
    category: "customer",
    title: "Warga",
    description: "New user yang mulai petualangan belanja dan mulai kumpulkan Daya Poin.",
    details: "Mulai dari langkah paling dasar: jelajahi produk lokal, belanja lebih nyaman, dan bangun kebiasaan yang bikin Daya Poin terus bertambah.",
    highlights: ["Mulai kumpulkan Daya Poin", "Kenali ekosistem Sadaya", "Cocok untuk pengguna baru"],
    stats: [
      { label: "Fokus", value: "Eksplor awal" },
      { label: "Benefit", value: "Poin pertama" },
      { label: "Arah", value: "Naik level" },
    ],
    momentumLabel: "Mulai langkah pertama",
    ctaLabel: "Mulai jadi Warga",
    label: "Customer",
    icon: Users,
    iconGradient: "from-[#F99912] to-[#9ACD32]",
    iconColor: "text-[#F99912]",
    borderClass: "border-[#F99912]/15",
    hoverBorderClass: "hover:border-[#9ACD32]/40",
    surfaceClass: "from-[#FFF7EA] via-white to-[#F3F8EA]",
    glowClass: "bg-[radial-gradient(circle_at_top,rgba(249,153,18,0.18),transparent_58%)]",
    accentTextClass: "text-[#C96C00]",
  },
  {
    key: "baraya",
    category: "customer",
    title: "Baraya",
    description: "Pelanggan aktif yang rutin belanja, makin sering kumpulkan Daya Poin.",
    details: "Peran ini cocok buat pengguna yang sudah mulai aktif. Fokusnya ada di konsistensi belanja, eksplor promo, dan engagement yang lebih tinggi.",
    highlights: ["Belanja lebih rutin", "Poin naik lebih cepat", "Lebih dekat ke benefit loyalti"],
    stats: [
      { label: "Fokus", value: "Belanja rutin" },
      { label: "Benefit", value: "Poin cepat" },
      { label: "Status", value: "Aktif" },
    ],
    momentumLabel: "Momentum belanja sedang naik",
    ctaLabel: "Lanjut sebagai Baraya",
    label: "Customer",
    icon: ShoppingCart,
    iconGradient: "from-[#F99912] to-[#9ACD32]",
    iconColor: "text-[#F99912]",
    borderClass: "border-[#F99912]/15",
    hoverBorderClass: "hover:border-[#F99912]/40",
    surfaceClass: "from-[#FFF5E5] via-white to-[#EEF8E6]",
    glowClass: "bg-[radial-gradient(circle_at_top,rgba(154,205,50,0.16),transparent_58%)]",
    accentTextClass: "text-[#C96C00]",
  },
  {
    key: "dulur",
    category: "customer",
    title: "Dulur",
    description: "VIP/loyal user yang konsisten, siap ke level puncak Daya Poin.",
    details: "Dulur adalah level loyal. Kamu sudah punya ritme belanja yang kuat dan siap menikmati pengalaman yang lebih premium di ekosistem Sadaya.",
    highlights: ["Level loyalitas tertinggi", "Prioritas benefit", "Dampak belanja makin besar"],
    stats: [
      { label: "Fokus", value: "Loyalitas" },
      { label: "Benefit", value: "Prioritas" },
      { label: "Status", value: "VIP" },
    ],
    momentumLabel: "Sudah dekat ke tier puncak",
    ctaLabel: "Capai level Dulur",
    label: "Customer VIP",
    icon: Crown,
    iconGradient: "from-[#9ACD32] to-[#F99912]",
    iconColor: "text-[#9ACD32]",
    borderClass: "border-[#9ACD32]/15",
    hoverBorderClass: "hover:border-[#F99912]/40",
    surfaceClass: "from-[#F4FAE7] via-white to-[#FFF4E6]",
    glowClass: "bg-[radial-gradient(circle_at_top,rgba(154,205,50,0.20),transparent_58%)]",
    accentTextClass: "text-[#64762C]",
  },

  // UMKM Roles (Mitra/Saudagar/Juragan) - Orange + Purple accents
  {
    key: "mitra-sadaya",
    category: "umkm",
    title: "Mitra Sadaya",
    description: "Newbie UMKM yang siap tumbuh bareng Sadaya dengan strategi dan akses.",
    details: "Untuk UMKM yang baru mulai, peran ini membantu kamu membangun pondasi: listing rapi, visual produk jelas, dan positioning bisnis yang lebih kuat.",
    highlights: ["Mulai onboarding UMKM", "Bangun listing yang rapi", "Naikkan visibilitas awal"],
    stats: [
      { label: "Fokus", value: "Setup toko" },
      { label: "Benefit", value: "Akses awal" },
      { label: "Status", value: "Starter" },
    ],
    momentumLabel: "Fondasi bisnis sedang dibangun",
    ctaLabel: "Gabung jadi Mitra",
    label: "UMKM",
    icon: Store,
    iconGradient: "from-[#F99912] to-[#9370DB]",
    iconColor: "text-[#F99912]",
    borderClass: "border-[#F99912]/15",
    hoverBorderClass: "hover:border-[#9370DB]/40",
    surfaceClass: "from-[#FFF5E8] via-white to-[#F4EEFF]",
    glowClass: "bg-[radial-gradient(circle_at_top,rgba(249,153,18,0.18),transparent_58%)]",
    accentTextClass: "text-[#C96C00]",
  },
  {
    key: "saudagar",
    category: "umkm",
    title: "Saudagar",
    description: "UMKM yang berkembang, meningkatkan kualitas listing dan performa.",
    details: "Saudagar cocok untuk UMKM yang sedang tumbuh. Fokusnya adalah optimasi performa toko, kualitas katalog, dan konsistensi operasional.",
    highlights: ["Optimasi performa toko", "Katalog makin profesional", "Siap scale up penjualan"],
    stats: [
      { label: "Fokus", value: "Optimasi" },
      { label: "Benefit", value: "Scale up" },
      { label: "Status", value: "Growth" },
    ],
    momentumLabel: "Bisnis sedang tumbuh stabil",
    ctaLabel: "Naik ke Saudagar",
    label: "UMKM Growth",
    icon: TrendingUp,
    iconGradient: "from-[#F99912] to-[#9370DB]",
    iconColor: "text-[#9370DB]",
    borderClass: "border-[#9370DB]/15",
    hoverBorderClass: "hover:border-[#F99912]/40",
    surfaceClass: "from-[#FFF6EA] via-white to-[#F4EDFF]",
    glowClass: "bg-[radial-gradient(circle_at_top,rgba(147,112,219,0.16),transparent_58%)]",
    accentTextClass: "text-[#6D4DB3]",
  },
  {
    key: "juragan",
    category: "umkm",
    title: "Juragan",
    description: "Top tier UMKM yang makin dikenal, siap dorong dampak untuk Bogor.",
    details: "Juragan adalah tier puncak untuk UMKM yang sudah matang. Reputasi, kualitas, dan pengaruh bisnisnya sudah terasa lebih luas di ekosistem.",
    highlights: ["Tier UMKM tertinggi", "Brand makin dikenal", "Dampak bisnis lebih besar"],
    stats: [
      { label: "Fokus", value: "Leadership" },
      { label: "Benefit", value: "Reputasi" },
      { label: "Status", value: "Top tier" },
    ],
    momentumLabel: "Pengaruh brand makin kuat",
    ctaLabel: "Menuju Juragan",
    label: "UMKM Top Tier",
    icon: Trophy,
    iconGradient: "from-[#9370DB] to-[#F99912]",
    iconColor: "text-[#9370DB]",
    borderClass: "border-[#9370DB]/15",
    hoverBorderClass: "hover:border-[#F99912]/40",
    surfaceClass: "from-[#F4EEFF] via-white to-[#FFF3E4]",
    glowClass: "bg-[radial-gradient(circle_at_top,rgba(147,112,219,0.18),transparent_58%)]",
    accentTextClass: "text-[#6D4DB3]",
  },

  // Education/Empowerment (Relawan/Sadaya Belajar) - dominant Purple
  {
    key: "relawan",
    category: "edukasi",
    title: "Relawan",
    description: "Penguat komunitas: bantu edukasi dan dampingi UMKM agar berdaya.",
    details: "Peran relawan berfokus pada kontribusi. Kamu membantu komunitas tumbuh lewat pendampingan, edukasi, dan kolaborasi yang terasa nyata.",
    highlights: ["Dampingi UMKM", "Bangun komunitas belajar", "Peran sosial lebih kuat"],
    stats: [
      { label: "Fokus", value: "Dampingi" },
      { label: "Benefit", value: "Kontribusi" },
      { label: "Status", value: "Komunitas" },
    ],
    momentumLabel: "Energi kolaborasi makin terasa",
    ctaLabel: "Gabung jadi Relawan",
    label: "Komunitas",
    icon: HandHeart,
    iconGradient: "from-[#9370DB] to-[#9370DB]/60",
    iconColor: "text-[#9370DB]",
    borderClass: "border-[#9370DB]/15",
    hoverBorderClass: "hover:border-[#9370DB]/40",
    surfaceClass: "from-[#F4EEFF] via-white to-[#F8F3FF]",
    glowClass: "bg-[radial-gradient(circle_at_top,rgba(147,112,219,0.20),transparent_58%)]",
    accentTextClass: "text-[#6D4DB3]",
  },
  {
    key: "sadaya-belajar",
    category: "edukasi",
    title: "Sadaya Belajar",
    description: "Program belajar interaktif: dari materi dasar sampai praktik yang siap pakai.",
    details: "Ini jalur belajar yang lebih terarah. Cocok untuk pengguna yang ingin meningkatkan skill lewat materi yang langsung relevan dan aplikatif.",
    highlights: ["Materi praktis dan siap pakai", "Belajar lebih terstruktur", "Naik skill selangkah demi selangkah"],
    stats: [
      { label: "Fokus", value: "Belajar" },
      { label: "Benefit", value: "Skill naik" },
      { label: "Status", value: "Aktif" },
    ],
    momentumLabel: "Perkembangan skill makin jelas",
    ctaLabel: "Mulai belajar",
    label: "Edukasi",
    icon: GraduationCap,
    iconGradient: "from-[#9370DB] to-[#9370DB]/60",
    iconColor: "text-[#9370DB]",
    borderClass: "border-[#9370DB]/15",
    hoverBorderClass: "hover:border-[#9370DB]/40",
    surfaceClass: "from-[#F3ECFF] via-white to-[#F7F2FF]",
    glowClass: "bg-[radial-gradient(circle_at_top,rgba(147,112,219,0.22),transparent_58%)]",
    accentTextClass: "text-[#6D4DB3]",
  },
];

const categoryMeta: {
  key: RoleCategory;
  label: string;
  description: string;
  className: string;
  icon: LucideIcon;
  iconWrapClass: string;
  iconClass: string;
}[] = [
  {
    key: "all",
    label: "Semua",
    description: "Lihat semua peran",
    className: "data-[active=true]:bg-[#2B3236] data-[active=true]:text-white data-[active=true]:border-[#2B3236]",
    icon: Layers3,
    iconWrapClass: "bg-[#2B3236]/8 border-black/5",
    iconClass: "text-[#2B3236]",
  },
  {
    key: "customer",
    label: "Customer",
    description: "Warga, Baraya, Dulur",
    className: "data-[active=true]:bg-[#F99912] data-[active=true]:text-[#1F2528] data-[active=true]:border-[#F99912]",
    icon: ShoppingCart,
    iconWrapClass: "bg-[#F99912]/12 border-[#F99912]/20",
    iconClass: "text-[#C96C00]",
  },
  {
    key: "umkm",
    label: "UMKM",
    description: "Mitra, Saudagar, Juragan",
    className: "data-[active=true]:bg-[#F99912] data-[active=true]:text-[#1F2528] data-[active=true]:border-[#6D4DB3]",
    icon: Store,
    iconWrapClass: "bg-[linear-gradient(135deg,rgba(249,153,18,0.12),rgba(147,112,219,0.14))] border-[#9370DB]/20",
    iconClass: "text-[#6D4DB3]",
  },
  {
    key: "edukasi",
    label: "Edukasi",
    description: "Relawan dan belajar",
    className: "data-[active=true]:bg-[#6D4DB3] data-[active=true]:text-white data-[active=true]:border-[#6D4DB3]",
    icon: GraduationCap,
    iconWrapClass: "bg-[#9370DB]/12 border-[#9370DB]/20",
    iconClass: "text-[#6D4DB3]",
  },
];

export function FeaturesSection() {
  const [activeCategory, setActiveCategory] = useState<RoleCategory>("all");
  const [activeRoleKey, setActiveRoleKey] = useState(roleCards[0].key);
  const [expandedRoleKey, setExpandedRoleKey] = useState<string | null>(null);

  const visibleCards = useMemo(() => {
    if (activeCategory === "all") return roleCards;
    return roleCards.filter((role) => role.category === activeCategory);
  }, [activeCategory]);

  const activeRole =
    visibleCards.find((role) => role.key === activeRoleKey) ?? visibleCards[0] ?? roleCards[0];
  const expandedRole =
    roleCards.find((role) => role.key === expandedRoleKey) ?? activeRole;

  return (
    <section id="features" className="relative py-28 overflow-hidden z-10 -mt-10">
      {/* Background with soft creative vibe */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FBF7F0] via-[#FFFcf8] to-background" />
      
      {/* Dynamic Colored Blobs */}
      <div className="absolute -top-40 -right-20 w-[34rem] h-[34rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(249,153,18,0.15)_0%,transparent_62%)] pointer-events-none" />
      <div className="absolute top-1/2 -left-24 w-[36rem] h-[36rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(147,112,219,0.12)_0%,transparent_62%)] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[28rem] h-[28rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(154,205,50,0.12)_0%,transparent_62%)] pointer-events-none" />
      
      {/* Decorative Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden perspective-1000 z-0">
        <div className="absolute top-[10%] left-[8%] w-12 h-12 bg-gradient-to-br from-[#9ACD32] to-[#AED581] rounded-xl opacity-60 animate-float rotate-45 shadow-lg" />
        <div className="absolute bottom-[20%] right-[10%] w-16 h-16 bg-gradient-to-tr from-[#F99912] to-[#FFB75E] rounded-full opacity-50 animate-float-alt shadow-xl" />
        <div className="absolute top-[40%] right-[5%] w-8 h-8 border-4 border-[#9370DB] rounded-full opacity-40 animate-spin-slow" />
        <div className="absolute bottom-[10%] left-[15%] w-10 h-10 border-4 border-[#F99912]/50 rounded-lg opacity-40 animate-float rotate-12" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F99912]/12 border border-[#F99912]/30 mb-6 shadow-[0_10px_24px_rgba(249,153,18,0.10)]">
            <span className="text-sm text-[#C96C00] font-semibold">Peran di SADAYA</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-balance">
            <span className="text-foreground">Pilih </span>
            <span className="bg-gradient-to-r from-[#C96C00] via-[#F99912] to-[#6D4DB3] bg-clip-text text-transparent">Pangkatmu</span>
            <span className="text-foreground">, sesuai peran.</span>
          </h2>

          <p className="text-lg text-[#4C565D] max-w-2xl mx-auto text-pretty">
            Warna kartu mengikuti tipe peranmu: customer (orange+mint), UMKM (orange+purple), dan edukasi (purple dominan).
          </p>
        </div>

        <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
          {categoryMeta.map((category) => (
            <button
              key={category.key}
              type="button"
              data-active={activeCategory === category.key}
              onClick={() => {
                setActiveCategory(category.key);
                const nextCards =
                  category.key === "all"
                    ? roleCards
                    : roleCards.filter((role) => role.category === category.key);
                setActiveRoleKey(nextCards[0]?.key ?? roleCards[0].key);
                setExpandedRoleKey(null);
              }}
              className={`flex items-center gap-3 rounded-full border border-border bg-white/88 px-4 py-3 text-left text-sm text-[#4C565D] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F99912]/40 hover:bg-white ${category.className}`}
            >
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border ${category.iconWrapClass}`}>
                <category.icon className={`h-5 w-5 ${category.iconClass}`} />
              </div>
              <div>
                <span className="block font-semibold">{category.label}</span>
                <span className="block text-xs opacity-80">{category.description}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="mb-8 rounded-[1.75rem] border border-border bg-white/88 p-5 shadow-[0_18px_45px_rgba(40,50,56,0.08)] backdrop-blur-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#C96C00]">
                {visibleCards.length} peran ditampilkan
              </p>
              <h3 className="mt-1 text-2xl font-bold text-foreground">
                {activeRole.title}
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#4C565D]">
                {activeRole.description}
              </p>
            </div>
            <div className={`rounded-2xl bg-gradient-to-br ${activeRole.iconGradient} p-[1px] shadow-[0_16px_30px_rgba(40,50,56,0.12)]`}>
              <div className="flex items-center gap-3 rounded-2xl bg-white/90 px-4 py-3">
                <activeRole.icon className={`h-5 w-5 ${activeRole.iconColor}`} />
                <div>
                  <p className={`text-xs font-semibold uppercase tracking-[0.14em] ${activeRole.accentTextClass}`}>
                    {activeRole.label}
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    Pilih kartu untuk eksplor
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visibleCards.map((role) => {
            const isActive = activeRole.key === role.key;
            return (
            <div key={role.key} className="group relative text-left">
              <div className={`absolute inset-0 rounded-[1.6rem] blur-2xl transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"} ${role.glowClass}`} />
              <div
                className={`relative h-full rounded-[1.6rem] bg-gradient-to-br ${role.surfaceClass} border p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(40,50,56,0.12)] ${role.borderClass} ${role.hoverBorderClass} ${isActive ? "ring-2 ring-[#F99912]/45 shadow-[0_20px_45px_rgba(40,50,56,0.14)] -translate-y-1" : ""}`}
              >
                <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />
                <div className="flex items-center justify-between gap-3 mb-5">
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.12em] uppercase bg-white/75 border border-white/80 ${role.accentTextClass}`}>
                    {role.label}
                  </span>
                  <div className="h-2 w-2 rounded-full bg-[#F99912]/65 shadow-[0_0_0_6px_rgba(249,153,18,0.10)]" />
                </div>
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${role.iconGradient} p-0.5 mb-5 shadow-[0_16px_30px_rgba(40,50,56,0.12)]`}
                >
                  <div className="w-full h-full rounded-2xl bg-white/82 flex items-center justify-center backdrop-blur-sm">
                    <role.icon className={`w-7 h-7 ${role.iconColor}`} />
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-2 transition-colors duration-300 group-hover:text-[#C96C00]">
                  {role.title}
                </h3>
                <p className="text-sm text-[#4C565D] leading-relaxed">
                  {role.description}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-black/5 pt-4">
                  <span className="text-xs font-medium text-[#4C565D]">
                    {isActive ? "Peran terpilih" : "Klik untuk lihat"}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveRoleKey(role.key);
                      setExpandedRoleKey(role.key);
                    }}
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-semibold transition-all duration-300 ${role.accentTextClass} ${isActive ? "bg-white/80 shadow-sm" : "hover:bg-white/70"}`}
                  >
                    Explore
                    <ArrowRight className={`h-4 w-4 transition-transform duration-300 ${isActive ? "translate-x-1" : ""}`} />
                  </button>
                </div>
              </div>
            </div>
          )})}
        </div>
      </div>

      {expandedRoleKey ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <button
            type="button"
            aria-label="Tutup popup"
            className="absolute inset-0 bg-[#1F2528]/55 backdrop-blur-sm"
            onClick={() => setExpandedRoleKey(null)}
          />

          <div className="relative z-10 w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/50 bg-white shadow-[0_28px_80px_rgba(25,35,40,0.25)]">
            <div className={`absolute inset-x-0 top-0 h-40 bg-gradient-to-r ${expandedRole.iconGradient} opacity-90`} />
            <div className="absolute inset-x-0 top-24 h-24 bg-white blur-3xl opacity-80" />

            <div className="relative p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`rounded-[1.4rem] bg-gradient-to-br ${expandedRole.iconGradient} p-[1px] shadow-[0_18px_36px_rgba(40,50,56,0.18)]`}>
                    <div className="flex h-14 w-14 items-center justify-center rounded-[1.4rem] bg-white/92">
                      <expandedRole.icon className={`h-6 w-6 ${expandedRole.iconColor}`} />
                    </div>
                  </div>
                  <div>
                    <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${expandedRole.accentTextClass}`}>
                      {expandedRole.label}
                    </p>
                    <h3 className="mt-1 text-2xl font-bold text-foreground sm:text-3xl">
                      {expandedRole.title}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setExpandedRoleKey(null)}
                  className="rounded-full border border-black/10 bg-white/90 px-4 py-2 text-sm font-semibold text-[#4C565D] transition-colors hover:bg-white"
                >
                  Tutup
                </button>
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r ${expandedRole.iconGradient}`}>
                      {expandedRole.momentumLabel}
                    </div>
                    <div className="inline-flex items-center rounded-full border border-black/8 bg-white px-3 py-1.5 text-xs font-medium text-[#4C565D]">
                      Peran sedang aktif
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-[#4C565D] sm:text-base">
                    {expandedRole.details}
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {expandedRole.stats.map((stat) => (
                      <div key={stat.label} className="rounded-2xl border border-border bg-[#F8F8F6] p-4 shadow-sm">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7A858C]">
                          {stat.label}
                        </p>
                        <p className="mt-2 text-sm font-semibold text-foreground">
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-[1.5rem] border border-border bg-[#F8F8F6] p-5">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-sm font-semibold text-foreground">
                        Kenapa peran ini menarik?
                      </p>
                      <span className={`text-xs font-semibold ${expandedRole.accentTextClass}`}>
                        Cocok untuk berkembang
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[#4C565D]">
                      Peran ini dirancang supaya pengguna bisa berkembang selangkah demi selangkah, dengan pengalaman yang terasa relevan dan benefit yang makin jelas.
                    </p>
                    <div className="mt-4">
                      <div className="mb-2 flex items-center justify-between text-xs font-medium text-[#4C565D]">
                        <span>Progress kesiapan</span>
                        <span>82%</span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-white">
                        <div className={`h-full rounded-full bg-gradient-to-r ${expandedRole.iconGradient}`} style={{ width: "82%" }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`rounded-[1.6rem] bg-gradient-to-br ${expandedRole.surfaceClass} border ${expandedRole.borderClass} p-5`}>
                  <p className="text-sm font-semibold text-foreground">Yang bisa kamu eksplor</p>
                  <div className="mt-4 space-y-3">
                    {expandedRole.highlights.map((item) => (
                      <div key={item} className="flex items-center gap-3 rounded-xl bg-white/85 px-3 py-3 shadow-sm">
                        <div className={`h-2.5 w-2.5 rounded-full ${expandedRole.accentTextClass.replace("text-", "bg-")}`} />
                        <p className="text-sm text-[#4C565D]">{item}</p>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r ${expandedRole.iconGradient} px-4 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(40,50,56,0.14)]`}
                  >
                    {expandedRole.ctaLabel}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(45deg); }
          50% { transform: translateY(-20px) rotate(50deg); }
        }
        @keyframes float-alt {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-15px) scale(1.05); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-float { animation: float 7s ease-in-out infinite; }
        .animate-float-alt { animation: float-alt 6s ease-in-out infinite reverse; }
        .animate-spin-slow { animation: spin-slow 15s linear infinite; }
        .perspective-1000 { perspective: 1000px; }
      `}</style>
    </section>
  );
}
