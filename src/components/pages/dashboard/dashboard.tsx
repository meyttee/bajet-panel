"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { useGetDashboardCardsData } from "@/services";
import { WalletIcon } from "lucide-react";
import { useState } from "react";
import SimpleBarChart from "./barChart";
import TwoLevelPieChart from "./piChart";
import { SimpleAreaChart } from "./areaChart";
import BarCharts from "./barChart_2";

const FILTER_FA = {
  at_first: "از ابتدا",
  daily: "روزانه",
  monthly: "ماهانه",
  yearly: "سالانه",
};

const Dashboard = () => {
  const [filter, setFilter] = useState<keyof typeof FILTER_FA>("at_first");
  const { data, isLoading } = useGetDashboardCardsData(filter);

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex gap-5">
        <div className="flex w-full flex-col gap-4 rounded-[10px] border border-[#E5E7EB] p-5 shadow-[0px_2px_6px_0px_#00000014]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-sm bg-[#312E810D] p-1.5">
                <WalletIcon className="size-5 text-[#262261]" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm leading-6 font-medium text-[#3F3F46]">
                  تعداد نشست‌ها
                </span>
                <span className="text-xs leading-4 font-light">
                  {FILTER_FA[filter]}
                </span>
              </div>
            </div>
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
          <div className="flex items-center justify-between">
            <span className="h-8 text-xl leading-8 font-medium">
              {isLoading ? "" : Number(data?.data.chats_count).toLocaleString()}
            </span>
          </div>
        </div>
        <div className="flex w-full flex-col gap-4 rounded-[10px] border border-[#E5E7EB] p-5 shadow-[0px_2px_6px_0px_#00000014]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-sm bg-[#312E810D] p-1.5">
                <WalletIcon className="size-5 text-[#262261]" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm leading-6 font-medium text-[#3F3F46]">
                  تعداد کاربران
                </span>
                <span className="text-xs leading-4 font-light">
                  {FILTER_FA[filter]}
                </span>
              </div>
            </div>
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
          <div className="flex items-center justify-between">
            <span className="h-8 text-xl leading-8 font-medium">
              {isLoading ? "" : Number(data?.data.users_count).toLocaleString()}
            </span>
          </div>
        </div>
        <div className="flex w-full flex-col gap-4 rounded-[10px] border border-[#E5E7EB] p-5 shadow-[0px_2px_6px_0px_#00000014]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-sm bg-[#312E810D] p-1.5">
                <WalletIcon className="size-5 text-[#262261]" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm leading-6 font-medium text-[#3F3F46]">
                  میانگین زمان پاسخگویی
                </span>
                <span className="text-xs leading-4 font-light">
                  {FILTER_FA[filter]}
                </span>
              </div>
            </div>
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
          <div className="flex items-center justify-between">
            <span className="h-8 text-xl leading-8 font-medium" dir="ltr">
              {isLoading
                ? ""
                : (
                    Number(data?.data.response_time_avg) * 1000
                  ).toLocaleString()}{" "}
              ms
            </span>
          </div>
        </div>
        <div className="flex w-full flex-col gap-4 rounded-[10px] border border-[#E5E7EB] p-5 shadow-[0px_2px_6px_0px_#00000014]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-sm bg-[#312E810D] p-1.5">
                <WalletIcon className="size-5 text-[#262261]" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm leading-6 font-medium text-[#3F3F46]">
                  تعداد کل پیام‌ها
                </span>
                <span className="text-xs leading-4 font-light">
                  {FILTER_FA[filter]}
                </span>
              </div>
            </div>
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
          <div className="flex items-center justify-between">
            <span className="h-8 text-xl leading-8 font-medium">
              {isLoading
                ? ""
                : Number(data?.data.messages_count).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-5">
        <SimpleBarChart />
        <TwoLevelPieChart />
      </div>
      <div className="flex gap-5">
        <BarCharts />
        <SimpleAreaChart />
      </div>
    </div>
  );
};

export default Dashboard;
