"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Map from "./_components/Map";
import FixedUserHeader from "@/app/(admin)/_components/fixedUserHeader";

interface TrackingData {
  latitude: number;
  longitude: number;
  timestamp: string;
}

const VehicleTrackingPage = ({ params }: { params: { vehicleId: string } }) => {
  const [trackingData, setTrackingData] = useState<TrackingData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrackingData = async () => {
      const response = await fetch(`/api/tracking/${params.vehicleId}`);
      const data = await response.json();
      setTrackingData(data);
    };

    if (params.vehicleId) {
      fetchTrackingData();
    }
  }, [params.vehicleId]);

  // Function to get current location
  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newLocation: TrackingData = {
          latitude,
          longitude,
          timestamp: new Date().toISOString(),
        };

        setTrackingData((prev) => [newLocation, ...prev]); // Add new location at the start
        setLoading(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Failed to get location. Please enable location services.");
        setLoading(false);
      }
    );
  };

  return (
    <div>
      <FixedUserHeader />
      <div className="p-4">
        <button
          onClick={handleGetCurrentLocation}
          className="px-4 py-2 bg-blue-500 text-white rounded-md mb-4"
          disabled={loading}
        >
          {loading ? "Getting Location..." : "Get Current Location"}
        </button>
        <Map data={trackingData} />
      </div>
    </div>
  );
};

export default VehicleTrackingPage;
