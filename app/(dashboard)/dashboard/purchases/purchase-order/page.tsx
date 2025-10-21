export const dynamic = "force-dynamic";
import React from "react";
import { getData } from "@/lib/apiResponse";
import FixedHeader from "@/app/(dashboard)/_components/fixedHeader";
import DataTable from "@/app/(dashboard)/_components/DataTable";
async function PurchaseOrders() {
  const orders = await getData("purchaseorder");

  const data = (orders || []).map((obj: any) => {
    return {
      id: obj.id,
      name: obj.name,
      quantity: obj.quantity,
      unit: obj.unit,
      price: obj.price,
      discount: obj.discount,
      vat: obj.vat,
      total: obj.total,
      createdAt: obj.createdAt,
    };
  });

  const columns = [
    "name",
    "quantity",
    "unit",
    "price",
    "discount",
    "vat",
    "total",
    "createdAt",
  ];

  return (
    <div>
      <FixedHeader
        link={"/dashboard/purchases/purchase-order/new"}
        title="Purchase Orders"
      />
      <div className="p-4">
        <DataTable
          data={data}
          columns={columns}
          updateLink="purchases/purchase-order/update"
          resourceName="purchase orders"
        />
      </div>
    </div>
  );
}

export default PurchaseOrders;
