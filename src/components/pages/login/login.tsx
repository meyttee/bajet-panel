"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Form, RhfInput, toast } from "@/components/ui";
import { zodSchema } from "./schema";
import { setCookie } from "@/utils";
import axios from "axios";
import { useLoginMutation } from "@/services";

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
  const { mutateAsync: loginMutation, isPending } = useLoginMutation();

  const submitHandler = async (data: IForm) => {
    try {
      const response = await loginMutation({
        password: data.password,
        username: data.username,
      });

      if (response.statusText === "OK") {
        await setCookie("access", response.data.access);
        await setCookie("refresh", response.data.refresh);
        push("/dashboard/reports");
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast.error(e.response?.data.detail);
      }
    }
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
      <div className="flex w-1/2 flex-col gap-3 px-[136px]">
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
