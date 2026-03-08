import { OptionItem } from "@/components";

export interface CommentProps {
  id: string;
  author: string;
  avatar: string;
  time: string;
  content: string;
  likes: number;
  dislikes: number;
  onDelete: () => void;
  onApprove: () => void;
  status: "NOT_ACCEPTED" | "REPORTED" | undefined;
  replies: CommentProps[];
}

export interface RecursiveCardProps {
  comment: CommentProps;
  depth?: number;
  isAdmin?: boolean;
  likes?: number;
  dislikes?: number;
  options?: OptionItem[];
  onDelete: () => void;
  onApprove: () => void;
  status: "NOT_ACCEPTED" | "REPORTED" | undefined;
  is_answered?: boolean;
  onOptionSelect?: (value: string) => void;
}
