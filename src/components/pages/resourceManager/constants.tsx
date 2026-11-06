import { IGetResources } from "@/services";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment-jalaali";

const TABLE_COLS: ColumnDef<IGetResources>[] = [
  {
    header: "شناسه قطعه",
    id: "id",
    enableSorting: false,
    accessorFn: ({ id }) => id,
    meta: {
      label: "شناسه قطعه",
    },
  },
  {
    header: "متن سوال",
    id: "question",
    enableSorting: false,
    accessorFn: ({ question }) => question,
    meta: {
      label: "متن سوال",
    },
    maxSize: 200,
  },
  {
    header: "متن جواب",
    id: "answer",
    enableSorting: false,
    accessorFn: ({ answer }) => answer,
    meta: {
      label: "متن جواب",
    },
    maxSize: 200,
  },
  {
    header: "محصول بانکی",
    id: "product_name",
    enableSorting: false,
    accessorFn: ({ product }) => product.name,
    enableColumnFilter: true,
    meta: {
      label: "محصول بانکی",
      variant: "text",
    },
  },
  {
    header: "تاریخ ایجاد",
    id: "created_at__date",
    accessorFn: ({ created_at }) =>
      moment(created_at).format("HH:mm jYYYY/jMM/jDD"),
    enableColumnFilter: true,
    meta: {
      label: "تاریخ ایجاد",
      variant: "date",
    },
  },
  {
    header: "آخرین به ‌روزرسانی",
    id: "updated_at__date",
    accessorFn: ({ updated_at }) =>
      moment(updated_at).format("HH:mm jYYYY/jMM/jDD"),
    enableColumnFilter: true,
    meta: {
      label: "آخرین به ‌روزرسانی",
      variant: "date",
    },
  },
];

export { TABLE_COLS };
