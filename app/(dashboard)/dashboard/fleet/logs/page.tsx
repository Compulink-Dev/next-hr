export const dynamic = "force-dynamic";

import React from "react";
import { getData } from "@/lib/apiResponse";

import FixedHeader from "@/app/(dashboard)/_components/fixedHeader";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import DataTable from "@/app/(dashboard)/_components/DataTable";

async function Logs() {
  // Fetch the logs data instead of drivers
  const logs = await getData("logs");

  const session = await getServerSession(authOptions);
  const userRole = session?.user?.role; // Get user role

  const data = Array.isArray(logs)
    ? logs.map((obj: any) => {
        return {
          id: obj.id,
          name: obj.user?.name,
          date: obj.date,
          time: obj.time,
          mileage: obj.mileage,
          details: obj.details,
          remarks: obj.remarks,
        };
      })
    : [];

  // Define the columns for the logs page
  const columns = ["name", "date", "time", "mileage", "details", "remarks"];

  return (
    <div>
      <FixedHeader link={"/fleet/logs/new"} title="Logs" />
      <div className="p-4">
        <DataTable
          data={data}
          columns={columns}
          updateLink="fleet/logs"
          resourceName="logs"
          userRole={userRole}
          filter="remarks"
        />
      </div>
    </div>
  );
}

export default Logs;
