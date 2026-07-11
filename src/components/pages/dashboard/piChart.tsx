import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { useGetFeedbacks } from "@/services";
import { useState } from "react";
import { Legend, Pie, PieChart, Tooltip, TooltipIndex } from "recharts";

// #region Sample data

const COLORS = ["#663399", "#A8446E", "#E28743"];
const NAMES = {
  Like: "پسندیدم",
  Dislike: "نپسندیدم",
  "No Feedback": "بدون بازخورد",
};
const FILTER_FA = {
  at_first: "از ابتدا",
  daily: "روزانه",
  monthly: "ماهانه",
  yearly: "سالانه",
};

export default function TwoLevelPieChart() {
  const [filter, setFilter] = useState("at_first");
  const { data } = useGetFeedbacks(filter);
  return (
    <div className="flex w-[527px] flex-col gap-4 rounded-[10px] border border-[#E5E7EB] p-5 shadow-[0px_2px_6px_0px_#00000014]">
      <div className="flex items-center justify-between">
        <span className="text-sm leading-6 font-medium text-[#3F3F46]">
          بازخوردها
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
            {data?.data.map((item, index) => (
              <div className="flex justify-between gap-2" key={index}>
                <div className="flex items-center gap-2">
                  <span
                    className={`h-3 w-3 rounded-full`}
                    style={{
                      backgroundColor: COLORS[index],
                    }}
                  />
                  <p>{NAMES[item.name as keyof typeof NAMES]}</p>
                </div>
                <p>{Number(item.y).toLocaleString()}</p>
              </div>
            ))}
          </div>
          <div className="flex w-[194px] justify-center gap-2 rounded-[8px] border border-[#E5E7EB] p-2">
            <p>مجموع</p>
            <p>
              {data?.data.map((i) => i.y).reduce((prev, curr) => prev + curr)}
            </p>
          </div>
        </div>
        <PieChart
          style={{
            width: "273px",
            height: "273px",
            aspectRatio: 1,
          }}
          responsive
        >
          <Pie
            data={data?.data.map((item, i) => ({
              ...item,
              name: NAMES[item.name as keyof typeof NAMES],
              fill: `${COLORS[i]}4D`,
              stroke: COLORS[i],
            }))}
            dataKey="y"
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="80%"
            label
            isAnimationActive
            paddingAngle={2}
          />
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
}
