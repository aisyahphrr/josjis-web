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
          description:
            "UMKM oleh-oleh khas Bogor dengan fokus pada produk talas premium.",
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
      description:
        "Lapis talas premium dengan tekstur lembut dan rasa khas Bogor.",
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
      excerpt:
        "Panduan singkat untuk UMKM Bogor yang ingin tumbuh lewat penjualan digital.",
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

  // Seed 10 UMKM yang sudah APPROVED
  const umkmData = [
    {
      email: "umkm.talas@sadaya.local",
      name: "Siti Nurhaliza",
      businessName: "Toko Talas Sangkuriang",
      category: "Makanan",
      description:
        "Oleh-oleh talas premium khas Bogor dengan tekstur lembut dan rasa istimewa.",
      city: "Bogor",
      district: "Bogor Tengah",
      address: "Jl. Siliwangi No. 12, Bogor",
    },
    {
      email: "umkm.biscuit@sadaya.local",
      name: "Bambang Wijaya",
      businessName: "Biscuit Luwak Bogor Heritage",
      category: "Jasa",
      description:
        "Biscuit premium dengan ekstrak luwak asli Bogor, renyah dan lezat.",
      city: "Bogor",
      district: "Bogor Timur",
      address: "Jl. Ahmad Yani No. 45, Bogor",
    },
    {
      email: "umkm.kopi@sadaya.local",
      name: "Indah Kusuma",
      businessName: "Kopi Sintetis Bogor Premium",
      category: "Jasa",
      description:
        "Kopi pilihan dari kebun Bogor dengan cita rasa yang autentik dan nikmat.",
      city: "Bogor",
      district: "Bogor Barat",
      address: "Jl. Sudirman No. 78, Bogor",
    },
    {
      email: "umkm.batik@sadaya.local",
      name: "Eka Prasetyo",
      businessName: "Batik Bogor Asli",
      category: "Pakaian",
      description:
        "Kain batik motif Bogor asli, dibuat dengan tenun tradisional dan pewarna alami.",
      city: "Bogor",
      district: "Bogor Selatan",
      address: "Jl. Gatot Subroto No. 23, Bogor",
    },
    {
      email: "umkm.keramik@sadaya.local",
      name: "Rudi Hermawan",
      businessName: "Keramik Bogor Craft",
      category: "Kerajinan",
      description:
        "Keramik handmade berkualitas tinggi, setiap pesan unik dan berkelas.",
      city: "Bogor",
      district: "Bogor Utara",
      address: "Jl. Merdeka No. 56, Bogor",
    },
    {
      email: "umkm.dodol@sadaya.local",
      name: "Nur Azizah",
      businessName: "Dodol Karakan Khas Bogor",
      category: "Makanan",
      description:
        "Dodol tradisional Bogor dengan resep turun temurun, empuk dan nikmat.",
      city: "Bogor",
      district: "Bogor Tengah",
      address: "Jl. Pajajaran No. 89, Bogor",
    },
    {
      email: "umkm.bolu@sadaya.local",
      name: "Sinta Wijaya",
      businessName: "Kue Bolu Gulung Bogor Mama",
      category: "Makanan",
      description:
        "Bolu gulung premium dengan berbagai varian rasa, dibuat fresh setiap hari.",
      city: "Bogor",
      district: "Bogor Timur",
      address: "Jl. Flamboyan No. 34, Bogor",
    },
    {
      email: "umkm.teh@sadaya.local",
      name: "Ahmad Suryanto",
      businessName: "Teh Herbal Gunung Salak",
      category: "Jasa",
      description:
        "Teh herbal organik dari Gunung Salak, menyehatkan dan segar alami.",
      city: "Bogor",
      district: "Bogor Barat",
      address: "Jl. Kapten Muslihin No. 67, Bogor",
    },
    {
      email: "umkm.snack@sadaya.local",
      name: "Dewi Lestari",
      businessName: "Makanan Ringan Ibu Siti",
      category: "Makanan",
      description:
        "Makanan ringan gurih dan manis, dibuat dengan resep rahasia keluarga.",
      city: "Bogor",
      district: "Bogor Selatan",
      address: "Jl. Cipto No. 12, Bogor",
    },
    {
      email: "umkm.tas@sadaya.local",
      name: "Hendra Gunawan",
      businessName: "Tas Tangguh Bogor Handmade",
      category: "Pakaian",
      description:
        "Tas kulit handmade berkualitas premium, tahan lama dan stylish untuk berbagai acara.",
      city: "Bogor",
      district: "Bogor Utara",
      address: "Jl. Raya Bogor No. 101, Bogor",
    },
  ];

  const productNames = [
    {
      names: [
        "Lapis Talas Original",
        "Lapis Talas Coklat",
        "Lapis Talas Keju",
        "Lapis Talas Pandan",
        "Lapis Talas Strawberry",
        "Lapis Talas Greentea",
        "Lapis Talas Vanila",
        "Lapis Talas Taro",
        "Lapis Talas Moka",
        "Lapis Talas Lemon",
        "Lapis Talas Matcha",
        "Lapis Talas Cappuccino",
        "Lapis Talas Tiramisu",
      ],
      prices: [
        85000, 90000, 95000, 88000, 92000, 98000, 86000, 92000, 98000, 89000,
        100000, 95000, 105000,
      ],
    },
    {
      names: [
        "Biscuit Luwak Coklat",
        "Biscuit Luwak Karamell",
        "Biscuit Luwak Almond",
        "Biscuit Luwak Cashew",
        "Biscuit Luwak Keju",
        "Biscuit Luwak Moka",
        "Biscuit Luwak Strawberry",
        "Biscuit Luwak Greentea",
        "Biscuit Luwak Caramel Popcorn",
        "Biscuit Luwak Premium Assorted",
        "Biscuit Luwak Edisi Bogor",
      ],
      prices: [
        75000, 78000, 82000, 85000, 79000, 88000, 81000, 86000, 84000, 120000,
        95000,
      ],
    },
    {
      names: [
        "Kopi Singkong Bogor",
        "Kopi Arabika Bogor",
        "Kopi Robusta Premium",
        "Kopi Blend Signature",
        "Kopi Medium Roast",
        "Kopi Dark Roast",
        "Kopi Light Roast",
        "Kopi Flavored Vanilla",
        "Kopi Flavored Hazelnut",
        "Kopi Flavored Caramel",
        "Kopi Organik Bogor",
        "Kopi Instant Premium",
        "Kopi Instant Greentea",
      ],
      prices: [
        65000, 75000, 85000, 95000, 68000, 72000, 70000, 78000, 80000, 82000,
        90000, 55000, 60000,
      ],
    },
    {
      names: [
        "Batik Bogor Motif Sangkuriang",
        "Batik Bogor Motif Kaliurang",
        "Batik Bogor Motif Talaga",
        "Batik Bogor Motif Gunung Salak",
        "Batik Bogor Motif Flora",
        "Batik Bogor Motif Fauna",
        "Batik Bogor Motif Bunga Melati",
        "Batik Bogor Kombinasi Warna Biru",
        "Batik Bogor Kombinasi Warna Merah",
        "Batik Bogor Kombinasi Warna Coklat",
        "Batik Bogor Premium Grade",
        "Batik Bogor Deluxe Edition",
      ],
      prices: [
        125000, 135000, 145000, 155000, 128000, 138000, 148000, 132000, 142000,
        152000, 200000, 250000,
      ],
    },
    {
      names: [
        "Mangkuk Keramik Bogor",
        "Piring Keramik Bogor",
        "Cangkir Keramik Bogor",
        "Vas Keramik Bogor",
        "Pot Bunga Keramik",
        "Asbak Keramik Bogor",
        "Tempat Garam Keramik",
        "Tempat Merica Keramik",
        "Hiasan Dinding Keramik",
        "Boneka Keramik Bogor",
        "Set Teh Keramik",
        "Keramik Dekorasi Rumah",
      ],
      prices: [
        45000, 55000, 35000, 85000, 75000, 25000, 20000, 20000, 95000, 65000,
        180000, 120000,
      ],
    },
    {
      names: [
        "Dodol Kacang Original",
        "Dodol Kacang Coklat",
        "Dodol Kacang Pandan",
        "Dodol Kacang Strawberry",
        "Dodol Kacang Keju",
        "Dodol Kacang Moka",
        "Dodol Kacang Vanila",
        "Dodol Kacang Greentea",
        "Dodol Kacang Premium Pack",
        "Dodol Kacang Gift Box",
        "Dodol Kacang Assorted",
      ],
      prices: [
        55000, 60000, 62000, 64000, 66000, 68000, 58000, 70000, 150000, 180000,
        200000,
      ],
    },
    {
      names: [
        "Bolu Gulung Coklat",
        "Bolu Gulung Strawberry",
        "Bolu Gulung Greentea",
        "Bolu Gulung Moka",
        "Bolu Gulung Tiramisu",
        "Bolu Gulung Vanila",
        "Bolu Gulung Karamell",
        "Bolu Gulung Keju",
        "Bolu Gulung Pandan",
        "Bolu Gulung Coklat Almond",
        "Bolu Gulung Assorted Pack",
        "Bolu Gulung Premium Gift",
      ],
      prices: [
        48000, 50000, 52000, 54000, 56000, 46000, 51000, 53000, 49000, 58000,
        150000, 180000,
      ],
    },
    {
      names: [
        "Teh Herbal Salak Original",
        "Teh Herbal Jahe",
        "Teh Herbal Kunyit",
        "Teh Herbal Temulawak",
        "Teh Herbal Mahkota Dewa",
        "Teh Herbal Sambiloto",
        "Teh Herbal Lemongrass",
        "Teh Herbal Madu",
        "Teh Herbal Ginseng",
        "Teh Herbal Organic Mix",
        "Teh Herbal Premium Blend",
      ],
      prices: [
        35000, 38000, 36000, 40000, 42000, 38000, 37000, 42000, 45000, 95000,
        120000,
      ],
    },
    {
      names: [
        "Keripik Singkong Original",
        "Keripik Singkong Balado",
        "Keripik Singkong Bawang",
        "Keripik Singkong Keju",
        "Keripik Pisang",
        "Keripik Ubi",
        "Kacang Kulit Bogor",
        "Pukis Tradisional",
        "Lumpia Sayur",
        "Perkedel Jagung",
        "Snack Mix Bogor",
        "Assorted Snack Pack",
      ],
      prices: [
        25000, 28000, 26000, 30000, 32000, 28000, 35000, 30000, 28000, 25000,
        75000, 120000,
      ],
    },
    {
      names: [
        "Tas Tangan Kulit Coklat",
        "Tas Tangan Kulit Hitam",
        "Tas Tangan Kulit Merah",
        "Tas Bahu Kulit Premium",
        "Tas Backpack Kulit",
        "Tas Kerja Kulit",
        "Dompet Kulit Panjang",
        "Dompet Kulit Pendek",
        "Gesper Kulit Bogor",
        "Tas Tote Kulit",
        "Tas Selempang Kulit",
        "Tas Travel Kulit Premium",
      ],
      prices: [
        185000, 195000, 205000, 225000, 275000, 250000, 125000, 95000, 75000,
        185000, 165000, 450000,
      ],
    },
  ];

  for (let i = 0; i < umkmData.length; i++) {
    const umkm = umkmData[i];
    const products = productNames[i].names;
    const prices = productNames[i].prices;

    const umkmUser = await prisma.user.upsert({
      where: { email: umkm.email },
      update: {},
      create: {
        email: umkm.email,
        passwordHash: defaultPasswordHash,
        name: umkm.name,
        phone: `081${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
        role: UserRole.UMKM,
        emailVerified: new Date(),
        umkmProfile: {
          create: {
            businessName: umkm.businessName,
            businessSlug: `${slugify(umkm.businessName)}-${i + 1}`,
            description: umkm.description,
            category: umkm.category,
            city: umkm.city,
            district: umkm.district,
            address: umkm.address,
            approvalStatus: "APPROVED",
            verifiedAt: new Date(),
            ratingAverage: 4.5 + Math.random() * 0.5,
            totalProducts: products.length,
          },
        },
      },
    });

    // Create products for this UMKM
    for (let j = 0; j < products.length; j++) {
      await prisma.product.upsert({
        where: {
          slug: `${slugify(products[j])}-${umkmUser.id}-${j}`,
        },
        update: {},
        create: {
          sellerId: umkmUser.id,
          name: products[j],
          slug: `${slugify(products[j])}-${umkmUser.id}-${j}`,
          description: `${products[j]} berkualitas premium dari ${umkm.businessName}`,
          priceInIdr: prices[j],
          stock: Math.floor(Math.random() * 50) + 10,
          isFeatured: j < 3,
        },
      });
    }

    console.log(
      `✓ UMKM #${i + 1}: ${umkm.businessName} (${products.length} produk)`,
    );
  }

  console.log("\n");
  console.log("Seed selesai. Login awal:");
  console.log("admin@sadaya.local / Password123!");
  console.log("user@sadaya.local / Password123!");
  console.log("umkm@sadaya.local / Password123!");
  console.log("driver@sadaya.local / Password123!");
  console.log("\n10 UMKM Approved telah ditambahkan");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
