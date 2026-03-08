import { OptionItem } from "@/components";

export interface ConverseDetailCardProps {
  imgUrl: string;
  user_name: string;
  created_at: string;
  category: string;
  title: string;
  description: string;
  group_avatar: GroupAvatar[];
  options?: OptionItem[];
  onOptionSelect?: (value: string) => void;
  onDelete: () => void;
  is_answered: boolean;
  message_status: "NOT_ACCEPTED" | "REPORTED" | undefined;
  onApprove?: () => void;
  onBack?: () => void;
}

export interface GroupAvatar {
  src: string;
  name?: string;
  fallback?: string;
}
