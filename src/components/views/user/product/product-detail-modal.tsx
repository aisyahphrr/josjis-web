"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel";
import { Star, Heart, ShoppingCart, Store } from "lucide-react";
import toast from "react-hot-toast";
import { useUserStore } from "@/src/store/user-store";

interface ProductDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    sellerName: string;
    sellerDescription?: string;
    rating: number;
    reviewsCount: number;
    badge?: string;
    category: string;
    description?: string;
    images?: Array<{ alt: string; src: string }>;
  };
}

export default function ProductDetailModal({
  open,
  onOpenChange,
  product,
}: ProductDetailModalProps) {
  const router = useRouter();
  const { cart, addToCart } = useUserStore();
  const [isAdding, setIsAdding] = React.useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsAdding(true);

    try {
      // Add to local store with product data (no API call needed)
      addToCart(product.id, 1, {
        name: product.name,
        price: product.price,
        sellerName: product.sellerName,
      });

      toast.success(`${product.name} ditambahkan ke keranjang!`);

      // Close modal dan redirect ke cart
      onOpenChange(false);
      setTimeout(() => {
        router.push("/cart");
      }, 500);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Terjadi kesalahan");
    } finally {
      setIsAdding(false);
    }
  };

  const images = product.images || [
    { alt: "Product", src: "/placeholder.jpg" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-background/95 backdrop-blur border-[#F99912]/10">
        <DialogHeader>
          <DialogTitle className="sr-only">{product.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Product Image */}
          <div className="rounded-xl overflow-hidden bg-gradient-to-br from-[#F99912]/20 to-[#64762C]/20">
            {images.length > 1 ? (
              <Carousel opts={{ loop: true }}>
                <CarouselContent>
                  {images.map((img, idx) => (
                    <CarouselItem key={idx}>
                      <div className="aspect-square flex items-center justify-center">
                        <ShoppingCart className="w-16 h-16 text-[#F99912]/30" />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
            ) : (
              <div className="aspect-square flex items-center justify-center">
                <ShoppingCart className="w-16 h-16 text-[#F99912]/30" />
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-3">
            {product.badge && (
              <Badge className="bg-[#F99912] text-[#181612] w-fit">
                {product.badge}
              </Badge>
            )}

            <h2 className="text-2xl font-bold text-foreground">
              {product.name}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-[#F99912] text-[#F99912]" />
                <span className="text-sm font-medium">
                  {product.rating.toFixed(1)}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.reviewsCount} ulasan)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 pt-2">
              <p className="text-3xl font-bold text-[#F99912]">
                Rp {product.price.toLocaleString()}
              </p>
              {product.originalPrice && (
                <p className="text-sm text-muted-foreground line-through">
                  Rp {product.originalPrice.toLocaleString()}
                </p>
              )}
            </div>
          </div>

          {/* Seller Info */}
          {product.sellerName && (
            <Card className="bg-muted/30 border-[#F99912]/10">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#F99912]/10 flex items-center justify-center">
                  <Store className="w-5 h-5 text-[#F99912]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {product.sellerName}
                  </p>
                  {product.sellerDescription && (
                    <p className="text-xs text-muted-foreground">
                      {product.sellerDescription}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Description */}
          {product.description && (
            <div className="space-y-2">
              <h3 className="font-medium text-foreground">Deskripsi</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              className="flex-1 bg-gradient-to-r from-[#F99912] to-[#64762C] text-[#181612] hover:shadow-[0_0_20px_rgba(249,153,18,0.3)]"
              onClick={handleAddToCart}
              disabled={isAdding}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              {isAdding ? "Menambahkan..." : "Tambah ke Keranjang"}
            </Button>
            <Button
              variant="outline"
              className="border-[#F99912]/30 hover:bg-[#F99912]/10"
              onClick={() => onOpenChange(false)}
            >
              Tutup
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
