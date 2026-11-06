"use client";

import {
  Button,
  DataTable,
  Loading,
  Modal,
  TableContainer,
  TableToolbar,
  toast,
  useDataTable,
} from "@/components/ui";
import { TABLE_COLS } from "./constants";
import { useGetResources } from "@/services";
import { useState } from "react";
// import ModalContent from "./Modal";
import axios from "axios";

const ResourceManager = () => {
  const [userId, setUserId] = useState<number>();
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, refetch } = useGetResources();
  // const { mutate, isPending } = useDeletePermissionedUser();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<number>();
  const { table } = useDataTable({
    columns: TABLE_COLS,
    data: data?.results || [],
    pageCount: data?.all_page || 1,
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
      {/* <ModalContent
        id={userId}
        onOpenChange={() => {
          setUserId(undefined);
          setIsOpen(false);
        }}
        open={!!userId || isOpen}
      /> */}

      <TableToolbar
        table={table}
        title="اعضا"
        // handleAdd={() => setIsOpen(true)}
        totalItems={data?.count || 0}
      />
      <DataTable table={table} />
    </TableContainer>
  );
};

export default ResourceManager;
