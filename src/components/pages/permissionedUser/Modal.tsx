"use client";
import {
  Button,
  Checkbox,
  Form,
  Modal,
  Popover,
  PopoverContent,
  PopoverTrigger,
  RhfInput,
} from "@/components/ui";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IForm, schema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useGetPermissionedUser,
  useGetPermissionedUsers,
  usePostPermissionedUser,
} from "@/services";

const ModalContent = ({
  id,
  onOpenChange,
  open,
}: {
  id?: number;
  onOpenChange: () => void;
  open: boolean;
}) => {
  const { data } = useGetPermissionedUser(id);
  const { refetch } = useGetPermissionedUsers();
  const { mutate } = usePostPermissionedUser();
  const form = useForm<IForm>({
    resolver: zodResolver(schema),
  });
  const [role, setRole] = useState<"user" | "admin">("admin");
  const [permissions, setPermissions] = useState<number[]>([]);

  const { control, handleSubmit, reset } = form;

  useEffect(() => {
    setRole((data?.data.role as "admin" | "user") || "admin");
    setPermissions(data?.data.user_permissions || []);
    reset({
      personnel_code: data?.data.personnel_code || "",
      phone_number: data?.data.phone_number || "",
    });
  }, [data?.data]);

  const onSubmit = (data: IForm) => {
    mutate(
      {
        data: {
          ...data,
          role: role as string,
          user_permissions: permissions,
          username:
            "-JM7MnbslmCwg0PmkHPySbJzytVRL29SGEk2IvSoP9-hmV9nYDIIBWIQmPOUdt2IpCp_5T3EV8Hi-7uHoX9L_0E",
        },
      },
      {
        onSuccess: () => {
          refetch();
          onOpenChange();
          reset();
        },
      },
    );
  };

  return (
    <Modal
      open={open}
      onOpenChange={() => {
        onOpenChange();
        reset();
      }}
      title="ویرایش کاربر"
    >
      <Form {...form}>
        <form
          className="flex w-full flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-sm font-medium text-gray-700">سطح دسترسی</h1>
          <div className="flex max-w-full justify-between gap-3">
            <Button
              aria-label="Toggle columns"
              variant="subtle"
              size="lg"
              aria-selected={role === "admin"}
              className="aria-selected:!bg-[#1E40AF] aria-selected:!text-white"
              onClick={() => setRole("admin")}
            >
              ادمین
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  aria-label="Toggle columns"
                  variant="subtle"
                  size="lg"
                  aria-selected={role === "user"}
                  onClick={() => setRole("user")}
                  className="aria-selected:!bg-[#1E40AF] aria-selected:!text-white"
                >
                  کاربر
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-44 p-0">
                <Command>
                  <CommandList>
                    <CommandGroup>
                      {[
                        { label: "پیشخوان", value: 101 },
                        { label: "گزارشات", value: 102 },
                        { label: "مدیریت سوالات", value: 103 },
                        { label: "مدیریت کاربران", value: 104 },
                        { label: "مدیریت نشست ها", value: 105 },
                        { label: "سوالات پر تکرار", value: 106 },
                        { label: "مدیریت اعضا", value: 107 },
                        { label: "مدیریت تگ ها", value: 108 },
                      ].map((column) => (
                        <CommandItem
                          key={column.value}
                          className="flex h-9 w-full justify-between"
                          onSelect={() =>
                            permissions.includes(column.value)
                              ? setPermissions((prev) =>
                                  prev.filter(
                                    (permission) => permission !== column.value,
                                  ),
                                )
                              : setPermissions((prev) => [
                                  ...prev,
                                  column.value,
                                ])
                          }
                        >
                          <span className="truncate">{column.label}</span>
                          <Checkbox
                            checked={permissions.includes(column.value)}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <h1 className="text-sm font-medium text-gray-700">اطلاعات عضو</h1>
          <RhfInput control={control} name="personnel_code" label="کد پرسنلی" />
          <RhfInput control={control} name="phone_number" label="تلفن همراه" />
          <h1 className="text-sm font-medium text-gray-700">تعیین رمزعبور</h1>
          <RhfInput control={control} name="password" label="رمز عبور" />
          <RhfInput
            control={control}
            name="confirm_password"
            label="تکرار رمزعبور"
          />
          <div className="flex justify-end gap-2">
            <Button
              onClick={() => {
                onOpenChange();
                reset();
              }}
            >
              لغو
            </Button>
            <Button isFilled type="submit">
              تایید
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default ModalContent;
