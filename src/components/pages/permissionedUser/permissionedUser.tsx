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
import { useDeletePermissionedUser, useGetPermissionedUsers } from "@/services";
import { useState } from "react";
import ModalContent from "./Modal";
import axios from "axios";

const PermissionedUser = () => {
  const [userId, setUserId] = useState<number>();
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, refetch } = useGetPermissionedUsers();
  const { mutate, isPending } = useDeletePermissionedUser();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<number>();
  const { table } = useDataTable({
    columns: TABLE_COLS,
    data: data?.results || [],
    pageCount: data?.all_page || 1,
    actions: {
      onEdit: (row) => setUserId(row.id),
      onDelete(row) {
        setIsDeleteModalOpen(row.id);
      },
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

      <Modal
        open={!!isDeleteModalOpen}
        title="حذف کاربر"
        onOpenChange={() => setIsDeleteModalOpen(undefined)}
      >
        <p className="text-sm">آیا از حذف کاربر اطمینان دارید؟</p>
        <div className="mt-5 flex w-full justify-center gap-2">
          <Button onClick={() => setIsDeleteModalOpen(undefined)}>لغو</Button>
          <Button
            isFilled
            loading={isPending}
            onClick={() =>
              mutate(isDeleteModalOpen, {
                onError: (e) => {
                  if (axios.isAxiosError(e)) {
                    toast.error(e.response?.data.detail);
                  }
                },
                onSuccess() {
                  toast.success("عملیات با موفقیت انجام شد.");
                  refetch();
                  setIsDeleteModalOpen(undefined);
                },
              })
            }
          >
            تایید
          </Button>
        </div>
      </Modal>

      <TableToolbar
        table={table}
        title="اعضا"
        handleAdd={() => setIsOpen(true)}
        totalItems={data?.count || 0}
        hasFilter={false}
      />
      <DataTable table={table} />
    </TableContainer>
  );
};

export default PermissionedUser;
