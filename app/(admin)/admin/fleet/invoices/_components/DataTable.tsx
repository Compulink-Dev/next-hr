"use client";
import { Button } from "@/components/ui/button";
import { Delete, Edit, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import EditButton from "@/components/EditButton";
import DeleteButton from "@/components/DeleteButton";

function DataTable({ data = [], columns = [], updateLink }: any) {
  const { data: session } = useSession();

  const userRole = session?.user?.role;

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
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
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
                {userRole === "admin" ? (
                  <td className="px-6 py-4 text-right flex gap-2 items-center">
                    <Link href={`/admin/${updateLink}/update/${item.id}`}>
                      <EditButton />
                    </Link>
                    <DeleteButton id={item.id} endpoint={"fleetInvoice"} />
                  </td>
                ) : (
                  <td className="px-6 py-4 text-right flex gap-2 items-center">
                    <Link href={`/admin/${updateLink}/update/${item.id}`}>
                      <EditButton />
                    </Link>
                    <DeleteButton id={item.id} endpoint={"fleetInvoice"} />
                  </td>
                )}
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
