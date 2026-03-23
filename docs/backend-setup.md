# Backend Setup Sadaya

Backend ini disiapkan untuk 4 role utama:

- `ADMIN`
- `USER`
- `UMKM`
- `DRIVER`

Stack yang dipasang:

- `PostgreSQL` untuk database utama
- `Prisma` untuk schema dan query
- `Auth.js / NextAuth` untuk login session
- `Socket.IO` untuk chat realtime

## Struktur File

```text
prisma/
  schema.prisma
  seed.ts
server/
  socket-server.ts
src/
  app/
    api/
      auth/
        [...nextauth]/route.ts
        register/route.ts
      socket/
        health/route.ts
  server/
    auth/
      config.ts
      roles.ts
    db/
      client.ts
    socket/
      events.ts
  types/
    next-auth.d.ts
```

## Env Yang Harus Disiapkan

Duplikat `.env.example` menjadi `.env.local`.

Variable yang wajib:

- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `NEXT_PUBLIC_APP_URL`
- `SOCKET_PORT`
- `NEXT_PUBLIC_SOCKET_URL`

Contoh:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/sadaya_db?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="isi-random-secret-minimal-32-karakter"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
SOCKET_PORT="3001"
NEXT_PUBLIC_SOCKET_URL="http://localhost:3001"
```

## Layanan Luar Yang Perlu Disiapkan

Paling minimal:

1. PostgreSQL lokal atau cloud
2. Secret untuk Auth.js

Pilihan database yang aman dan mudah:

- Lokal: PostgreSQL biasa
- Cloud: Supabase PostgreSQL
- Cloud: Neon PostgreSQL

Socket.IO saat ini tidak butuh vendor luar karena dijalankan sebagai server terpisah dari project ini. Kalau nanti deploy multi-instance, baru pertimbangkan Redis adapter.

## Perintah Setup

Install dependency:

```bash
npm install
```

Generate Prisma client:

```bash
npm run prisma:generate
```

Push schema ke database:

```bash
npm run prisma:push
```

Atau kalau mau pakai migration:

```bash
npm run prisma:migrate
```

Isi data awal:

```bash
npm run db:seed
```

Jalankan web dan socket bersamaan:

```bash
npm run dev:all
```

Kalau mau terpisah:

```bash
npm run dev
npm run dev:socket
```

## Endpoint Yang Sudah Disiapkan

- `POST /api/auth/register`
- `GET|POST /api/auth/[...nextauth]`
- `GET /api/socket/health`

## Bentuk Body Registrasi

### User biasa

```json
{
  "role": "USER",
  "name": "Budi",
  "email": "budi@mail.com",
  "password": "Password123!",
  "phone": "08123456789",
  "address": "Bogor"
}
```

### UMKM

```json
{
  "role": "UMKM",
  "name": "Toko Talas",
  "email": "umkm@mail.com",
  "password": "Password123!",
  "phone": "08123456789",
  "businessName": "Lapis Talas Juara",
  "city": "Bogor",
  "district": "Bogor Tengah",
  "address": "Jl. Siliwangi"
}
```

### Driver

```json
{
  "role": "DRIVER",
  "name": "Andi Driver",
  "email": "driver@mail.com",
  "password": "Password123!",
  "vehicleType": "MOTORBIKE",
  "licensePlate": "F 1234 XX",
  "city": "Bogor"
}
```

## Akun Seed Awal

Setelah `npm run db:seed`, akun awalnya:

- `admin@sadaya.local / Password123!`
- `user@sadaya.local / Password123!`
- `umkm@sadaya.local / Password123!`
- `driver@sadaya.local / Password123!`

## Langkah Lanjut Yang Saya Sarankan

1. Hubungkan form login yang sekarang ke `next-auth`.
2. Hubungkan register user, UMKM, dan driver ke `POST /api/auth/register`.
3. Ganti store dummy order, chat, artikel, dan produk ke query database bertahap.
4. Tambahkan middleware role-based access setelah alur login sudah tersambung.
