"use client";

import {
  DataTable,
  TableContainer,
  TableToolbar,
  useDataTable,
} from "@/components";
import { TABLE_COLS } from "./constants";
import { useGetQuestions } from "@/services";

const Questions = () => {
  const { data } = useGetQuestions();

  const { table } = useDataTable({
    columns: TABLE_COLS,
    data: data?.results || [],
    pageCount: 1,
  });

  return (
    <TableContainer>
      <TableToolbar
        table={table}
        title="نشست‌ها"
        totalItems={data?.count || 0}
        hasFilter={false}
      />
      <DataTable table={table} />
    </TableContainer>
  );
};

export default Questions;
