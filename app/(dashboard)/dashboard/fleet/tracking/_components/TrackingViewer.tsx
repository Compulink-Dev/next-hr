"use client";
import React, { useEffect, useMemo, useState } from "react";
import Mapping from "./Mapping";

type Vehicle = { id: string; name: string; numberPlate: string };

type Track = { latitude: number; longitude: number; timestamp: string };

export default function TrackingViewer() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [vehicleId, setVehicleId] = useState<string>("");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let abort = new AbortController();
    async function loadVehicles() {
      try {
        const res = await fetch('/api/vehicles', { signal: abort.signal });
        const data = await res.json();
        setVehicles(data || []);
        if (data?.length && !vehicleId) setVehicleId(data[0].id);
      } catch (_) {}
    }
    loadVehicles();
    return () => abort.abort();
  }, []);

  useEffect(() => {
    if (!vehicleId) return;
    let abort = new AbortController();
    async function loadTracks() {
      setLoading(true);
      try {
        const res = await fetch(`/api/tracking/${vehicleId}`, { signal: abort.signal });
        const data = await res.json();
        setTracks((data || []).map((d: any) => ({ latitude: d.latitude, longitude: d.longitude, timestamp: d.timestamp })));
      } catch (_) {
        setTracks([]);
      } finally {
        setLoading(false);
      }
    }
    loadTracks();
    return () => abort.abort();
  }, [vehicleId]);

  const points = useMemo(() => tracks.map(t => ({ latitude: t.latitude, longitude: t.longitude })), [tracks]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <label className="text-sm">Vehicle</label>
        <select value={vehicleId} onChange={e => setVehicleId(e.target.value)} className="border rounded px-2 py-1">
          {vehicles.map(v => (
            <option key={v.id} value={v.id}>{v.name} ({v.numberPlate})</option>
          ))}
        </select>
      </div>
      {loading ? (
        <div className="text-sm text-slate-500">Loading positions…</div>
      ) : (
        <Mapping data={points} />
      )}
    </div>
  );
}