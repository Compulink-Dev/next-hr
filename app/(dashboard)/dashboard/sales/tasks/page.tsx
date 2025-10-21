export const dynamic = "force-dynamic";
import React from "react";
import { getDataWithStatus } from "@/lib/apiResponse";
import FixedHeader from "@/app/(dashboard)/_components/fixedHeader";
import DataTable from "@/app/(dashboard)/_components/DataTable";

export default async function Tasks() {
  const { data, status } = await getDataWithStatus("tasks");
  if (status === 401 || status === 403) {
    return <div className="p-6 text-sm text-red-600">Access denied.</div>;
  }
  const rows = Array.isArray(data) ? data.map((o: any) => ({ id: o.id, title: o.title, status: o.status, dueDate: o.dueDate, entityType: o.entityType, entityId: o.entityId, createdAt: o.createdAt })) : [];
  const columns = ["title", "status", "dueDate", "entityType", "entityId", "createdAt"];
  return (
    <div>
      <FixedHeader link={"/sales/tasks/new"} title="Tasks" />
      <div className="p-4">
        <DataTable data={rows} columns={columns} updateLink="sales/tasks" resourceName="tasks" />
      </div>
    </div>
  );
}