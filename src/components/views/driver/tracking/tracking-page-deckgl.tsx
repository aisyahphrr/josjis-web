"use client";
import {
  MapPin,
  Phone,
  ArrowLeft,
  Send,
  CheckCircle,
  Navigation,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import DeckGLMap from "@/src/components/views/driver/tracking/deckgl-map";

// Dummy data
const orders = [
  {
    id: "DLV-001",
    customer: "Sarah W.",
    phone: "+62812xxxxx89",
    address: "Jl. Sudirman No. 45, Bogor Tengah",
    store: "Toko Oleh-Oleh Khas Bogor",
    storeLocation: { lng: 106.806, lat: -6.5971 },
    deliveryLocation: { lng: 106.8155, lat: -6.5903 },
    items: 2,
    status: "delivering",
  },
  {
    id: "DLV-002",
    customer: "Budi A.",
    phone: "+62813xxxxx56",
    address: "Jl. Pajajaran No. 123, Bogor Utara",
    store: "Venus Bakery Bogor",
    storeLocation: { lng: 106.807, lat: -6.572 },
    deliveryLocation: { lng: 106.82, lat: -6.565 },
    items: 3,
    status: "delivering",
  },
];

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function TrackingPageDeckGL({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const router = useRouter();
  const orderId = Array.isArray(searchParams.orderId)
    ? searchParams.orderId[0]
    : searchParams.orderId || "DLV-001";

  const order = orders.find((o) => o.id === orderId) || orders[0];

  const [driverLocation, setDriverLocation] = useState({
    lng: order.storeLocation.lng,
    lat: order.storeLocation.lat,
  });
  const [messages, setMessages] = useState<
    Array<{
      id: string;
      sender: "driver" | "customer";
      text: string;
      time: string;
    }>
  >([
    {
      id: "1",
      sender: "customer",
      text: "Pak, sudah berangkat?",
      time: "14:25",
    },
    {
      id: "2",
      sender: "driver",
      text: "Sudah pak, kondisi jalan lancar",
      time: "14:26",
    },
  ]);
  const [messageInput, setMessageInput] = useState("");
  const [currentDestination, setCurrentDestination] = useState<
    "store" | "customer"
  >("store");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Simulate GPS tracking
  useEffect(() => {
    const interval = setInterval(() => {
      setDriverLocation((prev) => {
        const targetLat =
          currentDestination === "store"
            ? order.storeLocation.lat
            : order.deliveryLocation.lat;
        const targetLng =
          currentDestination === "store"
            ? order.storeLocation.lng
            : order.deliveryLocation.lng;

        const newLat = prev.lat + (targetLat - prev.lat) * 0.01;
        const newLng = prev.lng + (targetLng - prev.lng) * 0.01;

        const dist = calculateDistance(newLat, newLng, targetLat, targetLng);

        if (dist < 0.1) {
          if (currentDestination === "store") {
            setCurrentDestination("customer");
            addMessage("driver", "Sudah sampai toko, ambil pesanan");
          }
        }

        return { lng: newLng, lat: newLat };
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentDestination, order]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = (sender: "driver" | "customer", text: string) => {
    const newMessage = {
      id: Date.now().toString(),
      sender,
      text,
      time: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      addMessage("driver", messageInput);
      setMessageInput("");
      setTimeout(() => {
        addMessage("customer", "Terima kasih ya pak!");
      }, 2000);
    }
  };

  const handleCompleteDelivery = () => {
    addMessage("driver", "Pesanan sudah dikirim, terimakasih!");
    // Navigate to delivery history page after 2 seconds
    setTimeout(() => {
      router.push("/history-driver");
    }, 2000);
  };

  const distanceToDestination =
    currentDestination === "store"
      ? calculateDistance(
          driverLocation.lat,
          driverLocation.lng,
          order.storeLocation.lat,
          order.storeLocation.lng,
        )
      : calculateDistance(
          driverLocation.lat,
          driverLocation.lng,
          order.deliveryLocation.lat,
          order.deliveryLocation.lng,
        );

  return (
    <div className="flex h-screen bg-background">
      {/* Map Section - Left (Deck.gl) */}
      <div className="flex-1 relative">
        <div className="absolute top-4 left-4 z-10">
          <Link href="/orders-active-driver">
            <Button
              size="sm"
              variant="outline"
              className="bg-white/95 backdrop-blur border-[#64762C]/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
          </Link>
        </div>

        {/* Deck.gl Map */}
        <DeckGLMap
          driverLocation={driverLocation}
          storeLocation={order.storeLocation}
          deliveryLocation={order.deliveryLocation}
          customerName={order.customer}
          storeName={order.store}
        />

        {/* Distance Card */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur border border-[#64762C]/20 rounded-lg p-3 shadow-lg">
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4 text-[#F99912]" />
            <div>
              <p className="text-xs text-muted-foreground">
                {currentDestination === "store" ? "Ke Toko:" : "Ke Customer:"}
              </p>
              <p className="font-semibold text-lg text-foreground">
                {distanceToDestination.toFixed(2)} km
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Info Panel - Right */}
      <div className="w-96 bg-card border-l border-border flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold text-foreground">{order.id}</h2>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                currentDestination === "store"
                  ? "bg-[#64762C]/20 text-[#64762C]"
                  : "bg-[#F99912]/20 text-[#F99912]"
              }`}
            >
              {currentDestination === "store" ? "Ambil Pesanan" : "Mengantar"}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{order.store}</p>
        </div>

        {/* Order Details */}
        <div className="p-4 border-b border-border space-y-3">
          <div>
            <p className="text-xs text-muted-foreground font-medium mb-1">
              PENERIMA
            </p>
            <p className="font-semibold text-foreground">{order.customer}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground font-medium mb-1">
              ALAMAT TUJUAN
            </p>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
              <p className="text-sm text-muted-foreground">{order.address}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div>
              <p className="text-xs text-muted-foreground font-medium mb-1">
                ITEM
              </p>
              <p className="font-semibold text-foreground">{order.items}x</p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="w-full border-[#64762C]/30 hover:bg-[#64762C]/10 text-[#64762C]"
            onClick={() => (window.location.href = `tel:${order.phone}`)}
          >
            <Phone className="w-4 h-4 mr-2" />
            Hubungi Pelanggan
          </Button>
        </div>

        {/* Chat Section */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "driver" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg ${
                    msg.sender === "driver"
                      ? "bg-[#64762C] text-white"
                      : "bg-muted text-foreground"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs mt-1 opacity-70">{msg.time}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-border space-y-2">
            <div className="flex gap-2">
              <Input
                placeholder="Ketik pesan..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
                className="bg-background border-[#64762C]/30"
              />
              <Button
                size="sm"
                className="bg-[#64762C] hover:bg-[#64762C]/90"
                onClick={handleSendMessage}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>

            {currentDestination === "customer" && (
              <Button
                className="w-full bg-linear-to-r from-[#F99912] to-[#64762C] text-[#181612] font-semibold"
                onClick={handleCompleteDelivery}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Selesai Antar
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
