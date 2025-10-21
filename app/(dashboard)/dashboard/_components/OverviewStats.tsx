"use client";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";

type CountResult = {
  key: string;
  title: string;
  href: string;
  count: number | null;
  loading: boolean;
  error?: string;
};

const endpoints = [
  { key: "items", title: "Inventory Items", href: "/dashboard/inventory/items", url: "/api/items" },
  { key: "invoices", title: "Sales Invoices", href: "/dashboard/sales/invoices", url: "/api/invoices" },
  { key: "employees", title: "Employees", href: "/dashboard/hr/employees", url: "/api/employees" },
  { key: "leave", title: "Leave Requests", href: "/dashboard/hr/leave", url: "/api/leave" },
  { key: "vehicles", title: "Fleet Vehicles", href: "/dashboard/fleet/vehicles", url: "/api/vehicles" },
] as const;

function deriveCount(data: any): number | null {
  try {
    if (Array.isArray(data)) return data.length;
    if (data == null) return null;
    if (Array.isArray(data?.data)) return data.data.length;
    if (typeof data?.count === "number") return data.count;
    // Some handlers may return objects keyed by records
    if (typeof data === "object") {
      // last resort: count enumerable values
      const values = Object.values(data);
      if (values.length && Array.isArray(values[0])) return (values[0] as any[]).length;
    }
    return null;
  } catch {
    return null;
  }
}

export default function OverviewStats() {
  const [results, setResults] = useState<Record<string, CountResult>>(() => {
    const base: Record<string, CountResult> = {};
    endpoints.forEach((e) => {
      base[e.key] = { key: e.key, title: e.title, href: e.href, count: null, loading: true };
    });
    return base;
  });

  useEffect(() => {
    const abort = new AbortController();
    async function run() {
      await Promise.all(
        endpoints.map(async (e) => {
          try {
            const res = await fetch(e.url, { signal: abort.signal });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            const count = deriveCount(data);
            setResults((prev) => ({
              ...prev,
              [e.key]: { ...prev[e.key], loading: false, count },
            }));
          } catch (err: any) {
            if (abort.signal.aborted) return;
            setResults((prev) => ({
              ...prev,
              [e.key]: { ...prev[e.key], loading: false, error: err?.message ?? "Error" },
            }));
          }
        })
      );
    }
    run();
    return () => abort.abort();
  }, []);

  const cards = useMemo(() => endpoints.map((e) => results[e.key]), [results]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4">
      {cards.map((card) => (
        <div key={card.key} className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm">
          <div className="flex items-baseline justify-between">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">{card.title}</h3>
            <Link href={card.href} className="text-xs text-blue-600 dark:text-blue-400 hover:underline">View</Link>
          </div>
          <div className="mt-3 h-10 flex items-center">
            {card.loading ? (
              <div className="h-6 w-14 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
            ) : card.error ? (
              <span className="text-xs text-red-500">{card.error}</span>
            ) : (
              <span className="text-2xl font-semibold text-gray-900 dark:text-white">{card.count ?? "-"}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}