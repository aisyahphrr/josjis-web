"use client";

import { LogIn, ShoppingCart, TrendingUp, HeartHandshake } from "lucide-react";

const steps = [
  {
    icon: LogIn,
    title: "1. Gabung Komunitas",
    description: "Daftar gratis sebagai pembeli, UMKM, atau pengemudi. Semua punya ruang untuk tumbuh di ekosistem SADAYA.",
    color: "from-[#9370DB] to-[#B39DDB]",
    shadow: "shadow-[#9370DB]/20"
  },
  {
    icon: ShoppingCart,
    title: "2. Jelajah & Berbelanja",
    description: "Temukan produk lokal otentik Bogor. Tiap transaksi otomatis memberi dampak positif untuk ekonomi tetangga.",
    color: "from-[#9ACD32] to-[#AED581]",
    shadow: "shadow-[#9ACD32]/20"
  },
  {
    icon: TrendingUp,
    title: "3. Kumpulkan Daya Poin",
    description: "Sistem gamifikasi apresiatif—dapatkan poin ganda, naikkan pangkat levelmu dan nikmati diskon melimpah.",
    color: "from-[#F99912] to-[#FFB75E]",
    shadow: "shadow-[#F99912]/20"
  },
  {
    icon: HeartHandshake,
    title: "4. Berdaya Bersama",
    description: "Platform memfasilitasi UMKM untuk edukasi digital, sehingga kesejahteraan masyarakat Bogor meningkat beriringan.",
    color: "from-[#FF7F50] to-[#FF9E7A]",
    shadow: "shadow-[#FF7F50]/20"
  }
];

export function HowItWorksSection() {
  return (
    <section className="relative py-28 overflow-hidden bg-[#fafafa]">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FDF5E7]/50 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[50%] bg-[linear-gradient(to_right,rgba(249,153,18,0.05),rgba(154,205,50,0.05),rgba(147,112,219,0.05))] blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#283238] mb-6">
            Langkah Mudah Menuju <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F99912] to-[#9370DB]">Kemandirian</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tidak perlu proses yang rumit. Mulai kontribusimu untuk ekonomi lokal Bogor dalam empat langkah sederhana.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group">
              {/* Connector Line (hidden on mobile, visible on lg) */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-full h-[2px] bg-gradient-to-r from-border to-transparent -z-10" />
              )}
              
              <div className="flex flex-col items-center text-center">
                <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${step.color} ${step.shadow} shadow-2xl flex items-center justify-center mb-6 text-white transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                  <step.icon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-[#283238] mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
