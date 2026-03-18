"use client";

import { useState } from "react";
import {
  Star,
  TrendingUp,
  MessageSquare,
  AlertCircle,
  Filter,
  Search,
} from "lucide-react";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

interface Review {
  id: number;
  customer: string;
  rating: number;
  date: string;
  text: string;
  product: string;
  verified: boolean;
}

const dummyReviews: Review[] = [
  {
    id: 1,
    customer: "Budi Santoso",
    rating: 5,
    date: "2026-03-18",
    text: "Produk sangat memuaskan! Kemasan rapi dan pengiriman cepat. Rasa dodol benar-benar autentik dan enak. Saya pasti pesan lagi!",
    product: "Dodol Kacang Bogor",
    verified: true,
  },
  {
    id: 2,
    customer: "Siti Nurhaliza",
    rating: 4,
    date: "2026-03-17",
    text: "Kue lapis sangat lezat dan bertahan lama. Cocok untuk oleh-oleh. Harga sedikit mahal tapi sebanding dengan kualitas.",
    product: "Kue Lapis Sumedang",
    verified: true,
  },
  {
    id: 3,
    customer: "Ahmad Wijaya",
    rating: 5,
    date: "2026-03-16",
    text: "Manisan jambu paling enak yang pernah saya beli. Rasanya segar dan manis, sangat recommended!",
    product: "Manisan Jambu",
    verified: true,
  },
  {
    id: 4,
    customer: "Dewi Lestari",
    rating: 3,
    date: "2026-03-15",
    text: "Cookies almond lumayan enak, tapi packagingnya bisa lebih bagus. Untuk rasa sih oke.",
    product: "Cookies Almond Premium",
    verified: true,
  },
  {
    id: 5,
    customer: "Rudi Hermawan",
    rating: 5,
    date: "2026-03-14",
    text: "Tahu goreng crispy yang terbaik! Tepung penututnya sangat renyah dan tekstur dalamnya empuk. Order lagi!",
    product: "Tahu Goreng Crispy",
    verified: true,
  },
  {
    id: 6,
    customer: "Ani Wijaya",
    rating: 4,
    date: "2026-03-13",
    text: "Teh herbalnya sangat menyegarkan dan baik untuk kesehatan. Wanginya alami dan tidak mengandung bahan kimia berbahaya.",
    product: "Teh Herbal Bogor",
    verified: true,
  },
  {
    id: 7,
    customer: "Hendra Kusuma",
    rating: 5,
    date: "2026-03-12",
    text: "Dodol ini adalah favorit keluarga saya. Anak-anak sangat suka dan saya sudah merekomendasikan ke teman-teman.",
    product: "Dodol Kacang Bogor",
    verified: true,
  },
  {
    id: 8,
    customer: "Ratna Putri",
    rating: 4,
    date: "2026-03-11",
    text: "Manisan jambu oke, tapi bisa diperbanyak ukuran packagingnya. Kualitas produk sih terjamin bagus.",
    product: "Manisan Jambu",
    verified: true,
  },
];

const calculateStats = (reviews: Review[]) => {
  const totalReviews = reviews.length;
  const averageRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews;
  const ratingDistribution = {
    5: reviews.filter((r) => r.rating === 5).length,
    4: reviews.filter((r) => r.rating === 4).length,
    3: reviews.filter((r) => r.rating === 3).length,
    2: reviews.filter((r) => r.rating === 2).length,
    1: reviews.filter((r) => r.rating === 1).length,
  };

  return {
    totalReviews,
    averageRating,
    ratingDistribution,
  };
};

