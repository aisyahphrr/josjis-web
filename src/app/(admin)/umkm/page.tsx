import { prisma } from "@/src/server/db/client";
import AdminUmkmPage from "@/src/components/views/admin/umkm/page";
import { UmkmRecord } from "@/src/lib/dummyData";

export default async function AdminUmkmRoutePage() {
  const umkmUsers = await prisma.user.findMany({
    where: { role: "UMKM" },
    include: { umkmProfile: true }
  });

  const umkmRecords: UmkmRecord[] = umkmUsers.map(u => {
    const p = u.umkmProfile;

    return {
      id: u.id,
      name: p?.businessName || u.name,
      ownerName: u.name,
      email: u.email,
      phone: u.phone || "-",
      address: p?.address || "-",
      productType: p?.productType || "Produk Lokal",
      description: p?.description || "-",
      category: p?.category || "Lainnya",
      ktpUrl: p?.ktpUrl || "",
      businessLicenseUrl: p?.businessLicenseUrl || "",
      otherDocumentUrls: p?.otherDocumentUrls || [],
      productCount: p?.totalProducts || 0,
      rating: p?.ratingAverage || 0,
      totalSales: p?.totalSales || 0,
      approvalStatus: p?.verifiedAt ? "approved" : "pending",
      createdAt: u.createdAt.toISOString()
    };
  });

  return <AdminUmkmPage initialUmkm={umkmRecords} />;
}