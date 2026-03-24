import { auth } from "@/src/server/auth";
import { prisma } from "@/src/server/db/client";
import { NextResponse, NextRequest } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { productId: string } },
) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const cartItem = await prisma.cart.findUnique({
      where: {
        userId_productId: {
          userId: session.user.id,
          productId: params.productId,
        },
      },
    });

    if (!cartItem) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    await prisma.cart.delete({
      where: { id: cartItem.id },
    });

    return NextResponse.json({
      success: true,
      message: "Removed from cart",
    });
  } catch (error) {
    console.error("Failed to remove from cart:", error);
    return NextResponse.json(
      { success: false, message: "Failed to remove from cart" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { productId: string } },
) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { quantity } = await request.json();

    if (!quantity || quantity < 1) {
      return NextResponse.json({ error: "Invalid quantity" }, { status: 400 });
    }

    // Check stock
    const product = await prisma.product.findUnique({
      where: { id: params.productId },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (quantity > product.stock) {
      return NextResponse.json(
        { error: "Insufficient stock" },
        { status: 400 },
      );
    }

    const cartItem = await prisma.cart.findUnique({
      where: {
        userId_productId: {
          userId: session.user.id,
          productId: params.productId,
        },
      },
    });

    if (!cartItem) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    await prisma.cart.update({
      where: { id: cartItem.id },
      data: { quantity },
    });

    return NextResponse.json({
      success: true,
      message: "Cart updated",
      quantity,
    });
  } catch (error) {
    console.error("Failed to update cart:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update cart" },
      { status: 500 },
    );
  }
}
