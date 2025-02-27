export const dynamic = "force-dynamic";
import FixedHeader from "@/app/(admin)/_components/fixedHeader";
import React from "react";
import { getData } from "@/lib/apiResponse";
import DataTable from "@/app/(admin)/_components/DataTable";

async function ReceiptsReports() {
  const receipts = await getData("receipts");

  const data = (receipts || []).map((obj: any) => {
    return {
      id: obj.id,
      user: obj.user?.name || "No-user",
      name: obj.name,
      startDate: obj.startDate,
      endDate: obj.endDate,
      duration: parseFloat(obj.duration) || "Pending",
      image: obj.image || "No-image",
      description: obj.description,
      price: obj.price,
      modality: obj.modality,
      attachment: obj.attachment || "No-file",
      status: obj.status,
      createdAt: obj.createdAt,
    };
  });

  const columns = [
    "user",
    "name",
    "startDate",
    "endDate",
    "duration",
    "image",
    "description",
    "price",
    "modality",
    "attachment",
    "status",
    "createdAt",
  ];

  return (
    <div>
      <FixedHeader link={"/hr/receipts/new"} title="Receipts" />
      <div className="p-4">
        <DataTable
          data={data}
          columns={columns}
          updateLink="hr/certification"
          resourceName="certification"
        />
      </div>
    </div>
  );
}

export default ReceiptsReports;
