export const dynamic = "force-dynamic";
import React from "react";
import { getDataWithStatus } from "@/lib/apiResponse";
import FixedHeader from "@/app/(dashboard)/_components/fixedHeader";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import HrDataTable from "./_components/DataTable";
import UserDataTable from "./_components/UserDataTable";
import Forbidden from "@/components/Forbidden";

async function Leave() {
  const { data: leave, status } = await getDataWithStatus("leave");

  const session = await getServerSession(authOptions);
  const userRole = session?.user?.role;
  const userName = session?.user?.name;

  // Helper function to process MongoDB data
  const processMongoData = (data: any) => {
    if (!Array.isArray(data)) return [];

    return data.map((obj: any) => {
      // Handle MongoDB _id field
      const id = obj._id?.$oid || obj.id || obj._id;

      // Handle MongoDB date fields
      const from = obj.from?.$date ? new Date(obj.from.$date) : obj.from;
      const to = obj.to?.$date ? new Date(obj.to.$date) : obj.to;
      const createdAt = obj.createdAt?.$date
        ? new Date(obj.createdAt.$date)
        : obj.createdAt;

      // Handle user relation
      const userName = obj.user?.name || obj.name;

      return {
        id,
        name: userName,
        type: obj.type,
        source: obj.source,
        from,
        to,
        duration: obj.duration,
        contact: obj.contact,
        reason: obj.reason,
        status: obj.status || "pending",
        attachment: obj.attachment || "No-file",
        createdAt,
      };
    });
  };

  // Process and filter data
  const processedData = processMongoData(leave);

  const data = processedData.filter((obj: any) => {
    if (userRole === "hr" || userRole === "admin") {
      return true; // HR and Admin see all records
    }
    return obj.name === userName; // Regular users only see their own
  });

  const countLoansByStatus = (status: string) =>
    data?.filter((loan: any) => loan.status === status).length;

  const columns = [
    "name",
    "type",
    "source",
    "from",
    "to",
    "duration",
    "contact",
    "reason",
    "status",
    "attachment",
    "createdAt",
  ];

  const userColumns = [
    "type",
    "source",
    "from",
    "to",
    "duration",
    "contact",
    "reason",
    "status",
    "attachment",
    "createdAt",
  ];

  if (status === 401 || status === 403) {
    return (
      <div className="p-6">
        <Forbidden message="You don't have permission to view Leave records." />
      </div>
    );
  }

  return (
    <div>
      <FixedHeader link={"/hr/leave/new"} title="Leave" />

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4">
        <div className="p-4 bg-green-100 rounded shadow-md text-center">
          <h2 className="text-lg font-bold">Approved</h2>
          <p className="text-2xl">{countLoansByStatus("approved")}</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded shadow-md text-center">
          <h2 className="text-lg font-bold">Pending</h2>
          <p className="text-2xl">{countLoansByStatus("pending")}</p>
        </div>
        <div className="p-4 bg-red-100 rounded shadow-md text-center">
          <h2 className="text-lg font-bold">Rejected</h2>
          <p className="text-2xl">{countLoansByStatus("rejected")}</p>
        </div>
      </div>

      {/* Data Table */}
      <div className="p-4">
        {userRole === "hr" || userRole === "admin" ? (
          <HrDataTable
            data={data}
            columns={columns}
            updateLink="hr/leave"
            resourceName="leave"
            filter={"status"}
          />
        ) : (
          <UserDataTable
            data={data}
            columns={userColumns}
            updateLink="hr/leave"
            resourceName="leave"
            filter={"status"}
          />
        )}
      </div>
    </div>
  );
}

export default Leave;
