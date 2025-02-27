"use client";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import DeleteButton from "../../../inventory/adjustments/_components/DeleteButton";

function DataTable({ data = [], columns = [], updateLink, resourceName }: any) {
  const { data: session } = useSession();
  const userRole = session?.user?.role;
  const userName = session?.user?.name;
  const router = useRouter();

  const [applying, setApplying] = useState<string | null>(null);

  const handleApply = async (vehicleId: string, newStatus: string) => {
    if (!session?.user?.id) {
      console.error("User is not authenticated");
      return;
    }

    try {
      setApplying(vehicleId);
      const res = await fetch(`/api/vehicles/${vehicleId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, userId: session.user.id }),
      });

      if (!res.ok) throw new Error("Failed to update vehicle status");

      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setApplying(null);
    }
  };

  const handleCreateVehicle = async () => {
    if (!session?.user?.id) {
      console.error("User is not authenticated");
      return;
    }

    try {
      const res = await fetch("/api/vehicles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Vehicle Name",
          licensePlate: "XYZ123",
          status: "Available",
          userId: session.user.id,
        }),
      });

      if (!res.ok) throw new Error("Failed to create vehicle");

      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {data.length > 0 ? (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {columns.map((col: string, i: number) => (
                <th key={i} className="px-6 py-3">
                  {col}
                </th>
              ))}
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any) => (
              <tr key={item.id} className="bg-white border-b dark:bg-gray-800">
                {columns.map((col: string, i: number) => (
                  <td key={i} className="px-6 py-4">
                    {col.includes(".")
                      ? col.split(".").reduce((obj, key) => obj?.[key], item)
                      : item[col]}
                  </td>
                ))}
                <td className="px-6 py-4 flex gap-2 items-center">
                  {userRole === "admin" ? (
                    <>
                      <Link
                        href={`/admin/${updateLink}/update/${item.id}`}
                        className="text-blue-600 flex items-center gap-1"
                      >
                        <Edit />
                        <span>Edit</span>
                      </Link>
                      <DeleteButton id={item.id} endpoint={resourceName} />
                    </>
                  ) : item.status === "Available" &&
                    !data.some((v: any) => v.assignedUser === userName) ? (
                    <button
                      onClick={() => handleApply(item.id, "In Transit")}
                      className="text-blue-600"
                      disabled={applying === item.id}
                    >
                      {applying === item.id ? "Processing..." : "Apply"}
                    </button>
                  ) : item.status === "In Transit" &&
                    item.assignedUser === userName ? (
                    <button
                      onClick={() => handleApply(item.id, "Available")}
                      className="text-green-600"
                      disabled={applying === item.id}
                    >
                      {applying === item.id
                        ? "Processing..."
                        : "Mark as Available"}
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-sm text-center py-8">No data available</div>
      )}
    </div>
  );
}

export default DataTable;
