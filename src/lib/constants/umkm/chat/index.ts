import type { ChatConversation } from "@/src/interface/chat";

export const customerConversations: ChatConversation[] = [
  {
    id: 1,
    name: "Budi Santoso",
    role: "Pelanggan",
    avatar: "BS",
    color: "#F99912",
    lastMessage: "Produknya bagus, berapa harganya?",
    time: "09:30",
    unread: true,
    messages: [
      {
        id: 1,
        sender: "customer",
        message: "Halo, saya tertarik dengan produk Anda",
        time: "09:00",
      },
      {
        id: 2,
        sender: "umkm",
        message: "Halo! Terima kasih sudah berminat. Ada yang bisa saya bantu?",
        time: "09:01",
      },
      {
        id: 3,
        sender: "customer",
        message: "Produknya bagus, berapa harganya?",
        time: "09:30",
      },
    ],
  },
  {
    id: 2,
    name: "Siti Nurhaliza",
    role: "Pelanggan",
    avatar: "SN",
    color: "#64762C",
    lastMessage: "Sudah terima barangnya, terima kasih",
    time: "08:15",
    unread: false,
    messages: [
      {
        id: 1,
        sender: "umkm",
        message: "Barang sudah dikirim, asuransi sudah kami tandai",
        time: "07:45",
      },
      {
        id: 2,
        sender: "customer",
        message: "Sudah terima barangnya, terima kasih",
        time: "08:15",
      },
    ],
  },
];

export const driverConversations: ChatConversation[] = [
  {
    id: 1,
    name: "Abi Kusuma",
    role: "Driver",
    avatar: "AK",
    color: "#3b82f6",
    lastMessage: "Barang sedang dalam perjalanan ke alamat tujuan",
    time: "10:00",
    unread: true,
    messages: [
      {
        id: 1,
        sender: "driver",
        message: "Barang sudah saya ambil dari gudang",
        time: "09:30",
      },
      {
        id: 2,
        sender: "umkm",
        message: "Baik, pastikan semua barang dalam kondisi baik ya",
        time: "09:35",
      },
      {
        id: 3,
        sender: "driver",
        message: "Barang sedang dalam perjalanan ke alamat tujuan",
        time: "10:00",
      },
    ],
  },
  {
    id: 2,
    name: "Raka Wijaya",
    role: "Driver",
    avatar: "RW",
    color: "#3b82f6",
    lastMessage: "Pengiriman sudah selesai",
    time: "Yesterday",
    unread: false,
    messages: [
      {
        id: 1,
        sender: "umkm",
        message: "Order PRD-001 siap dikirim",
        time: "Yesterday",
      },
      {
        id: 2,
        sender: "driver",
        message: "Pengiriman sudah selesai",
        time: "Yesterday",
      },
    ],
  },
];

export const adminConversations: ChatConversation[] = [
  {
    id: 1,
    name: "Admin Support",
    role: "Admin",
    avatar: "AS",
    color: "#dc2626",
    lastMessage: "Mohon serahkan dokumen persetujuan bisnis",
    time: "10:15",
    unread: true,
    messages: [
      {
        id: 1,
        sender: "admin",
        message: "Halo, kami butuh beberapa dokumen untuk verifikasi akun Anda",
        time: "10:00",
      },
      {
        id: 2,
        sender: "umkm",
        message: "Baik admin, apa saja dokumen yang diperlukan?",
        time: "10:05",
      },
      {
        id: 3,
        sender: "admin",
        message: "Mohon serahkan dokumen persetujuan bisnis",
        time: "10:15",
      },
    ],
  },
  {
    id: 2,
    name: "Admin Finance",
    role: "Admin",
    avatar: "AF",
    color: "#dc2626",
    lastMessage: "Pembayaran komisi sudah ditransfer",
    time: "09:00",
    unread: false,
    messages: [
      {
        id: 1,
        sender: "umkm",
        message: "Admin, kapan pembayaran komisi bulan ini dikirim?",
        time: "08:45",
      },
      {
        id: 2,
        sender: "admin",
        message: "Pembayaran komisi sudah ditransfer",
        time: "09:00",
      },
    ],
  },
];

export const emojis = [
  "😀",
  "😂",
  "😍",
  "🥰",
  "😎",
  "🤔",
  "😢",
  "🎉",
  "👍",
  "🙌",
  "💯",
  "❤️",
  "🔥",
  "✨",
  "🎯",
  "⭐",
  "📌",
  "💬",
  "👌",
  "🚀",
];
