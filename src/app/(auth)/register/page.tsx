"use client";

import LeftSide from "@/src/components/views/auth/Register/LeftSide";
import RightSide from "@/src/components/views/auth/Register/RightSide";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

function RegisterForm() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#FFFDF8_0%,#FFF4DA_56%,#F6CE71_100%)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,101,0,0.16),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(204,86,30,0.16),transparent_32%)]" />
      <div className="absolute -right-16 top-20 h-72 w-72 rounded-full bg-[#FF6500]/16 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-[#F6CE71]/55 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/70 bg-white/88 shadow-[0_32px_90px_rgba(120,65,20,0.18)] backdrop-blur-xl lg:grid-cols-[1.05fr_0.95fr]">
          <RightSide />
          <LeftSide />
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(180deg,#FFFDF8_0%,#FFF4DA_56%,#F6CE71_100%)]">
          <Loader2 className="w-8 h-8 animate-spin text-[#FF6500]" />
        </div>
      }
    >
      <RegisterForm />
    </Suspense>
  );
}
