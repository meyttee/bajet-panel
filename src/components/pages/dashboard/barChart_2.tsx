import { useState } from "react";
import moment from "moment-jalaali";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { useGetBarChartData } from "@/services";

const FILTER_FA = {
  at_first: "از ابتدا",
  daily: "روزانه",
  monthly: "ماهانه",
  yearly: "سالانه",
};

const BarCharts = () => {
  const [filter, setFilter] = useState("at_first");
  const { data } = useGetBarChartData(filter);
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
        data={data?.data.chart.data}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="keyword" />
        <YAxis dataKey="count" dx={-30} />
        <Tooltip />
        <Bar
          dataKey="count"
          fill="#1E40AF"
          maxBarSize={14}
          radius={[10, 10, 0, 0]}
          name="تعداد"
        />
      </BarChart>
    </div>
  );
};

export default BarCharts;
