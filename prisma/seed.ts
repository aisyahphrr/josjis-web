import { PrismaClient, UserRole, VehicleType } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function main() {
  const defaultPasswordHash = await hash("Password123!", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@sadaya.local" },
    update: {},
    create: {
      email: "admin@sadaya.local",
      passwordHash: defaultPasswordHash,
      name: "Admin Sadaya",
      role: UserRole.ADMIN,
      adminProfile: {
        create: {
          title: "Super Admin",
        },
      },
    },
  });

  const buyer = await prisma.user.upsert({
    where: { email: "user@sadaya.local" },
    update: {},
    create: {
      email: "user@sadaya.local",
      passwordHash: defaultPasswordHash,
      name: "User Bogor",
      role: UserRole.USER,
      customerProfile: {
        create: {
          defaultAddress: "Jl. Pajajaran No. 10, Bogor",
          preferredRegion: "Bogor Tengah",
        },
      },
    },
  });

  const seller = await prisma.user.upsert({
    where: { email: "umkm@sadaya.local" },
    update: {},
    create: {
      email: "umkm@sadaya.local",
      passwordHash: defaultPasswordHash,
      name: "UMKM Sangkuriang",
      role: UserRole.UMKM,
      umkmProfile: {
        create: {
          businessName: "Lapis Talas Sangkuriang",
          businessSlug: "lapis-talas-sangkuriang",
          description: "UMKM oleh-oleh khas Bogor dengan fokus pada produk talas premium.",
          city: "Bogor",
          district: "Bogor Tengah",
          address: "Jl. Siliwangi No. 12, Bogor",
        },
      },
    },
  });

  await prisma.user.upsert({
    where: { email: "driver@sadaya.local" },
    update: {},
    create: {
      email: "driver@sadaya.local",
      passwordHash: defaultPasswordHash,
      name: "Driver Sadaya",
      role: UserRole.DRIVER,
      driverProfile: {
        create: {
          vehicleType: VehicleType.MOTORBIKE,
          licensePlate: "F 1234 SAD",
          currentCity: "Bogor",
        },
      },
    },
  });

  const product = await prisma.product.upsert({
    where: { slug: "lapis-talas-bogor-sangkuriang" },
    update: {},
    create: {
      sellerId: seller.id,
      name: "Lapis Talas Bogor Sangkuriang",
      slug: "lapis-talas-bogor-sangkuriang",
      description: "Lapis talas premium dengan tekstur lembut dan rasa khas Bogor.",
      priceInIdr: 85000,
      stock: 24,
      imageUrl: "/placeholder.jpg",
      isFeatured: true,
    },
  });

  await prisma.article.upsert({
    where: { slug: "strategi-umkm-bogor-go-digital" },
    update: {},
    create: {
      authorId: admin.id,
      slug: "strategi-umkm-bogor-go-digital",
      title: "Strategi UMKM Bogor Go Digital di Era Marketplace Lokal",
      excerpt: "Panduan singkat untuk UMKM Bogor yang ingin tumbuh lewat penjualan digital.",
      coverImage: "/placeholder.jpg",
      content:
        "Artikel seed awal untuk menguji alur admin ke user. Nantinya konten ini bisa diganti lewat panel admin academy.",
      status: "PUBLISHED",
      publishedAt: new Date(),
    },
  });

  let order = await prisma.order.findFirst({
    where: {
      buyerId: buyer.id,
      items: {
        some: {
          productId: product.id,
        },
      },
    },
  });

  if (!order) {
    order = await prisma.order.create({
      data: {
        buyerId: buyer.id,
        status: "PAID",
        paymentStatus: "PAID",
        totalAmountInIdr: product.priceInIdr,
        shippingAddress: "Jl. Pajajaran No. 10, Bogor",
        items: {
          create: {
            productId: product.id,
            sellerId: seller.id,
            quantity: 1,
            unitPriceInIdr: product.priceInIdr,
            subtotalInIdr: product.priceInIdr,
          },
        },
      },
    });
  }

  await prisma.chatThread.upsert({
    where: {
      id: `${buyer.id}-${seller.id}-seed`,
    },
    update: {},
    create: {
      id: `${buyer.id}-${seller.id}-seed`,
      buyerId: buyer.id,
      sellerId: seller.id,
      orderId: order.id,
      lastMessageAt: new Date(),
      messages: {
        create: [
          {
            senderId: buyer.id,
            body: "Halo seller, apakah produk ini ready hari ini?",
          },
          {
            senderId: seller.id,
            body: "Halo, siap kak. Bisa langsung diproses hari ini juga.",
          },
        ],
      },
    },
  });

  console.log("Seed selesai. Login awal:");
  console.log("admin@sadaya.local / Password123!");
  console.log("user@sadaya.local / Password123!");
  console.log("umkm@sadaya.local / Password123!");
  console.log("driver@sadaya.local / Password123!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
