"use client";

import { LeftSide } from "@/src/components/views/auth/Login/LeftSide";
import RightSide from "@/src/components/views/auth/Login/RightSide";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#FFFDF8_0%,#FFF4DA_56%,#F6CE71_100%)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,101,0,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(204,86,30,0.15),transparent_30%)]" />
      <div className="absolute -left-20 top-16 h-64 w-64 rounded-full bg-[#FF6500]/18 blur-3xl" />
      <div className="absolute bottom-10 right-0 h-80 w-80 rounded-full bg-[#F6CE71]/55 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/70 bg-white/88 shadow-[0_32px_90px_rgba(120,65,20,0.18)] backdrop-blur-xl lg:grid-cols-[1.05fr_0.95fr]">
          <RightSide />
          <LeftSide />
        </div>
      </div>
    </div>
  );
}
