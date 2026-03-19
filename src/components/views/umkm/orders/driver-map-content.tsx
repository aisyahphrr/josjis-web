"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface DriverLocation {
  lat: number;
  lng: number;
  heading?: number;
}

interface DriverMapContentProps {
  driverLocation: DriverLocation;
  customerLocation?: DriverLocation;
  driverName: string;
}

// Fix default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Custom driver icon
const driverIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z'/%3E%3C/svg%3E",
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -10],
  className: "bg-[#F99912] rounded-full shadow-lg",
});

// Custom destination icon
const destinationIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2364762C'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z'/%3E%3C/svg%3E",
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -10],
});

// MapController component untuk mengatur center dan zoom
function MapController({ driverLocation }: { driverLocation: DriverLocation }) {
  const map = useMap();

  useEffect(() => {
    if (driverLocation) {
      map.setView([driverLocation.lat, driverLocation.lng], 16);
    }
  }, [driverLocation, map]);

  return null;
}

export default function DriverMapContent({
  driverLocation,
  customerLocation,
  driverName,
}: DriverMapContentProps) {
  return (
    <div className="rounded-xl overflow-hidden border border-[#F99912]/20 h-80 shadow-lg">
      <MapContainer
        center={[driverLocation.lat, driverLocation.lng]}
        zoom={16}
        style={{ height: "100%", width: "100%", zIndex: 1 }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Driver Marker */}
        <Marker
          position={[driverLocation.lat, driverLocation.lng]}
          icon={driverIcon}
        >
          <Popup>
            <div className="text-sm">
              <p className="font-semibold text-[#F99912]">{driverName}</p>
              <p className="text-muted-foreground text-xs">
                Kecepatan: 45 km/h
              </p>
            </div>
          </Popup>
        </Marker>

        {/* Destination Marker */}
        {customerLocation && (
          <Marker
            position={[customerLocation.lat, customerLocation.lng]}
            icon={destinationIcon}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-semibold text-[#64762C]">Lokasi Pelanggan</p>
              </div>
            </Popup>
          </Marker>
        )}

        <MapController driverLocation={driverLocation} />
      </MapContainer>
    </div>
  );
}
