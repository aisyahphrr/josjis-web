"use client";

import {
  Users,
  ShoppingCart,
  Crown,
  Store,
  TrendingUp,
  Trophy,
  HandHeart,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";

type RoleCard = {
  key: string;
  title: string;
  description: string;
  icon: LucideIcon;
  iconGradient: string; // e.g. "from-[#F99912] to-[#9ACD32]"
  iconColor: string; // e.g. "text-[#F99912]"
  borderClass: string; // e.g. "border-[#F99912]/10"
  hoverBorderClass: string; // e.g. "hover:border-[#9ACD32]/40"
};

const roleCards: RoleCard[] = [
  // Customer Roles (Warga/Baraya/Dulur) - Orange + Green accents
  {
    key: "warga",
    title: "Warga",
    description: "New user yang mulai petualangan belanja dan mulai kumpulkan Daya Poin.",
    icon: Users,
    iconGradient: "from-[#F99912] to-[#9ACD32]",
    iconColor: "text-[#F99912]",
    borderClass: "border-[#F99912]/10",
    hoverBorderClass: "hover:border-[#9ACD32]/40",
  },
  {
    key: "baraya",
    title: "Baraya",
    description: "Pelanggan aktif yang rutin belanja, makin sering kumpulkan Daya Poin.",
    icon: ShoppingCart,
    iconGradient: "from-[#F99912] to-[#9ACD32]",
    iconColor: "text-[#F99912]",
    borderClass: "border-[#F99912]/10",
    hoverBorderClass: "hover:border-[#F99912]/40",
  },
  {
    key: "dulur",
    title: "Dulur",
    description: "VIP/loyal user yang konsisten, siap ke level puncak Daya Poin.",
    icon: Crown,
    iconGradient: "from-[#9ACD32] to-[#F99912]",
    iconColor: "text-[#9ACD32]",
    borderClass: "border-[#9ACD32]/10",
    hoverBorderClass: "hover:border-[#F99912]/40",
  },

  // UMKM Roles (Mitra/Saudagar/Juragan) - Orange + Purple accents
  {
    key: "mitra-sadaya",
    title: "Mitra Sadaya",
    description: "Newbie UMKM yang siap tumbuh bareng Sadaya dengan strategi dan akses.",
    icon: Store,
    iconGradient: "from-[#F99912] to-[#9370DB]",
    iconColor: "text-[#F99912]",
    borderClass: "border-[#F99912]/10",
    hoverBorderClass: "hover:border-[#9370DB]/40",
  },
  {
    key: "saudagar",
    title: "Saudagar",
    description: "UMKM yang berkembang, meningkatkan kualitas listing dan performa.",
    icon: TrendingUp,
    iconGradient: "from-[#F99912] to-[#9370DB]",
    iconColor: "text-[#9370DB]",
    borderClass: "border-[#9370DB]/10",
    hoverBorderClass: "hover:border-[#F99912]/40",
  },
  {
    key: "juragan",
    title: "Juragan",
    description: "Top tier UMKM yang makin dikenal, siap dorong dampak untuk Bogor.",
    icon: Trophy,
    iconGradient: "from-[#9370DB] to-[#F99912]",
    iconColor: "text-[#9370DB]",
    borderClass: "border-[#9370DB]/10",
    hoverBorderClass: "hover:border-[#F99912]/40",
  },

  // Education/Empowerment (Relawan/Sadaya Belajar) - dominant Purple
  {
    key: "relawan",
    title: "Relawan",
    description: "Penguat komunitas: bantu edukasi dan dampingi UMKM agar berdaya.",
    icon: HandHeart,
    iconGradient: "from-[#9370DB] to-[#9370DB]/60",
    iconColor: "text-[#9370DB]",
    borderClass: "border-[#9370DB]/10",
    hoverBorderClass: "hover:border-[#9370DB]/40",
  },
  {
    key: "sadaya-belajar",
    title: "Sadaya Belajar",
    description: "Program belajar interaktif: dari materi dasar sampai praktik yang siap pakai.",
    icon: GraduationCap,
    iconGradient: "from-[#9370DB] to-[#9370DB]/60",
    iconColor: "text-[#9370DB]",
    borderClass: "border-[#9370DB]/10",
    hoverBorderClass: "hover:border-[#9370DB]/40",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 overflow-hidden">
      {/* Soft background (no neon/glow) */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#FDF5E7] to-background" />
      <div className="absolute -top-40 -right-20 w-[34rem] h-[34rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(249,153,18,0.20)_0%,transparent_62%)] pointer-events-none" />
      <div className="absolute -bottom-44 -left-24 w-[36rem] h-[36rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(147,112,219,0.18)_0%,transparent_62%)] pointer-events-none" />
      <div className="absolute top-24 left-1/3 w-[30rem] h-[18rem] bg-[linear-gradient(to_right,rgba(249,153,18,0.10),rgba(154,205,50,0.09),rgba(147,112,219,0.09))] opacity-80 blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F99912]/10 border border-[#F99912]/20 mb-6">
            <span className="text-sm text-[#F99912] font-medium">Peran di SADAYA</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-balance">
            <span className="text-foreground">Pilih </span>
            <span className="text-[#F99912]">Pangkatmu</span>
            <span className="text-foreground">, sesuai peran.</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Warna kartu mengikuti tipe peranmu: customer (orange+mint), UMKM (orange+purple), dan edukasi (purple dominan).
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {roleCards.map((role) => (
            <div key={role.key} className="group relative">
              <div
                className={`rounded-2xl bg-white/80 border ${role.borderClass} p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(40,50,56,0.10)] ${role.hoverBorderClass}`}
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${role.iconGradient} p-0.5 mb-5`}
                >
                  <div className="w-full h-full rounded-xl bg-white/70 flex items-center justify-center">
                    <role.icon className={`w-7 h-7 ${role.iconColor}`} />
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-2 transition-colors duration-300 group-hover:text-[#F99912]">
                  {role.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {role.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
