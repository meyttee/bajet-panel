export interface ChatHeaderProps {
  id: string;
  model: string;
  created_at: string;
  status: "like" | "dislike" | null;
}
