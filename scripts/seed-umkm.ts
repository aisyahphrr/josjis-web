import { PrismaClient } from "@prisma/client"
import { hash } from "bcryptjs"

const dummyUmkm = [
  {
    name: "Toko Kue Lapis Bogor",
    ownerName: "Ahmad Susanto",
    email: "ahmad.susanto@umkm.com",
    phone: "+62812-1234-5678",
    address: "Jl. Pajajaran No. 10, Bogor",
    productType: "Kuliner Lokal",
    description: "Kue lapis handmade dengan resep warisan keluarga...",
    category: "Makanan",
    ktpUrl: "/images/dummy/ktp-umkm-1.jpg",
    businessLicenseUrl: "/images/dummy/izin-umkm-1.jpg",
    otherDocumentUrls: ["/images/dummy/produk-umkm-1.jpg", "/images/dummy/sertifikat-umkm-1.jpg"],
    productCount: 24,
    rating: 4.8,
    totalSales: 152340000,
    approvalStatus: "approved",
    createdAt: new Date().toISOString()
  },
  {
    name: "Batik Trusmi Bogor",
    ownerName: "Ratna Sari",
    email: "ratna.batik@umkm.com",
    phone: "+62813-2222-3344",
    address: "Jl. Raya Tajur No. 21, Bogor",
    productType: "Pakaian Tradisional",
    description: "Desain batik khas motif daun talas dan kujang...",
    category: "Pakaian",
    ktpUrl: "/images/dummy/ktp-umkm-2.jpg",
    businessLicenseUrl: "/images/dummy/izin-umkm-2.jpg",
    otherDocumentUrls: ["/images/dummy/produk-umkm-2.jpg"],
    productCount: 85,
    rating: 4.9,
    totalSales: 410320000,
    approvalStatus: "approved",
    createdAt: new Date().toISOString()
  },
  {
    name: "Kerajinan Bambu Khas",
    ownerName: "Bambang Wijaya",
    email: "bambang.wijaya@umkm.com",
    phone: "+62811-9876-5432",
    address: "Jl. Puncak Km. 5, Cisarua",
    productType: "Anyaman Bambu",
    description: "Produk anyaman bambu premium...",
    category: "Kerajinan",
    ktpUrl: "/images/dummy/ktp-umkm-3.jpg",
    businessLicenseUrl: "/images/dummy/izin-umkm-3.jpg",
    otherDocumentUrls: ["/images/dummy/produk-umkm-3.jpg"],
    productCount: 36,
    rating: 4.9,
    totalSales: 223900000,
    approvalStatus: "approved",
    createdAt: new Date().toISOString()
  },
  {
    name: "Jasa Cuci Karpet Bintang",
    ownerName: "Dedi Supardi",
    email: "dedi.clean@umkm.com",
    phone: "+62814-4444-1212",
    address: "Jl. Kedung Halang No. 7, Bogor Utara",
    productType: "Layanan Kebersihan",
    description: "Servis cuci karpet...",
    category: "Jasa",
    ktpUrl: "/images/dummy/ktp-umkm-4.jpg",
    businessLicenseUrl: "/images/dummy/izin-umkm-4.jpg",
    otherDocumentUrls: ["/images/dummy/produk-umkm-4.jpg"],
    productCount: 12,
    rating: 4.7,
    totalSales: 89450000,
    approvalStatus: "approved",
    createdAt: new Date().toISOString()
  },
  {
    name: "Asinan Segar Bu Eni",
    ownerName: "Eni Rahayu",
    email: "eni.rahayu@umkm.com",
    phone: "+62815-5555-9898",
    address: "Jl. Binamarga No. 3, Bogor",
    productType: "Kuliner",
    description: "Asinan bogor racikan kuno...",
    category: "Makanan",
    ktpUrl: "/images/dummy/ktp-umkm-5.jpg",
    businessLicenseUrl: "/images/dummy/izin-umkm-5.jpg",
    otherDocumentUrls: ["/images/dummy/produk-umkm-5.jpg"],
    productCount: 9,
    rating: 4.6,
    totalSales: 131200000,
    approvalStatus: "approved",
    createdAt: new Date().toISOString()
  },
  {
    name: "Distro Kaos Josjis Sunda",
    ownerName: "Iqbal Ramadhan",
    email: "iqbal.distro@umkm.com",
    phone: "+62858-9999-7777",
    address: "Ruko Pandu Raya, Bogor Utara",
    productType: "Apparel Muda",
    description: "Brand clothing distro lokal...",
    category: "Pakaian",
    ktpUrl: "/images/dummy/ktp-umkm-6.jpg",
    businessLicenseUrl: "/images/dummy/izin-umkm-6.jpg",
    otherDocumentUrls: [],
    productCount: 45,
    rating: 4.8,
    totalSales: 275000000,
    approvalStatus: "approved",
    createdAt: new Date().toISOString()
  }
];

const prisma = new PrismaClient()

async function main() {
  const passwordHash = await hash("password123", 10)
  
  for (const umkm of dummyUmkm) {
    const slug = umkm.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now().toString().slice(-4);
    
    await prisma.user.upsert({
      where: { email: umkm.email },
      update: {
        name: umkm.ownerName,
        phone: umkm.phone,
        umkmProfile: {
          update: {
            businessName: umkm.name,
            description: umkm.description,
            address: umkm.address,
            category: umkm.category,
            productType: umkm.productType,
            ktpUrl: umkm.ktpUrl,
            businessLicenseUrl: umkm.businessLicenseUrl,
            otherDocumentUrls: umkm.otherDocumentUrls,
            verifiedAt: umkm.approvalStatus === "approved" ? new Date() : null,
            ratingAverage: umkm.rating,
            totalProducts: umkm.productCount,
            totalSales: umkm.totalSales,
          }
        }
      },
      create: {
        email: umkm.email,
        name: umkm.ownerName,
        phone: umkm.phone,
        passwordHash,
        role: "UMKM",
        isActive: true,
        createdAt: new Date(umkm.createdAt),
        umkmProfile: {
          create: {
            businessName: umkm.name,
            businessSlug: slug,
            description: umkm.description,
            address: umkm.address,
            category: umkm.category,
            productType: umkm.productType,
            ktpUrl: umkm.ktpUrl,
            businessLicenseUrl: umkm.businessLicenseUrl,
            otherDocumentUrls: umkm.otherDocumentUrls,
            verifiedAt: umkm.approvalStatus === "approved" ? new Date() : null,
            ratingAverage: umkm.rating,
            totalProducts: umkm.productCount,
            totalSales: umkm.totalSales,
          }
        }
      }
    });
    console.log(`Upserted UMKM: ${umkm.name}`)
  }
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
