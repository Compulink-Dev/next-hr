export const dynamic = "force-dynamic";
import React from "react";
import { getData } from "@/lib/apiResponse";
import FixedHeader from "@/app/(dashboard)/_components/fixedHeader";
import DataTable from "@/app/(dashboard)/_components/DataTable";

async function Adjustments() {
  const [addAdjustments, transferAdjustments] = await Promise.all([
    getData("adjustments/add"),
    getData("adjustments/transfer"),
  ]);

  console.log("addAdjustments:", addAdjustments);
  console.log("transferAdjustments:", transferAdjustments);

  const addList = Array.isArray(addAdjustments?.data ?? addAdjustments)
    ? addAdjustments?.data ?? addAdjustments
    : [];

  const transferList = Array.isArray(
    transferAdjustments?.data ?? transferAdjustments
  )
    ? transferAdjustments?.data ?? transferAdjustments
    : [];

  const data = addList.map((obj: any) => ({
    id: obj.id,
    referenceNumber: obj.referenceNumber,
    addStockQty: obj.addStockQty,
    supplierId: obj.supplierId,
  }));

  const transfer = transferList.map((obj: any) => ({
    id: obj.id,
    referenceNumber: obj.referenceNumber,
    transferStockQty: obj.transferStockQty,
  }));

  const columns = ["referenceNumber", "addStockQty", "supplierId"];
  const transferColumns = ["referenceNumber", "transferStockQty"];

  return (
    <div>
      <FixedHeader link={"inventory/adjustments/new"} title="adjustments" />

      <div className="p-4">
        <h2 className="text-lg font-bold mb-4 capitalize">
          Stock increment adjustments
        </h2>
        <DataTable
          data={data}
          columns={columns}
          updateLink={"adjustments/add"}
          resourceName="adjustments/add"
        />
      </div>

      <div className="p-4">
        <h2 className="text-lg font-bold mb-4 capitalize">
          Stock transfer adjustments
        </h2>
        <DataTable
          data={transfer}
          columns={transferColumns}
          updateLink={"adjustments/transfer"}
          resourceName="adjustments/transfer"
        />
      </div>
    </div>
  );
}

export default Adjustments;
