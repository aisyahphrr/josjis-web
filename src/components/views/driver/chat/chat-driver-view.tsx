"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import {
  Store,
  User,
  Send,
  MoreVertical,
  Paperclip,
  Smile,
  CheckCheck,
  Trash2,
  FileText,
  Image as ImageIcon,
  Music,
} from "lucide-react";

interface Message {
  id: string;
  sender: "me" | "seller" | "buyer";
  message: string;
  time: string;
}

interface Order {
  id: string;
  storeName: string;
  customer: string;
  color: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: boolean;
}

const orders: Order[] = [
  {
    id: "DLV-001",
    storeName: "Toko Oleh-Oleh Khas Bogor",
    customer: "Sarah W.",
    color: "#64762C",
    avatar: "T",
    lastMessage: "Pesanan sudah siap di pick up",
    time: "10:30",
    unread: true,
  },
  {
    id: "DLV-002",
    storeName: "Venus Bakery Bogor",
    customer: "Budi A.",
    color: "#F99912",
    avatar: "V",
    lastMessage: "Berapa estimasi waktu kedatangan?",
    time: "10:40",
    unread: false,
  },
  {
    id: "DLV-003",
    storeName: "Asinan Pak Jamal",
    customer: "Citra N.",
    color: "#9370DB",
    avatar: "A",
    lastMessage: "Terimakasih sudah membantu",
    time: "09:15",
    unread: false,
  },
];

const sellerMessages: Message[] = [
  {
    id: "1",
    sender: "seller",
    message: "Halo, pesanan sudah siap di pick up ya",
    time: "10:30",
  },
  {
    id: "2",
    sender: "me",
    message: "Baik, saya sedang dalam perjalanan. ETA 15 menit",
    time: "10:32",
  },
  {
    id: "3",
    sender: "seller",
    message: "Oke, saya tunggu di tempat",
    time: "10:33",
  },
];

const buyerMessages: Message[] = [
  {
    id: "1",
    sender: "buyer",
    message: "Berapa estimasi waktu kedatangan?",
    time: "10:40",
  },
  {
    id: "2",
    sender: "me",
    message: "Sudah berangkat, estimasi 20 menit lagi",
    time: "10:42",
  },
  {
    id: "3",
    sender: "buyer",
    message: "Baik, terimakasih",
    time: "10:43",
  },
];

