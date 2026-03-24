import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/server/auth/config";
import { prisma } from "@/src/server/db/client";
import { generateApprovalLink } from "@/src/server/notifications/whatsapp";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id: umkmId } = await params;

    const umkmUser = await prisma.user.findUnique({
      where: { id: umkmId },
      include: { umkmProfile: true },
    });

    if (!umkmUser || !umkmUser.umkmProfile) {
      return NextResponse.json(
        { message: "UMKM tidak ditemukan" },
        { status: 404 },
      );
    }

    // Update multiple fields for approval
    await prisma.$transaction([
      prisma.user.update({
        where: { id: umkmId },
        data: { isActive: true },
      }),
      prisma.umkmProfile.update({
        where: { userId: umkmId },
        data: {
          approvalStatus: "APPROVED",
          verifiedAt: new Date(),
        },
      }),
    ]);

    // Generate wa.me link
    let waLink = null;
    if (umkmUser.phone) {
      waLink = generateApprovalLink({
        phone: umkmUser.phone,
        businessName: umkmUser.umkmProfile.businessName,
      });
    }

    const token = `JOSJIS-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    return NextResponse.json({
      success: true,
      message: "UMKM berhasil disetujui",
      token,
      waLink, // Return wa.me link for admin to open
      phone: umkmUser.phone,
    });
  } catch (error) {
    console.error("Error approving UMKM:", error);
    return NextResponse.json(
      {
        message: "Gagal menyetujui UMKM",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
