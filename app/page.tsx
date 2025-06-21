"use client";

import { DataTable } from "@/components/data-table";
import type {
  Column,
  UserColumn,
  PaginationState,
  SortState,
} from "@/components/data-table/types";
import { useGetGitHubIssues } from "@/hooks/useGitHubIssues";
import { useState, useEffect } from "react";

export default function Home() {
  const columns: UserColumn[] = [
    {
      id: "number",
      header: "Issue #",
      visible: true,
      sortable: false,
      filterType: "text",
    },
    {
      id: "title",
      header: "Issue Title",
      visible: true,
      sortable: false,
      filterType: "text",
    },
    {
      id: "state",
      header: "Status",
      visible: true,
      sortable: false,
      filterType: "dropdown",
      options: ["open", "closed"],
    },
    {
      id: "created_at",
      header: "Created",
      visible: true,
      sortable: true,
      sortKey: "created",
      filterType: "date-range",
    },
    {
      id: "updated_at",
      header: "Updated",
      visible: true,
      sortable: true,
      sortKey: "updated",
      filterType: "date-range",
    },
  ];

  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    perPage: 10,
  });

  const [sorting, setSorting] = useState<SortState>({
    field: "created",
    direction: "desc",
  });

  const { data, isLoading, error } = useGetGitHubIssues({
    owner: "facebook",
    repo: "react",
    page: pagination.page,
    per_page: pagination.perPage,
    sort: sorting.field,
    direction: sorting.direction,
  });

  // Update pagination total when data is received
  useEffect(() => {
    if (data?.total && data.total !== pagination.total) {
      setPagination((prev) => ({
        ...prev,
        total: data.total,
      }));
    }
  }, [data?.total, pagination.total]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">React GitHub Issues</h1>{" "}
      <DataTable
        columns={columns}
        data={data?.issues || []}
        pagination={pagination}
        sorting={sorting}
        isLoading={isLoading}
        isError={!!error}
        setPagination={setPagination}
        setSorting={setSorting}
      />
    </div>
  );
}