const ChatDriverView = () => {
  const [ordersList, setOrdersList] = useState<Order[]>(orders);
  const [selectedOrder, setSelectedOrder] = useState<Order>(orders[0]);
  const [activeTab, setActiveTab] = useState<"seller" | "buyer">("seller");
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState({
    seller: sellerMessages,
    buyer: buyerMessages,
  });
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
      if (
        emojiRef.current &&
        !emojiRef.current.contains(event.target as Node)
      ) {
        setShowEmojiMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectOrder = (order: Order) => {
    setSelectedOrder(order);
    setInputMessage("");
    setOpenMenuId(null);
  };

  const deleteMessage = (type: "seller" | "buyer", messageId: string) => {
    setMessages({
      ...messages,
      [type]: messages[type].filter((msg) => msg.id !== messageId),
    });
    setOpenMenuId(null);
  };

  const deleteAllMessages = () => {
    setMessages({
      seller: [],
      buyer: [],
    });
    setOpenMenuId(null);
  };

  const deleteOrder = (orderId: string) => {
    const updatedOrders = ordersList.filter((order) => order.id !== orderId);
    setOrdersList(updatedOrders);
    if (selectedOrder.id === orderId && updatedOrders.length > 0) {
      setSelectedOrder(updatedOrders[0]);
    }
    setOpenMenuId(null);
  };

  const handleAttachmentClick = (type: "image" | "document" | "audio") => {
    if (fileInputRef.current) {
      fileInputRef.current.accept =
        type === "image"
          ? "image/*"
          : type === "audio"
            ? "audio/*"
            : ".pdf,.doc,.docx,.txt,.xlsx";
      fileInputRef.current.click();
    }
    setShowAttachmentMenu(false);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: "me",
        message: `📎 ${file.name}`,
        time: new Date().toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages({
        ...messages,
        [activeTab]: [...messages[activeTab], newMessage],
      });
    }
  };

  const handleEmojiClick = (emoji: string) => {
    setInputMessage(inputMessage + emoji);
    setShowEmojiMenu(false);
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "me",
      message: text,
      time: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages({
      ...messages,
      [activeTab]: [...messages[activeTab], newMessage],
    });
    setInputMessage("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputMessage);
  };

  return (
    <div className="h-[calc(100vh-12rem)]">
      <Card className="h-full bg-card/50 backdrop-blur border-[#64762C]/10 flex flex-col">
        <CardHeader className="border-b border-[#64762C]/10 shrink-0">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Chat Driver</CardTitle>
          </div>
        </CardHeader>

        <div className="flex-1 flex overflow-hidden">
          {/* Conversation List - Left Sidebar */}
          <div className="w-100 border-r border-[#64762C]/10 flex flex-col shrink-0">
            <div className="p-3 border-b border-[#64762C]/10">
              <Input
                placeholder="Cari pesanan..."
                className="bg-muted/50 border-[#64762C]/10 focus:border-[#64762C]/30 rounded-lg text-sm cursor-text"
              />
            </div>

            <ScrollArea className="flex-1">
              <div className="space-y-1 p-2">
                {ordersList.map((order) => (
                  <button
                    key={order.id}
                    onClick={() => handleSelectOrder(order)}
                    className={`w-full text-left p-3 rounded-lg transition-all cursor-pointer ${
                      selectedOrder.id === order.id
                        ? "bg-[#64762C]/10 border border-[#64762C]/20"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold shrink-0"
                        style={{ backgroundColor: order.color }}
                      >
                        {order.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">
                          {order.id}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {order.lastMessage}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className="text-xs text-muted-foreground">
                          {order.time}
                        </span>
                        {order.unread && (
                          <div className="w-2 h-2 rounded-full bg-[#64762C]" />
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Chat Area - Right */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="px-6 py-4 border-b border-[#64762C]/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-semibold"
                  style={{ backgroundColor: selectedOrder.color }}
                >
                  {selectedOrder.avatar}
                </div>
                <div>
                  <h3 className="font-semibold">{selectedOrder.id}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedOrder.storeName}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative" ref={menuRef}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-[#64762C]/10 cursor-pointer"
                    onClick={() =>
                      setOpenMenuId(openMenuId ? null : selectedOrder.id)
                    }
                  >
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                  {openMenuId === selectedOrder.id && (
                    <div className="absolute right-0 top-10 bg-card border border-[#64762C]/20 rounded-lg shadow-lg z-50 w-48">
                      <button
                        onClick={deleteAllMessages}
                        className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted/50 flex items-center gap-2 cursor-pointer border-b border-[#64762C]/10"
                      >
                        <Trash2 className="w-4 h-4" />
                        Hapus Semua Pesan
                      </button>
                      <button
                        onClick={() => deleteOrder(selectedOrder.id)}
                        className="w-full px-4 py-2 text-left text-sm text-destructive hover:bg-destructive/10 flex items-center gap-2 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                        Hapus Pesanan
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tab untuk Seller/Buyer */}
            <div className="px-6 pt-4 border-b border-[#64762C]/10 shrink-0">
              <Tabs
                value={activeTab}
                onValueChange={(value) =>
                  setActiveTab(value as "seller" | "buyer")
                }
                className="w-auto"
              >
                <TabsList className="bg-transparent border-b border-[#64762C]/10 w-auto">
                  <TabsTrigger
                    value="seller"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-b-[#64762C] data-[state=active]:bg-transparent cursor-pointer"
                  >
                    <Store className="w-4 h-4 mr-2" />
                    Penjual
                  </TabsTrigger>
                  <TabsTrigger
                    value="buyer"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-b-[#64762C] data-[state=active]:bg-transparent cursor-pointer"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Pembeli
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-4">
                {messages[activeTab].map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"} group`}
                  >
                    <div
                      className={`flex gap-2 max-w-[70%] ${msg.sender === "me" ? "flex-row-reverse" : ""}`}
                    >
                      {msg.sender === "me" && (
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-semibold shrink-0"
                          style={{ backgroundColor: selectedOrder.color }}
                        >
                          D
                        </div>
                      )}
                      <div className="relative">
                        <div
                          className={`rounded-2xl px-4 py-3 ${
                            msg.sender === "me"
                              ? "bg-[#64762C] text-white"
                              : "bg-muted/50"
                          }`}
                        >
                          <p className="text-sm">{msg.message}</p>
                          <div
                            className={`flex items-center gap-1 mt-1 ${
                              msg.sender === "me" ? "justify-end" : ""
                            }`}
                          >
                            <span
                              className={`text-xs ${
                                msg.sender === "me"
                                  ? "text-white/70"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {msg.time}
                            </span>
                            {msg.sender === "me" && (
                              <CheckCheck className="w-3 h-3 text-white/70" />
                            )}
                          </div>
                        </div>
                        {msg.sender === "me" && (
                          <div className="absolute -left-8 top-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => deleteMessage(activeTab, msg.id)}
                              className="p-1.5 hover:bg-muted/50 rounded-lg cursor-pointer"
                              title="Hapus pesan"
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-6 border-t border-[#64762C]/10 shrink-0">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <div className="relative" ref={attachmentRef}>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="hover:bg-[#64762C]/10 shrink-0 cursor-pointer"
                    onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                  >
                    <Paperclip className="w-5 h-5" />
                  </Button>
                  {showAttachmentMenu && (
                    <div className="absolute left-0 bottom-10 bg-card border border-[#64762C]/20 rounded-lg shadow-lg z-50 w-48">
                      <button
                        type="button"
                        onClick={() => handleAttachmentClick("image")}
                        className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted/50 flex items-center gap-2 cursor-pointer border-b border-[#64762C]/10"
                      >
                        <ImageIcon className="w-4 h-4" />
                        Kirim Gambar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAttachmentClick("document")}
                        className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted/50 flex items-center gap-2 cursor-pointer border-b border-[#64762C]/10"
                      >
                        <FileText className="w-4 h-4" />
                        Kirim File
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAttachmentClick("audio")}
                        className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted/50 flex items-center gap-2 cursor-pointer"
                      >
                        <Music className="w-4 h-4" />
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
                  placeholder="Ketik pesan..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="flex-1 bg-muted/50 border-[#64762C]/10 focus:border-[#64762C]/50 rounded-xl cursor-text"
                />
                <div className="relative" ref={emojiRef}>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="hover:bg-[#64762C]/10 shrink-0 cursor-pointer"
                    onClick={() => setShowEmojiMenu(!showEmojiMenu)}
                  >
                    <Smile className="w-5 h-5" />
                  </Button>
                  {showEmojiMenu && (
                    <div className="absolute right-0 bottom-10 bg-card border border-[#64762C]/20 rounded-lg shadow-lg z-50 p-3 grid grid-cols-5 gap-2 w-48">
                      {[
                        "😊",
                        "😂",
                        "😍",
                        "🤔",
                        "👍",
                        "❤️",
                        "🎉",
                        "🚀",
                        "👌",
                        "💯",
                        "🙏",
                        "✨",
                        "😎",
                        "🔥",
                        "⭐",
                        "💪",
                        "😅",
                        "🤗",
                        "😋",
                        "🙌",
                      ].map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => handleEmojiClick(emoji)}
                          className="text-xl hover:bg-muted/50 p-2 rounded-lg transition-colors cursor-pointer"
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
                  className="bg-linear-to-r from-[#64762C] to-[#3d5517] text-white shrink-0 cursor-pointer"
                  disabled={!inputMessage.trim()}
                >
                  <Send className="w-5 h-5" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChatDriverView;
