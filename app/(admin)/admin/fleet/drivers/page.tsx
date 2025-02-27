export const dynamic = "force-dynamic";

import React from "react";
import { getData } from "@/lib/apiResponse";
import FixedHeader from "@/app/(admin)/_components/fixedHeader";
import DataTable from "@/app/(admin)/_components/DataTable";

async function Driver() {
  const drive = await getData("drivers");

  const data = Array.isArray(drive)
    ? drive.map((obj: any) => {
        return {
          id: obj.id,
          name: obj.name,
          licenseNumber: obj.licenseNumber,
          status: obj.status,
          createdAt: obj.createdAt,
        };
      })
    : [];

  const columns = ["name", "licenseNumber", "status", "createdAt"];

  return (
    <div>
      <FixedHeader link={"/fleet/drivers/new"} title="Driver" />
      <div className="p-4">
        <DataTable
          data={data}
          columns={columns}
          updateLink="fleet/drivers"
          resourceName="drivers"
          filter="status"
        />
      </div>
    </div>
  );
}

export default Driver;
