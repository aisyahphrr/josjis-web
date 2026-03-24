import { getServerSession } from "next-auth";
import { authOptions } from "@/src/server/auth/config";
import { prisma } from "@/src/server/db/client";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const cartItems = await prisma.cart.findMany({
      where: { userId: session.user.id },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            priceInIdr: true,
            stock: true,
            imageUrl: true,
            slug: true,
            seller: {
              select: {
                id: true,
                name: true,
                umkmProfile: {
                  select: {
                    businessName: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const formatted = cartItems.map((item) => ({
      id: item.id,
      productId: item.productId,
      quantity: item.quantity,
      product: {
        id: item.product.id,
        name: item.product.name,
        priceInIdr: item.product.priceInIdr,
        stock: item.product.stock,
        imageUrl: item.product.imageUrl,
        slug: item.product.slug,
        seller: {
          id: item.product.seller.id,
          name: item.product.seller.name,
          businessName:
            item.product.seller.umkmProfile?.businessName || "Unknown",
        },
      },
      subtotal: item.product.priceInIdr * item.quantity,
    }));

    const total = formatted.reduce((sum, item) => sum + item.subtotal, 0);

    return NextResponse.json({
      success: true,
      items: formatted,
      total,
      itemCount: formatted.length,
    });
  } catch (error) {
    console.error("Failed to fetch cart:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch cart" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId, quantity = 1, action } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID required" },
        { status: 400 },
      );
    }

    // Verify product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (action === "add") {
      // Add or update quantity
      const existing = await prisma.cart.findUnique({
        where: {
          userId_productId: {
            userId: session.user.id,
            productId,
          },
        },
      });

      if (existing) {
        await prisma.cart.update({
          where: { id: existing.id },
          data: { quantity: existing.quantity + quantity },
        });
      } else {
        await prisma.cart.create({
          data: {
            userId: session.user.id,
            productId,
            quantity,
          },
        });
      }

      return NextResponse.json({
        success: true,
        message: "Added to cart",
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Failed to add to cart:", error);
    return NextResponse.json(
      { success: false, message: "Failed to add to cart" },
      { status: 500 },
    );
  }
}
