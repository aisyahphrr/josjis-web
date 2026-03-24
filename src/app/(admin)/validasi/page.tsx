import { prisma } from "@/src/server/db/client";
import AdminValidasiPage from "@/src/components/views/admin/validasi/page";
import { UmkmRecord } from "@/src/lib/dummyData";

export default async function AdminValidasiRoutePage() {
  const umkmUsers = await prisma.user.findMany({
    where: { role: "UMKM" },
    include: { umkmProfile: true },
  });

  const umkmRecords: UmkmRecord[] = umkmUsers.map((u) => {
    const p = u.umkmProfile;

    return {
      id: u.id,
      name: p?.businessName || u.name,
      ownerName: u.name,
      email: u.email,
      phone: u.phone || "-",
      address: p?.address || "-",
      productType: "Produk Lokal",
      description: p?.description || "-",
      category: "Umum",
      ktpUrl: "",
      businessLicenseUrl: "",
      otherDocumentUrls: [],
      productCount: p?.totalProducts || 0,
      rating: p?.ratingAverage || 0,
      totalSales: 0,
      approvalStatus:
        p?.approvalStatus === "REJECTED"
          ? "rejected"
          : p?.verifiedAt
            ? "approved"
            : "pending",
      createdAt: u.createdAt.toISOString(),
    };
  });

  return <AdminValidasiPage initialUmkm={umkmRecords} />;
}
