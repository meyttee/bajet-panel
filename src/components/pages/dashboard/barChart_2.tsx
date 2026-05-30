import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { useGetMessageCounts } from "@/services";
import moment from "moment-jalaali";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const FILTER_FA = {
  at_first: "از ابتدا",
  daily: "روزانه",
  monthly: "ماهانه",
  yearly: "سالانه",
};

const BarCharts = () => {
  const [filter, setFilter] = useState("at_first");
  const { data } = useGetMessageCounts(filter);
  return (
    <div className="col-span-1 flex flex-col gap-4 rounded-[10px] border border-[#E5E7EB] p-5 shadow-[0px_2px_6px_0px_#00000014]">
      <div className="flex items-center justify-between">
        <span className="text-sm leading-6 font-medium text-[#3F3F46]">
          کلمات کلیدی پرتکرار
        </span>
        <Select
          value={filter}
          defaultValue={filter}
          onValueChange={(val) => setFilter(val as keyof typeof FILTER_FA)}
        >
          <SelectTrigger className="w-25">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="at_first">از ابتدا</SelectItem>
              <SelectItem value="daily">روزانه</SelectItem>
              <SelectItem value="monthly">ماهانه</SelectItem>
              <SelectItem value="yearly">سالانه</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <BarChart
        style={{
          width: "100%",
          maxHeight: "297px",
          aspectRatio: 1,
        }}
        responsive
        data={data?.data.map((item) => ({
          ...item,
          name: moment(item.name).format("jYYYY/jMM/jDD"),
        }))}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis dataKey="y" />
        <Tooltip formatter={(val) => ``} />
        <Bar
          dataKey="y"
          fill="#1E40AF"
          maxBarSize={14}
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
    </div>
  );
};

export default BarCharts;
