import { IPermissionedUser } from "@/services";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment-jalaali";
import z from "zod";

const TABLE_COLS: ColumnDef<IPermissionedUser>[] = [
  {
    header: "کد پرسنلی",
    id: "personnel_code",
    accessorFn: ({ personnel_code }) => personnel_code || "-",
    enableColumnFilter: true,
    meta: {
      label: "کد پرسنلی",
      variant: "text",
    },
  },
  {
    header: "شماره همراه",
    id: "phone_number__contains",
    accessorFn: ({ phone_number }) => phone_number || "-",
    enableColumnFilter: true,
    meta: {
      label: "شماره همراه",
      variant: "text",
    },
  },
  {
    header: "نقش",
    id: "role",
    accessorFn: ({ role }) =>
      role ? (role === "admin" ? "مالک" : "کاربر") : "-",
    enableColumnFilter: true,
    meta: {
      label: "نقش",
      variant: "select",
      options: [
        {
          label: "کاربر",
          value: "admin",
        },
        {
          label: "مالک",
          value: "user",
        },
      ],
    },
  },
  {
    header: "آخرین ورود",
    id: "last_login",
    accessorFn: ({ last_login }) =>
      last_login ? moment(last_login).format("HH:mm jYYYY/jMM/jDD") : "-",
    meta: {
      label: "آخرین ورود",
    },
  },
];

const schema = z.object({
  personnel_code: z.string().trim().nonoptional("کد پرسنلی اجباریست"),
  phone_number: z
    .string()
    .regex(/^[09][0-9]{10}$/, "فرمت صحیح شماره موبایل: 09xxxxx1234"),
  password: z.string().min(6, "کلمه عبور باید حداقل ۶ کاراکتر باشد"),
  confirm_password: z.string().min(6, "کلمه عبور باید حداقل ۶ کاراکتر باشد"),
});
type IForm = z.infer<typeof schema>;

export { TABLE_COLS, type IForm, schema };
