"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Upload,
  FileText,
  Car,
  Bike,
  X,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { DASHBOARD_HOME_BY_ROLE } from "@/src/server/auth/roles";
import { UserRole } from "@prisma/client";
import { useToast } from "@/src/hooks/use-toast";

type DriverFormData = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  city?: string;
  vehicleType: "MOTORBIKE" | "CAR" | "VAN" | "PICKUP" | "";
  vehicleMerk: string;
  licensePlate: string;
  ktpPhoto: File | null;
  simPhoto: File | null;
  stnkPhoto: File | null;
  filePhoto: File | null;
  vehiclePhoto: File | null;
  skckPhoto: File | null;
};

interface DriverRegistrationProps {
  initialData?: Partial<DriverFormData>;
  onBack?: () => void;
}

const DriverRegistration = ({
  initialData,
  onBack,
}: DriverRegistrationProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<DriverFormData>({
    name: initialData?.name || "",
    email: initialData?.email || "",
    password: initialData?.password || "",
    phone: "",
    address: "",
    city: "",
    vehicleType: "",
    vehicleMerk: "",
    licensePlate: "",
    ktpPhoto: null,
    simPhoto: null,
    stnkPhoto: null,
    filePhoto: null,
    vehiclePhoto: null,
    skckPhoto: null,
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

    if (!formData.vehicleType) {
      toast({
        title: "Tipe Kendaraan Diperlukan",
        description: "Tipe kendaraan wajib dipilih",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const payload: any = {
        role: UserRole.DRIVER,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        vehicleType: formData.vehicleType,
      };

      // Hanya tambahkan field opsional jika ada value
      if (formData.phone?.trim()) payload.phone = formData.phone;
      if (formData.address?.trim()) payload.address = formData.address;
      if (formData.city?.trim()) payload.city = formData.city;
      if (formData.licensePlate?.trim())
        payload.licensePlate = formData.licensePlate;

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        let errorDescription = data.message || "Gagal mendaftar driver";

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
                      : field === "vehicleType"
                        ? "Tipe Kendaraan"
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

      // Berhasil, redirect ke dashboard driver
      router.push(DASHBOARD_HOME_BY_ROLE[UserRole.DRIVER]);
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

      {/* Phone Number */}
      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium text-foreground">
          Nomor Telepon
        </label>
        <Input
          id="phone"
          type="tel"
          placeholder="Contoh: 081234567890"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="h-12 bg-muted/50 border-[#F99912]/10 focus:border-[#F99912]/50 rounded-xl"
          required
        />
      </div>

      {/* Address */}
      <div className="space-y-2">
        <label
          htmlFor="address"
          className="text-sm font-medium text-foreground"
        >
          Alamat Lengkap
        </label>
        <Input
          id="address"
          type="text"
          placeholder="Masukkan alamat domisili saat ini"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          className="h-12 bg-muted/50 border-[#F99912]/10 focus:border-[#F99912]/50 rounded-xl"
          required
        />
      </div>

      {/* Vehicle Type Selection */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">
          Jenis Kendaraan
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { id: "CAR", label: "Mobil", icon: Car },
            { id: "MOTORBIKE", label: "Motor", icon: Bike },
          ].map((vehicle) => (
            <button
              key={vehicle.id}
              type="button"
              onClick={() =>
                setFormData({
                  ...formData,
                  vehicleType: vehicle.id as "MOTORBIKE" | "CAR",
                })
              }
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                formData.vehicleType === vehicle.id
                  ? "bg-[#F99912]/10 border-[#F99912]/50"
                  : "bg-muted/30 border-[#F99912]/10 hover:border-[#F99912]/30"
              }`}
            >
              <vehicle.icon
                className={`w-6 h-6 ${
                  formData.vehicleType === vehicle.id
                    ? "text-[#F99912]"
                    : "text-muted-foreground"
                }`}
              />
              <span className="text-sm font-medium">{vehicle.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Vehicle Merk */}
      <div className="space-y-2">
        <label
          htmlFor="vehicleMerk"
          className="text-sm font-medium text-foreground"
        >
          Merk Kendaraan
        </label>
        <Input
          id="vehicleMerk"
          type="text"
          placeholder="Contoh: Toyota, Honda, Yamaha"
          value={formData.vehicleMerk}
          onChange={(e) =>
            setFormData({
              ...formData,
              vehicleMerk: e.target.value,
            })
          }
          className="h-12 bg-muted/50 border-[#F99912]/10 focus:border-[#F99912]/50 rounded-xl"
          required
        />
      </div>

      {/* License Plate */}
      <div className="space-y-2">
        <label
          htmlFor="licensePlate"
          className="text-sm font-medium text-foreground"
        >
          Nomor Plat Kendaraan
        </label>
        <Input
          id="licensePlate"
          type="text"
          placeholder="Contoh: B 1234 ABC"
          value={formData.licensePlate}
          onChange={(e) =>
            setFormData({
              ...formData,
              licensePlate: e.target.value.toUpperCase(),
            })
          }
          className="h-12 bg-muted/50 border-[#F99912]/10 focus:border-[#F99912]/50 rounded-xl uppercase"
          required
        />
      </div>

      {/* Document Uploads for Driver */}
      <div className="pt-4 border-t border-[#F99912]/10">
        <p className="text-sm font-medium text-foreground mb-4">
          Dokumen Pendukung
        </p>

        <div className="grid grid-cols-2 gap-4">
          {/* KTP Photo */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              Foto KTP
            </label>
            <label className="flex items-center justify-center w-full h-24 border-2 border-dashed border-[#F99912]/20 rounded-lg cursor-pointer hover:bg-[#F99912]/5 hover:border-[#F99912]/40 transition-all">
              {formData.ktpPhoto ? (
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#F99912]" />
                  <span className="text-xs text-foreground">
                    {formData.ktpPhoto.name}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setFormData({
                        ...formData,
                        ktpPhoto: null,
                      });
                    }}
                    className="cursor-pointer"
                  >
                    <X className="w-4 h-4 text-destructive" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="w-5 h-5 text-muted-foreground mb-1" />
                  <p className="text-xs text-muted-foreground">Upload KTP</p>
                </div>
              )}
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setFormData({
                      ...formData,
                      ktpPhoto: e.target.files[0],
                    });
                  }
                }}
              />
            </label>
          </div>

          {/* SIM Photo - Dynamic based on vehicle type */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              Foto SIM{" "}
              {formData.vehicleType === "CAR"
                ? "A"
                : formData.vehicleType === "MOTORBIKE"
                  ? "C"
                  : ""}
            </label>
            <label className="flex items-center justify-center w-full h-24 border-2 border-dashed border-[#F99912]/20 rounded-lg cursor-pointer hover:bg-[#F99912]/5 hover:border-[#F99912]/40 transition-all">
              {formData.simPhoto ? (
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#F99912]" />
                  <span className="text-xs text-foreground">
                    {formData.simPhoto.name}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setFormData({
                        ...formData,
                        simPhoto: null,
                      });
                    }}
                    className="cursor-pointer"
                  >
                    <X className="w-4 h-4 text-destructive" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="w-5 h-5 text-muted-foreground mb-1" />
                  <p className="text-xs text-muted-foreground">Upload SIM</p>
                </div>
              )}
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setFormData({
                      ...formData,
                      simPhoto: e.target.files[0],
                    });
                  }
                }}
              />
            </label>
          </div>

          {/* STNK Photo */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              Foto STNK
            </label>
            <label className="flex items-center justify-center w-full h-24 border-2 border-dashed border-[#F99912]/20 rounded-lg cursor-pointer hover:bg-[#F99912]/5 hover:border-[#F99912]/40 transition-all">
              {formData.stnkPhoto ? (
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#F99912]" />
                  <span className="text-xs text-foreground">
                    {formData.stnkPhoto.name}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setFormData({
                        ...formData,
                        stnkPhoto: null,
                      });
                    }}
                    className="cursor-pointer"
                  >
                    <X className="w-4 h-4 text-destructive" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="w-5 h-5 text-muted-foreground mb-1" />
                  <p className="text-xs text-muted-foreground">Upload STNK</p>
                </div>
              )}
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setFormData({
                      ...formData,
                      stnkPhoto: e.target.files[0],
                    });
                  }
                }}
              />
            </label>
          </div>

          {/* File Photo (Asuransi/Dokumen) */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              Foto File (Asuransi/Dokumen)
            </label>
            <label className="flex items-center justify-center w-full h-24 border-2 border-dashed border-[#F99912]/20 rounded-lg cursor-pointer hover:bg-[#F99912]/5 hover:border-[#F99912]/40 transition-all">
              {formData.filePhoto ? (
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#F99912]" />
                  <span className="text-xs text-foreground">
                    {formData.filePhoto.name}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setFormData({
                        ...formData,
                        filePhoto: null,
                      });
                    }}
                    className="cursor-pointer"
                  >
                    <X className="w-4 h-4 text-destructive" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="w-5 h-5 text-muted-foreground mb-1" />
                  <p className="text-xs text-muted-foreground">Upload File</p>
                </div>
              )}
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setFormData({
                      ...formData,
                      filePhoto: e.target.files[0],
                    });
                  }
                }}
              />
            </label>
          </div>

          {/* SKCK Photo */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              Foto SKCK
            </label>
            <label className="flex items-center justify-center w-full h-24 border-2 border-dashed border-[#F99912]/20 rounded-lg cursor-pointer hover:bg-[#F99912]/5 hover:border-[#F99912]/40 transition-all">
              {formData.skckPhoto ? (
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#F99912]" />
                  <span className="text-xs text-foreground truncate max-w-[80px]">
                    {formData.skckPhoto.name}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setFormData({
                        ...formData,
                        skckPhoto: null,
                      });
                    }}
                    className="cursor-pointer"
                  >
                    <X className="w-4 h-4 text-destructive" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="w-5 h-5 text-muted-foreground mb-1" />
                  <p className="text-xs text-muted-foreground">Upload SKCK</p>
                </div>
              )}
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setFormData({
                      ...formData,
                      skckPhoto: e.target.files[0],
                    });
                  }
                }}
              />
            </label>
          </div>
          {/* Vehicle Photo */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              Foto Kendaraan
            </label>
            <label className="flex items-center justify-center w-full h-24 border-2 border-dashed border-[#F99912]/20 rounded-lg cursor-pointer hover:bg-[#F99912]/5 hover:border-[#F99912]/40 transition-all">
              {formData.vehiclePhoto ? (
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#F99912]" />
                  <span className="text-xs text-foreground">
                    {formData.vehiclePhoto.name}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setFormData({
                        ...formData,
                        vehiclePhoto: null,
                      });
                    }}
                    className="cursor-pointer"
                  >
                    <X className="w-4 h-4 text-destructive" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="w-5 h-5 text-muted-foreground mb-1" />
                  <p className="text-xs text-muted-foreground">
                    Upload Kendaraan
                  </p>
                </div>
              )}
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setFormData({
                      ...formData,
                      vehiclePhoto: e.target.files[0],
                    });
                  }
                }}
              />
            </label>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex-1 h-12 border-[#F99912]/20 hover:bg-[#F99912]/5 rounded-xl cursor-pointer"
        >
          Kembali
        </Button>

        <Button
          type="submit"
          disabled={isLoading}
          className="flex-1 h-12 bg-linear-to-r from-[#F99912] to-[#9ACD32] hover:from-[#F99912]/90 hover:to-[#9ACD32]/90 text-[#283238] font-semibold rounded-xl shadow-none hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Daftar
              <ArrowRight className="ml-2 w-5 h-5" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default DriverRegistration;
