import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Store,
  Truck,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { DASHBOARD_HOME_BY_ROLE } from "@/src/server/auth/roles";
import { UserRole } from "@prisma/client";
import { useToast } from "@/src/hooks/use-toast";

type Role = "user" | "umkm" | "driver";

const roles = [
  {
    id: "user" as Role,
    title: "User / Pembeli",
    description: "Belanja produk UMKM Bogor",
    icon: ShoppingBag,
    color: "from-[#F99912] to-[#9ACD32]",
  },
  {
    id: "umkm" as Role,
    title: "UMKM / Penjual",
    description: "Jual produk di marketplace",
    icon: Store,
    color: "from-[#F99912] to-[#9370DB]",
  },
  {
    id: "driver" as Role,
    title: "Driver",
    description: "Antar pesanan ke pembeli",
    icon: Truck,
    color: "from-[#ADBCD7] to-[#9ACD32]",
  },
];

const LeftSide = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState<Role>("user");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    // UMKM fields
    umkmName: "",
    umkmDescription: "",
    document: null as File | null,
  });

  useEffect(() => {
    const role = searchParams.get("role");
    if (role && ["user", "umkm", "driver"].includes(role)) {
      setSelectedRole(role as Role);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi password match
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Tidak Cocok",
        description: "Password dan konfirmasi password harus sama",
        variant: "destructive",
      });
      return;
    }

    if (selectedRole === "umkm") {
      // Store basic form data and redirect to umkm registration page
      sessionStorage.setItem("registrationData", JSON.stringify(formData));
      router.push("/register-umkm");
      return;
    }
    if (selectedRole === "driver") {
      // Store basic form data and redirect to driver registration page
      sessionStorage.setItem("registrationData", JSON.stringify(formData));
      router.push("/register-driver");
      return;
    }

    // Register sebagai USER
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
        let errorDescription = data.message || "Gagal mendaftar";

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

      // Berhasil, redirect ke dashboard USER
      router.push(DASHBOARD_HOME_BY_ROLE[UserRole.USER]);
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
    <>
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-md py-8">
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
              Mulai di SADAYA
            </h1>
            <p className="text-muted-foreground">
              Gabung Sadaya: pilih peran, lalu kumpulkan Daya Poin untuk mulai
              berdaya.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <>
              {/* Error handling removed - using toast instead */}

              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">
                  Pilih Role
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {roles.map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role.id)}
                      className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 text-left cursor-pointer ${
                        selectedRole === role.id
                          ? "bg-[#F99912]/10 border-[#F99912]/50 shadow-[0_0_20px_rgba(249,153,18,0.15)]"
                          : "bg-muted/30 border-[#F99912]/10 hover:border-[#F99912]/30"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl bg-linear-to-br ${role.color} p-0.5`}
                      >
                        <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                          <role.icon
                            className={`w-6 h-6 ${selectedRole === role.id ? "text-[#F99912]" : "text-muted-foreground"}`}
                          />
                        </div>
                      </div>
                      <div>
                        <p
                          className={`font-medium ${selectedRole === role.id ? "text-foreground" : "text-muted-foreground"}`}
                        >
                          {role.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {role.description}
                        </p>
                      </div>
                      <div
                        className={`ml-auto w-5 h-5 rounded-full border-2 transition-all ${
                          selectedRole === role.id
                            ? "border-[#F99912] bg-[#F99912]"
                            : "border-muted-foreground"
                        }`}
                      >
                        {selectedRole === role.id && (
                          <svg
                            className="w-full h-full text-[#283238]"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
                            />
                          </svg>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-foreground"
                >
                  Nama Lengkap
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="pl-12 h-12 bg-muted/50 border-[#F99912]/10 focus:border-[#F99912]/50 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="pl-12 h-12 bg-muted/50 border-[#F99912]/10 focus:border-[#F99912]/50 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-foreground"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Buat password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="pl-12 pr-12 h-12 bg-muted/50 border-[#F99912]/10 focus:border-[#F99912]/50 rounded-xl"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-foreground"
                >
                  Konfirmasi Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Ulangi password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="pl-12 pr-12 h-12 bg-muted/50 border-[#F99912]/10 focus:border-[#F99912]/50 rounded-xl"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-linear-to-r from-[#F99912] to-[#9ACD32] hover:from-[#F99912]/90 hover:to-[#9ACD32]/90 text-[#283238] font-semibold rounded-xl shadow-none hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {selectedRole === "umkm" ? "Lanjutkan" : "Daftar"}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#F99912]/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  atau
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full h-12 border-[#F99912]/20 hover:bg-[#F99912]/5 hover:border-[#F99912]/40 rounded-xl cursor-pointer"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
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

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Sudah punya akun?{" "}
            <Link
              href="/login"
              className="text-[#F99912] hover:underline font-medium"
            >
              Login sekarang
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LeftSide;
