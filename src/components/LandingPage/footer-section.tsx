import Link from "next/link";
import {
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";

const footerLinks = {
  Platform: [
    { name: "Marketplace", href: "/marketplace" },
    { name: "Harvest Bogor", href: "/game" },
    { name: "Bogor Quest", href: "/quest" },
    { name: "Academy", href: "/academy" },
    { name: "AI Assistant", href: "/ai" },
  ],
  UMKM: [
    { name: "Daftar UMKM", href: "/register?role=umkm" },
    { name: "Dashboard", href: "/umkm/dashboard" },
    { name: "Panduan Penjual", href: "/guide/seller" },
    { name: "Kebijakan Toko", href: "/policy/store" },
  ],
  Bantuan: [
    { name: "Pusat Bantuan", href: "/help" },
    { name: "FAQ", href: "/faq" },
    { name: "Kontak Kami", href: "/contact" },
    { name: "Komplain", href: "/complaint" },
  ],
  Legal: [
    { name: "Syarat & Ketentuan", href: "/terms" },
    { name: "Kebijakan Privasi", href: "/privacy" },
    { name: "Kebijakan Refund", href: "/refund" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com/josjis", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com/josjis", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com/josjis", label: "Twitter" },
  { icon: Youtube, href: "https://youtube.com/josjis", label: "Youtube" },
];

export function FooterSection() {
  return (
    <footer className="relative pt-24 pb-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-muted/50 to-background" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F99912]/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter */}
        <div className="mb-16 p-8 rounded-3xl bg-gradient-to-r from-[#F99912]/10 via-[#9ACD32]/10 to-[#9370DB]/10 border border-[#F99912]/20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Dapatkan Update Terbaru
              </h3>
              <p className="text-muted-foreground">
                Subscribe newsletter kami untuk info promo, produk baru, dan
                tips UMKM.
              </p>
            </div>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Email Anda"
                className="flex-1 px-4 py-3 rounded-xl bg-background border border-[#F99912]/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#F99912]/50 transition-colors"
              />
              <Button className="bg-gradient-to-r from-[#F99912] to-[#9ACD32] hover:from-[#F99912]/90 hover:to-[#9ACD32]/90 text-[#2B3236] font-semibold px-6 shadow-none transition-all duration-300">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#F99912] to-[#9ACD32] p-0.5 group-hover:shadow-[0_12px_30px_rgba(40,50,56,0.10)] transition-shadow duration-300">
                <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#F99912]" />
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#F99912] to-[#9ACD32] bg-clip-text text-transparent">
                SADAYA
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 text-pretty">
              Platform marketplace UMKM Bogor berbasis ekonomi kreatif.
            </p>
            <div className="space-y-2">
              <a
                href="mailto:info@sadaya.com"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[#F99912] transition-colors"
              >
                <Mail className="w-4 h-4" />
                info@sadaya.com
              </a>
              <a
                href="tel:+6281234567890"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[#F99912] transition-colors"
              >
                <Phone className="w-4 h-4" />
                +62 812 3456 7890
              </a>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                Bogor, Jawa Barat
              </p>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-foreground mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-[#F99912] transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#F99912]/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} SADAYA. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-muted/50 hover:bg-[#F99912]/10 border border-[#F99912]/10 hover:border-[#F99912]/30 flex items-center justify-center text-muted-foreground hover:text-[#F99912] transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
