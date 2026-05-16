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

const COLORS = ["#1E40AF", "#bfdbfe", "#60A5FA"];
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
    <div className="flex flex-col gap-4 rounded-[10px] border border-[#E5E7EB] p-5 shadow-[0px_2px_6px_0px_#00000014]">
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
      <PieChart
        style={{
          maxWidth: "500px",
          maxHeight: "305px",
          aspectRatio: 1,
        }}
        responsive
      >
        <Pie
          data={data?.data.map((item, i) => ({
            ...item,
            name: NAMES[item.name as keyof typeof NAMES],
            fill: COLORS[i],
          }))}
          dataKey="y"
          cx="50%"
          cy="50%"
          innerRadius="60%"
          outerRadius="80%"
          label
          isAnimationActive
        />
        <Legend
          align="right"
          color="black"
          verticalAlign="middle"
          layout="vertical"
        />
        <Tooltip />
      </PieChart>
    </div>
  );
}
