export interface ChatMessage {
  id: number;
  sender: "customer" | "driver" | "admin" | "umkm";
  message: string;
  time: string;
}

export interface ChatConversation {
  id: number;
  name: string;
  role: "Pelanggan" | "Driver" | "Admin";
  avatar: string;
  color: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  messages: ChatMessage[];
}
