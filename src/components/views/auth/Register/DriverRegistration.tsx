"use client";

import { useState } from "react";
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

type DriverFormData = {
  name: string;
  email: string;
  password: string;
  vehicleType: "mobil" | "motor" | "";
  vehicleMerk: string;
  licensePlate: string;
  ktpPhoto: File | null;
  simPhoto: File | null;
  stnkPhoto: File | null;
  filePhoto: File | null;
  vehiclePhoto: File | null;
};

interface DriverRegistrationProps {
  initialData?: Partial<DriverFormData>;
  onBack?: () => void;
}

const DriverRegistration = ({
  initialData,
  onBack,
}: DriverRegistrationProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<DriverFormData>({
    name: initialData?.name || "",
    email: initialData?.email || "",
    password: initialData?.password || "",
    vehicleType: "",
    vehicleMerk: "",
    licensePlate: "",
    ktpPhoto: null,
    simPhoto: null,
    stnkPhoto: null,
    filePhoto: null,
    vehiclePhoto: null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Vehicle Type Selection */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">
          Jenis Kendaraan
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { id: "mobil", label: "Mobil", icon: Car },
            { id: "motor", label: "Motor", icon: Bike },
          ].map((vehicle) => (
            <button
              key={vehicle.id}
              type="button"
              onClick={() =>
                setFormData({
                  ...formData,
                  vehicleType: vehicle.id as "mobil" | "motor",
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
          {formData.vehicleType && (
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                Foto SIM {formData.vehicleType === "mobil" ? "A" : "C"}
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
          )}

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
