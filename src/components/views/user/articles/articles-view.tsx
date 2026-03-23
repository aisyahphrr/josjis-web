"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Eye,
  Heart,
  Search,
  TrendingUp,
  User,
} from "lucide-react";
import { type ArticleRecord } from "@/src/lib/dummyData";
import { loadArticles } from "@/src/lib/shared/articles-store";

type UserArticle = ArticleRecord & {
  excerpt: string;
  dateLabel: string;
  readTime: string;
  views: number;
  likes: number;
  featured: boolean;
  author: string;
  category: string;
};

function formatDateLabel(isoDate: string) {
  return new Date(isoDate).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function estimateReadTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 180));
  return `${minutes} menit`;
}

function toUserArticle(article: ArticleRecord, index: number): UserArticle {
  const excerpt =
    article.content.length > 140
      ? `${article.content.slice(0, 140).trim()}...`
      : article.content;

  return {
    ...article,
    excerpt,
    dateLabel: formatDateLabel(article.updatedAt),
    readTime: estimateReadTime(article.content),
    views: 700 + index * 173,
    likes: 40 + index * 19,
    featured: index < 2,
    author: "Admin SADAYA",
    category: "Edukasi",
  };
}

export default function ArticlesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(
    null
  );
  const [articles, setArticles] = useState<UserArticle[]>([]);

  useEffect(() => {
    const syncArticles = () => {
      const published = loadArticles()
        .filter((article) => article.status === "published")
        .sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        )
        .map(toUserArticle);

      setArticles(published);

      if (
        selectedArticleId &&
        !published.some((article) => article.id === selectedArticleId)
      ) {
        setSelectedArticleId(null);
      }
    };

    syncArticles();
    window.addEventListener("focus", syncArticles);
    window.addEventListener("storage", syncArticles);

    return () => {
      window.removeEventListener("focus", syncArticles);
      window.removeEventListener("storage", syncArticles);
    };
  }, [selectedArticleId]);

  const filteredArticles = useMemo(
    () =>
      articles.filter((article) =>
        `${article.title} ${article.content}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      ),
    [articles, searchQuery]
  );

  const selectedArticle =
    filteredArticles.find((article) => article.id === selectedArticleId) ??
    articles.find((article) => article.id === selectedArticleId) ??
    null;

  const featuredArticles = filteredArticles.filter((article) => article.featured);
  const regularArticles = filteredArticles.filter((article) => !article.featured);

  if (selectedArticle) {
    return (
      <div className="space-y-6">
        <Button
          variant="outline"
          onClick={() => setSelectedArticleId(null)}
          className="w-fit border-[#F99912]/30 hover:bg-[#F99912]/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali ke daftar artikel
        </Button>

        <article className="space-y-6">
          <div className="relative overflow-hidden rounded-3xl border border-[#F99912]/20 bg-gradient-to-r from-[#F99912]/20 via-[#64762C]/10 to-[#F99912]/10 p-6 md:p-8">
            <div className="absolute right-0 top-0 h-56 w-56 translate-x-1/3 -translate-y-1/3 rounded-full bg-[#F99912]/15 blur-3xl" />
            <div className="relative z-10 max-w-4xl">
              <Badge className="mb-4 bg-[#F99912] text-[#181612] hover:bg-[#F99912]">
                {selectedArticle.category}
              </Badge>
              <h1 className="mb-4 text-3xl font-bold text-foreground md:text-5xl">
                {selectedArticle.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {selectedArticle.author}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {selectedArticle.readTime}
                </span>
                <span className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  {selectedArticle.views}
                </span>
                <span className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  {selectedArticle.likes}
                </span>
                <span>{selectedArticle.dateLabel}</span>
              </div>
            </div>
          </div>

          <Card className="overflow-hidden border-[#F99912]/10 bg-card/50 backdrop-blur">
            <div className="flex aspect-[16/7] items-center justify-center bg-gradient-to-br from-[#F99912]/20 via-[#64762C]/10 to-[#F99912]/10">
              {selectedArticle.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={selectedArticle.imageUrl}
                  alt={selectedArticle.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <BookOpen className="h-16 w-16 text-[#F99912]/30" />
              )}
            </div>
            <CardContent className="p-6 md:p-8">
              <div className="mx-auto max-w-4xl whitespace-pre-line text-base leading-8 text-foreground/90">
                {selectedArticle.content}
              </div>
            </CardContent>
          </Card>
        </article>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Artikel</h1>
        <p className="text-muted-foreground">
          Konten artikel yang tampil di sini mengikuti artikel published dari
          halaman admin.
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Cari artikel..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-12 rounded-xl border-[#F99912]/10 bg-muted/50 pl-12 focus:border-[#F99912]/50"
        />
      </div>

      {featuredArticles.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {featuredArticles.map((article) => (
            <Card
              key={article.id}
              className="group overflow-hidden border-[#F99912]/10 bg-card/50 backdrop-blur transition-all duration-300 hover:border-[#F99912]/30 hover:shadow-[0_0_30px_rgba(249,153,18,0.1)]"
            >
              <div
                className="cursor-pointer"
                onClick={() => setSelectedArticleId(article.id)}
              >
                <div className="relative flex aspect-video items-center justify-center bg-gradient-to-br from-[#F99912]/20 to-[#64762C]/20">
                  {article.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <BookOpen className="h-16 w-16 text-[#F99912]/30" />
                  )}
                  <Badge className="absolute left-4 top-4 bg-[#F99912] text-[#181612]">
                    <TrendingUp className="mr-1 h-3 w-3" />
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
                  <h2 className="mb-2 text-xl font-bold text-foreground transition-colors group-hover:text-[#F99912] line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {article.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {article.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {article.likes}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      )}

      <div className="space-y-4">
        {regularArticles.map((article) => (
          <Card
            key={article.id}
            className="group border-[#F99912]/10 bg-card/50 backdrop-blur transition-all duration-300 hover:border-[#F99912]/30"
          >
            <CardContent className="flex gap-6 p-6">
              <div
                className="flex h-24 w-32 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#F99912]/20 to-[#64762C]/20"
                onClick={() => setSelectedArticleId(article.id)}
              >
                {article.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="h-full w-full cursor-pointer object-cover"
                  />
                ) : (
                  <BookOpen className="h-8 w-8 text-[#F99912]/30" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-[#64762C]/20 text-[#64762C] text-xs"
                  >
                    {article.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {article.dateLabel}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedArticleId(article.id)}
                  className="mb-1 line-clamp-1 text-left font-bold text-foreground transition-colors hover:text-[#F99912]"
                >
                  {article.title}
                </button>
                <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {article.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {article.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    {article.likes}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <Card className="border-[#F99912]/10 bg-card/50 backdrop-blur">
          <CardContent className="p-12 text-center">
            <BookOpen className="mx-auto mb-4 h-16 w-16 text-muted-foreground/30" />
            <h3 className="mb-2 text-lg font-medium text-foreground">
              Artikel tidak ditemukan
            </h3>
            <p className="text-muted-foreground">
              Belum ada artikel published dari admin, atau kata kunci pencarian
              belum cocok.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
