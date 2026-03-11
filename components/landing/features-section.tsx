"use client"

import { ShoppingCart, Bot, Gamepad2, Trophy, GraduationCap, Truck, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
  {
    icon: ShoppingCart,
    title: "Marketplace UMKM",
    description: "Temukan ribuan produk oleh-oleh khas Bogor dari UMKM terpercaya dengan sistem transaksi aman.",
    color: "from-[#F99912] to-[#C9C9C3]",
    delay: 0
  },
  {
    icon: Bot,
    title: "Gemini AI Assistant",
    description: "Personal shopping assistant berbasis AI yang membantu menemukan produk sesuai budget dan preferensi.",
    color: "from-[#64762C] to-[#F99912]",
    delay: 0.1
  },
  {
    icon: Gamepad2,
    title: "Harvest Bogor Game",
    description: "Game farming digital untuk menanam Talas, Pala, dan Jambu Kristal. Dapatkan Koin Asli Bogor!",
    color: "from-[#424F17] to-[#64762C]",
    delay: 0.2
  },
  {
    icon: Trophy,
    title: "Bogor Quest",
    description: "Sistem gamification dengan daily check-in, mystery box, dan leaderboard untuk mendapatkan reward.",
    color: "from-[#F99912] to-[#64762C]",
    delay: 0.3
  },
  {
    icon: GraduationCap,
    title: "Academy Edukasi",
    description: "Program edukasi digital marketing, branding, dan sertifikasi untuk memajukan UMKM Bogor.",
    color: "from-[#C9C9C3] to-[#F99912]",
    delay: 0.4
  },
  {
    icon: Truck,
    title: "Driver Lokal",
    description: "Pengiriman cepat dengan driver lokal terverifikasi. Tracking real-time dan estimasi akurat.",
    color: "from-[#64762C] to-[#424F17]",
    delay: 0.5
  }
]

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#F99912]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#64762C]/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#64762C]/10 border border-[#64762C]/20 mb-6">
            <span className="text-sm text-[#64762C] font-medium">Fitur Unggulan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-balance">
            <span className="text-foreground">Satu Platform, </span>
            <span className="bg-gradient-to-r from-[#F99912] to-[#64762C] bg-clip-text text-transparent">
              Semua Solusi
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            JOSJIS menghadirkan ekosistem lengkap untuk mendukung pertumbuhan UMKM Bogor 
            dengan teknologi modern dan pengalaman pengguna terbaik.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative"
              style={{ animationDelay: `${feature.delay}s` }}
            >
              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl blur-xl transition-opacity duration-500`} />
              
              {/* Card */}
              <div className="relative h-full backdrop-blur-xl bg-card/60 border border-[#F99912]/10 rounded-2xl p-6 hover:border-[#F99912]/30 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_20px_40px_rgba(249,153,18,0.1)]">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} p-0.5 mb-6 group-hover:shadow-[0_0_30px_rgba(249,153,18,0.3)] transition-shadow duration-300`}>
                  <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                    <feature.icon className="w-7 h-7 text-[#F99912]" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-[#F99912] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {feature.description}
                </p>

                {/* Link */}
                <Button 
                  variant="ghost" 
                  className="p-0 h-auto text-[#F99912] hover:text-[#F99912]/80 hover:bg-transparent group/btn"
                >
                  Pelajari lebih lanjut
                  <ArrowRight className="ml-1 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
