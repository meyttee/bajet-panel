"use client";

import {
  DataTable,
  Loading,
  TableContainer,
  TableToolbar,
  useDataTable,
} from "@/components";
import { TABLE_COLS } from "./constants";
import { useGetUsers } from "@/services";
import { MessageSquareMore } from "lucide-react";
import { useRouter } from "next/navigation";

const UsersManagement = () => {
  const { push } = useRouter();
  const { data, isLoading } = useGetUsers();

  const { table } = useDataTable({
    columns: TABLE_COLS,
    data: data?.results || [],
    pageCount: 1,
    actions: {
      // customActions: [
      //   {
      //     icon: (
      //       <MessageSquareMore
      //         strokeWidth={1.5}
      //         className="pointer-events-none"
      //       />
      //     ),
      //     label: "مشاهده گفت‌وگو",
      //     disabled: true,
      //     onClick: (arg) => push(`/dashboard/reports/${arg.id}`),
      //   },
      // ],
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
        title="کاربران"
        totalItems={data?.count || 0}
      />
      <DataTable table={table} />
    </TableContainer>
  );
};

export default UsersManagement;
