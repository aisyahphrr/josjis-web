import { prisma } from "@/src/server/db/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const umkmList = await prisma.user.findMany({
      where: {
        role: "UMKM",
        umkmProfile: {
          approvalStatus: "APPROVED",
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
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
            ratingAverage: true,
            totalProducts: true,
            approvalStatus: true,
          },
        },
        products: {
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
            priceInIdr: true,
            stock: true,
            imageUrl: true,
            isFeatured: true,
          },
          orderBy: {
            createdAt: "desc",
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
      businessName: umkm.umkmProfile?.businessName || "",
      businessSlug: umkm.umkmProfile?.businessSlug || "",
      description: umkm.umkmProfile?.description || "",
      category: umkm.umkmProfile?.category || "Lainnya",
      city: umkm.umkmProfile?.city || "",
      district: umkm.umkmProfile?.district || "",
      address: umkm.umkmProfile?.address || "",
      rating: umkm.umkmProfile?.ratingAverage || 0,
      totalProducts: umkm.umkmProfile?.totalProducts || 0,
      products: umkm.products,
    }));

    return NextResponse.json({
      success: true,
      data: formattedUmkm,
      total: formattedUmkm.length,
    });
  } catch (error) {
    console.error("Failed to fetch approved UMKM:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch UMKM data" },
      { status: 500 },
    );
  }
}
