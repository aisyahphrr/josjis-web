"use client"

import { Bot, Send, Sparkles, Image, MessageSquare, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const chatMessages = [
  {
    type: "user",
    message: "Saya punya budget 100 ribu dan ingin membeli oleh-oleh Bogor yang tahan lama."
  },
  {
    type: "ai",
    message: "Berdasarkan budget Rp100.000 dan preferensi produk tahan lama, saya rekomendasikan:\n\n1. Keripik Talas Bogor (Rp28.000) - tahan 2 bulan\n2. Dodol Talas Premium (Rp45.000) - tahan 3 bulan\n3. Kacang Bogor Crispy (Rp25.000) - tahan 1 bulan\n\nTotal: Rp98.000 dengan sisa Rp2.000. Semua produk ini sangat populer dan cocok sebagai oleh-oleh!"
  }
]

const aiFeatures = [
  {
    icon: MessageSquare,
    title: "Smart Recommendation",
    description: "Rekomendasi produk personal berdasarkan budget dan preferensi"
  },
  {
    icon: Image,
    title: "Auto Description",
    description: "Generate deskripsi produk otomatis dari foto (untuk UMKM)"
  },
  {
    icon: Zap,
    title: "Instant Answer",
    description: "Jawaban cepat untuk pertanyaan seputar produk dan toko"
  }
]

export function GeminiAISection() {
  const [inputValue, setInputValue] = useState("")

  return (
    <section id="ai" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#64762C]/5 to-background" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#F99912]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-[#64762C]/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Chat Interface */}
          <div className="order-2 lg:order-1">
            <div className="relative backdrop-blur-xl bg-card/60 border border-[#F99912]/20 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(249,153,18,0.15)]">
              {/* Header */}
              <div className="p-4 border-b border-[#F99912]/10 bg-gradient-to-r from-[#F99912]/10 to-[#64762C]/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F99912] to-[#64762C] flex items-center justify-center">
                    <Bot className="w-5 h-5 text-[#181612]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">JOSJIS AI Assistant</h4>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#64762C] animate-pulse" />
                      Powered by Gemini AI
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="p-4 space-y-4 min-h-[300px]">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-4 rounded-2xl ${
                        msg.type === 'user'
                          ? 'bg-gradient-to-r from-[#F99912] to-[#64762C] text-[#181612]'
                          : 'bg-muted/50 border border-[#F99912]/10 text-foreground'
                      }`}
                    >
                      {msg.type === 'ai' && (
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="w-4 h-4 text-[#F99912]" />
                          <span className="text-xs text-[#F99912] font-medium">AI Response</span>
                        </div>
                      )}
                      <p className="text-sm whitespace-pre-line">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-[#F99912]/10">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Tanyakan sesuatu..."
                    className="flex-1 px-4 py-3 rounded-xl bg-muted/50 border border-[#F99912]/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#F99912]/30 transition-colors"
                  />
                  <Button 
                    size="icon"
                    className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#F99912] to-[#64762C] hover:from-[#F99912]/90 hover:to-[#64762C]/90"
                  >
                    <Send className="w-5 h-5 text-[#181612]" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Floating Sparkle */}
            <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F99912] to-[#64762C] p-0.5 shadow-[0_10px_30px_rgba(249,153,18,0.3)] animate-pulse hidden lg:block">
              <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-[#F99912]" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F99912]/10 border border-[#F99912]/20 mb-6">
              <Bot className="w-4 h-4 text-[#F99912]" />
              <span className="text-sm text-[#F99912] font-medium">AI Powered</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-balance">
              <span className="bg-gradient-to-r from-[#F99912] to-[#C9C9C3] bg-clip-text text-transparent">
                Gemini AI
              </span>
              <br />
              <span className="text-foreground">Smart Shopping Assistant</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 text-pretty">
              Asisten belanja pintar berbasis AI yang membantu Anda menemukan produk 
              yang tepat sesuai budget dan preferensi. Untuk UMKM, AI juga membantu 
              membuat deskripsi produk otomatis dari foto!
            </p>

            {/* AI Features */}
            <div className="space-y-4">
              {aiFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 border border-[#F99912]/10 hover:border-[#F99912]/30 hover:bg-[#F99912]/5 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F99912]/20 to-[#64762C]/20 flex items-center justify-center shrink-0">
                    <feature.icon className="w-5 h-5 text-[#F99912]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
