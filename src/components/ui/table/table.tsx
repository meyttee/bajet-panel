import * as React from "react";

import { cn } from "@/utils";

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <table
      data-slot="table"
      className={cn(
        "w-full caption-bottom border-separate border-spacing-0 overflow-hidden rounded-md border-1 text-sm text-zinc-700",
        className,
      )}
      {...props}
    />
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("bg-[#2F6FB5]/12 [&_tr]:h-11 [&_tr]:border-b", className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr]:h-12 [&_tr:hover]:bg-zinc-50", className)}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "bg-transparent transition-colors data-[state=selected]:bg-gray-100 data-[state=selected]:hover:bg-[#E5E7EB]/70",
        "data-[expanded=true]:bg-gray-100",
        className,
      )}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-right align-middle font-medium whitespace-nowrap text-zinc-700 [&:has([role=checkbox])]:pr-4 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "border-t-1 border-[#2F6FB5]/12 px-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-4 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    />
  );
}

export { Table, TableHeader, TableBody, TableHead, TableRow, TableCell };
