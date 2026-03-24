"use client";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { useToast } from "@/src/hooks/use-toast";
import { DASHBOARD_HOME_BY_ROLE } from "@/src/server/auth/roles";
import { UserRole } from "@prisma/client";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
} from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type LoginErrors = {
  email?: string;
  password?: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateLogin(email: string, password: string): LoginErrors {
  const errors: LoginErrors = {};

  if (!email.trim()) {
    errors.email = "Email masih kosong. Isi dulu ya.";
  } else if (!emailRegex.test(email)) {
    errors.email = "Format email belum valid. Coba cek lagi.";
  }

  if (!password.trim()) {
    errors.password = "Password belum diisi.";
  } else if (password.length < 8) {
    errors.password = "Password minimal 8 karakter supaya lebih aman.";
  }

  return errors;
}

export function LeftSide() {
  const router = useRouter();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showResendVerification, setShowResendVerification] = useState(false);
  const [isResendingVerification, setIsResendingVerification] = useState(false);
  const [shakeForm, setShakeForm] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<LoginErrors>({});

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

  const updateField = (field: "email" | "password", value: string) => {
    const nextData = { ...formData, [field]: value };
    setFormData(nextData);
    setErrors(validateLogin(nextData.email, nextData.password));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowResendVerification(false);

    const nextErrors = validateLogin(formData.email, formData.password);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      triggerShake();
      toast({
        title: "Cek lagi form login",
        description: "Masih ada data yang perlu dirapikan sebelum lanjut.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        try {
          const userResponse = await fetch("/api/auth/check-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: formData.email }),
          });

          if (userResponse.ok) {
            const userData = await userResponse.json();

            if (userData.exists) {
              const { role, approvalStatus } = userData;

              if (
                (role === UserRole.UMKM || role === UserRole.DRIVER) &&
                approvalStatus === "PENDING"
              ) {
                toast({
                  title: "Akun masih menunggu persetujuan",
                  description: `Akun ${role === UserRole.UMKM ? "UMKM" : "driver"} kamu masih direview admin.`,
                  variant: "destructive",
                });
                setIsLoading(false);
                return;
              }

              if (
                (role === UserRole.UMKM || role === UserRole.DRIVER) &&
                approvalStatus === "REJECTED"
              ) {
                toast({
                  title: "Permohonan belum disetujui",
                  description: `Status akun ${role === UserRole.UMKM ? "UMKM" : "driver"} kamu ditolak. Coba hubungi admin ya.`,
                  variant: "destructive",
                });
                setIsLoading(false);
                return;
              }
            }
          }
        } catch (err) {
          console.error("Error checking email:", err);
        }

        toast({
          title: "Login gagal",
          description: "Email atau password belum cocok. Coba cek lagi ya.",
          variant: "destructive",
        });
        triggerShake();
        setIsLoading(false);
        return;
      }

      if (result?.ok) {
        const newSession = await fetch("/api/auth/session").then((res) =>
          res.json(),
        );

        if (newSession?.user?.role) {
          const userRole = newSession.user.role as UserRole;

          toast({
            title: "Login berhasil",
            description: "Selamat datang kembali di Sadaya.",
            variant: "default",
          });
          router.push(DASHBOARD_HOME_BY_ROLE[userRole]);
        } else {
          router.push("/dashboard-user");
        }
      }
    } catch (err) {
      toast({
        title: "Ada kendala saat login",
        description: "Coba beberapa saat lagi ya.",
        variant: "destructive",
      });
      triggerShake();
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!formData.email) {
      toast({
        title: "Masukkan email dulu",
        description: "Kami butuh email kamu untuk kirim ulang verifikasi.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsResendingVerification(true);
      const response = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast({
          title: "Gagal kirim ulang verifikasi",
          description: data.message || "Coba lagi sebentar lagi ya.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Email verifikasi terkirim",
          description: "Silakan cek inbox atau folder spam kamu.",
          variant: "default",
        });
        setShowResendVerification(false);
      }
    } catch (err) {
      toast({
        title: "Endpoint verifikasi belum tersedia",
        description: "Coba lagi nanti atau hubungi admin.",
        variant: "destructive",
      });
    } finally {
      setIsResendingVerification(false);
    }
  };

  const emailValid = formData.email.length > 0 && !errors.email;

  return (
    <div className="flex items-center justify-center p-5 sm:p-8 lg:p-10">
      <div
        className={`w-full max-w-xl animate-auth-enter ${shakeForm ? "animate-auth-shake" : ""}`}
      >
        <div className="rounded-[28px] border border-[#FF6500]/12 bg-white/92 p-6 shadow-[0_24px_70px_rgba(146,82,30,0.14)] backdrop-blur-xl sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-[#FF6500]/12 bg-white px-4 py-2 text-sm font-medium text-[#4A3425] transition-all duration-300 hover:border-[#FF6500]/30 hover:text-[#FF6500]"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali
            </Link>
            <div className="rounded-full bg-[#FFF2E7] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#CC561E]">
              Login
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
              Masuk dan lanjutkan perjalananmu
            </h1>
            <p className="mt-3 text-sm leading-6 text-[#6B5A4E] sm:text-base">
              Akses marketplace, poin loyalti, dan ruang belajar Sadaya dalam
              satu langkah yang terasa lebih rapi dan nyaman.
            </p>
          </div>

          <div className="mb-6 grid gap-3 rounded-[24px] border border-[#F6CE71]/55 bg-[linear-gradient(135deg,rgba(255,245,225,0.95),rgba(246,206,113,0.28))] p-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/90 p-3 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#CC561E]">
                Akses cepat
              </p>
              <p className="mt-1 text-sm font-medium text-[#2D2118]">
                Login dalam beberapa detik
              </p>
            </div>
            <div className="rounded-2xl bg-white/90 p-3 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#CC561E]">
                Aman
              </p>
              <p className="mt-1 text-sm font-medium text-[#2D2118]">
                Input aktif dengan feedback realtime
              </p>
            </div>
            <div className="rounded-2xl bg-white/90 p-3 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#CC561E]">
                Nyaman
              </p>
              <p className="mt-1 text-sm font-medium text-[#2D2118]">
                Fokus ke form tanpa tampilan berat
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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
                  disabled={isLoading}
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
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-[#2D2118]"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-[#CC561E] transition-colors hover:text-[#FF6500]"
                >
                  Lupa password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#B08B73]" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password kamu"
                  value={formData.password}
                  onChange={(e) => updateField("password", e.target.value)}
                  className={`h-14 rounded-2xl border bg-[#FFFDFC] pl-12 pr-12 text-[#2D2118] placeholder:text-[#A38B7A] transition-all duration-300 focus-visible:border-[#FF6500] focus-visible:ring-[3px] focus-visible:ring-[#FF6500]/18 ${
                    errors.password
                      ? "border-[#E85B52] focus-visible:border-[#E85B52] focus-visible:ring-[#E85B52]/15"
                      : "border-[#E7D7C4]"
                  }`}
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8D7364] transition-colors hover:text-[#FF6500]"
                  disabled={isLoading}
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
                    Gunakan password yang familiar tapi tetap aman.
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
                    Memproses login...
                  </>
                ) : (
                  <>
                    Masuk ke Sadaya
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </span>
            </Button>

            {showResendVerification && (
              <div className="rounded-[22px] border border-[#FFD4A4] bg-[#FFF7EB] p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#CC561E]" />
                  <div className="flex-1">
                    <p className="font-semibold text-[#2D2118]">
                      Email belum diverifikasi
                    </p>
                    <p className="mt-1 text-sm leading-6 text-[#6B5A4E]">
                      Klik kirim ulang supaya kamu bisa lanjut login tanpa
                      bingung.
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  onClick={handleResendVerification}
                  disabled={isResendingVerification}
                  className="mt-4 h-11 w-full rounded-2xl bg-[#2D2118] text-white transition-all duration-300 hover:bg-[#1F1610] cursor-pointer"
                >
                  {isResendingVerification ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Kirim ulang email verifikasi"
                  )}
                </Button>
              </div>
            )}

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
              disabled={isLoading}
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
              Masuk dengan Google
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-[#6B5A4E]">
            Belum punya akun?{" "}
            <Link
              href="/register"
              className="font-semibold text-[#FF6500] transition-colors hover:text-[#CC561E]"
            >
              Daftar sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
