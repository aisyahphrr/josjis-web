"use client";
import { Card, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { Input } from "@/src/components/ui/input";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import {
  Send,
  MoreVertical,
  Paperclip,
  Smile,
  CheckCheck,
  Users,
  Truck,
  Trash2,
  FileText,
  Image as ImageIcon,
  Music,
  ShieldAlert,
} from "lucide-react";
import {
  customerConversations,
  driverConversations,
  adminConversations,
  emojis,
} from "@/src/lib/constants/umkm/chat";
import type { ChatConversation } from "@/src/interface/chat";

export default function ChatPage() {
  const [selectedCustomer, setSelectedCustomer] = useState(
    customerConversations[0],
  );
  const [selectedDriver, setSelectedDriver] = useState(driverConversations[0]);
  const [selectedAdmin, setSelectedAdmin] = useState(adminConversations[0]);
  const [activeTab, setActiveTab] = useState("customers");
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState(selectedCustomer.messages);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [showEmojiMenu, setShowEmojiMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const attachmentRef = useRef<HTMLDivElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Close menu when clicking outside
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

  const handleSelectConversation = (
    conversation: ChatConversation,
    type: "customers" | "drivers" | "admins",
  ) => {
    if (type === "customers") {
      setSelectedCustomer(conversation);
      setMessages(conversation.messages);
    } else if (type === "drivers") {
      setSelectedDriver(conversation);
      setMessages(conversation.messages);
    } else {
      setSelectedAdmin(conversation);
      setMessages(conversation.messages);
    }
    setInputMessage("");
    setOpenMenuId(null);
  };

  const deleteMessage = (messageId: number) => {
    setMessages(messages.filter((msg) => msg.id !== messageId));
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
      const newMessage = {
        id: messages.length + 1,
        sender: "umkm" as const,
        message: `📎 ${file.name}`,
        time: new Date().toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMessage]);
    }
  };

  const handleEmojiClick = (emoji: string) => {
    setInputMessage(inputMessage + emoji);
    setShowEmojiMenu(false);
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: "umkm" as const,
      message: text,
      time: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMessage]);
    setInputMessage("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputMessage);
  };

  const currentConversation =
    activeTab === "customers"
      ? selectedCustomer
      : activeTab === "drivers"
        ? selectedDriver
        : selectedAdmin;

  return (
    <div className="h-[calc(100vh-12rem)]">
      <Card className="h-full bg-card/50 backdrop-blur border-[#64762C]/10 flex flex-col">
        <CardHeader className="border-b border-[#64762C]/10 shrink-0">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Chat UMKM</CardTitle>
          </div>
        </CardHeader>

        <div className="flex-1 flex overflow-hidden">
          {/* Conversation List */}
          <div className="w-100 border-r border-[#64762C]/10 flex flex-col shrink-0">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full border-b border-[#64762C]/10"
            >
              <TabsList className="w-full rounded-none bg-transparent border-b border-[#64762C]/10">
                <TabsTrigger
                  value="customers"
                  className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-b-[#64762C] data-[state=active]:bg-transparent cursor-pointer"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Pelanggan
                </TabsTrigger>
                <TabsTrigger
                  value="drivers"
                  className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-b-[#64762C] data-[state=active]:bg-transparent cursor-pointer"
                >
                  <Truck className="w-4 h-4 mr-2" />
                  Driver
                </TabsTrigger>
                <TabsTrigger
                  value="admins"
                  className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-b-[#64762C] data-[state=active]:bg-transparent cursor-pointer"
                >
                  <ShieldAlert className="w-4 h-4 mr-2" />
                  Admin
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="p-3 border-b border-[#64762C]/10">
              <Input
                placeholder="Cari percakapan..."
                className="bg-muted/50 border-[#64762C]/10 focus:border-[#64762C]/30 rounded-lg text-sm cursor-text"
              />
            </div>

            <ScrollArea className="flex-1">
              <div className="space-y-1 p-2">
                {(activeTab === "customers"
                  ? customerConversations
                  : activeTab === "drivers"
                    ? driverConversations
                    : adminConversations
                ).map((conversation) => {
                  const isSelected =
                    activeTab === "customers"
                      ? selectedCustomer.id === conversation.id
                      : activeTab === "drivers"
                        ? selectedDriver.id === conversation.id
                        : selectedAdmin.id === conversation.id;

                  return (
                    <button
                      key={conversation.id}
                      onClick={() =>
                        handleSelectConversation(
                          conversation,
                          activeTab as "customers" | "drivers" | "admins",
                        )
                      }
                      className={`w-full text-left p-3 rounded-lg transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#64762C]/10 border border-[#64762C]/20"
                          : "hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold shrink-0"
                          style={{ backgroundColor: conversation.color }}
                        >
                          {conversation.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            {conversation.name}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {conversation.lastMessage}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-1 shrink-0">
                          <span className="text-xs text-muted-foreground">
                            {conversation.time}
                          </span>
                          {conversation.unread && (
                            <div className="w-2 h-2 rounded-full bg-[#64762C]" />
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </ScrollArea>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="px-6 py-4 border-b border-[#64762C]/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-semibold"
                  style={{ backgroundColor: currentConversation.color }}
                >
                  {currentConversation.avatar}
                </div>
                <div>
                  <h3 className="font-semibold">{currentConversation.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {currentConversation.role}
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
                      setOpenMenuId(openMenuId ? null : currentConversation.id)
                    }
                  >
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                  {openMenuId === currentConversation.id && (
                    <div className="absolute right-0 top-10 bg-card border border-[#64762C]/20 rounded-lg shadow-lg z-50 w-40">
                      <button
                        onClick={() => setOpenMenuId(null)}
                        className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted/50 flex items-center gap-2 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                        Hapus Pesan
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "umkm" ? "justify-end" : "justify-start"} group`}
                  >
                    <div
                      className={`flex gap-2 max-w-[70%] ${msg.sender === "umkm" ? "flex-row-reverse" : ""}`}
                    >
                      {msg.sender !== "umkm" && (
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-semibold shrink-0"
                          style={{ backgroundColor: currentConversation.color }}
                        >
                          {currentConversation.avatar.charAt(0)}
                        </div>
                      )}
                      <div className="relative">
                        <div
                          className={`rounded-2xl px-4 py-3 ${
                            msg.sender === "umkm"
                              ? "bg-[#64762C] text-white"
                              : "bg-muted/50"
                          }`}
                        >
                          <p className="text-sm">{msg.message}</p>
                          <div
                            className={`flex items-center gap-1 mt-1 ${
                              msg.sender === "umkm" ? "justify-end" : ""
                            }`}
                          >
                            <span
                              className={`text-xs ${
                                msg.sender === "umkm"
                                  ? "text-white/70"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {msg.time}
                            </span>
                            {msg.sender === "umkm" && (
                              <CheckCheck className="w-3 h-3 text-white/70" />
                            )}
                          </div>
                        </div>
                        {msg.sender === "umkm" && (
                          <div className="absolute -left-8 top-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => deleteMessage(msg.id)}
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
                      {emojis.map((emoji) => (
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
}
