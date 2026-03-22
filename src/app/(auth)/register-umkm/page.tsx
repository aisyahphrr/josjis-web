"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import UmkmRegistration from "@/src/components/views/auth/Register/UmkmRegistration";

const RegisterUmkmPage = () => {
  const router = useRouter();
  const [registrationData, setRegistrationData] = useState<{
    name: string;
    email: string;
    password: string;
    umkmName: string;
    umkmDescription: string;
  } | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("registrationData");
    if (stored) {
      try {
        setRegistrationData(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse registration data", e);
      }
    }
  }, []);

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="w-full max-w-5xl py-8">
        <Link href="/" className="flex items-center gap-2 mb-8 group">
          <div className="relative w-12 h-12 rounded-xl bg-linear-to-br from-[#F99912] to-[#9ACD32] p-0.5 transition-shadow duration-300 group-hover:shadow-[0_12px_30px_rgba(40,50,56,0.10)]">
            <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-[#F99912]" />
            </div>
          </div>
          <span className="text-2xl font-bold bg-linear-to-r from-[#F99912] to-[#9ACD32] bg-clip-text text-transparent">
            SADAYA
          </span>
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Informasi UMKM Anda
          </h1>
          <p className="text-muted-foreground">
            Lengkapi data toko dan produk Anda untuk tampil di direktori SADAYA
          </p>
        </div>

        <UmkmRegistration initialData={registrationData || undefined} />
      </div>
    </div>
  );
};

export default RegisterUmkmPage;
