import { IReport } from "@/services";
import { cn } from "@/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import moment from "moment-jalaali";

const ROLES = {
  user: "کاربر",
  assistant: "چت بات",
};

const TABLE_COLS: ColumnDef<IReport>[] = [
  {
    header: "شناسه نشست",
    enableSorting: false,
    id: "id",
    accessorFn: ({ chat }) => chat.id,
    maxSize: 150,
  },
  {
    header: "متن پیام",
    enableSorting: false,
    id: "content",
    accessorKey: "content",
    maxSize: 150,
  },
  {
    header: "فرستنده",
    enableSorting: false,
    id: "role",
    accessorFn: ({ role }) => ROLES[role],
    maxSize: 150,
    meta: {
      label: "فرستنده",
      variant: "select",
      options: [
        {
          label: "کاربر",
          value: "user",
        },
        {
          label: "چت بات",
          value: "assistant",
        },
      ],
    },
  },
  {
    header: "زمان",
    id: "created_at__date",
    accessorFn: ({ created_at }) =>
      moment(created_at).format("HH:MM jYYYY/jMM/jDD"),
    enableColumnFilter: true,
    meta: {
      variant: "date",
      label: "زمان",
    },
  },
  {
    header: "موضوع",
    enableSorting: false,
    id: "subject",
    accessorFn: ({ chat }) => chat.title,
  },
  {
    header: "بازخورد",
    id: "feedback",
    accessorKey: "feedback",
    enableColumnFilter: true,
    enableSorting: false,
    cell(props) {
      const status = props.row.original.feedback === "like";
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
          {status ? (
            <ThumbsUp className="size-5 stroke-1" />
          ) : (
            <ThumbsDown className="size-5 stroke-1" />
          )}
          <span className="text-xs leading-4">
            {status ? "پسندیدم" : "نپسندیدم"}
          </span>
        </div>
      );
    },
    meta: {
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
      label: "بازخورد",
    },
  },
];

export { TABLE_COLS };
