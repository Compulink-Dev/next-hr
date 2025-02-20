export const dynamic = "force-dynamic";
import FixedHeader from "@/app/(admin)/_components/fixedHeader";
import React from "react";
import { getData } from "@/lib/apiResponse";
import DataTable from "@/app/(admin)/_components/DataTable";

async function Brands() {
  const brands = await getData("brands");

  const data = brands.map((obj: any) => {
    return {
      id: obj.id,
      name: obj.name,
      createdAt: obj.createdAt,
      updatedAt: obj.updatedAt,
    };
  });

  const columns = ["name", "createdAt"];

  return (
    <div>
      <FixedHeader link={"/inventory/brands/new"} title="Brands" />
      <div className="p-4">
        <DataTable
          data={data}
          columns={columns}
          updateLink="inventory/brands"
          resourceName="brands"
        />
      </div>
    </div>
  );
}

export default Brands;
