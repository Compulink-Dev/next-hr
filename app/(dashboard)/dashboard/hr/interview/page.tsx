export const dynamic = "force-dynamic";
import React from "react";
import { getData } from "@/lib/apiResponse";
import DataTable from "./_components/DataTable";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import FixedHeader from "@/app/(dashboard)/_components/fixedHeader";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AssignPanelistsModal from "./_components/AssignPanelistsModal";

async function Interview() {
  const interviews = await getData("interviews");
  const session = await getServerSession(authOptions);

  const userRole = session?.user?.role;
  const userName = session?.user?.name;
  const userId = session?.user?.id;

  // Safely fetch users data with error handling
  let users = [];
  try {
    const usersResponse = await getData("users");
    users = Array.isArray(usersResponse) ? usersResponse : [];
  } catch (error) {
    console.error("Failed to fetch users:", error);
    users = [];
  }

  // Check if user is assigned to any interviews
  const assignedInterviews = Array.isArray(interviews)
    ? interviews.filter((interview: any) =>
        interview.assignedPanelists?.includes(userId)
      )
    : [];

  const data = Array.isArray(interviews)
    ? interviews
        .filter(
          (obj: any) =>
            userRole === "hr" || userRole === "admin" || obj.name === userName
        )
        .map((obj: any) => ({
          id: obj.id,
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
          assignedPanelists: obj.assignedPanelists || [],
        }))
    : [];

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

  if (
    userRole !== "hr" &&
    userRole !== "admin" &&
    assignedInterviews.length === 0
  ) {
    return (
      <div className="p-4 text-center">
        <p>{`You don't have any assigned interviews.`}</p>
      </div>
    );
  }

  return (
    <div>
      <FixedHeader link={"/hr/interview/new"} title="Interview" />
      <div className="p-4">
        {userRole === "hr" || userRole === "admin" ? (
          <div className="space-y-4">
            <div className="flex justify-end">
              <AssignPanelistsModal
                interviews={data}
                users={users.filter((user: any) => user?.id !== userId)}
              />
            </div>
            <DataTable
              data={data}
              columns={columns}
              updateLink="hr/interview"
              resourceName="interview"
            />
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Your Assigned Interviews</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {assignedInterviews.map((interview: any) => (
                <div
                  key={interview.id}
                  className="border rounded-lg p-4 space-y-2"
                >
                  <h3 className="font-medium">{interview.name}</h3>
                  <p>Position: {interview.post || "Not specified"}</p>
                  <Link href={`/dashboard/hr/interview/panel/${interview.id}`}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-400">
                      Join Panel
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Interview;
