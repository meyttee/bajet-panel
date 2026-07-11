import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Rectangle,
  BarShapeProps,
} from "recharts";

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
    <div className="flex w-[527px] flex-col gap-4 rounded-[10px] border border-[#E5E7EB] p-5 shadow-[0px_2px_6px_0px_#00000014]">
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
          width: "487px",
          height: "305px",
          marginLeft: -10,
        }}
        responsive
        data={data?.data.chart.data.slice(0, 4)}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="keyword" />
        <YAxis dataKey="count" dx={-30} />
        <Tooltip />
        <Bar
          dataKey="count"
          radius={[10, 10, 0, 0]}
          name="تعداد"
          shape={(props: BarShapeProps) => {
            const colors = ["#1D70B8", "#663399", "#A8446E", "#E28743"];
            props.index;
            return (
              <Rectangle
                {...props}
                fill={`${colors[props.index]}4D`}
                stroke={colors[props.index]}
              />
            );
          }}
        />
      </BarChart>
    </div>
  );
};

export default BarCharts;
