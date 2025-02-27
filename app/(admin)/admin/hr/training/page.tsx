export const dynamic = "force-dynamic";
import React from "react";
import { getData } from "@/lib/apiResponse";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import FixedHeader from "@/app/(admin)/_components/fixedHeader";
import DataTable from "@/app/(admin)/_components/DataTable";

async function Training() {
  const training = await getData("training");

  const session = await getServerSession(authOptions); // Use getServerSession to fetch session server-side

  const userRole = session?.user?.role;
  const userName = session?.user?.name;

  const data = training
    ? training
        .filter((obj: any) => userRole === "admin" || obj.name === userName) // Only show user's own payslip if not admin
        .map((obj: any) => ({
          id: obj.id,
          name: obj.name,
          startDate: obj.startDate,
          endDate: obj.endDate,
          duration: parseFloat(obj.duration) || "On-going",
          image: obj.image || "No-image",
          description: obj.description,
          price: parseFloat(obj.price) || "No-price",
          modality: obj.modality,
          attachment: obj.attachment || "No-file",
          status: obj.status,
          createdAt: obj.createdAt,
        }))
    : [];

  const columns = [
    "name",
    "startDate",
    "endDate",
    "duration",
    "image",
    "description",
    "price",
    "modality",
    "attachment",
    "createdAt",
  ];

  return (
    <div>
      <FixedHeader link={"/hr/training/new"} title="Training" />
      <div className="p-4">
        <DataTable
          data={data}
          columns={columns}
          updateLink="hr/training"
          resourceName="training"
          filter="name"
        />
      </div>
    </div>
  );
}

export default Training;
