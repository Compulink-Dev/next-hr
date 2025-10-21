export const dynamic = "force-dynamic";
import React from "react";
import { getDataWithStatus } from "@/lib/apiResponse";
import FixedHeader from "@/app/(dashboard)/_components/fixedHeader";
import DataTable from "@/app/(dashboard)/_components/DataTable";

export default async function Deals() {
  const { data, status } = await getDataWithStatus("deals");
  if (status === 401 || status === 403) {
    return <div className="p-6 text-sm text-red-600">Access denied.</div>;
  }
  const rows = Array.isArray(data) ? data.map((o: any) => ({ id: o.id, name: o.name, amount: o.amount, status: o.status, probability: o.probability || 0, stage: o.stage?.name || '', company: o.company?.name || '', owner: o.owner?.name || '', createdAt: o.createdAt })) : [];
  const columns = ["name", "amount", "status", "probability", "stage", "company", "owner", "createdAt"];
  return (
    <div>
      <FixedHeader link={"/sales/deals/new"} title="Deals" />
      <div className="p-4">
        <DataTable data={rows} columns={columns} updateLink="sales/deals" resourceName="deals" />
      </div>
    </div>
  );
}