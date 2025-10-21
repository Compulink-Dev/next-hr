export const dynamic = "force-dynamic";
import React from "react";
import { getDataWithStatus } from "@/lib/apiResponse";
import FixedHeader from "@/app/(dashboard)/_components/fixedHeader";
import DataTable from "@/app/(dashboard)/_components/DataTable";

export default async function Companies() {
  const { data, status } = await getDataWithStatus("companies");
  if (status === 401 || status === 403) {
    return <div className="p-6 text-sm text-red-600">Access denied.</div>;
  }
  const rows = Array.isArray(data) ? data.map((o: any) => ({ id: o.id, name: o.name, website: o.website, email: o.email, phone: o.phone, createdAt: o.createdAt })) : [];
  const columns = ["name", "website", "email", "phone", "createdAt"];
  return (
    <div>
      <FixedHeader link={"/sales/companies/new"} title="Companies" />
      <div className="p-4">
        <DataTable data={rows} columns={columns} updateLink="sales/companies" resourceName="companies" />
      </div>
    </div>
  );
}