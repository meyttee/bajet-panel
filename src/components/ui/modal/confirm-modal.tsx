"use client";

import { Button, ConfirmModalProps, Modal, ModalVariant } from "@/components";
import { WarningIcon, ModalDeleteIcon } from "@/components/icons";
import { strings } from "@/constants";
import { ReactNode, useEffect } from "react";

const variantIcons: Record<ModalVariant, ReactNode | null> = {
  simple: null,
  warning: <WarningIcon />,
  delete: <ModalDeleteIcon />,
};

const ConfirmModal = ({
  open,
  onClose,
  variant = "simple",
  title = strings.areYouSure,
  description,
  confirmButtonText = strings.approve,
  cancelButtonText = strings.cancel,
  onConfirm,
  loading = false,
  icon,
  topTitle,
}: ConfirmModalProps) => {
  const modalIcon = icon ?? variantIcons[variant];

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        onConfirm();
        onClose(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onConfirm, onClose]);

  const handleCancel = () => {
    if (!loading) {
      onClose(false);
    }
  };

  return (
    <Modal
      open={open}
      title={topTitle}
      onOpenChange={onClose}
      headerIcon={modalIcon}
    >
      <div className="flex flex-col items-center justify-between">
        <span className="text-sm/6 font-medium text-[#1E40AF]">{title}</span>
        <span className="mt-3 mb-8 text-center text-sm/6 font-normal text-neutral-900">
          {description
            ? description
            : variant === "delete"
              ? strings.deleteDescription
              : description}
        </span>
        <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:justify-center">
          <Button
            size="lg"
            loading={loading}
            isFilled
            disabled={loading}
            onClick={onConfirm}
          >
            {variant === "delete" ? strings.delete : confirmButtonText}
          </Button>
          <Button size="lg" onClick={handleCancel} disabled={loading}>
            {cancelButtonText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
