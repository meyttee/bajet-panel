import { Button, Modal, toast } from "@/components/ui";
import { useGetResources, useUploadProductList } from "@/services";
import { BadgeInfoIcon, Upload } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const UploadModal = ({ open, onOpenChange }: any) => {
  const [value, setValue] = useState<File>();
  const { refetch } = useGetResources();
  const { mutate } = useUploadProductList();
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (
      acceptedFiles[0].name.split(".")[
        acceptedFiles[0].name.split(".").length - 1
      ] === "csv"
    ) {
      setValue(acceptedFiles[0]);
    } else {
      setValue(undefined);
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const onSubmit = () => {
    if (value?.name) {
      const formData = new FormData();
      formData.append("file", value);
      mutate(
        { data: formData },
        {
          onSuccess() {
            toast.success("عملیات با موفقیت انجام شد.");
            onOpenChange();
          },
          onError() {
            toast.error("خطا در خواندن فایل");
          },
        },
      );
    }
  };

  return (
    <Modal
      open={open}
      onOpenChange={() => {
        onOpenChange();
        setValue(undefined);
      }}
      title="بارگذاری فایل"
    >
      <div className="flex flex-col gap-6">
        <div
          {...getRootProps()}
          className="flex h-[180px] items-center justify-center rounded-lg border border-dashed border-gray-500 bg-gray-100"
        >
          <input {...getInputProps()} accept=".csv" />
          {value?.size ? (
            <p className="gap-2 text-xs text-gray-600">{value.name}</p>
          ) : (
            <div className="flex items-center gap-2">
              <Upload className="text-gray-600" />
              <p className="gap-2 text-xs text-gray-600">
                فایل خود را انتخاب یا در اینجا رها کنید.
              </p>
            </div>
          )}
        </div>
        <span className="flex gap-2 text-xs text-gray-600">
          <div>
            <BadgeInfoIcon className="text-[#2F6FB5]" />
          </div>
          <p>تمامی سطرهای فایل CSV به انتهای منابع اضافه می شود.</p>
        </span>
        <div className="flex justify-end gap-2">
          <Button
            onClick={() => {
              onOpenChange();
            }}
          >
            لغو
          </Button>
          <Button isFilled onClick={onSubmit}>
            تایید
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default UploadModal;
