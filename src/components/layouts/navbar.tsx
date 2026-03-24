"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import { Menu, X, ShoppingCart } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <Image 
              src="/sadaya-logo-ver1.svg" 
              alt="Sadaya Logo" 
              width={140} 
              height={40} 
              className="h-8 w-auto object-contain"
              priority
            />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-foreground hover:text-[#F99912] transition-colors text-sm font-medium"
            >
              Fitur
            </Link>
            <Link
              href="#marketplace"
              className="text-foreground hover:text-[#F99912] transition-colors text-sm font-medium"
            >
              Marketplace
            </Link>
            <Link
              href="#game"
              className="text-foreground hover:text-[#F99912] transition-colors text-sm font-medium"
            >
              Game
            </Link>
            <Link
              href="#academy"
              className="text-foreground hover:text-[#F99912] transition-colors text-sm font-medium"
            >
              Academy
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/login">
              <Button
                className="bg-[#F99912] text-[#2B3236] font-semibold shadow-none hover:bg-[#F99912]/90 hover:scale-[1.03] transition-all duration-300 cursor-pointer"
              >
                Masuk
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-[#F99912] text-[#2B3236] font-semibold shadow-none hover:bg-[#F99912]/90 hover:scale-[1.03] transition-all duration-300 cursor-pointer">
                Daftar
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-foreground hover:text-[#F99912] hover:bg-[#F99912]/10 transition-all duration-300"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#F99912] rounded-full text-[10px] flex items-center justify-center text-[#2B3236] font-bold">
                0
              </span>
            </Button>
          </div>

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
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border p-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <Link
            href="#features"
            className="block text-foreground hover:text-[#F99912] transition-colors py-2 font-medium"
          >
            Fitur
          </Link>
          <Link
            href="#marketplace"
            className="block text-foreground hover:text-[#F99912] transition-colors py-2 font-medium"
          >
            Marketplace
          </Link>
          <Link
            href="#game"
            className="block text-foreground hover:text-[#F99912] transition-colors py-2 font-medium"
          >
            Game
          </Link>
          <Link
            href="#academy"
            className="block text-foreground hover:text-[#F99912] transition-colors py-2 font-medium"
          >
            Academy
          </Link>
          <div className="flex gap-3 pt-4 border-t border-border">
            <Link href="/login" className="flex-1 ">
              <Button className="w-full bg-[#F99912] text-[#2B3236] font-semibold shadow-none hover:bg-[#F99912]/90 hover:scale-[1.03] transition-all duration-300 cursor-pointer">
                Masuk
              </Button>
            </Link>
            <Link href="/register" className="flex-1 ">
              <Button className="w-full bg-[#F99912] text-[#2B3236] font-semibold shadow-none hover:bg-[#F99912]/90 hover:scale-[1.03] transition-all duration-300 cursor-pointer">
                Daftar
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
