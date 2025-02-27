export const dynamic = "force-dynamic";
import React from "react";
import { getData } from "@/lib/apiResponse";
import FixedHeader from "@/app/(dashboard)/_components/fixedHeader";
import DataTable from "@/app/(dashboard)/_components/DataTable";

async function ProjectReports() {
  const projectsReport = await getData("reports/projects");

  const data = (projectsReport || []).map((obj: any) => {
    return {
      id: obj.id,
      name: obj.name,
      purpose: obj.purpose,
      destination: obj.destination,
      startDate: obj.startDate,
      endDate: obj.endDate,
      clientId: obj.clientId,
      status: obj.status,
      createdAt: obj.createdAt,
    };
  });

  const columns = [
    "name",
    "purpose",
    "destination",
    "startDate",
    "endDate",
    "createdAt",
  ];

  return (
    <div>
      <FixedHeader link={"/reports/projects/new"} title="Report" />
      <div className="p-4">
        <DataTable
          data={data}
          columns={columns}
          updateLink="reports/projects"
          resourceName="reports/projects"
        />
      </div>
    </div>
  );
}

export default ProjectReports;
