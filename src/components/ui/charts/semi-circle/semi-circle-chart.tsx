"use client";

import { FC, useMemo } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import type { ISemiCircleProps } from "./interface";
import { Loading } from "../../loading";

const SemiCircleChart: FC<ISemiCircleProps> = ({
  data = [],
  label,
  isLoading,
  direction = "decreasing",
  maxValue,
  width,
  height = 180,
}) => {
  const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

  const rawNum = Number(data);
  const absNum = Math.abs(rawNum);
  const remainder = Math.max(0, 100 - absNum);
  const { labels, series, colors } = useMemo(() => {
    if (!Array.isArray(data)) {
      return {
        labels: [label],
        series: [absNum, remainder],
        colors: [rawNum >= 0 ? "#0F766E" : "#C2410C", "#E5E7EB"],
      };
    }

    // Handle array of primitives (number | string)
    if (typeof data[0] !== "object") {
      const rawNum = Number(data[0]);
      const absNum = Math.abs(rawNum);
      const remainder = Math.max(0, 100 - absNum);
      return {
        labels: [label],
        series: [absNum, remainder],
        colors: [rawNum >= 0 ? "#0F766E" : "#C2410C", "#E5E7EB"],
      };
    }

    const typedData = data as { name: string; amount: number }[];
    const len = typedData.length;
    if (len === 0) return { labels: [], series: [], colors: [] };

    let sortedData = [...typedData].sort((a, b) => b.amount - a.amount);

    if (len === 1) {
      const rawVal = sortedData[0].amount;
      const absVal = Math.abs(rawVal);
      const remainder = Math.max(0, 100 - absVal);

      const dynamicColor = (value: number) => {
        if (direction === "increasing") {
          if (value < 75) return "#0F766E";
          if (value < 85) return "#F97316";
          return "#DC2626";
        } else if (direction === "decreasing") {
          if (value > 25) return "#0F766E";
          if (value > 15) return "#F97316";
          return "#DC2626";
        } else if (direction === "neutral") {
          if (value === 0) return "#FACC15";
          if (value > 0) return "#0F766E";
          return "#C2410C";
        }
      };

      return {
        labels: [sortedData[0].name],
        series: [absVal, remainder],
        colors: [dynamicColor(rawVal), "#E5E7EB"],
      };
    }

    if (len > 3) {
      const topThree = sortedData.slice(0, 3);
      const others = sortedData.slice(3);
      const othersSum = others.reduce((sum, item) => sum + item.amount, 0);
      sortedData = [...topThree, { name: "Others", amount: othersSum }];
    }

    const opacitySteps = [1, 0.7, 0.32, 0.2];
    const baseColor = "15, 118, 110";

    const calcColor = (index: number) => {
      const opacity = opacitySteps[index] ?? 0.2;
      return `rgba(${baseColor}, ${opacity})`;
    };

    return {
      labels: sortedData.map((d) => d.name),
      series: sortedData.map((d) => Number(d.amount)),
      colors: sortedData.map((_, idx) => calcColor(idx)),
    };
  }, [data, label, direction]);

  const options: ApexOptions = {
    chart: {
      type: "pie",
      offsetY: 0,
      sparkline: { enabled: true },
    },
    colors,
    labels,
    tooltip: {
      enabled: labels.length !== 1,
      shared: false,
      intersect: false,
      style: {
        fontFamily: "iransans",
      },
      y: {
        formatter: (val: number) => `${val.toFixed()}%`,
      },
      fixed: {
        enabled: true,
        position: "topRight",
        offsetX: 0,
        offsetY: 0,
      },
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,
        offsetY: 0,
        donut: {
          size: "80%",
          labels: {
            show: true,
            name: { show: false },

            value: {
              show: true,
              fontSize: "14px",
              fontFamily: "iransans",
              fontWeight: 400,
              offsetY: 0,
              formatter: (val: string) => {
                if (rawNum < 0) {
                  return `${rawNum.toFixed()}%`;
                }
                if (data.length === 1) {
                  return `${Number(series[0]).toFixed()}%`;
                }
                const total = Number(
                  series.reduce((sum, val) => sum + val, 0),
                ).toFixed();
                return `${total}%`;
              },
            },
            total: {
              show: true,
              label: "Total",
              fontSize: "14px",
              fontFamily: "iransans",
              fontWeight: 600,
              color: "#5E6566",
              formatter: () => {
                if (rawNum < 0) {
                  return `${rawNum.toFixed()}%`;
                }
                if (data.length === 1) {
                  return `${Number(series[0]).toFixed()}%`;
                }
                const total = Number(
                  series.reduce((sum, val) => sum + val, 0),
                ).toFixed();
                return `${total}%`;
              },
            },
          },
        },
      },
    },
    grid: {
      padding: {
        bottom: -(height / 2),
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
  };

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center pt-8">
        <Loading size="sm" />
      </div>
    );
  const halfHeight = height / 2;

  return (
    <div className="relative flex flex-col items-center">
      <div
        className={`!w-[${width ? width : 220}px] overflow-hidden`}
        style={{
          height: halfHeight + 5,
        }}
      >
        <Chart
          options={options}
          series={series}
          type="donut"
          width={width ?? 220}
          height={height}
        />
      </div>

      {maxValue && (
        <div
          className={`absolute ${labels.length > 1 ? "top-[65%]" : "top-[95%]"} left-0 flex w-full justify-between px-7`}
        >
          <span className="text-xs text-gray-500">{maxValue} GB</span>
          <span className="text-xs text-gray-500">0 GB</span>
        </div>
      )}

      {labels.length > 1 && (
        <div className="flex w-full flex-wrap justify-center gap-4 pt-9">
          {labels.map((lbl, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <span
                className="inline-block h-3 w-3 rounded-full"
                style={{ backgroundColor: colors[idx] }}
              />
              <span className="text-[12px] font-normal text-gray-700">
                {lbl}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SemiCircleChart;
