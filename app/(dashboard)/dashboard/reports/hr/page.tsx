export const dynamic = "force-dynamic";

import React from "react";
import { getData } from "@/lib/apiResponse";
import DataTable from "@/app/(dashboard)/_components/DataTable";
import FixedHeader from "@/app/(admin)/_components/fixedHeader";

async function HumanResourceReport() {
  const hr = await getData("reports/hr");

  const data = (hr || []).map((obj: any) => {
    return {
      id: obj.id,
      name: obj.name,
      loan: obj.loan || "Not available",
      leave: obj.leave || "Not available",
      date: obj.date,
      createdAt: obj.createdAt || "Not available",
    };
  });

  const columns = ["name", "loan", "leave", "date", "createdAt"];

  return (
    <div>
      <FixedHeader link={"/reports/hr/new"} title="Human Resource" />
      <div className="p-4">
        <DataTable
          data={data}
          columns={columns}
          updateLink="reports/hr"
          resourceName="reports/hr"
          filter="status"
        />
      </div>
    </div>
  );
}

export default HumanResourceReport;
