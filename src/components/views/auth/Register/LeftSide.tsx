"use client";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { useToast } from "@/src/hooks/use-toast";
import { DASHBOARD_HOME_BY_ROLE } from "@/src/server/auth/roles";
import { UserRole } from "@prisma/client";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  ShoppingBag,
  Store,
  Truck,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Role = "user" | "umkm" | "driver";

type RegisterErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const roles = [
  {
    id: "user" as Role,
    title: "Customer",
    subtitle: "Belanja dan kumpulkan Daya Poin",
    icon: ShoppingBag,
    accent: "from-[#FF6500] to-[#F6CE71]",
    badge: "Mulai cepat",
  },
  {
    id: "umkm" as Role,
    title: "UMKM",
    subtitle: "Buka etalase dan tumbuh di Sadaya",
    icon: Store,
    accent: "from-[#CC561E] to-[#FF6500]",
    badge: "Paling populer",
  },
  {
    id: "driver" as Role,
    title: "Driver",
    subtitle: "Bantu pengiriman lebih rapi dan cepat",
    icon: Truck,
    accent: "from-[#F6CE71] to-[#CC561E]",
    badge: "Mobilitas",
  },
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateRegister(
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
): RegisterErrors {
  const errors: RegisterErrors = {};

  if (!name.trim()) {
    errors.name = "Nama lengkap masih kosong.";
  } else if (name.trim().length < 2) {
    errors.name = "Nama minimal 2 karakter ya.";
  }

  if (!email.trim()) {
    errors.email = "Email belum diisi.";
  } else if (!emailRegex.test(email)) {
    errors.email = "Format email belum valid.";
  }

  if (!password.trim()) {
    errors.password = "Password belum diisi.";
  } else if (password.length < 8) {
    errors.password = "Password minimal 8 karakter.";
  } else if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    errors.password = "Password sebaiknya mengandung huruf dan angka.";
  }

  if (!confirmPassword.trim()) {
    errors.confirmPassword = "Konfirmasi password masih kosong.";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Konfirmasi password belum sama.";
  }

  return errors;
}

