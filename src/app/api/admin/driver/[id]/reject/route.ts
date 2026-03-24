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

    const { id: driverId } = await params;

    const driverUser = await prisma.user.findUnique({
      where: { id: driverId },
      include: { driverProfile: true },
    });

    if (!driverUser || !driverUser.driverProfile) {
      return NextResponse.json(
        { message: "Driver tidak ditemukan" },
        { status: 404 },
      );
    }

    // Update driver profile status to REJECTED
    await prisma.driverProfile.update({
      where: { userId: driverId },
      data: {
        approvalStatus: "REJECTED",
        rejectionReason: reason.trim(),
      },
    });

    // Generate wa.me link
    let waLink = null;
    if (driverUser.phone) {
      waLink = generateRejectionLink({
        phone: driverUser.phone,
        businessName: driverUser.name,
        reason: reason.trim(),
      });
    }

    return NextResponse.json({
      success: true,
      message: "Driver berhasil ditolak",
      waLink, // Return wa.me link for admin to open
      phone: driverUser.phone,
    });
  } catch (error) {
    console.error("Error rejecting driver:", error);
    return NextResponse.json(
      {
        message: "Gagal menolak driver",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
