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

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const FILTER_FA = {
  at_first: "از ابتدا",
  daily: "روزانه",
  monthly: "ماهانه",
  yearly: "سالانه",
};
export const SimpleAreaChart = () => {
  const [filter, setFilter] = useState("at_first");
  //   const { data } = useGetAreaChartData(filter);
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
          width: "100%",
          maxHeight: "297px",
          aspectRatio: 1.618,
        }}
        responsive
        data={data}
        margin={{
          top: 20,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" niceTicks="snap125" />
        <YAxis width="auto" niceTicks="snap125" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="uv"
          stackId="1"
          stroke="#93C5FD"
          fill="#93C5FD"
        />
        <Area
          type="monotone"
          dataKey="pv"
          stackId="1"
          stroke="#BFDBFE"
          fill="#BFDBFE"
        />
        <Area
          type="monotone"
          dataKey="amt"
          stackId="1"
          stroke="#1E40AF"
          fill="#1E40AF"
        />
      </AreaChart>
    </div>
  );
};
