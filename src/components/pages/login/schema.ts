import z from "zod";

const zodSchema = z.object({
  username: z.string().nonempty({ message: "نام کاربری اجباری‌ است" }),
  password: z.string().nonempty({ message: "گذرواژه اجباری‌ است" }),
});

export { zodSchema };
