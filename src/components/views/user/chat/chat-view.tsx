"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import {
  Send,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  CheckCheck,
  Search,
  Store,
  ShoppingBag,
} from "lucide-react";
import { useUserStore } from "@/src/store/user-store";
import { getProductById, products } from "@/src/lib/constants/user/marketplace/products";

type ChatMessage = {
  id: string;
  sender: "seller" | "user";
  message: string;
  time: string;
};

type SellerConversation = {
  sellerName: string;
  sellerDescription: string;
  productName: string;
  unread: number;
  online: boolean;
  messages: ChatMessage[];
};

function buildInitialConversations() {
  const uniqueSellers = new Map<string, SellerConversation>();

  products.forEach((product, index) => {
    if (uniqueSellers.has(product.sellerName)) return;

    uniqueSellers.set(product.sellerName, {
      sellerName: product.sellerName,
      sellerDescription: product.sellerDescription,
      productName: product.name,
      unread: index < 3 ? index + 1 : 0,
      online: index % 2 === 0,
      messages: [
        {
          id: `${product.id}-1`,
          sender: "seller",
          message: `Halo kak, ini ${product.sellerName}. Kalau mau tanya soal ${product.name}, langsung chat di sini ya.`,
          time: "09:00",
        },
        {
          id: `${product.id}-2`,
          sender: "user",
          message: "Baik kak, saya mau cek ketersediaan dan estimasi kirimnya.",
          time: "09:02",
        },
        {
          id: `${product.id}-3`,
          sender: "seller",
          message: "Siap, stok aman dan pengiriman bisa kami proses di hari yang sama.",
          time: "09:03",
        },
      ],
    });
  });

  return Array.from(uniqueSellers.values());
}

