"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, Mail, Lock, Sparkles, ArrowRight, Loader2 } from "lucide-react"

// Demo credentials
const DEMO_USERS = {
  "user@josjis.com": { password: "user123", role: "user", redirect: "/dashboard/user" },
  "umkm@josjis.com": { password: "umkm123", role: "umkm", redirect: "/dashboard/umkm" },
  "admin@josjis.com": { password: "admin123", role: "admin", redirect: "/dashboard/admin" },
  "driver@josjis.com": { password: "driver123", role: "driver", redirect: "/dashboard/driver" },
}

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const user = DEMO_USERS[formData.email.toLowerCase() as keyof typeof DEMO_USERS]
    
    if (user && user.password === formData.password) {
      // Store user role in localStorage for demo
      localStorage.setItem("josjis_user", JSON.stringify({ 
        email: formData.email, 
        role: user.role 
      }))
      router.push(user.redirect)
    } else {
      setError("Email atau password salah")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-8 group">
            <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-[#F99912] to-[#64762C] p-0.5 group-hover:shadow-[0_0_20px_rgba(249,153,18,0.5)] transition-shadow duration-300">
              <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-[#F99912]" />
              </div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-[#F99912] to-[#64762C] bg-clip-text text-transparent">
              JOSJIS
            </span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Selamat Datang!</h1>
            <p className="text-muted-foreground">
              Masuk ke akun Anda untuk melanjutkan
            </p>
          </div>

          {/* Demo Credentials Info */}
          <div className="mb-6 p-4 rounded-xl bg-[#F99912]/10 border border-[#F99912]/20">
            <p className="text-sm font-medium text-[#F99912] mb-2">Demo Credentials:</p>
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div>User: user@josjis.com</div>
              <div>Pass: user123</div>
              <div>UMKM: umkm@josjis.com</div>
              <div>Pass: umkm123</div>
              <div>Admin: admin@josjis.com</div>
              <div>Pass: admin123</div>
              <div>Driver: driver@josjis.com</div>
              <div>Pass: driver123</div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="nama@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-12 h-12 bg-muted/50 border-[#F99912]/10 focus:border-[#F99912]/50 rounded-xl"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </label>
                <Link href="/forgot-password" className="text-sm text-[#F99912] hover:underline">
                  Lupa password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-12 pr-12 h-12 bg-muted/50 border-[#F99912]/10 focus:border-[#F99912]/50 rounded-xl"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-[#F99912] to-[#64762C] hover:from-[#F99912]/90 hover:to-[#64762C]/90 text-[#181612] font-semibold rounded-xl shadow-[0_0_30px_rgba(249,153,18,0.3)] hover:shadow-[0_0_40px_rgba(249,153,18,0.5)] transition-all duration-300"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Login
                  <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#F99912]/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">atau</span>
              </div>
            </div>

            {/* Google Login */}
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 border-[#F99912]/20 hover:bg-[#F99912]/5 hover:border-[#F99912]/40 rounded-xl"
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
              Login dengan Google
            </Button>
          </form>

          {/* Register Link */}
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Belum punya akun?{" "}
            <Link href="/register" className="text-[#F99912] hover:underline font-medium">
              Daftar sekarang
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-8 relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F99912]/20 via-[#64762C]/10 to-[#424F17]/20" />
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#F99912]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-[#64762C]/20 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(249,153,18,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(249,153,18,0.3) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-md text-center">
          <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-[#F99912] to-[#64762C] p-0.5 mb-8 shadow-[0_0_50px_rgba(249,153,18,0.3)]">
            <div className="w-full h-full rounded-3xl bg-background flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-[#F99912]" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Jelajahi UMKM Bogor
          </h2>
          <p className="text-muted-foreground text-pretty">
            Platform marketplace dengan gamification dan AI untuk mendukung ekonomi kreatif Bogor.
          </p>
        </div>
      </div>
    </div>
  )
}
