export const dynamic = "force-dynamic";
import React from "react";
import { getData } from "@/lib/apiResponse";
import FixedHeader from "@/app/(dashboard)/_components/fixedHeader";
import DataTable from "@/app/(dashboard)/_components/DataTable";

async function Invoice() {
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
      <FixedHeader link={"dashboard/projects/job-card/new"} title="Job Card" />
      <div className="p-4">
        <DataTable
          data={data}
          columns={columns}
          updateLink="projects/job-card"
          resourceName="job-card"
        />
      </div>
    </div>
  );
}

export default Invoice;
