"use client";

import { useState, useEffect } from "react";
import FixedUserHeader from "@/app/(admin)/_components/fixedUserHeader";
import { Button } from "@/components/ui/button";
import Map from "./_components/Mapping";

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
        <Button onClick={handleGetCurrentLocation} disabled={loading}>
          {loading ? "Getting Location..." : "Get Current Location"}
        </Button>
        <Map data={trackingData} />
      </div>
    </div>
  );
};

export default VehicleTrackingPage;
