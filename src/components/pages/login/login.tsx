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
import moment from "moment-jalaali";

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
          className="flex w-1/2 flex-col gap-5 px-20"
          onSubmit={handleSubmit(submitHandler)}
        >
          <h1 className="mx-auto text-base font-medium">ورود</h1>
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
        </form>
      </Form>

      <div className="flex h-4/5 w-1/2 flex-col justify-center gap-3 border-r border-[#18181B] px-[136px]">
        <Image src="/logo.png" alt="logo" height={59} width={178} />
        <h1 className="text-xl font-semibold">انتخابی از جنس تحول دیجیتال</h1>
        <p>
          تولید تصویر، گفتگوی صوتی و Agent هوش مصنوعی لورم ایپسوم متن ساختگی با
          تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
        </p>
      </div>
    </div>
  );
};

export default Login;
