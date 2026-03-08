export interface SingleBarProps {
  percent: number;
  direction: "increasing" | "decreasing";
  maxLabel: string;
  unit: string;
  height?: number;
}
