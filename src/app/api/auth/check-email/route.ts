import { NextResponse } from "next/server";
import { prisma } from "@/src/server/db/client";
import { UserRole } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email diperlukan" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        emailVerified: true,
        role: true,
        umkmProfile: {
          select: { approvalStatus: true },
        },
        driverProfile: {
          select: { approvalStatus: true },
        },
      },
    });

    if (!user) {
      return NextResponse.json({
        exists: false,
        emailVerified: false,
      });
    }

    const response: any = {
      exists: true,
      emailVerified: user.emailVerified ?? false,
      role: user.role,
    };

    // Add approval status for UMKM and DRIVER
    if (user.role === UserRole.UMKM && user.umkmProfile) {
      response.approvalStatus = user.umkmProfile.approvalStatus;
    } else if (user.role === UserRole.DRIVER && user.driverProfile) {
      response.approvalStatus = user.driverProfile.approvalStatus;
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error checking email:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan saat memeriksa email" },
      { status: 500 },
    );
  }
}
