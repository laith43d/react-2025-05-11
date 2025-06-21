"use client";

import { useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Column, UserColumn, PaginationState, SortState } from "./types";
import { Pagination } from "./pagination";
import { ColumnSelect } from "./column-select";
import { PageSizeSelect } from "./page-size-select";
import { generateColumns } from "./helpers";

export function DataTable<TRow>({
  data = [],
  columns,
  renderActionColumn,
  pagination,
  sorting,
  isLoading = false,
  isError = false,
  setPagination,
  setSorting,
}: {
  data: TRow[];
  columns: UserColumn[];
  isSelectable?: boolean;
  pagination: PaginationState;
  sorting?: SortState;
  isLoading?: boolean;
  isError?: boolean;
  setPagination: (pagination: PaginationState) => void;
  setSorting?: (sorting: SortState) => void;
  renderActionColumn?: (row: TRow, data: TRow[]) => React.ReactNode;
}) {
  const [cols, setCols] = useState<Column>(generateColumns(columns));

  return (
    <div className="w-full">
      <div className="flex items-center py-4 space-x-2">
        <ColumnSelect setColumns={setCols} columns={cols} />
        <PageSizeSelect setPagination={setPagination} pagination={pagination} />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {Object.entries(cols)
                .filter(([_, column]) => column.visible)
                .map(([key, column]) => (
                  <TableHead key={key}>
                    {column?.sortable ? (
                      <Button
                        variant="ghost"
                        className="flex items-center justify-between w-full"
                        onClick={() => {
                          if (column.sortable && setSorting) {
                            const field = column?.sortKey
                              ? column.sortKey
                              : key;

                            setSorting(
                              sorting &&
                                sorting.field === field &&
                                sorting.direction === "asc"
                                ? {
                                    field,
                                    direction: "desc",
                                  }
                                : {
                                    field,
                                    direction: "asc",
                                  }
                            );
                          }
                        }}
                      >
                        {column.header}
                        <ArrowUpDown />
                      </Button>
                    ) : (
                      column.header
                    )}
                  </TableHead>
                ))}
              {renderActionColumn && <TableHead className="w-8">""</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isError ? (
              <TableRow>
                <TableCell
                  colSpan={
                    Object.values(cols).filter((column) => column.visible)
                      .length + (renderActionColumn ? 1 : 0)
                  }
                  className="text-center py-8"
                >
                  <div className="flex flex-col items-center space-y-2 text-red-600">
                    <div className="text-lg font-medium">
                      Error loading data
                    </div>
                    <div className="text-sm text-muted-foreground">
                      There was an error fetching the data. Please try again.
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ) : isLoading ? (
              // Skeleton rows during loading
              Array.from({ length: pagination.perPage }).map((_, rowIndex) => (
                <TableRow key={`skeleton-${rowIndex}`}>
                  {Object.entries(cols)
                    .filter(([_, column]) => column.visible)
                    .map(([key]) => (
                      <TableCell key={key} className="max-w-[150px]">
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    ))}
                  {renderActionColumn && (
                    <TableCell>
                      <Skeleton className="h-8 w-16" />
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : data.length === 0 ? (
              // Empty state
              <TableRow>
                <TableCell
                  colSpan={
                    Object.values(cols).filter((column) => column.visible)
                      .length + (renderActionColumn ? 1 : 0)
                  }
                  className="text-center py-8"
                >
                  <div className="flex flex-col items-center space-y-2 text-muted-foreground">
                    <div className="text-lg font-medium">No data found</div>
                    <div className="text-sm">
                      There are no items to display at this time.
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              // Actual data rows
              data.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  className="hover:bg-muted/50 data-[state=selected]:bg-muted"
                >
                  {Object.entries(cols)
                    .filter(([_, column]) => column.visible)
                    .map(([key]) => (
                      <TableCell key={key} className="max-w-[150px] truncate">
                        {(row as Record<string, any>)[key]}
                      </TableCell>
                    ))}

                  {renderActionColumn && (
                    <TableCell>{renderActionColumn(row, data)}</TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>{" "}
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex items-center space-x-4">
          {isLoading ? (
            <Skeleton className="h-4 w-32" />
          ) : (
            <div className="text-sm text-nowrap">
              total items: {pagination.total || 0}
            </div>
          )}
        </div>
        <Pagination
          currentPage={pagination.page}
          pageSize={pagination.perPage}
          total={pagination.total || 0}
          onPageChange={(page) => {
            setPagination({ ...pagination, page });
          }}
        />
      </div>
    </div>
  );
}
