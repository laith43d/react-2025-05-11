"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetIssues from "@/hooks/issues/useGetIssues";

import { PullRequest } from "@/interfaces/issues";
import { StatusRadioGroup } from "./StatusRadioGroup";
import { SortRadioGroup } from "./SortRadioGroup";
import { SizeRadioGroup } from "./SizeRadioGroup";
import { DirectionRadioGroup } from "./DirectionRadioGroup";
export const columns: ColumnDef<PullRequest>[] = [
  {
    accessorKey: "number",
    header: "Issue #",
    cell: ({ row }) => (
      <a
        href={row.original.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        #{row.getValue("number")}
      </a>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="max-w-xs truncate">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "state",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={`capitalize ${
          row.getValue("state") === "open" ? "text-green-600" : "text-red-600"
        }`}
      >
        {row.getValue("state")}
      </span>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) =>
      new Date(row.getValue("created_at")).toLocaleDateString(),
  },
];

export function IssuesTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  //Issues data hook

  const {
    isLoading,
    issues,
    issueState,
    setIssueState,
    creator,
    onCreatorValueChange,
    changeSize,
    nextPage,
    page,
    prevPage,
    sort,
    setSort,
    direction,
    setDirection,
    size,
  } = useGetIssues();

  const table = useReactTable({
    data: issues || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      {isLoading ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {[...Array(5)].map((_, rowIndex) => (
                <TableRow key={`skeleton-row-${rowIndex}`}>
                  {columns.map((column, colIndex) => {
                    const colKey = column.id ?? `col-${colIndex}`;
                    return (
                      <TableCell key={`skeleton-${rowIndex}-${colKey}`}>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <>
          {/* filters */}
          <div className="flex items-center py-4">
            <Input
              placeholder="Filter Creators..."
              value={creator}
              onChange={(e) => onCreatorValueChange(e.target.value)}
              className="max-w-sm"
            />
            <div className="space-x-2">
              {/* Sort */}
              <SortRadioGroup setSort={setSort} sort={sort} />
              {/* Sort */}
              {/* Direction */}
              <DirectionRadioGroup
                setDirection={setDirection}
                direction={direction}
              />
              {/* Direction */}
              {/* Changing Status of GithubIssues */}
              <StatusRadioGroup
                issueStatus={issueState}
                setIssueStatus={setIssueState}
              />
              {/* Changing Status of GithubIssues */}
              {/* size */}
              <SizeRadioGroup changeSize={changeSize} size={size} />
              {/* size */}
            </div>

            {/* changing appeared column */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="ml-auto text-xs sm:text-sm"
                >
                  Columns <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
            {/* changing appeared column */}
          </div>
          {/* filters */}

          {/* Table body */}

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
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
          {/* Table body */}

          {/* Pagination button */}
          <div className="flex items-center justify-center space-x-2 py-4">
            <div className="space-x-2 flex items-center">
              <Button variant="outline" size="sm" onClick={prevPage}>
                Previous
              </Button>
              <p>{page + 1}</p>
              <Button variant="outline" size="sm" onClick={nextPage}>
                Next
              </Button>
            </div>
          </div>
          {/* Pagination button */}
        </>
      )}
    </div>
  );
}
