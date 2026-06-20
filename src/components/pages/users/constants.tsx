import { IUsers } from "@/services";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment-jalaali";

const TABLE_COLS: ColumnDef<IUsers>[] = [
  {
    header: "نام کاربری",
    id: "username",
    accessorFn: ({ username }) => username || "-",
    maxSize: 150,
    meta: {
      label: "نام کاربری",
    },
  },
  {
    header: "کد یکتا",
    id: "id",
    accessorKey: "id",
    meta: {
      label: "کد یکتا",
    },
  },
  {
    header: "تعداد سوالات",
    id: "question_count",
    accessorFn: ({ question_count }) => question_count,
    maxSize: 150,
    meta: {
      label: "تعداد سوالات",
    },
  },
  {
    header: "تعداد نشست‌ها",
    id: "chat_count",
    accessorFn: ({ chat_count }) => chat_count,
    maxSize: 150,
    meta: {
      label: "تعداد نشست‌ها",
    },
  },
  {
    header: "آخرین فعالیت",
    id: "last_chat_created_at",
    accessorFn: ({ last_activity }) =>
      last_activity ? moment(last_activity).format("HH:MM jYYYY/jMM/jDD") : "-",
    enableColumnFilter: true,
    meta: {
      variant: "dateRange",
      label: "آخرین فعالیت",
    },
  },
];

export { TABLE_COLS };
