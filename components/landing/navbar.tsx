"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ShoppingCart, Sparkles } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/60 border-b border-[#F99912]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#F99912] to-[#64762C] p-0.5 group-hover:shadow-[0_0_20px_rgba(249,153,18,0.5)] transition-shadow duration-300">
              <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#F99912]" />
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#F99912] via-[#C9C9C3] to-[#64762C] bg-clip-text text-transparent">
              JOSJIS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-muted-foreground hover:text-[#F99912] transition-colors text-sm">
              Fitur
            </Link>
            <Link href="#marketplace" className="text-muted-foreground hover:text-[#F99912] transition-colors text-sm">
              Marketplace
            </Link>
            <Link href="#game" className="text-muted-foreground hover:text-[#F99912] transition-colors text-sm">
              Game
            </Link>
            <Link href="#academy" className="text-muted-foreground hover:text-[#F99912] transition-colors text-sm">
              Academy
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground hover:bg-[#F99912]/10">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-[#F99912] to-[#64762C] hover:from-[#F99912]/90 hover:to-[#64762C]/90 text-[#181612] font-semibold shadow-[0_0_20px_rgba(249,153,18,0.3)] hover:shadow-[0_0_30px_rgba(249,153,18,0.5)] transition-all duration-300">
                Daftar Sekarang
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#F99912] rounded-full text-[10px] flex items-center justify-center text-[#181612] font-bold">
                0
              </span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-[#F99912]/10 p-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <Link href="#features" className="block text-muted-foreground hover:text-[#F99912] transition-colors py-2">
            Fitur
          </Link>
          <Link href="#marketplace" className="block text-muted-foreground hover:text-[#F99912] transition-colors py-2">
            Marketplace
          </Link>
          <Link href="#game" className="block text-muted-foreground hover:text-[#F99912] transition-colors py-2">
            Game
          </Link>
          <Link href="#academy" className="block text-muted-foreground hover:text-[#F99912] transition-colors py-2">
            Academy
          </Link>
          <div className="flex gap-3 pt-4 border-t border-[#F99912]/10">
            <Link href="/login" className="flex-1">
              <Button variant="outline" className="w-full border-[#F99912]/30 hover:bg-[#F99912]/10">
                Login
              </Button>
            </Link>
            <Link href="/register" className="flex-1">
              <Button className="w-full bg-gradient-to-r from-[#F99912] to-[#64762C] text-[#181612]">
                Daftar
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
