"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import {
  CheckCheck,
  FileText,
  Image as ImageIcon,
  MapPinned,
  MoreVertical,
  Music,
  Paperclip,
  Send,
  ShoppingBag,
  Smile,
  Store,
  Trash2,
  Truck,
} from "lucide-react";
import { useUserStore } from "@/src/store/user-store";
import { getProductById, products } from "@/src/lib/constants/user/marketplace/products";

type ActiveTab = "seller" | "driver";

type ConversationMessage = {
  id: string;
  sender: "seller" | "driver" | "user";
  message: string;
  time: string;
};

type ChatConversation = {
  id: string;
  name: string;
  role: "Seller" | "Driver";
  subtitle: string;
  avatar: string;
  color: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  messages: ConversationMessage[];
};

const emojiOptions = [":)", "<3", "OK", "GG", "YAY", ":D", "[BOX]", "[TRK]", "[*]", "[CHAT]"];

const driverProfiles = [
  { name: "Driver Fajar", color: "#3b82f6" },
  { name: "Driver Rizky", color: "#0ea5e9" },
  { name: "Driver Nanda", color: "#2563eb" },
  { name: "Driver Bayu", color: "#0284c7" },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

function formatCurrentTime() {
  return new Date().toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function buildInitialSellerConversations(): ChatConversation[] {
  const uniqueSellers = new Map<string, ChatConversation>();

  products.forEach((product, index) => {
    if (uniqueSellers.has(product.sellerName)) return;

    const messages: ConversationMessage[] = [
      {
        id: `${product.id}-seller-1`,
        sender: "seller",
        message: `Halo kak, ini ${product.sellerName}. Kalau mau tanya soal ${product.name}, langsung chat di sini ya.`,
        time: "09:00",
      },
      {
        id: `${product.id}-seller-2`,
        sender: "user",
        message: "Baik kak, saya mau cek ketersediaan dan estimasi kirimnya.",
        time: "09:02",
      },
      {
        id: `${product.id}-seller-3`,
        sender: "seller",
        message: "Siap, stok aman dan pengiriman bisa kami proses di hari yang sama.",
        time: "09:03",
      },
    ];

    uniqueSellers.set(product.sellerName, {
      id: `seller-${product.id}`,
      name: product.sellerName,
      role: "Seller",
      subtitle: `${product.sellerDescription} - Produk: ${product.name}`,
      avatar: getInitials(product.sellerName),
      color: "#F99912",
      lastMessage: messages[messages.length - 1]?.message ?? "",
      time: messages[messages.length - 1]?.time ?? "09:00",
      unread: index < 3,
      messages,
    });
  });

  return Array.from(uniqueSellers.values());
}

function buildSellerConversationsFromOrders(
  orders: ReturnType<typeof useUserStore>["orders"],
): ChatConversation[] {
  const mapped = new Map<string, ChatConversation>();

  orders.forEach((order) => {
    order.items.forEach((item) => {
      const product = getProductById(item.productId);
      if (!product || mapped.has(product.sellerName)) return;

      const messages: ConversationMessage[] = [
        {
          id: `${order.id}-${item.productId}-seller-1`,
          sender: "seller",
          message: `Halo kak, pesanan ${product.name} untuk order ${order.id} sedang kami siapkan ya.`,
          time: "10:10",
        },
        {
          id: `${order.id}-${item.productId}-seller-2`,
          sender: "user",
          message: "Siap kak, saya pantau di chat ini ya.",
          time: "10:12",
        },
      ];

      mapped.set(product.sellerName, {
        id: `seller-order-${order.id}-${item.productId}`,
        name: product.sellerName,
        role: "Seller",
        subtitle: `${product.sellerDescription} - Order ${order.id}`,
        avatar: getInitials(product.sellerName),
        color: "#F99912",
        lastMessage: messages[messages.length - 1]?.message ?? "",
        time: messages[messages.length - 1]?.time ?? "10:10",
        unread: order.status === "processing",
        messages,
      });
    });
  });

  return Array.from(mapped.values());
}

function buildDriverConversations(
  orders: ReturnType<typeof useUserStore>["orders"],
): ChatConversation[] {
  const orderConversations = orders.map((order, index) => {
    const firstItem = order.items[0];
    const product = firstItem ? getProductById(firstItem.productId) : null;
    const driver = driverProfiles[index % driverProfiles.length];
    const shippingLabel =
      order.status === "delivered"
        ? "Pesanan sudah sampai di tujuan."
        : order.status === "shipping"
          ? "Kurir sedang menuju alamat tujuan."
          : "Pesanan sedang menunggu penjemputan driver.";

    const messages: ConversationMessage[] = [
      {
        id: `${order.id}-driver-1`,
        sender: "driver",
        message: `Halo kak, saya ${driver.name}. Saya pegang pengiriman order ${order.id} sekarang.`,
        time: "11:00",
      },
      {
        id: `${order.id}-driver-2`,
        sender: "driver",
        message: shippingLabel,
        time: "11:05",
      },
      {
        id: `${order.id}-driver-3`,
        sender: "user",
        message: "Baik kak, saya tunggu di alamat tujuan ya.",
        time: "11:06",
      },
    ];

    return {
      id: `driver-${order.id}`,
      name: driver.name,
      role: "Driver" as const,
      subtitle: `Pengiriman ${product?.name ?? "Pesanan"} - Status ${order.status}`,
      avatar: getInitials(driver.name),
      color: driver.color,
      lastMessage: messages[messages.length - 1]?.message ?? "",
      time: messages[messages.length - 1]?.time ?? "11:00",
      unread: order.status === "shipping",
      messages,
    };
  });

  if (orderConversations.length > 0) {
    return orderConversations;
  }

  return [
    {
      id: "driver-fallback-1",
      name: "Driver Fajar",
      role: "Driver",
      subtitle: "Pengiriman pesanan kamu akan tampil di sini saat order diproses.",
      avatar: "DF",
      color: "#3b82f6",
      lastMessage: "Saat ada pesanan aktif, chat driver akan muncul otomatis.",
      time: "08:30",
      unread: false,
      messages: [
        {
          id: "driver-fallback-msg-1",
          sender: "driver",
          message: "Saat ada pesanan aktif, chat driver akan muncul otomatis di tab ini.",
          time: "08:30",
        },
      ],
    },
  ];
}

export default function ChatPage() {
  const searchParams = useSearchParams();
  const sellerQuery = searchParams.get("seller");
  const driverQuery = searchParams.get("driver");
  const { orders } = useUserStore();
  const orderBasedSellers = useMemo(
    () => buildSellerConversationsFromOrders(orders),
    [orders],
  );
  const orderBasedDrivers = useMemo(() => buildDriverConversations(orders), [orders]);

  const [activeTab, setActiveTab] = useState<ActiveTab>("seller");
  const [searchQuery, setSearchQuery] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [sellerConversations, setSellerConversations] = useState<ChatConversation[]>([]);
  const [driverConversations, setDriverConversations] = useState<ChatConversation[]>([]);
  const [selectedSellerId, setSelectedSellerId] = useState<string | null>(null);
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [showEmojiMenu, setShowEmojiMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const attachmentRef = useRef<HTMLDivElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
      if (
        attachmentRef.current &&
        !attachmentRef.current.contains(event.target as Node)
      ) {
        setShowAttachmentMenu(false);
      }
      if (emojiRef.current && !emojiRef.current.contains(event.target as Node)) {
        setShowEmojiMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const merged = [...orderBasedSellers];
    buildInitialSellerConversations().forEach((conversation) => {
      if (!merged.some((item) => item.name === conversation.name)) {
        merged.push(conversation);
      }
    });

    setSellerConversations(merged);
    setDriverConversations(orderBasedDrivers);

    if (sellerQuery) {
      const matchedSeller = merged.find((item) => item.name === sellerQuery);
      if (matchedSeller) {
        setActiveTab("seller");
        setSelectedSellerId(matchedSeller.id);
      }
    }

    if (driverQuery) {
      const matchedDriver = orderBasedDrivers.find((item) => item.name === driverQuery);
      if (matchedDriver) {
        setActiveTab("driver");
        setSelectedDriverId(matchedDriver.id);
      }
    }

    if (!selectedSellerId && merged.length > 0) {
      setSelectedSellerId(merged[0].id);
    }

    if (!selectedDriverId && orderBasedDrivers.length > 0) {
      setSelectedDriverId(orderBasedDrivers[0].id);
    }
  }, [
    driverQuery,
    orderBasedDrivers,
    orderBasedSellers,
    selectedDriverId,
    selectedSellerId,
    sellerQuery,
  ]);

  const activeConversationList =
    activeTab === "seller" ? sellerConversations : driverConversations;
  const selectedConversationId =
    activeTab === "seller" ? selectedSellerId : selectedDriverId;

  const filteredConversations = activeConversationList.filter((conversation) =>
    `${conversation.name} ${conversation.subtitle} ${conversation.lastMessage}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  const currentConversation =
    activeConversationList.find((conversation) => conversation.id === selectedConversationId) ??
    filteredConversations[0] ??
    null;

  useEffect(() => {
    setMessages(currentConversation?.messages ?? []);
    setInputMessage("");
    setOpenMenuId(null);
  }, [currentConversation?.id]);

  const handleSelectConversation = (conversation: ChatConversation, type: ActiveTab) => {
    if (type === "seller") {
      setSelectedSellerId(conversation.id);
    } else {
      setSelectedDriverId(conversation.id);
    }
    setMessages(conversation.messages);
    setInputMessage("");
    setOpenMenuId(null);
  };

  const syncConversationMessages = (
    type: ActiveTab,
    conversationId: string,
    nextMessages: ConversationMessage[],
  ) => {
    const updater = (list: ChatConversation[]) =>
      list.map((conversation) =>
        conversation.id === conversationId
          ? {
              ...conversation,
              messages: nextMessages,
              lastMessage: nextMessages[nextMessages.length - 1]?.message ?? conversation.lastMessage,
              time: nextMessages[nextMessages.length - 1]?.time ?? conversation.time,
              unread: false,
            }
          : conversation,
      );

    if (type === "seller") {
      setSellerConversations(updater);
      return;
    }

    setDriverConversations(updater);
  };

  const deleteMessage = (messageId: string) => {
    if (!currentConversation) return;

    const nextMessages = messages.filter((message) => message.id !== messageId);
    setMessages(nextMessages);
    syncConversationMessages(activeTab, currentConversation.id, nextMessages);
    setOpenMenuId(null);
  };

  const handleAttachmentClick = (type: "image" | "document" | "audio") => {
    if (!fileInputRef.current) return;

    fileInputRef.current.accept =
      type === "image"
        ? "image/*"
        : type === "audio"
          ? "audio/*"
          : ".pdf,.doc,.docx,.txt,.xlsx";
    fileInputRef.current.click();
    setShowAttachmentMenu(false);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !currentConversation) return;

    const newMessage: ConversationMessage = {
      id: `${currentConversation.id}-file-${Date.now()}`,
      sender: "user",
      message: `Lampiran: ${file.name}`,
      time: formatCurrentTime(),
    };

    const nextMessages = [...messages, newMessage];
    setMessages(nextMessages);
    syncConversationMessages(activeTab, currentConversation.id, nextMessages);
    event.target.value = "";
  };

  const handleEmojiClick = (emoji: string) => {
    setInputMessage((prev) => prev + emoji);
    setShowEmojiMenu(false);
  };

  const sendMessage = () => {
    if (!inputMessage.trim() || !currentConversation) return;

    const userMessage: ConversationMessage = {
      id: `${currentConversation.id}-user-${Date.now()}`,
      sender: "user",
      message: inputMessage.trim(),
      time: formatCurrentTime(),
    };

    const replyMessage: ConversationMessage = {
      id: `${currentConversation.id}-${activeTab}-reply-${Date.now()}`,
      sender: activeTab === "seller" ? "seller" : "driver",
      message:
        activeTab === "seller"
          ? `Baik kak, pesan untuk ${currentConversation.name} sudah kami terima. Kami cek kebutuhan pesananmu dulu ya.`
          : `Siap kak, update lokasi pengiriman akan saya kabari terus lewat chat ini ya.`,
      time: formatCurrentTime(),
    };

    const nextMessages = [...messages, userMessage, replyMessage];
    setMessages(nextMessages);
    syncConversationMessages(activeTab, currentConversation.id, nextMessages);
    setInputMessage("");
  };

  const themeHover =
    activeTab === "seller" ? "hover:bg-[#F99912]/10" : "hover:bg-[#2563eb]/10";
  const themeBorder =
    activeTab === "seller" ? "border-[#F99912]/10" : "border-[#2563eb]/10";
  const themeFocus =
    activeTab === "seller"
      ? "focus:border-[#F99912]/50"
      : "focus:border-[#2563eb]/50";
  const activeTriggerClass =
    activeTab === "seller"
      ? "data-[state=active]:border-b-[#F99912]"
      : "data-[state=active]:border-b-[#2563eb]";

  return (
    <div className="h-[calc(100vh-12rem)]">
      <Card className={`flex h-full flex-col bg-card/50 backdrop-blur ${themeBorder}`}>
        <CardHeader className={`shrink-0 border-b ${themeBorder}`}>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Chat Seller & Driver</CardTitle>
          </div>
        </CardHeader>

        <div className="flex flex-1 overflow-hidden">
          <div className={`flex w-100 shrink-0 flex-col border-r ${themeBorder}`}>
            <Tabs
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as ActiveTab)}
              className="w-full border-b border-current/10"
            >
              <TabsList className={`w-full rounded-none bg-transparent border-b ${themeBorder}`}>
                <TabsTrigger
                  value="seller"
                  className={`flex-1 cursor-pointer rounded-none border-b-2 border-transparent data-[state=active]:bg-transparent ${activeTriggerClass}`}
                >
                  <Store className="mr-2 h-4 w-4" />
                  Seller
                </TabsTrigger>
                <TabsTrigger
                  value="driver"
                  className={`flex-1 cursor-pointer rounded-none border-b-2 border-transparent data-[state=active]:bg-transparent ${activeTriggerClass}`}
                >
                  <Truck className="mr-2 h-4 w-4" />
                  Driver
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className={`border-b p-3 ${themeBorder}`}>
              <Input
                placeholder={
                  activeTab === "seller"
                    ? "Cari percakapan seller..."
                    : "Cari percakapan driver..."
                }
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className={`rounded-lg border bg-muted/50 text-sm cursor-text ${themeBorder} ${themeFocus}`}
              />
            </div>

            <ScrollArea className="flex-1">
              <div className="space-y-1 p-2">
                {filteredConversations.map((conversation) => {
                  const isSelected = conversation.id === selectedConversationId;

                  return (
                    <button
                      key={conversation.id}
                      onClick={() => handleSelectConversation(conversation, activeTab)}
                      className={`w-full cursor-pointer rounded-lg p-3 text-left transition-all ${
                        isSelected
                          ? activeTab === "seller"
                            ? "border border-[#F99912]/20 bg-[#F99912]/10"
                            : "border border-[#2563eb]/20 bg-[#2563eb]/10"
                          : "hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex gap-3">
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-semibold text-white"
                          style={{ backgroundColor: conversation.color }}
                        >
                          {conversation.avatar}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">{conversation.name}</p>
                          <p className="truncate text-xs text-muted-foreground">
                            {conversation.subtitle}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {conversation.lastMessage}
                          </p>
                        </div>
                        <div className="flex shrink-0 flex-col items-end gap-1">
                          <span className="text-xs text-muted-foreground">
                            {conversation.time}
                          </span>
                          {conversation.unread && (
                            <div
                              className="h-2 w-2 rounded-full"
                              style={{ backgroundColor: conversation.color }}
                            />
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}

                {filteredConversations.length === 0 && (
                  <div className="rounded-xl border border-dashed border-muted-foreground/20 p-4 text-center text-sm text-muted-foreground">
                    Belum ada percakapan yang cocok dengan pencarian.
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          <div className="flex flex-1 flex-col">
            {currentConversation ? (
              <>
                <div className={`flex shrink-0 items-center justify-between border-b px-6 py-4 ${themeBorder}`}>
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl font-semibold text-white"
                      style={{ backgroundColor: currentConversation.color }}
                    >
                      {currentConversation.avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold">{currentConversation.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {currentConversation.role}
                      </p>
                      <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                        {activeTab === "seller" ? (
                          <ShoppingBag className="h-3.5 w-3.5" />
                        ) : (
                          <MapPinned className="h-3.5 w-3.5" />
                        )}
                        {currentConversation.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="relative" ref={menuRef}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`cursor-pointer ${themeHover}`}
                      onClick={() =>
                        setOpenMenuId(
                          openMenuId === currentConversation.id ? null : currentConversation.id,
                        )
                      }
                    >
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                    {openMenuId === currentConversation.id && (
                      <div className="absolute right-0 top-10 z-50 w-40 rounded-lg border border-muted bg-card shadow-lg">
                        <button
                          onClick={() => setOpenMenuId(null)}
                          className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-left text-sm text-foreground hover:bg-muted/50"
                        >
                          <Trash2 className="h-4 w-4" />
                          Tutup Menu
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <ScrollArea className="flex-1 p-6">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`group flex ${
                          message.sender === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`flex max-w-[70%] gap-2 ${
                            message.sender === "user" ? "flex-row-reverse" : ""
                          }`}
                        >
                          {message.sender !== "user" && (
                            <div
                              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-semibold text-white"
                              style={{ backgroundColor: currentConversation.color }}
                            >
                              {currentConversation.avatar.charAt(0)}
                            </div>
                          )}

                          <div className="relative">
                            <div
                              className={`rounded-2xl px-4 py-3 ${
                                message.sender === "user"
                                  ? activeTab === "seller"
                                    ? "bg-[#F99912] text-[#181612]"
                                    : "bg-[#2563eb] text-white"
                                  : "bg-muted/50"
                              }`}
                            >
                              <p className="text-sm">{message.message}</p>
                              <div
                                className={`mt-1 flex items-center gap-1 ${
                                  message.sender === "user" ? "justify-end" : ""
                                }`}
                              >
                                <span
                                  className={`text-xs ${
                                    message.sender === "user"
                                      ? activeTab === "seller"
                                        ? "text-[#181612]/70"
                                        : "text-white/70"
                                      : "text-muted-foreground"
                                  }`}
                                >
                                  {message.time}
                                </span>
                                {message.sender === "user" && (
                                  <CheckCheck
                                    className={`h-3 w-3 ${
                                      activeTab === "seller"
                                        ? "text-[#181612]/70"
                                        : "text-white/70"
                                    }`}
                                  />
                                )}
                              </div>
                            </div>

                            {message.sender === "user" && (
                              <div className="absolute -left-8 top-0 opacity-0 transition-opacity group-hover:opacity-100">
                                <button
                                  onClick={() => deleteMessage(message.id)}
                                  className="cursor-pointer rounded-lg p-1.5 hover:bg-muted/50"
                                  title="Hapus pesan"
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className={`shrink-0 border-t p-6 ${themeBorder}`}>
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      sendMessage();
                    }}
                    className="flex gap-2"
                  >
                    <div className="relative" ref={attachmentRef}>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className={`shrink-0 cursor-pointer ${themeHover}`}
                        onClick={() => setShowAttachmentMenu((prev) => !prev)}
                      >
                        <Paperclip className="h-5 w-5" />
                      </Button>
                      {showAttachmentMenu && (
                        <div className="absolute bottom-10 left-0 z-50 w-48 rounded-lg border border-muted bg-card shadow-lg">
                          <button
                            type="button"
                            onClick={() => handleAttachmentClick("image")}
                            className="flex w-full cursor-pointer items-center gap-2 border-b border-muted px-4 py-2 text-left text-sm text-foreground hover:bg-muted/50"
                          >
                            <ImageIcon className="h-4 w-4" />
                            Kirim Gambar
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAttachmentClick("document")}
                            className="flex w-full cursor-pointer items-center gap-2 border-b border-muted px-4 py-2 text-left text-sm text-foreground hover:bg-muted/50"
                          >
                            <FileText className="h-4 w-4" />
                            Kirim File
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAttachmentClick("audio")}
                            className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-left text-sm text-foreground hover:bg-muted/50"
                          >
                            <Music className="h-4 w-4" />
                            Kirim Audio
                          </button>
                        </div>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                    </div>

                    <Input
                      placeholder={`Ketik pesan ke ${currentConversation.name}...`}
                      value={inputMessage}
                      onChange={(event) => setInputMessage(event.target.value)}
                      className={`flex-1 rounded-xl border bg-muted/50 cursor-text ${themeBorder} ${themeFocus}`}
                    />
                    <div className="relative" ref={emojiRef}>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className={`shrink-0 cursor-pointer ${themeHover}`}
                        onClick={() => setShowEmojiMenu((prev) => !prev)}
                      >
                        <Smile className="h-5 w-5" />
                      </Button>
                      {showEmojiMenu && (
                        <div className="absolute bottom-10 right-0 z-50 grid w-48 grid-cols-5 gap-2 rounded-lg border border-muted bg-card p-3 shadow-lg">
                          {emojiOptions.map((emoji) => (
                            <button
                              key={emoji}
                              type="button"
                              onClick={() => handleEmojiClick(emoji)}
                              className="cursor-pointer rounded-lg p-2 text-xl transition-colors hover:bg-muted/50"
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <Button
                      type="submit"
                      size="icon"
                      className={`shrink-0 cursor-pointer ${
                        activeTab === "seller"
                          ? "bg-gradient-to-r from-[#F99912] to-[#d97f05] text-[#181612]"
                          : "bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white"
                      }`}
                      disabled={!inputMessage.trim()}
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex h-full items-center justify-center p-8 text-center">
                <div>
                  {activeTab === "seller" ? (
                    <Store className="mx-auto mb-4 h-12 w-12 text-muted-foreground/40" />
                  ) : (
                    <Truck className="mx-auto mb-4 h-12 w-12 text-muted-foreground/40" />
                  )}
                  <h3 className="text-lg font-semibold text-foreground">
                    Belum ada chat {activeTab === "seller" ? "seller" : "driver"}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {activeTab === "seller"
                      ? "Mulai dari pesanan atau halaman produk untuk membuka percakapan dengan seller."
                      : "Chat driver akan muncul saat ada pesanan yang masuk proses pengiriman."}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
