"use client";
import { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import StatusUpdateButton from "./StatusUpdateButton";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react"; // import next-auth

export default function ViewLeave({ id }: { id: string }) {
  const [leave, setLeave] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { data: session } = useSession(); // get session data

  useEffect(() => {
    async function fetchLeave() {
      try {
        const response = await fetch(`/api/leave/${id}`);
        const data = await response.json();
        setLeave(data);
      } catch (error) {
        console.error("Failed to fetch leave:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchLeave();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!leave) return <div>Leave not found</div>;

  // Check if the current user is admin or hr
  const isAdminOrHR =
    session?.user?.role === "admin" || session?.user?.role === "hr";

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Leave Details</h1>
        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Employee Information</h2>
            <p>
              <span className="font-medium">Name:</span> {leave.name}
            </p>
            <p>
              <span className="font-medium">Contact:</span> {leave.contact}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Leave Details</h2>
            <p>
              <span className="font-medium">Status:</span>{" "}
              <span
                className={`${
                  leave.status === "approved"
                    ? "text-green-500"
                    : leave.status === "rejected"
                    ? "text-red-500"
                    : "text-yellow-500"
                }`}
              >
                {leave.status}
              </span>
            </p>
            <p>
              <span className="font-medium">Type:</span> {leave.type}
            </p>
            <p>
              <span className="font-medium">Source:</span> {leave.source}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Dates</h2>
            <p>
              <span className="font-medium">From:</span>{" "}
              {formatDate(leave.from)}
            </p>
            <p>
              <span className="font-medium">To:</span> {formatDate(leave.to)}
            </p>
            <p>
              <span className="font-medium">Duration:</span> {leave.duration}{" "}
              days
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Documents</h2>
            {leave.attachment && leave.attachment !== "No-file" ? (
              <a
                href={leave.attachment}
                download
                className="text-blue-500 hover:underline"
              >
                Download Attachment
              </a>
            ) : (
              <p>No attachment provided</p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Reason</h2>
          <p className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
            {leave.reason || "No reason provided"}
          </p>
        </div>

        <div className="mt-6 flex justify-between items-center">
          {isAdminOrHR && (
            <StatusUpdateButton
              id={leave.id}
              currentStatus={leave.status}
              endpoint="leave"
            />
          )}

          <div className="space-x-2">
            <Button variant="outline" onClick={() => router.back()}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
