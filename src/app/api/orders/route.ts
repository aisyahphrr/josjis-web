import { getServerSession } from "next-auth";
import { authOptions } from "@/src/server/auth/config";
import { prisma } from "@/src/server/db/client";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Verify buyer still exists in the database (safeguard against stale sessions)
    const existingBuyer = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!existingBuyer) {
      return NextResponse.json(
        { message: "Akun tidak ditemukan. Silakan login ulang." },
        { status: 401 },
      );
    }

    const {
      items,
      totalAmountInIdr,
      shippingAddress,
      notes,
      paymentMethod,
      paymentProvider,
    } = await request.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ message: "Items required" }, { status: 400 });
    }

    if (
      !totalAmountInIdr ||
      !shippingAddress ||
      shippingAddress.trim() === ""
    ) {
      return NextResponse.json(
        { message: "Total amount and shipping address required" },
        { status: 400 },
      );
    }

    // Validate and prepare items beforehand to ensure strong foreign keys
    const validatedItems = [];
    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
        select: { sellerId: true, priceInIdr: true },
      });

      if (!product) {
        return NextResponse.json(
          { message: "Beberapa produk tidak ditemukan di database" },
          { status: 400 },
        );
      }

      validatedItems.push({
        productId: item.productId,
        sellerId: product.sellerId, // Enforce real database ID
        quantity: item.quantity,
        unitPriceInIdr: item.unitPriceInIdr,
        subtotalInIdr: item.subtotalInIdr,
      });
    }

    // Create order with delivery
    const order = await prisma.order.create({
      data: {
        buyerId: session.user.id,
        totalAmountInIdr,
        shippingAddress,
        notes,
        status: "PENDING",
        paymentStatus: "UNPAID",
        items: {
          create: validatedItems,
        },
        // Create associated delivery with WAITING_DRIVER status
        delivery: {
          create: {
            status: "WAITING_DRIVER",
            dropoffAddress: shippingAddress,
          },
        },
      },
      include: {
        items: {
          include: {
            product: true,
            seller: true,
          },
        },
        buyer: true,
        delivery: true,
      },
    });

    // Create Midtrans Transaction
    const { snap } = await import("@/src/lib/midtrans");

    // Ensure buyer name exists
    const customerName = session.user.name || "Customer";

    // Mapping items for Midtrans
    const itemDetails = items.map((item: any) => ({
      id: String(item.productId),
      price: Math.round(item.unitPriceInIdr),
      quantity: item.quantity,
      name: (item.productName || `Product ${item.productId}`).substring(0, 48), // limit name length for Midtrans
    }));

    const parameter = {
      transaction_details: {
        order_id: String(order.id),
        gross_amount: Math.round(totalAmountInIdr),
      },
      item_details: itemDetails,
      customer_details: {
        first_name: customerName,
        email: session.user.email || undefined,
        billing_address: {
          address: shippingAddress,
        },
      },
    };

    const transaction = await snap.createTransaction(parameter);

    return NextResponse.json({
      success: true,
      order,
      token: transaction.token,
      message: "Pesanan berhasil dibuat, silakan lanjutkan pembayaran",
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to create order",
      },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get buyer's orders
    const orders = await prisma.order.findMany({
      where: { buyerId: session.user.id },
      include: {
        items: {
          include: {
            product: true,
            seller: true,
          },
        },
        payment: true,
        delivery: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch orders" },
      { status: 500 },
    );
  }
}
