"use client";

import { useState } from "react";
import { AlertCircle, Upload, Store, FileText } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";

export default function RegisterUMKM() {
  const [formData, setFormData] = useState({
    storeName: "",
    description: "",
    file: null as File | null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        file,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
      // Reset form
      setFormData({
        storeName: "",
        description: "",
        file: null,
      });
      // Show success message
      alert("Pendaftaran UMKM berhasil! Silakan tunggu validasi admin.");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Store className="w-8 h-8 text-[#F99912]" />
            Pendaftaran UMKM
          </h1>
          <p className="text-muted-foreground">
            Bergabunglah dengan marketplace kami dan mulai jualan produk Anda
          </p>
        </div>

        {/* Status Confirmation Alert */}
        <div className="backdrop-blur-xl bg-card/60 border border-[#64762C]/30 rounded-2xl p-6 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#64762C]/20 flex items-center justify-center shrink-0">
            <AlertCircle className="w-6 h-6 text-[#64762C]" />
          </div>
          <div>
            <h3 className="font-semibold text-[#64762C] mb-1">
              Status Konfirmasi Pendaftaran
            </h3>
            <p className="text-sm text-[#64762C]">Menunggu Validasi Admin</p>
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="backdrop-blur-xl bg-card/60 border border-[#F99912]/10 rounded-2xl p-6 space-y-6">
            {/* Store Name Input */}
            <div className="space-y-2">
              <Label htmlFor="storeName" className="text-foreground">
                Nama Toko
              </Label>
              <Input
                id="storeName"
                name="storeName"
                type="text"
                placeholder="Masukkan nama toko Anda"
                value={formData.storeName}
                onChange={handleInputChange}
                required
                className="bg-background/50 border-[#F99912]/10 text-foreground placeholder:text-muted-foreground focus:border-[#F99912]/30 focus:ring-[#F99912]/20"
              />
            </div>

            {/* Description Input */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-foreground">
                Deskripsi Toko
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Jelaskan tentang toko Anda, produk yang dijual, dan keunggulan kompetitif"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={5}
                className="bg-background/50 border-[#F99912]/10 text-foreground placeholder:text-muted-foreground focus:border-[#F99912]/30 focus:ring-[#F99912]/20 resize-none"
              />
            </div>

            {/* File Upload Area */}
            <div className="space-y-2">
              <Label className="text-foreground">Upload Berkas Pendukung</Label>
              <div className="relative">
                <input
                  type="file"
                  id="fileInput"
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png,.docx"
                  required
                />
                <label
                  htmlFor="fileInput"
                  className="flex items-center justify-center w-full p-6 border-2 border-dashed border-[#F99912]/30 rounded-2xl cursor-pointer hover:border-[#F99912]/50 hover:bg-[#F99912]/5 transition-all duration-300 bg-background/30"
                >
                  <div className="flex flex-col items-center gap-2 text-center">
                    <div className="w-12 h-12 rounded-xl bg-[#F99912]/20 flex items-center justify-center">
                      <Upload className="w-6 h-6 text-[#F99912]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Klik untuk upload berkas
                      </p>
                      <p className="text-xs text-muted-foreground">
                        atau drag and drop
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      PDF, JPG, PNG, DOCX (Max 10MB)
                    </p>
                  </div>
                </label>
              </div>
              {formData.file && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-[#64762C]/10 border border-[#64762C]/20">
                  <FileText className="w-4 h-4 text-[#64762C]" />
                  <span className="text-sm text-foreground truncate">
                    {formData.file.name}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button & Terms */}
          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <input type="checkbox" id="terms" required className="mt-1" />
              <Label
                htmlFor="terms"
                className="text-sm text-muted-foreground cursor-pointer"
              >
                Saya setuju dengan{" "}
                <a href="#" className="text-[#F99912] hover:text-[#F99912]/80">
                  Syarat dan Ketentuan
                </a>{" "}
                serta{" "}
                <a href="#" className="text-[#F99912] hover:text-[#F99912]/80">
                  Kebijakan Privasi
                </a>
              </Label>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-linear-to-r from-[#F99912] to-[#64762C] text-[#181612] font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-[#F99912]/30 transition-all duration-300 disabled:opacity-50"
            >
              {isSubmitting ? "Memproses..." : "Daftar UMKM"}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Sudah memiliki akun?{" "}
              <a
                href="/dashboard-umkm"
                className="text-[#F99912] hover:text-[#F99912]/80"
              >
                Kembali ke Dashboard
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
