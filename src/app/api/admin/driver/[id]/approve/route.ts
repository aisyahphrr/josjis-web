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

    // Update multiple fields for approval
    await prisma.$transaction([
      prisma.user.update({
        where: { id: driverId },
        data: { isActive: true },
      }),
      prisma.driverProfile.update({
        where: { userId: driverId },
        data: {
          approvalStatus: "APPROVED",
          verifiedAt: new Date(),
        },
      }),
    ]);

    // Generate wa.me link
    let waLink = null;
    if (driverUser.phone) {
      waLink = generateApprovalLink({
        phone: driverUser.phone,
        businessName: driverUser.name,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Driver berhasil disetujui",
      waLink, // Return wa.me link for admin to open
      phone: driverUser.phone,
    });
  } catch (error) {
    console.error("Error approving driver:", error);
    return NextResponse.json(
      {
        message: "Gagal menyetujui driver",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
