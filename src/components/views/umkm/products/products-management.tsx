"use client";

import { useState } from "react";
import { Plus, Bot, Trash2, Edit2, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { Product, ProductFormData } from "@/src/interface/umkm";
import {
  CATEGORIES,
  dummyProducts,
  dummyAIDescription,
} from "@/src/lib/constants/umkm/products";

type FormData = ProductFormData;

export default function ProductsManagement() {
  const [products, setProducts] = useState<Product[]>(dummyProducts);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [selectedProductDetail, setSelectedProductDetail] =
    useState<Product | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "makanan",
    image: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
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
        image:
          formData.image ||
          "https://via.placeholder.com/300x300?text=Produk+Baru",
        rating: 4.5,
        category: formData.category,
      };

      setProducts((prev) => [newProduct, ...prev]);
      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "makanan",
        image: "",
      });
      setShowAddForm(false);
      setIsSubmitting(false);
      toast.success("Produk berhasil ditambahkan!");
    }, 1500);
  };

  const handleDeleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
    setDeleteConfirm(null);
    toast.success("Produk berhasil dihapus!");
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      stock: product.stock.toString(),
      category: product.category,
      image: product.image,
    });
  };

  const handleUpdateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingProduct) return;
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: formData.name,
                description: formData.description,
                price: parseInt(formData.price) || 0,
                stock: parseInt(formData.stock) || 0,
                category: formData.category,
              }
            : p,
        ),
      );
      setEditingProduct(null);
      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "makanan",
        image: "",
      });
      setIsSubmitting(false);
      toast.success("Produk berhasil diperbarui!");
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Manajemen Produk
          </h1>
          <p className="text-muted-foreground mt-2">
            Total Produk: {filteredProducts.length}
          </p>
        </div>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-linear-to-r cursor-pointer from-[#F99912] to-[#64762C] text-[#181612] font-semibold hover:shadow-lg hover:shadow-[#F99912]/30 transition-all duration-300"
        >
          <Plus className="mr-2 w-4 h-4" />
          Tambah Produk Baru
        </Button>
      </div>

      {/* Filter Section */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">
          Filter Kategori:
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => setSelectedCategory(null)}
            variant={selectedCategory === null ? "default" : "outline"}
            className={`cursor-pointer ${
              selectedCategory === null
                ? "bg-linear-to-r from-[#F99912] to-[#64762C] text-[#181612] font-semibold"
                : "border-[#F99912]/30 hover:bg-[#F99912]/10"
            }`}
          >
            Semua Kategori
          </Button>
          {CATEGORIES.map((cat) => (
            <Button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              variant={selectedCategory === cat.id ? "default" : "outline"}
              className={`cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-linear-to-r from-[#F99912] to-[#64762C] text-[#181612] font-semibold"
                  : "border-[#F99912]/30 hover:bg-[#F99912]/10 text-foreground"
              }`}
            >
              {cat.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Add Product Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/10 overflow-hidden flex items-center justify-center z-50 p-4">
          <div className="backdrop-blur-xl bg-card/60 border border-[#F99912]/10 rounded-2xl p-6 space-y-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                Tambah Produk Baru
              </h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="image" className="text-foreground">
                  Foto Produk
                </Label>
                <div className="w-full border-2 border-dashed border-[#F99912]/30 rounded-lg p-4 text-center hover:border-[#F99912]/50 transition-colors">
                  <input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label htmlFor="image" className="cursor-pointer block">
                    {formData.image ? (
                      <div className="space-y-2">
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <p className="text-xs text-[#F99912]">
                          Klik untuk ganti foto
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-2xl">📷</p>
                        <p className="text-sm text-muted-foreground">
                          Klik untuk upload foto produk
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-product-name" className="text-foreground">
                  Nama Produk
                </Label>
                <Input
                  id="add-product-name"
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
                  <Label htmlFor="add-product-desc" className="text-foreground">
                    Deskripsi Produk
                  </Label>
                  <Button
                    type="button"
                    onClick={handleGenerateDescription}
                    variant="outline"
                    size="sm"
                    className="border-[#F99912]/30 hover:bg-[#F99912]/10 text-foreground cursor-pointer"
                  >
                    <Bot className="mr-2 w-4 h-4" />
                    Generate dengan Gemini AI
                  </Button>
                </div>
                <Textarea
                  id="add-product-desc"
                  name="description"
                  placeholder="Jelaskan fitur dan manfaat produk"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="bg-background/50 border-[#F99912]/10 text-foreground placeholder:text-muted-foreground focus:border-[#F99912]/30 focus:ring-[#F99912]/20 resize-none"
                />
              </div>

              {/* Product Category */}
              <div className="space-y-2">
                <Label htmlFor="add-product-cat" className="text-foreground">
                  Kategori Produk
                </Label>
                <select
                  id="add-product-cat"
                  name="category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      category: e.target.value as Product["category"],
                    }))
                  }
                  required
                  className="w-full px-3 py-2 bg-background/50 border border-[#F99912]/10 rounded-md text-foreground placeholder:text-muted-foreground focus:border-[#F99912]/30 focus:ring-[#F99912]/20 focus:outline-none transition-colors"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price and Stock */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="add-product-price"
                    className="text-foreground"
                  >
                    Harga (Rp)
                  </Label>
                  <Input
                    id="add-product-price"
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
                  <Label
                    htmlFor="add-product-stock"
                    className="text-foreground"
                  >
                    Stok
                  </Label>
                  <Input
                    id="add-product-stock"
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
                  className="flex-1 bg-linear-to-r from-[#F99912] to-[#64762C] text-[#181612] font-semibold hover:shadow-lg hover:shadow-[#F99912]/30 transition-all duration-300 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? "Menyimpan..." : "Simpan Produk"}
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  variant="outline"
                  className="border-[#F99912]/30 hover:bg-[#F99912]/10 cursor-pointer"
                >
                  Batal
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="backdrop-blur-xl bg-card/60 border border-[#F99912]/10 rounded-2xl p-6 space-y-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                Edit Produk
              </h2>
              <button
                onClick={() => setEditingProduct(null)}
                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateProduct} className="space-y-6">
              {/* Product Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="edit-image" className="text-foreground">
                  Foto Produk
                </Label>
                <div className="w-full border-2 border-dashed border-[#F99912]/30 rounded-lg p-4 text-center hover:border-[#F99912]/50 transition-colors">
                  <input
                    id="edit-image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label htmlFor="edit-image" className="cursor-pointer block">
                    {formData.image ? (
                      <div className="space-y-2">
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <p className="text-xs text-[#F99912]">
                          Klik untuk ganti foto
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-2xl">📷</p>
                        <p className="text-sm text-muted-foreground">
                          Klik untuk upload foto produk
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Product Name */}
              <div className="space-y-2">
                <Label htmlFor="edit-name" className="text-foreground">
                  Nama Produk
                </Label>
                <Input
                  id="edit-name"
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
                <Label htmlFor="edit-description" className="text-foreground">
                  Deskripsi Produk
                </Label>
                <Textarea
                  id="edit-description"
                  name="description"
                  placeholder="Jelaskan fitur dan manfaat produk"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="bg-background/50 border-[#F99912]/10 text-foreground placeholder:text-muted-foreground focus:border-[#F99912]/30 focus:ring-[#F99912]/20 resize-none"
                />
              </div>

              {/* Product Category */}
              <div className="space-y-2">
                <Label htmlFor="edit-category" className="text-foreground">
                  Kategori Produk
                </Label>
                <select
                  id="edit-category"
                  name="category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      category: e.target.value as Product["category"],
                    }))
                  }
                  required
                  className="w-full px-3 py-2 bg-background/50 border border-[#F99912]/10 rounded-md text-foreground placeholder:text-muted-foreground focus:border-[#F99912]/30 focus:ring-[#F99912]/20 focus:outline-none transition-colors"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price and Stock */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-price" className="text-foreground">
                    Harga (Rp)
                  </Label>
                  <Input
                    id="edit-price"
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
                  <Label htmlFor="edit-stock" className="text-foreground">
                    Stok
                  </Label>
                  <Input
                    id="edit-stock"
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
                  className="flex-1 bg-linear-to-r from-[#F99912] to-[#64762C] text-[#181612] font-semibold hover:shadow-lg hover:shadow-[#F99912]/30 transition-all duration-300 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
                </Button>
                <Button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  variant="outline"
                  className="border-[#F99912]/30 hover:bg-[#F99912]/10 cursor-pointer"
                >
                  Batal
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="backdrop-blur-xl bg-card/60 border border-red-500/20 rounded-2xl p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Hapus Produk?
            </h2>
            <p className="text-muted-foreground mb-6">
              Apakah Anda yakin ingin menghapus produk ini? Tindakan ini tidak
              dapat dibatalkan.
            </p>
            <div className="flex gap-3">
              <Button
                onClick={() => setDeleteConfirm(null)}
                variant="outline"
                className="flex-1 border-[#F99912]/30 hover:bg-[#F99912]/10 cursor-pointer"
              >
                Batal
              </Button>
              <Button
                onClick={() => handleDeleteProduct(deleteConfirm)}
                className="flex-1 bg-red-500/80 hover:bg-red-600 text-white font-semibold transition-all duration-300 cursor-pointer"
              >
                Hapus
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProductDetail && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <style>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
          <div className="backdrop-blur-xl bg-card/60 border border-[#F99912]/10 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-hide">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                Detail Produk
              </h2>
              <button
                onClick={() => setSelectedProductDetail(null)}
                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Product Image */}
              <div className="rounded-xl overflow-hidden bg-muted/30">
                <img
                  src={selectedProductDetail.image}
                  alt={selectedProductDetail.name}
                  className="w-full h-80 object-cover"
                />
              </div>

              {/* Product Name and Category */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">
                      {selectedProductDetail.name}
                    </h1>
                    <span className="text-sm bg-[#F99912]/20 text-[#F99912] px-3 py-1 rounded-full font-medium mt-2 inline-block">
                      {
                        CATEGORIES.find(
                          (c) => c.id === selectedProductDetail.category,
                        )?.label
                      }
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      Harga Produk
                    </p>
                    <p className="text-3xl font-bold text-[#F99912]">
                      Rp {selectedProductDetail.price.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Product Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                  <p className="text-xs text-muted-foreground uppercase font-semibold">
                    {selectedProductDetail.category === "jasa"
                      ? "Kapasitas"
                      : "Stok"}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {selectedProductDetail.category === "jasa"
                      ? selectedProductDetail.stock === 999
                        ? "Tersedia"
                        : `${selectedProductDetail.stock}`
                      : `${selectedProductDetail.stock} pcs`}
                  </p>
                </div>
                <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                  <p className="text-xs text-muted-foreground uppercase font-semibold">
                    Rating
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-foreground">
                      {selectedProductDetail.rating.toFixed(1)}
                    </span>
                    <span className="text-yellow-500 text-xl">★</span>
                  </div>
                </div>
                <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                  <p className="text-xs text-muted-foreground uppercase font-semibold">
                    Total Reviews
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {selectedProductDetail.id * 50}
                  </p>
                </div>
              </div>

              {/* Product Description */}
              <div className="space-y-3 border-t border-[#F99912]/10 pt-6">
                <h3 className="text-lg font-semibold text-foreground">
                  Deskripsi Produk
                </h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {selectedProductDetail.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-6 border-t border-[#F99912]/10">
                <Button
                  onClick={() => {
                    handleOpenEdit(selectedProductDetail);
                    setSelectedProductDetail(null);
                  }}
                  className="flex-1 bg-linear-to-r from-[#F99912] to-[#64762C] text-[#181612] font-semibold hover:shadow-lg hover:shadow-[#F99912]/30 transition-all duration-300 cursor-pointer"
                >
                  <Edit2 className="mr-2 w-4 h-4" />
                  Edit Produk
                </Button>
                <Button
                  onClick={() => {
                    setSelectedProductDetail(null);
                  }}
                  variant="outline"
                  className="flex-1 border-[#F99912]/30 hover:bg-[#F99912]/10 cursor-pointer"
                >
                  Tutup
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="backdrop-blur-xl bg-card/60 border border-[#F99912]/10 rounded-2xl p-5 hover:border-[#F99912]/30 transition-all duration-300 flex flex-col hover:shadow-lg hover:shadow-[#F99912]/20"
          >
            {/* Product Image */}
            <div 
              className="mb-4 rounded-xl overflow-hidden bg-muted/30 h-40 cursor-pointer group"
              onClick={() => setSelectedProductDetail(product)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Product Info */}
            <div className="flex-1 space-y-3 mb-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-foreground line-clamp-2">
                    {product.name}
                  </h3>
                  <span className="text-xs bg-[#F99912]/20 text-[#F99912] px-2 py-1 rounded-full font-medium">
                    {CATEGORIES.find((c) => c.id === product.category)?.label}
                  </span>
                </div>
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
                  <p className="text-xs text-muted-foreground">
                    {product.category === "jasa" ? "Kapasitas" : "Stok"}
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {product.category === "jasa"
                      ? product.stock === 999
                        ? "Tersedia"
                        : `${product.stock}`
                      : `${product.stock} pcs`}
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
                onClick={() => handleOpenEdit(product)}
                className="flex-1 cursor-pointer border-[#F99912]/30 hover:bg-[#F99912]/10 text-foreground"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDeleteConfirm(product.id)}
                className="flex-1 cursor-pointer border-red-500/30 hover:bg-red-500/10 text-red-400"
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
