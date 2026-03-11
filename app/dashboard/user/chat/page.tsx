"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  MessageSquare, Send, Bot, User, Clock, 
  Phone, Video, MoreVertical, Paperclip, Smile,
  CheckCheck, Sparkles
} from "lucide-react"

// Mock chat data
const initialMessages = [
  { id: 1, sender: "bot", message: "Halo! Selamat datang di Customer Service JOSJIS. Ada yang bisa kami bantu?", time: "09:00" },
  { id: 2, sender: "user", message: "Halo, saya mau tanya tentang status pesanan saya", time: "09:01" },
  { id: 3, sender: "bot", message: "Tentu! Boleh saya tahu nomor pesanan Anda?", time: "09:01" },
  { id: 4, sender: "user", message: "ORD-2026-002", time: "09:02" },
  { id: 5, sender: "bot", message: "Baik, pesanan ORD-2026-002 saat ini sedang dalam proses pengiriman. Estimasi tiba dalam 1-2 hari. Apakah ada pertanyaan lain?", time: "09:02" },
]

const quickReplies = [
  "Status pesanan saya",
  "Cara melakukan pembayaran",
  "Produk UMKM terbaru",
  "Cara mendapatkan koin",
  "Bantuan lainnya"
]

export default function ChatPage() {
  const [messages, setMessages] = useState(initialMessages)
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const sendMessage = async (text: string) => {
    if (!text.trim()) return

    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      message: text,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    }

    setMessages([...messages, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate bot response
    await new Promise(resolve => setTimeout(resolve, 1500))

    const botResponses: Record<string, string> = {
      "Status pesanan saya": "Untuk mengecek status pesanan, silakan kunjungi menu 'Riwayat Pembelian' atau berikan nomor pesanan Anda.",
      "Cara melakukan pembayaran": "JOSJIS mendukung berbagai metode pembayaran: E-Wallet (GoPay, OVO, DANA), Transfer Bank, dan Kartu Kredit/Debit.",
      "Produk UMKM terbaru": "Produk terbaru kami meliputi Lapis Talas Premium, Kopi Bogor Arabika, dan Brownies Talas Amanda. Kunjungi Marketplace untuk melihat selengkapnya!",
      "Cara mendapatkan koin": "Anda bisa mendapatkan Koin Asli Bogor dengan: 1) Bermain Harvest Bogor, 2) Menyelesaikan quest harian, 3) Membeli produk UMKM, 4) Memberikan review.",
      "Bantuan lainnya": "Untuk bantuan lebih lanjut, Anda bisa menghubungi kami di WhatsApp: 0812-3456-7890 atau email: cs@josjis.com"
    }

    const botMessage = {
      id: messages.length + 2,
      sender: "bot",
      message: botResponses[text] || "Terima kasih atas pertanyaan Anda. Tim kami akan segera membantu. Ada yang lain yang bisa saya bantu?",
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    }

    setIsTyping(false)
    setMessages(prev => [...prev, botMessage])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(inputMessage)
  }

  return (
    <DashboardLayout role="user">
      <div className="h-[calc(100vh-12rem)]">
        <Card className="h-full bg-card/50 backdrop-blur border-[#F99912]/10 flex flex-col">
          {/* Chat Header */}
          <CardHeader className="border-b border-[#F99912]/10 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F99912] to-[#64762C] flex items-center justify-center">
                    <Bot className="w-6 h-6 text-[#181612]" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-card" />
                </div>
                <div>
                  <CardTitle className="text-lg">Customer Service</CardTitle>
                  <p className="text-sm text-green-500 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    Online
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="hover:bg-[#F99912]/10">
                  <Phone className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-[#F99912]/10">
                  <Video className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-[#F99912]/10">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </CardHeader>

          {/* Chat Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex gap-2 max-w-[80%] ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
                    {msg.sender === "bot" && (
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F99912] to-[#64762C] flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-[#181612]" />
                      </div>
                    )}
                    <div className={`rounded-2xl px-4 py-3 ${
                      msg.sender === "user" 
                        ? "bg-[#F99912] text-[#181612]" 
                        : "bg-muted/50"
                    }`}>
                      <p className="text-sm">{msg.message}</p>
                      <div className={`flex items-center gap-1 mt-1 ${
                        msg.sender === "user" ? "justify-end" : ""
                      }`}>
                        <span className={`text-xs ${
                          msg.sender === "user" ? "text-[#181612]/70" : "text-muted-foreground"
                        }`}>
                          {msg.time}
                        </span>
                        {msg.sender === "user" && (
                          <CheckCheck className="w-3 h-3 text-[#181612]/70" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F99912] to-[#64762C] flex items-center justify-center">
                      <Bot className="w-4 h-4 text-[#181612]" />
                    </div>
                    <div className="rounded-2xl px-4 py-3 bg-muted/50">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Quick Replies */}
          <div className="px-4 py-2 border-t border-[#F99912]/10 flex-shrink-0">
            <p className="text-xs text-muted-foreground mb-2">Pertanyaan cepat:</p>
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply) => (
                <Button
                  key={reply}
                  variant="outline"
                  size="sm"
                  className="border-[#F99912]/30 hover:bg-[#F99912]/10 text-xs"
                  onClick={() => sendMessage(reply)}
                >
                  {reply}
                </Button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-[#F99912]/10 flex-shrink-0">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Button type="button" variant="ghost" size="icon" className="hover:bg-[#F99912]/10 flex-shrink-0">
                <Paperclip className="w-5 h-5" />
              </Button>
              <Input
                placeholder="Ketik pesan..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 bg-muted/50 border-[#F99912]/10 focus:border-[#F99912]/50 rounded-xl"
              />
              <Button type="button" variant="ghost" size="icon" className="hover:bg-[#F99912]/10 flex-shrink-0">
                <Smile className="w-5 h-5" />
              </Button>
              <Button 
                type="submit"
                size="icon"
                className="bg-gradient-to-r from-[#F99912] to-[#64762C] text-[#181612] flex-shrink-0"
                disabled={!inputMessage.trim()}
              >
                <Send className="w-5 h-5" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
