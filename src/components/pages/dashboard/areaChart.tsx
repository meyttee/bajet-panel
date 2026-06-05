import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { useGetAreaChartData } from "@/services";
import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const FILTER_FA = {
  at_first: "از ابتدا",
  daily: "روزانه",
  monthly: "ماهانه",
  yearly: "سالانه",
};

export const SimpleAreaChart = () => {
  const [filter, setFilter] = useState("at_first");
  const { data } = useGetAreaChartData(filter);
  return (
    <div className="col-span-3 flex flex-col gap-4 rounded-[10px] border border-[#E5E7EB] p-5 shadow-[0px_2px_6px_0px_#00000014]">
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
      <AreaChart
        style={{
          width: "98%",
          maxHeight: "297px",
          aspectRatio: 1.618,
        }}
        responsive
        data={data?.data.chart.data}
        margin={{
          top: 20,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="keyword" niceTicks="snap125" />
        <YAxis dataKey="count" niceTicks="snap125" dx={-30} />
        <Tooltip />

        <Area
          type="monotone"
          dataKey="count"
          stackId="1"
          stroke="#1E40AF"
          fill="#1E40AF"
          name="تعداد"
        />
      </AreaChart>
    </div>
  );
};
