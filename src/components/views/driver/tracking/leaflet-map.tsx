"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet's default icon path issues in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Create custom icons
const createIcon = (color: string) => {
  return L.divIcon({
    className: "custom-div-icon",
    html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

const driverIcon = L.divIcon({
  className: "driver-icon",
  html: `<div style="font-size: 32px; filter: drop-shadow(0px 2px 4px rgba(0,0,0,0.3)); display: flex; align-items: center; justify-content: center; width: 40px; height: 40px;">🛵</div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

const storeIcon = createIcon("#dc3545"); // Red
const customerIcon = createIcon("#0d6efd"); // Blue

// Helper component to recenter map when driver moves
function MapUpdater({ driverLocation }: { driverLocation: { lat: number; lng: number } }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([driverLocation.lat, driverLocation.lng], map.getZoom(), { animate: true, duration: 1.5 });
  }, [driverLocation.lat, driverLocation.lng, map]);
  return null;
}

interface LeafletMapProps {
  driverLocation: { lng: number; lat: number };
  storeLocation: { lng: number; lat: number };
  deliveryLocation: { lng: number; lat: number };
  customerName: string;
  storeName: string;
  routePath?: [number, number][]; // Array of [lon, lat] from OSRM
}

export default function LeafletMap({
  driverLocation,
  storeLocation,
  deliveryLocation,
  routePath = [],
}: LeafletMapProps) {
  // OSRM returns [lon, lat], but Leaflet expects [lat, lon]
  const polylinePositions = routePath.map((p) => [p[1], p[0]] as [number, number]);

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer
        center={[storeLocation.lat, storeLocation.lng]}
        zoom={14}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">carto.com</a>'
        />
        
        {/* Draw the route path */}
        {polylinePositions.length > 0 && (
          <Polyline positions={polylinePositions} color="#4A89F3" weight={6} opacity={0.8} />
        )}
        
        {/* Render markers */}
        <Marker position={[storeLocation.lat, storeLocation.lng]} icon={storeIcon} />
        <Marker position={[deliveryLocation.lat, deliveryLocation.lng]} icon={customerIcon} />
        <Marker position={[driverLocation.lat, driverLocation.lng]} icon={driverIcon} />
        
        {/* Auto Recenter */}
        <MapUpdater driverLocation={driverLocation} />
      </MapContainer>
    </div>
  );
}
