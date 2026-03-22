import { Sparkles, ShoppingBag, Truck, Store, Trophy, GraduationCap } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";

export function PhilosophySection() {
  return (
    <section id="sadaya" className="relative py-24 overflow-hidden">
      {/* Background Mesh (cerah, tanpa neon berlebih) */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#FDF5E7] to-background" />
      <div className="absolute -top-32 -left-24 w-[28rem] h-[28rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(249,153,18,0.20)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute -bottom-32 -right-24 w-[30rem] h-[30rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(147,112,219,0.18)_0%,transparent_62%)] pointer-events-none" />
      <div className="absolute left-1/2 top-0 w-[48rem] h-[14rem] -translate-x-1/2 bg-[linear-gradient(to_right,rgba(249,153,18,0.12),rgba(154,205,50,0.10),rgba(147,112,219,0.10))] opacity-80 blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F99912]/10 border border-[#F99912]/20 mb-6">
            <Sparkles className="w-4 h-4 text-[#F99912]" />
            <span className="text-sm text-[#F99912] font-medium">Filosofi SADAYA</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-balance">
            Sarana Dagang dan <span className="text-[#F99912]">Berdaya</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            SADAYA hadir sebagai social enterprise untuk memberdayakan ekosistem ekonomi lokal di Bogor
            lewat direktori eksklusif UMKM otentik, ditopang Daya Poin dan literasi digital.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          <div className="group rounded-3xl bg-white/80 border border-border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(40,50,56,0.10)]">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F99912]/20 to-[#9ACD32]/20 flex items-center justify-center mb-4">
              <ShoppingBag className="w-6 h-6 text-[#F99912]" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Pelanggan</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Akses mudah ke produk otentik Bogor dan benefit gamifikasi: diskon serta reward berbasis Daya Poin.
            </p>
          </div>

          <div className="group rounded-3xl bg-white/80 border border-border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(40,50,56,0.10)]">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#9ACD32]/20 to-[#9370DB]/20 flex items-center justify-center mb-4">
              <Truck className="w-6 h-6 text-[#9ACD32]" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Pengemudi</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Lapangan pekerjaan dan penghasilan yang adil, menjadi urat nadi logistik pengiriman.
            </p>
          </div>

          <div className="group rounded-3xl bg-white/80 border border-border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(40,50,56,0.10)]">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F99912]/20 to-[#9370DB]/20 flex items-center justify-center mb-4">
              <Store className="w-6 h-6 text-[#9370DB]" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Pelaku UMKM</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Wadah berjualan, eksposur, serta poin ganda dari penjualan dan keaktifan—bisa ditukar untuk visibilitas.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-10">
          <div className="rounded-3xl bg-white/80 border border-border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(40,50,56,0.10)]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#F99912]/20 to-[#9ACD32]/20 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-[#F99912]" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Gamifikasi Terintegrasi (Daya Poin)
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Setiap interaksi dihargai secara berjenjang. Pelanggan mendapat diskon dari belanja, sementara UMKM mendapat poin
              ganda dari penjualan dan aktivitas.
            </p>
          </div>

          <div className="rounded-3xl bg-white/80 border border-border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(40,50,56,0.10)]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#9370DB]/20 to-[#9ACD32]/20 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-[#9370DB]" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Pemberdayaan & Literasi Digital
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              SADAYA menyediakan ruang kelas digital dan seminar online berkala agar UMKM makin “naik kelas” dan
              melek digital untuk mendukung pertumbuhan berkelanjutan.
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-[#FDF5E7]/70 border border-border p-6 md:p-8">
          <div className="grid lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Makna Nama “SADAYA”
              </h3>
              <p className="text-muted-foreground leading-relaxed text-pretty">
                Berasal dari sapaan lokal “Semua”, melambangkan platform yang merangkul dan inklusif. Sebagai akronim
                “Sarana Dagang dan Berdaya”, SADAYA menyatukan kekuatan: UMKM diberdayakan, driver dikaryakan, pelanggan diuntungkan,
                dan relawan menyalurkan ilmu.
              </p>
            </div>
            <div className="mt-2">
              <Link href="#marketplace">
                <Button className="w-full bg-[#F99912] text-[#2B3236] font-semibold shadow-none hover:bg-[#F99912]/90 hover:scale-[1.02] transition-all duration-300">
                  Jelajahi Direktori
                </Button>
              </Link>
              <p className="text-xs text-muted-foreground mt-3">
                Simbiosis mutualisme, dibangun untuk semua pilar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

