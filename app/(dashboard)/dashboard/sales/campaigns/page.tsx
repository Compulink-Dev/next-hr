export const dynamic = "force-dynamic";
import React from "react";
import { getDataWithStatus } from "@/lib/apiResponse";
import FixedHeader from "@/app/(dashboard)/_components/fixedHeader";
import DataTable from "@/app/(dashboard)/_components/DataTable";

export default async function Campaigns() {
  const { data, status } = await getDataWithStatus("campaigns");
  if (status === 401 || status === 403) {
    return <div className="p-6 text-sm text-red-600">Access denied.</div>;
  }
  const rows = Array.isArray(data) ? data.map((o: any) => ({ id: o.id, name: o.name, type: o.type, channel: o.channel, status: o.status, startDate: o.startDate, endDate: o.endDate, budget: o.budget })) : [];
  const columns = ["name", "type", "channel", "status", "startDate", "endDate", "budget"];
  return (
    <div>
      <FixedHeader link={"/sales/campaigns/new"} title="Campaigns" />
      <div className="p-4">
        <DataTable data={rows} columns={columns} updateLink="sales/campaigns" resourceName="campaigns" />
      </div>
    </div>
  );
}