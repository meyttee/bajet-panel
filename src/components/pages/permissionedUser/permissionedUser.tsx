"use client";

import {
  DataTable,
  Modal,
  TableContainer,
  TableToolbar,
  useDataTable,
} from "@/components/ui";
import { TABLE_COLS } from "./constants";
import { useGetPermissionedUsers } from "@/services";
import { useState } from "react";
import ModalContent from "./Modal";

const PermissionedUser = () => {
  const [userId, setUserId] = useState<number>();
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useGetPermissionedUsers();
  const { table } = useDataTable({
    columns: TABLE_COLS,
    data: data?.results || [],
    pageCount: 1,
    actions: {
      onEdit: (row) => setUserId(row.id),
    },
  });

  return (
    <TableContainer>
      <ModalContent
        id={userId}
        onOpenChange={() => {
          setUserId(undefined);
          setIsOpen(false);
        }}
        open={!!userId || isOpen}
      />

      <TableToolbar
        table={table}
        title="نشست‌ها"
        handleAdd={() => setIsOpen(true)}
        totalItems={data?.count || 0}
      />
      <DataTable table={table} />
    </TableContainer>
  );
};

export default PermissionedUser;
