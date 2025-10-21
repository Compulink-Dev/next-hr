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

import toast from "react-hot-toast";

export default function DataTable({
  data,
  columns,
  updateLink,
  resourceName,
  filter,
  userRole,
  actionsConfig,
}: any) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

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
      const value = row.getValue(col);
      // Special rendering for requisitions
      if (actionsConfig?.resource === 'projects/requisitions') {
        if (col === 'status') {
          const status = String(value || '').toLowerCase();
          const cls = status === 'approved'
            ? 'bg-green-100 text-green-800'
            : status === 'rejected'
            ? 'bg-red-100 text-red-800'
            : 'bg-yellow-100 text-yellow-800';
          return <span className={`px-2 py-1 rounded text-xs font-medium ${cls}`}>{value}</span>;
        }
        if (col === 'name') {
          return (
            <Link href={`/dashboard/${updateLink}/` + row.original.id} className="text-blue-600 hover:underline">
              {value}
            </Link>
          );
        }
      }
      return <div>{value}</div>;
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
                        {/* Custom actions for specific resources */}
                        {actionsConfig?.resource === 'projects/requisitions' && (
                          <div className="px-4 py-2 space-y-1">
                            {row.original.attachment ? (
                              <a
                                className="text-sm text-blue-600 hover:underline block"
                                href={row.original.attachment}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Open attachment
                              </a>
                            ) : null}
                            {actionsConfig?.admin && (
                              <div className="flex items-center gap-2 pt-2">
                                <Button
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-500 text-white"
                                  onClick={async () => {
                                    try {
                                      const res = await fetch(`/api/projects/requisitions/${row.original.id}/status`, {
                                        method: 'PUT',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ status: 'approved' })
                                      });
                                      if (res.ok) {
                                        toast.success('Requisition approved');
                                        window.location.reload();
                                      } else {
                                        toast.error('Failed to approve');
                                      }
                                    } catch (e) {
                                      toast.error('Failed to approve');
                                    }
                                  }}
                                >
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={async () => {
                                    try {
                                      const res = await fetch(`/api/projects/requisitions/${row.original.id}/status`, {
                                        method: 'PUT',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ status: 'rejected' })
                                      });
                                      if (res.ok) {
                                        toast.success('Requisition rejected');
                                        window.location.reload();
                                      } else {
                                        toast.error('Failed to reject');
                                      }
                                    } catch (e) {
                                      toast.error('Failed to reject');
                                    }
                                  }}
                                >
                                  Reject
                                </Button>
                              </div>
                            )}
                          </div>
                        )}
                        <DropdownMenuItem asChild>
                          {userRole === "admin" ? (
                            <div className="px-6 py-4 text-right flex  gap-2 items-center">
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
                            <div className="px-6 py-4 text-right flex  gap-2 items-center">
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
                          )}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
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
