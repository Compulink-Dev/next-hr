import DeleteButton from "@/components/DeleteButton";
import EditButton from "@/components/EditButton";
import Link from "next/link";
import React from "react";

function EditOption({ userRole, resourceName, updateLink, row }: any) {
  return (
    <div>
      {userRole === "admin" ? (
        <div className="px-6 py-4 text-right flex  gap-2 items-center">
          <Link href={`/dashboard/${updateLink}/update/${row.original.id}`}>
            <EditButton />
          </Link>
          <DeleteButton id={row.original.id} endpoint={resourceName} />
        </div>
      ) : (
        <div className="px-6 py-4 text-right flex  gap-2 items-center">
          <Link href={`/dashboard/${updateLink}/update/${row.original.id}`}>
            <EditButton />
          </Link>
          <DeleteButton id={row.original.id} endpoint={resourceName} />
        </div>
      )}
    </div>
  );
}

export default EditOption;
