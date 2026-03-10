"use client";

import {
  DataTable,
  LikeIcon,
  TableContainer,
  TableToolbar,
  useDataTable,
} from "@/components";
import { cn } from "@/utils";

const Reports = () => {
  const { table } = useDataTable({
    columns: [
      {
        header: "شناسه نشست",
        id: "id",
        accessorKey: "id",
      },
      {
        header: "آخرین سوال کاربر",
        id: "last_question",
        accessorKey: "last_question",
        maxSize: 150,
      },
      {
        header: "تاریخ",
        id: "date",
        accessorKey: "date",
        enableColumnFilter: true,
        meta: {
          variant: "dateRange",
          label: "زمان",
        },
      },
      {
        header: "موضوع",
        id: "subject",
        accessorKey: "subject",
        enableColumnFilter: true,
        meta: {
          variant: "multiSelect",
          label: "موضوع",
        },
      },
      {
        header: "بازخورد",
        id: "feedback",
        accessorKey: "feedback",
        enableColumnFilter: true,
        cell(props) {
          const status = props.row.original.feedback === "like";
          return (
            <div
              className={cn("flex w-fit gap-1 rounded-sm px-2 py-0.5 outline", {
                "bg-green-500/40 text-green-800 outline-green-500": status,
                "": !status,
              })}
            >
              <LikeIcon className="text-green-800" />
              <span>{status ? "پسندیدم" : "نپسندیدم"}</span>
            </div>
          );
        },
        meta: {
          variant: "select",
          label: "بازخورد",
        },
      },
    ],
    data: [
      {
        id: "45465452323",
        last_question: "متن سوال در اینحا قسمت می‌گیرد",
        date: "02:09 1404/12/19",
        subject: "موضوع پیام",
        feedback: "like",
      },
      {
        id: "45465452323",
        last_question: "متن سوال در اینحا قسمت می‌گیرد",
        date: "02:09 1404/12/19",
        subject: "موضوع پیام",
        feedback: "like",
      },
      {
        id: "45465452323",
        last_question: "متن سوال در اینحا قسمت می‌گیرد",
        date: "02:09 1404/12/19",
        subject: "موضوع پیام",
        feedback: "like",
      },
      {
        id: "45465452323",
        last_question: "متن سوال در اینحا قسمت می‌گیرد",
        date: "02:09 1404/12/19",
        subject: "موضوع پیام",
        feedback: "like",
      },
      {
        id: "45465452323",
        last_question: "متن سوال در اینحا قسمت می‌گیرد",
        date: "02:09 1404/12/19",
        subject: "موضوع پیام",
        feedback: "like",
      },
      {
        id: "45465452323",
        last_question: "متن سوال در اینحا قسمت می‌گیرد",
        date: "02:09 1404/12/19",
        subject: "موضوع پیام",
        feedback: "like",
      },
      {
        id: "45465452323",
        last_question: "متن سوال در اینحا قسمت می‌گیرد",
        date: "02:09 1404/12/19",
        subject: "موضوع پیام",
        feedback: "like",
      },
      {
        id: "45465452323",
        last_question: "متن سوال در اینحا قسمت می‌گیرد",
        date: "02:09 1404/12/19",
        subject: "موضوع پیام",
        feedback: "like",
      },
      {
        id: "45465452323",
        last_question: "متن سوال در اینحا قسمت می‌گیرد",
        date: "02:09 1404/12/19",
        subject: "موضوع پیام",
        feedback: "like",
      },
      {
        id: "45465452323",
        last_question: "متن سوال در اینحا قسمت می‌گیرد",
        date: "02:09 1404/12/19",
        subject: "موضوع پیام",
        feedback: "like",
      },
    ],

    pageCount: 1,
    actions: {
      onEdit: (arg) => console.log(arg),
      customActions: [
        {
          icon: <>edit icon</>,
          label: "edit",
          onClick: (arg) => console.log(arg),
        },
      ],
    },
  });

  return (
    <TableContainer>
      <TableToolbar table={table} title="نشست‌ها" totalItems={10} />
      <DataTable table={table} />
    </TableContainer>
  );
};

export default Reports;
