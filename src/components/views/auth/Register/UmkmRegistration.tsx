"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Upload,
  FileText,
  Store,
  X,
  ArrowRight,
  Loader2,
  MapPin,
  Phone,
} from "lucide-react";
import { DASHBOARD_HOME_BY_ROLE } from "@/src/server/auth/roles";
import { UserRole } from "@prisma/client";
import { useToast } from "@/src/hooks/use-toast";

type UmkmFormData = {
  name: string;
  email: string;
  password: string;
  umkmName: string;
  umkmCategory: string[];
  umkmDescription: string;
  storePhoto: File | null;
  ownerPhone: string;
  ownerAddress: string;
  businessDocument: File | null;
  city?: string;
  district?: string;
  address?: string;
};

interface UmkmRegistrationProps {
  initialData?: Partial<UmkmFormData>;
  onBack?: () => void;
}

const UmkmRegistration = ({ initialData, onBack }: UmkmRegistrationProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<UmkmFormData>({
    name: initialData?.name || "",
    email: initialData?.email || "",
    password: initialData?.password || "",
    umkmName: initialData?.umkmName || "",
    umkmCategory: [],
    umkmDescription: initialData?.umkmDescription || "",
    storePhoto: null,
    ownerPhone: "",
    ownerAddress: "",
    businessDocument: null,
    city: "",
    district: "",
    address: "",
  });

  // Load data dari sessionStorage jika ada
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData = sessionStorage.getItem("registrationData");
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          setFormData((prev) => ({
            ...prev,
            name: parsedData.name || prev.name,
            email: parsedData.email || prev.email,
            password: parsedData.password || prev.password,
          }));
        } catch (err) {
          console.error("Failed to parse registration data", err);
        }
      }
    }
  }, []);

  const categories = [
    "makanan",
    "minuman",
    "cemilan",
    "baju",
    "celana",
    "aksesoris",
    "elektronik",
    "jasa",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      toast({
        title: "Data Tidak Lengkap",
        description: "Nama, email, dan password wajib diisi",
        variant: "destructive",
      });
      return;
    }

    if (!formData.umkmName) {
      toast({
        title: "Nama UMKM Diperlukan",
        description: "Nama UMKM wajib diisi",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const payload: any = {
        role: UserRole.UMKM,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        businessName: formData.umkmName,
      };

      // Hanya tambahkan field opsional jika ada value
      if (formData.ownerPhone?.trim()) payload.phone = formData.ownerPhone;
      if (formData.ownerAddress?.trim())
        payload.address = formData.ownerAddress;
      if (formData.city?.trim()) payload.city = formData.city;
      if (formData.district?.trim()) payload.district = formData.district;

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        let errorDescription = data.message || "Gagal mendaftar UMKM";

        // Parse detailed validation errors if available
        if (data.errors?.fieldErrors) {
          const fieldErrors = data.errors.fieldErrors as Record<
            string,
            string[]
          >;
          const errorMessages = Object.entries(fieldErrors)
            .map(([field, messages]) => {
              const fieldLabel =
                field === "name"
                  ? "Nama"
                  : field === "email"
                    ? "Email"
                    : field === "password"
                      ? "Password"
                      : field === "businessName"
                        ? "Nama Usaha"
                        : field;
              return `${fieldLabel}: ${messages.join(", ")}`;
            })
            .join("\n");
          if (errorMessages) {
            errorDescription = errorMessages;
          }
        }

        toast({
          title: "Registrasi Gagal",
          description: errorDescription,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      toast({
        title: "Registrasi Berhasil",
        description: "Selamat datang di SADAYA!",
        variant: "default",
      });

      // Berhasil, redirect ke dashboard UMKM
      router.push(DASHBOARD_HOME_BY_ROLE[UserRole.UMKM]);
    } catch (err) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat mendaftar",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Info Section */}
      <div className="p-4 rounded-xl bg-muted/30 border border-[#F99912]/10 space-y-4">
        <p className="text-sm font-medium text-foreground">Informasi Pribadi</p>

        {/* Name */}
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            Nama Lengkap
          </label>
          <Input
            id="name"
            type="text"
            placeholder="Nama Anda"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            className="h-12 bg-white border-[#F99912]/10 focus:border-[#F99912]/50 rounded-xl"
            required
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-medium text-foreground"
          >
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="email@example.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
            className="h-12 bg-white border-[#F99912]/10 focus:border-[#F99912]/50 rounded-xl"
            required
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-foreground"
          >
            Password
          </label>
          <Input
            id="password"
            type="password"
            placeholder="Minimal 8 karakter"
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
            className="h-12 bg-white border-[#F99912]/10 focus:border-[#F99912]/50 rounded-xl"
            required
          />
        </div>
      </div>

      {/* Store Name */}
      <div className="space-y-2">
        <label
          htmlFor="umkmName"
          className="text-sm font-medium text-foreground"
        >
          Nama Toko UMKM
        </label>
        <div className="relative">
          <Store className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            id="umkmName"
            type="text"
            placeholder="Nama toko UMKM Anda"
            value={formData.umkmName}
            onChange={(e) =>
              setFormData({
                ...formData,
                umkmName: e.target.value,
              })
            }
            className="pl-12 h-12 bg-muted/50 border-[#F99912]/10 focus:border-[#F99912]/50 rounded-xl"
            required
          />
        </div>
      </div>

      {/* Category Selection */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">
          Kategori Usaha (Pilih satu atau lebih)
        </label>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((category) => {
            const isSelected = formData.umkmCategory.includes(category);
            return (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setFormData({
                    ...formData,
                    umkmCategory: isSelected
                      ? formData.umkmCategory.filter((cat) => cat !== category)
                      : [...formData.umkmCategory, category],
                  });
                }}
                className={`p-3 cursor-pointer rounded-xl border transition-all text-sm capitalize flex items-center gap-2 ${
                  isSelected
                    ? "bg-[#F99912]/10 border-[#F99912]/50"
                    : "bg-muted/30 border-[#F99912]/10 hover:border-[#F99912]/30"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                    isSelected
                      ? "bg-[#F99912] border-[#F99912]"
                      : "border-[#F99912]/30"
                  }`}
                >
                  {isSelected && (
                    <svg className="w-3 h-3 text-[#283238]" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
                      />
                    </svg>
                  )}
                </div>
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Store Photo Upload */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Foto Toko</label>
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#F99912]/20 rounded-xl cursor-pointer hover:bg-[#F99912]/5 hover:border-[#F99912]/40 transition-all">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {formData.storePhoto ? (
              <>
                <FileText className="w-8 h-8 text-[#F99912] mb-2" />
                <p className="text-sm text-foreground">
                  {formData.storePhoto.name}
                </p>
              </>
            ) : (
              <>
                <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Klik untuk upload atau drag & drop
                </p>
                <p className="text-xs text-muted-foreground">
                  JPG, PNG (Max 5MB)
                </p>
              </>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            accept=".jpg,.jpeg,.png"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setFormData({
                  ...formData,
                  storePhoto: e.target.files[0],
                });
              }
            }}
          />
        </label>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label
          htmlFor="umkmDescription"
          className="text-sm font-medium text-foreground"
        >
          Deskripsi Usaha
        </label>
        <textarea
          id="umkmDescription"
          placeholder="Ceritakan tentang usaha Anda..."
          value={formData.umkmDescription}
          onChange={(e) =>
            setFormData({
              ...formData,
              umkmDescription: e.target.value,
            })
          }
          className="w-full min-h-28 px-4 py-3 rounded-xl bg-muted/50 border border-[#F99912]/10 focus:border-[#F99912]/50 focus:outline-none resize-none text-foreground placeholder:text-muted-foreground"
          required
        />
      </div>

      {/* Owner Phone */}
      <div className="space-y-2">
        <label
          htmlFor="ownerPhone"
          className="text-sm font-medium text-foreground"
        >
          Nomor Telepon Pemilik
        </label>
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            id="ownerPhone"
            type="tel"
            placeholder="081234567890"
            value={formData.ownerPhone}
            onChange={(e) =>
              setFormData({
                ...formData,
                ownerPhone: e.target.value,
              })
            }
            className="pl-12 h-12 bg-muted/50 border-[#F99912]/10 focus:border-[#F99912]/50 rounded-xl"
            required
          />
        </div>
      </div>

      {/* Owner Address */}
      <div className="space-y-2">
        <label
          htmlFor="ownerAddress"
          className="text-sm font-medium text-foreground"
        >
          Alamat Usaha
        </label>
        <div className="relative">
          <MapPin className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
          <textarea
            id="ownerAddress"
            placeholder="Jl. Contoh No. 123, Kelurahan, Kecamatan, Bogor"
            value={formData.ownerAddress}
            onChange={(e) =>
              setFormData({
                ...formData,
                ownerAddress: e.target.value,
              })
            }
            className="pl-12 w-full min-h-24 px-4 py-3 rounded-xl bg-muted/50 border border-[#F99912]/10 focus:border-[#F99912]/50 focus:outline-none resize-none text-foreground placeholder:text-muted-foreground"
            required
          />
        </div>
      </div>

      {/* Business Document Upload */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Upload Dokumen Usaha (KTP/SIUP/NIB)
        </label>
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#F99912]/20 rounded-xl cursor-pointer hover:bg-[#F99912]/5 hover:border-[#F99912]/40 transition-all">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {formData.businessDocument ? (
              <>
                <FileText className="w-8 h-8 text-[#F99912] mb-2" />
                <p className="text-sm text-foreground">
                  {formData.businessDocument.name}
                </p>
              </>
            ) : (
              <>
                <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Klik untuk upload atau drag & drop
                </p>
                <p className="text-xs text-muted-foreground">
                  PDF, JPG, PNG (Max 5MB)
                </p>
              </>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setFormData({
                  ...formData,
                  businessDocument: e.target.files[0],
                });
              }
            }}
          />
        </label>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-12 bg-linear-to-r cursor-pointer from-[#F99912] to-[#9ACD32] hover:from-[#F99912]/90 hover:to-[#9ACD32]/90 text-[#283238] font-semibold rounded-xl shadow-none hover:scale-[1.02] transition-all duration-300"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            Daftar UMKM
            <ArrowRight className="ml-2 w-5 h-5" />
          </>
        )}
      </Button>
    </form>
  );
};

export default UmkmRegistration;
