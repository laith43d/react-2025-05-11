import {
  Pagination as _Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getPaginationDetails } from "./helpers";

interface PaginationProps {
  currentPage: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  pageSize,
  total,
  onPageChange,
}: PaginationProps) {
  const { canPreviousPage, canNextPage, pageNumbers } = getPaginationDetails(
    currentPage,
    total,
    pageSize
  );

  return (
    <_Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => canPreviousPage && onPageChange(currentPage - 1)}
            className={
              !canPreviousPage
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>

        {pageNumbers.map((page, index) => (
          <PaginationItem key={index}>
            {page === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                onClick={() => onPageChange(page)}
                isActive={page === currentPage}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => canNextPage && onPageChange(currentPage + 1)}
            className={
              !canNextPage ? "pointer-events-none opacity-50" : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </_Pagination>
  );
}
