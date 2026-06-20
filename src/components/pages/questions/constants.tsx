import { IQuestion } from "@/services";
import { cn } from "@/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import moment from "moment-jalaali";

const TABLE_COLS: ColumnDef<IQuestion>[] = [
  {
    header: "پیش نمایش چت",
    id: "user_query",
    enableSorting: false,
    accessorFn: ({ user_query }) => user_query,
    maxSize: 200,
    meta: {
      label: "پیش نمایش چت",
    },
  },
  {
    header: "تاریخ و ساعت",
    id: "timestamp",
    accessorFn: ({ timestamp }) =>
      moment(timestamp).format("HH:MM jYYYY/jMM/jDD"),
    meta: {
      label: "تاریخ و ساعت",
    },
  },
  {
    header: "پیش نمایش بازخورد ادمین",
    id: "admin_feedback",
    accessorFn: ({ admin_feedback }) => admin_feedback || "-",
    maxSize: 150,
    enableSorting: false,
  },
  {
    header: "پیش نمایش بازخورد کاربر",
    id: "user_feedback",
    accessorFn: ({ user_feedback }) => user_feedback || "-",
    maxSize: 150,
    enableSorting: false,
  },
  {
    header: "ارزیابی کاربر",
    id: "feedback",
    enableSorting: false,
    accessorFn: ({ feedback }) => feedback,
    cell(props) {
      const status = props.row.original.feedback === "like";
      return props.row.original.feedback ? (
        <div
          className={cn(
            "flex w-fit items-center gap-1 rounded-sm px-1.5 py-1 outline",
            {
              "bg-green-100 text-green-600 outline-green-500": status,
              "bg-red-50 text-red-600 outline-red-600": !status,
            },
          )}
        >
          {status ? (
            <ThumbsUp className="size-5 stroke-1" />
          ) : (
            <ThumbsDown className="size-5 stroke-1" />
          )}
          <span className="text-xs leading-4">
            {status ? "پسندیده" : "نپسندیده"}
          </span>
        </div>
      ) : (
        "-"
      );
    },
    enableColumnFilter: true,
    meta: {
      label: "ارزیابی کاربر",
      variant: "select",
      options: [
        {
          label: "پسندیدم",
          value: "like",
        },
        {
          label: "نپسندیدم",
          value: "dislike",
        },
      ],
    },
  },

  {
    header: "وضعیت",
    enableSorting: false,
    id: "status",
    accessorFn: ({ status }) => status,
    cell(props) {
      const status = props.row.original.status;
      return (
        <div
          className={cn(
            "flex w-fit items-center gap-1 rounded-sm px-1.5 py-1 outline",
            {
              "bg-green-100 text-green-600 outline-green-500": status,
              "bg-red-50 text-red-600 outline-red-600": !status,
            },
          )}
        >
          <span className="text-xs leading-4">
            {status ? "بررسی شده" : "بررسی نشده"}
          </span>
        </div>
      );
    },
    enableColumnFilter: true,
    meta: {
      label: "وضعیت",
      variant: "select",
      options: [
        {
          label: "بررسی شده",
          value: "true",
        },
        {
          label: "بررسی نشده",
          value: "false",
        },
      ],
    },
  },
];

export { TABLE_COLS };
