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
import { MessageSquareMore } from "lucide-react";
import { useRouter } from "next/navigation";

const Questions = () => {
  const { data, isLoading } = useGetQuestions();
  const { push } = useRouter();

  const { table } = useDataTable({
    columns: TABLE_COLS,
    data: data?.results || [],
    pageCount: 1,
    actions: {
      customActions: [
        {
          icon: <MessageSquareMore strokeWidth={1.5} />,
          label: "مشاهده گفت‌وگو",
          onClick: (arg) => push(`/dashboard/questions/${arg.id}`),
        },
      ],
    },
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
