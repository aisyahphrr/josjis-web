"use client";

import { useState } from "react";
import { Plus, Bot, Trash2, Edit2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  rating: number;
}

const dummyProducts: Product[] = [
  {
    id: 1,
    name: "Dodol Kacang Bogor",
    description: "Dodol tradisional dengan rasa kacang yang nikmat dan bertahan lama",
    price: 45000,
    image: "https://via.placeholder.com/300x300?text=Dodol+Kacang",
    stock: 245,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Kue Lapis Sumedang",
    description: "Kue lapis berlapis dengan cita rasa manis dan tekstur lembut",
    price: 35000,
    image: "https://via.placeholder.com/300x300?text=Kue+Lapis",
    stock: 156,
    rating: 4.9,
  },
  {
    id: 3,
    name: "Manisan Jambu",
    description: "Manisan buah jambu yang segar dengan rasa asam manis yang sempurna",
    price: 25000,
    image: "https://via.placeholder.com/300x300?text=Manisan+Jambu",
    stock: 89,
    rating: 4.7,
  },
  {
    id: 4,
    name: "Tahu Goreng Crispy",
    description: "Tahu goreng dengan kulit yang renyah dan tekstur di dalamnya yang empuk",
    price: 15000,
    image: "https://via.placeholder.com/300x300?text=Tahu+Goreng",
    stock: 320,
    rating: 4.6,
  },
  {
    id: 5,
    name: "Cookies Almond Premium",
    description: "Kue kering premium dengan bahan almond pilihan dan resep rahasia",
    price: 55000,
    image: "https://via.placeholder.com/300x300?text=Cookies+Almond",
    stock: 67,
    rating: 5.0,
  },
  {
    id: 6,
    name: "Teh Herbal Bogor",
    description: "Teh herbal organik yang menyegarkan dengan manfaat kesehatan maksimal",
    price: 30000,
    image: "https://via.placeholder.com/300x300?text=Teh+Herbal",
    stock: 445,
    rating: 4.5,
  },
];

const dummyAIDescription = `Produk premium ini dibuat dengan menggunakan bahan-bahan pilihan terbaik yang dikurasi khusus untuk memberikan pengalaman terbaik bagi pelanggan. Setiap detail dirancang dengan cermat untuk memastikan kualitas tertinggi. 

Dengan proses pembuatan yang teliti dan pengalaman bertahun-tahun, kami menghadirkan inovasi terbaru yang menggabungkan cita rasa tradisional dengan sentuhan modern. Produk ini cocok untuk berbagai kesempatan dan dapat dinikmati oleh seluruh keluarga.

Dapatkan diskon spesial untuk pembelian dalam jumlah besar. Kepuasan pelanggan adalah prioritas utama kami!`;

interface FormData {
  name: string;
  description: string;
  price: string;
  stock: string;
}

export default function ProductsManagement() {
  const [products, setProducts] = useState<Product[]>(dummyProducts);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    price: "",
    stock: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenerateDescription = () => {
    setFormData((prev) => ({
      ...prev,
      description: dummyAIDescription,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const newProduct: Product = {
        id: products.length + 1,
        name: formData.name,
        description: formData.description,
        price: parseInt(formData.price) || 0,
        stock: parseInt(formData.stock) || 0,
        image: "https://via.placeholder.com/300x300?text=Produk+Baru",
        rating: 4.5,
      };

      setProducts((prev) => [newProduct, ...prev]);
      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
      });
      setShowAddForm(false);
      setIsSubmitting(false);
      alert("Produk berhasil ditambahkan!");
    }, 1500);
  };

  const handleDeleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manajemen Produk</h1>
          <p className="text-muted-foreground mt-2">
            Total Produk: {products.length}
          </p>
        </div>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-linear-to-r from-[#F99912] to-[#64762C] text-[#181612] font-semibold hover:shadow-lg hover:shadow-[#F99912]/30 transition-all duration-300"
        >
          <Plus className="mr-2 w-4 h-4" />
          Tambah Produk Baru
        </Button>
      </div>

      {/* Add Product Form */}
      {showAddForm && (
        <div className="backdrop-blur-xl bg-card/60 border border-[#F99912]/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">
              Tambah Produk Baru
            </h2>
            <button
              onClick={() => setShowAddForm(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">
                Nama Produk
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Masukkan nama produk"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="bg-background/50 border-[#F99912]/10 text-foreground placeholder:text-muted-foreground focus:border-[#F99912]/30 focus:ring-[#F99912]/20"
              />
            </div>

            {/* Product Description */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="description" className="text-foreground">
                  Deskripsi Produk
                </Label>
                <Button
                  type="button"
                  onClick={handleGenerateDescription}
                  variant="outline"
                  size="sm"
                  className="border-[#F99912]/30 hover:bg-[#F99912]/10 text-foreground"
                >
                  <Bot className="mr-2 w-4 h-4" />
                  Generate dengan Gemini AI
                </Button>
              </div>
              <Textarea
                id="description"
                name="description"
                placeholder="Jelaskan fitur dan manfaat produk"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={5}
                className="bg-background/50 border-[#F99912]/10 text-foreground placeholder:text-muted-foreground focus:border-[#F99912]/30 focus:ring-[#F99912]/20 resize-none"
              />
            </div>

            {/* Price and Stock */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price" className="text-foreground">
                  Harga (Rp)
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="Contoh: 45000"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  className="bg-background/50 border-[#F99912]/10 text-foreground placeholder:text-muted-foreground focus:border-[#F99912]/30 focus:ring-[#F99912]/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock" className="text-foreground">
                  Stok
                </Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  placeholder="Contoh: 100"
                  value={formData.stock}
                  onChange={handleInputChange}
                  required
                  className="bg-background/50 border-[#F99912]/10 text-foreground placeholder:text-muted-foreground focus:border-[#F99912]/30 focus:ring-[#F99912]/20"
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-linear-to-r from-[#F99912] to-[#64762C] text-[#181612] font-semibold hover:shadow-lg hover:shadow-[#F99912]/30 transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? "Menyimpan..." : "Simpan Produk"}
              </Button>
              <Button
                type="button"
                onClick={() => setShowAddForm(false)}
                variant="outline"
                className="border-[#F99912]/30 hover:bg-[#F99912]/10"
              >
                Batal
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="backdrop-blur-xl bg-card/60 border border-[#F99912]/10 rounded-2xl p-5 hover:border-[#F99912]/30 transition-all duration-300 flex flex-col"
          >
            {/* Product Image */}
            <div className="mb-4 rounded-xl overflow-hidden bg-muted/30 h-40">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="flex-1 space-y-3 mb-4">
              <div>
                <h3 className="font-semibold text-foreground line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                  {product.description}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="bg-muted/30 rounded-lg p-2">
                  <p className="text-xs text-muted-foreground">Harga</p>
                  <p className="text-sm font-semibold text-[#F99912]">
                    Rp {product.price.toLocaleString("id-ID")}
                  </p>
                </div>
                <div className="bg-muted/30 rounded-lg p-2">
                  <p className="text-xs text-muted-foreground">Stok</p>
                  <p className="text-sm font-semibold text-foreground">
                    {product.stock} pcs
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">★</span>
                <span className="text-sm font-medium text-foreground">
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-xs text-muted-foreground">
                  ({product.id * 50} reviews)
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4 border-t border-[#F99912]/10">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-[#F99912]/30 hover:bg-[#F99912]/10 text-foreground"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDeleteProduct(product.id)}
                className="flex-1 border-red-500/30 hover:bg-red-500/10 text-red-400"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Hapus
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
