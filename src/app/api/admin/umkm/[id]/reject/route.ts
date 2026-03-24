import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/server/auth/config";
import { prisma } from "@/src/server/db/client";
import { generateRejectionLink } from "@/src/server/notifications/whatsapp";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { reason } = await request.json();

    if (!reason || typeof reason !== "string") {
      return NextResponse.json(
        { message: "Alasan penolakan wajib diisi" },
        { status: 400 },
      );
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

    // Update UMKM profile status to REJECTED
    await prisma.umkmProfile.update({
      where: { userId: umkmId },
      data: {
        approvalStatus: "REJECTED",
        rejectionReason: reason.trim(),
      },
    });

    // Generate wa.me link
    let waLink = null;
    if (umkmUser.phone) {
      waLink = generateRejectionLink({
        phone: umkmUser.phone,
        businessName: umkmUser.umkmProfile.businessName,
        reason: reason.trim(),
      });
    }

    return NextResponse.json({
      success: true,
      message: "UMKM berhasil ditolak",
      waLink, // Return wa.me link for admin to open
      phone: umkmUser.phone,
    });
  } catch (error) {
    console.error("Error rejecting UMKM:", error);
    return NextResponse.json(
      {
        message: "Gagal menolak UMKM",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
