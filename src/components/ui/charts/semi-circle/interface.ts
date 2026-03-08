interface ISemiCircleProps {
  data: (number | string)[] | { name: string; amount: string | number }[];
  label: string;
  isLoading?: boolean;
  direction?: "increasing" | "decreasing" | "neutral";
  maxValue?: number;
  width?: number;
  height?: number;
}

export type { ISemiCircleProps };
