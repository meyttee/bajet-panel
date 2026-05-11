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
    meta: {
      label: "پیش نمایش چت",
    },
  },
  {
    header: "ارزیابی کاربر",
    id: "user_feedback",
    enableSorting: false,
    accessorFn: ({ user_feedback }) => user_feedback,
    cell(props) {
      const status = props.row.original.user_feedback === "like";
      return props.row.original.user_feedback ? (
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
    meta: {
      label: "ارزیابی کاربر",
    },
  },
  {
    header: "تاریخ و ساعت",
    id: "timestamp",
    accessorFn: ({ timestamp }) =>
      moment(timestamp).format("HH:mm jYYYY/jMM/jDD"),
    meta: {
      label: "تاریخ و ساعت",
    },
  },
  {
    header: "ارزیابی ادمین",
    enableSorting: false,
    id: "admin_feedback",
    accessorFn: ({ admin_feedback }) => admin_feedback,
    cell(props) {
      const status = props.row.original.admin_feedback === "like";
      return props.row.original.admin_feedback ? (
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
            {status ? "پسندیدم" : "نپسندیدم"}
          </span>
        </div>
      ) : (
        "-"
      );
    },
    meta: {
      label: "ارزیابی ادمین",
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
    meta: {
      label: "وضعیت",
    },
  },
];

export { TABLE_COLS };
