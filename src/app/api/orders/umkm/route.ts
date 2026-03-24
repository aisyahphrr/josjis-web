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

    // Get all order items for this UMKM seller
    const orderItems = await prisma.orderItem.findMany({
      where: {
        sellerId: session.user.id,
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
            delivery: {
              select: {
                id: true,
                status: true,
                driverId: true,
                driver: {
                  select: {
                    id: true,
                    name: true,
                    phone: true,
                  },
                },
              },
            },
          },
        },
        product: {
          select: {
            id: true,
            name: true,
            priceInIdr: true,
          },
        },
      },
      orderBy: {
        order: {
          createdAt: "desc",
        },
      },
    });

    // Group by order for better readability
    const ordersMap = new Map();

    orderItems.forEach((item) => {
      if (!ordersMap.has(item.orderId)) {
        ordersMap.set(item.orderId, {
          id: item.order.id,
          orderNumber: `ORD-${item.order.id.substring(0, 8).toUpperCase()}`,
          customer: item.order.buyer.name,
          customerPhone: item.order.buyer.phone,
          total: item.order.totalAmountInIdr,
          status: item.order.status,
          date: item.order.createdAt.toISOString().split("T")[0],
          deliveryStatus: item.order.delivery?.status || "WAITING_DRIVER",
          driverName: item.order.delivery?.driver?.name,
          driverPhone: item.order.delivery?.driver?.phone,
          items: [],
        });
      }

      const order = ordersMap.get(item.orderId);
      order.items.push({
        id: item.id,
        productName: item.product.name,
        quantity: item.quantity,
        unitPrice: item.unitPriceInIdr,
        subtotal: item.subtotalInIdr,
      });
    });

    const orders = Array.from(ordersMap.values());

    return NextResponse.json({
      success: true,
      orders,
      total: orders.length,
    });
  } catch (error) {
    console.error("Error fetching UMKM orders:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch orders",
      },
      { status: 500 },
    );
  }
}
