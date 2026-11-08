"use client";

import {
  Button,
  Modal,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  toast,
} from "@/components/ui";
import {
  useGetProducts,
  useGetResourceById,
  useGetResources,
  usePostProduct,
} from "@/services";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const AddModal = ({ id, onOpenChange, open }: any) => {
  const { data } = useGetProducts();
  const { control, handleSubmit, reset } = useForm();
  const [value, setValue] = useState("");
  const { mutate } = usePostProduct();
  const { refetch } = useGetResources();
  const { data: fieldsData } = useGetResourceById(id);
  const onSubmit = (data: any) => {
    if (id) {
      console.log(id);
    } else {
      mutate(
        {
          data: {
            product: value,
            question: data.question,
            answer: data.answer,
          },
        },
        {
          onSuccess: () => {
            toast.success("عملیات با موفقیت انجام شد.");
            refetch();
            onOpenChange();
            reset();
            setValue("");
          },
        },
      );
    }
  };

  useEffect(() => {
    if (id) {
      setValue(fieldsData?.product || "");
      reset(fieldsData);
    }
  }, [fieldsData]);

  return (
    <Modal
      open={open}
      onOpenChange={() => {
        onOpenChange();
        reset();
        setValue("");
      }}
      title={id ? "ویرایش داده" : "افزودن داده"}
    >
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="question"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="textarea"
                className="text-sm text-[#6B7280] disabled:opacity-80"
              >
                سوال
              </label>
              <textarea
                id="textarea"
                className="rounded-[20px] border border-[#6B7280] px-3 py-2 text-sm disabled:opacity-80"
                placeholder="سوال"
                rows={5}
                {...field}
              />
            </div>
          )}
        />
        <Controller
          name="answer"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="answer"
                className="text-sm text-[#6B7280] disabled:opacity-80"
              >
                جواب
              </label>
              <textarea
                id="answer"
                className="rounded-[20px] border border-[#6B7280] px-3 py-2 text-sm disabled:opacity-80"
                placeholder="جواب"
                rows={5}
                {...field}
              />
            </div>
          )}
        />
        <Controller
          name="product"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="product"
                className="text-sm text-[#6B7280] disabled:opacity-80"
              >
                محصول بانکی
              </label>
              <Select
                dir="rtl"
                {...field}
                onValueChange={(v) => setValue(v)}
                value={value}
                defaultValue={value}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent dir="rtl" id="product">
                  {data?.results.map((item) => (
                    <SelectItem
                      key={item.id}
                      value={item.id}
                      defaultChecked={item.id === value}
                    >
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        />
        <div className="flex justify-end gap-2">
          <Button
            onClick={() => {
              onOpenChange();
              reset();
              setValue("");
            }}
          >
            لغو
          </Button>
          <Button isFilled type="submit">
            تایید
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddModal;
