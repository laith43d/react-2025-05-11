import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Column } from "./types";

export function ColumnSelect({
  columns,
  setColumns,
}: {
  columns: Column;
  setColumns: (columns: Column) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto">
          Columns <ChevronDown />
        </Button>
      </DropdownMenuTrigger>{" "}
      <DropdownMenuContent align="end">
        {Object.entries(columns).map(([columnId, column]) => (
          <DropdownMenuCheckboxItem
            key={columnId}
            className="capitalize"
            checked={column.visible}
            onCheckedChange={(checked) => {
              const updatedColumns = { ...columns };
              updatedColumns[columnId] = { ...column, visible: !!checked };
              setColumns(updatedColumns);
            }}
          >
            {column.header}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
