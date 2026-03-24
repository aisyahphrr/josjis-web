import { getServerSession } from "next-auth";
import { authOptions } from "@/src/server/auth/config";
import { prisma } from "@/src/server/db/client";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get driver's active deliveries (WAITING_DRIVER, ASSIGNED, PICKED_UP, ON_THE_WAY)
    const activeDeliveries = await prisma.delivery.findMany({
      where: {
        OR: [
          { status: "WAITING_DRIVER" }, // Available for all drivers
          { driverId: session.user.id }, // Assigned to this driver
        ],
      },
      include: {
        order: {
          include: {
            buyer: {
              select: {
                id: true,
                name: true,
                phone: true,
              },
            },
            items: {
              include: {
                product: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      deliveries: activeDeliveries,
    });
  } catch (error) {
    console.error("Error fetching driver deliveries:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch deliveries",
      },
      { status: 500 },
    );
  }
}

// Driver accepts/takes an order
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { deliveryId, action } = await request.json();

    if (!deliveryId || !action) {
      return NextResponse.json(
        { error: "deliveryId and action required" },
        { status: 400 },
      );
    }

    if (action === "accept") {
      // Update delivery to assign to this driver
      const updatedDelivery = await prisma.delivery.update({
        where: { id: deliveryId },
        data: {
          driverId: session.user.id,
          status: "ASSIGNED",
        },
        include: {
          order: {
            include: {
              buyer: true,
              items: {
                include: {
                  product: true,
                },
              },
            },
          },
        },
      });

      // Update order status to PROCESSING
      await prisma.order.update({
        where: { id: updatedDelivery.orderId },
        data: { status: "PROCESSING" },
      });

      return NextResponse.json({
        success: true,
        delivery: updatedDelivery,
        message: "Pesanan diterima. Mohon ambil pesanan dari UMKM",
      });
    } else if (action === "pickup") {
      // Driver picked up the order
      const updatedDelivery = await prisma.delivery.update({
        where: { id: deliveryId },
        data: {
          status: "PICKED_UP",
          pickedUpAt: new Date(),
        },
        include: {
          order: {
            include: {
              buyer: true,
              items: {
                include: {
                  product: true,
                },
              },
            },
          },
        },
      });

      return NextResponse.json({
        success: true,
        delivery: updatedDelivery,
        message: "Pesanan berhasil diambil. Mulai pengiriman",
      });
    } else if (action === "deliver") {
      // Driver delivered the order
      const updatedDelivery = await prisma.delivery.update({
        where: { id: deliveryId },
        data: {
          status: "DELIVERED",
          deliveredAt: new Date(),
        },
        include: {
          order: {
            include: {
              buyer: true,
              items: {
                include: {
                  product: true,
                },
              },
            },
          },
        },
      });

      // Update order to DELIVERED and payment to PAID
      await prisma.order.update({
        where: { id: updatedDelivery.orderId },
        data: {
          status: "DELIVERED",
          paymentStatus: "PAID",
        },
      });

      return NextResponse.json({
        success: true,
        delivery: updatedDelivery,
        message: "Pesanan berhasil dikirim",
      });
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error updating delivery:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update delivery",
      },
      { status: 500 },
    );
  }
}
