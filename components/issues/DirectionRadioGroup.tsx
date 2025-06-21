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
import { Dispatch, SetStateAction } from "react";
export interface StatusProps {
  direction: string;
  setDirection: Dispatch<SetStateAction<string>>;
}
export function DirectionRadioGroup({ direction, setDirection }: StatusProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        
        <Button variant="outline" className="text-xs sm:text-sm">
          direction:{direction}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={direction} onValueChange={setDirection}>
          <DropdownMenuRadioItem value="asc">ascending</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="desc">descending</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
