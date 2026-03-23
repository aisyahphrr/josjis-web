import { UserRole, VehicleType } from "@prisma/client";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/src/server/db/client";

const registerSchema = z.object({
  role: z.enum([UserRole.USER, UserRole.UMKM, UserRole.DRIVER]),
  name: z.string().min(2).max(120),
  email: z.string().email(),
  password: z.string().min(8).max(72),
  phone: z.string().min(8).max(20).optional(),
  address: z.string().min(5).max(255).optional(),
  businessName: z.string().min(2).max(160).optional(),
  city: z.string().min(2).max(100).optional(),
  district: z.string().min(2).max(100).optional(),
  vehicleType: z.nativeEnum(VehicleType).optional(),
  licensePlate: z.string().min(5).max(20).optional(),
});

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Data registrasi tidak valid.",
          errors: parsed.error.flatten(),
        },
        { status: 400 },
      );
    }

    const input = parsed.data;

    if (input.role === UserRole.UMKM && !input.businessName) {
      return NextResponse.json(
        {
          message: "Nama usaha wajib diisi untuk akun UMKM.",
        },
        { status: 400 },
      );
    }

    if (input.role === UserRole.DRIVER && !input.vehicleType) {
      return NextResponse.json(
        {
          message: "Tipe kendaraan wajib diisi untuk akun driver.",
        },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: input.email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          message: "Email sudah terdaftar.",
        },
        { status: 409 },
      );
    }

    const passwordHash = await hash(input.password, 12);

    const createdUser = await prisma.user.create({
      data: {
        email: input.email,
        passwordHash,
        name: input.name,
        phone: input.phone,
        role: input.role,
        customerProfile:
          input.role === UserRole.USER
            ? {
                create: {
                  defaultAddress: input.address,
                  preferredRegion: input.district ?? input.city,
                },
              }
            : undefined,
        umkmProfile:
          input.role === UserRole.UMKM && input.businessName
            ? {
                create: {
                  businessName: input.businessName,
                  businessSlug: `${slugify(input.businessName)}-${Date.now()}`,
                  city: input.city,
                  district: input.district,
                  address: input.address,
                },
              }
            : undefined,
        driverProfile:
          input.role === UserRole.DRIVER && input.vehicleType
            ? {
                create: {
                  vehicleType: input.vehicleType,
                  licensePlate: input.licensePlate,
                  currentCity: input.city,
                },
              }
            : undefined,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return NextResponse.json(
      {
        message: "Registrasi berhasil.",
        user: createdUser,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("REGISTER_ERROR", error);

    return NextResponse.json(
      {
        message: "Terjadi kesalahan saat registrasi.",
      },
      { status: 500 },
    );
  }
}
