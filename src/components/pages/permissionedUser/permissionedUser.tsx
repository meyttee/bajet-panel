"use client";

import {
  DataTable,
  Loading,
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
  const { data, isLoading } = useGetPermissionedUsers();
  const { table } = useDataTable({
    columns: TABLE_COLS,
    data: data?.results || [],
    pageCount: data?.all_page || 1,
    actions: {
      onEdit: (row) => setUserId(row.id),
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
        title="اعضا"
        handleAdd={() => setIsOpen(true)}
        totalItems={data?.count || 0}
      />
      <DataTable table={table} />
    </TableContainer>
  );
};

export default PermissionedUser;
