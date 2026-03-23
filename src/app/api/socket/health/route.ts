import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    socketUrl: process.env.NEXT_PUBLIC_SOCKET_URL ?? "http://localhost:3001",
    message: "Socket server dijalankan terpisah lewat npm run dev:socket",
  });
}
