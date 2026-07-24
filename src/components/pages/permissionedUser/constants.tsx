import { IPermissionedUser } from "@/services";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment-jalaali";
import z from "zod";

const TABLE_COLS: ColumnDef<IPermissionedUser>[] = [
  {
    header: "کد پرسنلی",
    id: "personnel_code",
    accessorFn: ({ personnel_code }) => personnel_code || "-",
    meta: {
      label: "کد پرسنلی",
      variant: "text",
    },
  },
  {
    header: "شماره همراه",
    id: "phone_number__contains",
    accessorFn: ({ phone_number }) => phone_number || "-",
    enableSorting: false,
    meta: {
      label: "شماره همراه",
      variant: "text",
    },
  },
  // {
  //   header: "نقش",
  //   id: "role",
  //   accessorFn: ({ role }) =>
  //     role ? (role === "admin" ? "مالک" : "کاربر") : "-",
  //   enableColumnFilter: true,
  //   enableSorting: false,
  //   meta: {
  //     label: "نقش",
  //     variant: "select",
  //     options: [
  //       {
  //         label: "کاربر",
  //         value: "user",
  //       },
  //       {
  //         label: "مالک",
  //         value: "admin",
  //       },
  //     ],
  //   },
  // },
  {
    header: "آخرین ورود",
    id: "last_login",
    accessorFn: ({ last_login }) =>
      last_login ? moment(last_login).format("HH:MM jYYYY/jMM/jDD") : "-",
    meta: {
      label: "آخرین ورود",
    },
  },
];

const schema = z
  .object({
    personnel_code: z.string().trim().nonoptional("کد پرسنلی اجباریست"),
    phone_number: z
      .string()
      .regex(/^[09][0-9]{10}$/, "فرمت صحیح شماره موبایل: 09xxxxx1234"),
    password: z
      .string()
      .min(6, "کلمه عبور باید حداقل ۶ کاراکتر باشد")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$_#!*%&() .]{6,}$/,
        "گذرواژه باید حداقل ۶ کاراکتر و حاوی حروف بزرگ و کوچک لاتین و اعداد باشد.",
      ),
    confirm_password: z
      .string()
      .min(6, "کلمه عبور باید حداقل ۶ کاراکتر باشد")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$_#!*%&() .]{6,}$/,
        "گذرواژه باید حداقل ۶ کاراکتر و حاوی حروف بزرگ و کوچک لاتین و اعداد باشد.",
      ),
  })
  .refine((vals) => vals.password === vals.confirm_password, {
    error: "رمز وارد شده با تکرار ان مطابقت ندارد.",

    path: ["confirm_password"],
  });
type IForm = z.infer<typeof schema>;

export { TABLE_COLS, type IForm, schema };
