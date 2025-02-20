export const dynamic = "force-dynamic";
import React from "react";
import { getData } from "@/lib/apiResponse";
import DataTable from "@/app/(admin)/_components/DataTable";
import FixedHeader from "@/app/(admin)/_components/fixedHeader";

async function Tracking() {
  const invoice = await getData("fleetInvoice");

  const data = invoice.map((obj: any) => {
    return {
      id: obj.id,
      name: obj.name,
      location: obj.location,
      time: obj.time,
      paymentType: obj.paymentType,
      amount: parseFloat(obj.amount) || "$0",
      createdAt: obj.createdAt,
    };
  });

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
      <FixedHeader link={"/fleet/tracking/new"} title="Invoice" />
      <div className="p-4">
        <DataTable
          data={data}
          columns={columns}
          updateLink="fleet/invoices"
          resourceName="fleetInvoice"
        />
      </div>
    </div>
  );
}

export default Tracking;
