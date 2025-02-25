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

function DataTable({ data = [], columns = [], updateLink, resourceName }: any) {
  const { data: session } = useSession();
  const userRole = session?.user?.role;
  const [selectedItem, setSelectedItem] = useState<any>(null);

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
                  {userRole === "user" ? (
                    <>
                      {item.status === "pending" ? (
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/dashboard/${updateLink}/update/${item.id}`}
                          >
                            <EditButton />
                          </Link>
                          <DeleteButton id={item.id} endpoint={resourceName} />
                        </div>
                      ) : (
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
                                Detailed information about the leave request.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <p>
                                <strong>Name:</strong> {selectedItem?.name}
                              </p>
                              <p>
                                <strong>Status:</strong> {selectedItem?.status}
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
                                <strong>Reason:</strong>{" "}
                                {selectedItem?.reason || "Not provided"}
                              </p>
                            </div>
                            <DialogFooter>
                              <Button variant="secondary">Close</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                      {item.status === "rejected" && (
                        <DeleteButton id={item.id} endpoint={resourceName} />
                      )}
                    </>
                  ) : item.attachment !== "No-file" ? (
                    <a href={item.attachment} download>
                      <DownloadButton />
                    </a>
                  ) : (
                    <span>{item.attachment}</span>
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
