export const dynamic = "force-dynamic";
import React from "react";
import { getData } from "@/lib/apiResponse";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import FixedHeader from "@/app/(dashboard)/_components/fixedHeader";
import DataTable from "@/app/(dashboard)/_components/DataTable";

async function Certification() {
  const certificate = (await getData("certification")) || [];

  const session = await getServerSession(authOptions); // Use getServerSession to fetch session server-side

  const userRole = session?.user?.role;
  const userName = session?.user?.name;

  const data = certificate
    .filter((obj: any) => userRole === "admin" || obj.name === userName) // Only show user's own payslip if not admin
    .map((obj: any) => ({
      id: obj.id,
      user: obj.name,
      name: obj.user?.name || "No-user",
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
    }));

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
      <FixedHeader link={"/hr/certification/new"} title="Certificate" />
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

export default Certification;
