export const dynamic = "force-dynamic";
import React from "react";
import { getData } from "@/lib/apiResponse";
import DataTable from "@/app/(dashboard)/_components/DataTable";
import FixedHeader from "@/app/(dashboard)/_components/fixedHeader";

async function FleetReports() {
  const fleet = await getData("reports/fleet");

  const data = (fleet || []).map((obj: any) => {
    return {
      id: obj.id,
      name: obj.name,
      mileage: obj.mileage,
      receiptNo: obj.receiptNo,
      description: obj.description,
      vehicleId: obj.vehicleId || "No Vehicle id",
    };
  });

  const columns = ["name", "mileage", "receiptNo", "description", "vehicleId"];

  return (
    <div>
      <FixedHeader link={"/reports/fleet/new"} title="Fleet Reports" />
      <div className="p-4">
        <DataTable
          data={data}
          columns={columns}
          updateLink="reports/fleet"
          resourceName="reports/fleet"
        />
      </div>
    </div>
  );
}

export default FleetReports;
