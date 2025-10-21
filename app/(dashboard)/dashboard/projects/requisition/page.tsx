export const dynamic = "force-dynamic";
import React from "react";
import { getDataWithStatus } from "@/lib/apiResponse";
import FixedHeader from "@/app/(dashboard)/_components/fixedHeader";
import DataTable from "@/app/(dashboard)/_components/DataTable";
import Forbidden from "@/components/Forbidden";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export default async function RequisitionsPage() {
  const { data, status } = await getDataWithStatus("projects/requisitions");
  if (status === 401 || status === 403) {
    return (
      <div className="p-6">
        <p className="text-sm text-red-600">You don’t have permission to view requisitions.</p>
      </div>
    );
  }

  const rows = Array.isArray(data)
    ? data.map((obj: any) => ({
        id: obj.id,
        name: obj.name,
        purpose: obj.purpose,
        status: obj.status,
        amount: obj.amount,
        requester: obj.requester?.name || "",
        approver: obj.approver?.name || "",
        createdAt: obj.createdAt,
        attachment: obj.attachment || "",
      }))
    : [];

  const columns = [
    "name",
    "purpose",
    "status",
    "amount",
    "requester",
    "approver",
    "createdAt",
  ];

  const session = await getServerSession(authOptions);
  const role = session?.user?.role;

  return (
    <div>
      <FixedHeader link={"/projects/requisition/new"} title="Requisition" />
      <div className="p-4">
        <DataTable
          data={rows}
          columns={columns}
          updateLink="projects/requisition"
          resourceName="projects/requisitions"
          userRole={role}
          actionsConfig={{ resource: 'projects/requisitions', admin: role === 'admin' }}
        />
      </div>
    </div>
  );
}
