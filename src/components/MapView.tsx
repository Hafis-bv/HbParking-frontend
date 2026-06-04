"use client";

import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

const center = { lat: 40.373932, lng: 49.858398 }; //Baku

export default function MapView() {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <Map
        style={{ width: "100%", height: "500px" }}
        defaultCenter={center}
        defaultZoom={12}
        gestureHandling="greedy"
        disableDefaultUI={false}
      >
        <Marker position={center} />
      </Map>
    </APIProvider>
  );
}
