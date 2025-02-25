export const dynamic = "force-dynamic";
import React from "react";
import { getData } from "@/lib/apiResponse";
import DataTable from "./_components/DataTable";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import FixedHeader from "@/app/(admin)/_components/fixedHeader";

async function Interview() {
  const interviews = await getData("interviews");
  const session = await getServerSession(authOptions);

  const userRole = session?.user?.role;
  const userName = session?.user?.name;

  const data = interviews
    .filter((obj: any) => userRole === "admin" || obj.name === userName)
    .map((obj: any) => ({
      id: obj.id, // MongoDB ID
      name: obj.name || "No Name",
      post: obj.post || "No Post",
      qualification: obj.qualification || "No Qualification",
      training: obj.training || "No Training",
      experience: obj.experience || "No Experience",
      knowledge: obj.knowledge || "No Knowledge",
      attributes: obj.attributes || "No Attributes",
      packages: obj.packages || "No Packages",
      rating: obj.rating || 0,
      comment: obj.comment || "No Comment",
      createdAt: obj.createdAt
        ? new Date(obj.createdAt).toLocaleDateString()
        : "N/A",
      updatedAt: obj.updateAt
        ? new Date(obj.updateAt).toLocaleDateString()
        : "N/A",
    }));

  const columns = [
    "name",
    "post",
    "qualification",
    "training",
    "experience",
    "knowledge",
    "attributes",
    "packages",
    "rating",
    "comment",
    "createdAt",
    "updatedAt",
  ];

  return (
    <div>
      <FixedHeader link={"/hr/interview/new"} title="Interview" />
      <div className="p-4">
        <DataTable
          data={data}
          columns={columns}
          updateLink="hr/interview"
          resourceName="interview"
        />
      </div>
    </div>
  );
}

export default Interview;
