"use client";

import DeleteButton from "@/components/DeleteButton";
import EditButton from "@/components/EditButton";
import { Edit } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

function DataTable({ data = [], columns = [], updateLink, resourceName }: any) {
  const { data: session } = useSession();
  const userRole = session?.user?.role;
  const userName = session?.user?.name;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  // Fetch users (to allow selecting a user for driver creation)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users"); // Endpoint to fetch users
        const userData = await response.json();
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleCreateDriver = async () => {
    if (!session?.user?.id) {
      console.error("User is not authenticated");
      return;
    }

    if (!selectedUserId) {
      console.error("No user selected for driver");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/drivers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: selectedUserId }), // Include the selected userId
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error creating driver:", errorData);
      } else {
        router.refresh(); // Refresh data after successful creation
      }
    } catch (error) {
      console.error("Request failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {data.length > 0 ? (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {columns.map((item: any, i: any) => (
                <th key={i} scope="col" className="px-6 py-3">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item: any) => (
              <tr
                key={item.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                {columns.map((columnName: any, i: any) => (
                  <td
                    key={i}
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    {columnName.includes(".") ? (
                      columnName
                        .split(".")
                        .reduce((obj: any, key: any) => obj[key], item)
                    ) : columnName === "imageUrl" ? (
                      <img
                        src={item.imageUrl}
                        alt=""
                        className="w-10 h-10 object-cover rounded-full"
                      />
                    ) : columnName === "createdAt" ||
                      columnName === "updatedAt" ? (
                      new Date(item[columnName]).toLocaleDateString()
                    ) : (
                      item[columnName]
                    )}
                  </td>
                ))}
                <td className="px-6 py-4 text-right flex gap-2 items-center">
                  {userRole === "admin" ? (
                    <>
                      <Link href={`/admin/${updateLink}/update/${item.id}`}>
                        <EditButton />
                      </Link>
                      <DeleteButton id={item.id} endpoint={"drivers"} />
                    </>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-sm text-center py-8">
          There is no data to display
        </div>
      )}
    </div>
  );
}

export default DataTable;
