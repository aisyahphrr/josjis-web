"use client";

import { useRouter } from "next/navigation";
import { LeftSide } from "@/src/components/views/auth/Login/LeftSide";
import RightSide from "@/src/components/views/auth/Login/RightSide";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex">
      <LeftSide />
      <RightSide />
    </div>
  );
}
