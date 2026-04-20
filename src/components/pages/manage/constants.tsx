import { ISession } from "@/services";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment-jalaali";

const TABLE_COLS: ColumnDef<ISession>[] = [
  {
    header: "پیش نمایش نشست",
    id: "title",
    accessorFn: ({ title }) => title,
    meta: {
      label: "پیش نمایش نشست",
    },
  },
  {
    header: "تاریخ و ساعت",
    id: "created_at__date",
    accessorFn: ({ created_at }) =>
      moment(created_at).format("HH:mm jYYYY/jMM/jDD"),
    enableColumnFilter: true,
    meta: {
      label: "تاریخ و ساعت",
      variant: "date",
    },
  },
];

export { TABLE_COLS };
