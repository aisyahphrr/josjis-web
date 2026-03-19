"use client";

import { useState } from "react";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  BookOpen,
  Search,
  Clock,
  User,
  Heart,
  Share2,
  Eye,
  TrendingUp,
} from "lucide-react";

const articles = [
  {
    id: 1,
    title: "Mengenal Talas Bogor: Komoditas Unggulan Kota Hujan",
    excerpt:
      "Talas Bogor merupakan salah satu komoditas unggulan yang menjadi identitas kuliner khas Bogor. Simak sejarah dan cara pengolahannya.",
    category: "Kuliner",
    author: "Tim SADAYA",
    date: "10 Mar 2026",
    readTime: "5 menit",
    views: 1234,
    likes: 89,
    featured: true,
  },
  {
    id: 2,
    title: "Tips Sukses Memulai UMKM di Era Digital",
    excerpt:
      "Panduan lengkap untuk pelaku UMKM yang ingin go digital. Dari strategi pemasaran hingga pengelolaan toko online.",
    category: "Bisnis",
    author: "Admin SADAYA",
    date: "8 Mar 2026",
    readTime: "8 menit",
    views: 856,
    likes: 67,
    featured: true,
  },
  {
    id: 3,
    title: "Wisata Kuliner Bogor: 10 Tempat Wajib Dikunjungi",
    excerpt:
      "Jelajahi destinasi kuliner terbaik di Kota Bogor. Dari makanan tradisional hingga modern yang sayang untuk dilewatkan.",
    category: "Wisata",
    author: "Travel Writer",
    date: "5 Mar 2026",
    readTime: "6 menit",
    views: 2341,
    likes: 156,
    featured: false,
  },
  {
    id: 4,
    title: "Cara Mendapatkan Daya Poin Asli Bogor dengan Cepat",
    excerpt:
      "Strategi dan tips untuk mengumpulkan Daya Poin Asli Bogor melalui game Harvest Bogor dan quest harian.",
    category: "Tips",
    author: "Tim SADAYA",
    date: "3 Mar 2026",
    readTime: "4 menit",
    views: 3456,
    likes: 234,
    featured: false,
  },
  {
    id: 5,
    title: "Sejarah Roti Unyil Venus: Dari Toko Kecil Hingga Ikon Bogor",
    excerpt:
      "Kisah inspiratif perjalanan Roti Unyil Venus yang kini menjadi oleh-oleh wajib dari Kota Bogor.",
    category: "Kuliner",
    author: "Kontributor",
    date: "1 Mar 2026",
    readTime: "7 menit",
    views: 1567,
    likes: 98,
    featured: false,
  },
  {
    id: 6,
    title: "Program UMKM Academy: Tingkatkan Skill Digital Anda",
    excerpt:
      "Ikuti program pelatihan gratis dari SADAYA untuk mengembangkan bisnis UMKM Anda ke level selanjutnya.",
    category: "Edukasi",
    author: "Tim SADAYA",
    date: "28 Feb 2026",
    readTime: "5 menit",
    views: 789,
    likes: 45,
    featured: false,
  },
];

const categories = ["Semua", "Kuliner", "Bisnis", "Wisata", "Tips", "Edukasi"];

export default function ArticlesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "Semua" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredArticles = filteredArticles.filter((a) => a.featured);
  const regularArticles = filteredArticles.filter((a) => !a.featured);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Artikel</h1>
        <p className="text-muted-foreground">
          Baca artikel menarik seputar UMKM dan kuliner Bogor
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Cari artikel..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 h-12 bg-muted/50 border-[#F99912]/10 focus:border-[#F99912]/50 rounded-xl"
        />
      </div>

      {}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className={
              selectedCategory === category
                ? "bg-[#F99912] text-[#181612] hover:bg-[#F99912]/90"
                : "border-[#F99912]/30 hover:bg-[#F99912]/10"
            }
          >
            {category}
          </Button>
        ))}
      </div>

      {featuredArticles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredArticles.map((article) => (
            <Card
              key={article.id}
              className="group bg-card/50 backdrop-blur border-[#F99912]/10 hover:border-[#F99912]/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(249,153,18,0.1)] overflow-hidden"
            >
              <div className="aspect-video bg-gradient-to-br from-[#F99912]/20 to-[#64762C]/20 flex items-center justify-center relative">
                <BookOpen className="w-16 h-16 text-[#F99912]/30" />
                <Badge className="absolute top-4 left-4 bg-[#F99912] text-[#181612]">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              </div>
              <CardContent className="p-6">
                <Badge
                  variant="secondary"
                  className="mb-3 bg-[#64762C]/20 text-[#64762C]"
                >
                  {article.category}
                </Badge>
                <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-[#F99912] transition-colors line-clamp-2">
                  {article.title}
                </h2>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {article.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {article.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      {article.likes}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="space-y-4">
        {regularArticles.map((article) => (
          <Card
            key={article.id}
            className="group bg-card/50 backdrop-blur border-[#F99912]/10 hover:border-[#F99912]/30 transition-all duration-300"
          >
            <CardContent className="p-6 flex gap-6">
              <div className="w-32 h-24 rounded-xl bg-gradient-to-br from-[#F99912]/20 to-[#64762C]/20 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-8 h-8 text-[#F99912]/30" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <Badge
                    variant="secondary"
                    className="bg-[#64762C]/20 text-[#64762C] text-xs"
                  >
                    {article.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {article.date}
                  </span>
                </div>
                <h3 className="font-bold text-foreground mb-1 group-hover:text-[#F99912] transition-colors line-clamp-1">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {article.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {article.likes}
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-[#F99912]/10 hover:text-[#F99912]"
                >
                  <Heart className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-[#F99912]/10 hover:text-[#F99912]"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <Card className="bg-card/50 backdrop-blur border-[#F99912]/10">
          <CardContent className="p-12 text-center">
            <BookOpen className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              Artikel tidak ditemukan
            </h3>
            <p className="text-muted-foreground">
              Coba ubah kata kunci pencarian atau kategori
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
