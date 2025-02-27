"use client";
import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  data: { latitude: number; longitude: number }[];
}

const Map: React.FC<MapProps> = ({ data }) => {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current && mapContainerRef.current) {
      // Initialize the map
      mapRef.current = L.map(mapContainerRef.current).setView([0, 0], 2);

      // Add tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);
    }

    if (data.length > 0 && mapRef.current) {
      const latestLocation = data[0];

      if (markerRef.current) {
        // Update marker position
        markerRef.current.setLatLng([
          latestLocation.latitude,
          latestLocation.longitude,
        ]);
      } else {
        // Create a new marker
        markerRef.current = L.marker(
          [latestLocation.latitude, latestLocation.longitude],
          {
            icon: L.icon({
              iconUrl:
                "https://leafletjs.com/examples/custom-icons/leaf-green.png", // Custom icon
              shadowUrl:
                "https://leafletjs.com/examples/custom-icons/leaf-shadow.png",
              iconSize: [38, 95],
              shadowSize: [50, 64],
              iconAnchor: [22, 94],
              shadowAnchor: [4, 62],
              popupAnchor: [-3, -76],
            }),
          }
        ).addTo(mapRef.current);
      }

      // Set map view to new position
      mapRef.current.setView(
        [latestLocation.latitude, latestLocation.longitude],
        14
      );
    }
  }, [data]);

  return (
    <div ref={mapContainerRef} style={{ height: "400px", width: "100%" }}></div>
  );
};

export default Map;
