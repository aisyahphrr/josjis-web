"use client";

import { useEffect, useState } from "react";
import { Button } from "@/src/components/ui/button";
import {
  ArrowRight,
  ShoppingBag,
  Store,
  Sparkles,
  Zap,
  Globe,
  Play,
} from "lucide-react";
import Link from "next/link";

function FloatingCard({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div
      className={`absolute backdrop-blur-xl bg-card/80 border border-[#F99912]/20 rounded-2xl p-4 shadow-[0_8px_32px_rgba(249,153,18,0.15)] animate-float ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

function GlowOrb({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute rounded-full blur-3xl animate-pulse-slow ${className}`}
    />
  );
}

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Mesh Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#F99912_0%,transparent_50%)] opacity-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,#64762C_0%,transparent_50%)] opacity-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,#424F17_0%,transparent_50%)] opacity-10" />

        {/* Animated Grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(249,153,18,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(249,153,18,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
          }}
        />

        {/* Glow Orbs */}
        <GlowOrb className="w-96 h-96 bg-[#F99912]/20 -top-48 -left-48" />
        <GlowOrb className="w-80 h-80 bg-[#64762C]/20 top-1/4 -right-40" />
        <GlowOrb className="w-64 h-64 bg-[#424F17]/30 bottom-20 left-1/4" />
      </div>

      {/* Floating UI Cards */}
      <FloatingCard className="top-32 left-[5%] hidden lg:block" delay={0}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F99912] to-[#64762C] flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-[#181612]" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Total Produk</p>
            <p className="text-lg font-bold text-foreground">2,500+</p>
          </div>
        </div>
      </FloatingCard>

      <FloatingCard className="top-48 right-[8%] hidden lg:block" delay={0.5}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#64762C] to-[#424F17] flex items-center justify-center">
            <Store className="w-5 h-5 text-foreground" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">UMKM Terdaftar</p>
            <p className="text-lg font-bold text-foreground">500+</p>
          </div>
        </div>
      </FloatingCard>

      <FloatingCard className="bottom-40 left-[10%] hidden lg:block" delay={1}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F99912] to-[#C9C9C3] flex items-center justify-center">
            <Zap className="w-5 h-5 text-[#181612]" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Koin Dihasilkan</p>
            <p className="text-lg font-bold text-foreground">1.2M+</p>
          </div>
        </div>
      </FloatingCard>

      <FloatingCard
        className="bottom-32 right-[12%] hidden lg:block"
        delay={1.5}
      >
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F99912] to-[#64762C] border-2 border-background"
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground">+10K User Aktif</p>
        </div>
      </FloatingCard>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F99912]/10 border border-[#F99912]/20 mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-[#F99912]" />
          <span className="text-sm text-[#F99912] font-medium">
            Platform UMKM Kreatif #1 di Bogor
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-balance">
          <span className="bg-gradient-to-r from-[#F99912] via-[#C9C9C3] to-[#64762C] bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
            JOSJIS
          </span>
          <br />
          <span className="text-foreground">Jelajah Oleh-Oleh Kreatif</span>
          <br />
          <span className="text-muted-foreground text-3xl sm:text-4xl md:text-5xl">
            Khas Bogor
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 text-pretty">
          Platform digital untuk menemukan, mendukung, dan memajukan UMKM
          kreatif Bogor melalui marketplace, gamification, dan teknologi AI.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link href="#marketplace">
            <Button
              size="lg"
              className="group bg-gradient-to-r from-[#F99912] to-[#64762C] hover:from-[#F99912]/90 hover:to-[#64762C]/90 text-[#181612] font-semibold text-lg px-8 py-6 rounded-xl shadow-[0_0_40px_rgba(249,153,18,0.4)] hover:shadow-[0_0_60px_rgba(249,153,18,0.6)] transition-all duration-300"
            >
              <ShoppingBag className="mr-2 w-5 h-5" />
              Jelajahi Produk
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/register?role=umkm">
            <Button
              size="lg"
              variant="outline"
              className="border-[#F99912]/30 hover:bg-[#F99912]/10 hover:border-[#F99912]/50 text-foreground font-semibold text-lg px-8 py-6 rounded-xl transition-all duration-300"
            >
              <Store className="mr-2 w-5 h-5" />
              Daftar UMKM
            </Button>
          </Link>
          <Button
            size="lg"
            variant="ghost"
            className="text-muted-foreground hover:text-foreground hover:bg-[#F99912]/5"
          >
            <Play className="mr-2 w-5 h-5" />
            Lihat Demo
          </Button>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {[
            "E-Commerce",
            "Gamification",
            "AI Assistant",
            "Edukasi Digital",
          ].map((feature) => (
            <div
              key={feature}
              className="px-4 py-2 rounded-full bg-muted/50 backdrop-blur border border-[#F99912]/10 text-sm text-muted-foreground hover:border-[#F99912]/30 hover:bg-[#F99912]/5 transition-all duration-300 cursor-default"
            >
              {feature}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-[#F99912]/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full bg-[#F99912] animate-pulse" />
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-gradient {
          animation: gradient 4s ease infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
