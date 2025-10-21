"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { toast } from "react-hot-toast";
import { makeApiRequest } from "@/lib/apiRequest";
import { useState } from "react";

export default function StatusUpdateButton({
  id,
  currentStatus,
  endpoint,
}: {
  id: string;
  currentStatus: string;
  endpoint: string;
}) {
  const [loading, setLoading] = useState(false);

  const updateStatus = async (status: string) => {
    try {
      await makeApiRequest(
        setLoading,
        `${endpoint}/${id}/status`,
        { status },
        "Leave status",
        () => {}, // empty reset function
        "PUT" // Specify PUT method here
      );
      //   window.location.reload(); // Uncomment this to refresh after update
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => updateStatus("approved")}
          disabled={currentStatus === "approved"}
        >
          Approve
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => updateStatus("rejected")}
          disabled={currentStatus === "rejected"}
        >
          Reject
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => updateStatus("pending")}
          disabled={currentStatus === "pending"}
        >
          Set to Pending
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
