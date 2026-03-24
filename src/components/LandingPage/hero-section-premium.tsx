"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { Button } from "@/src/components/ui/button";
import { ArrowRight, Play, Star, Zap, ShoppingBag } from "lucide-react";

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = ((clientX - left) / width - 0.5) * 20; // range roughly -10 to 10
    const y = ((clientY - top) / height - 0.5) * 20;
    setMousePosition({ x, y });
  };

  const tags = useMemo(
    () => [
      { id: 1, icon: <Zap className="w-4 h-4 text-[#F99912]" />, text: "Daya Poin" },
      { id: 2, icon: <Star className="w-4 h-4 text-[#9ACD32]" />, text: "Kesejahteraan Driver" },
      { id: 3, icon: <ShoppingBag className="w-4 h-4 text-[#9370DB]" />, text: "UMKM Kreatif" },
    ],
    []
  );

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden pt-32 lg:pt-40 pb-32 lg:pb-48 bg-[#FAFAFA] transition-colors duration-1000"
      aria-label="Hero SADAYA Creative"
    >
      {/* Soft Animated Abstract Gradient Background */}
      <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply">
        <div 
          className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full blur-[120px] bg-[#9ACD32]/60 animate-blob"
          style={{ transform: `translate3d(${mousePosition.x * -1}px, ${mousePosition.y * -1}px, 0)` }}
        />
        <div 
          className="absolute bottom-[-10%] right-[-10%] w-[45vw] h-[45vw] rounded-full blur-[140px] bg-[#F99912]/50 animate-blob"
          style={{ transform: `translate3d(${mousePosition.x * 1}px, ${mousePosition.y * 1}px, 0)`, animationDelay: "2s" }}
        />
        <div 
          className="absolute top-[20%] right-[30%] w-[35vw] h-[35vw] rounded-full blur-[100px] bg-[#9370DB]/40 animate-blob"
          style={{ transform: `translate3d(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px, 0)`, animationDelay: "4s" }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.25]"
        style={{
          backgroundImage: `linear-gradient(rgba(150,150,150,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(150,150,150,0.15) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      />

      {/* Interactive Floating Abstract/Geometric Shapes (Color Balance) */}
      <div className="absolute inset-0 pointer-events-none z-0 perspective-1000 overflow-hidden">
        {/* Orange Sphere */}
        <div 
          className="absolute top-[15%] left-[5%] w-16 h-16 rounded-full bg-gradient-to-tr from-[#F99912] to-[#FFB75E] shadow-xl animate-float opacity-80"
          style={{ transform: `translateZ(50px) translateY(${scrollY * 0.1}px) rotateX(${-mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)` }}
        />
        {/* Purple Cylinder/Pill */}
        <div 
          className="absolute bottom-[20%] left-[40%] w-12 h-24 rounded-full bg-gradient-to-tr from-[#9370DB] to-[#B39DDB] shadow-lg animate-float-slow opacity-70"
          style={{ transform: `translateZ(100px) translateY(${scrollY * -0.15}px) rotate(${mousePosition.x * 3}deg)` }}
        />
        {/* Green Cube/Square */}
        <div 
          className="absolute top-[25%] right-[10%] w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#9ACD32] to-[#AED581] shadow-2xl animate-float-alt opacity-90 rotate-12"
          style={{ transform: `translateZ(150px) translateY(${scrollY * -0.2}px) rotateX(${mousePosition.x * 4}deg) rotateY(${mousePosition.y * 4}deg)` }}
        />
        {/* Orange Zigzag/Wave (Custom polygon) */}
        <div 
          className="absolute bottom-[10%] right-[25%] w-20 h-20 bg-gradient-to-br from-[#F99912] to-[#FF8C00] shadow-md animate-spin-slow opacity-60"
          style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)', transform: `translateZ(80px) translateY(${scrollY * 0.25}px)` }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column (Text Content) */}
          <div 
            className="relative z-20"
            style={{ transform: `translateY(${scrollY * -0.05}px)` }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-xl border border-white/80 mb-8 shadow-sm transition-all duration-300 hover:bg-white/90">
              <SparklesIcon className="w-4 h-4 text-[#F99912]" />
              <span className="text-sm font-bold text-[#F99912] tracking-wide uppercase">
                Platform UMKM Kreatif Bogor
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-[#283238] text-balance drop-shadow-sm">
              Sadaya: Tumbuh Bersama, Berkarya untuk Bogor.
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-[#4D4D4E] max-w-xl text-pretty font-medium leading-relaxed">
              Platform modern yang menghubungkan Customer, Driver, dan UMKM Bogor dalam satu ekosistem interaktif yang adil, kreatif, dan penuh semangat.
            </p>

            {/* Tags (Balanced Colors) */}
            <div className="mt-8 flex flex-wrap gap-3">
              {tags.map((t) => (
                <div
                  key={t.id}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white text-[#283238] hover:bg-white hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                >
                  <div className={`p-1 rounded-md ${t.id === 1 ? 'bg-[#F99912]/10' : t.id === 2 ? 'bg-[#9ACD32]/10' : 'bg-[#9370DB]/10'}`}>
                    {t.icon}
                  </div>
                  <span className="text-sm font-bold">{t.text}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 items-start">
              <Link href="#marketplace">
                <Button
                  size="lg"
                  className="bg-[#283238] text-white hover:bg-[#F99912] font-bold text-lg px-8 py-6 rounded-2xl shadow-xl shadow-[#283238]/20 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 cursor-pointer border border-[#283238] hover:border-[#F99912]"
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
                  className="bg-white/50 backdrop-blur-md text-[#283238] font-bold text-lg px-8 py-6 rounded-2xl hover:bg-white hover:border-[#9ACD32] hover:text-[#9ACD32] border-white/80 shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <Play className="mr-2 w-5 h-5" />
                  Lihat Cara Kerja
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column (Interactive 3D Asset inside BOLD Card) */}
          <div className="relative w-full flex justify-center items-center z-10 lg:h-[650px] mt-10 lg:mt-0 perspective-1000">
            {/* The bold background card container (Soft Orange & Purple gradient) */}
            <div 
              className="relative w-full aspect-square md:aspect-[4/3] rounded-[3rem] bg-gradient-to-br from-[#FFB75E] via-[#FF9E7A] to-[#9370DB] shadow-[0_30px_70px_-15px_rgba(147,112,219,0.5)] flex items-center justify-center p-8 transition-transform duration-700 hover:scale-[1.02] z-20 group overflow-hidden border-4 border-white/30"
              style={{
                transform: `translateY(${scrollY * 0.05}px) rotateX(${-mousePosition.y * 0.5}deg) rotateY(${mousePosition.x * 0.5}deg)`,
                transformStyle: "preserve-3d"
              }}
            >
               {/* Intense internal Glows & Grid */}
               <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiNmZmZiIiBmaWxsLW9wYWNpdHk9IjAuMSI+PC9yZWN0Pjwvc3ZnPg==')] opacity-30 mix-blend-overlay pointer-events-none" />
               <div className="absolute top-[-20%] right-[-10%] w-[80%] h-[80%] rounded-full bg-gradient-to-bl from-[#F99912]/60 to-transparent blur-3xl opacity-60 pointer-events-none" />
               <div className="absolute bottom-[-20%] left-[-10%] w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-[#9370DB]/80 to-transparent blur-3xl opacity-70 pointer-events-none" />
              
               {/* Behind-asset intense white glow */}
              <div className="absolute inset-0 rounded-full bg-white blur-[60px] opacity-40 transform scale-[0.65] pointer-events-none" style={{ transform: "translateZ(30px)" }} />
              
              <img
                src="/hero-3d-sadaya.png"
                alt="Sadaya Original 3D Hero"
                className="w-[115%] max-w-none h-auto object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.5)] relative z-10 animate-float-slow transition-transform duration-500 group-hover:rotate-2 group-hover:scale-110"
                style={{ transform: "translateZ(80px)" }}
              />

              {/* Inner floating decorative mini-shapes to make it POP */}
              <div className="absolute top-[12%] right-[15%] w-10 h-10 border-4 border-white/50 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.4)] animate-float-alt opacity-90 backdrop-blur-md pointer-events-none" style={{ transform: "translateZ(60px)" }} />
              <div className="absolute bottom-[15%] left-[12%] w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl border border-white/40 shadow-2xl animate-float opacity-90 rotate-12 pointer-events-none" style={{ transform: "translateZ(70px)" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Wavy Bottom Edge SVG (Soft transition to next section) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20 pointer-events-none text-background">
        <svg fill="currentColor" viewBox="0 0 1200 120" preserveAspectRatio="none" className="block w-full h-12 lg:h-20">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,113.8,198.71,98.66,242.06,88.94,283.47,71.21,321.39,56.44Z"></path>
        </svg>
      </div>

      {/* Keyframes for smooth animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateZ(50px) translateY(0px) rotate(0deg); }
          50% { transform: translateZ(50px) translateY(-20px) rotate(5deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateZ(100px) translateY(0px) rotate(0deg); }
          50% { transform: translateZ(100px) translateY(-15px) rotate(-5deg); }
        }
        @keyframes float-alt {
          0%, 100% { transform: translateZ(150px) translateY(0px) rotate(12deg); }
          50% { transform: translateZ(150px) translateY(25px) rotate(20deg); }
        }
        @keyframes blob {
          0% { transform: scale(1) translate(0px, 0px); }
          33% { transform: scale(1.1) translate(30px, -50px); }
          66% { transform: scale(0.9) translate(-20px, 20px); }
          100% { transform: scale(1) translate(0px, 0px); }
        }
        @keyframes spin-slow {
          from { transform: translateZ(80px) rotate(0deg); }
          to { transform: translateZ(80px) rotate(360deg); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-alt { animation: float-alt 7s ease-in-out infinite reverse; }
        .animate-blob { animation: blob 15s infinite alternate ease-in-out; }
        .animate-spin-slow { animation: spin-slow 25s linear infinite; }
        .perspective-1000 { perspective: 1000px; }
      `}</style>
    </section>
  );
}

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}

