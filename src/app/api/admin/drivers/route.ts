import { prisma } from "@/src/server/db/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const drivers = await prisma.user.findMany({
      where: {
        role: "DRIVER",
      },
      include: {
        driverProfile: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedDrivers = drivers.map((driver) => {
      const approvalStatus = (
        driver.driverProfile?.approvalStatus || "PENDING"
      ).toLowerCase();
      return {
        id: driver.id,
        name: driver.name,
        email: driver.email,
        phone: driver.phone || "",
        address: driver.driverProfile?.currentCity || "",
        createdAt: driver.createdAt,
        approvalStatus: approvalStatus,
        rejectionReason: driver.driverProfile?.rejectionReason || "",
        status:
          approvalStatus === "approved"
            ? "active"
            : approvalStatus === "rejected"
              ? "suspended"
              : "pending",
        vehicleType: driver.driverProfile?.vehicleType || "",
        licenseNumber: driver.driverProfile?.licensePlate || "",
        ktpUrl: "",
        driverLicenseUrl: "",
        otherDocumentUrls: [],
        role: "driver",
      };
    });

    return NextResponse.json({ success: true, drivers: formattedDrivers });
  } catch (error) {
    console.error("Failed to fetch drivers:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch drivers" },
      { status: 500 },
    );
  }
}
