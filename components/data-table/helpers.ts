import { Column, UserColumn } from "./types";

export const getPaginationDetails = (
  currentPage: number,
  total: number,
  pageSize: number,
  maxVisiblePages: number = 3
) => {
  const totalPages = Math.ceil(total / pageSize);

  const canPreviousPage = currentPage > 1;
  const canNextPage = currentPage < totalPages;

  const pageNumbers: (number | "ellipsis")[] = [];

  if (totalPages <= maxVisiblePages + 2) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    pageNumbers.push(1);

    const startPage = Math.max(
      2,
      currentPage - Math.floor(maxVisiblePages / 2)
    );
    const endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);

    if (startPage > 2) {
      pageNumbers.push("ellipsis");
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    if (endPage < totalPages - 1) {
      pageNumbers.push("ellipsis");
    }

    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }
  }

  return {
    canPreviousPage,
    canNextPage,
    pageNumbers,
    totalPages,
  };
};

export const generateColumns = (columns: UserColumn[]) => {
  const cols: Column = {};

  for (const column of columns) {
    cols[column.id] = {
      header: column.header,
      visible: column.visible,
      sortable: column.sortable,
      sortKey: column.sortKey,
      filterType: column.filterType || "text",
      options: column.options || [],
    };
  }
  return cols;
};
