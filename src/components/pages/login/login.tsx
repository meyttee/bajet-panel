"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Form, RhfInput, toast } from "@/components/ui";
import { zodSchema } from "./schema";
import { setCookie } from "@/utils";
import axios from "axios";
import { useLoginMutation } from "@/services";
import Image from "next/image";
import Link from "next/link";

interface IForm {
  username: string;
  password: string;
}

const Login = () => {
  const { push } = useRouter();
  const form = useForm<IForm>({
    resolver: zodResolver(zodSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { handleSubmit, control } = form;
  const { mutate: loginMutation, isPending } = useLoginMutation();

  const submitHandler = (data: IForm) => {
    loginMutation(
      {
        password: data.password,
        username: data.username,
      },
      {
        onSuccess: async (response) => {
          await setCookie("access", response.data.access);
          await setCookie("refresh", response.data.refresh);
          push("/dashboard");
        },
        onError(error) {
          if (axios.isAxiosError(error)) {
            toast.error(error.response?.data.detail);
          }
        },
      },
    );
  };
  return (
    <div className="flex h-screen w-full items-center">
      <Form {...form}>
        <form
          className="flex w-1/2 flex-col items-center gap-9"
          onSubmit={handleSubmit(submitHandler)}
        >
          <Image alt="logo" src="/logo.svg" width={125} height={160} />
          <h1 className="mx-auto text-base font-medium">ورود</h1>
          <div className="flex w-[424px] flex-col gap-5 px-5">
            <RhfInput control={control} name="username" label="نام کاربری" />
            <RhfInput
              control={control}
              name="password"
              type="password"
              label="رمزعبور"
            />
            <Button
              size="full"
              variant="outline"
              isFilled
              type="submit"
              loading={isPending}
            >
              ورود
            </Button>
          </div>
          <p className="text-xs leading-4">
            ثبت نام شما به منزله پذیرش{" "}
            <Link href="#" prefetch className="text-[#1E40AF]">
              قوانین و شرایط{" "}
            </Link>{" "}
            استفاده از خدمات chatbank است.
          </p>
        </form>
      </Form>

      <div className="relative mx-16 my-14 flex h-4/5 w-1/2">
        <Image
          src="/login-banner.webp"
          alt="logo"
          fill
          className="rounded-[40px]"
        />
      </div>
    </div>
  );
};

export default Login;