const LeftSide = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState<Role>("user");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shakeForm, setShakeForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    umkmName: "",
    umkmDescription: "",
    document: null as File | null,
  });
  const [errors, setErrors] = useState<RegisterErrors>({});

  useEffect(() => {
    const role = searchParams.get("role");
    if (role && ["user", "umkm", "driver"].includes(role)) {
      setSelectedRole(role as Role);
    }
  }, [searchParams]);

  const passwordStrength =
    formData.password.length >= 10 &&
    /[A-Za-z]/.test(formData.password) &&
    /\d/.test(formData.password)
      ? "kuat"
      : formData.password.length >= 8
        ? "cukup"
        : "lemah";

  const triggerShake = () => {
    setShakeForm(false);
    requestAnimationFrame(() => setShakeForm(true));
    setTimeout(() => setShakeForm(false), 400);
  };

  const updateField = (
    field: "name" | "email" | "password" | "confirmPassword",
    value: string,
  ) => {
    const nextData = { ...formData, [field]: value };
    setFormData(nextData);
    setErrors(
      validateRegister(
        nextData.name,
        nextData.email,
        nextData.password,
        nextData.confirmPassword,
      ),
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors = validateRegister(
      formData.name,
      formData.email,
      formData.password,
      formData.confirmPassword,
    );
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      triggerShake();
      toast({
        title: "Form belum siap",
        description: "Masih ada data yang perlu diperbaiki sebelum lanjut.",
        variant: "destructive",
      });
      return;
    }

    if (selectedRole === "umkm") {
      sessionStorage.setItem("registrationData", JSON.stringify(formData));
      toast({
        title: "Lanjut ke data UMKM",
        description: "Kita lanjutkan ke detail bisnis kamu dulu ya.",
        variant: "default",
      });
      router.push("/register-umkm");
      return;
    }

    if (selectedRole === "driver") {
      sessionStorage.setItem("registrationData", JSON.stringify(formData));
      toast({
        title: "Lanjut ke data driver",
        description: "Isi data operasional supaya prosesnya lengkap.",
        variant: "default",
      });
      router.push("/register-driver");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: UserRole.USER,
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        let errorDescription = data.message || "Registrasi belum berhasil.";

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
                      : field;
              return `${fieldLabel}: ${messages.join(", ")}`;
            })
            .join("\n");
          if (errorMessages) {
            errorDescription = errorMessages;
          }
        }

        toast({
          title: "Registrasi gagal",
          description: errorDescription,
          variant: "destructive",
        });
        triggerShake();
        setIsLoading(false);
        return;
      }

      toast({
        title: "Registrasi berhasil",
        description: "Akun kamu sudah siap dipakai. Selamat datang di Sadaya.",
        variant: "default",
      });
      router.push(DASHBOARD_HOME_BY_ROLE[UserRole.USER]);
    } catch (err) {
      toast({
        title: "Ada kendala saat mendaftar",
        description: "Coba beberapa saat lagi ya.",
        variant: "destructive",
      });
      triggerShake();
      setIsLoading(false);
    }
  };

  const roleSummary =
    selectedRole === "user"
      ? "Buat akun dan langsung mulai eksplor belanja."
      : selectedRole === "umkm"
        ? "Siapkan toko dan lanjutkan ke detail bisnis."
        : "Lanjut isi data driver dan operasional pengiriman.";

  const emailValid = formData.email.length > 0 && !errors.email;

  return (
    <div className="flex items-center justify-center p-5 sm:p-8 lg:p-10">
      <div
        className={`w-full max-w-xl animate-auth-enter ${shakeForm ? "animate-auth-shake" : ""}`}
      >
        <div className="rounded-[28px] border border-[#FF6500]/12 bg-white/92 p-6 shadow-[0_24px_70px_rgba(146,82,30,0.14)] backdrop-blur-xl sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-full border border-[#FF6500]/12 bg-white px-4 py-2 text-sm font-medium text-[#4A3425] transition-all duration-300 hover:border-[#FF6500]/30 hover:text-[#FF6500]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
            <div className="rounded-full bg-[#FFF2E7] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#CC561E]">
              Register
            </div>
          </div>

          <div className="mb-8 text-center">
            <Link href="/" className="inline-flex flex-col items-center gap-4">
              <div className="animate-auth-enter rounded-[24px] border border-[#FF6500]/12 bg-[linear-gradient(180deg,#FFFFFF_0%,#FFF6E8_100%)] p-4 shadow-[0_18px_45px_rgba(255,101,0,0.14)]">
                <Image
                  src="/sadaya-logo-ver2.svg"
                  alt="Sadaya"
                  width={172}
                  height={64}
                  className="h-14 w-auto object-contain"
                  priority
                />
              </div>
            </Link>
            <h1 className="mt-6 text-3xl font-bold text-[#2D2118] sm:text-4xl">
              Buat akun baru yang terasa lebih jelas
            </h1>
            <p className="mt-3 text-sm leading-6 text-[#6B5A4E] sm:text-base">
              Pilih peranmu, isi data inti, lalu lanjut ke alur yang paling pas
              buat kebutuhan kamu di Sadaya.
            </p>
          </div>

          <div className="mb-6 rounded-[24px] border border-[#F6CE71]/55 bg-[linear-gradient(135deg,rgba(255,245,225,0.95),rgba(246,206,113,0.28))] p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#CC561E]">
                Pilih Peran
              </p>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#2D2118] shadow-sm">
                {roles.find((role) => role.id === selectedRole)?.badge}
              </span>
            </div>

            <div className="grid gap-3">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={`group rounded-[22px] border p-4 text-left transition-all duration-300 cursor-pointer ${
                    selectedRole === role.id
                      ? "border-[#FF6500]/35 bg-white shadow-[0_16px_34px_rgba(255,101,0,0.14)]"
                      : "border-white/70 bg-white/70 hover:border-[#FF6500]/22 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`rounded-2xl bg-gradient-to-br ${role.accent} p-[1px] shadow-sm`}
                    >
                      <div className="rounded-2xl bg-white p-3">
                        <role.icon
                          className={`h-5 w-5 ${
                            selectedRole === role.id
                              ? "text-[#FF6500]"
                              : "text-[#8D7364]"
                          }`}
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-[#2D2118]">{role.title}</p>
                      <p className="mt-1 text-sm text-[#6B5A4E]">
                        {role.subtitle}
                      </p>
                    </div>
                    <div
                      className={`h-5 w-5 rounded-full border-2 transition-all duration-300 ${
                        selectedRole === role.id
                          ? "border-[#FF6500] bg-[#FF6500]"
                          : "border-[#CBB7A7]"
                      }`}
                    >
                      {selectedRole === role.id && (
                        <CheckCircle2 className="h-5 w-5 text-white" />
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <p className="mt-4 text-sm leading-6 text-[#6B5A4E]">
              {roleSummary}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-semibold text-[#2D2118]">
                Nama lengkap
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#B08B73]" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Masukkan nama lengkap kamu"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className={`h-14 rounded-2xl border bg-[#FFFDFC] pl-12 text-[#2D2118] placeholder:text-[#A38B7A] transition-all duration-300 focus-visible:border-[#FF6500] focus-visible:ring-[3px] focus-visible:ring-[#FF6500]/18 ${
                    errors.name
                      ? "border-[#E85B52] focus-visible:border-[#E85B52] focus-visible:ring-[#E85B52]/15"
                      : "border-[#E7D7C4]"
                  }`}
                  required
                />
              </div>
              {errors.name && <p className="text-sm text-[#D34B41]">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-[#2D2118]">
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#B08B73]" />
                <Input
                  id="email"
                  type="email"
                  placeholder="contoh@domain.com"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className={`h-14 rounded-2xl border bg-[#FFFDFC] pl-12 pr-12 text-[#2D2118] placeholder:text-[#A38B7A] transition-all duration-300 focus-visible:border-[#FF6500] focus-visible:ring-[3px] focus-visible:ring-[#FF6500]/18 ${
                    errors.email
                      ? "border-[#E85B52] focus-visible:border-[#E85B52] focus-visible:ring-[#E85B52]/15"
                      : "border-[#E7D7C4]"
                  }`}
                  required
                />
                {emailValid && (
                  <CheckCircle2 className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#2FA56B]" />
                )}
              </div>
              {errors.email && (
                <p className="text-sm text-[#D34B41]">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-[#2D2118]"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#B08B73]" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Buat password yang aman"
                  value={formData.password}
                  onChange={(e) => updateField("password", e.target.value)}
                  className={`h-14 rounded-2xl border bg-[#FFFDFC] pl-12 pr-12 text-[#2D2118] placeholder:text-[#A38B7A] transition-all duration-300 focus-visible:border-[#FF6500] focus-visible:ring-[3px] focus-visible:ring-[#FF6500]/18 ${
                    errors.password
                      ? "border-[#E85B52] focus-visible:border-[#E85B52] focus-visible:ring-[#E85B52]/15"
                      : "border-[#E7D7C4]"
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8D7364] transition-colors hover:text-[#FF6500]"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              <div className="flex items-center justify-between text-sm">
                {errors.password ? (
                  <p className="text-[#D34B41]">{errors.password}</p>
                ) : (
                  <p className="text-[#7F6C60]">
                    Minimal 8 karakter, kombinasikan huruf dan angka.
                  </p>
                )}
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    passwordStrength === "kuat"
                      ? "bg-[#E9FFF3] text-[#2C8D5A]"
                      : passwordStrength === "cukup"
                        ? "bg-[#FFF2D6] text-[#C27A10]"
                        : "bg-[#FFF0EF] text-[#D34B41]"
                  }`}
                >
                  {passwordStrength}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-semibold text-[#2D2118]"
              >
                Konfirmasi password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#B08B73]" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Ulangi password kamu"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    updateField("confirmPassword", e.target.value)
                  }
                  className={`h-14 rounded-2xl border bg-[#FFFDFC] pl-12 pr-12 text-[#2D2118] placeholder:text-[#A38B7A] transition-all duration-300 focus-visible:border-[#FF6500] focus-visible:ring-[3px] focus-visible:ring-[#FF6500]/18 ${
                    errors.confirmPassword
                      ? "border-[#E85B52] focus-visible:border-[#E85B52] focus-visible:ring-[#E85B52]/15"
                      : "border-[#E7D7C4]"
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8D7364] transition-colors hover:text-[#FF6500]"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-[#D34B41]">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="relative h-14 w-full overflow-hidden rounded-2xl bg-[#FF6500] text-base font-bold text-white shadow-[0_18px_40px_rgba(255,101,0,0.28)] transition-all duration-300 hover:bg-[#CC561E] hover:scale-[1.015] active:scale-[0.985] cursor-pointer"
            >
              <span className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.18),transparent_42%,transparent_60%,rgba(255,255,255,0.14))]" />
              <span className="relative flex items-center">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Menyiapkan akun...
                  </>
                ) : (
                  <>
                    {selectedRole === "user"
                      ? "Daftar sekarang"
                      : "Lanjut ke langkah berikutnya"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </span>
            </Button>

            <div className="relative py-1">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#F0E2D1]" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#A38B7A]">
                  atau
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="h-14 w-full rounded-2xl border-[#E8D7C4] bg-white text-[#2D2118] transition-all duration-300 hover:border-[#FF6500]/40 hover:bg-[#FFF4EA] hover:text-[#2D2118] cursor-pointer"
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Daftar dengan Google
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-[#6B5A4E]">
            Sudah punya akun?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#FF6500] transition-colors hover:text-[#CC561E]"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
