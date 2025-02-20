export const dynamic = "force-dynamic";

import React from "react";
import { getData } from "@/lib/apiResponse";
import DataTable from "@/app/(admin)/_components/DataTable";
import FixedHeader from "@/app/(admin)/_components/fixedHeader";

async function Driver() {
  const drive = await getData("drivers");

  const data = drive.map((obj: any) => {
    return {
      id: obj.id,
      name: obj.name,
      licenseNumber: obj.licenseNumber,
      status: obj.status,
    };
  });

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
        />
      </div>
    </div>
  );
}

export default Driver;
