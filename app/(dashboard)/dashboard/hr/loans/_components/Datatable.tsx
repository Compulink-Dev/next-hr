"use client";

import * as React from "react";
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "react-hot-toast";
import { makeApiRequest } from "@/lib/apiRequest";
import ViewOption from "@/app/(dashboard)/_components/ViewOption";

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
  userId: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

export default function DataTable({
  data,
  columns,
  updateLink,
  resourceName,
  filter,
  userRole,
}: any) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [users, setUsers] = React.useState<Record<string, User>>({});

  // Fetch users
  React.useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await makeApiRequest(
          () => {},
          "user",
          {}, // Empty data for GET request
          "Users",
          () => {},
          "GET"
        );

        // Make sure response is an array before processing
        if (Array.isArray(response)) {
          const usersMap = response.reduce(
            (acc: Record<string, User>, user: User) => {
              acc[user.id] = user;
              return acc;
            },
            {}
          );
          setUsers(usersMap);
        }
      } catch (error) {
        toast.error("Failed to fetch users");
      }
    }
    fetchUsers();
  }, []);

  const getUserInfo = (userId: string) => {
    const user = users[userId];
    console.log("User : ", user);
    return user ? `${user.name}` : "N/A";
  };

  // Define table columns
  const tableColumns: ColumnDef<any>[] = [
    {
      accessorKey: "owner",
      header: () => (
        <Button
          variant="ghost"
          onClick={() =>
            table
              .getColumn("owner")
              ?.toggleSorting(table.getColumn("owner")?.getIsSorted() === "asc")
          }
        >
          Owner <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: any) => <div>{getUserInfo(row.original.userId)}</div>,
    },
    ...columns.map((col: string) => ({
      accessorKey: col,
      header: () => (
        <Button
          variant="ghost"
          onClick={() =>
            table
              .getColumn(col)
              ?.toggleSorting(table.getColumn(col)?.getIsSorted() === "asc")
          }
        >
          {col.charAt(0).toUpperCase() + col.slice(1)}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: any) => {
        if (col === "createdAt" || col === "updatedAt") {
          return new Date(row.getValue(col)).toLocaleDateString();
        }

        // Custom rendering for status column
        if (col === "status") {
          const status = row.getValue(col);
          let statusClass = "";

          switch (status) {
            case "Approved":
              statusClass = "bg-green-100 text-green-800";
              break;
            case "Rejected":
              statusClass = "bg-red-100 text-red-800";
              break;
            case "Pending":
              statusClass = "bg-orange-100 text-orange-800";
              break;
            default:
              statusClass = "bg-gray-100 text-gray-800";
          }

          return (
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${statusClass}`}
            >
              {status}
            </span>
          );
        }

        return row.getValue(col);
      },
    })),
  ];
  const table = useReactTable({
    data,
    columns: tableColumns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: { sorting, columnVisibility },
  });

  // Update loan status
  const updateStatus = async (id: string, status: string) => {
    try {
      await makeApiRequest(
        () => {},
        `${resourceName}/${id}/status`,
        { status },
        "Loan status",
        () => {},
        "PUT"
      );
      toast.success(`Loan set to ${status}`);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="w-full">
      {/* Search + Column toggle */}
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter loans..."
          className="max-w-sm"
          onChange={(event) =>
            table.getColumn(filter)?.setFilterValue(event.target.value)
          }
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table.getAllColumns().map((column) => (
              <DropdownMenuCheckboxItem
                key={column.id}
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
                <TableHead>Actions</TableHead>
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() =>
                            updateStatus(row.original.id, "Approved")
                          }
                          disabled={row.original.status === "Approved"}
                        >
                          Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            updateStatus(row.original.id, "Rejected")
                          }
                          disabled={row.original.status === "Rejected"}
                        >
                          Reject
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            updateStatus(row.original.id, "Pending")
                          }
                          disabled={row.original.status === "Pending"}
                        >
                          Set Pending
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <ViewOption
                            userRole={userRole}
                            resourceName={resourceName}
                            updateLink={updateLink}
                            row={row}
                          />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
