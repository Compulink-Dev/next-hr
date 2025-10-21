export const dynamic = "force-dynamic";
import React from "react";
import { getDataWithStatus } from "@/lib/apiResponse";
import FixedHeader from "@/app/(dashboard)/_components/fixedHeader";
import DataTable from "@/app/(dashboard)/_components/DataTable";

export default async function Pipeline() {
  const { data, status } = await getDataWithStatus("pipeline");
  if (status === 401 || status === 403) {
    return <div className="p-6 text-sm text-red-600">Access denied.</div>;
  }
  const rows = Array.isArray(data) ? data.map((o: any) => ({ id: o.id, name: o.name, order: o.order })) : [];
  const columns = ["name", "order"];
  return (
    <div>
      <FixedHeader link={"/sales/pipeline/new"} title="Pipeline" />
      <div className="p-4">
        <DataTable data={rows} columns={columns} updateLink="sales/pipeline" resourceName="pipeline" />
      </div>
    </div>
  );
}