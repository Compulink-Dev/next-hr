"use client";
import DeleteButton from "@/components/DeleteButton";
import EditButton from "@/components/EditButton";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

function DataTable({ data = [], columns = [], updateLink }: any) {
  const { data: session } = useSession();
  const userRole = session?.user?.name;

  console.log("Interview :", data);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {data.length > 0 ? (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {columns.map((column: any, i: any) => (
                <th key={i} className="px-6 py-3">
                  {column}
                </th>
              ))}
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any) => {
              return (
                <tr
                  key={item.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  {columns.map((columnName: any, i: any) => (
                    <td
                      key={i}
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {columnName.includes(".")
                        ? columnName
                            .split(".")
                            .reduce((obj: any, key: any) => obj[key], item)
                        : columnName === "createdAt" ||
                          columnName === "updatedAt"
                        ? new Date(item[columnName]).toLocaleDateString()
                        : item[columnName]}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-right flex gap-2 items-center">
                    {userRole === "admin" ? (
                      <Link href={`/dashboard/${updateLink}/update/${item.id}`}>
                        <EditButton />
                      </Link>
                    ) : (
                      <div className="flex items-center gap-1">
                        <Link
                          href={`/dashboard/${updateLink}/update/${item.id}`}
                        >
                          <EditButton />
                        </Link>
                        <DeleteButton id={item.id} endpoint="interviews" />
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
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
