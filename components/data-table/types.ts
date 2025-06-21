export type UserColumn = {
  id: string;
  header: string;
  visible: boolean;
  sortable: boolean;
  sortKey?: string; // Optional key for sorting
  filterType?: "text" | "dropdown" | "date-range" | "number-range";
  options?: string[];
};

export type PaginationState = {
  page: number;
  perPage: number;
  total?: number;
};

export type SortState = {
  field: string;
  direction: "asc" | "desc";
};

export type Column = Record<
  string,
  {
    header: string;
    visible: boolean;
    sortable: boolean;
    filterType?: "text" | "dropdown" | "date-range" | "number-range";
    options?: string[];
    sortKey?: string;
  }
>;
