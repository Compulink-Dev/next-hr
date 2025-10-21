// app/(dashboard)/sales/leads/page.tsx
import React from "react";
import { getDataWithStatus } from "@/lib/apiResponse";
import FixedHeader from "@/app/(dashboard)/_components/fixedHeader";
import DataTable from "@/app/(dashboard)/_components/DataTable";

export default async function Leads() {
  const { data, status } = await getDataWithStatus("leads");

  if (status === 401 || status === 403) {
    return <div className="p-6 text-sm text-red-600">Access denied.</div>;
  }

  if (status !== 200) {
    return (
      <div className="p-6 text-sm text-red-600">Failed to load leads.</div>
    );
  }

  const rows = Array.isArray(data)
    ? data.map((o: any) => ({
        id: o.id,
        name: o.name,
        email: o.email,
        phone: o.phone,
        status: o.status,
        company: o.company?.name || "",
        createdAt: o.createdAt,
      }))
    : [];

  const columns = ["name", "email", "phone", "status", "company", "createdAt"];

  return (
    <div>
      <FixedHeader link="/sales/leads/new" title="Leads" />
      <div className="p-4">
        <DataTable
          data={rows}
          columns={columns}
          updateLink="sales/leads"
          resourceName="leads"
        />
      </div>
    </div>
  );
}
