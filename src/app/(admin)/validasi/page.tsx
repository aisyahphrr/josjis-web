"use client";

import { useEffect, useState } from "react";
import AdminValidasiPage from "@/src/components/views/admin/validasi/page";
import type { UmkmRecord } from "@/src/lib/dummyData";
import { TableSkeleton } from "@/src/components/views/admin/layouts/loading-skeletons";

export default function AdminValidasiRoutePage() {
  const [umkmRecords, setUmkmRecords] = useState<UmkmRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUmkm = async () => {
      try {
        const response = await fetch("/api/admin/umkm");
        if (!response.ok) throw new Error("Failed to fetch UMKM");

        const data = await response.json();
        const records: UmkmRecord[] = data.umkm
          .filter((u: any) => u.approvalStatus === "pending")
          .map((u: any) => ({
            id: u.id,
            name: u.businessName,
            ownerName: u.name,
            email: u.email,
            phone: u.phone || "-",
            address: u.address || "-",
            productType: "Produk Lokal",
            description: u.description || "-",
            category: u.category || "Umum",
            ktpUrl: "",
            businessLicenseUrl: "",
            otherDocumentUrls: [],
            productCount: u.totalProducts || 0,
            rating: u.rating || 0,
            totalSales: 0,
            approvalStatus: "pending",
            createdAt: new Date(u.createdAt).toISOString(),
          }));
        setUmkmRecords(records);
      } catch (error) {
        console.error("Error fetching UMKM:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUmkm();
  }, []);

  if (isLoading) return <TableSkeleton rows={6} />;
  return <AdminValidasiPage initialUmkm={umkmRecords} />;
}
