"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export interface SizeProps {
  size: number;
  changeSize: (size: string) => void;
}
export function SizeRadioGroup({ size, changeSize }: SizeProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="text-xs sm:text-sm">
          per_page:{size}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={size.toString()}
          onValueChange={(value) => changeSize(value)}
        >
          <DropdownMenuRadioItem value={"10"}>10</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={"25"}>25</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={"50"}>50</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
