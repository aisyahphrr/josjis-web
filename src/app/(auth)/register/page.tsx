"use client";

import LeftSide from "@/src/components/views/auth/Register/LeftSide";
import RightSide from "@/src/components/views/auth/Register/RightSide";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

function RegisterForm() {
  return (
    <div className="min-h-screen flex">
      <LeftSide />
      <RightSide />
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#F99912]" />
        </div>
      }
    >
      <RegisterForm />
    </Suspense>
  );
}
