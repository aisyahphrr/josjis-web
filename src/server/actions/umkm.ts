"use server";

import { prisma } from "@/src/server/db/client";
import { revalidatePath } from "next/cache";

export async function approveUmkm(userId: string) {
  try {
    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: { isActive: true }
      }),
      prisma.umkmProfile.update({
        where: { userId },
        data: { verifiedAt: new Date() }
      })
    ]);
    
    // Generate a random token simulation
    const token = `JOSJIS-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    revalidatePath("/validasi");
    revalidatePath("/umkm");
    
    return { success: true, token };
  } catch (error) {
    console.error("Error approving UMKM:", error);
    return { success: false, error: "Gagal menyetujui UMKM." };
  }
}

export async function rejectUmkm(userId: string, reason: string) {
  try {
    // We update the umkmProfile to status "rejected" 
    // and store the reason, so they get a specific error on login!
    await prisma.umkmProfile.update({
      where: { userId },
      data: {
        status: "rejected",
        rejectionReason: reason
      }
    });

    revalidatePath("/validasi");
    
    return { success: true };
  } catch (error) {
    console.error("Error rejecting UMKM:", error);
    return { success: false, error: "Gagal menolak UMKM." };
  }
}