export default function ChatPage() {
  const searchParams = useSearchParams();
  const sellerQuery = searchParams.get("seller");
  const { orders } = useUserStore();

  const orderBasedConversations = useMemo(() => {
    const mapped = new Map<string, SellerConversation>();

    orders.forEach((order) => {
      order.items.forEach((item) => {
        const product = getProductById(item.productId);
        if (!product || mapped.has(product.sellerName)) return;

        mapped.set(product.sellerName, {
          sellerName: product.sellerName,
          sellerDescription: product.sellerDescription,
          productName: product.name,
          unread: order.status === "processing" ? 1 : 0,
          online: true,
          messages: [
            {
              id: `${order.id}-${item.productId}-1`,
              sender: "seller",
              message: `Halo kak, pesanan ${product.name} untuk order ${order.id} sedang kami siapkan ya.`,
              time: "10:10",
            },
            {
              id: `${order.id}-${item.productId}-2`,
              sender: "user",
              message: "Siap kak, saya pantau di chat ini ya.",
              time: "10:12",
            },
          ],
        });
      });
    });

    return Array.from(mapped.values());
  }, [orders]);

  const [searchQuery, setSearchQuery] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [conversations, setConversations] = useState<SellerConversation[]>([]);
  const [activeSeller, setActiveSeller] = useState<string | null>(null);

  useEffect(() => {
    const merged = [...orderBasedConversations];
    buildInitialConversations().forEach((conversation) => {
      if (!merged.some((item) => item.sellerName === conversation.sellerName)) {
        merged.push(conversation);
      }
    });

    setConversations(merged);

    if (sellerQuery && merged.some((item) => item.sellerName === sellerQuery)) {
      setActiveSeller(sellerQuery);
      return;
    }

    if (!activeSeller && merged.length > 0) {
      setActiveSeller(merged[0].sellerName);
    }
  }, [orderBasedConversations, sellerQuery, activeSeller]);

  const filteredConversations = conversations.filter((conversation) =>
    `${conversation.sellerName} ${conversation.productName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  const activeConversation =
    filteredConversations.find((item) => item.sellerName === activeSeller) ??
    conversations.find((item) => item.sellerName === activeSeller) ??
    null;

  const sendMessage = () => {
    if (!inputMessage.trim() || !activeConversation) return;

    const nextUserMessage: ChatMessage = {
      id: `${activeConversation.sellerName}-${Date.now()}`,
      sender: "user",
      message: inputMessage.trim(),
      time: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const nextSellerMessage: ChatMessage = {
      id: `${activeConversation.sellerName}-${Date.now()}-reply`,
      sender: "seller",
      message: `Baik kak, pesan untuk ${activeConversation.sellerName} sudah kami terima. Kami balas lebih lanjut secepatnya ya.`,
      time: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.sellerName === activeConversation.sellerName
          ? {
              ...conversation,
              messages: [...conversation.messages, nextUserMessage, nextSellerMessage],
              unread: 0,
            }
          : conversation,
      ),
    );
    setInputMessage("");
  };

  return (
    <div className="h-[calc(100vh-12rem)]">
      <Card className="h-full overflow-hidden border-[#F99912]/10 bg-card/50 backdrop-blur">
        <div className="grid h-full lg:grid-cols-[340px_minmax(0,1fr)]">
          <div className="border-r border-[#F99912]/10">
            <CardHeader className="border-b border-[#F99912]/10">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Store className="h-5 w-5 text-[#F99912]" />
                Chat Seller
              </CardTitle>
              <div className="relative mt-3">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari seller..."
                  className="h-10 rounded-xl border-[#F99912]/10 bg-muted/50 pl-9 focus:border-[#F99912]/50"
                />
              </div>
            </CardHeader>

            <ScrollArea className="h-[calc(100%-105px)]">
              <div className="space-y-2 p-3">
                {filteredConversations.map((conversation) => {
                  const lastMessage =
                    conversation.messages[conversation.messages.length - 1];
                  const isActive = conversation.sellerName === activeSeller;

                  return (
                    <button
                      key={conversation.sellerName}
                      type="button"
                      onClick={() => setActiveSeller(conversation.sellerName)}
                      className={`w-full rounded-2xl border p-3 text-left transition-all ${
                        isActive
                          ? "border-[#F99912]/40 bg-[#F99912]/10"
                          : "border-transparent bg-muted/20 hover:border-[#F99912]/20 hover:bg-muted/40"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F99912] to-[#64762C] text-[#181612]">
                            <Store className="h-5 w-5" />
                            {conversation.online && (
                              <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-card bg-green-500" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="truncate font-semibold text-foreground">
                              {conversation.sellerName}
                            </div>
                            <div className="truncate text-xs text-muted-foreground">
                              {conversation.productName}
                            </div>
                            <div className="mt-1 truncate text-sm text-muted-foreground">
                              {lastMessage?.message}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className="text-[11px] text-muted-foreground">
                            {lastMessage?.time}
                          </span>
                          {conversation.unread > 0 && (
                            <span className="rounded-full bg-[#F99912] px-2 py-0.5 text-[11px] font-semibold text-[#181612]">
                              {conversation.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </ScrollArea>
          </div>

          <div className="flex min-h-0 flex-col">
            {activeConversation ? (
              <>
                <CardHeader className="border-b border-[#F99912]/10">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F99912] to-[#64762C] text-[#181612]">
                        <Store className="h-6 w-6" />
                        {activeConversation.online && (
                          <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-card bg-green-500" />
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {activeConversation.sellerName}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {activeConversation.sellerDescription}
                        </p>
                        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                          <ShoppingBag className="h-3.5 w-3.5" />
                          Produk terkait: {activeConversation.productName}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="hover:bg-[#F99912]/10">
                        <Phone className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:bg-[#F99912]/10">
                        <Video className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:bg-[#F99912]/10">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {activeConversation.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.sender === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                            message.sender === "user"
                              ? "bg-[#F99912] text-[#181612]"
                              : "bg-muted/50"
                          }`}
                        >
                          <p className="text-sm">{message.message}</p>
                          <div
                            className={`mt-1 flex items-center gap-1 text-xs ${
                              message.sender === "user"
                                ? "justify-end text-[#181612]/70"
                                : "text-muted-foreground"
                            }`}
                          >
                            <span>{message.time}</span>
                            {message.sender === "user" && (
                              <CheckCheck className="h-3 w-3" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="border-t border-[#F99912]/10 p-4">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      sendMessage();
                    }}
                    className="flex gap-2"
                  >
                    <Button type="button" variant="ghost" size="icon" className="hover:bg-[#F99912]/10">
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    <Input
                      placeholder={`Ketik pesan ke ${activeConversation.sellerName}...`}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      className="flex-1 rounded-xl border-[#F99912]/10 bg-muted/50 focus:border-[#F99912]/50"
                    />
                    <Button type="button" variant="ghost" size="icon" className="hover:bg-[#F99912]/10">
                      <Smile className="h-5 w-5" />
                    </Button>
                    <Button
                      type="submit"
                      size="icon"
                      className="bg-gradient-to-r from-[#F99912] to-[#64762C] text-[#181612]"
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
                  <Store className="mx-auto mb-4 h-12 w-12 text-muted-foreground/40" />
                  <h3 className="text-lg font-semibold text-foreground">
                    Belum ada chat seller
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Mulai dari pesanan atau halaman produk untuk membuka percakapan dengan seller.
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
