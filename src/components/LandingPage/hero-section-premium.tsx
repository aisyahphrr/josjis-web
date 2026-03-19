"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Button } from "@/src/components/ui/button";
import { ArrowRight, Play, Star, Zap, ShoppingBag } from "lucide-react";

export function HeroSection() {
  const tags = useMemo(
    () => [
      { icon: <Zap className="w-4 h-4 text-[#F99912]" />, text: "Customer dapat Daya Poin" },
      { icon: <Star className="w-4 h-4 text-[#9ACD32]" />, text: "Driver punya penghasilan adil" },
      { icon: <ShoppingBag className="w-4 h-4 text-[#9370DB]" />, text: "UMKM naik kelas lewat literasi" },
    ],
    []
  );

  return (
    <section
      className="relative overflow-hidden pt-24 lg:pt-32 pb-32 lg:pb-48 bg-gradient-to-br from-[#FFF5E6] via-white to-[#F3E8FF]"
      aria-label="Hero SADAYA"
    >
      {/* Mesh gradient depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-28 -left-28 w-[32rem] h-[32rem] blur-[120px] bg-[#F99912]/20" />
        <div className="absolute top-24 -right-20 w-[30rem] h-[30rem] blur-[120px] bg-[#9ACD32]/18" />
        <div className="absolute bottom-[-10rem] left-[10%] w-[36rem] h-[36rem] blur-[140px] bg-[#9370DB]/14" />
      </div>

      {/* Smooth fade to the next section background */}
      <div
        className="absolute bottom-0 left-0 w-full h-44 bg-[#F9F9F9] pointer-events-none"
        style={{
          WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))",
          maskImage: "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column */}
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F99912]/10 border border-[#F99912]/20 mb-8 transition-all duration-300">
              <span className="text-sm font-semibold text-[#F99912]">
                Platform UMKM Kreatif #1 di Bogor
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.02] tracking-tight text-[#283238] text-balance">
              Sadaya: Tumbuh Bersama, Berkarya untuk Bogor.
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-[#4D4D4D] max-w-xl text-pretty">
              SADAYA menghubungkan Customer, Driver, dan UMKM Bogor dalam satu ekosistem.
              Biar makin cepat tumbuh, makin jelas berdaya, makin terasa Daya Poin.
            </p>

            {/* Tags */}
            <div className="mt-8 flex flex-wrap gap-4">
              {tags.map((t) => (
                <div
                  key={t.text}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/35 backdrop-blur-md border border-white/60 text-[#283238]/90 hover:bg-white/45 transition-all duration-300"
                >
                  {t.icon}
                  <span className="text-sm font-semibold">{t.text}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 items-start">
              <Link href="#marketplace">
                <Button
                  size="lg"
                  className="bg-[#F99912] text-[#283238] font-semibold text-lg px-8 py-6 rounded-xl shadow-lg shadow-[#F99912]/40 hover:scale-105 hover:shadow-lg transition-all duration-300"
                >
                  <ShoppingBag className="mr-2 w-5 h-5" />
                  Jelajahi Direktori
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Link href="#pangkat">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#9370DB]/40 bg-white/20 backdrop-blur-md text-[#9370DB] font-semibold text-lg px-8 py-6 rounded-xl hover:bg-[#9370DB]/10 hover:text-[#7C77B9] hover:scale-105 hover:shadow-lg transition-all duration-300"
                >
                  <Play className="mr-2 w-5 h-5" />
                  Lihat Cara Kerja
                </Button>
              </Link>
            </div>
          </div>

          {/* Right column (3D image + floating cards) */}
          <div className="relative w-full flex justify-center items-center z-10">
            <div className="bg-[#F99912]/20 blur-[100px] w-64 h-64 rounded-full absolute -z-10" />

            <div className="relative w-full aspect-[4/3] rounded-[2rem] shadow-2xl overflow-visible bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-md border border-white/50 flex items-center justify-center group z-20 transition-transform duration-500 hover:rotate-1 hover:scale-[1.01]">
              {/* Glass glow ring */}
              <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-[#F99912]/20 via-[#9ACD32]/15 to-[#9370DB]/20 blur-[28px] opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

              <div className="absolute inset-0 pointer-events-none opacity-80 bg-[radial-gradient(circle_at_20%_10%,rgba(249,153,18,0.30),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(147,112,219,0.22),transparent_50%),radial-gradient(circle_at_55%_85%,rgba(154,205,50,0.20),transparent_55%)]" />

              {/* Subtle scanline */}
              <div className="absolute inset-0 pointer-events-none opacity-30 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.10)_0%,transparent_35%,rgba(255,255,255,0.06)_70%,transparent_100%)] hero-scanline" />

              <div className="relative flex flex-col items-center justify-center px-10">
                <div className="absolute -z-10 -bottom-10 left-1/2 -translate-x-1/2 w-[22rem] h-[12rem] rounded-full bg-[#F99912]/10 blur-[40px]" />

                <img
                  src="/hero-3d-sadaya.png"
                  alt="Hero 3D UMKM SADAYA"
                  className="w-[108%] max-w-none h-auto object-contain drop-shadow-2xl animate-[float_7s_ease-in-out_infinite] transition-transform duration-500 group-hover:scale-[1.03]"
                />

                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-14 rounded-2xl bg-white/30 border border-white/50 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-[#F99912]" />
                </div>
              </div>
            </div>

            {/* Floating Cards around image */}
            {/* Top Left Card */}
            <div className="absolute -left-4 top-10 z-20 bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_rgb(0,0,0,0.1)] rounded-2xl p-4 flex items-center gap-3 animate-[float_4s_ease-in-out_infinite_reverse]">
              <div className="w-10 h-10 rounded-xl bg-[#F99912]/15 border border-[#F99912]/25 flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#F99912]" />
              </div>
              <div className="leading-tight">
                <div className="text-sm font-extrabold text-[#283238]">Daya Poin +500!</div>
                <div className="text-xs font-medium text-[#4D4D4D]">Reward hari ini</div>
              </div>
            </div>

            {/* Mid Left Card */}
            <div className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-white/55 backdrop-blur-xl border border-white/70 shadow-[0_8px_32px_rgb(0,0,0,0.08)] rounded-2xl p-4 flex items-start gap-3 animate-[float_6s_ease-in-out_infinite]">
              <div className="w-10 h-10 rounded-xl bg-[#9370DB]/15 border border-[#9370DB]/25 flex items-center justify-center">
                <Star className="w-5 h-5 text-[#9370DB]" />
              </div>
              <div>
                <div className="text-sm font-extrabold text-[#283238]">Naik Level</div>
                <div className="text-xs font-medium text-[#4D4D4D]">
                  Pangkat makin cepat naik
                </div>
              </div>
            </div>

            {/* Bottom Right Card */}
            <div
              className="absolute -right-4 bottom-20 z-20 bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_rgb(0,0,0,0.1)] rounded-2xl p-4 flex flex-col gap-1 animate-[float_5s_ease-in-out_infinite]"
              style={{ animationDelay: "0.35s" }}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-extrabold text-[#283238]">Toko Juragan</div>
                  <div className="text-xs font-medium text-[#4D4D4D]">Verified & aktif</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#9370DB]/15 border border-[#9370DB]/25 flex items-center justify-center">
                  <Star className="w-5 h-5 text-[#F99912] fill-[#F99912]" />
                </div>
              </div>
              <div className="flex items-center gap-1 pt-1">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 text-[#F99912] fill-[#F99912]" />
                ))}
              </div>
            </div>

            {/* Micro badge */}
            <div className="absolute right-10 top-6 z-20 bg-white/45 backdrop-blur-xl border border-white/70 rounded-full px-4 py-2 text-xs font-semibold text-[#283238] animate-[float_6.5s_ease-in-out_infinite_reverse]">
              Bogor autentik • UMKM unggul
            </div>
          </div>
        </div>
      </div>

      {/* Fallback keyframes (in case Tailwind config doesn't get picked up) */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-14px);
          }
        }

        @keyframes scan {
          0% {
            transform: translateY(-8%);
          }
          100% {
            transform: translateY(8%);
          }
        }

        .hero-scanline {
          animation: scan 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

