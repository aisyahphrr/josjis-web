"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/src/components/ui/button";
import {
  ArrowRight,
  ShoppingBag,
  Store,
  Sparkles,
  Zap,
  Leaf,
  MapPin,
  Truck,
  Play,
  Star,
} from "lucide-react";
import Link from "next/link";

function FloatingCard({
  children,
  className = "",
  delay = 0,
  mounted,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  mounted: boolean;
}) {
  return (
    <div
      className={`absolute backdrop-blur-md bg-white/70 border border-border rounded-2xl p-4 shadow-[0_8px_24px_rgba(40,50,56,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(40,50,56,0.10)] ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="hero-float-inner">{children}</div>
    </div>
  );
}

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const t = window.setTimeout(() => setMounted(true), 80);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;

      // Progress: 0..1 ketika bagian hero bergerak dari masuk ke viewport
      const t = Math.min(
        1,
        Math.max(0, (vh - rect.top) / Math.max(1, rect.height * 0.8))
      );

      // -1..1, biar geraknya terasa halus
      const eased = (t - 0.5) * 2;
      const parX = eased * 10;
      const parY = eased * 14;
      const rot = eased * 0.8;

      // Scroll-driven parallax vars (mild, so no overlap)
      el.style.setProperty("--heroMainXpx", `${(parX * 0.25).toFixed(2)}px`);
      el.style.setProperty("--heroMainYpx", `${(parY * 0.18).toFixed(2)}px`);
      el.style.setProperty("--heroMainRotdeg", `${(rot * 0.18).toFixed(2)}deg`);

      // Cards: different speeds
      el.style.setProperty("--heroLeftCardXpx", `${(parX * 0.12).toFixed(2)}px`);
      el.style.setProperty("--heroLeftCardYpx", `${(parY * 0.10).toFixed(2)}px`);
      el.style.setProperty("--heroRightCardXpx", `${(parX * 0.08).toFixed(2)}px`);
      el.style.setProperty("--heroRightCardYpx", `${(parY * 0.14).toFixed(2)}px`);
    };

    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden pt-16 pb-32 lg:pb-48 bg-gradient-to-b from-[#FFF5E6] via-[#F9F9F9] to-[#F9F9F9]"
    >
      {/* Background Mesh + Bogor Motion Accents */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)",
        }}
      >
        {/* Extra blurred blobs (premium mesh depth) */}
        <div className="absolute top-[-6rem] left-[-6rem] w-[28rem] h-[28rem] blur-[120px] bg-[#F99912]/20" />
        <div className="absolute top-[6rem] right-[-8rem] w-[30rem] h-[30rem] blur-[120px] bg-[#9ACD32]/18" />
        <div className="absolute bottom-[-10rem] left-[10%] w-[34rem] h-[34rem] blur-[120px] bg-[#9370DB]/16" />

        {/* Mesh gradient */}
        <div
          className="absolute inset-0 opacity-90 hero-mesh"
          style={{
            backgroundImage:
              "radial-gradient(ellipse_at_top_left, rgba(249,153,18,0.28) 0%, transparent 58%), radial-gradient(ellipse_at_top_right, rgba(154,205,50,0.20) 0%, transparent 62%), radial-gradient(ellipse_at_bottom_left, rgba(147,112,219,0.18) 0%, transparent 62%), radial-gradient(ellipse_at_center, rgba(245,247,250,0.55) 0%, transparent 52%), linear-gradient(to bottom right, rgba(249,153,18,0.12), rgba(147,112,219,0.10))",
          }}
        />

        {/* Moving gradient strips */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[48rem] h-[10rem] blur-2xl opacity-80 hero-mesh-strip" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[56rem] h-[12rem] blur-2xl opacity-70 hero-mesh-strip hero-mesh-strip--2" />

        {/* Bogor “Talas/Leaf” floating badges */}
        <div className="absolute -top-10 left-[10%] hero-bogor-float hero-bogor-float--1">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F99912]/25 to-[#9ACD32]/15 border border-border/70 flex items-center justify-center">
            <Leaf className="w-6 h-6 text-[#9ACD32]" />
          </div>
        </div>
        <div className="absolute top-[22%] right-[10%] hero-bogor-float hero-bogor-float--2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#9370DB]/20 to-[#F99912]/15 border border-border/70 flex items-center justify-center">
            <Leaf className="w-6 h-6 text-[#F99912]" />
          </div>
        </div>
        <div className="absolute bottom-[18%] left-[26%] hero-bogor-float hero-bogor-float--3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#9ACD32]/18 to-[#9370DB]/18 border border-border/70 flex items-center justify-center">
            <Leaf className="w-5 h-5 text-[#9370DB]" />
          </div>
        </div>

        {/* Subtle particle layer */}
        <div className="absolute inset-0 hero-particles" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
          {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F99912]/10 border border-[#F99912]/20 mb-8 transition-all duration-300 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "0.1s" }}
        >
          <Sparkles className="w-4 h-4 text-[#F99912]" />
          <MapPin className="w-4 h-4 text-[#F99912]" />
          <span className="text-sm text-[#F99912] font-medium">
            Platform UMKM Kreatif #1 di Bogor
          </span>
        </div>

        {/* Headline */}
        <h1
          className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-[1.02] tracking-tight text-[#283238] text-balance transition-all duration-300 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "0.18s" }}
        >
          Sadaya Berdaya Bersama, Untuk Semua.
        </h1>

        {/* Subheadline */}
        <p
          className={`text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 text-pretty transition-all duration-300 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "0.3s" }}
        >
          SADAYA menghubungkan Customer, Driver, dan UMKM Bogor dalam satu ekosistem.
          Biar makin cepat tumbuh, makin jelas berdaya, makin terasa Daya Poin.
        </p>

        {/* Proof Chips */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/35 backdrop-blur-md border border-white/60 hover:bg-white/45 transition-all duration-300">
            <Sparkles className="w-4 h-4 text-[#F99912]" />
            <span className="text-sm font-semibold text-[#283238]">Customer dapat Daya Poin</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/35 backdrop-blur-md border border-white/60 hover:bg-white/45 transition-all duration-300">
            <Truck className="w-4 h-4 text-[#9ACD32]" />
            <span className="text-sm font-semibold text-[#283238]">Driver punya penghasilan adil</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/35 backdrop-blur-md border border-white/60 hover:bg-white/45 transition-all duration-300">
            <Store className="w-4 h-4 text-[#9370DB]" />
            <span className="text-sm font-semibold text-[#283238]">UMKM naik kelas lewat literasi</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center gap-4 mt-8 mb-0 transition-all duration-300 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "0.42s" }}
        >
          <Link href="#marketplace">
            <Button
              size="lg"
              className="bg-[#F99912] text-[#283238] font-semibold text-lg px-8 py-6 rounded-xl shadow-lg shadow-[#F99912]/40 hover:bg-[#F99912]/95 hover:scale-105 transition-transform duration-300"
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
              className="border-[#9370DB]/40 bg-white/20 backdrop-blur-md text-[#9370DB] font-semibold text-lg px-8 py-6 rounded-xl hover:bg-[#9370DB]/10 hover:text-[#7C77B9] hover:scale-[1.03] transition-all duration-300"
            >
              <Play className="mr-2 w-5 h-5" />
              Lihat Cara Kerja
            </Button>
          </Link>
        </div>

        </div>

        {/* Hero “Visual Panel” (UI mock, no new assets) */}
        <div className="relative w-full">
          {/* Floating Card 1 (Daya Poin) */}
          <div className="hidden lg:block absolute -left-10 top-1/4 z-30 hero-card-left bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-2xl p-4 flex items-center gap-4 animate-[bounce_4s_ease-in-out_infinite]">
            <div className="w-10 h-10 rounded-xl bg-[#F99912]/15 border border-[#F99912]/25 flex items-center justify-center">
              <Zap className="w-5 h-5 text-[#F99912]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#283238]">Daya Poin +500!</p>
            </div>
          </div>

          {/* Floating Card 2 (Toko Juragan) */}
          <div className="hidden lg:block absolute -right-8 bottom-1/4 z-30 hero-card-right bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-2xl p-4 flex flex-col gap-1 animate-[bounce_5s_ease-in-out_infinite]" style={{ animationDelay: "0.25s" }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#9370DB]/15 border border-[#9370DB]/25 flex items-center justify-center">
                <Store className="w-5 h-5 text-[#9370DB]" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Toko Juragan</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star
                  // eslint-disable-next-line react/no-array-index-key
                  key={idx}
                  className="w-4 h-4 text-[#F99912] fill-[#F99912]"
                />
              ))}
            </div>
          </div>

          {/* Glowing shadow behind main placeholder */}
          <div className="absolute -z-10 bg-gradient-to-r from-[#F99912] to-[#9370DB] blur-[80px] opacity-30 w-full h-full rounded-full" />

          {/* Main Image Placeholder */}
          <div className="hero-main-asset relative w-full aspect-[4/3] rounded-[2rem] shadow-2xl overflow-hidden bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-md border border-white/50 flex items-center justify-center group z-20">
            <div className="flex flex-col items-center justify-center gap-4 px-8 text-center">
              <div className="w-16 h-16 rounded-3xl bg-white/30 border border-white/50 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                <svg
                  viewBox="0 0 24 24"
                  width="28"
                  height="28"
                  fill="none"
                  stroke="#F99912"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 8l9-5 9 5-9 5-9-5z" />
                  <path d="M12 13v8" />
                  <path d="M21 8v8" />
                  <path d="M3 8v8" />
                </svg>
              </div>
              <p className="text-[#283238] font-semibold text-lg leading-snug">
                Tempatkan Foto 3D/Produk UMKM di Sini
              </p>
            </div>
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.35)_35%,transparent_60%)]" />
          </div>
        </div>
      </div>
      </div>

      {/* Hero-only animations */}
      <style jsx>{`
        .hero-mesh {
          animation: hero-mesh-pan 14s ease-in-out infinite;
          filter: saturate(1.05);
        }

        @keyframes hero-mesh-pan {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(10px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        .hero-mesh-strip {
          animation: mesh-pan 10s ease-in-out infinite;
          background-image: linear-gradient(
            to right,
            rgba(249, 153, 18, 0.12),
            rgba(154, 205, 50, 0.10),
            rgba(147, 112, 219, 0.12)
          );
        }
        .hero-mesh-strip--2 {
          animation-duration: 14s;
          filter: hue-rotate(8deg);
        }

        @keyframes mesh-pan {
          0% {
            transform: translateX(-2%) translateY(0%) scale(1);
          }
          50% {
            transform: translateX(2%) translateY(-2%) scale(1.02);
          }
          100% {
            transform: translateX(-2%) translateY(0%) scale(1);
          }
        }

        .hero-bogor-float {
          animation: bogor-float 6.5s ease-in-out infinite;
        }
        .hero-bogor-float--2 {
          animation-duration: 7.8s;
          animation-delay: 0.2s;
        }
        .hero-bogor-float--3 {
          animation-duration: 8.2s;
          animation-delay: 0.4s;
        }

        @keyframes bogor-float {
          0% {
            transform: translateY(0) rotate(-2deg);
          }
          50% {
            transform: translateY(-14px) rotate(3deg);
          }
          100% {
            transform: translateY(0) rotate(-2deg);
          }
        }

        .hero-particles {
          background-image: radial-gradient(
              rgba(249, 153, 18, 0.25) 1px,
              transparent 1px
            ),
            radial-gradient(rgba(154,205,50,0.20) 1px, transparent 1px),
            radial-gradient(rgba(147,112,219,0.18) 1px, transparent 1px);
          background-size: 64px 64px, 88px 88px, 120px 120px;
          background-position: 10px 20px, 40px 70px, 10px 90px;
          opacity: 0.55;
          animation: particles-drift 9s ease-in-out infinite;
        }

        @keyframes particles-drift {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(12px);
          }
          100% {
            transform: translateY(0);
          }
        }

        .hero-progress-breathe {
          animation: progress-breathe 2.4s ease-in-out infinite;
          filter: saturate(1.15);
        }

        @keyframes progress-breathe {
          0% {
            filter: saturate(1.15) brightness(1);
          }
          50% {
            filter: saturate(1.25) brightness(1.08);
          }
          100% {
            filter: saturate(1.15) brightness(1);
          }
        }

        .hero-road-dot {
          width: 12px;
          height: 12px;
          border-radius: 9999px;
          top: 3px;
          left: 22px;
          background: radial-gradient(
            circle at center,
            rgba(249,153,18,0.95) 0%,
            rgba(154,205,50,0.45) 45%,
            rgba(147,112,219,0.20) 70%,
            transparent 75%
          );
          box-shadow: 0 14px 34px rgba(40,50,56,0.18);
          position: absolute;
          animation: road-dot 2.8s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes road-dot {
          0% {
            transform: translateX(-10px);
            opacity: 0.75;
          }
          50% {
            transform: translateX(120px);
            opacity: 1;
          }
          100% {
            transform: translateX(-10px);
            opacity: 0.75;
          }
        }

        .hero-panel-reactive {
          transform: translate3d(
              var(--parCentralXpx, 0px),
              var(--parCentralYpx, 0px),
              0
            )
            rotate(var(--parCentralRotdeg, 0deg));
          will-change: transform;
        }

        .hero-float--left {
          transform: translate3d(
              var(--parCardLeftXpx, 0px),
              var(--parCardLeftYpx, 0px),
              0
            )
            rotate(var(--parCardLeftRotdeg, 0deg));
          will-change: transform;
        }

        .hero-float--right {
          transform: translate3d(
              var(--parCardRightXpx, 0px),
              var(--parCardRightYpx, 0px),
              0
            )
            rotate(var(--parCardRightRotdeg, 0deg));
          will-change: transform;
        }

        .hero-float-inner {
          will-change: transform;
        }

        .hero-float--left .hero-float-inner {
          animation: floatLeft 6.8s ease-in-out infinite;
        }

        .hero-float--right .hero-float-inner {
          animation: floatRight 7.6s ease-in-out infinite 0.25s;
        }

        @keyframes floatLeft {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes floatRight {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-14px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        .hero-shine {
          animation: shineSweep 2.6s ease-in-out infinite;
        }

        @keyframes shineSweep {
          0% {
            transform: translateX(-10%);
            opacity: 0.25;
          }
          45% {
            opacity: 0.6;
          }
          60% {
            opacity: 0.35;
          }
          100% {
            transform: translateX(12%);
            opacity: 0.25;
          }
        }

        .hero-collage--1 {
          animation: collageFloat 5.2s ease-in-out infinite;
        }

        .hero-collage--2 {
          animation: collageFloat 6.1s ease-in-out infinite 0.2s;
        }

        .hero-collage--3 {
          animation: collageFloat 6.8s ease-in-out infinite 0.35s;
        }

        @keyframes collageFloat {
          0% {
            transform: translateY(0px) rotate(-1deg);
          }
          50% {
            transform: translateY(-10px) rotate(1.2deg);
          }
          100% {
            transform: translateY(0px) rotate(-1deg);
          }
        }

        @keyframes sadayaRiver {
          0% {
            stroke-dashoffset: 0;
            opacity: 0.95;
          }
          50% {
            stroke-dashoffset: -260;
            opacity: 1;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 0.95;
          }
        }

        @keyframes sadayaLeafFloat {
          0% {
            transform: translateY(0px);
            opacity: 0.35;
          }
          50% {
            transform: translateY(-14px);
            opacity: 0.55;
          }
          100% {
            transform: translateY(0px);
            opacity: 0.35;
          }
        }

        /* Parallax (scroll-reactive) */
        .hero-main-asset {
          transform: translate3d(
              var(--heroMainXpx, 0px),
              var(--heroMainYpx, 0px),
              0
            )
            rotate(var(--heroMainRotdeg, 0deg));
          will-change: transform;
        }

        .hero-card-left {
          translate: var(--heroLeftCardXpx, 0px) var(--heroLeftCardYpx, 0px);
          will-change: translate;
        }

        .hero-card-right {
          translate: var(--heroRightCardXpx, 0px) var(--heroRightCardYpx, 0px);
          will-change: translate;
        }
      `}</style>
    </section>
  );
}
