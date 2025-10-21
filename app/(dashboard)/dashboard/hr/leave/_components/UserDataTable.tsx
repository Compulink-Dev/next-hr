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
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  MoreVertical,
} from "lucide-react";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import EditButton from "@/components/EditButton";
import DeleteButton from "@/components/DeleteButton";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import ViewButton from "@/components/ViewButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatDate } from "@/lib/utils";

export default function UserDataTable({
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
  const [selectedItem, setSelectedItem] = React.useState<any>(null);

  const getStatusStyle = (status: string) => {
    switch (
      status?.toLowerCase() // case-insensitive check
    ) {
      case "approved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "pending":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const tableColumns: ColumnDef<any>[] = columns.map((col: any) => ({
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
      // Special handling for status column
      if (col === "status") {
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(
              row.getValue(col)
            )}`}
          >
            {row.getValue(col)}
          </span>
        );
      }
      // Default handling for other columns
      return <div>{row.getValue(col)}</div>;
    },
  }));

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

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter logs..."
          className="max-w-sm"
          onChange={(event) =>
            table.getColumn(`${filter}`)?.setFilterValue(event.target.value)
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
                    {userRole === "hr" || userRole === "admin" ? (
                      <>
                        {row.original.status !== "approved" ? (
                          <div className="flex gap-2 justify-center items-center">
                            <Link
                              href={`/dashboard/${updateLink}/update/${row.original.id}`}
                            >
                              <EditButton />
                            </Link>
                            <DeleteButton
                              id={row.original.id}
                              endpoint={resourceName}
                            />
                          </div>
                        ) : (
                          <Dialog>
                            <DialogTrigger asChild>
                              <div
                                onClick={() => setSelectedItem(row.original)}
                              >
                                <ViewButton />
                              </div>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px]">
                              <DialogHeader>
                                <DialogTitle>Leave Details</DialogTitle>
                                <DialogDescription>
                                  View approved leave information
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <p>
                                  <strong>Employee:</strong>{" "}
                                  {selectedItem?.name}
                                </p>
                                <p>
                                  <strong>Type:</strong> {selectedItem?.type}
                                </p>
                                <p>
                                  <strong>Status:</strong>{" "}
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                                      selectedItem?.status
                                    )}`}
                                  >
                                    {selectedItem?.status}
                                  </span>
                                </p>
                                <p>
                                  <strong>From:</strong>{" "}
                                  {formatDate(selectedItem?.from)}
                                </p>
                                <p>
                                  <strong>To:</strong>{" "}
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
                            </DialogContent>
                          </Dialog>
                        )}
                      </>
                    ) : (
                      // Regular users: only view button
                      <Dialog>
                        <DialogTrigger asChild>
                          <div onClick={() => setSelectedItem(row.original)}>
                            <ViewButton />
                          </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>Leave Details</DialogTitle>
                            <DialogDescription>
                              View leave information
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <p>
                              <strong>Employee:</strong> {selectedItem?.name}
                            </p>
                            <p>
                              <strong>Type:</strong> {selectedItem?.type}
                            </p>
                            <p>
                              <strong>Status:</strong>{" "}
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                                  selectedItem?.status
                                )}`}
                              >
                                {selectedItem?.status}
                              </span>
                            </p>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1} // +1 for the actions column
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
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
