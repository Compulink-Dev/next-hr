// app/(dashboard)/inventory/items/page.tsx
export const dynamic = "force-dynamic";
import React from "react";
import { getData } from "@/lib/apiResponse";
import FixedHeader from "@/app/(dashboard)/_components/fixedHeader";
import DataTable from "@/app/(dashboard)/_components/DataTable";

async function Items() {
  try {
    let items = [];
    try {
      items = await getData("items");
    } catch (error) {
      console.error("Failed to fetch items:", error);
      items = [];
    }

    if (!items || !Array.isArray(items)) {
      console.error("Items data is either undefined or not an array");
      return (
        <div>
          <FixedHeader link={"/inventory/items/new"} title="Items" />
          <div className="p-4">No items available</div>
        </div>
      );
    }

    const data = items.map((obj: any) => {
      return {
        id: obj.id,
        name: obj.name,
        description: obj.description,
        categoryId: obj.categoryId,
        sku: obj.sku,
        barcode: obj.barcode,
        quantity: obj.quantity,
        unitId: obj.unitId,
        brandId: obj.brandId,
        supplierId: obj.supplierId,
        warehouseId: obj.warehouseId,
        sellingPrice: obj.sellingPrice,
        buyingPrice: obj.buyingPrice,
        reOrderPoint: obj.reOrderPoint,
        weight: obj.weight,
        imageUrl: obj.imageUrl,
        dimensions: obj.dimensions,
        taxRate: obj.taxRate,
        notes: obj.notes,
        categoryName: obj.category?.name || "N/A",
        warehouse: obj.warehouse?.name || "N/A",
      };
    });

    const columns = [
      "imageUrl",
      "name",
      "description",
      "sku",
      "barcode",
      "quantity",
      "sellingPrice",
      "buyingPrice",
      "reOrderPoint",
      "weight",
      "taxRate",
      "categoryName",
      "warehouse",
    ];

    return (
      <div>
        <FixedHeader link={"/inventory/items/new"} title="Items" />
        <div className="p-4">
          <DataTable
            data={data}
            columns={columns}
            updateLink={"inventory/items"}
            resourceName="items"
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch items:", error);
    return (
      <div>
        <FixedHeader link={"/inventory/items/new"} title="Items" />
        <div className="p-4">Failed to load items. Please try again later.</div>
      </div>
    );
  }
}

export default Items;
