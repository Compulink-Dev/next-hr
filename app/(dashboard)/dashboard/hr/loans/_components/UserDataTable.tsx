"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import React, { useState } from "react";
import EditButton from "@/components/EditButton";
import ViewButton from "@/components/ViewButton";
import DeleteButton from "@/components/DeleteButton";

interface Loan {
  id: string;
  type: string;
  amount: number;
  repayment: string;
  repayments: string;
  installment: string;
  interest: string;
  status: string;
  payment: string;
  reason: string;
  attachment: string;
  createdAt: string;
}

function UserDataTable({
  data = [],
  columns = [],
  updateLink,
  resourceName,
}: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);

  const handleViewClick = (loan: Loan) => {
    setSelectedLoan(loan);
    setIsOpen(true);
  };

  // Helper function to get status styling
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "Pending":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
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
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(
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
                      columnName === "updatedAt" ? (
                      new Date(item[columnName]).toLocaleDateString()
                    ) : (
                      item[columnName]
                    )}
                  </td>
                ))}
                <td className="px-6 py-4 text-right flex gap-2 items-center">
                  {item.status === "Approved" ? (
                    <button onClick={() => handleViewClick(item)}>
                      <ViewButton />
                    </button>
                  ) : (
                    <>
                      <Link href={`/dashboard/${updateLink}/update/${item.id}`}>
                        <EditButton />
                      </Link>
                      <DeleteButton id={item.id} endpoint={resourceName} />
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

      {/* View Dialog */}
      {isOpen && selectedLoan && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Loan Details</DialogTitle>
              <DialogDescription>View your loan information</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Type</Label>
                <div className="col-span-3">{selectedLoan.type}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Amount</Label>
                <div className="col-span-3">{selectedLoan.amount}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Status</Label>
                <div className="col-span-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                      selectedLoan.status
                    )}`}
                  >
                    {selectedLoan.status}
                  </span>
                </div>
              </div>
              {selectedLoan.attachment &&
                selectedLoan.attachment !== "No file" && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Attachment</Label>
                    <div className="col-span-3">
                      <a
                        href={selectedLoan.attachment}
                        download
                        className="text-blue-500 hover:underline"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                )}
            </div>
            <DialogFooter>
              <Button onClick={() => setIsOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default UserDataTable;
