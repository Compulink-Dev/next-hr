export const dynamic = "force-dynamic";
import React from "react";
import { getDataWithStatus } from "@/lib/apiResponse";
import FixedHeader from "@/app/(dashboard)/_components/fixedHeader";
import DataTable from "@/app/(dashboard)/_components/DataTable";

export default async function Analytics() {
  const { data, status } = await getDataWithStatus("analytics");
  if (status === 401 || status === 403) {
    return <div className="p-6 text-sm text-red-600">Access denied.</div>;
  }
  const rows = Array.isArray(data) ? data.map((o: any) => ({ id: o.id, name: o.name, metric: o.metric, value: o.value, entityType: o.entityType, entityId: o.entityId, createdAt: o.createdAt })) : [];
  const columns = ["name", "metric", "value", "entityType", "entityId", "createdAt"];
  return (
    <div>
      <FixedHeader link={"/sales/analytics/new"} title="Analytics" />
      <div className="p-4">
        <DataTable data={rows} columns={columns} updateLink="sales/analytics" resourceName="analytics" />
      </div>
    </div>
  );
}