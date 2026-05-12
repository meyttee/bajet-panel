"use client";

import {
  DataTable,
  Loading,
  TableContainer,
  TableToolbar,
  useDataTable,
} from "@/components";
import { TABLE_COLS } from "./constants";
import { useGetQuestions } from "@/services";

const Questions = () => {
  const { data, isLoading } = useGetQuestions();

  const { table } = useDataTable({
    columns: TABLE_COLS,
    data: data?.results || [],
    pageCount: 1,
  });

  if (isLoading) {
    return (
      <div className="flex h-[calc(100dvh-250px)] items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <TableContainer>
      <TableToolbar
        table={table}
        title="سوالات"
        totalItems={data?.count || 0}
        hasFilter={false}
      />
      <DataTable table={table} />
    </TableContainer>
  );
};

export default Questions;
