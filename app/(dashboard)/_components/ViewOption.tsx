import DeleteButton from "@/components/DeleteButton";
import EditButton from "@/components/EditButton";
import Link from "next/link";
import React from "react";
import DownloadButton from "../dashboard/hr/leave/_components/DownloadButton";

function ViewOption({ userRole, resourceName, updateLink, row }: any) {
  return (
    <div>
      {userRole === "admin" ? (
        <>
          <Link href={`/dashboard/${updateLink}/update/${row.original.id}`}>
            <EditButton />
            <span>Edit</span>
          </Link>
          <DeleteButton id={row.original.id} endpoint={resourceName} />
        </>
      ) : row.original.attachment !== "No-file" ? (
        <div className="flex row.originals-center gap-2">
          <div
            onClick={() => {
              if (
                row.original.attachment &&
                row.original.attachment !== "No-file"
              ) {
                const printWindow = window.open(
                  row.original.attachment,
                  "_blank"
                );
                if (printWindow) {
                  printWindow.onload = () => {
                    printWindow.print();
                  };
                }
              } else {
                alert("No attachment available to print.");
              }
            }}
          >
            <DownloadButton />
          </div>
        </div>
      ) : (
        <div className="">
          <span>{row.original.attachment}</span>
        </div>
      )}
    </div>
  );
}

export default ViewOption;
