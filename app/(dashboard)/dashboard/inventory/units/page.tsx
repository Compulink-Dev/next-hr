export const dynamic = "force-dynamic";
import React from "react";
import { getData } from "@/lib/apiResponse";
import FixedHeader from "@/app/(dashboard)/_components/fixedHeader";
import DataTable from "@/app/(dashboard)/_components/DataTable";

async function Units() {
  const units = await getData("units");

  const data = (units ?? []).map((obj: any) => {
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
