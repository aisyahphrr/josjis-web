import { prisma } from "@/src/server/db/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const umkmList = await prisma.user.findMany({
      where: {
        role: "UMKM",
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        createdAt: true,
        umkmProfile: {
          select: {
            id: true,
            businessName: true,
            businessSlug: true,
            description: true,
            category: true,
            city: true,
            district: true,
            address: true,
            approvalStatus: true,
            rejectionReason: true,
            ratingAverage: true,
            totalProducts: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedUmkm = umkmList.map((umkm) => ({
      id: umkm.id,
      name: umkm.name,
      email: umkm.email,
      phone: umkm.phone || "",
      createdAt: umkm.createdAt,
      businessName: umkm.umkmProfile?.businessName || "",
      businessSlug: umkm.umkmProfile?.businessSlug || "",
      description: umkm.umkmProfile?.description || "",
      category: umkm.umkmProfile?.category || "Lainnya",
      city: umkm.umkmProfile?.city || "",
      district: umkm.umkmProfile?.district || "",
      address: umkm.umkmProfile?.address || "",
      approvalStatus: (
        umkm.umkmProfile?.approvalStatus || "PENDING"
      ).toLowerCase(),
      rejectionReason: umkm.umkmProfile?.rejectionReason || "",
      rating: umkm.umkmProfile?.ratingAverage || 0,
      totalProducts: umkm.umkmProfile?.totalProducts || 0,
      status:
        umkm.umkmProfile?.approvalStatus === "APPROVED"
          ? "active"
          : umkm.umkmProfile?.approvalStatus === "REJECTED"
            ? "suspended"
            : "pending",
      role: "umkm",
    }));

    return NextResponse.json({
      success: true,
      umkm: formattedUmkm,
    });
  } catch (error) {
    console.error("Failed to fetch UMKM:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch UMKM data" },
      { status: 500 },
    );
  }
}
