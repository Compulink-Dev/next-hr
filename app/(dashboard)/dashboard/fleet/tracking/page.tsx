import React from "react";
import Mapping from "./_components/Mapping";

export const dynamic = "force-dynamic";

type Vehicle = { id: string; name: string; numberPlate: string };
type Track = { latitude: number; longitude: number; timestamp: string };

async function getVehicles(): Promise<Vehicle[]> {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/vehicles`, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    return [];
  }
}

async function getTracks(vehicleId: string): Promise<Track[]> {
  if (!vehicleId) return [];
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/tracking/${vehicleId}`,
      {
        cache: "no-store",
      }
    );
    const data = await res.json();
    return (data || []).map((d: any) => ({
      latitude: d.latitude,
      longitude: d.longitude,
      timestamp: d.timestamp,
    }));
  } catch (error) {
    return [];
  }
}

export default async function TrackingPage({
  searchParams,
}: {
  searchParams: { vehicleId?: string };
}) {
  const vehicles = await getVehicles();
  const defaultVehicleId = searchParams.vehicleId || vehicles[0]?.id;
  const tracks = defaultVehicleId ? await getTracks(defaultVehicleId) : [];

  const points = tracks.map((t) => ({
    latitude: t.latitude,
    longitude: t.longitude,
  }));

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <label className="text-sm">Vehicle</label>
        <select
          defaultValue={defaultVehicleId}
          className="border rounded px-2 py-1"
        >
          {vehicles.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name} ({v.numberPlate})
            </option>
          ))}
        </select>
      </div>
      <Mapping data={points} />
    </div>
  );
}
