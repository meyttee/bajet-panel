import { OptionItem } from "@/components";

export interface ConverseMainCardProps {
  imgUrl: string;
  user_name: string;
  created_at: string;
  category: string;
  title: string;
  description: string;
  status: "NOT_ACCEPTED" | "REPORTED" | undefined;
  nested_avatar?: { src: string; name: string; fallback: string }[];
  detail_count: number;
  is_answered?: boolean;
  options?: OptionItem[];
  onOptionSelect?: (value: string) => void;
  onDetail?: () => void;
}
