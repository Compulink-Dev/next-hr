export const dynamic = "force-dynamic";
import React from "react";
import { getDataWithStatus } from "@/lib/apiResponse";
import FixedHeader from "@/app/(dashboard)/_components/fixedHeader";
import DataTable from "@/app/(dashboard)/_components/DataTable";
import Forbidden from "@/components/Forbidden";

export default async function DocumentsPage() {
  const { data, status } = await getDataWithStatus("documents");
  if (status === 401 || status === 403) {
    return (
      <div className="p-6">
        <Forbidden message="You don’t have permission to view Documents." />
      </div>
    );
  }

  const rows = Array.isArray(data)
    ? data.map((d: any) => ({
        id: d.id,
        name: d.name,
        subTitle: d.subTitle,
        category: d.category,
        visibility: d.visibility,
        createdAt: d.createdAt,
      }))
    : [];

  const columns = ["name", "subTitle", "category", "visibility", "createdAt"];

  return (
    <div>
      <FixedHeader link={"/documents/new"} title="Documents" />
      <div className="p-4">
        <DataTable data={rows} columns={columns} updateLink="documents" resourceName="documents" />
      </div>
    </div>
  );
}