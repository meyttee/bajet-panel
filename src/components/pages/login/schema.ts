import z from "zod";

const zodSchema = z.object({
  username: z.string({ message: "نام کاربری اجباری‌ است" }),
  password: z.string({ message: "گذرواژه اجباری‌ است" }),
});

export { zodSchema };
