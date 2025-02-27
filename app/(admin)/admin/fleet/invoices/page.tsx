export const dynamic = "force-dynamic";
import React from "react";
import { getData } from "@/lib/apiResponse";
import FixedHeader from "@/app/(admin)/_components/fixedHeader";
import DataTable from "@/app/(admin)/_components/DataTable";

async function Invoice() {
  const invoice = await getData("fleetInvoice");

  const data = Array.isArray(invoice)
    ? invoice.map((obj: any) => {
        return {
          id: obj.id,
          name: obj.name,
          location: obj.location,
          time: obj.time,
          paymentType: obj.paymentType,
          amount: parseFloat(obj.amount) || "$0",
          createdAt: obj.createdAt,
        };
      })
    : [];

  const columns = [
    "name",
    "location",
    "time",
    "paymentType",
    "amount",
    "createdAt",
  ];

  return (
    <div>
      <FixedHeader link={"fleet/invoices/new"} title="Invoice" />
      <div className="p-4">
        <DataTable
          data={data}
          columns={columns}
          updateLink="fleet/invoices"
          resourceName="fleetInvoice"
          filter="name"
        />
      </div>
    </div>
  );
}

export default Invoice;
