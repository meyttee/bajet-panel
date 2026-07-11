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
          <div className="flex flex-col items-center gap-2.5">
            <Image alt="logo" src="/logo.svg" width={117} height={160} />
            <h2 className="text-xl leading-8 font-semibold text-[#131131]">
              انتخابی از جنس تحول دیجیتال
            </h2>
          </div>
          <h1 className="mx-auto text-base font-medium text-[#030712]">ورود</h1>
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
