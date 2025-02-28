"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

import FixedUserHeader from "@/app/(admin)/_components/fixedUserHeader";

interface TrackingData {
  latitude: number;
  longitude: number;
  timestamp: string;
}
const Map = dynamic(() => import("./_components/Map"), { ssr: false });

const VehicleTrackingPage = ({ params }: { params: { vehicleId: string } }) => {
  const [trackingData, setTrackingData] = useState<TrackingData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrackingData = async () => {
      try {
        const response = await fetch(`/api/tracking/${params.vehicleId}`);
        if (!response.ok) throw new Error("Failed to fetch tracking data.");
        const data = await response.json();
        setTrackingData(data);
      } catch (err) {
        setError("Error fetching tracking data.");
        console.error(err);
      }
    };

    if (params.vehicleId) {
      fetchTrackingData();
    }
  }, [params.vehicleId]);

  // Function to get current location
  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    setError(null);

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
        setError("Failed to get location. Please enable location services.");
        setLoading(false);
      }
    );
  };

  return (
    <div>
      <FixedUserHeader />
      <div className="p-4">
        {error && <p className="text-red-500">{error}</p>}
        <button
          onClick={handleGetCurrentLocation}
          className="px-4 py-2 bg-blue-500 text-white rounded-md mb-4 disabled:opacity-50"
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
