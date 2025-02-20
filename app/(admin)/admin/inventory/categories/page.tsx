export const dynamic = "force-dynamic";
import FixedHeader from "@/app/(admin)/_components/fixedHeader";
import React from "react";
import { getData } from "@/lib/apiResponse";
import DataTable from "../adjustments/_components/DataTable";

async function Categories() {
  const categories = await getData("categories");

  const data = categories.map((obj: any) => {
    return {
      id: obj.id,
      name: obj.name,
      description: obj.description,
      createdAt: obj.createdAt,
    };
  });

  const columns = ["name", "description", "createdAt"];

  return (
    <div>
      <FixedHeader link={"/inventory/categories/new"} title="Categories" />
      <div className="p-4">
        <DataTable
          data={data}
          columns={columns}
          updateLink="inventory/categories"
          resourceName="categories"
        />
      </div>
    </div>
  );
}

export default Categories;
