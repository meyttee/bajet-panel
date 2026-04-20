"use client";

import {
  DataTable,
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
  const { data } = useGetUsers();

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

  return (
    <TableContainer>
      <TableToolbar
        table={table}
        title="نشست‌ها"
        totalItems={data?.count || 0}
      />
      <DataTable table={table} />
    </TableContainer>
  );
};

export default UsersManagement;