export default function AnalysisRating() {
  const [reviews, setReviews] = useState<Review[]>(dummyReviews);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRating, setFilterRating] = useState<string>("all");

  const stats = calculateStats(reviews);

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.text.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRating =
      filterRating === "all" || review.rating === parseInt(filterRating);

    return matchesSearch && matchesRating;
  });

  const StarIcon = Star;

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <MessageSquare className="w-8 h-8 text-[#F99912]" />
          Analisis dan Feedback
        </h1>
        <p className="text-muted-foreground mt-2">
          Lihat statistik rating dan review pelanggan untuk produk Anda
        </p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Average Rating Card */}
        <div className="backdrop-blur-xl bg-card/60 border border-[#F99912]/10 rounded-2xl p-5 hover:border-[#F99912]/30 transition-all duration-300">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Rata-Rata Rating
              </p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-[#F99912]">
                  {stats.averageRating.toFixed(1)}
                </p>
                <span className="text-sm text-muted-foreground">/5.0</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#F99912] to-[#64762C] p-0.5">
              <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                <Star className="w-6 h-6 fill-[#F99912] text-[#F99912]" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#64762C]">
            <TrendingUp className="w-3 h-3" />
            Sangat Baik
          </div>
        </div>

        {/* Total Reviews */}
        <div className="backdrop-blur-xl bg-card/60 border border-[#F99912]/10 rounded-2xl p-5 hover:border-[#F99912]/30 transition-all duration-300">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Review</p>
              <p className="text-3xl font-bold text-foreground">
                {stats.totalReviews}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#F99912] to-[#64762C] p-0.5">
              <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-[#F99912]" />
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Dari {stats.totalReviews} pembeli terverifikasi
          </p>
        </div>

        {/* 5 Star Rating */}
        <div className="backdrop-blur-xl bg-card/60 border border-[#F99912]/10 rounded-2xl p-5 hover:border-[#F99912]/30 transition-all duration-300">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="flex items-center gap-1 mb-1">
                <p className="text-sm text-muted-foreground">Rating 5</p>
                <Star className="w-3 h-3 fill-[#F99912] text-[#F99912]" />
              </div>
              <p className="text-3xl font-bold text-[#F99912]">
                {stats.ratingDistribution[5]}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#F99912] to-[#64762C] p-0.5">
              <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                <span className="text-lg font-bold text-[#F99912]">★</span>
              </div>
            </div>
          </div>
          <div className="w-full h-1 bg-muted/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#F99912]"
              style={{
                width: `${(stats.ratingDistribution[5] / stats.totalReviews) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Product Recommendation */}
        <div className="backdrop-blur-xl bg-card/60 border border-[#64762C]/10 rounded-2xl p-5 hover:border-[#64762C]/30 transition-all duration-300">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                % Rekomendasi
              </p>
              <p className="text-3xl font-bold text-[#64762C]">
                {(
                  ((stats.ratingDistribution[4] + stats.ratingDistribution[5]) /
                    stats.totalReviews) *
                  100
                ).toFixed(0)}
                %
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#F99912] to-[#64762C] p-0.5">
              <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-[#64762C]" />
              </div>
            </div>
          </div>
          <p className="text-xs text-[#64762C]">Rating 4-5 Bintang</p>
        </div>
      </div>

      {/* Rating Distribution Chart */}
      <div className="backdrop-blur-xl bg-card/60 border border-[#F99912]/10 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">
          Distribusi Rating
        </h2>
        <div className="space-y-4">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 w-20">
                  <span className="text-sm font-medium text-foreground">
                    {rating} ★
                  </span>
                </div>
                <div className="flex-1 mx-4 h-2 bg-muted/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#F99912] rounded-full transition-all"
                    style={{
                      width: `${(stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution] / stats.totalReviews) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-12 text-right">
                  {
                    stats.ratingDistribution[
                      rating as keyof typeof stats.ratingDistribution
                    ]
                  }
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Cari review berdasarkan nama, produk, atau teks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-background/50 border-[#F99912]/10 text-foreground placeholder:text-muted-foreground focus:border-[#F99912]/30 focus:ring-[#F99912]/20"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Select value={filterRating} onValueChange={setFilterRating}>
            <SelectTrigger className="w-40 bg-background/50 border-[#F99912]/10 text-foreground focus:ring-[#F99912]/20">
              <SelectValue placeholder="Filter Rating" />
            </SelectTrigger>
            <SelectContent className="bg-card border-[#F99912]/10">
              <SelectItem value="all">Semua Rating</SelectItem>
              <SelectItem value="5">5 Bintang</SelectItem>
              <SelectItem value="4">4 Bintang</SelectItem>
              <SelectItem value="3">3 Bintang</SelectItem>
              <SelectItem value="2">2 Bintang</SelectItem>
              <SelectItem value="1">1 Bintang</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">
          Review Pelanggan ({filteredReviews.length})
        </h2>

        {filteredReviews.length === 0 ? (
          <div className="text-center py-12">
            <AlertCircle className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">
              Tidak ada review yang sesuai dengan filter Anda
            </p>
          </div>
        ) : (
          filteredReviews.map((review) => (
            <div
              key={review.id}
              className="backdrop-blur-xl bg-card/60 border border-[#F99912]/10 rounded-2xl p-6 hover:border-[#F99912]/30 transition-all duration-300"
            >
              {/* Reviewer Info */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">
                      {review.customer}
                    </h3>
                    {review.verified && (
                      <span className="px-2 py-0.5 rounded-full bg-[#64762C]/20 text-[#64762C] text-xs font-medium">
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {review.product}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  {new Date(review.date).toLocaleDateString("id-ID")}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? "fill-[#F99912] text-[#F99912]"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-foreground ml-2">
                  {review.rating}.0
                </span>
              </div>

              {/* Review Text */}
              <p className="text-sm text-foreground leading-relaxed">
                {review.text}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
