export const dynamic = "force-dynamic";
import React from "react";
import { getData } from "@/lib/apiResponse";
import FixedHeader from "@/app/(dashboard)/_components/fixedHeader";
import DataTable from "@/app/(dashboard)/_components/DataTable";

async function Categories() {
  const categories = await getData("categories");

  // Ensure categories is an array
  const data = (categories ?? []).map((obj: any) => {
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
