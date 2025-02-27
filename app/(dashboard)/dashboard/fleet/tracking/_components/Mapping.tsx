"use client";
import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  data: { latitude: number; longitude: number }[];
}

const Map: React.FC<MapProps> = ({ data }) => {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
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
      // Remove existing markers
      markersRef.current.forEach((marker) =>
        mapRef.current!.removeLayer(marker)
      );
      markersRef.current = [];

      data.forEach((location) => {
        const marker = L.marker([location.latitude, location.longitude]).addTo(
          mapRef.current!
        );
        markersRef.current.push(marker);
      });

      // Set map view to latest position
      const latestLocation = data[data.length - 1];
      mapRef.current.setView(
        [latestLocation.latitude, latestLocation.longitude],
        14
      );
    }

    // Handle resizing the map if container size changes
    if (mapRef.current) {
      mapRef.current.invalidateSize();
    }
  }, [data]);

  return (
    <div ref={mapContainerRef} style={{ height: "400px", width: "100%" }}></div>
  );
};

export default Map;
