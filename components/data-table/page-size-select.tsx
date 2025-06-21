import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { PaginationState } from "./types";

const PAGE_SIZE_OPTIONS = [10, 20, 50];

export function PageSizeSelect({
  pagination,
  setPagination,
}: {
  pagination: PaginationState;
  setPagination: (pagination: PaginationState) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {pagination.perPage} rows <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Rows per page</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={pagination.perPage.toString()}
          onValueChange={(value) =>
            setPagination({
              perPage: parseInt(value),
              page: 1,
              total: pagination.total,
            })
          }
        >
          {PAGE_SIZE_OPTIONS.map((size) => (
            <DropdownMenuRadioItem key={size} value={size.toString()}>
              {size} rows
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
