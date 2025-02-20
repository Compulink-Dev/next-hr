export const dynamic = "force-dynamic";
import FixedHeader from "@/app/(admin)/_components/fixedHeader";
import React from "react";
import { getData } from "@/lib/apiResponse";
import DataTable from "@/app/(admin)/_components/DataTable";

async function Units() {
  const units = await getData("units");

  const data = units.map((obj: any) => {
    return {
      id: obj.id,
      name: obj.name,
      abbreviation: obj.abbreviation,
    };
  });

  const columns = ["name", "abbreviation"];

  return (
    <div>
      <FixedHeader link={"/inventory/units/new"} title="units" />
      <div className="p-4">
        <DataTable
          data={data}
          columns={columns}
          updateLink={"inventory/units"}
          resourceName="units"
        />
      </div>
    </div>
  );
}

export default Units;
