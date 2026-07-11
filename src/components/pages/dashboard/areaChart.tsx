import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { ILineChart, useGetAreaChartData } from "@/services";
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

function convertToChartData(apiResponse?: ILineChart) {
  const monthMap = {};

  apiResponse?.line.slice(0, 4).forEach((keyword) => {
    keyword.month.forEach(({ month, count }) => {
      if (!monthMap[month]) monthMap[month] = { month };
      monthMap[month][keyword.name] = count;
    });
  });

  return Object.values(monthMap).sort((a, b) => a.month.localeCompare(b.month));
}

const colors = ["#663399", "#1D70B8", "#E28743", "#A8446E"];

export const SimpleAreaChart = () => {
  const [filter, setFilter] = useState("at_first");
  const { data } = useGetAreaChartData(filter);

  return (
    <div className="flex w-full flex-col gap-4 rounded-[10px] border border-[#E5E7EB] p-5 shadow-[0px_2px_6px_0px_#00000014]">
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
      <div className="flex gap-5">
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-5">
            {data?.data.line.slice(0, 4).map((item, index) => (
              <div className="flex justify-between gap-2" key={index}>
                <div className="flex items-center gap-2">
                  <span
                    className={`h-3 w-3 rounded-full`}
                    style={{
                      backgroundColor: colors[index],
                    }}
                  />
                  <p>{item.name}</p>
                </div>
                <p>{Number(item.total).toLocaleString()}</p>
              </div>
            ))}
          </div>
          <div className="flex w-[194px] justify-center gap-2 rounded-[8px] border border-[#E5E7EB] p-2">
            <p>مجموع</p>
            <p>
              {data?.data.line
                .map((i) => i.total)
                .reduce((prev, curr) => prev + curr)
                .toLocaleString()}
            </p>
          </div>
        </div>
        <AreaChart
          style={{
            width: "98%",
            maxHeight: "297px",
            aspectRatio: 1.618,
          }}
          responsive
          data={convertToChartData(data?.data)}
          margin={{
            top: 20,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" niceTicks="snap125" />
          <YAxis niceTicks="snap125" dx={-30} />
          <Tooltip />
          {data?.data.summary.top_keywords.slice(0, 4).map((i, index) => (
            <Area
              key={index}
              type="monotone"
              dataKey={i}
              stackId="1"
              stroke={colors[index]}
              fill={colors[index]}
              name={i}
              fillOpacity={0.4}
            />
          ))}
        </AreaChart>
      </div>
    </div>
  );
};
