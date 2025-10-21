export const dynamic = "force-dynamic";
import React from "react";
import { getData } from "@/lib/apiResponse";
import FixedHeader from "@/app/(dashboard)/_components/fixedHeader";
import DataTable from "@/app/(dashboard)/_components/DataTable";

async function DebitNotes() {
  const notes = await getData("debitnote");

  const data = (notes || []).map((obj: any) => {
    return {
      id: obj.id,
      name: obj.name,
      createdAt: obj.createdAt,
    };
  });

  const columns = [
    "name",
    "createdAt",
  ];

  return (
    <div>
      <FixedHeader link={"/dashboard/purchases/debit-note/new"} title="Debit Notes" />
      <div className="p-4">
        <DataTable
          data={data}
          columns={columns}
          updateLink="purchases/debit-note/update"
          resourceName="debit notes"
        />
      </div>
    </div>
  );
}

export default DebitNotes;
