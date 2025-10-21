"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import DeleteButton from "../../../inventory/adjustments/_components/DeleteButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatDate } from "@/lib/utils";
import ViewButton from "@/components/ViewButton";
import EditButton from "@/components/EditButton";
import DownloadButton from "./DownloadButton";
import StatusUpdateButton from "./StatusUpdateButton";

function DataTable({ data = [], columns = [], updateLink, resourceName }: any) {
  const { data: session } = useSession();
  const userRole = session?.user?.role;
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Helper function to get status styling
  const getStatusStyle = (status: string) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case "approved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
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
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
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
                    {columnName === "status" ? (
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    ) : columnName.includes(".") ? (
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
                      columnName === "updatedAt" ||
                      columnName === "to" ||
                      columnName === "from" ? (
                      formatDate(item[columnName])
                    ) : (
                      item[columnName]
                    )}
                  </td>
                ))}
                <td className="px-6 py-4 text-right flex gap-2 items-center">
                  {/* HR & Admin Actions */}
                  {(userRole === "hr" || userRole === "admin") && (
                    <>
                      <Link href={`/dashboard/${updateLink}/view/${item.id}`}>
                        <ViewButton />
                      </Link>
                      <StatusUpdateButton
                        id={item.id}
                        currentStatus={item.status}
                        endpoint={`${resourceName}/leave`}
                      />
                      {item.attachment !== "No-file" && (
                        <a href={item.attachment} download>
                          <DownloadButton />
                        </a>
                      )}
                    </>
                  )}

                  {/* User Actions */}
                  {userRole === "user" && (
                    <>
                      {item.status === "pending" ? (
                        <>
                          <Link
                            href={`/dashboard/${updateLink}/update/${item.id}`}
                          >
                            <EditButton />
                          </Link>
                          <DeleteButton id={item.id} endpoint={resourceName} />
                        </>
                      ) : (
                        <>
                          <Dialog>
                            <DialogTrigger asChild>
                              <div onClick={() => setSelectedItem(item)}>
                                <ViewButton />
                              </div>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px]">
                              <DialogHeader>
                                <DialogTitle>Leave Information</DialogTitle>
                                <DialogDescription>
                                  Detailed information about your leave request.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <p>
                                  <strong>Type:</strong> {selectedItem?.type}
                                </p>
                                <p>
                                  <strong>Status:</strong>{" "}
                                  <span
                                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                                      selectedItem?.status
                                    )}`}
                                  >
                                    {selectedItem?.status}
                                  </span>
                                </p>
                                <p>
                                  <strong>Start Date:</strong>{" "}
                                  {formatDate(selectedItem?.from)}
                                </p>
                                <p>
                                  <strong>End Date:</strong>{" "}
                                  {formatDate(selectedItem?.to)}
                                </p>
                                <p>
                                  <strong>Duration:</strong>{" "}
                                  {selectedItem?.duration}
                                </p>
                                <p>
                                  <strong>Reason:</strong>{" "}
                                  {selectedItem?.reason || "Not provided"}
                                </p>
                              </div>
                              <DialogFooter>
                                <Button variant="secondary">Close</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          {item.status === "rejected" && (
                            <DeleteButton
                              id={item.id}
                              endpoint={resourceName}
                            />
                          )}
                        </>
                      )}
                      {item.attachment !== "No-file" && (
                        <a href={item.attachment} download>
                          <DownloadButton />
                        </a>
                      )}
                    </>
                  )}
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
