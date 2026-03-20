"use client";
import { useState } from "react";
import DeckGL from "deck.gl";
import { ScatterplotLayer } from "deck.gl";
import { Map as MapGLComponent } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

interface DeckGLMapProps {
  driverLocation: { lng: number; lat: number };
  storeLocation: { lng: number; lat: number };
  deliveryLocation: { lng: number; lat: number };
  customerName: string;
  storeName: string;
}

interface ViewStateType {
  longitude: number;
  latitude: number;
  zoom: number;
  bearing: number;
  pitch: number;
}

interface LocationData {
  position: [number, number];
  name: string;
  type: string;
}

export default function DeckGLMap({
  driverLocation,
  storeLocation,
  deliveryLocation,
  customerName,
  storeName,
}: DeckGLMapProps) {
  const [viewState, setViewState] = useState<ViewStateType>({
    longitude: storeLocation.lng,
    latitude: storeLocation.lat,
    zoom: 14,
    bearing: 0,
    pitch: 30,
  });

  // Driver layer (current position)
  const driverLayer = new ScatterplotLayer({
    id: "driver-layer",
    data: [
      {
        position: [driverLocation.lng, driverLocation.lat],
        name: "Driver",
        type: "driver",
      },
    ],
    pickable: true,
    opacity: 0.9,
    radiusScale: 10,
    radiusMinPixels: 12,
    radiusMaxPixels: 100,
    lineWidthMinPixels: 1,
    getPosition: (d: LocationData) => d.position,
    getFillColor: () => [100, 200, 76], // Green
    getOutlineColor: () => [255, 255, 255],
    getRadius: () => 8,
    getLineWidth: () => 2,
  });

  // Store layer
  const storeLayer = new ScatterplotLayer({
    id: "store-layer",
    data: [
      {
        position: [storeLocation.lng, storeLocation.lat],
        name: storeName,
        type: "store",
      },
    ],
    pickable: true,
    opacity: 0.8,
    radiusScale: 8,
    radiusMinPixels: 10,
    radiusMaxPixels: 30,
    lineWidthMinPixels: 2,
    getPosition: (d: LocationData) => d.position,
    getFillColor: () => [220, 53, 69], // Red
    getOutlineColor: () => [255, 255, 255],
    getRadius: () => 7,
    getLineWidth: () => 2,
  });

  // Delivery location layer
  const deliveryLayer = new ScatterplotLayer({
    id: "delivery-layer",
    data: [
      {
        position: [deliveryLocation.lng, deliveryLocation.lat],
        name: customerName,
        type: "delivery",
      },
    ],
    pickable: true,
    opacity: 0.8,
    radiusScale: 8,
    radiusMinPixels: 10,
    radiusMaxPixels: 30,
    lineWidthMinPixels: 1,
    getPosition: (d: LocationData) => d.position,
    getFillColor: () => [100, 149, 237], // Blue
    getOutlineColor: () => [255, 255, 255],
    getRadius: () => 7,
    getLineWidth: () => 2,
  });

  return (
    <DeckGL
      viewState={viewState}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onViewStateChange={(e: { viewState: ViewStateType } & any) =>
        setViewState(e.viewState)
      }
      controller={true}
      layers={[storeLayer, deliveryLayer, driverLayer]}
      style={{ width: "100%", height: "100%" }}
    >
      <MapGLComponent mapStyle="https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json" />
    </DeckGL>
  );
}
