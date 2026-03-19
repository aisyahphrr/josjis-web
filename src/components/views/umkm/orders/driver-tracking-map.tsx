"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Navigation } from "lucide-react";

interface DriverLocation {
  lat: number;
  lng: number;
  heading?: number;
}

interface DriverTrackingMapProps {
  orderId: string;
  driverName: string;
  customerLocation?: DriverLocation;
  onClose?: () => void;
}

// Dynamically import the map component with SSR disabled
const MapComponent = dynamic(() => import("./driver-map-content"), {
  ssr: false,
  loading: () => (
    <div className="rounded-xl overflow-hidden border border-[#F99912]/20 h-80 w-full flex items-center justify-center bg-muted/30">
      <div className="text-center">
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    </div>
  ),
});

export default function DriverTrackingMap({
  orderId,
  driverName,
  customerLocation,
  onClose,
}: DriverTrackingMapProps) {
  const [driverLocation, setDriverLocation] = useState<DriverLocation>({
    lat: -6.2088,
    lng: 106.8456,
  });

  const [distance, setDistance] = useState<string>("2.5 km");
  const [eta, setEta] = useState<string>("12 menit");
  const [speed, setSpeed] = useState<number>(45);

  // Simulate real-time driver location updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDriverLocation((prev) => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001,
        heading: Math.floor(Math.random() * 360),
      }));

      // Randomly update distance and ETA
      const newDistance = (Math.random() * 5 + 0.5).toFixed(1);
      const newEta = Math.floor(Math.random() * 20 + 5);
      setDistance(`${newDistance} km`);
      setEta(`~${newEta} menit`);
      setSpeed(Math.floor(Math.random() * 60 + 20));
    }, 3000); // Update setiap 3 detik

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      {/* Map Container */}
      <MapComponent
        driverLocation={driverLocation}
        customerLocation={customerLocation}
        driverName={driverName}
      />

      {/* Tracking Info Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gradient-to-br from-[#F99912]/20 to-[#F99912]/5 border border-[#F99912]/30 rounded-xl p-4">
          <p className="text-xs text-muted-foreground mb-1">Jarak</p>
          <p className="font-bold text-lg text-foreground">{distance}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30 rounded-xl p-4">
          <p className="text-xs text-muted-foreground mb-1">ETA</p>
          <p className="font-bold text-lg text-blue-400">{eta}</p>
        </div>
        <div className="bg-gradient-to-br from-[#64762C]/20 to-[#64762C]/5 border border-[#64762C]/30 rounded-xl p-4">
          <p className="text-xs text-muted-foreground mb-1">Kecepatan</p>
          <p className="font-bold text-lg text-[#64762C]">{speed} km/h</p>
        </div>
      </div>

      {/* Driver Info Badge */}
      <div className="flex items-center gap-3 bg-muted/30 p-4 rounded-xl border border-[#F99912]/10">
        <Navigation className="w-5 h-5 text-[#F99912]" />
        <div className="flex-1">
          <p className="font-medium text-foreground">{driverName}</p>
          <p className="text-xs text-muted-foreground">
            Pesanan #{orderId} - Sedang Dalam Perjalanan
          </p>
        </div>
      </div>

      {/* Real-time Status */}
      <div className="text-center py-2">
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <p className="text-xs text-muted-foreground">
            Tracking real-time aktif
          </p>
        </div>
      </div>
    </div>
  );
}
